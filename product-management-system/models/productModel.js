const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: [true, "please add the product name"],
        },
        description: {
            type: String,
            required: [true, "please add the product description"],
        },
        price: {
            type: Number,
            required: [true, "please add the product price"],
        },
        images: {
            type: [String], // Array of image paths
        },
      
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
