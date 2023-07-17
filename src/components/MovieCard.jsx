import { useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import WatchedIcon from '@mui/icons-material/Visibility';
import ToWatchIcon from '@mui/icons-material/AddCircleOutline';
import { NavLink } from 'react-router-dom';

function MovieCard({data}) {


    const [watched, setWatched] = useState(localStorage.getItem(`${data.title}Watched`) === "true");
    const [toWatch, setToWatch] = useState(localStorage.getItem(`${data.title}ToWatch`) === "true");

    const handleWatchedClick = () => {
        
        setWatched(!watched);
        localStorage.setItem(`${data.title}Watched`, (!watched).toString());
        
    };

    const handleToWatchClick = () => {
        setToWatch(!toWatch);
        localStorage.setItem(`${data.title}ToWatch`, (!toWatch).toString());
        let listToWatch = JSON.parse(localStorage.getItem('listToWatch')) || []; // добавляем проверку на существование массива в localStorage и создаем новый пустой массив, если он не существует
        if (!toWatch) { // меняем условие на противоположное, чтобы добавлять элемент только если флаг toWatch равен false
            listToWatch.push(data);
            localStorage.setItem('listToWatch', JSON.stringify(listToWatch));
        }else {
          // Удаляем элемент с заданным названием из массива 
          listToWatch = listToWatch.filter(movie => movie.title !== data.title);
          localStorage.setItem('listToWatch', JSON.stringify(listToWatch));
        }
    };

    return (
        <Grid item xs={12} md={4}>
            <Card>
                <NavLink to={`/currentMovie/${data.title}`} style={{ textDecoration: 'none' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="350"
                            image={data.posterUrl}
                            alt={`${data.title} poster`}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {data.country}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </NavLink>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
                        <IconButton onClick={handleWatchedClick} color={watched ? "primary" : "default"}>
                            <WatchedIcon sx={{mr:2}} />
                            {watched &&'Просмотрено'}
                        </IconButton>
                        <IconButton onClick={handleToWatchClick} color={toWatch ? "primary" : "default"}>
                            <ToWatchIcon />
                        </IconButton>
                    </div>
                </Card>
        </Grid>
    );
}

export default MovieCard;