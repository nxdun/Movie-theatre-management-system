import "./ProductScreen.css";

const ProductScreen = () => {
    return (
        <div className="productscreen">
            <div className="productscreen__left">
                <div className="left__image">
                    <img src="https://www.fanplus.com/products/842-848.jpg" alt="product name" />
                    </div>
                    <div className="left__info">
                        <p className="left__name">Product 1</p>
                        <p>Price: $499.99</p>
                        <p>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                    </div>
                </div>
                <div className="productscreen__right">
                    <div className="right__info">
                        <p>
                            Price: <span>$499.99</span>
                        </p>
                        <p>
                            Status: <span>In Stock</span>
                        </p>
                        <p>
                            Qty
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </p>
                        <p>
                            <button type="button">Add To Cart</button>
                        </p>
                        </div>
                </div>
    </div>


    )    

};
export default ProductScreen;