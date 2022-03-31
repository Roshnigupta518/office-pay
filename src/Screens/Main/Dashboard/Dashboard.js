import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import CustomMainHeader from '../../../Components/Component-Parts/CustomMainHeader';

import Property from './Property/Property';

import Text from '../../../Components/UI/Text';
import {TopTabs} from '../../../Components/UI/TopTabs';

import {styles} from './styles';

import {lightTheme} from '../../../global/Theme';
import InvoiceItem from './Invoice/InvoiceItem';
import {dummyInvoiceDashboard} from '../../../assets/dummy_data';
import Invoice from './Invoice/Invoice';

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

const RenderDashboardTabs = ({onPropertyItemClick}) => {
  const tabConfigs = {
    tabItems: [
      {
        title: 'My Properties',
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
      <Property onPropertyItemClick={onPropertyItemClick} />,
      <Invoice />,
      <Text>Cart</Text>,
    ],
  };

  return <TopTabs tabConfigs={tabConfigs} />;
};

const Dashboard = ({navigation}) => {
  // Todo: made dynamic with API
  // const [pageData, setPageData] = useState();

  const onPropertyItemClick = property => {
    navigation.navigate('my-property', {
      params: {property},
    });
  };

  return (
    <View style={styles.view}>
      <CustomMainHeader />
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
        <RenderDashboardTabs onPropertyItemClick={onPropertyItemClick} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
