const AttendanceModalNew = require("../models/attendance-modal-new");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/error-handler");
class AttendenceController {
  create = async (req, res, next) => {
    let { employeeID, checkin, chcekout, lateby, overtiming, remark } =
      req.body;
    if (
      !employeeID ||
      !checkin ||
      !chcekout ||
      !lateby ||
      !overtiming ||
      !remark
    )
      return next(ErrorHandler.badRequest("All Fields Required"));

    let attendance = {
      employeeID,
      checkin,
      chcekout,
      lateby,
      overtiming,
      remark,
    };
    const employeeAttendence = await AttendanceModalNew.create(attendance);
    if (!employeeAttendence)
      return next(ErrorHandler.serverError("Failed To Create The Attendence"));
    res.json({
      success: true,
      message: "Attendence Has Been saved successfully",
    });
  };
  update = async (req, res, next) => {
    let { _id, empid, checkin, checkout, lateby, overtiming, remark } =
      req.body;
    // console.log(req.body);
    if (!_id || !empid)
      return next(ErrorHandler.badRequest("All Fields Required"));
    const user = await AttendanceModalNew.findById({ _id: _id });
    if (!user) {
      return next(ErrorHandler.badRequest("No User Found"));
    }
    let attendance = {
      empid,
      checkin,
      checkout,
      lateby,
      overtiming,
      remark,
    };
    // console.log(attendance);
    const employeeAttendenceupdate = await AttendanceModalNew.findByIdAndUpdate(
      _id,
      attendance
    );
    if (!employeeAttendenceupdate)
      return next(ErrorHandler.serverError("Server error"));

    res.json({
      success: true,
      message: "Attendence Has Been updated successfully",
    });
  };
  find = async (req, res) => {
    const { date } = req.body;
    console.log(date);
    let allData = await AttendanceModalNew.find({ date: date }).populate(
      "employeeID"
    );
    if (!allData) {
      return next(ErrorHandler.serverError("Server error"));
    }
    res.send(allData);
  };
  findoneAttencences = async (req, res) => {
    const { date, id } = req.body;
    console.log(date);
    let allData = await AttendanceModalNew.find({
      $and: [{ employeeID: new mongoose.Types.ObjectId(id) }, { date: date }],
    }).populate("employeeID");
    if (!allData) {
      return next(ErrorHandler.serverError("Server error"));
    }
    res.send(allData);
  };
}

module.exports = new AttendenceController();
