import * as React from 'react'
import MainSiteFooter from '@dailybruin/lux/src/components/MainSiteFooter'

const layoutStyle = {
  maxWidth: 1200,
  margin: 'auto'
};

class Layout extends React.Component {
  render() {
    return (
      <div style={layoutStyle}>
        {this.props.children}
        <MainSiteFooter/>
      </div>
    );
  }
};

export default Layout;
