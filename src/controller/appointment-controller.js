const express = require("express")
const router = express.Router();

const service = require("../service/appointment-service");

router.post("/",
  (req, res) => {

    //TODO: Validate request body
    service.saveAppointment(req.body)

    res.status(201).json({ result: "Created" });
  }
)

router.get("/",
  (req, res) => {
    const userId = req.query.userId;
    const affiliateId = req.query.affiliateId;

    if (userId === undefined && affiliateId === undefined) {
      res.json({ message: "userId or affiliateId must be provided" }).status(400);
      return;
    } else if (userId != undefined && affiliateId != undefined) {
      res.json({ message: "Only userId or affiliateId must be provided" }).status(400);
      return;
    }

    let userAppointments = service.getAppointments(userId, affiliateId);

    res.json({
      appointments: userAppointments
    });
  }
)

router.put("/:appointmentId",
  (req, res) => {
    const appointmentId = req.params.appointmentId;
    const appointment = service.getAppointment(appointmentId)
    console.log(`Confirm appointment for user ${appointment.userId}`)
    appointment.status = "CONFIRMED"
    res.json({
      appointment
    });

  }
)

module.exports = router;