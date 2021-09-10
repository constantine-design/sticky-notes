import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/todos",
    headers: {
        "Content-Type": "application/json"
    }
})
