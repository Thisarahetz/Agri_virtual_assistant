/**
 * @author Thisarahetz
 * 
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigations from './src/navigations/StackNavigations';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;



function App(): JSX.Element {


  return (
    <NavigationContainer>
      <StackNavigations />
    </NavigationContainer>
  );
}

export default App;