import {getOctokit} from '@actions/github'
import {retry} from '@octokit/plugin-retry'
import * as core from '@actions/core'
import {OctokitOptions} from '@octokit/core/dist-types/types'
import {defaults as defaultGitHubOptions} from '@actions/github/lib/utils'
import {getRetryOptions} from './retry-options'
import {requestLog} from '@octokit/plugin-request-log'
import {GetArtifactResponse} from '../shared/interfaces'
import {getBackendIdsFromToken} from '../shared/util'
import {getUserAgentString} from '../shared/user-agent'
import {internalArtifactTwirpClient} from '../shared/artifact-twirp-client'
import {ListArtifactsRequest, StringValue, Timestamp} from '../../generated'
import {ArtifactNotFoundError, InvalidResponseError} from '../shared/errors'
import { createObjectStorageClient, handleError } from '../shared/tos-client'
import { bucketName, repoName } from '../constants'

export async function getArtifactInternal(
  artifactName: string
): Promise<GetArtifactResponse> {
  // const artifactClient = internalArtifactTwirpClient()

  const client = await createObjectStorageClient()

  const {workflowRunBackendId, workflowJobRunBackendId} =
    getBackendIdsFromToken()

  // const req: ListArtifactsRequest = {
  //   workflowRunBackendId,
  //   workflowJobRunBackendId,
  //   nameFilter: StringValue.create({value: artifactName})
  // }

  // const res = await artifactClient.ListArtifacts(req)

  core.error(`!!!getArtifactInternal: ${workflowRunBackendId}, ${workflowJobRunBackendId}`)

  const fileName = `${workflowRunBackendId}-${artifactName}.zip`
  const objectName = `artifacts/${repoName}/${fileName}`

  let data = {};
  try {
    data = await client.headObject({
      bucket: bucketName,
      key: objectName,
    });
  } catch (error) {
    core.error(`!!! ${objectName}`)

    handleError(error);
    throw new ArtifactNotFoundError(
      `Artifact not found for name: ${artifactName}
        Please ensure that your artifact is not expired and the artifact was uploaded using a compatible version of toolkit/upload-artifact.
        For more information, visit the GitHub Artifacts FAQ: https://github.com/actions/toolkit/blob/main/packages/artifact/docs/faq.md`
    )
  }

  // let artifact = res.artifacts[0]
  // if (res.artifacts.length > 1) {
  //   artifact = res.artifacts.sort(
  //     (a, b) => Number(b.databaseId) - Number(a.databaseId)
  //   )[0]

  //   core.debug(
  //     `More than one artifact found for a single name, returning newest (id: ${artifact.databaseId})`
  //   )
  // }

  return {
    artifact: {
      name: artifactName,
      id: 0,
      size: Number(data['content-length']),
      createdAt: undefined
    }
  }
}
