export class WfPresentation {
  constructor(
    public name : string  = "",
    public sid  : string = "",
    public steps : WfPresentationStep[] = null
  ) {}
}
export class WfPresentationStep {
  constructor(
    public name : string = "",
    public groups : WfPresentationGroup[] = null
  ) { }
}

export class WfPresentationGroup {
  constructor(
    public name : string = "",
    public fields : WfPresentationField[] = null 
  ) { }
}

export class WfPresentationField {
  constructor(
    public id : string,
    public name : string = "",
    public description : string = "",
    public type : string = null
  ) { }
}
