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
  - **type** – function type, such as: memory, file, mongodb, mysql, etc.
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
  - **protocol** - connection protocol
  - **host** - host name
  - **port** - port name
  - **user** - user name
  - **password** - user password
  - **...** - custom properties
- **options** - component custom configuration properties
  - **...** - custom properties  

### Component descriptors

Component descriptors are used to identify and locate microservice components
by one or few parameters: component category, logical group, functional type and compatibility version.
Below you can see examples how descriptors are used in microservice configurations.

Define console logger by type (group and version are skipped)
```javascript
{
    ...
    "loggers": {
        "descriptor": {
            "type": "console"
        },
        ...
    }
```

Persistence components specified by group and type (version is skipped)
```javascript
{
    ...
    "persistence": [
        {
            "descriptor": {
                "group": "pip-services-storage-blocks",
                "type": "mongodb"
            },
            ...
        },
        {
            "descriptor": {
                "group": "pip-services-storage-content",
                "type": "aws3"
            },
            ...
        }
    ],
    ...
}
```

Service and client components specified by group, type and version
```javascript
{
    ...
    "clients": {
        "descriptor: {
            "group": "pip-services-storage",
            "type": "seneca",
            "version": "1.0"
        },
        ...
    },
    "services": {
        "descriptor: {
            "group": "pip-services-announces",
            "type": "rest",
            "version": "1.0"
        },
        ...
    },
    ...
}
```

### Example of complete JSON configuration file

```javascript
{    
    "logs": {
        "descriptor": {
            "type": "console"
        },
        "options": {
            "level": 10
        }
    },
    
    "counters": {
        "descriptor": {
            "type": "log"
        },
        "options": {
            "timeout": 10000
        }
    },

    "persistence": {
        "descriptor": {
            "group": "pip-services-announces",            
            "type": "mongodb"
        },
        "connection": {
            "uri": "mongodb://localhost/pipservicestest"
        },
        "options": {
            "server": {
                "poolSize": 4,
                "socketOptions": {
                    "keepAlive": 1,
                    "connectTimeoutMS": 5000
                },
                "auto_reconnect": true
            },
            "debug": false        
        }
    },

    "controllers": {
        "descriptor": {
            "group": "pip-services-announces"            
        },
        "options": {
            "maxTagCount": 1000
        }
    },

    "clients": [
        {
            "descriptor": {
                "group": "pip-services-storage",            
                "type": "rest",
                "version": "1.0"
            },
            "endpoint": {
                "type": "http",
                "host": "localhost",
                "port": 8010
            }
        }
    ],

    "services": [
        {
            "descriptor": {
                "group": "pip-services-announces",            
                "type": "seneca",
                "version": "1.0"
            },
            "endpoint": {
                "type": "tcp",
                "host": "localhost",
                "port": 8811
            }
        },
        {
            "descriptor": {
                "group": "pip-services-announces",            
                "type": "rest",
                "version": "1.0"
            },
            "endpoint": {
                "type": "http",
                "host": "localhost",
                "port": 8011
            }
        }
    ]    
}
``` 

## <a name="factories"></a> Factories

Typical microservice already has default configuration factory that is used to create microservice components. 
However, if you need to add components other then predefined you need to include component factory to the configuration.

TBD

## <a name="discovery"></a> Discovery

Service discovery allows to register microservice endpoints in remote discovery service and then
resolve them for connecting clients. That mechanism becomes critical for large-scale systems to implement
client discovery mechanisms.

TBD...

## <a name="config"></a> Config

In certain situations is it better to keep component configurations in centralized configuration repository
and retrieve the latest configuration during microservice bootstrap process. **Config** section is optional.
It may contain configuration of a **ConfigReader** component to retrieve configuration from the external repository.

The configuration is located in configuration repository by unique key. After retrival, it is added (or replaces) 
the initial configuration and bootstrap process continues.

### <a name="config-file"></a> File Config

