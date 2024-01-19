export class customErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const appLevelErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "server error! Try later!!";
  if(err instanceof customErrorHandler){
    console.log("custom error handler worked");
     res.status(err.statusCode).send({message:err.message});
  }
  else
    res.status(err.statusCode).json({ success: false, error: err.message });

  next();
};
