const repository = require("../repository/appointment-repository");

const getAppointments = (userId, affiliateId) => {
  if (userId != undefined) {
    console.log(`Getting appointments for user ${userId}`)
    return userAppointments = repository.getUserAppointments(userId);
  } else {
    console.log(`Getting appointments for affiliate ${affiliateId}`)
    return userAppointments = repository.getAffiliateAppointments(affiliateId);
  }
}

const getAffiliateAppointmentsByDate = (affiliateId, date) => repository.getAffiliateAppointmentsByDate(affiliateId, date)

const saveAppointment = appointment => repository.save(appointment)

const getAppointment = appointmentId => repository.getAppointment(appointmentId)

module.exports = {
  getAppointments,
  saveAppointment,
  getAffiliateAppointmentsByDate,
  getAppointment
}