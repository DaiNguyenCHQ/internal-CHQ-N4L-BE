# internal-CHQ-N4L-BE

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
