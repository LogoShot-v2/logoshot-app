import * as React from 'react';
import { StyleSheet, Text, View, Image, FlatList, StatusBar, TouchableOpacity, Table } from "react-native";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import Carousel from 'react-native-snap-carousel';
import { SearchText } from "../axios/api"




const ResultDetail = () => {

    return (
        <Background>
            <Scroll>
                <View>
                    <View style={{ height: "40%", alignItems: "center", justifyContent: "center", backgroundColor: '#FFFFFF' }}>
                        <Image source={require("../assets/Logoshot.png")} style={{ resizeMode: "contain", width: "75%", height: "90%" }} />
                    </View>
                    <View style={{ height: "60%", backgroundColor: 'FFFFFF' }}>
                        <Table style={{ backgroundColor: 'FFFFFF' }} borderStyle={{ borderWidth: 1, borderColor: '#1E1F20' }}>

                        </Table>

                    </View>
                </View>
            </Scroll>
        </Background>

    )
}

export default ResultDetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    GridViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#7B1FA2'
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        padding: 10,
    }
});