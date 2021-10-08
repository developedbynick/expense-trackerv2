import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import NewTransaction from './screens/NewTransaction';
import AllTransactions from './screens/AllTransactions';
import { Provider } from 'react-redux';
import { store } from './store'
import * as fonts from 'expo-font'
import Fonts from './constants/Fonts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const Stack = createNativeStackNavigator()
export default function App() {
  const [loaded] = fonts.useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  })
  if (!loaded) return null
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#111' },
          headerTitleStyle: { fontFamily: Fonts.semiBold, color: 'white' },
          headerShadowVisible: false,
          headerTintColor: '#fff'
        }}>
          <Stack.Screen options={{ headerShown: false, }} name="Home" component={Home} />
          <Stack.Screen name="New Transaction" component={NewTransaction} />
          <Stack.Screen name="All Transactions" component={AllTransactions} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

