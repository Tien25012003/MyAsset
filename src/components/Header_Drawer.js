import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import scale from '../constants/scale';
import Feather from 'react-native-vector-icons/Feather';

const HeaderDrawer = props => {
  return (
    <View style={styles.view}>
      <View style={styles.header_view}>
        <View style={styles.iconmoney_view}>
          <Image
            style={styles.icon_money}
            source={require('../assets/images/icon_money.png')}
            resizeMode="stretch"
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text}>MY</Text>
          <Text style={styles.text}>ASSET</Text>
        </View>

        <View style={styles.option_view}>
          <View style={styles.box}>
            <Pressable
              onPress={props.onPress}
              android_ripple={{color: '#bbbbbb'}}>
              <Feather name="menu" size={30} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.header_view}>
        <Text
          style={[{fontSize: props.fontSize}, styles.title, {...props.style}]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal:10,
  },

  header_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //paddingHorizontal:scale(10),
  },

  text: {
    color: 'black',
    fontSize: scale(20),
    fontFamily: 'Wallpoet-Regular',
  },

  iconmoney_view: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },

  option_view: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  box: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon_money: {
    width: scale(50),
    height: scale(50),
  },

  title: {
    color: 'black',
  },
});

export default HeaderDrawer;