const ErrorHandler = require("../utils/error-handler");
const querymodal = require("../models/customer-modal");
const userModel = require("../models/user-model");
const mongoose = require("mongoose");
class CustomerQuery {
  create = async (req, res, next) => {
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
  create1 = async (req, res, next) => {
    let { name, email, phoneNumber, address, message, mcnumber, companyname } =
      req.body;
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
      mcnumber: mcnumber,
      companyname: companyname,
    });
    if (!customerdata) return next(ErrorHandler.badRequest("Server Error"));
    res.json({ success: true, message: "Request Submitted" });
  };
  deletecustomer = async (req, res, next) => {
    let { id } = req.params;
    const reult = await querymodal.findByIdAndDelete({ _id: id });
    if (!reult) return next(ErrorHandler.badRequest("server error"));
    res.json({ success: true, message: "Customer deleted" });
  };

  update = async (req, res, next) => {
    const { Cid, empid } = req.body;
    if (!Cid) {
      return next(ErrorHandler.badRequest("Bad Request"));
    }
    const user = await userModel.findOne({ _id: empid });
    if (!user) return next(ErrorHandler.badRequest("Bad Request"));
    const customer = await querymodal.findOne({
      _id: new mongoose.Types.ObjectId(Cid),
    });
    if (!customer) {
      return next(ErrorHandler.badRequest("No customer found"));
    }

    customer.takeOverby = empid;
    customer.assiged = true;
    customer.leaderTeam = user.team;
    const result = await customer.save();
    if (!result) return next(ErrorHandler.badRequest("Customer No assign"));
    // user.custumerAssiged.push({ Cid: result._id });

    let usersaved = await user.save();
    if (!usersaved) {
      const restore = await querymodal.deleteOne({ _id: result._id });
      if (!result) return next(ErrorHandler.badRequest("Customer No assign"));
    }
    res.json({ success: true, message: "Customer Assigned" });
  };
  message = async (req, res, next) => {
    const { message, cusid } = req.body;
    if (!cusid || !message) {
      return next(ErrorHandler.badRequest("All Fields Required"));
    }
    let result = await querymodal.findByIdAndUpdate(
      { _id: cusid },
      { message: message }
    );
    if (!result) {
      return next(ErrorHandler.badRequest("Message not updated"));
    } else {
      res.json({ success: true, message: "Customer updated" });
    }
  };
  intersted = async (req, res, next) => {
    console.log(req.body);
    let { name, email, phoneNumber, address, message, mcNumber } = req.body;
    if (!name || !email || !phoneNumber || !address || !message) {
      return next(ErrorHandler.badRequest("All Fields Required"));
    }
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) return next(ErrorHandler.badRequest("Bad Request"));
    let customer = await querymodal.findOne({ email: email });
    if (customer)
      return next(ErrorHandler.badRequest("Request Already Submitted"));
    let customerdata = await querymodal.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      message: message,
      mcnumbers: mcNumber,
      takeOverby: req.user._id,
      assiged: true,
      leaderTeam: user.team,
    });
    if (!customerdata) return next(ErrorHandler.badRequest("Server Error"));
    res.json({ success: true, message: "Customer Assigned" });
  };
  findoneEmployee = async (req, res, next) => {
    let id = req.user._id;
    if (!id) return next(ErrorHandler.badRequest("Clent Site Error"));
    let data = await querymodal.find({ takeOverby: id });
    if (!data) return next(ErrorHandler.badRequest("No data found for You"));
    return res.json({ success: true, data: data });
  };
  findallCustomer = async (req, res, next) => {
    let data = await querymodal.find({ assiged: true }).populate("takeOverby");
    if (!data) return next(ErrorHandler.badRequest("No data found for You"));
    return res.json({ success: true, data: data });
  };
}

module.exports = new CustomerQuery();
