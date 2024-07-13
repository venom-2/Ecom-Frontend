import axios from "axios";

const API = axios.create({
  baseURL: "https://my-spring-boot-app-ip4fjkueaa-uc.a.run.app/api/",
});

export default API;
