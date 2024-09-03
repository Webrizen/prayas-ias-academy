const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Banner', BannerSchema);