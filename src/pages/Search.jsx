import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const Search = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setPokemonData(response.data);
    } catch (error) {
      setError('Pokemon not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h2">Search Page</Typography>
      <TextField
        label="Pokemon Name"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />
      <Button variant="contained" onClick={handleSearch} disabled={loading}>
        Search
      </Button>
      {loading && <Typography variant="body1">Loading...</Typography>}
      {error && <Typography variant="body1">{error}</Typography>}
      {pokemonData && (
        <div>
          <Typography variant="h4">{pokemonData.name}</Typography>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
};

export default Search;
