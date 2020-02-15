const debugMode = true;

export default {
    assert: function (test, message) {
        if (!test) {
            if (debugMode) {
                alert(message);
                console.log(message);
            }
            throw message;
        }
    },
    log: function (message) {
        if (debugMode) {
            console.log(message);
        }
    }
}