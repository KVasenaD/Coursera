/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    var newArr = hashtags.map(el => el.toLowerCase());

    for(var i = 0; i < newArr.length; i++){
        for(var j = 0; j < newArr.length; j++){
            if (newArr[i] === newArr[j] && i!=j){
                var x = newArr.splice(j, 1);

            }

        }

    }
    var str = newArr.join(", ");
    return str;
};
