var PaymentGate = function () {
    this.method = "";
};

PaymentGate.prototype = {
    setStrategy: function (method) {
        this.method = method;
    },

    pay: function (orderInfo) {
        return this.method.pay(orderInfo);
    }
};
export default PaymentGate;