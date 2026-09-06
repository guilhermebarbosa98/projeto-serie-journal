import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useSeries } from './useSeries';
import * as seriesService from '../api/seriesService';

vi.mock('../api/seriesService');

const mockSeries = [
  { id: 1, title: 'Dark', seasons: 3 },
  { id: 2, title: 'Fleabag', seasons: 2 },
];

describe('useSeries', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('busca as séries ao montar e atualiza loading corretamente', async () => {
    seriesService.getSeries.mockResolvedValue(mockSeries);

    const { result } = renderHook(() => useSeries());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.series).toEqual(mockSeries);
    expect(result.current.error).toBeNull();
    expect(seriesService.getSeries).toHaveBeenCalledTimes(1);
  });

  it('define uma mensagem de erro quando a busca falha', async () => {
    seriesService.getSeries.mockRejectedValue(new Error('network error'));

    const { result } = renderHook(() => useSeries());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/não foi possível conectar/i);
    expect(result.current.series).toEqual([]);
  });

  it('adiciona uma série ao estado local após addSerie', async () => {
    seriesService.getSeries.mockResolvedValue([]);
    const novaSerie = { id: 10, title: 'Chernobyl', seasons: 1 };
    seriesService.createSerie.mockResolvedValue(novaSerie);

    const { result } = renderHook(() => useSeries());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addSerie({ title: 'Chernobyl', seasons: 1 });
    });

    expect(result.current.series).toEqual([novaSerie]);
  });

  it('atualiza uma série existente no estado local após editSerie', async () => {
    seriesService.getSeries.mockResolvedValue(mockSeries);
    const atualizado = { id: 1, title: 'Dark (revisto)', seasons: 3 };
    seriesService.updateSerie.mockResolvedValue(atualizado);

    const { result } = renderHook(() => useSeries());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.editSerie(atualizado);
    });

    expect(result.current.series.find((s) => s.id === 1)).toEqual(atualizado);
    expect(result.current.series).toHaveLength(2);
  });

  it('remove uma série do estado local após removeSerie', async () => {
    seriesService.getSeries.mockResolvedValue(mockSeries);
    seriesService.deleteSerie.mockResolvedValue({ message: 'ok' });

    const { result } = renderHook(() => useSeries());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.removeSerie(1);
    });

    expect(result.current.series).toEqual([{ id: 2, title: 'Fleabag', seasons: 2 }]);
  });
});
