import CategoriesManager from "./CRUD_Categories/CategoriesManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const CategoriesAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header />
          <CategoriesManager/>
          
        </div>
        
      </div>
     
    </>
  );
};

export default CategoriesAdmin;
