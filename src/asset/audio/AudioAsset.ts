import { Asset } from "../Asset";
import { AudioAssetHint } from "./AudioAssetHint";
import { AudioPlayer } from "./AudioPlayer";
import { AudioSystem } from "./AudioSystem";

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
	duration: number;
	loop: boolean;
	hint: AudioAssetHint;

	/**
	 * @ignore
	 */
	_system: AudioSystem;

	play(): AudioPlayer;

	stop(): void;

	inUse(): boolean;
}
