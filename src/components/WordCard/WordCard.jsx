export function WordCard(props) {
	const { wordTitle, transcription, translate } = props;
	return (
		<>
			<div>
				<p>{wordTitle}</p>
				<p>{transcription}</p>
				<p>{translate}</p>
			</div>
		</>
	);
}
