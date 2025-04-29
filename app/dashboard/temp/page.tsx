import { sql } from '../../lib/data';

async function data1() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	console.log('data1');
	return sql`SELECT * FROM customers LIMIT 1`;
}

async function data2() {
	console.log('data2');
	return sql`SELECT * FROM customers LIMIT 1`;
}

async function data3() {
	console.log('data3');
	return sql`SELECT * FROM customers LIMIT 1`;
}

export default async function Page() {
	// const data = await sql`SELECT * FROM customers LIMIT 1`;
	const res1 = await data1();
	const res2 = await data2();
	const res3 = await data3();

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
	return <div>
		<pre>{JSON.stringify(res1, null, 2)}</pre>
		<pre>{JSON.stringify(res2, null, 2)}</pre>
		<pre>{JSON.stringify(res3, null, 2)}</pre>
	</div>
}
