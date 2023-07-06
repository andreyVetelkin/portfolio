import React from 'react';
import '../css/header.css';

function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="logo">золотой<br/>пояс</div>
                <nav>
                    <ul className="menu">
                        <li className="menu-item">
                            <button>
                                <div className="icon">
                                    <img className='icon-img' src="../img/catalog_icon.svg" alt="catalog" />
                                </div>
                                <div className="menu-item-info">
                                    <p>каталог продукции</p>
                                    <p className='gray-text'>300 наименований</p>  
                                </div>
                            </button>
                        </li>

                        <li className="menu-item">
                        <button>
                                <div className="icon">
                                    <img className='icon-img' src="../img/contact_icon.svg" alt="contact" />
                                </div>
                                <div className="menu-item-info">
                                    <p>связаться с нами</p>
                                    <p className='gray-text'>+7 (927) 133-33-37</p>  
                                </div>
                            </button>
                        </li>

                        <li className="menu-item">
                        <button>
                                <div className="icon">
                                    <img className='icon-img' src="../img/search_icon.svg" alt="search" />
                                </div>
                                <div className="menu-item-info">
                                    <p>поиск</p>
                                    <p className='gray-text'>по катологу</p>  
                                </div>
                            </button>
                        </li>

                        <li className="menu-item">
                            <button className='download-price-button'>
                                <div className="menu-item-info">
                                    <p>скачать прайс</p>
                                    <p className='gray-text'>PDF 15,MB</p>  
                                </div>
                                <img className='icon-img' src="../img/arrow.svg" alt="download price pdf" />
                            </button>
                        </li>
                    </ul>
                    <div className="menu-item">
                            <a href=""><div className="menu-icon"></div></a>
                    </div>
                </nav>
            </div>   
        </header>
    );
}

export default Header;