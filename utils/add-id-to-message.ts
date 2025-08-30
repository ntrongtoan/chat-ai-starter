import { v4 as uuidv4 } from "uuid";

export function addIdToMessage<T>(message: T) {
  return {
    ...message,
    id: uuidv4(),
  };
}
