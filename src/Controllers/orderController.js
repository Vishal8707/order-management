const orderModel = require("../Models/orderModel");
const userModel = require("../Models/userModel")


const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");

//================================= Create Order ================================================//



const createOrder = async function (req, res) {
  try {
    let data = req.body;
    let { userId, sub_total, phone, description} = data;

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "Invalid User Id" });

    if (!phone)
      return res
        .status(400)
        .send({ status: false, messsage: "phone is mandatory" });

    if (!description)
      return res
        .status(400)
        .send({ status: false, messsage: "description is mandatory" });

    if (!sub_total)
      return res
        .status(400)
        .send({ status: false, messsage: "sub_total is mandatory" });

    let userData = await userModel.findById({_id:userId});
    if (!userData) {
      return res.status(404).send({ status: false, message: "Please enter vaild userId, sub_total and phone number." });
    }

    if (userData.phone != phone) {
      return res.status(404).send({ status: false, message: "this phone number is not register." });
    }
    
    let order = await orderModel.create(data);

    return res
      .status(200)
      .send({ status: true, message: "Success", data: order });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// const getOrder = async function (req, res) {
//   try {
//     let userId = req.query.userId;

//     let getData = await orderModel.findById(userId);

//     if (!getData)
//       return res.status(404).send({ status: false, message: "user not found" });

//     return res
//       .status(200)
//       .send({ status: true, message: "User profile details", data: getData });
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// };


const getOrder = async function (req, res) {
  try {
    let userId = req.query.userId; // Extract the userId from the request query

    let getData = await orderModel.find({userId}); // Pass the userId directly to findById()

    if (Object.keys(getData).length === 0)
      return res.status(404).send({ status: false, message: "User not found" });

    return res
      .status(200)
      .send({ status: true, message: "User profile details", data: getData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



module.exports = { createOrder, getOrder}