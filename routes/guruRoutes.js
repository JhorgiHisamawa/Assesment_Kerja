const express = require("express");
const router = express.Router();

// import for auth needs
const { isAdmin } = require("../middlewares/auth/");

//Import Controller Here
const guruController = require("../controllers/guruController");

//Create your Router Here
router.get("/", isAdmin, guruController.readAllData); //get data
router.get("/:id", isAdmin, guruController.readOneData); //get one data
router.post("/", isAdmin, guruController.createData); //create data
router.put("/:id",isAdmin, guruController.updateData) //update data
router.delete("/:id", isAdmin,  guruController.deleteData) //delete data

module.exports = router;