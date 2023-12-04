import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StatusBar
} from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import DrawerNavigator from './navigators/Drawer'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// or any files within the Snack
import Home from './components/Home';
import { useState } from 'react';

export const Login = ({ navigation }) => {

  return (
    <ImageBackground
      source={require('./assets/curved6.jpg')}
      style={{ flex: 1, justifyContent: 'center', width: '100%', height: '100%' }}>

      <View>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginHorizontal: 20,
          paddingTop: 10,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor: 'lightgray',
        }}>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 30, color: 'blue' }}>Welcome back</Text>
          <Text style={{ textAlign: 'center' }}>Enter your username and password to sign in</Text>
        </View>
        <View>
          <TextInput
            style={{
              backgroundColor: 'white',
              height: 40,
              paddingHorizontal: 5,
              marginHorizontal: 10,
              marginVertical: 5,
              borderRadius: 5,
              borderColor: 'lightgray',
              borderWidth: 0.3,
            }}
            name="email"
            placeholder="Email"
            placeholderTextColor="gray"
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              height: 40,
              paddingHorizontal: 5,
              marginHorizontal: 10,
              marginVertical: 10,
              borderRadius: 5,
              borderColor: 'lightgray',
              borderWidth: 0.3,
            }}
            name="password"
            placeholder="Password"
            placeholderTextColor="gray"
          />
        </View>
        <View style={{ alignItems: 'center', paddingBottom: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: '#e91e63', width: '50%', height: 40, borderRadius: 5, alignItems:'center', justifyContent:'center' }}
            onPress={()=>{navigation.navigate('Drawer')}}
          >
            <Text style={{color: 'white'}}>Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Stack.Navigator screenOptions={{
        headerShown: false, // Hide the header for all screens by default
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
