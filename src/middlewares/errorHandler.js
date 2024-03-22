"use strict";
/*

BLOG api project errorHandler

*/
module.exports = (err, req, res, next) => {
  // defaul olarak statuscode var
  const errorStatusCode = res.errorStatusCode ?? 500;

  const data = {
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
    body: req.body,
  };

  // console.log(req.url)

  if (req.url.startsWith("/api")) {
    res.status(errorStatusCode).send(data);
  } else {
    res.render("error", { data });
  }
};
