// // routes/medicines.js
// const express = require('express');
// const router = express.Router();
// const protect = require('../middleware/auth');
// const allowRoles = require('../middleware/role');
// const { createMedicine, listMedicines } = require('../controllers/medicineController');

// router.post('/', protect, allowRoles('admin'), createMedicine);
// router.get('/', protect, listMedicines);

// module.exports = router;


const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const allowRoles = require('../middleware/role');
const { createMedicine, listMedicines, updateMedicine, deleteMedicine } = require('../controllers/medicineController');

router.post('/', protect, allowRoles('admin'), createMedicine);
router.get('/', protect, listMedicines);

// NEW: Update medicine
router.put('/:id', protect, allowRoles('admin'), updateMedicine);

// NEW: Delete medicine
router.delete('/:id', protect, allowRoles('admin'), deleteMedicine);

module.exports = router;
