import { useCallback, useEffect, useState } from 'react';
import {
  createSerie,
  deleteSerie,
  getSeries,
  updateSerie,
} from '../api/seriesService';

const ERROR_MESSAGE =
  'Não foi possível conectar à API. Verifique se ela está em execução em ' +
  (import.meta.env.VITE_API_URL || 'http://localhost:5000') +
  '.';

/**
 * Hook responsável por buscar e manter em memória a lista de séries
 * vindas da API, além de expor as operações de criação, atualização e
 * remoção já sincronizadas com o estado local.
 */
export function useSeries() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSeries();
      setSeries(data);
    } catch (err) {
      console.error(err);
      setError(ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetchSeries é assíncrona; o setState ocorre após o await, não de forma síncrona no efeito.
    fetchSeries();
  }, [fetchSeries]);

  async function addSerie(payload) {
    const created = await createSerie(payload);
    setSeries((current) => [...current, created]);
    return created;
  }

  async function editSerie(payload) {
    const updated = await updateSerie(payload);
    setSeries((current) =>
      current.map((serie) => (serie.id === updated.id ? updated : serie))
    );
    return updated;
  }

  async function removeSerie(id) {
    await deleteSerie(id);
    setSeries((current) => current.filter((serie) => serie.id !== id));
  }

  return {
    series,
    loading,
    error,
    refetch: fetchSeries,
    addSerie,
    editSerie,
    removeSerie,
  };
}
