import React from "react";
function Main() {
  return (
    <div className="note" style={{ background: "#CC0000" }}>
      <h1
        style={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "70px",
          lineHeight: "105px",
          color: "#FFFFFF",
        }}
      >
        RecipMend
      </h1>
      <div>
        Online Recipe Recommender based on your diet, lifestyle and more
      </div>
    </div>
  );
}

export default Main;
