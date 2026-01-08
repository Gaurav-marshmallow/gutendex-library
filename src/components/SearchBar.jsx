export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
            padding: "0.7rem",
            width: "100%",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem"
      }}

    />
  );
}