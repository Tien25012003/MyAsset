<<<<<<< HEAD
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ShowModal, ShowTab} from '../Redux/ModalNumber';

import DailyCost from '../screens/DailyCost';
import PropertyCost from '../screens/PropertyCost';

const CustomModal = () => {
  const isShowTab = useSelector(state => state.modalNumber.IsShowTab);
  //console.log(isShowTab);
  const dispatch = useDispatch();
  return (
    <>
      <Pressable
        style={styles.modal_view}
        onPress={() => dispatch(ShowModal(false))}
      />
      <View style={styles.modal_view}>
        <View style={styles.modal_box}>
          {isShowTab === false ? <DailyCost /> : <PropertyCost />}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  modal_view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },

  modal_box: {
    width: '100%',
    height: '130%',

    backgroundColor: '#ffffff',
    //borderRadius: 20,
    borderWidth: 1,
    //paddingHorizontal: 10,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingTop: 20,
  },
});
=======
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShowModal, ShowTab } from '../Redux/ModalNumber';

import DailyCost from "../screens/DailyCost";
import PropertyCost from "../screens/PropertyCost";

const CustomModal = () => {
    const isShowTab = useSelector(state => state.modalNumber.IsShowTab);
    //console.log(isShowTab);
    const dispatch = useDispatch();
    return (
        <>
            <Pressable
                style={styles.modal_view}
                onPress={() => dispatch(ShowModal(false))}
            />
            <View style={styles.modal_view}>
                <View style={styles.modal_box}>
                    
                    {isShowTab === false ? (<DailyCost />) : (<PropertyCost />)}
                    
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    modal_view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },

    modal_box: {
        width: '100%',
        height: '130%',
       
        backgroundColor: '#ffffff',
        //borderRadius: 20,
        borderWidth: 1,
        //paddingHorizontal: 10,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingTop: 20,
        
    },
    

})
>>>>>>> 4f193f86a5e6e6cf8acb380b0be9369de188bc2a
export default CustomModal;
