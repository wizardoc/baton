import { Injectable } from "@angular/core";
import { HttpInfo } from "./http-info";
import { LoggerType, EventType, CommonResponse } from "../dtos";
import { HttpClient } from "@angular/common/http";

export interface NotifyPayload {
  logType: number;
  projectName: string;
  text: string;
  type: number;
}

export interface LoggerPayload {
  type: LoggerType;
  content: string;
}

export interface TaskPayload {
  name: string;
  time: number;
  projectName: string;
}

const NOTIFY_CLASS_TYPE = [
  "notify-error",
  "notify-info",
  "notify-success",
  "notify-warning"
];

@Injectable()
export class WebSocketService {
  private conn: WebSocket;

  notifications: NotifyPayload[] = [];
  dispatcherLogs: LoggerPayload[] = [];
  dockerLogs: LoggerPayload[] = [];
  tasks: TaskPayload[] = [];

  constructor(private httpInfo: HttpInfo, private httpClient: HttpClient) {
    const conn = new WebSocket(this.httpInfo.path("/notify/", "ws"));
    httpClient
      .get<CommonResponse<TaskPayload[]>>(this.httpInfo.path("/task/all"))
      .subscribe(({ data }) => (this.tasks = data));

    this.conn = conn;
    conn.onopen = this.handleConnect;
    conn.onclose = this.handleClose;
    conn.onmessage = ws => this.handleMessage(ws) as any;
  }

  private handleConnect() {
    console.info("connect success");
  }

  private handleClose() {
    console.info("closed");
  }

  private handleMessage(ws: MessageEvent) {
    const { type, payload } = JSON.parse(ws.data);

    if (type === EventType.TASK) {
      this.tasks = payload;

      return;
    }

    let result = payload;
    const LOGGER_MAP = {
      [LoggerType.DOCKER]: this.dockerLogs,
      [LoggerType.DISPATCHER]: this.dispatcherLogs
    };

    if (type === EventType.NOTIFY) {
      result.type = NOTIFY_CLASS_TYPE[payload.type];
      this.notifications.push(result);

      return;
    }

    if (type === EventType.LOGGER) {
      const { logType, content } = payload;

      LOGGER_MAP[logType].push(content);

      return;
    }
  }
}
