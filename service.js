const moment = require("moment");

const datasource = require("./datasource");

const getDaysLeftInTheCurrentMonth = (daysAvailable) => {
  const endOfMonth = moment().clone().endOf('month');
  const now = moment().clone(), dates = [];

  while (now.isSameOrBefore(endOfMonth)) {
    if (daysAvailable.includes(now.day())) {
      dates.push(now.clone().format("DD-MM-YYYY"));
    }
    now.add(1, 'days');
  }

  return dates;
}

const buildSlots = (affiliateId, date) => {
  const unavailableSlots = getUnavailableSlots(affiliateId, date);
  const dayAvailability = getAffiliateDayAvailability(affiliateId, date);

  const slots = [];
  let nextSlot = moment().set({ "hour": dayAvailability.from, "minute": 0 });
  const lastPossibleSlot = moment().set({ "hour": dayAvailability.to, "minute": 0 })
    .subtract(dayAvailability.durationInMinutes, 'minutes');

  while (nextSlot.isBefore(lastPossibleSlot)) {
    if (!unavailableSlots.includes(nextSlot.format('kk:mm'))) {
      slots.push(nextSlot.clone().format('kk:mm'));
    }
    nextSlot = nextSlot.add(dayAvailability.durationInMinutes, 'minutes').add(dayAvailability.freeTimeBetweenSlotsInMinutes, 'minutes')
  }

  return slots;
}

const getUnavailableSlots = (affiliateId, date) => datasource.appointments
  .filter(appointment => appointment.affiliateId === parseInt(affiliateId)
    && appointment.date === date)
  .map(appointment => appointment.time);

const getAffiliateDayAvailability = (affiliateId, date) => {
  const affiliate = datasource.affiliates.find(affiliate => affiliate.id === affiliateId)

  const dateParts = date.split("-");
  const selectedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).getDay();
  const dayAvailability = affiliate.availability.find(availability => availability.day === selectedDate);

  // if (dayAvailability === undefined) {
  //   TODO: Handle error
  // }

  return {
    from: dayAvailability.from,
    to: dayAvailability.to,
    durationInMinutes: affiliate.slotDurationInMinutes,
    freeTimeBetweenSlotsInMinutes: affiliate.minutesBetweenSlots
  }

}

const getAffiliateAvailability = (affiliateId) => {
  const affiliate = datasource.affiliates
    .find(affiliate => affiliate.id === affiliateId);

  const daysAvailable = affiliate.availability
    .map(availability => availability.day);

  const daysInMonth = getDaysLeftInTheCurrentMonth(daysAvailable);

  return response = {
    affiliateId: affiliate.id,
    affiliateName: affiliate.name,
    availableDates: daysInMonth
  }
}

module.exports = {
  getAffiliateAvailability,
  buildSlots
}