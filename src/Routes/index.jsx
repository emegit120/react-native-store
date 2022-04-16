import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from "react";
import Home from "../../screens/Home";
import { Login } from "../../screens/Login";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Routes() {
    const [loged, setLoged] = useState(false)
  const Drawer = createDrawerNavigator();
  
  useEffect(() => {
    AsyncStorage.getItem('login').then(login => {
      if(login){
        setLoged(login)
      }
    })   
  }, [loged])

   const logedMenu = <NavigationContainer>
    
    <SafeAreaView>
        <StatusBar style="auto" />
    </SafeAreaView>
      <Drawer.Navigator
      initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
  </NavigationContainer>


  const changePai = () => {
    setLoged(true)
  }


return (
    <>
        {loged ? logedMenu : <Login logado={changePai} />}
    </>
)

  }

export default registerRootComponent(Routes);