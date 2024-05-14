export interface RendererCandidate {
	type: string;

	/**
	 * Renderer の実装に依存するためここでは詳細は定義しない
	 */
	options?: unknown;
}
