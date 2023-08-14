import React, { useState } from 'react';
import { View } from 'react-native';
//@ts-ignore
import SwitchSelector from "react-native-switch-selector";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import appThemeCoolors from '../../styles/ThemePalette6'; // Import your theme colors

const options = [
  { label: 'Delivery', value: 'delivery', customIcon: <Ionicons name="car-sharp" size={20} /> },
  { label: 'Pickup', value: 'pickup', customIcon: <MaterialIcons name="directions-walk" size={20} /> },
];

const DeliveryToggle = () => {
  const [selectedOption, setSelectedOption] = useState<string>('delivery');

  return (
    <SwitchSelector
        options={options}
        initial={0}
        textColor={appThemeCoolors.colors.primary}
        selectedColor={appThemeCoolors.colors.accent}
        buttonColor={appThemeCoolors.colors.primary}
        borderColor={appThemeCoolors.colors.primary}
        hasPadding  
        onPress={(value:any) => setSelectedOption(value)}
        height={30}
        
    />
  );
};

export default DeliveryToggle;
