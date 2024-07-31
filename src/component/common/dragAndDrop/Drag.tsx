import { Children, cloneElement, isValidElement } from "react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";

type DragProps = {
  children: React.ReactNode;
} & Omit<DraggableProps, "children">;

export function Drag({ children, ...props }: DragProps) {
  return (
    <Draggable {...props}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child, { ...snapshot });
              }
            })}
          </div>
        );
      }}
    </Draggable>
  );
}
