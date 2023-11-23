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

export default Notification = ({ navigation }) => {
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notifications</Text>
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
            <TouchableOpacity style={{ paddingRight: 6 }} onPress={()=>navigation.navigate('Notification')}>
              <Icon name="bell" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <ScrollView style={{ flex: 5 }}>
          <View
            style={[container.shadowBox,{
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
            style={[container.shadowBox,{
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
    </View>
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
