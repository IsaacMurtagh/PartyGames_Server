#!/bin/sh
: aws dynamodb create-table \
  --table-name Games \
  --attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S \
  --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE\
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --endpoint-url=http://127.0.0.1:8000

: aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S \
  --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE\
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --endpoint-url=http://127.0.0.1:8000

sam build && sam local start-api --docker-network lambda-local
