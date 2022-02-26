import React, { FC } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import styles from "./grid-board.module.scss";

export interface GridPosition {
  key: string | number;
  row?: number;
  column: number;
  width?: number;
  height?: number;
  static?: boolean;
  isResizable?: boolean;
}

export interface GridBoardProps {
  columns: number;
  rowHeight: number;
  data: Array<Record<string, unknown> & { gridPosition: GridPosition; text: string }>;
}

const GridBoard: FC<GridBoardProps> = ({ columns, rowHeight, data }) => {
  return (
    <ResponsiveGridLayout
      className={styles.gridLayout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
      width={700}
      rowHeight={120}
      compactType='horizontal'
    >
      {data.map((el) => (
        <div
          key={el.gridPosition.key}
          data-grid={{
            x: el.gridPosition.column,
            y: el.gridPosition.row,
            h: el.gridPosition.height,
            w: el.gridPosition.width,
            static: el.gridPosition.static ?? false,
            isResizable: el.gridPosition.isResizable ?? false,
          }}
        >
          {el.text}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GridBoard;
