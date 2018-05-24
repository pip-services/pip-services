# Pip.Services Reference Architecture

## Overview

This document describes reference architecture that every microservice from Pip.Services library shall follow.
The architecture is implemented by pip-services-template project(s) and supported by Runtime (pip-services-runtime) framework.

## Key Concerns

- Microservice can be implemented in any language, using any combination of technologies
- Microservice shall support all major platforms: system processes, docker containers, Seneca plugin, Service Fabric, AWS Lambda and more
- Microservice shall have high-performance production-grade implementation with unlimited scalability
- Microservice shall provide full range of supportability/manageability capabilities
- Microservice shall be ready to use without any coding with just simple configuration
- Microservice shall have simple, easy to follow code that can be modified by any entry-level developer

## Architectural Decisions

- Microservice shall follow microservices best-practices and shall implement a single responsibility (specific guidelines shall be clarified later)
- Microservice shall have flexible architecture that is done via composition of standard and custom-made adapters driven by configuration
- Microservice can be instantiated by multiple runners/wrappers on any supported platform
- Microservice can expose one or many end-points. The endpoints shall support interoperable communication. Client adapters for different languages shall be provided as separate modules
- Microservice shall support boot configurations, discovery, caching, logging, performance and health monitoring out of the box.
- Microservice shall support pluggable persistence layer
- Microservice shall generic/portable IDs to cross-reference entities with other microservices

## Logical View

The diagram below presents the structure of a typical microservice.

<div style="border: 1px solid #ccc">
  <img src="https://github.com/pip-services/pip-services/blob/master/design/PipServices+Architecture.png" alt="Pip.Services Componentized Architecture" style="display:block;">
</div>

### The key architectural components are the following:

- **Runner** – process runner/launcher that instantiates microservice on selected platform (Process, Docker container, Service Fabric, AWS Lambda, Blue Mix, etc.)
- **Container** - container for all microservice components, that instantiates them and manages their lifecycle
- **Builder** – builder that constructs microservices from different building blocks following provided configuration
- **Business Logic Controller** – a component that encapsulates all microservice business logic
- **Business Logic Decorator** – customization component that intercepts/decorates calls to Logic Controller and alters the behavior
- **API Services** – external endpoints that expose microservice functionality to outside via API of some sort
- **Dependency Clients** – client connectors to endpoints of other dependent microservices
- **Persistence** – pluggable persistence to different storages
- **Boot Configuration** – components to read initial microservice configuration from centralized remote locations during instantiation process
- **Discovery** – pluggable adapter to external discovery service to support dynamic discovery mechanisms
- **Logger** – pluggable logging/tracing component to collect detail logs
- **Performance Counters** – pluggable monitoring component to collect performance metrics (TBD: shall it be connected to health monitoring?)
- **Cache** – cache to store transient data between calls and implement stateful logic when needed
- **Addons** – pluggable extension components that are not integrated into business transactions, but can perform auxiliary functions 

### The microservice runtime lifecycle shall be the following:

- User created/modifies configuration, defines addresses, ports, persistence and communication types and so on.
- User launches runner on selected platform and defines where it shall get configuration from (by default from the local file)
- Runner instantiates Microservice container
- Microservice container usign Builder instantiates boot configs and gets actual configuration
- Microservice container calls Builder according to create all necessary componments – logging, performance monitoring, persistence, dependency adapters. Right after creations components get their configuration
- After all components are created Microservice starts linking process to establish references between them
- Microservice starts all components and itself
- … The microservice is ready to work …
- Clients call microservice. Call comes to endpoint and then redirected to the controller. The controller does the work and returns the result back
- During the work microservice shall use logging, collect performance metrics, etc.
- .. When microservice is shutdown it shall try to gracefully close all external connections and unregister itself from dynamic discovery service
