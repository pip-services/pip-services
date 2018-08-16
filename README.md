# <img src="https://github.com/pip-services/pip-services/blob/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Library of reusable microservices

Microservices architectural style is quickly becoming popular among software developers.
But variety of languages, platforms and frameworks, as well as lack of standards
make it difficult to find ready-to-use components that you can drop and use into your system.
SaaS services offer fairly good solution to that problem. But they also come with difficult tradeoffs.
You have to give up control over functionality and data. You may pay extra to SaaS providers.
You are limited to features that are given to you and so on. Moreover, not everything can and shall
run on the cloud. In that case SaaS services is not a good help.

Pip.Services team offers a different solution - a collection of reusable microservices
that you can take, modify and deploy as a part of your own system. You regain full control over
functionality and operations. You are able to pick any type of persistence storage,
infrastructural components like logging, performance and health monitoring. You can deploy
microservices on virtually any platform and use them from any programming language.

That level of flexibility becomes possible due to [componentized microservice architecture](design/Architecture.md).
You can simply take a microservice, pick the necessary components for persistence, logging, caching, discovery, 
performance counters, service endpoints and client connectors and describe it in [microservice configuration](usage/Configuration.md).
After that microservice is ready to be deployed in the target development or production environments.

<div style="border: 1px solid #ccc">
  <img src="https://github.com/pip-services/pip-services/blob/master/design/Overview.png" alt="Pip.Services Overview" style="display:block;">
</div>

Below you can see the list of options you can choose from. Specific microservice may or may not have all of them.
Please, refer to the microservice documentation for details.

- **Languages**: Java, .NET, Node.js, Go, Python. Ruby is planned to be added in the future
- **Deployment**: System processes, Windows services and Linux demons, Docker containers, AWS Lambda,
Seneca.js, Tomcat container, Spring container, Microservice Service-Fabric, ...
- **Persistence**: In-memory, Files, MongoDB, Couchbase, Cassandra, MySQL, SQL Server, AWS S3, ...
- **Communication protocols**: HTTP REST, Seneca, Thrift, Direct, Kafka, ActiveMQ, ZeroMQ, ...
- **Discovery**: Static, Custom, Consul, Etcd, ...
- **Logging**: Null, Console, File, Custom, Logstash, Syslog, ...
- **Performance counters**: Null, Log, Custom, ... 

The library contains constantly growing number of microservices, donated and supported by community contributors.
They divided into several groups.

