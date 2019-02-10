import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import SemiModal from "./SemiModal";

const App = () => {
  const [semiModalOpen, setSemiModalOpen] = useState(false);

  return (
    <div>
      <h1 style={{ margin: "0 0 0.5em 0" }}>SemiModal</h1>
      <button onClick={() => setSemiModalOpen(open => !open)}>
        {semiModalOpen ? "close" : "open"}
      </button>
      <SemiModal
        open={semiModalOpen}
        callbackOnClose={() => setSemiModalOpen(false)}
      >
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
