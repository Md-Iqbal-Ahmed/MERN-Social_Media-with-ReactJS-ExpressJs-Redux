import PostMessage from "../Models/PostMessages.js";
import User from "../Models/user.js";

export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createAt: new Date().toISOString,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      messsage: error,
    });
  }
};

export const updatePost = (req, res) => {
  let { id: _id } = req.params;
  const post = req.body;

  PostMessage.findByIdAndUpdate(_id, { $set: post }, { new: true })
    .then((result) => {
      res.status(200).json({
        message: "Updated successfully",
        result,
      });
    })
    .catch((error) => console.log(error));
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  PostMessage.findByIdAndDelete(_id)
    .then((result) => {
      res.status(200).json({
        message: "Deleted successfully",
        result,
      });
    })
    .catch((error) => console.log(error));
};

export const getSinglePost = async (req, res) => {
  let { postId } = req.params;

  PostMessage.findOne(postId)
    .then((data) => {
      if (!data) {
        res.status(200).json({
          message: "No post found",
        });
      } else {
        res.status(200).json({
          message: "data found",
          data,
        });
      }
    })
    .catch((error) => serverError(res, error));
};

export const likePost = async (req, res) => {
  let { id } = req.params;

  if (!req.userId) {
    res.status(404).json({ message: "unauthorized" });
  }

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json({
    message: "liked the post",
    updatedPost,
  });
};
