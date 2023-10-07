import { post } from "../services/index.js";

// post controller

const getPostList = async (req, res) => {
  try {
    const posts = await post.findPostMany();
    console.log(posts);
  } catch (e) {
		console.error(e);
	}

  res.send('wow');
};

const getPostOne = (req, res) => {
  try {
  } catch (e) {
		console.error(e);
	}

  res.send({});
};

const createPost = (req, res) => {
  try {
  } catch (e) {
		console.error(e);
	}

  res.send({});
};

const updatePost = (req, res) => {
  try {
  } catch (e) {
		console.error(e);
	}

  res.send({});
};

const deletePost = (req, res) => {
  try {
  } catch (e) {
		console.error(e);
	}

  res.send({});
};

export default {
  getPostList,
  getPostOne,
  createPost,
  updatePost,
  deletePost,
};
