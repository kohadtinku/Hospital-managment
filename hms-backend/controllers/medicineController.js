const Medicine = require('../models/Medicine');

exports.createMedicine = async (req,res) => {
  const { name, genericName, strength, type, company } = req.body;
  const med = await Medicine.create({ name, genericName, strength, type, company });
  res.json(med);
}

exports.listMedicines = async (req,res) => {
  const meds = await Medicine.find().sort({name:1});
  res.json(meds);
}


exports.updateMedicine = async (req, res) => {
  const { id } = req.params;
  const { name, genericName, strength, type, company } = req.body;

  const med = await Medicine.findById(id);
  if (!med) return res.status(404).json({ message: 'Medicine not found' });

  med.name = name || med.name;
  med.genericName = genericName || med.genericName;
  med.strength = strength || med.strength;
  med.type = type || med.type;
  med.company = company || med.company;

  await med.save();
  res.json(med);
};

exports.deleteMedicine = async (req, res) => {
  const { id } = req.params;
  const med = await Medicine.findById(id);
  if (!med) return res.status(404).json({ message: 'Medicine not found' });

  await med.deleteOne();
  res.json({ message: 'Medicine deleted successfully' });
};
