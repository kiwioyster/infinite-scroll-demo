import { useEffect, useState } from 'react';
import { getPkmnBtwn } from '../service/pokemon';
import axios from 'axios';
import { IPokemon } from 'pokeapi-typescript';

export const usePkmns = (from: number, to: number): IPokemon[] => {
  const [pkmns, setPkmns] = useState<IPokemon[]>([]);
  useEffect(() => {
    getPkmnInfo(from, to);
  }, [from, to]);

  const getPkmnInfo = async (f: number, t: number) => {
    try {
      const pkmnList = await getPkmnBtwn(t, f);
      console.log(pkmnList);

      const pkmnDetails = await Promise.all(
        pkmnList.results.map(async (pkmn) => {
          const detail = await axios.get(pkmn.url).then((r) => r.data);
          return detail;
        })
      );
      setPkmns(pkmnDetails);
    } catch (e) {
      console.error(e);
    }
  };
  return pkmns;
};
