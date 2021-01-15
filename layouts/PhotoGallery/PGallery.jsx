import React, { useState, useEffect } from 'react';
import axios_to_gallery from './axios_to_gallery';
import axios_to_wp from './axios_to_wp';



function readWPJSON(props) {
    // let wpID = props.wpID;

    let wpID = 32132;


    const [wpData, setWPData] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const req = await axios_to_wp.get('/32132');
            console.log("res.data is an " + typeof req.data);
            setWPData(req.data);
        }
        fetchData();
    }, []);

    
    console.log(wpData);
    console.log("read JSON finished.\n");
    console.log(wpData.acf);

    return;
    if('db_gallery_id' in wpData.acf && wpData.acf.db_gallery_id !== null) {
        console.log("There's a gallery id to fetch.\n");
    } else {
        console.log("There's no gallery id to fetch.\n");
    }

    console.log(`Yoast tile is ${wpData.yoast_title}`);
}

function PGallery(props) {
    let galleryID = props.galleryID;

    const [galleryData, setGalleryData] = useState([]);

    readWPJSON();

    return (<div></div>);
    useEffect( () => {
        async function fetchData() {
            const req = await axios_to_gallery.get(`/gallery/:${galleryID}`);
            setGalleryData(req.data);
        }
        fetchData();
    }, []);


    return (
        <div>
            
        </div>
    )
}


export default PGallery


