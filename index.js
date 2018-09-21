const ipc = require('node-ipc');

const init = function (cb) {

    ipc.config.id = Math.random() * 1000;
    ipc.config.retry = 1500;

    ipc.connectTo(
        'aCheckinMain',
        function () {
            if (cb) cb({
                on: function (event, fn) {
                    ipc.of.aCheckinMain.on(event, fn)
                },
                emit: function (event, data) {
                    ipc.of.aCheckinMain.emit(event, data);
                }
            })
        }
    );
}

const initPromise = function () {
    return new Promise(function (resolve, reject) {
        init(function ({on, emit}) {
            resolve({
                on,
                openDoor: function(doorNumber){
                    emit("request-open-door", doorNumber)
                },
                closeDoor: function (doorNumber) {
                    emit("request-close-door", doorNumber)
                }
            });
        })
    });
}

initPromise().then(function ({ on, emit }) {
    on(
        'open-door',  //any event or message type your server listens for
        function (data) {
            ipc.log('got a message from world : '.debug, data);
        }
    );
})

module.exports = initPromise;