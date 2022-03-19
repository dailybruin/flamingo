import React, { useState, useEffect } from 'react';
import css_selector from '../../layouts/style.module.css';
import { css, jsx } from "@emotion/core";

import axios_to_gallery from './axios_to_gallery';
import ShareButtons from "../ShareButtons";
import AuthorCard from "../AuthorCard";
import ContainerItem from './ContainerItem';
import Header from './Header';

var dummyData = {
    "layout": "alternating",
    "data": [
        {
            "type": "corrections-text",
            "description": "This article was modified on Jan 4. 2021 to update the recent changes in food prices."
        },
        {
            "type": "article-text",
            "description": "This is a caption with *italics* and **bold** font. The impact of the fast food industry on America cannot be underestimated."
        },
        {
            "type": "center-photo",
            "img_url": "https://wp.dailybruin.com/images/galleries/traditions-o-issue/4.JDS_.jpg",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "James Schaap/Daily Bruin"
        },
        {
            "type": "article-text",
            "description": "The impact of the **fast food industry** on America cannot be underestimated. Starting from the 1900s, the belt of quick-service chains arose from...McDonald's restaurants mainly serve hamburgers, cheeseburgers, chicken nuggets, burgers, French fries, breakfast items, soft drinks, milkshakes and desserts. They also have options such as salads, apples, milk, and Snack Wraps on the menu. And kids meals are available too. In Australia, they sell the Frozen Coke[7], which is very popular. More McDonald's food is sold in the United States than in any other area, which means that it is McDonald's largest market.Europe is McDonald's second largest market.[8] The restaurants are either operated directly by McDonalds or more often by a franchisee,[9] where the business is owned and operated by someone else to the standards set by McDonald's and with support from the McDonald's company. The company provides a central source ",
        },
        {
            "type": "alt-photo",
            "img_url": "https://wp.dailybruin.com/images/2020/06/breaking-1.png",
            "description": "“I would [tell myself](https://wp.dailybruin.com/images/2020/06/breaking-1.png) to not dwell and be hung up on problems that seem large at the time but, in reality, are so *minuscule* and incomparable to the real problems in the world,” Wong said.",
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
            "img_url": "https://wp.dailybruin.com/images/2021/01/Jill.Chen_.CK_.jpg",
            "description": "“All of the things I’ve done were so that I can live without regrets,” Chen said. “This year’s experience has revealed the importance of this mindset even more profoundly.”",
            "credits": "Christine Kao/Daily Bruin staff"
        },
        {
            "type": "alt-photo",
            "img_url": "https://wp.dailybruin.com/images/2021/01/Anita.Wong_.EB_.jpg",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Ella Barnes/Daily Bruin"
        },
        {
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
    "layout": "big-centered-stream",
    "data": [
        {
            "type": "corrections-text",
            "description": "This article was modified on Jan 4. 2021 to update the recent changes in food prices."
        },
        {
            "type": "article-text",
            "img_url": "",
            "description": "# This is a **bolded heading.** ",
            "credits": ""
        },
        {
            "type": "article-text",
            "img_url": "",
            "description": "# This is an *italicized heading.* ",
            "credits": ""
        },
        {
            "type": "article-text",
            "img_url": "",
            "description": "## This is a subheading.",
            "credits": ""
        },
        {
            "type": "article-text",
            "img_url": "",
            "description": "# This is a heading.",
            "credits": ""
        },
        {
            "type": "big-center-photo",
            "img_url": "https://i.imgur.com/BLyj5ac.jpg",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"
        },
        {
            "type": "article-text",
            "description": "**Catalina Island** is a popular attraction in California.**Catalina Island** is a popular attraction in California.**Catalina Island** is a popular attraction in California.**Catalina Island** is a popular attraction in California.**Catalina Island** is a popular attraction in California.**Catalina Island** is a popular attraction in California.",
        },
        {
            "type": "big-center-photo",
            "img_url": "https://i.imgur.com/qjuDfzp.jpg",
            "description": "“I would tell myself to not dwell and be hung up on problems that seem large at the time but, in reality, are so minuscule and incomparable to the real problems in the world,” Wong said.",
            "credits": "Jonathan Sylvester"

        },
        {
            "type": "article-text",
            "description": "Malcom in the Middle was his favorite TV show.",
        },
        {
            "type": "big-center-photo",
            "img_url": "https://i.imgur.com/flaTOWO.jpg",
            "description": "Skyline",
            "credits": "Chinese agency"
        },
        {
            "type": "big-center-photo",
            "img_url": "https://i.imgur.com/YuYZAl2.jpg",
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

    var testing = false;
    if (testing) {
        useEffect(() => {
            async function fetchData() {
                setLayout(dummyDataBig['layout']);
                setEntries(dummyDataBig['data']);
            }
            fetchData();
        }, []);
    } else {
        useEffect(() => {
            async function fetchData() {
                try {
                    const req = await axios_to_gallery.get(`/${props.galleryID}`)
                    console.log("axios get called");
                    // console.log(req.data);
                    setLayout(req.data['layout']);
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
    return (
        <React.Fragment>
            <Header
                headline={props.headline}
                photographers={props.authors}
                date={props.date}
            />

            


            <div className={css_selector[photosContainerType]} 
                css={css`
                background-color: ${this.props.darkmode ? "#000" : "#222"};
            `}>
                <h1>{this.props.darkmode ? "PGallery True" : "PGallery False"}</h1>
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
                    darkmode={props.darkmode}
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


