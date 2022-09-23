import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import { StyleSheet } from 'react-native-web';

const MyComponent = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Checkbox
            style={styles.checkbox}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked);
            }}
        />
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