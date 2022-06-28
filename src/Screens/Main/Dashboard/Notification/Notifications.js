import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import { useTranslation } from 'react-i18next';

import NotifItem from './NotifItem';
import Text from '../../../../Components/UI/Text';

import {globalStyles} from '../../../../global/Styles';

import {getNotifications} from '../../../../API/Notifications';
import {lightTheme} from '../../../../global/Theme';
import {useSelector} from 'react-redux';

const useGetNotifs = token => {
  const [notifs, setNotifs] = useState(null);

  useEffect(() => {
    (async () => {
      setNotifs(null);
      const items = await getNotifications(token);
      setNotifs(items);
    })();
  }, []);

  return notifs;
};

const Notifications = ({goToListMore}) => {
  const {access_token} = useSelector(state => state.auth);

  const notifs = useGetNotifs(access_token);

  const {t} = useTranslation();

  // console.log({notifs});

  if (!notifs) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      {notifs.map((notif, index) => {
        if (index > 2) {
          return <View key={index} />;
        }
        return <NotifItem t={t} key={index} notifItem={notif} />;
      })}
      {notifs.length > 4 ? (
        <Pressable
          onPress={() =>
            goToListMore({
              data: notifs,
              renderItem: ({item, index}) => (
                <NotifItem t={t} key={index} notifItem={item} />
              ),
            })
          }>
          <Text style={styles.showMore}>{t('show_more')}</Text>
        </Pressable>
      ) : (
        <View />
      )}
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
  showMore: {
    ...globalStyles.anchor,
    textDecorationLine: 'underline',
    paddingRight: 0,
  },
});
