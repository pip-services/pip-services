"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
class EchoCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeGreetingsCommand());
    }
    makeGreetingsCommand() {
        return new pip_services_commons_node_2.Command('greetings', new pip_services_commons_node_3.ObjectSchema(true)
            .withOptionalProperty('name', pip_services_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let name = args.getAsNullableString('name');
            this._controller.greetings(name, callback);
        });
    }
}
exports.EchoCommandSet = EchoCommandSet;
//# sourceMappingURL=EchoCommandSet.js.map