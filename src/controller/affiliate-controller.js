const express = require("express")
const router = express.Router();

const service = require("../service/affiliate-service");

router.get("/", (req, res) => {
  console.log("Get affiliates")
  const affiliates = service.getAffiliates()
  res.json(affiliates)
})

router.get("/:affiliateId/availability/",
  (req, res) => {
    console.log("Get affiliate availability")
    const affiliateId = req.params.affiliateId;
    const response = service.getAffiliateAvailability(affiliateId);

    res.json(response);
  }
)

router.get("/:affiliateId/availability/:date/slots",
  (req, res) => {

    console.log("Build affiliate slots")
    const affiliateId = req.params.affiliateId;
    const date = req.params.date;
    const response = service.buildSlots(affiliateId, date);

    res.send(response);
  }
)

module.exports = router