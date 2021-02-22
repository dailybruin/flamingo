import React from 'react'
import css from '../style.module.css';


function ContainerItem(props) {
    // if (props.first == 0) {
    //     return (
    //         <div className={css['row']}>
    //             <div className={css['caption']}> {props.caption}</div>
    //             <img className={css['image']} src={props.img_url} alt='gallery-image'></img>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div className={css['row']}>
    //             <img className={css['image']} src={props.img_url} alt='gallery-image'></img>
    //             <div className={css['caption']}> {props.caption}</div>
    //         </div>
    //     ) 
    // }

    // This code below should work with the most up-to-date API (not yet avail on the web) and allow for article-text and center-photo
   
    if (props.type == 'center-photo') {
        return (
            <div className={css['center-photo']}>
                <img className={css['center-image']} src={props.img_url} alt='gallery-image'></img>
                {/* <div className={css['caption']}> {props.description}</div> 
                we elect not to have a caption if it's center photo */}
                <p className={css['credits']}> {props.credits} </p>
            </div>
        )
    } else if (props.type == 'article-text') {
        return (
            <div className={css['article-text']}>
                {props.description}
            </div>
        )
    } else if (props.type == 'alt-photo') {
        if (props.first == 0) {
            var cred_style = {
                textAlign: 'right'
            };
            return (
                <div className={css['row']}>
                    <div className={css['caption']}> {props.description}</div>
                    <div className={css['img-col']}>
                        <img className={css['image']} src={props.img_url} alt='gallery-image'></img>
                        <p className={css['credits']} style={cred_style}> {props.credits} </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={css['row']}>
                    <div className={css['img-col']}>
                        <img className={css['image']} src={props.img_url} alt='gallery-image'></img>
                        <p className={css['credits']}> {props.credits} </p>
                    </div>
                    <div className={css['caption']}> {props.description}</div>
                </div>
            )

        }
        
    }

}




export default ContainerItem


