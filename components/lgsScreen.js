import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';



const Background = styled(SafeAreaView)`
    background-color: #FFFFFF;
`

const Scroll = styled(ScrollView)`
    height: 100%;
    width: 100%;
    overflow: scroll;
`
const SafeAreaViewContainer = styled(SafeAreaView)`
    height: 100%;
    width: 100%;
    align-items: center;
    overflow: scroll;
`
const ContentContainer = styled(View)`

    display: flex;
    width: 90%;
    height: 100%;
    margin: auto;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`




export { Background };
export { Scroll };
export { SafeAreaViewContainer };
export { ContentContainer };