The simplest configuration component that reads configuration from external file.

- **descriptor**
  - **group**: "pip-services-runtime-config"
  - **type**: "file"
  - **version**: "*"
- **options**
  - **path**: string - path to the configuration file

### <a name="config-remote"></a> REST Config

The configuration component that reads configuration from distributed configuration
repository implemented by [pip-services-config](https://github.com/pip-services/pip-services-config) microservice

- **descriptor**
  - **group**: "pip-services-runtime-config"
  - **type**: "rest"
  - **version**: "1.0"
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol. Supported protocols: http or https
  - **host** - host name
  - **port** - port name
- **options**
  - **key** - unique key of microservice config to be retrieved

## <a name="logs"></a> Logs

Logs section defines logger components that capture log output from other microservice components
that can be used for monitoring and troubleshooting. Microservice may contain more then one logger.

Loggers are able to filter output messages using log level
- **fatal** - outputs only critical errors that cause microservice to crash
- **error** - outputs all errors occured in microservice
- **warn** - outputs all errors and warning messages
- **info** - outputs errors, warnings and key information messages
- **debug** - outputs everything, excluding detail traces
- **trace** - outputs everything, including all detail traces

### <a name="logs-null"></a> Null Logs

Logger that doesn't do anything

- **descriptor**
  - **group**: "pip-services-runtime-logs"
  - **type**: "null"
  - **version**: "*"
- **options**
  - **level**: string - log level: fatal, error, warn, info, debug, trace. (Default: error)

### <a name="logs-console"></a> Console Logs

Logger that formats and writes log messages to console. 
Errors go into Stderr stream, while all other messages are wrote to Stdout stream

- **descriptor**
  - **group**: "pip-services-runtime-logs"
  - **type**: "console"
  - **version**: "*"
- **options**
  - **level**: string - log level: fatal, error, warn, info, debug, trace. (Default: error)

### <a name="logs-rest"></a> REST Logs

Logger that sends log messages to distributed log service implemented 
by [pip-services-logging](https://github.com/pip-services/pip-services-logging) microservice

- **descriptor**
  - **group**: "pip-services-runtime-logs"
  - **type**: "console"
  - **version**: "*"
- **options**
  - **level**: string - log level: fatal, error, warn, info, debug, trace. (Default: error)
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol. Supported protocols: http or https
  - **host** - host name
  - **port** - port name

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

## <a name="persistence"></a> Persistence

The **Db** section defines configuration of the microservice data access component. The current microservices support 
two types of persistence: flat files or MongoDB. Flat files are great for development and testing, 
while MongoDB is a good option with outstanding performance and scalability, suitable for demanding production installations. 
You can choose and configure the option that suits your needs.

### <a name="persistence_file"></a> File Persistence

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

### <a name="persistence_mongodb"></a> MongoDB Persistence

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

## <a name="clients"></a> Clients

The **Deps** section defines configuration of the client dependencies to external microservices. 
However, if microservice doesn't have any dependencies this section should be omitted entirely or kept empty.

This is an optional section and can be omitted in the configuration.

## <a name="controllers"></a> Controllers

The **Ctrl** section defines configuration of the microservice business logic controller. 
Based on the needs of the application, this section gives the ability to replace 
the standard business logic controller with a custom implementation.

This is an optional section and can be omitted in the configuration.

## <a name="decorators"></a> Decorators

The Ints section defines configuration of custom interceptors to the microservice business logic. They decorate the controller 
and modify its behavior by intercepting calls before and after the invocation. 

This is an optional section and can be omitted in the configuration.

## <a name="services"></a> Services

The **Api** section defines configuration of the microservice services (also called endpoints) to provide API for the consumers. 
Each microservice can expose multiple APIs (HTTP/REST or Seneca) and multiple versions of the same API type.
At least one API service is required for the microservice to initialize successfully.

### <a name="service_rest"></a> Rest Service

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

### <a name="service_seneca"></a> Seneca

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
