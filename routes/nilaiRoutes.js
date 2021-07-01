const express = require("express");
const router = express.Router();

// import for auth needs
const {isGuru, isSiswa } = require("../middlewares/auth/");

//Import Controller Here
const nilaiController = require("../controllers/nilaiController");

//Create your Router Here
router.get("/", isGuru, nilaiController.readAllData); //get data
router.get("/:id", isSiswa, nilaiController.readOneData); //get one data
router.get("/:id", isGuru, nilaiController.readOneData); //get one data
router.post("/", isGuru, nilaiController.createData); //create data
router.put("/:id",isGuru, nilaiController.updateData) //update data
router.delete("/:id", isGuru,  nilaiController.deleteData) //delete data

module.exports = router;