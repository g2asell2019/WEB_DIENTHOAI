import NavDropdown from 'react-bootstrap/NavDropdown';
 
export const NavbarAdmin = () => {
    return (
            <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
                <div className="flex-row d-flex">
                    <button type="button" className="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#" title="Free Bootstrap 4 Admin Template">Admin</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="collapsingNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Trang chủ <span className="sr-only">Trang chủ</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.facebook.com/nguyentuananh10082003/">Nguyễn Tuấn Anh</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#myAlert" data-toggle="collapse">Alert</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" data-target="#myModal" data-toggle="modal">About</a>
                        </li>
                        <li className="nav-item">
                  <a className="nav-link waves-effect waves-light text-white">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link waves-effect waves-light text-white">
                        <i className="fas fa-envelope-open-text"></i>
                    </a>
                  </li>
                
                  <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
  <NavDropdown title={<i className="fas fa-cogs"></i>} id="basic-nav-dropdown">
    <NavDropdown.Item href="#action/3.1"><i className="fas fa-user-circle mr-3"></i>Thông tin cá nhân</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.2"><i className="fas fa-key mr-3"style={{color:'brown'}}></i>Đổi mật khẩu</NavDropdown.Item>
  
    <NavDropdown.Divider />
    <NavDropdown.Item href="#action/3.4" ><i className="fas fa-sign-out-alt mr-3" style={{color:'red'}}></i>Đăng xuất</NavDropdown.Item>
  </NavDropdown>
</li>



                    </ul>
                </div>
       </nav>
    )
}
export default NavbarAdmin