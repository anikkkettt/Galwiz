const Feedback = require("../../models/main/feedbackModel");
const excel = require("exceljs");

exports.createFeedBack = async (req, res) => {
  try {
    const feedback = await Feedback.create({
      email: req.body.email,
      name: req.body.name,
      message: req.body.message,
    });
    res.status(200).json({
      status: "success",
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getFeedBackWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const feedback = await Feedback.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const totalFeedBack = await Feedback.count({});
    res.status(200).json({
      status: "success",
      message: "Feedback submitted successfully",
      feedback,
      totalFeedBack,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.downloadFeedBack = async (req, res) => {
  const data = await Feedback.find();
  const workbook = new excel.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Feedback"); // New Worksheet
  const path = "./public"; // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 },
    { header: "Name", key: "name", width: 20 },
    { header: "Email", key: "email", width: 20 },
    { header: "Message", key: "message", width: 25 },
    { header: "Created at", key: "createdAt", width: 15 },
  ];
  // Looping through User data
  let counter = 1;
  data.forEach((item) => {
    item.s_no = counter;
    worksheet.addRow(item); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx
      .writeFile(`${path}/feedback.xlsx`)
      .then(() => {
        res.download(`${path}/feedback.xlsx`);
        // res.send({
        //   status: "success",
        //   message: "file successfully downloaded",
        //   path: `feedback.xlsx`,
        // });
      });
  } catch (err) {
    console.log(err);

    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
