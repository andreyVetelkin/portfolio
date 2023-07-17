import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListMovie from "./pages/ListMovie";
import CurrentMov from "./pages/CurrentMov";
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import ToWatch from './pages/ToWatch';




function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    axios.get('https://645f589c9d35038e2d215010.mockapi.io/movie/movies')
    .then(response => {
      console.log(response.data);
      setData(response.data);
    })
    .catch(error => {
      console.error(error);
    })
  }, [])

  return (
    <>
    <Header/>
    <Container>
      <Routes>
        <Route path='/' element={<ListMovie data ={data} />}/>
        <Route path='/currentMovie/:movieName' element={<CurrentMov />}/>
        <Route path='/toWatch' element={<ToWatch />}/>
      </Routes>

    
    </Container>
    
    </>
  );
}

export default App;
