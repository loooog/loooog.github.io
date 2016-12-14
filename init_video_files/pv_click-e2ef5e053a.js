function objevent(objname, objevent, objfun) {
    var objname = String(objname);
    if ("" == objevent)
        objevent = "onclick";
    else
        var objevent = String(objevent);
    var objfun = String(objfun)
      , thisevent = function(evt) {
        evt = evt || window.event;
        var obj = evt.target || evt.srcElement
          , objnametemp1 = String(obj.tagName)
          , objnametemp2 = String(objname);
        if (objnametemp1 == objnametemp2 || "" == objname || obj.parentNode.tagName == objnametemp2 || obj.parentNode.parentNode.tagName == objnametemp2) {
            if (objnametemp1 != objnametemp2)
                if (obj.parentNode.tagName == objnametemp2)
                    obj = obj.parentNode;
                else if (obj.parentNode.parentNode.tagName == objnametemp2)
                    obj = obj.parentNode.parentNode;
                else {
                    if (obj.parentNode.parentNode.parentNode.tagName != objnametemp2)
                        return;
                    obj = obj.parentNode.parentNode.parentNode
                }
            eval(objfun)(obj)
        }
    }
      , thiseventtemp = "document.body." + objevent + "=" + thisevent
      , evalobj = eval(thiseventtemp)
}
function _clickon(e) {
    send_web_click(e)
}
function kk_click_pv_rebind_capture() {
    window.attachEvent ? (window.detachEvent("onload", _kk_click_pv_clickon_handler),
    window.attachEvent("onload", _kk_click_pv_clickon_handler)) : (window.removeEventListener("load", _kk_click_pv_clickon_handler, !0),
    window.addEventListener("load", _kk_click_pv_clickon_handler, !0))
}
function send_web_pv() {
    var e, i = window.location.href;
    i.indexOf("video/wechat") != -1 && i.indexOf("wechat/id") === -1 && (e = PAGE_VIDEOLIST),
    i.indexOf("wechat/id") == -1 && i.indexOf("video/share") == -1 || (e = PAGE_VIDEO),
    i.indexOf("expression/wechat") == -1 && i.indexOf("expression/id") == -1 || (e = PAGE_EMOJS),
    i.indexOf("award/rules") != -1 && (e = PAGE_RULE),
    i.indexOf("type=my") != -1 && (e = PAGE_ME),
    i.indexOf("type=other") != -1 && (e = PAGE_TA);
    var t, o, d, a = "pv", n = get_device_id(), r = getHBReferer(), c = getPlatform();
    if (e === PAGE_VIDEO)
        if (null != getQueryString("gcid")) {
            o = gcid;
            var l = new Date
              , s = l.getTime();
            d = "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=pageshow&url=" + url_e + "&ref=" + ref_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&r=" + 1e5 * Math.random() + "&time=" + s + "&eventid=" + a + "&device_id=" + n + "&referer=" + r + "&page=" + e + "&os=" + c + "&gcid=" + o
        } else
            t = videoId,
            o = gcid,
            d = "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=pageshow&url=" + url_e + "&ref=" + ref_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&r=" + 1e5 * Math.random() + "&time=" + s + "&eventid=" + a + "&device_id=" + n + "&referer=" + r + "&page=" + e + "&os=" + c + "&videoid=" + t + "&gcid=" + o;
    else
        d = "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=pageshow&url=" + url_e + "&ref=" + ref_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&r=" + 1e5 * Math.random() + "&time=" + s + "&eventid=" + a + "&device_id=" + n + "&referer=" + r + "&page=" + e + "&os=" + c;
    if (window.__haboBaseParams)
        for (var p in window.__haboBaseParams)
            d += "&" + p + "=" + encodeURIComponent(window.__haboBaseParams[p]);
    var _ = new Image;
    _.src = d
}
function jumpurl(e) {
    location.href = e
}
function send_web_click(e) {
    target = e.target;
    var i = e.getAttribute("_click_rcv_url");
    i && "undefined" != i || (i = e.href);
    var t = encodeURIComponent(i)
      , o = e.getAttribute("blockid")
      , d = e.getAttribute("clickid");
    if (d || "undefined" == typeof d || 0 == d || o || "undefined" == typeof o || 0 == o) {
        var a, n = e.getAttribute("event_id"), r = e.getAttribute("device_id"), c = e.getAttribute("referer"), l = e.getAttribute("page"), s = e.getAttribute("os"), p = e.getAttribute("videoid"), _ = e.getAttribute("gcid"), b = e.getAttribute("playtype"), u = e.getAttribute("playtime"), g = e.getAttribute("length"), m = e.getAttribute("position"), h = e.getAttribute("to"), k = e.getAttribute("type"), v = e.getAttribute("sharetype"), w = e.getAttribute("recinfo"), p = e.getAttribute("videoid"), f = new Date, x = f.getTime();
        if (a = "click_download" === n || "qrcode" === n ? "player" === m ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&position=" + m + "&videoid=" + p : "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&position=" + m : "click_replay" === n ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&position=" + m : "click_follow" === n ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s : "click_red_envelopes" === n ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&type=" + k : "click_share" === n ? "1" === v || 1 === v ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&videoid=" + p + "&gcid=" + _ + "&type=" + k + "&sharetype=" + v : l === PAGE_VIDEOLIST ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&to=" + h + "&type=" + k + "&sharetype=" + v : "xunlei" === c ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&gcid=" + _ + "&to=" + h + "&type=" + k + "&sharetype=" + v : "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&videoid=" + p + "&gcid=" + _ + "&to=" + h + "&type=" + k + "&sharetype=" + v : "click_video" === n ? "xunlei" === c ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&gcid=" + _ + "&position=" + m + "&recinfo=" + w : "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&videoid=" + p + "&gcid=" + _ + "&position=" + m + "&recinfo=" + w : "click_userinfo" === n || "click_praise" === n || "click_ta_list_tab" === n || "click_video_comment_tab" === n || "click_rec_hot_tab" === n || "newuser_info_show" === n || "newuser_info_close" === n || "click_comment" === n ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s : "play" === n ? null === getQueryString("gcid") ? "end_part" != b && "end_all" != b ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&videoid=" + p + "&gcid=" + _ + "&playtype=" + b + "&length=" + g : "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&videoid=" + p + "&gcid=" + _ + "&playtype=" + b + "&playtime=" + u + "&length=" + g : "end_part" != b && "end_all" != b ? "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&gcid=" + _ + "&playtype=" + b + "&length=" + g : "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&gcid=" + _ + "&playtype=" + b + "&playtime=" + u + "&length=" + g : "http://stat.download.xunlei.com:8099/?xlbtid=" + gOption.xlbtid + "&datatype=click&url=" + url_e + "&useragent=" + userAgent_e + "&cookieid=" + habo_web_uid + "&sessionid=" + habo_web_sessionid + "&appid=" + gOption.appid + "&clickurl=" + t + "&blockid=" + o + "&clickid=" + d + "&r=" + 1e5 * Math.random() + "&time=" + x + "&eventid=" + n + "&device_id=" + r + "&referer=" + c + "&page=" + l + "&os=" + s + "&videoid=" + p + "&gcid=" + _ + "&playtype=" + b + "&playtime=" + u + "&length=" + g + "&position=" + m + "&to=" + h,
        window.__haboBaseParams)
            for (var O in window.__haboBaseParams)
                a += "&" + O + "=" + encodeURIComponent(window.__haboBaseParams[O]);
        var y = new Image;
        y.onerror = function() {
            "start" !== b && "real_play" !== b || _hmt.push(["_trackEvent", b + "-fail", "fail", ""])
        }
        ,
        y.onload = function() {
            "start" !== b && "real_play" !== b || _hmt.push(["_trackEvent", b + "-success", "success", ""])
        }
        ,
        y.src = a
    }
}
function click_share(e, i, t, o, d, a, n) {
    var r = $(".click_share");
    r.attr("event_id", "click_share"),
    r.attr("device_id", i),
    r.attr("referer", t),
    r.attr("page", o),
    r.attr("os", d),
    r.attr("type", a),
    r.attr("sharetype", n),
    o === PAGE_VIDEO && (null != this.getQueryString("gcid") ? r.attr("gcid", gcid) : (r.attr("videoid", videoId),
    r.attr("gcid", gcid))),
    r.attr("to", e),
    send_web_click(r[0])
}
var gOption = {
    appid: "0",
    domain: "http://wjgl.xlmc.xunlei.com/",
    xlbtid: "11"
}
  , c_getCookie = function(e) {
    var i = e + "="
      , t = document.cookie.indexOf(i);
    if (t != -1) {
        t += i.length;
        var o = document.cookie.indexOf(";", t);
        return o == -1 && (o = document.cookie.length),
        unescape(document.cookie.substring(t, o))
    }
    return ""
}
  , c_setCookie = function(e, i, t, o) {
    if (arguments.length > 3) {
        var d = new Date((new Date).getTime() + 36e5 * o);
        document.cookie = i + "=" + escape(t) + ";path=/;domain=" + e + ";expires=" + d.toGMTString()
    } else
        document.cookie = i + "=" + escape(t) + ";path=/;domain=" + e
}
;
if (habo_web_uid = c_getCookie("HABOWEBUID"),
!habo_web_uid || "undefined" == habo_web_uid) {
    var random = Math.random()
      , browser = navigator.appName + "_" + navigator.appVersion + "_" + navigator.userAgent + "_" + navigator.appCodeName + "_" + navigator.platform
      , nowtime = new Date
      , nowtime_sec = nowtime.valueOf();
    habo_web_uid = hex_md5(nowtime_sec.toString() + browser + random.toString()),
    c_setCookie(gOption.domain, "HABOWEBUID", habo_web_uid, 87600)
}
var habo_web_sessionid = c_getCookie("HABOWEBSESSIONID");
if (!habo_web_sessionid || "undefined" == habo_web_sessionid) {
    var random = Math.random()
      , browser = navigator.appName + "_" + navigator.appVersion + "_" + navigator.userAgent + "_" + navigator.appCodeName + "_" + navigator.platform
      , nowtime = new Date
      , nowtime_sec = nowtime.valueOf();
    habo_web_sessionid = hex_md5(nowtime_sec.toString() + browser + random.toString()),
    c_setCookie(gOption.domain, "HABOWEBSESSIONID", habo_web_sessionid, .5)
}
var userAgent = navigator.userAgent
  , userAgent_e = encodeURIComponent(userAgent)
  , url = document.location.href
  , ref = document.referrer
  , ref_e = encodeURIComponent(ref)
  , url_e = encodeURIComponent(url);
try {
    var _kk_click_pv_clickon_handler = function() {
        objevent("A", "onmouseup", "_clickon"),
        objevent("A", "onkeydown", "_clickon")
    }
    ;
    kk_click_pv_rebind_capture()
} catch (e) {}
