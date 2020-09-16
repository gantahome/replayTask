import React from "react";
import template from "./Page.jsx";

class Page extends React.Component {
  render() {
    return template.call(this);
  }
  fnChild() {
    debugger;
    this.props.tab();
  }
}

export default Page;
