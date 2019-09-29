class ErrorHandler extends Error {
  constructor(code, message) {
    super();
    this.statusCode = code;
    this.message = message;
  }
}


const handleError = (error, response) => {
  const { statusCode, message } = error;
  response.status(statusCode).send({
    statusCode,
    message,
  });
};


module.exports = { ErrorHandler, handleError };
