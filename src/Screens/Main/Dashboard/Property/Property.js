import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import {Image} from 'react-native-elements';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Text from '../../../../Components/UI/Text';
import Card from '../../../../Components/UI/Card';

import {styles} from './styles';

import {
  getImageSrc,
  prettyPrint,
} from '../../../../global/utils/helperFunctions';
import {globalStyles} from '../../../../global/Styles';
import {lightTheme} from '../../../../global/Theme';

import {getBuildings} from '../../../../API/Building';
import {getOffices} from '../../../../API/Offices';

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

const RenderPropertyItem = ({item, handleItemClick, t}) => {
  // const {t} = useTranslation();

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
        <Text numberOfLines={1} style={styles.propertyaddress}>
          {item.address}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailsHeadings, globalStyles.textDanger]}>
            {t('dashboard.myproperty.item.noOfdue')}
          </Text>
          <Text style={styles.detailsValue}>{item.due_invoices}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsHeadings}>
            {t('dashboard.myproperty.item.occupied')}
          </Text>
          <Text style={styles.detailsValue}>{item.occupied_offices}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsHeadings}>
            {t('dashboard.myproperty.item.vacant')}
          </Text>
          <Text style={styles.detailsValue}>{item.vacant_offices}</Text>
        </View>
      </View>
    </Card>
  );
};

const RenderOfficeItem = ({item, handleItemClick, t}) => {
  // prettyPrint({item});

  // const {t} = useTranslation();

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
        {/* <Text style={styles.detailsValue}>{`WING ${item.wing}`}</Text> */}
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

  prettyPrint({listingData});

  const {t} = useTranslation();

  if (!listingData) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator color={lightTheme.PRIMARY_COLOR} size={'large'} />
      </View>
    );
  }

  console.log({buildingOwner})

  return (
    <View style={styles.conatiner}>
      <View style={styles.sectionHeader}>
        <Text>
          {t(`dashboard.${buildingOwner ? 'myproperty' : 'myoffices'}.title`)}
        </Text>
        <Pressable
          onPress={() => {
            onAddPropertyClick();
          }}>
          <Text style={styles.addPropertyLink}>
            + {t(`dashboard.${buildingOwner ? 'myproperty' : 'myoffices'}.add`)}
          </Text>
        </Pressable>
      </View>
      <View style={styles.listCont}>
        {listingData?.map((item, index) => {
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
                t={t}
              />
            );
          }

          return (
            <RenderOfficeItem
              handleItemClick={onOfficeItemClick}
              key={index}
              item={item}
              index={index}
              t={t}
            />
          );
        })}
      </View>
      {listingData?.length > 4 ? (
        <Pressable
          onPress={() =>
            goToListMore({
              data: listingData,
              renderItem: buildingOwner
                ? props => (
                    <RenderPropertyItem
                      {...props}
                      t={t}
                      handleItemClick={onPropertyItemClick}
                    />
                  )
                : props => (
                    <RenderOfficeItem
                      {...props}
                      t={t}
                      handleItemClick={onOfficeItemClick}
                    />
                  ),
            })
          }>
          <Text style={styles.addPropertyLink}>{t('show_more')}</Text>
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
