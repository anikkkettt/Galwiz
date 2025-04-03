const Subscribe = require("../../models/main/subscribeModel");
const excel = require("exceljs");

exports.createSubscribe = async (req, res) => {
  try {
    const subscribe = await Subscribe.create({
      email: req.body.email,
      frequency: req.body.frequency,
      userPanel: req.body.userPanel,
    });
    res.status(200).json({
      status: "success",
      message: "Subscribe submitted successfully",
      subscribe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getSubscribeWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const subscribe = await Subscribe.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const totalSubscribe = await Subscribe.count({});
    res.status(200).json({
      status: "success",
      message: "Subscribe submitted successfully",
      subscribe,
      totalSubscribe,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.downloadSubscribe = async (req, res) => {
  const data = await Subscribe.find();
  const workbook = new excel.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Subscribe"); // New Worksheet
  const path = "./public"; // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 },
    { header: "Email", key: "email", width: 20 },
    { header: "frequency", key: "frequency", width: 20 },
    { header: "userPanel", key: "userPanel", width: 25 },
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
