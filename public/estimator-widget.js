const YourWidget = (function () {

    let config = {};

    function loadGoogleMapsApi(apiKey, callback) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function initializeAutocomplete() {
        const addressInput = document.getElementById('address-input');
        const autocomplete = new google.maps.places.Autocomplete(addressInput, {
            types: ['address'],
            componentRestrictions: { country: 'us' },
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const components = place.address_components;
            let addressData = {
                AddressLine1: '',
                AddressLine2: '',
                City: '',
                State: '',
                Zip: '',
            };

            components.forEach((component) => {
                const types = component.types;
                if (types.includes('street_number')) {
                    addressData.AddressLine1 += component.long_name + ' ';
                } else if (types.includes('route')) {
                    addressData.AddressLine1 += component.long_name;
                } else if (types.includes('locality')) {
                    addressData.City = component.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                    addressData.State = component.short_name;
                } else if (types.includes('postal_code')) {
                    addressData.Zip = component.long_name;
                }
            });

            // Store for submission
            window.widgetAddressData = addressData;
        });
    }

    function setupForm() {
        const container = document.getElementById(config.containerId);
        container.innerHTML = `
        <div id="widget-container" style="width: 100%;">
            <input id="address-input" type="text" placeholder="Enter your address" />
            <div id="home-status-container">
                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">Do you Rent or Own?</label>
                <div style="display: flex; gap: 20px;">
                    <label style="display: flex; align-items: center; gap: 8px; color: #333; cursor: pointer;">
                        <input type="radio" name="homeStatus" value="Rent" style="cursor: pointer;" /> Rent
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px; color: #333; cursor: pointer;">
                        <input type="radio" name="homeStatus" value="Own" style="cursor: pointer;" /> Own
                    </label>
                </div>
            </div>
            <button type="button" id="submit-button" disabled>Get Estimate</button>
        </div>
        `;

        document.getElementById('submit-button').addEventListener('click', submitForm);
        initializeAutocomplete();
        const addressInput = document.getElementById('address-input');
        const radioButtons = document.querySelectorAll('input[name="homeStatus"]');

        // Check both conditions (address and home status)
        addressInput.addEventListener('input', toggleSubmitButton);
        addressInput.addEventListener('blur', toggleSubmitButton);
        addressInput.addEventListener('change', toggleSubmitButton);
        radioButtons.forEach(radio => {
            radio.addEventListener('change', toggleSubmitButton);
        });
        document.getElementById('submit-button').addEventListener('hover', toggleSubmitButton);
    }

    function toggleSubmitButton() {
        const address = window.widgetAddressData || {};
        const homeStatus = document.querySelector('input[name="homeStatus"]:checked')?.value;
        const submitButton = document.getElementById('submit-button');

        if (address.AddressLine1 && homeStatus) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    async function submitForm() {
        const submitButton = document.getElementById('submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing......';
        const address = window.widgetAddressData || {};
        const homeStatus = document.querySelector('input[name="homeStatus"]:checked')?.value;

        if (!homeStatus) {
            alert('Please select whether you Rent or Own.');
            return;
        }

        if (!address.AddressLine1) {
            alert('Please select an address from the autocomplete suggestions.');
            return;
        }

        const payload = {
            WidgetId: config.WidgetId,
            Agency: config.Agency,
            AddressLine1: address.AddressLine1,
            AddressLine2: address.AddressLine2,
            City: address.City,
            State: address.State,
            Zip: address.Zip,
            HomeStatus: homeStatus,
        };

        try {
            const response = await fetch(config.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            renderPremiumOverview(result);
        } catch (error) {
            console.error('Error fetching API:', error);
            alert('There was an error processing your request.');
        }
    }

    function renderPremiumOverview(data) {
        const container = document.getElementById(config.containerId);
        const minPremium = data.LowestPremium
            ? parseFloat(data.LowestPremium.replace(',', '').replace('$', ''))
            : '0.00';
        const avgPremium = data.AveragePremium
            ? parseFloat(data.AveragePremium.replace(',', '').replace('$', ''))
            : '0.00';
        const maxPremium = data.HighestPremium
            ? parseFloat(data.HighestPremium.replace(',', '').replace('$', ''))
            : '0.00';
        if (minPremium == '0.00' && avgPremium == '0.00' && maxPremium == '0.00') {
            container.innerHTML = `<div id="premium-overview-container"><p>Unable to provide an estimate for your property. Please contact us to provide an estimate.</p><button id="start-over-button">Start Over</button></div>`;

        } else {
            container.innerHTML = `
        <div id="premium-overview-container">
            <h3>Premium Overview</h3>
            <h5>The below shows Limited / Average / Premium Coverage(s)*</h5>
            <span>*These figures are based on similar properties and are subject to change based on Insured / Property characteristics</span>
            <div class="premium-line">
                <div class="premium-section min-section" id="min-section"></div>
                <div class="premium-section avg-section" id="avg-section"></div>
                <div class="premium-section max-section" id="max-section"></div>
                <div class="premium-label" id="min-label"></div>
                <div class="premium-label" id="avg-label"></div>
                <div class="premium-label" id="max-label"></div>
            </div>
            <button id="start-over-button">Start Over</button>
        </div>
    `;

            const minPremium = data.LowestPremium
                ? parseFloat(data.LowestPremium.replace(',', '').replace('$', ''))
                : '0.00';
            const avgPremium = data.AveragePremium
                ? parseFloat(data.AveragePremium.replace(',', '').replace('$', ''))
                : '0.00';
            const maxPremium = data.HighestPremium
                ? parseFloat(data.HighestPremium.replace(',', '').replace('$', ''))
                : '0.00';

            // Divide the line into three equal sections
            const sectionWidth = 100 / 3; // 33.33% for each section

            // Get sections
            const minSection = document.getElementById('min-section');
            const avgSection = document.getElementById('avg-section');
            const maxSection = document.getElementById('max-section');

            // Apply equal widths
            minSection.style.width = `${sectionWidth}%`;
            avgSection.style.width = `${sectionWidth}%`;
            maxSection.style.width = `${sectionWidth}%`;

            avgSection.style.left = `${sectionWidth}%`;
            maxSection.style.left = `${2 * sectionWidth}%`;

            // Set labels
            const minLabel = document.getElementById('min-label');
            const avgLabel = document.getElementById('avg-label');
            const maxLabel = document.getElementById('max-label');

            minLabel.style.left = `16.67%`; // Center of the first section
            minLabel.innerText = `Lowest: $${minPremium.toLocaleString()}`;

            avgLabel.style.left = `50%`; // Center of the second section
            avgLabel.innerText = `Average: $${avgPremium.toLocaleString()}`;

            maxLabel.style.left = `83.33%`; // Center of the third section
            maxLabel.innerText = `Highest: $${maxPremium.toLocaleString()}`;

            // Add dollar amounts inside the sections
            minSection.innerText = `$${minPremium.toLocaleString()}`;
            avgSection.innerText = `$${avgPremium.toLocaleString()}`;
            maxSection.innerText = `$${maxPremium.toLocaleString()}`;
        }
        // Add event listener to the "Start Over" button
        document.getElementById('start-over-button').addEventListener('click', setupForm);
    }

    function addStyles() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
#widget-container {
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

#address-input{
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    margin-bottom: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

#address-input:focus {
    outline: none;
    border-color: #ff6b35;
}

#home-status-container {
    margin-bottom: 16px;
}

#home-status-container label {
    font-size: 16px;
}

#home-status-container input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #ff6b35;
}

#submit-button{
    padding: 16px 20px;
    font-size: 18px;
    background-color: #ff6b35;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

#submit-button:hover:not(:disabled) {
    background-color: #e55a2b;
}

