import PageWrapper from "../layouts/PageWrapper";
import React, { Component } from "react";

class Page extends Component {
  
  render() {
        // If the window isn't loaded yet, don't let it throw an error
        if (typeof window === "undefined") {
            <p>Oops! We meant to redirect you to https://wp.dailybruin.com/classifieds</p>
        }
        else { // Redirect to the wp link
            window.location.href = 'https://wp.dailybruin.com/classifieds'; 
        }
        return null;
  }
}

export default PageWrapper(Page);