/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
function writeHeader(name, value) {
    return function(req, res, next) {
        res.setHeader(name, value);
        next();
    };
}
module.exports = writeHeader;