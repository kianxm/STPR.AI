const desktopButton = document.getElementById("desktop-button");
const laptopButton = document.getElementById("laptop-button");
const phoneButton = document.getElementById("phone-button");
const otherButton = document.getElementById("other-button");

let deviceChosen

const buttons = [desktopButton, laptopButton, phoneButton, otherButton];

buttons.forEach(button => {
  button.addEventListener("click", function() {
    deviceChosen = button.textContent;
    console.log(`${deviceChosen} button pressed`);
    buttons.forEach(button => {
      button.classList.remove("selected");
    });
    button.classList.add("selected");
  });
});

function handleSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#response').textContent = '';

    const prompt = document.querySelector('#prompt').value;

    if(prompt === '') {
        alert('Please enter in a question');
        return;
    }

    generateResponseRequest(prompt, deviceChosen);
}

async function generateResponseRequest(prompt, device) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                prompt,
                device
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
        document.querySelector('#response').textContent = responseData;

        // Regex and show steps

        // const stepsText = regex(responseData);
        // const stepsTextArea = document.getElementById('stepsTextArea');
        // stepsTextArea.value = stepsText

        removeSpinner();

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function regex(answer) {
    const pattern = /\d+\.\s+/;
    const stepArray = answer.split(pattern).filter(Boolean);

    const stepsText = stepArray.map((step, index) => `${index + 1}. ${step}`).join('\n');

    return output;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#prompt-form').addEventListener('submit', handleSubmit);

