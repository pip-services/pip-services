# Pip.Services Componentized Microservice Architecture

## Overview

This document describes reference architecture that every microservice from Pip.Services library shall follow.
The architecture is implemented by pip-services-template project(s) and supported by Pip.Services framework.

## Key Requirements

- Microservice can be implemented in any language, using any combination of technologies
- Microservice shall support all major platforms: system processes, docker containers, Seneca plugin, Service Fabric, AWS Lambda and more
- Microservice shall have high-performance production-grade implementation with unlimited scalability
- Microservice shall provide full range of supportability/manageability capabilities
- Microservice shall be ready to use without any coding via simple configuration
- Microservice shall have simple implemenation that can be modified by any entry-level developer

## Architectural Decisions

- Microservice shall follow microservices best-practices and shall implement a single responsibility (specific guidelines shall be clarified later)
- Microservice shall have flexible architecture defined as composition of standard and custom-made components driven by configuration
- Microservice can be instantiated by multiple runners/containers on any supported platform
- Microservice can expose one or many end-points. The endpoints shall be versioned and interoperable. Client adapters for different languages shall be provided as separate modules
- Microservice shall support configurations, discovery, caching, locks, logging, performance and health monitoring out of the box.
- Microservice shall support pluggable persistence layer
- Microservice shall generic/portable IDs to cross-reference entities with other microservices

## Logical View

The diagram below presents the structure of a typical microservice.

<div style="border: 1px solid #ccc">
  <img src="https://github.com/pip-services/pip-services/blob/master/design/PipServicesArchitecture.png" alt="Pip.Services Componentized Architecture" style="display:block;">
</div>

### The key architectural components are the following:

- **Runner** – process runner/launcher that instantiates microservice on selected platform (Process, Docker container, Service Fabric, AWS Lambda, Blue Mix, etc.)
- **Container** - container for all microservice components, that instantiates them and manages their lifecycle
- **Controller** – a component that encapsulates all microservice business logic
- **Services** – external endpoints that expose microservice functionality to outside via API of some sort
- **Clients** – connectors to other microservices
- **Persistence** – pluggable persistence to different storages
- **Configuration** – a component that reada initial microservice configuration from memory, file or remote locations during process startup
- **Credential Store** – storage of connection credentials: user names and passwords, API keys and so forth
- **Discovery** – storage of connection configurations: hosts, ports and other connection parameters
- **Logger** – a component to collect execution logs
- **Performance Counters** – a component to collect performance metrics
- **Cache** – cache to store transient data between calls and implement stateful logic when needed
- **Lock** - lock to seriaize access to a resource by multiple distributed components
- **Addons** – extension components that are not integrated into business transactions, but can perform auxiliary functions such as heartbeats, statuses, metrics and others

### The microservice lifecycle shall be the following:

- User defines microservice configuration, defines addresses, ports, persistence and communication types and so on.
- User launches runner on selected platform and defines where it shall get configuration from (by default from the local file)
- Runner instantiates Microservice container
- Microservice container reads configuration and instantiates components
- After components are created, they are configured, referenced to each other and opened
- Microservice components process external calls or executes internal transactions (usually triggered by timer)
- When microservice is shutdown for whatever reason the container gracefully stops and disposes components
- On shutdown of the container, components are closed, unreferenced and destroyed

Lifecycle of individual component is presented on the diagram below:
<div style="border: 1px solid #ccc">
  <img src="https://github.com/pip-services/pip-services/blob/master/design/PipServicesComponentLifecycle.png" alt="Pip.Services Component Lifecycle" style="display:block;">
</div>
