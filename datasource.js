const appointments = [{
  id: "1-99",
  affiliateId: 1,
  userId: 99,
  date: "21-05-2021",
  time: "14:00",
  status: "PENDING",
  userMessage: "This is a test appointment"
}]

const affiliates = [
  {
    "id": "1",
    "name": "Affiliate 1",
    "slotDurationInMinutes": 45,
    "minutesBetweenSlots": 15,
    "availability": [
      {
        "day": 1,
        "from": 9,
        "to": 18
      },
      {
        "day": 5,
        "from": 13,
        "to": 18
      }
    ]
  },
  {
    "id": "2",
    "name": "Affiliate 2",
    "slotDurationInMinutes": 15,
    "minutesBetweenSlots": 5,
    "availability": [
      {
        "day": 3,
        "from": 9,
        "to": 13
      },
      {
        "day": 4,
        "from": 13,
        "to": 18
      }
    ]
  }
]

module.exports = {
  appointments,
  affiliates
}