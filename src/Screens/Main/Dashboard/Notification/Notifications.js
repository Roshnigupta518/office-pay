import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import NotifItem from './NotifItem';

import {globalStyles} from '../../../../global/Styles';

import {getNotifications} from '../../../../API/Notifications';
import {lightTheme} from '../../../../global/Theme';

const useGetNotifs = () => {
  const [notifs, setNotifs] = useState(null);

  useEffect(() => {
    (async () => {
      setNotifs(null);
      const items = await getNotifications();
      setNotifs(items);
    })();
  }, []);

  return notifs;
};

const Notifications = () => {
  const notifs = useGetNotifs();

  if (!notifs) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      {notifs.map((notif, index) => (
        <NotifItem key={index} notifItem={notif} />
      ))}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  view: {
    width: '90%',
    marginVertical: 20,
  },

  loaderCont: {
    ...globalStyles.placeCenter,
    paddingTop: 40,
    paddingRight: 30,
  },
});
