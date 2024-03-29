import {isPlainObject} from './util'
import { Method } from '../types'

function normalizeHeaderName (headers: any, normalizedName: string): void {
	if (!headers) {
		return
	}
	Object.keys(headers).forEach(name => {
		if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
			headers[normalizedName] = headers[name]
			delete headers[name]
		}
	})
}

export function processHeaders (headers: any,data: any): any {
	normalizeHeaderName(headers,'Content-Type') // !将content-type 转 Content-Type
	if (isPlainObject(data)) {
		if (headers && !headers['Content-Type']) {
			headers['Content-Type'] = 'application/json;charset=utf-8'  // !本来是 Content-Type: text/plain;charset=UTF-8
		}
	}
	return headers
}

export function flattenHeaders(headers: any = {}, method: Method) {
	// todo处理 common method的headers  然后删除多余的
	const commonHeaders = headers.common
	const methodHeaders = headers[method]
	return {
		...methodHeaders,
		...commonHeaders,
	}
}