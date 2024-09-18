import { WordCard } from "../WordCard/WordCard";

export function GamePage() {
	return (
		<>
			<h1>Game</h1>
			<WordCard
				wordTitle="world"
				transcription="[ wɜːld ]"
				translate="мир"
			/>
			<WordCard
				wordTitle="nature"
				transcription="[ ˈneɪtʃər ]"
				translate="природа"
			/>
			<WordCard
				wordTitle="universe"
				transcription="[ ˈjuːnɪvɜːrs ]"
				translate="вселенная"
			/>
		</>
	);
}
