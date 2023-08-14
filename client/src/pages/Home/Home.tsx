import React, { useState } from 'react';
import styles from './styles';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import { HomeIcon, BrowseIcon, ShopIcon, CartIcon, AccountIcon, LocationIcon, DeliverIcon, PickupIcon } from './Icons';
import CurrentLocation from './GeoLoc';
import { View,TouchableWithoutFeedback  } from 'react-native';
import DeliveryToggle from './DeliveryToggle';

const Home = ({ navigation }: any): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Layout style={styles.container}>
      <View style={styles.topLeftSection}>
      <Text category="h7" style={{marginRight:8}}>Deliver now</Text>
      <View style={styles.addressContainer}>
    <LocationIcon />
    <CurrentLocation />
    <View style={styles.toggleContainer}>
    <DeliveryToggle />
    </View>
    </View>
      </View>

      <Layout style={styles.bottomNavigationContainer}>
      
        <BottomNavigation
          style={styles.bottomNavigation}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
        >
          <BottomNavigationTab title="Home" icon={HomeIcon} />
          <BottomNavigationTab title="Shop" icon={ShopIcon} />
          <BottomNavigationTab title="Browse" icon={BrowseIcon} />
          <BottomNavigationTab title="Cart" icon={CartIcon} />
          <BottomNavigationTab title="Account" icon={AccountIcon} />
        </BottomNavigation>
      </Layout>
    </Layout>
  );
};

export default Home;
