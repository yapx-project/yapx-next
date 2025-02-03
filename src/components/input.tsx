export default function Input({ title, placeholder, type, getValue, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-inter text-gray-600">{title}</label>
      <input
        className="h-9 bg-primary_gray border border-input_border rounded p-3 placeholder-gray_title_light text-sm font-inter"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => getValue(e)}
      />
    </div>
  )
}
