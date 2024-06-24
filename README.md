# AwsManagedPrefixList Construct

The `AwsManagedPrefixList` construct is a custom construct for the AWS Cloud Development Kit (CDK) that simplifies the usage of AWS managed prefix lists in your CDK applications. AWS managed prefix lists are collections of IP address ranges for AWS services, and this construct makes it easy to reference and use these lists in your security groups.

## Overview

This construct provides a straightforward way to retrieve and use AWS managed prefix lists by their names. It leverages the `AwsCustomResource` to dynamically fetch the prefix list IDs and makes them available for use in your CDK applications.

## Example

Here's an example of how to use the `AwsManagedPrefixList` construct in a CDK stack. For full example code, please refer to the [main.ts](./main.ts) file.

## Construct Implementation

The `AwsManagedPrefixList` construct is implemented to dynamically fetch and use AWS managed prefix lists in your CDK applications. The implementation uses `AwsCustomResource` to describe managed prefix lists and obtain their IDs, which can then be used in security groups or other constructs that accept prefix lists. You can find the implementation in the [aws-managed-prefix-list.ts](./util/aws-managed-prefix-list.ts) file.

## Usage

1. **Import the Construct**: Ensure you have imported the `AwsManagedPrefixList` construct in your CDK application.
2. **Instantiate the Construct**: Use the construct within your stack to create and use managed prefix lists.
3. **Add Ingress Rules**: Use the managed prefix list IDs to add ingress rules to your security groups.

## References

- [AWS Managed Prefix Lists](https://docs.aws.amazon.com/vpc/latest/userguide/working-with-aws-managed-prefix-lists.html)
- [AWS CDK GitHub Issue #13668](https://github.com/aws/aws-cdk/issues/13668)
