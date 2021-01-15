import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://gallery.dailybruin.com'
});

export default instance;
