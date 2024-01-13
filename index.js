const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const colorette = require("colorette");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

//@@-- For handling uncaught Errors(Other then express errors)------------------------------------
process.on("uncaughtException", (error) => {
  console.log(
    colorette.bold(
      colorette.red(`Trade-Fair-India:::: ${error.name}-${error.message}`)
    )
  );
  console.log(
    colorette.bold(colorette.red("Unhandled error occured!! shutting down...."))
  );

  process.exit(1);
});

//@@ --------middleware---section----------------------------------------------------------------

app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? {
          origin: [
            "http://localhost:4000",
            "http://localhost:4444",
            "https://trade-fair-india.netlify.app",
            "https://trade-fair-india-frontend-admin.vercel.app",
            "https://development.pearl-developer.com",
          ],
          credentials: true,
        }
      : {
          origin: ["http://localhost:4000", "http://localhost:4444"],
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          credentials: true,
          maxAge: 600,
          exposedHeaders: ["*", "Authorization"],
        }
  )
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
// This module provides an express/connect middleware for parsing the HTTP Cookie header. It populates req.cookies with an object keyed by the cookie names.

app.use(helmet());
// A helpful Node.js package called Helmet.js enables you to secure HTTP headers returned by your Express apps, a Node.js application that uses the Express framework to manage HTTP requests and responses.

app.use(morgan("combined"));
// Morgan is an HTTP request level Middleware. It is a great tool that logs the requests along with some other information depending upon its configuration and the preset used

app.use(express.json());
// express.json() is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.

// @@----------------------------------------------------Routes-Section----------------------------

const userRoutes = require("./src/routes/user");
const organiserRoutes = require("./src/routes/organiserRoute");
const shopRegistration = require("./src/routes/shopRegistration.js");
const venueRoutes = require("./src/routes/venueRoute.js");
const eventRoute = require("./src/routes/eventRoute");
const vendorRoutes = require("./src/routes/Vendor/vendorRegisteration");
const categoryRoutes = require("./src/routes/categoryRoute.js");
const authenticationRoutes = require("./src/routes/Authentication/authenticationRoutes.js");
const ownerRoutes = require("./src/routes/ownerRoutes.js");
const mailRoutes = require("./src/routes/Mail/mailRoutes.js");
const permissionRoute = require("./src/routes/Authentication/permission");
const roleRoute = require("./src/routes/Authentication/role");
const enquiryRoutes = require("./src/routes/enquiryRoutes");

app.use("/api/v1/organiser", organiserRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/shopRegistration", shopRegistration);
app.use("/api/v1/venue", venueRoutes);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/auth", authenticationRoutes); // Auth Routes
app.use("/api/v1/mail", mailRoutes); // Mail Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/permission", permissionRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/enquiry", enquiryRoutes);

app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/owner/", ownerRoutes);

app.use("*", (req, res) => {
  res.json({
    message: "Welcome to Tradinix",
  });
});

const server = app.listen(process.env.PORT, async () => {
  console.log(
    colorette.underline(
      colorette.yellow(
        `Express Server started and running on port - ${process.env.PORT}`
      )
    )
  );
});

//-----@@mongodb connection-------------------------------------------------------------------------------
mongoose.connect(process.env.MONGO_DB_DATABASE_URL).then(() => {
  console.log(colorette.yellow("Database connection successfully"));
});

// @@----For handling Uncaught rejected promises------------------------------------------------------------
process.on("unhandledRejection", (error) => {
  console.log(
    colorette.bold(
      colorette.red(`Trade-Fair-India:::: ${error.name}-${error.message}`)
    )
  );
  console.log(
    colorette.bold(colorette.red("Unhandled error occured!! shutting down...."))
  );
  server.close(() => {
    process.exit(1);
  });
});