### Infrastructure microservices
- [pip-services-logging](https://github.com/pip-services-infrastructure/pip-services-logging-node) - Distributed logging microservice. 
It collects logs from other microservices and stores them in a single location for further analysis.
- [pip-services-counters](https://github.com/pip-services-infrastructure/pip-services-counters-node) - 
Performance monitoring microservice. It collects performance metrics from other microservices and generates 
performance statistics.
It is a lightweight alternative to production services like Consul or Etcd that can be used during development and testing.
- [pip-services-eventlog](https://github.com/pip-services-infrastructure/pip-services-eventlog-node) - System event logging microservice. 
It logs key system events like installing a new server, upgrading to a newer version, shutting down system for maintenance
and so on
- [pip-services-settings](https://github.com/pip-services-infrastructure/pip-services-settings-node) - Settings microservice. 
It keeps system-wide configuration settings split by sections.
- [pip-services-statistics](https://github.com/pip-services-infrastructure/pip-services-statistics-node) - Statistics microservice. 
It aggregates business statistics within Hour, Day, Month, Year and Total intervals.
- [pip-services-blobs](https://github.com/pip-services-infrastructure/pip-services-blobs-node) - Blob storage microservice. 
It is the key microservice that enables upload and download of binary blobs. It also tracks references from other system entities and destroys files when the last reference is released.
- [pip-services-facets](https://github.com/pip-services-infrastructure/pip-services-facets-node) - Faceted search microservice. 
It records and allows to search by aggregated (faceted) criteria, like groups, types or categories.
- [pip-services-changescopes](https://github.com/pip-services-infrastructure/pip-services-changescopes-node) - Change scopes microservice.
It trackes changes in specific scope down to individual elements. That helps to use simple pulls to detect changes in one call without use of asynchronous update messages.
- [pip-services-email](https://github.com/pip-services-infrastructure/pip-services-email-node) - Email delivery microservice. It sends email messages and supports message templates.
- [pip-services-sms](https://github.com/pip-services-infrastructure/pip-services-sms-node) - SMS delivery microservice. It sends sms messages and supports message templates.

### User management microservices
- [pip-services-accounts](https://github.com/pip-services-users/pip-services-accounts-node) - Users account management microservice. 
It allows to register system users and set their key preferences.
- [pip-services-passwords](https://github.com/pip-services-users/pip-services-passwords-node) - Password authentication microservice. 
It allows to set and manage user password, performs basic login/password based authentication and supports password 
recovery via email.
- [pip-services-roles](https://github.com/pip-services-users/pip-services-roles-node) - User role-based authorization microservice. 
It allows to grant roles to a user and performs basic ‘is user in role’ authorization.
- [pip-services-emailsettings](https://github.com/pip-services-users/pip-services-emailsettings-node) - Email settings microservice. 
It manages user primary emails and handles email verification.
- [pip-services-smssettings](https://github.com/pip-services-users/pip-services-smssettings-node) - SMS settings microservice. 
It manages user phone numbers and handles phone verification.
- [pip-services-msgdistribution](https://github.com/pip-services-users/pip-services-msgdistribution-node) - Message distribution microservice. 
It distributes messages to one or many recipients via selected delivery method: email or sms.
- [pip-services-sessions](https://github.com/pip-services-users/pip-services-sessions-node) - User session management microservice. 
It tracks sessions opened by users from multiple hosts and applications. It can be very useful for session tracking 
in client facades (API gateways).
- [pip-services-activities](https://github.com/pip-services-users/pip-services-activities-node) - User/party activity logging microservice. 
It logs activities performed by user (or party) like registering and logging into the system, changing configuration settings, 
creating/removing/updating system entities and so on.

### Product support microservices

- [pip-services-announcements](https://github.com/pip-services-support/pip-services-announcements-node) - System announcements microservice. 
It allows system administrators or product support personnel to create announcements and show them to product users to keep 
them informed about important information and events.
- [pip-services-feedbacks](https://github.com/pip-services-support/pip-services-feedbacks-node) - Users feedback microservice. 
It allows to collect feedback from product users about their issues, ideas, copyright infringement or other requests.

### Content management microservices

- [pip-services-attachments](https://github.com/pip-services-content/pip-services-attachments-node) - Blob attachments microservice. 
It tracks references to blobs from other system entities and destroys files when the last reference is released.
- [pip-services-tags](https://github.com/pip-services-content/pip-services-tags-node) - User/party search tags microservice. 
It records tags used by user (or party) when they create their content. Later these tags can be used to suggest tags 
for search within applications.
- [pip-services-quotes](https://github.com/pip-services-content/pip-services-quotes-node) - Inspirational quotes microservice. 
It is a basic sample microservice that shows to users inspiring quotes.
- [pip-services-tips](https://github.com/pip-services-content/pip-services-tips-node) - User tips microservice. 
It shows prerecorded useful tips and suggestions to application users.
- [pip-services-guides](https://github.com/pip-services-content/pip-services-guides-node) - Application guides microservice. 
It shows guides (introduction, walk-through, new release) to application users.
- [pip-services-imagesets](https://github.com/pip-services-content/pip-services-imagesets-node) - Image library microservice. 
It contains a collection of images that users can search and use to visualize their content.
- [pip-services-files](https://github.com/pip-services-content/pip-services-files-node) - Files microservice. 
It keeps collections (groups) of files. File content can be stored either in blobs or in external source and referenced via uri.
- [pip-services-msgtemplates](https://github.com/pip-services-content/pip-services-msgtemplates-node) - Message templates microservice. 
It allows content managers to compose message templates in multiple languages and later use to send out emails or sms to system users or internet community.
- [pip-services-dashboards](https://github.com/pip-services-content/pip-services-dashboards-node) - Dashboards microservice. 
It stores configurations of user dashboards.

### Microservice framework 3.0 for Core .NET

- [pip-services-commons-dotnet](https://github.com/pip-services-dotnet/pip-services-commons-dotnet) - common implementation patterns in .NET
- [pip-services-components-dotnet](https://github.com/pip-services-dotnet/pip-services-components-dotnet) - common component definitions in .NET
- [pip-services-container-dotnet](https://github.com/pip-services-dotnet/pip-services-container-dotnet) - Inversion of Control (IoC) container .NET
- [pip-services-data-dotnet](https://github.com/pip-services-dotnet/pip-services-data-dotnet) - data processing and persistence in .NET
- [pip-services-rpc-dotnet](https://github.com/pip-services-dotnet/pip-services-rpc-dotnet) - Remote procedure calls (RPC) in .NET
- [pip-services-messaging-dotnet](https://github.com/pip-services-dotnet/pip-services-messaging-dotnet) - Asynchronous messaging in .NET
- [pip-services-azure-dotnet](https://github.com/pip-services-dotnet/pip-services-azure-dotnet) - Azure specific components in .NET
- [pip-services-aws-dotnet](https://github.com/pip-services-dotnet/pip-services-aws-dotnet) - AWS specific components in .NET
- [pip-services-mongodb-dotnet](https://github.com/pip-services-dotnet/pip-services-mongodb-dotnet) - MongoDB components in .NET
- [pip-services-elasticsearch-dotnet](https://github.com/pip-services-dotnet/pip-services-elasticsearch-dotnet) - ElasticSearch components in .NET
- [pip-services-prometheus-dotnet](https://github.com/pip-services-dotnet/pip-services-prometheus-dotnet) - Prometheus components in .NET
- [pip-services-memcached-dotnet](https://github.com/pip-services-dotnet/pip-services-memcached-dotnet) - Memcached components in .NET
- [pip-services-redis-dotnet](https://github.com/pip-services-dotnet/pip-services-redis-dotnet) - Redis components in .NET
- [pip-services-rabbitmq-dotnet](https://github.com/pip-services-dotnet/pip-services-rabbitmq-dotnet) - RabbitMQ queues in .NET
- [pip-services-dotnet-ws](https://github.com/pip-services-dotnet/pip-services-dotnet-ws) - Workspace for Pip.Services in .NET

### Microservice framework 3.0 for Java (Under development)

- [pip-services-commons-java](https://github.com/pip-services-java/pip-services-commons-java) - common implementation patterns in Java
- [pip-services-components-java](https://github.com/pip-services-java/pip-services-components-java) - common component definitions in Java
- [pip-services-container-java](https://github.com/pip-services-java/pip-services-container-java) - Inversion of Control (IoC) container Java
- [pip-services-data-java](https://github.com/pip-services-java/pip-services-data-java) - data processing and persistence in Java
- [pip-services-rpc-java](https://github.com/pip-services-java/pip-services-rpc-java) - Remote procedure calls (RPC) in Java
- [pip-services-messaging-java](https://github.com/pip-services-java/pip-services-messaging-java) - Asynchronous messaging in Java
- [pip-services-mongodb-java](https://github.com/pip-services-java/pip-services-mongodb-java) - MongoDB components in Java
- [pip-services-java-ws](https://github.com/pip-services-java/pip-services-java-ws) - Workspace for Pip.Services in Java

### Microservice framework 3.0 for Node.js

- [pip-services-commons-node](https://github.com/pip-services-node/pip-services-commons-node) - common implementation patterns in Node.js
- [pip-services-components-node](https://github.com/pip-services-node/pip-services-components-node) - common component definitions in Node.js
- [pip-services-container-node](https://github.com/pip-services-node/pip-services-container-node) - Inversion of Control (IoC) container Node.js
- [pip-services-data-node](https://github.com/pip-services-node/pip-services-data-node) - data processing and persistence in Node.js
- [pip-services-rpc-node](https://github.com/pip-services-node/pip-services-rpc-node) - Remote procedure calls (RPC) in Node.js
- [pip-services-messaging-node](https://github.com/pip-services-node/pip-services-messaging-node) - Asynchronous messaging in Node.js
- [pip-services-azure-node](https://github.com/pip-services-node/pip-services-azure-node) - Azure specific components in Node.js
- [pip-services-aws-node](https://github.com/pip-services-node/pip-services-aws-node) - AWS specific components in Node.js
- [pip-services-mongodb-node](https://github.com/pip-services-node/pip-services-mongodb-node) - MongoDB components in Node.js
- [pip-services-elasticsearch-node](https://github.com/pip-services-node/pip-services-elasticsearch-node) - ElasticSearch components in Node.js
- [pip-services-prometheus-node](https://github.com/pip-services-node/pip-services-prometheus-node) - Prometheus components in Node.js
- [pip-services-memcached-node](https://github.com/pip-services-node/pip-services-memcached-node) - Memcached components in Node.js
- [pip-services-redis-node](https://github.com/pip-services-node/pip-services-redis-node) - Redis components in Node.js
- [pip-services-rabbitmq-node](https://github.com/pip-services-node/pip-services-rabbitmq-node) - RabbitMQ queues in Node.js
- [pip-services-node-ws](https://github.com/pip-services-node/pip-services-node-ws) - Workspace for Pip.Services in Node.js

### Microservice framework 3.0 for Python (Coming soon)

- [pip-services-commons-python](https://github.com/pip-services-python/pip-services-commons-python) - common implementation patterns in Python
- [pip-services-components-python](https://github.com/pip-services-python/pip-services-components-python) - common component definitions in Python
- [pip-services-container-python](https://github.com/pip-services-python/pip-services-container-python) - Inversion of Control (IoC) container Python
- [pip-services-data-python](https://github.com/pip-services-python/pip-services-data-python) - data processing and persistence in Python
- [pip-services-rpc-python](https://github.com/pip-services-python/pip-services-rpc-python) - Remote procedure calls (RPC) in Python
- [pip-services-messaging-python](https://github.com/pip-services-python/pip-services-messaging-python) - Asynchronous messaging in Python
- [pip-services-mongodb-python](https://github.com/pip-services-python/pip-services-mongodb-python) - MongoDB components in Python
- [pip-services-python-ws](https://github.com/pip-services-python/pip-services-python-ws) - Workspace for Pip.Services in Python

### Microservice framework 3.0 for Golang (Under development)

- [pip-services-commons-go](https://github.com/pip-services-go/pip-services-commons-go) - common implementation patterns in Golang
- [pip-services-components-go](https://github.com/pip-services-go/pip-services-components-go) - common component definitions in Golang
- [pip-services-container-go](https://github.com/pip-services-go/pip-services-container-go) - Inversion of Control (IoC) container Golang
- [pip-services-data-go](https://github.com/pip-services-go/pip-services-data-go) - data processing and persistence in Golang
- [pip-services-rpc-go](https://github.com/pip-services-go/pip-services-rpc-go) - Remote procedure calls (RPC) in Golang
- [pip-services-messaging-go](https://github.com/pip-services-go/pip-services-messaging-go) - Asynchronous messaging in Golang
- [pip-services-mongodb-go](https://github.com/pip-services-go/pip-services-mongodb-go) - MongoDB components in Golang
- [pip-services-go-ws](https://github.com/pip-services-go/pip-services-go-ws) - Workspace for Pip.Services in Golang


### Portable build infrastructure

- [pip-tasks](https://github.com/pip-tasks/pip-tasks) - Cross platform project build system in Powershell
- [pip-tasks-commons](https://github.com/pip-tasks/pip-tasks-commons) - Common build tasks for Pip.Tasks
- [pip-tasks-dotnet](https://github.com/pip-tasks/pip-tasks-dotnet) - .NET build tasks for Pip.Tasks
- [pip-tasks-java](https://github.com/pip-tasks/pip-tasks-java) - Java build tasks for Pip.Tasks
- [pip-tasks-js](https://github.com/pip-tasks/pip-tasks-js) - Javascript and Node.js build tasks for Pip.Tasks
- [pip-tasks-python](https://github.com/pip-tasks/pip-tasks-python) - Python build tasks for Pip.Tasks

## Quick Links

- [Official Pip.Services website](http://www.pipservices.org)
- [Pip.Services discussion forum](https://groups.google.com/forum/#!forum/pip-services)
- [Pip.Services team blog](https://pip-services.blogspot.com/)

## Acknowledgements

This project would not be possible without effort contributed by particular individuals.

- **Sergey Seroukhov** - the project founder, microservice architecture and runtime implementation
- **Mark Zontak** - Node.js and .NET implementations, AWS integration
- **Volodymyr Tkachenko** - .NET implementation, Service Fabric and Docker deployments
- **Alex Mazur** - .NET implementations, Azure integration
- **Alex Masliev** - Website and graphics

We also would like to recognize help received from the following companies.

- **Digital Living Software Corp.**
- [**Modular Mining Systems Inc.**](http://www.mmsi.com)
- [**BootBarn**](http://www.bootbarn.com)
- [**EPAM**](http://www.epam.com)
- [**Kyrio**](http://www.kyrio.com)
