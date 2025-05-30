import React from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';
// import {Image} from 'react-native-elements';
import {fonts} from '../../global/fonts';
import AuthBgImage from '../Component-Parts/AuthBGImage';
import Button from '../UI/Button';

import Text from '../UI/Text';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // Todo: log error
  }

  renderFallbackUI = () => {
    return (
      <>
        <AuthBgImage />
        <View style={styles.cont}>
          <Image
            source={require('../../assets/images/general_error.png')}
            style={styles.img}
          />
          <Text>Some Error Occured! Please try again</Text>
          <View style={styles.btnCont}>
            <Button
              titleStyle={styles.btn}
              onPress={() =>
                this.setState({
                  hasError: false,
                })
              }
              title={'Retry'}
            />
          </View>
        </View>
      </>
    );
  };

  render() {
    const RenderFallbackUI = this.renderFallbackUI;

    console.log({hasError: this.state.hasError});

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <RenderFallbackUI />;
      // return <Text>Something is wrong</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    // alignSelf: 'center',
    resizeMode: 'contain',
  },
  btnCont: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    marginTop: 5,
    fontSize: fonts.fontSize.semiLarge,
    fontFamily: fonts.family.fontRegular,
  },
});
