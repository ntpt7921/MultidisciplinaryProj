import react, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet, ImageBackground
} from 'react-native';
export default Notification = ({ navigation }) => {
  const [clickedIndex, setClickedIndex] = useState(0);

  const handlePress = (index) => {
    setClickedIndex(index);
  };

  return (
    <ImageBackground
      source={require('../assets/mainBG.jpg')}
      style={{ flex: 1, justifyContent: 'center', width: '100%', height: '100%' }}>

      <View style={{ flex: 5 }}>
        <ScrollView style={{ flex: 5 }}>
          <View
            style={[container.shadowBox, {
              marginHorizontal: 20,
              marginTop: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
            }]}>
            <View style={{}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Alerts</Text>
            </View>
            <View
              style={[
                gradient.bg_1,
                container.shadowBox,
                {
                  marginTop: 20,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                },
              ]}>
              <Text style={{ color: 'white' }}>
                A simple secondary alert with simple link.
              </Text>
            </View>
            <View
              style={[
                gradient.bg_1,
                container.shadowBox,
                {
                  marginTop: 10,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                },
              ]}>
              <Text style={{ color: 'white' }}>
                A simple secondary alert with simple link.
              </Text>
            </View>
          </View>
          <View
            style={[container.shadowBox, {
              marginHorizontal: 20,
              marginTop: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
            }]}>
            <View style={{}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Notifications
              </Text>
            </View>
            <View
              style={[
                gradient.bg_2,
                container.shadowBox,
                {
                  marginTop: 20,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                },
              ]}>
              <Text style={{ color: 'white' }}>
                A simple secondary alert with simple link.
              </Text>
            </View>
            <View
              style={[
                gradient.bg_2,
                container.shadowBox,
                {
                  marginTop: 10,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                },
              ]}>
              <Text style={{ color: 'white' }}>
                A simple secondary alert with simple link.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const gradient = StyleSheet.create({
  bg_1: {
    backgroundColor: 'red',
  },
  bg_2: {
    backgroundColor: 'green',
  },
});

const container = StyleSheet.create({
  shadowBox: {
    borderRadius: 8,
    elevation: 5, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 4 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
  }
})
