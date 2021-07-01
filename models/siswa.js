const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const bcrypt = require("bcrypt"); // Import bcrypt

const siswaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    kelas: {
        type: Number,
        required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: { getters: true },
  }
);

siswaSchema.plugin(mongoose_delete, { overrideMethods: "all" });
  
module.exports = mongoose.model("siswa", siswaSchema);