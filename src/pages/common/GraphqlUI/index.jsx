import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buildSchema, graphqlSync, getIntrospectionQuery } from 'graphql';
import {
  ReactFlow, Controls, MiniMap, Background, BackgroundVariant,
  useNodesState, useEdgesState, Position, Handle, MarkerType,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

import Icon from '../../../components/MdIcon/Icon';
import libraryService from '../../../services/libraryService';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import classes from './graphql-ui.module.scss';

const BUILT_IN = new Set([
  'String', 'Int', 'Float', 'Boolean', 'ID',
  '__Schema', '__Type', '__TypeKind', '__Field',
  '__InputValue', '__EnumValue', '__Directive', '__DirectiveLocation',
]);

function typeStr(t) {
  if (!t) return '';
  if (t.kind === 'NON_NULL') return `${typeStr(t.ofType)}!`;
  if (t.kind === 'LIST') return `[${typeStr(t.ofType)}]`;
  return t.name ?? '';
}

function baseName(t) {
  if (!t) return null;
  return t.ofType ? baseName(t.ofType) : t.name;
}

const KIND_LABEL = { OBJECT: 'type', INPUT_OBJECT: 'input', ENUM: 'enum', SCALAR: 'scalar', INTERFACE: 'interface', UNION: 'union' };
const NODE_W     = 260;
const HEADER_H   = 44;
const FIELD_H    = 26;
const MORE_H     = 26;
const MAX_FIELDS = 7;

function nodeHeight(type) {
  const fields = type.fields || type.inputFields || type.enumValues || [];
  const shown  = Math.min(fields.length, MAX_FIELDS);
  return HEADER_H + shown * FIELD_H + (fields.length > MAX_FIELDS ? MORE_H : 0) || HEADER_H + 10;
}

function applyDagreLayout(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'LR', nodesep: 60, ranksep: 120, edgesep: 30 });

  nodes.forEach(n => g.setNode(n.id, { width: NODE_W, height: n.data.nodeHeight }));
  edges.forEach(e => g.setEdge(e.source, e.target));
  dagre.layout(g);

  return nodes.map(n => {
    const { x, y } = g.node(n.id);
    return { ...n, position: { x: x - NODE_W / 2, y: y - n.data.nodeHeight / 2 } };
  });
}

function getSecondaryColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim() || '#94a3b8';
}

function TypeNode({ data, selected }) {
  const { type, isRoot, onSelect } = data;
  const kindClass = classes[`nodeKind_${isRoot ? 'root' : type.kind}`] ?? '';
  const fields = type.fields || type.inputFields || type.enumValues || [];
  const shown  = fields.slice(0, MAX_FIELDS);
  const extra  = fields.length - MAX_FIELDS;

  return (
    <div
      className={`${classes.gNode} ${kindClass} ${selected ? classes.gNode__selected : ''}`}
      onClick={() => onSelect(type.name)}
    >
      <Handle type='target' position={Position.Left}  className={classes.handle} />

      <div className={classes.gNode__head}>
        <span className={classes.gNode__badge}>
          {isRoot ? 'root' : (KIND_LABEL[type.kind] ?? type.kind?.toLowerCase())}
        </span>
        <span className={classes.gNode__name}>{type.name}</span>
      </div>

      {shown.length > 0 && (
        <div className={classes.gNode__fields}>
          {shown.map(f => (
            <div key={f.name} className={classes.gNode__field}>
              <span className={classes.gNode__fname}>{f.name}</span>
              <span className={classes.gNode__ftype}>{typeStr(f.type)}</span>
            </div>
          ))}
          {extra > 0 && (
            <div className={classes.gNode__more}>+{extra} more fields</div>
          )}
        </div>
      )}

      <Handle type='source' position={Position.Right} className={classes.handle} />
    </div>
  );
}

const nodeTypes = { typeNode: TypeNode };

