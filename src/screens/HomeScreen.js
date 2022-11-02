import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import Tabs from '../routes/TabNavigation';

export default function HomeScreen () {
    return (
        <View style = {styles.body}>
            <Text style = {styles.text}>Home Screen</Text>
            <View>
                <Tabs/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ffffff',
        
    },

    text:{
        fontSize:20,
        color:'#000000',
    },

})
