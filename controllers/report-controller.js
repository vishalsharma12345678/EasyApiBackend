const mongoose = require("mongoose");
const reportModal = require("../models/report-modal");
const ErrorHandler = require("../utils/error-handler");

class DailyReport {
  create = (req, res, next) => {
    const { id, date, teamReport } = req.body;
    if (!id && !teamReport) {
      return next(ErrorHandler.badRequest("Please fill all data"));
    }
    const result = reportModal.create({
      employeeID: new mongoose.Types.ObjectId(id),
      date: date,
      teamReport: teamReport,
    });
    res.send({ success: true, message: "Report saved successfully" });
  };
  find = async (req, res, next) => {
    console.log(req.body);
    const { empid, date } = req.body;
    if (!empid) {
      return next(ErrorHandler.badRequest("Be a valid Login"));
    }
    if (!date) {
      return next(ErrorHandler.badRequest("date not be empty"));
    }
    const Leaderreport = await reportModal.findOne({
      employeeID: new mongoose.Types.ObjectId(empid),
      date: date,
    });
    if (!Leaderreport) {
      return next(ErrorHandler.badRequest("No report found"));
    }
    res.send({
      success: true,
      message: "Report saved successfully",
      report: Leaderreport,
    });
  };
  update = async (req, res, next) => {
    const { id, date, teamReport } = req.body;
    if (!id) {
      return next(ErrorHandler.badRequest("Be a valid Login"));
    }
    if (!date) {
      return next(ErrorHandler.badRequest("date not be empty"));
    }
    const oldReport = await reportModal.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!oldReport) {
      return next(ErrorHandler.badRequest("No Report found on this date"));
    }
    oldReport.teamReport = teamReport;
    console.log(oldReport.teamReport);
    const result = await oldReport.save();
    if (!result) {
      return next(ErrorHandler.badRequest("Report not updated"));
    }
    console.log(result);
    res.send({
      success: true,
      message: "Report saved successfully",
      result: result,
    });
  };
}

module.exports = new DailyReport();
