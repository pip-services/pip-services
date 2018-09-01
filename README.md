# <img src="https://github.com/pip-services/pip-services/blob/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> cross-language and cross-platform microservices toolkit

Pip.Services is a unique microservices toolkit that allows you to develop microservices
in different languages using symmetric structure and patterns, make them interoperable
and run on variety of different platforms.

With Pip.Services you can:
- Speedup your microservice development by using prebuilt patterns and components
- Use the toolkit by itself or easily mixed with other frameworks
- Confidently build high-quality production-grade microservices
- Develop interoperable microservices in .NET, Java, Node.js, Python, and Go (under development)
- Run microservices on AWS, Azure, Go Cloud or on-premises
- Deploy microservices in Docker, Serverless, Service Fabric or in other containers.
- Switch platforms and technologies without touching existing code

<!--
To unleash that potential, microservices developed using Pip.Services toolkit often employ componentized design:

<p align="center">
  <img alt="Microservice Design" src="design/MicroserviceDesign.png">
</p>
-->

## Architecture

<p align="center">
  <img alt="Toolkit Architecture" src="design/ToolkitArchitecture.png">
</p>

The version 3.0 released in September 2018 offers a cleaner implementation and fine granular 
module breakdown to optimize external dependencies.

- **Commons**: cross-language primitives and common implementation patterns
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-commons-dotnet) | 
  [Java](http://github.com/pip-services-java/pip-services-commons-java) | 
  [Node.js](http://github.com/pip-services-node/pip-services-commons-node) | 
  [Python](http://github.com/pip-services-python/pip-services-commons-python) | 
  [Go](http://github.com/pip-services-go/pip-services-commons-go)
- **Components**: generic component definitions
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-components-dotnet) | 
  [Java](http://github.com/pip-services-java/pip-services-components-java) | 
  [Node.js](http://github.com/pip-services-node/pip-services-components-node) | 
  [Python](http://github.com/pip-services-python/pip-services-components-python) | 
  [Go](http://github.com/pip-services-go/pip-services-components-go)
- **Container**: inversion of control (IoC) container
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-container-dotnet) | 
  [Java](http://github.com/pip-services-java/pip-services-container-java) | 
  [Node.js](http://github.com/pip-services-node/pip-services-container-node) | 
  [Python](http://github.com/pip-services-python/pip-services-container-python) | 
  [Go](http://github.com/pip-services-go/pip-services-container-go)
- **Data**: data processing interfaces and abstract persistence components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-data-dotnet) | 
  [Java](http://github.com/pip-services-java/pip-services-data-java) | 
  [Node.js](http://github.com/pip-services-node/pip-services-data-node) | 
  [Python](http://github.com/pip-services-python/pip-services-data-python) | 
  [Go](http://github.com/pip-services-go/pip-services-data-go)
- **RPC**: components to implement synchronous communication (remote procedure calls or RPC)
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-rpc-dotnet) | 
  [Java](http://github.com/pip-services-java/pip-services-rpc-java) | 
  [Node.js](http://github.com/pip-services-node/pip-services-rpc-node) | 
  [Python](http://github.com/pip-services-python/pip-services-rpc-python) | 
  [Go](http://github.com/pip-services-go/pip-services-rpc-go)
- **Messaging**: components to implement asynchronous communication (async messaging)
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-messaging-dotnet) | 
  [Java](http://github.com/pip-services-java/pip-services-messaging-java) | 
  [Node.js](http://github.com/pip-services-node/pip-services-messaging-node) | 
  [Python](http://github.com/pip-services-python/pip-services-messaging-python) | 
  [Go](http://github.com/pip-services-go/pip-services-messaging-go)

On the top of that core, the toolkit has a number of technology-specific modules:
- **AWS**: AWS specific components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-aws-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-aws-node)
- **Azure**: Azure specific components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-azure-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-azure-node)
- **MongoDB**: MongoDB persistence components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-mongodb-dotnet) | 
  [Java](http://github.com/pip-services-java/pip-services-mongodb-java) | 
  [Node.js](http://github.com/pip-services-node/pip-services-mongodb-node) | 
  [Python](http://github.com/pip-services-python/pip-services-mongodb-python)
- **Memcached**: Memcached caching and synchronization components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-memcached-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-memcached-node)
- **Redis**: Redis caching and synchronization components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-redis-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-redis-node)
- **Prometheus**: Components for performance monitoring with Prometheus
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-prometheus-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-prometheus-node)
- **MQTT**: MQTT messaging components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-mqtt-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-mqtt-node)
- **RabbitMQ**: RabbitMQ messaging components
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-rabbitmq-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-rabbitmq-node)
- **ElasticSearch**: ElasticSearch logging
  <br/>
  [.NET](http://github.com/pip-services-dotnet/pip-services-elasticsearch-dotnet) | 
  [Node.js](http://github.com/pip-services-node/pip-services-elasticsearch-node)

And more components and modules are added every month!

## Library of Reusable Microservices

The unique features of Pip.Services toolkit made it possible to develop a rich library of reusable microservices
that can be tailored to your technological platform by using a simple configuration.
To learn more about the library please visit [http://github.com/pip-services/pip-services-library](http://github.com/pip-services/pip-services-library).

## Quick Links

- [Pip.Services discussion forum](https://groups.google.com/forum/#!forum/pip-services)

## Acknowledgements

This project would not be possible without effort contributed by particular individuals.

- **Sergey Seroukhov** - the project founder
- **Mark Zontak** - Node.js and .NET implementations, AWS integration
- **Volodymyr Tkachenko** - .NET implementation, Service Fabric and Docker deployments
- **Alex Mazur** - .NET implementations, Azure integration
- **Andrew Harrinton** - .NET implementation, ElasticSearch, Prometheus and other technology-specific modules
- **Alex Masliev** - Website and graphics

We also would like to recognize help received from the following companies.

- **Digital Living Software Corp.**
- [**Modular Mining Systems Inc.**](http://www.mmsi.com)
- [**BootBarn**](http://www.bootbarn.com)
- [**EPAM**](http://www.epam.com)
- [**Kyrio**](http://www.kyrio.com)

We are very active and open community. You are welcome to join our team
to deliver new and better versions of the toolkit!