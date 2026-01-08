import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBooks } from "../services/api";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollToTop from "../components/ScrollToTop";

export default function BooksPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [rawSearch, setRawSearch] = useState("");

  useEffect(() => {
    if (rawSearch === "") {
      setSearch(""); // immediate reset
      return;
    }
    const timeout = setTimeout(() => setSearch(rawSearch), 500);
    return () => clearTimeout(timeout);
  }, [rawSearch]);

  useEffect(() => {
    loadBooks();
  }, [category, search]);

  const loadBooks = async (pageUrl) => {
    if (!pageUrl) setLoading(true);
    const data = await getBooks({ category, search, pageUrl });
    if (data) {
      setBooks(prev => pageUrl ? [...prev, ...data.results] : data.results);
      setNextUrl(data.next);
    }
    if (!pageUrl) setLoading(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Back button */}
      <button onClick={() => navigate(-1)} style={{
        background: "#3498db",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "1rem"
      }}
      >
       &lt; Back
      </button>

      <h2>{category} Books</h2>
      <SearchBar value={rawSearch} onChange={setRawSearch} />

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {Array(6).fill().map((_, i) => (
            <div key={i}>
              <Skeleton height={250} />
              <Skeleton height={20} style={{ marginTop: "0.5rem" }} />
              <Skeleton height={15} width="60%" />
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem", color: "#555" }}>
          <h3>No books found </h3>
          <p>Try a different search term or category.</p>
        </div>
      ) :
        (
          <InfiniteScroll
            dataLength={books.length}
            next={() => loadBooks(nextUrl)}
            hasMore={!!nextUrl}
            loader={
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                {Array(6).fill().map((_, i) => (
                  <div key={i}>
                    <Skeleton height={250} />
                    <Skeleton height={20} style={{ marginTop: "0.5rem" }} />
                    <Skeleton height={15} width="60%" />
                  </div>
                ))}
              </div>
            }
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
              {books.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      <ScrollToTop />
    </div>
  );
}