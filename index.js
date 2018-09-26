const openDoor = function (doorCode) {
    process.send({
        event: 'request-open-door',
        data: doorCode
    });
}

const closeDoor = function (doorCode) {
    process.send({
        event: 'request-close-door',
        data: doorCode
    });
}

module.exports = {
    openDoor,
    closeDoor
};