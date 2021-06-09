import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-55044/us-central1/api'
    // this is API(cloud function of firebase) URL
});

export default instance;