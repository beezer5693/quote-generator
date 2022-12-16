const newQuoteButton = document.querySelector('#new-quote');
const twitterButton = document.querySelector('#twitter');
const backgroundImage = document.querySelector('img');
const quote = document.querySelector('#quote');
const creator = document.querySelector('#creator');

// Sets the default page background on load
function setDefaultBackground() {
  const url = 'https://images.unsplash.com/photo-1604880050467-6ecc9ec909b3';
  backgroundImage.src = url;
}

// Retrieves an array of quotes from api and returns a random quote.
async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  const randomIndex = Math.floor(Math.random() * 8200);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data[randomIndex];
  } catch (error) {
    alert('There is an error in the data');
  }
}

// Updates the quote and quote author in DOM
async function setQuoteAndCreator() {
  try {
    const { text, author } = await getQuotes();
    text.length > 120 ? quote.classList.add('long-quote') : quote.classList.remove('long-quote');
    quote.innerText = text;
    if (author === 'Anonymous') {
      creator.innerText = 'Unknown';
    } else creator.innerText = author;
  } catch (error) {
    alert('Unable to set quote and author.');
  }
}

// Retrieves a random image url
async function getRandomImage() {
  const _privateKey = 'CXE2KyCjD_wlAd3eVwBal8t9MFHzcaFC3wa1MRJJH7s';
  const api = `https://api.unsplash.com/photos/random?query=mountain&client_id=${_privateKey}`;

  try {
    const response = await fetch(api);
    const data = await response.json();
    return data.urls.full;
  } catch (error) {
    alert('Could not retrieve image');
  }
}

// Sets the image element to random image url
async function setBackgroundImage() {
  try {
    const backgroundImageUrl = await getRandomImage();
    backgroundImage.src = backgroundImageUrl;
  } catch (error) {
    alert('Unable to set background image.');
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${creator.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Updates the page with new quote, author and background image
function updatePage(e) {
  e.preventDefault();
  setQuoteAndCreator();
  setBackgroundImage();
}

function initPage() {
  setQuoteAndCreator();
  setBackgroundImage();
}

newQuoteButton.addEventListener('click', updatePage);
twitterButton.addEventListener('click', tweetQuote);

// On load
initPage();
