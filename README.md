# vy-express-medical

This project is a NodeJS/Express web application REST API that utilizes a
relational database MySQL for its data and persistence.

### Endpoints
- /api/v1/prescriptions GET
- /api/v1/prescriptions POST
- /api/v1/prescriptions DELETE
- /api/v1/prescriptions/{id} GET
- /api/v1/prescriptions/{id} PUT
- /api/v1/prescriptions/{id} DELETE
- /api-docs Swagger API Specification

**NOTE**: There will probably be more resources and endpoints however, this is the
current list of endpoints prior to hosting and feature iterations. (Oct 25 2023)

### Prerequisites

Node and NPM are required on your system prior to building or running this
application locally. You can however, download NodeJS and with that installation
you get of Node Package Manager (NPM).

If you do not have NodeJS, you can get it here: https://nodejs.org/en/download/

### Build

A NodeJS/Express application has NPM dependencies but this software repository
is not the venue to host them. This project however, has a `package.json` file
that specifies these dependencies and the NPM utility can be used to populate
your `medical` code base with the dependencies it needs.

```shell
npm install
```

This command when run at the parent directory Node Package Manager (NPM) will
download and install all the application's dependencies locally in a folder
or directory called `node-modules`. Once everything is in place, you need to
establish a database for the application to use for persistence.

A utility repo/project here (https://github.com/dlwhitehurst/vy-data-support)
can be used for local development and testing.

Once the database is running, we need to export ENV variables for the
`vy-express-medical` application to use for its database connection. What
I'm describing is NOT for production use. The `vy-express-medical` application
looks for specific ENV vars such as username, password, host, and schema for it to
connect via socket on port 3306 (mysql default port).

Assign the following ENV variables for our localhost testing.

```shell
export DB_HOST='localhost'
export DB_USERNAME='root'
export DB_PASSWORD='example'
export DB_SCHEMA='medical'
```

With our exports in place and the Node dependencies downloaded, we can now start
the `vy-express-medical` application on localhost.

```shell
npm start
```

You should see output like so:

```shell
> node server.js

Server is running on port 3000.
```

You can use curl to test the application or just open a browser for the GET-
assets call e.g.. Here's a curl command to see if your application is running.

```shell
curl -i -X GET http://localhost:3000/api/v1/prescriptions
```
--- 
```shell
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 333
ETag: W/"14d-tOy/ITTm66XZ2hUwIhaA0xM4heI"
Date: Wed, 25 Oct 2023 22:33:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":5,"name":"Benedryl","identNo":"6792999","size":"","form":"tablet","rxUnit":"10mg","quantity":"60","pharmacy":"Kroger","pharmacyPhone":"919-567-5499","written":"10/23/2023","writtenBy":"Dr. Smith","filled":"10/23/2023","expired":"10/23/2025","refillNote":"No refills remaining","manufacturedBy":"Bayer","note":"Take at night"}]
```
# medical
