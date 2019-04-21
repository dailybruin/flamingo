import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react';
import PageWrapper from '../layouts/PageWrapper';

class Index extends Component {
  render() {
    return(
      <div>
        This is the home page
      </div>
    );
  }
}

export default PageWrapper(Index)
