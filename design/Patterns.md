# Pip.Services Implementation Patterns

## Configurations

### Problem:

All microservices irrelevant to their implementation details or implementation language shall have common methods to configure.

### Solution:

A microservice configuration shall follow the same general structure:

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

## API Versioning

### Problem:

During evolution circle microservices may change their APIs. That may break dependent components that rely on the previous 
version of API.

### Solution:

Microservice developers shall use 3-digit “logical versioning” schema: &lt;major&gt.&lt;minor&gt;.&lt;point&gt;, where:

- **Major** – identifies a release with breaking changes to the previous version. 
That version is going to break existing clients
- **Minor** – identifies a release with incremental changes to the previous version. 
That version in general shall not break existing clients
- **Point** – a big-fix or other procedural release that does not change external apis.

All APIs and related clients must be versioned. Since point and minor releases shall not affect existing users, 
the versioning shall be done only by a major version. Like V1 shall be used for all 1.y.z releases.

Microservice in addition to the current version of API must provide backward compatible versions as well. 
At least one previous version must be provided.

All service (API) and client components must include version into their name. Like UsersSenecaServiceV1 or StorageRestClientV2.

Current and all supported backward compatible versions of service and client components must come with automated tests 
to ensure their stability.

Microservice developer must clearly state when backward compatible version will be deprecated to give existing users time 
to upgrade.

If changes in microservice functionality are going to be so drastic so backward compatible API cannot be provided, 
then microservice author must avoid changing it. Instead, he shall leave the existing microservice “as is” and start a new microservice with new functionality.

## DB Versioning

### Problem:

During evolution circle microservices may change their persistent data schema. During upgrade that may prevent 
a new version of the microservice from using previously stored data. Upgrading data schema to the new version 
for large datasets may cause hours or even days of downtime which may not be acceptable for some clients.

### Solution:

Every data item in persistent collection must be versioned. The collection shall be able to store data with multiple versions 
at the same time. Microservice data access upon data retrieval shall read the version information and convert data on-the-fly 
to the most current version. When data is stored it shall be in the most recent data schema (in the current version). 
That approach allows to completely eliminate downtime due to data migration. However, it introduce additional (relatively) 
small runtime overhead for data conversions.

The runtime overhead can be minimized further by a background process that does data conversion from previous to the current 
version while system is not very active.

Similar to microservice APIs developers shall use logical versioning. And only 1 number that signifies a major release shall 
be used for data items. It shall be stored in a special _v (version) field. That field shall be used internally and shall not 
be sent to clients

Most NoSQL databases and file storages allow flexible data schemas. However, for relational databases it may cause problems. 
One solution can be to add additional fields to store new fields to relational table, but keep the table for data collection 
unchanged. Another solution is to store data serialized in blobs, but that approach limits search capabilities.

Microservice shall contain converters for all previous versions of persistent data until the end of its life. 
The converters can be chained to enable conversion across multiple versions. Data converters can also be used by Services (APIs) 
to convert incoming data to from older to the current version.

If microservice developer for whatever reasons cannot provide data backward compatibility, he shall avoid making breaking changes. 
Instead, he shall start a new microservice and provide limited data migration strategy to pull existing data that was stored 
by the old microservice.

## Unique Keys / IDs

### Problem:

Data items handled by multiple microservices may reference each other. Those references shall be fully portable to allow processing 
using different persistent storage technologies.

Microservices by their nature can run multiple (sometimes hundreds or thousands) instances simultaneously. In any deployment 
scenario IDs generated by one instance shall be globally unique to avoid conflicts with IDs generated by other instances

### Solution:

One simple solution is to use for unique IDs the string representation of UUIDs. There are libraries for UUID key generation 
available for all supported languages. Also string is a universal data type that can be stored and indexed by any database 
technology.

Another solution is to use a natural unique key, that is already part of a data item.

The third solution is to use external data generator. It may provide more compact and ordered IDs. However, it may introduce 
additional delays on data insertion. To some extent, those delays can be mitigated by issuing a set of IDs on a single trip 
to the key generator. Pip.Services shall provide a key generation microservice (see Infrastructure microservices).

## Errors

### Problem:

Errors thrown by microservice shall be clearly identifiable (referenceable), descriptive, contain sufficient amount 
of information for analysis and be localizable. The error structure shall be portable across all supported languages.

Since HTTP/REST protocol is the most often option for microservices implementation, errors shall contain information 
to return correct HTTP statuses to achieve high level of REST compatibility.

