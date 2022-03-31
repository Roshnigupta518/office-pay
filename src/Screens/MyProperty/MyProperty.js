import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import Text from '../../Components/UI/Text';
import Button from '../../Components/UI/Button';

import {globalStyles} from '../../global/Styles';
import {styles} from './styles';
import {getObjPropertyValue} from '../../global/utils/helperFunctions';
import {getOffices} from '../../API/Offices/indes';
import {TopTabs} from '../../Components/UI/TopTabs';
import {lightTheme} from '../../global/Theme';
import OfficeListing from './OfficeListing';

const useGetOffices = propertyID => {
  const [offices, setOffices] = useState(null);

  useEffect(() => {
    (async () => {
      setOffices(null);
      const offices = await getOffices(propertyID);
      setOffices(offices);
    })();
  }, []);

  return offices;
};

const getWingTabConfigs = wingOffices => {
  let tabConfigs = {
    tabItems: [],
    tabPages: [],
  };

  Object.entries(wingOffices).map(([wing, offices]) => {
    tabConfigs.tabItems = [
      ...tabConfigs.tabItems,
      {
        title: wing,
        icon: null,
      },
    ];

    tabConfigs.tabPages = [
      ...tabConfigs.tabPages,
      <Text>{`${wing} offices`}</Text>,
    ];
  });

  return tabConfigs;
};

const RenderTitleHeader = ({property, noOffice}) => {
  if (noOffice) {
    return (
      <View style={styles.headerCont}>
        <Text style={globalStyles.heading}>{property.property_name}</Text>
      </View>
    );
  }
  return (
    <View style={styles.headerCont}>
      <View>
        <Text style={globalStyles.heading}>{property.property_name}</Text>
        <View style={globalStyles.flexRow}>
          <View style={styles.markerItem}>
            <View style={[styles.marker, styles.markerOccpied]} />
            <Text style={styles.markerText}>Occupied</Text>
          </View>
          <View style={styles.markerItem}>
            <View style={[styles.marker]} />
            <Text style={styles.markerText}>Vacant</Text>
          </View>
        </View>
      </View>
      <Text style={styles.addPropertyLink}>+ Add Property</Text>
    </View>
  );
};

const RenderWingsTab = ({offices}) => {
  const tabConfigs = getWingTabConfigs(offices);

  // console.log({tabConfigs});

  return (
    <TopTabs
      tabConfigs={tabConfigs}
      containerStyles={styles.tabContainerStyles}
      tabLabelTitleStyle={styles.tabLabelTitleStyle}
      tabLabelBtnStyle={styles.tabLabelBtnStyle}
      tabItemStyle={styles.tabItemStyle}
      tabBarContStyles={styles.tabBarContStyles}
    />
  );
};

const RenderBody = ({offices, noOffice, onAddOfficeClick, onOfficeClick}) => {
  // prettyPrint({offices});

  if (!offices) {
    return (
      <View style={styles.loadingCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  if (noOffice) {
    return (
      <View style={styles.bodyCont}>
        <View style={styles.msgCont}>
          <View style={styles.msgtitle}>
            <Text style={[globalStyles.heading, globalStyles.textAlignCenter]}>
              You don’t have any office
            </Text>
          </View>
          <View style={styles.msgText}>
            <Text
              style={[
                globalStyles.textSmallSecondary,
                globalStyles.textAlignCenter,
              ]}>
              Hello, Welcome to Office Pay. Please click on below for add your
              first office
            </Text>
          </View>
          <View style={styles.addOffBtn}>
            <Button title={'Add Office'} onPress={onAddOfficeClick} />
          </View>
        </View>
      </View>
    );
  }

  return <OfficeListing onOfficeClick={onOfficeClick} offices={offices} />;
};

const MyProperty = ({route, navigation}) => {
  const {property} = getObjPropertyValue(route.params, 'params');

  // const noOffice = property ? !property.occupied_offices : true;
  // ! only to test office listing
  const noOffice = false;

  const {id} = getObjPropertyValue(property, 'id');

  const offices = useGetOffices(id);

  return (
    <View style={styles.view}>
      <CustomStackHeader goBack={() => navigation.goBack()} />
      <RenderTitleHeader noOffice={noOffice} property={property} />
      <RenderBody
        noOffice={noOffice}
        offices={offices}
        onAddOfficeClick={() => navigation.navigate('add-office')}
        onOfficeClick={officeDetails =>
          navigation.navigate('property-details', {
            office: officeDetails,
          })
        }
      />
    </View>
  );
};

export default MyProperty;
