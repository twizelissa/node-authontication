import User from "../models/user.model.js";
import hashPassword from "../utils/hash.js";
import Joi from "joi";

function validate(req) {
  const schema = Joi.object({
    names: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{8,30}$/)
      .required(),
    /*
        {
    "name":"Edisor",
    "phone_number":"0789201073",
    "email":"edisor@gmail.com",
    "password":"1234567890"

}

        */
  });

  return schema.validate(req);
}

const userController = {
  async all(req, res) {
    const users = await User.find();
    res.send({
      success: true,
      message: "users successfully fetched",
      data: users,
    });
  },

  async createUser(req, res) {
    const { error } = validate(req.body);
    if (error) {
      return res.send({
        success: false,
        message: error.message,
        data: null,
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.send({
        success: false,
        message: "user already exist",
        data: null,
      });
    else {
      user = new User();
      user.names = req.body.names;
      user.phone_number = req.body.phone_number;
      user.email = req.body.email;
      user.password = await hashPassword(req.body.password);

      user
        .save()
        .then((user) =>
          res.send({
            success: true,
            message: "user successfully created",
            data: user,
          })
        )
        .catch((err) =>
          res.send({
            success: false,
            message: "something went wrong",
            data: null,
          })
        );
    }
  },

  async update(req, res) {
    const { error } = await validate(req.body);
    if (error) {
      return res.send({
        success: false,
        message: error.message,
        data: null,
      });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        names: req.body.names,
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );
    res.send({
      success: true,
      message: "user successfully updated",
      data: user,
    });
  },

  async delete(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "user successfully deleted",
      data: user,
    });
  },
};

export default userController;
