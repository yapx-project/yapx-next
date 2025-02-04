export default function ButtonTransparent({ className, title }: any) {
  return (
    <button
      className={`h-10 rounded-md border border-gray-500 bg-transparent font-inter text-sm font-semibold text-black ${className}`}
    >
      {title}
    </button>
  );
}
