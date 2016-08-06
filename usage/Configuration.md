# Pip.Services Configuration Guide

All microservices from Pip.Services irrelevant to it's implementation language
support identical configuration mechanism. When microservice runs it reads configuration
from provided YAML or JSON configuration file and use it as a recipe to instantiate
and configure components. 

The configuration allows to specify microservice behavioral parameters, type and connection
to persistent storage, connections to other microservices and infrastructural services,
include various addons to enhance microservice with additional features.

## Structure of Configuration File

Content of configuration file is represented as hierarchical object structure.
At the top level it is broken down into individual configuration sections:

- [**factories**](#factories) – component factories
- [**discovery**](#discovery) - service discovery configuration section
- [**boot**](#boot) – configurator configuration section (only used by in distributed configuration scenarios)
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
  - **type** - connection type
  - **host** - host name
  - **port** - port number
  - **user** - user name
  - **password** - user password
  - **...** - custom properties
- **endpoint** or **endpoints** - service endpoint properties
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol
  - **host** - host name
  - **port** - port number
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
```yaml
  ...
  loggers:
    # Console logger
    - descriptor:
          type: "console"
      ...
```

Persistence components specified by group and type (version is skipped)
```yaml
...
persistence:
  # Storage blocks MondoDB persistence
  - descriptor:
        group: "pip-services-storage-blocks"
        type: "mongodb"
    ...
  # Storage contant AWS S3 persistence
  - descriptor:
        group: "pip-services-storage-content"
        type: "aws3"
    ...
...
```

Service and client components specified by group, type and version
```yaml
...
clients:
    # Storage seneca client v1.0
  - descriptor:
        group: "pip-services-storage"
        type: "seneca"
        version: "1.0"
    ...
services:
    # Announces REST service v1.0 
  - descriptor:
        group: "pip-services-announces"
        type: "rest"
        version: "1.0"
    ...
...
```

### Example of complete YAML configuration file

```yaml
logs:
    # Console logger
  - descriptor:
        type: "console"
    options:
        level: "trace"

counters:
    # Logging performance counters
  - descriptor:
        type: "log"
    options:
        timeout: 10000

persistence:
    # Announces mongodb persistence
  - descriptor:
        group: "pip-services-announces"            
        type: "mongodb"
    connection:
        type: "mongodb"
        host: "localhost"
        database: "pipservicestest"
    options:
        server:
            poolSize: 4
            socketOptions:
                keepAlive: 1
                connectTimeoutMS: 5000
            auto_reconnect: true
        debug: false        

controllers:
    # Announces controller
  - descriptor:
        group: "pip-services-announces"            
    options:
        max_tag_count: 1000

clients:
    # Storage REST client v1.0
  - descriptor:
        group: "pip-services-storage"            
        type: "rest"
        version: "1.0"
    endpoint:
        type: "http"
        host: "localhost"
        port: 8010

services:
  - descriptor:
        group: "pip-services-announces"            
        type: "seneca"
        version: "1.0"
    endpoint:
        type: "tcp"
        host: "localhost"
        port: 8811
  - descriptor:
        group: "pip-services-announces"            
        type: "rest"
        version: "1.0"
    endpoint:
        type: "http"
        host: "localhost"
        port: 8011
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

## <a name="boot"></a> Boot

In certain situations is it better to keep component configurations in centralized configuration repository
and retrieve the latest configuration during microservice bootstrap process. **Boot** section is optional.
It may contain configuration of a **BootConfig** component to retrieve configuration from the external repository.

The configuration is located in configuration repository by unique key. After retrival, it is added (or replaces) 
the initial configuration and bootstrap process continues.

### <a name="boot-file"></a> File Boot Config

The simplest configuration component that reads configuration from external file.

- **descriptor**
  - **group**: "pip-services-runtime-boot"
  - **type**: "file"
  - **version**: "*"
- **options**
  - **path**: string - path to the configuration file

### <a name="boot-remote"></a> REST Boot Config

The configuration component that reads configuration from remove configuration
repository implemented by [pip-services-config](https://github.com/pip-services/pip-services-config) microservice

- **descriptor**
  - **group**: "pip-services-runtime-boot"
  - **type**: "rest"
  - **version**: "1.0"
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol. Supported protocols: http or https
  - **host** - host name
  - **port** - port number
- **options**
  - **key** - unique key of microservice config to be retrieved

## <a name="logs"></a> Logs

Logs section defines logger components that capture log output from other microservice components
to record and use it for monitoring and troubleshooting. Microservice configuration may contain more then one logger.

Loggers are able to filter output messages using log level
- **fatal** - outputs only critical errors that cause microservice to crash
- **error** - outputs all errors occured in microservice
- **warn** - outputs all errors and warning messages
- **info** - outputs errors, warnings and key information messages
- **debug** - outputs everything, excluding detail traces
- **trace** - outputs everything, including all detail traces

### <a name="logs-null"></a> Null Logs

Logger component that doesn't do anything

- **descriptor**
  - **group**: "pip-services-runtime-logs"
  - **type**: "null"
  - **version**: "*"
- **options**
  - **level**: string - log level: fatal, error, warn, info, debug, trace. (Default: error)

### <a name="logs-console"></a> Console Logs

Logger component that writes log messages to console. 
Errors go into Stderr stream, and all other messages are wrote to Stdout stream

- **descriptor**
  - **group**: "pip-services-runtime-logs"
  - **type**: "console"
  - **version**: "*"
- **options**
  - **level**: string - log level: fatal, error, warn, info, debug, trace. (Default: error)

### <a name="logs-rest"></a> REST Logs

Logger component that sends log messages to remote log service implemented 
by [pip-services-logging](https://github.com/pip-services/pip-services-logging) microservice

- **descriptor**
  - **group**: "pip-services-runtime-logs"
  - **type**: "rest"
  - **version**: "*"
- **options**
  - **level**: string - log level: fatal, error, warn, info, debug, trace. (Default: error)
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol. Supported protocols: http or https
  - **host** - host name
  - **port** - port number

## <a name="counters"></a> Counters

Performance counters allow to collect metrics that show non-functional characteristics of microservice performance:
number of calls, call execution time, number of objects in cache, last recorded value or last transaction time and more.

### <a name="counters-null"></a> Null Counters

Performance counters that doesn't do anything

- **descriptor**
  - **group**: "pip-services-runtime-counters"
  - **type**: "null"
  - **version**: "*"

### <a name="counters-log"></a> Log Counters

Performance counters component that periodically dumps performance counters to log.
The output interval is determined by **timeout** configuration parameter

- **descriptor**
  - **group**: "pip-services-runtime-counters"
  - **type**: "log"
  - **version**: "*"
- **options**
  - **timeout**: number - output time interval in milliseconds (default: 60000 msec / 1 min)

### <a name="counters-rest"></a> REST Counters

Performance counters component that sends counter values to remote performance monitoring service 
implemented by [pip-services-counters](https://github.com/pip-services/pip-services-counters) microservice

- **descriptor**
  - **group**: "pip-services-runtime-counters"
  - **type**: "rest"
  - **version**: "*"
- **options**
  - **timeout**: number - output time interval in milliseconds (default: 60000 msec / 1 min)
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol. Supported protocols: http or https
  - **host** - host name
  - **port** - port number

## <a name="cache"></a> Cache

Caching components allow to store data for quick access to avoid slow calls to persistence layer.

All caches have limit to number of stored objects and expiration timeout. After that timeout, or when
cache grows too much cached objects can be disposed. In that case cache returns **null** and business logic
shall retrieve the data from persistence.

If it up to controller implementation to use the cache. When cache is not specified, controller 
will fall back to always use persistence cache.

Remember: using local cache implementations in distributed scenarios will cause hard to cache errors.
Cache is a great performance improvement mechanism, but it shall be used with great caution.

### <a name="cache-null"></a> Null Cache

Cache that doesn't do anything. It always returns **null** like objects are not stored in the cache.

- **descriptor**
  - **group**: "pip-services-runtime-cache"
  - **type**: "null"
  - **version**: "*"

### <a name="cache-memory"></a> In-Memory Cache

Local in-memory cache that can be used in development, testing and non-scalable deployments when only
one microservice instance works.

- **descriptor**
  - **group**: "pip-services-runtime-counters"
  - **type**: "memory"
  - **version**: "*"
- **options**
  - **timeout**: number - expiration time interval in milliseconds (default: 60000 msec / 1 min)
  - **max_size**: number - maximum number of objects stored in the cache (default: 1000)

### <a name="cache-memcached"></a> Memcached Cache

Cache component that stores data in popular [memcached service](https://memcached.org).
Memcached is a proven and highly reliable distributed cache implementation used in many
highly scalable production deployment.

- **descriptor**
  - **group**: "pip-services-runtime-counters"
  - **type**: "memcached"
  - **version**: "*"
- **endpoint** or **endpoints**
  - **uri** - server uri like 'localhost:11211'
- **options**
  - **timeout**: number - expiration time interval in milliseconds (default: 60000 msec / 1 min)
  - **retries**: number - number of retry attempts (default: 2)
  - **failover**: boolean - **true** to enable automatic failover to another service
  - **failover_timeout**: number - timeout in seconds to initiate failover (default: 60)

## <a name="persistence"></a> Persistence

Persistence components implement microservice-specific data access to store and retrieve persistent data.
They may use different storages: flat files, relational or NoSQL databases or specialized services.
Typical persistence components do not contain business logic that modifies persistent data.
But they may perform on-the-fly data conversions from old versions to the current one to ensure 
backward compatibility  and zero data migration.

Please, refer to configuration guide from particular microservice for specific parameters. 

### <a name="persistence_memory"></a> In-Memory Persistence

In-memory persistence is used exclusively during testing to speedup tests and minimize their configuration.

- **descriptor**
  - **group**: string - persistence logical group (refer to microservice documentation)
  - **type**: "memory"
  - **version**: "*"

### <a name="persistence_file"></a> File Persistence

Storing data in flat files is used mostly in development and testing. In some situation is can be used in simple 
microservice deployments. Use it for your own risk since that option doesn't have any failover or redundancy. 

- **descriptor**
  - **group**: string - persistence logical group (refer to microservice documentation)
  - **type**: "file"
  - **version**: "*"
- **options**
  - **path**: string - file path where data is stored
  - **data**: array - initial data (used in testing)

### <a name="persistence_mongodb"></a> MongoDB Persistence

MongoDB is a very popular NoSQL document-oriented database. It is a perfect choice for microservices
since it doesn't require initial schema definition. You can point your microservice to an empty MongoDB database
and it will create all tables on the fly. Horizontal scalability allows to achieve exceptional scale and performance.

- **descriptor**
  - **group**: string - persistence logical group (refer to microservice documentation)
  - **type**: "mongodb"
  - **version**: "*"
- **connection** or **connections**
  - **type** - "mongodb" for now
  - **host** - database host
  - **port** - database port (default: 27017)
  - **username** - username to authenticate
  - **password** - user password to authenticate
- **options**
  - **...** - MongoDB connection options. See: http://mongoosejs.com/docs/connections.html for more details.
  - **debug**: boolean - (optional) Enables or disables connection debugging

## <a name="clients"></a> Clients

Clients components allow microservice business logic to connect to other microservices and call their operations. 
Please, refer to configuration guide from particular microservice for specific parameters. 

### <a name="clients_rest"></a> Direct Client

Connects to microservice hosted within the same microservice container using direct functional call. 

- **descriptor**
  - **group**: string - client logical group (refer to microservice documentation)
  - **type**: "rest"
  - **version**: string - client compatibility version
- **options**
  - **...** - client specific options

### <a name="clients_rest"></a> REST Client

Connects to external microservice via plain HTTP REST API. This is the most interperable synchronous communication 
mechanism, which can be quite slow and may have faster and lighter alternatives. 

- **descriptor**
  - **group**: string - client logical group (refer to microservice documentation)
  - **type**: "rest"
  - **version**: string - client compatibility version
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol. Supported protocols: http or https
  - **host** - host name
  - **port** - port number
- **options**
  - **timeout**: number - communication timeout in milliseconds (default: 30,000)
  - **...** - client specific options

### <a name="clients_lambda"></a> AWS Lambda Client

Connects to external microservice instantiated by AWS Lambda function using Amazon proprietary protocol. 

- **descriptor**
  - **group**: string - client logical group (refer to microservice documentation)
  - **type**: "rest"
  - **version**: string - client compatibility version
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol**: "aws"
  - **region**: string - AWS availability region like "us-east-1"
  - **function**: string - unique function name or arn like "arn:aws:lambda:us-east-1:268549927901:function:pip-services-template-node"
- **options**
  - **access_key_id**: string - AWS access key id
  - **secret_access_key**: string - AWS secret access key
  - **timeout**: number - communication timeout in milliseconds (default: 30,000)
  - **...** - client specific options

### <a name="clients_seneca"></a> Seneca Client

Connects to external microservice via [Seneca.js](http://www.senecajs.org). This communication method
is specific to Node.js clients and services.

- **descriptor**
  - **group**: string - client logical group (refer to microservice documentation)
  - **type**: "seneca"
  - **version**: string - client compatibility version
- **endpoint** or **endpoints**
  - **discover** - service name to lookup at discovery service
  - **protocol** - connection protocol. Supported protocols: tcp,http or https
  - **host** - host name
  - **port** - port number
  - **...** - seneca specific properties (refer to seneca documentation at http://www.senecajs.org)
- **options**
  - **timeout**: number - communication timeout in milliseconds (default: 30,000)
  - **...** - client specific options

## <a name="controllers"></a> Controllers

Controllers components are the central part of any microservice. They handle client requests by implementing specific 
business logic, reading and writing persistent data, calling other microservices and using cache to speedup data access. 
Regular microservice has at least one controller. But some complex microservices may break down logic into multiple controllers. 
Please, refer to configuration guide from particular microservice for specific parameters. 

## <a name="decorators"></a> Decorators

Decorators alter standard controller behavior and inject custom business rules before, after or instead standard operations.
Typical decorators shall intercept and override commands or/and reimplement business logic interface to ensure proper 
call chain from clients to services and then via decorators to controllers. Also, quite often decorators use custom fields
in data objects to store data that is not supported by the original microservice design.

Using decorators usually require adding to component configuration corresponding factories that know how to create
decorators of particular type. 

Decorators are not the standard part of a microservice. If you are the creator of decorators, you are free to implement 
any configuration parameters you need. Otherwise, refer to decorator documentation, source code or contact the author 
to find out their configuration.

## <a name="services"></a> Services

Services expose microservice API to external clients. All services have corresponding clients implemented 
in different programming languages. But microservice users are free to implement communication protocols
and call services directly without client SDK.

It is required that all microservices in Pip.Services library must maintain older versions of released APIs.
In that case, backward-compatible services are responsible to convert data from/to older format and call 
appropriate operation in business logic.

### <a name="services_rest"></a> REST Service

Exponses plain HTTP REST API. This is the most interperable synchronous communication 
mechanism, which can be quite slow and may have faster and lighter alternatives. 

- **descriptor**
  - **group**: string - service logical group (refer to microservice documentation)
  - **type**: "rest"
  - **version**: string - service compatibility version
- **endpoint**
  - **discover** - service name to register at discovery service
  - **protocol** - connection protocol. Supported protocols: http or https
  - **host** - host name (default: '0.0.0.0')
  - **port** - port number
- **options**
  - **connect_timeout**: number - connection timeout in milliseconds (default: 30,000)
  - **request_max_size**: number - maximum size of client requests (default: 1Mb)
  - **...** - service specific options

### <a name="services_seneca"></a> Seneca Service

Exponses API via [Seneca.js](http://www.senecajs.org). This communication method
is specific to Node.js clients and services.

Seneca service required SenecaAddon component. But if user forgets to include it into configuration,
microservices will add it automatically.

- **descriptor**
  - **group**: string - service logical group (refer to microservice documentation)
  - **type**: "seneca"
  - **version**: string - service compatibility version
- **endpoint** -  optional endpoint. It overrides endpoint configuration in SenecaAddon components
  - **discover** - service name to register at discovery service
  - **protocol** - connection protocol. Supported protocols: tcp, http or https
  - **host** - host name
  - **port** - port number
  - **...** - seneca specific properties (refer to seneca documentation at http://www.senecajs.org)
- **options**
  - **...** - service specific options

## <a name="addons"></a> Addons

Addon components are not directly involve in microservice business transactions, but may provide additional functionality.
Few examples of addon components include: Random shutdown (chaos monkey for resiliance testing), Usage metrics, Health status.

You are free to use standard addons or extend microservice functionality with your custom addon components. 
For custom addon components it is require to include into microservice configuration corresponding factory that knows
how to create components of that type.

### <a name="addons_seneca"></a> Seneca Addon

When microservice contains more then one seneca service attempts to create more then one seneca instance may cause conflicts.
To void that problem users shall include into microservice configuration Seneca Addon that keeps reference to seneca instance
and shares it across all seneca services. It usually has configuration of seneca endpoint to keep services from conflicting 
configurations. 

- **descriptor**
  - **group**: "pip-services-runtime-addons"
  - **type**: "seneca"
  - **version**: "*"
- **endpoint** -  optional endpoint. It overrides endpoint configuration in SenecaAddon components
  - **discover** - service name to register at discovery service
  - **protocol** - connection protocol. Supported protocols: tcp, http or https
  - **host** - host name
  - **port** - port number
  - **...** - seneca specific properties (refer to seneca documentation at http://www.senecajs.org)
