const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  punchInTime: {
    type: Date,
    required: true,
  },
  punchOutTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
