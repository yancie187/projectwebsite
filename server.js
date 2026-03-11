const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());

cloudinary.config({
cloud_name: "djyk9infv",
api_key: "937276423685912",
api_secret: "Svc9_8X9RdrOYQz663w7GtkSUXc"
});


app.post("/delete", async (req, res) => {

const { public_id } = req.body;

try {

const result = await cloudinary.uploader.destroy(public_id);

res.json(result);

} catch (error) {

res.status(500).json({ error: "Delete failed" });

}

});

app.listen(3000, () => {
console.log("Server running on port 3000");
});