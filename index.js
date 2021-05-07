require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const datasource = require("./datasource");
const service = require("./service");
const appointmentController = require("./appointment/appointment-controller");

app.use("/appointment", appointmentController);

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