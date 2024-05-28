document.addEventListener("DOMContentLoaded", function() {
  // Hide the preloader after a delay
  setTimeout(function() {
      var preloader = document.querySelector('.loader-wrapper');
      if (preloader) {
          preloader.style.display = 'none';
      }
  }, 2000); // Delay in milliseconds (5 seconds)
});

//NAVBAR
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



//W-STATUS//
fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
var options = {
  series: [{
    name: 'total',
  data: [data.totalPallets, data.usedPallets, data.emptyPallets]
}],
  chart: {

  type: 'bar',
  height: 200,
  toolbar: {
    show: false
  }
},
plotOptions: {
  bar: {
    borderRadius: 4,
    horizontal: true,
  }
},
colors: ['#ff5722', '#ff5722', '#ff5722'],
dataLabels: {
  enabled: true,
  style: {
    colors: ['white']
  }
},
xaxis: {
  categories: ['Total Pallets', 'Used Pallets', 'Empty Pallets',],
},
title: {
  text: 'Warehouse Status', 
  align: 'center', 
  margin: 1, 
  offsetY: 10, 
  style: {
      fontSize: '20px', 
      fontWeight: 'bold', 
      color: '#2d4059',
      fontFamily: 'Reddit Sans Condensed'
  }
},
};

var chart = new ApexCharts(document.querySelector("#w-status"), options);
chart.render();
})
.catch(error => {
console.error('Error fetching data:', error);
});





//W-CAPACITY//
async function fetchCapacities() {
  try {
    const response = await fetch('http://localhost:3000/data');
    if (!response.ok) {
      throw new Error('Failed to fetch capacities');
    }
    const data = await response.json();

    if (data.totalInbound === undefined || isNaN(data.totalInbound) ||
        data.totalOutbound === undefined || isNaN(data.totalOutbound)) {
      throw new Error('Invalid capacity data received');
    }
    return {
      inbound: data.totalInbound,
      outbound: data.totalOutbound
    };
  } catch (error) {
    console.error('Error fetching capacities:', error);
    throw error;
  }
}
async function renderChart() {
  try {
    const capacities = await fetchCapacities();
    const inboundPercentage = Math.floor((capacities.inbound / 3000) * 100);
    const outboundPercentage = Math.floor((capacities.outbound / 3000) * 100);

    var options = {
      series: [inboundPercentage, outboundPercentage],
      chart: {
        offsetX: -70,
        height: 300,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            total: {
              fontSize: '20px',
              show: true,
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + "%"; 
              }
            },
            value: {
              fontSize: '20px',
              fontWeight: 'lighter',
              color: '#111',
              show: true
            }
          }
        }
      },
      labels: ['Inbound', 'Outbound'],
      legend: {
        show: true,
        floating: true,
        fontSize: '14px',
        position: 'right',
        offsetX: -40,
        offsetY: 60,
        labels: {
          useSeriesColors: false, // Set to false
        },
        markers: {
          size: 0
        },
        formatter: function(seriesName, opts) {
          return seriesName + ": " + opts.w.globals.series[opts.seriesIndex] + '%';
        },
        itemMargin: {
          vertical: 3
        },
        onItemClick: {
          toggleDataSeries: false
        }
      },  
    };
    

    var chart = new ApexCharts(document.querySelector("#w-capacity"), options);
    chart.render();
  } catch (error) {
    console.error('Error rendering chart:', error);
  }
}

renderChart();





//INBOUND
async function fetchTotalInbound() {
  try {
      const response = await fetch('http://localhost:3000/data');
      if (!response.ok) {
          throw new Error('Failed to fetch inbound count');
      }
      const data = await response.json();
      return data.totalInbound;
  } catch (error) {
      console.error('Error fetching inbound count:', error);
      throw error;
  }
}

async function renderInbound() {
  try {
      const totalInbound = await fetchTotalInbound();
      const inboundCountElement = document.getElementById('inbound');
      inboundCountElement.textContent = totalInbound;
      const titleElement = document.createElement('h3');
      titleElement.textContent = 'Inbound ';
      inboundCountElement.appendChild(titleElement);
      
  } catch (error) {
      console.error('Error rendering inbound count:', error);
  }
}


document.addEventListener('DOMContentLoaded', renderInbound);



//OUTBOUND//
async function fetchTotalOutbound() {
  try {
      const response = await fetch('http://localhost:3000/data');
      if (!response.ok) {
          throw new Error('Failed to fetch outbound count');
      }
      const data = await response.json();
      return data.totalOutbound;
  } catch (error) {
      console.error('Error fetching outbound count:', error);
      throw error;
  }
}

async function renderOutbound() {
  try {
      const totalOutbound = await fetchTotalOutbound();
      const outboundCountElement = document.getElementById('outbound');
      outboundCountElement.textContent = totalOutbound;

    
      const wrapperDiv = document.createElement('div');


      const titleElement = document.createElement('h4');
      titleElement.textContent = 'Outbound';
      wrapperDiv.appendChild(titleElement);


      outboundCountElement.appendChild(wrapperDiv);
  } catch (error) {
      console.error('Error rendering outbound count:', error);
  }
}

document.addEventListener('DOMContentLoaded', renderOutbound);

//w-column
fetch('http://localhost:3000/data')
  .then(response => response.json())
  .then(data => {
    var options = {
      series: [{
        name: 'transactions',
        data: [data.totalmlibal, data.totalmlicav, data.totalmlicav2, data.totalmlicdo, data.totalmliceb]// Update the data with the fetched data
      }],
      chart: {
        type: 'bar',
        height: 400,
        toolbar : {
          show: false
        }

      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',

        },
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['MLIBAL', 'MLICAV', 'MLICAV2', 'MLICDO', 'MLICEB'],
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      },
    };

    var chart = new ApexCharts(document.querySelector("#column"), options);
    chart.render(); // Render the chart with the updated data
  })
  
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  
