import {View, TextInput} from 'react-native';
import React, { useState } from 'react';
import { Select, 
         SelectItem, 
         Text, 
         Icon, 
         IconElement,
         IndexPath,
         Layout,
         Card,
         Avatar,
         Toggle,
         ToggleProps,
         Input } from '@ui-kitten/components';
import styles from './styles';

const Auth = ({navigation:any}) => {
    
    const roles = [
        {label: 'Customer', value: '1'},
        {label: 'Business owner', value: '2'},
        {label: 'Carrier', value: '3'},
        {label: 'Administrator', value: '4'},
    ]

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [dropdown, setDropdown] = useState(null);
    const useToggleState = (initialState = false): ToggleProps => {
    const [checked, setChecked] = React.useState(initialState);
    const [selectedIdx, setSelectedIdx] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));


    const onCheckedChange = (isChecked:any): void => {
          setChecked(isChecked);
        };
      
        return { checked, onChange: onCheckedChange };
    };
    
    const authToggleState = useToggleState();

    const CustIcon = (props:any): IconElement => (
        <Icon 
            {...props}
            name = 'person-outline'
        />
    )

    const OwnerIcon = (props:any): IconElement => (
        <Icon 
            {...props}
            name = 'briefcase-outline'
        />
    )

    const CarriIcon = (props:any): IconElement => (
        <Icon 
            {...props}
            name = 'car-outline'
        />
    )

    const AdminIcon = (props:any): IconElement => (
        <Icon 
            {...props}
            name = 'shield-outline'
        />
    )
    
    return (
        <Layout>
            <Avatar 
            source={require('../../../assets/images/kotaco.png')}
            shape='rounded'
            size='small'
            style={styles.avatar}
            />
            <Card>
            <Text category="h6">{isSignup?'Sign up': 'Sign in'}</Text>

            <Toggle 
                status='info'
                {...authToggleState}
            />

            <Input 
            label = 'username'
            placeholder = 'Enter a username'
            />

            <Input 
            label = 'email'
            placeholder = 'Enter an email'
            />

            <Input 
            label = 'password'
            placeholder = 'Enter a password'
            />

            <Input 
            label = 'confirm password'
            placeholder = 'Repeat your password'
            />

            <Select
                label='Role'
                caption='Please select a role before you submit'
                selectedIndex={selectedIdx}
                onSelect={index => setSelectedIdx(index)}
            >
                <SelectItem 
                    title='Customer'
                    accessoryLeft={CustIcon}
                />
                <SelectItem 
                    title='Owner'
                    accessoryLeft={OwnerIcon}
                />
                <SelectItem 
                    title='Carrier'
                    accessoryLeft={CarriIcon}
                />
                <SelectItem 
                    title='Administrator'
                    accessoryLeft={AdminIcon}
                />
            </Select>

            </Card>
        </Layout>
    )
}