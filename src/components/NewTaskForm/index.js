import React, { useState } from 'react';
import routes from './../../routes';
import style from './style.styl';

export default function NewTaskForm({
  db,
  setRoute,
  tasks,
  addTask
}) {
  const [ screen, setScreen ] = useState('taskType');
  const [ task, setTask ] = useState(null);

  return (
    <div>
      Доступно заданий: { tasks && tasks.length }
      { screen === 'taskType' && (
        <div className={['column', style.dock].join(' ')}>
          <h2>Заработать карточек</h2>
          <button onClick={() => setScreen('textTask')}> Создать текст карточку </button>
          <button onClick={() => setScreen('videoTask')}> Создать видео карточку </button>
          { tasks && tasks.length > 5  && <button onClick={() => setRoute(routes.start)}> Начать игру </button> }
        </div>)
      }
      { screen === 'textTask' && (<div>
            <h2>Загрузить текстовое задание</h2>
            <textarea onChange={e => setTask({ type: 'text', content: e.target.value })} placeholder="Напишите ваше задание" />
          </div>)
      }
      { screen === 'videoTask' && (<div>
            <h2>Загрузить видео задание (до 30 сек)</h2>
            <input type="url" onChange={e => setTask({ type: 'url', content: e.target.value })} placeholder="Вставьте сюда вашу ссылку на видео" />
          </div>)
      }
      {
        task && task.content && task.content.length > 5
        && <button onClick={
          () => addTask(task)
          || setTask('')
          || setScreen('taskType')}
          >Загрузить</button>
      }
    </div>
  );
}


// class NewTaskForm extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.db = props.db;
//     this.setRoute = props.setRoute;
//     this.tasks = props.tasks;
//     console.log('update', this.tasks)
//     this.addTask = props.addTask;

//     this.state = {
//       isAddTasksScreen: true,
//       isAddTextTaskScreen: false,
//       isAddVideoTaskScreen: false,
//     }


//   }

//   goToAddTextScreen = () => {
//     this.setState({ isAddTasksScreen: false, isAddTextTaskScreen: true });
//   }

//   goToAddVideoScreen = () => {
//     this.setState({ isAddTasksScreen: false, isAddVideoTaskScreen: true });
//   }

//   saveTextTask = (e) => {
//     e.preventDefault();
//     const text = this.text.value;
//     this.setState({ isAddTasksScreen: true, isAddTextTaskScreen: false, isAddVideoTaskScreen: false }, () => {
//       this.addTask({ content: text, type: "text" });
//     });
//   }

//   saveVideoTask = (e) => {
//     e.preventDefault();
//     const url = this.url.value;
//     this.setState({ isAddTasksScreen: true, isAddTextTaskScreen: false, isAddVideoTaskScreen: false }, () => {
//       this.addTask({ content: url, type: "video" })
//     });
//   }

//   render = () => {

//   }
// };

// export default NewTaskForm;