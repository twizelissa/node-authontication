import jwt from 'jsonwebtoken';

const authMiddleware = {
  auth(req, res, next) {
  const token = req.header("x-gaga-token");
  if (!token) return res.send({
  success:false,
  message:"token missing..",
  data: null
}).status(401);
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.send({
        success:false,
        message:"invalid token",
        data: null
    }).status(400);
  }
},

  verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return  res.send({
        success:false,
        message:"invalid token",
        data: null
    }).status(400);;
    }
  } else {
    // Forbidden
    return res.send({
        success:false,
        message:"Forbidden",
        data: null
    }).status(403);
  }
}
}

export default authMiddleware;