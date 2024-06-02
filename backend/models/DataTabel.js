const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  action: { type: String },
  gid: { type: Number },
  signature_id: { type: Number },
  rev: { type: Number },
  signature: { type: String },
  category: { type: String },
  severity: { type: Number },
});

const DataTableSchema = new mongoose.Schema({
  timestamp: { type: Date },
  flow_id: { type: Number },
  in_iface: { type: String },
  event_type: { type: String },
  src_ip: { type: String },
  src_port: { type: Number },
  dest_ip: { type: String },
  dest_port: { type: Number },
  proto: { type: String },
  alert: { type: alertSchema },
});

const DataTable = mongoose.model("dumydata", DataTableSchema);

module.exports = DataTable;
