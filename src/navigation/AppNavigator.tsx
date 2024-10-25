import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsFeed from '../screens/NewsFeed';
import Bookmarks from '../screens/Bookmarks';
import { StyleSheet } from 'react-native';
import { fontScale, hp } from '../style/styles';
import Colors from '../style/colours';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'NewsFeed') {
              iconName = 'rss'; 
            } else if (route.name === 'Bookmark') {
              iconName = 'bookmark'; 
            }

            return <Icon name={iconName as string} color={color} size={size} />;
          },
          tabBarActiveTintColor: Colors.Pink, 
          tabBarInactiveTintColor: Colors.LightGray, 
          tabBarStyle: styles.tabBar, 
          tabBarLabelStyle: styles.tabBarLabel, 
        })}
      >
        <Tab.Screen name="NewsFeed" component={NewsFeed} />
        <Tab.Screen name="Bookmark" component={Bookmarks} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.White, 
    borderTopWidth: 1, 
    borderTopColor: Colors.Gainsboro, 
    height: hp(7),
    shadowColor: Colors.Black, 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.5, 
    elevation: 5, 
    borderRadius: 10, 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
  },
  tabBarLabel: {
    fontSize: fontScale(16), 
    paddingBottom: 5, 
    fontWeight: 'bold', 
  },
});

export default AppNavigator;
