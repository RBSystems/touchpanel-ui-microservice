FROM golang:1.6.2-alpine

RUN apk update && apk upgrade && apk add git

RUN mkdir -p /go/src/github.com/byuoitav
ADD . /go/src/github.com/byuoitav/raspi-tp

WORKDIR /go/src/github.com/byuoitav/raspi-tp
RUN go get -d -v
RUN go install -v

CMD ["/go/bin/raspi-tp"]

EXPOSE 9000
