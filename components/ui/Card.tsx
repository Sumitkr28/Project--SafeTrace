import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children?: ReactNode;
  padding?: number | string;
  style?: CSSProperties;
}

export function Card({ children, style, padding = 20, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`brushed ${className}`}
      style={{
        borderRadius: "var(--r-lg)",
        padding,
        position: "relative",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
