/**
 * ビルドテスト(インターフェースを満たすことを確認する)
 */

import type * as AMFlow from "@akashic/amflow";
import type * as playlog from "@akashic/playlog";
import type * as pdi from "../src";

class MockLooper implements pdi.Looper {
	_running: boolean;
	_fun: (deltaTime: number) => number;

	constructor(fun: (deltaTime: number) => number) {
		this._running = false;
		this._fun = fun;
	}

	start(): void {
		this._running = true;
	}

	stop(): void {
		this._running = false;
	}

	step(deltaTime: number): number {
		if (!this._running)
			return;
		return this._fun(deltaTime);
	}
}

class AbstractAMFlowClient implements AMFlow.AMFlow {
	constructor(_url: string) {
		// do nothing
	}
	open(_playId: string, _callback?: (error?: Error) => void): void {
		throw new Error("AbstractAMFlowClient#open");
	}
	close(_callback?: (error?: Error) => void): void {
		throw new Error("AbstractAMFlowClient#close");
	}
	authenticate(_token: string, _callback: (error: Error, permission: any) => void): void {
		throw new Error("AbstractAMFlowClient#authenticate");
	}
	sendTick(_tick: playlog.Tick): void {
		throw new Error("AbstractAMFlowClient#sendTick");
	}
	onTick(_handler: (tick: playlog.Tick) => void): void {
		throw new Error("AbstractAMFlowClient#onTick");
	}
	offTick(_handler: (event: playlog.Tick) => void): void {
		throw new Error("AbstractAMFlowClient#offTick");
	}
	sendEvent(_event: playlog.Event): void {
		throw new Error("AbstractAMFlowClient#sendEvent");
	}
	onEvent(_handler: (event: playlog.Event) => void): void {
		throw new Error("AbstractAMFlowClient#onEvent");
	}
	offEvent(_handler: (event: playlog.Event) => void): void {
		throw new Error("AbstractAMFlowClient#offEvent");
	}
	getTickList(
		_optsOrBegin: number | AMFlow.GetTickListOptions,
		_endOrCallback: number | ((error: Error | null, tickList?: playlog.TickList) => void),
		_callback?: (error: Error | null, tickList?: playlog.TickList) => void
	): void {
		throw new Error("AbstractAMFlowClient#getTickList");
	}
	putStartPoint(_startPoint: AMFlow.StartPoint, _callback: (error: Error) => void): void {
		throw new Error("AbstractAMFlowClient#putStartPoint");
	}
	getStartPoint(_opts: {frame: number}, _callback: (error: Error, startPoint: AMFlow.StartPoint) => void): void {
		throw new Error("AbstractAMFlowClient#getStartPoint");
	}
	putStorageData(_key: playlog.StorageKey, _value: playlog.StorageValue, _options: any, _callback: (err: Error) => void): void {
		throw new Error("AbstractAMFlowClient#putStorageData");
	}
	getStorageData(_keys: playlog.StorageReadKey[], _callback: (error: Error, values: playlog.StorageData[]) => void): void {
		throw new Error("AbstractAMFlowClient#getStorageData");
	}
}

class AbstractResourceFactory implements Required<pdi.ResourceFactory> {
	createImageAsset(_id: string, _assetPath: string, _width: number, _height: number): pdi.ImageAsset {
		throw new Error("AbstractResourceFactory#createImageAsset()");
	}
	createVideoAsset(
		_id: string,
		_assetPath: string,
		_width: number,
		_height: number,
		_system: pdi.VideoSystem,
		_loop: boolean,
		_useRealSize: boolean
	): pdi.VideoAsset {
		throw new Error("AbstractResourceFactory#createVideoAsset()");
	}
	createAudioAsset(
		_id: string,
		_assetPath: string,
		_duration: number,
		_system: pdi.AudioSystem,
		_loop: boolean,
		_hint: pdi.AudioAssetHint
	): pdi.AudioAsset {
		throw new Error("AbstractResourceFactory#createAudioAsset()");
	}
	createTextAsset(_id: string, _assetPath: string): pdi.TextAsset {
		throw new Error("AbstractResourceFactory#createTextAsset()");
	}
	createAudioPlayer(_system: pdi.AudioSystem): pdi.AudioPlayer {
		throw new Error("AbstractResourceFactory#createAudioPlayer()");
	}
	createScriptAsset(_id: string, _assetPath: string): pdi.ScriptAsset {
		throw new Error("AbstractResourceFactory#createScriptAsset()");
	}
	createVectorImageAsset(
		_id: string,
		_assetPath: string,
		_width: number,
		_height: number,
		_hint: pdi.VectorImageAssetHint
	): pdi.VectorImageAsset {
		throw new Error("AbstractResourceFactory#createVectorImageAsset()");
	}
	createBinaryAsset(_id: string, _assetPath: string): pdi.BinaryAsset {
		throw new Error("AbstractResourceFactory#createBinaryAsset()");
	}
	createSurface(_width: number, _height: number): pdi.Surface {
		throw new Error("AbstractResourceFactory#createSurface()");
	}
	createGlyphFactory(
		_fontFamily: string | string[],
		_fontSize: number,
		_baselineHeight?: number,
		_fontColor?: string,
		_strokeWidth?: number,
		_strokeColor?: string,
		_strokeOnly?: boolean,
		_fontWeight?: pdi.FontWeightString
	): pdi.GlyphFactory {
		throw new Error("AbstractResourceFactory#createGlyphFactory()");
	}

	createVectorImageAssetFromString(_id: string, _assetPath: string, _data: string): pdi.VectorImageAsset {
		throw new Error("AbstractResourceFactory#createVectorImageAssetFromString()");
	}
}

// この箇所の型定義がビルドエラーを起こさないことがポイント
// eslint-disable-next-line
class AbstractPlatform implements pdi.Platform {
	amflow: AMFlow.AMFlow;
	_resourceFactory: AbstractResourceFactory;
	_handler: pdi.PlatformEventHandler;
	_renderReq: pdi.RendererRequirement;

	constructor() {
		this.amflow = new AbstractAMFlowClient("dummy");
		this._resourceFactory = new AbstractResourceFactory();
		this._handler = null;
		this._renderReq = null;
	}

	setPlatformEventHandler(handler: pdi.PlatformEventHandler): void {
		this._handler = handler;
	}

	loadGameConfiguration (_url: string, callback: (err: any, configuration: any) => void): void {
		callback(null, "{ \"asset\": { \"mainScene\": { \"type\": \"script\", \"global\": true, \"path\": \"script/mainScene.js\" } } }");
	}

	setRendererRequirement(requirement?: pdi.RendererRequirement): void {
		this._renderReq = requirement;
	}

	getPrimarySurface(): pdi.Surface {
		return this._resourceFactory.createSurface(this._renderReq.primarySurfaceWidth, this._renderReq.primarySurfaceHeight);
	}

	getResourceFactory(): pdi.ResourceFactory {
		return this._resourceFactory;
	}

	getOperationPluginViewInfo(): pdi.OperationPluginViewInfo {
		return {
			type: "original-invalid-view",
			view: null
		};
	}

	createLooper(fun: (deltaTime: number) => number): pdi.Looper {
		return new MockLooper(fun);
	}

	sendToExternal(_playId: string, _data: any): void {
		throw new Error("abstractPlatform.sendToExternal");
	}

	destroy(): void {
		throw new Error("abstractPlatform#destroy is undefined");
	}
}
