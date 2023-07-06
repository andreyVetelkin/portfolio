import { useState } from 'react';
import '../css/MainContentBox.css';

function MainContentBox() {
    const [showDetails, setShowDetails] = useState(false);
    const [showComplite, setShowComplite] = useState(false);

    const toggleComplite = () => {
      setShowComplite(!showComplite);
    };
    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };

  return (
    <section className='content-container'>   
        <div className="card">
            <div className="images">
                <img src="img/image1.png" alt="Big Image" className="big-image" />
                <div className="small-images">
                <img src="img/image1.png" alt="Small Image 1" className="small-image" />
                <img src="img/image2.png" alt="Small Image 2" className="small-image" />
                <img src="img/image1.png" alt="Small Image 3" className="small-image" />
                <img src="img/image2.png" alt="Small Image 4" className="small-image" />
                </div>
            </div>
            <div className="content">
                <h2 className="product-title">Металлоформа КС 7.3</h2>
                <p className="product-articul">Артикул 454572409</p>
                <a href="#" className="price-button">Узнать цену</a>
                <p className="product-description">Стальная форма предназначается 
                для изготовления железобетонных стеновых колец марки КС 10.6 (Серия 3.900.1-14 Вып. №1; Серия 3.900-3 Вып. №7). 
                Кольца используются для строительства подземной части колодцев различных коммуникаций. <br /><br />
                Металлоформа может быть выполнена в двух вариантах. <br /><br />
                Первый вариант формы выполняется без поддона для стендового формования изделий. Эксплуатация данной формы предусматривает 
                её разбор до полного набора прочности бетона. <br /><br />
                Второй вариант формы выполняется с нижним кольцом в качестве поддона. Эксплуатация данной формы предусматривает 
                её разбор после полного набора прочности бетона.<br /><br />
                Форма круглых железобетонных стеновых колец марки КС 10.6 соответствует ГОСТ 25781-2018, ГОСТ 25878-2018, ГОСТ 27204-87.
                </p>

                <ul className="content-list">
                <li>
                    Детали и характеристики
                    <img onClick={toggleDetails} src="img/plus.svg" alt="" />
                </li>
                {showDetails && (
                        <li className="details-window animate-details">
                            <p>Lorem ipsum dolor sit amet consectetur, 
                                adipisicing elit. Quisquam fuga cum nostrum 
                                tempora eveniet rem sed nihil ratione pariatur 
                                necessitatibus.</p>
                        </li>
                    )}
                <li>
                    Комплектация 
                    <img onClick={toggleComplite} src="img/plus.svg" alt="" />
                </li>
                {showComplite && (
                        <li className="details-window animate-details">
                            <p>Lorem ipsum dolor sit amet consectetur, 
                                adipisicing elit. Quisquam fuga cum nostrum 
                                tempora eveniet rem sed nihil ratione pariatur 
                                necessitatibus.</p>
                        </li>
                    )}
                </ul>       
            </div>
        </div>
    </section>
  );
}

export default MainContentBox;
