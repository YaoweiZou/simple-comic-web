export default function ActionButton({ children, title, onClick }) {
  return (
    <button
      className="mx-[5px] flex h-[45px] min-w-10 cursor-pointer items-center justify-center rounded-md transition-colors duration-300 ease-in-out hover:bg-gray-200"
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
