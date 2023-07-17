import MovieCard from '../components/MovieCard';
import { Divider, Grid,Box, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,Link,Paper ,Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';




export default function CurrentMov({params}) {
  const [movie, setMovie] = useState({});
  const {movieName} = useParams();

  useEffect(() => {
    axios
      .get('https://645f589c9d35038e2d215010.mockapi.io/movie/movies', {
        params: {
          title: movieName
        }
      })
      .then(response => {
        setMovie(prev => response.data[0]);
        console.log(response.data[0]);
      });
  }, []);

  return (
    <Grid container spacing={0} component="main" sx={{ height: '90vh', my:5 }}>
      <CssBaseline />
      {movie && (
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${movie.posterUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
      )}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography component="h1" variant="h5">
            {movie.title}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Жанр: ${movie.genre}`}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Страна: ${movie.country}`}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Режиссер: ${movie.director}`}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Бюджет: ${movie.budget}`}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Сборы: ${movie.worldwideGross}`}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Возрастной рейтинг: ${movie.ageRating}`}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Продолжительность: ${movie.duration} мин`}
          </Typography>
          <Typography component="p" variant="subtitle1">
            {`Дата выхода: ${new Date(movie.releaseDate).toLocaleDateString()}`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

