require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const datasource = require("./datasource");
const service = require("./service");

app.get("/affiliate", (req, res) => res.send(datasource.affiliates
  .map(affiliate => { return { id: affiliate.id, name: affiliate.name } }))
)

app.get("/:affiliateId/availability/",
  (req, res) => {
    const affiliateId = req.params.affiliateId;
    const response = service.getAffiliateAvailability(affiliateId);

    res.send(response);
  }
)

app.get("/:affiliateId/availability/:date/slots",
  (req, res) => {
    const affiliateId = req.params.affiliateId;
    const date = req.params.date;
    const response = service.buildSlots(affiliateId, date);

    res.send(response);
  }
)

app.post("/appointment",
  (req, res) => {
    const body = {
      id: "2-99",
      affiliateId: 2,
      userId: 99,
      date: "24-05-2021",
      time: "14:00",
      status: "PENDING",
      userMessage: "This is a test appointment"
    }
    datasource.appointments.push(body)

    res.status(201).send("Created");
  }
)

app.get("/user/:userId/appointment",
  (req, res) => {
    const userId = req.params.userId;
    console.log(`Getting appointments for user ${userId}`)
    const appointments = datasource.appointments;
    const userAppointments = appointments.find(appointment => appointment.userId === parseInt(userId)) || []

    res.send({
      appointments: userAppointments
    });
  }
)

app.put("/user/:userId/appointment/:appointmentId",
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

app.get("/affiliate/:affiliateId/appointment",
  (req, res) => {
    const affiliateId = req.params.affiliateId;
    console.log(`Getting appointments for affiliate ${affiliateId}`)
    const appointments = datasource.appointments;
    const affiliateAppointments = appointments.find(appointment => appointment.affiliateId === parseInt(affiliateId)) || []

    res.send({
      appointments: affiliateAppointments
    });
  }
)

app.listen(port,
  () => console.log(`Server running on port ${port}`)
)