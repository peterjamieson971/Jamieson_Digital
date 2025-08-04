# AWS Deployment Guide for JamiesonDigital3

This guide provides comprehensive step-by-step instructions for deploying your Node.js/React application to AWS using multiple deployment strategies.

## Application Overview

- **Frontend**: React with Vite build system
- **Backend**: Express.js server with TypeScript
- **Database**: Neon Database (PostgreSQL)
- **Build System**: Vite + ESBuild
- **Port**: 5000 (configurable via PORT environment variable)

## Prerequisites

Before starting, ensure you have:

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Docker** installed (for containerized deployments)
4. **Node.js 18+** installed locally
5. **Git** repository access
6. **Database credentials** (Neon Database connection string)

## Deployment Option 1: AWS App Runner (Recommended)

AWS App Runner is the simplest option for your application since you already have the `apprunner.yaml` configuration.

### Step 1: Prepare Your Repository

1. **Ensure your code is in a Git repository** (GitHub, GitLab, or Bitbucket)
2. **Verify your apprunner.yaml configuration**:
   ```yaml
   version: 1.0
   runtime: nodejs18
   build:
     commands:
       build:
         - npm ci
         - npm run build
   run:
     runtime-version: 18
     command: npm start
     network:
       port: 5000
     env:
       - name: NODE_ENV
         value: production
   ```

### Step 2: Set Up Environment Variables

1. **Create a `.env.production` file** (do not commit this):
   ```env
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=your_neon_database_connection_string
   RESEND_API_KEY=your_resend_api_key
   SESSION_SECRET=your_secure_session_secret
   ```

### Step 3: Deploy via AWS Console

1. **Navigate to AWS App Runner** in the AWS Console
2. **Click "Create service"**
3. **Configure Source**:
   - Source type: Source code repository
   - Connect to your Git provider (GitHub/GitLab/Bitbucket)
   - Repository: Select your repository
   - Branch: main (or your production branch)
   - Automatic deployments: Yes (recommended)

4. **Configure Build**:
   - Configuration file: Use configuration file (apprunner.yaml will be detected)

5. **Configure Service**:
   - Service name: `jamiesondigital3-app`
   - Instance configuration: 1 vCPU, 2 GB memory (adjust as needed)

6. **Configure Environment Variables**:
   - Add all your production environment variables
   - ⚠️ **Never commit secrets to your repository**

7. **Review and Create**:
   - Review all settings
   - Click "Create & deploy"

### Step 4: Configure Custom Domain (Optional)

1. **In App Runner service settings**:
   - Go to "Custom domains"
   - Add your domain (e.g., jamiesondigital.com)
   - Update your DNS records as instructed

## Deployment Option 2: Amazon ECS with Fargate

For more control and scalability, use ECS with the existing Dockerfile.

### Step 1: Build and Push Docker Image

1. **Create an Amazon ECR repository**:
   ```bash
   aws ecr create-repository --repository-name jamiesondigital3 --region us-east-1
   ```

2. **Get login credentials**:
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   ```

3. **Build your Docker image**:
   ```bash
   docker build -t jamiesondigital3 .
   ```

4. **Tag and push the image**:
   ```bash
   docker tag jamiesondigital3:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/jamiesondigital3:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/jamiesondigital3:latest
   ```

### Step 2: Create ECS Infrastructure

1. **Create a VPC** (or use default):
   ```bash
   # Use AWS Console or CLI to create VPC with public subnets
   ```

2. **Create ECS Cluster**:
   ```bash
   aws ecs create-cluster --cluster-name jamiesondigital3-cluster
   ```

3. **Create Task Definition** (`task-definition.json`):
   ```json
   {
     "family": "jamiesondigital3-task",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "512",
     "memory": "1024",
     "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
     "containerDefinitions": [
       {
         "name": "jamiesondigital3-container",
         "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/jamiesondigital3:latest",
         "portMappings": [
           {
             "containerPort": 5000,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "NODE_ENV",
             "value": "production"
           },
           {
             "name": "PORT",
             "value": "5000"
           }
         ],
         "secrets": [
           {
             "name": "DATABASE_URL",
             "valueFrom": "arn:aws:secretsmanager:us-east-1:<account-id>:secret:database-url"
           }
         ],
         "logConfiguration": {
           "logDriver": "awslogs",
           "options": {
             "awslogs-group": "/ecs/jamiesondigital3",
             "awslogs-region": "us-east-1",
             "awslogs-stream-prefix": "ecs"
           }
         }
       }
     ]
   }
   ```

4. **Register Task Definition**:
   ```bash
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   ```

### Step 3: Create Application Load Balancer

1. **Create ALB**:
   ```bash
   aws elbv2 create-load-balancer \
     --name jamiesondigital3-alb \
     --subnets subnet-xxxxx subnet-yyyyy \
     --security-groups sg-xxxxx
   ```

2. **Create Target Group**:
   ```bash
   aws elbv2 create-target-group \
     --name jamiesondigital3-targets \
     --protocol HTTP \
     --port 5000 \
     --vpc-id vpc-xxxxx \
     --target-type ip
   ```

3. **Create Listener**:
   ```bash
   aws elbv2 create-listener \
     --load-balancer-arn <alb-arn> \
     --protocol HTTP \
     --port 80 \
     --default-actions Type=forward,TargetGroupArn=<target-group-arn>
   ```

### Step 4: Create ECS Service

```bash
aws ecs create-service \
  --cluster jamiesondigital3-cluster \
  --service-name jamiesondigital3-service \
  --task-definition jamiesondigital3-task \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx,subnet-yyyyy],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=<target-group-arn>,containerName=jamiesondigital3-container,containerPort=5000
