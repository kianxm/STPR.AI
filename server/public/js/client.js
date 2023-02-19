const desktopButton = document.getElementById("desktop-button");
const laptopButton = document.getElementById("laptop-button");
const phoneButton = document.getElementById("phone-button");
const otherButton = document.getElementById("other-button");

let deviceChosen
let osChosen

const buttons = [desktopButton, laptopButton, phoneButton, otherButton];

buttons.forEach(button => {
    button.addEventListener("click", function() {
        deviceChosen = button.textContent;
        console.log(`${deviceChosen} button pressed`);
        buttons.forEach(button => {
            button.classList.remove("selected");
        });
        button.classList.add("selected");
        
        const osRow = document.getElementById("os-row");
        
        if (deviceChosen === "Desktop" || deviceChosen === "Laptop") {
            osRow.classList.remove("hidden");
            document.getElementById("ios-button").classList.add("hidden");
            document.getElementById("android-button").classList.add("hidden");
            document.getElementById("windows-button").classList.remove("hidden");
            document.getElementById("mac-button").classList.remove("hidden");
        } else if (deviceChosen === "Phone") {
            osRow.classList.remove("hidden");
            document.getElementById("windows-button").classList.add("hidden");
            document.getElementById("mac-button").classList.add("hidden");
            document.getElementById("ios-button").classList.remove("hidden");
            document.getElementById("android-button").classList.remove("hidden");
        } else if (deviceChosen === "Other") {
            osRow.classList.add("hidden");
            deviceChosen = "";
        }
    });
});
  
const windowsButton = document.getElementById("windows-button");
const macButton = document.getElementById("mac-button");
const iosButton = document.getElementById("ios-button");
const androidButton = document.getElementById("android-button");

const osButtons = [windowsButton, macButton, phoneButton, androidButton];

osButtons.forEach(button => {
    button.addEventListener("click", function() {
        osChosen = button.textContent;
        console.log(`${osChosen} button pressed`);
        osButtons.forEach(button => {
            button.classList.remove("selected");
        });
        button.classList.add("selected");
    });
});
 
function handleSubmit(e) {
    e.preventDefault();

    // document.querySelector('.msg').textContent = '';
    // document.querySelector('#response').textContent = '';

    const prompt = document.querySelector('#prompt').value;

    if(prompt === '') {
        alert('Please enter in a question');
        return;
    }

    generateResponseRequest(prompt, deviceChosen, osChosen);
}

async function generateResponseRequest(prompt, device, osChosen) {
    try {
        // showSpinner();
        showLoadingScreen();

        const response = await fetch('/openai/generateResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                prompt,
                device,
                osChosen
            })
        });

        if(!response.ok) {
            // removeSpinner();
            hideLoadingScreen();
            throw new Error('That prompt could not be generated.');
        }

        const data = await response.json();
        const responseData = data.data;

        // Displays old data
        // document.querySelector('#response').textContent = responseData;

        // Regex and show steps

        // const stepsText = regex(responseData);
        // const stepsTextArea = document.getElementById('stepsTextArea');
        // stepsTextArea.value = stepsText

        // removeSpinner();
        hideLoadingScreen();

        // Displays data
        displaySteps(responseData);

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function displaySteps(answer) {
    const pattern = /\d+\.\s+/;
    const stepArray = answer.split(pattern).filter(Boolean);
    console.log(stepArray);

    // const stepsText = stepArray.map((step, index) => `${index + 1}. ${step}`).join('\n');

    const stepsList = document.getElementById("stepsList");

    for (let i = 0; i < stepArray.length; i++) {
        if (stepArray[i] !== "\n\n") {
            let listItem = document.createElement("li");
            listItem.innerText = stepArray[i];
            stepsList.appendChild(listItem);
        }
    }

    // return output;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

function showLoadingScreen() {
    document.querySelector('#loading-screen').classList.add('show');
    document.querySelector('main').classList.add('hidden');
}

function hideLoadingScreen() {
    document.querySelector('#loading-screen').classList.remove('show');
    document.querySelector('main').classList.remove('hidden');
}

// Called when the response is recieved -> shows a list of stuff
function showResponseScreen() {
    document.querySelector('main').classList.add('hidden');
    document.querySelector('#loading-screen').classList.remove('show');
}

document.querySelector('#prompt-form').addEventListener('submit', handleSubmit);

