import { CommandableHttpService } from 'pip-services-rpc-node';
import { Descriptor } from 'pip-services-commons-node';

export class EchoHttpService extends CommandableHttpService {
    public constructor() {
        super('/echo');
        this._dependencyResolver.put('controller', new Descriptor('echo', 'controller', '*', '*', '1.0'));
    }
}