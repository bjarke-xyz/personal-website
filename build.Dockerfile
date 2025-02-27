FROM docker.io/golang:1.23

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . ./

RUN make build