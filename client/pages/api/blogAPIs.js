import axios from "axios";
import Cookies from "universal-cookie";

const blogsApi = axios.create({
  baseURL: "http://localhost:4000/",
});

export const getAllBlogs = async () => {
  const response = await blogsApi.get("/blog");
  return response.data;
};

export const signupBlog = async (userinfo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await blogsApi.post("user/signup", userinfo, config);
  return response;
};

export const loginBlog = async (userinfo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await blogsApi.post("user/login", userinfo, config);
  return response;
};

export const Me = async () => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };

  const response = await blogsApi.post("user/me", {}, config);
  return response;
};

export const SubmitBlog = async (blogInfo) => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const response = await blogsApi.post("blog/write", blogInfo, config);
  // console.log(`hey ${response}`)
  return response;
};

export const MyBlogs = async () => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const response = await blogsApi.get("blog/my-blogs", config);
  return response;
};

export const Blog = async (_id) => {
  const response = await blogsApi.get(`blog/single-blog/${_id}`);
  return response;
};

export const editBlog = async (editData) => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const response = await blogsApi.post("blog/edit", editData, config);
  return response;
};

export const deleteBlog = async (id) => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const response = await blogsApi.post("blog/delete", id, config);
  return response;
};

export const editUser = async (info) => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };

  const response = await blogsApi.post("user/edit", info, config);
  return response;
};

export const uploadAvater = async (file) => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      auth: `ut ${token}`,
    },
  };
  const response = await blogsApi.post("user/update-avatar", file, config);
  return response;
};

export const getComments = async (_id) => {
  const response = await blogsApi.get(`comment/by-blog/${_id}`);
  return response;
};

export const submitComment = async (info) => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const response = await blogsApi.post("comment/submit", info, config);
  return response;
};

export const rateBlog = async (info) => {
  const token = new Cookies().get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const response = await blogsApi.post("blog/submit-rate", info, config);
  return response;
};

export const allAuthers = async () => {
  const response = await blogsApi.get("user");
  return response;
};



export const BestBlog = async () => {
  const response = await blogsApi.get("blog/top-blogs")
  return response
}


export const BestAuthers = async () => {
  const response = await blogsApi.get("user/top-users")
  return response
}

export default blogsApi;
