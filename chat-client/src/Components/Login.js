import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", username, room, (callback) => {
        if (callback.status === "OK") {
          navigate(`/chat/${room}/${username}`);
        }
      });
    }
  };
  return (
    <div className="h-screen flex items-center justify-center rounded-md">
      <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-1/3">
        <h1 className="font-semibold text-3xl text-center mb-4 border-b-2 pb-4">Start Chatting!</h1>

        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Room
          </label>
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="room"
            type="text"
            placeholder="Room"
          />
        </div>
        <button
          onClick={() => joinRoom()}
          class="p-3 text-white rounded-md text-lg"
          style={{ backgroundColor: "#ff2d55" }}
          type="button"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default Login;
