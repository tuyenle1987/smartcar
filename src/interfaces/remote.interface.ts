export enum ACTION_ENUM {
  START = 'START',
  STOP = 'STOP',
}

export enum COMMAND_ENUM {
  START_VEHICLE = 'START_VEHICLE',
  STOP_VEHICLE = 'STOP_VEHICLE',
}

export enum ENGINE_ACTION_COMMAND_ENUM {
  START = COMMAND_ENUM.START_VEHICLE,
  STOP = COMMAND_ENUM.STOP_VEHICLE,
}

export enum REMOTE_STATUS_ENUM {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum MM_COMMAND_ENUM {
  EXECUTED = 'EXECUTED',
  FAILED = 'FAILED',
}

export enum REMOTE_COMMAND_ENUM {
  EXECUTED = REMOTE_STATUS_ENUM.SUCCESS,
  FAILED = REMOTE_STATUS_ENUM.ERROR,
}

export interface RemoteResponse {
  status: string;
};

export interface RemoteRequest {
  action: ACTION_ENUM;
};
