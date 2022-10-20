const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "A job must have a company name"],
    unique: true,
    trim: true,
  },
  applicationStatus: {
    type: String,
    enum: ["applied", "intrested"],
    required: [
      true,
      "A job must have an application status, either 'applied' or 'intrested",
    ],
  },
  dateOfApplication: {
    type: Date,
    required: [true, "A job applied for must have a date"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
