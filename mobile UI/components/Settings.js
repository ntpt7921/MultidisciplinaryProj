import react, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Title, Paragraph } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';

export function SettingOptions() {
  const [color, setColor] = useState('white')
  const ColorPress = (color) => {
    setColor(color);
  }

  return (
    <View>
      <View style={[styles.shadowBox, styles.container_plus]}>
        <Text style={styles.h2}>App Theme</Text>
        <View
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={()=>ColorPress('red')}
            style={[
              color === 'red'
                ? styles.circle_color_actived
                : styles.circle_color,
              { backgroundColor: 'red' },
            ]}
          />
          <TouchableOpacity onPress={()=>ColorPress('pink')}
            style={[
              color === 'pink'
                ? styles.circle_color_actived
                : styles.circle_color,
              { backgroundColor: 'pink' },
            ]}
          />
          <TouchableOpacity onPress={()=>ColorPress('blue')}
            style={[
              color === 'blue'
                ? styles.circle_color_actived
                : styles.circle_color,
              { backgroundColor: 'blue' },
            ]}
          />
          <TouchableOpacity onPress={()=>ColorPress('white')}
            style={[
              color === 'white'
                ? styles.circle_color_actived
                : styles.circle_color,
              { backgroundColor: 'white' },
            ]}
          />
          <TouchableOpacity onPress={()=>ColorPress('black')}
            style={[
              color === 'black'
                ? styles.circle_color_actived
                : styles.circle_color,
              { backgroundColor: 'black' },
            ]}
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

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          marginHorizontal: 20,
          paddingTop: 10,
          marginTop: 20,
          borderRadius: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            paddingVertical: 10,
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Settings</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ width: '50%' }}>
            <TextInput
              style={{
                backgroundColor: 'lightgray',
                height: 30,
                paddingHorizontal: 5,
                borderRadius: 5,
              }}
              placeholder="Search..."
              placeholderTextColor="#d81b60"
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ paddingRight: 6 }}>
              <Icon name="user" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingRight: 6 }}
              onPress={() => navigation.openDrawer()}>
              <Icon name="bars" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 6 }}>
              <Icon name="cog" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingRight: 6 }}
              onPress={() => navigation.navigate('Notification')}>
              <Icon name="bell" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <ScrollView style={{ flex: 5 }}>
          <SettingOptions />
        </ScrollView>
      </View>
    </View>
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
  container_plus: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingTop: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  circle_color: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 0.1,
  },
  circle_color_actived: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 0.1,
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
