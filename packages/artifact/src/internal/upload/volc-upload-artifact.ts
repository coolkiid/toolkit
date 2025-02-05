import * as core from '@actions/core'
import {
  UploadArtifactOptions,
  UploadArtifactResponse
} from '../shared/interfaces'
import {validateArtifactName} from './path-and-artifact-name-validation'
import {
  UploadZipSpecification,
  getUploadZipSpecification,
  validateRootDirectory
} from './upload-zip-specification'
import {getBackendIdsFromToken} from '../shared/util'
import {createZipUploadStream} from './zip'
import {FilesNotFoundError, InvalidResponseError} from '../shared/errors'
import { createObjectStorageClient } from '../shared/tos-client'
import { bucketName, repoName } from '../constants'


export async function uploadArtifact(
  name: string,
  files: string[],
  rootDirectory: string,
  options?: UploadArtifactOptions | undefined
): Promise<UploadArtifactResponse> {
  validateArtifactName(name)
  validateRootDirectory(rootDirectory)

  const zipSpecification: UploadZipSpecification[] = getUploadZipSpecification(
    files,
    rootDirectory
  )
  if (zipSpecification.length === 0) {
    throw new FilesNotFoundError(
      zipSpecification.flatMap(s => (s.sourcePath ? [s.sourcePath] : []))
    )
  }

  // get the IDs needed for the artifact creation
  const backendIds = getBackendIdsFromToken()

  // create the artifact client
  // const artifactClient = internalArtifactTwirpClient()

  // create the artifact
  // const createArtifactReq: CreateArtifactRequest = {
  //   workflowRunBackendId: backendIds.workflowRunBackendId,
  //   workflowJobRunBackendId: backendIds.workflowJobRunBackendId,
  //   name,
  //   version: 4
  // }

  // if there is a retention period, add it to the request
  // const expiresAt = getExpiration(options?.retentionDays)
  // if (expiresAt) {
  //   createArtifactReq.expiresAt = expiresAt
  // }

  // const createArtifactResp =
  //   await artifactClient.CreateArtifact(createArtifactReq)
  // if (!createArtifactResp.ok) {
  //   throw new InvalidResponseError(
  //     'CreateArtifact: response from backend was not ok'
  //   )
  // }

  const client = await createObjectStorageClient()
  const fileName = `${name}-${backendIds.workflowRunBackendId}-${backendIds.workflowJobRunBackendId}.zip`
  const objectName = `artifacts/${repoName}/${fileName}`  

  const zipUploadStream = await createZipUploadStream(
    zipSpecification,
    options?.compressionLevel
  )

  await client.putObject({
    bucket: bucketName,
    key: objectName,
    body: zipUploadStream
  })

  // Upload zip to blob storage
  // const uploadResult = await uploadZipToBlobStorage(
  //   createArtifactResp.signedUploadUrl,
  //   zipUploadStream
  // )

  // finalize the artifact
  // const finalizeArtifactReq: FinalizeArtifactRequest = {
  //   workflowRunBackendId: backendIds.workflowRunBackendId,
  //   workflowJobRunBackendId: backendIds.workflowJobRunBackendId,
  //   name,
  //   size: uploadResult.uploadSize ? uploadResult.uploadSize.toString() : '0'
  // }

  // if (uploadResult.sha256Hash) {
  //   finalizeArtifactReq.hash = StringValue.create({
  //     value: `sha256:${uploadResult.sha256Hash}`
  //   })
  // }

  core.info(`Finalizing artifact upload`)

  // const finalizeArtifactResp =
  //   await artifactClient.FinalizeArtifact(finalizeArtifactReq)
  // if (!finalizeArtifactResp.ok) {
  //   throw new InvalidResponseError(
  //     'FinalizeArtifact: response from backend was not ok'
  //   )
  // }

  // const artifactId = BigInt(finalizeArtifactResp.artifactId)
  // core.info(
  //   `Artifact ${name}.zip successfully finalized. Artifact ID ${artifactId}`
  // )

  const { data } = await client.headObject({
    bucket: bucketName,
    key: objectName,
  });

  core.info(
    `Artifact ${name}.zip successfully finalized. data=${data}`
  )

  return {
    size: Number(data['content-length']),
    digest: 'xxxx',
    id: 0
  }
}
