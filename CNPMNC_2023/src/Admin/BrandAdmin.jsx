import BrandManager from "./CRUD_Brand/BrandManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const BrandAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header />
          <BrandManager/>
          
        </div>
        
      </div>
     
    </>
  );
};

export default BrandAdmin;
