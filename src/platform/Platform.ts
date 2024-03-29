import type {AMFlow} from "@akashic/amflow";
import type {Surface} from "../surface/Surface";
import type {Looper} from "./Looper";
import type {OperationPluginViewInfo} from "./OperationPluginViewInfo";
import type {PlatformEventHandler} from "./PlatformEventHandler";
import type {RendererRequirement} from "./RendererRequirement";
import type {ResourceFactory} from "./ResourceFactory";

/**
 * Platform: PDIの主要なインターフェース。
 *
 * PDIの実装者はこのインターフェースを満たすものを定義すればよい。
 */
export interface Platform {
	/**
	 * Playlog 送受信ルーチン。
	 */
	amflow: AMFlow;

	/**
	 * プラットフォーム上で発生したイベントのハンドラを設定する。
	 *
	 * 複数回呼び出された場合、最後の呼び出しで与えられたハンドラのみが利用される。
	 * @param handler 設定するハンドラ
	 */
	setPlatformEventHandler(handler: PlatformEventHandler): void;

	/**
	 * game.json を読み込む。
	 *
	 * 読み込みが成功した場合、`callback` が呼び出され、`err` に `null` が渡される。
	 * 読み込みが失敗した場合、`callback` が呼び出され、`err` に `Error` のインスタンスが渡される。
	 *
	 * @param url 読み込むgame.jsonのURL
	 * @param callback 読み込み結果を与えるコールバック
	 */
	loadGameConfiguration(url: string, callback: (err: any, configuration: any) => void): void;

	/**
	 * このプラットフォームのRendererに対する要求を通知する。
	 *
	 * このメソッドの呼び出しは `getPrimarySurface()` および `getResourceFactory().createSurface()` の振る舞いに影響を与える。
	 * 実装者は、このメソッドの呼び出し時、前回の呼び出し後に取得・生成された全ての `Surface` を `destroy()` してはならない。
	 * また、実装者はこのメソッドの2度目以降の呼び出し時、プライマリサーフェスを `destroy()` させなければならない。
	 * 引数が省略された場合、実装は Renderer に紐づくデータを解放してよい。
	 * @param param Rendererに対する要求
	 */
	setRendererRequirement(requirement?: RendererRequirement): void;

	/**
	 * プライマリサーフェスを取得する。
	 * 実装者は、このメソッドの呼び出し以前に、 `setRendererRequirement()` が呼び出されていると仮定してよい。
	 */
	getPrimarySurface(): Surface;

	/**
	 * ResourceFactoryを取得する。
	 * 実装者は、このメソッドの呼び出し以前に、 `setRendererRequirement()` が呼び出されていると仮定してよい。
	 */
	getResourceFactory(): ResourceFactory;


	/**
	 * OperationPluginViewInfoを取得する。
	 *
	 * このメソッドの戻り値が操作プラグインに渡される。
	 * このメソッドが省略された場合、操作プラグインには代わりに `null` が渡される。
	 * 実装者は、このメソッドの呼び出し以前に、 `setRendererRequirement()` が呼び出されていると仮定してよい。
	 */
	getOperationPluginViewInfo?(): OperationPluginViewInfo;

	/**
	 * 定期実行処理を作成する。
	 *
	 * 引数に与えられた関数 `fun` を定期的に呼び出す `Looper` を作成する。
	 * `fun` は、引数として前回呼び出された時点からの経過時間[ms]が与えられる。
	 * `fun` は前回の呼び出し時から、前回の呼び出し時の戻り値[ms]分の時間が経過していない場合、副作用を持つ処理を行ってはならない。
	 *
	 * @param fun 定期的に呼び出す関数
	 */
	createLooper(fun: (deltaTime: number) => number): Looper;

	/**
	 * 外部への情報送信。
	 *
	 * ゲーム開発者に「外部への情報送信」として提供される機能。その実態はPDIの実装者に委ねられる。
	 * 通常の用途の場合、一つのプレイにおいて、この関数が実際になんらかの動作を行うエンジンインスタンスは、高々一つであることが期待されると思われる。
	 * エンジンはその性質を保証しない。必要であればPDIまたはエンジンの利用者(アプリケーション)が担保すること。
	 *
	 * @param playId 情報送信を要求したプレイのID
	 * @param data 送信するデータ
	 */
	sendToExternal(playId: string, data: any): void;

	/**
	 * コンテンツ中の全リソースの削除を行う。
	 */
	destroy?(): void;
}
