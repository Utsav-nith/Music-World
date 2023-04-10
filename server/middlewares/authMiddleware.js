const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];//reason behind doing this as in home page in headers inside the authorisation bearer +another string so in order to extract 2nd string we used split method 
    //verify whether token is valid or not
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded.userId;
    next();
  } 
  catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};