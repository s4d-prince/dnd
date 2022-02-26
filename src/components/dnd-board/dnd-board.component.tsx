import React, { ChangeEvent, FC, useState, KeyboardEvent } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import BoardItem, { BoardItemInterface } from "../board-item/board-item.component";
import styles from "./dnd-board.module.scss";
import { v4 as uuid } from "uuid";
import { switchAndAddToColumn } from "../../helpers/column-switcher";
import { createItem } from "../../helpers/create-item";
import onDragEndLogic from "../../helpers/drag-and-drop-result";

const DndBoard: FC = () => {
  const [leftColumn, setLeftColumn] = useState<BoardItemInterface[]>([]);
  const [rightColumn, setRightColumn] = useState<BoardItemInterface[]>([]);
  const [value, setValue] = useState<string>("");
  const [differentAdding, setDifferentAdding] = useState<boolean>(false);
  const [nowAddToColumn, setCurrentToAddColumn] = useState<boolean>(true);

  const inputChangesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => (prevState = e.target.value));
  };

  const clearListHandler = () => {
    setLeftColumn([]);
    setRightColumn([]);
  };

  const changeAddingType = () => {
    setDifferentAdding((prevState) => !prevState);
  };

  const addItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && value !== "") {
      if (differentAdding) {
        switchAndAddToColumn(value, nowAddToColumn, setLeftColumn, setRightColumn, setCurrentToAddColumn);
      } else {
        createItem(setLeftColumn, {
          id: uuid(),
          text: value,
          column: "left",
          draggable: true,
        });
      }
      setValue("");
    } else {
      return;
    }
  };

  const onDragEnd = (result: DropResult) =>
    onDragEndLogic(result, leftColumn, rightColumn, setLeftColumn, setRightColumn);

  return (
    <>
      <div className={styles.createNewItem}>
        <span onClick={changeAddingType}>{`Add to ${differentAdding ? "different columns" : "left column"} `}</span>
        <span onClick={clearListHandler}>Clear list</span>
        <span>Save Items</span>
        <input
          type='text'
          onKeyDown={addItemHandler}
          onChange={inputChangesHandler}
          value={value}
          placeholder='Enter here some text...'
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.dndBoard}>
          <Droppable droppableId='left'>
            {(provided) => (
              <div
                className={`${styles.droppableArea} ${styles.leftColumn}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {leftColumn.map((el, index) => (
                  <BoardItem onPinClick={() => console.log("Log")} key={el.id} {...el} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId='right'>
            {(provided) => (
              <div
                className={`${styles.droppableArea} ${styles.rightColumn}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {rightColumn.map((el, index) => (
                  <BoardItem onPinClick={() => console.log("Log")} key={el.id} {...el} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default DndBoard;
