import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { icons, COLORS, FONTS, SIZES } from "../constant";


const MyComponent = ({ title }) => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View style={styles.checkboxContainer}>
            {title ? <Text style={{
                ...FONTS.h4
            }}>{title}</Text> : null}

            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
                color={'green'}

            />
        </View>

    );
};

export default MyComponent;

const styles = StyleSheet.create({
    checkboxContainer: {

        flexDirection: "row",
        alignItems: "center",

        marginBottom: 5,

    },
    checkbox: {

        alignSelf: "center",
    },
});