#submit-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}

#premium-overview-container {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 0.75em;
    font-family: Arial, sans-serif;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#premium-overview-container h3 {
    margin-bottom: 20px;
    color: #333;
    font-size: 18px;
}

/* The premium line */
.premium-line {
    position: relative;
    height: 30px;
    background-color: #ddd;
    border-radius: 15px;
    margin: 20px 0;
    width: 100%;
    overflow: hidden;
}

/* Sections within the premium line */
.premium-section {
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    padding: 0 5px;
}

.min-section {
    background-color: #920000; /* Red */
    left: 0;
}

.avg-section {
    background-color: #3d8c40; /* Green */
}

.max-section {
    background-color: #984200; /* Yellow */
}

/* Labels above the premium line */
.premium-label {
    position: absolute;
    top: 40px; /* Above the line */
    transform: translateX(-50%);
    font-size: 12px;
    color: #333;
    white-space: nowrap;
}

/* Start over button styling */
#start-over-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff6b35;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#start-over-button:hover {
    background-color: #e55a2b;
}

@media (max-width: 768px) {
    #premium-overview-container {
        padding: 15px; /* Reduce padding */
        min-width: 80vw;
        min-height: 70vh;
    }

    .premium-line {
        min-height: 30px; /* Reduce the height of the line */
    }

    .premium-section {
        font-size: 24px; /* Smaller font for dollar amounts */
    }

    .premium-label {
        top: 30px; /* Adjust label positioning for smaller screens */
        font-size: 24px; /* Smaller text for labels */
    }

    #start-over-button {
        font-size: 30px; /* Reduce button text size */
        padding: 10px 100px; /* Adjust button padding */
    }
}

@media (max-width: 480px) {
    #premium-overview-container {
        padding: 15px; /* Reduce padding */
        min-width: 80vw;
        min-height: 70vh;
        font-size: 24px;
    }

    .premium-line {
        min-height: 30px; /* Further reduce the line height */
    }

    .premium-section {
        font-size: 24px; /* Smallest font for dollar amounts */
        padding: 0 6px; /* Reduce padding inside sections */
    }

    .premium-label {
        top: 25px; /* Adjust label positioning further */
        font-size: 18px; /* Reduce label font size */
    }

    #start-over-button {
        font-size: 16px; /* Small button text */
        padding: 12px 18px; /* Adjust padding for smaller buttons */
    }
}
`;
        document.head.appendChild(style);
    }

    return {
        init: async function (options) {
            config = { ...options, apiUrl: 'https://api.quoterush.com/GetEstimates' };
            let container = document.getElementById(config.containerId);
            if (!container) {
                console.error(`Container #${config.containerId} not found`);
                return;
            }
            let checkPayload = {
                WidgetId: config.WidgetId,
                Agency: config.Agency
            };
            try {
                let response = await fetch(
                    'https://api.quoterush.com/ValidateEstimatorWidget',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(checkPayload)
                    }
                );
                if (!response.ok) {
                    container.innerHTML = '<p>Invalid Domain</p>';
                    return;
                }
                let result = await response.json();
                if (result.status !== 'Valid') {
                    container.innerHTML = '<p>Invalid Domain</p>';
                    return;
                }
                loadGoogleMapsApi(
                    result.mapsKey,
                    () => {
                        addStyles();
                        setupForm();
                    }
                );
            }
            catch (err) {
                container.innerHTML = '<p>Invalid Domain</p>';
            }
        }
    };
})();

