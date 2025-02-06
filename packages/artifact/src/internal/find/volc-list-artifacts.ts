import {info, warning, debug} from '@actions/core'
import {getOctokit} from '@actions/github'
import {ListArtifactsResponse, Artifact} from '../shared/interfaces'
import {getUserAgentString} from '../shared/user-agent'
import {getRetryOptions} from './retry-options'
import {defaults as defaultGitHubOptions} from '@actions/github/lib/utils'
import {requestLog} from '@octokit/plugin-request-log'
import {retry} from '@octokit/plugin-retry'
import {OctokitOptions} from '@octokit/core/dist-types/types'
import {internalArtifactTwirpClient} from '../shared/artifact-twirp-client'
import {getBackendIdsFromToken} from '../shared/util'
import {ListArtifactsRequest, Timestamp} from '../../generated'
import { createObjectStorageClient, handleError } from '../shared/tos-client'
import { bucketName, repoName } from '../constants'
import * as core from '@actions/core'

// Limiting to 1000 for perf reasons
const maximumArtifactCount = 1000
const paginationCount = 100


export async function listArtifactsInternal(
  latest = false
): Promise<ListArtifactsResponse> {
  const artifactClient = internalArtifactTwirpClient()

  const client = await createObjectStorageClient()

  const {workflowRunBackendId, workflowJobRunBackendId} =
    getBackendIdsFromToken()

  const req: ListArtifactsRequest = {
    workflowRunBackendId,
    workflowJobRunBackendId
  }

  // const res = await artifactClient.ListArtifacts(req)
  // let artifacts: Artifact[] = res.artifacts.map(artifact => ({
  //   name: artifact.name,
  //   id: Number(artifact.databaseId),
  //   size: Number(artifact.size),
  //   createdAt: artifact.createdAt
  //     ? Timestamp.toDate(artifact.createdAt)
  //     : undefined
  // }))

  let artifacts: Artifact[] = []
  const objectKeyPrefix = `artifacts/${repoName}/${workflowRunBackendId}`

  core.error(`!!!listArtifactInternal: ${workflowRunBackendId}, ${workflowJobRunBackendId}`)

  try {
    const { data } = await client.listObjectsType2({
      bucket: bucketName,
      maxKeys: maximumArtifactCount,
      prefix: objectKeyPrefix
    });
    for (const obj of data.Contents) {
      const artifactName = obj.Key.slice(objectKeyPrefix.length + 1, obj.Key.length - 4);
      artifacts.push({
        name: artifactName,
        id: 0,
        size: obj.Size,
      });
    }
  } catch (error) {
    handleError(error);
  }

  if (latest) {
    artifacts = filterLatest(artifacts)
  }

  info(`Found ${artifacts.length} artifact(s)`)

  return {
    artifacts
  }
}

/**
 * Filters a list of artifacts to only include the latest artifact for each name
 * @param artifacts The artifacts to filter
 * @returns The filtered list of artifacts
 */
function filterLatest(artifacts: Artifact[]): Artifact[] {
  artifacts.sort((a, b) => b.id - a.id)
  const latestArtifacts: Artifact[] = []
  const seenArtifactNames = new Set<string>()
  for (const artifact of artifacts) {
    if (!seenArtifactNames.has(artifact.name)) {
      latestArtifacts.push(artifact)
      seenArtifactNames.add(artifact.name)
    }
  }
  return latestArtifacts
}
