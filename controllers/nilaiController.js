const mongoose = require("mongoose");
const { nilai } = require("../models");


class NilaiController {
    //read all data
    async readAllData(req, res) {
        try {
            let dataNilai = await nilai.find().exec();
            //cek jika data ada
            if (dataNilai.length == 0) {
                return res.status(400).json({ message: "Data nilai tidak ditemukan", data: null });
            } else {
                return res.status(200).json({ message: "Data berhasil ditampilkan", data: dataNilai });
            };
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", error: error });
        };
    };
    //read one data
    async readOneData(req, res) {
        try {
            let dataNilai = await nilai.findOne({ _id:req.params.id }).exec();
            //cek jika data ada
            if (dataNilai.length == 0) {
                return res.status(400).json({ message: "Data nilai tidak ditemukan", data: null });
            } else {
                return res.status(200).json({ message: "Data berhasil ditampilkan", data: dataNilai });
            };
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", error: error });
        };
    };
    //create data
    async createData(req, res) {
        try {
            //informasi data
            let data = {
                nama: req.body.nama,
                kelas: req.body.kelas,
                pelajaran: req.body.pelajaran,
                nilai: req.body.nilai,
                pelajaran: req.body.pelajaran,
                nilai: req.body.nilai,
                pelajaran: req.body.pelajaran,
                nilai: req.body.nilai
            };
            let createData = await nilai.create(data);
            //jika data tidak berhasil untuk ditambahkan
            if (!createData) {
                return res
                    .status(400)
                    .json({ message: "Data gagal untuk ditambahkan", error: createData });
            } else {
                //data berhasil ditambahkan
                return res.status(200).json({ message: "Data berhasil ditambahkan", data: createData });
            };
            //server error
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", error: error });
        };
    };

    //update data
    async updateData(req, res) {
        try {
            //informasi data
            let data = {
                nama: req.body.nama,
                kelas: req.body.kelas,
                pelajaran: req.body.pelajaran,
                nilai: req.body.nilai,
                pelajaran: req.body.pelajaran,
                nilai: req.body.nilai,
                pelajaran: req.body.pelajaran,
                nilai: req.body.nilai
            };
            let updateData = await nilai.findOneAndUpdate(
                { _id: req.params.id },
                data,
                { new: true }
            );
            //jika data tidak berhasil dirubah
            if (!updateData) {
                return res
                    .status(400)
                    .json({ message: "Perubahan data gagal", error: updateData });
            } else {
            //data berhasil dirubah
                return res.status(200).json({ message: "Perubahan data berhasil", data: updateData });
            }
        } catch (error) {
            //server error
            console.log(error);
            return res.status(500).json({ message: "Internal server error", error: error });
        };
    };

    //delete data
    async deleteData(req, res) {
        try {
            let deleteData = await nilai.deleteOne({ _id: req.params.id });
            //jika data gagal dihapus
            if (!deleteData.deletedCount) {
                return res
                    .status(400)
                    .json({ message: "Penghapusan data gagal", error: deleteData });
            } else {
                //data berhasil dihapus
                return res
                    .status(200)
                    .json({ message: "Penghapusan data berhasil", deletedCount: deleteData.deletedCount });
            };
            //server error
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", error: error });
        };
    };
};

module.exports = new NilaiController();