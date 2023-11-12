import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAllCategories} from "../../userService";
import { Buffer } from "buffer";


export const Categories = () => {
  const [arrCategories, setCategories] = useState([]);


  useEffect(() => {
    getAllCategoriesReact();
  }, []);


  const getAllCategoriesReact = async () => {
    let response = await getAllCategories("ALL");
    if (response && response.errcode === 0) {
      setCategories(response.categories);
    }
  };





  
 
  return (
    <>
      <div className="category">
     
        {arrCategories.map((value,index) => {
             let imageBase64='';
             if(value.image){
     
              
                imageBase64=Buffer.from(value.image,'base64').toString('binary');
             
     
           }
           console.log(imageBase64)
          let toPath;
          if (index+1 == 1) {
            toPath = "/phone";
          } else if (index+1 == 2) {
            toPath = "/phone";
          } else if (index+1 == 3) {
            toPath = "/laptop";
          } else if (index+1 == 4) {
            toPath = "/tablet";
          } else if (index+1 == 5) {
            toPath = "/watch";
          }

          return (
            <Link to={toPath} key={value.id}>
              <div className="box f_flex">
                <img src={imageBase64}  />
                <span>{value.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
