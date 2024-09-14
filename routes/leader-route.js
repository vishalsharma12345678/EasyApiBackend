const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async-middleware");
const userController = require("../controllers/user-controller");
const teamController = require("../controllers/team-controller");
const leaderController = require("../controllers/leader-controller");
const upload = require("../services/file-upload-service");
const reportController = require("../controllers/report-controller");

router.patch(
  "/user",
  upload.single("profile"),
  asyncMiddleware(userController.updateUser)
); // Update Self Profile
router.get("/team", asyncMiddleware(leaderController.getTeam)); // Team
router.get("/team/members", asyncMiddleware(leaderController.getTeamMembers)); // Team Members
router.get(
  "/team/members/customer",
  asyncMiddleware(leaderController.getTeamMembersCustomer)
);
router.post("/team/createReport", reportController.create); // upload daily report
router.post("/team/findReport", reportController.find); // upload daily report
router.post("/team/updateReport", reportController.update); //getTeamMembersCustomer upload daily report

module.exports = router;
