import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:1997";

const App = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("countdown", (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  
  return (
    <div>
      It's <time dateTime={response}>{response}</time>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
