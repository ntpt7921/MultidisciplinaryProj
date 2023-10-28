var temp = document.getElementById("temp-chart").getContext("2d");
//Temerature chart
new Chart(temp, {
  type: "bar",
  data: {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"], //Change time here
    datasets: [{
      label: "",
      tension: 0.4,
      borderWidth: 0,
      borderRadius: 4,
      borderSkipped: false,
      backgroundColor: "#ea0606",
      data: [21.5, 22.2, 20.9, 23.1, 22.8, 20.5, 23.4, 21.7, 20.2], //Change to datas here
      maxBarThickness: 6
    },],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500,
          beginAtZero: true,
          padding: 15,
          font: {
            size: 14,
            family: "Open Sans",
            style: 'normal',
            lineHeight: 2
          },
          color: "#fff"
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false
        },
        ticks: {
          display: false
        },
      },
    },
  },
});

var humid = document.getElementById("humid-chart").getContext("2d");

new Chart(humid, {
  type: "bar",
  data: {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"], //Change time here
    datasets: [{
      label: "",
      tension: 0.4,
      borderWidth: 0,
      borderRadius: 4,
      borderSkipped: false,
      backgroundColor: "#fff",
      data: [45, 50, 42, 55, 51, 43, 56, 47, 41], //Change to datas here
      maxBarThickness: 6
    },],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500,
          beginAtZero: true,
          padding: 15,
          font: {
            size: 14,
            family: "Open Sans",
            style: 'normal',
            lineHeight: 2
          },
          color: "#fff"
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false
        },
        ticks: {
          display: false
        },
      },
    },
  },
});