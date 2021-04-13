import React, { useState, useEffect } from 'react';
import css_selector from '../../layouts/style.module.css';
import { css, jsx } from "@emotion/core";

import axios_to_gallery from './axios_to_gallery';
import ShareButtons from "../ShareButtons";
import AuthorCard from "../AuthorCard";
import ContainerItem from './ContainerItem';
import Header from './Header';

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
        },
        {
            "type": "center-photo",
            "img_url": "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=1100&hei=733&fmt=jpeg&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=1,1,5,0&iccEmbed=0&printRes=72&fit=crop",
            "description": "Skyline",
            "credits": "Chinese agency"
        }
    ]
}

var dummyDataBig = {
    "type": "big-centered-stream",
    "data": [
        {
            "type": "big-center-photo",
            "img_url": "https://wp.dailybruin.com/images/2020/06/breaking-1.png",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"
        },
        {
            "type": "article-text",
            "description": "Shanghai has been described as the 'showpiece' of the booming economy of China. Shanghai has been described as the 'showpiece' of the booming economy of China. Shanghai has been described as the 'showpiece' of the booming economy of China. Shanghai has been described as the 'showpiece' of the booming economy of China. Shanghai has been described as the 'showpiece' of the booming economy of China. Shanghai has been described as the 'showpiece' of the booming economy of China. Shanghai has been described as the 'showpiece' of the booming economy of China. Shanghai has been described as the 'showpiece' of the booming economy of China.",
        },
        {
            "type": "big-center-photo",
            "img_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUnD4WCHH-z6BcHtUtRD6Jujg_dXp-yMOnQ&usqp=CAU",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"

        },
        {
            "type": "article-text",
            "description": "Shanghai has been described as the 'showpiece' of the booming economy of China.",
        },
        {
            "type": "big-center-photo",
            "img_url": "https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=1100&hei=733&fmt=jpeg&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=1,1,5,0&iccEmbed=0&printRes=72&fit=crop",
            "description": "Skyline",
            "credits": "Chinese agency"
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
const wrapCredits = (credits) => {
    if (credits != undefined && credits != "") {
        return `(${credits})`;
    } else {
        return credits;
    }
}



function PGallery(props) {
    // index is odd --> left
    // index is even --> right
    const [layout, setLayout] = useState();
    const [entries, setEntries] = useState([]);

    var testing = true;
    if (testing) {
        useEffect(() => {
            async function fetchData() {
                setLayout(dummyData['type']);
                setEntries(dummyData['data']);
            }
            fetchData();
        }, []);
    } else {
        useEffect(() => {
            async function fetchData() {
                try {
                    const req = await axios_to_gallery.get(`/${props.galleryID}`)
                    setLayout(req.data['type']);
                    setEntries(req.data['data']);
                } catch (e) {
                    console.log(e);
                }

            }
            fetchData();
        }, []);
    }
    if (!entries) {
        return <div>Loading photo galleries</div>
    }

    // Boiler plate
    let renderedAuthorCards = [];
    for (let author of props.authors) {
        renderedAuthorCards.push(
            <div
                css={css`
            padding: 20px 0;
          `}
            >
                <AuthorCard
                    image={
                        author.simple_local_avatar != null
                            ? author.simple_local_avatar.full
                            : author.avatar_urls[512]
                    }
                    name={author.name}
                    description={author.description}
                    position={author.acf.position}
                    twitter={author.acf.twitter}
                    email={author.media_email}
                    link={author.link}
                />
            </div>
        );
    }
    let photosContainerType = 'alternating-container';

    if (layout === 'big-centered-stream') {
        photosContainerType = 'big-centered-stream-container'
    }
    console.log(photosContainerType)

    return (
        <React.Fragment>
            <Header
                headline={props.headline}
                photographers={props.authors}
                date={props.date}
            />




            <div className={css_selector[photosContainerType]}>
                {
                    entries.map((entry, index) => (
                        <ContainerItem
                            layout_type={layout}
                            type={entry.type}
                            description={entry.description}
                            img_url={entry.img_url}
                            first={getAltVal(entry.type)}
                            credits={wrapCredits(entry.credits)}
                        />

                    ))

                }
            </div>

            <div>
                <ShareButtons
                    title={props.headline}
                    url={props.link}
                ></ShareButtons>
            </div>
            <div
                css={css`
              max-width: 600px;
              margin: auto;
            `}
            >
                {renderedAuthorCards}
            </div>
        </React.Fragment>
    );
}

export default PGallery


