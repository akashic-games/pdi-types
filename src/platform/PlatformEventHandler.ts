import type * as pl from "@akashic/playlog";
import type {PlatformPointEvent} from "./PlatformPointEvent";

/**
 * プラットフォームで生じたイベントの受付口。
 */
export interface PlatformEventHandler {
	/**
	 * イベントの発生を通知する。
	 *
	 * @param pev 追加するイベント
	 */
	onEvent(pev: pl.Event): void;

	/**
	 * プラットフォームのポイントイベントの発生を通知する。
	 *
	 * PDI は `pl.PointDownEvent` などを作成できないので、代わりにこちらを用いる。
	 * (PDI では `pl.PointDownEvent#5` (イベントが発生した位置にあるエンティティのID) などを解決することができない。)
	 * @param ev: 追加するイベント
	 */
	onPointEvent(ev: PlatformPointEvent): void;
}
