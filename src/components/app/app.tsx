import React, { FC } from "react";

import styles from "./app.module.scss";
import GridBoard from "../grid-board/grid-board.component";

const App: FC = () => {
  const data = [
    {
      gridPosition: { key: "a", column: 4, row: 2, width: 1, height: 1 },
      text: "a",
    },
    {
      gridPosition: { key: "b", column: 3, row: 4, width: 1, height: 1, isResizable: true },
      text: "b",
    },
    {
      gridPosition: { key: "c", column: 2, row: 4, width: 1, height: 1 },
      text: "c",
    },
    {
      gridPosition: { key: "d", column: 0, row: 0, width: 2, height: 1, static: true },
      text: "d",
    },
  ];
  return (
    <div className={styles.appWrapper}>
      <GridBoard columns={5} rowHeight={100} data={data} />
    </div>
  );
};

export default App;
