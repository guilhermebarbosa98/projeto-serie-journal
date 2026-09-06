import api from './axiosInstance';

/**
 * Busca todas as séries cadastradas.
 * GET /series
 */
export async function getSeries() {
  const response = await api.get('/series');
  return response.data;
}

/**
 * Busca uma série específica pelo id.
 * GET /series/:id
 */
export async function getSerieById(id) {
  const response = await api.get(`/series/${id}`);
  return response.data;
}

/**
 * Cadastra uma nova série.
 * POST /series
 */
export async function createSerie(serie) {
  const response = await api.post('/series', serie);
  return response.data;
}

/**
 * Atualiza uma série existente. A API espera o objeto completo,
 * incluindo o id, no corpo da requisição.
 * PUT /series
 */
export async function updateSerie(serie) {
  const response = await api.put('/series', serie);
  return response.data;
}

/**
 * Remove uma série pelo id.
 * DELETE /series/:id
 */
export async function deleteSerie(id) {
  const response = await api.delete(`/series/${id}`);
  return response.data;
}
