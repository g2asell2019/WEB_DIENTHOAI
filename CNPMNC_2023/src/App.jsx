import { useState } from "react";

import "./App.css";
import * as React from "react";
import { Header } from "./common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Pages } from "./pages/Pages";
import Data from "./component/flashDeals/Data";
import Sdata from "./component/shop/Sdata";
import { Cart } from "./pages/cart/Cart";
import { Footer } from "./common/footer/Footer";
import { ProductDetail } from "./pages/productdetail/ProductDetail";
import { Products } from "./pages/products/Products";
import PData from "./pages/phone/Pdata";
import { Phone } from "./pages/phone/Phone";
import { Order } from "./pages/cart/Order";
import { Login } from "./pages/login-signup/Login";
import { Signup } from "./pages/login-signup/Signup";
import { Profile } from "./pages/profile/Profile";
import { ProfileUpdate } from "./pages/profile/ProfileUpdate";
import { ChangePassword } from "./pages/profile/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IndexAdmin } from "../src/Admin/IndexAdmin";
import ProductAdmin from "./Admin/ProductAdmin";
import CategoriesAdmin from "./Admin/CategoriesAdmin";
import {  useEffect } from "react";
import OrderAdmin from "./Admin/OrderAdmin";
import BrandAdmin from "./Admin/BrandAdmin";
import { pageSearch } from "./common/header/pageSearch";
import OrderHistory from "./pages/profile/OrderHistory";
import OrderDetail from "./pages/profile/OrderDetail";
import { CartLogin } from "./pages/cart/CartLogin";
function App() {
  //step 1: fetch data from DB
  const { productItems } = Data;
  const { shopItems } = Sdata;
  const { phoneItems } = PData;
  const [cartItem, setCardItem] = useState([]);
  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItem));
  }, [cartItem]);

  
  



  const addToCart = (product) => {
    const productExit = cartItem.find((item) => item.id == product.id);

    if (productExit) {
      setCardItem(
        cartItem.map((item) =>
          item.id == product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCardItem([...cartItem, { ...product, qty: 1 }]);
    }
  };
  const itemDetail = (product) => {
    const productExist = productItem.find((item) => item.id == product.id);

    if (!productExist) {
      setProductItem([...productItem, product]);
    }
  };
  const decreaseQty = (product) => {
    const productExit = cartItem.find((item) => item.id == product.id);
    if (productExit.qty == 1) {
      setCardItem(cartItem.filter((item) => item.id != product.id));
    } else {
      setCardItem(
        cartItem.map((item) =>
          item.id == product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  const deleteProduct = (product) => {
    setCardItem(cartItem.filter((item) => item.id !== product.id));
  };
  

  return (
    <>
      <div>
        <Router>
          <Switch>
            <Route path="/admin/User" exact>
             
            
                 <IndexAdmin/>
              
            </Route>
            <Route path="/admin/product" exact>
             
            
                 <ProductAdmin/>
              
            </Route>
            <Route path="/admin/categories" exact>
             
            
             <CategoriesAdmin/>
          
        </Route>
        <Route path="/admin/orders" exact>
             
            
             <OrderAdmin/>
          
        </Route>
        <Route path="/admin/brand" exact>
             
            
             <BrandAdmin/>
          
        </Route>
        
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Switch>
        </Router>
      </div>

      <div>
        <Router>
        <Header cartItem={cartItem} />
          <Switch>
            <Route path="/" exact>
           

              <Pages
                productItems={productItems}
                addToCart={addToCart}
                itemDetail={itemDetail}
                shopItems={shopItems}
              />
            </Route>
            <Route path="/login-signup/Login" exact>
              <Login />
            </Route>
            <Route path="/login-signup/Signup" exact>
              <Signup />
            </Route>
            <Route path="/cart/Cart" exact>
              <Cart
                cartItem={cartItem}
                addToCart={addToCart}
                decreaseQty={decreaseQty}
                deleteProduct={deleteProduct}
                setCardItem={setCardItem}
              />
            </Route>
            <Route path="/cart-login" exact>
              <CartLogin
            
              
              />
            </Route>
            <Route path="/profile/Profile" exact>
              <Profile />
            </Route>
            <Route path="/profile/ProfileUpdate" exact>
              <ProfileUpdate />
            </Route>
            <Route path="/profile/ChangePassword" exact>
              <ChangePassword />
            </Route>
            <Route path="/cart/Checkout" exact>
              <Order
                cartItem={cartItem}
                addToCart={addToCart}
                decreaseQty={decreaseQty}
                deleteProduct={deleteProduct}
              />
            </Route>
            <Route path="/profile/OrderHistory" exact>
              
              <OrderHistory />
            
            </Route>
            <Route path="/profile/OrderDetail/:id_order" exact>
              <OrderDetail />
            </Route>






            <Route path="/productdetail/:id">
              <ProductDetail
                productItems={productItems}
                addToCart={addToCart}
              />
            </Route>
            <Route path="/products">
              <Products productItems={productItems} addToCart={addToCart} />
            </Route>
            <Route path="/phone/:id">
              <Phone phoneItems={phoneItems} addToCart={addToCart} />
            </Route>

            <Route path="/pageSearch" component={pageSearch} />
          </Switch>
          <Footer />

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </div>
    </>
  );
}

export default App;
