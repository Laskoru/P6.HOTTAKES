const Like = require("../models/Sauce");
//const jwt = require("jsonwebtoken");

exports.like = (req, res, next) => {
  let likeStatus = req.body.like;
  let userId = req.body.userId;
  Like.findOne({ _id: req.params.id }).then((objet) => {
    if (!objet.usersLiked.includes(userId) && likeStatus === 1) {
      console.log("les instructions seront executées");
      Like.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: userId },
        }
      )
        .then(() => res.status(201).json({ message: "+1 Like" }))
        .catch(() => res.status(400).json({ error: "erreur" }));
    }
    if (objet.usersLiked.includes(userId) && likeStatus === 0) {
      Like.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: -1 },
          $pull: { usersLiked: userId },
        }
      )
        .then(() => res.status(201).json({ message: "-1 Like" }))
        .catch(() =>
          res.status(400).json({ error: "UserId déja dans la BDD" })
        );
    }
    if (!objet.usersDisliked.includes(userId) && likeStatus === -1) {
      console.log("les instructions seront executées");
      Like.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: userId },
        }
      )
        .then(() => res.status(201).json({ message: "+1 Dislike" }))
        .catch(() => res.status(400).json({ error: "erreur" }));
    }
    if (objet.usersDisliked.includes(userId) && likeStatus === 0) {
      Like.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: -1 },
          $pull: { usersDisliked: userId },
        }
      )
        .then(() => res.status(201).json({ message: "-1 Dislike" }))
        .catch(() =>
          res.status(400).json({ error: "UserId déja dans la BDD" })
        );
    }
  });
};
