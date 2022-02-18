import * as React from "react";
import { render } from "react-dom";

import Vert from "./Vert";
import Horz from "./Horz";
import Long from "./Long";
import Full from "./Full";
import Mini from "./Mini";
import Video from "./Video";
import Podcast from "./Podcast";

export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // <h1>Darkmode: {this.props.darkmode ? "True" : "False"}</h1>
    // console.log(this.props.darkmode);
    let card;
    switch (this.props.displayType) {
      case "vert":
        card = <Vert {...this.props} />;
        break;
      case "horz":
        card = <Horz {...this.props} />;
        break;
      case "long":
        card = <Long {...this.props} />;
        break;
      case "full":
        card = <Full {...this.props} />;
        break;
      case "mini":
        card = <Mini {...this.props} />;
        break;
      case "video":
        card = <Video {...this.props} />;
        break;
      case "podcast":
        card = <Podcast {...this.props} />;
        break;
      default:
        card = <Full {...this.props} />;
    }
    return card;
  }
}
