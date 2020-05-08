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
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTasks from './AddTasks';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br';

export default class TaskList extends react.Component {
  state = {
    showDoneTasks: true,
    showAddTasks: false,
    visibleTasks: [],
    tasks: [
      {
        id: Math.random(),
        desc: 'comprar um livro de React-native',
        estimatAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'ler um livro de React-native',
        estimatAt: new Date(),
        doneAt: null,
      },
    ],
  };
  //Like this componet is mounted, come this function
  componentDidMount = () => {
    this.filterTasks();
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
  };

  toggleTask = taskId => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (taskId === task.id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    //For what to call when checked
    this.setState({tasks}, this.filterTasks);
    //this.setState({tasks: tasks}); the two are correct
  };

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Descrição não informada, passar uma descrição válida!');
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random,
      desc: newTask.desc,
      estimatAt: newTask.date,
      doneAt: null,
    });
    this.setState({tasks, showAddTasks: false}, this.filterTasks);
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
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Task {...item} toggleTask={this.toggleTask} />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
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
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    height: 50,
    width: 50,
    backgroundColor: commonStyles.colors.today,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
