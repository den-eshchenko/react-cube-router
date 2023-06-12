import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import styles from "./Room.module.css";

type TProps = {
  roomName: string
  isActive: boolean
  setActiveRoom: React.Dispatch<React.SetStateAction<string>>
}

export const Room: React.FC<TProps> = ({ roomName, isActive, setActiveRoom }) => {
  const handleChangeActiveRoom = () => {
    setActiveRoom(roomName);
  };

  return (
    <div
      className={`${styles.iconWithTitle} ${isActive ? styles.active : ""}`}
      onClick={handleChangeActiveRoom}
    >
      <div><Avatar size="large" icon={<UserOutlined />} /></div>
      <div>{roomName}</div>
    </div>
  );
};