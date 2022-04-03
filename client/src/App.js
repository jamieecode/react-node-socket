import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  // 방
  const [room, setRoom] = useState("");

  // 메시지
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Room Number"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}> Join Room </button>
      <input
        type="text"
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: </h1>
      <p>{receivedMessage}</p>
    </div>
  );
}

export default App;
