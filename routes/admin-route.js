const router = require("express").Router();
const userController = require("../controllers/user-controller");
const teamController = require("../controllers/team-controller");
const upload = require("../services/file-upload-service");
const asyncMiddleware = require("../middlewares/async-middleware");
const attendenceController = require("../controllers/attendence-controller");
const reportController = require("../controllers/report-controller");
const ErrorHandler = require("../utils/error-handler");
const reportModal = require("../models/report-modal");
const queryController = require("../controllers/customer-query");
const mongoose = require("mongoose");
router.post(
  "/user",
  upload.single("profile"),
  asyncMiddleware(userController.createUser)
); // Create User
router.patch(
  "/user/:id",
  upload.single("profile"),
  asyncMiddleware(userController.updateUser)
); // Update User
router.post("/attendencefind", attendenceController.find);
router.post("/oneEmpattendence", attendenceController.findoneAttencences);
router.post("/attendenceUpdate", attendenceController.update);
router.post("/findReport", reportController.find);
router.get("/allcustomerAssiged", queryController.findallCustomer); // Admin
router.get("/alluserdata", asyncMiddleware(userController.getallUser)); // Admin

router.get("/employees", asyncMiddleware(userController.getUsers)); // Employees
router.get("/employees/free", asyncMiddleware(userController.getFreeEmployees)); // Free Employees
router.get("/employee/:id", asyncMiddleware(userController.getUser)); // Employee
router.get("/user/:id", asyncMiddleware(userController.getUserNoFilter)); // User - No Filter (Admin,Leader,Employee)
router.get("/admins", asyncMiddleware(userController.getUsers)); // Admins
router.get("/admin/:id", asyncMiddleware(userController.getUser)); // Admin

router.get("/leaders/free", asyncMiddleware(userController.getFreeLeaders)); // Free Leaders
router.get("/leaders", asyncMiddleware(userController.getLeaders)); // Leaders
router.get("/leader/:id", asyncMiddleware(userController.getUser)); // Leader
router.post("/team/findReport", async (req, res, next) => {
  const { empid, date } = req.body;
  if (!empid) {
    return next(ErrorHandler.badRequest("Be a valid Login"));
  }
  if (!date) {
    return next(ErrorHandler.badRequest("date not be empty"));
  }
  const Leaderreport = await reportModal.findOne({
    employeeID: new mongoose.Types.ObjectId(empid),
    date: date,
  });
  if (!Leaderreport) {
    return next(ErrorHandler.badRequest("No report found"));
  }
  res.send({
    success: true,
    message: "Report saved successfully",
    report: Leaderreport,
  });
});
router.post(
  "/team",
  upload.single("image"),
  asyncMiddleware(teamController.createTeam)
); // Create Team
router.patch(
  "/team/:id",
  upload.single("image"),
  asyncMiddleware(teamController.updateTeam)
); // Update Team
router.get("/teams", asyncMiddleware(teamController.getTeams)); // Teams
router.get("/team/:id", asyncMiddleware(teamController.getTeam)); // Team
router.get("/team/:id/members", asyncMiddleware(teamController.getTeamMembers)); // Team Members
router.patch("/team/member/add", asyncMiddleware(teamController.addMember)); // Add Team Member
router.patch(
  "/team/member/remove",
  asyncMiddleware(teamController.removeMember)
); // Remove Team Member
router.patch(
  "/team/leader/add",
  asyncMiddleware(teamController.addRemoveLeader)
); // Add Team Leader
router.patch(
  "/team/leader/remove",
  asyncMiddleware(teamController.addRemoveLeader)
); // Remove Team Leader
router.get("/counts", asyncMiddleware(teamController.getCounts)); // Counts
router.post(
  "/view-employee-attendance",
  asyncMiddleware(userController.viewEmployeeAttendance)
);
router.post(
  "/view-leave-applications",
  asyncMiddleware(userController.viewLeaveApplications)
);
router.post(
  "/assign-employee-salary",
  asyncMiddleware(userController.assignEmployeeSalary)
);
router.post(
  "/update-employee-salary/",
  asyncMiddleware(userController.updateEmployeeSalary)
);
router.post("/view-all-salary", asyncMiddleware(userController.viewSalary));
router.post(
  "/update-leave/:id",
  asyncMiddleware(userController.updateLeaveApplication)
);
router.post("/attendenceCreate", asyncMiddleware(attendenceController.create));

module.exports = router;
