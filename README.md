# internal-CHQ-N4L-BE

# setup traefik
1. go to c/Windows/system32/drivers/etc add these line of subdomain:
  
  127.0.0.1 ui.todo.com
  127.0.0.1 api.todo.com

2. go to traefik directory
  - run `docker create network web` to init traefik network
  - run `docker-compose up -d` to init traefik

## Run steps:

1: Install Docker

2: Run docker command: `docker compose build --no-cache`

3: Run docker command: `docker compose up -d`

## Configuration
1: MongoDB Connection String: `mongodb://codehq:codehq@localhost:27017/?authSource=admin`

2: RabbitMQ Management: `localhost:15672` (username: codehq, pass: codehq)

3: Containers:
  - n4l-be: `localhost:3001`
  - mongodb: `localhost:27017` (please use connection string for GUI)
  - rabbitmq: `localhost:5672`

4. checkout source code
  - run: `npm i`
  - run `tsc`
  - run `npm run start`

5. NOTE FOR DEV:
  - `docker compose up -d mongodb rabbitmq` to start these dependency services
  - on source code: run `npm i` then `npm run dev`

6.
  - frontend will be exposed on domain: http://ui.todo.com
  - backend will be exposed on domain: http://api.todo.com

