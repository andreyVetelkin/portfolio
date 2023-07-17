import MovieCard from '../components/MovieCard';
import {  Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

function ListMovie({data}) {
  
  const [filters, setFilters] = useState({
    country: '',
    genre: '',
    director: '',
    ageRating: ''
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters, // Копируем предыдущее состояние 
      [name]: value // Меняем то что надо
    }));
  };

  const filteredMovies = data.filter((movie) => {
    return (
      (!filters.country || movie.country === filters.country) &&
      (!filters.genre || movie.genre.includes(filters.genre)) &&
      (!filters.director || movie.director === filters.director) &&
      (!filters.ageRating || movie.ageRating === filters.ageRating)
    );
  });


  return (
    <>
      <Grid sx={{my: 5}} container columns={12} spacing={2}>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Country</InputLabel>
            <Select name='country' value={filters.country} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="Russia">Russia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select name='genre' value={filters.genre} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Director</InputLabel>
            <Select name='director' value={filters.director} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Christopher Nolan">Christopher Nolan</MenuItem>
              <MenuItem value="Quentin Tarantino">Quentin Tarantino</MenuItem>
              <MenuItem value="Steven Spielberg">Steven Spielberg</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Age Rating</InputLabel>
            <Select name='ageRating' value={filters.ageRating} onChange={handleFilterChange}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="G">G</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="PG-13">PG-13</MenuItem>
              <MenuItem value="R">R</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container columns={12} spacing={2}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.title} data={movie} />
        ))}
      </Grid>
    </>
  );
}

export default ListMovie;