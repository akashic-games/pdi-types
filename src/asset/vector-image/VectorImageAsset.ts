import type { Surface } from "../../surface/Surface";
import type { Asset } from "../Asset";
import type { VectorImageAssetHint } from "./VectorImageAssetHint";

/**
 * ベクタ画像リソースを表すインターフェース。
 * 本クラスのインスタンスをゲーム開発者が直接生成することはない。
 * game.jsonによって定義された内容をもとに暗黙的に生成されたインスタンスを、
 * Scene#assets、またはGame#assetsによって取得して利用する。
 */
export interface VectorImageAsset extends Asset {
	type: "vector-image";
	width: number;
	height: number;
	hint: VectorImageAssetHint | undefined;

	/**
	 * サーフェスを生成する。
	 * ベクタ画像をサポートしない環境においては `null` を返す。
	 * @param width 作成するサーフェスの幅。
	 * @param height 作成するサーフェスの高さ。
	 */
	createSurface(width: number, height: number): Surface | null;

	/**
	 * サーフェスを生成する。
	 * ベクタ画像をサポートしない環境においては `null` を返す。
	 * @param width 作成するサーフェスの幅。
	 * @param height 作成するサーフェスの高さ。
	 * @param sx 元画像の描画矩形範囲のx座標。
	 * @param sy 元画像の描画矩形範囲のy座標。
	 * @param sWidth 元画像の描画矩形範囲の幅。
	 * @param sHeight 元画像の描画矩形範囲の高さ。
	 */
	createSurface(
		width: number,
		height: number,
		sx: number,
		sy: number,
		sWidth: number,
		sHeight: number
	): Surface | null;
}
