import React, { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import { IPokemon } from 'pokeapi-typescript';
import PokemonCard from '../components/PokemonCard';
import { getPkmnBtwn } from '../service/pokemon';

function Home() {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pkmns, setPkmns] = useState<IPokemon[]>([]);
  const [showClearIcon, setShowClearIcon] = useState('none');
  const [pkmnsShown, setPkmnsShown] = useState<IPokemon[]>([]);

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
      setPkmns((prev) => {
        return prev.concat(pkmnDetails);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onScroll = (e: any) => {
    const bottom =
      e.target.documentElement.scrollHeight -
        e.target.documentElement.scrollTop ===
      e.target.documentElement.clientHeight;
    if (bottom && !loading) {
      setLoading(true);
      setOffset((prev) => prev + 10);
    }
    console.log(e.target.documentElement.scrollTop);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = event.target.value.toLowerCase();
    setShowClearIcon(searchTerm === '' ? 'none' : 'flex');
    setPkmnsShown(
      pkmns.filter((p) => p.name.toLowerCase().includes(searchTerm))
    );
  };
  const handleClick = () => {};

  useEffect(() => {
    getPkmnInfo(offset, 10);
  }, [offset]);

  useEffect(() => {
    setLoading(false);
    setPkmnsShown(pkmns);
  }, [pkmns]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className='App'>
      <FormControl>
        <TextField
          style={{ backgroundColor: 'white' }}
          size='small'
          variant='outlined'
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position='end'
                style={{ display: showClearIcon }}
                onClick={handleClick}
              >
                <ClearIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      {pkmnsShown.map((p) => (
        <PokemonCard pkmn={p}></PokemonCard>
      ))}
    </div>
  );
}

export default Home;
