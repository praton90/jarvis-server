const express = require("express")
const router = express.Router();

const service = require("../service/appointment-service");

router.post("/",
  (req, res) => {

    //TODO: Validate request body
    service.saveAppointment(req.body)

    res.status(201).send("Created");
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

    res.send({
      appointments: userAppointments
    });
  }
)

router.put("/user/:userId/appointment/:appointmentId",
  (req, res) => {
    const userId = req.params.userId;
    const appointmentId = req.params.appointmentId;
    console.log(`Confirm appointment for user ${userId}`)
    const appointment = datasource.appointments.find(appointment => appointment.id === appointmentId)
    appointment.status = "CONFIRMED"

    res.send({
      appointment
    });
  }
)

module.exports = router;