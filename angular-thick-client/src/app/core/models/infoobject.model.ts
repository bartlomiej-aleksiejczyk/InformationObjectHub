import { Todo } from "./todo.model";

export class Infoobject {
    constructor(
      public id?: number,
      public topic?: string,
      public tag?: string,
      public content?: string,
      public markdownContent?: string,
      public dialogueContent?: string,
      public infoobjectLinks?: string[],
      public todoContentList?: Todo[]
    ) {}
  }