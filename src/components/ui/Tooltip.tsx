import { type ReactNode } from "react";

const Tooltip = ({
  children,
  position,
  text,
  className,
}: {
  children?: ReactNode | string;
  position?: string;
  text?: string;
  className?: string;
}) => {
  let positionClass: string;

  switch (position) {
    case "bottom":
      positionClass = "-bottom-8 left-1/2 -translate-x-1/2 right-0";
      break;
    case "bottomRight":
      positionClass = "-bottom-8 right-0";
      break;
    case "bottomLeft":
      positionClass = "-bottom-8 left-0";
      break;
    case "top":
      positionClass = "-top-8 left-1/2 -translate-x-1/2 right-0";
      break;
    case "topRight":
      positionClass = "-top-8 right-0";
      break;
    case "topLeft":
      positionClass = "-top-8 left-0";
      break;
    default:
      positionClass = "-top-12 left-1/2 -translate-x-1/2 right-0";
      break;
  }

  return (
    <div className={`group relative flex items-center ${className} z-[999]`}>
      <span
        className={`${positionClass} shadow-brand-black-700 bg-brand-black-500 pointer-events-none absolute w-fit rounded px-2 py-1 text-sm whitespace-nowrap opacity-0 shadow-sm transition-opacity group-hover:opacity-100`}
      >
        {text}
      </span>
      {children}
    </div>
  );
};

export default Tooltip;
