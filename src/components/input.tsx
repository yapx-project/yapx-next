export default function Input({
  title,
  placeholder,
  type,
  getValue,
  value,
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-inter text-xs text-gray-600">{title}</label>
      <input
        className="h-9 rounded border border-input_border bg-primary_gray p-3 font-inter text-sm placeholder-gray_title_light"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => getValue(e)}
      />
    </div>
  );
}
