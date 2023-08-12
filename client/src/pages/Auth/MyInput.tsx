import React from 'react';
import { Input, InputProps, Text } from '@ui-kitten/components';
import { ViewStyle } from 'react-native';
import styles from './styles';
import appThemeColors from '../../styles/ThemePalette6';

interface MyInputProps extends InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  placeholderTextColor?: string; // Custom prop for placeholder text color
}

const MyInput: React.FC<MyInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  placeholderTextColor = appThemeColors.colors.accent,
  ...props
}) => {
  const inputTextColor = appThemeColors.colors.accent; // Default input text color

  return (
    <>
      <Text style={{ color: placeholderTextColor, marginBottom: 1 }}>
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        textStyle={{ color: inputTextColor }} // Set default input text color
        style={[styles.input, containerStyle]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    </>
  );
};

export default MyInput;
