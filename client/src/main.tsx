import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Custom styles
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --saffron: #FF9933;
    --indian-green: #138808;
    --indian-white: #FFFFFF;
    --navy: #000080;
    --purple: #800080;
  }

  body {
    font-family: 'Noto Sans', 'Open Sans', sans-serif;
    color: var(--navy);
  }

  .chat-container::-webkit-scrollbar {
    width: 6px;
  }
  
  .chat-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 128, 0.2);
    border-radius: 10px;
  }

  .indian-flag-strip {
    background: linear-gradient(to right, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%);
    height: 4px;
  }

  .bot-message-loader {
    display: flex;
    align-items: center;
    padding: 8px 12px;
  }
  
  .loader-dot {
    background-color: #138808;
    border-radius: 50%;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    animation: bounce 1.2s infinite ease-in-out;
  }
  
  .loader-dot:nth-child(1) {
    animation-delay: 0s;
  }
  
  .loader-dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .loader-dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
  }
`;

createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyles />
    <App />
  </>
);
