import { WfPresentation } from './workflow-presentation'

export class Workflow {
  constructor(
    public id: number = 0,
    public sid: string = "",
    public name: string = "",
    public presentation : WfPresentation = null) { }
}
