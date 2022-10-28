import type { Asset } from "../Asset";
import type { AudioAssetHint } from "./AudioAssetHint";
import type { AudioPlayer } from "./AudioPlayer";
import type { AudioSystem } from "./AudioSystem";

/**
 * 音リソースを表すインターフェース。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 *
 * AudioAsset#playを呼び出す事で、その音を再生することが出来る。
 */
export interface AudioAsset extends Asset {
	type: "audio";
	data: any;

	/**
	 * 再生時間。単位はミリ秒。
	 * play() は offset からこの時間分再生する。
	 */
	duration: number;

	/**
	 * ループ再生するか。
	 */
	loop: boolean;

	/**
	 * ヒント情報。
	 */
	hint: AudioAssetHint;

	/**
	 * 再生開始位置。単位はミリ秒。
	 */
	offset: number;

	/**
	 * @ignore
	 */
	_system: AudioSystem;

	play(): AudioPlayer;

	stop(): void;

	inUse(): boolean;
}
