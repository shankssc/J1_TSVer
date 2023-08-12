import { TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
  Button
} from '@ui-kitten/components';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { CustIcon,OwnerIcon,CarriIcon,AdminIcon } from './Icons';
import { useMutation } from '@apollo/client';
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from './operations';
import { useDispatch, useSelector } from "react-redux";
import { auth, selectUser } from '../../reducers/user';
import MyInput from './MyInput';


const Auth = ({ navigation }: any) => {
  
  const [showPassword, setShowPassword] = React.useState<boolean>(true);
  const [isSignup, setIsSignup] = React.useState(true);
  
  const dispatch = useDispatch();

  // const userInfo = useSelector(selectUser);

  // console.log("Store is ",userInfo);

  interface RegFormState {
    username: string;
    email: string;
    password: string;
    role: Role;
  }

  interface LogFormState {
      username: string;
      password: string;
  }
  
  enum Role {
      CUST,
      OWN,
      CAR,
      ADMN,
  }
  
  interface UserSession {
      _id: string;
      username: string;
      email: string;
      token: string;
  }
  
  const [regFormState, setRegFormState] = useState<RegFormState>({
    username: '',
    email: '',
    password: '',
    role: Role.CUST,
  });

  const [logFormState, setLogFormState] = useState<LogFormState>({
    username: '',
    password: ''
  });

  const useToggleState = (initialState = false): ToggleProps => {
    const [checked, setChecked] = React.useState(initialState);

    const onCheckedChange = (isChecked: any): void => {
      setChecked(isChecked);
      setIsSignup(isSignup => !isSignup);
    };

    return { checked, onChange: onCheckedChange };
  };

  const authToggleState = useToggleState();
  
  const toggleSecureEntry = (): void => {
    setShowPassword(!showPassword);
  };

  const renderPassIcon = (props: any) => {
    return (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Ionicons {...props}
       name={showPassword ? 'eye-off' : 'eye'} size={22}/>
    </TouchableWithoutFeedback>
    )
  }

  const [selectedIdx, setSelectedIdx] = React.useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );
  
  const onRoleSelect = (index: IndexPath | IndexPath[]): void => {
    if (Array.isArray(index)) {
      // For multi-select scenario (if needed)
    } else {
      // For single-select scenario
      const selectedRole = Object.values(Role)[index.row];
      setRegFormState({ ...regFormState, role: selectedRole });
    }
  };


  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [signinMutation] = useMutation(SIGNIN_MUTATION);

  const handleSignup = async () => {
    try {
      const { data } = await signupMutation({
        variables: {
          registerInput: {
            username: regFormState.username,
            email: regFormState.email,
            password: regFormState.password,
            role: regFormState.role,
          },
        },
      });
  
      console.log('Signup Successful:', data.signup);
      const payload: UserSession = {
        _id: data.signin?._id,
        username: data.signin?.username,
        email: data.signin?.email,
        token: data.signin?.token
      }
      dispatch(auth(payload));
      // Handle success, e.g., navigate to another screen or display a success message.
    } catch (error:any) {
      console.error('Signup Error:', error.message);
      // Handle error, e.g., display an error message to the user.
    }
  };

  const handleSignin = async () => {
    try {
      const { data } = await signinMutation({
        variables: {
          signInInput: {
            username: logFormState.username,
            password: logFormState.password,
          },
        },
        
      });
      // @ts-ignore
      console.log("Token is ", localStorage.getItem('token') || null);
      console.log('Signin Successful:', data.signin);
      const payload: UserSession = {
        _id: data.signin?._id,
        username: data.signin?.username,
        email: data.signin?.email,
        token: data.signin?.token
      }
      dispatch(auth(payload));
      // Handle success, e.g., navigate to another screen or store the user token in a state.
    } catch (error:any) {
      console.error('Signin Error:', error.message);
      // Handle error, e.g., display an error message to the user.
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }} // Make sure the KeyboardAvoidingView takes the full screen height
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView>
    <Layout style={styles.container}>
      <Avatar
        style={styles.avatar}
        source={require('../../../assets/images/kotaco.png')}
        shape="round"
        size="giant"
      />
      <Card style={styles.card}>
        <Text category="h6" style={styles.text}>{isSignup ? 'Sign up' : 'Sign in'}</Text>

        <Toggle status="info" {...authToggleState} style={styles.toggle}/>

        <MyInput label="username" placeholder="Enter a username" value={isSignup?regFormState.username : logFormState.username} onChangeText={(text) => {isSignup ? setRegFormState({ ...regFormState, username: text }) : setLogFormState({ ...logFormState, username: text })}}/>

        {isSignup && (
        <>
        <MyInput label="email" placeholder="Enter an email" value={regFormState.email} onChangeText={(text)=> setRegFormState({...regFormState, email: text})}/>
        </>
        )}

        <MyInput label="password" placeholder="Enter a password" accessoryRight={renderPassIcon} secureTextEntry={showPassword} value={isSignup ? regFormState.password : logFormState.password} onChangeText={(text) => {isSignup ? setRegFormState({ ...regFormState, password: text }) : setLogFormState({ ...logFormState, password: text })}}/>
        
        {isSignup && (
        <>
        <MyInput  label="confirm password" placeholder="Repeat your password" accessoryRight={renderPassIcon} secureTextEntry={showPassword} />
        
        <Select
          label={() => <Text style={styles.selectLabel}>Role</Text>}
          caption={() => <Text style={styles.selectLabel}>Please select a role before you submit</Text>}
          style={styles.select}
          placeholder="Purpose"
          selectedIndex={selectedIdx}
          onSelect={onRoleSelect}
        >
          <SelectItem title="Customer" accessoryLeft={CustIcon} style={{ flexDirection: 'row', alignItems: 'center' }} />
          <SelectItem title="Owner" accessoryLeft={OwnerIcon} style={{ flexDirection: 'row', alignItems: 'center' }} />
          <SelectItem title="Carrier" accessoryLeft={CarriIcon} style={{ flexDirection: 'row', alignItems: 'center' }} />
          <SelectItem title="Administrator" accessoryLeft={AdminIcon} style={{ flexDirection: 'row', alignItems: 'center' }} />
        </Select>
        </>
        )}
        
        <Button
        appearance='outline'
        style={styles.button}
        onPress={isSignup ? handleSignup : handleSignin}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </Button>
      </Card>
    </Layout>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Auth;
