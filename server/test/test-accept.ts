/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class Order {
	constructor() {
		var axios = require('axios');
		var data = 'id=2172733&session=705606-19b08cf58b53476db220f12985bb66c0';

		var config = {
			method: 'post',
			url: 'https://dev.taxijakt.se/driver/api/accept-order',
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
				'Accept': '*/*',
				'Accept-Language': 'en-US,en;q=0.5',
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Origin': 'https://dev.taxijakt.se',
				'Connection': 'keep-alive',
				'Referer': 'https://dev.taxijakt.se/zf/driver/web',
				'Cookie': 'referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb',
				'Sec-Fetch-Dest': 'empty',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Site': 'same-origin',
				'TE': 'trailers'
			},
			data : data
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});









	}

}

new Order();
