# User Experience

One of the key characteristics of Pip.Services library is consistent user experience (UX) which shall not depend 
on microservice implementation details or implementation language.

The overall UX can be defined as the process of working with Pip.Services library. It can be broken down into few steps:

- Find a microservice
- Learn about microservice
- Download microservice
- Configure microservice
- Develop clients, run microservice in dev. environment, call a microservice
- Deploy and run microservice on target platform
- Monitor and manage microservice in production
- Now let’s see, how desired UX can be achieved:

## Find a microservice

All microservices shall listed on Pip.Services website that shall be the main point of entry for a new user. 
There is a Microservices page that lists all known microservices broken down by groups. Users also may open a page 
on specific microservices group and find more details.

## Learn about microservice

Each microservice shall be accompanied with detail documentation, that shall follow the standard structure:

- README.md – High level overview of a microservice with links to more detail documentation
  - Microservice description
  - External dependencies
  - Quick start
  - Client SDK links
  - References to detail information
  - Acknowledgements
- CHANGELOG.md – List of changes by version
  - New features
  - Breaking changes
  - Bug fixes
- /doc – folder with detail documentation
  - Configuration.md – configuration options
  - ClientApi.md – client API (reference to client SDKs)
  - RestProtocol.md – HTTP REST protocol
  - SenecaProtocol.md – Seneca protocol for Node.js
  - Download.md – Download links with all released versions
  - Deployment.md – description of deployment configurations
  - Download microservice

All released versions of microservice and client SDKs shall be well structured and available for download in zip/tar format. 
Additionally, released components shall be available through popular repositories such Github (for Node.js), 
DockerHub (for Docker images) and so on.

TBD: Set location for downlodable ZIP archives, publish procedure and download links

## Configure microservice

All microservices irrelevant to their implementation shall accept configuration in a common format. 
One option is to define configuration in config file in json or yaml format. The structure of configuration shall have 
the following configuration sections:

- **factories** – component factories
- **discovery** - service discovery configuration section
- **config** – configurator configuration section (only used by in distributed configuration scenarios)
- **logs** – logger configuration section
- **counters** – performance counters configuration section
- **cache** - data cache configurations section
- **persistence** – data access configuration section
- **clients** – configuration section for external client dependencies
- **controllers** – business logic controller configuration section
- **decorators** - custom business logic decorators configuration section
- **services** – configuration section for external endpoints (apis)
- **addons** – configuration section for additional components

Each configuration section for specific component has the following structure:

- **descriptor** - component descriptor to locate specific component
  - **group** – logical group the component belongs to
  - **type** – type of the physical implementation like: memory, file, mongodb, mysql, etc.
  - **version** - compatibility version
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

## Develop clients, call microserver

Each microservice shall provide client SDKs for all supported languages and all (most) implemented apis. 
All client SDKs must have similar API and configurations that are identical to deps section in microservice configuration. 
All clients for a specific microservice shall implement a common interface. Steps to work with a microservice client shall 
roughly be the following

- client = new XYZClient(config) – construct client instance and provide configuration options
- client.open(callback) – opening connection to microservice
- client.xyz(…) – calling client methods to communicate with microservice
- client.close(callback) – closing connection to microservice – end of work

## Deploy and run microservice on target platform

Each microservice shall support all (most) deployment platforms. The deployment package shall have a consistent structure (TBD):

- **/bin** – microservice “entry points” or “runners”
  - **run** – simple process runner
  - **lambda** - lambda service handler
  - **Dockerfile** – docker configuration
  - **Servicefabric??** – service fabric runner (?)
  - **...**
- **/config** – sample and actual run configurations
- **/doc** – full documentation on the microservice
- **/lib** – microservice and external libraries
- *...* 

## Monitor and manage microservice in production

All microservices shall support common mechanisms for monitoring and management with consistent naming conventions

- Logging with standard detalization level, format, naming
- Performance monitoring with standard counters and naming
- Health monitoring and restarts (TBD)
- ...
