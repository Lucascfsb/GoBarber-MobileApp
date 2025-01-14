import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AppProvider from './hooks';
import Routes from './routes/index';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'RobotoSlab-Medium': require('../assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-Regular': require('../assets/fonts/RobotoSlab-Regular.ttf'),
  });


  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync(); 
    };

    prepare();
  }, []);

  
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#312e38" />
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: '#312e38' }}>
            <Routes />
          </View>
        </AppProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;