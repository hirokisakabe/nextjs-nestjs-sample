#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { VpcStack } from "../lib/vpc-stack";
import { EcsStack } from "../lib/ecs-stack";
import { PostgresStack } from "../lib/postgres-stack";

const app = new cdk.App();

const tag = { repo: "nextjs-nestjs-sample" } as const;

const vpcStack = new VpcStack(app, "VpcStack", { tags: tag });

const postgresStack = new PostgresStack(app, "PostgresStack", {
  vpc: vpcStack.vpc,
  tags: tag,
});

const ecsStack = new EcsStack(app, "EcsStack", {
  tags: tag,
  vpc: vpcStack.vpc,
  databaseEndpoint: postgresStack.clusterEndpoint,
});
