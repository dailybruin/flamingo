import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://gallery.dailybruin.com/django/get_gallery_data'
    
});

export default instance;
