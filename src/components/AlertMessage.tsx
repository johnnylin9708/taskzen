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

const AlertMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Backdrop>
      <div className="text-center" style={{ marginTop: "20%" }}>
        {/* <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div> */}
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      </div>
    </Backdrop>
  );
};
export default AlertMessage;