### Solution:

All errors generated by microservice shall have the following structure:

- **code** – unique code to identify the error
- **details** – additional information to help analyzing the problem. usually it contains references from client request
- **message** – human readable error description
- **status** – HTTP status code (500 – internal error is used by default)
- **cause** – original exception that caused the error
- **component** – id of component that generated the error
- **stack** – stack trace
- **correlation_id** – correlation id

Error codes must be uniquely identified within microservice and shall not overlap with errors from other microservices. 
The codes shall be defined as strings formatted as 'microservice.error_code’. 
Examples: ‘Storage.NotFound’, ‘Users.WrongEmail’.

Component ids must uniquely identify microservice and component within that microservice. They shall be defined as strings 
formatted as ‘microservice.component’. Examples: ‘Storage.FieldDataAccess’, ‘Users.Controller’.

All expected exceptions from underlying implementation layers (database, communication, and so on) shall be wrapped 
into microservice exceptions with meaningful descriptions, component id and location where exception happened. 
Otherwise, all unwrapped exceptions will be sent as internal 500 exceptions.

Incomplete or wrong data sent by client is one of the major sources of errors. Instead of relying on lower layers to catch 
those exceptions, microservice logic shall perform data validation as early as possible and throw meaningful errors before 
broken data hits processing logic. To support that microservice runtime shall provide data validation capabilities.

To achieve high REST compliance most errors shall include HTTP status code. If it’s not set errors will be returned 
as 500 ‘Internal Error’.

## Filtering, Sorting and Paging

### Problem:

Data querying is the most common operation implemented by microservices. Query usually specify what subset of data shall 
be returned and how it shall be returned. That includes filtering and sorting data and breaking it by pages for quick 
incremental access. A common approach to query data would have to provide consistent user experience and have compact 
and reusable foundation to implement it.

### Solution:

When microservice implements a general query to a collection of objects it may include the following parts:

- **filter** – (optional) a collection of filter options
  - field – a field value
  - condition – a specific condition (like recently updated records)
- **query (q)** – (optional) a query filter expression (see below)
- **sort** – (optional) a list of fields to sort by. ‘-’ sign defines sorting in descendant order
- **paging** – (optional) paging options
  - skip – number of items to skip
  - take – number of items to return
  - total - include total count
- **include** – (optional) data fields to include
- **exclude** – (optional) data fields to exclude

When microservice implements a specific query it shall take parameters directly in the request. 
Example: block_id, start and end.

General note on using generic field names like ‘id’ or ‘name’ in query request. In most common situations their use 
is discouraged. Instead, it is recommended to use more specific names like ‘block_id’ or ‘user_name’. 
The reason is that quite often request may include multiple ids and it becomes confusing for user which one is which. 
(To be discussed)

Since data querying is so common and so critical, a query language may help to provide more tight control on what data 
is shall be returned to user. For that reason it is proposed to implement a simple expression language that can be used 
across all microservices written in any language and implemented for all supported persistent storages. (To be discussed)

## Customization

### Problem:

There may be situations when microservice implementation doesn’t cover all user requirements. As alternative to full 
reimplementation, a microservice may provide reasonable hooks to allow users to customize microservice data and business logic.

### Solution:

To support data customization microservice may include additional custom fields into data items that have free-form structure. 
There may be two custom fields:

- **custom_hdr** – custom data that is returned all the time, including querying large collections of data items. 
For efficiency, this field shall contain only data required for item overview visualization (like in lists) without details.
- **custom_dat** – extended version of custom data with all details necessary for item processing. It is returned only 
by specific request and excluded from general queries (lists).

Business logic customization is supported through “extensions” mechanisms. Business logic extensions are defined in microservice 
configuration in exts section. They “decorate” business logic controller and can intercept calls before or after (callbacks) 
they are handled by controller. So, extensions shall implement the same interface as microservice controller. 
Multiple extensions act as “onion layers” and called in the sequence they defined in the configuration.

In some situations, users can completely replace controller or data access implementation by defining “custom” component types. 
However, that approach may seem questionable.

When users cannot stay within microservice interface and need to change or extend it, they can implement a “decorator microservice”. 
Such microservice can expose additional methods, do additional processing and then delegate calls to the original microservice. 
If decorator microservice requires additional custom data it may use custom data extensions (see above) or complement original 
microservice data with data that is stored separately.