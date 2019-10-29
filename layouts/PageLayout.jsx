import * as React from 'react'
import MainSiteFooter from '../components/MainSiteFooter'
import MainSiteHeader from '../components/MainSiteHeader'
import {Config} from '../config'

const layoutStyle = {
  maxWidth: 1200,
  margin: '8px auto'
};

class Layout extends React.Component {
  static async getInitialProps(context) {
    console.log("hello")
    const categoriesRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/categories`
    );
    const categories = await categoriesRes.json();

    const mappedCategories = categories.map(index => {
      return ({category: index.slug, categoryURL: index.link})
    })
    console.log(mappedCategories);
    return mappedCategories;
  }

  render() {
    return (
      <div style={layoutStyle}>
        {this.props.children}
      </div>
    );
  }
};

export default Layout;
