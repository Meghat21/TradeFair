const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    permission: {
      type: String,
      required: [true, "Permission field is required"],
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "auth" },
  },
  { timestamps: true }
);

const permissionModel = mongoose.model("permission", permissionSchema);

module.exports = permissionModel;
