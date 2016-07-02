# Pip.Services Configuration Guide

All microservices from Pip.Services irrelevant to it's implementation language
support identical configuration mechanism. When microservice runs it reads configuration
from provided JSON or YAML configuration file and use it as a recipe to instantiate
and configure components. 

The configuration allows to specify microservice behavioral parameters, type and connection
to persistent storage, connections to other microservices and infrastructural services,
include various addons to enhance microservice with additional features.

## Structure of Configuration File

Content of configuration file is represented as hierarchical object structure.
At the top level it is broken down into individual configuration sections:

- [**factories**](#factories) – component factories
- [**discovery**](#discovery) - service discovery configuration section
- [**config**](#config) – configurator configuration section (only used by in distributed configuration scenarios)
- [**logs**](#logs) – logger configuration section
- [**counters**](#counters) – performance counters configuration section
- [**cache**](#cache) - data cache configurations section
- [**persistence**](#persistence) – data access configuration section
- [**clients**](#clients) – configuration section for external client dependencies
- [**controllers**](#controllers) – business logic controller configuration section
- [**decorators**](#decorators) - custom business logic decorators configuration section
- [**services**](#services) – configuration section for external endpoints (apis)
- [**addons**](#addons) – configuration section for additional components

Each configuration section may contain a single or an array of component configurations.
Component configuration has the following structure:

- **descriptor** - component descriptor used to locate component factory
  - **group** – logical group the component belongs to
  - **type** – type of the physical implementation, such as: memory, file, mongodb, mysql, etc.
  - **version** - compatibility version if applicable
- **connection** - database or service connection properties
  - **uri** - connection uri
  - **host** - host name
  - **port** - port name
  - **user** - user name
  - **password** - user password
  - **...** - custom properties
- **endpoint** or **endpoints** - service endpoint properties
  - **discover** - service name to lookup at discovery service
  - **host** - host name
  - **port** - port name
  - **user** - user name
  - **password** - user password
  - **...** - custom properties
- **options** - component custom configuration properties
  - **...** - custom properties  

## <a name="factories"></a> Factories

Typical microservice already has default configuration factory that is used to create microservice components. 
However, if you need to add components other then predefined you need to include component factory to the configuration.

TBD

## <a name="discovery"></a> Discovery

TBD...

## <a name="config"></a> Config

In certain situations is it better to keep component configurations in centralized configuration repository
and retrieve the latest configuration during microservice bootstrap process. **Config** section is optional.
It may contain configuration of **ConfigReader** component. It reads configuration from the external repository.

The configuration is located in configuration repository by unique key. After retrival, it is added (or replaces) 
the initial configuration and bootstrap process continues.

Example to retrieve microservice configuration remote repository by key 'pip-services-xyz':
```javascript
{
    "config": {
        "type": "remote",
        "transport": {
            "type": "rest",
            "host": "config.mydomain.com",
            "port": "8020"
        },
        "key": "pip-services-xyz" // Microservice config key
    } 
    ...
}
```

This is an optional section and can be omitted in the configuration.

## <a name="log"></a> Log

The **Log** section defines configuration of the microservice logger component. 
Based on the needs of the application,  logging can be configured to support different logging mechanisms:
- **null**: disable logging completely 
- **console**: log output to the console
- **file**: log output to a file
- **remote**: logs output to a centralized remote location.

The logging level is also configurable, which will allow output of more or less detailed logs.

Example to disable log:
```javascript
{
    ...
    "log": {
        "type": "null" // Disable log
    } 
    ...
}
```

Example to output detailed logs to console:
```javascript
{
    ...
    "log": {
        "type": "console",
        "level": 5  // All except trace
    } 
    ...
}
```
 
Example to send logs to remote logging server 
```javascript
{
    ...
    "log": {
        "type": "remote",
        "transport": {
            "type": "rest",
            "host": "log.mydomain.com",
            "port": "8021"
        },
        "level": 3 // Only fatal, error and warn
    } 
    ...
}
```

This is an optional section and can be omitted in the configuration.

## <a name="counters"></a> Counters

The **Counters** section defines configuration of the microservice performance counters component. 
Based on the needs of the application, performances counters can be configured to output to different locations:
- **null**: disable performance counters completely
- **log**: output performance counters to a log
- **remote**: output performance counters to a remote monitoring service

Example to disable counters:
```javascript
{
    ...
    "counters": {
        "type": "null" // Disable counters
    } 
    ...
}
```

Example to output counters to log:
```javascript
{
    ...
    "counters": {
        "type": "log"
    } 
    ...
}
```
 
Example to send performance metrics to remote server 
```javascript
{
    ...
    "counters": {
        "type": "remote",
        "transport": {
            "type": "rest",
            "host": "log.mydomain.com",
            "port": "8022"
        }
    } 
    ...
}
```

This is an optional section and can be omitted in the configuration.

## <a name="db"></a> Db

The **Db** section defines configuration of the microservice data access component. The current microservices support 
two types of persistence: flat files or MongoDB. Flat files are great for development and testing, 
while MongoDB is a good option with outstanding performance and scalability, suitable for demanding production installations. 
You can choose and configure the option that suits your needs.

### <a name="db_file"></a> File

Flat file persistence has the following configuration properties:
- type: 'file' - type that designates flat file persistence
- path: string - file path where data is stored. The object are written into the file in JSON format.
- data: Object[] - (optional) array of data objects which is used to initialize the dataset. This option is only used in testing to set a known state on test start.

Example:
```javascript
{
    ...
    "db": {
        "type": "file",
        "path": "xyz.json",
        "data": []
    }
    ...
}
```

### <a name="db_mongodb"></a> MongoDB

MongoDB persistence has the following configuration properties:
- type: 'mongodb' - type that designates mongodb persistence
- uri: string - MongoDB connection uri formatted as: 'mongodb://[&lt;user&gt;[:&lt;password&gt;]]&lt;host&gt;[:&lt;port&gt;]/&lt;database&gt;' 
- options: object - (optional) MongoDB connection options. See: http://mongoosejs.com/docs/connections.html for more details.
- debug: boolean - (optional) Enables or disables connection debugging

Example:
```javascript
{
    ...
    "db": {
        "type": "mongodb",
        "uri": "mongodb://localhost/pipservicestest",
        "options": {
            "server": {
                "poolSize": 4,
                "socketOptions": {
                    "keepAlive": 1,
                    "connectTimeoutMS": 5000
                },
                "auto_reconnect": true
            }
        },
        "debug": false        
    }
    ...
}
```

## <a name="deps"></a> Deps

The **Deps** section defines configuration of the client dependencies to external microservices. 
However, if microservice doesn't have any dependencies this section should be omitted entirely or kept empty.

This is an optional section and can be omitted in the configuration.

## <a name="ctrl"></a> Ctrl

The **Ctrl** section defines configuration of the microservice business logic controller. 
Based on the needs of the application, this section gives the ability to replace 
the standard business logic controller with a custom implementation.

This is an optional section and can be omitted in the configuration.

## <a name="ints"></a> Ints

The Ints section defines configuration of custom interceptors to the microservice business logic. They decorate the controller 
and modify its behavior by intercepting calls before and after the invocation. 

This is an optional section and can be omitted in the configuration.

## <a name="api"></a> Api

The **Api** section defines configuration of the microservice services (also called endpoints) to provide API for the consumers. 
Each microservice can expose multiple APIs (HTTP/REST or Seneca) and multiple versions of the same API type.
At least one API service is required for the microservice to initialize successfully.

### <a name="api_rest"></a> Rest

HTTP/REST API has the following configuration properties:
- type: 'rest' - type that designates HTTP/REST API
- version: int - API version (default is 1). Currently only version 1 is supported
- transport: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

A detailed description of HTTP/REST protocol version 1 can be found [here](RestProtocolV1.md)

Example:
```javascript
{
    ...
    "api": [
        ...
        {
            "type": "rest",
            "version": 1,
            "transport": {
                "type": "http",
                "host": "localhost",
                "port": 8002
            }
        }
        ...
    ]
    ...
}
```

### <a name="api_seneca"></a> Seneca

Seneca API for Node.js has the following configuration properties:
- type: 'seneca' - type that designates Seneca API
- version: int - API version (default is 1). Currently only version 1 is supported
- transport: object - Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

A detail description of Seneca protocol version 1 can be found [here](SenecaProtocolV1.md)

Example:
```javascript
{
    ...
    "api": [
        ...
        {
            "type": "seneca",
            "transport": {
                "type": "tcp",
                "host": "localhost",
                "port": 8802
            }
        }
        ...
    ]
    ...
}
```

## <a name="addons"></a> Addons

The **Addons** section defines configuration of optional addon components. 
Addon components can help to register new servers on microservice start, 
send microservice usage stats to the Pip.Services team, or do accomplish custom tasks 
that go beyond the standard microservice architecture.

This is an optional section and can be omitted in the configuration.
