import "./Page.css";
import React from "react";

function template() {
  return (
    <div className="page">
      <span>
        <input type="text" />
        <input type="button" value="go" onClick={this.fnChild.bind(this)} />
      </span>
      <span>
        <input type="button" value="prev" />
        <input type="button" value="next" />
      </span>
      <span>Total Pages:</span>
    </div>
  );
}

export default template;
