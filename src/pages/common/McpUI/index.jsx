import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Icon from '../../../components/MdIcon/Icon';
import Inspector from '../../../components/Inspector/Inspector';
import Section from '../../../components/Section/Section';
import mcpLibraryService from '../../../services/mcpLibraryService';
import { getMcpLibraryBySlug } from '../../../redux/actions/mcpLibraryAction';
import classes from './mcp-ui.module.scss';

function extractConfig(snippet) {
  if (!snippet) return null;
  if (snippet.command || snippet.url) return snippet;
  if (snippet.mcpServers) {
    const servers = Object.values(snippet.mcpServers);
    if (servers.length > 0) return servers[0];
  }
  if (snippet.servers) {
    const servers = Object.values(snippet.servers);
    if (servers.length > 0) return servers[0];
  }
  return null;
}

function McpUI() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mcpLibraryBySlug, loadingMcpLibraryBySlug } = useSelector((state) => state.mcpLibrary);

  const slug = params?.id || '';
  const [transport, setTransport] = useState('stdio');
  const [command, setCommand] = useState('');
  const [args, setArgs] = useState('');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState({});
  const [visibleHeaders, setVisibleHeaders] = useState({});
  const [mcpData, setMcpData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applyEntry = (entry) => {
    if (!entry) return;
    const tr = entry.transport || 'stdio';
    setTransport(tr);
    const cfg = extractConfig(entry.configSnippet);
    if (!cfg) return;
    if (tr === 'stdio') {
      setCommand(cfg.command || '');
      setArgs(Array.isArray(cfg.args) ? cfg.args.join(' ') : (cfg.args || ''));
    } else {
      setUrl(cfg.url || '');
      setHeaders(cfg.headers && typeof cfg.headers === 'object' ? cfg.headers : {});
    }
  };

  useEffect(() => {
    if (!params?.id) return;
    dispatch(getMcpLibraryBySlug(params.id));
  }, [params?.id]);

  useEffect(() => {
    if (mcpLibraryBySlug) applyEntry(mcpLibraryBySlug);
  }, [mcpLibraryBySlug]);

  const handleTransportChange = (e) => {
    const val = e.target.value;
    setTransport(val);
    const cfg = extractConfig(mcpLibraryBySlug?.configSnippet);
    if (!cfg) return;
    if (val === 'stdio') {
      setCommand(cfg.command || '');
      setArgs(Array.isArray(cfg.args) ? cfg.args.join(' ') : (cfg.args || ''));
    } else {
      setUrl(cfg.url || '');
      setHeaders(cfg.headers && typeof cfg.headers === 'object' ? cfg.headers : {});
    }
  };

  const handleConnect = async () => {
    if (!slug.trim()) return;
    setLoading(true);
    setError(null);
    setMcpData(null);
    setSelectedItem(null);
    try {
      const options = { transport };
      if (transport === 'stdio') {
        if (command.trim()) options.command = command.trim();
        if (args.trim()) options.args = args.trim().split(/\s+/).filter(Boolean);
      } else {
        if (url.trim()) options.url = url.trim();
        if (Object.keys(headers).length) options.headers = { ...headers };
      }
      const data = await mcpLibraryService.connectMcp(slug.trim(), options);
      if (data?.success === false) {
        throw new Error(data?.message || t('McpUI.connectionError'));
      }
      setMcpData(data);
    } catch (e) {
      setError(e?.message || t('McpUI.connectionError'));
    } finally {
      setLoading(false);
    }
  };

  const tools = mcpData?.tools || [];
  const resources = mcpData?.resources || [];
  const prompts = mcpData?.prompts || [];

  return (
    <div className={classes.root}>
      <div className={classes.topbar}>
        <button
          type="button"
          className={classes.back_btn}
          onClick={() => navigate(-1)}
        >
          <Icon id="MdArrowBack" />
          <span>{t('McpUI.back')}</span>
        </button>
      </div>

      <div className={classes.grid}>

        <div className={classes.col}>
          <h3 className={classes.col__title}>{t('McpUI.connectTitle')}</h3>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="mcp-transport">{t('McpUI.transport')}</label>
            <select
              id="mcp-transport"
              className={classes.input}
              value={transport}
              onChange={handleTransportChange}
            >
              <option value="stdio">STDIO</option>
              <option value="sse">SSE</option>
              <option value="http">Streamable HTTP</option>
            </select>
          </div>

          {transport === 'stdio' ? (
            <>
              <div className={classes.field}>
                <label className={classes.label} htmlFor="mcp-command">{t('McpUI.command')}</label>
                <input
                  id="mcp-command"
                  type="text"
                  className={classes.input}
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="npx, node, uvx..."
                />
              </div>
              <div className={classes.field}>
                <label className={classes.label} htmlFor="mcp-args">{t('McpUI.args')}</label>
                <input
                  id="mcp-args"
                  type="text"
                  className={classes.input}
                  value={args}
                  onChange={(e) => setArgs(e.target.value)}
                  placeholder="--arg1 --arg2 value"
                />
              </div>
            </>
          ) : (
            <>
              <div className={classes.field}>
                <label className={classes.label} htmlFor="mcp-url">URL</label>
                <input
                  id="mcp-url"
                  type="text"
                  className={classes.input}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://mcp-server.example.com/sse"
                />
              </div>
              <div className={classes.headers_box}>
                <span className={classes.headers_box__label}>Headers</span>
                {Object.keys(headers).length > 0 ? (
                  Object.keys(headers).map((key) => (
                    <div className={classes.field} key={key}>
                      <label className={classes.label} htmlFor={`mcp-header-${key}`}>{key}</label>
                      <div className={classes.input_wrap}>
                        <input
                          id={`mcp-header-${key}`}
                          type={visibleHeaders[key] ? 'text' : 'password'}
                          className={classes.input}
                          value={headers[key]}
                          onChange={(e) => setHeaders((prev) => ({ ...prev, [key]: e.target.value }))}
                        />
                        <button
                          type="button"
                          className={classes.toggle_btn}
                          onClick={() => setVisibleHeaders((prev) => ({ ...prev, [key]: !prev[key] }))}
                          aria-label={visibleHeaders[key] ? 'Hide' : 'Show'}
                        >
                          <Icon id={visibleHeaders[key] ? 'MdVisibilityOff' : 'MdVisibility'} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={classes.no_headers}>{t('McpUI.noHeadersConfigured')}</p>
                )}
              </div>
            </>
          )}

          <button
            type="button"
            className={classes.connect_btn}
            onClick={handleConnect}
            disabled={loading || loadingMcpLibraryBySlug || !slug.trim()}
          >
            <Icon id={loading ? 'MdSync' : 'MdLink'} />
            <span>{loading ? t('McpUI.loading') : t('McpUI.connect')}</span>
          </button>

          {error && <p className={classes.error_msg}>{error}</p>}
          {mcpData && !error && (
            <p className={classes.connected_hint}>{t('McpUI.connectedHint')}</p>
          )}
        </div>

        <div className={classes.col}>
          <h3 className={classes.col__title}>{t('McpUI.listTitle')}</h3>
          {mcpData ? (
            <>
              <Section
                title={t('McpUI.tools')}
                items={tools}
                type="tool"
                selectedItem={selectedItem}
                onSelect={setSelectedItem}
              />
              <Section
                title={t('McpUI.resources')}
                items={resources}
                type="resource"
                selectedItem={selectedItem}
                onSelect={setSelectedItem}
              />
              <Section
                title={t('McpUI.prompts')}
                items={prompts}
                type="prompt"
                selectedItem={selectedItem}
                onSelect={setSelectedItem}
              />
            </>
          ) : (
            <div className={classes.empty_state}>
              <Icon id="MdLockOutline" />
              <span>{t('McpUI.connectFirst')}</span>
            </div>
          )}
        </div>

        <div className={classes.col}>
          <h3 className={classes.col__title}>{t('McpUI.inspectorTitle')}</h3>
          {mcpData ? (
            <Inspector item={selectedItem} />
          ) : (
            <div className={classes.empty_state}>
              <Icon id="MdLockOutline" />
              <span>{t('McpUI.connectFirst')}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default McpUI;

