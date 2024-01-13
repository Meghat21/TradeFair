// @imports-section
const Event = require("../models/events");

// @desc   create new event
// @route   POST /api/v1/EventRegistration
exports.createEvent = async (req, res) => {
  try {
    const {shopDetails, eventDate, ageGroup } = req?.body;

    //--------------------------------------@@validations for formdata  and parsing formdata section----------------------------



    if (!shopDetails || typeof shopDetails !== "string") {
      return res.status(400).json({
        status: true,
        message: "shops details field is required and Please stringify it",
      });
    }



    if (!ageGroup || typeof ageGroup !== "string") {
      return res.status(400).json({
        status: true,
        message: "age group field is required and Please stringify it",
      });
    }

    let parseAgeGroup = JSON.parse(ageGroup);
    let parseEventDate = JSON.parse(eventDate);
    let parseShop = JSON.parse(shopDetails);
   

    // @@--------------------------------------------------------------@@End---------------------------------------------------

    const { userId } = req.userCredentials;
    const eventData = new Event({
      ...req?.body,
      createdBy: userId,
      eventBrochure: req?.files?.eventBrochure,
      shopDetails: parseShop,
      eventBanner: req?.files?.eventBanner[0],
      eventLogo: req?.files?.eventLogo[0],
      eventDate: parseEventDate,
      ageGroup: parseAgeGroup,
    });

    const savedEventData = await eventData.save();
    res.status(201).json({
      status: true,
      data: savedEventData,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Get all event event
// @route   POST /api/v1/EventRegistration
exports.getEvent = async (req, res) => {
  try {
    const allEvents = await Event.find()
      .populate("organiser", ["_id", "companyName"])
      .populate("venue", ["_id", "PlaceName"])
      .populate("category", ["_id", "category"])
      .populate("shopDetails.shopName")
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries");

    const totalEvents = await Event.countDocuments();
    res.status(200).json({
      status: true,
      data: allEvents,
      total: totalEvents,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  delete event registration
// @route   Delete /api/v1/eventRegistration/:id
exports.deleteEvent = async (req, res) => {
  try {
    const deletedData = await Event.findByIdAndDelete(req?.params?.id);
    if (!deletedData) {
      return res
        .status(404)
        .json({ status: false, message: "No data found with given Id!!" });
    }
    res.status(200).json({ status: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(200).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  get single shop event data for dynamic event url
// @route   get /api/v1/event/:id
exports.getSingleEvent = async (req, res) => {
  try {
    const singleEventData = await Event.findOne({
      randomString: req?.params?.id,
    });
    if (!singleEventData) {
      return res
        .status(400)
        .json({ status: false, message: "No data found with given id!!" });
    }
    res.status(200).json({ status: true, data: singleEventData });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  update shop event data
// @route patch /api/v1/eventRegistration/:id
// exports.updateEvent = async (req, res) => {
//   try {
//     let EventDate = req?.body?.EventDate?.split("/");
//     const existingData = Event.findById(req?.params?.id,{...req?.body,{
//       ...req?.body,
//       EventDate,
//       eventPdf: req?.files?.files,
//       eventImages: req?.files?.eventImages,
//       eventLogo: req?.files?.eventLogo,
//     })
//     if (!existingData) {
//       return res
//         .status(200)
//         .json({ status: 400, message: "No data found with given id" });
//     }
//     const updatedData = await Event.findByIdAndUpdate(req?.params?.id);
//   } catch (err) {
//     res
//       .status(400)
//       .json({ status: false, message: err?.message || "Internal server error" });
//   }
// };
exports.updateEvent = async (req, res) => {
  try {
    const { events, shopDetails, eventDate, ageGroup } = req?.body;

    //--------------------------------------@@validations for formdata  and parsing formdata section----------------------------

    if (!events || typeof events !== "string") {
      return res.status(400).json({
        status: false,
        message: "events field is required and Please stringify it!!",
      });
    }

    if (!shopDetails || typeof shopDetails !== "string") {
      return res.status(400).json({
        status: true,
        message: "shops details field is required and Please stringify it",
      });
    }

    if (!eventDate || typeof shoeventDateps !== "string") {
      return res.status(400).json({
        status: true,
        message: "event date field is required and Please stringify it",
      });
    }

    if (!ageGroup || typeof ageGroup !== "string") {
      return res.status(400).json({
        status: true,
        message: "age group field is required and Please stringify it",
      });
    }

    let parseAgeGroup = JSON.parse(ageGroup);
    let parseEventDate = JSON.parse(eventData);
    let parseShop = JSON.parse(shopDetails);
    let parseEvents = JSON.parse(events);

    // @@--------------------------------------------------------------@@End---------------------------------------------------
    const eventData = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req?.body,
        ageGroup: parseAgeGroup,
        eventPdf: req?.files?.files,
        gallery: req?.files?.gallery,
        shopDetails: parseShop,
        events: parseEvents,
        eventImages: req?.files?.eventImages,
        eventDate: parseEventDate,
      },
      { new: true }
    );
    const savedEventData = await eventData.save();
    res.status(201).json({ status: true, data: savedEventData });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};
