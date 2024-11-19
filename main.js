const input = document.querySelector('input');
const button = document.querySelector('button');
const mainBlock = document.querySelector('#mainBlock');
const errorhandle = document.querySelector('#error');
const progress = document.querySelector('#progress');

async function flipMode(event) {
  event.preventDefault();
  const url = input.value.trim();
  mainBlock.classList.add('hide')
  progress.classList.remove('hide');
  try {
    errorhandle.classList.add('hide');
    const response = await fetch(`https://flipmode.up.railway.app/api/download?url=${url}`, {
      method: 'GET',
    });

    if (response.ok) {
      const title = response.headers.get('X-Video-Title');
      console.log(response.headers)
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title}.mp3`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
      mainBlock.classList.remove('hide')
      errorhandle.classList.add('hide');
      progress.classList.add('hide');
    } else {
      errorhandle.classList.remove('hide');
      mainBlock.classList.remove('hide')
      progress.classList.add('hide');
      console.error('Failed to fetch file:', response.statusText);
    }
  } catch (error) {
    mainBlock.classList.remove('hide')
    errorhandle.classList.remove('hide');
    console.error('Error fetching file:', error);
  }
}

button.addEventListener('click', flipMode);