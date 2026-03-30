import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Icon from '../../../components/MdIcon/Icon';
import mcpLibraryService from '../../../services/mcpLibraryService';
import { getMcpLibraryBySlug } from '../../../redux/actions/mcpLibraryAction';
import Inspector from './Inspector';
import Section from './Section';
import classes from './mcp-ui.module.scss';

function extractConfig(snippet) {
  if (!snippet) return null;
  if (snippet.command || snippet.url) return snippet;
  if (snippet.mcpServers) {
    const servers = Object.values(snippet.mcpServers);
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
  const [token, setToken] = useState('');
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
        if (token.trim()) options.token = token.trim();
      }
      const data = await mcpLibraryService.connectMcp(slug.trim(), options);
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
              <div className={classes.field}>
                <label className={classes.label} htmlFor="mcp-token">{t('McpUI.token')}</label>
                <input
                  id="mcp-token"
                  type="password"
                  className={classes.input}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder={t('McpUI.tokenPlaceholder')}
                />
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

