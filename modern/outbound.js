// LOADER
document.addEventListener("DOMContentLoaded", function() {
  // Hide the preloader after a delay
  setTimeout(function() {
      var preloader = document.querySelector('.loader-wrapper');
      if (preloader) {
          preloader.style.display = 'none';
      }
  }, 4000); // Delay in milliseconds (5 seconds)
});


document.addEventListener("DOMContentLoaded", function() {
  fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
          document.getElementById("navbar").innerHTML = data;
          setActivePage();
      })
      .catch(error => console.error("Error loading navbar:", error));
});

function setActivePage() {
  const currentPage = window.location.pathname.split("/").pop(); 
  const links = document.querySelectorAll("#navbar a"); // Selecting <a> elements within the navbar
  links.forEach(link => {
      if (link.getAttribute("href") === currentPage) { // Compare with the filename of the current page
          link.classList.add("active");
          console.log("Current Page:", currentPage);
      }
  });
}



// SUBMITTED
async function fetchSubmitted() {
    try {
        const response = await fetch('http://localhost:3000/outbound');
        if (!response.ok) {
            throw new Error('Failed to fetch submitted count');
        }
        const data = await response.json();
        return data.submitted; // Use 'totalsubmitted' key to access the total count
    } catch (error) {
        console.error('Error fetching submitted count:', error);
        throw error;
    }
}

async function renderSubmitted() {
    try {
        const Submitted = await fetchSubmitted();
        const submittedCountElement = document.getElementById('submitted');
        submittedCountElement.textContent = Submitted;
        const titleElement = document.createElement('h3');
          titleElement.textContent = 'Submitted ';
          submittedCountElement.appendChild(titleElement);
        
    } catch (error) {
        console. error('Error rendering submitted count:', error);
    }
}

document.addEventListener('DOMContentLoaded', renderSubmitted);


// PENDING 
async function fetchPending() {
    try {
        const response = await fetch('http://localhost:3000/outbound');
        if (!response.ok) {
            throw new Error('Failed to fetch pending count');
        }
        const data = await response.json();
        return data.pending; // Use 'Pending' key to access the total count
    } catch (error) {
        console.error('Error fetching pending count:', error);
        throw error;
    }
}

async function renderPending() {
    try {
        const Pending = await fetchPending();
        const pendingCountElement = document.getElementById('pending');
        pendingCountElement.textContent = Pending;
        const titleElement = document.createElement('h4');
        titleElement.textContent = 'Pending ';
        pendingCountElement.appendChild(titleElement);
        
    } catch (error) {
        console.error('Error rendering pending count:', error);
    }
}

document.addEventListener('DOMContentLoaded', renderPending);

// ACCEPTED
async function fetchAccepted() {
    try {
        const response = await fetch('http://localhost:3000/outbound');
        if (!response.ok) {
            throw new Error('Failed to fetch accepted count');
        }
        const data = await response.json();
        return data.accepted; // Use 'totalPending' key to access the total count
    } catch (error) {
        console.error('Error fetching accepted count:', error);
        throw error;
    }
}

async function renderAccepted() {
    try {
        const Accepted = await fetchAccepted();
        const acceptedCountElement = document.getElementById('accepted');
        acceptedCountElement.textContent = Accepted;
        const titleElement = document.createElement('h5');
        titleElement.textContent = 'Accepted ';
        acceptedCountElement.appendChild(titleElement);
        
    } catch (error) {
        console.error('Error rendering accepted count:', error);
    }
}

document.addEventListener('DOMContentLoaded', renderAccepted);

// HOLD 

async function fetchHold() {
    try {
        const response = await fetch('http://localhost:3000/outbound');
        if (!response.ok) {
            throw new Error('Failed to fetch hold count');
        }
        const data = await response.json();
        return data.hold; // Use 'totalPending' key to access the total count
    } catch (error) {
        console.error('Error fetching hold count:', error);
        throw error;
    }
}

async function renderHold() {
    try {
        const Hold = await fetchHold();
        const holdCountElement = document.getElementById('hold');
        holdCountElement.textContent = Hold;
        const titleElement = document.createElement('h6');
        titleElement.textContent = 'Hold ';
        holdCountElement.appendChild(titleElement);
        
    } catch (error) {
        console.error('Error rendering hold count:', error);
    }
}

document.addEventListener('DOMContentLoaded', renderHold);

// CANCELLED


async function fetchCancelled() {
    try {
        const response = await fetch('http://localhost:3000/outbound');
        if (!response.ok) {
            throw new Error('Failed to fetch cancelled count');
        }
        const data = await response.json();
        return data.cancelled;
    } catch (error) {
        console.error('Error fetching cancelled count:', error);
        throw error;
    }
}

async function renderCancelled() {
    try {
        const Cancelled = await fetchCancelled();
        const cancelledCountElement = document.getElementById('cancelled'); // Corrected variable name
        cancelledCountElement.textContent = Cancelled;
        const titleElement = document.createElement('h6');
        titleElement.textContent = 'Cancelled ';
        cancelledCountElement.appendChild(titleElement);
        
    } catch (error) {
        console.error('Error rendering cancelled count:', error);
    }
}

document.addEventListener('DOMContentLoaded', renderCancelled);

// TRANSACTION
fetch('http://localhost:3000/outbound')
  .then(response => response.json())
  .then(data => {
    var options = {
      series: [{
        name: "transactions",
        data: [
          data.january,
          data.february,
          data.march,
          data.april,
          data.may,
          data.june,
          data.july,
          data.august,
          data.september,
          data.october,
          data.november,
          data.december
        ] ,
      }],
      chart: {
        type: 'area', // Change chart type to 'area'
        width: 700,
        height: 350,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      stroke: {
        curve: 'smooth' // Use smooth curve for area chart
      },
      title: {
        text: 'Transactions',
        align: 'Center',
        fontSize: 700,
        style : {
          fontWeight: 'bold',
       fontFamily: 'Reddit Sans Condensed'
        }
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        labels: {
          rotate: -45 
        }
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return (val !== undefined && val !== null) ? val : 0;
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#transactions"), options);
    chart.render();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  // STORAGE
  fetch('http://localhost:3000/outbound')
  .then(response => response.json())
  .then(data => {
    var options = {
      series: [data.cold, data.dry, data.chiller, data.aircon],// Use fetched data as series
      labels: ['Cold Storage', 'Dry Storage', 'Chiller Storage', 'Air Conditioned Storage'],

       // Add labels for each series
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 500
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    var chart = new ApexCharts(document.querySelector("#storage"), options);
    chart.render();
  })
  .catch(error => console.error("Error fetching data:", error));