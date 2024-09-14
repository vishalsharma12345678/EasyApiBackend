const router = require("express").Router();
const customermodal = require("../models/customer-modal");
const customerQuery = require("../controllers/customer-query");

router.get("/customer/record", async (req, res) => {
  const data = await customermodal.find({ assiged: false });
  res.send(data);
});
router.get("/customer/record/findPersonlCus", customerQuery.findoneEmployee);
router.post("/customer/record/update", customerQuery.update);

module.exports = router;
