export default function ButtonBlue({ className, title }: any) {
  return (
    <button
      className={`h-10 rounded-md bg-blue-600 font-inter text-sm font-semibold text-white hover:bg-blue-500 focus:bg-blue-700 ${className}`}
    >
      {title}
    </button>
  );
}
