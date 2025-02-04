import { ButtonProps } from "./button_blue";
export default function ButtonTransparent(props: ButtonProps) {
  return (
    <button
      className={`h-10 rounded-md border border-gray-500 bg-transparent font-inter text-sm font-semibold text-black ${props.className}`}
    >
      {props.title}
    </button>
  );
}
