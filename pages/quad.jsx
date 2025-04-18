import PageWrapper from "../layouts/PageWrapper";
import React, { Component } from "react";

class Page extends Component {
    render() {
        // If the window isn't loaded yet, don't let it throw an error
        if (typeof window === "undefined") {
            <p>
                Oops! We meant to redirect you to https://dailybruin.com/category/quad
            </p>;
        } else {
            // Redirect
            window.location.href = "https://dailybruin.com/category/quad";
        }
        return null;
    }
}

export default PageWrapper(Page);
