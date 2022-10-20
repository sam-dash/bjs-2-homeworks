class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }
    get state() {
        return this._state;
    }
    set state(newState) {
        if(newState >= 0 && newState <= 100) {
            this._state = newState;
        }
        else if(newState > 100) {
            this._state = 100;
        }
        else {
            this._state = 0;
        }      
    }
    fix() {
        this.state = this.state * 1.5;
    }  
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }  
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "book";
        this.author = author;
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}
 
class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook  extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    addBook(book) {
        if(book.state > 30) {
            this.books.push(book);
        }
    }
    findBookBy(type, value) {
        let book = this.books.find(item =>  item[type] === value);
        return book === undefined ? null : book;
    }
    giveBookByName(bookName) {
        let index = this.books.findIndex(item => item.name === bookName);
        let book = null;
        if(index >= 0) {
            book = this.books[index];
            this.books.splice(index, 1);
        }
        return book;
    }
}

class Student {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.gradebook = new Gradebook();
    }
    setSubject(subjectName) {
        this.gradebook.addSubject(subjectName);
    }
    addMark(mark, subjectName) {
        if(!this.gradebook.subjectIsExist(subjectName)) {
            this.setSubject(subjectName);
        }
        this.gradebook.addMarkToSubject(mark, subjectName);
    }
    addMarks(subjectName, ...marks) {
        if(!this.gradebook.subjectIsExist(subjectName)) {
            this.setSubject(subjectName);
        }
        this.gradebook.addMarksToSubject(subjectName, ...marks);
    }
    removeMark(mark, subjectName) {
        this.gradebook.removeMarkFromSubject(mark, subjectName);
    }
    removeMarks(subjectName, callback, ...marks) {
        this.gradebook.removeMarksFromSubject(subjectName, callback, ...marks);
    }
    exclude(reason) {
        this.gradebook.clear();
        delete this.gradebook;
        this.excluded = reason;
    }
    getAverageBySubject(name) {
        return this.gradebook.getAverageBySubject(name);
    }
    getAverage() {
        return this.gradebook.getAverage();
    }
}

class Gradebook {
    constructor() {
        this.subjects = [];
    }
    subjectIsExist(name) {
        let index = this.findSubjectIndexByName(name);
        return (index >= 0) ? true : false;
    }
    addSubject(name) {
        let index = this.findSubjectIndexByName(name);
        if(index < 0) {
            let discipline = new Subject(name);
            this.subjects.push(discipline);
        }
    }
    removeSubject(name) {
        let index = this.findSubjectIndexByName(name);
        if(index >= 0) {
            this.subjects.splice(index, 1);
        }
    }
    addMarkToSubject(mark, name) {
        let index = this.findSubjectIndexByName(name);
        if(index >= 0) {
            this.subjects[index].addMark(mark);
        }      
    }
    addMarksToSubject(name, ...marks) {
        let index = this.findSubjectIndexByName(name);
        if(index >= 0) {
            this.subjects[index].addMarks(...marks);
        }
    }
    removeMarkFromSubject(mark, name) {
        let index = this.findSubjectIndexByName(name);
        if(index >= 0) {
            this.subjects[index].removeMark(mark);
        }
    }
    removeMarksFromSubject(name, callback, ...mark) {
        let index = this.findSubjectIndexByName(name);
        if(index >= 0) {
            this.subjects[index].removeMarks(callback, ...mark);
        }
    }
    getAverageBySubject(name) {
        let average = 0;
        let index = this.findSubjectIndexByName(name);
        if(index < 0) {
            return average;
        }  
        let marks = this.subjects[index].marks;       
        let sum = marks.reduce((accumulator, currentValue) => accumulator.value + currentValue.value);
        average = sum / marks.length;
        return average;
    }
    getAverage() {
        let sum = 0;
        let count = 0;
        this.subjects.forEach(function(item){
            item.marks.forEach(function(supItem) {
                sum += supItem.value;
                count += 1;               
            });
        });
        let average = sum / count;
        return average;
    }
    findSubjectIndexByName(name) {
        return this.subjects.findIndex((item) => item.name === name);
    }
    clear() {
        this.subjects.forEach((item) => item.clear());
        delete this.subjects;
    }
}

class Subject {
    constructor(name) {
        this.name = name;  
        this.marks = [];
    }
    addMark(value) {
        let mark = this.convert(value);
        if(!this.validate(mark)) {
            return;
        }
        this.marks.push(mark);
    }
    removeMark(value) {
        // first matching
        let index = this.marks.findIndex(item => item.value === value);
        if(index >= 0) {
            this.marks.splice(index, 1);
        }
    }
    addMarks(...values) {
        let marks = values.map(this.convert).filter(item => this.validate(item));
        this.marks = this.marks.concat(marks);
    }
    removeMarks(callback, ...values) {
        this.marks = this.marks.filter(item => callback(item.value, values));
    }
    convert(mark) {
        if(typeof mark === 'number') {
            return new Mark(mark);
        }
        else if(typeof mark === 'string') {
            let number = Number(mark);
            return new Mark(number);
        }
        else if(mark instanceof Mark) {
            return mark;
        }
        return null;
    }
    validate(mark) {
        if(mark === null || !mark.isValid) {
            return false;
        }
        return true;
    }
    clear() {
        delete this.marks;
    }
}

class Mark {
    constructor(value) {
        this.isValid = true;
        this.value = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if(!this.validate(value)) {
            this.isValid = false;
            console.log('значением оценки может быть только число');
            return;
        }
        else if(value <= 0 || value > 5) {
            this.isValid = false;
            console.log(`оценка со значением ${value} не корректна`);
            return;
        }
        this._value = value;
    }  
    validate(value) {
        let result = true;
        if(typeof value !== 'number') {
          result = false;
        }
        if(isNaN(value)) {
          result = false;
        }
        return result;
      }
}