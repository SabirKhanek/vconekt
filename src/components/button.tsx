import { FaPlus } from "react-icons/fa";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  bg?: "gradient" | "grey";
  onClick?: () => void;
}
export function Button({ className, bg, children, onClick }: ButtonProps) {
  return (
    <button
      style={{
        background:
          bg === "grey"
            ? "#253426A3"
            : "linear-gradient(90.23deg, #7CB51A 48.3%, #B1E060 87.74%, #B1E060 99.82%",
      }}
      className={`rounded-tr-xl rounded-bl-xl flex items-center ${className}`}
      onClick={() => onClick && onClick()}
    >
      <span className="px-3 font-orbit border-r border-white  py-2  text-white">
        {children}
      </span>
      <div className="px-2 text-white  flex justify-center items-center">
        <FaPlus />
      </div>
    </button>
  );
}
