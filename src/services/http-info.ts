import { Injectable } from "@angular/core";
import HTTP_INFO from "../.config/server.json";

@Injectable()
export class HttpInfo {
  baseName(protocol?: string): string {
    const { host, port } = HTTP_INFO;

    return `${protocol || "http"}://${host}:${port}`;
  }

  path(path: string, protocol?: string): string {
    return `${this.baseName(protocol)}${path}`;
  }
}
