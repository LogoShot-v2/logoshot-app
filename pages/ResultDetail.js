import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';


const ResultDetail = () => {

    return (
        <Background>
            <Scroll>
                <View>
                    <View style={{ height: "40%", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
                        <Image source={require("../assets/Logoshot.png")} style={{ resizeMode: "contain", width: "75%", height: "90%" }} />
                    </View>
                    <View style={{ height: "60%", backgroundColor: COLORS.white, padding: SIZES.padding }}>
                        <Table style={{ backgroundColor: COLORS.white }} borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}>

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