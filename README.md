# Serverless Notes App (Keeper)

A minimal Google Keep clone built as a full-stack serverless notes application with React and AWS.

The project demonstrates a production-style serverless architecture using AWS managed services.

## Architecture

Browser  
↓  
CloudFront (CDN)  
↓  
S3 Static Hosting (React)  
↓  
API Gateway (REST API)  
↓  
Lambda Functions  
↓  
DynamoDB

## Tech Stack

Frontend
- React
- JavaScript

Backend
- AWS Lambda
- API Gateway
- DynamoDB

Infrastructure
- S3
- CloudFront