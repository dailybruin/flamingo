import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://wp.dailybruin.com/wp-json/wp/v2/posts'
});

export default instance;
