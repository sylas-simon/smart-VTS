data2 = null
speed = 0
speedLimit = 80
SpeedLimitCV = 80
loginStatus = false

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


    async function fetchData() {
        try {
            const response = await fetch('http://localhost:5000/data');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Received Data:", data);
            
            // Extract sensor data and speed limit
            speedLimit = data.speed_limit || 80;
            speedLimitCV = data.speed_limit || 80;
            speed = data.sensor_data.find(item => item.name === 'analogoutput')?.value || 0;
            speed = parseInt(speed) * 7.5;
            
            // // Update UI
            // document.getElementById('speed').textContent = speed;
            // document.getElementById('speed-limit').textContent = speedLimit;
            // document.getElementById('speedLimit2').textContent = speedLimitCV;
            
            loginStatus = true;
        } catch (error) {
            console.error('Error fetching data:', error);
            // document.getElementById('response').innerHTML = `<p id="error">Error: ${error.message}</p>`;
        }

}



function loadModule(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load module: ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('dynamicContent').innerHTML = html;
        })
        .catch(error => console.error('Error loading module:', error));
}

// Function to handle hover behavior for dropdown menus and track window
document.querySelectorAll('nav ul > li').forEach(item => {
    const dropdown = item.querySelector('.dropdown-menu');
    const trackWindow = item.querySelector('.track-window');

    // Show dropdown or track window when hovering over the parent item
    item.addEventListener('mouseenter', function() {
        if (dropdown) dropdown.style.display = 'block';
        if (trackWindow) trackWindow.style.display = 'block';
    });

    // Prevent hiding when hovering over dropdown or track window
    if (dropdown) {
        dropdown.addEventListener('mouseenter', function() {
            dropdown.style.display = 'block';
        });
        dropdown.addEventListener('mouseleave', function() {
            dropdown.style.display = 'none';
        });
    }
    if (trackWindow) {
        trackWindow.addEventListener('mouseenter', function() {
            trackWindow.style.display = 'block';
        });
        trackWindow.addEventListener('mouseleave', function() {
            trackWindow.style.display = 'none';
        });
    }

    // Hide dropdown or track window when leaving the parent item
    item.addEventListener('mouseleave', function() {
        if (dropdown) dropdown.style.display = 'none';
        if (trackWindow) trackWindow.style.display = 'none';
    });
});


// Function to update vehicle details
function updateVehicleDetails(vehicleId) {
    const updateInterval = 1000; // Update every second

    async function updateData() {
        await fetchData();

        document.getElementById('speed').textContent = speed; // Updating speed
        document.getElementById('location').textContent = "Updated City, Country"; // Example updated location
        document.getElementById('vehicle-id-display').textContent = vehicleId;
        document.getElementById('vts-status').textContent = "Active"; // Example updated status
        document.getElementById('driving-performance').textContent = "Excellent"; // Example updated performance
        document.getElementById('driver-name').textContent = "Silas sosola silas"; // Example updated performance
        document.getElementById('license').textContent = "23232-32243-3232"; // Example updated performance
        document.getElementById('speedLimit2').textContent = SpeedLimitCV; // Example updated performance
    }

    // Update data every second
    setInterval(updateData, updateInterval);
}


// Form submission handling for tracking
document.getElementById('trackForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const vehicleId = document.getElementById('vehicle-id').value;
    alert(`Tracking vehicle ID: ${vehicleId}`);
    if (!loginStatus) {
        alert('Network error');
    }
    if (vehicleId && loginStatus) {
        // Display the infoWindow
        document.getElementById('infoWindow').style.display = 'block';
        updateVehicleDetails(vehicleId);
        const dynamicBackground = document.getElementById('dynamicBackground');
        dynamicBackground.style.backgroundColor = '#6a88e8'; // Example background color
        dynamicBackground.innerHTML = `<h2>Vehicle ID: ${vehicleId}</h2><p>Vehicle information has been updated.</p>`;
    }

});


// Example function for tracking vehicle



window.onload = fetchData;


document.addEventListener('DOMContentLoaded', () => {
    let notificationCount = 0;

    // Reference to elements
    const notificationBtn = document.getElementById('notification-btn');
    const notificationCountSpan = document.getElementById('notification-count');

    // Function to simulate a new notification
    function newNotification(message) {
        // Increment the count
        notificationCount++;
        notificationCountSpan.innerText = notificationCount;
        notificationCountSpan.style.display = 'inline';

        // Show desktop notification
        showDesktopNotification('New Notification', message);

        // Play notification sound
        playNotificationSound();
    }

    // Function to show desktop notification
    function showDesktopNotification(title, message) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: message,
                icon: 'notification-bell.png' // Example icon URL
            });

            // Close notification after 4 seconds
            setTimeout(() => notification.close(), 4000);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showDesktopNotification(title, message);
                }
            });
        }
    }

    // Function to play notification sound
    function playNotificationSound() {
        const audio = new Audio("tone.wav"); // Example sound URL
        audio.play();
    }

    // Simulate incoming notifications every 10 seconds
    setInterval(() => {
        if (speed > parseInt(SpeedLimitCV)) {
            newNotification('Traffic law violations detected!');
        }
    }, 2000);
});
