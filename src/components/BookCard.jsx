export default function BookCard({ book }) {
  const openBook = () => {
    const formats = book.formats;
    const url =
      formats["text/html"] ||
      formats["application/pdf"] ||
      formats["text/plain"];

    if (url && !url.endsWith(".zip")) {
      window.open(url, "_blank");
    } else {
      alert("No viewable version available");
    }
  };

  return (
    <div
      onClick={openBook}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        cursor: "pointer",
      }}
    >
      <img
        src={book.formats["image/jpeg"]}
        alt={book.title}
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />
      <h3>{book.title}</h3>
      <p>{book.authors.map(a => a.name).join(", ")}</p>
    </div>
  );
}