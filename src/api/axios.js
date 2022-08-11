import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "018f997a73dbd281714bb4526bfd3d2f",
    language: "ko-KR",
  },
});

export default instance;
