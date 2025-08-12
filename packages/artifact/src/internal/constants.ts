import { readFileSync } from "fs"
import { join } from "path"
import * as core from "@actions/core"

const credentials: Map<string, string> = new Map()
const credentialsPath = process.env["TOS_CREDENTIALS_PATH"] || "/etc/tos-credentials"

function getCredentials(key: string): string | undefined {
    if (process.env[`TOS_${key}`]) {
        return process.env[`TOS_${key}`] as string;
    }

    if (credentials.size > 0) {
        return credentials.get(`TOS_${key}`)
    }

    if (credentialsPath === undefined) {
        throw new Error("credentials file path not specified")
    }

    try {
        const credentialsFile = join(credentialsPath, `TOS_${key}`)
        const value = readFileSync(credentialsFile, "utf8").trim()
        return value
    } catch (error: any) {
        core.error("an error occurred when reading credentials file", error)
        throw new Error(`Error loading credentials: ${error.message}`)
    }
}

export const bucketName = getCredentials('BUCKET_NAME')
export const repoName = process.env['GITHUB_REPOSITORY']
export const runId = process.env['GITHUB_RUN_ID']
export const endpoint = getCredentials('ENDPOINT')
export const region = getCredentials('REGION')
export const accesskey = getCredentials('ACCESS_KEY')
export const secretkey = getCredentials('SECRET_KEY')
export const defaultObjectKeyPrefix = `artifacts/${repoName}/${runId}`
