import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import {Image} from 'react-native-elements';
import {dummyProperties} from '../../../../assets/dummy_data';

import Text from '../../../../Components/UI/Text';
import Card from '../../../../Components/UI/Card';

import {styles} from './styles';

import {
  getImageSrc,
  prettyPrint,
} from '../../../../global/utils/helperFunctions';
import {globalStyles} from '../../../../global/Styles';

import {getBuildings} from '../../../../API/Building';
import {lightTheme} from '../../../../global/Theme';
import {getOffices} from '../../../../API/Offices';
import {connect} from 'react-redux';

const useGetBuildings = token => {
  const [buildings, setBuildings] = useState(null);

  useEffect(() => {
    (async () => {
      setBuildings(null);
      const item = await getBuildings(token).catch(err => {
        console.log({err});
        setBuildings([]);
      });
      setBuildings(item);
    })();
  }, []);

  return buildings;
};

const useGetOffices = (propertyID, token) => {
  const [offices, setOffices] = useState(null);

  useEffect(() => {
    (async () => {
      setOffices(null);
      const offices = await getOffices(propertyID, token).catch(err => {
        console.log({err});
        setOffices([]);
      });
      setOffices(offices);
    })();
  }, []);

  return offices;
};

const RenderPropertyItem = ({item, handleItemClick}) => {
  return (
    <Card style={styles.propertyItemCont} onPress={() => handleItemClick(item)}>
      <View style={styles.imgCont}>
        <Image
          source={
            item.building_image
              ? getImageSrc(item.building_image)
              : require('../../../../assets/images/placeholders/office_dashboard.png')
          }
          style={globalStyles.image}
        />
      </View>
      <View style={styles.detailsCont}>
        <Text style={styles.propertyName}>{item.building_name}</Text>
        <Text numberOfLines={1} style={styles.propertyaddress}>{item.address}</Text>
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

const RenderOfficeItem = ({item, handleItemClick}) => {
  // prettyPrint({item});

  return (
    <Card style={styles.propertyItemCont} onPress={() => handleItemClick(item)}>
      <View style={styles.imgCont}>
        <Image
          source={getImageSrc(item.office_image)}
          style={globalStyles.image}
        />
      </View>
      <View style={styles.detailsCont}>
        <Text style={styles.propertyName}>{item.office_name}</Text>
        <Text style={styles.propertyaddress}>{item.office_address}</Text>
        <Text style={styles.detailsValue}>{`WING ${item.wing}`}</Text>
        <Text
          style={
            styles.detailsValue
          }>{`Office no. ${item.office_number}`}</Text>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsHeadings, globalStyles.textDanger]}>
            Due Invoices Amount
          </Text>
          <Text style={[styles.detailsValue, {color: lightTheme.DANGER}]}>
            {`₹${item.due_invoices || 0}`}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsHeadings, styles.detailsHeadingsSmall]}>
            Pending Invoices Amount
          </Text>
          <Text style={[styles.detailsValue, {color: lightTheme.WARNING}]}>
            {`₹${item.occupied_offices || 0}`}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const Property = ({
  onPropertyItemClick,
  onOfficeItemClick,
  onAddPropertyClick,
  buildingOwner,
  goToListMore,
  access_token,
}) => {
  // ! dummy id
  const propertyID = '0';

  const buildings = useGetBuildings(access_token);
  const offices = useGetOffices(propertyID, access_token);

  const listingData = buildingOwner ? buildings : offices;

  // prettyPrint({listingData});

  if (!listingData) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.conatiner}>
      <View style={styles.sectionHeader}>
        <Text>{`My ${buildingOwner ? 'Property' : 'Office'}`}</Text>
        <Pressable
          onPress={() => {
            onAddPropertyClick();
          }}>
          <Text style={styles.addPropertyLink}>{`+ Add ${
            buildingOwner ? 'Property' : 'Office'
          }`}</Text>
        </Pressable>
      </View>
      <View style={styles.listCont}>
        {listingData.map((item, index) => {
          // console.log({index});
          if (index > 3) {
            return <View key={index} />;
          }

          if (buildingOwner) {
            return (
              <RenderPropertyItem
                handleItemClick={onPropertyItemClick}
                key={index}
                item={item}
                index={index}
              />
            );
          }

          return (
            <RenderOfficeItem
              handleItemClick={onOfficeItemClick}
              key={index}
              item={item}
              index={index}
            />
          );
        })}
      </View>
      {listingData.length > 4 ? (
        <Pressable
          onPress={() =>
            goToListMore({
              data: listingData,
              renderItem: buildingOwner ? RenderPropertyItem : RenderOfficeItem,
            })
          }>
          <Text style={styles.addPropertyLink}>Show More</Text>
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

const mapStateToProps = state => {
  const {access_token} = state.auth;

  return {
    access_token,
  };
};

export default connect(mapStateToProps)(Property);
