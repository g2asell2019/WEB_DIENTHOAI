import Dashboard from './Components/DashBoard';
import NavbarAdmin from './Components/NavbarAdmin';
import SidebarAdmin from './Components/SidebarAdmin';
import Tablene from "./CRUD_User/Tablene";
import UserManage from './CRUD_User/UserManage';

export const IndexAdmin=()=>{
 
            return(
          
           
              <div >
              <NavbarAdmin/>
              
             
             
              <div className="row container-fluid">
              <SidebarAdmin/>
             
               <div className="col row-offcanvas row-offcanvas-left">
              
              <UserManage/>
               
              
           </div>
          </div>  
      </div>  

            );

        

        }

export default IndexAdmin;