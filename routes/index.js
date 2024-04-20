var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');
var instance = new Razorpay({
  key_id: 'rzp_test_0ilqcWxtqhFQz4',
  key_secret: 'mlkMbtxdHJCS89VfGdX3cica',
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/create/orderId',function(req,res,next){
  var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send(order)
  });
})
router.post('/api/payment/verify', (req, res) => {
  try {
    var { validatePaymentVerification, validateWebhookSignature } =require('../node_modules/razorpay/dist/utils/razorpay-utils');

      const razorpayOrderId = req.body.response.razorpay_order_id;
      const razorpayPaymentId = req.body.response.razorpay_payment_id;
      const signature = req.body.response.razorpay_signature;
      const secret = 'mlkMbtxdHJCS89VfGdX3cica';

      const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
      res.send(result);
  } catch (error) {
      console.error('Error processing payment verification:', error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
