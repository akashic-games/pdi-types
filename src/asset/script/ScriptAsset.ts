import type { Asset } from "../Asset";
import type { ScriptAssetRuntimeValue } from "./ScriptAssetRuntimeValue";

/**
 * スクリプトリソースを表すインターフェース。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 *
 * ScriptAsset#executeによって、本リソースが表すスクリプトを実行し、その結果を受け取る事が出来る。
 * requireによる参照とは異なり、executeはキャッシュされないため、何度でも呼び出し違う結果を受け取ることが出来る。
 */
export interface ScriptAsset extends Asset {
	type: "script";
	script: string;

	// 後方互換性のため省略可能として定義しておく
	// TODO: ? の削除
	exports?: string[];

	execute(execEnv: ScriptAssetRuntimeValue): any;
}
