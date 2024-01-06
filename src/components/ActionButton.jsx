export default function ActionButton({ children, title, onClick }) {
  return (
    <button
      className="flex justify-center items-center h-[45px] min-w-9 mx-[5px] cursor-pointer"
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
