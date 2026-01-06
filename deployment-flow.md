## set aws cli up:

https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html

## build docker container

```
docker build --target production --platform=linux/amd64,linux/arm64 -t rolling-board-ecr/api .
```

## push to ecr

```
docker tag rolling-board-ecr/api:latest 981019652480.dkr.ecr.ap-southeast-2.amazonaws.com/rolling-board-ecr/api:latest
```

```
docker push 981019652480.dkr.ecr.ap-southeast-2.amazonaws.com/rolling-board-ecr/api:latest
```
