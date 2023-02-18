const promptForm = document.querySelector('#prompt-form');

const handleSubmit = async (e) => {
  e.preventDefault();
  const promptInput = document.querySelector('#prompt');
  const prompt = promptInput.value;

  const response = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  if (response.ok) {
    const responseData = await response.json();
    const answer = responseData.answer;
    document.querySelector('#response').textContent = answer;
  } else {
    const err = await response.text();
    alert(err);
  }
}

promptForm.addEventListener('submit', handleSubmit);

promptForm.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    handleSubmit(e);
  }
})

