import React, { FC, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import {
    mockDataForDndBoardLeftColumn, mockDataForDndBoardRightColumn
} from '../../__mock__/dnd-board.mock';
import BoardItem, { BoardItemProps } from '../board-item/board-item.component';
import styles from './dndboard.module.scss';

const DndBoard: FC = () => {
  const [leftColumn, setLeftColumn] = useState<BoardItemProps[]>(
    mockDataForDndBoardLeftColumn
  );
  const [rightColumn, setRightColumn] = useState<BoardItemProps[]>(
    mockDataForDndBoardRightColumn
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(result);

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add,
      left = leftColumn,
      right = rightColumn;

    if (source.droppableId === "left") {
      add = left[source.index];
      left.splice(source.index, 1);
    } else {
      add = right[source.index];
      right.splice(source.index, 1);
    }

    if (destination.droppableId === "left") {
      left.splice(destination.index, 0, add);
    } else {
      right.splice(destination.index, 0, add);
    }

    setLeftColumn(left);
    setRightColumn(right);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.dndBoard}>
        <Droppable droppableId="left">
          {(provided) => (
            <div
              className={`${styles.droppableArea} ${styles.leftColumn}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {leftColumn.map((el, index) => (
                <BoardItem key={el.id} {...el} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="right">
          {(provided) => (
            <div
              className={`${styles.droppableArea} ${styles.rightColumn}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {rightColumn.map((el, index) => (
                <BoardItem key={el.id} {...el} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DndBoard;
