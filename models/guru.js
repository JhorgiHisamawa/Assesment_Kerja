const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const bcrypt = require("bcrypt"); // Import bcrypt

const guruSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      set: encryptPwd,
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

function encryptPwd(password) {
    return bcrypt.hashSync(password, 10);
  }
  
guruSchema.plugin(mongoose_delete, { overrideMethods: "all" });
  
module.exports = mongoose.model("guru", guruSchema);