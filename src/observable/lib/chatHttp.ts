/**
 * @module chat
 * @description 此模块为所有类的基类，维护所有类通用的公共属性，公共方法。
 */

import { YCObject } from './base';

export enum YCHttpInterfaceEnum {
	login = '/login',
	logout = '/logout',
	register = '/register'
}

export class YCHttp extends YCObject {
	private _baseUrl = '';
	private _token = '';
	private _lastResponse = '';

	get baseUrl(): string {
		return this._baseUrl;
	}

	set baseUrl(value: string) {
		this._baseUrl = value;
	}

	get token(): string {
		return this._token;
	}

	set token(value: string) {
		this._token = value;
	}

	// 最后一次的请求返回头
	get lastResponse(): string {
		return this._lastResponse;
	}

	public async post(path: YCHttpInterfaceEnum, content: Record<string, string>, headers?: Headers | string[][] | { [key: string]: string }) {
		this.verifyParams();
		try {
			const result = await fetch(`${this.baseUrl}${path}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					...headers
				},
				body: JSON.stringify(content)
			});
			this._lastResponse = JSON.stringify(result);
			return result;
		} catch (error) {
			console.log(`Post ${this.baseUrl}${path} Error`);
			console.log(error);
			throw error;
		}
	}

	public async get(path: YCHttpInterfaceEnum) {
		this.verifyParams();
		try {
			const result = await fetch(`${this.baseUrl}${path}`);
			this._lastResponse = JSON.stringify(result);
			return result;
		} catch (error) {
			console.log(`Get ${this.baseUrl}${path} Error`);
			console.log(error);
			throw error;
		}
	}

	protected verifyParams(): boolean {
		// 相关的前置验证
		if (!this._baseUrl) {
			throw new Error('缺少关键参数baseUrl');
		}
		return true;
	}
}
