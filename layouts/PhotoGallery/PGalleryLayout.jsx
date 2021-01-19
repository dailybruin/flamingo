import React from 'react'
import './PG.css';

dummyData = {
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

    const images = dummyData[data]
    return (
        <div class="photos-container">
        {//Next time, make a React ContainerItem component that accepts an img and a caption prop. and also accepts a boolean prop denoting which to display on the LHS.}
        {images.map( img => (<img src={img.url}/>) )}

        <ContainerItem img=img_url caption=my_caption first=0 o/>
        </div>
    )
}

export default PGalleryLayout


