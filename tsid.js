(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [618],
  {
    5076: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return home_Link;
        },
      });
      var s = a(5893),
        n = a(7294),
        r = a(4964),
        l = a.n(r),
        ui_Loading = () =>
          (0, s.jsxs)("div", {
            className: l().container,
            children: [
              (0, s.jsx)("div", { className: l().bounce }),
              (0, s.jsx)("div", { className: l().bounce2 }),
              (0, s.jsx)("div", { className: l().bounce3 }),
              (0, s.jsx)("div", { className: l().bounce4 }),
            ],
          }),
        i = a(5675),
        o = a.n(i),
        c = a(6893),
        d = a(8193),
        m = a(1163);
      async function getRandomCdn() {
        let e = await fetch("https://media.savetube.vip/api/random-cdn"),
          t = await e.json();
        return t.cdn;
      }
      async function fetchDownloadUrl(e, t, a, s, n) {
        let r = await getRandomCdn();
        if (null != s && "audio" != a)
          return {
            data: {
              downloadUrl: s + "&title=".concat(n, "-ytshorts.savetube.vip"),
            },
            status: !0,
            message: "",
          };
        {
          let a = await fetch("https://".concat(r, "/download"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              downloadType: "128" === t ? "audio" : "video",
              quality: t,
              key: e,
            }),
          });
          return null == a
            ? {
                status: !1,
                message:
                  "Sorry, you can't download this video at this time.Please try downloading the video again later.",
                data: null,
              }
            : await a.json();
        }
      }
      var home_Video = (e) => {
          var t, a, r;
          let {
            currentVideoData: l,
            contentType: i,
            btnsp: u,
            showDownloadp: x,
          } = e;
          (0, m.useRouter)();
          let [h, p] = (0, n.useState)(u),
            [g, f] = (0, n.useState)(!1),
            [b, j] = (0, n.useState)(x),
            [w, v] = (0, n.useState)(""),
            [y, N] = (0, n.useState)(""),
            _ = (0, n.useRef)(""),
            getDownloadButton = async (e, t) => {
              try {
                window.open("https://ey43.com/4/10156255", "_blank");
              } catch (e) {}
              (p(!1), f(!0));
              let a = document.getElementById("quality").value,
                s = null;
              for (let t of e.video_formats)
                if (parseInt(t.height) == parseInt(a)) {
                  s = t.url;
                  break;
                }
              s && (f(!1), v(s), j(!0));
              try {
                let n = await fetchDownloadUrl(e.key, a, t, s, e.titleSlug);
                if (!1 == n.status) {
                  (N(n.message), f(!1));
                  return;
                }
                (f(!1), v(n.data.downloadUrl), j(!0));
              } catch (e) {
                (console.error("Download error:", e),
                  N("An error occurred. Please try again."),
                  f(!1));
              }
            };
          return (0, s.jsxs)("div", {
            id: "downloadSection",
            className:
              "mt-10 my-2 sm:px-4 sm:max-w-3xl p-4 sm:flex sm:gap-8 mx-6 lg:mx-auto bg-bg-main",
            children: [
              (0, s.jsx)("div", {
                className:
                  "w-[100%] max-w-[100%] sm:max-w-[275px] lg:max-w-[300px] relative",
                children: (0, s.jsx)(o(), {
                  src: l.thumbnail,
                  alt: "image",
                  width: 300,
                  height: 0,
                }),
              }),
              (0, s.jsxs)("div", {
                className: "text-left",
                children: [
                  (0, s.jsx)("h3", {
                    className:
                      "text-left mt-2  font-[500] text-[16px] sm:text-[22px]",
                    children: l.title,
                  }),
                  (0, s.jsx)("p", {
                    className: "text-left ",
                    children: l.durationLabel,
                  }),
                  (0, s.jsx)("hr", {
                    className: "my-[.3rem]",
                    style: { " borderTop": "3px solid rgba(0,0,0,.1)" },
                  }),
                  h &&
                    (0, s.jsxs)("div", {
                      className: "btn-group flex",
                      children: [
                        (0, s.jsxs)("select", {
                          className:
                            "h-[40px] text-[#444] border border-[#aaa] rounded-[.5rem] w-[50%] mr-[10px] ",
                          style: {
                            backgroundImage:
                              'url(""),\n                linear-gradient(to bottom,#ffffff 0%,#e5e5e5 100%)',
                            padding: "0.4em 1.4em 0.5em 0.8em",
                            lineHeight: 1.3,
                          },
                          defaultValue:
                            "video" == i
                              ? null !==
                                  (r =
                                    null ===
                                      (t = l.video_formats.find(
                                        (e) => 1 == e.default_selected,
                                      )) || void 0 === t
                                      ? void 0
                                      : t.height) && void 0 !== r
                                ? r
                                : null === (a = l.video_formats[0]) ||
                                    void 0 === a
                                  ? void 0
                                  : a.height
                              : "",
                          id: "quality",
                          ref: _,
                          children: [
                            "all" == i &&
                              [...l.audio_formats, ...l.video_formats].map(
                                (e) =>
                                  (0, s.jsx)(
                                    "option",
                                    {
                                      value: e.height || e.quality,
                                      children:
                                        "MP3 128kbps" === e.label
                                          ? "MP3 320 KBPS"
                                          : e.label,
                                    },
                                    e.label,
                                  ),
                              ),
                            "video" == i &&
                              [...l.video_formats, ...l.audio_formats].map(
                                (e) =>
                                  (0, s.jsx)(
                                    "option",
                                    {
                                      value: e.height || e.quality,
                                      children:
                                        "MP3 128kbps" === e.label
                                          ? "MP3 320 KBPS"
                                          : e.label,
                                    },
                                    e.label,
                                  ),
                              ),
                            "audio" == i &&
                              l.audio_formats.map((e) =>
                                (0, s.jsx)(
                                  "option",
                                  {
                                    value: e.quality,
                                    children: e.label.replace("128", "320"),
                                  },
                                  e.label,
                                ),
                              ),
                          ],
                        }),
                        (0, s.jsxs)("button", {
                          className:
                            "w-[130px] py-[10px] font-[500] border-0 outline-0  bg-green-600 hover:bg-green-500 transition text-white text-[14px]  flex justify-center rounded-[6px] items-center gap-2",
                          onClick: async () => getDownloadButton(l, i),
                          children: [(0, s.jsx)(d.uFt, {}), "Get Link"],
                        }),
                      ],
                    }),
                  g &&
                    (0, s.jsxs)("button", {
                      disabled: !0,
                      type: "button",
                      className:
                        "text-white bg-yellow-400  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center",
                      children: [
                        (0, s.jsxs)("svg", {
                          role: "status",
                          className:
                            "inline w-4 h-4 mr-3 text-white animate-spin",
                          viewBox: "0 0 100 101",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: [
                            (0, s.jsx)("path", {
                              d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                              fill: "#E5E7EB",
                            }),
                            (0, s.jsx)("path", {
                              d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                              fill: "currentColor",
                            }),
                          ],
                        }),
                        "Converting, please wait...",
                      ],
                    }),
                  b &&
                    (0, s.jsx)("div", {
                      className:
                        "download btn text-left w-40 bg-green-600 hover:bg-green-500 border-green-500",
                      children: (0, s.jsx)("a", {
                        href: w,
                        download: !0,
                        className:
                          "text-white rounded-lg p-2 text-center font-[700] flex items-center cursor-pointer justify-center",
                        children: (0, s.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, s.jsx)(c._hL, {}),
                            (0, s.jsx)("span", {
                              className: "text-lg",
                              children: "Download",
                            }),
                          ],
                        }),
                      }),
                    }),
                  (0, s.jsx)("p", {
                    className: "text-[#dc3545] text-center mt-1",
                    children: y,
                  }),
                ],
              }),
            ],
          });
        },
        u = a(7066),
        x = a(9583);
      function _0x5ec9(e, t) {
        let a = _0x3a24();
        return (_0x5ec9 = function (e, t) {
          return a[(e -= 450)];
        })(e, t);
      }
      let h = _0x5ec9;
      !(function (e, t) {
        let a = _0x5ec9,
          s = e();
        for (;;)
          try {
            let e =
              (-parseInt(a(469)) / 1) * (parseInt(a(451)) / 2) +
              (-parseInt(a(466)) / 3) * (parseInt(a(455)) / 4) +
              (-parseInt(a(465)) / 5) * (parseInt(a(474)) / 6) +
              -parseInt(a(450)) / 7 +
              -parseInt(a(468)) / 8 +
              parseInt(a(454)) / 9 +
              (-parseInt(a(452)) / 10) * (-parseInt(a(471)) / 11);
            if (249055 === e) break;
            s.push(s.shift());
          } catch (e) {
            s.push(s.shift());
          }
      })(_0x3a24, 0);
      let p = "C5D58EF67A" + h(456) + h(464) + "12",
        initProcessor = async () => {
          let e = {};
          e[h(459)] = "raw";
          try {
            let t = formatSeed(p),
              a = {};
            return (
              (a.name = h(461)),
              await window[h(460)][h(470)][h(475)](e.YrlUc, t, a, !1, [
                "decrypt",
              ])
            );
          } catch (e) {
            throw (console[h(463)]("Process initializati" + h(458), e), e);
          }
        };
      function _0x3a24() {
        let e = [
          "error",
          "6C35BBC4EB",
          "32065fiPRVJ",
          "9651PJDqag",
          "match",
          "2949160OwuPPs",
          "1QaLwoE",
          "subtle",
          "15775023ibpdbH",
          "or:",
          "gMUfw",
          "12IfiARR",
          "importKey",
          "3235491JMTwmH",
          "334826TTrbVe",
          "10zgbCLj",
          "Format err",
          "2719575PhDuLf",
          "592dZwFMH",
          "7584E4A29F",
          "Invalid fo",
          "on failed:",
          "YrlUc",
          "crypto",
          "AES-CBC",
          "map",
        ];
        return (_0x3a24 = function () {
          return e;
        })();
      }
      let formatSeed = (e) => {
          let t = {};
          t[h(473)] = h(457) + "rmat";
          try {
            let a = e[h(467)](/[\dA-F]{2}/gi);
            if (!a) throw Error(t[h(473)]);
            let s = a[h(462)]((e) => parseInt(e, 16));
            return new Uint8Array(s);
          } catch (e) {
            throw (console[h(463)](h(453) + h(472), e), e);
          }
        },
        processIncoming = async (e) => {
          try {
            let t = formatInput(e);
            if (t.length < 16)
              throw Error("Invalid format: insufficient length");
            let a = t.slice(0, 16),
              s = t.slice(16),
              n = await initProcessor(),
              r = await window.crypto.subtle.decrypt(
                { name: "AES-CBC", iv: a },
                n,
                s,
              ),
              l = new TextDecoder().decode(new Uint8Array(r));
            return JSON.parse(l);
          } catch (e) {
            throw (console.error(e), e);
          }
        },
        formatInput = (e) => {
          try {
            let t = e.replace(/\s/g, ""),
              a = window.atob(t),
              s = new Uint8Array(a.length);
            for (let e = 0; e < a.length; e++) s[e] = a.charCodeAt(e);
            return s.buffer;
          } catch (e) {
            throw Error("format error: ".concat(e.message));
          }
        };
      async function fetchData(e) {
        let t = await getRandomCdn(),
          a = await u.Z.post("https://".concat(t, "/v2/info"), { url: e }),
          s = a.data;
        return s;
      }
      var home_Link = (e) => {
        let { data: t, contentType: a } = e,
          [r, l] = (0, n.useState)(""),
          [i, o] = (0, n.useState)(""),
          [c, d] = (0, n.useState)(!1),
          [m, u] = (0, n.useState)(!1),
          [h, p] = (0, n.useState)(""),
          [g, f] = (0, n.useState)(!0),
          [b, j] = (0, n.useState)(!1),
          [w, v] = (0, n.useState)(null),
          y = (0, n.useCallback)(
            async (e) => {
              if (!e.startsWith("https://")) return;
              (p(""), f(!0), j(!1), u(!1), l(!0), d(!0));
              let t = null;
              if ("video" == a || "audio" == a || "all" == a)
                try {
                  t = await fetchData(e);
                } catch (e) {
                  (console.log(e),
                    p("Something went wrong. please try after some time."));
                  return;
                } finally {
                  d(!1);
                }
              if (!0 == t.status) {
                let e = await processIncoming(t.data);
                (v(e),
                  u(!0),
                  setTimeout(() => {
                    !(function () {
                      let e = document.getElementById("downloadSection");
                      e.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                      });
                    })();
                  }, 300));
              } else (v(null), p(t.message));
            },
            [a],
          );
        return (
          (0, n.useEffect)(() => {
            0 == i.length ? l("") : y(i);
          }, [i, y]),
          (0, s.jsxs)("section", {
            className:
              "text-center py-10 sm:py-16 mb-2 text-[#343a40] mt-[-10px] bg-cover bg-no-repeat max-w-5xl mx-auto bg-white border-2 rounded",
            children: [
              (0, s.jsx)("h1", {
                className:
                  "font-medium sm:text-[40px] text-2xl w-[20rem] sm:w-full sm:mb-2 m-auto",
                children: t.title,
              }),
              (0, s.jsx)("p", { className: "my-4 mx-[15px] ", children: t.p }),
              (0, s.jsx)("div", {
                className: "w-full max-w-4xl px-4 mx-auto mt-6 sm:mt-10",
                children: (0, s.jsxs)("div", {
                  className:
                    "flex flex-row gap-2 rounded border-4 border-custom-main",
                  children: [
                    (0, s.jsx)("input", {
                      type: "search",
                      className:
                        "flex-1 px-4 py-3 text-gray-500 text-lg outline-none placeholder:text-gray-400",
                      placeholder: "Search or paste link here...",
                      value: i,
                      onChange: (e) => o(e.target.value),
                      required: !0,
                    }),
                    (0, s.jsxs)("button", {
                      type: "submit",
                      onClick: () => y(i),
                      className:
                        "bg-custom-main text-white px-6 flex items-center justify-center gap-2 transition-colors min-w-[60px]",
                      children: [
                        (0, s.jsx)("span", {
                          className: "hidden sm:inline",
                          children: "Start",
                        }),
                        (0, s.jsx)(x.hPV, { className: "text-xl" }),
                      ],
                    }),
                  ],
                }),
              }),
              r && c && (0, s.jsx)(ui_Loading, {}),
              m &&
                w &&
                (0, s.jsx)(s.Fragment, {
                  children: (0, s.jsx)(home_Video, {
                    contentType: a,
                    showDownloadp: b,
                    btnsp: g,
                    currentVideoData: w,
                  }),
                }),
              (0, s.jsx)("p", {
                className: "text-[#dc3545] text-center mt-1",
                children: h,
              }),
            ],
          })
        );
      };
    },
    7677: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return ui_Cards;
        },
      });
      var s = a(5893),
        n = a(7875),
        r = a(9352),
        l = a(231),
        i = a(1649),
        o = a(5434);
      let c = {
        fast: l.j2K,
        star: r.u20,
        heart: r.unI,
        thumbUp: r.Ak2,
        happy: i.Nlo,
        privacy: o.ARJ,
      };
      var ui_Card = (e) => {
        let { data: t, page: a, iconsData: l } = e,
          { t: i } = (0, n.$G)(a),
          o = c[l.icon] || r.zXH;
        return (0, s.jsxs)("div", {
          className:
            "group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
          children: [
            (0, s.jsxs)("div", {
              className: "mb-4 flex items-center justify-between",
              children: [
                (0, s.jsx)(o, {
                  className:
                    "text-3xl text-custom-main group-hover:text-btn-accent-custom-hover transition-colors duration-300",
                }),
                (0, s.jsx)("div", {
                  className:
                    "h-1 w-12 rounded-full bg-custom-main group-hover:w-16 transition-all duration-300",
                }),
              ],
            }),
            (0, s.jsx)("h3", {
              className:
                "mb-3 text-xl font-bold text-gray-800 group-hover:btn-accent-custom-hover transition-colors duration-300",
              children: i(t.title),
            }),
            (0, s.jsx)("p", {
              className:
                "text-gray-600 group-hover:text-gray-700 transition-colors duration-300",
              children: i(t.description),
            }),
            (0, s.jsx)("div", {
              className:
                "absolute bottom-0 left-0 h-1 w-0 bg-custom-main group-hover:w-full transition-all duration-300",
            }),
          ],
        });
      };
      let d = [
        { icon: "fast" },
        { icon: "star" },
        { icon: "heart" },
        { icon: "thumbUp" },
        { icon: "happy" },
        { icon: "privacy" },
      ];
      var ui_Cards = (e) => {
        let { data: t, page: a, title: n, p: r, extra: l } = e;
        return (0, s.jsxs)("section", {
          className: "py-12 px-4 max-w-5xl mx-auto",
          children: [
            (0, s.jsxs)("div", {
              className: "text-center mb-10",
              children: [
                (0, s.jsx)("h3", {
                  className:
                    "font-medium text-2xl md:text-3xl text-gray-800 mb-4",
                  children: n,
                }),
                (0, s.jsx)("p", {
                  className: "text-gray-600 max-w-2xl mx-auto",
                  children: r,
                }),
              ],
            }),
            (0, s.jsx)("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
              children: t.map((e, t) =>
                (0, s.jsx)(
                  ui_Card,
                  { data: e, page: a, iconsData: d[t] },
                  e.id,
                ),
              ),
            }),
            l &&
              (0, s.jsx)("p", {
                className: "mt-8 text-center text-gray-600",
                children: l,
              }),
          ],
        });
      };
    },
    8954: function (e, t, a) {
      "use strict";
      var s = a(5893);
      (a(7294),
        (t.Z = (e) => {
          let { title: t, paragraph: a, randomQuote: n } = e;
          return (0, s.jsxs)("div", {
            className:
              "mb-6 text text-[#212529] max-w-5xl mx-[15px] md:mx-auto text-center",
            children: [
              (0, s.jsx)("h3", {
                className: "font-medium text-2xl mb-4",
                children: t,
              }),
              (0, s.jsx)("p", {
                className: "mb-4 leading-relaxed",
                children: a,
              }),
              n &&
                (0, s.jsxs)("p", {
                  children: [
                    (0, s.jsx)("b", { children: "Magical quote:" }),
                    " ",
                    n,
                  ],
                }),
            ],
          });
        }));
    },
    2835: function (e, t, a) {
      "use strict";
      var s = a(5893),
        n = a(7875);
      t.Z = (e) => {
        let { data: t, page: a, title: r } = e,
          { t: l } = (0, n.$G)(a);
        return (0, s.jsx)("div", {
          className: "py-12 px-4 sm:px-6 lg:px-8",
          children: (0, s.jsxs)("div", {
            className: "max-w-5xl mx-auto",
            children: [
              (0, s.jsx)("h2", {
                className: "text-3xl font-bold text-gray-900 text-center mb-10",
                children: r,
              }),
              (0, s.jsx)("div", {
                className:
                  "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
                children: t.map((e, t) =>
                  (0, s.jsx)(
                    "div",
                    {
                      className:
                        "border-2 border-x-btn-accent-custom-hover rounded-xl overflow-hidden shadow transition-all duration-300 hover:shadow-xl",
                      children: (0, s.jsxs)("div", {
                        className: "p-5",
                        children: [
                          (0, s.jsxs)("div", {
                            className: "flex items-center mb-4",
                            children: [
                              (0, s.jsxs)("span", {
                                className:
                                  "text-2xl font-semibold text-custom-main mr-3",
                                children: [t + 1, "."],
                              }),
                              (0, s.jsx)("div", {
                                className:
                                  "h-px flex-grow bg-btn-accent-custom",
                              }),
                            ],
                          }),
                          (0, s.jsx)("p", {
                            className: "text-gray-700 text-sm leading-relaxed",
                            children: l(e.p),
                          }),
                        ],
                      }),
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
        });
      };
    },
    8213: function (e, t, a) {
      "use strict";
      a.d(t, {
        Z: function () {
          return ui_Navbar;
        },
      });
      var s = a(5893),
        n = a(7294),
        r = a(1163),
        l = a(1664),
        i = a.n(l),
        showMobileMenu = (e) => (e ? "left-0" : "left-[-100%]"),
        o = a(6893),
        c = a(5675),
        d = a.n(c),
        m = a(2585),
        u = a(5155),
        x = a(8193),
        h = a(9583);
      (x.RLq, h.cad, x.Bpw, x.h3E, x.Shv, o.Bsb, h.nTm, m.CIl);
      let p = [];
      var g = JSON.parse(
        '[{"label":"English","value":"en"},{"label":"Espa\xf1ol","value":"es"},{"label":"Indonesian","value":"id"}]',
      );
      let switchLanguage = (e, t, a) => {
        e.push(t, t, { locale: a.current.value });
      };
      function LangSwitcher(e) {
        let t,
          { router: a, href: r } = e,
          l = (0, n.useRef)();
        if ("/2" === a.asPath) {
          let e = ["de"];
          t = g.filter((t) => !e.includes(t.value));
        } else t = g;
        return (0, s.jsx)("select", {
          onChange: () => switchLanguage(a, r, l),
          ref: l,
          value: a.locale,
          className: "bg-bg-main",
          children: t.map((e) =>
            (0, s.jsx)(
              "option",
              { value: e.value, children: e.label },
              e.value,
            ),
          ),
        });
      }
      var ui_Navbar = (e) => {
        let { href: t, disable: a = !0 } = e,
          l = (0, r.useRouter)(),
          [c, h] = (0, n.useState)(!1);
        return (0, s.jsx)("section", {
          children: (0, s.jsxs)("nav", {
            className:
              "border-gray-200 px-2 mb-2 sm:px-4 py-2.5 h-20 flex items-center",
            children: [
              (0, s.jsxs)("div", {
                className:
                  "container flex justify-between items-center mx-auto px-4 max-w-5xl",
                children: [
                  (0, s.jsxs)(i(), {
                    href: "/",
                    className: "flex items-center gap-2",
                    children: [
                      (0, s.jsx)(d(), {
                        src: "/logo.png",
                        alt: "Y2mate",
                        width: 26,
                        height: 26,
                      }),
                      (0, s.jsx)("span", {
                        className: "text-2xl font-bold",
                        children: "Y2mate",
                      }),
                    ],
                  }),
                  (0, s.jsxs)("button", {
                    "data-collapse-toggle": "mobile-menu",
                    type: "button",
                    className:
                      "flex items-center p-2  text-custom-main rounded-lg md:hidden bg-white hover:bg-custom-main focus:outline-none focus:ring-2 focus:ring-gray-200",
                    "aria-controls": "mobile-menu",
                    "aria-expanded": "false",
                    onClick: () => h(!c),
                    children: [
                      (0, s.jsx)("span", {
                        className: "sr-only",
                        children: "Open main menu",
                      }),
                      (0, s.jsx)("span", {
                        className:
                          "w-5 h-5 bg-white flex items-center justify-center rounded-lg",
                        children: (0, s.jsx)(m.vHB, {
                          className: "fill-custom-main ",
                        }),
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: "hidden w-full md:block md:w-auto ",
                    id: "mobile-menu",
                    children: (0, s.jsx)("div", {
                      className: "",
                      children: (0, s.jsxs)("div", {
                        className: "flex-none",
                        children: [
                          !a &&
                            (0, s.jsx)("ul", {
                              className: "menu menu-horizontal px-1 text-white",
                              children: (0, s.jsxs)("li", {
                                tabIndex: 0,
                                children: [
                                  (0, s.jsxs)("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                      (0, s.jsx)("a", {
                                        children: "Downloader",
                                      }),
                                      (0, s.jsx)(x.i0B, {}),
                                    ],
                                  }),
                                  (0, s.jsx)("ul", {
                                    className:
                                      "menu bg-custom-main rounded-box p-2 z-50",
                                    children: p.map((e, t) =>
                                      (0, s.jsxs)(
                                        "li",
                                        {
                                          tabIndex: 0,
                                          className: "z-50",
                                          children: [
                                            (0, s.jsxs)("div", {
                                              className:
                                                "flex items-center gap-1",
                                              children: [
                                                (0, s.jsx)("a", {
                                                  children: e.name,
                                                }),
                                                (0, s.jsx)(x.rYR, {}),
                                              ],
                                            }),
                                            (0, s.jsx)("ul", {
                                              className:
                                                "rounded-box p-2 bg-custom-main",
                                              children: e.subMenus.map(
                                                (e, t) => {
                                                  let [[a, n]] =
                                                    Object.entries(e);
                                                  return (0, s.jsx)(
                                                    "li",
                                                    {
                                                      children: (0, s.jsx)(
                                                        i(),
                                                        {
                                                          href: n,
                                                          children: a,
                                                        },
                                                      ),
                                                    },
                                                    t,
                                                  );
                                                },
                                              ),
                                            }),
                                          ],
                                        },
                                        t,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            }),
                          (0, s.jsxs)("div", {
                            className: "flex gap-8 items-center justify-center",
                            children: [
                              (0, s.jsx)(i(), {
                                href: "/youtube-to-mp3",
                                children: "YouTube to MP3",
                              }),
                              (0, s.jsx)(i(), {
                                href: "/youtube-to-mp4",
                                children: "YouTube to MP4",
                              }),
                              (0, s.jsx)(LangSwitcher, { router: l, href: t }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className:
                  "burger-menu fixed top-0 w-full h-[100vh] z-10 flex transition-all duration-300 ".concat(
                    showMobileMenu(c),
                  ),
                children: [
                  (0, s.jsxs)("div", {
                    className: "languages w-[65%] bg-white overflow-y-scroll",
                    children: [
                      (0, s.jsx)(i(), {
                        href: "/",
                        className:
                          "block text-decoration-none d-flex p-2 font-weight-semi border-bottom align-items-center border-b-[1px] border-solid border-[#dee2e6] text-[#007bff]",
                        children: (0, s.jsxs)("div", {
                          className: "flex m-2",
                          children: [
                            (0, s.jsx)(o._hL, {
                              className: "text-custom-main mr-2 w-5 h-5",
                            }),
                            (0, s.jsx)("small", {
                              className: "text-custom-main",
                              children: "Y2mate",
                            }),
                          ],
                        }),
                      }),
                      (0, s.jsxs)("div", {
                        className: "p-3 flex flex-col gap-4 bg-bg-main",
                        children: [
                          (0, s.jsx)(i(), {
                            href: "/youtube-to-mp3",
                            children: "YouTube to MP3",
                          }),
                          (0, s.jsx)(i(), {
                            href: "/youtube-to-mp4",
                            children: "YouTube to MP4",
                          }),
                          (0, s.jsxs)("div", {
                            className: "flex gap-2 items-center my-2",
                            children: [
                              (0, s.jsx)(u.MGB, {}),
                              (0, s.jsx)(LangSwitcher, {
                                router: l,
                                href: t,
                                className: "bg-white",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: "opacity-section w-[35%] h-full bg-[#00000099]",
                    onClick: () => h(!1),
                  }),
                ],
              }),
            ],
          }),
        });
      };
    },
    8607: function (e, t, a) {
      "use strict";
      a.d(t, {
        R: function () {
          return hrefLang;
        },
        h: function () {
          return Meta;
        },
      });
      var s = a(5893);
      let Meta = function (e) {
          let { noindex: t = !1 } = e;
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)("meta", {
                name: "apple-mobile-web-app-capable",
                content: "yes",
              }),
              (0, s.jsx)("meta", { name: "author", content: "Y2mate" }),
              (0, s.jsx)("meta", {
                property: "og:site_name",
                content: "Y2mate",
              }),
              t
                ? ""
                : (0, s.jsx)("meta", {
                    name: "robots",
                    content: "index, follow",
                  }),
              (0, s.jsx)("meta", { property: "og:type", content: "website" }),
              (0, s.jsx)("meta", {
                httpEquiv: "content-type",
                content: "text/html; charset=utf-8",
              }),
              (0, s.jsx)("meta", { property: "og:image", content: "/og.jpg" }),
              (0, s.jsx)("link", {
                rel: "shortcut icon",
                href: "/favicon.ico",
                type: "image/x-icon",
              }),
            ],
          });
        },
        hrefLang = function (e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "",
            a =
              (arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {});
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)("link", {
                rel: "alternate",
                href: e + t + (a.xDefault || ""),
                hrefLang: "x-default",
              }),
              (0, s.jsx)("link", {
                rel: "alternate",
                href: e + t + (a.en || ""),
                hrefLang: "en",
              }),
              (0, s.jsx)("link", {
                rel: "alternate",
                href: "".concat(e, "/id").concat(t),
                hrefLang: "id",
              }),
              (0, s.jsx)("link", {
                rel: "alternate",
                href: "".concat(e, "/es").concat(t),
                hrefLang: "es",
              }),
            ],
          });
        };
    },
    4964: function (e) {
      e.exports = {
        container: "Loading_container__nwQml",
        bounce: "Loading_bounce__pelPb",
        bounce2: "Loading_bounce2__j6loT",
        bounce4: "Loading_bounce4__RsKE8",
      };
    },
    8344: function (e) {
      "use strict";
      e.exports = JSON.parse(
        '[{"id":1,"img":"fast.svg","title":"card1_title","description":"card1_paragraph"},{"id":2,"img":"loop.svg","title":"card2_title","description":"card2_p"},{"id":3,"img":"shield.svg","title":"card3_title","description":"card3_p"},{"id":4,"img":"ux-design.svg","title":"card4_title","description":"card4_paragraph"},{"id":5,"img":"instructions.svg","title":"card5_title","description":"card5_p"},{"id":6,"img":"computing.svg","title":"card6_title","description":"card6_p"}]',
      );
    },
    1149: function (e) {
      "use strict";
      e.exports = JSON.parse(
        '[{"id":1,"p":"how_card1_p"},{"id":2,"p":"how_card2_p"},{"id":3,"p":"how_card3_p"}]',
      );
    },
  },
]);
