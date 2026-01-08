import axios from "axios";
let cancelToken;
const BASE_URL = "http://skunkworks.ignitesol.com:8000/books";

export const getBooks = async ({ category, search = "", pageUrl }) => {
   if (cancelToken) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  cancelToken = axios.CancelToken.source();
 
  let url;

  if (pageUrl) {
    // Use the full URL returned by the API
     url = pageUrl.replace("http://localhost:8005/books", BASE_URL);
  } else {
    // Build the first request yourself
    url = `${BASE_URL}?topic=${category}&mime_type=image`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
  }
  try {
    const { data } = await axios.get(url, { cancelToken: cancelToken.token });
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      return null; // ignore cancel errors
    }
    throw error;
  }

  // const { data } = await axios.get(url, { cancelToken: cancelToken.token });
  // return data;
};
export const getCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}?mime_type=image&languages=en`);
  const categories = new Set();

  data.results.forEach(book => {
    if (book.bookshelves) {
      book.bookshelves.forEach(shelf => categories.add(shelf));
    }
    if (book.subjects) {
      book.subjects.forEach(subject => {
        // Simplify subject strings (take first word or phrase)
        const main = subject.split("--")[0].trim();
        categories.add(main);
      });
    }
  });

  return Array.from(categories).slice(0, 10); // limit to 10 for UI
};
