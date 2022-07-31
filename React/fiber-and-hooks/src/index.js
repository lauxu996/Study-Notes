import React from './myReact/index';
const ReactDOM = React;
// import React from "react";
// import ReactDOM from "react-dom";
const App = (
  <div>
    <h1>Title</h1>
    <a herf = "xxx">Jump</a>
      <p>
        Article
      </p>
  </div>
)

ReactDOM.render(
  App, //通过babel将HTML被转换成了React.createElement
  document.getElementById("root")
)