import React, { useEffect } from 'react';
import { TailwindProvider } from "tailwindcss-react-native";
import SplashScreen from "react-native-splash-screen";
import { Provider } from 'react-redux'
import store from './reduxThings/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryOrderScreen from './screens/DeliveryOrderScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TailwindProvider>
          <Stack.Navigator>

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Basket" component={BasketScreen}
              options={{
                headerShown: false,
                presentation: "modal"
              }}
            />
            <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen}
              options={{
                headerShown: false,
                presentation: "fullScreenModal"
              }}
            />

            <Stack.Screen name="Delivery" component={DeliveryOrderScreen}
              options={{
                headerShown: false,
                presentation: "fullScreenModal"
              }}
            />

          </Stack.Navigator>
        </TailwindProvider>
      </NavigationContainer>
    </Provider>
  );
};


export default App;
