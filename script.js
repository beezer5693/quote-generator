const newQuoteButton = document.querySelector('#new-quote');
const backgroundImage = document.querySelector('img');

function setDefaultBackground() {
  const url = 'https://images.unsplash.com/photo-1604880050467-6ecc9ec909b3';
  backgroundImage.src = url;
}

setDefaultBackground();

async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  const randomIndex = Math.floor(Math.random() * 8200);

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data[randomIndex];
  } catch (error) {
    alert('There is an error in the data');
  }
}

async function setQuoteAndCreator() {
  const quote = document.querySelector('#quote');
  const creator = document.querySelector('#creator');

  try {
    const { text, author } = await getQuotes();
    text.length > 120 ? quote.classList.add('long-quote') : quote.classList.remove('long-quote');
    quote.innerText = text;
    author === 'Anonymous' ? 'Unknown' : author;
    creator.innerText = `- ${author}`;
  } catch (error) {
    alert('Unable to set quote and author.');
  }
}

async function getRandomImage() {
  const _privateKey = 'CXE2KyCjD_wlAd3eVwBal8t9MFHzcaFC3wa1MRJJH7s';
  const api = `https://api.unsplash.com/photos/random?query=mountain&client_id=${_privateKey}`;

  try {
    const res = await fetch(api);
    const data = await res.json();
    return data.urls.full;
  } catch (error) {
    alert('Could not retrieve image');
  }
}

async function setBackgroundImage() {
  try {
    const backgroundImageUrl = await getRandomImage();
    backgroundImage.src = backgroundImageUrl;
  } catch (error) {
    alert('Unable to set background image.');
  }
}

function updatePage(e) {
  e.preventDefault();
  setQuoteAndCreator();
  setBackgroundImage();
}

newQuoteButton.addEventListener('click', updatePage);
