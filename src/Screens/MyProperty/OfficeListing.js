import React, {useState} from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet, View} from 'react-native';

import Text from '../../Components/UI/Text';

import {isJSObj} from '../../global/utils/helperFunctions';
import {globalStyles} from '../../global/Styles';
import {lightTheme} from '../../global/Theme';
import {fonts} from '../../global/fonts';

// Todo: add Pending Status

const RenderWingTabs = ({propertyWings, selectWing, selectedWing}) => {
  return (
    <View style={styles.wingsCont}>
      {propertyWings.map(wing => {
        if (wing) {
          return (
            <Pressable
              style={styles.wingsItem}
              onPress={() => selectWing(wing)}>
              <View
                style={[
                  styles.wingText,
                  selectedWing === wing ? styles.selectedWing : {},
                ]}>
                <Text style={selectedWing === wing ? {color: '#fff'} : {}}>
                  {wing}
                </Text>
              </View>
            </Pressable>
          );
        }
      })}
    </View>
  );
};

const RenderWingOffices = ({wingOffices, onOfficeClick}) => {
  const RenderItem = ({floorOffices}) => {
    const {data} = floorOffices;

    return (
      <View style={styles.floorSection}>
        <View style={styles.titleCont}>
          <Text style={styles.floorName}>{floorOffices.title}</Text>
        </View>
        <View style={styles.officeItemsCont}>
          {data.map((office, index) => {
            if (office.status) {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    onOfficeClick(office);
                  }}>
                  <View style={[styles.officeItem, styles.occupied]}>
                    <View
                      style={[
                        styles.statusCont,
                        office.payment_status ? styles.paid : styles.overdue,
                      ]}>
                      <Text style={styles.paymentStatus}>
                        {office.payment_status ? 'Paid' : 'Overdue'}
                      </Text>
                    </View>
                    <View style={globalStyles.placeCenter}>
                      <Text style={styles.officeItemText}>
                        {office.office_number}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[styles.officeItemText, styles.officeItemName]}>
                        {office.office_name}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }

            return (
              <View style={[styles.officeItem, globalStyles.placeCenter]}>
                <Text style={styles.officeItemTextVacant}>
                  {office.office_number}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.listCont}>
      <FlatList
        data={wingOffices}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item}) => <RenderItem floorOffices={item} />}
      />
    </View>
  );
};

const OfficeListing = ({offices, onOfficeClick}) => {
  const propertyWings = isJSObj(offices) ? Object.keys(offices) : [null];

  const [selectedWing, setSelectedWing] = useState(propertyWings[0]);

  const wingOffices = isJSObj(offices) ? offices[selectedWing] : [];

  return (
    <View>
      <RenderWingTabs
        selectedWing={selectedWing}
        propertyWings={propertyWings}
        selectWing={setSelectedWing}
      />
      <RenderWingOffices
        wingOffices={wingOffices}
        onOfficeClick={onOfficeClick}
      />
    </View>
  );
};

export default OfficeListing;

const styles = StyleSheet.create({
  wingsCont: {
    ...globalStyles.flexRow,
    marginHorizontal: 10,
    marginTop: 5,
  },
  wingsItem: {
    paddingHorizontal: 10,
    borderRightColor: lightTheme.SECONDARY_TEXT,
    borderRightWidth: 1,
  },

  wingText: {
    width: 25,
    height: 25,
    borderRadius: 15,
    ...globalStyles.placeCenter,
  },

  selectedWing: {
    borderRadius: 15,
    backgroundColor: lightTheme.PRIMARY_COLOR,
  },

  // list

  listCont: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  titleCont: {
    marginBottom: 20,
  },

  floorSection: {
    marginBottom: 20,
  },

  floorName: {
    fontSize: fonts.fontSize.semiLarge,
    fontFamily: fonts.family.fontLight,
  },

  officeItemsCont: {
    ...globalStyles.flexRow,
    flexWrap: 'wrap',
  },

  officeItem: {
    backgroundColor: lightTheme.SECONDARY_TEXT,
    width: Dimensions.get('window').width * 0.23,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
    overflow: 'hidden',
    elevation: 7,
  },

  occupied: {
    backgroundColor: lightTheme.PRIMARY_COLOR,
  },

  statusCont: {
    width: '100%',
    height: '30%',
    padding: 3,
    ...globalStyles.placeCenter,
    marginBottom: 5,
  },
  paid: {
    backgroundColor: lightTheme.PAID_ACCENT,
  },
  overdue: {
    backgroundColor: lightTheme.DANGER,
  },
  pending: {
    backgroundColor: lightTheme.PENDING_ACCENT,
  },
  paymentStatus: {
    fontSize: fonts.fontSize.small,
    fontFamily: fonts.family.fontBold,
    color: fonts.fontColor.white
  },

  officeItemText: {
    fontSize: fonts.fontSize.regular,
    fontFamily: fonts.family.fontBold,
    color: lightTheme.THEME,
  },
  officeItemName: {
    fontSize: fonts.fontSize.small,
  },
  officeItemTextVacant: {
    fontSize: fonts.fontSize.regular,
    fontFamily: fonts.family.fontBold,
  },
});
