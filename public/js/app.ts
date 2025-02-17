interface WeatherError {
  error: string;
}

interface WeatherSuccess {
  location: string;
  forecast: string;
  address: string;
}

type WeatherResponse = WeatherError | WeatherSuccess;

// Type guard to check if response has error
function isWeatherError(response: WeatherResponse): response is WeatherError {
  return 'error' in response;
}

// Get DOM elements with type safety
const weatherForm = document.querySelector<HTMLFormElement>('#weather-form');
const search = document.querySelector<HTMLInputElement>('#location-input');
const messageOne = document.querySelector<HTMLParagraphElement>('#message-1');
const messageTwo = document.querySelector<HTMLParagraphElement>('#message-2');

// Ensure all elements exist
if (!weatherForm || !search || !messageOne || !messageTwo) {
  throw new Error('Required DOM elements not found');
}

// Handle form submission
weatherForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();
  
  const location = search.value.trim();
  
  if (!location) {
    messageOne.textContent = 'Please enter a location';
    messageTwo.textContent = '';
    return;
  }

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  try {
    const response = await fetch(`/weather?address=${encodeURIComponent(location)}`);
    const data: WeatherResponse = await response.json();

    if (isWeatherError(data)) {
      messageOne.textContent = data.error;
      messageTwo.textContent = '';
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  } catch (error) {
    messageOne.textContent = 'Failed to fetch weather data. Please try again.';
    messageTwo.textContent = '';
  }
});

// Clear messages when input changes
search.addEventListener('input', () => {
  messageOne.textContent = '';
  messageTwo.textContent = '';
});