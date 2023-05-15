import axios from 'axios';
import { IPkmnListResponse } from '../definitions/api-response';

const PKMN_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

export const getPkmnById = async (id: number) => {
  try {
    const response = await fetch(`${PKMN_ENDPOINT}/${id}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getPkmnBtwn = (
  limit: number,
  offset?: number
): Promise<IPkmnListResponse> => {
  return axios
    .get(`${PKMN_ENDPOINT}?limit=${limit}&offset=${offset || 0}`)
    .catch((e) => console.error(e))
    .then((r) => r && r.data);
  // return fetch(`${PKMN_ENDPOINT}?limit=${limit}&offset=${offset || 0}`)
  //   .catch((e) => console.error(e))
  //   .then((r) => r && r.json());
};
