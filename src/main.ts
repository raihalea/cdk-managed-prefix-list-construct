import { App, Aws, Stack, StackProps } from 'aws-cdk-lib';
import { Peer, Port, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { AwsManagedPrefixList } from './util/aws-managed-prefix-list';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc', {
      natGateways: 0,
    });

    const sg = new SecurityGroup(this, 'SecurityGroup', {
      vpc: vpc,
    });

    // Standard method
    // sg.connections.allowFrom(Peer.prefixList('pl-02cd2c6b'), Port.HTTPS);

    // S3 AWS-managed prefix lists
    const s3PrefixList = new AwsManagedPrefixList( this, 'S3PrefixList',
      { name: `com.amazonaws.${Aws.REGION}.s3` },
    ).prefixList;

    sg.connections.allowFrom(Peer.prefixList(s3PrefixList.prefixListId), Port.HTTPS);

    // CloudFront AWS-managed prefix lists
    const cloudfrontPrefixList = new AwsManagedPrefixList(
      this,
      'CloudfrontOriginPrefixList',
      { name: 'com.amazonaws.global.cloudfront.origin-facing' },
    ).prefixList;

    sg.connections.allowFrom(Peer.prefixList(cloudfrontPrefixList.prefixListId), Port.HTTPS);


  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'cdk-managed-prefix-list-construct-dev', { env: devEnv });
// new MyStack(app, 'cdk-managed-prefix-list-construct-prod', { env: prodEnv });

app.synth();