const datasource = require("./../datasource");

const getUserAppointments = userId => datasource.appointments
  .filter(appointment => appointment.userId === parseInt(userId))

const getAffiliateAppointments = affiliateId => datasource.appointments
  .filter(appointment => appointment.affiliateId === parseInt(affiliateId))

const save = appointment => datasource.appointments.push(appointment);

module.exports = {
  getUserAppointments,
  getAffiliateAppointments,
  save
}
