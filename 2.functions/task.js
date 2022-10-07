// Задание 1
function getArrayParams(arr) {
  let min = arr[0];
  let max = arr[0];
  let sum = 0;
  let avg = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (min > arr[i]) {
      min = arr[i];
    }
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  
  avg = sum / arr.length;
  avg = avg.toFixed(2);

  return { min:min, max:max, avg:avg };
}


// Задание 2
function worker(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

function makeWork(arrOfArr, func) {
  let max = 0;

  for (let i = 0;i < arrOfArr.length; i++) {
    let sum = func(arrOfArr[i]);
    if (sum > max) {
      max = sum;
    }
  }
  
  return max;
}


// Задание 3
function worker2(arr) {
  let min = arr[0] > 0 ? arr[0] : ((-1) * arr[0]);
  let max = arr[0] > 0 ? arr[0] : ((-1) * arr[0]);
  let diff = 0;

  for (let i = 0; i < arr.length; i++) {
    // convert to positive number
    let arrValue = arr[i];
    if(arrValue < 0) {
      arrValue = ((-1) * arrValue);
    }
    // get max and min value
    if (min > arrValue) {
      min = arrValue;
    }
    if (max < arrValue) {
      max = arrValue;
    }
  }

  diff = max - min;

  return diff;
}
 