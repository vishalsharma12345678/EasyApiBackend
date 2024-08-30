const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchemanew = new Schema({
  employeeID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  checkin: {
    type: String,
    default: "NA",
  },
  checkout: {
    type: String,
    default: "NA",
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  lateby: {
    type: String,
    default: "NA",
  },
  overtiming: {
    type: String,
    default: "NA",
  },
  remark: {
    type: String,
    default: "NA",
    enum: ["NA", "Absent", "Present", "Leave"],
  },
  present: { type: Boolean, default: false },
});

module.exports = mongoose.model("Attendancecheckin", AttendanceSchemanew);
