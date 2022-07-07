import User from "../models/user.model.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{8,30}$/)
      .required(),
  });
  return schema.validate(req);
}

const authController = {
  async login(req, res) {
    const { error } = await validate(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({
        success: false,
        message: "invalid username or password",
        data: null,
      });
    else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({
          success: false,
          message: "invalid username or password",
          data: null,
        });
      else {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "3h",
        });
        return res.status(200).send({
          success: true,
          message: "login successful",
          token: token,
        });
      }
    }
  },
};

export default authController;
