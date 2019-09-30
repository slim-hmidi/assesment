const { ErrorHandler } = require('../utils/error');
const {
  addressLabelFormat, ileDeFrance, paca,
} = require('../utils/helpers');

module.exports.geoloacteBusinessUnit = (req, res) => {
  const { address } = req.body;
  try {
    if (!address) {
      throw new ErrorHandler(404, 'Missing required address field!');
    }

    const checkAddressFormat = /^\d+\s([a-zA-Z]+\s?)+,\s\d{5}\s([a-zA-Z]+\s?)+$/g.test(address);
    if (!checkAddressFormat) {
      throw new ErrorHandler(404, `Address field should has this format: ${addressLabelFormat}`);
    }

    const secondPartAddress = (address.split(',')[1]).trim();
    const postalCode = secondPartAddress.split(' ')[0];

    const arrondissment = Number(postalCode.slice(0, postalCode.length - 1));

    if (ileDeFrance.includes(arrondissment)) {
      return res.status(200).send({
        arrondissment,
        BusinessUnit: 'Ile de France',
      });
    }

    if (paca.includes(arrondissment)) {
      return res.status(200).send({
        arrondissment,
        BusinessUnit: 'Paca',
      });
    }

    return res.status(200).send({
      arrondissment,
      BusinessUnit: 'Other',
    });
  } catch (error) {
    return res.status(error.statusCode || 500).send(error);
  }
};
