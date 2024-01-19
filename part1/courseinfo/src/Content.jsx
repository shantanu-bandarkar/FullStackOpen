import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      <Part pt={props.pt1} ex={props.ex1}/>
      <Part pt={props.pt2} ex={props.ex2}/>
      <Part pt={props.pt3} ex={props.ex3}/>
    </div>
  );
};

export default Content;
