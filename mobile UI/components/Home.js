import react, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  Switch, ImageBackground
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import User from '../classes/User'
import axios from 'axios';
import Url from '../classes/Url'
import RequestConfig from '../classes/RequestConfig';


const BarChartExample = ({ data }) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width
  );
  return (
    <View style={styles.container}>
      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth - 80}
        height={250}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#141727',
          backgroundGradientTo: '#3A416F',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.1,
        }}
      />
    </View>
  );
};

export const WelcomeBack = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toUTCString()

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={[
      styles.shadowBox,
      { backgroundColor: 'lightgray', marginHorizontal: 20, marginTop: 20, padding: 10 },
    ]}>
      <Text>Welcome Back, Hoa Tùng</Text>
      <Text style={{ fontSize: 25 }}>{formattedDate.slice(0, 16)}</Text>
      <Text style={{ fontSize: 25 }}>{currentTime.toLocaleTimeString()}</Text>
    </View>
  )
}

export function QuickAccess(props) {
  const {clickedIndex} = props
  const [isEnabled, setIsEnabled] = useState(false);
  const [devices, setDevices] = useState([]);
  
  const toggleSwitch = async (device) => {
    let request = {
      room_id : device.room_id,
      house_id : device.house_id,
      device_id : device.device_id,
      request : device.status == 1 ? "turn off" : "turn on"
    }
    //console.log(device);
    await axios.post(Url.ServiceUrl+"send_request_to_device.php", request, RequestConfig.useCookieConfig(User.token));
    //console.log(data);
  };

  //console.log(clickedIndex);
  let get_devices = async () => {
    let result = await axios.post(Url.ServiceUrl+"get_device_status.php", {
      room_id : clickedIndex
    }, RequestConfig.useCookieConfig(User.token));

    var data = result.data;
    if(data.status == "success")
    {
      setDevices(data.devices);
    }
   //console.log(devices);
  }

  useEffect(() => {
    var intervalId = setInterval(async () => {
      get_devices();
    }, 1000)

    return () => {
      clearInterval(intervalId);
    }
  }, [clickedIndex])

  //console.log(devices);
  return (
    <View
      style={[
        styles.shadowBox,
        { backgroundColor: 'white', margin: 20, padding: 10 },
      ]}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Quick Access</Text>
      </View>
      <View style={{ marginTop: 10 }}>
          {devices.length != 0 ? (<>{
            devices.map((device, index) => {

              return (<View key={device.device_id}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text>{device.device_name}</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={device.status ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch(device)} //mai làm
                value={(device.status == 1 ? true : false)}
              />
            </View>
            </View>)
            })
          }</>) : ""}
      </View>
    </View>
  );
}

