import Dixie from "dexie";

export default class TasksDB {
  constructor(fields) {
    this.db = new Dixie('tasks_db');
    this.taskHistory = [];
    this._init(fields);
  }

  _init(fields) {
    this.db.version(1).stores({
      tasks: fields
    });
  }

  _random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  next() {
    return this.all()
      .then(all => {
        console.log('all tasks: ', all)
        // TODO Add filter completed task
        const newTask = all[this._random(0, all.length)];
        this.taskHistory.push(newTask);
        return newTask;
      })
      .catch(e => console.error(e))
  }

  put(task) {
    return this.db.tasks.put(task).catch(e => console.error(e))
  }

  all() {
    return this.db.tasks.toCollection().toArray();
  }
}
