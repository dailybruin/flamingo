import React from 'react';
import css from '../style.module.css';
import ContainerItem from './ContainerItem';

var dummyData = {
    "type": "alternating",
    "data": [
        {
            "url": "https://wp.dailybruin.com/images/2020/06/breaking-1.png",
            "caption": "And let’s end all this nonsense about how long sentences = run-on sentences. You can have a six-word run-on sentence (“I went shopping I ate donuts.”), while most of the sentences below are much, much longer than that and are not run-ons (except for a few examples like Jose Saramago)."
        },
        {
            "url": "https://wp.dailybruin.com/images/2020/06/web.news_.facultyresponse.KM_.jpg",
            "caption": "And let’s end all this nonsense about how long sentences = run-on sentences. You can have a six-word run-on sentence (“I went shopping I ate donuts.”), while most of the sentences below are much, much longer than that and are not run-ons (except for a few examples like Jose Saramago)."
        },
        {
            "url": "https://brand.ucla.edu/images/identity/logos-and-marks/script-logo.jpg",
            "caption": "And let’s end all this nonsense about how long sentences = run-on sentences. You can have a six-word run-on sentence (“I went shopping I ate donuts.”), while most of the sentences below are much, much longer than that and are not run-ons (except for a few examples like Jose Saramago)."

        },
        {
            "url": "https://wp.dailybruin.com/images/2017/03/db-logo.png",
            "caption": "And let’s end all this nonsense about how long sentences = run-on sentences. You can have a six-word run-on sentence (“I went shopping I ate donuts.”), while most of the sentences below are much, much longer than that and are not run-ons (except for a few examples like Jose Saramago)."

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


