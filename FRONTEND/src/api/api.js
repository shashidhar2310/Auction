import axios from "axios";

export const register = async (formData) => {
  const response = await axios.post("http://localhost:5000/api/register", formData);
  return response.data;
};

export const login = async (formData) => {
  return await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());
};
