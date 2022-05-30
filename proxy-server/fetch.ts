/** **/
//const fetch = require('node-fetch');

import { Response } from "node-fetch";
import fetch            from "node-fetch";

const URL_DOC = "https://dev.taxijakt.se/zf/driver/web/";

export class fetchy {

	constructor() {
		this.doIt();
	}


	public async doIt() {
		//const response = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'});

		let resp: Response;


		res = await fetch("https://dev.taxijakt.se/driver/api/login", {
			//"credentials": "include",
			"headers": {
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0",
				"Accept": "*/*",
				"Accept-Language": "en-US,en;q=0.5",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin",
				"mode": "cors"
			},
		//	"referrer": "https://dev.taxijakt.se/zf/driver/web",
			"body": "username=%2B48888777657&password=1&session=&jadi=13043058-afe4df1ef0c91fa77eb2ae39640b51d7",
			"method": "POST"
		});


		console.log("headers ::", resp.headers);
		console.log("type ::", resp.type);

		return

		resp = await fetch("https://dev.taxijakt.se/zf/driver/web/", {
			"headers"  : {
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0",
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
				"Accept-Language": "en-US,en;q=0.5",
				"Upgrade-Insecure-Requests": "1",
				"Sec-Fetch-Dest": "document",
				"Sec-Fetch-Mode": "navigate",
				"Sec-Fetch-Site": "none",
				"Sec-Fetch-User": "?1",
				"credentials": "include"
			},
			"method": "GET",
	//		"mode": "cors",


		});


		//console.log("body ::", await resp.text());


// Returns an array of values, instead of a string of comma-separated values
		console.log(resp.headers.raw()['set-cookie']);

	}
}

new fetchy();

