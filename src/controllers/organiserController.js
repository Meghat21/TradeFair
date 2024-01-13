//importing Model
const organiser = require("../models/organiser");

// --------------------------------create organiser------------------------------------------
const createOrganiser = async (req, res) => {
  try {
    const { userId } = req.userCredentials;

    const {
      companyName,
      address,
      state,
      city,
      contactPerson,
      logo,
      images,
      websiteUrl,
      email,
      insta,
      fb,
      twitter,
      linkedIn,
      phoneNumber,
    } = req.body;

    let imageFiles = [];
    let pathFiles;
    const logoFile = req?.files["logo"][0];
    console.log(logoFile, "logoFile");

    for (let i = 0; i < req?.files["organiserImages"]?.length; i++) {
      pathFiles = req?.files["organiserImages"][i];
      imageFiles.push(pathFiles?.path);
    }
    // console.log("logoFile" , logoFile)
    // console.log("imageFiles" , imageFiles)

    let data = new organiser({
      ...req.body,
      companyName: companyName,
      address: address,
      state: state,
      city: city,
      contactPerson: JSON.parse(contactPerson),
      logo: logoFile?.path,
      images: imageFiles,
      websiteUrl: websiteUrl,
      email: email,
      insta: insta,
      fb: fb,
      twitter: twitter,
      linkedIn: linkedIn,
      createdBy: userId,
      phoneNumber: phoneNumber,
    });
    const savedData = await data.save();
    res.status(201).json({ status: "SUCCESS", data: savedData });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// ---------------------------------get organiser----------------------------------------------------

const getOrganisers = async (req, res) => {
  try {
    const data = await organiser
      .find()
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries");
    res.status(200).json({ status: "SUCCESS", data: data });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

//----------------------------------------update organiser------------------------------------------
const updateOrganiser = async (req, res) => {
  try {
    const {
      companyName,
      address,
      state,
      city,
      contactPerson,
      // logo,
      // images,
      websiteUrl,
      email,
      insta,
      fb,
      twitter,
      linkedIn,
      phoneNumber,
    } = req.body;
    let id = req.params.id;
    let imagePath;
    const imageFiles = [];
    // let existingImageFile;
    // let existingImages;
    // let updateContact ;
    // let contactPersonAllData , existingContactPersonAllData,contactPersonEachData;
    const logoFile = req?.files["logo"]?.[0];
    for (let i = 0; i < req?.files["organiserImages"]?.length; i++) {
      imagePath = req?.files["organiserImages"][i];
      imageFiles.push(imagePath.path);
    }
    console.log("req.body", req.body);
    // console.log("imageFiles**",imageFiles)
    let existingData = await organiser.findById(id);
    if (!existingData) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }

    // if(existingData && existingData.images ){
    //    existingImages = existingData?.images
    //    existingImageFile = existingImages?.map(image=>image)
    // }
    //   if(existingData && existingData.contactPerson ){
    //     contactPersonAllData  = existingData?.contactPerson
    //     console.log("contactPersonAllData",contactPersonAllData)
    //     existingContactPersonAllData = contactPersonAllData?.map(ele => ele)
    //  }
    //  console.log("existingContactPersonAllData" , existingContactPersonAllData)
    let updateImages =
      imageFiles?.length > 0 ? imageFiles : existingData.images;
    let updateContactData =
      contactPerson?.length > 0
        ? JSON.parse(contactPerson)
        : existingData.contactPerson;
    console.log("updateContactData", updateContactData);

    let data = await organiser.updateMany(
      { _id: id },
      {
        $set: {
          companyName: companyName,
          address: address,
          state: state,
          city: city,
          contactPerson: updateContactData,
          websiteUrl: websiteUrl,
          email: email,
          logo: logoFile?.path || existingData?.logo,
          images: updateImages,
          insta: insta,
          fb: fb,
          twitter: twitter,
          linkedIn: linkedIn,
          phoneNumber: phoneNumber,
        },
      },
      { new: true }
    );
    res.status(200).json({ status: "SUCCESS", data: data });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
// -------------------------------getSingleOrganiser---------------------------------
const getSingleOrganiser = async (req, res) => {
  try {
    let data = await organiser.findOne({ randomString: req?.params?.id });
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(200).json({ status: "SUCCESS", data: data });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
//--------------------------deleteOrganiser----------------------------------------------
const deleteOrganiser = async (req, res) => {
  try {
    // console.log("id",req?.params?.id)
    let data = await organiser.findByIdAndDelete(req?.params?.id);
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }

    res
      .status(200)
      .json({ status: "SUCCESS", message: "Data is deleted successfully" });
  } catch (err) {
    console.log("error", error);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
module.exports = {
  createOrganiser,
  getOrganisers,
  updateOrganiser,
  getSingleOrganiser,
  deleteOrganiser,
};
