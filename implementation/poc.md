# Front end:
- Angular 14.2.8
- Angular materials 14.2.6

Something similar to https://appbuilder.indigo.design/

For deployment of the prototypes can use:
https://www.npmjs.com/package/igniteui-angular

# Deployment
- Download a zip file for users to download
- A play button to view the app real time (very tricky if you want to add it as a reverse proxy)
- Docker and nginx reverse proxy

# Sample app
- Publish to a port
- Reverse proxy  e.g. /myapp/{uuid of app}
- Schematics to create the app from the prototypes
- Get APIs from the Experimentation server for Tasks and Variant information