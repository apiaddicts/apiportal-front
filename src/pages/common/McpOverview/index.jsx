import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Icon from '../../../components/MdIcon/Icon';
import CustomMarkdown from '../../../components/CustomMarkdown';
import CardResource from '../../../components/Card/CardResource';
import Ratings from '../../../components/Ratings';
import CommandModal from '../../../components/Modal/CommandModal';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import { getMcpLibraryBySlug } from '../../../redux/actions/mcpLibraryAction';
import classes from './mcp-overview.module.scss';

function mergeHeadersIntoCfg(cfg, hdrs) {
  if (cfg.mcpServers) {
    const serverName = Object.keys(cfg.mcpServers)[0];
    if (serverName) cfg.mcpServers[serverName].headers = { ...hdrs };
  } else if (cfg.servers) {
    const serverName = Object.keys(cfg.servers)[0];
    if (serverName) cfg.servers[serverName].headers = { ...hdrs };
  } else {
    cfg.headers = { ...hdrs };
  }
}

function extractHeadersFromCfg(cfg) {
  if (cfg.mcpServers) {
    const serverName = Object.keys(cfg.mcpServers)[0];
    return cfg.mcpServers[serverName]?.headers || null;
  }
  if (cfg.servers) {
    const serverName = Object.keys(cfg.servers)[0];
    return cfg.servers[serverName]?.headers || null;
  }
  return cfg.headers || null;
}

