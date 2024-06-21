document.addEventListener('DOMContentLoaded', function() {
    // Populate cities in the dropdown
    fetchCities();

    // Handle form submissions
    const bookingForm = document.getElementById('bookingForm');
    const flightForm = document.getElementById('add-flight-form');
    const updateFlightForm = document.getElementById('update-flight-form');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingFormSubmit);
    }

    if (flightForm) {
        flightForm.addEventListener('submit', handleAddFlightFormSubmit);
    }

    if (updateFlightForm) {
        updateFlightForm.addEventListener('submit', handleUpdateFlightFormSubmit);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginFormSubmit);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupFormSubmit);
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', handleResetPasswordFormSubmit);
    }

    // Fetch and display flights
    fetchFlights();
});

function fetchCities() {
    const cities = ['Kolkata', 'Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'];

    const fromCitySelects = document.querySelectorAll('#fromCity');
    const toCitySelects = document.querySelectorAll('#toCity');

    fromCitySelects.forEach(select => {
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });
    });

    toCitySelects.forEach(select => {
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });
    });
}

function handleBookingFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:5000/api/bookings/book-flight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Booking successful:', data);
            alert('Booking successful!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchFlights() {
    // Dummy data for demonstration, replace with actual API call
    const flights = [
        {
            id: 1,
            airlinesName: 'Air India',
            airlinesNo: 'AI-202',
            fromCity: 'Delhi',
            departureTime: '08:00',
            toCity: 'Mumbai',
            arrivalTime: '10:00',
            travelTime: '2h',
            totalDistance: 1150
        },
        {
            id: 2,
            airlinesName: 'IndiGo',
            airlinesNo: '6E-401',
            fromCity: 'Kolkata',
            departureTime: '09:00',
            toCity: 'Bangalore',
            arrivalTime: '11:00',
            travelTime: '2h',
            totalDistance: 980
        }
    ];

    const flightsContainer = document.getElementById('flights-container');
    flightsContainer.innerHTML = '';

    flights.forEach(flight => {
        const flightItem = document.createElement('div');
        flightItem.className = 'flight-item';
        flightItem.dataset.flightId = flight.id;

        flightItem.innerHTML = `
            <div>${flight.airlinesName}</div>
            <div>${flight.airlinesNo}</div>
            <div>${flight.fromCity}</div>
            <div>${flight.departureTime}</div>
            <div>${flight.toCity}</div>
            <div>${flight.arrivalTime}</div>
            <div>${flight.travelTime}</div>
            <div>${flight.totalDistance} km</div>
            <div class="flight-actions">
                <button onclick="handleEditFlight(${flight.id})">Edit</button>
                <button onclick="handleDeleteFlight(${flight.id})">Delete</button>
            </div>
        `;

        flightsContainer.appendChild(flightItem);
    });
}

function handleAddFlightFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('/add-flight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Flight added successfully:', data);
            alert('Flight added successfully!');
            fetchFlights();
            event.target.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleEditFlight(flightId) {
    const flightItem = document.querySelector(`[data-flight-id="${flightId}"]`);
    const updateForm = document.getElementById('update-flight-form');

    const airlinesName = flightItem.children[0].textContent;
    const airlinesNo = flightItem.children[1].textContent;
    const fromCity = flightItem.children[2].textContent;
    const departureTime = flightItem.children[3].textContent;
    const toCity = flightItem.children[4].textContent;
    const arrivalTime = flightItem.children[5].textContent;
    const travelTime = flightItem.children[6].textContent;
    const totalDistance = flightItem.children[7].textContent;

    updateForm.querySelector('#update-airlines-name').value = airlinesName;
    updateForm.querySelector('#update-airlines-no').value = airlinesNo;
    updateForm.querySelector('#update-from-city').value = fromCity;
    updateForm.querySelector('#update-departure-time').value = departureTime;
    updateForm.querySelector('#update-to-city').value = toCity;
    updateForm.querySelector('#update-arrival-time').value = arrivalTime;
    updateForm.querySelector('#update-travel-time').value = travelTime;
    updateForm.querySelector('#update-total-distance').value = totalDistance;

    updateForm.classList.remove('hidden');
    updateForm.dataset.flightId = flightId;
}

function handleUpdateFlightFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const flightId = event.target.dataset.flightId;

    fetch(`/update-flight/${flightId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Flight updated successfully:', data);
            alert('Flight updated successfully!');
            fetchFlights();
            event.target.reset();
            event.target.classList.add('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleDeleteFlight(flightId) {
    fetch(`/delete-flight/${flightId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Flight deleted successfully:', data);
            alert('Flight deleted successfully!');
            fetchFlights();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleLoginFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login successful:', data);
        // localStorage.setItem('token', data.token); // Store the token
        alert('Login successful!');
        window.location.href = 'user.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function handleSignupFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Signup successful:', data);
        // localStorage.setItem('token', data.token); // Store the token
        alert('Signup successful!');
        window.location.href = 'userlogin.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function handleResetPasswordFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Password reset successful:', data);
            alert('Password reset successful! Check your email for further instructions.');
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
