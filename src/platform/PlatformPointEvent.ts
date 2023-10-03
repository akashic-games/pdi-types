import type { CommonOffset } from "../commons";

/**
 * ポイントイベントの種類。
 */
export const enum PlatformPointType {
	Down,
	Move,
	Up
}

/**
 * ポイントイベントを発生させたボタンの種類。
 */
export const enum PlatformButtonType {
	Unchanged = -1,
	Primary = 0,
	Auxiliary = 1,
	Secondary = 2
}

/**
 * プラットフォームのポイントイベント。
 *
 * 利用側で `g.PointDownEvent` などに変換される、プラットフォームのポイントイベント。
 * `g.PointDownEvent` などと異なるのは、ターゲットエンティティ(`target`)が解決されていないという点である。
 * (ターゲットエンティティやローカルフラグは `g.Game` を参照しないと解決できない。このレイヤではそれらに関知しない。)
 */
export interface PlatformPointEvent {
	/**
	 * ポイントイベントの種類。
	 */
	type: PlatformPointType;

	/**
	 * (同時に発生しうる)ポイントイベントを区別する識別子。
	 */
	identifier: number;

	/**
	 * ポイントイベントの生じた位置。
	 * プライマリサーフェスの左上を原点とする。
	 */
	offset: CommonOffset;

	/**
	 * ポイントイベントを発生させたボタンの種類。
	 *
	 * PointDownEvent, PointUpEvent の場合、初期値は Primary、
	 * PointMoveEvent の場合、初期値は Unchanged
	 */
	button?: PlatformButtonType;
}
