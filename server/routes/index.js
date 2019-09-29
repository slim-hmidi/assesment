const router = require('express').Router();
const { geoloacteBusinessUnit } = require('../controllers/locations');


router.route('/locate_business_unit')
  .post(geoloacteBusinessUnit);

module.exports = router;
