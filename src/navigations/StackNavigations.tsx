import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import Camera from "../screens/Camera"
import Result from "../screens/Result"



const Stack = createNativeStackNavigator()

export default function StackNavigations() {
  return (
    
    <Stack.Navigator 
    initialRouteName="Home" 
    screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Result" component={Result} />

        
    </Stack.Navigator>
    
  )
}

