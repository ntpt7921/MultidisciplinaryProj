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
import Token from '../classes/Token'



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

export function QuickAccess() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text>Light</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text>Camera</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text>Wifi</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
}

export default Home = ({ navigation }) => {
  const [clickedIndex, setClickedIndex] = useState(0);

  const handlePress = (index) => {
    setClickedIndex(index);
  };

  const chartdata = {
    labels: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

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
                clickedIndex === 0
                  ? require('../assets/home-decor-1.jpg')
                  : clickedIndex === 1
                    ? require('../assets/home-decor-2.jpg')
                    : require('../assets/home-decor-3.jpg')
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
                <TouchableOpacity
                  style={[
                    button.style1,
                    clickedIndex === 0 && button.activedButton,
                  ]}
                  onPress={() => handlePress(0)}>
                  <Text style={{ textAlign: 'center' }}>Kitchen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    button.style1,
                    clickedIndex === 1 && button.activedButton,
                  ]}
                  onPress={() => handlePress(1)}>
                  <Text style={{ textAlign: 'center' }}>Living Room</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    button.style1,
                    clickedIndex === 2 && button.activedButton,
                  ]}
                  onPress={() => handlePress(2)}>
                  <Text style={{ textAlign: 'center' }}>Store House</Text>
                </TouchableOpacity>
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
            <BarChartExample data={chartdata} />
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
            <BarChartExample data={chartdata} />
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
                <Title style={{ color: '#e91e63', fontSize: 30 }}>21</Title>
                <Title style={{ color: '#e91e63', fontSize: 20 }}>°C</Title>
              </View>
              <Paragraph>LivingRoom</Paragraph>
              <Paragraph style={{ color: 'gray' }}>Temperature</Paragraph>
            </Card.Content>
            <Card.Content style={[styles.shadowBox, card.container]}>
              <View style={{ flexDirection: 'row' }}>
                <Title style={{ color: '#e91e63', fontSize: 30 }}>44</Title>
                <Title style={{ color: '#e91e63', fontSize: 20 }}>%</Title>
              </View>
              <Paragraph>OutSide</Paragraph>
              <Paragraph style={{ color: 'gray' }}>Humidity</Paragraph>
            </Card.Content>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Card.Content style={[styles.shadowBox, card.container]}>
              <View style={{ flexDirection: 'row' }}>
                <Title style={{ color: '#e91e63', fontSize: 30 }}>87</Title>
                <Title style={{ color: '#e91e63', fontSize: 20 }}>m³</Title>
              </View>
              <Paragraph>Water</Paragraph>
              <Paragraph style={{ color: 'gray' }}>Consumption</Paragraph>
            </Card.Content>
            <Card.Content style={[styles.shadowBox, card.container]}>
              <View style={{ flexDirection: 'row' }}>
                <Title style={{ color: '#e91e63', fontSize: 30 }}>417</Title>
                <Title style={{ color: '#e91e63', fontSize: 20 }}>GB</Title>
              </View>
              <Paragraph>Internet</Paragraph>
              <Paragraph style={{ color: 'gray' }}>All devices</Paragraph>
            </Card.Content>
          </View>
        </View>
        <QuickAccess />
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
