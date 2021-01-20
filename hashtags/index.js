/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var tagList = tweet.split(" ");
    var tegs = tagList.filter(teg => teg.charAt(0)=="#");
    var newMass = tegs.map(el => el.slice(1));
    return newMass;

};
