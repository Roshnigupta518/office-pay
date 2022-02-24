import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {Image} from 'react-native-elements';
import {dummyProperties} from '../../../../assets/dummy_data';

import Text from '../../../../Components/UI/Text';
import Card from '../../../../Components/UI/Card';

import {styles} from './styles';

import {getImageSrc} from '../../../../global/utils/helperFunctions';
import {globalStyles} from '../../../../global/Styles';
import {lightTheme} from '../../../../global/Theme';

const RenderPropertyItem = ({item, handleItemClick}) => {
  return (
    <Card style={styles.propertyItemCont} onPress={() => handleItemClick(item)}>
      <View style={styles.imgCont}>
        <Image
          source={getImageSrc(item.property_image)}
          style={globalStyles.image}
        />
      </View>
      <View style={styles.detailsCont}>
        <Text style={styles.propertyName}>{item.property_name}</Text>
        <Text style={styles.propertyaddress}>{item.property_address}</Text>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsHeadings, globalStyles.textDanger]}>
            Due Invoices
          </Text>
          <Text style={styles.detailsValue}>{item.due_invoices}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsHeadings}>Occupied Offices</Text>
          <Text style={styles.detailsValue}>{item.occupied_offices}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsHeadings}>Vacant Offices</Text>
          <Text style={styles.detailsValue}>{item.vacant_offices}</Text>
        </View>
      </View>
    </Card>
  );
};

const Property = ({onPropertyItemClick}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.sectionHeader}>
        <Text>My Property</Text>
        <Pressable
          onPress={() => {
            console.log('Todo: handle add property');
          }}>
          <Text style={styles.addPropertyLink}>+ Add Property</Text>
        </Pressable>
      </View>
      <View style={styles.listCont}>
        {/* Todo: discuss using simple map is safe or not */}
        {dummyProperties.map((item, index) => {
          return (
            <RenderPropertyItem
              handleItemClick={onPropertyItemClick}
              key={index}
              item={item}
              index={index}
            />
          );
        })}
        {/* <FlatList
          data={dummyProperties}
          renderItem={RenderPropertyItem}
          keyExtractor={item => item.id.toString()}
        /> */}
      </View>
    </View>
  );
};

export default Property;
