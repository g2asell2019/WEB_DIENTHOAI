import ProductManager from "./CRUD_Products/ProductManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const ProductAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header />
          <ProductManager/>
          
        </div>
        
      </div>
     
    </>
  );
};

export default ProductAdmin;
