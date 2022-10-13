function compareArrays(arr1, arr2) {
  let result = false;
 
  if(!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return result;
  }
  if(arr1.length !== arr2.length) {
    return result;
  }
  
  result = arr1.every((item, index) => item === arr2[index]);
  return result; 
}

function advancedFilter(arr) {
  let resultArr = arr.filter((item) => item > 0
  ).filter((item) => item % 3 === 0
  ).map((item) => item * 10
  );
  return resultArr;
}
