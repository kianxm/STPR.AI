function handleSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#response').textContent = '';

    const prompt = document.querySelector('#prompt').value;

    if(prompt === '') {
        alert('Please enter in a question');
        return;
    }

    generateResponseRequest(prompt);
}

async function generateResponseRequest(prompt) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                prompt
            })
        });

        if(!response.ok) {
            removeSpinner();
            throw new Error('That prompt could not be generated.');
        }

        const data = await response.json();
        // console.log(data);

        const responseData = data.data;

        // Displays data
        const stepsText = regex(responseData);
        document.querySelector('#response').textContent = responseData;

        // Show steps
        const stepsTextArea = document.getElementById('stepsTextArea');
        stepsTextArea.value = stepsText

        removeSpinner();

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function regex(answer) {
    const pattern = /\d+\.\s+/;
    const stepArray = answer.split(pattern).filter(Boolean);

    const stepsText = stepArray.map((step, index) => `${index + 1}. ${step}`).join('\n');

    return stepArray;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#prompt-form').addEventListener('submit', handleSubmit);