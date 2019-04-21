import React, { Component } from 'react'
import MainSiteFooter from '@dailybruin/lux/src/components/MainSiteFooter'
import MainSiteHeader from '@dailybruin/lux/src/components/MainSiteHeader'
import { Page } from 'csstype';
import { Config } from '../config.js';

const layoutStyle = {
  maxWidth: 1200,
  margin: 'auto'
};

const PageWrapper = Comp =>
  class extends Component {
    static async getInitialProps(ctx) {

      const categoriesRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/categories`
      );
      const categories = await categoriesRes.json();

      const mappedCategories = categories.map(index => {
        return ({category: index.name, categoryURL: '/category/' + index.slug})
      })

      const [childProps] = await Promise.all([
        Comp.getInitialProps(ctx),
        mappedCategories
      ]);

      console.log(mappedCategories)

      return {
        ...(Comp.getInitialProps ? childProps : null),
        mappedCategories
      };
    }

    render() {
      return (
        <div style={layoutStyle}>
          <MainSiteHeader links={this.props.mappedCategories} />
          <Comp {...this.props}/>
          <MainSiteFooter />
        </div>
      );

    }
  }

export default PageWrapper
