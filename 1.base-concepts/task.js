"use strict";
function solveEquation(a, b, c) {
  let arr = [];
  let discriminant = Math.pow(b, 2) - (4 * a * c);
  if (discriminant > 0) {
    let firstSum = ((-1 * b) + Math.sqrt(discriminant)) / (2 * a); 
    arr.push(firstSum);
    let secondSum = ((-1 * b) - Math.sqrt(discriminant)) / (2 * a); 
    arr.push(secondSum);
  }
  else if (discriminant === 0) {
    let thirdSum = (-1 * b) / (2 * a);
    arr.push(thirdSum);
  }
  return arr; 
}

