import { Draggable, DraggableProps } from "react-beautiful-dnd";

type DragProps = {
  children: React.ReactNode;
} & Omit<DraggableProps, "children">;

export function Drag({ children, ...props }: DragProps) {
  return (
    <Draggable {...props}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {children}
          </div>
        );
      }}
    </Draggable>
  );
}
