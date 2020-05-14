import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

export default class Auth extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false,
  };
  signinOrSignup = () => {
    if (this.state.stageNew) {
      Alert.alert('Sucesso!', 'Criar conta');
    } else {
      Alert.alert('Sucesso', 'logar');
    }
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.titlle}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
          </Text>
          {this.state.stageNew && (
            <TextInput
              placeholder="Nome"
              value={this.state.name}
              style={styles.input}
              onChange={name => this.setState({name})}
            />
          )}
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
            secureTextEntry={true}
          />
          {this.state.stageNew && (
            <TextInput
              placeholder="confimar senha"
              value={this.state.confirmPassword}
              style={styles.input}
              onChange={confirmPassword => this.setState({confirmPassword})}
              secureTextEntry={true}
            />
          )}
          <TouchableOpacity onPress={this.signinOrSignup}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => this.setState({stageNew: !this.state.stageNew})}>
          <Text style={styles.buttonText}>
            {this.state.stageNew ? 'Já possui conta?' : 'Não possui conta?'}
          </Text>
        </TouchableOpacity>
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
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
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
