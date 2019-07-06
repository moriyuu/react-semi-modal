import React, { useState } from "react";
import ReactDOM from "react-dom";
import SemiModal from "../src/SemiModal";

const App = () => {
  const [semiModalOpen, setSemiModalOpen] = useState(false);

  return (
    <div>
      <h1 style={{ margin: "0 0 0.5em 0" }}>SemiModal</h1>

      {window.ontouchstart !== null && (
        <strong>
          Note: For Smartphones and Tablets Only (PC is Not Supported)
        </strong>
      )}

      <button onClick={() => setSemiModalOpen(open => !open)}>
        {semiModalOpen ? "close" : "open"}
      </button>

      <SemiModal open={semiModalOpen} onClose={() => setSemiModalOpen(false)}>
        <button
          style={{
            height: "40px",
            width: "100%",
            marginBottom: "40px",
            background: "#243346",
            borderRadius: "999px",
            color: "#fff",
            border: "none"
          }}
        >
          Do Nothing
        </button>
      </SemiModal>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
