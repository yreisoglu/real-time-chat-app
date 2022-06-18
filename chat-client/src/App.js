import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./Components/Chat";
const socket = io.connect("/");

function App() {
  return (
    <div className="bg-slate-100 h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login socket={socket} />} />
          <Route path="/chat/:room/:username" element={<Chat socket={socket} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
