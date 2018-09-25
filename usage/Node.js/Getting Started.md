# Pip.Services Getting Started Guide Node.js

Данный **Getting Started Guide** предназначен для тех, кто хочет создать легковесный микросеврис **менее чем за 30 минут**.

Для этого идеально подойдет **Pip.Services Toolkit**. При этом **не является обходимым предварительное знакомство** с данной технологией. 

В данном руководстве описано создание микросервиса на **Node.js.** 

Симметричные инструкции создания микросервисов на других платформах:
 * [.Net Core]()
 * [Java]()
 * [Python]()

### Пререквизиты

Необходимо установить [Node.js](https://nodejs.org/en/download/) и после этого запустить следующее:
```bash
npm install typescript -g
```

## Шаг №1: создание стурктуры проета и описание корневых файлов

Предлагается следующая структура проекта:
```
-|bin
-|config
-|src
--|build
--|container
--|logic
--|services
-|package.json
-|tsconfig.json
```

Значения данных папок будут раскрываться в ходе прохождения данного руководства. Все папки будут заполняться соответствующими файлами с кодом.

В первом шаге предоставляется содержание корневых файлов **pakcage.json** и **tsconfig.json**. 

**package.json**

```json
{
  "name": "echo-service",
  "version": "1.0.0",
  "main": "./obj/src/index.js",
  "typings": "./obj/src/index.d.ts",
  "scripts": {
  },
  "dependencies": {
    "pip-services-commons-node": "^3.0.*",
    "pip-services-components-node": "^3.0.*",
    "pip-services-container-node": "3.0.*",
    "pip-services-data-node": "^3.0.*",
    "pip-services-rpc-node": "^3.0.*"
  },
  "devDependencies": {
    "@types/async": "^2.0.49",
    "@types/lodash": "^4.14.109",
    "@types/node": "^10.3.0"
  }
}
```

**tsconfig.json**

```json
{
    "compilerOptions": {
        "declaration": true,
        "module": "commonjs",
        "target": "es6",
        "noImplicitAny": false,
        "outDir": "obj",
        "rootDir": ".",
        "sourceMap": true
    },
    "exclude": [
        "node_modules",
        "obj"
    ]
}
```

Далее необходимо установить пакеты. Запустим из корня проекта:
```bash
npm install
```

## Шаг №2: создание контроллера

В папке logic необходимо создать три файла: 
```
-|src
--|logic
---|IEchoController.ts
---|EchoController.ts
---|index.ts
```

В соответствующих файлах описаны интерфейс и логика контроллера:

**IEchoController.ts**
```typescript
export interface IEchoController {
    greetings(name: string, callback: (err: any, result: string) => void): void;
}
```

**EchoController.ts**
```typescript
import { IEchoController } from './IEchoController';

export class EchoController implements IEchoController {

    public constructor() { }

    public greetings(name: string, callback: (err: any, result: string) => void): void
    {
        callback(null, "Hello, " + (name || "Pip User") + "!");
    }
}
```

Далле необходимо экспортировать контроллер и интерфейс:

**index.ts**
```typescript
export { IEchoController } from './IEchoController';
export { EchoController } from './EchoController';
```

## Шаг №2: создание REST-сервиса

В папке services необходимо создать файлы:
```
-|src
--|services
---|EchoHttpService.ts
---|index.ts
```

Добавить такой код в **EchoHttpService.ts**:

```typescript
import { CommandableHttpService } from 'pip-services-rpc-node';
import { Descriptor } from 'pip-services-commons-node';

export class EchoHttpService extends CommandableHttpService {
    public constructor() {
        super('/echo');
        this._dependencyResolver.put('controller', new Descriptor('echo', 'controller', '*', '*', '1.0'));
    }
}
```

И соответсвенно экспортировать REST-сервис:

**index.ts**
```typescript
export { EchoHttpServiceV1 } from './EchoHttpService';
```

Также в папке logic необходимо создать файл:
```
-|src
--|logic
---|EchoCommandSet.ts
```

В данном файле необходимо описать набор команд:

```typescript
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
```

Далее необходимо обновить контроллер:

**EchoController.ts**

```typescript
// Импортировать необходимые ресурсы
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { EchoCommandSet } from './EchoCommandSet';
import { IEchoController } from './IEchoController';

// Добавить интерфейс
export class EchoController implements IEchoController, ICommandable {

    // Добавить переменную
    private _commandSet: EchoCommandSet;

    public constructor() { }

    // Добавить метод необходимый для реализации интерфейса
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
```

Также необходимо обновить **index.ts** в папке logic:

```typescript
export { IEchoController } from './IEchoController';
export { EchoController } from './EchoController';
export { EchoCommandSet } from './EchoCommandSet';
```

## Шаг №3: создание фабрики, контейнера для процесса и конфигурационного файла

В папке build необходимо создать два файла:

```
-|src
--|build
---|EchoServiceFactory.ts
---|index.ts
```

В соответствующем файле необходимо описать фабрику:

**EchoServiceFactory.ts**
```typescript
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
```

Далее экспортирорвать фабрику:

**index.ts**
```typescript
export { EchoServiceFactory } from './EchoServiceFactory';
```

В папке container необходимо создать файлы:

```
-|src
--|container
---|EchoProcess.ts
---|index.ts
```

В файле **EchoProcess.ts** описывается контейнер для процесса:

```typescript
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

import {EchoServiceFactory} from '../build/EchoServiceFactory';

export class EchoProcess extends ProcessContainer{
    public constructor(){
        super('echo', 'Echo microservice');

        this._factories.add(new EchoServiceFactory());
        this._factories.add(new DefaultRpcFactory());
    }
}
```

Далее необходимо экспортировать контейнер:

**index.ts**

```typescript
export { EchoProcess } from './EchoProcess';
```

Для конфигурации микросервиса необходимо в папке config создать файл config.yml:

```
-|src
--|config
---|config.yml
```

Подробное описание того, как нужно конфигурировать микросервисы можно найти по [ссылке](https://github.com/pip-services/pip-services/blob/master/usage/Configuration.md), а для работы описанного микросервиса можно применить следующие конфигурации: 

```yaml
---
# Container descriptor
- descriptor: "pip-services:context-info:default:default:1.0"
  name: "echo"
  description: "Echo microservice"

# Console logger
- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

# Perfomance counter that post values to log
- descriptor: "pip-services:counters:log:default:1.0"

# Controller
- descriptor: "echo:controller:default:default:1.0"

# Shared HTTP Endpoint
- descriptor: "pip-services:endpoint:http:default:1.0"
  connection:
    protocol: http
    host: 0.0.0.0
    port: 8080

# HTTP Service V1
- descriptor: "echo:service:http:default:1.0"

# Hearbeat service
- descriptor: "pip-services:heartbeat-service:http:default:1.0"

# Status service
- descriptor: "pip-services:status-service:http:default:1.0"
```

## Шаг №3: запуск микросервиса

В папке src необходимо создать **index.ts** для экспорта всего кода:

```
-|src
--|index.ts
```

С таким содержанием:

```typescript
export * from './logic';
export * from './services';
export * from './container';
export * from './build';
```

Далее запускаем typescript компилятор из корня проекта:
```bash
tsc
```
Как результат в корне проекта появится папка **obj**.

Далее в папке bin файл **run.js** описываем код для запуска микросервиса:

**run.js**

```javascript
let EchoProcess = require('../obj/src/container/EchoProcess').EchoProcess

try {
    new EchoProcess().run(process.argv);
} catch(ex) {
    console.error(ex);
}
```

Для запуска микросервиса необходимо использовать следующую команду:
```bash
node ./bin/run.js
```

В консоле как результат будут выведены следующие логи:

```bash
[echo:INFO:2018-09-25T15:15:30.284Z] Press Control-C to stop the microservice...
[echo:DEBUG:2018-09-25T15:15:30.542Z] Opened REST service at http://0.0.0.0:8080
[echo:INFO:2018-09-25T15:15:30.542Z] Container echo started.
```

Для проверки сделаем следующие запросы:
* http://localhost:8080/echo/greetings без тела запроса и в ответ получим: "Hello, Pip User!",
* http://localhost:8080/echo/greetings с телом запроса  
```json
{
	"name": "Alex"
}
```
и в ответ получим "Hello, Alex!".

Надеемся Вам понравилось данное руководство по созданию легковесного микросервиса с использованием Pip.Services на основе Node.js.

Счастливой разработки микросервисов!