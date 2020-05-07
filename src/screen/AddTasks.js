import React, {Component} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import commonStyle from '../commonStyles';

const initialState = {desc: ''};

export default class AddTasks extends Component {
  state = {
    ...initialState,
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animated="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a Descrição..."
            onChangeText={desc => this.setState({desc})}
            value={this.state.desc}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: commonStyle.fontFamily,
    backgroundColor: commonStyle.colors.today,
    color: commonStyle.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commonStyle.fontFamily,
    height: 40,
    marginTop: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyle.colors.today,
  },
});
