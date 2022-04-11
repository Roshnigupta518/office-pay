import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PaginatedSlider from '../../Components/UI/PaginatedSlider';
import {getImageSrc} from '../../global/utils/helperFunctions';
import AuthBgImage from '../../Components/Component-Parts/AuthBGImage';
import {lightTheme} from '../../global/Theme';
import Button from '../../Components/UI/Button';
import {fonts} from '../../global/fonts';
import {globalStyles} from '../../global/Styles';
import {connect} from 'react-redux';
import {IntroDone} from '../../store/actions/IntroActions';

// Todo: handle Skip and Next

const SLIDE_DATA = [
  {
    id: 0,
    image: require('../../assets/images/intro_slide_1.png'),
    textMain: 'Manage your corporate Invoices & Payments',
    textSecondary:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 1,
    image: require('../../assets/images/intro_slide_2.png'),
    textMain: 'Track your Corporate Rent Deposits and Property',
    textSecondary:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

const Intro = ({navigation, doIntroDone}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slideCont}>
        <AuthBgImage />
        <Pressable
          onPress={() => {
            navigation.navigate('login');
          }}>
          <Text style={styles.skiptext}>Skip</Text>
        </Pressable>
        <View style={styles.imgCont}>
          <Image style={styles.slideImg} source={getImageSrc(item.image)} />
        </View>
        <View style={styles.slidetTextCont}>
          <Text style={styles.slideTextMain}>{item.textMain}</Text>
          <Text style={styles.slideTextSecondary}>{item.textSecondary}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.view}>
      <PaginatedSlider
        entries={SLIDE_DATA}
        renderItem={_renderItem}
        autoplay={false}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0}
        activeSlide={activeSlide}
      />
      <Button
        titleStyle={styles.nextbtntitle}
        btnStyle={styles.nextbtnCont}
        onPress={() => {
          // Todo: handle send invoice
          if (activeSlide === 0) {
            setActiveSlide(1);
            return;
          }
          doIntroDone();
          navigation.navigate('login');
        }}
        title={'Next'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: lightTheme.THEME,
  },
  slideCont: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
    backgroundColor: lightTheme.THEME,
    // ...globalStyles.placeCenter,
  },

  skiptext: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.regular,
    color: fonts.fontColor.grey,
    textDecorationLine: 'underline',
    marginLeft: 20,
  },

  imgCont: {
    alignItems: 'center',
  },

  slideImg: {
    marginTop: 100,
    width: 250,
    height: 150,
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

  slidetTextCont: {
    ...globalStyles.placeCenter,
    marginTop: 20,
    marginHorizontal: 30,
  },

  slideTextMain: {
    fontFamily: fonts.family.fontBold,
    fontSize: fonts.fontSize.large,
    color: fonts.fontColor.primary,
    textAlign: 'center',
  },
  slideTextSecondary: {
    fontFamily: fonts.family.fontRegular,
    fontSize: fonts.fontSize.small,
    color: fonts.fontColor.grey,
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  doIntroDone: () => dispatch(IntroDone()),
});

export default connect(null, mapDispatchToProps)(Intro);
