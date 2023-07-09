# internal-CHQ-N4L-BE

## Run steps:

docker build . -t codehq/n4l-be

docker run -d -p 3000:3000 --name n4l-be codehq/n4l-be
