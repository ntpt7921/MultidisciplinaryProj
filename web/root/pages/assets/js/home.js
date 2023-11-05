$.ajax({
  url : "https://bk-hk231-dadn-smarthome.link/services/get_data.php",
  type: 'post',
  data: {
      type : "temperature",
      room_id : 1,
      number : 10
  },
  success: function(res){	
      res = JSON.parse(res);
      data = Object.values(res['data']).reverse();
      label = Object.values(res['label'].reverse());
      document.getElementById('temper').innerHTML = data[0]+" ";
      
      var temp = document.getElementById("temp-chart").getContext("2d");
      //Temerature chart
      new Chart(temp, {
        type: "bar",
        data: {
          labels: label, //Change time here
          datasets: [{
            label: "",
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "#ea0606",
            data: data, //Change to datas here
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
  },
})

$.ajax({
  url : "https://bk-hk231-dadn-smarthome.link/services/get_data.php",
  type: 'post',
  data: {
      type : "humidity",
      room_id : 1,
      number : 10
  },
  success: function(res){	
      res = JSON.parse(res);
      data = Object.values(res['data']).reverse();
      label = Object.values(res['label'].reverse());

      document.getElementById('humid').innerHTML = data[0]+" ";

      var humid = document.getElementById("humid-chart").getContext("2d");

      new Chart(humid, {
        type: "bar",
        data: {
          labels: label, //Change time here
          datasets: [{
            label: "",
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "#fff",
            data: data, //Change to datas here
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
  }
})

function updateClock() {
  var now = new Date(), // current date
  hour =  now.getHours();
  minute = now.getMinutes();
  if (minute < 10) minute = "0"+minute;
  second = now.getSeconds();
  if (second < 10) second = "0"+second;
  time = hour + ':' + minute + ":" + second;// again, you get the idea

  // set the content of the element with the ID time to the formatted string
  document.getElementById('time').innerHTML = time;

  // call this function again in 1000ms
  setTimeout(updateClock, 1000);
}
updateClock(); // initial call

devices = document.getElementsByName('switch_status');
  devices.forEach(device => {
    device.addEventListener('click', function(){
      ids = device.value.split('');
      house_id = ids[0];
      room_id = ids[1];
      device_id = ids[2];
      if(device.checked) request = 'turn on';
      else request = 'turn off';
      $.ajax({
        url : "https://bk-hk231-dadn-smarthome.link/services/send_request_to_device.php",
        type: 'post',
        data: {
            room_id : room_id,
            house_id: house_id,
            device_id : device_id,
            request : request
        },
        success: function(res){	
            res = JSON.parse(res);
            if (res['status'] == 'success')
            {
              console.log(res);
            }
            else
            {
              if (request == 'turn on') device.checked = false;
              else device.checked = true;
              console.log(device.checked);
              console.log(request);
            }
        }
      })
    })
  });


 