import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { tools } from '@/app/lib/openai';
import { ResponseInputItem } from 'openai/resources/responses/responses.mjs';

const client = new OpenAI();

const getOrderStatus = async (order_id: string) => {
	if (order_id === '20240505-000123') {
		return { status: '배송중' };
	} else {
		return { status: '배송완료' };
	}
}

const cancelOrder = async (order_id: string) => {
	const { status } = await getOrderStatus(order_id);
	if (status === '배송완료') {
		return { status: 'fail', message: '배송완료된 주문은 취소할 수 없습니다.' };
	}
	return { status: 'success', message: `주문 ${order_id}를 취소했습니다.` };
}

const callFunction = async (functionName: string, functionArgs: any) => {
	if (functionName === 'get_order_status') {
		return getOrderStatus(functionArgs.order_id);
	} else if (functionName === 'cancel_order') {
		return cancelOrder(functionArgs.order_id);
	}
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

		const input: ResponseInputItem[] = [
			{
				role: "system",
				content: "당신은 주문 관리 시스템의 도우미입니다. 사용자의 질문에 답변하고 필요한 경우 주문 상태를 확인하거나 주문을 취소할 수 있습니다."
			},
			{
				role: "user",
				content: message
			}
		]

    const response = await client.responses.create({
      model: "gpt-3.5-turbo",
      input,
      tools,
      tool_choice: "auto"
    });

		for (const toolCall of response.output) {
			if (toolCall.type !== 'function_call') {
				continue;	
			}
			input.push(toolCall)

			const functionName = toolCall.name;
			const functionArgs = JSON.parse(toolCall.arguments);
			
			const result = await callFunction(functionName, functionArgs);
			console.log(result);
			input.push({
				type: 'function_call_output',
				call_id: toolCall.call_id,
				output: JSON.stringify(result)
			});
		}

		console.log(input);

		const response2 = await client.responses.create({
				model: "gpt-3.5-turbo",
				input,
				tools,
				store: true,
		});

		return NextResponse.json({ message: response2.output_text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 