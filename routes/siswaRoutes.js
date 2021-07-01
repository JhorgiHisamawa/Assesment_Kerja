const express = require("express");
const router = express.Router();

// import for auth needs
const { isAdmin } = require("../middlewares/auth/");

//Import Controller Here
const siswaController = require("../controllers/siswaController");

//Create your Router Here
router.get("/", isAdmin, siswaController.readAllData); //get data
router.get("/:id", isAdmin, siswaController.readOneData); //get one data
router.post("/", isAdmin, siswaController.createData); //create data
router.put("/:id",isAdmin, siswaController.updateData) //update data
router.delete("/:id", isAdmin,  siswaController.deleteData) //delete data

module.exports = router;