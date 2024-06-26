import type { RendererCandidate } from "./RendererCandidate";

/**
 * Rendererへの要求事項。
 */
export interface RendererRequirement {
	/**
	 * プライマリサーフェスの幅。
	 */
	primarySurfaceWidth: number;

	/**
	 * プライマリサーフェスの高さ。
	 */
	primarySurfaceHeight: number;

	/**
	 * Rendererのタイプ。
	 * 優先度の高いものから順に指定される。
	 */
	rendererCandidates?: (string | RendererCandidate)[];
}
