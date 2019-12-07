import { Component, OnInit } from "@angular/core";
import { WebSocketService, HttpInfo } from "../../services";
import { HttpClient } from "@angular/common/http";
import AnsiUp from "ansi_up";
import { DomSanitizer } from "@angular/platform-browser";

type LogType = "docker" | "dispatcher";

interface Project {
  name: string;
  type: string;
  description: string;
  logType: LogType[];
}

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"]
})
export class PanelComponent implements OnInit {
  projects: Project[] = [
    {
      name: "wizard",
      type: "client",
      description: "前端 React 项目",
      logType: ["dispatcher"]
    },
    {
      name: "archie",
      type: "server",
      description: "后端 Golang 项目",
      logType: ["dispatcher", "docker"]
    }
  ];

  selectedProject: Project = this.projects[0];
  selectedLogType: LogType = "dispatcher";

  constructor(
    private websocketService: WebSocketService,
    private httpClient: HttpClient,
    private httpInfo: HttpInfo,
    private sanitized: DomSanitizer
  ) {}

  ngOnInit() {}

  handleProjectCardClick(project: Project) {
    this.selectedProject = project;
  }

  handleLogTypeChange(logType: LogType) {
    this.selectedLogType = logType;
  }

  handleDeployClick() {
    this.httpClient
      .put(this.httpInfo.path(`/deploy/${this.selectedProject.type}`), {})
      .subscribe(data => console.info(data));
  }

  get notifications() {
    return this.websocketService.notifications.filter(
      ({ projectName }) => projectName === this.selectedProject.name
    );
  }

  get tasks() {
    return this.websocketService.tasks;
  }

  get dispatcherLogs() {
    console.info(
      new AnsiUp().ansi_to_html(this.websocketService.dispatcherLogs.join("\n"))
    );

    return this.sanitized.bypassSecurityTrustHtml(
      new AnsiUp().ansi_to_html(this.websocketService.dispatcherLogs.join("\n"))
    );
  }
}
