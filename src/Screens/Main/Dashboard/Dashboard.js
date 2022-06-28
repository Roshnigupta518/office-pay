import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import { useTranslation } from 'react-i18next';
import {connect} from 'react-redux';

import CustomMainHeader from '../../../Components/Component-Parts/CustomMainHeader';
import Text from '../../../Components/UI/Text';
import {TopTabs} from '../../../Components/UI/TopTabs';

import Property from './Property/Property';
import Invoice from './Invoice/Invoice';
import Notifications from './Notification/Notifications';

import {styles} from './styles';

import {lightTheme} from '../../../global/Theme';
import { prettyPrint } from '../../../global/utils/helperFunctions';

const RenderOverview = ({totalReceived, totalPending, totalOverdue}) => {

  const {t} = useTranslation();

  return (
    <View style={styles.overviewCont}>
      <View style={[styles.overviewTile, styles.receivedTile]}>
        <Text style={styles.overviewText}>
          {t('dashboard.overview.received')}
        </Text>
        <Text style={[styles.overviewAmount]}>₹ {totalReceived}</Text>
      </View>
      <View style={[styles.overviewTile, styles.pendingTile]}>
        <Text style={styles.overviewText}>{t('dashboard.overview.pending')}</Text>
        <Text style={styles.overviewAmount}>₹ {totalPending}</Text>
      </View>
      <View style={[styles.overviewTile, styles.overdueTile]}>
        <Text style={styles.overviewText}>{t('dashboard.overview.overdue')}</Text>
        <Text style={styles.overviewAmount}>₹ {totalOverdue}</Text>
      </View>
    </View>
  );
};

const RenderDashboardTabs = ({
  onPropertyItemClick,
  onOfficeItemClick,
  onAddPropertyClick,
  buildingOwner,
  goToListMore,
}) => {

  const {t} = useTranslation();

  const tabConfigs = {
    tabItems: [
      {
        title: t(`dashboard.tabs.${buildingOwner ? 'myproperty' : 'myoffices'}`),
        icon: {
          name: 'building-o',
          type: 'font-awesome',
          color: lightTheme.PRIMARY_COLOR,
          size: 25,
        },
      },
      {
        title: t('dashboard.tabs.due'),
        icon: {
          name: 'file-text',
          type: 'feather',
          color: lightTheme.PRIMARY_COLOR,
          size: 25,
        },
      },
      {
        title: t('dashboard.tabs.notif'),
        icon: {
          name: 'bell',
          type: 'feather',
          color: lightTheme.PRIMARY_COLOR,
          size: 25,
        },
      },
    ],
    tabPages: [
      <Property
        buildingOwner={buildingOwner}
        onPropertyItemClick={onPropertyItemClick}
        onOfficeItemClick={onOfficeItemClick}
        onAddPropertyClick={onAddPropertyClick}
        goToListMore={goToListMore}
      />,
      <Invoice buildingOwner={buildingOwner} goToListMore={goToListMore} />,
      <Notifications goToListMore={goToListMore} />,
    ],
  };

  return <TopTabs tabConfigs={tabConfigs} />;
};

const Dashboard = ({navigation, buildingOwner}) => {

  const {t} = useTranslation();

  const onPropertyItemClick = property => {
    navigation.navigate('my-property', {
      params: {property},
    });
  };

  const onOfficeItemClick = officeDetails => {
    navigation.navigate('property-details', {
      office: officeDetails,
    });
  };

  const onAddPropertyClick = () => {
    navigation.push('building-details', {
      fromDash: true,
    });
  };

  const goToInit = () => {
    navigation.navigate('init');
  };

  const goToListMore = props => {
    navigation.navigate('list-more', props);
  };

  return (
    <View style={styles.view}>
      <CustomMainHeader goToInit={goToInit} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.greetingCont}>
            <Text style={styles.greeting}>{t('dashboard_hello')},</Text>
          </View>
        </View>
        <RenderOverview
          totalOverdue={0}
          totalPending={1000}
          totalReceived={10000}
        />
        <RenderDashboardTabs
          buildingOwner={buildingOwner}
          onPropertyItemClick={onPropertyItemClick}
          onOfficeItemClick={onOfficeItemClick}
          onAddPropertyClick={onAddPropertyClick}
          goToListMore={goToListMore}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const {buildingOwner} = state.auth;

  prettyPrint({auth: state.auth});

  return {
    buildingOwner,
  };
};

export default connect(mapStateToProps)(Dashboard);
