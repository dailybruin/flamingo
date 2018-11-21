import Footer from '@dailybruin/lux/src/components/Footer'
import * as React from 'react'


const layoutStyle = {
    maxWidth: 1200,
    margin: 'auto'
};

class Layout extends React.Component {
  render() {
    return (
      <div style={layoutStyle}>
        {this.props.children}
        <Footer 
          footerType={1} 
          copyrightYear={2018}
          developers={[]}/>
      </div>
    );
  }
};

export default Layout;
