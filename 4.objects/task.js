function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
}

Student.prototype.addMark = function(mark) {
  this.marksLazyInitialization();
  this.marks.push(mark);
}

Student.prototype.addMarks = function(...marks) {
  this.marksLazyInitialization();
  this.marks = this.marks.concat(...marks);
}

Student.prototype.getAverage = function() {
  let sum = this.marks.reduce((accumulator, currentValue) => accumulator + currentValue);
  let average = sum / this.marks.length;
  return average;
}

Student.prototype.exclude= function(reason) {
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
}

Student.prototype.marksLazyInitialization = function() {
  if(this.marks === undefined) {
    this.marks = [];
  }
}