require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Admin = require("./models/admin/adminModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const imageGalleryRouter = require("./routes/main/imageGalleryRouter");
const homeRouter = require("./routes/main/homeRouter");
const adminAuthRouter = require("./routes/admin/adminAuthRouter");
const userAuthRouter = require("./routes/user/userAuthRouter");
const notebookRouter = require("./routes/main/notebookRouter");
const toolNotebookRouter = require("./routes/main/toolNotebookRouter");
const useCaseRouter = require("./routes/main/useCaseRouter");
const discussionRouter = require("./routes/main/discussionRouter");
const workFlowRouter = require("./routes/main/workFlowRouter");
const adminRouter = require("./routes/admin/adminRouter");
const outreachyRouter = require("./routes/main/outreachyRouter");
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(async () => {
    console.log("DB connection successful!");
    
    // Check for admin user and create one if it doesn't exist
    try {
      // Get admin credentials from .env
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminName = process.env.ADMIN_NAME;
      
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email: adminEmail });
      
      if (!existingAdmin) {
        // Create new admin
        await Admin.create({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          passwordConfirm: adminPassword,
          designation: "Administrator"
        });
        
        console.log("Admin user created successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
      } else {
        console.log("Admin user already exists.");
      }
    } catch (error) {
      console.error("Error checking/creating admin user:", error);
    }
  })
  .catch((e) => {
    console.log(`Something went wrong with DataBase. and the error is = ${e}`);
  });

app.get("/", (req, res) => res.send("<h1>Server is running</h1>"));

// admin routers
app.use("/api/v1/admin", adminAuthRouter);
app.use("/api/v1/admin", adminRouter);

// user routers
app.use("/api/v1/user", userAuthRouter);

// main  routers
app.use("/api/v1/main", outreachyRouter);
app.use("/api/v1/main/image", express.static("public/uploads/useCase/image"));
app.use("/api/v1/main/excel", express.static("public/"));
app.use("/api/v1/user/image", express.static("public/uploads/user/image"));

app.use("/api/v1/main", workFlowRouter);
app.use("/api/v1/main", imageGalleryRouter);

app.use("/api/v1/main", homeRouter);
app.use("/api/v1/user", notebookRouter);
app.use("/api/v1/user", toolNotebookRouter);
app.use("/api/v1/user", useCaseRouter);
app.use("/api/v1/user", discussionRouter);

app.get("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});
app.post("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});

app.delete("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});

app.patch("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});
app.put("*", (req, res) => {
  res.status(500).json({
    status: "success",
    message: "Url not found",
  });
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server is running on port ${port}!`));
