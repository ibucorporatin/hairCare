
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageCollection from '../../screens/image_collection/ImageCollection';
import ImageOverview from '../../screens/image_overview/ImageOverview';
import Progress  from '../../screens/progress/Progress';
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="image_collection" component={ImageCollection} />
      <Stack.Screen name="image_overview" component={ImageOverview} />
      <Stack.Screen name="progress" component={Progress } />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
