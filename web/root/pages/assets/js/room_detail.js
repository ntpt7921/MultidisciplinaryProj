var chart1 = null;
var chart2 = null;

room_id = document.getElementById('room_id').value;
function updateChart()
{
  $.ajax({
    url : "https://bk-hk231-dadn-smarthome.link/services/get_data.php",
    type: 'post',
    data: {
        type : "temperature",
        room_id : room_id,
        number : 10
    },
    success: function(res){	
        res = JSON.parse(res);
        data = Object.values(res['data']).reverse();
        label = Object.values(res['label'].reverse());
        
        var temp = document.getElementById("temp-chart").getContext("2d");
        //Temerature chart
        if(chart1)
        {
          chart1.clear();
          chart1.destroy();
        }
        chart1 = new Chart(temp, {
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
            animation: {
              duration: 0
            },
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
        room_id : room_id,
        number : 10
    },
    success: function(res){	
        res = JSON.parse(res);
        data = Object.values(res['data']).reverse();
        label = Object.values(res['label'].reverse());
  
        var humid = document.getElementById("humid-chart").getContext("2d");
        if(chart2)
        {
          chart2.clear();
          chart2.destroy();
        }
        chart2 = new Chart(humid, {
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
            animation: {
              duration: 0
            },
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
}

function update_devices()
{
  room = document.getElementById('image').name;
  $.ajax({
      url : "https://bk-hk231-dadn-smarthome.link/services/get_device_status.php",
      type: 'post',
      data: {
          room_id : room,
      },
      success: function(res){	
        res = JSON.parse(res);
        if (res['status'] == 'success')
        {
          devices_status = res['devices'];
          devices_status.forEach(status => {
             element_id = "device_" + status['device_id'];
             element = document.getElementById(element_id);
             if (status['status'] == 1)
             {
              element.checked = true;
             }
             else
             {
              element.checked = false;
             }
          });
        }
      }
    })
}
  


updateChart();
update_devices();
setInterval(updateChart, 5000);
setInterval(update_devices, 5000);
  function update_image()
  {
    var img = document.getElementById('image');
    $.ajax({
      url : "https://bk-hk231-dadn-smarthome.link/services/get_room_image.php",
      type: 'post',
      async: true,
      data: {
          room_id : img.name,
      },
      success: function(res){	
          res = JSON.parse(res);
          if (res['status'] == 'success')
          {
            img.src = res['image'];
          }
      }
    })
  }

  update_image();
  setInterval(update_image, 1000);

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
