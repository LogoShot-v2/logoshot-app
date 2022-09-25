import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import { StyleSheet, Text, SafeAreaView } from 'react-native';


const MyComponent = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
                color={'green'}

            />
        
        </SafeAreaView>
    );
};

export default MyComponent;

const styles = StyleSheet.create({
    checkboxContainer: {

        flexDirection: "row",
        marginBottom: 20,

    },
    checkbox: {

        alignSelf: "center",
    },
});