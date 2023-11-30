// @generated by protobuf-ts 2.9.1 with parameter long_type_string,client_none,generate_dependencies
// @generated from protobuf file "results/api/v1/artifact.proto" (package "github.actions.results.api.v1", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { StringValue } from "../../../google/protobuf/wrappers";
import { Timestamp } from "../../../google/protobuf/timestamp";
/**
 * @generated from protobuf message github.actions.results.api.v1.CreateArtifactRequest
 */
export interface CreateArtifactRequest {
    /**
     * @generated from protobuf field: string workflow_run_backend_id = 1;
     */
    workflowRunBackendId: string;
    /**
     * @generated from protobuf field: string workflow_job_run_backend_id = 2;
     */
    workflowJobRunBackendId: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expires_at = 4;
     */
    expiresAt?: Timestamp;
    /**
     * @generated from protobuf field: int32 version = 5;
     */
    version: number;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.CreateArtifactResponse
 */
export interface CreateArtifactResponse {
    /**
     * @generated from protobuf field: bool ok = 1;
     */
    ok: boolean;
    /**
     * @generated from protobuf field: string signed_upload_url = 2;
     */
    signedUploadUrl: string;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.FinalizeArtifactRequest
 */
export interface FinalizeArtifactRequest {
    /**
     * @generated from protobuf field: string workflow_run_backend_id = 1;
     */
    workflowRunBackendId: string;
    /**
     * @generated from protobuf field: string workflow_job_run_backend_id = 2;
     */
    workflowJobRunBackendId: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: int64 size = 4;
     */
    size: string;
    /**
     * @generated from protobuf field: google.protobuf.StringValue hash = 5;
     */
    hash?: StringValue; // optional
}
/**
 * @generated from protobuf message github.actions.results.api.v1.FinalizeArtifactResponse
 */
export interface FinalizeArtifactResponse {
    /**
     * @generated from protobuf field: bool ok = 1;
     */
    ok: boolean;
    /**
     * @generated from protobuf field: int64 artifact_id = 2;
     */
    artifactId: string;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.ListArtifactsRequest
 */
export interface ListArtifactsRequest {
    /**
     * The backend plan ID
     *
     * @generated from protobuf field: string workflow_run_backend_id = 1;
     */
    workflowRunBackendId: string;
    /**
     * The backend job ID
     *
     * @generated from protobuf field: string workflow_job_run_backend_id = 2;
     */
    workflowJobRunBackendId: string;
    /**
     * (optional) Name of the artifact to filter on
     *
     * @generated from protobuf field: string name_filter = 3;
     */
    nameFilter: string;
    /**
     * (optional) Monolith Database ID of the artifact to filter on
     *
     * @generated from protobuf field: int64 id_filter = 4;
     */
    idFilter: string;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.ListArtifactsResponse
 */
export interface ListArtifactsResponse {
    /**
     * @generated from protobuf field: repeated github.actions.results.api.v1.ListArtifactsResponse.MonolithArtifact artifacts = 1;
     */
    artifacts: ListArtifactsResponse_MonolithArtifact[];
}
/**
 * @generated from protobuf message github.actions.results.api.v1.ListArtifactsResponse.MonolithArtifact
 */
export interface ListArtifactsResponse_MonolithArtifact {
    /**
     * The backend plan ID
     *
     * @generated from protobuf field: string workflow_run_backend_id = 1;
     */
    workflowRunBackendId: string;
    /**
     * The backend job ID
     *
     * @generated from protobuf field: string workflow_job_run_backend_id = 2;
     */
    workflowJobRunBackendId: string;
    /**
     * Monolith database ID of the artifact
     *
     * @generated from protobuf field: int64 database_id = 3;
     */
    databaseId: string;
    /**
     * Name of the artifact
     *
     * @generated from protobuf field: string name = 4;
     */
    name: string;
    /**
     * Size of the artifact in bytes
     *
     * @generated from protobuf field: int64 size = 5;
     */
    size: string;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.GetSignedArtifactURLRequest
 */
export interface GetSignedArtifactURLRequest {
    /**
     * @generated from protobuf field: string workflow_run_backend_id = 1;
     */
    workflowRunBackendId: string;
    /**
     * @generated from protobuf field: string workflow_job_run_backend_id = 2;
     */
    workflowJobRunBackendId: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
}
/**
 * @generated from protobuf message github.actions.results.api.v1.GetSignedArtifactURLResponse
 */
export interface GetSignedArtifactURLResponse {
    /**
     * @generated from protobuf field: string signed_url = 1;
     */
    signedUrl: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class CreateArtifactRequest$Type extends MessageType<CreateArtifactRequest> {
    constructor() {
        super("github.actions.results.api.v1.CreateArtifactRequest", [
            { no: 1, name: "workflow_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "workflow_job_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "expires_at", kind: "message", T: () => Timestamp },
            { no: 5, name: "version", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<CreateArtifactRequest>): CreateArtifactRequest {
        const message = { workflowRunBackendId: "", workflowJobRunBackendId: "", name: "", version: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateArtifactRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateArtifactRequest): CreateArtifactRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string workflow_run_backend_id */ 1:
                    message.workflowRunBackendId = reader.string();
                    break;
                case /* string workflow_job_run_backend_id */ 2:
                    message.workflowJobRunBackendId = reader.string();
                    break;
                case /* string name */ 3:
                    message.name = reader.string();
                    break;
                case /* google.protobuf.Timestamp expires_at */ 4:
                    message.expiresAt = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.expiresAt);
                    break;
                case /* int32 version */ 5:
                    message.version = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateArtifactRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string workflow_run_backend_id = 1; */
        if (message.workflowRunBackendId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.workflowRunBackendId);
        /* string workflow_job_run_backend_id = 2; */
        if (message.workflowJobRunBackendId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.workflowJobRunBackendId);
        /* string name = 3; */
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        /* google.protobuf.Timestamp expires_at = 4; */
        if (message.expiresAt)
            Timestamp.internalBinaryWrite(message.expiresAt, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* int32 version = 5; */
        if (message.version !== 0)
            writer.tag(5, WireType.Varint).int32(message.version);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.CreateArtifactRequest
 */
export const CreateArtifactRequest = new CreateArtifactRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CreateArtifactResponse$Type extends MessageType<CreateArtifactResponse> {
    constructor() {
        super("github.actions.results.api.v1.CreateArtifactResponse", [
            { no: 1, name: "ok", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "signed_upload_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<CreateArtifactResponse>): CreateArtifactResponse {
        const message = { ok: false, signedUploadUrl: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateArtifactResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateArtifactResponse): CreateArtifactResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool ok */ 1:
                    message.ok = reader.bool();
                    break;
                case /* string signed_upload_url */ 2:
                    message.signedUploadUrl = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateArtifactResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool ok = 1; */
        if (message.ok !== false)
            writer.tag(1, WireType.Varint).bool(message.ok);
        /* string signed_upload_url = 2; */
        if (message.signedUploadUrl !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.signedUploadUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.CreateArtifactResponse
 */
export const CreateArtifactResponse = new CreateArtifactResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FinalizeArtifactRequest$Type extends MessageType<FinalizeArtifactRequest> {
    constructor() {
        super("github.actions.results.api.v1.FinalizeArtifactRequest", [
            { no: 1, name: "workflow_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "workflow_job_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "size", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
            { no: 5, name: "hash", kind: "message", T: () => StringValue }
        ]);
    }
    create(value?: PartialMessage<FinalizeArtifactRequest>): FinalizeArtifactRequest {
        const message = { workflowRunBackendId: "", workflowJobRunBackendId: "", name: "", size: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<FinalizeArtifactRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FinalizeArtifactRequest): FinalizeArtifactRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string workflow_run_backend_id */ 1:
                    message.workflowRunBackendId = reader.string();
                    break;
                case /* string workflow_job_run_backend_id */ 2:
                    message.workflowJobRunBackendId = reader.string();
                    break;
                case /* string name */ 3:
                    message.name = reader.string();
                    break;
                case /* int64 size */ 4:
                    message.size = reader.int64().toString();
                    break;
                case /* google.protobuf.StringValue hash */ 5:
                    message.hash = StringValue.internalBinaryRead(reader, reader.uint32(), options, message.hash);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: FinalizeArtifactRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string workflow_run_backend_id = 1; */
        if (message.workflowRunBackendId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.workflowRunBackendId);
        /* string workflow_job_run_backend_id = 2; */
        if (message.workflowJobRunBackendId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.workflowJobRunBackendId);
        /* string name = 3; */
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        /* int64 size = 4; */
        if (message.size !== "0")
            writer.tag(4, WireType.Varint).int64(message.size);
        /* google.protobuf.StringValue hash = 5; */
        if (message.hash)
            StringValue.internalBinaryWrite(message.hash, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.FinalizeArtifactRequest
 */
export const FinalizeArtifactRequest = new FinalizeArtifactRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FinalizeArtifactResponse$Type extends MessageType<FinalizeArtifactResponse> {
    constructor() {
        super("github.actions.results.api.v1.FinalizeArtifactResponse", [
            { no: 1, name: "ok", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "artifact_id", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<FinalizeArtifactResponse>): FinalizeArtifactResponse {
        const message = { ok: false, artifactId: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<FinalizeArtifactResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FinalizeArtifactResponse): FinalizeArtifactResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool ok */ 1:
                    message.ok = reader.bool();
                    break;
                case /* int64 artifact_id */ 2:
                    message.artifactId = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: FinalizeArtifactResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool ok = 1; */
        if (message.ok !== false)
            writer.tag(1, WireType.Varint).bool(message.ok);
        /* int64 artifact_id = 2; */
        if (message.artifactId !== "0")
            writer.tag(2, WireType.Varint).int64(message.artifactId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.FinalizeArtifactResponse
 */
export const FinalizeArtifactResponse = new FinalizeArtifactResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListArtifactsRequest$Type extends MessageType<ListArtifactsRequest> {
    constructor() {
        super("github.actions.results.api.v1.ListArtifactsRequest", [
            { no: 1, name: "workflow_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "workflow_job_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name_filter", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "id_filter", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<ListArtifactsRequest>): ListArtifactsRequest {
        const message = { workflowRunBackendId: "", workflowJobRunBackendId: "", nameFilter: "", idFilter: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ListArtifactsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListArtifactsRequest): ListArtifactsRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string workflow_run_backend_id */ 1:
                    message.workflowRunBackendId = reader.string();
                    break;
                case /* string workflow_job_run_backend_id */ 2:
                    message.workflowJobRunBackendId = reader.string();
                    break;
                case /* string name_filter */ 3:
                    message.nameFilter = reader.string();
                    break;
                case /* int64 id_filter */ 4:
                    message.idFilter = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListArtifactsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string workflow_run_backend_id = 1; */
        if (message.workflowRunBackendId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.workflowRunBackendId);
        /* string workflow_job_run_backend_id = 2; */
        if (message.workflowJobRunBackendId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.workflowJobRunBackendId);
        /* string name_filter = 3; */
        if (message.nameFilter !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.nameFilter);
        /* int64 id_filter = 4; */
        if (message.idFilter !== "0")
            writer.tag(4, WireType.Varint).int64(message.idFilter);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.ListArtifactsRequest
 */
export const ListArtifactsRequest = new ListArtifactsRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListArtifactsResponse$Type extends MessageType<ListArtifactsResponse> {
    constructor() {
        super("github.actions.results.api.v1.ListArtifactsResponse", [
            { no: 1, name: "artifacts", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ListArtifactsResponse_MonolithArtifact }
        ]);
    }
    create(value?: PartialMessage<ListArtifactsResponse>): ListArtifactsResponse {
        const message = { artifacts: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ListArtifactsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListArtifactsResponse): ListArtifactsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated github.actions.results.api.v1.ListArtifactsResponse.MonolithArtifact artifacts */ 1:
                    message.artifacts.push(ListArtifactsResponse_MonolithArtifact.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListArtifactsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated github.actions.results.api.v1.ListArtifactsResponse.MonolithArtifact artifacts = 1; */
        for (let i = 0; i < message.artifacts.length; i++)
            ListArtifactsResponse_MonolithArtifact.internalBinaryWrite(message.artifacts[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.ListArtifactsResponse
 */
export const ListArtifactsResponse = new ListArtifactsResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListArtifactsResponse_MonolithArtifact$Type extends MessageType<ListArtifactsResponse_MonolithArtifact> {
    constructor() {
        super("github.actions.results.api.v1.ListArtifactsResponse.MonolithArtifact", [
            { no: 1, name: "workflow_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "workflow_job_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "database_id", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
            { no: 4, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "size", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<ListArtifactsResponse_MonolithArtifact>): ListArtifactsResponse_MonolithArtifact {
        const message = { workflowRunBackendId: "", workflowJobRunBackendId: "", databaseId: "0", name: "", size: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ListArtifactsResponse_MonolithArtifact>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListArtifactsResponse_MonolithArtifact): ListArtifactsResponse_MonolithArtifact {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string workflow_run_backend_id */ 1:
                    message.workflowRunBackendId = reader.string();
                    break;
                case /* string workflow_job_run_backend_id */ 2:
                    message.workflowJobRunBackendId = reader.string();
                    break;
                case /* int64 database_id */ 3:
                    message.databaseId = reader.int64().toString();
                    break;
                case /* string name */ 4:
                    message.name = reader.string();
                    break;
                case /* int64 size */ 5:
                    message.size = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListArtifactsResponse_MonolithArtifact, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string workflow_run_backend_id = 1; */
        if (message.workflowRunBackendId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.workflowRunBackendId);
        /* string workflow_job_run_backend_id = 2; */
        if (message.workflowJobRunBackendId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.workflowJobRunBackendId);
        /* int64 database_id = 3; */
        if (message.databaseId !== "0")
            writer.tag(3, WireType.Varint).int64(message.databaseId);
        /* string name = 4; */
        if (message.name !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.name);
        /* int64 size = 5; */
        if (message.size !== "0")
            writer.tag(5, WireType.Varint).int64(message.size);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.ListArtifactsResponse.MonolithArtifact
 */
export const ListArtifactsResponse_MonolithArtifact = new ListArtifactsResponse_MonolithArtifact$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetSignedArtifactURLRequest$Type extends MessageType<GetSignedArtifactURLRequest> {
    constructor() {
        super("github.actions.results.api.v1.GetSignedArtifactURLRequest", [
            { no: 1, name: "workflow_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "workflow_job_run_backend_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetSignedArtifactURLRequest>): GetSignedArtifactURLRequest {
        const message = { workflowRunBackendId: "", workflowJobRunBackendId: "", name: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetSignedArtifactURLRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetSignedArtifactURLRequest): GetSignedArtifactURLRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string workflow_run_backend_id */ 1:
                    message.workflowRunBackendId = reader.string();
                    break;
                case /* string workflow_job_run_backend_id */ 2:
                    message.workflowJobRunBackendId = reader.string();
                    break;
                case /* string name */ 3:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetSignedArtifactURLRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string workflow_run_backend_id = 1; */
        if (message.workflowRunBackendId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.workflowRunBackendId);
        /* string workflow_job_run_backend_id = 2; */
        if (message.workflowJobRunBackendId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.workflowJobRunBackendId);
        /* string name = 3; */
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.GetSignedArtifactURLRequest
 */
export const GetSignedArtifactURLRequest = new GetSignedArtifactURLRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetSignedArtifactURLResponse$Type extends MessageType<GetSignedArtifactURLResponse> {
    constructor() {
        super("github.actions.results.api.v1.GetSignedArtifactURLResponse", [
            { no: 1, name: "signed_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetSignedArtifactURLResponse>): GetSignedArtifactURLResponse {
        const message = { signedUrl: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetSignedArtifactURLResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetSignedArtifactURLResponse): GetSignedArtifactURLResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string signed_url */ 1:
                    message.signedUrl = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetSignedArtifactURLResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string signed_url = 1; */
        if (message.signedUrl !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.signedUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message github.actions.results.api.v1.GetSignedArtifactURLResponse
 */
export const GetSignedArtifactURLResponse = new GetSignedArtifactURLResponse$Type();
/**
 * @generated ServiceType for protobuf service github.actions.results.api.v1.ArtifactService
 */
export const ArtifactService = new ServiceType("github.actions.results.api.v1.ArtifactService", [
    { name: "CreateArtifact", options: {}, I: CreateArtifactRequest, O: CreateArtifactResponse },
    { name: "FinalizeArtifact", options: {}, I: FinalizeArtifactRequest, O: FinalizeArtifactResponse },
    { name: "ListArtifacts", options: {}, I: ListArtifactsRequest, O: ListArtifactsResponse },
    { name: "GetSignedArtifactURL", options: {}, I: GetSignedArtifactURLRequest, O: GetSignedArtifactURLResponse }
]);
