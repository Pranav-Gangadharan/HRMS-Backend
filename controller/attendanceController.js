const Attendance = require("../model/Attendance");

exports.punchIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const punchInTime = new Date();

    const attendance = new Attendance({
      employeeId,
      punchInTime,
    });

    await attendance.save();

    res.status(201).json({ message: "Punched in successfully", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.punchOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const punchOutTime = new Date();

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, punchOutTime: null },
      { punchOutTime },
      { new: true }
    );

    res.status(200).json({ message: "Punched out successfully", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find().populate("employeeId");
    res.status(200).json(allAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
