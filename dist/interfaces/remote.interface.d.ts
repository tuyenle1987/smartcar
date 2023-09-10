export declare enum ACTION_ENUM {
    START = "START",
    STOP = "STOP"
}
export declare enum COMMAND_ENUM {
    START_VEHICLE = "START_VEHICLE",
    STOP_VEHICLE = "STOP_VEHICLE"
}
export declare enum ENGINE_ACTION_COMMAND_ENUM {
    START = "START_VEHICLE",
    STOP = "STOP_VEHICLE"
}
export declare enum REMOTE_STATUS_ENUM {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}
export declare enum MM_COMMAND_ENUM {
    EXECUTED = "EXECUTED",
    FAILED = "FAILED"
}
export declare enum REMOTE_COMMAND_ENUM {
    EXECUTED = "SUCCESS",
    FAILED = "ERROR"
}
export interface RemoteResponse {
    status: string;
}
export interface RemoteRequest {
    action: ACTION_ENUM;
}
