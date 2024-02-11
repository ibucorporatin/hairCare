import React from 'react';
import MainStackNavigator from './src/navigation/stack/MainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { colors } from './styles/colors';
const App = () => {
  return (
    <NavigationContainer>
       <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
