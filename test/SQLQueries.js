
let db = new sqlite3.Database('./ClientAccountsDatabase.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});
var queries = require('../SQLQueries');
var expect = require('chai').expect;

describe('Testing createAccount()', function() {
    context('with UserID: 300 and balance:R0', function() {
        it('should  return true:', function(done) {
            var userID='300';
                app.post('/create/:userID', function (req, res) {
                    queries.createAccount(req.params.userID,function(amount){
                        res.end(amount);
                    });
                });
                    if (err) done(err);
                    else done();
                });
            });
    });

describe('Testing createAccount()', function() {
    context('with UserID: 400 and balance:R3000', function() {
        it('should  return correct accounts:', function(done) {
            var userID='400';
            var balance=3000;
            app.post('/createWDepo/:userID/:amount', function (req, res) {
                queries.createAccount(req.params.userID, req.params.amount,function(amount){
                    res.end(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});

describe('Testing selectBalance()', function() {
    context('with accountID: ?', function() {//todo get correct ID
        it('should  return correct accounts:', function(done) {
            var accountID='?';
            app.get('/balance/:accountID', function (req, res) {
                queries.selectBalance(req.params.accountID,function(amount){
                    res.end(JSON.stringify((amount)));
                });
            });
            if (err) done(err);
            else done();
        });
    });
});


describe('Testing getAccountType()', function() {
    context('with accountID: ?', function() {//todo get correct ID
        it('should  return correct account type:', function(done) {
            var accountID='?';
            app.get('/accountType/:accountID', function (req, res) {
                queries.selectAccountType(req.params.accountID,function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});



describe('Testing getAccounts()', function() {
    context('with userID: 400', function() {
        it('should  return correct accounts:', function(done) {
            var userID='400';
            app.get('/getAccounts/:userID', function (req, res) {
                queries.getAccounts(req.params.userID,function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});


describe('Testing printMini()', function() {
    context('with accountID: ?', function() { //todo get correct ID
        it('should  return correct statement:', function(done) {
            var accountID='?';
            app.get('/printMini/:accountID', function (req, res) {
                queries.printMini(req.params.accID, function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});



describe('Testing deactivateUser()', function() {
    context('with userID: 400', function() {
        it('should  deactivate user through field:', function(done) {
            var userID='400';
            app.get('/printMini/:userID', function (req, res) {
                queries.printMini(req.params.accID, function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});

describe('Testing activateUser()', function() {
    context('with userID: 400', function() {
        it('should  deactivate user through field:', function(done) {
            var userID='400';
            app.put('/deactivate/:userID', function (req, res) {
                queries.deactivateUser(req.params.userID,function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});

describe('Testing deposit()', function() {
    context('with accountID: ? and amount:10000', function() { //todo get correct ID
        it('should  return correct account and balance:', function(done) {
            var accountID='?';
            var amount=10000;
            app.put('/deposit/:accountID/:amount', function (req, res) {
                queries.deposit(req.params.accID, req.params.amount,function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});


describe('Testing withdraw()', function() {
    context('with accountID: ? and amount:10000 where the current balance is insufficient', function() { //todo get correct ID
        it('should  return insufficient funds', function(done) {
            var accountID='?';
            var amount=10000;
            app.put('/deposit/:accountID/:amount', function (req, res) {
                queries.deposit(req.params.accID, req.params.amount,function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});

describe('Testing withdraw()', function() {
    context('with accountID: ? and amount:10000 where the current balance is sufficient', function() { //todo get correct ID
        it('should  return correct account and balance:', function(done) {
            var accountID='?';
            var amount=100;
            app.put('/deposit/:accountID/:amount', function (req, res) {
                queries.deposit(req.params.accID, req.params.amount,function(amount){
                    res.send(amount);
                });
            });
            if (err) done(err);
            else done();
        });
    });
});