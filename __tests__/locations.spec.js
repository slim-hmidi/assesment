const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const errorFormatMessage = 'Address field should has this format: <Street Number> <Street name>, <PostalCode> <City Name>';

describe('Locate the business unit', () => {
  test('Should returns 200', async () => {
    const response = await request.post('/locate_business_unit')
      .send({
        address: '22 rue abc def, 75016 Paris',
      });

    expect(response.status).toBe(200);
  });

  test('Should returns ile de france as a business unit for the given address', async () => {
    const response = await request.post('/locate_business_unit')
      .send({
        address: '22 rue abc def, 75016 Paris',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      arrondissment: 7501,
      BusinessUnit: 'Ile de France',
    });
  });

  test('Should returns Paca as a business unit for the given address', async () => {
    const response = await request.post('/locate_business_unit')
      .send({
        address: '23 rue abc def, 13011 Marseille',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      arrondissment: 1301,
      BusinessUnit: 'Paca',
    });
  });

  test('Should returns other as a business unit for the given address', async () => {
    const response = await request.post('/locate_business_unit')
      .send({
        address: '23 rue abc def, 94400 Vitry sur Seine',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      arrondissment: 9440,
      BusinessUnit: 'Other',
    });
  });

  test('Should returns error message when the address is not well fromatted', async () => {
    const response = await request.post('/locate_business_unit')
      .send({
        address: 'bla bla bla',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(errorFormatMessage);
  });

  test('Should returns error message when the address is missing', async () => {
    const response = await request.post('/locate_business_unit')
      .send({
        address: '',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Missing required address field!');
  });

  test('Should returns error message when the address is uncomplete', async () => {
    const response = await request.post('/locate_business_unit')
      .send({
        address: '152 rue xyr qdsqs, 94000',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(errorFormatMessage);
  });
});
