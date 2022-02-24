import React , {useEffect, useState} from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import products from "../../data/Products";

// ACTIONS
import { listProducts } from "../../Redux/Actions/ProductActions";

import Rating from "./Rating";
import Pagination from "./pagination";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";


const ShopSection = (props) => {
console.log("🚀 ~ file: ShopSection.js ~ line 18 ~ ShopSection ~ props", props);

  // const [products, setProducts] = useState([]);
  const { keyword , pagenumber} = props;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // const {loading , error, products: { products, page, pages} } = productList;

  //{loading: false, products: Array(3), pages: 2, page: 1}
   const {loading , error, products, pages, page} = productList;

  useEffect( ()=> {
    console.log("dispatch again", keyword);
    dispatch(listProducts(keyword, pagenumber));
  //  const fetchProducts = async()=> {
  //    const { data } = await axios.get('/api/products')
  //    const {products , page, pages}  = data;
  //    console.log("🚀 ~ fetchProducts ~ products , page, pages", products , page, pages);
  //    setProducts(products);
  //  };

  //  fetchProducts();
  },[dispatch, keyword, pagenumber] );

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading? (
                  <div className="mb-5">
                  <Loading />
                  </div>
                ): error? (<Message variant="alert-danger">{error}</Message>)
                : (
                  <>
                  {products &&  products.map((product) => (
                  <div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                      <Link to={`/products/${product._id}`}>
                        <div className="shopBack">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </Link>

                      <div className="shoptext">
                        <p>
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </p>

                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                        <h3>${product.price}</h3>
                      </div>
                    </div>
                  </div>
                ))}
                  </>
                )
                }
                {/* Pagination */}
                <Pagination  page={page} pages={pages} keyword={keyword? keyword : ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
