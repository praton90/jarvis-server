const datasource = require("../datasource")

const getAll = () => datasource.affiliates

const getAffiliate = affiliateId => datasource.affiliates.find(affiliate => affiliate.id === affiliateId)

module.exports = {
  getAffiliate,
  getAll
}