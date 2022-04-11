import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AuthBgImage from '../../Components/Component-Parts/AuthBGImage';
import Button from '../../Components/UI/Button';

import {fonts} from '../../global/fonts';
import {lightTheme} from '../../global/Theme';
import {globalStyles} from '../../global/Styles';

const LANGUAGES = ['English', 'हिंदी', 'मराठी', 'বাংলা', 'தமிழ்'];

const SelectLanguage = ({navigation}) => {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  return (
    <View style={styles.view}>
      <AuthBgImage />
      <Pressable
        onPress={() => {
          navigation.navigate('intro');
        }}>
        <Text style={styles.skiptext}>Skip</Text>
      </Pressable>
      <View style={styles.main}>
        <Text style={styles.slideTextMain}>Select your preferred Language</Text>
        <View style={styles.langCont}>
          {LANGUAGES.map(lang => (
            <View
              style={[
                styles.lang,
                selectedLang === lang
                  ? {backgroundColor: lightTheme.PRIMARY_COLOR}
                  : {},
              ]}>
              <Text
                style={[
                  styles.langText,
                  selectedLang === lang ? {color: lightTheme.THEME} : {},
                ]}>
                {lang}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Button
        titleStyle={styles.nextbtntitle}
        btnStyle={styles.nextbtnCont}
        onPress={() => {
          navigation.navigate('intro');
        }}
        title={'Next'}
      />
    </View>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
  },
  nextbtntitle: {
    fontFamily: fonts.family.fontSemiBold,
    fontSize: fonts.fontSize.regular,
    color: fonts.fontColor.white,
  },
  nextbtnCont: {
    borderRadius: 30,
    marginHorizontal: 20,
  },
  skiptext: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.regular,
    color: fonts.fontColor.grey,
    textDecorationLine: 'underline',
    marginLeft: 20,
  },
  slideTextMain: {
    fontFamily: fonts.family.fontBold,
    fontSize: fonts.fontSize.large,
    color: fonts.fontColor.primary,
    textAlign: 'center',
    marginHorizontal: 50,
  },

  main: {
    marginVertical: 50,
  },

  langCont: {
    ...globalStyles.flexRow,
    width: '80%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 100,
  },

  lang: {
    width: 80,
    padding: 5,
    borderWidth: 1,
    borderColor: lightTheme.SECONDARY_TEXT,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: lightTheme.THEME,
    marginBottom: 10,
    marginRight: 15,
    ...globalStyles.placeCenter,
  },
});
