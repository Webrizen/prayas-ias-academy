const express = require('express');
const router = express.Router();
const multer = require('multer');
const Banner = require('../models/Banner');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/banners');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload banner
router.post('/upload-banner', upload.single('bannerImage'), async (req, res) => {
    try {
        const { startTime, endTime } = req.body;
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const banner = new Banner({
            imageUrl: `${baseUrl}/uploads/banners/${req.file.filename}`,
            startTime,
            endTime
        });

        await banner.save();
        console.log(req.file);
        res.status(201).json({ message: 'Banner uploaded successfully!', banner });
    } catch (error) {
        console.error('Error uploading banner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch active banners
router.get('/active-banners', async (req, res) => {
    try {
        const now = new Date();
        const banners = await Banner.find({
            startTime: { $lte: now },
            endTime: { $gte: now }
        });

        res.status(200).json(banners);
    } catch (error) {
        console.error('Error fetching active banners:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get banner by ID
router.get('/:id', async (req, res) => {
    try {
        const bannerId = req.params.id;
        const banner = await Banner.findById(bannerId);

        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        res.status(200).json(banner);
    } catch (error) {
        console.error('Error fetching banner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit banner
router.put('/:id', upload.single('bannerImage'), async (req, res) => {
    try {
        const { startTime, endTime } = req.body;
        const bannerId = req.params.id;

        const bannerData = {
            startTime,
            endTime,
        };

        // If a new image is uploaded, update the imageUrl
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            bannerData.imageUrl = `${baseUrl}/uploads/banners/${req.file.filename}`;
        }

        const updatedBanner = await Banner.findByIdAndUpdate(bannerId, bannerData, { new: true });

        if (!updatedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        res.status(200).json({ message: 'Banner updated successfully!', banner: updatedBanner });
    } catch (error) {
        console.error('Error updating banner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete banner
router.delete('/:id', async (req, res) => {
    try {
        const bannerId = req.params.id;

        const deletedBanner = await Banner.findByIdAndDelete(bannerId);

        if (!deletedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        res.status(200).json({ message: 'Banner deleted successfully!' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
