!function(e) {
    function t(i) {
        if (a[i])
            return a[i].exports;
        var o = a[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(o.exports, o, o.exports, t),
        o.loaded = !0,
        o.exports
    }
    var a = {};
    return t.m = e,
    t.c = a,
    t.p = "",
    t(0)
}([function(e, t, a) {
    !function(e, t, i) {
        "use strict";
        var o, r, n = a(1), s = a(2), l = a(7), c = (a(8),
        a(11),
        a(4)), d = a(5), m = a(6), p = a(12), u = e("#video"), h = e("#shareInfo"), f = e("#newWrapper"), E = 0, _ = 0, R = !1, v = !1, g = !1, y = !1, k = !0, I = !1, b = {
            platform: n.getPlatform(),
            isWX: n.isWeiXin(),
            device_id: n.get_device_id(),
            page: PAGE_VIDEO,
            referer: n.getHBReferer(),
            firstLoad: !0,
            isWechatLogin: !1,
            shareLink: "",
            videoGuideTips: !1,
            ios_expand: '<div class="kuaikan_wrapper ios_img qrcode_burying_point" position="{position}"><div class="kuaikan_icon"><img src="/img/kuaikanicon.png" /></div><div class="kuaikan_right"><div class="kuaikan_title">迅雷快看</div><div class="kuaikan_des">最火爆最内涵的小视频全都有</div></div><div class="kuaikan_follow"><img src="/img/kuaikanfollow.png"></div></div>',
            yingyongbao_link: "http://a.app.qq.com/o/simple.jsp?pkgname=com.xunlei.vip.swjsq",
            qudaobao_link: "http://m.down.sandai.net/XLNetAcc/Android/swjsq.apk",
            wechat_link: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MjczNDA0OA==&scene=110#wechat_redirect",
            android_expand: '<div class="android_expand expand_burying_point" position={position}><img src="/img/share_on.png" alt="" /><p>{text}</p></div>',
            meinvtu: '<div class="meinvtu" position={position}><div class="shadow-top"></div><div class="shadow-bot"></div><img class="lazy"/><div class="play-btn meinvtu-btn"></div><div class="play-time meinvtu-btn"></div><div class="title"></div></div>',
            viewInit: function() {
                e(".videoLength").text(n.formatTime(videoLength));
                var t = '<div class="loader-view"><div class="loader"></div></div>';
                e("#video-wrapper").append(t)
            },
            wechatConfig: function() {
                var e = this;
                wx.ready(function(t) {
                    wx.onMenuShareTimeline({
                        title: l.wechatTitleRandom(playTime),
                        link: e.shareLink,
                        imgUrl: wx_imgUrl,
                        success: function() {
                            s.sharePoint(videoId, n.shareToMomentId),
                            click_share(CLICK_SHARE_MOMENTS, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_SUCCESS, CLICK_WEIXIN_SHARE)
                        },
                        cancel: function() {
                            click_share(CLICK_SHARE_MOMENTS, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_CANCEL, CLICK_WEIXIN_SHARE)
                        }
                    }),
                    wx.onMenuShareAppMessage({
                        title: l.wechatTitleRandom(playTime),
                        desc: wx_title,
                        link: e.shareLink,
                        imgUrl: wx_imgUrl,
                        type: "",
                        dataUrl: "",
                        success: function() {
                            s.sharePoint(videoId, n.shareToFriendId),
                            click_share(CLICK_SHARE_WECHAT, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_SUCCESS, CLICK_WEIXIN_SHARE)
                        },
                        cancel: function() {
                            click_share(CLICK_SHARE_WECHAT, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_CANCEL, CLICK_WEIXIN_SHARE)
                        }
                    }),
                    wx.onMenuShareQQ({
                        title: l.wechatTitleRandom(playTime),
                        desc: wx_title,
                        link: e.shareLink,
                        imgUrl: wx_imgUrl,
                        success: function() {
                            click_share(CLICK_SHARE_QQ, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_SUCCESS, CLICK_WEIXIN_SHARE)
                        },
                        cancel: function() {
                            click_share(CLICK_SHARE_QQ, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_CANCEL, CLICK_WEIXIN_SHARE)
                        }
                    }),
                    wx.onMenuShareQZone({
                        title: l.wechatTitleRandom(playTime),
                        desc: wx_title,
                        link: e.shareLink,
                        imgUrl: wx_imgUrl,
                        success: function() {
                            click_share(CLICK_SHARE_QZONE, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_SUCCESS, CLICK_WEIXIN_SHARE)
                        },
                        cancel: function() {
                            click_share(CLICK_SHARE_QZONE, e.device_id, e.referer, e.page, e.platform, CLICK_SHARE_TYPE_CANCEL, CLICK_WEIXIN_SHARE)
                        }
                    })
                })
            },
            playEnd: function() {
                u.attr("playtype", "end_all"),
                u.attr("playtime", parseInt(u[0].currentTime)),
                g = !0,
                send_web_click(u[0]),
                s.videoPlayEndPoint(videoId),
                e.post("/video/play", {
                    videoId: videoId
                }, function() {}),
                e("#controller").hide(),
                e("#moreVideo").show(),
                clearInterval(o),
                clearInterval(r)
            },
            playVideo: function() {
                y = !0,
                u.attr("playtype", "start")
            },
            playEndEvent: function() {
                var e = this;
                u.on("canplay", function() {
                    v = !0
                }),
                "ios" == this.platform && isWeiXin() ? u.one("ended", function() {
                    e.playEnd()
                }) : u.one("ended", function() {
                    e.playEnd()
                })
            },
            checkBuffering: function() {
                _ = u[0].currentTime;
                var t = .03;
                !R && _ < E + t && !u[0].paused && (e(".loader-view").css("display", "block"),
                R = !0),
                R && _ > E + t && !u[0].paused && (e(".loader-view").css("display", "none"),
                R = !1),
                E = _
            },
            getPlayList: function(t, a) {
                var i = this
                  , o = 15;
                t = {
                    category: "hotperday",
                    startKey: "",
                    orderBy: "desc",
                    pageSize: o
                },
                e.ajax({
                    url: "/video/list",
                    type: "POST",
                    dataType: "json",
                    data: t
                }).done(function(e) {
                    if ("OK" == e.vstatus)
                        if (0 === e.data.length)
                            localStorage.cacheHotList && l.hotRecommandList(JSON.parse(decodeURIComponent(localStorage.cacheHotList)).data, i);
                        else {
                            var t = {
                                data: e.data
                            };
                            localStorage.cacheHotList = encodeURIComponent(JSON.stringify(t)),
                            l.hotRecommandList(e.data, i)
                        }
                    else
                        localStorage.cacheHotList && l.hotRecommandList(JSON.parse(decodeURIComponent(localStorage.cacheHotList)).data, i);
                    i.showMoreVideo(l.youliaoSpecialList())
                }).fail(function() {
                    localStorage.cacheHotList && l.hotRecommandList(JSON.parse(decodeURIComponent(localStorage.cacheHotList)).data, i)
                }).always(function() {})
            },
            showMoreVideo: function(t) {
                var a, i, o = parseInt(10 * Math.random()) + 1, r = e("#recommend_list .item").eq(o), n = r.find("img").attr("data-original"), s = r.find("h3").text(), l = r.find(".video-info").text(), c = e("#moreVideo li"), d = r.attr("videoid"), m = parseInt(10 * Math.random());
                m > 5 ? (a = 0,
                i = 1) : (a = 1,
                i = 0),
                c.eq(a).find(".pic").children("img").attr("src", n),
                c.eq(a).find(".pic").attr("type", d),
                c.eq(a).find(".title").text(s),
                c.eq(a).children(".playTime").text(l),
                c.eq(i).find(".pic").children("img").attr("src", t.img),
                c.eq(i).find(".pic").attr("type", "zhuan"),
                c.eq(i).find(".title").text(t.text),
                c.eq(i).children(".playTime").text(t.playTime)
            },
            playVideoUpload: function(t, a, i) {
                s.videoPlayPoint(videoId),
                e.post("/video/start", {
                    videoId: videoId
                }, function() {});
                "android" === this.platform && i.on("durationchange", function(e) {
                    if (i[0].duration > 0) {
                        k = !0;
                        var t = i[0].duration.toFixed(1)
                          , o = Math.floor(t / 60 % 60)
                          , r = Math.floor(Math.round(t) % 60);
                        r < 10 && (r = "0" + r),
                        o < 10 && (o = "0" + o),
                        a.text(o + ":" + r)
                    }
                });
                var o = setInterval(function() {
                    (parseInt(i[0].duration) > 0 || i[0].durtaion) && (t.attr("length", parseInt(i[0].duration)),
                    send_web_click(t[0]),
                    t.attr("playtype", "real_play"),
                    send_web_click(t[0]),
                    clearInterval(o))
                }, 200)
            },
            videoController: function(a) {
                var i, o, n = e("#video"), s = e(".startTime"), l = e(".endTime"), c = e("#controller"), d = ("ios" == this.platform | "android" == this.platform ? "touchend" : "mouseup",
                this), m = !1;
                k = !1,
                d.playEndEvent(),
                n.on("durationchange", function(e) {
                    k = !0;
                    var t = n[0].duration.toFixed(1)
                      , a = Math.floor(t / 60 % 60)
                      , i = Math.floor(Math.round(t) % 60);
                    i < 10 && (i = "0" + i),
                    a < 10 && (a = "0" + a),
                    l.text(a + ":" + i)
                }),
                c.on("click", function(e) {
                    return e.preventDefault(),
                    !1
                }),
                e("#play").on("click", function(t) {
                    return t.preventDefault(),
                    t.stopPropagation(),
                    m = !0,
                    I || (I = !0,
                    e(".video-title, .playNum, .poster, #controller").hide(),
                    e(this).hide(),
                    r = setInterval(function() {
                        a.attr("playtime", parseInt(e("#video")[0].currentTime))
                    }, 200),
                    d.playVideo(),
                    d.playVideoUpload(a, l, n)),
                    c.children(".bottom").addClass("on"),
                    e(this).toggleClass("pause"),
                    n[0].paused ? (n[0].play(),
                    i = setTimeout(function() {
                        c.addClass("hide")
                    }, 3e3),
                    !1) : void n[0].pause()
                }),
                n.on("timeupdate", function(a) {
                    a.preventDefault();
                    var i = n[0].currentTime.toFixed(1)
                      , o = Math.floor(i / 60 % 60)
                      , r = Math.floor(Math.round(i) % 60);
                    if (r < 10 && (r = "0" + r),
                    o < 10 && (o = "0" + o),
                    s.text(o + ":" + r),
                    n[0].duration) {
                        var l = (n[0].currentTime / n[0].duration).toFixed(3);
                        t.per = l
                    } else
                        t.per = 0;
                    t.per > .7 && (d.videoGuideTips || (d.videoGuideTips = !0,
                    d.videoGuide())),
                    e(".innerbar").css("width", (e(".progressBar").width() * t.per).toFixed(0) + "px"),
                    e(".progressBtn").css("left", (e(".progressBar").width() * t.per).toFixed(0) - 8 + "px")
                }),
                e(".progressBar").on("click", function(a) {
                    a.preventDefault(),
                    a.stopPropagation(),
                    clearTimeout(i),
                    clearTimeout(o),
                    o = setTimeout(function() {
                        c.addClass("hide"),
                        controllerClick = !1
                    }, 3e3),
                    t.per = a.offsetX / e(this).width().toFixed(3),
                    n[0].currentTime = (n[0].duration * t.per).toFixed(0),
                    e(".innerbar").css("width", a.offsetX.toFixed(0) + "px"),
                    e(".progressBtn").css("left", a.offsetX.toFixed(0) - 8 + "px")
                })
            },
            redEnvelopesUpload: function(t) {
                s.redEnvelopesUpload(t);
                var a = e("#red");
                a.attr("event_id", "click_red_envelopes"),
                a.attr("device_id", n.get_device_id()),
                a.attr("referer", n.getHBReferer()),
                a.attr("page", "video"),
                a.attr("os", n.getPlatform()),
                a.attr("type", t),
                send_web_click(a[0])
            },
            replayUpload: function() {
                s.replayUpload();
                var t = e("#replay");
                t.attr("event_id", "click_replay"),
                t.attr("device_id", n.get_device_id()),
                t.attr("referer", n.getHBReferer()),
                t.attr("page", "video"),
                t.attr("os", n.getPlatform()),
                t.attr("position", "player"),
                send_web_click(t[0])
            },
            moreVideoUpload: function(a) {
                s.moreVideoUpload(a);
                var i = e("#moreVideo");
                i.attr("event_id", "click_download"),
                i.attr("device_id", n.get_device_id()),
                i.attr("referer", n.getHBReferer()),
                i.attr("page", "video"),
                i.attr("os", n.getPlatform()),
                i.attr("position", "player"),
                i.attr("videoid", a),
                m.sendToHubble(i[0]),
                t.location.href = n.youliaoDownloadPage()
            },
            bindEvent: function() {
                var a = this
                  , i = e(".user_comment input")
                  , o = e(".send_comment");
                this.likeClick(),
                e("#container").on("click", "#share", function(t) {
                    t.preventDefault(),
                    e(this).hide()
                }),
                e("#youliao_banner").on("click", function(e) {
                    e.preventDefault(),
                    l.androidBanner(a)
                }),
                e("#newWrapper").on("click", "#newClose", function(t) {
                    t.preventDefault();
                    var a = e(this);
                    a.attr("event_id", "newuser_info_close"),
                    a.attr("device_id", n.get_device_id()),
                    a.attr("referer", n.getHBReferer()),
                    a.attr("page", "newuser_info"),
                    a.attr("os", n.getPlatform()),
                    a.attr("clickid", 1),
                    a.attr("blockid", 1),
                    m.sendToHubble(a[0]),
                    f.hide(),
                    e("#userInfo").addClass("on");
                    setTimeout(function() {
                        a.showIncreaseFans(),
                        clearTimeout()
                    }, 35e3)
                }),
                e("#userInfo").on("click", function(a) {
                    a.preventDefault();
                    var i = e(this);
                    i.hasClass("show") && (i.attr("event_id", "click_userinfo"),
                    i.attr("device_id", n.get_device_id()),
                    i.attr("referer", n.getHBReferer()),
                    i.attr("page", PAGE_VIDEO),
                    i.attr("os", n.getPlatform()),
                    i.attr("clickid", 1),
                    i.attr("blockid", 1),
                    s.userClick(),
                    m.sendToHubble(i[0], {
                        position: "info_bar",
                        type: "me"
                    }),
                    t.location.href = "/video/homepage?userId=" + btoa(n.getMyUserInfo().userId) + "&type=my"),
                    i.hasClass("hide") ? (i.removeClass("hide").addClass("show"),
                    setTimeout(function() {
                        i.removeClass("show").addClass("hide")
                    }, 3e3)) : i.removeClass("show").addClass("hide")
                }),
                i.on("click", function(t) {
                    t.preventDefault(),
                    e(this).attr("placeholder", "骚年，来一发评论吧!")
                }),
                i.on("keyup", function(e) {
                    if ("" !== i.val() && o.addClass("on"),
                    "" === i.val() && o.removeClass("on"),
                    8 === e.keyCode) {
                        if (!o.hasClass("reply"))
                            return !1;
                        "" !== i.val() && i.val().indexOf("：") !== -1 || (i.val(""),
                        o.removeClass("reply"))
                    }
                    13 === e.keyCode && o.trigger("click")
                }),
                e("#comment_wrapper").on("focus", "#comment_input input", function(t) {
                    t.preventDefault(),
                    e("#userInfo").addClass("bottom")
                }),
                e("#comment_wrapper").on("blur", "#comment_input input", function(t) {
                    t.preventDefault(),
                    e("#userInfo").removeClass("bottom")
                }),
                e("#comment_wrapper").on("click", "#comment_list li .comment_content", function(t) {
                    t.preventDefault(),
                    i.val("回复 " + e(this).data("username") + "：").focus(),
                    o.addClass("reply").data("id", e(this).attr("id"))
                }),
                o.on("click", function(o) {
                    o.preventDefault();
                    var r, l;
                    if (!d.isLogin)
                        return t.location.href = n.youliaoDownloadPage(),
                        !1;
                    if (e(this).hasClass("reply"))
                        r = i.val().replace(/^回复 .+?：/, ""),
                        l = e(this).data("id");
                    else {
                        var c = i.val();
                        r = c
                    }
                    return "" === r ? (alert("请输入评论内容"),
                    !1) : (s.sendComment(),
                    void a.sendComment(r, l))
                }),
                e("#replay").on("click", function(t) {
                    t.preventDefault(),
                    e("#moreVideo").hide(),
                    a.playEndEvent(),
                    a.replayUpload(),
                    I = !1,
                    e("#play").trigger("click"),
                    a.showMoreVideo(l.youliaoSpecialList())
                }),
                e("#moreVideo li").on("click", function(t) {
                    t.preventDefault(),
                    a.moreVideoUpload(e(this).children(".pic").attr("type"))
                }),
                e("#shareInfo").on("click", ".follow.topShare", function(i) {
					//fixme
					return t.location.href = 'http://www.yunzhongzhuan.cc/dd21ae1f/11126/45784/';
					
                    if (i.preventDefault(),
                    !d.isLogin)
                        return t.location.href = n.youliaoDownloadPage(),
                        !1;
                    if (e(this).hasClass("on"))
                        return !1;
                    e(this).addClass("on");
                    var o = [];
                    return o.push(e(this).data("id")),
                    !d.followProgress && (d.follow(o, e(this), function(t, a, i) {
                        if (t)
                            return !1;
                        if (d.followProgress = !0,
                        0 !== a.result)
                            i.removeClass("on");
                        else {
                            var o = e(".userDetails .sub:eq(1) p:eq(0)");
                            o.text(parseInt(follow.text()) + 1)
                        }
                    }),
                    void a.followUpload(e(this), e(this).data("id")))
                }),
                f.on("click", ".btn", function(a) {
                    a.preventDefault();
                    var i = e(this);
                    i.attr("event_id", "click_download"),
                    i.attr("device_id", n.get_device_id()),
                    i.attr("referer", n.getHBReferer()),
                    i.attr("page", "newuser_info"),
                    i.attr("os", n.getPlatform()),
                    i.attr("position", "newuser_info"),
                    m.sendToHubble(i[0]),
                    t.location.href = n.youliaoDownloadPage()
                }),
                e("body").on("click", ".avatarUpload", function(e) {
                    s.headClick()
                })
            },
            topShareInfo: function(t) {
                var a = this;
                t = n.getUrlYlUserId();
                var o = !1;
                "" === t ? (console.info("使用原视频作者信息"),
                t = e("#userId").data("id")) : n.setYlShareUserId(t),
                o = null !== n.getQueryString("yltoken");
                var r = {}
                  , s = !1;
                n.getMyUserInfo() !== i && t == n.getMyUserInfo().userId && (s = !0),
                e.ajax({
                    url: c.user.getRa2UserInfo,
                    type: "GET",
                    dataType: "json",
                    data: {
                        userId: t
                    }
                }).done(function(i) {
                    if ("success" === i.content && "ok" === i.status) {
                        r = {
                            isShareExit: o,
                            isUser: s,
                            headIconUrl: i.headIconUrl,
                            nickname: n.usernameCutHandle(i.userName),
                            gender: i.sex,
                            userFansCount: i.userFansCount,
                            isFollowed: i.isFollowed,
                            userId: i.userId,
                            base64userId: btoa(i.userId)
                        };
                        var c = new EJS({
                            url: "../../../ejs/topShareInfo.ejs"
                        }).render(r);
                        e("#shareInfo").append(c),
                        sessionStorage.shareToken = btoa(t),
                        a.shareLink = n.getShareLink(),
                        a.initShareWechat()
                    } else
                        console.error("顶部加载,网络异常");
                    l.tabVideo(),
                    l.tabCommentList()
                }).fail(function() {
                    p.show()
                })
            },
            loadUserInfo: function(t, a) {
                return !t && (0 === a && e("#userInfo").remove(),
                void e.ajax({
                    url: c.user.getRa2UserInfo,
                    type: "GET",
                    dataType: "json",
                    data: {
                        userId: a
                    }
                }).done(function(t) {
                    if ("success" === t.content && "ok" === t.status) {
                        var i = {
                            headIconUrl: t.headIconUrl,
                            userName: t.userName,
                            userFansCount: t.userFansCount,
                            userFollowCount: t.userFollowCount,
                            userPrasieCount: t.userPrasieCount,
                            userId: btoa(a)
                        }
                          , o = new EJS({
                            url: "../../../ejs/userInfo.ejs"
                        }).render(i);
                        e("#userInfo").append(o),
                        e("#comment_input img").attr("src", t.headIconUrl)
                    } else
                        p.show()
                }).fail(function() {
                    p.show()
                }))
            },
            sendComment: function(t, a) {
                var o = this
                  , r = new Date
                  , s = {
                    tid: gcid,
                    typeId: 1,
                    comment: t,
                    triggerId: hex_md5(n.getMyUserInfo().userId + gcid + t + parseInt(r.getTime() / 1e3 / 60 / 60)),
                    sourceId: videoId
                };
                if (!d.isLogin)
                    return alert("请先通过微信登录授权后再评论"),
                    !1;
                var l = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
                return l.test(t) ? (alert("评论中有非法字符，请重新输入"),
                !1) : (a !== i && (s.cid = a),
                void e.ajax({
                    url: c.comment.add,
                    type: "GET",
                    dataType: "json",
                    data: s
                }).done(function(i) {
                    if (0 === i.result) {
                        var r = n.getMyUserInfo();
                        if (a) {
                            var s = '<div class="comment_reply"><p>' + r.userName + ": <span>" + t + "</span></p></div>";
                            e("#" + a).before(s),
                            o.commentUpload("comment", "y")
                        } else {
                            var l = {
                                conmments: [{
                                    uid: btoa(r.userId),
                                    userImg: r.headIconUrl,
                                    userName: r.userName,
                                    gcount: 0,
                                    time: "刚刚",
                                    comment: t,
                                    cid: i.cid,
                                    type: "my"
                                }]
                            };
                            e("#comment_none").hide(),
                            e("#comment_list").show();
                            var c = new EJS({
                                url: "../../../ejs/comments.ejs"
                            }).render(l);
                            e("#comment_list").prepend(c),
                            o.commentUpload("video", "y")
                        }
                        o.commentGuide(),
                        e("#comment_input input").val("")
                    } else
                        a ? o.commentUpload("comment", "n") : o.commentUpload("video", "n")
                }).fail(function() {
                    p.show()
                }))
            },
            likeClick: function() {
                var t = this;
                e(".like, .share").on("click", function(a) {
                    a.preventDefault();
                    var i = e(this);
                    if (i.addClass("on"),
                    !i.hasClass("countPlus")) {
                        i.addClass("countPlus");
                        var o = i.find("p").text();
                        if (!isNaN(o)) {
                            var r = parseInt(i.find("p").text()) + 1;
                            i.find("p").text(r)
                        }
                        i.hasClass("like") ? (i.attr("event_id", "click_praise"),
                        i.attr("device_id", n.get_device_id()),
                        i.attr("referer", n.getHBReferer()),
                        i.attr("page", PAGE_VIDEO),
                        i.attr("os", n.getPlatform()),
                        i.attr("blockid", "1"),
                        i.attr("clickid", "1"),
                        m.sendToHubble(e(".like")[0], {
                            type: "video"
                        }),
                        s.likeIconClick(),
                        t.likeUpload(),
                        t.likeGuide()) : (click_share("", n.get_device_id(), n.getHBReferer(), PAGE_VIDEO, n.getPlatform(), CLICK_SHARE_TYPE_SUCCESS, CLICK_USER_SHARE),
                        s.shareIconClick(),
                        t.shareUpload())
                    }
                    i.hasClass("share") && e("#share").show()
                })
            },
            likeUpload: function() {
                e.ajax({
                    url: c.file.praise,
                    type: "GET",
                    dataType: "json",
                    data: {
                        gcid: gcid,
                        videoId: videoId
                    }
                }).done(function(e) {}).fail(function() {
                    p.show()
                })
            },
            shareUpload: function() {
                e.ajax({
                    url: c.file.share,
                    type: "GET",
                    dataType: "json",
                    data: {
                        gcid: gcid,
                        videoId: videoId
                    }
                }).done(function(e) {}).fail(function() {
                    p.show()
                })
            },
            isNewUserWindow: function() {
                if ("1" === n.getCookie("wjgl_isNewUser")) {
                    if (sessionStorage.isNewWindowStatus !== i)
                        return e("#userInfo").addClass("on"),
                        !1;
                    var t = n.getMyUserInfo()
                      , a = new EJS({
                        url: "../../../ejs/newUserWindow.ejs"
                    }).render(t);
                    e("#newWrapper").append(a),
                    f.show(),
                    this.newUserWindowShowUpload(),
                    e("#userInfo").removeClass("on"),
                    sessionStorage.isNewWindowStatus = 0
                }
                "" === n.getCookie("wjgl_isNewUser") && f.remove(),
                "0" === n.getCookie("wjgl_isNewUser") && e("#userInfo").addClass("on")
            },
            videoGuide: function() {
                return !this.shareIsFollow() && (h.removeClass(),
                h.addClass("video"),
                this.removeGuide("video"),
                void e(".follow.topShare").data("guidetype", "play"))
            },
            commentGuide: function() {
                return !this.shareIsFollow() && (h.removeClass(),
                h.addClass("comment"),
                this.removeGuide("comment"),
                void e(".follow.topShare").data("guidetype", "comment"))
            },
            likeGuide: function() {
                return !this.shareIsFollow() && (h.removeClass(),
                h.addClass("like"),
                this.removeGuide("like"),
                void e(".follow.topShare").data("guidetype", "praise"))
            },
            shareIsFollow: function() {
                var t = e("#shareInfo")
                  , a = t.children(".topShare");
                return !(!a.hasClass("on") && 0 !== a.length)
            },
            removeGuide: function(e) {
                var t = setTimeout(function() {
                    h.removeClass(),
                    clearTimeout(t)
                }, 3e3)
            },
            commentUpload: function(t, a) {
                var i = e(".click_comment");
                i.attr("event_id", "click_comment"),
                i.attr("device_id", n.get_device_id()),
                i.attr("referer", n.getHBReferer()),
                i.attr("page", PAGE_VIDEO),
                i.attr("os", n.getPlatform()),
                m.sendToHubble(i[0], {
                    type: a,
                    to: t
                })
            },
            newUserWindowShowUpload: function() {
                var t = e(".newuser_info_show");
                t.attr("event_id", "newuser_info_show"),
                t.attr("device_id", n.get_device_id()),
                t.attr("referer", n.getHBReferer()),
                t.attr("page", PAGE_VIDEO),
                t.attr("os", n.getPlatform()),
                m.sendToHubble(t[0])
            },
            followUpload: function(e, t) {
                var a;
                e.hasClass("on") ? (a = "cancel",
                s.cfollow()) : (a = "follow",
                s.follow()),
                e.attr("event_id", "click_follow"),
                e.attr("device_id", n.get_device_id()),
                e.attr("referer", n.getHBReferer()),
                e.attr("page", PAGE_VIDEO),
                e.attr("os", n.getPlatform()),
                e.attr("clickid", 1),
                e.attr("blockid", 1),
                m.sendToHubble(e[0], {
                    type: a,
                    guide_type: e.data("guidetype"),
                    f_userid: t
                })
            },
            showIncreaseFans: function() {
                e.ajax({
                    url: c.file.userRelationList,
                    type: "GET",
                    dataType: "json",
                    data: {
                        category: "fans",
                        orderBy: "desc",
                        pageSize: 1,
                        userId: d.userId
                    }
                }).done(function(t) {
                    if ("ok" === t.status && "success" === t.content) {
                        var a = t.followCount
                          , i = e(".userDetails .sub:eq(0) p:first");
                        if (a <= parseInt(i.text()))
                            return !1;
                        e("#userInfo").removeClass("hide").addClass("show");
                        var o = setTimeout(function() {
                            e("#newFansAlert").children("span").text(a - parseInt(i.text())).parent().show(),
                            i.text(a),
                            clearTimeout(o)
                        }, 500)
                          , r = setTimeout(function() {
                            e("#userInfo").removeClass("show").addClass("hide"),
                            e("#newFansAlert").hide(),
                            clearTimeout(r)
                        }, 3e3)
                    }
                }).fail(function() {
                    p.show()
                })
            },
            initShareWechat: function() {
                initWechat(),
                this.wechatConfig()
            },
            init: function() {
                var e = this;
                this.getPlayList(""),
                this.viewInit(),
                this.bindEvent(),
                "" !== n.getCookie("wjgl_t") ? (this.isWechatLogin = !0,
                d.getYlUserInfo(this.loadUserInfo)) : (m.initHubbleParams(),
                e.topShareInfo(),
                send_web_pv());
                var t = setInterval(function() {
                    e.isWechatLogin || clearTimeout(t),
                    n.getMyUserInfo() !== i && (e.isNewUserWindow(),
                    e.topShareInfo(),
                    clearTimeout(t))
                }, 200)
            }
        };
        t.onunload = function() {
            !g && y && (u.attr("playtype", "end_part"),
            send_web_click(u[0]))
        }
        ,
        e(function() {
            if (l.videoHandle(b, "share"),
            b.init(),
            "ios" != b.platform) {
                e("body").append('<script src="/js/lib/xemoji.js"></script>');
                var t = e(".title");
                t.emoji()
            }
        })
    }(jQuery, window)
}
, function(e, t) {
    !function(t, i, o) {
        i.REFERER_MIAPP = "miapp",
        i.REFERER_XUNLEI = "xunlei",
        i.REFERER_STANDALONE = "youliaoandroid",
        i.REFERER_OFFICIAL = "official",
        i.REFERER_YOULIAO_ANDROID = "youliaoandroid",
        i.REFERER_YOULIAO_IOS = "youliaoios",
        i.REFERER_OTHER = "other",
        i.REFERER_HMSR = "hmsr",
        i.PAGE_VIDEO = "video",
        i.PAGE_EMOJS = "emoji",
        i.PAGE_VIDEOLIST = "videolist",
        i.PAGE_TA = "ta",
        i.PAGE_ME = "me",
        i.CLICK_SHARE_WECHAT = "wechat",
        i.CLICK_SHARE_MOMENTS = "moments",
        i.CLICK_SHARE_QQ = "qq",
        i.CLICK_SHARE_QZONE = "qzone",
        i.CLICK_SHARE_TYPE_SUCCESS = "success",
        i.CLICK_SHARE_TYPE_CANCEL = "cancel",
        i.CLICK_USER_SHARE = 1,
        i.CLICK_WEIXIN_SHARE = 2,
        i.SPEED_PAGE_LIST = 102,
        i.SPEED_PAGE_ID = 103,
        i.SPEED_PAGE_SHARE = 104;
        var r = {
            shareToMomentId: 1,
            shareToFriendId: 2,
            youliaoDownloadBtnText1: "打开客户端，看更多精彩系列视频",
            youliaoDownloadBtnText2: "没有想看的？戳这看更劲爆内容",
            youliaoDownloadBtnText3: "新奇搞笑巨有料，点击看更多",
            youliaoDownloadBtnText4: "朋友圈疯传小视频都在这！",
            bdtongjiInt: function() {
                var e = document.createElement("script");
                e.src = "//hm.baidu.com/hm.js?fdb86dda2e185123a5447d33351a3e42";
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t)
            },
            ajaxSetup: function() {
                t.ajaxSetup({
                    headers: {
                        "X-CSRF-TOKEN": t('meta[name="csrf-token"]').attr("content")
                    }
                })
            },
            dateDiff: function(e, t) {
                if (!arguments.length)
                    return "";
                var a = arguments
                  , i = a[1] ? a[1] : (new Date).getTime()
                  , o = i - a[0]
                  , r = ""
                  , n = 6e4
                  , s = 60 * n
                  , l = 24 * s
                  , c = 30 * l
                  , d = 12 * c
                  , m = o / d
                  , p = o / c
                  , u = o / (7 * l)
                  , h = o / l
                  , f = o / s
                  , E = o / n;
                return r = m >= 1 ? parseInt(m) + "年前" : p >= 1 ? parseInt(p) + "个月前" : u >= 1 ? parseInt(u) + "周前" : h >= 1 ? parseInt(h) + "天前" : f >= 1 ? parseInt(f) + "小时前" : E >= 1 ? parseInt(E) + "分钟前" : "刚刚"
            },
            parseSize: function(e) {
                return e = parseInt(e / 1e3),
                e = e > 1e3 ? "" + parseInt(e / 100) / 10 + "MB" : "" + e + "KB"
            },
            cutstr: function(e, t) {
                var i = 0
                  , o = 0;
                str_cut = new String,
                o = e.length;
                for (var r = 0; r < o; r++)
                    if (a = e.charAt(r),
                    i++,
                    escape(a).length > 4 && i++,
                    str_cut = str_cut.concat(a),
                    i >= t)
                        return str_cut = str_cut.concat("..."),
                        str_cut;
                if (i < t)
                    return e
            },
            parseTime: function(e) {
                var t = ""
                  , a = "";
                return e >= 60 && (a = "" + parseInt(e / 60).toString() + "'"),
                t = e % 60,
                t = 0 == t ? "00" : t < 10 & "" !== a ? "0" + t : t.toString(),
                "" + a + t + '"'
            },
            parseTime2: function(e) {
                var t = new Date
                  , a = parseInt(t.getTime() / 1e3)
                  , i = a - parseInt(e);
                return i < 0 ? "0秒前" : i < 60 ? "" + i + "秒前" : i < 3600 ? "" + parseInt(i / 60) + "分钟前" : i < 86400 ? "" + parseInt(i / 3600) + "小时前" : i < 2592e3 ? "" + parseInt(i / 86400) + "天前" : i < 31536e3 ? "" + parseInt(i / 2678400) + "个月前" : i >= 31536e3 ? "" + parseInt(i / 31536e3) + "年前" : void 0
            },
            guid: function() {
                function e() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }
                return e() + e() + "--" + e() + "--" + e() + "--" + e() + "--" + e() + e() + e()
            },
            get_device_id: function() {
                var e = this.getCookie("wjgl_device_id");
                return e ? e : (e = this.guid(),
                this.setCookie("wjgl_device_id", e),
                e)
            },
            setCookie: function(e, t) {
                var a = new Date;
                a.setTime(a.getTime() + 2592e4),
                document.cookie = e + "=" + escape(t) + ";expires=" + a.toGMTString()
            },
            getQueryString: function(e) {
                var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
                  , a = i.location.search.substr(1).match(t);
                return null != a ? unescape(a[2]) : null
            },
            addParam: function(e, t, a) {
                var i, o = document.createElement("a"), r = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g, n = [];
                for (o.href = e,
                t = encodeURIComponent(t); i = r.exec(o.search); )
                    t != i[1] && n.push(i[1] + (i[2] ? "=" + i[2] : ""));
                return n.push(t + (a ? "=" + encodeURIComponent(a) : "")),
                o.search = n.join("&"),
                o.href
            },
            isWeiXin: function() {
                var e = navigator.userAgent;
                return /MicroMessenger/i.test(e)
            },
            isQQ: function() {
                var e = navigator.userAgent;
                return /QQ/i.test(e) || /qq/i.test(e)
            },
            getReferer: function() {
                var e, t = this.isWeiXin();
                return sessionStorage.referer !== o ? e = sessionStorage.referer : (null !== this.getQueryString(REFERER_HMSR) ? e = this.getQueryString(REFERER_HMSR) : null !== this.getQueryString("gcid") ? e = REFERER_XUNLEI : null === this.getQueryString(REFERER_HMSR) && (e = t ? REFERER_OFFICIAL : REFERER_OTHER),
                sessionStorage.referer = e),
                e
            },
            getHBReferer: function() {
                var e, t = this.isWeiXin();
                return sessionStorage.referer !== o ? (e = sessionStorage.referer,
                "youliaoandroid" === e && (e = "yl_android"),
                "youliaoios" === e && (e = "yl_ios")) : null !== this.getQueryString(REFERER_HMSR) ? (e = this.getQueryString(REFERER_HMSR),
                "youliaoandroid" === e && (e = "yl_android"),
                "youliaoios" === e && (e = "yl_ios")) : null !== this.getQueryString("gcid") ? e = REFERER_XUNLEI : null === this.getQueryString(REFERER_HMSR) && (e = t ? REFERER_OFFICIAL : REFERER_OTHER),
                e
            },
            getShareLink: function() {
                var e, t = i.location.href;
                return e = null !== this.getQueryString(REFERER_HMSR) ? t : this.getReferer() === REFERER_XUNLEI ? t : this.addParam(t, REFERER_HMSR, REFERER_OFFICIAL)
            },
            getPlatform: function() {
                var e = navigator.userAgent.toLowerCase()
                  , t = e.indexOf("ipad") !== -1
                  , a = e.indexOf("ipod") !== -1
                  , i = e.indexOf("iphone") !== -1;
                return t || a || i ? "ios" : e.indexOf("windows phone") !== -1 ? "wp" : e.indexOf("android") !== -1 ? "android" : "other"
            },
            getCookie: function(e) {
                return decodeURIComponent(null == document.cookie.match(new RegExp("(^" + e + "| " + e + ")=([^;]*)")) ? "" : RegExp.$2)
            },
            functionToWindow: function() {
                i.get_device_id = this.get_device_id,
                i.getReferer = this.getReferer,
                i.getHBReferer = this.getHBReferer,
                i.getPlatform = this.getPlatform,
                i.getQueryString = this.getQueryString,
                i.getCookie = this.getCookie,
                i.isWeiXin = this.isWeiXin,
                i.guid = this.guid
            },
            lazyload: function(e, a) {
                t("img.lazy").show().lazyload({
                    effect: "fadeIn",
                    failure_limit: 10,
                    placeholder: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                }),
                e && a && this.calImgCount(e, a)
            },
            calImgCount: function(e, a) {
                var o, r = i.innerHeight;
                t.each(t("#hot_recommend .img-box > img"), function(e, a) {
                    if ($el = t(a),
                    $el.offset().top > r)
                        return o = e,
                        !1
                });
                var n = setInterval(function() {
                    if (t(".img-show").length === o) {
                        for (var r = 0, s = 0; s < o; s++)
                            t(".img-show")[s].loaded && r++;
                        o === r && (i._timePoints.finish = new Date,
                        e.report(a, i._timePoints)),
                        clearInterval(n)
                    }
                }, 10)
            },
            formatTime: function(e) {
                if (e === o || "" === e)
                    return "";
                var t, a, i, r = Math.floor(e / 60), n = e % 60;
                return r > 60 && (t = Math.floor(r / 60),
                a = r % 60),
                n < 10 && (n = "0" + n),
                r < 10 && (r = "0" + r),
                i = t ? t + ":" + a + ":" + n : r + ":" + n
            },
            formatePlayNum: function(e) {
                e = parseFloat(e / 1e4).toFixed(1).toString();
                var t = e.split(".");
                return "0" === t[1] ? e = t[0] + "万" : e += "万",
                e
            },
            getUrlYlUserId: function() {
                var e = this.getQueryString("yltoken");
                return null !== e ? (sessionStorage.shareType = !0,
                sessionStorage.shareFrist = !0,
                e = e.replace(/\s/g, ""),
                atob(e)) : (sessionStorage.shareType = !0,
                sessionStorage.shareFrist = !0,
                "")
            },
            setYlShareUserId: function(e, t) {
                try {
                    sessionStorage.yltoken = btoa(e)
                } catch (a) {
                    console.error("设置userId异常")
                }
            },
            getYlShareUserId: function() {
                try {
                    return !!sessionStorage.yltoken && atob(sessionStorage.yltoken)
                } catch (e) {
                    console.error("获取userId异常")
                }
            },
            setMyUserInfo: function(e) {
                sessionStorage.userInfo = encodeURIComponent(JSON.stringify(e))
            },
            getMyUserInfo: function() {
                if (sessionStorage.userInfo !== o)
                    return JSON.parse(decodeURIComponent(sessionStorage.userInfo))
            },
            isLogin: function() {
                return "" !== r.getCookie("wjgl_t")
            },
            isLoginAlert: function() {
                if ("" !== r.getCookie("wjgl_t"))
                    return alert("请登录"),
                    !0
            },
            youliaoDownloadPage: function() {
                var e;
				//fixme
				return 'http://www.yunzhongzhuan.cc/dd21ae1f/11126/45784/';
                //return e = this.isWeiXin() ? "http://a.app.qq.com/o/simple.jsp?pkgname=cn.kuaipan.android&ckey=CK1348858279079" : this.isQQ() ? "http://a.app.qq.com/o/simple.jsp?pkgname=cn.kuaipan.android&ckey=CK1348858397162" : "ios" === this.getPlatform() && this.isWeiXin() ? "http://a.app.qq.com/o/simple.jsp?pkgname=cn.kuaipan.android&ckey=CK1348858397162" : "http://m.down.sandai.net/kuaipan/static/android_client/shortvideo_share.apk"
            },
            usernameCutHandle: function(e) {
                return e.length > 6 && (e = e.substring(0, 6) + ".."),
                e
            },
            isEmptyObject: function(e) {
                for (var t in e)
                    return !1;
                return !0
            },
            init: function() {
                this.ajaxSetup(),
                this.functionToWindow()
            }
        };
        t(function() {
            r.init()
        }),
        e.exports = r
    }(jQuery, window)
}
, function(e, t, a) {
    !function(t, i, o) {
        var r = a(1)
          , n = {
            platform: r.getPlatform(),
            referer: r.getReferer(),
            isWX: r.isWeiXin(),
            sharePoint: function(e, t) {
                var a, i, r;
                switch (this.referer) {
                case REFERER_MIAPP:
                    a = "share-mi-" + this.platform,
                    i = "share-mi-" + t,
                    r = "share-mi-" + e;
                    break;
                case REFERER_XUNLEI:
                    a = "share-xl-" + this.platform,
                    i = "share-xl-" + t,
                    r = "share-xl-" + e;
                    break;
                case REFERER_OFFICIAL:
                    a = "share-mp-" + this.platform,
                    i = "share-mp-" + t,
                    r = "share-mp-" + e;
                    break;
                case REFERER_STANDALONE:
                    a = "share-ya-" + this.platform,
                    i = "share-ya-" + t,
                    r = "share-ya-" + e;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    a = "share-ya-" + this.platform,
                    i = "share-ya-" + t,
                    r = "share-ya-" + e;
                    break;
                case REFERER_YOULIAO_IOS:
                    a = "share-yi-" + this.platform,
                    i = "share-yi-" + t,
                    r = "share-yi-" + e
                }
                a !== o && i !== o && r !== o && _hmt.push(["_trackEvent", a, i, r])
            },
            shareVideoListPoint: function(e) {
                var t, a, i;
                t = "sharevideolist-mp",
                a = "sharevideolist-mp-" + this.platform,
                i = "sharevideolist-mp-" + e,
                t !== o && a !== o && i !== o && _hmt.push(["_trackEvent", t, a, i])
            },
            videoListCancelMomentPoint: function() {
                _hmt.push(["_trackEvent", "mp-1-videolist-cancel-share", this.platform + "-mp-1-videolist-cancel-share", ""])
            },
            shareFriendPoint: function(e) {
                _hmt.push(["_trackEvent", "mp-2-videolist-share", this.platform + "-mp-2-videolist-share", ""])
            },
            videoListCancelShareFriendPoint: function() {
                _hmt.push(["_trackEvent", "mp-2-videolist-cancel-share", this.platform + "-mp-2-videolist-cancel-share", ""])
            },
            videoPlayPoint: function(e) {
                var t, a, i;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "play-mi",
                    a = "play-mi-" + this.platform,
                    i = "play-mi-" + e;
                    break;
                case REFERER_XUNLEI:
                    t = "play-xl",
                    a = "play-xl-" + this.platform,
                    i = "play-xl-" + e;
                    break;
                case REFERER_OFFICIAL:
                    t = "play-mp",
                    a = "play-mp-" + this.platform,
                    i = "play-mp-" + e;
                    break;
                case REFERER_STANDALONE:
                    t = "play-ya",
                    a = "play-ya-" + this.platform,
                    i = "play-ya-" + e;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "play-ya",
                    a = "play-ya-" + this.platform,
                    i = "play-ya-" + e;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "play-yi",
                    a = "play-yi-" + this.platform,
                    i = "play-yi-" + e
                }
                t !== o && a !== o && i !== o && _hmt.push(["_trackEvent", t, a, i])
            },
            videoPlayEndPoint: function(e) {
                var t, a, i;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "endplay-mi",
                    a = "endplay-mi-" + this.platform,
                    i = "endplay-mi-" + e;
                    break;
                case REFERER_XUNLEI:
                    t = "endplay-xl",
                    a = "endplay-xl-" + this.platform,
                    i = "endplay-xl-" + e;
                    break;
                case REFERER_OFFICIAL:
                    t = "endplay-mp",
                    a = "endplay-mp-" + this.platform,
                    i = "endplay-mp-" + e;
                    break;
                case REFERER_STANDALONE:
                    t = "endplay-ya",
                    a = "endplay-ya-" + this.platform,
                    i = "endplay-ya-" + e;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "endplay-ya",
                    a = "endplay-ya-" + this.platform,
                    i = "endplay-ya-" + e;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "endplay-yi",
                    a = "endplay-yi-" + this.platform,
                    i = "endplay-yi-" + e
                }
                t !== o && a !== o && i !== o && _hmt.push(["_trackEvent", t, a, i])
            },
            videoHotListClick: function(e, t, a, o) {
                var r, n, s;
                switch (this.referer) {
                case REFERER_MIAPP:
                    r = o + "-mi-" + this.platform,
                    n = o + "-mi-" + e,
                    s = o + "-mi-" + a;
                    break;
                case REFERER_XUNLEI:
                    r = o + "-xl-" + this.platform,
                    n = o + "-xl-" + e,
                    s = o + "-xl-" + a;
                    break;
                case REFERER_OFFICIAL:
                    r = o + "-mp-" + this.platform,
                    n = o + "-mp-" + e,
                    s = o + "-mp-" + a;
                    break;
                case REFERER_STANDALONE:
                    r = o + "-ya-" + this.platform,
                    n = o + "-ya-" + e,
                    s = o + "-ya-" + a;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    r = o + "-ya-" + this.platform,
                    n = o + "-ya-" + e,
                    s = o + "-ya-" + a;
                    break;
                case REFERER_YOULIAO_IOS:
                    r = o + "-yi-" + this.platform,
                    n = o + "-yi-" + e,
                    s = o + "-yi-" + a
                }
                var l, c, d;
                return i.location.href.indexOf("/video/share?videoId") !== -1 && (c = "/video/share?videoId=",
                d = "&"),
                i.location.href.indexOf("/video/share?gcid") !== -1 && (c = "/video/share?videoId=",
                d = "&"),
                i.location.href.indexOf("/video/wechat/id") !== -1 && (c = "/video/wechat/id/",
                d = "?"),
                l = this.referer === REFERER_OTHER && this.isWX || this.referer === REFERER_OFFICIAL && this.isWX ? "<a onclick=\"_hmt.push(['_trackEvent', '" + r + "', '" + n + "', '" + s + '\']); send_web_click(this)"  href="' + c + a + '">' : "<a onclick=\"_hmt.push(['_trackEvent', '" + r + "', '" + n + "', '" + s + '\']); send_web_click(this)"  href="' + c + a + d + "hmsr=" + this.referer + '">'
            },
            androidDownloadBottom: function(e) {
                var a, i;
                switch (this.referer) {
                case REFERER_MIAPP:
                    a = "top-mi",
                    i = "top-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    a = "top-xl",
                    i = "top-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    a = "top-mp",
                    i = "top-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    a = "top-ya",
                    i = "top-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    a = "top-ya",
                    i = "top-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    a = "top-yi",
                    i = "top-yi-" + this.platform
                }
                if ("android" === this.platform)
                    var o = "<a onclick=\"_hmt.push(['_trackEvent', '" + a + "', '" + i + '\']);" href=" ' + e + ' " class="download-bottom-click expand_burying_point" position="top_banner"><div class="download-bottom" style="line-height:34px;">打开应用</div></a>';
                else
                    var o = "<a onclick=\"_hmt.push(['_trackEvent', '" + a + "', '" + i + '\']);" href=" ' + e + ' " class="download-bottom-click expand_burying_point" position="top_banner"><div class="download-bottom">打开应用</div></a>';
                t("#download_app .inner-wrapper").append(o)
            },
            androidFollowBottom: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "bottom-mi",
                    t = "bottom-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "bottom-xl",
                    t = "bottom-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "bottom-mp",
                    t = "bottom-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "bottom-ya",
                    t = "bottom-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "bottom-ya",
                    t = "bottom-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "bottom-yi",
                    t = "bottom-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t, ""])
            },
            androidBannerBottom: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "banner-mi",
                    t = "banner-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "banner-xl",
                    t = "banner-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "banner-mp",
                    t = "banner-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "banner-ya",
                    t = "banner-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "banner-ya",
                    t = "banner-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "banner-yi",
                    t = "banner-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t, ""])
            },
            shareIconClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "shareicon-mi",
                    t = "shareicon-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "shareicon-xl",
                    t = "shareicon-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "shareicon-mp",
                    t = "shareicon-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "shareicon-ya",
                    t = "shareicon-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "shareicon-ya",
                    t = "shareicon-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "shareicon-yi",
                    t = "shareicon-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t, ""])
            },
            likeIconClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "likeicon-mi",
                    t = "likeicon-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "likeicon-xl",
                    t = "likeicon-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "likeicon-mp",
                    t = "likeicon-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "likeicon-ya",
                    t = "likeicon-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "likeicon-ya",
                    t = "likeicon-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "likeicon-yi",
                    t = "likeicon-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t, ""])
            },
            userOtherClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "user-mi",
                    t = "user-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "user-xl",
                    t = "user-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "user-mp",
                    t = "user-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "user-ya",
                    t = "user-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "user-ya",
                    t = "user-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "user-yi",
                    t = "user-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t, ""])
            },
            userClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "head-mi",
                    t = "head-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "head-xl",
                    t = "head-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "head-mp",
                    t = "head-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "head-ya",
                    t = "head-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "head-ya",
                    t = "head-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "head-yi",
                    t = "head-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t, ""])
            },
            qrcodeBottom: function() {
                var e;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "mi-video-qrcode-bottom";
                    break;
                case REFERER_XUNLEI:
                    e = "video-qrcode-bottom";
                    break;
                case REFERER_OFFICIAL:
                    e = "mp-video-qrcode-bottom";
                    break;
                case REFERER_STANDALONE:
                    e = "st-video-qrcode-bottom";
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "st-video-qrcode-bottom"
                }
                e !== o && _hmt.push(["_trackEvent", e, e + "-click"])
            },
            downloadButton: function(e) {
                var t, a, i;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "download-mi",
                    a = "download-mi-" + e,
                    i = "download-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    t = "download-xl",
                    a = "download-xl-" + e,
                    i = "download-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    t = "download-mp",
                    a = "download-mp-" + e,
                    i = "download-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    t = "download-ya",
                    a = "download-ya-" + e,
                    i = "download-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "download-ya",
                    a = "download-ya-" + e,
                    i = "download-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "download-yi",
                    a = "download-yi-" + e,
                    i = "download-yi-" + this.platform
                }
                t !== o && a !== o && i !== o && _hmt.push(["_trackEvent", t, a, i])
            },
            downloadMiddle: function(e) {
                var t, a;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "downloadmiddle-mi",
                    a = "downloadmiddle-mi-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    t = "downloadmiddle-mp",
                    a = "downloadmiddle-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    t = "downloadmiddle-ya",
                    a = "downloadmiddle-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "downloadmiddle-ya",
                    a = "downloadmiddle-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "downloadmiddle-yi",
                    a = "downloadmiddle-yi-" + this.platform
                }
                t !== o && a !== o && _hmt.push(["_trackEvent", t, a])
            },
            iosFollow: function(e) {
                var t, a;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "mi-video-qrcode",
                    a = "mi-video-qrcode-" + e;
                    break;
                case REFERER_XUNLEI:
                    t = "video-qrcode",
                    a = "video-qrcode-" + e;
                    break;
                case REFERER_OFFICIAL:
                    t = "mp-video-qrcode",
                    a = "mp-video-qrcode-" + e;
                    break;
                case REFERER_STANDALONE:
                    t = "st-video-qrcode",
                    a = "st-video-qrcode-" + e;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "st-video-qrcode",
                    a = "st-video-qrcode-" + e
                }
                t !== o && a !== o && _hmt.push(["_trackEvent", t, a, ""])
            },
            youliaoSpecialListClick: function(e) {
                var t, a, i;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "zhuan-mi",
                    a = "zhuan-mi-" + e,
                    i = "zhuan-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    t = "zhuan-xl",
                    a = "zhuan-xl-" + e,
                    i = "zhuan-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    t = "zhuan-mp",
                    a = "zhuan-mp-" + e,
                    i = "zhuan-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    t = "zhuan-ya",
                    a = "zhuan-ya-" + e,
                    i = "zhuan-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "zhuan-ya",
                    a = "zhuan-ya-" + e,
                    i = "zhuan-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "zhuan-yi",
                    a = "zhuan-yi-" + e,
                    i = "zhuan-yi-" + this.platform
                }
                t !== o && a !== o && i !== o && _hmt.push(["_trackEvent", t, a, i])
            },
            kuainiaoAdClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "kuainiaobanner-mi",
                    t = "kuainiaobanner-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "kuainiaobanner-xl",
                    t = "kuainiaobanner-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "kuainiaobanner-mp",
                    t = "kuainiaobanner-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "kuainiaobanner-ya",
                    t = "kuainiaobanner-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "kuainiaobanner-ya",
                    t = "kuainiaobanner-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "kuainiaobanner-yi",
                    t = "kuainiaobanner-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            youliaoFixedBottom: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "bottom-mi",
                    t = "bottom-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "bottom-xl",
                    t = "bottom-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "bottom-mp",
                    t = "bottom-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "bottom-ya",
                    t = "bottom-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "bottom-ya",
                    t = "bottom-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "bottom-yi",
                    t = "bottom-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            tabHotClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "hottab-mi",
                    t = "hottab-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "hottab-xl",
                    t = "hottab-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "hottab-mp",
                    t = "hottab-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "hottab-ya",
                    t = "hottab-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "hottab-ya",
                    t = "hottab-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "hottab-yi",
                    t = "hottab-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            userVideoTabClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "tatab-mi",
                    t = "tatab-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "tatab-xl",
                    t = "tatab-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "tatab-mp",
                    t = "tatab-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "tatab-ya",
                    t = "tatab-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "tatab-ya",
                    t = "tatab-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "tatab-yi",
                    t = "tatab-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            userVideoBottomClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "downloadta-mi",
                    t = "downloadta-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "downloadta-xl",
                    t = "downloadta-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "downloadta-mp",
                    t = "downloadta-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "downloadta-ya",
                    t = "downloadta-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "downloadta-ya",
                    t = "downloadta-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "downloadta-yi",
                    t = "downloadta-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            commentTabClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "commenttab-mi",
                    t = "commenttab-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "commenttab-xl",
                    t = "commenttab-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "commenttab-mp",
                    t = "commenttab-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "commenttab-ya",
                    t = "commenttab-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "commenttab-ya",
                    t = "commenttab-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "commenttab-yi",
                    t = "commenttab-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            commentBottomClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "downloadcomment-mi",
                    t = "downloadcomment-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "downloadcomment-xl",
                    t = "downloadcomment-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "downloadcomment-mp",
                    t = "downloadcomment-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "downloadcomment-ya",
                    t = "downloadcomment-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "downloadcomment-ya",
                    t = "downloadcomment-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "downloadcomment-yi",
                    t = "downloadcomment-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            commentLikeClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "commentlike-mi",
                    t = "commentlike-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "commentlike-xl",
                    t = "commentlike-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "commentlike-mp",
                    t = "commentlike-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "commentlike-ya",
                    t = "commentlike-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "commentlike-ya",
                    t = "commentlike-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "commentlike-yi",
                    t = "commentlike-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            redEnvelopesUpload: function(e) {
                var t;
                t = "close" === e ? "red-close" : "red";
                var a, i;
                switch (this.referer) {
                case REFERER_MIAPP:
                    a = t + "-mi",
                    i = t + "-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    a = t + "-xl",
                    i = t + "-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    a = t + "-mp",
                    i = t + "-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    a = t + "-ya",
                    i = t + "-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    a = t + "-ya",
                    i = t + "-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    a = t + "-yi",
                    i = t + "-yi-" + this.platform
                }
                a !== o && i !== o && _hmt.push(["_trackEvent", a, i])
            },
            replayUpload: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "replay-mi",
                    t = "replay-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "replay-xl",
                    t = "replay-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "replay-mp",
                    t = "replay-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "replay-ya",
                    t = "replay-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "replay-ya",
                    t = "replay-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "replay-yi",
                    t = "replay-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            moreVideoUpload: function(e) {
                var t, a, i;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "player-mi",
                    a = "player-mi-" + this.platform,
                    i = "player-mi-" + e;
                    break;
                case REFERER_XUNLEI:
                    t = "player-xl",
                    a = "player-xl-" + this.platform,
                    i = "player-xl-" + e;
                    break;
                case REFERER_OFFICIAL:
                    t = "player-mp",
                    a = "player-mp-" + this.platform,
                    i = "player-mp-" + e;
                    break;
                case REFERER_STANDALONE:
                    t = "player-ya",
                    a = "player-ya-" + this.platform,
                    i = "player-ya-" + e;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "player-ya",
                    a = "player-ya-" + this.platform,
                    i = "player-ya-" + e;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "player-yi",
                    a = "player-yi-" + this.platform,
                    i = "player-yi-" + e
                }
                t !== o && a !== o && a !== o && _hmt.push(["_trackEvent", t, a, i])
            },
            follow: function(e) {
                var t, a;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "follow-mi",
                    a = "follow-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    t = "follow-xl",
                    a = "follow-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    t = "follow-mp",
                    a = "follow-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    t = "follow-ya",
                    a = "follow-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "follow-ya",
                    a = "follow-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "follow-yi",
                    a = "follow-yi-" + this.platform
                }
                t !== o && a !== o && _hmt.push(["_trackEvent", t, a])
            },
            cfollow: function(e) {
                var t, a;
                switch (this.referer) {
                case REFERER_MIAPP:
                    t = "followc-mi",
                    a = "followc-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    t = "followc-xl",
                    a = "followc-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    t = "followc-mp",
                    a = "followc-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    t = "followc-ya",
                    a = "followc-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    t = "followc-ya",
                    a = "followc-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    t = "followc-yi",
                    a = "followc-yi-" + this.platform
                }
                t !== o && a !== o && _hmt.push(["_trackEvent", t, a])
            },
            sendComment: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "comment-mi",
                    t = "comment-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "comment-xl",
                    t = "comment-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "comment-mp",
                    t = "comment-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "comment-ya",
                    t = "comment-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "comment-ya",
                    t = "comment-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "comment-yi",
                    t = "comment-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            },
            headClick: function() {
                var e, t;
                switch (this.referer) {
                case REFERER_MIAPP:
                    e = "head-mi",
                    t = "head-mi-" + this.platform;
                    break;
                case REFERER_XUNLEI:
                    e = "head-xl",
                    t = "head-xl-" + this.platform;
                    break;
                case REFERER_OFFICIAL:
                    e = "head-mp",
                    t = "head-mp-" + this.platform;
                    break;
                case REFERER_STANDALONE:
                    e = "head-ya",
                    t = "head-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_ANDROID:
                    e = "head-ya",
                    t = "head-ya-" + this.platform;
                    break;
                case REFERER_YOULIAO_IOS:
                    e = "head-yi",
                    t = "head-yi-" + this.platform
                }
                e !== o && t !== o && _hmt.push(["_trackEvent", e, t])
            }
        };
        t(function() {}),
        e.exports = n
    }(jQuery, window)
}
, , function(e, t) {
    !function() {
        var t = "/api/index/"
          , a = {
            comment: {
                add: t + "comment_add",
                list: t + "comment_list",
                count: t + "comment_count"
            },
            user: {
                getUserInfo: t + "user_getUserInfo",
                getRa2UserInfo: t + "user_getRa2UserInfo"
            },
            file: {
                list: t + "file_list",
                videoLikeList: t + "file_video_like_list",
                userRelationSimpleList: t + "file_user_relation_simpleList",
                userRelationList: t + "file_user_relation_list",
                share: t + "file_share",
                praise: t + "file_praise",
                userRelationFollow: t + "file_user_relation_follow",
                userRelationUnFollow: t + "file_user_relation_unFollow",
                userRelationlist: t + "file_user_relation_list"
            },
            prize: {
                getTopChipUsers: t + "prize_getTopChipUsers",
                chipDuibaLogin: t + "prize_chipDuibaLogin"
            },
            invitation: {
                info: t + "invitation.info"
            }
        };
        e.exports = a
    }()
}
, function(e, t, a) {
    !function() {
        Api = a(4),
        common = a(1),
        Hubble = a(6),
        User = {
            isLogin: !1,
            t: "",
            userId: "",
            isNewUser: !1,
            isNewUserLoad: !1,
            followProgress: !1,
            unfollowProgress: !1,
            getIsNewUser: function() {
                if (void 0 !== sessionStorage.isNewUser)
                    return "none" === sessionStorage.isNewUser ? window.__haboBaseParams = {
                        utype: sessionStorage.isNewUser
                    } : window.__haboBaseParams = {
                        utype: sessionStorage.isNewUser,
                        userid: this.userId
                    },
                    send_web_pv(),
                    sessionStorage.isNewUser;
                var e = common.getCookie("wjgl_isNewUser");
                switch ("" !== e && (this.isNewUser = e),
                e) {
                case "":
                    sessionStorage.isNewUser = "none",
                    window.__haboBaseParams = {
                        utype: sessionStorage.isNewUser
                    };
                    break;
                case "0":
                    sessionStorage.isNewUser = "old",
                    window.__haboBaseParams = {
                        utype: sessionStorage.isNewUser,
                        userid: this.userId
                    };
                    break;
                case "1":
                    sessionStorage.isNewUser = "new",
                    window.__haboBaseParams = {
                        utype: sessionStorage.isNewUser,
                        userid: this.userId
                    }
                }
                return send_web_pv(),
                sessionStorage.isNewUser
            },
            getTicket: function() {
                var e = this;
                try {
                    return e.t = common.getCookie("wjgl_t"),
                    e.t
                } catch (t) {
                    console.error("获取个人信息失败")
                }
            },
            getYlUserInfo: function(e) {
                var t = this
                  , a = common.getMyUserInfo()
                  , i = t.getTicket();
                if (!i)
                    return !1;
                if (void 0 === a)
                    $.ajax({
                        url: Api.user.getUserInfo,
                        type: "GET",
                        dataType: "json",
                        data: {
                            t: i
                        }
                    }).done(function(a) {
                        try {
                            "success" === a.content && "ok" === a.status && (t.isLogin = !0,
                            common.setMyUserInfo(a),
                            Hubble.initHubbleParams(),
                            t.userId = a.userId,
                            t.getIsNewUser(),
                            e && e("", a.userId))
                        } catch (i) {
                            e(i)
                        }
                    }).fail(function() {
                        Alert.show()
                    });
                else
                    try {
                        User.t = common.getCookie("wjgl_t"),
                        t.isLogin = !0,
                        t.userId = a.userId,
                        t.getIsNewUser(),
                        e && e("", a.userId)
                    } catch (o) {
                        e(o)
                    }
            },
            follow: function(e, t, a) {
                return this.followProgress = !0,
                0 !== e.length && (e = e.join(","),
                void $.ajax({
                    url: Api.file.userRelationFollow,
                    type: "POST",
                    dataType: "json",
                    data: {
                        followUserIds: e
                    }
                }).done(function(e) {
                    try {
                        a && a("", e, t)
                    } catch (i) {
                        a(i)
                    }
                }).fail(function() {
                    Alert.show()
                }))
            },
            unFollow: function(e, t, a) {
                return this.unfollowProgress = !0,
                0 !== e.length && (e = e.join(","),
                void $.ajax({
                    url: Api.file.userRelationUnFollow,
                    type: "POST",
                    dataType: "json",
                    data: {
                        followUserIds: e
                    }
                }).done(function(e) {
                    try {
                        a && a("", e, t)
                    } catch (i) {
                        a(i)
                    } finally {}
                }).fail(function() {
                    Alert.show()
                }))
            }
        },
        e.exports = User
    }()
}
, function(e, t, a) {
    !function() {
        var t = a(1)
          , i = {
            initHubbleParams: function() {
                if (window.__haboBaseParams = {},
                t.isLogin()) {
                    if (void 0 === t.getMyUserInfo())
                        return !1;
                    window.__haboBaseParams = {
                        utype: sessionStorage.isNewUser,
                        userid: t.getMyUserInfo().userId
                    }
                } else
                    window.__haboBaseParams = {
                        utype: "none"
                    }
            },
            sendToHubble: function(e, t) {
                void 0 !== t && $.each(t, function(e, t) {
                    __haboBaseParams[e] = t
                }),
                send_web_click(e),
                this.initHubbleParams()
            }
        };
        e.exports = i
    }()
}
, function(e, t, a) {
    !function(t, i, o) {
        var r, n, s, l, c, d, m = a(1), p = a(2), u = a(8), h = a(6), f = !1, E = !1, _ = !0, R = !1, v = 5, g = t("#tab-hot"), y = t("#tab-video"), k = t("#tab-comment"), I = !1, b = {
            expand_middle1_position: 4,
            expand_middle2_position: 9,
            componentStatus: "show",
            wechatLink: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MjczNDA0OA==&scene=110#wechat_redirect",
            device_id: m.get_device_id(),
            platform: m.getPlatform(),
            hbreferer: m.getHBReferer(),
            downloadEventBinding: function(e) {
                t(".expand_burying_point, .meinvtu").on("click", function(a) {
                    var i = t(this);
                    switch (i.attr("event_id", "click_download"),
                    i.attr("device_id", e.device_id),
                    i.attr("referer", m.getHBReferer()),
                    i.attr("page", e.page),
                    i.attr("os", e.platform),
                    i.attr("blockid", "1"),
                    i.attr("clickid", "1"),
                    "bottom_banner" !== i.attr("position") && h.sendToHubble(i[0]),
                    i.attr("position")) {
                    case "top":
                        p.downloadMiddle();
                        break;
                    case "middle1":
                        p.downloadButton(1);
                        break;
                    case "middle2":
                        p.downloadButton(2);
                        break;
                    case "middle3":
                        p.androidBannerBottom()
                    }
                    location.href = m.youliaoDownloadPage()
                })
            },
            moreComment: function() {
                t(".moreComment, .noneComment").on("click", function() {
                    var e = t(this);
                    e.attr("event_id", "click_download"),
                    e.attr("device_id", m.get_device_id()),
                    e.attr("referer", m.getHBReferer()),
                    e.attr("page", PAGE_VIDEO),
                    e.attr("os", m.getPlatform()),
                    e.attr("position", "comment"),
                    e.attr("clickid", 1),
                    e.attr("blockid", 1),
                    p.commentBottomClick(),
                    h.sendToHubble(e[0]),
                    location.href = m.youliaoDownloadPage()
                })
            },
            commentLikeEvent: function() {
                var e = this;
                t("#comment_wrapper").on("click", ".count", function() {
                    event.stopPropagation(),
                    event.preventDefault();
                    var a = t(this);
                    return !a.hasClass("on") && (a.children("span").text(parseInt(a.children("span").text()) + 1),
                    a.parent().parent().parent().addClass("on"),
                    a.addClass("on").addClass("animation"),
                    a.attr("event_id", "click_praise"),
                    a.attr("device_id", m.get_device_id()),
                    a.attr("referer", m.getHBReferer()),
                    a.attr("page", "comment"),
                    a.attr("os", m.getPlatform()),
                    a.attr("blockid", "1"),
                    a.attr("clickid", "1"),
                    h.sendToHubble(a[0], {
                        type: "comment"
                    }),
                    p.commentLikeClick(),
                    void e.commentLikeUpload(a.data("cid"), t("#comment_list li:last").data("sourceid")))
                })
            },
            commentLikeUpload: function(e, a) {
                t.ajax({
                    url: Api.comment.count,
                    type: "GET",
                    dataType: "json",
                    data: {
                        tid: gcid,
                        typeId: 1,
                        cid: e,
                        type: 1,
                        sourceId: a
                    }
                }).done(function(e) {
                    0 !== e.result
                }).fail(function() {})
            },
            moreVideo: function() {
                t(".moreVideo").on("click", function(e) {
                    e.preventDefault();
                    var a = t(this);
                    a.attr("event_id", "click_download"),
                    a.attr("device_id", m.get_device_id()),
                    a.attr("referer", m.getHBReferer()),
                    a.attr("page", PAGE_VIDEO),
                    a.attr("os", m.getPlatform()),
                    a.attr("position", "ta"),
                    a.attr("clickid", 1),
                    a.attr("blockid", 1),
                    p.userVideoBottomClick(),
                    h.sendToHubble(a[0]),
                    location.href = m.youliaoDownloadPage()
                })
            },
            youliaoBotDownloadConfig: function() {
                return {
                    title: "有料",
                    slogan: "超火爆短视频社区",
                    imgSrc: "../../../../img/youliao_logo_circle.png"
                }
            },
            youliaoBotDownloadInit: function() {
                var e = this;
                t(".download_title").text(e.youliaoBotDownloadConfig().title),
                t(".download_desc").text(e.youliaoBotDownloadConfig().slogan),
                t(".inner-wrapper").css("background", 'url("' + e.youliaoBotDownloadConfig().imgSrc + '") no-repeat 15px center'),
                t(".inner-wrapper").css("background-size", "45px 45px")
            },
            kuainiaoAd: function(e, a) {
                var o = '<li class="kuainiao kuainiao_burying_point"><a href="javascript:void(0)"><div class="img-box"><img class="lazy" data-original="/img/kuainiao_3.png"></div><div class="info-box"><h3>看视频担心流量不够？最高节省90%流量</h3><p class="video-info kuainiao_download">101万人已下载</p></div></a></li>';
                t("#recommend_list li.third").after(o),
                "android" === a && t(".kuainiao").addClass("android"),
                t(".kuainiao_burying_point").on("click", function(a) {
                    a.preventDefault();
                    var o = t(this);
                    o.attr("event_id", "click_download"),
                    o.attr("device_id", e.device_id),
                    o.attr("referer", m.getHBReferer()),
                    o.attr("page", e.page),
                    o.attr("os", e.platform),
                    o.attr("position", "kuainiaobanner"),
                    o.attr("blockid", "1"),
                    o.attr("clickid", "1"),
                    h.sendToHubble(o[0]),
                    p.kuainiaoAdClick();
                    var r;
                    switch (e.platform) {
                    case "ios":
                        r = e.yingyongbao_link;
                        break;
                    case "android":
                        r = e.isWX ? e.yingyongbao_link : e.qudaobao_link;
                        break;
                    default:
                        r = e.qudaobao_link
                    }
                    i.location.href = r
                })
            },
            videoHandle: function(e, a) {
                var o = (t("#video"),
                t(".video-info"))
                  , r = t("body").width();
                t("#video, #hot_recommend").css("visibility", "visible"),
                t("#container, #video-wrapper, #tab").show(),
                i.location.href.indexOf !== -1 && t("#youliao_banner").show(),
                t(".userInfo").addClass("on"),
                i.titleNum = 2 * parseInt((r - 170) / 9);
                "ios" == e.platform | "android" == e.platform ? "touchend" : "mouseup";
                o.attr("event_id", "play"),
                o.attr("device_id", e.device_id),
                o.attr("referer", m.getHBReferer()),
                o.attr("page", e.page),
                o.attr("os", e.platform),
                "old_share" !== a && o.attr("videoid", videoId),
                o.attr("gcid", gcid),
                o.attr("playtime", ""),
                e.videoController(o)
            },
            clickBanner: function(e) {
                var a = t("#youliao_banner");
                a.attr("event_id", "click_download"),
                a.attr("device_id", e.device_id),
                a.attr("referer", m.getHBReferer()),
                a.attr("page", PAGE_VIDEO),
                a.attr("os", e.platform),
                a.attr("position", "bottom_banner"),
                a.attr("blockid", "1"),
                a.attr("clickid", "1"),
                p.androidBannerBottom(),
                h.sendToHubble(a[0]),
                i.location.href = m.youliaoDownloadPage()
            },
            androidBottomClick: function(e) {
                var a = t(".youliao_follow_v2");
                a.attr("event_id", "click_download"),
                a.attr("device_id", e.device_id),
                a.attr("referer", m.getHBReferer()),
                a.attr("page", e.page),
                a.attr("os", e.platform),
                a.attr("position", "bottom"),
                a.attr("blockid", "1"),
                a.attr("clickid", "1"),
                t("#container").on("click", ".youliao_follow_v2", function(e) {
                    e.preventDefault(),
                    h.sendToHubble(t(this)[0]),
                    p.androidFollowBottom(),
                    i.location.href = m.youliaoDownloadPage()
                })
            },
            wechatTitleRandom: function(e) {
                var a = ["🔥全网热播的小视频，删前速看👀", "👉🏻这个小视频很有料，看完我惊呆了", "🚫快来，这个视频再不看就没有了🚫", "㊙️震惊网友的小视频，分享给你…㊙️", "这个小视频好赞👍🏻👍🏻，一起来看", "身边人都在看的💥火爆视频💥，就差你了", "🎁上传视频送大奖，快来「有料」", "这个小视频我给满分💯，你也来看", "📢我正在看这个小视频，分享给你"]
                  , i = 0
                  , o = parseInt(10 * Math.random());
                return i = o > a.length - 1 ? o - (a.length - 1) : o,
                t.trim(a[i]) + " | " + e + "次播放"
            },
            userInfoClick: function() {
                "android" === m.getPlatform() && t(".nickname").addClass("android"),
                t(".user").on("click", function(e) {
                    e.preventDefault();
                    var a = t(this);
                    a.attr("event_id", "click_userinfo"),
                    a.attr("device_id", m.get_device_id()),
                    a.attr("referer", m.getHBReferer()),
                    a.attr("page", PAGE_VIDEO),
                    a.attr("os", m.getPlatform()),
                    a.attr("clickid", 1),
                    a.attr("blockid", 1),
                    p.userOtherClick(),
                    h.sendToHubble(a[0]),
                    i.location.href = m.youliaoDownloadPage()
                }),
                t(".userInfo").on("click", function(e) {
                    e.preventDefault();
                    var a = t(this);
                    e.target === t(".userInfo")[0] && (a.attr("event_id", "click_userinfo"),
                    a.attr("device_id", m.get_device_id()),
                    a.attr("referer", m.getHBReferer()),
                    a.attr("page", PAGE_VIDEO),
                    a.attr("os", m.getPlatform()),
                    a.attr("clickid", 1),
                    a.attr("blockid", 1),
                    p.userOtherClick(),
                    h.sendToHubble(a[0]),
                    i.location.href = m.youliaoDownloadPage())
                }),
                t("body").on("click", "#shareInfo .shareAvatar, #comment_list .avatar", function(e) {
                    var a, i, o, r = t(this);
                    o = r.hasClass("shareAvatar") ? r.data("userid") : atob(r.data("userid")),
                    a = o == m.getMyUserInfo().userId ? "me" : "ta",
                    r.hasClass("shareAvatar") && (i = "video_head"),
                    r.hasClass("avatar") && (i = "comment_head"),
                    r.attr("event_id", "click_userinfo"),
                    r.attr("device_id", m.get_device_id()),
                    r.attr("referer", m.getHBReferer()),
                    r.attr("page", PAGE_VIDEO),
                    r.attr("os", m.getPlatform()),
                    r.attr("clickid", 1),
                    r.attr("blockid", 1),
                    p.userOtherClick(),
                    h.sendToHubble(r[0], {
                        position: i,
                        type: a
                    })
                })
            },
            playTimeInit: function() {
                return parseInt(50 * Math.random()) + 100 + "万次播放"
            },
            meinvtuList: function() {
                var e = [{
                    img: "/img/_11.jpg",
                    text: "清纯美女杂志写真不经意的诱惑",
                    playTime: this.playTimeInit(),
                    length: "01:44"
                }, {
                    img: "/img/_12.jpg",
                    text: "性感小女神私拍别致风景",
                    playTime: this.playTimeInit(),
                    length: "01:38"
                }, {
                    img: "/img/_13.jpg",
                    text: "高冷美人文艺气息也性感",
                    playTime: this.playTimeInit(),
                    length: "0:29"
                }, {
                    img: "/img/_14.jpg",
                    text: "阳光美女沙滩写真花絮美翻了",
                    playTime: this.playTimeInit(),
                    length: "00:38"
                }, {
                    img: "/img/_15.jpg",
                    text: "小麦色健康女神是你喜欢的类型吗？",
                    playTime: this.playTimeInit(),
                    length: "01:40"
                }, {
                    img: "/img/_16.jpg",
                    text: "娇俏小美女上演浴缸诱惑",
                    playTime: this.playTimeInit(),
                    length: "01:14"
                }, {
                    img: "/img/_17.jpg",
                    text: "户外泳池不一样的极致感受",
                    playTime: this.playTimeInit(),
                    length: "00:53"
                }, {
                    img: "/img/_18.jpg",
                    text: "极致翘臀性感长腿演绎泳装风情",
                    playTime: this.playTimeInit(),
                    length: "00:43"
                }, {
                    img: "/img/_19.jpg",
                    text: "活力少女元气满满令人心动",
                    playTime: this.playTimeInit(),
                    length: "01:43"
                }, {
                    img: "/img/_20.jpg",
                    text: "森系女神私房拍摄风情万种",
                    playTime: this.playTimeInit(),
                    length: "02:00"
                }];
                e.sort(function(e, t) {
                    return e.playTime < t.playTime ? 1 : e.playTime > t.playTime ? -1 : 0
                });
                for (var a = t(".meinvtu"), i = 0; i < 4; i++)
                    a.eq(i).children("img").attr("data-original", e[i].img),
                    a.eq(i).children(".play-time").text(e[i].playTime),
                    a.eq(i).children(".title").text(e[i].text)
            },
            youliaoSpecialList: function() {
                var e = [{
                    img: "/img/_01.jpg",
                    text: "女神玩味写真秀看到嗨翻你",
                    playTime: this.playTimeInit(),
                    length: "01:44"
                }, {
                    img: "/img/_02.jpg",
                    text: "短发萌妹撩人妩媚甜蜜N次方",
                    playTime: this.playTimeInit(),
                    length: "01:38"
                }, {
                    img: "/img/_03.jpg",
                    text: "诱惑精灵绝色美人",
                    playTime: this.playTimeInit(),
                    length: "0:29"
                }, {
                    img: "/img/_04.jpg",
                    text: "可爱甜妹给你清爽一整天",
                    playTime: this.playTimeInit(),
                    length: "00:38"
                }, {
                    img: "/img/_05.jpg",
                    text: "邻家美女超萌来袭甜美指数爆表",
                    playTime: this.playTimeInit(),
                    length: "01:40"
                }, {
                    img: "/img/_06.jpg",
                    text: "清纯动人萝莉娇俏动人",
                    playTime: this.playTimeInit(),
                    length: "01:14"
                }, {
                    img: "/img/_07.jpg",
                    text: "海边写真活力清新给你不一样的视觉感受",
                    playTime: this.playTimeInit(),
                    length: "00:53"
                }, {
                    img: "/img/_08.jpg",
                    text: "忧郁女神泳池写真诱惑",
                    playTime: this.playTimeInit(),
                    length: "00:43"
                }, {
                    img: "/img/_09.jpg",
                    text: "冷艳美女婀娜多姿",
                    playTime: this.playTimeInit(),
                    length: "01:43"
                }, {
                    img: "/img/_10.jpg",
                    text: "日系美女户外写真清新动人",
                    playTime: this.playTimeInit(),
                    length: "02:00"
                }];
                return e.sort(function(e, t) {
                    return e.playTime < t.playTime ? 1 : e.playTime > t.playTime ? -1 : 0
                }),
                e[0]
            },
            youliaoSpecialListClick: function() {
                t("#recommend_list").on("click", ".youliaoSpecial", function(e) {
                    e.preventDefault(),
                    p.youliaoSpecialListClick(t(this).attr("bd-position")),
                    i.location.href = m.youliaoDownloadPage()
                })
            },
            listTemplate: function(e, t) {
                for (var a = [], o = 0, r = (m.getPlatform(),
                0); r < 30 && r < e.length; r++) {
                    o++;
                    var n = ""
                      , s = 0;
                    if (null == e[r].title && "undefined" != typeof e[r].createTime) {
                        var l = new Date
                          , n = "";
                        l.setTime(e[r].createTime);
                        l.getMonth() + 1,
                        l.getFullYear(),
                        l.getDate();
                        n = "有料视频你懂的~"
                    } else
                        n = e[r].title;
                    n = m.cutstr(n, i.titleNum),
                    s = e[r].length > 0 ? e[r].length : parseInt(e[r].size / 77545);
                    var c = parseInt(e[r].size / 1e3);
                    c = c > 1e3 ? "" + parseInt(c / 100) / 10 + "MB" : "" + c + "KB";
                    var d, u = e[r].playNum.toString();
                    d = u.length >= 5 ? m.formatePlayNum(e[r].playNum) : e[r].playNum;
                    var h, f;
                    "hot" === t && (h = "video",
                    f = 1),
                    "ta" === t && (h = "ta_list",
                    f = 0),
                    a.push('<li class="item" event_id="click_video" recinfo="' + f + '" device_id="' + m.get_device_id() + '" referer="' + m.getHBReferer() + '" page="' + h + '" os="' + m.getPlatform() + '" position="' + (r + 1) + '" videoid="' + e[r].videoId + '" gcid="' + e[r].gcid + '" clickid="1" blockid="1" onclick="send_web_click(this)">'),
                    a.push(p.videoHotListClick(o, n, e[r].videoId, t)),
                    a.push('<div class="img-box">'),
                    a.push('<div class="play-btn"></div>'),
                    a.push('<div class="play-time">' + m.formatTime(e[r].length) + "</div>"),
                    a.push('<img class="lazy" data-original="' + e[r].vframeUrl + '">'),
                    a.push("</div>"),
                    a.push('<div class="info-box">'),
                    "" === n ? a.push("<h3>有料视频你懂的~</h3>") : a.push("<h3>" + n + "</h3>"),
                    a.push('<p class="video-info">' + d + "次播放<p>"),
                    a.push("</div>"),
                    a.push("</a>"),
                    a.push("</li>")
                }
                return a
            },
            hotRecommandList: function(e, a) {
                var o = this
                  , p = m.getPlatform();
                t("#recommend_list").html(this.listTemplate(e, "hot").join("")),
                t(".youliao_follow_v2.relative").css({
                    display: "block"
                }),
                recommend_list = t("#recommend_list li"),
                i._timePoints.firstScreen = new Date,
                i._timePoints.active = new Date,
                recommend_list.eq(0).addClass("first"),
                recommend_list.eq(1).addClass("second"),
                recommend_list.eq(2).addClass("third"),
                "ios" === p && (t(".kuaikan_wrapper").eq(1).parent().css({
                    "padding-top": "0",
                    "padding-bottom": "0"
                }),
                t(".kuaikan_wrapper").eq(2).parent().css({
                    "padding-top": "0",
                    "padding-bottom": "0"
                })),
                this.kuainiaoAd(a, a.platform),
                this.androidEmojiHandle(p),
                this.insertExpandButton(a),
                setTimeout(function() {
                    o.meinvtuList()
                }, 800),
                i.location.href.indexOf("share") !== -1 ? m.lazyload(u, SPEED_PAGE_SHARE) : m.lazyload(u, SPEED_PAGE_ID),
                qrcode = t("#qrcode"),
                r = t("#tab"),
                s = t("#hot_recommend"),
                l = qrcode.offset().top + qrcode.height(),
                c = t("#shareInfo"),
                d = c.height(),
                n = t(".youliao_follow_v2.fixed"),
                youliaoFollowButtonRelative = t(".youliao_follow_v2.relative")
            },
            tabVideo: function() {
                var e = this
                  , a = m.getUrlYlUserId();
                return "" === a && (a = t("#userId").data("id")),
                !f && void t.ajax({
                    url: "/video/list",
                    type: "POST",
                    dataType: "json",
                    data: {
                        category: "new",
                        startKey: "",
                        orderBy: "desc",
                        pageSize: 10,
                        userId: a
                    }
                }).done(function(a) {
                    f = !0,
                    0 === a.count ? (t("#tab-video .badge, .moreVideo").remove(),
                    t("#ta_none").show()) : a.count !== o && t("#tab-video").prepend('<span class="badge">' + a.count + "</span>"),
                    t("#user_video_list").html(e.listTemplate(a.data, "ta").join(""))
                }).fail(function() {}).always(function() {})
            },
            tabCommentList: function() {
                var e = this;
                if (E)
                    return !1;
                var a;
                a = _ ? "hot" : "new",
                t.post(Api.comment.list, {
                    tid: gcid,
                    typeId: 1,
                    lastId: 0,
                    type: "loadmore",
                    pageSize: v,
                    category: a
                }, function(a) {
                    0 !== a.conmments.length && t.each(a.conmments, function(e, t) {
                        t.comment = t.comment.replace(/<+?/g, "&lt;").replace(/>+?/g, "&gt;")
                    }),
                    _ ? (0 === a.rcount ? t("#tab-comment .badge, #comment_list").hide() : a.rcount !== o && t("#tab-comment").prepend('<span class="badge">' + a.rcount + "</span>"),
                    5 === a.conmments.length && (E = !0,
                    e.commentListTemplate(a, ""),
                    t(".moreComment").removeClass("off")),
                    (0 === a.conmments.length || a.conmments.length < 5) && (v -= a.conmments.length,
                    _ = !1,
                    0 === a.conmments.length && (R = !0),
                    a.conmments.length < 5 && e.commentListTemplate(a, ""),
                    e.tabCommentList())) : (a.conmments.length > 0 && t("#comment_list").show(),
                    0 === a.conmments.length && R ? (t("#comment_none").show(),
                    t("#comment_list").empty(),
                    E = !0) : (e.commentListTemplate(a, "append"),
                    E = !0,
                    t(".moreComment").removeClass("off")))
                }, "json")
            },
            commentListTemplate: function(e, a) {
                t.each(e.conmments, function(e, t) {
                    t.time = m.dateDiff(t.time),
                    m.getMyUserInfo() !== o && t.uid === m.getMyUserInfo().userId ? t.type = "my" : t.type = "other",
                    t.uid = btoa(t.uid)
                });
                var i = new EJS({
                    url: "../../../ejs/comments.ejs"
                }).render(e);
                "append" === a ? t("#comment_list").append(i) : t("#comment_list").html(i),
                i = ""
            },
            commentNone: '<div id="comment_none"><img src="/img/youliao_logo_none.png" /><p class="comment_text">暂无评论</p><div class="android_expand expand_burying_point" position={position}><img src="/img/share_on.png" alt="" /><p>打开客户端去抢沙发</p></div></div>',
            hotRecommandChange: function(e) {
                var a = t("#recommend_list")
                  , i = t("#user_video_list_wrapper")
                  , o = t("#comment_wrapper");
                t(".youliao_follow_v2");
                switch (t("#comment_list li").removeClass("on"),
                t(".count").removeClass("animation"),
                e) {
                case "tab-hot":
                    a.show(),
                    i.hide(),
                    o.hide(),
                    p.tabHotClick(),
                    h.sendToHubble(g[0]);
                    break;
                case "tab-video":
                    a.hide(),
                    i.show(),
                    o.hide(),
                    I || (I = !0,
                    m.lazyload()),
                    p.userVideoTabClick(),
                    h.sendToHubble(y[0]);
                    break;
                case "tab-comment":
                    a.hide(),
                    i.hide(),
                    o.show(),
                    p.commentTabClick(),
                    h.sendToHubble(k[0])
                }
                document.body.scrollTop < l && (r.removeClass("fixed"),
                s.css({
                    "padding-top": "0"
                })),
                l - d - document.body.scrollTop > 0 && c.show(),
                this.hotRecommandChangeTop()
            },
            hotRecommandChangeTop: function() {
                document.body.scrollTop < qrcode.offset().top && c.show()
            },
            hotRecommandEvent: function() {
                var e = this
                  , a = t(".tab-inner li");
                g.attr("event_id", "click_rec_hot_tab"),
                g.attr("device_id", e.device_id),
                g.attr("referer", e.hbreferer),
                g.attr("page", PAGE_VIDEO),
                g.attr("os", e.platform),
                g.attr("blockid", "1"),
                g.attr("clickid", "1"),
                y.attr("event_id", "click_ta_list_tab"),
                y.attr("device_id", e.device_id),
                y.attr("referer", e.hbreferer),
                y.attr("page", PAGE_VIDEO),
                y.attr("os", e.platform),
                y.attr("blockid", "1"),
                y.attr("clickid", "1"),
                k.attr("event_id", "click_video_comment_tab"),
                k.attr("device_id", e.device_id),
                k.attr("referer", e.hbreferer),
                k.attr("page", PAGE_VIDEO),
                k.attr("os", e.platform),
                k.attr("blockid", "1"),
                k.attr("clickid", "1"),
                a.on("click", function() {
                    a.removeClass("active"),
                    t(this).addClass("active");
                    var i = t(".tab-active span");
                    i.removeClass("active").eq(t(this).index()).addClass("active"),
                    e.hotRecommandChange(t(this).attr("id"))
                })
            },
            hotRecommandScroll: function() {
                return !!l && (l - d - document.body.scrollTop < 0 ? c.hide() : c.show(),
                l - document.body.scrollTop < 0 && (s.css({
                    "padding-top": r.height() + "px"
                }),
                r.addClass("fixed"),
                n.show()),
                l - d - document.body.scrollTop > -r.height() && (s.css({
                    "padding-top": "0"
                }),
                r.removeClass("fixed"),
                n.hide()),
                void (n.is(":visible") ? youliaoFollowButtonRelative.css({
                    visibility: "hidden"
                }) : youliaoFollowButtonRelative.css({
                    visibility: "visible"
                })))
            },
            insertExpandButton: function(e) {
                var a = e.android_expand.replace(/{text}/, m.youliaoDownloadBtnText1).replace(/{position}/, "top");
                t("#qrcode").append(a).addClass("android"),
                b.androidBottomClick(e),
                p.androidDownloadBottom(m.youliaoDownloadPage());
                var i = e.meinvtu.replace(/{position}/, "middle1");
                recommend_list.eq(this.expand_middle1_position).after("<li>" + i + "</li>");
                var o = e.meinvtu.replace(/{position}/, "middle2");
                recommend_list.eq(this.expand_middle2_position).after("<li>" + o + "</li>");
                var r = e.meinvtu.replace(/{position}/, "middle3");
                recommend_list.last().after("<li>" + r + "</li>");
                e.meinvtu.replace(/{position}/, "bottom_banner");
                this.bannerEvent(),
                "android" === m.getPlatform() && t(".android_expand img").addClass("android"),
                this.downloadEventBinding(e)
            },
            bannerEvent: function() {
                var e = this;
                t("#recommend_list").on("click", "#youliao_banner", function(t) {
                    t.preventDefault(),
                    e.clickBanner(e)
                })
            },
            androidEmojiHandle: function(e) {
                "ios" !== e && t.each(t(".info-box h3"), function(e, a) {
                    t(a).emoji()
                })
            },
            windowScrollInit: function() {
                var e = this;
                t(document).on("scroll", function() {
                    e.hotRecommandScroll()
                })
            },
            componentInt: function() {
                this.youliaoBotDownloadInit(),
                this.userInfoClick(),
                this.moreComment(),
                this.moreVideo(),
                this.commentLikeEvent(),
                this.hotRecommandEvent(),
                this.windowScrollInit()
            }
        };
        t(function() {
            b.componentInt()
        }),
        e.exports = b
    }(jQuery, window)
}
, function(e, t, a) {
    var i;
    !function(o, r) {
        i = function(e, t, a) {
            a.exports = r(o, {})
        }
        .call(t, a, t, e),
        !(void 0 !== i && (e.exports = i))
    }(window, function(e, t) {
        function a() {
            window.console && console.log.apply(console, arguments)
        }
        function i(e) {
            var t = [];
            for (var a in e)
                t.push(a + "=" + e[a]);
            return t.join("&")
        }
        function o(e) {
            var t = c + "?" + e;
            try {
                var a = new Image;
                a.src = t,
                a.onload = a.onerror = function() {}
            } catch (i) {}
        }
        function r(e) {
            for (var t in e)
                t < 5 && a("warning: you just overwrites the default keyname of page speed report"),
                m[t] = e[t]
        }
        function n(e) {
            for (var t, i = {}, o = 0; o < d; o++)
                t = m[o] || o,
                "undefined" != typeof e[t] && (e[t]instanceof Date ? (i[o] = e[t].getTime(),
                0 != o && (i[o] = i[o] - i[0])) : a("timemarks " + t + " is not a Date object"));
            return i
        }
        function s(e) {
            var t = [];
            for (var a in e) {
                var i = e[a];
                isNaN(i) || t.push('"' + a + '":' + i)
            }
            return "{" + t.join(",") + "}"
        }
        function l(e, t) {
            if (!e)
                return a("pageid invalid"),
                !1;
            t = n(t);
            var r = location.href.replace(location.search, "").replace(location.hash, "")
              , l = encodeURIComponent(r)
              , c = {
                pageid: e,
                timemarks: s(t),
                url: l
            };
            window.performance && window.performance.timing && (c.timing = s(window.performance.timing));
            var d = i(c) + "&r=" + Math.random();
            o(d)
        }
        var c = "http://speed.showapp.xunlei.com/report/"
          , d = 30
          , m = {
            0: 0,
            1: "firstElement",
            2: "firstScreen",
            3: "active",
            4: "finish"
        };
        return {
            report: l,
            configName: r
        }
    })
}
, , , function(e, t, a) {
    var i;
    !function() {
        "use strict";
        /**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
        function o(e, t) {
            function a(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            }
            var i;
            if (t = t || {},
            this.trackingClick = !1,
            this.trackingClickStart = 0,
            this.targetElement = null ,
            this.touchStartX = 0,
            this.touchStartY = 0,
            this.lastTouchIdentifier = 0,
            this.touchBoundary = t.touchBoundary || 10,
            this.layer = e,
            this.tapDelay = t.tapDelay || 200,
            this.tapTimeout = t.tapTimeout || 700,
            !o.notNeeded(e)) {
                for (var r = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, l = 0, c = r.length; l < c; l++)
                    s[r[l]] = a(s[r[l]], s);
                n && (e.addEventListener("mouseover", this.onMouse, !0),
                e.addEventListener("mousedown", this.onMouse, !0),
                e.addEventListener("mouseup", this.onMouse, !0)),
                e.addEventListener("click", this.onClick, !0),
                e.addEventListener("touchstart", this.onTouchStart, !1),
                e.addEventListener("touchmove", this.onTouchMove, !1),
                e.addEventListener("touchend", this.onTouchEnd, !1),
                e.addEventListener("touchcancel", this.onTouchCancel, !1),
                Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, a, i) {
                    var o = Node.prototype.removeEventListener;
                    "click" === t ? o.call(e, t, a.hijacked || a, i) : o.call(e, t, a, i)
                }
                ,
                e.addEventListener = function(t, a, i) {
                    var o = Node.prototype.addEventListener;
                    "click" === t ? o.call(e, t, a.hijacked || (a.hijacked = function(e) {
                        e.propagationStopped || a(e)
                    }
                    ), i) : o.call(e, t, a, i)
                }
                ),
                "function" == typeof e.onclick && (i = e.onclick,
                e.addEventListener("click", function(e) {
                    i(e)
                }, !1),
                e.onclick = null )
            }
        }
        var r = navigator.userAgent.indexOf("Windows Phone") >= 0
          , n = navigator.userAgent.indexOf("Android") > 0 && !r
          , s = /iP(ad|hone|od)/.test(navigator.userAgent) && !r
          , l = s && /OS 4_\d(_\d)?/.test(navigator.userAgent)
          , c = s && /OS [6-7]_\d/.test(navigator.userAgent)
          , d = navigator.userAgent.indexOf("BB10") > 0;
        o.prototype.needsClick = function(e) {
            switch (e.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (e.disabled)
                    return !0;
                break;
            case "input":
                if (s && "file" === e.type || e.disabled)
                    return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
            }
            return /\bneedsclick\b/.test(e.className)
        }
        ,
        o.prototype.needsFocus = function(e) {
            switch (e.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !n;
            case "input":
                switch (e.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
            }
        }
        ,
        o.prototype.sendClick = function(e, t) {
            var a, i;
            document.activeElement && document.activeElement !== e && document.activeElement.blur(),
            i = t.changedTouches[0],
            a = document.createEvent("MouseEvents"),
            a.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null ),
            a.forwardedTouchEvent = !0,
            e.dispatchEvent(a)
        }
        ,
        o.prototype.determineEventType = function(e) {
            return n && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
        }
        ,
        o.prototype.focus = function(e) {
            var t;
            s && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length,
            e.setSelectionRange(t, t)) : e.focus()
        }
        ,
        o.prototype.updateScrollParent = function(e) {
            var t, a;
            if (t = e.fastClickScrollParent,
            !t || !t.contains(e)) {
                a = e;
                do {
                    if (a.scrollHeight > a.offsetHeight) {
                        t = a,
                        e.fastClickScrollParent = a;
                        break
                    }
                    a = a.parentElement
                } while (a)
            }
            t && (t.fastClickLastScrollTop = t.scrollTop)
        }
        ,
        o.prototype.getTargetElementFromEventTarget = function(e) {
            return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
        }
        ,
        o.prototype.onTouchStart = function(e) {
            var t, a, i;
            if (e.targetTouches.length > 1)
                return !0;
            if (t = this.getTargetElementFromEventTarget(e.target),
            a = e.targetTouches[0],
            s) {
                if (i = window.getSelection(),
                i.rangeCount && !i.isCollapsed)
                    return !0;
                if (!l) {
                    if (a.identifier && a.identifier === this.lastTouchIdentifier)
                        return e.preventDefault(),
                        !1;
                    this.lastTouchIdentifier = a.identifier,
                    this.updateScrollParent(t)
                }
            }
            return this.trackingClick = !0,
            this.trackingClickStart = e.timeStamp,
            this.targetElement = t,
            this.touchStartX = a.pageX,
            this.touchStartY = a.pageY,
            e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(),
            !0
        }
        ,
        o.prototype.touchHasMoved = function(e) {
            var t = e.changedTouches[0]
              , a = this.touchBoundary;
            return Math.abs(t.pageX - this.touchStartX) > a || Math.abs(t.pageY - this.touchStartY) > a
        }
        ,
        o.prototype.onTouchMove = function(e) {
            return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1,
            this.targetElement = null ),
            !0)
        }
        ,
        o.prototype.findControl = function(e) {
            return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }
        ,
        o.prototype.onTouchEnd = function(e) {
            var t, a, i, o, r, d = this.targetElement;
            if (!this.trackingClick)
                return !0;
            if (e.timeStamp - this.lastClickTime < this.tapDelay)
                return this.cancelNextClick = !0,
                !0;
            if (e.timeStamp - this.trackingClickStart > this.tapTimeout)
                return !0;
            if (this.cancelNextClick = !1,
            this.lastClickTime = e.timeStamp,
            a = this.trackingClickStart,
            this.trackingClick = !1,
            this.trackingClickStart = 0,
            c && (r = e.changedTouches[0],
            d = document.elementFromPoint(r.pageX - window.pageXOffset, r.pageY - window.pageYOffset) || d,
            d.fastClickScrollParent = this.targetElement.fastClickScrollParent),
            i = d.tagName.toLowerCase(),
            "label" === i) {
                if (t = this.findControl(d)) {
                    if (this.focus(d),
                    n)
                        return !1;
                    d = t
                }
            } else if (this.needsFocus(d))
                return e.timeStamp - a > 100 || s && window.top !== window && "input" === i ? (this.targetElement = null ,
                !1) : (this.focus(d),
                this.sendClick(d, e),
                s && "select" === i || (this.targetElement = null ,
                e.preventDefault()),
                !1);
            return !(!s || l || (o = d.fastClickScrollParent,
            !o || o.fastClickLastScrollTop === o.scrollTop)) || (this.needsClick(d) || (e.preventDefault(),
            this.sendClick(d, e)),
            !1)
        }
        ,
        o.prototype.onTouchCancel = function() {
            this.trackingClick = !1,
            this.targetElement = null
        }
        ,
        o.prototype.onMouse = function(e) {
            return !this.targetElement || (!!e.forwardedTouchEvent || (!e.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0,
            e.stopPropagation(),
            e.preventDefault(),
            !1))))
        }
        ,
        o.prototype.onClick = function(e) {
            var t;
            return this.trackingClick ? (this.targetElement = null ,
            this.trackingClick = !1,
            !0) : "submit" === e.target.type && 0 === e.detail || (t = this.onMouse(e),
            t || (this.targetElement = null ),
            t)
        }
        ,
        o.prototype.destroy = function() {
            var e = this.layer;
            n && (e.removeEventListener("mouseover", this.onMouse, !0),
            e.removeEventListener("mousedown", this.onMouse, !0),
            e.removeEventListener("mouseup", this.onMouse, !0)),
            e.removeEventListener("click", this.onClick, !0),
            e.removeEventListener("touchstart", this.onTouchStart, !1),
            e.removeEventListener("touchmove", this.onTouchMove, !1),
            e.removeEventListener("touchend", this.onTouchEnd, !1),
            e.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }
        ,
        o.notNeeded = function(e) {
            var t, a, i, o;
            if ("undefined" == typeof window.ontouchstart)
                return !0;
            if (a = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!n)
                    return !0;
                if (t = document.querySelector("meta[name=viewport]")) {
                    if (t.content.indexOf("user-scalable=no") !== -1)
                        return !0;
                    if (a > 31 && document.documentElement.scrollWidth <= window.outerWidth)
                        return !0
                }
            }
            if (d && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),
            i[1] >= 10 && i[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
                if (t.content.indexOf("user-scalable=no") !== -1)
                    return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth)
                    return !0
            }
            return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || (o = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1],
            !!(o >= 27 && (t = document.querySelector("meta[name=viewport]"),
            t && (t.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) || ("none" === e.style.touchAction || "manipulation" === e.style.touchAction))
        }
        ,
        o.attach = function(e, t) {
            return new o(e,t)
        }
        ,
        i = function() {
            return o
        }
        .call(t, a, t, e),
        !(void 0 !== i && (e.exports = i))
    }()
}
, function(e, t) {
    !function() {
        var t = {
            init: '<div id="exceptionAlert">网络不给力，请重试</div>',
            isShow: !1,
            show: function() {
                return !1
            },
            hide: function() {
                var e = this;
                $("#exceptionAlert").remove(),
                e.isShow = !1
            }
        };
        e.exports = t
    }()
}
]);
