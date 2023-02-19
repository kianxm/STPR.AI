const fieldset = {
    selectedRadioInput: "",

    osOptions: [],

    setSelectedRadioInput: function() {
        console.log("big");
        this.selectedRadioInput = document.querySelector('input[name="which-device"]:checked').value;
        const osFieldset = document.querySelector('#os-selection');
        if(this.selectedRadioInput !== 'Unknown')
        {
            console.log('ding1');
            osFieldset.className='notShown';
        }
        else
        {
            console.log('ding2');
            osFieldset.className='shown';
        }
    },

    main: function () {
        const osButtons = document.querySelectorAll('.platformLabel');
        osButtons.forEach(osButton => {
            console.log(osButton);
            this.osOptions.push(osButton);
        })

        const radioButtons = document.querySelectorAll('label.deviceLabel');

        radioButtons.forEach(radioButton => {
            console.log(radioButton);
            radioButton.addEventListener('click', this.setSelectedRadioInput);
        });
        

    }
}
fieldset.main();