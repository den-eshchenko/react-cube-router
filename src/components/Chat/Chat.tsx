import { useEffect, useState } from "react";
import { Messages } from "./Messages/Messages";
import { SendMessage } from "./SendMessage/SendMessage";
import { Rooms } from "./Rooms/Rooms";
import { useAppSelector } from "../../app/store";
import { useGetRoomDataQuery } from "../../api/events";
import { getSocket } from "../../api/socket";
import styles from "./Chat.module.css";


export const Chat: React.FC = () => {
  const userLogin = useAppSelector((state) => state.auth.login);
  const [activeRoom, setActiveRoom] = useState("");
  const { data: roomData } = useGetRoomDataQuery({ userLogin: userLogin || "" }, { skip: !userLogin });

  useEffect(() => {
    const socket = getSocket();

    if (userLogin) {
      socket.emit("rooms/connect", userLogin);
    }
  }, [userLogin]);

  return (
    <>
      <Rooms
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
        rooms={roomData?.rooms}
        isConnected={!!roomData?.isConnected}
      />
        <div className={styles.wrapper}>
          {activeRoom ? (
            <>
              <Messages messages={roomData?.rooms?.[activeRoom]?.messages} />
              <SendMessage activeRoom={activeRoom} />
            </>
          ) : null }
        </div>
    </>
  );
};