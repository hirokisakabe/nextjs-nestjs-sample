import { Stack, StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

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

    const auroraClusterSecret = new secretsmanager.Secret(
      this,
      "AuroraClusterCredentials",
      {
        secretName: "AuroraClusterCredentials",
        description: "AuroraClusterCrendetials",
      }
    );

    // aurora credentials
    const auroraClusterCrendentials =
      rds.Credentials.fromSecret(auroraClusterSecret);

    const aurora_cluster = new rds.DatabaseCluster(this, "AuroraDatabase", {
      engine: auroraEngine,
      removalPolicy: RemovalPolicy.DESTROY,
      instanceProps: {
        vpc: props.vpc,
      },
      credentials: auroraClusterCrendentials,
    });

    this.clusterEndpoint = aurora_cluster.clusterEndpoint;

    new CfnOutput(this, "AuroraClusterCredentialSecretArn", {
      value: aurora_cluster.secret?.secretArn || "",
    });
  }
}
