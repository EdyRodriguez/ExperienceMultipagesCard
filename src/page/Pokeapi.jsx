
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button, TextField } from '@ellucian/react-design-system/core';
import { usePageControl } from '@ellucian/experience-extension-utils';

const styles = () => ({
  card: { margin: `0 ${spacing20}` },
  row: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end', marginTop: spacing20 },
  section: { marginTop: spacing20 },
  headerRow: { display: 'flex', gap: 16, alignItems: 'center', marginTop: spacing20 },
  table: { borderCollapse: 'collapse', maxWidth: 520 },
  td: { padding: '6px 10px', borderBottom: '1px solid #e0e0e0' }
});

function PokeApiPage({ classes }) {
  const { setPageTitle } = usePageControl();
  const [query, setQuery] = useState('pikachu');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef();

  useEffect(() => { setPageTitle('PokeAPI'); }, [setPageTitle]);

  const fetchPokemon = async (q) => {
    try {
      setLoading(true);
      setError(null);
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q.toLowerCase())}`,
        { signal: controller.signal }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      if (e.name !== 'AbortError') {
        setError(e.message || String(e));
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPokemon(query); }, []); // carga inicial

  const onSubmit = (e) => {
    e.preventDefault();
    fetchPokemon(query);
  };

  return (
    <div className={classes.card}>
      <Typography variant="h2">PokeAPI</Typography>

      <form className={classes.row} onSubmit={onSubmit}>
        <TextField
          label="Name o ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex. bulbasaur o 25"
        />
        <Button type="submit" disabled={loading}>Search</Button>
      </form>

      {loading && <Typography>Loading…</Typography>}
      {error && <Typography style={{ color: 'crimson' }}>{error}</Typography>}

      {data && (
        <>
          <div className={classes.headerRow}>
            {data.sprites?.front_default && (
              <img alt={data.name} src={data.sprites.front_default} width={96} height={96} />
            )}
            <div>
              <Typography variant="h3" style={{ textTransform: 'capitalize' }}>
                {data.name} #{data.id}
              </Typography>
              <Typography>Height: {data.height} | Weight: {data.weight}</Typography>
              <Typography>Types: {data.types?.map(t => t.type?.name).join(', ')}</Typography>
            </div>
          </div>

          <div className={classes.section}>
            <Typography variant="h4">Stats</Typography>
            <table className={classes.table}>
              <tbody>
                {data.stats?.map(s => (
                  <tr key={s.stat.name}>
                    <td className={classes.td}>{s.stat.name}</td>
                    <td className={classes.td}>{s.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={classes.section}>
            <Typography variant="h4">Abilities</Typography>
            <ul>
              {data.abilities?.map(a => <li key={a.ability.name}>{a.ability.name}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

PokeApiPage.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(PokeApiPage);
