import React from 'react'
import css from '../style.module.css';

function ContainerItem(props) {
    if (props.first == 0) {
        return (
            <div className={css['row']}>
                <div className={css['caption']}> {props.caption}</div>
                <img className={css['image']} src={props.img_url} alt='gallery-image'></img>
            </div>
        )
    } else {
        return (
            <div className={css['row']}>
                <img className={css['image']} src={props.img_url} alt='gallery-image'></img>
                <div className={css['caption']}> {props.caption}</div>
            </div>
        ) 
    }
}


export default ContainerItem


