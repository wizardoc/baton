import { Injectable } from "@angular/core";
import HTTP_INFO from "../.config/server.json";

@Injectable()
export class HttpInfo {
  get baseName(): string {
    const { host, port } = HTTP_INFO;

    return `http://${host}:${port}`;
  }

  path(path: string): string {
    return `${this.baseName}${path}`;
  }
}
