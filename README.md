# Deno Middleware Library

A collection of middleware for Deno's Oak framework, featuring logging, JWT authentication, and error handling utilities. This library simplifies the process of managing common functionalities in your Deno applications.

## Features

- **Logger Middleware**: Logs HTTP requests with duration and method.
- **JWT Authentication Middleware**: Validates JWT tokens and sets user context.
- **Error Handling Middleware**: Catches errors and returns appropriate HTTP responses.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Logger Middleware](#logger-middleware)
  - [JWT Authentication Middleware](#jwt-authentication-middleware)
  - [Error Handling Middleware](#error-handling-middleware)
- [Testing](#testing)
- [License](#license)

## Installation

Make sure you have Deno installed on your machine. You can install Deno by following the instructions [here](https://deno.land/#installation).

To use the middleware, clone the repository to your local machine:
```bash
git clone https://github.com/zikriacodes/deno-middleware-library.git
cd deno-middleware-library
```

# Usage
## Logger Middleware
The logger middleware logs the HTTP method, URL, and duration of requests.
```typescript
import { Application } from "https://deno.land/x/oak/mod.ts";
import { logger } from "./path/to/deno-middleware-library/src/index.ts";

const app = new Application();

app.use(logger);

// Your routes and other middleware here

await app.listen({ port: 8000 });
```

## JWT Authentication Middleware
The JWT authentication middleware checks for a valid token in the Authorization header.
```typescript
import { jwtAuth } from "./path/to/deno-middleware-library/src/index.ts";

app.use(jwtAuth);

// Your protected routes here
```

## Error Handling Middleware
The error handler middleware catches errors and returns a 500 status with a message.
```typescript
import { errorHandler } from "./path/to/deno-middleware-library/src/index.ts";

app.use(errorHandler);

// Your routes here
```

## Testing
To run the tests for this library, use the following command:
```bash
deno test tests/
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
