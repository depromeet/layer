import { css } from "@emotion/react";

type ListItemCardProps = {
  variant: "default" | "theme";
  height?: string;
  borderRadius?: string;
  children?: React.ReactNode;
};
const ListItemCard = ({ variant, height = "5rem", borderRadius = ".8rem", children }: ListItemCardProps) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${variant === "default" ? "#F1F3F5" : "#608dff"};
        height: ${height};
        border-radius: ${borderRadius};
        color: ${variant === "default" ? "#212529" : "#fff"};
      `}
    >
      {children}
    </div>
  );
};

export default ListItemCard;
