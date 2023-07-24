import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import {
  Select,
  SelectItem,
  Text,
  IndexPath,
  Layout,
  Card,
  Avatar,
  Toggle,
  ToggleProps,
  Input,
  Button
} from '@ui-kitten/components';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';


const Auth = ({ navigation }: any) => {
  const roles = [
    { label: 'Customer', value: '1' },
    { label: 'Business owner', value: '2' },
    { label: 'Carrier', value: '3' },
    { label: 'Administrator', value: '4' },
  ];

  const [showPassword, setShowPassword] = React.useState(true);
  const [isSignup, setIsSignup] = React.useState(true);
  const [dropdown, setDropdown] = React.useState(null);

  const useToggleState = (initialState = false): ToggleProps => {
    const [checked, setChecked] = React.useState(initialState);

    const onCheckedChange = (isChecked: any): void => {
      setChecked(isChecked);
      setIsSignup(isSignup => !isSignup);
    };

    return { checked, onChange: onCheckedChange };
  };

  const authToggleState = useToggleState();

    const CustIcon = (props: any) => (
    <Ionicons {...props} name="person-outline" size="30"/>
  );
  
  const toggleSecureEntry = (): void => {
    setShowPassword(!showPassword);
  };

  const renderPassIcon = (props: any) => {
    return (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Ionicons {...props}
       name={showPassword ? 'eye-off' : 'eye'} size="55"/>
    </TouchableWithoutFeedback>
    )
  }

  const OwnerIcon = (props: any) => (
    <Ionicons {...props} name="briefcase-outline" size="30"/>
  );

  const CarriIcon = (props: any) => (
    <Ionicons {...props} name="car-outline" size="30"/>
  );

  const AdminIcon = (props: any) => (
    <Ionicons {...props} name="shield-outline" size="30"/>
  );

  const [selectedIdx, setSelectedIdx] = React.useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );

  return (
    <Layout style={styles.container}>
      <Avatar
        style={styles.avatar}
        source={require('../../../assets/images/kotaco.png')}
        shape="round"
        size="giant"
      />
      <Card style={styles.card}>
        <Text category="h6">{isSignup ? 'Sign up' : 'Sign in'}</Text>

        <Toggle status="info" {...authToggleState} />

        <Input style={styles.input} label="username" placeholder="Enter a username" />

        <Input style={styles.input} label="email" placeholder="Enter an email" />

        <Input style={styles.input} label="password" placeholder="Enter a password" accessoryRight={renderPassIcon} secureTextEntry={showPassword}/>

        <Input style={styles.input} label="confirm password" placeholder="Repeat your password" />

        <Select
          label="Role"
          caption="Please select a role before you submit"
          style={styles.select}
          selectedIndex={selectedIdx}
          onSelect={(index) => setSelectedIdx(index)}
          placeholder="Purpose"
        >
          <SelectItem
            title="Customer"
            accessoryLeft={CustIcon}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          />
          <SelectItem
            title="Owner"
            accessoryLeft={OwnerIcon}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          />
          <SelectItem
            title="Carrier"
            accessoryLeft={CarriIcon}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          />
          <SelectItem
            title="Administrator"
            accessoryLeft={AdminIcon}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          />
        </Select>

        <Button
        appearance='filled'
        >
          Submit
        </Button>
      </Card>
    </Layout>
  );
};

export default Auth;
