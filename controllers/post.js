import { post } from "../services/index.js";

// post controller

const getPostList = async (req, res) => {
  let result = null;
  try {
    result = await post.findPostMany();
  } catch (e) {
    console.error(e);
  }

  res.send(result);
};

const getPostOne = async (req, res) => {
  let result = null;
  const {
    params: { id },
  } = req;

  try {
    result = await post.findPostOneById(id);
  } catch (e) {
    console.error(e);
  }

  res.send(result);
};

const createPost = (req, res) => {
  let result = null;
  const {
    body: { user_id, content },
  } = req;

  try {
    const newPost = post.createPost(user_id, content);
    result = newPost;
  } catch (e) {
    console.error(e);
  }

  res.send(result);
};

const updatePost = (req, res) => {
  let result = null;
  const {
    body: { post_id, content },
  } = req;

  try {
    const modPost = post.updatePost(post_id, content);
    result = modPost;
  } catch (e) {
    console.error(e);
  }

  res.send(result);
};

const deletePost = (req, res) => {
  let result = null;
  const {
    body: { post_id },
  } = req;

  try {
    const delPost = post.deletePost(post_id);
    result = delPost;
  } catch (e) {
    console.error(e);
  }

  res.send(result);
};

const searchPosts = async (req, res) => {
  let result = null;
  try {
    result = await post.searchPosts();
  } catch (e) {
    console.error(e);
  }

  res.send(result);
};

export default {
  getPostList,
  getPostOne,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
};
