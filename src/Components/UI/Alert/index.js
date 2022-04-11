import React from 'react';
import {Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';

import {globalStyles} from '../../../global/Styles';
import {lightTheme} from '../../../global/Theme';
import { getShadowProperties } from '../../../global/utils/helperFunctions';

const Alert = ({showModal, setShowModal, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      style={globalStyles.placeCenter}
      onBackdropPress={() => setShowModal(!showModal)}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}>
      <View style={styles.center}>
        <View style={styles.modalView}>
          <Pressable
            onPress={() => setShowModal(false)}
            style={styles.closeIconCont}>
            <Icon
              type="antdesign"
              name="closecircleo"
              color={lightTheme.PRIMARY_TEXT}
              size={25}
              style={styles.closeIcon}
            />
          </Pressable>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  center: {
    ...globalStyles.placeCenter,
  },
  modalView: {
    backgroundColor: lightTheme.THEME,
    width: '70%',
    height: 230,
    borderRadius: 7,
    marginTop: Dimensions.get('window').height * 0.3,
    ...globalStyles.placeCenter,
    ...getShadowProperties(7),
    position: 'relative',
  },
  closeIconCont: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {},
  heading: {
    ...globalStyles.heading,
  },

  formLabal: {
    ...globalStyles.textDefault,
  },

  btn: {
    marginTop: 20,
    width: '70%',
  },
});
