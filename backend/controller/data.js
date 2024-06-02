const DataTable = require("../models/DataTabel");

exports.GetDataTable = async (req, res) => {
  console.log("i got called");
  try {
    const data = await DataTable.aggregate([
      {
        $project: {
          flow_id: 1,
          src_port: 1,
          "alert.signature_id": 1,
          "alert.category": 1,
          "alert.rev": 1,
        },
      },
    ]);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching data", error);
    res
      .status(500)
      .json({ message: "an internal server error occured", error });
  }
};
