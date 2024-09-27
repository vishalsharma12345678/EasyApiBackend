const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerQuerySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  companyname: {
    type: String,
  },
  mcnumbers: {
    type: String,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  assiged: {
    type: Boolean,
    default: false,
  },
  leaderTeam: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
  },
  takeOverby: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("CustomerRequest", CustomerQuerySchema);
