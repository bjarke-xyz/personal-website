FROM docker.io/golang:1.23-alpine

RUN apk add --no-cache make

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . ./

RUN make build