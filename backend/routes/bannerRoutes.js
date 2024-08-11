const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

router.get('/banner', bannerController.getBanner);
router.post('/banner', bannerController.updateBanner);

module.exports = router;
