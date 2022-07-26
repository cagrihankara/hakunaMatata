# Hakuna Matata Project

![Nodejs 10.19.0](https://img.shields.io/badge/NodeJS-12.22.3-blue)
![NPM 8.14.0](https://img.shields.io/badge/NPM-6.14.13-blue)
![Build Passing](https://img.shields.io/badge/build-passing-green)

## Project Description

Uploads the file uploaded to the S3 bucket to another bucket. When a file is uploaded into the S3 bucket, this S3 bucket will trigger to Lambda function. Lambda function will copy this file from source bucket to destination bucket and write some file informations to specific DynamoDB table.

## Functions and Templates

* [Lambda](https://github.com//cagrihankara/hakunaMatata/tree/dev/src)
* [Templates](https://github.com/cagrihankara/hakunaMatata/tree/deployment)

## Pre-Requirements

* NodeJS `v10.19.0`
* NPM `v8.14.0`

## Project Environment and Running

[HOW TO CREATE/DEPLOY VPC TEMPLATE](###HOW-TO-CREATE-VPC-TEMPLATE)

[HOW TO ADD LAMBDA INTO YOUR VPC](###HOW-TO-ADD-LAMBDA-INTO-YOUR-VPC)

[HOW TO CREATE/DEPLOY MAIN STACK](###HOW-TO-CREATE-MAIN-STACK)

[HOW TO TRIGGER LAMBDA AND CHECK RESULTS](###HOW-TO-TRIGGER-LAMBDA-AND-CHECK-RESULTS)

### HOW TO CREATE/DEPLOY VPC TEMPLATE

#### Create your vpc-stack 

* Run this command:
aws cloudformation deploy --template-file deployment/vpc.yaml --stack-name vpc-stack

* If you say 'describe your stack-name', write this command:
aws cloudformation describe-stack-events --stack-name vpc-stack

### HOW TO ADD LAMBDA INTO YOUR VPC

* Go to VPC in your AWS Console.

* Open security groups tab and find your group id. 

* Open your subnets tab and find your subnet id.

* Add this ids into VPC config params, which is into Lambda resource. There is an example right below:
VpcConfig:
        SecurityGroupIds:
          - sg-0634e60cb1b41a973
        SubnetIds:
          - subnet-0dee549efa7046ebf 

### HOW TO CREATE/DEPLOY MAIN TEMPLATE

#### 1- Firstly, you should create S3 Bucket with AWS Console

* Go to S3 service in your AWS Console

* Create new bucket:

* Bucket name should be lambda-s3-bucket123454321, which we give a path as CodeURI in our template

CodeUri:
        Bucket: lambda-s3-bucket123454321
        Key: jobs/deneme.zip

#### 2- Run your lambda and create deneme.zip file

* Open your terminal in your src path

* Run $./deploy.sh

* Take deneme.zip file and upload in your S3 bucket folder, which is jobs in our case.
CodeUri:
        Bucket: lambda-s3-bucket123454321
        Key: jobs/deneme.zip

#### 3- Deploy/create stack

* Open your project path in your terminal.

* Run this command:
aws cloudformation create-stack --stack-name hakunaMatata-stack --template-url https://lambda-s3-bucket123454321.s3.eu-central-1.amazonaws.com/template.yaml --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM CAPABILITY_NAMED_IAM

* If you say 'describe your stack-name', write this command:
aws cloudformation describe-stack-events --stack-name hakunaMatata-stack

### HOW TO TRIGGER LAMBDA AND CHECK RESULTS

* Upload file into source S3 bucket

* Check target bucket and table for your process.