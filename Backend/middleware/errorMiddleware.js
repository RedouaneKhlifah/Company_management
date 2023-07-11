export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// export const errorHandler = (err, req, res, next) => {
//     let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     let message = err.message;

//     if (err.name === "CastError" && err.kind === "ObjectId") {
//         statusCode = 404;
//         message = "Resource not found";
//     }

//     res.status(statusCode).json({
//         message,
//         stack: process.env.NODE_ENV === "production" ? null : err.stack
//     });
// };

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found';
    }
    // console.log('Request Body:', req.body);
  
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      requestBody: req.body
    });
  };
