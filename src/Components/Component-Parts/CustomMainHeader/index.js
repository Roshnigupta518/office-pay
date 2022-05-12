import React from 'react';
import {StatusBar, StyleSheet, View, Image, Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {globalStyles} from '../../../global/Styles';

import {lightTheme} from '../../../global/Theme';
import {getImageSrc} from '../../../global/utils/helperFunctions';

import {logoutUser} from '../../../store/actions/AuthActions';

const CustomMainHeader = ({doUserLogout, goToInit, userID, access_token}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={lightTheme.THEME} barStyle="dark-content" />
      <View style={styles.headerLeft} />
      <View style={styles.headerCenter}>
        <Image
          source={getImageSrc(
            require('../../../assets/images/placeholders/imgpsh.png'),
          )}
          style={styles.logo}
        />
      </View>
      <Pressable
        onPress={async () => {
          await doUserLogout({userID, access_token});

          // goToInit();
        }}
        style={styles.headerRight}>
        <Icon
          name={'logout'}
          type={'material'}
          color={lightTheme.PRIMARY_TEXT}
          size={30}
        />
      </Pressable>
    </View>
  );
};

const mapStateToProps = state => {
  const {userID, access_token} = state.auth;

  return {
    userID,
    access_token,
  };
};

const mapDispatchToProps = dispatch => ({
  doUserLogout: reqData => dispatch(logoutUser(reqData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomMainHeader);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    // paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
    backgroundColor: lightTheme.THEME,
    // backgroundColor: 'red',
  },

  headerCenter: {
    width: '60%',
    ...globalStyles.placeCenter,
  },
  headerRight: {
    width: '20%',
  },
  headerLeft: {
    width: '20%',
    backgroundColor: 'green',
  },

  logo: {
    width: '60%',
    height: 50,
    resizeMode: 'contain',
  },
});
