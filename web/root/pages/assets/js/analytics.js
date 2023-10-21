
document.getElementById('select_sensor').addEventListener('change', function(){
    if(this.value == "Humidity") table = 'cambien_doam';
    else if (this.value == "Temperature") table = 'cambien_nhietdo';

    $.ajax({
        url : "http://localhost/services/get_latest_value.php",
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
})
