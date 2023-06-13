const userModel = require("../Models/userModel")

const { validateName, validatePassword, validateMobileNo } = require("../validation/validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userRegister = async function (req, res) {
  try {
    let data = req.body;
    let { name, phone, password } = data;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Body can't be empty" });

    if (!name.trim())
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide name or it can't be empty",
        });

    if (!validateName(name))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  name" });

    if (!phone)
      return res
        .status(400)
        .send({ status: false, messsage: "Phone is mandatory" });

    if (!validateMobileNo(phone))
      return res
        .status(400)
        .send({ status: false, messsage: "Please provide valid phone number" });

    let checkphone = await userModel.findOne({ phone: phone });

    if (checkphone) {
      return res
        .status(400)
        .send({
          status: false,
          message: "This phone number is already in use.",
        });
    }

    if (!password)
      return res
        .status(400)
        .send({ status: false, messsage: "Paasword is mandatory" });

    if (!validatePassword(password))
      return res
        .status(400)
        .send({
          status: false,
          messsage:
            "Please provide valid password,it should contain uppercase,number and special character and 8-15 length",
        });

    let hashing = bcrypt.hashSync(password, 8);
    data.password = hashing;


    let savedata = await userModel.create(data);

    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: savedata,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};


const userLogin = async function (req, res) {
  try {
    let { phone, password } = req.body;

    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please input user Details" });
    }

    if (!phone) {
      return res
        .status(400)
        .send({ status: false, message: "phone number is mandatory" });
    }

    if (!validateMobileNo(phone)) {
      return res
        .status(400)
        .send({ status: false, message: "phone number should be Valid" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "Password is mandatory" });
    }

    let verifyUser = await userModel.findOne({ phone: phone });
    if (!verifyUser) {
      return res
        .status(400)
        .send({ status: false, message: "user not found" });
    }

    let hash = verifyUser.password;

    let isCorrect = bcrypt.compareSync(password, hash);
    if (!isCorrect)
      return res
        .status(400)
        .send({ status: false, message: "Password is incorrect" });

    let payload = { userId: verifyUser["_id"] };
    let token = jwt.sign(payload, "group-13-project");

    res.setHeader("x-api-key", token);
    return res.status(200).send({
      status: true,
      message: "User login successfull",
      data: { userId: verifyUser["_id"], token },
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


module.exports = { userRegister, userLogin}
