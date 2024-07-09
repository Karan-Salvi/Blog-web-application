const { validateToken } = require("../services/authentication.js");

// function checkForAuthenticationCookies(req, res, next) {
//   let cookieName = "uid";
//   const tokenCookieValue = req.cookies[cookieName];
//   console.log(tokenCookieValue);
//   if (!tokenCookieValue) {
//     return next();
//   }
//   try {
//     console.log(tokenCookieValue);
//     const userPayload = validateToken(tokenCookieValue);
//     req.user = userPayload;
//     return next();
//   } catch (error) {
//     console.log("Some thing went wrong while authenticating user");
//     return next();
//   }

// }

function checkForAuthenticationCookies(cookieName) {
  return async (req, res, next) => {
    console.log("HEY Buddy I am executed");
    const tokenCookieValue = req.cookies[cookieName];
    console.log(tokenCookieValue);
    if (!tokenCookieValue) {
      return next();
    }
    try {
      console.log(tokenCookieValue);
      const userPayload = await validateToken(tokenCookieValue);
      req.user = userPayload;
      console.log("req.user is :::::", req.user);
      return next();
    } catch (error) {
      console.log("Some thing went wrong while authenticating user");
      return next();
    }
  };
}

module.exports = {
  checkForAuthenticationCookies,
};
