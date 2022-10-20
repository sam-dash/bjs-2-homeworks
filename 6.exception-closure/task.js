function parseCount(value) {
    let number = Number.parseInt(value);
    if(isNaN(number)) {
        throw new Error('Невалидное значение');
    }
    return number;
}

function validateCount(value) {
    try {
        return parseCount(value);
    }
    catch(error) {
        return error;
    }
}

class Triangle {
    constructor(a, b, c) {
        let sides = [a, b, c];
        sides.sort((a, b) => a - b);
        if(sides[0] + sides[1] < sides[2]) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
        this.a = sides[0];
        this.b = sides[1];
        this.c = sides[2];
    }
    getPerimeter() {
        return this.a + this.b + this.c;
    }
    getArea() {
        let halfPerimeter = this.getPerimeter() / 2;
        let formula = halfPerimeter * (halfPerimeter - this.a) * (halfPerimeter - this.b) * (halfPerimeter - this.c);
        let area = Math.sqrt(formula);
        area = Number(area.toFixed(3));
        return area;
    }   
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    }
    catch(error) {
        return {
            getArea: function() {
                return 'Ошибка! Треугольник не существует';
            },
            getPerimeter: function() {
                return 'Ошибка! Треугольник не существует';
            }
        };
    }
}