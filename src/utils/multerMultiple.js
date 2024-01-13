const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const app = express();

cloudinary.config({
  cloud_name: "dx92gbjvu",
  api_key: "275398975379348",
  api_secret: "4ZqWeHRfl82o7ots31V-Eaq72DQ",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
