const input = document.querySelector('input');
const button = document.querySelector('button');

async function flipMode(event) {
  event.preventDefault();
  const url = input.value.trim();

  try {
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
    } else {
      console.error('Failed to fetch file:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching file:', error);
  }
}

button.addEventListener('click', flipMode);