/**
 * @param {String} date
 * @returns {Object}
 */
//В этом задании необходимо реализовать дополнительные функции для управления временем.
//Условия

//В функцию всегда передается строка в правильном и полном формате. Дополнительных проверок не требуется.
//Формат даты — "YYYY‒MM‒DD HH:SS", где YYYY — год, MM —  месяц, DD — день, HH — час, SS —  минуты
//В функции add/subtract всегда передается целое число
//Гарантируется, что после всех манипуляций получится корректная дата, которая будет не ранее 1 января 2000 года
//Функции add/subtract
//
//Каждая функция принимает первым аргументом количество единиц, на которое нужно изменить дату, а вторым — единицу измерения.
//
//Можно менять следующие значения: years (годы), months (месяцы), days (дни), hours (часы), minutes (минуты)
//
//Обработка ошибок
//
//Если первый аргумент отрицательный, либо второй содержит неизвестную единицу измерения, функции должны выбросить исключение TypeError.
//

module.exports = function (date) {
    let utc = new Date().getTimezoneOffset();//разница между местным и UTC-временем, в минутах.
    let time = new Date(date);
    let dictionary = ['years', 'months', 'days', 'hours', 'minutes'];
    return obj = {
        add: function (number, command) {
            if (number < 0 ) {
                throw new TypeError('Ошибка!');
            } else {

                switch (command) {
                    case 'years':
                        time.setFullYear(time.getFullYear() + number);
                        break;
                    case 'months':
                        time.setMonth(time.getMonth() + number);
                        break;
                    case 'days':
                        time.setDate(time.getDate() + number);
                        break;
                    case 'hours':
                        time.setHours(time.getHours() + number);
                        break;
                    case 'minutes':
                        time.setMinutes(time.getMinutes() + number);
                        break;
                    default:
                        throw new TypeError('Ошибка!');
                }
            }
                return this;

            
        },
        subtract: function (number, command) {
            if (number < 0 ) {
                throw new TypeError('Ошибка!');
            } else {

                switch (command) {
                    case 'years':
                        time.setFullYear(time.getFullYear() - number);
                        break;
                    case 'months':
                        time.setMonth(time.getMonth() - number);
                        break;
                    case 'days':
                        time.setDate(time.getDate() - number);
                        break;
                    case 'hours':
                        time.setHours(time.getHours() - number);
                        break;
                    case 'minutes':
                        time.setMinutes(time.getMinutes() - number);
                        break;
                    default:
                        throw new TypeError('Ошибка!');


                }
            }
                return this;
            
        },
        get value() {

time.setMinutes(time.getMinutes() + utc*-1);
            return time.toISOString().slice(0,16).replace('T',' ');
        }
    }







}
