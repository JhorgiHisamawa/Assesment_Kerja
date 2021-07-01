const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const nilaiSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    kelas: {
        type: Number,
        required: true,
    },
    pelajaran: {
        type: String,
        required: true,
    },
    nilai: {
        type: Number,
        required: true,
    },
    pelajaran: {
        type: String,
        required: true,
    },
    nilai: {
        type: Number,
        required: true,
    },
    pelajaran: {
        type: String,
        required: true,
    },
    nilai: {
        type: Number,
        required: true,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: { getters: true },
  }
);
  
nilaiSchema.plugin(mongoose_delete, { overrideMethods: "all" });
  
module.exports = mongoose.model("nilai", nilaiSchema);