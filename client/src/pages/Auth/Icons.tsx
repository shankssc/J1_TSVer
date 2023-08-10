import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

export const CustIcon = (props: any) => (
    <Ionicons {...props} name="person-outline" size={20}/>
  );

export const OwnerIcon = (props: any) => (
    <Ionicons {...props} name="briefcase-outline" size={20}/>
  );

export const CarriIcon = (props: any) => (
    <Ionicons {...props} name="car-outline" size={20}/>
  );

export const AdminIcon = (props: any) => (
    <Ionicons {...props} name="shield-outline" size={20}/>
  );
