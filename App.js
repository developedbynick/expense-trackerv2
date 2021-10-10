import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import Home from './screens/Home';
import NewTransaction from './screens/NewTransaction';
import AllTransactions from './screens/AllTransactions';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store'
import * as fonts from 'expo-font'
import Fonts from './constants/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert } from 'react-native';
import { ACTIONS } from './store/reducers/transactions'
import Container from './components/Container';
import HeaderButton from './components/HeaderButtonComponent';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
const Stack = createNativeStackNavigator()
const App = function () {
  const dispatch = useDispatch();
  const [stateLoaded, setStateLoaded] = useState(false)
  const state = useSelector(state => state);
  console.log()
  const SET_STATE = async () => {
    try {
      await AsyncStorage.setItem('state', JSON.stringify(state))
    }
    catch (error) {
      Alert.alert(`There was an error in saving the data provided. `, `(Actual Error: ${error.message})`)
    }
  }
  const GET_STATE = async () => {
    try {
      let state = await (AsyncStorage.getItem('state'));
      if (!state) return;
      state = JSON.parse(state)
      dispatch({ type: ACTIONS.SET_STATE, state: state.transactions })
      setStateLoaded(true)
    } catch (error) {
      Alert.alert('There was an error in fetching your saved data.', error.message)
    }
  }
  useEffect(() => {
    GET_STATE()
  }, [])
  useEffect(() => {
    SET_STATE()
  }, [state])

  const [loaded] = fonts.useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  })
  if (!loaded) return <AppLoading />
  if (!stateLoaded) {
    return <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="white" size="large" style={{ transform: [{ scale: 1.4 }] }} />
    </Container>
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#111' },
          headerTitleStyle: { fontFamily: Fonts.semiBold, color: 'white' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
        }}>
          <Stack.Screen options={{ headerShown: false, }} name="Home" component={Home} />
          <Stack.Screen name="New Transaction" component={NewTransaction} />
          <Stack.Screen options={{
            headerRight: () => {
              return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item onPress={() => Alert.alert('Coming Soon', 'The filter feature will be added soon.')} iconName='ios-filter' title='filter' />
              </HeaderButtons>
            }
          }} name="All Transactions" component={AllTransactions} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default () => {
  return <Provider store={store}>
    <App />
  </Provider>
}