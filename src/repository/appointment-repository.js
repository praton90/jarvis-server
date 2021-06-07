const datasource = require("../datasource");

const getUserAppointments = userId => datasource.appointments
  .filter(appointment => appointment.userId === parseInt(userId))

const getAffiliateAppointments = affiliateId => datasource.appointments
  .filter(appointment => appointment.affiliateId === parseInt(affiliateId))

const getAffiliateAppointmentsByDate = (affiliateId, date) => datasource.appointments
  .filter(appointment => appointment.affiliateId === parseInt(affiliateId && appointment.date === date))

const getAppointment = appointmentId => datasource.appointments.find(appointment => appointment.id === appointmentId)

const save = appointment => datasource.appointments.push(appointment);

module.exports = {
  getUserAppointments,
  getAffiliateAppointments,
  save,
  getAffiliateAppointmentsByDate,
  getAppointment
}
