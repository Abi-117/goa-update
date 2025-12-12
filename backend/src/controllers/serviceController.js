const Service = require("../models/service.model");

exports.getServices = async (req, res) => {
  const data = await Service.find();
  res.json(data);
};

exports.getServiceById = async (req, res) => {
  const data = await Service.findById(req.params.id);
  res.json(data);
};

exports.createService = async (req, res) => {
  const { title, timing, items } = req.body;

  const newService = new Service({
    title,
    timing,
    items: JSON.parse(items),
    image: req.file ? req.file.filename : null
  });

  await newService.save();
  res.json({ message: "Service created", newService });
};

exports.updateService = async (req, res) => {
  const { title, timing, items } = req.body;

  const updatedData = {
    title,
    timing,
    items: JSON.parse(items)
  };

  if (req.file) {
    updatedData.image = req.file.filename;
  }

  const data = await Service.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  res.json({ message: "Service updated", data });
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};
