import React from 'react';
import {View, TouchableOpacity,StyleSheet} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';

import {fonts} from '../../../global/fonts';
import {lightTheme} from '../../../global/Theme';

import Text from '../Text';

export const CustomTabBar = ({state, descriptors, navigation, t}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

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
            case 'dashboard':
              return {
                name: 'home',
                pack: 'feather',
                title: t('navigation.tabs.dashboard'),
              };
            case 'create-invoice':
              return {
                name: 'copy1',
                pack: 'antdesign',
                title: t('navigation.tabs.createInvoice'),
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
            style={[styles.tabBtn, isFocused ? styles.selectedBorder : {}]}>
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
                  {tabIcon().title}
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

    backgroundColor: lightTheme.THEME,
    elevation: 10,
    borderTopColor: lightTheme.SECONDARY_TEXT,
    borderTopWidth: 0.5,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    padding: 10,
  },
  selectedBorder: {
    borderTopColor: lightTheme.PRIMARY_COLOR,
    borderTopWidth: 3,
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
