type Props = {
	delay?: number;
};

export default async function SlowComponent({ delay = 5000 }: Props) {
	const start = new Date().toLocaleTimeString('de');

	const finish = await new Promise<string>((resolve) =>
		setTimeout(() => resolve(new Date().toLocaleTimeString('de')), delay)
	);

	return (
		<div>
			<h2>Slow Component</h2>
			<dl>
				<dt>Start</dt>
				<dd>{start}</dd>
				<dt>Finish</dt>
				<dd>{finish}</dd>
			</dl>
		</div>
	);
}
