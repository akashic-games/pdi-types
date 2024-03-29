import type { AudioAsset } from "./AudioAsset";
import type { AudioPlayer } from "./AudioPlayer";

export interface AudioSystem {
	id: string;
	volume: number;

	/**
	 * @private
	 */
	_muted: boolean;

	stopAll(): void;

	findPlayers(asset: AudioAsset): AudioPlayer[];

	createPlayer(): AudioPlayer;

	requestDestroy(asset: AudioAsset): void;

	/**
	 * @private
	 */
	_reset(): void;

	/**
	 * @private
	 */
	_setMuted(value: boolean): void;

	/**
	 * @private
	 */
	_setPlaybackRate(value: number): void;
}
