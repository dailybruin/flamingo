import PageWrapper from "../layouts/PageWrapper";
import React, { Component } from "react";
import styles from '../styles/AboutMe.module.css';

class Page extends Component {
    render() {
    return(
    <div className = { styles.container } >
      <h1 className={styles.title}>All About Me</h1>
      <div className={styles.content}>
        <div className={styles.section}>
          <label>My Name Is:</label>
          <p>Your Name Here</p>
        </div>
        <div className={styles.section}>
          <label>My Age:</label>
          <p>Your Age Here</p>
        </div>
        <div className={styles.section}>
          <label>My Birthday:</label>
          <p>Your Birthday Here</p>
        </div>
        <div className={styles.section}>
          <label>My Pet:</label>
          <p>Your Pet Here</p>
        </div>
        <div className={styles.section}>
          <label>My Favorite Color:</label>
          <p>Your Favorite Color Here</p>
        </div>
        <div className={styles.section}>
          <label>My Favorite Food:</label>
          <p>Your Favorite Food Here</p>
        </div>
        <div className={styles.section}>
          <label>I Really Like...</label>
          <p>What you really like here...</p>
        </div>
      </div>
    </div>
  ); }
}

export default PageWrapper(Page);
