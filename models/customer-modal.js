const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerQuerySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
  takeOverby: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("CustomerRequest", CustomerQuerySchema);
