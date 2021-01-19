const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

//function to show new quote
function newQuote(quotesList) {
  //pick a random quote from the apiQuotes array
  const quote = quotesList[Math.floor(Math.random() * quotesList.length)];

  //check if author field is blank and replace it with 'unknown author'
  if (!quote.author) {
    quote.author = 'unknown author';
  } else {
    authorText.textContent = quote.author;
  }

  //if the quote is longer than 120 characters, reduce font size
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
}

// Function to Get Quotes from API
async function getQuotes() {
  const apiURL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote(apiQuotes);
  } catch (error) {
    newQuote(localQuotes);
  }
}

//Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);
//on load
getQuotes();
