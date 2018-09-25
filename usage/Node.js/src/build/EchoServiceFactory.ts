import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { EchoController } from '../../src/logic/EchoController';
import { EchoHttpService } from '../../src/services/EchoHttpService';

export class EchoServiceFactory extends Factory{
    public static ControllerDescriptor = new Descriptor('echo', 'controller', 'default', '*', '1.0');
    public static HttpServiceV1Descriptor = new Descriptor('echo', 'service', 'http', '*', '1.0');
    
    constructor(){
        super();

        this.registerAsType(EchoServiceFactory.ControllerDescriptor, EchoController);
        this.registerAsType(EchoServiceFactory.HttpServiceV1Descriptor, EchoHttpService);
    }
}