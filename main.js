const input = document.querySelector('input');
const button = document.querySelector('button');

async function flipMode(event) {
  event.preventDefault();  // Prevents form submission if in a form
  const url = input.value;
  try {
    const response = await fetch(`https://flipmode.up.railway.app/api/download?url=${url}`, {
      method: 'GET',
    });
    console.log(response, '- response');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

button.addEventListener('click', flipMode);