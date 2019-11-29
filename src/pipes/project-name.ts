import { PipeTransform, Pipe } from "@angular/core";

interface Nameable {
  projectName: string;
}

@Pipe({ name: "projectName" })
export class ProjectName implements PipeTransform {
  transform(value: Nameable[], name: string) {
    return value.filter(({ projectName }) => projectName === name);
  }
}
