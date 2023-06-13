import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Listing = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const observer = useRef();

  const loadPokemonList = async (url) => {
    try {
      const response = await axios.get(url);
      setPokemonList((prevList) => [...prevList, ...response.data.results]);
      setNextPageUrl(response.data.next);
    } catch (error) {
      setError('Failed to fetch Pokemon list.');
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadPokemonList('https://pokeapi.co/api/v2/pokemon?limit=10');
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && nextPageUrl && !isFetching) {
        setIsFetching(true);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observer.current) {
      observer.current.observe(document.getElementById('observerElement'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [nextPageUrl, isFetching]);

  useEffect(() => {
    if (isFetching && nextPageUrl) {
      loadPokemonList(nextPageUrl);
    }
  }, [isFetching, nextPageUrl]);

  return (
    <div>
      <h2>Pokemon List</h2>
      <Grid container spacing={2} p={2}>
        {pokemonList.map((pokemon) => (
          <Grid item key={pokemon.name} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">{pokemon.name}</Typography>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                    .split('/')
                    .slice(-2)[0]}.png`}
                  alt={pokemon.name}
                  style={{ width: '80%', height: 'auto' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div id="observerElement" style={{ marginTop: '20px' }}></div>
    </div>
  );
};

export default Listing;
