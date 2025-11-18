async function fetchBookId(title) {
  const encodedTitle = encodeURIComponent(title);
  const response = await fetch(`https://openlibrary.org/search.json?title=${encodedTitle}`);
  
  if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
  }
  
  const data = await response.json();
  
  const firstDoc = data.docs?.[0];

  return firstDoc?.cover_i || null;
}

async function fetchCover(title) {
  const bookId = await fetchBookId(title);
  if(bookId === null) {
    return false;
  }
  return `https://covers.openlibrary.org/b/id/${bookId}-M.jpg`;
}

export default fetchCover;