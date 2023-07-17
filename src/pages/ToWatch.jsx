import ListMovie from './ListMovie';
import { Grid, Typography } from '@mui/material';



export default function ToWatch() {
  const listToWatch = JSON.parse(localStorage.getItem('listToWatch')) || [];
  return (
    <>
      <Typography variant = 'h3' component = 'div'>Буду смотреть</Typography>
      <ListMovie data = {listToWatch} />
    </>
  );
}

