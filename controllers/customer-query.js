const ErrorHandler = require("../utils/error-handler");
const querymodal = require("../models/customer-modal");
const userModel = require("../models/user-model");
class CustomerQuery {
  create = async (req, res, next) => {
    console.log(req.body);
    let { name, email, phoneNumber, address, message } = req.body;
    if (!name || !email || !phoneNumber || !address || !message) {
      return next(ErrorHandler.badRequest("All Fields Required"));
    }
    let customer = await querymodal.findOne({ email: email });
    if (customer)
      return next(ErrorHandler.badRequest("Request Already Submitted"));
    let customerdata = await querymodal.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      message: message,
    });
    if (!customerdata) return next(ErrorHandler.badRequest("Server Error"));
    res.json({ success: true, message: "Request Submitted" });
  };
  update = async (req, res) => {
    const { Cid, empid } = req.body;
    if (!id) {
      return next(ErrorHandler.badRequest("Bad Request"));
    }
    const user = await userModel.findOne({ _id: empid });
    if (!user) return next(ErrorHandler.badRequest("Bad Request"));
    const customer = await querymodal.findOne({ _id: Cid });
    if (!customer) {
      return next(ErrorHandler.badRequest("No customer found"));
    }
    customer.takeOverby = empid;
    const result = await customer.save();
    if (!result) return next(ErrorHandler.badRequest("Customer No assign"));
    res.json({ success: true, message: "Customer Assigned" });
  };
}

module.exports = new CustomerQuery();
