export function formatCurrency(number) {
  // Sử dụng Intl.NumberFormat để định dạng số
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Loại bỏ phần thập phân
  });

  // Lấy chuỗi đã định dạng số
  const formattedNumber = formatter.format(number);

  // Loại bỏ khoảng trắng giữa số và đơn vị tiền tệ (₫)
  return formattedNumber.replace(/\s/g, "");
}
