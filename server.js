require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5500;
const schedule = require("node-schedule");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./configs/db-config");
const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");
const employeeRoute = require("./routes/employee-route");
const leaderRoute = require("./routes/leader-route");
const errorMiddleware = require("./middlewares/error-middleware");
const ErrorHandler = require("./utils/error-handler");
const { auth, authRole } = require("./middlewares/auth-middleware");
const userModel = require("./models/user-model");
const attendanceModalNew = require("./models/attendance-modal-new");
const reportModal = require("./models/report-modal");
const userService = require("./services/user-service");
const teamService = require("./services/team-service");
const app = express();

// Database Connection
dbConnection();

const { CLIENT_URL } = process.env;

//Cors Option
const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

//Configuration
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
const job = schedule.scheduleJob("51 13 * * *", async function (fireDate) {
  console.log(
    "This job was supposed to run at " +
      fireDate +
      ", but actually ran at " +
      new Date()
  );
  const users = await userModel.find({});
  const leaderusers = await userModel.find({ type: "leader" });

  Array.from(users).forEach(async (u, index) => {
    let userAttndenses = await attendanceModalNew.create({
      employeeID: u._id,
    });
  });
  Array.from(leaderusers).forEach(async (u, index) => {
    const team = await teamService.findTeam({ leader: u._id });
    const members = await userService.findUsers({ team: team._id });
    let teamreport = [];
    Array.from(members).forEach(async (member, index) => {
      let data = {
        name: member.name,
        report: "NA",
        empid: member._id,
      };
      teamreport.push(data);
    });
    let result = await reportModal.create({
      employeeID: u._id,
      teamReport: teamreport,
    });
  });
});
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
app.use("/api/auth", authRoute);
app.use("/api/admin", auth, authRole(["admin"]), adminRoute);
app.use("/api/employee", auth, authRole(["employee", "leader"]), employeeRoute);
app.use("/api/leader", auth, authRole(["leader"]), leaderRoute);

app.use("/storage", express.static("storage"));

//Middlewares;
app.use((req, res, next) => {
  return next(ErrorHandler.notFound("The Requested Resources Not Found"));
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Listening On Port : ${PORT}`));