```

## Deployment Option 3: AWS Elastic Beanstalk

### Step 1: Prepare Application

1. **Create deployment package**:
   ```bash
   # Remove node_modules and create a zip
   rm -rf node_modules
   zip -r jamiesondigital3.zip . -x "node_modules/*" ".git/*" "*.log"
   ```

2. **Create `.ebextensions/nodejs.config`**:
   ```yaml
   option_settings:
     aws:elasticbeanstalk:container:nodejs:
       NodeCommand: "npm start"
       NodeVersion: "18"
     aws:elasticbeanstalk:application:environment:
       NODE_ENV: production
       PORT: 8080
   ```

### Step 2: Deploy to Elastic Beanstalk

1. **Create application**:
   ```bash
   aws elasticbeanstalk create-application --application-name jamiesondigital3
   ```

2. **Create environment**:
   ```bash
   aws elasticbeanstalk create-environment \
     --application-name jamiesondigital3 \
     --environment-name jamiesondigital3-prod \
     --solution-stack-name "64bit Amazon Linux 2 v5.8.4 running Node.js 18"
   ```

3. **Deploy application**:
   ```bash
   aws elasticbeanstalk create-application-version \
     --application-name jamiesondigital3 \
     --version-label v1.0 \
     --source-bundle S3Bucket=<your-bucket>,S3Key=jamiesondigital3.zip

   aws elasticbeanstalk update-environment \
     --environment-name jamiesondigital3-prod \
     --version-label v1.0
   ```

## Environment Variables Setup

For all deployment methods, you'll need these environment variables:

### Required Variables
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_neon_database_connection_string
SESSION_SECRET=your_secure_random_session_secret
```

### Optional Variables
```env
RESEND_API_KEY=your_resend_api_key_for_emails
LOG_LEVEL=info
```

### Secure Storage Options

1. **AWS Systems Manager Parameter Store**:
   ```bash
   aws ssm put-parameter \
     --name "/jamiesondigital3/database-url" \
     --value "your_database_connection_string" \
     --type "SecureString"
   ```

2. **AWS Secrets Manager**:
   ```bash
   aws secretsmanager create-secret \
     --name "jamiesondigital3/database" \
     --secret-string '{"DATABASE_URL":"your_connection_string"}'
   ```

## Database Setup

Your application uses Neon Database. Ensure:

1. **Database is accessible from AWS**
2. **Connection string is secure**
3. **Database migrations are run**:
   ```bash
   # Run this locally or in a deployment script
   npm run db:push
   ```

## Monitoring and Logging

### CloudWatch Logs
- All deployment options automatically send logs to CloudWatch
- Log group: `/aws/apprunner/<service-name>` (App Runner) or custom

### Health Checks
Your Express server should respond to health checks on `/health` or `/`:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
```

## SSL/TLS Certificate

### For Custom Domains
1. **Request ACM Certificate**:
   ```bash
   aws acm request-certificate \
     --domain-name jamiesondigital.com \
     --domain-name www.jamiesondigital.com \
     --validation-method DNS
   ```

2. **Validate certificate** by adding DNS records
3. **Configure HTTPS** in your load balancer or App Runner

## CI/CD Pipeline (Optional)

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to App Runner
        run: |
          # App Runner will automatically deploy when you push to main
          echo "Deployment triggered via Git push"
```

## Troubleshooting

### Common Issues

1. **Port Configuration**: Ensure PORT environment variable matches your service configuration
2. **Database Connection**: Verify DATABASE_URL is correctly formatted and accessible
3. **Build Failures**: Check that all dependencies are in package.json, not just devDependencies
4. **Memory Issues**: Increase instance size if builds fail due to memory constraints

### Debugging Commands
```bash
# Check App Runner service status
aws apprunner describe-service --service-arn <service-arn>

# View ECS service events
aws ecs describe-services --cluster <cluster> --services <service>

# Check logs
aws logs describe-log-groups
aws logs get-log-events --log-group-name <group> --log-stream-name <stream>
```

## Cost Optimization

### App Runner Pricing
- Pay per vCPU and memory used
- Automatic scaling reduces costs during low traffic

### ECS Fargate Pricing
- Pay for compute resources used
- Can use Spot instances for cost savings

### Elastic Beanstalk Pricing
- Pay for underlying EC2 instances
- Can configure auto-scaling policies

## Security Best Practices

1. **Never commit secrets** to your repository
2. **Use AWS IAM roles** with minimal required permissions
3. **Enable AWS WAF** for web application firewall protection
4. **Configure security groups** to allow only necessary traffic
5. **Use HTTPS** for all production traffic
6. **Regularly update dependencies** for security patches

## Next Steps

1. Choose your preferred deployment method (App Runner recommended for simplicity)
2. Set up your AWS account and configure credentials
3. Prepare your environment variables securely
4. Deploy your application following the chosen method
5. Configure monitoring and alerts
6. Set up a custom domain if needed
7. Implement CI/CD pipeline for automated deployments

## Support

For AWS-specific issues:
- AWS Documentation: https://docs.aws.amazon.com/
- AWS Support Center: https://console.aws.amazon.com/support/

For application-specific issues:
- Check application logs in CloudWatch
- Verify environment variables are set correctly
- Ensure database connectivity

---

**Note**: Replace placeholder values (account-id, subnet-xxxxx, etc.) with your actual AWS resource IDs when following this guide.