import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';

import { IEchoController } from './IEchoController';

export class EchoCommandSet extends CommandSet {
    private _controller: IEchoController;

    constructor(controller: IEchoController) {
        super();

        this._controller = controller;

        this.addCommand(this.makeGreetingsCommand());
    }

    private makeGreetingsCommand(): ICommand {
        return new Command(
            'greetings',
            new ObjectSchema(true)
                .withOptionalProperty('name', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let name = args.getAsNullableString('name');
                this._controller.greetings(name, callback);
            }
        );
    }

}