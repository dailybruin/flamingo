import React from 'react';
import css from '../../layouts/style.module.css';
import ReactMarkdown from 'react-markdown';
import Media from 'react-media';
import Image from "next/image";


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
            <div className={css['row']}>
                <div className={css['center-img-col']}>
                    <div className={css["center-photo-wrapper"]}>
                       <Image
                           src={props.img_url}
                           alt="gallery-image"
                           fill
                           sizes="(max-width: 768px) 100vw, 800px"
                           loading="lazy"
                       />
                   </div>
                    {/* <div className={css['caption']}> {props.description}</div> 
                we elect not to have a caption if it's center photo */}
                    <p className={css['credits']}> {props.credits} </p>
                </div>
            </div>
        );
    } else if (props.type == 'article-text') {
        if (props.layout_type == 'alternating') { // only alternating layout needs to use rows
            return (
                <div className={css['row']}>
                    <p className={css['article-text']}>
                        <ReactMarkdown children={props.description} />
                    </p>
                </div>
            );
    } else {

      return (
        <div>
          <Media
            queries={{
              phone: "(max-width: 600px)",
              desktop: "(min-width: 601px)"
            }}
            defaultMatches={{ desktop: true }}
          >
            {matches => (
              <>
                {matches.phone && (
                  <p className={css["article-text-gallery-mobile"]}>
                    <ReactMarkdown children={props.description} />
                  </p>
                )}
                {matches.desktop && (
                  <p className={css["article-text-large-gallery"]}>
                    <ReactMarkdown children={props.description} />
                  </p>
                )}
              </>
            )}
          </Media>
        </div>
      );
    }

    } else if (props.type == 'alt-photo') {
        if (props.first == 0) {
            var cred_style = {
                textAlign: 'right'
            };
            return (
                <div className={css['row']}>
                    <div className={css['caption']}> <ReactMarkdown children={props.description} /> </div>
                        <div className={css['img-col']}>
                        <div className={css['image-wrapper']}>
                            <Image
                            src={props.img_url}
                            alt="gallery-image"
                            fill
                            sizes="(max-width: 768px) 50vw, 400px"
                            loading="lazy"
                            />
                        </div>
                        </div>
                        <p className={css['credits']} style={cred_style}> {props.credits} </p>
                    </div>
            );
        } else {
            return (
                <div className={css['row']}>
                    <div className={css['img-col']}>
                        <div className={css['image-wrapper']}>
                            <Image
                                src={props.img_url}
                                alt="gallery-image"
                                fill
                                sizes="(max-width: 768px) 50vw, 400px"
                                loading="lazy"
                            />
                            </div>

                        <p className={css['credits']}> {props.credits} </p>
                    </div>
                    <div className={css['caption']}> <ReactMarkdown children={props.description} /> </div>
                </div>
            );
        }

    } else if (props.type == 'big-center-photo') {
        return (
            <div>
                <div className={css["big-center-photo-wrapper"]}>
               <Image
                   src={props.img_url}
                   alt="big-center-photo"
                   fill
                   sizes="(max-width: 768px) 100vw, 1000px"
                   loading="lazy"
                   priority={props.index === 0}   // optional: hero image
               />
           </div>
                <p className={css['credits']}> {props.credits} </p>
            </div>
        )
    } else if (props.type == 'corrections-text') {
        return (
            <div>
                <p className={css['credits']}>
                    <ReactMarkdown children={props.description} />
                </p>
            </div>
        )
    }

}




export default ContainerItem


