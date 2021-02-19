/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */





function query(collection, ...operations) {
    operations.sort();
    let newCol = JSON.parse(JSON.stringify(collection));
    
    let newSelFields = [];
    let selFields = [];
    let filtFields = {};
    let newFiltFields = {};
    let countSelect = 0;
    let countFilter = 0;
    let arrays = [];
    let arraysSelect = [];
    let lastProperty;
    let lastOperations;
    let select = {};
    let filter = {};
    let result;
    let countOper = 0;
//    let o = operations.find(item => item[0] == 'filter');
//    console.log(o)  
    if (operations.length == 0) {
        return collection;
    } else {
        for (let op of operations) {
countOper++
            if (op[0] == 'select') {
                countSelect++;
                if(lastOperations == 'filter'){
                    
                    result = arrays.shift().filter(function (v) {
                            return arrays.every(function (a) {
                                return a.indexOf(v) !== -1;
                            });
                        });
                    if(result.length != 0){
                           filtFields[lastProperty] = result;
                    }
                }
               
                    arraysSelect.push(op[1]);
                
//                if (selFields.length == 0) {
//                
//                selFields = op[1];
//            } else {
//                for (let s of selFields) {
//                    
//                    for (let o of op[1]) {
//
//                        if (s == o) {
//                            
//                            newSelFields.push(s);
//
//                        }
//                    }
//                    
//                    
//
//                }
//                selFields = newSelFields;
//                newSelFields = [];
//
//            }
                lastOperations = op[0];
                lastProperty = op[1];
            } else if (op[0] == 'filter') {
                countFilter++;
                lastOperations = op[0];
                if(Object.keys(filter).length == 0){
                
                   
                    
                        filter[op[1]] = op[2];
                    lastProperty = op[1];
                    //filtFields[op[1]] = op[2];
                    arrays.push(filter[lastProperty]);
                    if(countOper == operations.length){
                        filtFields[lastProperty] = op[2];
                    }
                    
                }
                
               else if (Object.keys(filter).length >= 1) {
                    if(lastProperty!= op[1]){
                         if(countOper == operations.length){
                           
                             arrays.push(op[2]);
                    result = arrays.shift().filter(function (v) {
                            return arrays.every(function (a) {
                                return a.indexOf(v) !== -1;
                            });
                        });
                             if(result.length != 0){
                             filtFields[lastProperty] = result;
                             }
                             
                             if(arrays.length == 1){
                                 filtFields[lastProperty] == arrays[0];
                             }
                             else{
                           filtFields[op[1]] = op[2];
                             }
                       }
                        else{
                            if(arrays.length > 1){
                        result = arrays.shift().filter(function (v) {
                            return arrays.every(function (a) {
                                return a.indexOf(v) !== -1;
                            });
                        });
                            if(result.length != 0){
                           filtFields[lastProperty] = result;
                              }
                            }
                            else{
                                filtFields[lastProperty] = arrays[0];
                            }
                        //filtFields[lastProperty] = result;
                        //filtFields[lastProperty] = filter[lastProperty];
                        //filter = {};
                        filter[op[1]] = op[2];
                    lastProperty = op[1];
                        arrays = [];
                        arrays.push(filter[lastProperty]);
                    }
                    }
                   else if(lastProperty == op[1]){
                       if(operations.length == countOper){
                           arrays.push(op[2]);
                           result = arrays.shift().filter(function (v) {
                            return arrays.every(function (a) {
                                return a.indexOf(v) !== -1;
                            });
                        });
                           if(result.length != 0){
                           filtFields[op[1]] = result;
                              }
                       }
                       
                       else{
                       arrays.push(op[2]);
                       }
                   }
                   
                  
                   
                   
               
                    
                    
                    
                
            
           }
        }
            
            
    
        
    }

       }
    
    
    
    //console.log(filtFields)
    //console.log(operations)
    if(Object.keys(filtFields).length == 0 && countFilter > 0){
        newCol = [];
    }
    else if(Object.keys(filtFields).length != 0){
    for (let key in filtFields) {
        
       
            fil(newCol, key, filtFields[key]); 
    }
    }
    
    
    
 if(countSelect > 1){
                
                    result = arraysSelect.shift().filter(function (v) {
                            return arraysSelect.every(function (a) {
                                return a.indexOf(v) !== -1;
                            });
                        });
                    if(result.length != 0){
                           selFields = result;
                    }
                
                
                }
                else if (countSelect == 1){
                    selFields = lastProperty;
                }
    if(countSelect > 0){
    sel(newCol, selFields);
    }

    

    return newCol;

}

/**
 * @params {String[]}
 */
function select() {

    let fields = Object.values(arguments);


    return ["select", fields];
}

function sel(collection, fields) {
    for (let i = 0; i < collection.length; i++) {
        
        for (let s = 0; s < fields.length; s++) {
            
        
            
            if (fields[s] in collection[i] == false) {
                fields.splice(s, 1);
            }
        }

    }
    for (let i = 0; i < collection.length; i++) {
        if (fields.length == 0) {
            collection.splice(i, 1);
            i--;
        }
        for (let key in collection[i]) {

            if (fields.includes(key) == false) {

                delete collection[i][key];

            }

        }

    }
    return collection;

}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return ["filter", property, values];
}

function fil(collection, property, value) {

    for (let i = 0; i < collection.length; i++) {


        for (key in collection[i]) {

            if (key == property) {

                if (value.indexOf(collection[i][key]) == -1) {

                    collection.splice(i, 1);
                    i--;
                }


            }

        }
    }






    return collection;

}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
