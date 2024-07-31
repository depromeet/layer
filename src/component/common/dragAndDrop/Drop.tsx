import { Droppable, DroppableProps } from "react-beautiful-dnd";

type DropProps = {
  droppableId: string;
  children: React.ReactNode;
} & Omit<DroppableProps, "children">;

export function Drop({ droppableId, children, ...props }: DropProps) {
  return (
    <Droppable {...props} droppableId={droppableId}>
      {(provided) => (
        <div ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
