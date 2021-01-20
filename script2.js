const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function showSingleNewQuote(quotesList) {
  //pick a random quote from the quotesList array
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

async function getQuotesFromAPI() {
  showLoadingSpinner();
  const apiURL = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    showSingleNewQuote(apiQuotes);
    removeLoadingSpinner();
  } catch (error) {
    showSingleNewQuote(localQuotes);
  }
}

//Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuotesFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

//on load

getQuotesFromAPI();
