"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
class EchoHttpService extends pip_services_rpc_node_1.CommandableHttpService {
    constructor() {
        super('/echo');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('echo', 'controller', '*', '*', '1.0'));
    }
}
exports.EchoHttpService = EchoHttpService;
//# sourceMappingURL=EchoHttpService.js.map