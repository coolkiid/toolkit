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
import {FilesNotFoundError} from '../shared/errors'
import { createObjectStorageClient, handleError } from '../shared/tos-client'
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

  const client = await createObjectStorageClient()
  const fileName = `${name}-${backendIds.workflowRunBackendId}-${backendIds.workflowJobRunBackendId}.zip`
  const objectName = `artifacts/${repoName}/${fileName}`  

  const zipUploadStream = await createZipUploadStream(
    zipSpecification,
    options?.compressionLevel
  )
  try {
    await client.putObject({
      bucket: bucketName,
      key: objectName,
      body: zipUploadStream
    })
  } catch (error) {
    handleError(error)
  }

  core.info(`Finalizing artifact upload`)

  const { data } = await client.headObject({
    bucket: bucketName,
    key: objectName,
  });

  return {
    size: Number(data['content-length']),
    digest: data['content-md5'],
    id: 0
  }
}
