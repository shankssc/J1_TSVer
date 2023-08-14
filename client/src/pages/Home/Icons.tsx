import { Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import appThemeCoolors from '../../styles/ThemePalette6';

export const HomeIcon = (props: any) => (
    <Ionicons {...props} name="home" size={20} color={appThemeCoolors.colors.primary} />
);

export const BrowseIcon = (props: any) => (
    <MaterialCommunityIcons {...props} name="clipboard-text-search" size={20} color={appThemeCoolors.colors.primary}/>
);

export const ShopIcon = (props: any) => (
    <FontAwesome {...props} name="shopping-basket" size={20} color={appThemeCoolors.colors.primary}/>
);

export const CartIcon = (props: any) => (
    <FontAwesome {...props} name="shopping-cart" size={20} color={appThemeCoolors.colors.primary}/>
);

export const AccountIcon = (props: any) => (
    <Ionicons {...props} name="md-person-circle-sharp" size={20} color={appThemeCoolors.colors.primary}/>
);

export const LocationIcon = (props:any) => (
    <MaterialIcons {...props} name="person-pin-circle" size={25} color={appThemeCoolors.colors.primary}/>
);

export const DeliverIcon = (props:any) => (
    <Ionicons {...props} name="car-sharp" size={20} color={appThemeCoolors.colors.primary}/>
);

export const PickupIcon = (props:any) => (
    <MaterialIcons {...props} name="directions-walk" size={20} color={appThemeCoolors.colors.primary}/>
);

