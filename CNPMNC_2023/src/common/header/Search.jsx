import React, { useState } from "react";
import logo from "../../component/assets/logo.svg";
import user from "../../../public/images/search/user.png";
import edit from "../../../public/images/search/edit.png";
import logout from "../../../public/images/search/log-out.png";
import { Link } from "react-router-dom";

export const Search = ({ cartItem }) => {
  window.addEventListener("scroll", function () {
    const search = this.document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" id="searchString" placeholder="Tìm kiếm..." />
            <input type="submit" className="submit" value="Tìm kiếm" />
          </div>

          <div className="icon f_flex width">
            <div className="cart">
              <Link to="/cart/Cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{cartItem.length == 0 ? "" : cartItem.length}</span>
              </Link>
            </div>
            <div
              className="login"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <i className="fa fa-user icon-circle"></i>
            </div>
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <h3>Tuan Tuong</h3>
              <ul>
                <Link to="/profile/Profile">
                  <DropdownItem img={user} text={"Trang cá nhân"} />
                </Link>
                {/* <DropdownItem img={edit} text={"Edit Profile"} /> */}
                <DropdownItem img={logout} text={"Đăng xuất"} />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <img src={props.img} alt="" />
      <a href="">{props.text}</a>
    </li>
  );
}