function SchemaGraph({ schemaInfo, selectedName, onSelect }) {
  const { types, rootNames, typeMap } = schemaInfo;

  const graphTypes = useMemo(() =>
    types.filter(t => ['OBJECT', 'INPUT_OBJECT', 'INTERFACE'].includes(t.kind))
  , [types]);

  const initialNodes = useMemo(() => {
    const raw = graphTypes.map(t => ({
      id:       t.name,
      type:     'typeNode',
      position: { x: 0, y: 0 },
      data:     { type: t, isRoot: rootNames.has(t.name), onSelect, nodeHeight: nodeHeight(t) },
    }));

    const edgesForLayout = [];
    graphTypes.forEach(t => {
      const fields = t.fields || t.inputFields || [];
      fields.forEach(f => {
        const target = baseName(f.type);
        if (target && typeMap[target] && target !== t.name) {
          edgesForLayout.push({ source: t.name, target });
        }
      });
    });

    return applyDagreLayout(raw, edgesForLayout);
  }, [graphTypes, rootNames, typeMap, onSelect]);

  const initialEdges = useMemo(() => {
    const seen = new Set();
    const edges = [];
    graphTypes.forEach(t => {
      const fields = t.fields || t.inputFields || [];
      fields.forEach(f => {
        const target = baseName(f.type);
        if (!target || !typeMap[target] || target === t.name) return;
        const key = `${t.name}→${target}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push({
          id:        key,
          source:    t.name,
          target,
          type:      'smoothstep',
          animated:  rootNames.has(t.name),
          markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
          style:     { stroke: '#94a3b8', strokeWidth: 1.5 },
        });
      });
    });
    return edges;
  }, [graphTypes, typeMap, rootNames]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const styledNodes = useMemo(() =>
    nodes.map(n => ({ ...n, selected: n.id === selectedName }))
  , [nodes, selectedName]);

  return (
    <div className={classes.graphWrapper}>
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color='#e2e8f0' />
        <Controls />
        <MiniMap
          nodeColor={getSecondaryColor}
          maskColor='rgba(248,250,252,0.85)'
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
        />
      </ReactFlow>
    </div>
  );
}

function SchemaExplorer({ schemaInfo, selectedName, onSelect }) {
  const { types, rootNames, typeMap } = schemaInfo;
  const [search, setSearch] = useState('');

  const cats = useMemo(() => {
    const q = search.toLowerCase();
    const ok = t => !q || t.name.toLowerCase().includes(q);
    return {
      root:      types.filter(t => rootNames.has(t.name) && ok(t)),
      object:    types.filter(t => !rootNames.has(t.name) && t.kind === 'OBJECT' && ok(t)),
      input:     types.filter(t => t.kind === 'INPUT_OBJECT' && ok(t)),
      enum:      types.filter(t => t.kind === 'ENUM' && ok(t)),
      interface: types.filter(t => t.kind === 'INTERFACE' && ok(t)),
      union:     types.filter(t => t.kind === 'UNION' && ok(t)),
      scalar:    types.filter(t => t.kind === 'SCALAR' && ok(t)),
    };
  }, [types, rootNames, search]);

  const active = typeMap[selectedName] ?? cats.root[0] ?? types[0] ?? null;

  useEffect(() => {
    if (!selectedName && types.length > 0) {
      onSelect((cats.root[0] ?? types[0]).name);
    }
  }, [types]);

  const go = (name) => { if (typeMap[name]) onSelect(name); };

  function TypeLink({ type }) {
    const name = baseName(type);
    const str  = typeStr(type);
    return typeMap[name]
      ? <button className={classes.typeLink} onClick={() => go(name)}>{str}</button>
      : <span className={classes.typeBuiltin}>{str}</span>;
  }

  function SideGroup({ title, items, kindClass }) {
    if (!items.length) return null;
    return (
      <div className={classes.sideGroup}>
        <p className={classes.sideGroup__label}>{title}</p>
        {items.map(t => (
          <button
            key={t.name}
            className={`${classes.sideBtn} ${active?.name === t.name ? classes.sideBtn__active : ''} ${classes[kindClass]}`}
            onClick={() => onSelect(t.name)}
          >{t.name}</button>
        ))}
      </div>
    );
  }

  function Badge({ kind, isRoot }) {
    const k = isRoot ? 'root' : kind;
    return <span className={`${classes.badge} ${classes[`badge__${k}`]}`}>{isRoot ? 'root' : (KIND_LABEL[kind] ?? kind?.toLowerCase())}</span>;
  }

  function FieldTable({ fields, isInput }) {
    return (
      <div className={classes.fieldTable}>
        {fields.map(f => (
          <div key={f.name} className={classes.fieldRow}>
            <span className={classes.fieldName}>{f.name}</span>
            <span className={classes.fieldType}><TypeLink type={f.type} /></span>
            <span className={classes.fieldDesc}>{f.description ?? ''}</span>
            {!isInput && f.args?.length > 0 && (
              <span className={classes.fieldArgs}>
                ({f.args.map((a, i) => <span key={a.name}>{i > 0 && ', '}{a.name}: <TypeLink type={a.type} /></span>)})
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classes.explorer}>
      <aside className={classes.sidebar}>
        <div className={classes.searchBox}>
          <Icon id='MdSearch' />
          <input className={classes.searchInput} placeholder='Search types…' value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <nav className={classes.sideNav}>
          <SideGroup title='Root Operations' items={cats.root}      kindClass='kindRoot' />
          <SideGroup title='Object Types'   items={cats.object}    kindClass='kindObject' />
          <SideGroup title='Input Types'    items={cats.input}     kindClass='kindInput' />
          <SideGroup title='Enums'          items={cats.enum}      kindClass='kindEnum' />
          <SideGroup title='Interfaces'     items={cats.interface} kindClass='kindInterface' />
          <SideGroup title='Unions'         items={cats.union}     kindClass='kindUnion' />
          <SideGroup title='Scalars'        items={cats.scalar}    kindClass='kindScalar' />
        </nav>
      </aside>

      <main className={classes.main}>
        {!active && <p className={classes.placeholder}>Select a type.</p>}
        {active && (
          <div className={classes.detail}>
            <div className={classes.detail__head}>
              <Badge kind={active.kind} isRoot={rootNames.has(active.name)} />
              <h2 className={classes.detail__name}>{active.name}</h2>
            </div>
            {active.description && <p className={classes.detail__desc}>{active.description}</p>}

            {(active.kind === 'OBJECT' || active.kind === 'INTERFACE') && active.fields?.length > 0 && (<><p className={classes.section__label}>Fields</p><FieldTable fields={active.fields} /></>)}
            {active.kind === 'INPUT_OBJECT' && active.inputFields?.length > 0 && (<><p className={classes.section__label}>Input Fields</p><FieldTable fields={active.inputFields} isInput /></>)}

            {active.kind === 'ENUM' && active.enumValues?.length > 0 && (
              <><p className={classes.section__label}>Values</p>
              <div className={classes.fieldTable}>
                {active.enumValues.map(v => (
                  <div key={v.name} className={classes.fieldRow}>
                    <span className={`${classes.fieldName} ${classes.enumVal}`}>{v.name}</span>
                    <span className={classes.fieldDesc}>{v.description ?? ''}</span>
                  </div>
                ))}
              </div></>
            )}

            {active.kind === 'UNION' && active.possibleTypes?.length > 0 && (
              <><p className={classes.section__label}>Possible Types</p>
              <div className={classes.unionPills}>
                {active.possibleTypes.map(pt => <button key={pt.name} className={classes.pill} onClick={() => go(pt.name)}>{pt.name}</button>)}
              </div></>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function GraphqlUI() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [phase, setPhase]               = useState('loading');
  const [schemaData, setSchemaData]     = useState(null);
  const [view, setView]                 = useState('graph');
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    setPhase('loading');
    setSchemaData(null);

    libraryService
      .getOpenApiFromStrapi(slug)
      .then(async (library) => {
        const { openDoc, openDocUrl } = library || {};
        const sdl = openDocUrl ? await fetch(openDocUrl).then(r => r.text()) : openDoc;
        if (!sdl) { setPhase('error'); return; }
        const schema   = buildSchema(sdl.trim());
        const { data } = graphqlSync({ schema, source: getIntrospectionQuery() });
        if (!data) throw new Error('GraphQL introspection returned no data');
        setSchemaData(data);
        setPhase('ready');
      })
      .catch(() => setPhase('error'));
  }, [slug]);

  const schemaInfo = useMemo(() => {
    if (!schemaData?.__schema) return null;
    const s = schemaData.__schema;
    const rootNames = new Set([s.queryType?.name, s.mutationType?.name, s.subscriptionType?.name].filter(Boolean));
    const types = s.types.filter(t => !BUILT_IN.has(t.name) && !t.name.startsWith('__'));
    return { types, rootNames, typeMap: Object.fromEntries(types.map(t => [t.name, t])) };
  }, [schemaData]);

  return (
    <div className={classes.page} style={{ paddingTop: '20px' }}>
      <div className={classes.header}>
        <div className={classes.return} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
          <Icon id='MdKeyboardBackspace' />
          <span>{t('GraphqlUI.back')}</span>
        </div>
        {phase === 'ready' && (
          <div className={classes.viewToggle}>
            <button className={`${classes.toggleBtn} ${view === 'graph'    ? classes.toggleBtn__active : ''}`} onClick={() => setView('graph')}>
              <Icon id='MdAccountTree' /> {t('GraphqlUI.graphView', 'Graph')}
            </button>
            <button className={`${classes.toggleBtn} ${view === 'explorer' ? classes.toggleBtn__active : ''}`} onClick={() => setView('explorer')}>
              <Icon id='MdList' /> {t('GraphqlUI.explorerView', 'Explorer')}
            </button>
          </div>
        )}
      </div>

      {phase === 'loading' && <SkeletonComponent />}
      {phase === 'error'   && <p className={classes.placeholder}>{t('GraphqlUI.noInfo')}</p>}
      {phase === 'ready'   && schemaInfo && view === 'graph'    && <SchemaGraph    schemaInfo={schemaInfo} selectedName={selectedName} onSelect={setSelectedName} />}
      {phase === 'ready'   && schemaInfo && view === 'explorer' && <SchemaExplorer schemaInfo={schemaInfo} selectedName={selectedName} onSelect={setSelectedName} />}
    </div>
  );
}

export default GraphqlUI;
