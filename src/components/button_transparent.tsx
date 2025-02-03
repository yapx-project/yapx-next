export default function ButtonTransparent({ className, title }: any) {
  return (
    <button className={`h-10 bg-transparent border border-gray-500 rounded-md font-inter font-semibold text-sm text-black ${className}`}>{title}</button>
  )
}
