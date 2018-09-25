let EchoProcess = require('../obj/src/container/EchoProcess').EchoProcess;

try {
    new EchoProcess().run(process.argv);
} catch(ex) {
    console.error(ex);
}