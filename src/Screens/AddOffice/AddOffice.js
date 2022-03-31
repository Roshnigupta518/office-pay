import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

import CustomStackHeader from '../../Components/Component-Parts/CustomStackHeader';
import Text from '../../Components/UI/Text';
import Input from '../../Components/UI/Input';
import Button from '../../Components/UI/Button';

import {globalStyles} from '../../global/Styles';
import {styles} from './styles';

const RenderOfficeDetailsform = () => {
  const [wing, setWing] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [floorNumber, setfloorNumber] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [officeOwnerName, setOfficeOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPAN] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <Input
        placeholder="Enter building wing"
        value={wing}
        onChangeText={setWing}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Enter office number"
        value={officeNumber}
        onChangeText={setOfficeNumber}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Enter building floor number"
        value={floorNumber}
        onChangeText={setfloorNumber}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Enter office name"
        value={officeName}
        onChangeText={setOfficeName}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Enter office owner name"
        value={officeOwnerName}
        onChangeText={setOfficeOwnerName}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Contact number"
        value={contact}
        onChangeText={setContact}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Enter GST number"
        value={gst}
        onChangeText={setGst}
        inputStyle={globalStyles.fontDefault}
      />
      <Input
        placeholder="Enter PAN number"
        value={pan}
        onChangeText={setPAN}
        inputStyle={globalStyles.fontDefault}
      />

      <View style={styles.saveBtnCont}>
        <Button
          titleStyle={styles.saveBtn}
          onPress={() => console.log('Todo: Handle details Save')}
          title={'Save'}
        />
      </View>
    </ScrollView>
  );
};

const AddOffice = ({navigation}) => {
  return (
    <View style={styles.view}>
      <CustomStackHeader goBack={() => navigation.goBack()} />
      <View style={styles.pagetitleCont}>
        <Text style={globalStyles.heading}>Add Office Details</Text>
      </View>
      <RenderOfficeDetailsform />
    </View>
  );
};

export default AddOffice;
