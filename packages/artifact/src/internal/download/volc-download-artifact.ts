import { promises as fs, createReadStream, unlinkSync } from 'fs'
import * as github from '@actions/github'
import * as core from '@actions/core'
import * as httpClient from '@actions/http-client'
import * as path from 'path'
import unzip from 'unzip-stream'
import {
  DownloadArtifactOptions,
  DownloadArtifactResponse
} from '../shared/interfaces'
import {getUserAgentString} from '../shared/user-agent'
import {getGitHubWorkspaceDir} from '../shared/config'
import {internalArtifactTwirpClient} from '../shared/artifact-twirp-client'
import {
  GetSignedArtifactURLRequest,
  Int64Value,
  ListArtifactsRequest
} from '../../generated'
import {getBackendIdsFromToken} from '../shared/util'
import {ArtifactNotFoundError} from '../shared/errors'
import { createObjectStorageClient, handleError } from '../shared/tos-client'
import { bucketName, repoName } from '../constants'
import { DefaultArtifactClient } from '../volc-client'

const scrubQueryParameters = (url: string): string => {
  const parsed = new URL(url)
  parsed.search = ''
  return parsed.toString()
}

async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    } else {
      throw error
    }
  }
}

async function streamExtract(url: string, directory: string): Promise<void> {
  let retryCount = 0
  while (retryCount < 5) {
    try {
      await streamExtractExternal(url, directory)
      return
    } catch (error) {
      retryCount++
      core.debug(
        `Failed to download artifact after ${retryCount} retries due to ${error.message}. Retrying in 5 seconds...`
      )
      // wait 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }

  throw new Error(`Artifact download failed after ${retryCount} retries.`)
}

export async function streamExtractExternal(
  url: string,
  directory: string
): Promise<void> {
  const client = new httpClient.HttpClient(getUserAgentString())
  const response = await client.get(url)
  if (response.message.statusCode !== 200) {
    throw new Error(
      `Unexpected HTTP response from blob storage: ${response.message.statusCode} ${response.message.statusMessage}`
    )
  }

  const timeout = 30 * 1000 // 30 seconds

  return new Promise((resolve, reject) => {
    const timerFn = (): void => {
      response.message.destroy(
        new Error(`Blob storage chunk did not respond in ${timeout}ms`)
      )
    }
    const timer = setTimeout(timerFn, timeout)

    response.message
      .on('data', () => {
        timer.refresh()
      })
      .on('error', (error: Error) => {
        core.debug(
          `response.message: Artifact download failed: ${error.message}`
        )
        clearTimeout(timer)
        reject(error)
      })
      .pipe(unzip.Extract({path: directory}))
      .on('close', () => {
        clearTimeout(timer)
        resolve()
      })
      .on('error', (error: Error) => {
        reject(error)
      })
  })
}

export async function downloadArtifactInternal(
  artifactId: number,
  options?: DownloadArtifactOptions
): Promise<DownloadArtifactResponse> {
  const downloadPath = await resolveOrCreateDirectory(options?.path)

  // const artifactClient = internalArtifactTwirpClient()

  const artifactClient = new DefaultArtifactClient()
  const tosClient = await createObjectStorageClient()

  const {workflowRunBackendId, workflowJobRunBackendId} =
    getBackendIdsFromToken()

  // const listReq: ListArtifactsRequest = {
  //   workflowRunBackendId,
  //   workflowJobRunBackendId,
  //   idFilter: Int64Value.create({value: artifactId.toString()})
  // }

  const {artifacts} = await artifactClient.listArtifacts()

  if (artifacts.length === 0) {
    throw new ArtifactNotFoundError(
      `No artifacts found for ID: ${artifactId}\nAre you trying to download from a different run? Try specifying a github-token with \`actions:read\` scope.`
    )
  }

  if (artifacts.length > 1) {
    core.warning('Multiple artifacts found, defaulting to first.')
  }

  // const signedReq: GetSignedArtifactURLRequest = {
  //   workflowRunBackendId: artifacts[0].workflowRunBackendId,
  //   workflowJobRunBackendId: artifacts[0].workflowJobRunBackendId,
  //   name: artifacts[0].name
  // }

  // const {signedUrl} = await artifactClient.GetSignedArtifactURL(signedReq)

  // core.info(
  //   `Redirecting to blob download url: ${scrubQueryParameters(signedUrl)}`
  // )

  try {
    core.info(`Starting download of artifact to: ${downloadPath}`)
    // await streamExtract(signedUrl, downloadPath)

    core.error(`!!!downloadArtifactInternal: ${workflowRunBackendId}, ${workflowJobRunBackendId}`)

    const fileName = `${artifacts[0].name}.zip`
    const objectKey = `artifacts/${repoName}/${workflowRunBackendId}-${fileName}`
    const filePath = path.join(downloadPath, fileName)
    await tosClient.getObjectToFile({
      bucket: bucketName,
      key: objectKey,
      filePath,
    });
    createReadStream(filePath).pipe(unzip.Extract({ path: downloadPath }))
    unlinkSync(filePath)
    core.info(`Artifact download completed successfully.`)
  } catch (error) {
    handleError(error)
    throw new Error(`Unable to download and extract artifact: ${error.message}`)
  }

  return {downloadPath}
}

async function resolveOrCreateDirectory(
  downloadPath = getGitHubWorkspaceDir()
): Promise<string> {
  if (!(await exists(downloadPath))) {
    core.debug(
      `Artifact destination folder does not exist, creating: ${downloadPath}`
    )
    await fs.mkdir(downloadPath, {recursive: true})
  } else {
    core.debug(`Artifact destination folder already exists: ${downloadPath}`)
  }

  return downloadPath
}
