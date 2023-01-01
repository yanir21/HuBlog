const { Photo } = require("../models/photo");

const getAllPhotos = async () =>
  await Photo.find({}).populate({ path: "author", select: "-_id username" });

const createPhoto = async (req, res) => {
  const user = req.root;
  const photo = req.body.body;
  await Photo.create({ ...photo, author: user.id, date: new Date() });
  res.send("Photo added successfully");
};

const deletePhoto = async (req, res) => {
  Photo.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Photo deleted successfully");
    }
  });
};

const editPhoto = async (req, res) => {
  Photo.findByIdAndUpdate(req.params.id, req.body.body, (error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Photo updated successfully");
    }
  });
};

const getPopularTags = (req, res) => {
  UserPost.aggregate([
    { $unwind: "$tags" },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]).then((tags) => {
    res.send(tags);
  });
};

module.exports = { getAllPhotos, createPhoto, deletePhoto, editPhoto };
