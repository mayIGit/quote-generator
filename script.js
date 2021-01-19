const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get quote from api at - https://forismatic.com/en/api/
async function getQuote() {
  //note: 1. to overcome the CORS issue; we call a proxy url first
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiURL =
    'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  //   const apiURL = 'https://type.fit/api/quotes';

  try {
    //2. combine the fetch call for the proxyURL and the apiURL
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();

    //If author name is empty then replace it with 'unknown author'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown Author';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    // getQuote();
  }
}

//run on  load
getQuote();
