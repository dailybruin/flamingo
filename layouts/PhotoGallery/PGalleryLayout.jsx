import React from 'react';
import css from '../style.module.css';
import ContainerItem from './ContainerItem';

var dummyData = {
    "type": "alternating",
    "data": [
        {
            "url": "https://wp.dailybruin.com/images/2020/06/breaking-1.png",
            "caption": "one"
        },
        {
            "url": "https://wp.dailybruin.com/images/2020/06/web.news_.facultyresponse.KM_.jpg",
            "caption": "two"
        },
        {
            "url": "https://brand.ucla.edu/images/identity/logos-and-marks/script-logo.jpg",
            "caption": "ucla"

        },
        {
            "url": "https://wp.dailybruin.com/images/2017/03/db-logo.png",
            "caption": "daily bruin"

        }
    ]
}



function PGalleryLayout() {
    // dummyData.data[index]
    // index is odd --> left
    // index is even --> right

    const entries = dummyData["data"]
    return (
        <div className={css['photos-container']}>
            {/* {images.map( img => (<img src={img.url}/>) )}

            <ContainerItem caption=my_caption img=img_url first=0 o/>'' */}
            {
                entries.map((entry, index) => (
                    <ContainerItem
                        caption={entry.caption}
                        img_url={entry.url}
                        first={index % 2}
                    />

                ))

            }


        </div>
    )
}

export default PGalleryLayout


