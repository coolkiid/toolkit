import { warning } from "@actions/core"
import { ArtifactClient } from "./client"
import { 
  UploadArtifactOptions,
  UploadArtifactResponse,
  DownloadArtifactOptions,
  GetArtifactResponse,
  ListArtifactsOptions,
  ListArtifactsResponse,
  DownloadArtifactResponse,
  FindOptions,
  DeleteArtifactResponse 
} from "./shared/interfaces"
import { uploadArtifact } from './upload/volc-upload-artifact'
import {
  downloadArtifactPublic,
  downloadArtifactInternal
} from './download/volc-download-artifact'
import {
  deleteArtifactPublic,
  deleteArtifactInternal
} from './delete/volc-delete-artifact'
import {getArtifactPublic, getArtifactInternal} from './find/volc-get-artifact'
import {listArtifactsPublic, listArtifactsInternal} from './find/volc-list-artifacts'


export class DefaultArtifactClient implements ArtifactClient {
  async uploadArtifact(
    name: string,
    files: string[],
    rootDirectory: string,
    options?: UploadArtifactOptions
  ): Promise<UploadArtifactResponse> {
    try {
      // if (isGhes()) {
      //   throw new GHESNotSupportedError()
      // }

      return uploadArtifact(name, files, rootDirectory, options)
    } catch (error) {
      warning(
        `Artifact upload failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions is operating normally at [https://githubstatus.com](https://www.githubstatus.com).`
      )

      throw error
    }
  }

  async downloadArtifact(
    artifactId: number,
    options?: DownloadArtifactOptions & FindOptions
  ): Promise<DownloadArtifactResponse> {
    try {
      // if (isGhes()) {
      //   throw new GHESNotSupportedError()
      // }

      // if (options?.findBy) {
      //   const {
      //     findBy: {repositoryOwner, repositoryName, token},
      //     ...downloadOptions
      //   } = options

      //   return downloadArtifactPublic(
      //     artifactId,
      //     repositoryOwner,
      //     repositoryName,
      //     token,
      //     downloadOptions
      //   )
      // }

      return downloadArtifactInternal(artifactId, options)
    } catch (error) {
      warning(
        `Download Artifact failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions and API requests are operating normally at [https://githubstatus.com](https://www.githubstatus.com).`
      )

      throw error
    }
  }

  async listArtifacts(
    options?: ListArtifactsOptions & FindOptions
  ): Promise<ListArtifactsResponse> {
    try {
      // if (isGhes()) {
      //   throw new GHESNotSupportedError()
      // }

      // if (options?.findBy) {
      //   const {
      //     findBy: {workflowRunId, repositoryOwner, repositoryName, token}
      //   } = options

      //   return listArtifactsPublic(
      //     workflowRunId,
      //     repositoryOwner,
      //     repositoryName,
      //     token,
      //     options?.latest
      //   )
      // }

      return listArtifactsInternal(options?.latest)
    } catch (error: unknown) {
      warning(
        `Listing Artifacts failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions and API requests are operating normally at [https://githubstatus.com](https://www.githubstatus.com).`
      )

      throw error
    }
  }

  async getArtifact(
    artifactName: string,
    options?: FindOptions
  ): Promise<GetArtifactResponse> {
    try {
      // if (isGhes()) {
      //   throw new GHESNotSupportedError()
      // }

      // if (options?.findBy) {
      //   const {
      //     findBy: {workflowRunId, repositoryOwner, repositoryName, token}
      //   } = options

      //   return getArtifactPublic(
      //     artifactName,
      //     workflowRunId,
      //     repositoryOwner,
      //     repositoryName,
      //     token
      //   )
      // }

      return getArtifactInternal(artifactName)
    } catch (error: unknown) {
      warning(
        `Get Artifact failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions and API requests are operating normally at [https://githubstatus.com](https://www.githubstatus.com).`
      )
      throw error
    }
  }

  async deleteArtifact(
    artifactName: string,
    options?: FindOptions
  ): Promise<DeleteArtifactResponse> {
    try {
      // if (isGhes()) {
      //   throw new GHESNotSupportedError()
      // }

      // if (options?.findBy) {
      //   const {
      //     findBy: {repositoryOwner, repositoryName, workflowRunId, token}
      //   } = options

      //   return deleteArtifactPublic(
      //     artifactName,
      //     workflowRunId,
      //     repositoryOwner,
      //     repositoryName,
      //     token
      //   )
      // }

      return deleteArtifactInternal(artifactName)
    } catch (error) {
      warning(
        `Delete Artifact failed with error: ${error}.

Errors can be temporary, so please try again and optionally run the action with debug mode enabled for more information.

If the error persists, please check whether Actions and API requests are operating normally at [https://githubstatus.com](https://www.githubstatus.com).`
      )

      throw error
    }
  }
}