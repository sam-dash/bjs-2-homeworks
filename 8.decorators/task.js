function cachingDecoratorNew(func) {
  let cache = new CacheQueue(5);
  return function wrapper(...args) {
    const hash = args.join();
    if(cache.include(hash)) {
      console.log(`Из кэша: ${cache.get(hash)}`);
      return `Из кэша: ${cache.get(hash)}`;
    }
    else {
      let result = func.call(this, ...args);
      cache.add(hash, result);
      console.log(`Вычисляем: ${result}`);
      return `Вычисляем: ${result}`;
    }
  }
}

class CacheQueue {
  constructor(limit) {
    this._cache = [];
    this._count = 0;
    this._limit = limit;
  }
  isEmpty() {
    return this._cache.length === 0;
  }
  include(hash) {
    return !this.isEmpty() && this._cache.some((item) => (item.hash === hash));
  }
  add(hash, value) {
    let obj = {'hash': hash, 'value': value};
    this._cache.push(obj);
    this._count += 1;
    if(this._count >= this._limit) {
      this._cache.shift();
    }
  }
  get(hash) {
    let res = this._cache.find((item) => (item.hash === hash));
    return res === undefined ? null : res.value;
  }
  reset() {
    this._count = 0;
  }
}


function debounceDecoratorNew(func, ms) {
  let timeout;
  let _isRunning = false;
  return function wrapper(...args) {
    if(!_isRunning) {
      func.call(this, ...args);  
      _isRunning = true;
    }
    else {
      console.log('Сигнал проигнорирован');
    }
    // cancel previous timeout
    clearTimeout(timeout);
    // set new timeout (from last call)
    timeout = setTimeout(() => {            
      _isRunning = false;              
    }, ms);
  }
}

function debounceDecorator2(func, ms) {
  let timeout;
  let _isRunning = false;
  function wrapper(...args) {
    wrapper.count += 1;
    console.log(`Общее количество вызовов ${wrapper.count}`);
    if(!_isRunning) {
      func.call(this, ...args);  
      _isRunning = true;
    }
    else {
      console.log('Сигнал проигнорирован');
      return;
    }

    timeout = setTimeout(() => {            
      _isRunning = false;              
    }, ms);
  }
  wrapper.count = 0;  
  return wrapper;
}