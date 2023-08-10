import React from 'react';
import { Input, InputProps, Text } from '@ui-kitten/components';
import { ViewStyle } from 'react-native';
import styles from './styles';
import appThemeCoolors from '../../styles/ThemePalette6';

interface MyInputProps extends InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  placeholderTextColor?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  placeholderTextColor = appThemeCoolors.colors.accent,
  ...props
}) => {
  return (
    <>
      <Text style={{ color: placeholderTextColor, marginBottom: 1 }}>
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, containerStyle]}
        {...props}
      />
    </>
  );
};

export default MyInput;
