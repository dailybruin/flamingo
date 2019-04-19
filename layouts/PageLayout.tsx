import * as React from 'react'
import MainSiteFooter from '@dailybruin/lux/src/components/MainSiteFooter'
import MainSiteHeader from '@dailybruin/lux/src/components/MainSiteHeader'

const layoutStyle = {
  maxWidth: 1200,
  margin: 'auto'
};

class Layout extends React.Component {
  render() {
    return (
      <div style={layoutStyle}>
        <MainSiteHeader />
        {this.props.children}
        <MainSiteFooter/>
      </div>
    );
  }
};

export default Layout;
