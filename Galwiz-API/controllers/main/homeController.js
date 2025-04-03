const NoteBook = require("../../models/main/notebookModel");
const ToolNoteBook = require("../../models/main/toolNotebookModel");
const UseCase = require("../../models/main/useCaseModel");
const WorkFlow = require("../../models/main/workFlowModel");

exports.totalTopic = async (req, res) => {
  try {
    const data = {
      totalNoteBook: await NoteBook.count({ approved: { $eq: true } }),
      totalToolNoteBook: await ToolNoteBook.count({ approved: { $eq: true } }),
      totalUseCase: await UseCase.count({ approved: { $eq: true } }),
      totalWorkFlow: await WorkFlow.count(),
    };
    res.status(200).json({ status: "success", message: "sucessFully", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
