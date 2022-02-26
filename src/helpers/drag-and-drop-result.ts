import { DropResult } from "react-beautiful-dnd";

const onDragEndLogic = (
  result: DropResult,
  firstColumnState: any[],
  secondColumnState: any[],
  setFirstColumnState: React.Dispatch<React.SetStateAction<any[]>>,
  setSecondColumnState: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { source, destination } = result;

  console.log(result);

  if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

  let add,
    left = firstColumnState,
    right = secondColumnState;

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

  setFirstColumnState(left);
  setSecondColumnState(right);
};

export default onDragEndLogic;
