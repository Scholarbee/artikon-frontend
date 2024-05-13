import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/posts/`;

// Create New Post
export const createPost = async (formData) => {
  const response = await axios.post(API_URL + "/create-post", formData);
  return response.data;
};

// Get all Post
export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response;
};
// Get my Post
export const getMyPosts = async () => {
  const response = await axios.get(API_URL + "/my-posts");
  return response;
};

// Delete a Post
export const deletePost = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
export const getPost = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update Post
export const updatePost = async (id, formData) => {
  const response = await axios.put(`${API_URL}${id}`, formData);
  return response.data;
};
