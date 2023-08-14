import { ContentItem, Record } from "../../types/content";

export interface TopicPageState {
  appointments: Array<Record>;
  content: Array<ContentItem>;
  activeAppointment: string;
}
