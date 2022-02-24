import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Tab, TabView, ThemeProvider} from 'react-native-elements';

import {fonts} from '../../../global/fonts';
import {lightTheme, rnElementsTheme} from '../../../global/Theme';

export const TopTabs = ({
  tabConfigs,
  containerStyles,
  tabLabelBtnStyle,
  tabLabelTitleStyle,
  tabItemStyle,
  tabBarContStyles,
}) => {
  const [index, setIndex] = React.useState(0);

  // console.log({index});

  return (
    <ThemeProvider theme={rnElementsTheme}>
      <View style={[styles.container, containerStyles]}>
        <View style={[styles.tabBarCont, tabBarContStyles]}>
          <Tab
            value={index}
            onChange={e => setIndex(e)}
            indicatorStyle={{
              backgroundColor: lightTheme.PRIMARY_COLOR,
              height: 3,
            }}>
            {tabConfigs.tabItems.map((tab, i) => (
              <Tab.Item
                key={i}
                title={tab.title}
                containerStyle={tabItemStyle}
                titleStyle={[styles.tabItemTitle, tabLabelTitleStyle]}
                buttonStyle={[styles.tabBtnStyle, tabLabelBtnStyle]}
                {...(tab.icon ? {icon: tab.icon} : {})}
              />
            ))}
          </Tab>
        </View>

        <TabView
          value={index}
          onChange={i => {
            // console.log({i});
            setIndex(i);
          }}
          animationType="spring">
          {tabConfigs.tabPages.map((page, i) => {
            // console.log({running: i});

            return (
              <TabView.Item key={i} style={[styles.tabViewItem]}>
                {page}
              </TabView.Item>
            );
          })}
        </TabView>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  tabItemTitle: {
    fontSize: fonts.fontSize.xsmall,
    fontFamily: fonts.family.fontBold,
    color: fonts.fontColor.text,
    marginTop: 5,
  },
  tabBarCont: {
    elevation: 10,
    backgroundColor: lightTheme.THEME,
    borderRadius: 5,
  },
  tabBtnStyle: {
    backgroundColor: lightTheme.THEME,
    paddingTop: 10,
  },
  tabViewItem: {
    height: Dimensions.get('window').height,
    width: '100%',
  },
});
