import type { KnowledgeFile } from "@/models/knowledge/knowledge-file";
import type { RoomPresetId } from "./room-preset";

export type Room = {
  id: string;
  name: string;
  preset: RoomPresetId;
  purpose: string;
  // How the host wants this Room's chatbot to behave ("be a quiz bot…"). Older Rooms have none.
  rules?: string;
  // The Room's own files. Only this Room's chat can search them.
  files: KnowledgeFile[];
  createdAt: string;
};

export type CreateRoomInput = {
  name: string;
  preset: RoomPresetId;
  purpose: string;
  rules: string;
  // Uploaded files to move into the new Room.
  fileIds: string[];
};
