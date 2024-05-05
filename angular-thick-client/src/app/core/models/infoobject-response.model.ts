import { Todo } from "./todo.model";

export interface InfoObjectResponse {
    id: number;
    topic: string;
    tag: string;
    content: string;
    markdownContent: string;
    dialogueContent: string;
    infoobjectLinks: string[];
    todoContentList: Todo[];
    authorIp: string;
    createdAt: Date;
    modifiedAt: Date;
  }