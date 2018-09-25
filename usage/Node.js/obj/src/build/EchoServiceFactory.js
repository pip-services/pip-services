"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const EchoController_1 = require("../../src/logic/EchoController");
const EchoHttpService_1 = require("../../src/services/EchoHttpService");
class EchoServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EchoServiceFactory.ControllerDescriptor, EchoController_1.EchoController);
        this.registerAsType(EchoServiceFactory.HttpServiceV1Descriptor, EchoHttpService_1.EchoHttpService);
    }
}
EchoServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor('echo', 'controller', 'default', '*', '1.0');
EchoServiceFactory.HttpServiceV1Descriptor = new pip_services_commons_node_1.Descriptor('echo', 'service', 'http', '*', '1.0');
exports.EchoServiceFactory = EchoServiceFactory;
//# sourceMappingURL=EchoServiceFactory.js.map