import { BaseMessage } from "../message/types";

export interface MessageTypeOptions {
  name: string;
  priority?: number;
  schema?: Record<string, MessageFieldSchema>;
}

export interface MessageFieldSchema {
  type: "string" | "number" | "boolean" | "array" | "object";
  required?: boolean;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean;
  };
}

export interface MessageTypeConfig<T = any> {
  configure(options: T): MessageTypeExtension;
}

export abstract class MessageTypeExtension {
  public readonly name: string;
  public readonly priority: number;
  public readonly schema: Record<string, MessageFieldSchema>;

  constructor(options: MessageTypeOptions) {
    this.name = options.name;
    this.priority = options.priority || 0;
    this.schema = options.schema || {};
  }

  abstract createMessage(data: any): BaseMessage;
  abstract renderMessage(message: BaseMessage): React.ReactNode;
  abstract validateMessage(message: BaseMessage): boolean;
  abstract processInput(input: any): any;

  // Static configuration method (like Tiptap extensions)
  static configure<T>(options: T): MessageTypeExtension {
    return new (this as any)(options);
  }

  // Helper method to validate against schema
  protected validateSchema(data: any): boolean {
    for (const [field, fieldSchema] of Object.entries(this.schema)) {
      const value = data[field];

      // Check required fields
      if (fieldSchema.required && (value === undefined || value === null)) {
        throw new Error(`Field '${field}' is required`);
      }

      // Check type
      if (value !== undefined && value !== null) {
        const actualType = Array.isArray(value) ? "array" : typeof value;
        if (actualType !== fieldSchema.type) {
          throw new Error(
            `Field '${field}' must be of type '${fieldSchema.type}', got '${actualType}'`
          );
        }
      }

      // Check validation rules
      if (fieldSchema.validation && value !== undefined && value !== null) {
        if (
          fieldSchema.validation.min !== undefined &&
          value < fieldSchema.validation.min
        ) {
          throw new Error(
            `Field '${field}' must be at least ${fieldSchema.validation.min}`
          );
        }
        if (
          fieldSchema.validation.max !== undefined &&
          value > fieldSchema.validation.max
        ) {
          throw new Error(
            `Field '${field}' must be at most ${fieldSchema.validation.max}`
          );
        }
        if (fieldSchema.validation.pattern && typeof value === "string") {
          const regex = new RegExp(fieldSchema.validation.pattern);
          if (!regex.test(value)) {
            throw new Error(`Field '${field}' does not match required pattern`);
          }
        }
        if (
          fieldSchema.validation.custom &&
          !fieldSchema.validation.custom(value)
        ) {
          throw new Error(`Field '${field}' failed custom validation`);
        }
      }
    }
    return true;
  }
}
