export interface ButtonProps {
  className: string;
  title: string;
}
export default function ButtonBlue(props: ButtonProps) {
  return (
    <button
      className={`h-10 rounded-md bg-blue-600 font-inter text-sm font-semibold text-white hover:bg-blue-500 focus:bg-blue-700 ${props.className}`}
    >
      {props.title}
    </button>
  );
}
