class ExceptionExpansion {
  static throwIf(func, msg, ...args) {
      let message = msg;
      let result = func(...args);
      if(result) {
          throw new Error(message);
      }
  }
}

class DateForrmatHelper {
  static toString() {
      const currentDate = new Date(); 
      let hours = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : `${currentDate.getHours()}`;
      let minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : `${currentDate.getMinutes()}`;
      let forrmat = `${hours}:${minutes}`;
      return forrmat;
  }
}

class AlarmClock {
  constructor() {
      this.alarmCollection = [];
      this.timerId = null; 
  }
  addClock(time, action, id) {
      ExceptionExpansion.throwIf(
          (id) => (typeof id ===  'undefined' || id === null || isNaN(id)), 
          'alarm id is not correct',
          id
      );
      if(this.alarmCollection.some((item) => (item.id === id))) {
          console.error('alarm already added');
          return;
      }
      this.alarmCollection.push({'id': id, 'time': time, 'callback': action.bind(this)});
  }
  removeClock(id) {
      let index = this.alarmCollection.findIndex((item) => (item.id === id));
      if(index >= 0) {
          this.alarmCollection.splice(index, 1);
      }
  } 
  getCurrentFormattedTime() {
      return DateForrmatHelper.toString();
  }
  start() {
      if(this.timerId === null) {
          this.timerId = setInterval(() => this.alarmCollection.forEach((item) => (this.checkClock(item))), 10000);
      }
  }
  checkClock(alarm) {
      let time = DateForrmatHelper.toString();
      if(time.toLowerCase() === alarm.time.toLowerCase()) {
          alarm.callback();
      }
  }
  stop() {
      if(this.timerId !== null) {
          clearInterval(this.timerId);
          this.timerId = null;
      }     
  }
  printAlarms() {
      this.alarmCollection.forEach((item) => (console.log(`id: ${item.id}, time: ${item.time}`)));
  }
  clearAlarms() {
      this.stop();
      this.alarmCollection = [];
  }
}