import { themvaogiohang } from "./themvaogiohang";
export  const handleAddCart = (data) => {
  const imageBuffer = Buffer.from(data.image, "base64").toString("binary");
  themvaogiohang({
    name: data.name,
    price: data.price,
    quantity: 1,
    image: imageBuffer,
    iduser: user.id,
    idproduct: data.id,
  });
};