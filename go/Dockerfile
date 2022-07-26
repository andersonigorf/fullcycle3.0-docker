# Build stage
FROM golang:1.18-alpine as builder
WORKDIR /build
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux \
    go build \
    -ldflags '-s -w' \
    -o app main.go

# Run stage
FROM scratch
COPY --from=builder /build/app .
ENTRYPOINT [ "./app" ]