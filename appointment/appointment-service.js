const repository = require("./appointment-repository");

const getAppointments = (userId, affiliateId) => {
  if (userId != undefined) {
    console.log(`Getting appointments for user ${userId}`)
    return userAppointments = repository.getUserAppointments(userId);
  } else {
    console.log(`Getting appointments for affiliate ${affiliateId}`)
    return userAppointments = repository.getAffiliateAppointments(affiliateId);
  }
}

const saveAppointment = appointment => repository.save(appointment)

module.exports = {
  getAppointments,
  saveAppointment
}