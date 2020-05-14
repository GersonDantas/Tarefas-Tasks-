import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

export default class Auth extends Component {
  state = {
    email: '',
    password: '',
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.titlle}>Tasks</Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="email"
            value={this.state.email}
            style={styles.input}
            onChange={email => this.setState({email})}
          />
          <TextInput
            placeholder="senha"
            value={this.state.password}
            style={styles.input}
            onChange={password => this.setState({password})}
          />
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    width: '90%',
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
  },
});
