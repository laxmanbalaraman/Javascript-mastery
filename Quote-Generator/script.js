const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const twitterBtn = document.getElementById("twitter");

let apiQuotes = [];

function getSingleQuote(quotes) {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // if author is unknown
  quote.author = quote.author || "Anonymous";

  // if quote is long, then reduce the size

  quote.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
}

// fetch quotes
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(getSingleQuote(apiQuotes));
  } catch (error) {
    console.log(error);
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", () => {
  getSingleQuote(apiQuotes);
});
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
