import type { Asset } from "../Asset";

/**
 * バイナリ形式のリソースを表すインターフェース。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 *
 * BinaryAsset#dataによって、本リソースのバイト配列を取得することが出来る。
 */
export interface BinaryAsset extends Asset {
	type: "binary";
	data: ArrayBuffer;
}
