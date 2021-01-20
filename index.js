// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {





var showArray = [];
var count = 0;


    var arr = command.split(" "); //строку в массив
    var commandName = arr[0];

    function arrayTransform() {
        for (var key in phoneBook) {
            if (typeof phoneBook[key] === "array" || phoneBook[key] instanceof Array) {
                phoneBook[key] = phoneBook[key].join(); //массив в строку

            }

        }
        return phoneBook;
    }

    function stringTransform() {
        for (var key in phoneBook) {
            if (typeof phoneBook[key] === "string" || phoneBook[key] instanceof String) {
                phoneBook[key] = phoneBook[key].split(","); //строку в массив
            }
        }
        return phoneBook;
    }

    function addContact() {
        arrayTransform(); //строка

        var k = arr[1];

        if (k in phoneBook) {
            phoneBook[k] = phoneBook[k] + "," + arr.slice(2);
        } else {
            phoneBook[k] = arr.slice(2);
        }



        arrayTransform(); //строка
        return phoneBook;

    }

    function deleteContact() {


        for (var key in phoneBook) {

            if (phoneBook[key].indexOf(',') !== -1) {
                phoneBook[key] = phoneBook[key].split(','); //строку в массив
                phoneBook[key].forEach(function (item, i, array) {


                    if (arr[1] == item) {

                        array.splice(i, 1);
                        count++;
                        array.join();
                        


                    }

                });

            } else {
                if (arr[1] == phoneBook[key]) {
                    
                    delete phoneBook[key];
                    
                    count++;
                    
                } 
                    
            }




        }
        arrayTransform(); //строка
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }

    function showPhoneBook() {
        var mass = [];

        for (var key in phoneBook) {

            if (phoneBook[key].indexOf(',') !== -1) {
                phoneBook[key] = phoneBook[key].split(','); //строку в массив
                phoneBook[key].forEach(function (item, i, array) {


                    mass.push(' ' + item);


                })
                showArray.push(key + ":" + mass);
                mass = [];
            } else if (phoneBook[key].length == 0) {
                delete phoneBook.key;
            } else {
                showArray.push(key + ": " + phoneBook[key]);
            }



        }






        showArray.sort();


        return showArray;

    }



    if (commandName === "ADD") {
        return addContact();



    } else if (commandName === "REMOVE_PHONE") {
        return deleteContact();



    } else if (commandName === "SHOW") {
        return showPhoneBook();
    }



};
