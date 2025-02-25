import type { AudioAsset } from "../asset/audio/AudioAsset";
import type { AudioAssetHint } from "../asset/audio/AudioAssetHint";
import type { AudioPlayer } from "../asset/audio/AudioPlayer";
import type { AudioSystem } from "../asset/audio/AudioSystem";
import type { BinaryAsset } from "../asset/binary/BinaryAsset";
import type { ImageAsset } from "../asset/image/ImageAsset";
import type { ScriptAsset } from "../asset/script/ScriptAsset";
import type { TextAsset } from "../asset/text/TextAsset";
import type { VectorImageAsset } from "../asset/vector-image/VectorImageAsset";
import type { VectorImageAssetHint } from "../asset/vector-image/VectorImageAssetHint";
import type { VideoAsset } from "../asset/video/VideoAsset";
import type { VideoSystem } from "../asset/video/VideoSystem";
import type { FontWeightString } from "../font/FontWeightString";
import type { GlyphFactory } from "../font/GlyphFactory";
import type { Surface } from "../surface/Surface";

/**
 * リソースの生成を行うインターフェース。
 *
 * このクラス (の実装クラス) のインスタンスはエンジンによって生成される。ゲーム開発者が生成する必要はない。
 * またこのクラスの各種アセット生成メソッドは、エンジンによって暗黙に呼び出されるものである。
 * 通常ゲーム開発者が呼び出す必要はない。
 */
export interface ResourceFactory {
	createImageAsset(id: string, assetPath: string, width: number, height: number): ImageAsset;

	createVideoAsset(
		id: string,
		assetPath: string,
		width: number,
		height: number,
		system: VideoSystem,
		loop: boolean,
		useRealSize: boolean
	): VideoAsset;

	createAudioAsset(
		id: string,
		assetPath: string,
		duration: number,
		system: AudioSystem,
		loop: boolean,
		hint: AudioAssetHint,
		offset?: number
	): AudioAsset;

	createTextAsset(id: string, assetPath: string): TextAsset;

	createAudioPlayer(system: AudioSystem): AudioPlayer;

	createScriptAsset(id: string, assetPath: string, exports?: string[]): ScriptAsset;

	createVectorImageAsset?(
		id: string,
		assetPath: string,
		width: number,
		height: number,
		hint?: VectorImageAssetHint
	): VectorImageAsset;

	createBinaryAsset?(
		id: string,
		assetPath: string
	): BinaryAsset;

	/**
	 * Surface を作成する。
	 * 与えられたサイズで、ゲーム開発者が利用できる描画領域 (`Surface`) を作成して返す。
	 * 作成された直後のSurfaceは `Renderer#clear` 後の状態と同様であることが保証される。
	 * @param width 幅(ピクセル、整数値)
	 * @param height 高さ(ピクセル、整数値)
	 */
	createSurface(width: number, height: number): Surface;

	/**
	 * GlyphFactory を作成する。
	 *
	 * @param fontFamily フォントファミリ。フォント名、またはそれらの配列で指定する。
	 * @param fontSize フォントサイズ
	 * @param baselineHeight 描画原点からベースラインまでの距離。生成する `g.Glyph` は
	 *                       描画原点からこの値分下がったところにベースラインがあるかのように描かれる。省略された場合、 `fontSize` と同じ値として扱われる
	 * @param fontColor フォントの色。省略された場合、 `"black"` として扱われる
	 * @param strokeWidth ストローク(縁取り線)の幅。省略された場合、 `0` として扱われる
	 * @param strokeColor ストロークの色。省略された場合、 `"black"` として扱われる
	 * @param strokeOnly ストロークのみを描画するか否か。省略された場合、偽として扱われる
	 * @param fontWeight フォントウェイト。省略された場合、 `"normal"` として扱われる
	 *
	 * `fontFamily` に指定できる値は環境に依存する。
	 * 少なくとも `"sans-serif"`, `"serif"`, `"monospace"` (それぞれサンセリフ体、セリフ体、等幅の字体) は有効な値である。
	 * ただし `fontFamily` は参考値であり、環境によってはそれらの字体で描かれるとは限らない。
	 */
	createGlyphFactory(
		fontFamily: string | string[],
		fontSize: number,
		baselineHeight?: number,
		fontColor?: string,
		strokeWidth?: number,
		strokeColor?: string,
		strokeOnly?: boolean,
		fontWeight?: FontWeightString
	): GlyphFactory;

	createVectorImageAssetFromString?(id: string, assetPath: string, data: string): VectorImageAsset;
}