export default Home = ({ navigation }) => {
  const [clickedIndex, setClickedIndex] = useState(1);
  const [roomImg, setRoomImg] = useState('');
  const [rooms, setRooms] = useState([]);
  const [temperature, setTemperature] = useState([10000]);
  const [humidity, setHumidity] = useState([10000]);
  const [temperature_chart_data, setTemperatureChartData] = useState({label : [], data : []})
  const [humidity_chart_data, setHumidityChartData] =  useState({label : [], data : []})

  const handlePress = (index) => {
    setClickedIndex(index);
    User.current_room = index;
    setRoomImg('');
  };

  useEffect(() => {
    var intervalId = setInterval(async () => {
      try{
        var res = await axios.post(Url.ServiceUrl+"get_room_image.php", {
          room_id : User.current_room
        }, RequestConfig.useCookieConfig(User.token));

        var data = res.data;
        if(data.status == "success")
        {
          //console.log(clickedIndex);
          if(data.room_id == User.current_room) setRoomImg(data.image);
          else setRoomImg('');
        }
      }
      catch(e)
      {

      }   
    }, 1000)

    return () => {
      clearInterval(intervalId);
    }
  })

  useEffect(() => {
    var intervalId = setInterval(async () => {
      try{
        var res = await axios.post(Url.ServiceUrl+"get_data.php", {
          type : "temperature",
          room_id : clickedIndex,
          number : 5
        }, RequestConfig.useCookieConfig(User.token));

        var data = res.data;
        if(data.status == "success")
        {
          //console.log(data);
          let label = [];
          data.label.forEach(ele => {
            label.push(ele.split(" ")[1]);
          })
          //console.log(label);
          setTemperatureChartData({label : label, data : data.data});
        }

        var result = await axios.post(Url.ServiceUrl+"get_data.php", {
          type : "humidity",
          room_id : clickedIndex,
          number : 5
        }, RequestConfig.useCookieConfig(User.token));

        var data_ = result.data;
        if(data_.status == "success")
        {
          //console.log(data);
          let label_ = [];
          data_.label.forEach(ele => {
            label_.push(ele.split(" ")[1]);
          })
          //console.log(label_);
          setHumidityChartData({label : label_, data : data_.data});
        }
      }
      catch(e)
      {

      }   
    }, 3000)

    return () => {
      clearInterval(intervalId);
    }
  }, [clickedIndex])

  const chartdata_temperature = {
    labels: temperature_chart_data.label,
    datasets: [
      {
        data: temperature_chart_data.data,
      },
    ],
  };

  const chartdata_humidity = {
    labels: humidity_chart_data.label,
    datasets: [
      {
        data: humidity_chart_data.data,
      },
    ],
  };

  let get_rooms = async () => {
    let result = await axios.post(Url.ServiceUrl+"get_rooms.php", {
        id : 123
    }, RequestConfig.useCookieConfig(User.token));
    var data = result.data;
    //console.log(result);
    if(data.status == "success")
    {
      setRooms(data.data);
    }
  }

  useEffect(() => {
    try{
      get_rooms();
      get_temperature();
      get_humidity();
    }
    catch(e){

    }
    
  }, []);

  useEffect(() => {
    try{
      get_temperature();
      get_humidity();
    }
    catch(e){

    }
    
  }, [clickedIndex]);


  //console.log(rooms[0].room_name);

  let get_temperature = async () => {
    let result = await axios.post(Url.ServiceUrl + "get_data.php", {
      type : "temperature",
      room_id : clickedIndex,
      number : 1
    }, RequestConfig.useCookieConfig(User.token));

    let data = result.data;
    if(data.status == "success")
    {
      setTemperature(data.data);
    }
  }

  let get_humidity = async () => {
    let result = await axios.post(Url.ServiceUrl + "get_data.php", {
      type : "humidity",
      room_id : clickedIndex,
      number : 1
    }, RequestConfig.useCookieConfig(User.token));
    let data = result.data;
    if(data.status == "success")
    {
      setHumidity(data.data);
    }
  }

  return (
    <ImageBackground
      source={require('../assets/mainBG.jpg')}
      style={{ flex: 1, justifyContent: 'center', width: '100%', height: '100%' }}>
      <ScrollView style={{ flex: 5 }}>
        <WelcomeBack />
        <View>
          <Card
            style={[
              styles.shadowBox,
              { marginHorizontal: 20, marginTop: 20 },
            ]}>
            <Card.Cover
              style={{ borderRadius: 10, height: 200 }}
              source={
                roomImg == "" ? require("../assets/loading.png") : {uri : roomImg}
              }
            />
            <Card.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Camera</Text>
              <Card.Content
                style={{
                  width: '50%',
                  backgroundColor: '#ecf0f1',
                  borderRadius: 10,
                  paddingHorizontal: 0,
                  alignItems: 'center',
                }}>
                  
                {rooms.length != 0 ? (<>{
                  rooms.map((room, index) => {
                    return (
                      <TouchableOpacity key={index}
                      style={[
                        button.style1,
                        clickedIndex === room[0] && button.activedButton,
                      ]}
                      onPress={() => handlePress(room[0])}>
                      <Text style={{ textAlign: 'center' }}>{room[2]}</Text>
                    </TouchableOpacity>
                    )
            })
          }</>) : ""}
              </Card.Content>
            </Card.Content>
          </Card>
        </View>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={[
              styles.shadowBox,
              { backgroundColor: 'white', borderRadius: 10 },
            ]}>
            <BarChartExample data={chartdata_temperature} />
            <View style={{ paddingLeft: 20, paddingVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Temperature
              </Text>
              <Text style={{ fontSize: 15, color: 'gray' }}>Bed Room 1</Text>
            </View>
          </View>
          <View
            style={[
              styles.shadowBox,
              { backgroundColor: 'white', borderRadius: 10, marginTop: 20 },
            ]}>
            <BarChartExample data={chartdata_humidity} />
            <View style={{ paddingLeft: 20, paddingVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Humidity
              </Text>
              <Text style={{ fontSize: 15, color: 'gray' }}>Bed Room 1</Text>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Card.Content style={[styles.shadowBox, card.container]}>
              <View style={{ flexDirection: 'row' }}>
                <Title style={{ color: '#e91e63', fontSize: 30 }}>{temperature[0] != 10000 ? temperature : "--"}</Title>
                <Title style={{ color: '#e91e63', fontSize: 20 }}>°C</Title>
              </View>
              <Paragraph style={{ color: 'gray' }}>Temperature</Paragraph>
            </Card.Content>
            <Card.Content style={[styles.shadowBox, card.container]}>
              <View style={{ flexDirection: 'row' }}>
                <Title style={{ color: '#e91e63', fontSize: 30 }}>{humidity[0] != 10000 ? humidity[0] : "--"} g/m</Title>
                <Title style={{ color: '#e91e63', fontSize: 20 }}><Text style={{fontSize:15, lineHeight:22}}>3</Text></Title>
              </View>
              <Paragraph style={{ color: 'gray' }}>Humidity</Paragraph>
            </Card.Content>
          </View>
        </View>
        <QuickAccess 
          clickedIndex={clickedIndex}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const button = StyleSheet.create({
  style1: {
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 5,
    width: '100%',
  },
  activedButton: {
    backgroundColor: 'white',
  },
});

const card = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    paddingVertical: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  shadowBox: {
    borderRadius: 8,
    elevation: 5, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 4 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
  },
});
