import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { EchoCommandSet } from './EchoCommandSet';
import { IEchoController } from './IEchoController';

export class EchoController implements IEchoController, ICommandable {
    private _commandSet: EchoCommandSet;

    public constructor() { }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new EchoCommandSet(this);
        }

        return this._commandSet;
    }

    public greetings(name: string, callback: (err: any, result: string) => void): void
    {
        callback(null, "Hello, " + (name || "Pip User") + "!");
    }
}