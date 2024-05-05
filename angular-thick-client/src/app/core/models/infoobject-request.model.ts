import { Todo } from "./todo.model";

export interface InfoobjectRequest {
  topic: string | null;
  tag: string | null;
  content: string | null;
  markdownContent: string | null;
  dialogueContent: string | null;
  infoobjectLinks: string[];
  todoContentList: Todo[];
}
