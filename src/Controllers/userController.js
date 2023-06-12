const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken");


const register = async function (req, res) {
    try {
      let data = req.body;
      let { name, email, phone, password} = data;
  
      if (Object.keys(data).length == 0 && (!files || files.length == 0))
        return res
          .status(400)
          .send({ status: false, message: "Body can't be empty" });
  
      if (!name.trim())
        return res
          .status(400)
          .send({
            status: false,
            message: "Please provide fname or it can't be empty",
          });
  
      if (!validateName(name))
        return res
          .status(400)
          .send({ status: false, message: "Please provide valid  fname" });
  
      if (!email)
        return res
          .status(400)
          .send({ status: false, messsage: "Email is mandatory" });
  
      if (!validateEmail(email))
        return res
          .status(400)
          .send({ status: false, messsage: "Please provide valid email" });
  
      let checkEmailId = await userModel.findOne({ email: email });
  
      if (checkEmailId) {
        return res
          .status(400)
          .send({ status: false, message: "This email Id is already in use." });
      }
  
      if (!phone)
        return res
          .status(400)
          .send({ status: false, messsage: "Phone is mandatory" });
  
      if (!validateMobileNo(phone))
        return res
          .status(400)
          .send({ status: false, messsage: "Please provide valid phone Number" });
  
      let checkphone = await userModel.findOne({ phone: phone });
  
      if (checkphone) {
        return res
          .status(400)
          .send({
            status: false,
            message: "This mobile number is already in use.",
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

  module.exports= {register}
  