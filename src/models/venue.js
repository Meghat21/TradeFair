const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VenueSchema = new Schema(
  {
    PlaceName: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "auth",
    },
    State: {
      type: String,
    },
    City: {
      type: String,
    },
    randomString: String,
    venueUrl: String,
    Address: {
      type: String,
    },
    enquiries: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "enquiry" }],
    },
    GeoLocation: {
      type: {},
      required: [true, "Geo Location is reqiired"],
    },
    PlaceDescription: {
      type: String,
    },
    HotelNearby: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venue", VenueSchema);
