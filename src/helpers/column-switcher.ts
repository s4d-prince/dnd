import React from "react";
import { v4 as uuid } from "uuid";
import { BoardItemInterface } from "../components/board-item/board-item.component";
import { createItem } from "./create-item";

export const switchAndAddToColumn = (
  value: string,
  currentColumn: boolean,
  addToLeftColumnFn: React.Dispatch<React.SetStateAction<BoardItemInterface[]>>,
  addToRightColumnFn: React.Dispatch<React.SetStateAction<BoardItemInterface[]>>,
  switchColumnFn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (currentColumn) {
    createItem(addToLeftColumnFn, { id: uuid(), text: value, column: "left", draggable: true });
    switchColumnFn((prevState: boolean) => !prevState);
  } else {
    createItem(addToRightColumnFn, {
      id: uuid(),
      text: value,
      column: "right",
      draggable: true,
    });
    switchColumnFn((prevState: boolean) => !prevState);
  }
};
