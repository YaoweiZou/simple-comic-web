export default function ActionButton({ children, title, onClick }) {
  return (
    <button className="action-button" title={title} onClick={onClick}>
      {children}
    </button>
  );
}
