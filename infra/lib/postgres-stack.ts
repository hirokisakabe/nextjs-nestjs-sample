import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";

interface Props extends StackProps {
  vpc: ec2.Vpc;
}

export class PostgresStack extends Stack {
  readonly clusterEndpoint: rds.Endpoint;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const auroraEngine = rds.DatabaseClusterEngine.auroraPostgres({
      version: rds.AuroraPostgresEngineVersion.VER_13_4,
    });

    const aurora_cluster = new rds.DatabaseCluster(this, "AuroraDatabase", {
      engine: auroraEngine,
      removalPolicy: RemovalPolicy.DESTROY,
      instanceProps: {
        vpc: props.vpc,
      },
    });

    this.clusterEndpoint = aurora_cluster.clusterEndpoint;
  }
}
