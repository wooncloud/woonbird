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
  const {params: { id },} = req;

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
    params: { user_id, content },
  } = req;

  try {
    const newPost = post.createPost(user_id, content);
    console.log(newPost);
    result = newPost;
  } catch (e) {
		console.error(e);
	}

  res.send(result);
};

const updatePost = (req, res) => {
  let result = null;
  const {
    params: { id, content },
  } = req;

  try {
  } catch (e) {
		console.error(e);
	}

  res.send(result);
};

const deletePost = (req, res) => {
  let result = null;
  const {params: { id },} = req;

  try {
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
};
