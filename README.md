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
performance counters, service endpoints and client connectors and describe it in a [simple configuration](usage/Configuration.md).
After that microservice is ready to be deployed in the target development or production environments.

<div style="border: 1px solid #ccc">
  <img src="https://github.com/pip-services/pip-services/blob/master/design/Overview.png" alt="Pip.Services Overview" style="display:block;">
</div>

Below you can see the list of options you can choose from. Specific microservice may or may not have all of them.
Please, refer to the microservice documentation for details.

- **Languages**: Java, .NET, Node.js, Go. Python and Ruby are planned to be added in the future
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
- [pip-services-logging](https://github.com/pip-services/pip-services-logging) - Distributed logging microservice. 
It collects logs from other microservices and stores them in a single location for further analysis.
- [pip-services-counters](https://github.com/pip-services/pip-services-counters) - 
Performance monitoring microservice. It collects performance metrics from other microservices and generates 
performance statistics.
- [pip-services-discovery](https://github.com/pip-services/pip-services-discovery) - Simple service discovery microservice.
It is a lightweight alternative to production services like Consul or Etcd that can be used during development and testing.
- [pip-services-syslog](https://github.com/pip-services/pip-services-syslog) - System event logging microservice. 
It logs key system events like installing a new server, upgrading to a newer version, shutting down system for maintenance
and so on

### User management microservices
- [pip-services-users](https://github.com/pip-services/pip-services-users) - Users account management microservice. 
It allows to register system users and set their key preferences.
- [pip-services-passwords](https://github.com/pip-services/pip-services-passwords) - Password authentication microservice. 
It allows to set and manage user password, performs basic login/password based authentication and supports password 
recovery via email.
- [pip-services-roles](https://github.com/pip-services/pip-services-roles) - User role-based authorization microservice. 
It allows to grant roles to a user and performs basic ‘is user in role’ authorization.
- [pip-services-email](https://github.com/pip-services/pip-services-email) - Email sending microservice. 
It manages user primary emails, handles email verification, sends emails to destination addresses or to specified users. 
Email content can be templated.
- [pip-services-settings](https://github.com/pip-services/pip-services-settings) -User/party settings microservice. 
It allows to store and retrieve user (or party) application settings, all at once or by specified keys.
- [pip-services-sessions](https://github.com/pip-services/pip-services-sessions) - User session management microservice. 
It tracks sessions opened by users from multiple hosts and applications. It can be very useful for session tracking 
in client facades (API gateways).
- [pip-services-activities](https://github.com/pip-services/pip-services-activities) - User/party activity logging microservice. 
It logs activities performed by user (or party) like registering and logging into the system, changing configuration settings, 
creating/removing/updating system entities and so on.

### Product support microservices

- [pip-services-announces](https://github.com/pip-services/pip-services-announces) - System announcements microservice. 
It allows system administrators or product support personnel to create announcements and show them to product users to keep 
them informed about important information and events.
- [pip-services-feedbacks](https://github.com/pip-services/pip-services-feedbacks) -Users feedback microservice. 
It allows to collect feedback from product users about their issues, ideas, copyright infringement or other requests.

### Content management microservices

- [pip-services-storage](https://github.com/pip-services/pip-services-storage) - Block storage microservice. 
It is the key microservice that enables upload and download of files. It also tracks references from other system entities 
and destroys files when the last reference is released.
- [pip-services-tags](https://github.com/pip-services/pip-services-tags) - User/party search tags microservice. 
It records tags used by user (or party) when they create their content. Later these tags can be used to suggest tags 
for search within applications.
- [pip-services-quotes](https://github.com/pip-services/pip-services-quotes) - Inspirational quotes microservice. 
It is a basic sample microservice that shows to users inspiring quotes.

### Microservice runtime implementation

- [pip-services-runtime-node](https://github.com/pip-services/pip-services-runtime-node) - microservice runtime for Node.js
- [pip-services-runtime-java](https://github.com/pip-services/pip-services-runtime-java) - microservice runtime for Java
- [pip-services-runtime-dotnet](https://github.com/pip-services/pip-services-runtime-dotnet) - microservice runtime for .NET
- [pip-services-runtime-go](https://github.com/pip-services/pip-services-runtime-go) - microservice runtime for Golang
- [pip-services-runtime-python](https://github.com/pip-services/pip-services-runtime-python) - microservice runtime for Python

## Quick Links

- [Official Pip.Services website](http://www.pipservices.org)
- [Users discussion forum]()
- [Pip.Services team blog]()

## Acknowledgements

This project would not be possible without effort contributed by particular individuals.

- **Sergey Seroukhov** - the project founder, microservice architecture and runtime implementation
- **Mark Zontak** - Node.js and .NET implementations, AWS integration
- **Volodymyr Tkachenko** - .NET implementation, Service Fabric and Docker deployments
- **Alex Masliev** - Website and graphics

We also would like to recognize help received from the following companies.

- **Digital Living Software Corp.**
- [**Modular Mining Systems Inc.**](http://www.mmsi.com)
- [**EPAM**](http://www.epam.com)