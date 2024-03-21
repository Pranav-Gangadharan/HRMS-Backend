const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  salary: { type: Number, required: true },
  profilePicture: { type: String },
  role: { type: String, enum: ["employee", "admin"], default: "employee" },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
