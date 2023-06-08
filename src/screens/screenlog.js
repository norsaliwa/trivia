import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import screenName from '../../route/screenName';
import MainContain from '../components/MainContain';
import { SafeAreaView } from 'react-native-safe-area-context';
import Screen1 from './screen1';

const Screenlog = (props) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {

    if (name === '' || phone === '') {
      Alert.alert('خطأ', 'يرجى إدخال جميع الحقول');
    } else if (name.length < 3) {
      Alert.alert('خطأ', 'يجب أن يحتوي الاسم على 3 أحرف على الأقل');
    } else if (!/^\d{10}$/.test(phone)) {
      Alert.alert('خطأ', 'يجب أن يحتوي رقم الهاتف على 10 أرقام فقط');
    } else {
      setIsLoggedIn(true);
    }
  };

  const navigateToScreen1 = () => {
    // if (isLoggedIn) {
      navigation.navigate(screenName.screen1);
    // }

  }

  return (
    <MainContain>
      <SafeAreaView>


        <TextInput
          style={[styles.input, { borderColor: name.length < 3 ? 'red' : 'gray' }]}
          placeholder="اسمك"
          onChangeText={text => setName(text)}
        />
        {name.length < 3 && (
          <Text style={styles.errorText}>
            يجب أن يحتوي الاسم على 3 أحرف على الأقل
          </Text>
        )}
        <TextInput
          style={[styles.input, { borderColor: !/^\d{10}$/.test(phone) ? 'red' : 'gray' }]}
          placeholder="رقم الهاتف"
          onChangeText={text => setPhone(text)}
          keyboardType="numeric"
        />
        {!/^\d{10}$/.test(phone) && (
          <Text style={styles.errorText}>
            يجب أن يحتوي رقم الهاتف على 10 أرقام فقط
          </Text>
        )}


      </SafeAreaView>

      <TouchableOpacity style={styles.Buttons}
        onPress={handleLogin}>
        <Text style={styles.start1}>تسجيل الدخول</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Buttons}
        onPress={navigateToScreen1}>
        <Text style={styles.start1}>{'login'}</Text>

      </TouchableOpacity>



    </MainContain>


  );


};



const styles = StyleSheet.create({



  header: {
    flex: 1,
    backgroundColor: '#D424B4',
    // height:'10%',

    // borderColor:'#454545',
    justifyContent: 'center',
    alignItems: 'center'
  },





  Buttons: {
    backgroundColor: '#386BE8',
    fontSize: 141,
    marginTop: 70,
    width: 300,
    alignItems: 'center',

  },
  start1: {
    color: 'white',
    fontSize: 26,
    alignItems: 'center',

  },

  input: {
    height: 50,
    margin: 10,
    borderWidth: 2,
    padding: 10,
    width: 300,
    borderColor: 'black',



  },

  errorText: {
    color: 'red',
    marginBottom: 10,
  },

  text: {
    fontSize: 20,
    color: 'white',
  },

  text: {
    fontSize: 20,
    color: 'white',
  },



})

export default Screenlog;