import React, * as react from 'react';
import {
  Alert,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTasks from './AddTasks';
import Icon from 'react-native-vector-icons/FontAwesome';

import {server, showError, showSuccess} from '../common';
import moment from 'moment';
import 'moment/locale/pt-br';

const initialState = {
  showDoneTasks: true,
  showAddTasks: false,
  visibleTasks: [],
  tasks: [],
};

export default class TaskList extends react.Component {
  state = {
    ...initialState,
  };
  //Like this componet is mounted, come this function
  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState');
    const savedState = JSON.parse(stateString) || initialState;
    this.setState(
      {
        showDoneTasks: savedState.showDoneTasks,
      },
      this.filterTasks,
    );
    this.loadTasks();
  };

  loadTasks = async () => {
    try {
      const maxDate = moment()
        .add({days: this.props.daysAheard})
        .format('YYYY-MM-DD 23:59:59');
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      this.setState({tasks: res.data}, this.filterTasks);
    } catch (e) {
      showError(e);
    }
  };

  toggleFilter = () => {
    //Am pass the function 'filterTasks' how params for it entouch the function
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pedding = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pedding);
    }
    this.setState({visibleTasks});
    // this.setState({visibleTasks: visibleTasks});
    AsyncStorage.setItem(
      'tasksState',
      JSON.stringify({
        showDoneTasks: this.state.showDoneTasks,
      }),
    );
  };

  toggleTask = async taskId => {
    //carregando do banco
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`);
    } catch (e) {
      showError(e);
    }

    // const tasks = [...this.state.tasks];
    // tasks.forEach(task => {
    //   if (taskId === task.id) {
    //     task.doneAt = task.doneAt ? null : new Date();
    //   }
    // });
    // //For what to call when checked
    // this.setState({tasks}, this.filterTasks);
    // //this.setState({tasks: tasks}); the two are correct
  };

  addTask = async newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Descrição não informada, passar uma descrição válida!');
      return;
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      });
      this.setState({showAddTasks: false}, this.loadTasks);
    } catch (e) {
      showError(e);
    }
  };

  deleteTask = async taskId => {
    try {
      await axios.delete(`${server}/tasks/${taskId}`);
      this.setState(this.loadTasks);
    } catch (e) {
      showError(e);
    }
    // const tasks = this.state.tasks.filter(task => task.id !== id);
    // this.setState({tasks}, this.filterTasks);
  };

  getImage = () => {
    switch (this.props.daysAheard) {
      case 0:
        return todayImage;
      case 1:
        return tomorrowImage;
      case 7:
        return weekImage;
      default:
        return monthImage;
    }
  };
  getColor = () => {
    switch (this.props.daysAheard) {
      case 0:
        return commonStyles.colors.today;
      case 1:
        return commonStyles.colors.tomorrow;
      case 7:
        return commonStyles.colors.week;
      default:
        return commonStyles.colors.month;
    }
  };

  render() {
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM');
    return (
      <View style={styles.container}>
        <AddTasks
          isVisible={this.state.showAddTasks}
          onCancel={() => this.setState({showAddTasks: false})}
          onSave={this.addTask}
        />
        <ImageBackground source={this.getImage()} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                name="bars"
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Task
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={[styles.addButton, {backgroundColor: this.getColor()}]}
          onPress={() => this.setState({showAddTasks: true})}
          activeOpacity={0.7}>
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
