import { InputEvent } from "@/types/events";
interface InputProps {
  title: string;
  placeholder: string;
  type: string;
  getValue: (arg: InputEvent) => void;
  value: string;
}
export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-inter text-xs text-gray-600">{props.title}</label>
      <input
        className="h-9 rounded border border-input_border bg-primary_gray p-3 font-inter text-sm placeholder-gray_title_light"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.getValue(e)}
      />
    </div>
  );
}
