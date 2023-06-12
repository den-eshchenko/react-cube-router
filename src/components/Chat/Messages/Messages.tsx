// import { useAppSelector } from '../../../app/store'
import { TMessage } from "../../../types/events";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { Avatar } from "antd";
import { useRef } from "react";
import styles from "./Messages.module.css";

type TProps = {
  messages?: TMessage[]
}

export const Messages: React.FC<TProps> = ({ messages = [] }) => {
  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  }));
  // const userLogin = useAppSelector((state) => state.auth.login)
  // const filteredMessages = messages.filter((message) => !(message.isJoin && message.userLogin === userLogin))

  
  
  return (
    <div className={styles.wrapper}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={messages.length}
              // onScroll={onScroll}
              scrollToIndex={messages.length}
              rowRenderer={({ key, index, parent, style }) => {
                const item = messages[index];

                return (
                  <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                    <div style={style}>
                      <div className={styles.flexContainer}>
                        {!item.isJoin && <Avatar style={{ marginRight: 5 }} />}
                        <h2>
                          {!item.isJoin && item.userLogin}
                        </h2>
                      </div>
                      <div className={styles.message}>
                        {!item.isJoin ? item.message : `${item.userLogin} ${item.message}`}
                      </div>
                    </div>
                  </CellMeasurer>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};