const userService = require("../services/user-service");
const teamService = require("../services/team-service");
const ErrorHandler = require("../utils/error-handler");
const UserDto = require("../dtos/user-dto");
const TeamDto = require("../dtos/team-dto");
const querymodal = require("../models/customer-modal");
// findUsersCustomer
class LeaderController {
  getTeamMembers = async (req, res, next) => {
    const team = await teamService.findTeam({ leader: req.user._id });
    if (!team)
      return next(ErrorHandler.notFound("You are not leading any team"));
    const members = await userService.findUsers({ team: team._id });
    if (!members || members.length < 1)
      return next(
        ErrorHandler.notFound("We could not find any members in your team")
      );
    const data = members.map((o) => new UserDto(o));
    res.json({ success: true, message: "Members Found", data });
  };

  getTeam = async (req, res, next) => {
    const team = await teamService.findTeam({ leader: req.user._id });
    if (!team)
      return next(ErrorHandler.notFound("You are not leading any team"));
    const data = new TeamDto(team);
    res.json({ success: true, message: "Team Found", data });
  };
  getTeamMembersCustomer = async (req, res, next) => {
    const team = await teamService.findTeam({ leader: req.user._id });
    if (!team)
      return next(ErrorHandler.notFound("You are not leading any team"));
    const members = await querymodal
      .find({ leaderTeam: team._id })
      .populate("takeOverby");
    let f = await querymodal
      .find({ takeOverby: req.user._id })
      .populate("takeOverby");
    res.json({
      success: true,
      message: "Members Found",
      data: [...members, ...f],
    });
  };
}

module.exports = new LeaderController();
