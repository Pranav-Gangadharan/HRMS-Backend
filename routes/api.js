const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Employee = require("../model/Employee");
const Client = require("../model/Client");
const authMiddleware = require("../middleware/authMiddleware.js");
const User = require("../model/User");
const attendanceController = require("../controller/attendanceController.js");

//Login
router.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route. Only authenticated users can access this.",
  });
});

//Create Employee
router.post("/employees", async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      designation,
      department,
      joiningDate,
      phoneNumber,
      salary,
      profilePicture,
      role,
    } = req.body;

    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new admin employee
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      userName,
      email,
      password: hashedPassword,
      designation,
      department,
      joiningDate,
      phoneNumber,
      salary,
      profilePicture,
      role,
    });
    await newEmployee.save();

    const newUser = new User({
      username: userName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get specific employee
router.get("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an employee
router.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const updatedEmployeeData = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedEmployeeData,
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an employee
router.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a client
router.post("/clients", async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Unable to create client" });
  }
});

// Read all clients
router.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch clients" });
  }
});

// Update a client
router.put("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Unable to update client" });
  }
});

// Delete a client
router.delete("/clients/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete client" });
  }
});

//attendanceRoutes

router.post("/attendance/punchin", attendanceController.punchIn);
router.post("/attendance/punchout", attendanceController.punchOut);
router.get("/attendance/", attendanceController.getAllAttendance);

module.exports = router;
