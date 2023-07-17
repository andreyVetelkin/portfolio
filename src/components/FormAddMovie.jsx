import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react';
import axios from 'axios';

export default function FormAddMovie({open, setOpen}) {
    const [movieData, setMovieData] = useState({});
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Остановить стандартное поведение отправки формы на сервер
  
    const formData = new FormData(event.target); // Получить данные формы
    const movie = {
        title: '',
        country: '',
        genre: '',
        director: '',
        budget: '',
        worldwideGross: '',
        ageRating: '',
        duration: '',
        releaseDate: '',
        posterUrl: '',
      }
    // Извлечь значения полей формы
    movie.title = formData.get('title');
    movie.genre = formData.get('genre');
    movie.country = formData.get('country');
    movie.director = formData.get('director');
    movie.budget = formData.get('budget');
    movie.worldwideGross = formData.get('worldwideGross');
    movie.ageRating = formData.get('ageRating');
    movie.duration = formData.get('duration');
    movie.releaseDate = formData.get('releaseDate');
    movie.posterUrl = formData.get('posterUrl');

    
console.log(movie);
    axios.post('https://645f589c9d35038e2d215010.mockapi.io/movie/movies', movie)
      .then(response => {
        console.log(`Объект успешно добавлен: ${response.data}`);
      })
      .catch(error => {
        console.error(`Ошибка при добавлении объекта: ${error}`);
      });


    console.log(movie);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавление нового фильма</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Заполните все поля, чтобы добавить фильм
          </DialogContentText>
          <Box component = 'form' onSubmit = {handleSubmit}>
          <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Название"
                type="text"
                fullWidth
                required
                name="title"
                />
          <TextField
                autoFocus
                margin="dense"
                id="genre"
                label="Жанр"
                type="text"
                fullWidth
                required
                name="genre"
                />
            <TextField
                margin="dense"
                id="country"
                label="Страна производства"
                type="text"
                fullWidth
                required
                name="country"
                />
                

                <TextField
                margin="dense"
                id="director"
                label="Режисер"
                type="text"
                fullWidth
                required
                name="director"
                />

                <TextField
                margin="dense"
                id="budget"
                label="Бюджет ($)"
                type="number"
                fullWidth
                required
                name="budget"
                />

                <TextField
                margin="dense"
                id="worldwideGross"
                label="Сборы мировые ($)"
                type="number"
                fullWidth
                required
                name="worldwideGross"
                />

                <TextField
                margin="dense"
                id="ageRating"
                label="Рейтинг возраста"
                type="text"
                fullWidth
                required
                name="ageRating"
                />

                <TextField
                margin="dense"
                id="duration"
                label="Длительность (мин.)"
                type="number"
                fullWidth
                required
                name="duration"
                />

                <TextField
                margin="dense"
                id="releaseDate"
                label="Дата выхода"
                type="date"
                required
                name="releaseDate"
                InputLabelProps={{
                    shrink: true,
                }}
                />

                <TextField
                margin="dense"
                id="posterUrl"
                label="URL постера"
                type="url"
                required
                name="posterUrl"
                />
                <Box>
                <Button  color = 'secondary' onClick={handleClose}>Отмена</Button>
                <Button color = 'secondary' type = 'submit'>Сохранить</Button>
                </Box>
                
            </Box>
        </DialogContent>

      </Dialog>
    </div>
  );
}
