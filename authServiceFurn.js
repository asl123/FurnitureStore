import http from "./httpService";
import config from "../config.json";
var authentication = [
  {
    email: "user@user.com",
    password: "123456",
    role: "customer",
    name: "Prashant",
  },
  {
    email: "asloobali123@gmail.com",
    password: "admin123",
    role: "admin",
    name: "Asloob",
  },
];
export function login(email, password) {
  let filterUser = authentication.find((user) => user.email === email);
  if (filterUser) {
    if (filterUser.password === password) {
      localStorage.setItem("username", filterUser.name);
      localStorage.setItem("role", filterUser.role);
      return "success";
    }
  }
  return "failed";
}
export function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  return "success";
}
export function getCurrentUser() {
  try {
    const user = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    return { user, role };
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  logout,
  getCurrentUser,
};
