function addDays(days){
    var res = new Date(Date.now());
    res.setDate(res.getDate() + days);
    return res;
}
 module.exports = {addDays}