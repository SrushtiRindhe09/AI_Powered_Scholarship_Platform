const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    provider: {
      type: String,
      required: [true, "Provider is required"],
    },
    amount: {
      type: String,
      required: [true, "Amount is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      default: "All",
    },
    maxIncome: {
      type: Number,
      required: [true, "Maximum income is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    field: {
      type: String,
      required: [true, "Field of study is required"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    // ADD THIS FIELD BELOW
    link: {
      type: String,
      required: [true, "Official application link is required"],
      default: "https://scholarships.gov.in/",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scholarship", scholarshipSchema);