# <img src="https://github.com/pip-services/pip-services/blob/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> cross-language and cross-platform microservices toolkit

Pip.Services is a unique toolkit that allows you to develop microservices for different platforms in the language of your choice. Maintanance and interoperability are easily accomplished because of the toolkit's use of symmetric structures and patterns.

With Pip.Services you can:
- Speedup your microservice development by using prebuilt patterns and components
- Use the toolkit by itself or in conjunction with other frameworks
- Confidently build high-quality, production-grade microservices
- Develop interoperable microservices in .NET, Java, Node.js, Python, and Go (under development)
- Run microservices on AWS, Azure, Go Cloud or on-premises
- Deploy microservices in Docker, Serverless, Service Fabric or in other containers.
- Switch platforms and technologies without touching the existing code

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

Version 3.0 released in September 2018 offers a cleaner implementation and a more granular breakdown of the modules to optimize external dependencies.

- **Commons**: cross-language primitives and common implementation patterns
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-commons-dotnet) | 
  [Java](http://github.com/pip-services3-java/pip-services3-commons-java) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-commons-node) | 
  [Python](http://github.com/pip-services3-python/pip-services3-commons-python) | 
  [Go](http://github.com/pip-services3-go/pip-services3-commons-go)
- **Components**: generic component definitions
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-components-dotnet) | 
  [Java](http://github.com/pip-services3-java/pip-services3-components-java) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-components-node) | 
  [Python](http://github.com/pip-services3-python/pip-services3-components-python) | 
  [Go](http://github.com/pip-services3-go/pip-services3-components-go)
- **Container**: inversion of control (IoC) container
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-container-dotnet) | 
  [Java](http://github.com/pip-services3-java/pip-services3-container-java) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-container-node) | 
  [Python](http://github.com/pip-services3-python/pip-services3-container-python) | 
  [Go](http://github.com/pip-services3-go/pip-services3-container-go)
- **Data**: data processing interfaces and abstract persistence components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-data-dotnet) | 
  [Java](http://github.com/pip-services3-java/pip-services3-data-java) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-data-node) | 
  [Python](http://github.com/pip-services3-python/pip-services3-data-python) | 
  [Go](http://github.com/pip-services3-go/pip-services3-data-go)
- **RPC**: components to implement synchronous communication (remote procedure calls or RPC)
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-rpc-dotnet) | 
  [Java](http://github.com/pip-services3-java/pip-services3-rpc-java) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-rpc-node) | 
  [Python](http://github.com/pip-services3-python/pip-services3-rpc-python) | 
  [Go](http://github.com/pip-services3-go/pip-services3-rpc-go)
- **Messaging**: components to implement asynchronous communication (async messaging)
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-messaging-dotnet) | 
  [Java](http://github.com/pip-services3-java/pip-services3-messaging-java) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-messaging-node) | 
  [Python](http://github.com/pip-services3-python/pip-services3-messaging-python) | 
  [Go](http://github.com/pip-services3-go/pip-services3-messaging-go)

On the top of that core, the toolkit has a number of technology-specific modules:
- **AWS**: AWS specific components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-aws-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-aws-node)
- **Azure**: Azure specific components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-azure-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-azure-node)
- **MongoDB**: MongoDB persistence components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-mongodb-dotnet) | 
  [Java](http://github.com/pip-services3-java/pip-services3-mongodb-java) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-mongodb-node) | 
  [Python](http://github.com/pip-services3-python/pip-services3-mongodb-python)
- **Memcached**: Memcached caching and synchronization components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-memcached-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-memcached-node)
- **Redis**: Redis caching and synchronization components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-redis-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-redis-node)
- **Prometheus**: Components for performance monitoring with Prometheus
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-prometheus-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-prometheus-node)
- **MQTT**: MQTT messaging components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-mqtt-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-mqtt-node)
- **RabbitMQ**: RabbitMQ messaging components
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-rabbitmq-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-rabbitmq-node)
- **ElasticSearch**: ElasticSearch logging
  <br/>
  [.NET](http://github.com/pip-services3-dotnet/pip-services3-elasticsearch-dotnet) | 
  [Node.js](http://github.com/pip-services3-node/pip-services3-elasticsearch-node)

And more components and modules are added every month!

## Library of Reusable Microservices

The unique features of the Pip.Services toolkit make it possible to develop a rich library of reusable microservices
that can be tailored to your technological platform by using a simple configuration.
To learn more about the library please visit [http://github.com/pip-services/pip-services-library](http://github.com/pip-services/pip-services-library).

## Usage

Video and written tutorials on how to use the toolkit are coming soon.

For now, please, look at the following examples:
* Beacons microservice
  <br/>
  [.NET](http://github.com/pip-services-samples/pip-samples-beacons-dotnet) | 
  [Java](http://github.com/pip-services-samples/pip-samples-beacons-java) | 
  [Node.js](http://github.com/pip-services-samples/pip-samples-beacons-node) | 
  [Python](http://github.com/pip-services-samples/pip-samples-beacons-python) | 
  [Go](http://github.com/pip-services-samples/pip-samples-beacons-go)


## Quick Links

- [Pip.Services discussion forum](https://groups.google.com/forum/#!forum/pip-services)

## Acknowledgements

This project would not be possible without the effort contributed by particular individuals.

- **Sergey Seroukhov** - the project founder
- **Mark Zontak** - Node.js and .NET implementations, AWS integration
- **Volodymyr Tkachenko** - .NET implementation, Service Fabric and Docker deployments
- **Alex Mazur** - .NET implementations, Azure integration
- **Andrew Harrinton** - .NET implementation, ElasticSearch, Prometheus and other technology-specific modules
- **Egor Nuzhnykh** - Java implementation, documentation and samples
- **Alexey Dvoykin** - documentation and samples
- **Mark Makarychev** - documentation
- **Alex Masliev** - Website and graphics

We also would like to recognize help received from the following companies.

- [**Conceptual Vision Consulting**](http://www.conceptualvisionconsulting.com)
- **Digital Living Software Corp.**
- [**Modular Mining Systems Inc.**](http://www.mmsi.com)
- [**BootBarn**](http://www.bootbarn.com)
- [**EPAM**](http://www.epam.com)
- [**Kyrio**](http://www.kyrio.com)

We are a very active and open community. You are welcome to join our team
to deliver new and better versions of the toolkit!
