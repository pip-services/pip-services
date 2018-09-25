"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
const EchoServiceFactory_1 = require("../build/EchoServiceFactory");
class EchoProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super('echo', 'Echo microservice');
        this._factories.add(new EchoServiceFactory_1.EchoServiceFactory());
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory());
    }
}
exports.EchoProcess = EchoProcess;
//# sourceMappingURL=EchoProcess.js.map