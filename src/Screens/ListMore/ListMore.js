import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import {
  getObjPropertyValue,
} from '../../global/utils/helperFunctions';

const ListMore = ({navigation, route}) => {
  const data = getObjPropertyValue(route.params, 'data');
  const renderItem = getObjPropertyValue(route.params, 'renderItem');

  return (
    <View>
      <CustomStackHeader goBack={() => navigation.goBack()} />
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, i) =>
          item.id ? item.id.toString() : i.toString()
        }
      />
    </View>
  );
};

export default ListMore;

const styles = StyleSheet.create({
  listContainer: {
    margin: 10,
    paddingBottom: 100,
  },
});
