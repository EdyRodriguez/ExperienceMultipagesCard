// src/page/ServerlessApi.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button } from '@ellucian/react-design-system/core';
import { useData, useCardInfo, usePageControl } from '@ellucian/experience-extension-utils';

const styles = () => ({
  card: { margin: `0 ${spacing20}` },
  row: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: spacing20 },
  section: { marginTop: spacing20 },
  input: { padding: '8px', border: '1px solid #ccc', borderRadius: 6, minWidth: 300 },
  textarea: { padding: '8px', border: '1px solid #ccc', borderRadius: 6, width: '100%', minHeight: 140 },
  pre: { background: '#fafafa', padding: 10, borderRadius: 6, overflowX: 'auto' },
  badge: { fontSize: 12, padding: '2px 6px', borderRadius: 4, background: '#eef3ff', color: '#314cc9' }
});

// Adjust to your published API name if needed
const DEFAULT_API_NAME = 'Edy-Testing-API';
const DEFAULT_ACCEPT = 'application/vnd.hedtech.integration.v1+json';

function ServerlessApiPage({ classes, pageInfo }) {
  const { setPageTitle } = usePageControl();
  const { authenticatedEthosFetch } = useData();
  const cardInfo = useCardInfo() || {};

  useEffect(() => { setPageTitle('Serverless API'); }, [setPageTitle]);

  let cardIdFromPath = '';
if (typeof window !== 'undefined') {
  const parts = window.location.pathname.split('/');
  const i = parts.indexOf('card');
  cardIdFromPath = i >= 0 && parts[i + 1] ? decodeURIComponent(parts[i + 1]) : '';
}

  // Read from QUERY (?cardId=...)
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const qs = new URLSearchParams(search);
  const cardIdFromQS = qs.get('cardId');
  const cardPrefixFromQS = qs.get('cardPrefix');

  // Fallbacks: hook and pageInfo
  const cardIdFromHook = cardInfo.cardId;
  const effectiveCardId =
    cardIdFromPath ||
    cardIdFromQS ||
    cardIdFromHook ||
    pageInfo?.cardId ||
    pageInfo?.cardInstanceId ||
    pageInfo?.contextId ||
    '';

  const effectiveCardPrefix =
    cardPrefixFromQS ||
    cardInfo?.serverConfigContext?.cardPrefix ||
    pageInfo?.serverConfigContext?.cardPrefix ||
    '';

  const [apiName, setApiName] = useState(DEFAULT_API_NAME);
  const [method, setMethod] = useState('POST');
  const [accept, setAccept] = useState(DEFAULT_ACCEPT);
  const [payload, setPayload] = useState(JSON.stringify({ ping: 'ok' }, null, 2));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function callApi() {
    try {
      setLoading(true); setError(null); setResult(null);
      if (!apiName) throw new Error('Please enter the Serverless API name.');
      if (!effectiveCardId) console.warn('Missing cardId. Open this page from a pinned card.');

      // Build path: <apiName>?cardId=... [&cardPrefix=...]
      const q = new URLSearchParams();
      if (effectiveCardId) q.set('cardId', effectiveCardId);
      if (effectiveCardPrefix) q.set('cardPrefix', effectiveCardPrefix);
      const path = q.toString() ? `${apiName}?${q.toString()}` : apiName;
      console.debug('Calling Serverless API path:', path);

      const opts = { method, headers: { Accept: accept } };
      if (method !== 'GET' && method !== 'HEAD') {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = payload;
      }

      const resp = await authenticatedEthosFetch(path, opts);
      const text = await resp.text();
      let data; try { data = JSON.parse(text); } catch { data = text; }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${text}`);
      setResult(data);
    } catch (e) {
      console.error(e);
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.card}>
      <Typography variant="h2">Serverless API</Typography>

      {!effectiveCardId && (
        <div className={classes.section}>
          <span className={classes.badge}>Notice</span>{' '}
          <Typography variant="body2">
            No <code>cardId</code> detected. Open from a pinned card or navigate to <code>/serverless/card/&lt;cardId&gt;</code>.
          </Typography>
        </div>
      )}

      <div className={classes.row}>
        <input
          className={classes.input}
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          placeholder="API name (e.g., Edy-Testing-API)"
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
        <input
          className={classes.input}
          value={accept}
          onChange={(e) => setAccept(e.target.value)}
          placeholder="Accept (application/vnd.hedtech.integration.v1+json)"
        />
        <Button onClick={callApi} disabled={loading}>
          {loading ? 'Calling…' : 'Call API'}
        </Button>
      </div>

      {method !== 'GET' && method !== 'HEAD' && (
        <div className={classes.section}>
          <Typography variant="h4">Payload</Typography>
          <textarea
            className={classes.textarea}
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />
        </div>
      )}

      {error && (
        <Typography className={classes.section} style={{ color: 'crimson' }}>
          {error}
        </Typography>
      )}

      {result != null && (
        <div className={classes.section}>
          <Typography variant="h4">Response</Typography>
          <pre className={classes.pre}>
            {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

ServerlessApiPage.propTypes = {
  classes: PropTypes.object.isRequired,
  pageInfo: PropTypes.object
};

export default withStyles(styles)(ServerlessApiPage);
