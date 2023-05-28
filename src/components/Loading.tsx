import React from "react";
import Styled from "styled-components";

const Backdrop = Styled.div`
    position:absolute;
    top:0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background-color: rgb(0,0,0,0.2);
`;

const Loading = () => {
  return (
    <Backdrop>
      <div className="text-center loading" style={{ marginTop: "20%" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </Backdrop>
  );
};
export default Loading;
