'use client';

import { useState } from 'react';

export default function Page() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		setIsLoading(true);
		const userMessage = { role: 'user', content: input };
		setMessages(prev => [...prev, userMessage]);
		setInput('');

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: input }),
			});

			const data = await response.json();
			setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
		} catch (error) {
			console.error('Error:', error);
			setMessages(prev => [...prev, { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.' }]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
			<div className="flex-1 overflow-y-auto mb-4 space-y-4">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`p-4 rounded-lg ${
							message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
						} max-w-[80%]`}
					>
						{message.content}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="메시지를 입력하세요..."
					className="flex-1 p-2 border rounded-lg"
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={isLoading}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
				>
					전송
				</button>
			</form>
		</div>
	);
}