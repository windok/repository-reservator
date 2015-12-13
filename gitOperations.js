var Promise = require('promise');
var exec = require('child_process').exec;
var colors = require('colors');

var pull = function (path) {
    return new Promise(function (resolve, reject) {
        exec('git -C ' + path + ' pull --all', function (error, stdout, stderr) {
            if (error) {
                console.log(path, error.message.red);
                reject(error, stderr)
            } else {
                console.log(path + ' repository pulled'.green);
                resolve(stdout);
            }

        })
    });
};

var push = function (path, remote) {
    return new Promise(function (resolve, reject) {
        exec('git -C ' + path + ' push --all ' + remote, function (error, stdout, stderr) {
            if (error) {
                console.log(path, error.message.red);
                reject(error, stderr)
            } else {
                console.log(path + ' repository pushed'.green);
                resolve(stdout);
            }

        })
    });
};

module.exports = function (path, remote) {
    return pull(path).then(function (stdout) {
        return push(path, remote);
    }).then();
};

