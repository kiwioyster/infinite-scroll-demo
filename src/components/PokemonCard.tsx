import React from 'react';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { IPokemon } from 'pokeapi-typescript';

interface IProps {
  pkmn: IPokemon;
}

const PokemonCard: React.FC<IProps> = ({ pkmn }) => {
  const pkmnCard = (mon: IPokemon) => (
    <Card className='Card' sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {mon.name}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {mon.types.map((t) => (
              <p>{t.type.name}</p>
            ))}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image={mon.sprites.front_default}
        alt='Live from space album cover'
      />
    </Card>
  );

  return pkmnCard(pkmn);
};

export default PokemonCard;
