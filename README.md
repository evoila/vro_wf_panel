# vro_wf_panel
Panel to start and monitor VMware Orchestrator Workflows

## Installation
### Prerequirements
* Install nodeJS incl. npm

### Prepare vRealize Orchestrator

in orchestrator add the following to /usr/lib/vco/app-server/deploy/vco/WEB-INF/web.xml :

```
<filter>
  <filter-name>CorsFilter</filter-name>
  <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
  <init-param>
    <param-name>cors.allowed.methods</param-name>
    <param-value>GET,POST,HEAD,OPTIONS,PUT</param-value>
  </init-param>
  <init-param>
    <param-name>cors.allowed.origins</param-name>
    <param-value>http://localhost:3000</param-value>
  </init-param>
  <init-param>
    <param-name>cors.allowed.headers</param-name>
    <param-value>Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Accept,Authorization</param-value>
  </init-param>
  <init-param>
    <param-name>cors.exposed.headers</param-name>
    <param-value>Access-Control-Allow-Origin,Access-Control-Allow-Credentials</param-value>
  </init-param>
</filter>
<filter-mapping>
  <filter-name>CorsFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

### Get started
* Check out this repository and navigate in your terminal into the root folder
* Fire the following commands:
  * npm install
  * npm start

Now a browser should popup with the application running
