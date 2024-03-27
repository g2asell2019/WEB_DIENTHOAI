export const themvaogiohang = async (data) => {
  try {
    const response = await CreateCart(data);
    if (response && response.errcode !== 0) {
      toast.error("Thêm giỏ hàng thất bại !");
      alert(response.errMessage);
    } else {
      toast.success("Thêm giỏ hàng thành công !");
    }
  } catch (e) {
    console.log(e);
  }
};