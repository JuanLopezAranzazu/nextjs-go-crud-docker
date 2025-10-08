# Build stage
FROM golang:1.25.1-alpine AS builder

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache git

# Copiar go.mod y go.sum
COPY go.mod go.sum ./

# Descargar dependencias
RUN go mod download

# Copiar todo el código
COPY . .

# Compilar la app
RUN go build -o /go-app

# Run stage
FROM alpine:latest

WORKDIR /

# Copiar el binario compilado
COPY --from=builder /go-app .

# Variables de entorno
ENV PORT=8000

EXPOSE 8000

CMD ["/go-app"]
