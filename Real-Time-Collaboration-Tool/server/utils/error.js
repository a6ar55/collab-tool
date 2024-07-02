class CustomError extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  }
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
  };
  
  export const createError = (status, message) => new CustomError(status, message);