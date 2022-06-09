import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import CustomMainHeader from '../../../Components/Component-Parts/CustomMainHeader';

import Property from './Property/Property';

import Text from '../../../Components/UI/Text';
import {TopTabs} from '../../../Components/UI/TopTabs';

import {styles} from './styles';

import {lightTheme} from '../../../global/Theme';
import Invoice from './Invoice/Invoice';
import Notifications from './Notification/Notifications';
import {connect} from 'react-redux';
import { prettyPrint } from '../../../global/utils/helperFunctions';

const RenderOverview = ({totalReceived, totalPending, totalOverdue}) => {
  return (
    <View style={styles.overviewCont}>
      <View style={[styles.overviewTile, styles.receivedTile]}>
        <Text style={styles.overviewText}>
          Total Amount Received this month
        </Text>
        <Text style={[styles.overviewAmount]}>₹ {totalReceived}</Text>
      </View>
      <View style={[styles.overviewTile, styles.pendingTile]}>
        <Text style={styles.overviewText}>Total Amount pending this month</Text>
        <Text style={styles.overviewAmount}>₹ {totalPending}</Text>
      </View>
      <View style={[styles.overviewTile, styles.overdueTile]}>
        <Text style={styles.overviewText}>Total Overdue Amount</Text>
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
  const tabConfigs = {
    tabItems: [
      {
        title: `My ${buildingOwner ? 'Properties' : 'Office'}`,
        icon: {
          name: 'building-o',
          type: 'font-awesome',
          color: lightTheme.PRIMARY_COLOR,
          size: 25,
        },
      },
      {
        title: 'Due Invoice',
        icon: {
          name: 'file-text',
          type: 'feather',
          color: lightTheme.PRIMARY_COLOR,
          size: 25,
        },
      },
      {
        title: 'Notification',
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
            <Text style={styles.greeting}>Hello,</Text>
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
