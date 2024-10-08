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
const commonRoute = require("./routes/common-route");
const customerQuery = require("./controllers/customer-query");
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
  origin: [
    "http://localhost:3000",
    "https://easy-apifrontend.vercel.app",
    "http://162.240.148.212:3000",
    "http://usfrn.com:3000",
    "http://usfrn.com:5173",
    "https://usfrnllc.vercel.app/",
  ],
  credentials: true,
};

//Configuration
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// const job = schedule.scheduleJob("21 01 * * *", async function (fireDate) {
//   console.log(
//     "This job was supposed to run at " +
//       fireDate +
//       ", but actually ran at " +
//       new Date()
//   );
//   const users = await userModel.find({});
//   const leaderusers = await userModel.find({ type: "leader" });
//   let date = Date.now();
//   Array.from(users).forEach(async (u, index) => {
//     let userAttndenses = await attendanceModalNew.create({
//       employeeID: u._id,
//       date:
//         "24" +
//         "/" +
//         (new Date(date).getMonth() + 1) +
//         "/" +
//         new Date(date).getFullYear(),
//     });
//   });
//   date = Date.now();

//   // Array.from(leaderusers).forEach(async (u, index) => {
//   //   const team = await teamService.findTeam({ leader: u._id });
//   //   if (!team) return;
//   //   const members = await userService.findUsers({ team: team._id });
//   //   let teamreport = [];
//   //   let data = {
//   //     name: u.name,
//   //     report: "NA",
//   //     empid: u._id,
//   //   };
//   //   teamreport.push(data);
//   //   Array.from(members).forEach(async (member, index) => {
//   //     let data = {
//   //       name: member.name,
//   //       report: "NA",
//   //       empid: member._id,
//   //     };
//   //     teamreport.push(data);
//   //   });
//   //   let result = await reportModal.create({
//   //     employeeID: u._id,
//   //     date:
//   //       new Date(date).getDate() +
//   //       "/" +
//   //       (new Date(date).getMonth() + 1) +
//   //       "/" +
//   //       new Date(date).getFullYear(),
//   //     teamReport: teamreport,
//   //   });
//   //   console.log(result);
//   // });
// });

app.use("/api/auth", authRoute);
app.use(
  "/api/common",
  auth,
  authRole(["admin", "leader", "employee"]),
  commonRoute
);
app.use("/api/admin", auth, authRole(["admin"]), adminRoute);
app.use("/api/employee", auth, authRole(["employee", "leader"]), employeeRoute);
app.use("/api/leader", auth, authRole(["leader"]), leaderRoute);
app.post("/customer/create/record", customerQuery.create);
app.use("/storage", express.static("storage"));

//Middlewares;
app.use((req, res, next) => {
  return next(ErrorHandler.notFound("The Requested Resources Not Found"));
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Listening On Port : ${PORT}`));
