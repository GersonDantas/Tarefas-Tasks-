import React from 'react';
import {View, Text} from 'react-native';

// import { Container } from './styles';

export default props => {
  return (
    <View>
      <Text>{props.desc}</Text>
      {/**Descrição */}
      <Text>{props.estimatAt + ''}</Text>
      {/**estimativa de pronto */}
      <Text>{props.doneAt + ''}</Text>
      {/**Conclusão */}
    </View>
  );
};
