import React from 'react';
import css from '../style.module.css';
import ContainerItem from './ContainerItem';
import getGalleryMetadata from './GetGalleryMetadata';

var dummyData = {
    "type": "alternating",
    "data": [
        {
            "type": "alt-photo",
            "img_url": "https://wp.dailybruin.com/images/2020/06/breaking-1.png",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"
        },
        {
            "type": "alt-photo",
            "img_url": "https://wp.dailybruin.com/images/2020/06/web.news_.facultyresponse.KM_.jpg",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"
        },
        {
            "type": "alt-photo",
            "img_url": "https://brand.ucla.edu/images/identity/logos-and-marks/script-logo.jpg",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"

        },
        {
            "type": "alt-photo",
            "img_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUnD4WCHH-z6BcHtUtRD6Jujg_dXp-yMOnQ&usqp=CAU",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"

        }, {
            "type": "center-photo",
            "img_url": "https://i.ytimg.com/vi/0WySwn67yEg/maxresdefault.jpg",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"
        },
        {
            "type": "article-text",
            "description": "The impact of the fast food industry on America cannot be underestimated. Starting from the 1900s, the belt of quick-service chains arose from...McDonald's restaurants mainly serve hamburgers, cheeseburgers, chicken nuggets, burgers, French fries, breakfast items, soft drinks, milkshakes and desserts. They also have options such as salads, apples, milk, and Snack Wraps on the menu. And kids meals are available too. In Australia, they sell the Frozen Coke[7], which is very popular. More McDonald's food is sold in the United States than in any other area, which means that it is McDonald's largest market.Europe is McDonald's second largest market.[8] The restaurants are either operated directly by McDonalds or more often by a franchisee,[9] where the business is owned and operated by someone else to the standards set by McDonald's and with support from the McDonald's company. The company provides a central source ",
        },
        {
            "type": "center-photo",
            "img_url": "https://static2.cbrimages.com/wordpress/wp-content/uploads/2020/02/Burger-King-mascot-header.png?q=50&fit=crop&w=960&h=500&dpr=1.5",
            "description": "The Burger King",
            "credits": "Burger King Corp"
        },
        {
            "type": "article-text",
            "description": "The impact of the fast food industry on America cannot be underestimated.",
        },
        {
            "type": "center-photo",
            "img_url": "https://image.freepik.com/free-photo/vertical-view-eiffel-tower-paris-france_1258-3169.jpg",
            "description": "vertical picture",
            "credits": "Internet"
        },
        {
            "type": "article-text",
            "description": "This is how a vertical image looks like.",
        }
    ]
}
var counter = -1;
const getAltVal = (type) => {
    if (type == 'alt-photo') {
        counter++;
        return counter % 2;
    } else {
        return -1; //TODO: this can be used to catch errors down the line
    }
}


function PGalleryLayout(props) {
    // dummyData.data[index]
    // index is odd --> left
    // index is even --> right
    const testing = true;
    let entries = null;
    if(testing) {
        entries = dummyData['data']
    } else {
        console.log("PGalleryLayout sees wpID of", props.wpID);
        const galleryJSON = getGalleryMetadata(props.wpID);
        entries = galleryJSON['data']
    }




    return (
        <div className={css['photos-container']}>
            {
                entries.map((entry, index) => (
                    <ContainerItem
                        type={entry.type}
                        description={entry.description}
                        img_url={entry.img_url}
                        first={getAltVal(entry.type)}
                        credits={entry.credits}
                    />

                ))

            }


        </div>
    )
}

export default PGalleryLayout


