import React from 'react';
import { View , TextInput , StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


export default props => {
    return (
        <View style={[styles.container, props.style]}>
            <Icon />
            <TextInput />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})