function McpOverview({ mcpLibrary: mcpLibraryProp, liveSession: liveSessionProp, tryOutUrl: tryOutUrlProp }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [vsCodeCopied, setVsCodeCopied] = useState(null);

  const { mcpLibraryBySlug, loadingMcpLibraryBySlug, liveSession: liveSessionStore } = useSelector(
    (state) => state.mcpLibrary,
  );

  const isStandalone = !mcpLibraryProp;
  const mcpLibrary = mcpLibraryProp ?? mcpLibraryBySlug;
  const liveSession = liveSessionProp !== undefined ? liveSessionProp : liveSessionStore;
  const slug = params?.id || mcpLibrary?.slug || '';
  const tryOutUrl = tryOutUrlProp ?? `/frame/mcps/${slug}/ui`;

  useEffect(() => {
    if (isStandalone && params?.id) {
      dispatch(getMcpLibraryBySlug(params.id));
    }
  }, [params?.id]);

  if (isStandalone && (loadingMcpLibraryBySlug || !mcpLibrary)) return <SkeletonComponent />;
  if (!mcpLibrary || Object.keys(mcpLibrary).length === 0) return null;

  const isLiveSessionActive = liveSession !== null && liveSession?.slug === mcpLibrary?.slug;

  const strapiTools = mcpLibrary?.tools || [];
  const strapiResources = mcpLibrary?.resources || [];
  const strapiPrompts = mcpLibrary?.prompts || [];
  const hasStrapiData = strapiTools.length > 0 || strapiResources.length > 0 || strapiPrompts.length > 0;

  const liveTools = isLiveSessionActive ? (liveSession.tools || []) : [];
  const liveResources = isLiveSessionActive ? (liveSession.resources || []) : [];
  const livePrompts = isLiveSessionActive ? (liveSession.prompts || []) : [];
  const hasLiveData = liveTools.length > 0 || liveResources.length > 0 || livePrompts.length > 0;

  const liveTotal = liveTools.length + liveResources.length + livePrompts.length;
  const strapiTotal = strapiTools.length + strapiResources.length + strapiPrompts.length;
  const useLiveData = isLiveSessionActive && hasLiveData && liveTotal >= strapiTotal;

  const effectiveTools = useLiveData ? liveTools : strapiTools;
  const effectiveResources = useLiveData ? liveResources : strapiResources;
  const effectivePrompts = useLiveData ? livePrompts : strapiPrompts;
  const hasCapabilities = effectiveTools.length > 0 || effectiveResources.length > 0 || effectivePrompts.length > 0;

  const hasAnyRating =
    !!mcpLibrary?.ratings?.globalRating ||
    !!mcpLibrary?.ratings?.definitionRating ||
    !!mcpLibrary?.ratings?.securityRating ||
    !!mcpLibrary?.ratings?.qualityRating;

  const effectiveConfigSnippet = (() => {
    if (!mcpLibrary?.configSnippet) return null;
    if (!isLiveSessionActive || !liveSession.headers || Object.keys(liveSession.headers).length === 0) {
      return mcpLibrary.configSnippet;
    }
    try {
      const cfg = typeof mcpLibrary.configSnippet === 'string'
        ? JSON.parse(mcpLibrary.configSnippet)
        : structuredClone(mcpLibrary.configSnippet);
      mergeHeadersIntoCfg(cfg, liveSession.headers);
      return cfg;
    } catch {
      return mcpLibrary.configSnippet;
    }
  })();

  const maskedConfigSnippet = (() => {
    if (!effectiveConfigSnippet) return null;
    try {
      const cfg = typeof effectiveConfigSnippet === 'string'
        ? JSON.parse(effectiveConfigSnippet)
        : structuredClone(effectiveConfigSnippet);
      const existingHeaders = extractHeadersFromCfg(cfg);
      if (existingHeaders && Object.keys(existingHeaders).length > 0) {
        const masked = Object.fromEntries(
          Object.entries(existingHeaders).map(([k, v]) => [k, '•'.repeat(String(v).length || 8)]),
        );
        mergeHeadersIntoCfg(cfg, masked);
      }
      return cfg;
    } catch {
      return effectiveConfigSnippet;
    }
  })();

  return (
    <>
      {hasAnyRating && (
        <section className={`container ${classes.section__content} ${classes.section__ratings}`}>
          <Ratings
            ratings={mcpLibrary.ratings}
            title={t('McpDetail.globalGradesTitle')}
            subtitle={t('McpDetail.globalGradesSubtitle')}
            labels={{
              globalRating: t('McpDetail.ratingGlobal'),
              definitionRating: t('McpDetail.ratingDefinition'),
              securityRating: t('McpDetail.ratingSecurity'),
              qualityRating: t('McpDetail.ratingQuality'),
            }}
          />
        </section>
      )}

      <section className={`container ${classes.section__content} ${classes.section__three_cols}`}>
        {!isLiveSessionActive && !hasStrapiData && (
          <div className={classes.connect__notice}>
            <Icon id='MdInfoOutline' />
            <span>{t('McpDetail.connectToSeeCapabilities')}</span>
          </div>
        )}
        <div className={classes.three_cols__grid}>

          <div className={classes.three_cols__col}>
            <h3 className={classes.three_cols__col__title}>
              {t('McpDetail.technicalSetupTitle')}
            </h3>
            {mcpLibrary?.configSnippet ? (
              <>
                <pre className={classes.three_cols__code}>
                  <code className="language-json">
                    {typeof maskedConfigSnippet === 'string'
                      ? maskedConfigSnippet
                      : JSON.stringify(maskedConfigSnippet, null, 2)}
                  </code>
                </pre>
                <button
                  type='button'
                  className={classes.three_cols__vscode_btn}
                  onClick={() => {
                    try {
                      const cfg = typeof effectiveConfigSnippet === 'string'
                        ? JSON.parse(effectiveConfigSnippet)
                        : effectiveConfigSnippet;
                      const servers = cfg?.mcpServers || cfg?.servers || {};
                      const [serverName, serverConfig] = Object.entries(servers)[0] || [mcpLibrary.slug, cfg];
                      const payload = { name: serverName, ...serverConfig };
                      const vsCodeUrl = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(payload))}`;
                      globalThis.location.href = vsCodeUrl;
                    } catch {
                      const jsonStr = JSON.stringify(mcpLibrary.configSnippet);
                      const escaped = jsonStr.replaceAll('"', String.raw`\"`);
                      const cmd = `code --add-mcp "${escaped}"`;
                      navigator.clipboard.writeText(cmd).then(() => setVsCodeCopied(cmd));
                    }
                  }}
                >
                  <Icon id='MdCode' />
                  <span>{t('McpDetail.addToVsCode')}</span>
                </button>
              </>
            ) : (
              <div className={classes.three_cols__placeholder}>
                {t('McpDetail.noConfigSnippet')}
              </div>
            )}
          </div>

          <div className={classes.three_cols__col}>
            <h3 className={classes.three_cols__col__title}>
              {t('McpDetail.descriptionTitle')}
            </h3>
            {mcpLibrary?.markdown && mcpLibrary.markdown.length > 0 ? (
              <div className={`markdown__content ${classes.three_cols__markdown}`}>
                <CustomMarkdown content={mcpLibrary.markdown} />
              </div>
            ) : (
              <div className={classes.three_cols__placeholder}>
                {t('McpDetail.noDescription')}
              </div>
            )}
          </div>

          <div className={classes.three_cols__col}>
            <h3 className={classes.three_cols__col__title}>
              {t('McpDetail.capabilitiesTitle')}
            </h3>
            {hasCapabilities ? (
              <div className={classes.resources__list}>
                {effectiveTools.length > 0 && (
                  <>
                    <p className={classes.capabilities__group_label}>{t('McpDetail.toolsLabel')}</p>
                    {effectiveTools.map((tool, i) => (
                      <CardResource key={tool?.name || i} resource={tool} type="tool" />
                    ))}
                  </>
                )}
                {effectiveResources.length > 0 && (
                  <>
                    <p className={classes.capabilities__group_label}>{t('McpDetail.resourcesLabel')}</p>
                    {effectiveResources.map((res, i) => (
                      <CardResource key={res?.uri || res?.id || i} resource={res} type="resource" />
                    ))}
                  </>
                )}
                {effectivePrompts.length > 0 && (
                  <>
                    <p className={classes.capabilities__group_label}>{t('McpDetail.promptsLabel')}</p>
                    {effectivePrompts.map((prompt, i) => (
                      <CardResource key={prompt?.name || i} resource={prompt} type="prompt" />
                    ))}
                  </>
                )}
              </div>
            ) : isLiveSessionActive ? (
              <div className={classes.three_cols__placeholder}>
                {t('McpDetail.noCapabilitiesFound')}
              </div>
            ) : (
              <div className={classes.three_cols__placeholder}>
                {t('McpDetail.connectToSee')}
              </div>
            )}
          </div>
        </div>

        <div className={classes.three_cols__actions}>
          {mcpLibrary.reportUrl && (
            <button
              type='button'
              className={classes.three_cols__action_btn}
              onClick={() => window.open(mcpLibrary.reportUrl, '_blank', 'noopener,noreferrer')}
            >
              <Icon id='MdDownload' />
              <span>{t('McpDetail.downloadReport')}</span>
            </button>
          )}
          <button
            type='button'
            className={`${classes.three_cols__action_btn} ${classes.three_cols__action_btn__primary}`}
            onClick={() => navigate(tryOutUrl)}
          >
            <Icon id='MdPlayArrow' />
            <span>{t('McpDetail.tryOut')}</span>
          </button>
        </div>
      </section>

      <CommandModal isOpen={!!vsCodeCopied} onClose={() => setVsCodeCopied(null)}>
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#222', margin: 0 }}>{t('McpDetail.commandCopied')}</p>
        <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{t('McpDetail.openTerminalPaste')}</p>
        <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1rem 1.2rem', fontSize: '0.78rem', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>{vsCodeCopied}</pre>
        <button
          type='button'
          className={classes.three_cols__vscode_btn}
          onClick={() => navigator.clipboard.writeText(vsCodeCopied)}
        >
          {t('McpDetail.copyAgain')}
        </button>
      </CommandModal>
    </>
  );
}

export default McpOverview;
