import { describe, it, expect, vi } from 'vitest';
import api from './axiosInstance';
import {
  getSeries,
  getSerieById,
  createSerie,
  updateSerie,
  deleteSerie,
} from './seriesService';

vi.mock('./axiosInstance');

describe('seriesService', () => {
  it('getSeries faz GET em /series e retorna os dados', async () => {
    api.get = vi.fn().mockResolvedValue({ data: [{ id: 1 }] });
    const result = await getSeries();
    expect(api.get).toHaveBeenCalledWith('/series');
    expect(result).toEqual([{ id: 1 }]);
  });

  it('getSerieById faz GET em /series/:id', async () => {
    api.get = vi.fn().mockResolvedValue({ data: { id: 5 } });
    const result = await getSerieById(5);
    expect(api.get).toHaveBeenCalledWith('/series/5');
    expect(result).toEqual({ id: 5 });
  });

  it('createSerie faz POST em /series com o corpo informado', async () => {
    const payload = { title: 'Dark' };
    api.post = vi.fn().mockResolvedValue({ data: { id: 1, ...payload } });
    const result = await createSerie(payload);
    expect(api.post).toHaveBeenCalledWith('/series', payload);
    expect(result).toEqual({ id: 1, title: 'Dark' });
  });

  it('updateSerie faz PUT em /series com o objeto completo', async () => {
    const payload = { id: 1, title: 'Dark (revisto)' };
    api.put = vi.fn().mockResolvedValue({ data: payload });
    const result = await updateSerie(payload);
    expect(api.put).toHaveBeenCalledWith('/series', payload);
    expect(result).toEqual(payload);
  });

  it('deleteSerie faz DELETE em /series/:id', async () => {
    api.delete = vi.fn().mockResolvedValue({ data: { message: 'ok' } });
    const result = await deleteSerie(3);
    expect(api.delete).toHaveBeenCalledWith('/series/3');
    expect(result).toEqual({ message: 'ok' });
  });
});
