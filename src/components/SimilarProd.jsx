import SimilarProdCard from "./SimilarProdCard";
import '../css/similarProd.css';
function SimilarProd() {
    return (
        <section className="section-similar">
            <div className="prod-container">
                <div className="section-title">
                    <h2 className="title">похожие товары</h2>
                </div>
                <div className="other-prods">
                    <SimilarProdCard/>
                    <SimilarProdCard/>
                    <SimilarProdCard/>
                </div>
            </div>
        </section>
    );
}

export default SimilarProd;