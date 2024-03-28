export const VNPay = function () {
    this.pay = function (orderInfo) {
        document.getElementById("order_id").value = orderInfo.productListWithOrderId.order_id;
        const checkOutSubmit = document.getElementById("checkOutSubmit");
        checkOutSubmit.click();
    };
};
