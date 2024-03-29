import type { Surface } from "../../surface/Surface";
import type { Asset } from "../Asset";
import type { VideoPlayer } from "./VideoPlayer";

/**
 * 動画リソースを表すインターフェース。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 */
export interface VideoAsset extends Asset {
	type: "video";
	width: number;
	height: number;

	/**
	 * 動画の本来の幅。
	 *
	 * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
	 */
	realWidth: number;

	/**
	 * 動画の本来の高さ。
	 *
	 * この値は参照のためにのみ公開されている。ゲーム開発者はこの値を変更してはならない。
	 */
	realHeight: number;

	asSurface(): Surface;

	play(_loop?: boolean): VideoPlayer;

	stop(): void;

	getPlayer(): VideoPlayer;

	destroy(): void;
}
