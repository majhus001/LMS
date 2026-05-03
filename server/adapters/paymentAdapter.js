// adapters/paymentAdapter.js

// 🔹 Abstract Interface
class PaymentAdapter {
  async processPayment(amount, user) {
    throw new Error("processPayment() must be implemented");
  }
}

// 🔹 Mock Payment Adapter (for demo)
class MockPaymentAdapter extends PaymentAdapter {
  async processPayment(amount, user) {
    return {
      status: "success",
      transactionId: "TXN" + Date.now(),
      amount,
      user,
    };
  }
}

// 🔹 (Optional) Razorpay Adapter Example
/*
const Razorpay = require("razorpay");

class RazorpayAdapter extends PaymentAdapter {
  constructor() {
    super();
    this.instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }

  async processPayment(amount, user) {
    const order = await this.instance.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    return order;
  }
}
*/

module.exports = new MockPaymentAdapter();