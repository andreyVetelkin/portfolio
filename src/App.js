
import './css/App.css';
import Header from './components/Header';
import Intro from './components/Intro';
import MainContentBox from './components/MainContentBox';
import SimilarProd from './components/SimilarProd';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header/>
      <main>
        <div className="main-card-container">
          <Intro/>
          <MainContentBox/>
        </div>
      </main>
      <SimilarProd/>
      <Footer/>
    </>
  );
}

export default App;
