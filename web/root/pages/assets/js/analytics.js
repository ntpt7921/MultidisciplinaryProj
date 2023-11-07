var chart = null;
sensor = document.getElementById('select_sensor');
function update()
{
    if(sensor.value == "Humidity") table = 'cambien_doam';
    else if (sensor.value == "Temperature") table = 'cambien_nhietdo';

    $.ajax({
        url : "https://bk-hk231-dadn-smarthome.link/services/get_latest_value.php",
        type: 'post',
        data: {
            table : table,
        },
        success: function(res){	
            res = JSON.parse(res);
            {
                if(res['status'] == "Success")
                {
                    data = res['data'];
                    room = 'room_';
                    for(id in data)
                    {
                        value = data[id];
                        element = document.getElementById(room+id);
                        element.innerHTML = value;
                        if (table == 'cambien_nhietdo')
                        {
                            document.getElementById('Chart_name').innerHTML = "Temperature Chart";
                            element.innerHTML += " &deg;C";
                        }
                        else if (table == 'cambien_doam')
                        {
                            document.getElementById('Chart_name').innerHTML = "Humidity Chart";
                            element.innerHTML += ' g/m<sup>3</sup>'
                        }
                    }
                }
            }
        },
    })
    
    type = sensor.value.toLowerCase();
    
    room_name = {};
    //data for chart
    var ele = document.querySelectorAll("h5[id*='room_']");
    var rooms_id = [];
    ele.forEach(function(val, ind){
        room_id = val.id.split("room_")[1];
        rooms_id.push(room_id);
        room_name[room_id] = val.getAttribute('value');

    });

    data = [];
    
    rooms_id.forEach((val, ind) => {
        getData(type, val, data);
    });
    
     //draw ch
     var ctx0 = document.getElementById("chart").getContext("2d");

     var gradientStroke0 = ctx0.createLinearGradient(0, 230, 0, 50);
     gradientStroke0.addColorStop(1, 'rgba(203,12,159,0.2)');
     gradientStroke0.addColorStop(0.2, 'rgba(72,72,176,0)');
     gradientStroke0.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors
 
     var gradientStroke1 = ctx0.createLinearGradient(0, 230, 0, 50);
     gradientStroke1.addColorStop(1, 'rgba(20,23,39,0.2)');
     gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0)');
     gradientStroke1.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors
 

    //var gradientStroke = [gradientStroke0, gradientStroke1, gradientStroke2, gradientStroke3];

    datasets = []







    data.forEach(function(val, ind){
        var rgb = [];
        for(var i = 0; i < 3; i++)
        {
            r = Math.floor(Math.random() * 255)
            while(r > 170)  r = Math.floor(Math.random() * 255);
            rgb.push(r);
        }


        current_data = {};
        current_data['label'] = room_name[ind+1];
        current_data['tension'] = 0.4;
        //current_data['borderWidth'] = 0;
        current_data['pointRadius'] = 0;
        current_data['borderColor'] = 'rgb('+ rgb.join(',') +')';
        current_data['boderWidth'] = 10;
        current_data['backgroundColor'] = gradientStroke0;
        current_data['fill'] = true;
        current_data['data'] = val['data'];
        datasets.push(current_data);
    })

    if(chart){
        chart.clear();
        chart.destroy();
    }

   

    

   chart = new Chart(ctx0, {
     type: "line",
     data: {
       labels: data[0]['label'],
       datasets: datasets,
     },
     options: {
      animation: {
        duration: 0
      },
       responsive: true,
       maintainAspectRatio: false,
       plugins: {
         legend: {
           display: true,
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
             display: true,
             drawOnChartArea: true,
             drawTicks: false,
             borderDash: [5, 5]
           },
           ticks: {
             display: true,
             padding: 10,
             color: '#b2b9bf',
             font: {
               size: 11,
               family: "Open Sans",
               style: 'normal',
               lineHeight: 2
             },
           }
         },
         x: {
           grid: {
             drawBorder: false,
             display: false,
             drawOnChartArea: false,
             drawTicks: false,
             borderDash: [5, 5]
           },
           ticks: {
             display: true,
             color: '#b2b9bf',
             padding: 20,
             font: {
               size: 11,
               family: "Open Sans",
               style: 'normal',
               lineHeight: 2
             },
           }
         },
       },
     },
   });
   // End Chart
   var icons = document.getElementsByName('icon');

   if(sensor.value == "Temperature") clss = "bi bi-thermometer text-lg opacity-10";
   else clss = "<bi bi-moisture text-lg opacity-10";
   icons.forEach((icon, ind) => {
      icon.className = clss;
   })
   

}
sensor.addEventListener('change', update);

function getData(type, room_id, d)
{
    result = {}
    $.ajax({
        url : "https://bk-hk231-dadn-smarthome.link/services/get_data.php",
        type: 'post',
        data: {
            type : type,
            room_id : room_id,
            number : 10
        },
        async : false,
        success: function(res){	
            res = JSON.parse(res);
            result['label'] = Object.values(res['label'].reverse());
            result['data'] =  Object.values(res['data']).reverse();
            d.push(result);
        }
    });
}
    
update();
setInterval( update, 10000);
