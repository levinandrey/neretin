(function (window) {
    function insertScript(url) {
        var headElement = window.document.getElementsByTagName("head"), scriptElement;
        if (headElement && headElement[0]) {
            try {
                scriptElement = window.document.createElement('script');
                scriptElement.type = "text/javascript";
                scriptElement.src = url;
                headElement[0].appendChild(scriptElement);
                return;
            } catch (e) {
                //Do noting
            }
        }

        writeScript(url);
    }

    function serialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push(typeof v == "object" ?
                        serialize(v, k) :
                        encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("%26");
    }

    function paramsToUrl(params) {
        var key, parts = [];
        for (key in params) {
            if (params.hasOwnProperty(key)) {
            	if (key != 'price_floor' && key != 'price_floor_offset') {
            		parts.push(key + "=" + params[key]);
            	}
            }
        }

        return parts.join("&");
    }

    function writeScript(url) {
        document.write('<' + 'scri' + 'pt type="text/javascript" src="' + url + '"></' + 'scri' + 'pt>');
    }

    function length(obj) {
        var count = 0, key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                count += 1;
            }
        }

        return count;
    }

    /**
     * Fisher–Yates shuffle implementation
     * see: http://en.wikipedia.org/wiki/Fisher-Yates_shuffle
     */
    function shuffle(myArray) {
        var i = myArray.length;
        if (i == 0) {
            return;
        }

        while (--i) {
            var j = Math.floor(Math.random() * ( i + 1 )), tmp = myArray[i];
            myArray[i] = myArray[j];
            myArray[j] = tmp;
        }
    }

    function round(value) {
    	var result = Math.round(value*100)/100;
    	if (result == 0) {
    		result = value;
    	}
    	return result;
    }

    var pubmatic_pixels_saved = false;
    var rtb = {
        'script_url': '',
        'confirm_banner_url': '',
        'admeld': {
            'server_url': '',
            'callbacks': {},
            'callbacksCount': 0
        },
        'pubmatic': {
            'server_url': '',
            'callbacks': {},
            'callbacksCount': 0
        },
        'openrtb': {
            'server_url': '',
            'callbacks': {},
            'callbacksCount': 0
        },
        'waiting_sources': {},
        'waiting_ads' : [],
        'bids': {},
        'above_the_fold': {},
        'ad_height': 0,
        'above_the_fold_threshold': 0.5
    };

    rtb.verify = function() {
        var view_id, source, sources;

        for (view_id in rtb.waiting_sources) {
            if (rtb.waiting_sources.hasOwnProperty(view_id)) {
                sources = rtb.waiting_sources[view_id];
                for (source in sources) {
                    if (sources.hasOwnProperty(source)) {
                        rtb.bids[view_id].push({
                            'source' : source,
                            'time' : new Date().getTime() - sources[source].start,
                            'status' : 'error',
                            'ask_price' : sources[source].ask_price,
                            'price_floor' : sources[source].price_floor
                        });
                    }
                }

                delete rtb.waiting_sources[view_id];
                rtb.finishBidding(view_id);
            }
        }
    };

    rtb.finishBidding = function(view_id) {
        var bids = rtb.bids[view_id], result = bids[0],
                max_bid = bids[0].bid, i, above_the_fold = rtb.above_the_fold[view_id],
                bid;
        if (length(rtb.waiting_sources[view_id]) > 0) {
            //Not all RTB sources was responded
            return;
        }

        //Choose maximum bid and start ad selection
        for (i = 1; i < bids.length; i++) {
        	bid = bids[i].bid;
        	if (bid) {
	            if (bid > max_bid && bid >= bids[i].price_floor) {
	            	max_bid = bid;
	                result = bids[i];
	            }
        	}
        }

        delete rtb.bids[view_id];
        delete rtb.waiting_sources[view_id];
        delete rtb.above_the_fold[view_id];

        if (result.source == "openrtb" && result.provider == "appnexus") {
            result.show_creative(result.bid);
        } else {
            result.show_creative();
        }

        for (i = 0; i < bids.length; i++) {
        	if (bids[i].show_footer) {
        		bids[i].show_footer();
        	}
        }

        rtb.confirmImpression(result.source, bids, above_the_fold);
    };

    rtb.pubmatic.callback = function(json_ad) {
        var callback = rtb.pubmatic.callbacks['callback_' + json_ad['meta_data']['rid']];
        if (callback) {
            callback('callback_' + json_ad['meta_data']['rid'], json_ad);
        }
    };

    rtb.createAdMeldCallback = function(view_id, price_floor, ask_price) {
        var start = new Date().getTime(), callback = function (callbackId, json) {
            delete rtb.admeld[callbackId];
            delete rtb.admeld.callbacks[callbackId];
            delete rtb.waiting_sources[view_id]['admeld'];

            var rtb_creative = json['ad']['creative'], beacons = json['pixels'], bid = json['ad']['bid'];

            //Clean-up JSON object to reduce debug traffic
            delete json['ad']['creative'];
            delete json['pixels'];

            rtb.bids[view_id].push({
                'bid': bid,
                'source' : 'admeld',
                'price_floor' : price_floor,
                'ask_price' : ask_price,
                'show_creative' : function() {
                    document.write(rtb_creative);
                },
                'show_footer' : function() {
                    var key;
                    for (key in beacons) {
                    	if (beacons.hasOwnProperty(key)) {
                            document.write(beacons[key]);
                        }
                    }
                },
                'json' : json,
                'time' : new Date().getTime() - start,
                'status': bid > 0 ? 'ok' : 'nobid'
            });

            rtb.finishBidding(view_id);
        };

        var callbackId = 'callback_' + rtb.admeld.callbacksCount;
        rtb.admeld.callbacksCount += 1;
        rtb.admeld.callbacks[callbackId] = callback;
        rtb.admeld[callbackId] = function(json) {
            rtb.admeld.callbacks[callbackId](callbackId, json);
        };
        return 'window.adjuggler.rtb.admeld.' + callbackId;
    };

    rtb.createOpenRtbCallback = function(view_id, price_floor, ask_price) {
        var start = new Date().getTime(), callback = function (callbackId, json) {
            delete rtb.openrtb[callbackId];
            delete rtb.openrtb.callbacks[callbackId];
            delete rtb.waiting_sources[view_id]['openrtb'];

            var rtb_creative = json['ad'], beacons = json['pixels'], bid = json['bid'];

            //Clean-up JSON object to reduce debug traffic
            delete json['ad'];
            delete json['pixels'];

            rtb.bids[view_id].push({
                'bid': bid,
                'source' : 'openrtb',
                'provider': json['provider'],
                'price_floor' : price_floor,
                'ask_price' : ask_price,
                'show_creative' : function(second_price) {
                    if (second_price) {
                        rtb_creative = rtb_creative.replace("%%pricepaid%%", second_price);
                    }
                    document.write(rtb_creative);
                },
                'show_footer' : function() {
                    var key;
                    for (key in beacons) {
                    	if (beacons.hasOwnProperty(key)) {
                            document.write(beacons[key]);
                        }
                    }
                },
                'json' : json,
                'time' : new Date().getTime() - start,
                'status': bid > 0 ? 'ok' : 'nobid'
            });

            rtb.finishBidding(view_id);
        };

        var callbackId = 'callback_' + rtb.openrtb.callbacksCount;
        rtb.openrtb.callbacksCount += 1;
        rtb.openrtb.callbacks[callbackId] = callback;
        rtb.openrtb[callbackId] = function(json) {
            rtb.openrtb.callbacks[callbackId](callbackId, json);
        };
        return 'window.adjuggler.rtb.openrtb.' + callbackId;
    };

    rtb.createPubMaticCallback = function(view_id, price_floor, ask_price) {
        var start = new Date().getTime(), callback = function (callbackId, json) {
            delete rtb.pubmatic[callbackId];
            delete rtb.pubmatic.callbacks[callbackId];
            delete rtb.waiting_sources[view_id]['pubmatic'];

            var rtb_creative = json['PubMatic_Bid']['creative_tag'], tracking_url = json['PubMatic_Bid']['tracking_url'], bid = json['PubMatic_Bid']['ecpm'], error = json['PubMatic_Bid']['error_code'];

            if (typeof(error) !== 'undefined') {
                rtb.bids[view_id].push({
                    'source' : 'pubmatic',
                    'json' : json,
                    'time' : new Date().getTime() - start,
                    'status': 'error'
                });
                rtb.finishBidding(view_id);
                return;
            }

            if (tracking_url) {
                rtb_creative = rtb_creative + '<' + 'scri' + 'pt type="text/javascript" src="' + tracking_url + '"></' + 'scri' + 'pt>';
            }

            //Clean-up JSON object to reduce debug traffic
            delete json['PubMatic_Bid']['tracking_url'];
            delete json['PubMatic_Bid']['creative_tag'];

            rtb.bids[view_id].push({
                'bid' : bid,
                'source' : 'pubmatic',
                'price_floor' : price_floor,
                'ask_price' : ask_price,
                'show_creative' : function() {
                    document.write(rtb_creative);
                },
                'show_footer' : function() {
                	if (!pubmatic_pixels_saved) {
                		document.write('<iframe src="http://ads.pubmatic.com/AdServer/js/syncuppixels.html" style="width:0;height:0;display:block;" frameborder="0"></iframe>');
                		pubmatic_pixels_saved = true;
                	}
                },
                'json' : json,
                'time' : new Date().getTime() - start,
                'status': bid > 0 ? 'ok' : 'nobid'
            });

            rtb.finishBidding(view_id);
        };

        var rid = rtb.pubmatic.callbacksCount, callbackId = 'callback_' + rid;
        rtb.pubmatic.callbacksCount += 1;
        rtb.pubmatic.callbacks[callbackId] = callback;

        return rid;
    };

    rtb.calcAskPrice = function(aj_ecpm, request) {
    	var ask_price = Math.max(request['price_floor'], aj_ecpm);
    	if (ask_price == aj_ecpm) {
    		ask_price = ask_price + request['price_floor_offset'];
    		ask_price = Math.round(ask_price*10000)/10000;  //avoid values like 0.020000000001
    	}
    	return ask_price;
    };

    rtb.callAdMeld = function(view_id, aj_ecpm, request) {
        var url = "", ask_price = rtb.calcAskPrice(aj_ecpm, request);
        url += rtb.admeld.server_url + '?' + paramsToUrl(request);
        url += "&floor_price=" + ask_price;
        url += "&callback=" + rtb.createAdMeldCallback(view_id, request['price_floor'], ask_price);

        writeScript(url);
    };

    rtb.callPubMatic = function(view_id, aj_ecpm, request) {
        var url = "", ask_price = rtb.calcAskPrice(aj_ecpm, request);
        url += rtb.pubmatic.server_url + '?operId=102&rs=2&' + paramsToUrl(request);
        url += '&kadfloor=' + ask_price;
        url += '&rid=' + rtb.createPubMaticCallback(view_id, request['price_floor'], ask_price);
        url += '&timezone=' + (-((new Date()).getTimezoneOffset() / 60));
        if (screen) {
            url += '&screenResolution=' + screen.width + "x" + screen.height;
        }

        writeScript(url);
    };

    rtb.callOpenRtb = function(view_id, aj_ecpm, request) {
        var url = "", ask_price = rtb.calcAskPrice(aj_ecpm, request);
        url += rtb.openrtb.server_url + '?' + paramsToUrl(request);
        url += '&tz=' + (new Date()).getTimezoneOffset();
        url += "&ask_price=" + ask_price;
        url += "&callback=" + rtb.createOpenRtbCallback(view_id, request['price_floor'], ask_price);

        writeScript(url);
    };
    rtb.callAllSources = function (request, show_aj_ad_callback) {
        var i, view_id = String(new Date().getTime()) + '_' + Math.round(Math.random() * 10000), requests = [];

        rtb.above_the_fold[view_id] = true;

        rtb.waiting_sources[view_id] = {};
        rtb.bids[view_id] = [{
            'bid' : request['aj_ecpm'],
            'source' : 'adjuggler',
            'show_creative' : show_aj_ad_callback,
            'show_footer' : function() {}
        }];


        if (request['admeld_request']) {
            rtb.waiting_sources[view_id]['admeld'] = {
                start: new Date().getTime(),
                ask_price: rtb.calcAskPrice(request['aj_ecpm'], request['admeld_request']),
                price_floor: request['admeld_request']['price_floor']
            };
            requests.push(function () {
                rtb.callAdMeld(view_id, request['aj_ecpm'], request['admeld_request']);
            });
        }

        if (request['pubmatic_request']) {
            rtb.waiting_sources[view_id]['pubmatic'] =  {
                start: new Date().getTime(),
                ask_price: rtb.calcAskPrice(request['aj_ecpm'], request['pubmatic_request']),
                price_floor: request['pubmatic_request']['price_floor']
            };
            requests.push(function () {
                rtb.callPubMatic(view_id, request['aj_ecpm'], request['pubmatic_request']);
            });
        }

        if (request['openrtb_request']) {
            rtb.waiting_sources[view_id]['openrtb'] =  {
                start: new Date().getTime(),
                ask_price: rtb.calcAskPrice(request['aj_ecpm'], request['openrtb_request']),
                price_floor: request['openrtb_request']['price_floor']
            };
            requests.push(function () {
                rtb.callOpenRtb(view_id, request['aj_ecpm'], request['openrtb_request']);
            });
        }

        //Shuffle order of requests to avoid priority of one RTB source
        shuffle(requests);

        for (i = 0; i < requests.length; i++) {
            requests[i]();
        }

        document.write('<scr' + 'ipt type="text/javascript" src="' + rtb.script_url + 'verifyrtb.js"></scr' + 'ipt>');
    };

    rtb.detectWindowHeight = function() {
	  if( typeof( window.innerHeight ) == 'number' ) {
		  return window.innerHeight;
	  } else if( document.documentElement && document.documentElement.clientHeight ) {
		  return document.documentElement.clientHeight;
	  } else if( document.body && document.body.clientHeight ) {
		  return document.body.clientHeight;
	  }
	  return 0;
    };

    rtb.confirmImpression = function (source, bids, above_the_fold) {
        var i, j, bid, url = rtb.confirm_banner_url, tags = ['bid', 'price_floor', 'ask_price', 'time', 'status'];

        url += '&rtb_source=' + source;
        url += '&abf=' + above_the_fold;

        for (i = 0; i < bids.length; i++) {
            bid = bids[i];

            for (j = 0; j < tags.length; j++) {
                if (bid[tags[j]]) {
                    url += "&" + bid.source + '.' + tags[j] + '=' + bid[tags[j]];
                }
            }
        }

        for (i = 0; i < bids.length; i++) {
            bid = bids[i];
            if (bid.json) {
                url += '&' + bid.source + '.json=' + serialize(bid.json, null);
            }
        }

        //Crop url to fit max header size
        if (url.length > 2000) {
            url = url.slice(0, 2000);
        }

        insertScript(url);
    };

    if (!window.adjuggler) {
        window.adjuggler = {};
    }

    if (!window.adjuggler.rtb) {
        window.adjuggler.rtb = rtb;
        window.processPubMaticBid = rtb.pubmatic.callback;
    }

    /* Since IE doesn't guarantee JS execution order, we need to store this ad until rtb.js was successfully loaded */
    if (window.adjuggler.waiting_ads) {
        var i, ads = window.adjuggler.waiting_ads;
        for (i = 0; i < ads.length; i++) {
            if (ads[i]) {
                ads[i](window.adjuggler.rtb);
                delete ads[i];
            }
        }
    }
})(window);
