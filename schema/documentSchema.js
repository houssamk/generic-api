/**
 * Created by houssam on 30/01/18.
 * this should run once on ap start up
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var documentSchema = new Schema({
    userId: String,
    filename: String,
    data: String,
    createDateTime: Date
});

module.exports = mongoose.model('documents', documentSchema);