import React from "react";
import { history } from "./redux/configStore";

const Page = () => {
  return (
    <div>
      <button onClick={() => history.goBack()}>back to Main</button>
    </div>
  );
};

export default Page;
