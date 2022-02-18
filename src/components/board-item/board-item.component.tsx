import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import styles from "./board-item.module.scss";

export interface BoardItemProps {
    id: string;
    index?: number;
    column: "left" | "right";
    text?: string;
    draggable: boolean;
    icon: JSX.Element;
}

const BoardItem: FC<BoardItemProps> = ({ id, index = 0, column, text, draggable, icon }) => {
    return (
        <>
            {draggable ? (
                <Draggable draggableId={id} index={index}>
                    {(provided) => (
                        <div
                            className={`${styles.item} ${column === "left" ? styles.leftColumn : styles.rightColumn}`}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <span className={styles.itemIcon}>{icon}</span>
                            <span className={styles.itemText}>{text}</span>
                        </div>
                    )}
                </Draggable>
            ) : (
                <div className={`${styles.item} ${column === "left" ? styles.leftColumn : styles.rightColumn}`}>
                    <span className={styles.itemIcon}>{icon}</span>
                    <span className={styles.itemText}>{text}</span>
                </div>
            )}
        </>
    );
};

export default BoardItem;
