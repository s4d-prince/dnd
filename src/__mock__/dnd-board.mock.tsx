import React from "react";
import { v4 as uuid } from "uuid";

import BarsIcon from "../assets/svg/bars.icon";
import { BoardItemProps } from "../components/board-item/board-item.component";

export const mockDataForDndBoardLeftColumn: BoardItemProps[] = [
  {
    id: `${uuid()}`,
    draggable: true,
    column: "left",
    text: "Greating!",
    icon: <BarsIcon />,
  },
  {
    id: `${uuid()}`,
    draggable: true,
    column: "left",
    text: "What?!",
    icon: <BarsIcon />,
  },
  {
    id: `${uuid()}`,
    draggable: true,
    column: "left",
    text: "My name is Grisha",
    icon: <BarsIcon />,
  },
];

export const mockDataForDndBoardRightColumn: BoardItemProps[] = [
  {
    id: `${uuid()}`,
    draggable: true,
    column: "right",
    text: "How are you?",
    icon: <BarsIcon />,
  },
  {
    id: `${uuid()}`,
    draggable: true,
    column: "right",
    text: "I'm really cool! :)",
    icon: <BarsIcon />,
  },
];
