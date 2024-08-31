const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  employeeID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: {
    type: String,
    required: true,
  },
  teamReport: [
    {
      empid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
      },
      report: {
        type: String,
        required: [true, "Report must not be empty"],
      },
    },
  ],
});

module.exports = mongoose.model("DailyReport", ReportSchema);
