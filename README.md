## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Configuration

The configuration only requires specifying the values of the environment variables detailed in the .env-local file, the same when executing the script

```bash
# watch mode
$ npm run start:dev
```

It is copied and the .env file is created with the local values, otherwise you must simply create it with the detailed environment variables in .env-local and execute the startup script.

```bash
# development
$ npm run start
```

To run the compiled version and work in production it is necessary to set the environment variable NODE_ENV=production and run the following script

```bash
# production
# set NODE_ENV=production
# it is necessary to execute before $ npm run build
$ npm run start:prod
```

## Database

Since the application already has the minimum migrations to be able to function, it is only necessary to execute the migrations before starting the system

<details>
  <summary>Generate Migration</summary>
  <p>

```bash
npm run typeorm:mgr:gen --name=CreateSetup
```

  </p>
</details>
<details>
  <summary>Create Migration</summary>
  <p>

```bash
npm run typeorm:mgr:cre --name=Personal
```

  </p>
</details>
<details>
  <summary>Run Migration</summary>
  <p>

```bash
npm run typeorm:mgr:run
```

  </p>
</details>
<details>
  <summary>Revert Migration</summary>
    <p>

```bash
npm run typeorm:mgr:rev
```

  </p>
</details>
