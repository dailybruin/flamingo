import * as React from 'react'
import MainSiteFooter from '@dailybruin/lux/src/components/MainSiteFooter'
import MainSiteHeader from '@dailybruin/lux/src/components/MainSiteHeader'

const layoutStyle = {
  maxWidth: 1200,
  margin: 'auto'
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
        <MainSiteHeader links={this.props.mappedCategories} />
        {this.props.children}
        <MainSiteFooter/>
      </div>
    );
  }
};

export default Layout;
