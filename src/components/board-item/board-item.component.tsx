import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import BarsIcon from "../../assets/svg/bars.icon";
import ThumbtackIcon from "../../assets/svg/thumbtack.icon";

import styles from "./board-item.module.scss";

export interface BoardItemInterface {
  id: string;
  index?: number;
  column: "left" | "right";
  text?: string;
  draggable: boolean;
}

export interface BoardItemProps extends BoardItemInterface {
  onPinClick: () => void;
}

const BoardItem: FC<BoardItemProps> = ({ id, column, index = 0, text, draggable, onPinClick }) => {
  return (
    <>
      {draggable ? (
        <Draggable draggableId={id} index={index}>
          {(provided) => (
            <div className={`${styles.item}`} {...provided.draggableProps} ref={provided.innerRef}>
              <div className={styles.icons}>
                <span onClick={onPinClick} className={`${styles.itemPinIcon} ${!draggable ? styles.pinned : ""}`}>
                  <ThumbtackIcon />
                </span>
                <span
                  {...provided.dragHandleProps}
                  className={`${styles.itemGrabIcon} ${!draggable ? styles.isNotDraggable : ""}`}
                >
                  <BarsIcon />
                </span>
              </div>
              <span className={styles.itemText}>{text}</span>
            </div>
          )}
        </Draggable>
      ) : (
        <div className={`${styles.item}`}>
          <div className={styles.icons}>
            <span onClick={onPinClick} className={`${styles.itemPinIcon} ${!draggable ? styles.pinned : ""}`}>
              <ThumbtackIcon />
            </span>
            <span className={`${styles.itemGrabIcon} ${!draggable ? styles.isNotDraggable : ""}`}>
              <BarsIcon />
            </span>
          </div>
          <span className={styles.itemText}>
            {text} {column}
          </span>
        </div>
      )}
    </>
  );
};

export default BoardItem;
