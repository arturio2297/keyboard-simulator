## Local Start

### Run backend
```shell
mvn spring-boot:run
```

### Install frontend deps
```shell
yarn --cwd ./frontend install --frozen-lockfile
```

### Run frontend
```shell
yarn --cwd ./frontend start
```

## Docker Start

### Up
```shell
docker-compose -f docker-compose.dev.local --env-file "env/.env.local" up -d
```

### Down
```shell
docker-compose -f docker-compose.dev.local --env-file "env/.env.local" down
```