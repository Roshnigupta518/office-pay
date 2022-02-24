import React from 'react';
import {View, TouchableOpacity, useColorScheme, StyleSheet} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {fonts} from '../../../global/fonts';
import {lightTheme} from '../../../global/Theme';

import Text from '../Text';

export const CustomTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  // const isDarkMode = useColorScheme() === 'dark';
  const theme = lightTheme;

  return (
    <View style={styles.barCont}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabIcon = () => {
          switch (label.toLowerCase()) {
            case 'home':
              return {
                name: 'home',
                pack: 'feather',
              };
            case 'add office':
              return {
                name: 'message-plus-outline',
                pack: 'material-community',
              };
            case 'search':
              return {
                name: 'search-outline',
                pack: 'ionicon',
              };
            case 'notifications':
              return {
                name: 'notifications-outline',
                pack: 'ionicon',
              };
            case 'messages':
              return {
                name: 'message-circle',
                pack: 'feather',
              };
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBtn]}>
            {label.toLowerCase() === 'search' ? (
              <View style={styles.searchBtn}>
                <Avatar
                  size={'medium'}
                  icon={{
                    name: 'search-outline',
                    color: theme.THEME,
                    type: 'ionicon',
                  }}
                  rounded
                  overlayContainerStyle={styles.searchBtnOverlay}
                  activeOpacity={0.7}
                />
                <Text
                  style={{
                    color: isFocused ? '#000' : theme.SECONDARY_TEXT,
                    marginTop: 6,
                    fontSize: fonts.fontSize.small,
                  }}>
                  {label}
                </Text>
              </View>
            ) : (
              <View>
                <Icon
                  name={tabIcon().name}
                  type={tabIcon().pack}
                  color={isFocused ? theme.PRIMARY_COLOR : theme.SECONDARY_TEXT}
                />
                <Text
                  style={{
                    fontSize: fonts.fontSize.small,
                    color: isFocused ? '#000' : theme.SECONDARY_TEXT,
                  }}>
                  {label}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  barCont: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: lightTheme.THEME,
    elevation: 10,
    borderTopColor: lightTheme.SECONDARY_TEXT,
    borderTopWidth: 0.5,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  searchBtn: {
    position: 'absolute',
    top: -30,
    zIndex: 100,
    alignItems: 'center',
  },
  searchBtnOverlay: {
    backgroundColor: lightTheme.PRIMARY_COLOR,
    elevation: 2,
  },
});
