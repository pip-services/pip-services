"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EchoCommandSet_1 = require("./EchoCommandSet");
class EchoController {
    constructor() { }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new EchoCommandSet_1.EchoCommandSet(this);
        }
        return this._commandSet;
    }
    greetings(name, callback) {
        callback(null, "Hello, " + (name || "Pip User") + "!");
    }
}
exports.EchoController = EchoController;
//# sourceMappingURL=EchoController.js.map