export default function ButtonBlue({ className, title }: any) {
  return (
    <button className={`h-10 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 rounded-md font-inter font-semibold text-sm text-white ${className}`}>{title}</button>
  )
}
