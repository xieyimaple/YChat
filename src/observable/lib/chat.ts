/**
 * @module chat
 * @description 此模块为整个聊天软件的单例对象
 */

import { YCObject } from './base';
import { YCConfig } from './config';
import { YCConversation } from './conversation';
import { YCRongCloudServe } from './rongCloudServe';
import { YCUser } from './user';
import { YCValidator } from './validator';

let chat: YCChat;

export class YCChat extends YCObject {
	private _currentUser: YCUser;
	private _validator: YCValidator;
	private _config: YCConfig;
	private _client: YCRongCloudServe;
	private _conversationList: YCConversation[];

	get currentUser(): YCUser {
		return this._currentUser;
	}

	set currentUser(value: YCUser) {
		this._currentUser = value;
	}

	get validator(): YCValidator {
		return this._validator;
	}

	get config(): YCConfig {
		return this._config;
	}

	get client(): YCRongCloudServe {
		return this._client;
	}

	get conversationList(): YCConversation[] {
		return this._conversationList;
	}

	constructor() {
		super();
		this._validator = new YCValidator(this);
		this._config = new YCConfig();
		this._client = new YCRongCloudServe(this);
	}

	static getInstance() {
		if (!chat) {
			chat = new YCChat();
		}
		return chat;
	}

	public getConversation(targetId: string) {
		return this.conversationList.find(conversation => {
			return conversation.targetId === targetId;
		});
	}
}
