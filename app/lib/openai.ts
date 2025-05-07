import OpenAI from 'openai';
import { Tool } from 'openai/resources/responses/responses.mjs';
const client = new OpenAI();

export const tools: Tool[] = [
  {
    type: "function",
    name: "get_order_status",
    description: "주문 번호에 대한 현재 배송 상태를 조회합니다.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "주문 번호 (예: 20240505-000123)"
        }
      },
      required: ["order_id"],
      additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "cancel_order",
    description: "주문을 취소합니다.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "주문 번호 (예: 20240504-000888)"
        }
      },
      required: ["order_id"],
      additionalProperties: false
    },
    strict: true
  }
];
