import React, { FC, useEffect, useState, useMemo } from "react";

import styles from "./grid.module.scss";

export interface GridPosition {
  row?: number;
  column: number;
  rowSpan?: number;
  columnSpan?: number;
}

export interface GridConfig {
  maxRows: number;
  maxColumns: number;
  data: Array<Record<string, unknown> & { gridPosition: GridPosition }>;
}

export interface GridsFullness {
  rows: number[];
  columns: number[];
}

const Grid: FC<GridConfig> = ({ maxRows, maxColumns, data, children }) => {
  // const [grid, setGrid] = useState<GridsFullness>({
  //   rows: [],
  //   columns: [],
  // });
  // const isItemValid = (item: Record<string, unknown> & { gridPosition: GridPosition }) => {
  //   if (item.gridPosition.row && item.gridPosition.row <= maxRows) {
  //     setGrid((prevState) => ({
  //       ...prevState,
  //       rows,
  //     }));
  //   }
  // };
  useEffect(() => {
    const temporaryRowsArray: number[] = [];
    temporaryRowsArray.length = maxRows;
    const temporaryColumnsArray: number[] = [];
    temporaryColumnsArray.length = maxColumns;
    // setGrid(prevState => {
    //   prevState.rows = temporaryRowsArray;
    //   prevState.columns = temporaryColumnsArray;
    // });
  }, [maxColumns, maxRows]);

  const getItemRowSpan = (row?: number, rowSpan?: number) =>
    `${row && rowSpan && row + rowSpan < maxRows ? `span ${rowSpan}` : ""}`;
  const getItemGridPosition = (column: number, row?: number, rowSpan?: number) => ({
    gridRow: `${row ?? "auto"} ${getItemRowSpan(row, rowSpan)}`,
    // Settable column span ?????
    // gridColumn: `${column} ${column + columnSpan < maxRows ? `span ${columnSpan}` : ''}`,
    gridColumn: `${column}`,
    border: "1px solid black",
  });
  const gridStyles = useMemo(
    () => ({
      gridTemplateRows: `repeat(${maxRows}, 1fr)`,
      gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
    }),
    [maxColumns, maxRows]
  );
  return (
    <div className={styles.grid} style={gridStyles}>
      {data.map((item) => {
        const { gridPosition } = item;
        const { column, row, rowSpan } = gridPosition;
        const otherItemProps = [];
        for (let prop in item) otherItemProps.push(prop);
        return <div style={getItemGridPosition(column, row, rowSpan)}>{otherItemProps.map((prop) => prop)}</div>;
      })}
    </div>
  );
};

export default Grid;
