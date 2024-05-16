import React, { useState } from "react";
import "./ChatBot.css";
const Chatbot = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleClass = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="chatbot-parent" onClick={handleClass}>
        {collapsed ? (
          <i className="fa-solid fa-robot"></i>
        ) : (
          <i className="fa-solid fa-xmark"></i>
        )}
      </div>
      <iframe
        allow="microphone;"
        className={collapsed ? "collapsed" : "not-collapsed"}
        src="https://console.dialogflow.com/api-client/demo/embedded/642f7903-51b4-4ca3-94ca-869aab0ac36d"
      ></iframe>
    </>
  );
};

export default Chatbot;
