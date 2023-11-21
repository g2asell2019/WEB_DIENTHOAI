import OrderManager from "./Manager_Order/OrderManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const OrderAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header />
          <OrderManager/>
          
        </div>
        
      </div>
     
    </>
  );
};

export default OrderAdmin;
