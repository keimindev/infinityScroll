import React from "react";
import InfinityScroll from "./InfinityScroll";
import axios from "axios";
import Main from "./Main";
import Page from "./Page";
import { Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main} />
      <Route path="/page" exact component={Page} />
    </div>
  );
}

export default App;
