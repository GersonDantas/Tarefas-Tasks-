import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import momment from 'moment';
import 'moment/locale/pt-br';

export default props => {
  const doneNotStyle =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

  const date = props.doneAt ? props.doneAt : props.estimatAt;

  const formatDate = momment(date)
    .locale('pt-br')
    .format('ddd,  D [de] MMMM');
  const getRightContent = () => {
    console.debug('hjhjh');
    <TouchableOpacity style={styles.right}>
      <Icon name="trash" size={30} color="#FFF" />
    </TouchableOpacity>;
  };
  return (
    <Swipeable renderRightActions={getRightContent}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {/**Conclusão */}
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>

        <View>
          <Text style={[styles.desc, doneNotStyle]}>{props.desc}</Text>
          {/**Descrição */}
          <Text style={styles.date}>{formatDate}</Text>
          {/**estimativa de pronto */}
        </View>
      </View>
    </Swipeable>
  );
};

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#FFF" />
      </View>
    );
  } else {
    return <View style={styles.padding} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#aaa',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 10,
  },
  checkContainer: {
    width: '20%',
  },
  padding: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
});
