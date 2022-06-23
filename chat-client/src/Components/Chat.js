import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import { useStore } from "zustand";
const Chat = (props) => {
  const socket = props.socket;
  const { username, room } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      messages.push({
        userId: data.userId,
        username: data.username,
        text: data.text,
      });
      setMessages([...messages]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      socket.emit("chat", text);
      setText("");
    }
  };

  return (
    <div class="w-full flex justify-center items-center h-screen rounded-2xl">
      <div class="max-w-2xl border rounded-2xl w-full">
        <div class="w-full bg-white rounded-2xl">
          <div
            class="relative flex  items-center p-3 border-b border-gray-300 rounded-t-2xl text-white"
            style={{ backgroundColor: "#ff2d55" }}
          >
            <span class="block text-xl text-white font-semibold text-center w-full">
              Room: {room}
            </span>
          </div>
          <div class="relative w-full p-6  overflow-y-auto h-[40rem]">
            <ul class="space-y-2">
              {messages.map((item) => {
                if (item.username === "server") {
                  return (
                    <li class="flex justify-center">
                      <div className="flex flex-col items-end">
                        <div
                          class="relative max-w-xl px-4 py-2  text-white rounded shadow"
                          style={{ backgroundColor: "#ff2d55" }}
                        >
                          <span class="block">{item.text}</span>
                        </div>
                      </div>
                    </li>
                  );
                } else if (item.username === username) {
                  return (
                    <li class="flex justify-end">
                      <div className="flex flex-col items-end">
                        <div class="relative max-w-xl px-4 py-2 text-gray-800 bg-gray-300 rounded shadow">
                          <span class="block">{item.text}</span>
                        </div>
                        <span className="block mr-2 text-gray-500">{item.username}</span>
                      </div>
                    </li>
                  );
                } else
                  return (
                    <li class="flex justify-start">
                      <div className="flex flex-col items-start">
                        <div class="relative max-w-xl px-4 py-2 text-gray-800 bg-gray-300 rounded shadow">
                          <span class="block">{item.text}</span>
                        </div>
                        <span className="block ml-2 text-gray-500">{item.username}</span>
                      </div>
                    </li>
                  );
              })}
            </ul>
          </div>

          <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendData()}
              placeholder="Message"
              class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message"
              required
            />

            <button
              type="submit"
              className="text-3xl"
              style={{ color: "#ff2d55" }}
              onClick={() => {
                sendData();
              }}
            >
              <BiSend></BiSend>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
