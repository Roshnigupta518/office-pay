import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthBgImage from '../../Components/Component-Parts/AuthBGImage';
import Button from '../../Components/UI/Button';
import Text from '../../Components/UI/Text';

import {fonts} from '../../global/fonts';
import {lightTheme} from '../../global/Theme';
import {globalStyles} from '../../global/Styles';

const LANGUAGES = [
  {
    label: 'English',
    code: 'en',
  },
  {
    label: 'हिंदी',
    code: 'hi',
  },
];

const SelectLanguage = ({navigation}) => {
  const [selectedLang, setSelectedLang] = useState('en');

  const {i18n} = useTranslation();

  const updateLangInStorage = async lang => {
    try {
      await AsyncStorage.setItem('goInvoicy-selectedLang', lang);
    } catch (e) {
      console.error('Error in saving language preference - ', e);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLang).then(() => {
      updateLangInStorage(selectedLang);
      console.log(`Language changed - ${selectedLang}`);
    });

    return () => {};
  }, [selectedLang]);

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
            <Pressable onPress={() => setSelectedLang(lang.code)}>
              <View
                style={[
                  styles.lang,
                  selectedLang === lang.code
                    ? {borderColor: lightTheme.PRIMARY_COLOR}
                    : {},
                ]}>
                <Text
                  style={[
                    styles.langText,
                    selectedLang === lang.code
                      ? {color: lightTheme.PRIMARY_COLOR}
                      : {},
                  ]}>
                  {lang.label}
                </Text>
              </View>
            </Pressable>
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
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 100,
    ...globalStyles.flexRow,
  },

  lang: {
    width: 160,
    padding: 15,
    paddingVertical: 10,
    elevation: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: lightTheme.THEME,
    backgroundColor: lightTheme.THEME,
    marginBottom: 10,
    marginRight: 15,
    ...globalStyles.placeCenter,
  },
  langText: {
    marginBottom: -5,
    fontFamily: fonts.family.fontSemiBold,
  },
});
