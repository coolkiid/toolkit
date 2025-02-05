import { TosClient } from "@volcengine/tos-sdk";
import { endpoint, accesskey, secretkey, region } from "../constants"


export async function createObjectStorageClient(): Promise<TosClient> {
  const opts = endpoint
    ? { endpoint: endpoint, secure: false }
    : { secure: true };

  return new TosClient({
    accessKeyId: accesskey,
    accessKeySecret: secretkey,
    region: region,
    ...opts
  });
}