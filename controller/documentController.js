/**
 * Created by houssam on 17/02/18.
 */
var mongoose = require('mongoose');
var uristring = process.env.MONGODB_URI || 'mongodb://localhost/HelloMongoose';
var Document = require('../schema/documentSchema'); // this sets module.exports.documentModel

var controllers = controllers || {};

controllers.DocumentController = {

    Initialize : function(app){
        app.post('/api/save', function(request, response) {

            // TODO eventually call security to authorize api client

            var result;
            // create connection
            mongoose.connect(uristring);
            // get mongoose.connection
            var connection = mongoose.connection;
            connection.on('error', console.error.bind(console, 'connection error:'));

            // save to MONGO
            var documentModel = new Document ({
                userId: request.body.userId,
                filename: request.body.filename,
                bytes: request.body.data,
                createDateTime: new Date()
            });

            connection.once('open', function() {
                // we're connected!
                documentModel.save(function (err, document) {
                    if (err) result = ('Error on save!');
                    else {
                        result = {
                            "message": 'Save successful',
                            "data": {
                                "_id" : document._id
                            }
                        };
                    }
                    connection.close();
                    response.send(result);
                });
            });
        });

        app.get('/api/findall', function(request, response) {

            // TODO eventually call security to authorize api client

            var result;
            // create connection
            mongoose.connect(uristring);
            // get mongoose.connection
            var connection = mongoose.connection;
            connection.on('error', console.error.bind(console, 'connection error:'));
            connection.once('open', function() {
                // we're connected!
                Document.find(function(err, documents){
                    result = documents;
                    connection.close();
                    response.send(result);
                });
            });
        });

        app.get('/api/find/:filename', function(request, response) {

            // TODO eventually call security to authorize api client

            var result;
            // create connection
            mongoose.connect(uristring);
            // get mongoose.connection
            var connection = mongoose.connection;
            connection.on('error', console.error.bind(console, 'connection error:'));
            connection.once('open', function() {
                // we're connected!
                Document.find({ filename: request.param("filename") }, function(err, document){
                    result = document;
                    connection.close();
                    response.send(result);
                });
            });
        });
    }
};

module.exports = controllers;