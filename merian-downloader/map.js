var sliderMultitouchHandler = new GogisMultitouchHandler();

function slider(a_init, a_tpl, a_container, a_function) {
    this.a_container = a_container;
    this.a_function = a_function;
    this.f_setValue = f_sliderSetValue;
    this.f_getPos = f_sliderGetPos;
    if (!window.A_SLIDERS) window.A_SLIDERS = [];
    this.n_id = window.A_SLIDERS.length;
    window.A_SLIDERS[this.n_id] = this;
    var s_key;
    if (a_tpl)
        for (s_key in a_tpl) this[s_key] = a_tpl[s_key];
    for (s_key in a_init) this[s_key] = a_init[s_key];
    this.n_pix2value = this.n_pathLength / (this.n_maxValue - this.n_minValue);
    if (this.n_value == null) this.n_value = this.n_minValue;
    this.a_container.innerHTML = '<div style="width:' + this.n_controlWidth + 'px;height:' + this.n_controlHeight + 'px;border:0; background-image:url(' + this.s_imgControl + ')" id="sl' + this.n_id + 'base">' + '<img src="' + this.s_imgSlider + '" width="' + this.n_sliderWidth + '" height="' + this.n_sliderHeight + '" border="0" style="position:relative;left:' + this.n_pathLeft + 'px;top:' + this.n_pathTop + 'px;z-index:' + this.n_zIndex + ';cursor:pointer;visibility:hidden;" name="sl' + this.n_id + 'slider" id="sl' + this.n_id + 'slider" onmousedown="return f_sliderMouseDown(' + this.n_id + ')"/></div>';
    this.e_base = get_element('sl' + this.n_id + 'base');
    this.e_slider = get_element('sl' + this.n_id + 'slider');
    if (!window.f_savedMouseMove && document.onmousemove != f_sliderMouseMove) {
        window.f_savedMouseMove = document.onmousemove;
        document.onmousemove = f_sliderMouseMove;
    }
    if (!window.f_savedMouseUp && document.onmouseup != f_sliderMouseUp) {
        window.f_savedMouseUp = document.onmouseup;
        document.onmouseup = f_sliderMouseUp;
    }
    var e_input = this.s_form == null ? get_element(this.s_name) : document.forms[this.s_form] ? document.forms[this.s_form].elements[this.s_name] : null;
    this.f_setValue(e_input && e_input.value != '' ? e_input.value : null, 1);
    this.e_slider.style.visibility = 'visible';
    this.multitouchHandler = sliderMultitouchHandler;
    this.e_slider.ontouchstart = sliderMultitouchHandler.touchstart;
    this.e_slider.ontouchmove = sliderMultitouchHandler.touchmove;
    this.e_slider.ontouchend = sliderMultitouchHandler.touchend;
    this.e_slider.ontouchcancel = sliderMultitouchHandler.touchcancel;
    this.e_slider.multitouchHandler = sliderMultitouchHandler;
    sliderMultitouchHandler.callback = this.callback;
    sliderMultitouchHandler.n_id = this.n_id;
}
slider.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {
        f_sliderMouseDown(this.n_id);
    } else if (cmd == 'move') {
        f_sliderMouseMove(obj, true);
    } else if (cmd == 'moving_done') {
        f_sliderMouseUp(obj, false, true);
    }
};

function f_sliderSetValue(n_value, b_noInputCheck) {
    if (n_value == null) n_value = this.n_value == null ? this.n_minValue : this.n_value;
    if (isNaN(n_value)) return false;
    if (this.n_step) n_value = Math.round((n_value - this.n_minValue) / this.n_step) * this.n_step + this.n_minValue;
    if (n_value % 1) n_value = Math.round(n_value * 1e5) / 1e5;
    if (n_value < this.n_minValue) n_value = this.n_minValue;
    if (n_value > this.n_maxValue) n_value = this.n_maxValue;
    this.n_value = n_value;
    if (this.b_vertical) this.e_slider.style.top = (this.n_pathTop + this.n_pathLength - Math.round((n_value - this.n_minValue) * this.n_pix2value)) + 'px';
    else this.e_slider.style.left = (this.n_pathLeft + Math.round((n_value - this.n_minValue) * this.n_pix2value)) + 'px';
    if (!this.a_function) {
        var e_input;
        if (this.s_form == null) {
            e_input = get_element(this.s_name);
            if (!e_input) return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the input with ID='" + this.s_name + "'.");
        } else {
            var e_form = document.forms[this.s_form];
            if (!e_form) return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the form with NAME='" + this.s_form + "'.");
            e_input = e_form.elements[this.s_name];
            if (!e_input) return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the input with NAME='" + this.s_name + "'.");
        }
        e_input.value = n_value;
    } else {
        this.a_function(n_value);
    }
}

function f_sliderGetPos(b_vertical, b_base) {
    var n_pos = 0,
        s_coord = (b_vertical ? 'Top' : 'Left');
    var o_elem = o_elem2 = b_base ? this.e_base : this.e_slider;
    while (o_elem) {
        n_pos += o_elem["offset" + s_coord];
        o_elem = o_elem.offsetParent;
    }
    o_elem = o_elem2;
    var n_offset;
    while (o_elem.tagName != "BODY") {
        n_offset = o_elem["scroll" + s_coord];
        if (n_offset) n_pos -= o_elem["scroll" + s_coord];
        o_elem = o_elem.parentNode;
    }
    return n_pos;
}

function f_sliderMouseDown(n_id) {
    window.n_activeSliderId = n_id;
    return false;
}

function f_sliderMouseUp(e_event, b_watching) {
    if (window.n_activeSliderId != null) {
        var o_slider = window.A_SLIDERS[window.n_activeSliderId];
        o_slider.f_setValue(o_slider.n_minValue + (o_slider.b_vertical ? (o_slider.n_pathLength - parseInt(o_slider.e_slider.style.top) + o_slider.n_pathTop) : (parseInt(o_slider.e_slider.style.left) - o_slider.n_pathLeft)) / o_slider.n_pix2value);
        if (b_watching) return;
        window.n_activeSliderId = null;
    }
    if (!arguments[2] && window.f_savedMouseUp) return window.f_savedMouseUp(e_event);
}

function f_sliderMouseMove(e_event) {
    if (!e_event && window.event) e_event = window.event;
    if (!arguments[1] && e_event) {
        window.n_mouseX = e_event.clientX + f_scrollLeft();
        window.n_mouseY = e_event.clientY + f_scrollTop();
    } else if (arguments[1]) {
        window.n_mouseX = e_event.clientX;
        window.n_mouseY = e_event.clientY;
    }
    if (window.n_activeSliderId != null) {
        var o_slider = window.A_SLIDERS[window.n_activeSliderId];
        var n_pxOffset;
        if (o_slider.b_vertical) {
            var n_sliderTop = window.n_mouseY - o_slider.n_sliderHeight / 2 - o_slider.f_getPos(1, 1) - 3;
            if (n_sliderTop < o_slider.n_pathTop) n_sliderTop = o_slider.n_pathTop;
            var n_pxMax = o_slider.n_pathTop + o_slider.n_pathLength;
            if (n_sliderTop > n_pxMax) n_sliderTop = n_pxMax;
            o_slider.e_slider.style.top = n_sliderTop + 'px';
            n_pxOffset = o_slider.n_pathLength - n_sliderTop + o_slider.n_pathTop;
        } else {
            var n_sliderLeft = window.n_mouseX - o_slider.n_sliderWidth / 2 - o_slider.f_getPos(0, 1) - 3;
            if (n_sliderLeft < o_slider.n_pathLeft) n_sliderLeft = o_slider.n_pathLeft;
            var n_pxMax = o_slider.n_pathLeft + o_slider.n_pathLength;
            if (n_sliderLeft > n_pxMax) n_sliderLeft = n_pxMax;
            o_slider.e_slider.style.left = n_sliderLeft + 'px';
            n_pxOffset = n_sliderLeft - o_slider.n_pathLeft;
        }
        if (o_slider.b_watch) f_sliderMouseUp(e_event, 1, (arguments[1] ? true : false));
        return false;
    }
    if (!arguments[1] && window.f_savedMouseMove) return window.f_savedMouseMove(e_event);
}

function f_scrollLeft() {
    return f_filterResults(window.pageXOffset ? window.pageXOffset : 0, document.documentElement ? document.documentElement.scrollLeft : 0, document.body ? document.body.scrollLeft : 0);
}

function f_scrollTop() {
    return f_filterResults(window.pageYOffset ? window.pageYOffset : 0, document.documentElement ? document.documentElement.scrollTop : 0, document.body ? document.body.scrollTop : 0);
}

function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel))) n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function f_sliderError(n_id, s_message) {
    alert("Slider #" + n_id + " Error:\n" + s_message);
    window.n_activeSliderId = null;
}
get_element = document.all ? function(s_id) {
    return document.all[s_id]
} : function(s_id) {
    return document.getElementById(s_id)
};
document.createElement("canvas").getContext || (function() {
    var s = Math,
        j = s.round,
        F = s.sin,
        G = s.cos,
        V = s.abs,
        W = s.sqrt,
        k = 10,
        v = k / 2;

    function X() {
        return this.context_ || (this.context_ = new H(this))
    }
    var L = Array.prototype.slice;

    function Y(b, a) {
        var c = L.call(arguments, 2);
        return function() {
            return b.apply(a, c.concat(L.call(arguments)))
        }
    }
    var M = {
        init: function(b) {
            if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                var a = b || document;
                a.createElement("canvas");
                a.attachEvent("onreadystatechange", Y(this.init_, this, a))
            }
        },
        init_: function(b) {
            b.namespaces.g_vml_ || b.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML");
            b.namespaces.g_o_ || b.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML");
            if (!b.styleSheets.ex_canvas_) {
                var a = b.createStyleSheet();
                a.owningElement.id = "ex_canvas_";
                a.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"
            }
            var c = b.getElementsByTagName("canvas"),
                d = 0;
            for (; d < c.length; d++) this.initElement(c[d])
        },
        initElement: function(b) {
            if (!b.getContext) {
                b.getContext = X;
                b.innerHTML = "";
                b.attachEvent("onpropertychange", Z);
                b.attachEvent("onresize", $);
                var a = b.attributes;
                if (a.width && a.width.specified) b.style.width = a.width.nodeValue + "px";
                else b.width = b.clientWidth;
                if (a.height && a.height.specified) b.style.height = a.height.nodeValue + "px";
                else b.height = b.clientHeight
            }
            return b
        }
    };

    function Z(b) {
        var a = b.srcElement;
        switch (b.propertyName) {
            case "width":
                a.style.width = a.attributes.width.nodeValue + "px";
                a.getContext().clearRect();
                break;
            case "height":
                a.style.height = a.attributes.height.nodeValue + "px";
                a.getContext().clearRect();
                break
        }
    }

    function $(b) {
        var a = b.srcElement;
        if (a.firstChild) {
            a.firstChild.style.width = a.clientWidth + "px";
            a.firstChild.style.height = a.clientHeight + "px"
        }
    }
    M.init();
    var N = [],
        B = 0;
    for (; B < 16; B++) {
        var C = 0;
        for (; C < 16; C++) N[B * 16 + C] = B.toString(16) + C.toString(16)
    }

    function I() {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
    }

    function y(b, a) {
        var c = I(),
            d = 0;
        for (; d < 3; d++) {
            var f = 0;
            for (; f < 3; f++) {
                var h = 0,
                    g = 0;
                for (; g < 3; g++) h += b[d][g] * a[g][f];
                c[d][f] = h
            }
        }
        return c
    }

    function O(b, a) {
        a.fillStyle = b.fillStyle;
        a.lineCap = b.lineCap;
        a.lineJoin = b.lineJoin;
        a.lineWidth = b.lineWidth;
        a.miterLimit = b.miterLimit;
        a.shadowBlur = b.shadowBlur;
        a.shadowColor = b.shadowColor;
        a.shadowOffsetX = b.shadowOffsetX;
        a.shadowOffsetY = b.shadowOffsetY;
        a.strokeStyle = b.strokeStyle;
        a.globalAlpha = b.globalAlpha;
        a.arcScaleX_ = b.arcScaleX_;
        a.arcScaleY_ = b.arcScaleY_;
        a.lineScale_ = b.lineScale_
    }

    function P(b) {
        var a, c = 1;
        b = String(b);
        if (b.substring(0, 3) == "rgb") {
            var d = b.indexOf("(", 3),
                f = b.indexOf(")", d + 1),
                h = b.substring(d + 1, f).split(",");
            a = "#";
            var g = 0;
            for (; g < 3; g++) a += N[Number(h[g])];
            if (h.length == 4 && b.substr(3, 1) == "a") c = h[3]
        } else a = b;
        return {
            color: a,
            alpha: c
        }
    }

    function aa(b) {
        switch (b) {
            case "butt":
                return "flat";
            case "round":
                return "round";
            case "square":
            default:
                return "square"
        }
    }

    function H(b) {
        this.m_ = I();
        this.mStack_ = [];
        this.aStack_ = [];
        this.currentPath_ = [];
        this.fillStyle = this.strokeStyle = "#000";
        this.lineWidth = 1;
        this.lineJoin = "miter";
        this.lineCap = "butt";
        this.miterLimit = k * 1;
        this.globalAlpha = 1;
        this.canvas = b;
        var a = b.ownerDocument.createElement("div");
        a.style.width = b.clientWidth + "px";
        a.style.height = b.clientHeight + "px";
        a.style.overflow = "hidden";
        a.style.position = "absolute";
        b.appendChild(a);
        this.element_ = a;
        this.lineScale_ = this.arcScaleY_ = this.arcScaleX_ = 1
    }
    var i = H.prototype;
    i.clearRect = function() {
        this.element_.innerHTML = ""
    };
    i.beginPath = function() {
        this.currentPath_ = []
    };
    i.moveTo = function(b, a) {
        var c = this.getCoords_(b, a);
        this.currentPath_.push({
            type: "moveTo",
            x: c.x,
            y: c.y
        });
        this.currentX_ = c.x;
        this.currentY_ = c.y
    };
    i.lineTo = function(b, a) {
        var c = this.getCoords_(b, a);
        this.currentPath_.push({
            type: "lineTo",
            x: c.x,
            y: c.y
        });
        this.currentX_ = c.x;
        this.currentY_ = c.y
    };
    i.bezierCurveTo = function(b, a, c, d, f, h) {
        var g = this.getCoords_(f, h),
            l = this.getCoords_(b, a),
            e = this.getCoords_(c, d);
        Q(this, l, e, g)
    };

    function Q(b, a, c, d) {
        b.currentPath_.push({
            type: "bezierCurveTo",
            cp1x: a.x,
            cp1y: a.y,
            cp2x: c.x,
            cp2y: c.y,
            x: d.x,
            y: d.y
        });
        b.currentX_ = d.x;
        b.currentY_ = d.y
    }
    i.quadraticCurveTo = function(b, a, c, d) {
        var f = this.getCoords_(b, a),
            h = this.getCoords_(c, d),
            g = {
                x: this.currentX_ + 0.6666666666666666 * (f.x - this.currentX_),
                y: this.currentY_ + 0.6666666666666666 * (f.y - this.currentY_)
            };
        Q(this, g, {
            x: g.x + (h.x - this.currentX_) / 3,
            y: g.y + (h.y - this.currentY_) / 3
        }, h)
    };
    i.arc = function(b, a, c, d, f, h) {
        c *= k;
        var g = h ? "at" : "wa",
            l = b + G(d) * c - v,
            e = a + F(d) * c - v,
            m = b + G(f) * c - v,
            r = a + F(f) * c - v;
        if (l == m && !h) l += 0.125;
        var n = this.getCoords_(b, a),
            o = this.getCoords_(l, e),
            q = this.getCoords_(m, r);
        this.currentPath_.push({
            type: g,
            x: n.x,
            y: n.y,
            radius: c,
            xStart: o.x,
            yStart: o.y,
            xEnd: q.x,
            yEnd: q.y
        })
    };
    i.rect = function(b, a, c, d) {
        this.moveTo(b, a);
        this.lineTo(b + c, a);
        this.lineTo(b + c, a + d);
        this.lineTo(b, a + d);
        this.closePath()
    };
    i.strokeRect = function(b, a, c, d) {
        var f = this.currentPath_;
        this.beginPath();
        this.moveTo(b, a);
        this.lineTo(b + c, a);
        this.lineTo(b + c, a + d);
        this.lineTo(b, a + d);
        this.closePath();
        this.stroke();
        this.currentPath_ = f
    };
    i.fillRect = function(b, a, c, d) {
        var f = this.currentPath_;
        this.beginPath();
        this.moveTo(b, a);
        this.lineTo(b + c, a);
        this.lineTo(b + c, a + d);
        this.lineTo(b, a + d);
        this.closePath();
        this.fill();
        this.currentPath_ = f
    };
    i.createLinearGradient = function(b, a, c, d) {
        var f = new D("gradient");
        f.x0_ = b;
        f.y0_ = a;
        f.x1_ = c;
        f.y1_ = d;
        return f
    };
    i.createRadialGradient = function(b, a, c, d, f, h) {
        var g = new D("gradientradial");
        g.x0_ = b;
        g.y0_ = a;
        g.r0_ = c;
        g.x1_ = d;
        g.y1_ = f;
        g.r1_ = h;
        return g
    };
    i.drawImage = function(b) {
        var a, c, d, f, h, g, l, e, m = b.runtimeStyle.width,
            r = b.runtimeStyle.height;
        b.runtimeStyle.width = "auto";
        b.runtimeStyle.height = "auto";
        var n = b.width,
            o = b.height;
        b.runtimeStyle.width = m;
        b.runtimeStyle.height = r;
        if (arguments.length == 3) {
            a = arguments[1];
            c = arguments[2];
            h = g = 0;
            l = d = n;
            e = f = o
        } else if (arguments.length == 5) {
            a = arguments[1];
            c = arguments[2];
            d = arguments[3];
            f = arguments[4];
            h = g = 0;
            l = n;
            e = o
        } else if (arguments.length == 9) {
            h = arguments[1];
            g = arguments[2];
            l = arguments[3];
            e = arguments[4];
            a = arguments[5];
            c = arguments[6];
            d = arguments[7];
            f = arguments[8]
        } else throw Error("Invalid number of arguments");
        var q = this.getCoords_(a, c),
            t = [];
        t.push(" <g_vml_:group", ' coordsize="', k * 10, ",", k * 10, '"', ' coordorigin="0,0"', ' style="width:', 10, "px;height:", 10, "px;position:absolute;");
        if (this.m_[0][0] != 1 || this.m_[0][1]) {
            var E = [];
            E.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", j(q.x / k), ",", "Dy=", j(q.y / k), "");
            var p = q,
                z = this.getCoords_(a + d, c),
                w = this.getCoords_(a, c + f),
                x = this.getCoords_(a + d, c + f);
            p.x = s.max(p.x, z.x, w.x, x.x);
            p.y = s.max(p.y, z.y, w.y, x.y);
            t.push("padding:0 ", j(p.x / k), "px ", j(p.y / k), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", E.join(""), ", sizingmethod='clip');")
        } else t.push("top:", j(q.y / k), "px;left:", j(q.x / k), "px;");
        t.push(' ">', '<g_vml_:image src="', b.src, '"', ' style="width:', k * d, "px;", " height:", k * f, 'px;"', ' cropleft="', h / n, '"', ' croptop="', g / o, '"', ' cropright="', (n - h - l) / n, '"', ' cropbottom="', (o - g - e) / o, '"', " />", "</g_vml_:group>");
        this.element_.insertAdjacentHTML("BeforeEnd", t.join(""))
    };
    i.stroke = function(b) {
        var a = [],
            c = P(b ? this.fillStyle : this.strokeStyle),
            d = c.color,
            f = c.alpha * this.globalAlpha;
        a.push("<g_vml_:shape", ' filled="', !!b, '"', ' style="position:absolute;width:', 10, "px;height:", 10, 'px;"', ' coordorigin="0 0" coordsize="', k * 10, " ", k * 10, '"', ' stroked="', !b, '"', ' path="');
        var h = {
                x: null,
                y: null
            },
            g = {
                x: null,
                y: null
            },
            l = 0;
        for (; l < this.currentPath_.length; l++) {
            var e = this.currentPath_[l];
            switch (e.type) {
                case "moveTo":
                    a.push(" m ", j(e.x), ",", j(e.y));
                    break;
                case "lineTo":
                    a.push(" l ", j(e.x), ",", j(e.y));
                    break;
                case "close":
                    a.push(" x ");
                    e = null;
                    break;
                case "bezierCurveTo":
                    a.push(" c ", j(e.cp1x), ",", j(e.cp1y), ",", j(e.cp2x), ",", j(e.cp2y), ",", j(e.x), ",", j(e.y));
                    break;
                case "at":
                case "wa":
                    a.push(" ", e.type, " ", j(e.x - this.arcScaleX_ * e.radius), ",", j(e.y - this.arcScaleY_ * e.radius), " ", j(e.x + this.arcScaleX_ * e.radius), ",", j(e.y + this.arcScaleY_ * e.radius), " ", j(e.xStart), ",", j(e.yStart), " ", j(e.xEnd), ",", j(e.yEnd));
                    break
            }
            if (e) {
                if (h.x == null || e.x < h.x) h.x = e.x;
                if (g.x == null || e.x > g.x) g.x = e.x;
                if (h.y == null || e.y < h.y) h.y = e.y;
                if (g.y == null || e.y > g.y) g.y = e.y
            }
        }
        a.push(' ">');
        if (b)
            if (typeof this.fillStyle == "object") {
                var m = this.fillStyle,
                    r = 0,
                    n = {
                        x: 0,
                        y: 0
                    },
                    o = 0,
                    q = 1;
                if (m.type_ == "gradient") {
                    var t = m.x1_ / this.arcScaleX_,
                        E = m.y1_ / this.arcScaleY_,
                        p = this.getCoords_(m.x0_ / this.arcScaleX_, m.y0_ / this.arcScaleY_),
                        z = this.getCoords_(t, E);
                    r = Math.atan2(z.x - p.x, z.y - p.y) * 180 / Math.PI;
                    if (r < 0) r += 360;
                    if (r < 1.0E-6) r = 0
                } else {
                    var p = this.getCoords_(m.x0_, m.y0_),
                        w = g.x - h.x,
                        x = g.y - h.y;
                    n = {
                        x: (p.x - h.x) / w,
                        y: (p.y - h.y) / x
                    };
                    w /= this.arcScaleX_ * k;
                    x /= this.arcScaleY_ * k;
                    var R = s.max(w, x);
                    o = 2 * m.r0_ / R;
                    q = 2 * m.r1_ / R - o
                }
                var u = m.colors_;
                u.sort(function(ba, ca) {
                    return ba.offset - ca.offset
                });
                var J = u.length,
                    da = u[0].color,
                    ea = u[J - 1].color,
                    fa = u[0].alpha * this.globalAlpha,
                    ga = u[J - 1].alpha * this.globalAlpha,
                    S = [],
                    l = 0;
                for (; l < J; l++) {
                    var T = u[l];
                    S.push(T.offset * q + o + " " + T.color)
                }
                a.push('<g_vml_:fill type="', m.type_, '"', ' method="none" focus="100%"', ' color="', da, '"', ' color2="', ea, '"', ' colors="', S.join(","), '"', ' opacity="', ga, '"', ' g_o_:opacity2="', fa, '"', ' angle="', r, '"', ' focusposition="', n.x, ",", n.y, '" />')
            } else a.push('<g_vml_:fill color="', d, '" opacity="', f, '" />');
        else {
            var K = this.lineScale_ * this.lineWidth;
            if (K < 1) f *= K;
            a.push("<g_vml_:stroke", ' opacity="', f, '"', ' joinstyle="', this.lineJoin, '"', ' miterlimit="', this.miterLimit, '"', ' endcap="', aa(this.lineCap), '"', ' weight="', K, 'px"', ' color="', d, '" />')
        }
        a.push("</g_vml_:shape>");
        this.element_.insertAdjacentHTML("beforeEnd", a.join(""))
    };
    i.fill = function() {
        this.stroke(true)
    };
    i.closePath = function() {
        this.currentPath_.push({
            type: "close"
        })
    };
    i.getCoords_ = function(b, a) {
        var c = this.m_;
        return {
            x: k * (b * c[0][0] + a * c[1][0] + c[2][0]) - v,
            y: k * (b * c[0][1] + a * c[1][1] + c[2][1]) - v
        }
    };
    i.save = function() {
        var b = {};
        O(this, b);
        this.aStack_.push(b);
        this.mStack_.push(this.m_);
        this.m_ = y(I(), this.m_)
    };
    i.restore = function() {
        O(this.aStack_.pop(), this);
        this.m_ = this.mStack_.pop()
    };

    function ha(b) {
        var a = 0;
        for (; a < 3; a++) {
            var c = 0;
            for (; c < 2; c++)
                if (!isFinite(b[a][c]) || isNaN(b[a][c])) return false
        }
        return true
    }

    function A(b, a, c) {
        if (!!ha(a)) {
            b.m_ = a;
            if (c) b.lineScale_ = W(V(a[0][0] * a[1][1] - a[0][1] * a[1][0]))
        }
    }
    i.translate = function(b, a) {
        A(this, y([
            [1, 0, 0],
            [0, 1, 0],
            [b, a, 1]
        ], this.m_), false)
    };
    i.rotate = function(b) {
        var a = G(b),
            c = F(b);
        A(this, y([
            [a, c, 0],
            [-c, a, 0],
            [0, 0, 1]
        ], this.m_), false)
    };
    i.scale = function(b, a) {
        this.arcScaleX_ *= b;
        this.arcScaleY_ *= a;
        A(this, y([
            [b, 0, 0],
            [0, a, 0],
            [0, 0, 1]
        ], this.m_), true)
    };
    i.transform = function(b, a, c, d, f, h) {
        A(this, y([
            [b, a, 0],
            [c, d, 0],
            [f, h, 1]
        ], this.m_), true)
    };
    i.setTransform = function(b, a, c, d, f, h) {
        A(this, [
            [b, a, 0],
            [c, d, 0],
            [f, h, 1]
        ], true)
    };
    i.clip = function() {};
    i.arcTo = function() {};
    i.createPattern = function() {
        return new U
    };

    function D(b) {
        this.type_ = b;
        this.r1_ = this.y1_ = this.x1_ = this.r0_ = this.y0_ = this.x0_ = 0;
        this.colors_ = []
    }
    D.prototype.addColorStop = function(b, a) {
        a = P(a);
        this.colors_.push({
            offset: b,
            color: a.color,
            alpha: a.alpha
        })
    };

    function U() {}
    G_vmlCanvasManager = M;
    CanvasRenderingContext2D = H;
    CanvasGradient = D;
    CanvasPattern = U
})();
gogisApplication.KAMAP_TILE_RETRY_LIMIT = 3;
gogisApplication.SEARCHRESULTLIST_NAVIGATION_GROUP_BY = new Array(10, 15, 20);
gogisApplication.SEARCHRESULTLIST_NAVIGATION_LIMIT = 10;
gogisApplication.SEARCHRESULTLIST_NAVIGATION_OFFSET = 0;
gogisApplication.CONST_SEARCHRESULT_GROUPICONS = false;
gogisApplication.AUTOCOMPLETE_DELAYTIME = 200;
gogisApplication.MOUSEWHEEL_DELAYTIME = 200;
gogisApplication.UPDATELINK_DELAYTIME = 1000;
gogisApplication.UPDATECOORDS_DELAYTIME = 300;
gogisApplication.UPDATEHOTSPOT_HTML_DELAYTIME = 10;
gogisApplication.UPDATEHOTSPOT_GRAPHICS_DELAYTIME = 100;
gogisApplication.UPDATEOVERLAY_EVENTMAP_DELAYTIME = 200;
gogisApplication.UPDATEOVERLAY_GRAPHICS_DELAYTIME = 200;
gogisApplication.TOOLTIP_RELEASETIME = 300;
gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME = 300;
gogisApplication.DEFAULT_PLUGINS = new Array();
gogisApplication.DEFAULT_PLUGINS['default'] = '';
gogisApplication.DEFAULT_PLUGINS['merianplan'] = '';
gogisApplication.DEFAULT_PLUGINS['mashup'] = '';
gogisApplication.PRINT_SELECTOR_MAXSCALE = new Array();
gogisApplication.PRINT_SELECTOR_MAXSCALE['default'] = 1000;
gogisApplication.PRINT_SELECTOR_MAXSCALE['merianplan'] = 1000;
gogisApplication.PRINT_SELECTOR_MAXSCALE['mashup'] = 1000;
gogisApplication.APP_QUEUE_DELAYTIME = new Array();
gogisApplication.APP_QUEUE_DELAYTIME['default'] = 10;
gogisApplication.APP_QUEUE_DELAYTIME['merianplan'] = 10;
gogisApplication.APP_QUEUE_DELAYTIME['mashup'] = 10;
gogisApplication.XML_QUEUE_DELAYTIME = new Array();
gogisApplication.XML_QUEUE_DELAYTIME['default'] = 10;
gogisApplication.XML_QUEUE_DELAYTIME['merianplan'] = 10;
gogisApplication.XML_QUEUE_DELAYTIME['mashup'] = 10;
gogisApplication.XML_TILE_QUEUE_DELAYTIME = new Array();
gogisApplication.XML_TILE_QUEUE_DELAYTIME['default'] = 10;
gogisApplication.XML_TILE_QUEUE_DELAYTIME['merianplan'] = 10;
gogisApplication.XML_TILE_QUEUE_DELAYTIME['mashup'] = 10;
gogisApplication.XML_TILE_LOADER_DELAYTIME = new Array();
gogisApplication.XML_TILE_LOADER_DELAYTIME['default'] = 10;
gogisApplication.XML_TILE_LOADER_DELAYTIME['merianplan'] = 10;
gogisApplication.XML_TILE_LOADER_DELAYTIME['mashup'] = 10;
gogisApplication.XML_COLLECTOR_DELAYTIME = new Array();
gogisApplication.XML_COLLECTOR_DELAYTIME['default'] = 20;
gogisApplication.XML_COLLECTOR_DELAYTIME['merianplan'] = 20;
gogisApplication.XML_COLLECTOR_DELAYTIME['mashup'] = 20;
gogisApplication.LINKTOVIEW_REPLACE = new Array();
gogisApplication.LINKTOVIEW_REPLACE['default'] = '';
gogisApplication.LINKTOVIEW_REPLACE['merianplan'] = '';
gogisApplication.LINKTOVIEW_REPLACE['mashup'] = '';
gogisApplication.LINKTOVIEW_MASHUP_PARENT = new Array();
gogisApplication.LINKTOVIEW_MASHUP_PARENT['default'] = '';
gogisApplication.LINKTOVIEW_MASHUP_PARENT['merianplan'] = '';
gogisApplication.LINKTOVIEW_MASHUP_PARENT['mashup'] = '';
gogisApplication.IE6_PNG_ALPHA = new Array();
gogisApplication.IE6_PNG_ALPHA['default'] = false;
gogisApplication.IE6_PNG_ALPHA['merianplan'] = false;
gogisApplication.IE6_PNG_ALPHA['mashup'] = false;
gogisApplication.DEFAULT_POPUP_WIDTH = new Array();
gogisApplication.DEFAULT_POPUP_WIDTH['default'] = 800;
gogisApplication.DEFAULT_POPUP_WIDTH['merianplan'] = 800;
gogisApplication.DEFAULT_POPUP_WIDTH['mashup'] = 800;
gogisApplication.DEFAULT_POPUP_HEIGHT = new Array();
gogisApplication.DEFAULT_POPUP_HEIGHT['default'] = 600;
gogisApplication.DEFAULT_POPUP_HEIGHT['merianplan'] = 600;
gogisApplication.DEFAULT_POPUP_HEIGHT['mashup'] = 600;
gogisApplication.SHOW_FULLSCREEN = new Array();
gogisApplication.SHOW_FULLSCREEN['default'] = browser_isMobile;
gogisApplication.SHOW_FULLSCREEN['merianplan'] = browser_isMobile;
gogisApplication.SHOW_FULLSCREEN['mashup'] = true;
gogisApplication.SHOW_TOOL_ZOOM = new Array();
gogisApplication.SHOW_TOOL_ZOOM['default'] = !browser_isMobile;
gogisApplication.SHOW_TOOL_ZOOM['merianplan'] = !browser_isMobile;
gogisApplication.SHOW_TOOL_ZOOM['mashup'] = true;
gogisApplication.SHOW_TOOL_TOUCHZOOM = new Array();
gogisApplication.SHOW_TOOL_TOUCHZOOM['default'] = browser_isMobile;
gogisApplication.SHOW_TOOL_TOUCHZOOM['merianplan'] = browser_isMobile;
gogisApplication.SHOW_TOOL_TOUCHZOOM['mashup'] = true;
gogisApplication.SHOW_SEARCH_DETAILS = new Array();
gogisApplication.SHOW_SEARCH_DETAILS['default'] = !browser_isMobile;
gogisApplication.SHOW_SEARCH_DETAILS['merianplan'] = !browser_isMobile;
gogisApplication.SHOW_SEARCH_DETAILS['mashup'] = !browser_isMobile;
gogisApplication.SHOW_LEGEND = new Array();
gogisApplication.SHOW_LEGEND['default'] = true;
gogisApplication.SHOW_LEGEND['merianplan'] = true;
gogisApplication.SHOW_LEGEND['mashup'] = false;
gogisApplication.SHOW_SERVICE = new Array();
gogisApplication.SHOW_SERVICE['default'] = true;
gogisApplication.SHOW_SERVICE['merianplan'] = true;
gogisApplication.SHOW_SERVICE['mashup'] = false;
gogisApplication.DYN_LEGEND = new Array();
gogisApplication.DYN_LEGEND['default'] = true;
gogisApplication.DYN_LEGEND['merianplan'] = true;
gogisApplication.DYN_LEGEND['mashup'] = false;
gogisApplication.BASEMAP_LEGEND = new Array();
gogisApplication.BASEMAP_LEGEND['default'] = false;
gogisApplication.BASEMAP_LEGEND['merianplan'] = false;
gogisApplication.BASEMAP_LEGEND['mashup'] = false;
gogisApplication.BASEMAP_OPT_NONE = new Array();
gogisApplication.BASEMAP_OPT_NONE['default'] = true;
gogisApplication.BASEMAP_OPT_NONE['merianplan'] = true;
gogisApplication.BASEMAP_OPT_NONE['mashup'] = false;
gogisApplication.COLLAPSE_LEGEND = new Array();
gogisApplication.COLLAPSE_LEGEND['default'] = false;
gogisApplication.COLLAPSE_LEGEND['merianplan'] = false;
gogisApplication.COLLAPSE_LEGEND['mashup'] = false;
gogisApplication.COLLAPSE_SINGLELAYER_GROUP = new Array();
gogisApplication.COLLAPSE_SINGLELAYER_GROUP['default'] = false;
gogisApplication.COLLAPSE_SINGLELAYER_GROUP['merianplan'] = false;
gogisApplication.COLLAPSE_SINGLELAYER_GROUP['mashup'] = false;
gogisApplication.GROUP_LEGEND_GROUPS = new Array();
gogisApplication.GROUP_LEGEND_GROUPS['default'] = true;
gogisApplication.GROUP_LEGEND_GROUPS['merianplan'] = true;
gogisApplication.GROUP_LEGEND_GROUPS['mashup'] = false;
gogisApplication.QUICK_SEARCH = new Array();
gogisApplication.QUICK_SEARCH['default'] = true;
gogisApplication.QUICK_SEARCH['merianplan'] = true;
gogisApplication.QUICK_SEARCH['mashup'] = false;
gogisApplication.SEARCH_CHANGE_THEME = new Array();
gogisApplication.SEARCH_CHANGE_THEME['default'] = false;
gogisApplication.SEARCH_CHANGE_THEME['merianplan'] = false;
gogisApplication.SEARCH_CHANGE_THEME['mashup'] = true;
gogisApplication.SEARCH_CURRENT_THEME = new Array();
gogisApplication.SEARCH_CURRENT_THEME['default'] = false;
gogisApplication.SEARCH_CURRENT_THEME['merianplan'] = false;
gogisApplication.SEARCH_CURRENT_THEME['mashup'] = true;
gogisApplication.SEARCH_SCALE_EXACT = new Array();
gogisApplication.SEARCH_SCALE_EXACT['default'] = true;
gogisApplication.SEARCH_SCALE_EXACT['merianplan'] = true;
gogisApplication.SEARCH_SCALE_EXACT['mashup'] = false;
gogisApplication.QUERY_CHANGE_EXTENT = new Array();
gogisApplication.QUERY_CHANGE_EXTENT['default'] = false;
gogisApplication.QUERY_CHANGE_EXTENT['merianplan'] = false;
gogisApplication.QUERY_CHANGE_EXTENT['mashup'] = true;
gogisApplication.CUT_LARGE_GEOOBJECTS = new Array();
gogisApplication.CUT_LARGE_GEOOBJECTS['default'] = false;
gogisApplication.CUT_LARGE_GEOOBJECTS['merianplan'] = false;
gogisApplication.CUT_LARGE_GEOOBJECTS['mashup'] = false;
gogisApplication.REFERENCE_MAP_COLOR = new Array();
gogisApplication.REFERENCE_MAP_COLOR['default'] = "";
gogisApplication.REFERENCE_MAP_COLOR['merianplan'] = "";
gogisApplication.REFERENCE_MAP_COLOR['mashup'] = "";
gogisApplication.REFERENCE_MAP_BGCOLOR = new Array();
gogisApplication.REFERENCE_MAP_BGCOLOR['default'] = "";
gogisApplication.REFERENCE_MAP_BGCOLOR['merianplan'] = "";
gogisApplication.REFERENCE_MAP_BGCOLOR['mashup'] = "";
gogisApplication.REFERENCE_MAP_IMAGE = new Array();
gogisApplication.REFERENCE_MAP_IMAGE['default'] = "";
gogisApplication.REFERENCE_MAP_IMAGE['merianplan'] = "";
gogisApplication.REFERENCE_MAP_IMAGE['mashup'] = "";
gogisApplication.ZOOMBOX_BGCOLOR = new Array();
gogisApplication.ZOOMBOX_BGCOLOR['default'] = "#ffffff";
gogisApplication.ZOOMBOX_BGCOLOR['merianplan'] = "#ffffff";
gogisApplication.ZOOMBOX_BGCOLOR['mashup'] = "#ffffff";
gogisApplication.ZOOMBOX_BORDERCOLOR = new Array();
gogisApplication.ZOOMBOX_BORDERCOLOR['default'] = "#0000ff";
gogisApplication.ZOOMBOX_BORDERCOLOR['merianplan'] = "#0000ff";
gogisApplication.ZOOMBOX_BORDERCOLOR['mashup'] = "#000000";
gogisApplication.ZOOMBOX_SIZE = new Array();
gogisApplication.ZOOMBOX_SIZE['default'] = "1";
gogisApplication.ZOOMBOX_SIZE['merianplan'] = "1";
gogisApplication.ZOOMBOX_SIZE['mashup'] = "1";
gogisApplication.ZOOMBOX_OPACITY = new Array();
gogisApplication.ZOOMBOX_OPACITY['default'] = "50";
gogisApplication.ZOOMBOX_OPACITY['merianplan'] = "50";
gogisApplication.ZOOMBOX_OPACITY['mashup'] = "50";
gogisApplication.MEASURE_COLOR = new Array();
gogisApplication.MEASURE_COLOR['default'] = "#ff0000";
gogisApplication.MEASURE_COLOR['merianplan'] = "#ff0000";
gogisApplication.MEASURE_COLOR['mashup'] = "#000000";
gogisApplication.MEASURE_BGCOLOR = new Array();
gogisApplication.MEASURE_BGCOLOR['default'] = "#ffffff";
gogisApplication.MEASURE_BGCOLOR['merianplan'] = "#ffffff";
gogisApplication.MEASURE_BGCOLOR['mashup'] = "#ffffff";
gogisApplication.MEASURE_SIZE = new Array();
gogisApplication.MEASURE_SIZE['default'] = "2";
gogisApplication.MEASURE_SIZE['merianplan'] = "2";
gogisApplication.MEASURE_SIZE['mashup'] = "2";
gogisApplication.MEASURE_OPACITY = new Array();
gogisApplication.MEASURE_OPACITY['default'] = "70";
gogisApplication.MEASURE_OPACITY['merianplan'] = "70";
gogisApplication.MEASURE_OPACITY['mashup'] = "70";
gogisApplication.MAPPREVIEW_WIDTH = new Array();
gogisApplication.MAPPREVIEW_WIDTH['default'] = "225";
gogisApplication.MAPPREVIEW_WIDTH['merianplan'] = "225";
gogisApplication.MAPPREVIEW_WIDTH['mashup'] = "225";
gogisApplication.MAPPREVIEW_HEIGHT = new Array();
gogisApplication.MAPPREVIEW_HEIGHT['default'] = "150";
gogisApplication.MAPPREVIEW_HEIGHT['merianplan'] = "150";
gogisApplication.MAPPREVIEW_HEIGHT['mashup'] = "150";
gogisApplication.MAPPREVIEW_COLOR = new Array();
gogisApplication.MAPPREVIEW_COLOR['default'] = "ff0000";
gogisApplication.MAPPREVIEW_COLOR['merianplan'] = "ff0000";
gogisApplication.MAPPREVIEW_COLOR['mashup'] = "000000";
gogisApplication.MAPPREVIEW_LOADING = new Array();
gogisApplication.MAPPREVIEW_LOADING['default'] = "loading-blue.gif";
gogisApplication.MAPPREVIEW_LOADING['merianplan'] = "loading-blue.gif";
gogisApplication.MAPPREVIEW_LOADING['mashup'] = "loading-orange.gif";
gogisApplication.MAPPREVIEW_SCALE = new Array();
gogisApplication.MAPPREVIEW_SCALE['default'] = "DYNAMIC";
gogisApplication.MAPPREVIEW_SCALE['merianplan'] = "DYNAMIC";
gogisApplication.MAPPREVIEW_SCALE['mashup'] = "5000";
gogisApplication.MAPPREVIEW = new Array();
gogisApplication.MAPPREVIEW['default'] = browser_isMobile ? "off" : "on";
gogisApplication.MAPPREVIEW['merianplan'] = browser_isMobile ? "off" : "on";
gogisApplication.MAPPREVIEW['mashup'] = "off";
gogisApplication.ZOOM_ANIMATION_TYPE_NONE = 0;
gogisApplication.ZOOM_ANIMATION_TYPE_FREEZE = 1;
gogisApplication.ZOOM_ANIMATION_TYPE_SCALE = 2;
gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE = 3;
gogisApplication.ZOOMIN_ANIMATION_TYPE = new Array();
gogisApplication.ZOOMIN_ANIMATION_TYPE['default'] = gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE;
gogisApplication.ZOOMIN_ANIMATION_TYPE['merianplan'] = gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE;
gogisApplication.ZOOMIN_ANIMATION_TYPE['mashup'] = gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE;
gogisApplication.ZOOMOUT_ANIMATION_TYPE = new Array();
gogisApplication.ZOOMOUT_ANIMATION_TYPE['default'] = gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE;
gogisApplication.ZOOMOUT_ANIMATION_TYPE['merianplan'] = gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE;
gogisApplication.ZOOMOUT_ANIMATION_TYPE['mashup'] = gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE;
gogisApplication.ZOOM_ANIMATION_TIME = new Array();
gogisApplication.ZOOM_ANIMATION_TIME['default'] = 250;
gogisApplication.ZOOM_ANIMATION_TIME['merianplan'] = 250;
gogisApplication.ZOOM_ANIMATION_TIME['mashup'] = 250;
gogisApplication.ZOOM_ANIMATION_INTERVALL = new Array();
gogisApplication.ZOOM_ANIMATION_INTERVALL['default'] = 20;
gogisApplication.ZOOM_ANIMATION_INTERVALL['merianplan'] = 20;
gogisApplication.ZOOM_ANIMATION_INTERVALL['mashup'] = 20;
gogisApplication.ZOOM_ANIMATION_STEP = new Array();
gogisApplication.ZOOM_ANIMATION_STEP['default'] = 500;
gogisApplication.ZOOM_ANIMATION_STEP['merianplan'] = 500;
gogisApplication.ZOOM_ANIMATION_STEP['mashup'] = 500;
gogisApplication.PREFERED_BASEMAPLAYERS = new Array();
gogisApplication.PREFERED_BASEMAPLAYERS['default'] = "";
gogisApplication.PREFERED_BASEMAPLAYERS['merianplan'] = "";
gogisApplication.PREFERED_BASEMAPLAYERS['mashup'] = "";
gogisApplication.SEARCHRESULT_EXPORT_CSV = new Array();
gogisApplication.SEARCHRESULT_EXPORT_CSV['default'] = false;
gogisApplication.SEARCHRESULT_EXPORT_CSV['merianplan'] = false;
gogisApplication.SEARCHRESULT_EXPORT_CSV['mashup'] = false;

function GogisToaster(viewport, instanceName, zIndex, showTime, releaseTime) {
    this.viewport = viewport;
    this.instanceName = instanceName;
    this.zIndex = zIndex;
    this.showTime = showTime;
    this.releaseTime = releaseTime;
    this.nextRelease = null;
    this.releaseThread = null;
    this.fadeoutThread = null;
    this.toastElement = null;
    this.showToast = function(content) {
        if (!this.toastElement) {
            this.toastElement = document.createElement('div');
            this.toastElement.setAttribute('id', 'toastElement_' + this.instanceName);
            this.viewport.appendChild(this.toastElement);
            this.toastElement.onmouseover = this.onmouseover;
            this.toastElement.onmouseout = this.onmouseout;
            this.toastElement.className = 'toastElement';
            this.toastElement.style.zIndex = this.zIndex;
            this.toastElement.parentObj = this;
        }
        this.toastElement.style.visibility = "hidden";
        this.toastElement.style.display = '';
        this.resetToastRelease();
        this.resetToastFadeout();
        this.toastElement.innerHTML = content;
        var wTE = getObjectWidth(this.toastElement);
        var wVP = getObjectWidth(this.viewport);
        if (wTE >= wVP) this.toastElement.style.left = '0px';
        else this.toastElement.style.left = (wVP / 2 - wTE / 2) + 'px';
        this.toastElement.style.visibility = "visible";
        setTimeout(this.instanceName + '.releaseToast();', this.showTime);
    };
    this.redrawToast = function() {
        if (this.toastElement) {
            var wTE = getObjectWidth(this.toastElement);
            var wVP = getObjectWidth(this.viewport);
            if (wTE >= wVP) this.toastElement.style.left = '0px';
            else this.toastElement.style.left = (wVP / 2 - wTE / 2) + 'px';
        }
    };
    this.hideToast = function() {
        if (((new Date()).getTime()) > this.nextRelease * 2 / 3) {
            this.fadeoutToast(this.instanceName, this.toastElement, 95, this.releaseTime / 2);
        }
    };
    this.removeToast = function() {
        this.toastElement.style.display = 'none';
        this.nextRelease = null;
    };
    this.releaseToast = function() {
        this.nextRelease = (new Date().getTime()) + this.releaseTime;
        clearTimeout(this.releaseThread);
        this.releaseThread = setTimeout(this.instanceName + ".hideToast();", this.releaseTime);
    };
    this.resetToastRelease = function() {
        clearTimeout(this.releaseThread);
        this.nextRelease = null;
    };
    this.fadeoutToast = function(instanceName, object, transparency, time) {
        if (time > 0) {
            var newTime = time - (this.releaseTime / 3);
            var newTransparency = transparency - 25;
            object.style.opacity = newTransparency / 100;
            object.style.mozOpacity = newTransparency / 100;
            object.style.filter = "Alpha(opacity=" + newTransparency + ")";
            this.fadeoutThread = setTimeout(instanceName + ".fadeoutToast('" + instanceName + "', document.getElementById('" + object.id + "')," + newTransparency + "," + newTime + ");", this.releaseTime / 3);
            eval(instanceName + ".removeToast();");
        } else {
            eval(instanceName + ".removeToast();");
        }
    };
    this.resetToastFadeout = function() {
        clearTimeout(this.fadeoutThread);
        this.toastElement.style.opacity = 0.95;
        this.toastElement.style.mozOpacity = 0.95;
        this.toastElement.style.filter = "Alpha(opacity=95)";
    };
    this.onmouseover = function(e) {
        this.parentObj.resetToastRelease();
        this.parentObj.resetToastFadeout();
    };
    this.onmouseout = function(e) {
        this.parentObj.releaseToast();
    };
};

function GogisMultitouchHandler() {
    this.lastScale = 1;
    this.last = null;
    this.touchStartX1 = null;
    this.touchStartY1 = null;
    this.touchEndX1 = null;
    this.touchEndY1 = null;
    this.touchStartX2 = null;
    this.touchStartY2 = null;
    this.touchEndX2 = null;
    this.touchEndY2 = null;
    this.dragging = false;
    this.zooming = false;
    this.preventDefault = true;
    this.multitouchHandler = this;
    this.callback = function(cmd, obj) {};
    this.touchstart = function(e) {
        if (this.preventDefault || gDblClickTimer) e.preventDefault();
        if (this.multitouchHandler.last) {
            this.multitouchHandler.touchend(e);
        }
        if (!e.scale && e.touches.length == 1) {
            this.multitouchHandler.touchStartX1 = e.touches[0].clientX;
            this.multitouchHandler.touchStartY1 = e.touches[0].clientY;
        } else if (!e.scale && e.touches.length == 2) {
            this.multitouchHandler.touchStartX2 = e.touches[1].clientX;
            this.multitouchHandler.touchStartY2 = e.touches[1].clientY;
        } else if (!e.scale) {
            this.multitouchHandler.touchEndX1 = null;
            this.multitouchHandler.touchEndY1 = null;
            this.multitouchHandler.touchStartX2 = null;
            this.multitouchHandler.touchStartY2 = null;
            this.multitouchHandler.touchEndX2 = null;
            this.multitouchHandler.touchEndY2 = null;
        }
        this.multitouchHandler.dragging = false;
        this.multitouchHandler.zooming = false;
        e.xy = this.multitouchHandler.touchesCenter(e);
        this.multitouchHandler.callback("down", e.xy);
        this.multitouchHandler.last = e.xy;
        this.multitouchHandler.lastScale = e.scale;
    };
    this.touchmove = function(e) {
        e.preventDefault();
        if (!this.multitouchHandler.last) {
            return this.multitouchHandler.touchstart(e);
        }
        this.multitouchHandler.dragging = true;
        e.xy = this.multitouchHandler.touchesCenter(e);
        if (e.touches.length == 2 && e.scale != this.multitouchHandler.lastScale) {
            this.multitouchHandler.zooming = true;
            this.multitouchHandler.callback("zoom", e.xy);
        } else if (e.touches.length == 1 && !(e.xy.clientX == this.multitouchHandler.last.clientX && e.xy.clientY == this.multitouchHandler.last.clientY)) {
            this.multitouchHandler.callback("move", e.xy);
        }
        this.multitouchHandler.last = e.xy;
        this.multitouchHandler.lastScale = e.scale;
    };
    this.touchend = function(e) {
        e.preventDefault();
        if (this.multitouchHandler.zooming) {
            this.multitouchHandler.zooming = false;
            this.multitouchHandler.dragging = false;
            this.multitouchHandler.callback("zooming_done", this.multitouchHandler.last);
        } else if (this.multitouchHandler.dragging) {
            this.multitouchHandler.dragging = false;
            this.multitouchHandler.callback("moving_done", this.multitouchHandler.last);
        } else {
            this.multitouchHandler.callback("done", this.multitouchHandler.last);
        }
        this.multitouchHandler.last = null;
        this.multitouchHandler.lastScale = 1;
        this.multitouchHandler.touchEndX1 = null;
        this.multitouchHandler.touchEndY1 = null;
        this.multitouchHandler.touchStartX2 = null;
        this.multitouchHandler.touchStartY2 = null;
        this.multitouchHandler.touchEndX2 = null;
        this.multitouchHandler.touchEndY2 = null;
    };
    this.touchcancel = function(e) {
        e.preventDefault();
        this.multitouchHandler.zooming = false;
        this.multitouchHandler.dragging = false;
        return this.multitouchHandler.touchend(e);
    };
    this.touchesCenter = function(e) {
        var touches = e.touches;
        var sumX = 0;
        var sumY = 0;
        for (var i = 0; i < touches.length; ++i) {
            var touch = touches[i];
            sumX += touch.clientX;
            sumY += touch.clientY;
        }
        if (!e.scale && e.touches.length == 2) {
            try {
                this.multitouchHandler.touchEndX1 = touches[0].clientX;
                this.multitouchHandler.touchEndY1 = touches[0].clientY;
                this.multitouchHandler.touchEndX2 = touches[1].clientX;
                this.multitouchHandler.touchEndY2 = touches[1].clientY;
                var dxStart = this.multitouchHandler.touchStartX2 - this.multitouchHandler.touchStartX1;
                var dyStart = this.multitouchHandler.touchStartY2 - this.multitouchHandler.touchStartY1;
                var dStart = Math.sqrt(dxStart * dxStart + dyStart * dyStart);
                var dxEnd = this.multitouchHandler.touchEndX2 - this.multitouchHandler.touchEndX1;
                var dyEnd = this.multitouchHandler.touchEndY2 - this.multitouchHandler.touchEndY1;
                var dEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd);
                e.scale = dEnd / dStart;
            } catch (ex) {
                e.scale = 1;
            }
        }
        var fakeEvt = {
            "clientX": sumX / touches.length,
            "clientY": sumY / touches.length,
            "scale": e.scale
        };
        return fakeEvt;
    };
};

function GogisGeolocationService(instance) {
    this.instance = instance;
    this.interval = 1000;
    this.timeout = 30000;
    this.maximumAge = 0;
    this.highAccuracy = true;
    this.running = false;
    this.thread = null;
    this.watchID = null;
    this.lastTick = null;
    this.lastPosLat = null;
    this.lastPosLon = null;
    this.lastPosCHX = null;
    this.lastPosCHY = null;
    this.registeredEvents = new Array();
    var currentGeolocationPosLat = null;
    var currentGeolocationPosLon = null;
    var currentGeolocationProvider = null;
    var currentGeolocationAccuracy = null;
    var currentGeolocationTime = null;
    this.start = function() {
        if (browser_plattform.toLowerCase() == 'android' && browser_version < 3 && typeof(Android) != 'undefined' && Android.startGPS && Android.startGPS()) {
            this.running = true;
        } else if (navigator.geolocation) {
            try {
                this.running = true;
                if (this.watchID != null) navigator.geolocation.clearWatch(this.watchID);
                this.watchID = navigator.geolocation.watchPosition(this.updatePosition, this.onError, {
                    maximumAge: this.maximumAge,
                    timeout: this.timeout,
                    enableHighAccuracy: this.highAccuracy
                });
            } catch (e) {
                this.running = false;
            }
        } else this.running = false;
        if (this.thread != null) {
            clearTimeout(this.thread);
            this.thread = null;
        }
        if (this.running) {
            this.tick(this.instance);
        }
        return this.running;
    };
    this.stop = function() {
        this.running = false;
        if (browser_plattform.toLowerCase() == 'android' && browser_version < 3 && typeof(Android) != 'undefined' && Android.stopGPS) {
            Android.stopGPS();
        } else if (navigator.geolocation && this.watchID != null) {
            try {
                navigator.geolocation.clearWatch(this.watchID);
            } catch (e) {};
        }
        if (this.thread != null) {
            clearTimeout(this.thread);
            this.thread = null;
        }
        for (i = 0; i < this.registeredEvents.length; i++) {
            if (this.registeredEvents[i].stopped) {
                this.registeredEvents[i].stopped();
            }
        }
        currentGeolocationPosLat = null;
        currentGeolocationPosLon = null;
        currentGeolocationAccuracy = null;
        currentGeolocationProvider = null;
        currentGeolocationAccuracy = null;
        currentGeolocationTime = null;
    };
    this.tick = function(instance) {
        var myInstance = eval(instance + "?" + instance + ":null;");
        myInstance.lastTick = (new Date()).getTime();
        myInstance.onTick(instance);
        var now = (new Date()).getTime();
        var tmp = now - myInstance.lastTick;
        var tmp_interval = myInstance.interval - (now - myInstance.lastTick);
        tmp_interval = tmp_interval > 0 ? tmp_interval : 1;
        if (myInstance.running) {
            this.thread = window.setTimeout(instance + ".tick('" + instance + "');", tmp_interval);
        }
    };
    this.onTick = function(instance) {
        var myInstance = eval(instance + "?" + instance + ":null;");
        if (myInstance.lastPosLon != currentGeolocationPosLon || myInstance.lastPosLat != currentGeolocationPosLat || currentGeolocationPosLon == null || currentGeolocationPosLat == null) {
            myInstance.lastPosLon = currentGeolocationPosLon;
            myInstance.lastPosLat = currentGeolocationPosLat;
            if (currentGeolocationPosLat != null) {
                this.lastPosCHX = WGStoCHy(currentGeolocationPosLat, currentGeolocationPosLon);
                this.lastPosCHY = WGStoCHx(currentGeolocationPosLat, currentGeolocationPosLon);
            } else {
                this.lastPosCHX = null;
                this.lastPosCHY = null;
            }
            for (i = 0; i < myInstance.registeredEvents.length; i++) {
                if (currentGeolocationPosLat != null && myInstance.registeredEvents[i].positionChanged) {
                    myInstance.registeredEvents[i].positionChanged(this.lastPosCHX, this.lastPosCHY);
                } else if (currentGeolocationPosLat == null && myInstance.registeredEvents[i].stopped) {
                    myInstance.registeredEvents[i].stopped();
                }
            }
        }
    };
    this.onError = function(e) {
        currentGeolocationPosLat = null;
        currentGeolocationPosLon = null;
        currentGeolocationProvider = null;
        currentGeolocationAccuracy = null;
        currentGeolocationTime = null;
    };
    this.updatePosition = function(position) {
        currentGeolocationPosLat = position.coords.latitude;
        currentGeolocationPosLon = position.coords.longitude;
        currentGeolocationProvider = "unknown";
        currentGeolocationAccuracy = position.coords.accuracy;
        currentGeolocationTime = new Date().getTime();
    };
    this.updateGPSPosition = function(latitude, longitude, provider, accuracy, time) {
        currentGeolocationPosLat = latitude;
        currentGeolocationPosLon = longitude;
        currentGeolocationProvider = provider;
        currentGeolocationAccuracy = accuracy;
        currentGeolocationTime = time;
    };
    this.registerEvent = function(obj) {
        this.registeredEvents.push(obj);
    };
    this.unregisterEvent = function(obj) {
        for (var i = this.registeredEvents.length; i-- > 0;) {
            if (this.registeredEvents[i] == obj) {
                this.registeredEvents[i] = null;
                this.registeredEvents.splice(i, 1);
            }
        }
    };
}

function GogisGeolocationCursor(application, service, display) {
    this.application = application;
    this.service = service;
    this.display = display;
    this.cursorCanvas = this.application.createDrawingCanvas(10001);
    this.cursorCanvas.style.width = '1px';
    this.cursorCanvas.style.height = '1px';
    this.cursorElement = document.createElement('div');
    this.cursorElement.style.top = "0px";
    this.cursorElement.style.left = "0px";
    this.cursorElement.style.width = "1px";
    this.cursorElement.style.height = "1px";
    this.cursorInnerElement = document.createElement('div');
    this.cursorElement.appendChild(this.cursorInnerElement);
    this.cursorInnerElement.style.position = "absolute";
    this.cursorInnerElement.style.top = "-17px";
    this.cursorInnerElement.style.left = "-17px";
    this.cursorInnerElement.style.width = "35px";
    this.cursorInnerElement.style.height = "35px";
    this.cursorImage = new Image();
    this.cursorInnerElement.appendChild(this.cursorImage);
    this.cursorImage.src = "gogis/images/mylocation.gif";
    this.cursorImage.width = 35;
    this.cursorImage.height = 35;
    this.cursorImage.style.opacity = 0.85;
    this.cursorImage.style.mozOpacity = 0.85;
    this.cursorImage.style.filter = "Alpha(opacity=" + 85 + ")";
    this.service.registerEvent(this);
    this.positionChanged = function(posX, posY) {
        try {
            this.display(posX, posY);
            if (!GogisQueueManager.inProgress()) {
                var extent = this.application.getGeoExtents();
                if (parseFloat(extent[0]) + (parseFloat(extent[2] - extent[0]) / 3) > posX || parseFloat(extent[2]) - (parseFloat(extent[2] - extent[0]) / 3) < posX || parseFloat(extent[1]) + (parseFloat(extent[3] - extent[1]) / 3) > posY || parseFloat(extent[3]) - (parseFloat(extent[3] - extent[1]) / 3) < posY) {
                    this.application.zoomTo(posX, posY);
                }
            }
        } catch (e) {
            try {
                this.application.removeObject(this.cursorElement);
            } catch (e) {};
        };
        try {
            this.application.removeObject(this.cursorElement);
            this.application.addObjectGeo(this.cursorCanvas, posX, posY, this.cursorElement);
        } catch (e) {
            try {
                this.application.removeObject(this.cursorElement);
            } catch (e) {};
        };
    };
    this.stopped = function() {
        this.application.removeObject(this.cursorElement);
    };
}

function GogisDialogWindow(viewport, draw) {
    GogisDialogWindow.observers.push(this);
    this.viewport = viewport;
    this.draw = draw;
    this.position = (arguments && arguments.length > 2 ? arguments[2] : GogisDialogWindow.POSITION_TOPLEFT);
    this.width = (arguments && arguments.length > 3 ? arguments[3] : null);
    this.height = (arguments && arguments.length > 4 ? arguments[4] : null);
    this.zIndex = (arguments && arguments.length > 5 ? arguments[5] : 10000);
    this.overflow = (arguments && arguments.length > 6 ? arguments[6] : 'auto');
    this.title = (arguments && arguments.length > 7 ? arguments[7] : '');
    this.content = (arguments && arguments.length > 8 ? arguments[8] : '');
    this.visible = (arguments && arguments.length > 9 ? arguments[9] : false);
    this.minmax = (arguments && arguments.length > 10 ? arguments[10] : true);
    this.isMinimized = (arguments && arguments.length > 11 ? arguments[11] : false);
    this.htmlFooter = null;
    this.htmlContainer = document.createElement('div');
    this.htmlContainer.style.zIndex = this.zIndex;
    this.viewport.appendChild(this.htmlContainer);
    if (!this.visible) this.htmlContainer.display = 'none';
    this.htmlContainer.className = 'gogisDialogWindowContainer';
    this.htmlBackground = document.createElement('div');
    this.htmlBackground.className = 'gogisDialogWindowBackground';
    this.htmlContainer.appendChild(this.htmlBackground);
    this.htmlButton = document.createElement('div');
    this.htmlButton.className = 'gogisDialogWindowButton';
    this.htmlButton.parent = this;
    this.htmlButton.onclick = function(e) {
        GogisDialogWindow.close(e, this);
    };
    if (!browser_isMultitouch) {
        this.htmlButton.onmouseover = function(e) {
            this.style.borderColor = gogisApplication.HIGHLIGHT_BGCOLOR;
        };
        this.htmlButton.onmouseout = function(e) {
            this.style.borderColor = "transparent";
        };
    }
    this.htmlContainer.appendChild(this.htmlButton);
    this.htmlButtonImg = document.createElement('img');
    this.htmlButtonImg.src = 'kamap/images/a_pixel.gif';
    this.htmlButtonImg.className = 'gogisDialogWindowButtonImg';
    this.htmlButtonImg.title = gLocalizer.localize('Schliessen');
    this.htmlButton.appendChild(this.htmlButtonImg);
    this.htmlTitle = document.createElement('div');
    this.htmlTitle.className = 'gogisDialogWindowTitle';
    this.htmlTitle.innerHTML = this.title;
    this.htmlContainer.appendChild(this.htmlTitle);
    if (this.minmax) {
        this.htmlButtonMinMax = document.createElement('div');
        this.htmlButtonMinMax.className = 'gogisDialogWindowButtonMinMax';
        this.htmlButtonMinMax.parent = this;
        this.htmlButtonMinMax.onclick = function(e) {
            GogisDialogWindow.switchMinMax(e, this);
        };
        this.htmlContainer.appendChild(this.htmlButtonMinMax);
        this.htmlButtonMinMaxImg = document.createElement('img');
        this.htmlButtonMinMaxImg.src = 'kamap/images/a_pixel.gif';
        this.htmlButtonMinMaxImg.className = (this.isMinimized ? 'gogisDialogWindowButtonMaxImg' : 'gogisDialogWindowButtonMinImg');
        this.htmlButtonMinMaxImg.title = (this.isMinimized ? gLocalizer.localize('Maximieren') : gLocalizer.localize('Minimieren'));
        this.htmlButtonMinMax.appendChild(this.htmlButtonMinMaxImg);
        this.htmlTitle.parent = this;
        this.htmlTitle.ondblclick = function(e) {
            GogisDialogWindow.switchMinMax(e, this);
        };
    }
    this.htmlText = document.createElement('div');
    this.htmlText.className = 'gogisDialogWindowText';
    this.htmlText.innerHTML = this.content;
    this.htmlText.style.overflow = this.overflow;
    if (!browser_isMultitouch) {
        this.htmlText.onmousewheel = GogisDialogWindow.cancelEvent;
        if (window.addEventListener && navigator.product && navigator.product == "Gecko") {
            this.htmlText.addEventListener("DOMMouseScroll", GogisDialogWindow.cancelEvent, false);
        }
    }
    this.htmlBackground.appendChild(this.htmlText);
    if (this.overflow == 'auto' && browser_plattform.toLowerCase() == 'android' && browser_version < 3) touchScroll(this.htmlText);
    this.switchMinMaxWindow = function() {
        if (arguments && arguments[0]) this.isMinimized = false;
        this.htmlButtonMinMaxImg.className = (!this.isMinimized ? 'gogisDialogWindowButtonMaxImg' : 'gogisDialogWindowButtonMinImg');
        this.htmlButtonMinMaxImg.title = (!this.isMinimized ? gLocalizer.localize('Maximieren') : gLocalizer.localize('Minimieren'));
        this.isMinimized = !this.isMinimized;
        this.draw();
    };
    this.close = function() {
        return this.hide();
    };
    this.hide = function() {
        var bChanged = this.visible;
        if (this.visible) {
            this.visible = false;
            this.htmlContainer.style.display = 'none';
        }
        this.draw();
        return bChanged;
    };
    this.show = function() {
        if (arguments && arguments[0]) {
            this.content = arguments[0];
            this.htmlText.innerHTML = this.content;
        }
        if (!this.visible) {
            this.visible = true;
            this.htmlContainer.style.display = '';
        }
        this.isMinimized = false;
        if (typeof GogisTouchToolbox != 'undefined') GogisTouchToolbox.hide();
        this.draw();
    };
    this.setFooter = function(content) {
        if (content.trim() > "" && !this.htmlFooter) {
            this.htmlFooter = document.createElement('div');
            this.htmlFooter.className = 'gogisDialogWindowFooter';
            if (!browser_isMultitouch) this.htmlFooter.onmousewheel = GogisDialogWindow.cancelEvent;
            this.htmlBackground.appendChild(this.htmlFooter);
        } else if (content.trim() == "" && this.htmlFooter) {
            this.htmlBackground.removeChild(this.htmlFooter);
            this.htmlFooter = null;
        }
        if (this.htmlFooter) {
            this.htmlFooter.innerHTML = content;
            this.htmlText.className = 'gogisDialogWindowTextWithFooter';
        } else this.htmlText.className = 'gogisDialogWindowText';
    };
    if (this.visible) this.show();
}
GogisDialogWindow.POSITION_TOPLEFT = 1;
GogisDialogWindow.POSITION_TOPRIGHT = 2;
GogisDialogWindow.POSITION_BOTTOMLEFT = 3;
GogisDialogWindow.POSITION_BOTTOMRIGHT = 4;
GogisDialogWindow.observers = new Array();
GogisDialogWindow.cancelEvent = function(e) {
    e = (e) ? e : ((event) ? event : null);
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    return false;
};
GogisDialogWindow.close = function(e, obj) {
    obj.parent.close();
};
GogisDialogWindow.switchMinMax = function(e, obj) {
    obj.parent.switchMinMaxWindow();
};
GogisDialogWindow.hideAllWindows = function() {
    var bChanged = false;
    for (var i = 0; i < GogisDialogWindow.observers.length; i++) {
        if (arguments && arguments[0] && GogisDialogWindow.observers[i] == arguments[0]) continue;
        bChanged = (bChanged || GogisDialogWindow.observers[i].hide());
    }
    return bChanged;
};
if (typeof(iMonth) == "undefined") iMonth = new Date().getMonth();
if (typeof(iYear) == "undefined") iYear = new Date().getFullYear();
if (typeof(iDay) == "undefined") iDay = new Date().getDate();
if (typeof(itype) == "undefined") itype = "loose";
if (typeof(imaxDays) == "undefined") imaxDays = 100000;
if (typeof(stDay) == "undefined") startDay = iDay;
if (typeof(stMonth) == "undefined") startMonth = iMonth;
if (typeof(stYear) == "undefined") startYear = iYear;
if (typeof(addZero) == "undefined") addZero = false;
if (typeof(offX) == "undefined") offX = 19;
if (typeof(offY) == "undefined") offY = -5;
if (typeof(formatInputs) == "undefined") formatInputs = 1;
if (typeof(formatSplitter) == "undefined") formatSplitter = ".";
if (typeof(monthFormat) == "undefined") monthFormat = "mm";
if (typeof(yearFormat) == "undefined") yearFormat = "yyyy";
if (typeof(folowMouse) == "undefined") folowMouse = true;
if (typeof(formatType) == "undefined") formatType = "dd" + formatSplitter + monthFormat + formatSplitter + yearFormat;
if (typeof(callNotice) == "undefined") callNotice = "fallsilent()";
if (window.addEventListener) window.addEventListener("load", createBase, false);
else if (window.attachEvent) window.attachEvent("onload", createBase);
else if (document.getElementById) window.onload = createBase;
var tempX = 0;
var tempY = 0;
document.onmousemove = getMouseXY;

function getMouseXY(e) {
    e = (e) ? e : ((event) ? event : null);
    tempX = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    tempY = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    if (tempX < 0) {
        tempX = 0
    }
    if (tempY < 0) {
        tempY = 0
    }
    return true;
}

function getScrollXY() {
    var scrOfX = 0,
        scrOfY = 0;
    if (typeof(window.pageYOffset) == 'number') {
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [scrOfX, scrOfY];
}
var d = document;

function cel(obj) {
    return d.createElement(obj);
}

function sa(obj, atname, atprop) {
    return obj.setAttribute(atname, atprop);
}

function appendc(obj, elem) {
    return obj.appendChild(elem);
}

function cNode(obj, txt) {
    return obj.appendChild(d.createTextNode(txt));
}

function getID(elem) {
    return d.getElementById(elem);
}
var DayCol = new Array("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So");
var MonthCol = new Array("Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez");

function getDaysInMonth(mnt, yr) {
    var DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (mnt == 1) DaysInMonth[1] = ((yr % 400 == 0) || ((yr % 4 == 0) && (yr % 100 != 0))) ? 29 : 28;
    return DaysInMonth[mnt];
}
var cw = {
    currMonth: iMonth,
    currYear: iYear,
    currDay: iDay,
    selMonth: iMonth,
    selYear: iYear,
    selDay: iDay,
    config: itype,
    maxDays: imaxDays,
    stMonth: startMonth,
    stYear: startYear,
    stDay: startDay,
    endMonth: 11,
    endYear: iYear,
    endDay: 31,
    addZ: addZero,
    setMarks: function() {
        if (this.config == 'strict') {
            this.stDay = iDay;
            this.stMonth = iMonth;
            this.stYear = iYear;
            this.getEnd();
        }
    },
    getConfMonths: function() {
        mthCol = cel("ul");
        mthCol.id = "months";
        k = 0;
        for (i = 0; i < 12; i++) {
            mth = cel("li");
            if (cw.isValidMonth(i)) {
                mth.className = "months";
                if (cw.isCurrentMonth(i)) mth.className = "currMonth";
                mtha = cel("a");
                mtha.href = "javascript:modMonth(" + this.selYear + "," + i + ")";
                mtha.innerHTML = MonthCol[i];
                appendc(mth, mtha);
            } else {
                mth.className = "monthDisabled";
                mth.innerHTML = MonthCol[i];
            }
            appendc(mthCol, mth)
        }
        cw.setBrowseYears();
        return mthCol;
    },
    getConfDays: function() {
        dayCol = cel("ul");
        dayCol.id = "days";
        for (i = 0; i < 7; i++) {
            dayCell = cel("li");
            dayCell.className = "headDay";
            dayCell.innerHTML = DayCol[i];
            appendc(dayCol, dayCell);
        }
        var iFirstDay = new Date(this.selYear, this.selMonth, 1).getDay();
        iFirstDay--;
        if (iFirstDay < 0) {
            iFirstDay = 6
        }
        for (i = 0; i < iFirstDay; i++) {
            dayCell = cel('li');
            dayCell.className = "dayBlank";
            dayCell.innerHTML = "&nbsp;";
            appendc(dayCol, dayCell);
        }
        for (i = 1; i <= getDaysInMonth(this.selMonth, this.selYear); i++) {
            dayCell = cel('li');
            if (cw.isValidDate(i)) {
                dayCell.className = "dayNormal";
                if (cw.isWeekend(i)) dayCell.className = "dayWeekend";
                if (cw.isCurrentDay(i)) dayCell.className = "dayCurrent";
                dayLink = cel('a');
                dayLink.href = "javascript: newDay(" + i + ");fillBackDate(" + i + "," + this.selMonth + "," + this.selYear + ")";
                dayLink.innerHTML = i;
                appendc(dayCell, dayLink);
            } else {
                dayCell.className = "dayDisabled";
                dayCell.innerHTML = i;
            }
            appendc(dayCol, dayCell);
        }
        return dayCol;
    },
    getEnd: function() {
        imaxD = imaxDays - (getDaysInMonth(this.stMonth, this.stYear) - this.stDay);
        tmpM = this.stMonth;
        tmpY = this.stYear;
        tmpD = this.stDay;
        i = 0;
        while (imaxD >= getDaysInMonth(tmpM, tmpY)) {
            tmpM++;
            if (tmpM > 11) {
                tmpM = 0;
                tmpY++;
            }
            tmpD = imaxD -= getDaysInMonth(tmpM, tmpY);
        }
        tmpM++;
        if (tmpM > 11) {
            tmpM = 0;
            tmpY++
        }
        this.endMonth = tmpM;
        this.endDay = tmpD;
        this.endYear = tmpY;
    },
    isValidDate: function(tDay) {
        if (this.config == "loose") return true;
        if (this.selYear == this.stYear) {
            if (this.selMonth < this.stMonth) return false;
            if (this.selMonth == this.stMonth && tDay < this.stDay) return false;
        }
        if (this.selYear == this.endYear) {
            if (this.selMonth > this.endMonth) return false;
            if (this.selMonth == this.endMonth && tDay > this.endDay) return false;
        }
        if (this.selYear == this.endYear && this.selYear == this.stYear) {
            if (this.selMonth > this.endMonth || this.selMonth < this.stMonth) return false;
        }
        if (this.selYear > this.endYear) return false;
        if (this.selYear < this.stYear) return false;
        return true;
    },
    isWeekend: function(tDay) {
        sun = new Date(this.selYear, this.selMonth, tDay).getDay();
        if (sun == 6 || sun == 0) return true;
        return false;
    },
    isCurrentDay: function(tDay) {
        if (this.selDay == tDay) return true;
        return false;
    },
    setBrowseYears: function() {
        brsY = cel('li');
        brsY.className = "yearBrowse";
        if (this.selYear <= this.stYear && this.config == "strict") {
            backB = cel('span');
        } else {
            backB = cel('a');
            backB.href = "javascript: modYear(-1)";
        }
        backB.innerHTML = "&laquo";
        yText = cel("b");
        yText.innerHTML = cw.selYear;
        if (this.selYear >= this.endYear && this.config == "strict") fwdB = cel('span');
        else {
            fwdB = cel('a');
            fwdB.href = "javascript: modYear(1)";
        }
        fwdB.innerHTML = "&raquo;";
        appendc(brsY, backB);
        appendc(brsY, yText);
        appendc(brsY, fwdB);
        appendc(mthCol, brsY);
    },
    isValidMonth: function(m) {
        if (this.config == "loose") return true;
        else {
            if (this.selYear < this.stYear) return false;
            if (this.selYear == this.stYear && m < this.stMonth) return false;
            if (this.selYear > this.endYear) return false;
            if (this.selYear == this.endYear && m > this.endMonth) return false;
        }
        return true;
    },
    isCurrentMonth: function(i) {
        if (i == this.selMonth) return true;
        return false;
    }
};
cw.setMarks();

function createBase() {
    var el = cel('div');
    el.id = "calendar";
    el.style.display = "none";
    if (typeof(elToAppend) == "undefined") tDocument = document.getElementsByTagName('body').item(0);
    else {
        var tt = elToAppend;
        tDocument = document.getElementById(tt);
    }
    appendc(tDocument, el);
}

function createCalendarElements() {
    var el = 'calendar';
    var calCon = cel('div');
    calCon.id = "elements";
    while (document.getElementById(el).firstChild) document.getElementById(el).removeChild(document.getElementById(el).firstChild);
    appendc(document.getElementById(el), calCon);
    mthCol = cw.getConfMonths();
    appendc(calCon, mthCol);
    dayStruct = cw.getConfDays();
    appendc(calCon, dayStruct);
}

function modMonth(newY, newM) {
    cw.selYear = newY;
    cw.selMonth = newM;
    createCalendarElements();
}

function newDay(newD) {
    cw.selDay = newD;
    createCalendarElements();
}

function modYear(way) {
    cw.selYear = parseInt(cw.selYear) + parseInt(way);
    createCalendarElements();
}

function calSetStartDate(date) {
    var tDate = date.split(".");
    cw.stDay = tDate[0];
    cw.stMonth = tDate[1] - 1;
    cw.stYear = tDate[2];
    cw.currDay = tDate[0];
    cw.currMonth = tDate[1] - 1;
    cw.currYear = tDate[2];
}

function calSetEndDate(date) {
    var tDate = date.split(".");
    cw.endDay = tDate[0];
    cw.endMonth = tDate[1] - 1;
    cw.endYear = tDate[2];
    cw.currDay = tDate[0];
    cw.currMonth = tDate[1] - 1;
    cw.currYear = tDate[2];
}
var datas;
var elem1;
var elem2;
var elem3;
var mA = 0;
var yA = 0;
var mm = new Array('mm', 'mmm');
var yy = new Array('yy', 'yyyy');

function fPopCalendar(param1, param2, param3) {
    tmpString = new String();
    if (formatInputs == 1) {
        elem1 = param1;
        tmpString = document.getElementById(elem1).value;
        objPos = param2;
    }
    if (formatInputs == 2) {
        elem1 = param1;
        elem2 = param2;
        tmpString = document.getElementById(elem1).value + formatSplitter + document.getElementById(elem2).value;
    }
    if (formatInputs == 3) {
        elem1 = param1;
        elem2 = param2;
        elem3 = param3;
        tmpString = document.getElementById(elem1).value + formatSplitter + document.getElementById(elem2).value + formatSplitter + document.getElementById(elem3).value;
    }
    datas = tmpString.split(formatSplitter);
    tmpo = formatType.split(formatSplitter);
    dC = "";
    tC = "";
    if (datas.length == tmpo.length) {
        for (i = 0; i < datas.length; i++) {
            if (datas[i].length < 2) datas[i] = "0" + datas[i];
            dC += datas[i];
            tC += tmpo[i];
        }
        if (dC.length == tC.length) orderData();
    } else datas = new Array(cw.selDay, cw.selMonth, cw.selYear);
    createCalendarElements();
    offsets = getScrollXY();
    document.getElementById('calendar').style.display = "block";
    if (folowMouse) {
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer") {
            document.getElementById('calendar').style.left = (parseInt(getAbsolutePosX(objPos)) + parseInt(offsets[0]) - 1 - getObjectWidth(document.getElementById('calendar'))) + 'px';
            document.getElementById('calendar').style.top = 1 + parseInt(getAbsolutePosY(objPos)) + parseInt(offY) + parseInt(offsets[1]) + 'px';
        } else {
            document.getElementById('calendar').style.left = (parseInt(getAbsolutePosX(objPos)) - 1 - getObjectWidth(document.getElementById('calendar'))) + 'px';
            document.getElementById('calendar').style.top = 1 + parseInt(getAbsolutePosY(objPos)) + parseInt(offY) + 'px';
        }
    }
    order = new String(formatType).split(formatSplitter);
    for (i = 0; i < mm.length; i++) {
        for (j = 0; j < order.length; j++) {
            if (mm[i] == order[j]) mA = i;
            if (yy[i] == order[j]) yA = i;
        }
    }
}

function orderData() {
    order = new String(formatType).split(formatSplitter);
    for (i = 0; i < order.length; i++) {
        for (j = 0; j < mm.length; j++) {
            if (mm[j] == order[i]) {
                cw.selMonth = datas[i];
                if (cw.selMonth.slice(0, 1) == 0) cw.selMonth = parseInt(cw.selMonth.slice(1, cw.selMonth.length)) - 1;
                else if (cw.selMonth.length < 3) cw.selMonth = parseInt(cw.selMonth) - 1;
                if (j == 1) {
                    for (k = 0; k < MonthCol.length; k++) {
                        if (MonthCol[k].toLowerCase() == cw.selMonth.toLowerCase()) {
                            cw.selMonth = k;
                            break;
                        }
                    }
                }
            }
            if (yy[j] == order[i]) {
                cw.selYear = datas[i];
                if (cw.selYear.slice(0, 1) == 0) cw.selYear = parseInt(cw.selYear.slice(1, cw.selYear.length));
                if (j == 0) cw.selYear = 2000 + parseInt(cw.selYear);
            }
        }
        if (order[i].toLowerCase() == 'dd') {
            cw.selDay = datas[i];
            if (cw.selDay.slice(0, 1) == 0) cw.selDay = parseInt(cw.selDay.slice(1, cw.selDay.length));
        }
    }
}

function fillBackDate(tDay, tMonth, tYear) {
    if (mA == 1) tMonth = MonthCol[tMonth];
    if (mA == 0) {
        tMonth++;
        if (tMonth < 10 && cw.addZ == true) tMonth = "0" + tMonth;
    }
    if (yA == 0) tYear = new String(tYear).slice(2, 4);
    if (tDay < 10 && cw.addZ == true) {
        tDay = "0" + tDay;
    }
    if (formatType.slice(0, 2) != "dd") {
        tmpDATA = tDay;
        tDay = tYear;
        tYear = tmpDATA;
    }
    if (formatInputs == 1) {
        document.getElementById(elem1).value = tDay + formatSplitter + tMonth + formatSplitter + tYear;
    }
    if (formatInputs == 2) {
        document.getElementById(elem1).value = tDay;
        document.getElementById(elem2).value = tMonth + formatSplitter + tYear;
    }
    if (formatInputs == 3) {
        document.getElementById(elem1).value = tDay;
        document.getElementById(elem2).value = tMonth;
        document.getElementById(elem3).value = tYear;
    }
    document.getElementById(elem1).style.color = "#000000";
    closeCalendar();
}

function closeCalendar() {
    var el = document.getElementById('calendar');
    if (el) el.style.display = "none";
}

function fallsilent() {}

function getAbsolutePosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    } else if (obj.x) curleft += obj.x;
    return curleft;
}

function getAbsolutePosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    } else if (obj.y) curtop += obj.y;
    return curtop;
}
dragDrop = {
    keyHTML: '<a href="#" class="keyLink">#</a>',
    keySpeed: 10,
    initialMouseX: undefined,
    initialMouseY: undefined,
    startX: undefined,
    startY: undefined,
    dXKeys: undefined,
    dYKeys: undefined,
    draggedObject: undefined,
    initElement: function(element) {
        if (typeof element == 'string') element = document.getElementById(element);
        element.onmousedown = dragDrop.startDragMouse;
        element.innerHTML += dragDrop.keyHTML;
        var links = element.getElementsByTagName('a');
        var lastLink = links[links.length - 1];
        lastLink.relatedElement = element;
        lastLink.onclick = dragDrop.startDragKeys;
    },
    startDragMouse: function(e) {
        dragDrop.startDrag(this);
        var evt = e || window.event;
        dragDrop.initialMouseX = evt.clientX;
        dragDrop.initialMouseY = evt.clientY;
        addEventSimple(document, 'mousemove', dragDrop.dragMouse);
        addEventSimple(document, 'mouseup', dragDrop.releaseElement);
        return false;
    },
    startDragKeys: function() {
        dragDrop.startDrag(this.relatedElement);
        dragDrop.dXKeys = dragDrop.dYKeys = 0;
        addEventSimple(document, 'keydown', dragDrop.dragKeys);
        addEventSimple(document, 'keypress', dragDrop.switchKeyEvents);
        this.blur();
        return false;
    },
    startDrag: function(obj) {
        if (dragDrop.draggedObject) dragDrop.releaseElement();
        dragDrop.startX = obj.offsetLeft;
        dragDrop.startY = obj.offsetTop;
        dragDrop.draggedObject = obj;
        obj.className += ' dragged';
    },
    dragMouse: function(e) {
        var evt = e || window.event;
        var dX = evt.clientX - dragDrop.initialMouseX;
        var dY = evt.clientY - dragDrop.initialMouseY;
        dragDrop.setPosition(dX, dY);
        return false;
    },
    dragKeys: function(e) {
        var evt = e || window.event;
        var key = evt.keyCode;
        switch (key) {
            case 37:
            case 63234:
                dragDrop.dXKeys -= dragDrop.keySpeed;
                break;
            case 38:
            case 63232:
                dragDrop.dYKeys -= dragDrop.keySpeed;
                break;
            case 39:
            case 63235:
                dragDrop.dXKeys += dragDrop.keySpeed;
                break;
            case 40:
            case 63233:
                dragDrop.dYKeys += dragDrop.keySpeed;
                break;
            case 13:
            case 27:
                dragDrop.releaseElement();
                return false;
            default:
                return true;
        }
        dragDrop.setPosition(dragDrop.dXKeys, dragDrop.dYKeys);
        if (evt.preventDefault) evt.preventDefault();
        return false;
    },
    setPosition: function(dx, dy) {
        dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
        dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
    },
    switchKeyEvents: function() {
        removeEventSimple(document, 'keydown', dragDrop.dragKeys);
        removeEventSimple(document, 'keypress', dragDrop.switchKeyEvents);
        addEventSimple(document, 'keypress', dragDrop.dragKeys);
    },
    releaseElement: function() {
        removeEventSimple(document, 'mousemove', dragDrop.dragMouse);
        removeEventSimple(document, 'mouseup', dragDrop.releaseElement);
        removeEventSimple(document, 'keypress', dragDrop.dragKeys);
        removeEventSimple(document, 'keypress', dragDrop.switchKeyEvents);
        removeEventSimple(document, 'keydown', dragDrop.dragKeys);
        dragDrop.draggedObject.className = dragDrop.draggedObject.className.replace(/dragged/, '');
        dragDrop.draggedObject = null;
    }
};

function addEventSimple(obj, evt, fn) {
    if (obj.addEventListener) obj.addEventListener(evt, fn, false);
    else if (obj.attachEvent) obj.attachEvent('on' + evt, fn);
}

function removeEventSimple(obj, evt, fn) {
    if (obj.removeEventListener) obj.removeEventListener(evt, fn, false);
    else if (obj.detachEvent) obj.detachEvent('on' + evt, fn);
}
var isIE8 = ((parseFloat(navigator.appVersion.split("MSIE")[1]) >= 8) ? true : false);
var isIE7 = ((parseFloat(navigator.appVersion.split("MSIE")[1]) >= 7 && !isIE8) ? true : false);
var hasGPS = (navigator.geolocation ? true : false);

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

function touchScroll(obj) {
    if (isTouchDevice()) {
        var scrollStartPosY = 0;
        var scrollStartPosX = 0;
        obj.addEventListener("touchstart", function(event) {
            scrollStartPosY = this.scrollTop + event.touches[0].pageY;
            scrollStartPosX = this.scrollLeft + event.touches[0].pageX;
        }, false);
        obj.addEventListener("touchmove", function(event) {
            if ((this.scrollTop < this.scrollHeight - this.offsetHeight && this.scrollTop + event.touches[0].pageY < scrollStartPosY - 5) || (this.scrollTop != 0 && this.scrollTop + event.touches[0].pageY > scrollStartPosY + 5)) event.preventDefault();
            if ((this.scrollLeft < this.scrollWidth - this.offsetWidth && this.scrollLeft + event.touches[0].pageX < scrollStartPosX - 5) || (this.scrollLeft != 0 && this.scrollLeft + event.touches[0].pageX > scrollStartPosX + 5)) event.preventDefault();
            this.scrollTop = scrollStartPosY - event.touches[0].pageY;
            this.scrollLeft = scrollStartPosX - event.touches[0].pageX;
        }, false);
    }
}

function click() {}

function in_array(arr, needle) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i] == needle) return true;
    return false;
};
String.prototype.trim = function() {
    return (this.replace(/\s+$/, "").replace(/^\s+/, ""));
};
String.prototype.stripHtmlTags = function() {
    return (this.replace(/(<([^>]+)>)/ig, ""));
};
String.prototype.safeHtml = function() {
    return (this.replace(/\'/g, "&#39;").replace(/\"/g, "&quot;"));
};

function StringBuffer() {
    this.buffer = [];
}
StringBuffer.prototype.append = function append(string) {
    this.buffer.push(string);
    return this;
};
StringBuffer.prototype.toString = function toString() {
    return this.buffer.join("");
};

function clone(myObj) {
    if (typeof(myObj) != 'object') return myObj;
    if (myObj == null) return myObj;
    var myNewObj = new Object();
    for (var i in myObj) myNewObj[i] = clone(myObj[i]);
    return myNewObj;
}

function cloneArray(myArr) {
    var myNewArr = new Array();
    for (var property in myArr) {
        myNewArr[property] = typeof(myArr[property]) == 'array' ? cloneArray(myArr[property]) : myArr[property];
    }
    return myNewArr;
}

function applyAll(myObj, myPropObj) {
    var tmpObj;
    for (var i in myPropObj) {
        if (typeof(myPropObj[i]) != 'object') {
            myObj[i] = myPropObj[i];
        } else {
            if (typeof(myObj[i]) != 'undefined') tmpObj = myObj[i];
            else tmpObj = new Object();
            for (var j in myPropObj[i]) {
                tmpObj[j] = myPropObj[i][j];
            }
            myObj[i] = tmpObj;
        }
    }
    return myObj;
}

function serialize(_obj) {
    if (typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined') {
        return _obj.toSource();
    }
    switch (typeof _obj) {
        case 'number':
        case 'boolean':
        case 'function':
            return _obj;
            break;
        case 'string':
            return '\'' + _obj + '\'';
            break;
        case 'object':
            var str;
            if (_obj.constructor === Array || typeof _obj.callee !== 'undefined') {
                str = '[';
                var i, len = _obj.length;
                for (i = 0; i < len - 1; i++) {
                    str += serialize(_obj[i]) + ',';
                }
                str += serialize(_obj[i]) + ']';
            } else {
                str = '{';
                var key;
                for (key in _obj) {
                    str += key + ':' + serialize(_obj[key]) + ',';
                }
                str = str.replace(/\,$/, '') + '}';
            }
            return str;
            break;
        default:
            return 'UNKNOWN';
            break;
    }
}

function htmlspecialchars_encode(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    }
    return str;
}

function htmlspecialchars_decode(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&quot;/ig, '"');
        str = str.replace(/&amp;/ig, '&');
    }
    return str;
}
var gogisFocusObjIsBluring = false;
var gogisFocusObj = null;

function doSetFocus(ctrl) {
    gogisFocusObj = ctrl;
    setTimeout("gogisFocusObj.focus();if(gogisFocusObj.type=='text')doSetCaretToEnd(gogisFocusObj);", 10);
}

function doSetCaretPosition(oField, iCaretPos) {
    if (document.selection) {
        oField.focus();
        var oSel = document.selection.createRange();
        oSel.moveStart('character', -oField.value.length);
        oSel.moveStart('character', iCaretPos);
        oSel.moveEnd('character', 0);
        oSel.select();
    } else if (oField.selectionStart || oField.selectionStart == '0') {
        oField.selectionStart = iCaretPos;
        oField.selectionEnd = iCaretPos;
        oField.focus();
    }
}

function doSetCaretToEnd(oField) {
    doSetCaretPosition(oField, oField.value.length);
}

function isDate(str) {
    if (str == "") return true;
    var dateParts = str.split('.');
    if (dateParts.length != 3) return false;
    var newDate = new Date(dateParts[2], dateParts[1], dateParts[0]);
    if (isNaN(newDate)) return false;
    if (dateParts[2].length < 4 || isNaN(dateParts[2]) || parseInt(dateParts[2]) < 1800 || parseInt(dateParts[2]) >= 2100) return false;
    if (arguments.length == 3 && arguments[1] != "" && arguments[1] != null && arguments[2] != null) {
        dateParts = arguments[1].split('.');
        if (dateParts.length != 3) return false;
        var compareDate = new Date(dateParts[2], dateParts[1], dateParts[0]);
        if (isNaN(compareDate)) return false;
        if (arguments[2] == 1) {
            if (newDate < compareDate) return false;
        } else if (arguments[2] == 2) {
            if (newDate > compareDate) return false;
        }
    }
    return true;
}

function isIntNegative(str) {
    if (!isNaN(parseInt(str)) && parseInt(str) < 0) {
        return true;
    } else {
        return false;
    }
}

function roundIt(number, decimals) {
    var base10 = 10;
    for (var i = 0; i < decimals - 1; i++) base10 = base10 * 10;
    return Math.round(number * base10) / base10;
}

function formatNumber(aNumber, numDecimals) {
    numDecimals = (numDecimals) ? numDecimals : 0;
    var formattedInteger = '' + Math.round(aNumber);
    var thousandsPattern = /(-?[0-9]+)([0-9]{3})/;
    while (thousandsPattern.test(formattedInteger)) {
        formattedInteger = formattedInteger.replace(thousandsPattern, '$1\'$2');
    }
    if (numDecimals > 0) {
        var formattedDecimal = Math.floor(Math.pow(10, numDecimals) * (aNumber - Math.round(aNumber)));
        if (formattedDecimal == 0) {
            return formattedInteger;
        } else {
            return formattedInteger + '.' + formattedDecimal;
        }
    } else {
        return formattedInteger;
    }
}

function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    } else if (obj.x) curleft += obj.x;
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    } else if (obj.y) curtop += obj.y;
    return curtop;
}

function applyPNGFilter(o) {
    var t = "kamap/images/a_pixel.gif";
    if (o.src != t && o.src.match(/.gif$/gi) == null) {
        var s = o.src;
        o.src = t;
        o.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + s + "',sizingMethod='scale')";
    }
}

function applyPNGFilterToChilds(parent) {
    try {
        var i = 0;
        while (parent.childNodes[i]) {
            applyPNGFilterToChilds(parent.childNodes[i]);
            i++;
        }
        if (i > 0 && typeof(parent.childNodes[i - 1]) == "object" && parent.childNodes[i - 1].src && !parent.childNodes[i - 1].src.toLowerCase().indexOf(".gif") >= 0) {
            applyPNGFilter(parent.childNodes[i - 1]);
        }
    } catch (e) {}
}

function verifyStyle(selector) {
    var rules;
    var haveRule = false;
    if (typeof document.styleSheets != "undefined") {
        var cssSheets = document.styleSheets;
        outerloop: for (var i = 0; i < cssSheets.length; i++) {
            rules = (typeof cssSheets[i].cssRules != "undefined") ? cssSheets[i].cssRules : cssSheets[i].rules;
            for (var j = 0; j < rules.length; j++) {
                if (rules[j].selectorText == selector) {
                    haveRule = true;
                    break outerloop;
                }
            }
        }
    }
    return haveRule;
}
var myCustomColors = ['white', 'red', 'blue', 'green', 'yellow', 'grey'];
var htmlSafeColors = new Array();
htmlSafeColors['aqua'] = '#00FFFF';
htmlSafeColors['black'] = '#000000';
htmlSafeColors['blue'] = '#0000FF';
htmlSafeColors['fuchsia'] = '#FF00FF';
htmlSafeColors['gray'] = '#808080';
htmlSafeColors['green'] = '#008000';
htmlSafeColors['lime'] = '#00FF00';
htmlSafeColors['maroon'] = '#800000';
htmlSafeColors['navy'] = '#000080';
htmlSafeColors['olive'] = '#808000';
htmlSafeColors['purple'] = '#800080';
htmlSafeColors['red'] = '#FF0000';
htmlSafeColors['silver'] = '#C0C0C0';
htmlSafeColors['teal'] = '#008080';
htmlSafeColors['white'] = '#FFFFFF';
htmlSafeColors['yellow'] = '#FFFF00';
htmlSafeColors['transparent'] = 'transparent';
var hexColorCheckStrict = /^#([0-9a-f]{1,2}){3}$/i;
var hexColorCheck = /^#?([0-9a-f]{1,2}){3}$/i;

function safeHtmlColor(color) {
    if (htmlSafeColors[color]) return htmlSafeColors[color];
    else if (hexColorCheckStrict.test(color)) return color;
    else if (hexColorCheck.test(color)) return '#' + color;
    return "transparent";
}

function parseQueryString() {
    queryParams = {};
    var s = decodeURI(window.location.search);
    if (s != '') {
        s = s.substring(1);
        var p = s.split('&');
        for (var i = 0; i < p.length; i++) {
            var q = p[i].split('=');
            queryParams[q[0]] = q[1];
        }
    }
}

function getQueryParam(p) {
    if (!queryParams) {
        parseQueryString();
    }
    if (queryParams[p]) {
        return queryParams[p];
    } else {
        return '';
    }
}

function Set_Cookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
}
var localizedMonthDE = new Array("Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");
var localizedMonthEN = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

function getLocalizedMonth(month) {
    if (gogisCurrentLanguage == 'de') return localizedMonthDE[month];
    else return localizedMonthEN[month];
}

function WGStoCHy(lat, lng) {
    lat = DECtoSEX(lat);
    lng = DECtoSEX(lng);
    lat = DEGtoSEC(lat);
    lng = DEGtoSEC(lng);
    var lat_aux = (lat - 169028.66) / 10000;
    var lng_aux = (lng - 26782.5) / 10000;
    y = 600072.37 + 211455.93 * lng_aux - 10938.51 * lng_aux * lat_aux - 0.36 * lng_aux * Math.pow(lat_aux, 2) - 44.54 * Math.pow(lng_aux, 3);
    return y + (gogisCurrentProjection == 'LV03' ? 0 : 2000000);
}

function WGStoCHx(lat, lng) {
    lat = DECtoSEX(lat);
    lng = DECtoSEX(lng);
    lat = DEGtoSEC(lat);
    lng = DEGtoSEC(lng);
    var lat_aux = (lat - 169028.66) / 10000;
    var lng_aux = (lng - 26782.5) / 10000;
    x = 200147.07 + 308807.95 * lat_aux + 3745.25 * Math.pow(lng_aux, 2) + 76.63 * Math.pow(lat_aux, 2) - 194.56 * Math.pow(lng_aux, 2) * lat_aux + 119.79 * Math.pow(lat_aux, 3);
    return x + (gogisCurrentProjection == 'LV03' ? 0 : 1000000);
}

function CHtoWGSlat(y, x) {
    var y_aux = (y - (gogisCurrentProjection == 'LV03' ? 600000 : 2600000)) / 1000000;
    var x_aux = (x - (gogisCurrentProjection == 'LV03' ? 200000 : 1200000)) / 1000000;
    lat = 16.9023892 + 3.238272 * x_aux - 0.270978 * Math.pow(y_aux, 2) - 0.002528 * Math.pow(x_aux, 2) - 0.0447 * Math.pow(y_aux, 2) * x_aux - 0.0140 * Math.pow(x_aux, 3);
    lat = lat * 100 / 36;
    return lat;
}

function CHtoWGSlng(y, x) {
    var y_aux = (y - (gogisCurrentProjection == 'LV03' ? 600000 : 2600000)) / 1000000;
    var x_aux = (x - (gogisCurrentProjection == 'LV03' ? 200000 : 1200000)) / 1000000;
    lng = 2.6779094 + 4.728982 * y_aux + 0.791484 * y_aux * x_aux + 0.1306 * y_aux * Math.pow(x_aux, 2) - 0.0436 * Math.pow(y_aux, 3);
    lng = lng * 100 / 36;
    return lng;
}

function SEXtoDEC(angle) {
    var deg = parseInt(angle);
    var min = parseInt((angle - deg) * 100);
    var sec = (((angle - deg) * 100) - min) * 100;
    return deg + (sec / 60 + min) / 60;
}

function DECtoSEX(angle) {
    var deg = parseInt(angle);
    var min = parseInt((angle - deg) * 60);
    var sec = (((angle - deg) * 60) - min) * 60;
    return deg + min / 100 + sec / 10000;
}

function DEGtoSEC(angle) {
    var deg = parseInt(angle);
    var min = parseInt((angle - deg) * 100);
    var sec = (((angle - deg) * 100) - min) * 100;
    return sec + min * 60 + deg * 3600;
}

function GogisGraphics() {}
GogisGraphics.hasCanvasSupport = false;
GogisGraphics.init = function() {
    GogisGraphics.hasCanvasSupport = ((arguments.length > 0 && arguments[0] != false) ? true : false);
};

function GogisCanvas(id, width, height, opacity) {
    this.id = id;
    this.container = document.getElementById(id);
    this.width = (width ? width : 200);
    this.height = (height ? height : 200);
    this.opacity = parseInt(opacity ? opacity : 100);
    if (GogisGraphics.hasCanvasSupport) {
        try {
            var c = document.createElement("canvas");
            c.setAttribute('width', this.width);
            c.setAttribute('height', this.height);
            if (typeof G_vmlCanvasManager != "undefined") {
                this.canvas = G_vmlCanvasManager.initElement(c);
            } else this.canvas = c;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.container.appendChild(this.canvas);
            this.graphics = this.canvas.getContext('2d');
            this.graphics.globalAlpha = this.opacity / 100;
            if (!this.graphics) {
                GogisGraphics.hasCanvasSupport = false;
                try {
                    if (this.opacity != 100) {
                        this.container.style.opacity = (this.opacity / 100);
                        this.container.style.mozOpacity = (this.opacity / 100);
                        this.container.style.filter = 'Alpha(opacity=' + this.opacity + ')';
                    }
                    this.graphics = new jsGraphics(id);
                } catch (e) {
                    this.graphics = null;
                }
            }
        } catch (e) {
            GogisGraphics.hasCanvasSupport = false;
            try {
                if (this.opacity != 100) {
                    this.container.style.opacity = (this.opacity / 100);
                    this.container.style.mozOpacity = (this.opacity / 100);
                    this.container.style.filter = 'Alpha(opacity=' + this.opacity + ')';
                }
                this.graphics = new jsGraphics(id);
            } catch (e) {
                this.graphics = null;
            }
        }
    } else {
        try {
            if (this.opacity != 100) {
                this.container.style.opacity = (this.opacity / 100);
                this.container.style.mozOpacity = (this.opacity / 100);
                this.container.style.filter = 'Alpha(opacity=' + this.opacity + ')';
            }
            this.graphics = new jsGraphics(id);
        } catch (e) {
            this.graphics = null;
        }
    }
    this.clear = function() {
        if (this.graphics) {
            if (GogisGraphics.hasCanvasSupport) this.graphics.clearRect(0, 0, this.width, this.height);
            else this.graphics.clear();
        }
    };
    this.remove = function() {
        if (this.graphics) {
            this.clear();
            if (GogisGraphics.hasCanvasSupport) {
                this.container.removeChild(this.canvas);
                this.canvas = null;
                this.container = null;
            }
        }
    };
    this.drawPoint = function() {};
    this.drawLine = function() {
        if ((this.graphics && arguments.length > 0 && arguments[0] && arguments[0].x && arguments[0].y) || arguments.length > 4 && arguments[4]) {
            var values = arguments[0];
            var stroke = ((arguments.length > 1 && arguments[1]) ? arguments[1] : gogisApplication.HIGHLIGHT_SIZE);
            var color = ((arguments.length > 2 && arguments[2]) ? arguments[2] : gogisApplication.HIGHLIGHT_BORDERCOLOR);
            var extension = ((arguments.length > 4 && arguments[4]) ? arguments[4] : null);
            var strokeCorr = stroke / 2;
            try {
                if (GogisGraphics.hasCanvasSupport) {
                    if ((values && values.x.length > 1 && values.y.length > 1) || (extension && extension.length >= 1)) {
                        this.graphics.beginPath();
                        if (values && values.x.length > 1 && values.y.length > 1) {
                            this.graphics.moveTo(values.x[0] + strokeCorr, values.y[0] + strokeCorr);
                            for (var i = 0; i < values.x.length; i++) {
                                this.graphics.lineTo(values.x[i] + strokeCorr, values.y[i] + strokeCorr);
                            }
                        }
                        if (extension && extension.length >= 1) {
                            for (var i = 0; i < extension.length; i++) {
                                this.graphics.moveTo(extension[i].x[0] + strokeCorr, extension[i].y[0] + strokeCorr);
                                for (var j = 0; j < extension[i].x.length; j++) {
                                    this.graphics.lineTo(extension[i].x[j] + strokeCorr, extension[i].y[j] + strokeCorr);
                                }
                            }
                        }
                        this.graphics.lineJoin = "round";
                        this.graphics.lineCap = "round";
                        this.graphics.lineWidth = stroke;
                        this.graphics.strokeStyle = color;
                        this.graphics.stroke();
                    }
                } else {
                    this.graphics.setStroke(stroke);
                    this.graphics.setColor(color);
                    this.graphics.drawPolyline(values.x, values.y);
                    this.graphics.paint();
                }
            } catch (e) {}
        }
    };
    this.drawPolygon = function() {
        var values = arguments[0];
        if ((this.graphics && arguments.length > 0 && arguments[0] && arguments[0].x && arguments[0].y) || arguments.length > 4 && arguments[4]) {
            var stroke = ((arguments.length > 1 && arguments[1]) ? arguments[1] : gogisApplication.HIGHLIGHT_SIZE);
            var color = ((arguments.length > 2 && arguments[2]) ? arguments[2] : gogisApplication.HIGHLIGHT_BORDERCOLOR);
            var bgColor = ((arguments.length > 3 && arguments[3]) ? arguments[3] : gogisApplication.HIGHLIGHT_BGCOLOR);
            var extension = ((arguments.length > 4 && arguments[4]) ? arguments[4] : null);
            var strokeCorr = stroke / 2;
            try {
                if (GogisGraphics.hasCanvasSupport) {
                    if ((values && values.x.length > 1 && values.y.length > 1) || (extension && extension.length >= 1)) {
                        this.graphics.beginPath();
                        if (values && values.x.length > 1 && values.y.length > 1) {
                            this.graphics.moveTo(values.x[0] + strokeCorr, values.y[0] + strokeCorr);
                            for (var i = 0; i < values.x.length; i++) {
                                this.graphics.lineTo(values.x[i] + strokeCorr, values.y[i] + strokeCorr);
                            }
                        }
                        if (extension && extension.length >= 1) {
                            for (var i = 0; i < extension.length; i++) {
                                this.graphics.moveTo(extension[i].x[0] + strokeCorr, extension[i].y[0] + strokeCorr);
                                for (var j = 0; j < extension[i].x.length; j++) {
                                    this.graphics.lineTo(extension[i].x[j] + strokeCorr, extension[i].y[j] + strokeCorr);
                                }
                            }
                        }
                        if (bgColor != "-1") {
                            this.graphics.fillStyle = bgColor;
                            this.graphics.fill();
                            this.graphics.beginPath();
                            if (values && values.x.length > 1 && values.y.length > 1) {
                                this.graphics.moveTo(values.x[0] + strokeCorr, values.y[0] + strokeCorr);
                                for (var i = 0; i < values.x.length; i++) {
                                    this.graphics.lineTo(values.x[i] + strokeCorr, values.y[i] + strokeCorr);
                                }
                            }
                            if (extension && extension.length >= 1) {
                                for (var i = 0; i < extension.length; i++) {
                                    this.graphics.moveTo(extension[i].x[0] + strokeCorr, extension[i].y[0] + strokeCorr);
                                    for (var j = 0; j < extension[i].x.length; j++) {
                                        this.graphics.lineTo(extension[i].x[j] + strokeCorr, extension[i].y[j] + strokeCorr);
                                    }
                                }
                            }
                        }
                        this.graphics.lineJoin = "round";
                        this.graphics.lineCap = "round";
                        this.graphics.lineWidth = stroke;
                        this.graphics.strokeStyle = color;
                        this.graphics.stroke();
                    }
                } else {
                    this.graphics.setStroke(stroke);
                    if (bgColor != "-1") {
                        this.graphics.setColor(bgColor);
                        this.graphics.fillPolygon(values.x, values.y);
                    }
                    this.graphics.setColor(color);
                    this.graphics.drawPolyline(values.x, values.y);
                    this.graphics.paint();
                }
            } catch (e) {}
        }
    };
    this.drawText = function() {};
    this.drawImage = function() {};
}

function kaXmlOverlay(oKaMap, zIndex) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'kaXmlOverlay';
    for (var p in kaTool.prototype) {
        if (!kaXmlOverlay.prototype[p]) kaXmlOverlay.prototype[p] = kaTool.prototype[p];
    }
    this.urlBase = this.kaMap.server;
    this.urlBase += (this.urlBase != '' && this.urlBase.substring(-1) != '/') ? '' : '/';
    this.ovrObjects = new Array();
    this.z_index = zIndex;
    this.overlayCanvas = this.kaMap.createDrawingCanvas(zIndex);
    this.overlayCanvas.style.width = '1px';
    this.overlayCanvas.style.height = '1px';
    this.maxExtents = null;
    this.overlayEventMap = null;
    this.overlayEventImage = null;
    this.overlayEventMapImageMap = null;
    this.overlayEventMapCanvas = null;
    this.overlayEvents = null;
    this.overlayEventMapObserver = new GogisQueueManager("myXmlOverlay.overlayEventMapObserver", gogisApplication.UPDATEOVERLAY_EVENTMAP_DELAYTIME);
}
kaXmlOverlay.prototype.init = function(maxExtents) {
    this.maxExtents = maxExtents;
    this.overlayEventMap = document.createElement('div');
    this.overlayEventMap.id = "OverlayEventMap";
    this.overlayEventMap.style.position = 'absolute';
    this.overlayEventMap.style.width = '1px';
    this.overlayEventMap.style.height = '1px';
    this.overlayEventMap.style.left = '0px';
    this.overlayEventMap.style.top = '0px';
    this.kaMap.addObjectGeo(this.overlayCanvas, maxExtents[0], maxExtents[3], this.overlayEventMap);
};
kaXmlOverlay.prototype.scaleChanged = function(eventID, mapName) {
    myOverlayGraphics.singleGraphicsObserver.reset();
    this.overlayEventMapObserver.reset();
    this.unregisterOverlayEventMapArea(null);
    this.removeOverlayEventMap();
    if (this.ovrObjects == null) return;
    for (var i = 0; i < this.ovrObjects.length; i++) {
        if (this.ovrObjects[i]) this.ovrObjects[i].rescale();
    }
    this.overlayEventMapObserver.enqueue("myXmlOverlay.updateOverlayEventMapArea", "myXmlOverlay.updateOverlayEventMapArea", null, null);
    myOverlayGraphics.singleGraphicsObserver.enqueue("myOverlayGraphics.updateGraphics", "myOverlayGraphics.updateGraphics", null, null);
    if (this.overlayCanvas) this.overlayCanvas.style.visibility = "visible";
};
kaXmlOverlay.prototype.getOverlayEventMap = function() {
    if (this.overlayEventImage == null) {
        var tmp_width = parseInt(Math.abs(this.maxExtents[2] - this.maxExtents[0]) / this.kaMap.cellSize);
        var tmp_height = parseInt(Math.abs(this.maxExtents[3] - this.maxExtents[1]) / this.kaMap.cellSize);
        this.overlayEventImage = document.createElement('img');
        this.overlayEventImage.src = "kamap/images/a_pixel.gif";
        this.overlayEventImage.width = tmp_width;
        this.overlayEventImage.height = tmp_height;
        this.overlayEventImage.border = 0;
        this.overlayEventMapImageMap = document.createElement('map');
        this.overlayEventMapImageMap.name = "OverlayEventMapImageMap" + (new Date()).getTime();
        this.overlayEventMapImageMap.id = this.overlayEventMapImageMap.name;
        this.overlayEventMapCanvas = document.createElement('div');
        this.overlayEventMapCanvas.id = "OverlayEventMapCanvas";
        this.overlayEventMapCanvas.style.position = 'absolute';
        this.overlayEventMapCanvas.style.width = tmp_width + 'px';
        this.overlayEventMapCanvas.style.height = tmp_height + 'px';
        this.overlayEventMapCanvas.style.left = '0px';
        this.overlayEventMapCanvas.style.top = '0px';
        this.overlayEventMapCanvas.style.zIndex = '-1';
        this.overlayEventMapCanvas.style.opacity = gogisApplication.HIGHLIGHT_OPACITY / 100;
        this.overlayEventMapCanvas.style.mozOpacity = gogisApplication.HIGHLIGHT_OPACITY / 100;
        this.overlayEventMapCanvas.style.filter = 'Alpha(opacity=' + gogisApplication.HIGHLIGHT_OPACITY + ')';
        this.overlayEventMap.appendChild(this.overlayEventMapCanvas);
        this.overlayEventMap.appendChild(this.overlayEventImage);
        this.overlayEventMap.appendChild(this.overlayEventMapImageMap);
        this.overlayEventImage.useMap = '#' + this.overlayEventMapImageMap.name;
        this.overlayEventImage.style.cursor = this.kaMap.theInsideLayer.style.cursor;
    }
    return this.overlayEventMap;
};
kaXmlOverlay.prototype.removeOverlayEventMap = function() {
    if (this.overlayEventImage != null && this.overlayEventMap != null) {
        this.overlayEventImage.useMap = "";
        this.overlayEventMap.removeChild(this.overlayEventMapImageMap);
        this.overlayEventMapImageMap = null;
        this.overlayEventMap.removeChild(this.overlayEventImage);
        this.overlayEventImage = null;
        this.overlayEventMap.removeChild(this.overlayEventMapCanvas);
        this.overlayEventMapCanvas = null;
    }
};
kaXmlOverlay.prototype.registerOverlayEventMapArea = function(area) {
    if (this.overlayEvents == null) this.overlayEvents = new Array();
    this.overlayEvents.push(area);
};
kaXmlOverlay.prototype.updateOverlayEventMapArea = function() {
    myXmlOverlay.removeOverlayEventMap();
    if (this.overlayEvents && this.overlayEvents.length) {
        myXmlOverlay.getOverlayEventMap();
        for (var i = this.overlayEvents.length; i-- > 0;) {
            this.overlayEventMapImageMap.appendChild(this.overlayEvents[i]);
        }
    }
};
kaXmlOverlay.prototype.unregisterOverlayEventMapArea = function(areaId) {
    if (areaId > "") {
        var tmp_area;
        var tmp_count = 0;
        if (this.overlayEvents && this.overlayEvents.length) {
            for (var i = this.overlayEvents.length; i-- > 0;) {
                if (this.overlayEvents[i].name == areaId) {
                    tmp_area = this.overlayEvents[i];
                    this.overlayEvents.splice(i, 1);
                    tmp_count++;
                    if (tmp_count >= tmp_area.meta.xn.length) break;
                }
            }
        }
    } else this.overlayEvents = null;
};
kaXmlOverlay.prototype.getPointOffsetX = function(lon) {
    return parseInt((lon - this.maxExtents[0]) / this.kaMap.cellSize);
};
kaXmlOverlay.prototype.getPointOffsetY = function(lat) {
    return parseInt((this.maxExtents[3] - lat) / this.kaMap.cellSize);
};
kaXmlOverlay.prototype.remove = function() {
    this.removePoint();
    this.kaMap.removeDrawingCanvas(this.overlayCanvas);
};
kaXmlOverlay.prototype.loadJsonDoc = function(data) {
    myOverlayGraphics.singleGraphicsObserver.reset();
    this.overlayEventMapObserver.reset();
    var points = data.overlay;
    var np, p;
    for (var i = 0; i < points.length; i++) {
        p = points[i].point[0];
        np = this.getPointObject(p.id);
        if (np == null) {
            np = new kaXmlPoint(p.id, this, !(p.polygon || p.linestring) || p.label);
            this.ovrObjects.push(np);
            np.parse(p);
        }
    }
    this.overlayEventMapObserver.enqueue("myXmlOverlay.updateOverlayEventMapArea", "myXmlOverlay.updateOverlayEventMapArea", null, null);
    myOverlayGraphics.singleGraphicsObserver.enqueue("myOverlayGraphics.updateGraphics", "myOverlayGraphics.updateGraphics", null, null);
};
kaXmlOverlay.prototype.getDiv = function(pid) {
    var div_id = this.getDivId(pid);
    return getRawObject(div_id);
};
kaXmlOverlay.prototype.getPointObject = function(pid) {
    for (var i = 0; i < this.ovrObjects.length; i++) {
        if (this.ovrObjects[i] != null && this.ovrObjects[i].pid == pid) {
            return this.ovrObjects[i];
        }
    }
    return null;
};
kaXmlOverlay.prototype.getDivId = function(pid) {
    return 'xmlovr_' + pid + '_div';
};
kaXmlOverlay.prototype.removePoint = function(pid) {
    this.removeOverlayEventMap();
    if ((this.removePoint.arguments.length < 1) || (pid == null)) {
        myOverlayGraphics.reset();
        for (var i = this.ovrObjects.length; i-- > 0;) {
            if (this.ovrObjects[i] != null) {
                this.ovrObjects[i].removeFromMap();
                delete this.ovrObjects[i];
                this.ovrObjects[i] = null;
            }
            this.ovrObjects.splice(i, 1);
        }
    } else {
        myOverlayGraphics.singleGraphicsObserver.reset();
        this.overlayEventMapObserver.reset();
        for (var i = this.ovrObjects.length; i-- > 0;) {
            if (this.ovrObjects[i] != null) {
                if (this.ovrObjects[i].pid.indexOf(pid) >= 0) {
                    myOverlayGraphics.removeGeometry(this.ovrObjects[i].pid);
                    this.unregisterOverlayEventMapArea(this.ovrObjects[i].pid);
                    this.ovrObjects[i].removeFromMap();
                    delete this.ovrObjects[i];
                    this.ovrObjects[i] = null;
                    this.ovrObjects.splice(i, 1);
                }
            } else this.ovrObjects.splice(i, 1);
        }
        this.overlayEventMapObserver.enqueue("myXmlOverlay.updateOverlayEventMapArea", "myXmlOverlay.updateOverlayEventMapArea", null, null);
        myOverlayGraphics.singleGraphicsObserver.enqueue("myOverlayGraphics.updateGraphics", "myOverlayGraphics.updateGraphics", null, null);
    }
};

function kaXmlGraphicElement() {};
kaXmlGraphicElement.prototype.parseElement = function(point, domElement) {};
kaXmlGraphicElement.prototype.draw = function(point) {};
kaXmlGraphicElement.prototype.rescale = function(point) {};
kaXmlGraphicElement.prototype.remove = function(point) {};

function kaXmlSymbol() {
    kaXmlGraphicElement.apply(this);
    kaXmlSymbol.prototype['draw'] = kaXmlSymbol.prototype['draw_js'];
    for (var p in kaXmlGraphicElement.prototype) {
        if (!kaXmlSymbol.prototype[p]) kaXmlSymbol.prototype[p] = kaXmlGraphicElement.prototype[p];
    }
    this.shape = "bullet";
    this.size = 10;
    this.stroke = 1;
    this.color = null;
    this.bcolor = null;
    this.opacity = 1;
    this.canvas = null;
    this.ldiv = null;
};
kaXmlSymbol.prototype.remove = function(point) {
    this.canvas = null;
    this.ldiv = null;
};
kaXmlSymbol.prototype.parseElement = function(point, data) {
    this.shape = data.shape;
    this.size = parseInt(data.size);
    var c = data.color;
    if (c != null) this.color = c;
    c = data.bcolor;
    if (c != null) this.bcolor = c;
    c = parseFloat(data.opacity);
    if (!isNaN(c)) this.opacity = c;
    c = parseInt(data.stroke);
    if (!isNaN(c)) this.stroke = c;
    c = parseInt(data.symbolscale);
    if (!isNaN(c)) this.symbolscale = c;
};
kaXmlSymbol.prototype.draw_js = function(point) {
    var jsgObject = new jsGraphics(point.divId);
    var d = this.size / 2;
    jsgObject.setStroke(this.stroke);
    if (this.shape == 'square') {
        if (this.color) {
            jsgObject.setColor(this.color);
            jsgObject.fillRect(-d, -d, this.size, this.size);
        }
        if (this.bcolor) {
            jsgObject.setColor(this.bcolor);
            jsgObject.fillRect(-d, -d, this.size, this.size);
        }
    } else {
        if (this.color) {
            jsgObject.setColor(this.color);
            jsgObject.fillEllipse(-d, -d, this.size, this.size);
        }
        if (this.bcolor) {
            jsgObject.setColor(this.bcolor);
            jsgObject.drawEllipse(-d, -d, this.size, this.size);
        }
    }
    jsgObject.paint();
};

function kaXmlFeature(point) {
    kaXmlGraphicElement.apply(this);
    for (var p in kaXmlGraphicElement.prototype) {
        if (!kaXmlFeature.prototype[p]) kaXmlFeature.prototype[p] = kaXmlGraphicElement.prototype[p];
    }
    this.stroke = 1;
    this.color = null;
    this.bcolor = null;
    this.opacity = 1;
    this.cxmin = null;
    this.cymax = null;
    this.cymin = null;
    this.cxmax = null;
    this.cxminTot = 0;
    this.cymaxTot = 0;
    this.cyminTot = 0;
    this.cxmaxTot = 0;
    this.coords = "";
    this.img = null;
    this.canvas = null;
    this.ldiv = null;
    this.xn = null;
    this.yn = null;
    var map = point.xml_overlay.kaMap.getCurrentMap();
    var scales = map.getScales();
    this.maxScale = scales[scales.length - 1];
    this.mcs = point.xml_overlay.kaMap.cellSize / (point.xml_overlay.kaMap.getCurrentScale() / this.maxScale);
};
kaXmlFeature.prototype.remove = function(point) {
    this.img = null;
    this.canvas = null;
    this.ldiv = null;
    this.coords = null;
    this.xn.splice(0);
    this.yn.splice(0);
};
kaXmlFeature.prototype.parseElement = function(point, data) {
    var t = parseInt(data.stroke);
    if (!isNaN(t)) this.stroke = t;
    t = data.color;
    if (t != null) this.color = t;
    t = data.bcolor;
    if (t != null) this.bcolor = t;
    t = parseFloat(data.opacity);
    if (!isNaN(t)) this.opacity = t;
    t = parseInt(data.symbolscale);
    if (!isNaN(t)) this.symbolscale = t;
    if (data.value != null) this.readCoordinates(point, data.value);
};
kaXmlFeature.prototype.readCoordinates = function(point, text) {
    var pp, i, j;
    var xy, x, y;
    var cx = new Array();
    var cy = new Array();
    this.cxmin = new Array();
    this.cymin = new Array();
    this.cxmax = new Array();
    this.cymax = new Array();
    this.cxminTot = 999999999;
    this.cyminTot = 999999999;
    this.cxmaxTot = -999999999;
    this.cymaxTot = -999999999;
    this.xn = new Array();
    this.yn = new Array();
    point.coords = new Array();
    point.extension = new Array();
    var ft = text.trim().split('|');
    for (i = 0; i < ft.length; i++) {
        this.cxmin.push(999999999);
        this.cymin.push(999999999);
        this.cxmax.push(-999999999);
        this.cymax.push(-999999999);
        pp = ft[i].trim().split(',');
        if (i > 0) point.extension.push(new Array());
        cx.push(new Array());
        cy.push(new Array());
        this.xn.push(new Array());
        this.yn.push(new Array());
        for (j = 0; j < pp.length; j++) {
            xy = pp[j].trim().split(' ');
            x = parseFloat(xy[0]);
            y = parseFloat(xy[1]);
            if (x < this.cxmin[i]) this.cxmin[i] = x;
            else if (x > this.cxmax[i]) this.cxmax[i] = x;
            if (y < this.cymin[i]) this.cymin[i] = y;
            else if (y > this.cymax[i]) this.cymax[i] = y;
            if (x < this.cxminTot) this.cxminTot = x;
            else if (x > this.cxmaxTot) this.cxmaxTot = x;
            if (y < this.cyminTot) this.cyminTot = y;
            else if (y > this.cymaxTot) this.cymaxTot = y;
            if (i == 0) {
                point.coords.push(xy);
            } else {
                point.extension[i - 1].push(xy);
            }
            cx[i].push(x);
            cy[i].push(y);
        }
    }
    for (i = 0; i < cx.length; i++) {
        for (j = 0; j < cx[i].length; j++) {
            this.xn[i].push((cx[i][j] - this.cxmin[i]) / this.mcs);
            this.yn[i].push((this.cymax[i] - cy[i][j]) / this.mcs);
        }
    }
};
kaXmlFeature.prototype.rescale = function(point) {
    this.draw(point, true);
};

function kaXmlLinestring(point) {
    kaXmlFeature.apply(this, [point]);
    kaXmlLinestring.prototype['draw'] = kaXmlLinestring.prototype['draw_js'];
    for (var p in kaXmlFeature.prototype) {
        if (!kaXmlLinestring.prototype[p]) kaXmlLinestring.prototype[p] = kaXmlFeature.prototype[p];
    }
};
kaXmlLinestring.prototype.draw_js = function(point) {
    var scf = point.xml_overlay.kaMap.getCurrentScale() / this.maxScale;
    for (var iSubFeature = 0; iSubFeature < this.xn.length; iSubFeature++) {
        var tmp_offsetX = point.xml_overlay.getPointOffsetX(this.cxmin[iSubFeature]) + 0.5;
        var tmp_offsetY = point.xml_overlay.getPointOffsetY(this.cymax[iSubFeature]) + 0.5;
        this.scalefact = this.symbolscale > 0 ? this.symbolscale / point.xml_overlay.kaMap.getCurrentScale() : 1;
        var mystroke = parseInt((this.stroke >= gogisApplication.HIGHLIGHT_SIZE ? this.stroke : gogisApplication.HIGHLIGHT_SIZE) * this.scalefact / 2) + 2;
        var tmp_coords = new StringBuffer();
        tmp_coords.append(parseInt(((this.xn[iSubFeature][0] / scf) + tmp_offsetX) - mystroke) + "," + parseInt(((this.yn[iSubFeature][0] / scf) + tmp_offsetY) - mystroke));
        for (i = 1; i < this.xn[iSubFeature].length; i++) {
            tmp_coords.append("," + parseInt(((this.xn[iSubFeature][i] / scf) + tmp_offsetX) - mystroke) + "," + parseInt(((this.yn[iSubFeature][i] / scf) + tmp_offsetY) - mystroke));
        }
        for (i = this.xn[iSubFeature].length - 1; i >= 0; i--) {
            tmp_coords.append("," + parseInt(((this.xn[iSubFeature][i] / scf) + tmp_offsetX) + mystroke) + "," + parseInt(((this.yn[iSubFeature][i] / scf) + tmp_offsetY) + mystroke));
        }
        var elArea = document.createElement("area");
        elArea.shape = "poly";
        elArea.coords = tmp_coords;
        elArea.noHref = true;
        elArea.id = point.pid;
        elArea.name = point.pid;
        elArea.type = gogisGeoObjects.GEOMETRY_LINE;
        elArea.meta = this;
        var params = point.pid.split("||");
        var layer = (myKaMap.getCurrentMap().getLayer(params[0]));
        if (browser_isMultitouch) {
            if (layer.highlight || ((layer.objectId > "") && (layer.tooltip || layer.hotspot))) {
                elArea.ontouchstart = function(e) {
                    myHotspot.touchstart(e, this);
                };
                elArea.ontouchend = function(e) {
                    myHotspot.touchend(e, this);
                };
            }
        } else {
            if (layer.highlight || ((layer.objectId > "") && layer.tooltip)) {
                elArea.onmouseover = function(e) {
                    myHotspot.over(e, this);
                };
                elArea.onmouseout = function(e) {
                    myHotspot.out(e, this);
                };
                if (layer.tooltip) elArea.onmousemove = function(e) {
                    myHotspot.move(e, this);
                };
            }
            if (layer.objectId > "" && layer.hotspot) {
                elArea.onclick = function(e) {
                    myHotspot.click(e, this)
                };
            }
        }
        point.xml_overlay.registerOverlayEventMapArea(elArea);
    }
    if (layer.graphics && arguments.length == 1) {
        var geometry = new Object();
        geometry.persistence = gogisGeoObjects.PERSISTENCE_TMP;
        geometry.status = gogisGeoObjects.STATUS_READONLY;
        geometry.id = point.pid;
        geometry.points = point.coords;
        geometry.extension = point.extension;
        geometry.type = gogisGeoObjects.GEOMETRY_LINE;
        geometry.opacity = 100 - (this.opacity * 100);
        geometry.size = (this.stroke * this.scalefact) + 0.5;
        geometry.color = this.color;
        geometry.disableEvents = true;
        geometry.extent = new Object();
        geometry.extent.minx = this.cxminTot;
        geometry.extent.miny = this.cyminTot;
        geometry.extent.maxx = this.cxmaxTot;
        geometry.extent.maxy = this.cymaxTot;
        myOverlayGraphics.addGeometry(geometry);
    }
};

function kaXmlPolygon(point) {
    kaXmlFeature.apply(this, [point]);
    kaXmlPolygon.prototype['draw'] = kaXmlPolygon.prototype['draw_js'];
    for (var p in kaXmlFeature.prototype) {
        if (!kaXmlPolygon.prototype[p]) kaXmlPolygon.prototype[p] = kaXmlFeature.prototype[p];
    }
};
kaXmlPolygon.prototype.draw_js = function(point) {
    var scf = point.xml_overlay.kaMap.getCurrentScale() / this.maxScale;
    for (var iSubFeature = 0; iSubFeature < this.xn.length; iSubFeature++) {
        var tmp_offsetX = point.xml_overlay.getPointOffsetX(this.cxmin[iSubFeature]) + (1 / scf) + 0.5;
        var tmp_offsetY = point.xml_overlay.getPointOffsetY(this.cymax[iSubFeature]) + (1 / scf) + 0.5;
        var tmp_coords = new StringBuffer();
        tmp_coords.append(parseInt(((this.xn[iSubFeature][0]) / scf) + tmp_offsetX) + "," + parseInt(((this.yn[iSubFeature][0]) / scf) + tmp_offsetY));
        for (i = 1; i < this.xn[iSubFeature].length; i++) {
            tmp_coords.append("," + parseInt(((this.xn[iSubFeature][i]) / scf) + tmp_offsetX) + "," + parseInt(((this.yn[iSubFeature][i]) / scf) + tmp_offsetY));
        }
        var elArea = document.createElement("area");
        elArea.shape = "poly";
        elArea.coords = tmp_coords.toString();
        elArea.noHref = true;
        elArea.id = point.pid;
        elArea.name = point.pid;
        elArea.type = gogisGeoObjects.GEOMETRY_POLYGON;
        this.scalefact = this.symbolscale > 0 ? this.symbolscale / point.xml_overlay.kaMap.getCurrentScale() : 1;
        elArea.meta = this;
        var params = point.pid.split("||");
        var layer = (myKaMap.getCurrentMap().getLayer(params[0]));
        if (browser_isMultitouch) {
            if (layer.highlight || ((layer.objectId > "") && (layer.tooltip || layer.hotspot))) {
                elArea.ontouchstart = function(e) {
                    myHotspot.touchstart(e, this);
                };
                elArea.ontouchend = function(e) {
                    myHotspot.touchend(e, this);
                };
            }
        } else {
            if (layer.highlight || ((layer.objectId > "") && layer.tooltip)) {
                elArea.onmouseover = function(e) {
                    myHotspot.over(e, this);
                };
                elArea.onmouseout = function(e) {
                    myHotspot.out(e, this);
                };
                if (layer.tooltip) elArea.onmousemove = function(e) {
                    myHotspot.move(e, this);
                };
            }
            if (layer.objectId > "" && layer.hotspot) {
                elArea.onclick = function(e) {
                    myHotspot.click(e, this)
                };
            }
        }
        point.xml_overlay.registerOverlayEventMapArea(elArea);
    }
    if (layer.graphics && arguments.length == 1) {
        var geometry = new Object();
        geometry.persistence = gogisGeoObjects.PERSISTENCE_TMP;
        geometry.status = gogisGeoObjects.STATUS_READONLY;
        geometry.id = point.pid;
        geometry.points = point.coords;
        geometry.extension = point.extension;
        geometry.type = gogisGeoObjects.GEOMETRY_POLYGON;
        geometry.opacity = 100 - (this.opacity * 100);
        geometry.size = (this.stroke * this.scalefact) + 0.5;
        geometry.color = this.bcolor;
        geometry.bgcolor = this.color;
        geometry.disableEvents = true;
        geometry.extent = new Object();
        geometry.extent.minx = this.cxminTot;
        geometry.extent.miny = this.cyminTot;
        geometry.extent.maxx = this.cxmaxTot;
        geometry.extent.maxy = this.cymaxTot;
        myOverlayGraphics.addGeometry(geometry);
    }
};

function kaXmlLabel() {
    kaXmlGraphicElement.apply(this);
    for (var p in kaXmlGraphicElement.prototype) {
        if (!kaXmlLabel.prototype[p]) kaXmlLabel.prototype[p] = kaXmlGraphicElement.prototype[p];
    }
    this.text = "";
    this.fstyle = "normal";
    this.fweight = "normal";
    this.color = "black";
    this.boxcolor = null;
    this.w = 0;
    this.h = 0;
    this.xoff = 0;
    this.yoff = 0;
    this.pos = 109;
    this.fsize = "10px";
    this.font = "Arial";
    this.ldiv = null;
    this.ltxt = null;
};
kaXmlLabel.prototype.remove = function(point) {
    this.canvas = null;
    this.ldiv = null;
    this.ltxt = null;
};
kaXmlLabel.prototype.parseElement = function(point, data) {
    if (data.value != null) this.text = data.value;
    var t = data.fstyle;
    if (t != null) this.fstyle = t;
    t = data.fweight;
    if (t != null) this.fweight = t;
    t = data.color;
    if (t != null) this.color = t;
    t = data.boxcolor;
    if (t != -255 && t != -1 && t != null) this.boxcolor = t;
    t = parseInt(data.w);
    if (!isNaN(t)) this.w = t;
    t = parseInt(data.h);
    if (!isNaN(t)) this.h = t;
    t = parseInt(data.px);
    if (!isNaN(t)) this.xoff = t;
    else this.xoff = 0;
    t = parseInt(data.py);
    if (!isNaN(t)) this.yoff = t;
    else this.yoff = 0;
    t = parseInt(data.pos);
    if (!isNaN(t) && t > 100 && t <= 109) this.pos = t;
    else this.pos = 109;
    t = data.fsize;
    if (t != null) this.fsize = t;
    t = data.font;
    if (t != null) this.font = t;
    t = parseInt(data.symbolscale);
    if (!isNaN(t)) this.symbolscale = t;
};
kaXmlLabel.prototype.draw = function(point) {
    this.ldiv = document.createElement('div');
    this.ldiv.style.fontFamily = this.font;
    this.ldiv.style.fontSize = this.fsize;
    this.ldiv.style.fontStyle = this.fstyle;
    this.ldiv.style.fontWeight = this.fweight;
    this.ldiv.style.textAlign = 'center';
    this.ldiv.style.color = this.color;
    this.ldiv.style.position = 'absolute';
    this.ldiv.style.padding = 2 * gogisApplication.HIGHLIGHT_SIZE + 'px';
    this.ldiv.style.borderColor = gogisApplication.HIGHLIGHT_BORDERCOLOR;
    this.ldiv.style.borderWidth = gogisApplication.HIGHLIGHT_SIZE + "px";
    this.ldiv.style.borderStyle = "none";
    if (this.boxcolor != null) this.ldiv.style.backgroundColor = this.boxcolor;
    if (this.w > 0) this.ldiv.style.width = this.w + 'px';
    else this.ldiv.style.whiteSpace = 'nowrap';
    if (this.h > 0) this.ldiv.style.height = this.h + 'px';
    this.ltxt = document.createTextNode(this.text);
    this.ldiv.appendChild(this.ltxt);
    point.div.appendChild(this.ldiv);
    this.ldiv.style.left = this.xoff + this.getPosOffsetX(this.pos, getObjectWidth(this.ldiv) - parseInt(this.ldiv.style.padding)) - gogisApplication.HIGHLIGHT_SIZE + 'px';
    this.ldiv.style.top = this.yoff + this.getPosOffsetY(this.pos, getObjectHeight(this.ldiv) - parseInt(this.ldiv.style.padding)) - gogisApplication.HIGHLIGHT_SIZE + 'px';
    this.ldiv.name = point.pid;
    this.ldiv.type = gogisGeoObjects.GEOMETRY_ICON;
    this.ldiv.canvas = this.ldiv;
    var params = point.pid.split("||");
    var layer = (myKaMap.getCurrentMap().getLayer(params[0]));
    if (browser_isMultitouch) {
        if (layer.highlight || ((layer.objectId > "") && (layer.tooltip || layer.hotspot))) {
            this.ldiv.ontouchstart = function(e) {
                myHotspot.touchstart(e, this);
            };
            this.ldiv.ontouchend = function(e) {
                myHotspot.touchend(e, this);
            };
        }
    } else {
        if (layer.highlight || ((layer.objectId > "") && layer.tooltip)) {
            this.ldiv.onmouseover = function(e) {
                myHotspot.over(e, this);
            };
            this.ldiv.onmouseout = function(e) {
                myHotspot.out(e, this);
            };
        }
        if (layer.objectId > "" && layer.hotspot) {
            this.ldiv.onclick = function(e) {
                myHotspot.click(e, this)
            };
        }
    }
};
kaXmlLabel.prototype.getPosOffsetX = function(pos, width) {
    if (pos == 101) return -width;
    else if (pos == 102) return 0;
    else if (pos == 103) return 0;
    else if (pos == 104) return -width;
    else if (pos == 105) return 0;
    else if (pos == 106) return -width;
    else if (pos == 107) return -width / 2;
    else if (pos == 108) return -width / 2;
    else return -width / 2;
};
kaXmlLabel.prototype.getPosOffsetY = function(pos, height) {
    if (pos == 101) return -height;
    else if (pos == 102) return 0;
    else if (pos == 103) return -height;
    else if (pos == 104) return 0;
    else if (pos == 105) return -height / 2;
    else if (pos == 106) return -height / 2;
    else if (pos == 107) return -height;
    else if (pos == 108) return 0;
    else return -height / 2;
};

function kaXmlIcon() {
    kaXmlGraphicElement.apply(this);
    kaXmlIcon.prototype['draw'] = kaXmlIcon.prototype['draw_plain'];
    for (var p in kaXmlGraphicElement.prototype) {
        if (!kaXmlIcon.prototype[p]) kaXmlIcon.prototype[p] = kaXmlGraphicElement.prototype[p];
    }
    kaXmlIcon.prototype['rescale'] = kaXmlIcon.prototype['rescale_plain'];
    this.icon_w = 0;
    this.icon_h = 0;
    this.xoff = 0;
    this.yoff = 0;
    this.rot = 0;
    this.ldiv = null;
    this.img = null;
    this.canvas = null;
};
kaXmlIcon.prototype.remove = function(point) {
    this.ldiv = null;
    this.canvas = null;
    if (this.img) this.img.onload = null;
    this.img = null;
};
kaXmlIcon.prototype.parseElement = function(point, data) {
    if (data.color != -255 && data.color != -1 && data.color != null) this.color = data.color;
    if (data.bcolor != -255 && data.bcolor != -1 && data.bcolor != null) this.bcolor = data.bcolor;
    this.img = document.createElement('img');
    this.img.isImage = data.isImage;
    this.img.showBorder = (data.isImage ? (this.color || this.bcolor) : false);
    this.img.src = data.src;
    if (data.isImage && !(this.img.width > 0)) {
        this.img.icon = this;
        this.img.point = point;
        this.img.onload = function(e) {
            this.icon.icon_w = this.width;
            this.icon.icon_h = this.height;
            this.icon.draw(this.point);
        };;
    } else {
        this.icon_w = parseInt(this.img.width > 0 ? this.img.width : data.w);
        this.icon_h = parseInt(this.img.height > 0 ? this.img.height : data.h);
    }
    if (!isNaN(data.px)) this.xoff = data.px;
    if (!isNaN(data.py)) this.yoff = data.py;
    if (!isNaN(data.symbolscale)) this.symbolscale = data.symbolscale;
};
kaXmlIcon.prototype.draw_plain = function(point) {
    if (this.icon_w == 0 || this.icon_h == 0) return;
    var scalefact = this.symbolscale > 0 ? this.symbolscale / point.xml_overlay.kaMap.getCurrentScale() : 1;
    var dx = -parseInt(this.icon_w * scalefact / 2) + parseInt(this.xoff * scalefact) - (2 * gogisApplication.HIGHLIGHT_SIZE);
    var dy = -parseInt(this.icon_h * scalefact / 2) + parseInt(this.yoff * scalefact) - (2 * gogisApplication.HIGHLIGHT_SIZE);
    this.ldiv = document.createElement('div');
    this.ldiv.style.position = 'absolute';
    this.ldiv.style.top = dy + 'px';
    this.ldiv.style.left = dx + 'px';
    this.ldiv.style.padding = 2 * gogisApplication.HIGHLIGHT_SIZE + 'px';
    this.ldiv.style.borderWidth = gogisApplication.HIGHLIGHT_SIZE + "px";
    this.ldiv.style.borderStyle = "none";
    this.img.width = parseInt(this.icon_w * scalefact);
    this.img.height = parseInt(this.icon_h * scalefact);
    this.ldiv.appendChild(this.img);
    point.div.appendChild(this.ldiv);
    this.img.name = point.pid;
    this.img.type = gogisGeoObjects.GEOMETRY_ICON;
    this.img.canvas = this.ldiv;
    var params = point.pid.split("||");
    var layer = (myKaMap.getCurrentMap().getLayer(params[0]));
    if (browser_isMultitouch) {
        if (layer.highlight || ((layer.objectId > "") && (layer.tooltip || layer.hotspot))) {
            this.img.ontouchstart = function(e) {
                myHotspot.touchstart(e, this);
            };
            this.img.ontouchend = function(e) {
                myHotspot.touchend(e, this);
            };
        }
    } else {
        if (layer.highlight || ((layer.objectId > "") && layer.tooltip)) {
            this.img.onmouseover = function(e) {
                myHotspot.over(e, this);
            };
            this.img.onmouseout = function(e) {
                myHotspot.out(e, this);
            };
        }
        if (layer.objectId > "" && layer.hotspot) {
            this.img.onclick = function(e) {
                myHotspot.click(e, this)
            };
        }
    }
    if (this.img.showBorder) {
        this.ldiv.style.padding = gogisApplication.HIGHLIGHT_SIZE + 'px';
        this.ldiv.style.borderStyle = "solid";
        this.ldiv.style.borderColor = (this.bcolor ? this.bcolor : "transparent");
        this.ldiv.style.color = gogisApplication.HIGHLIGHT_COLOR;
        this.ldiv.style.backgroundColor = (this.color ? this.color : "transparent");
    }
};
kaXmlIcon.prototype.rescale_plain = function(point) {
    if (!this.ldiv) return;
    var scalefact = this.symbolscale > 0 ? this.symbolscale / point.xml_overlay.kaMap.getCurrentScale() : 1;
    var dx = -parseInt(this.icon_w * scalefact / 2) + parseInt(this.xoff * scalefact) - (2 * gogisApplication.HIGHLIGHT_SIZE);
    var dy = -parseInt(this.icon_h * scalefact / 2) + parseInt(this.yoff * scalefact) - (2 * gogisApplication.HIGHLIGHT_SIZE);
    this.ldiv.style.top = dy + 'px';
    this.ldiv.style.left = dx + 'px';
    this.img.width = parseInt(this.icon_w * scalefact);
    this.img.height = parseInt(this.icon_h * scalefact);
};

function kaXmlPoint(pid, xml_overlay, hasDiv) {
    this.xml_overlay = xml_overlay;
    this.pid = pid;
    this.hasDiv = hasDiv;
    this.geox = 0;
    this.geoy = 0;
    this.shown = false;
    this.graphics = new Array();
    if (hasDiv) {
        this.divId = this.xml_overlay.getDivId(pid);
        this.div = document.createElement('div');
        this.div.setAttribute('id', this.divId);
    }
};
kaXmlPoint.prototype.placeOnMap = function(x, y) {
    if (this.hasDiv && !this.shown) {
        this.geox = x;
        this.geoy = y;
        this.xml_overlay.kaMap.addObjectGeo(this.xml_overlay.overlayCanvas, x, y, this.div);
        this.shown = true;
    }
};
kaXmlPoint.prototype.removeFromMap = function() {
    if (this.shown) {
        this.xml_overlay.kaMap.removeObject(this.div);
        this.shown = false;
    }
    for (var i = 0; i < this.graphics.length; i++) {
        this.graphics[i].remove(this);
    }
    this.graphics.splice(0);
    this.div = null;
    this.xml_overlay = null;
};
kaXmlPoint.prototype.setPosition = function(x, y) {
    if (this.shown) {
        this.geox = x;
        this.geoy = y;
        this.div.lat = y;
        this.div.lon = x;
    }
};
kaXmlPoint.prototype.addGraphic = function(obj) {
    this.graphics.push(obj);
    obj.draw(this);
};
kaXmlPoint.prototype.clear = function() {
    this.div.innerHTML = "";
    this.graphics.length = 0;
};
kaXmlPoint.prototype.parse = function(point_element) {
    var x = parseFloat(point_element.x);
    var y = parseFloat(point_element.y);
    var redraw = (point_element.redraw == "true");
    if (this.hasDiv) {
        if (!this.shown) {
            this.placeOnMap(x, y);
            this.shown = true;
        } else {
            this.setPosition(x, y);
            if (!redraw) return;
            this.clear();
        }
    }
    var t;
    var element = point_element.symbol;
    if (element) {
        t = new kaXmlSymbol();
        t.parseElement(this, element);
        this.addGraphic(t);
    }
    element = point_element.icon;
    if (element) {
        t = new kaXmlIcon();
        t.parseElement(this, element);
        this.addGraphic(t);
    }
    element = point_element.label;
    if (element) {
        t = new kaXmlLabel();
        t.parseElement(this, element);
        this.addGraphic(t);
    }
    element = point_element.linestring;
    if (element) {
        t = new kaXmlLinestring(this);
        t.parseElement(this, element);
        this.addGraphic(t);
    }
    element = point_element.polygon;
    if (element) {
        t = new kaXmlPolygon(this);
        t.parseElement(this, element);
        this.addGraphic(t);
    }
};
kaXmlPoint.prototype.rescale = function(point_element) {
    for (var i = 0; i < this.graphics.length; i++) {
        this.graphics[i].rescale(this, true);
    }
};

function GogisQueueManager(instance, timeOffset) {
    this.instance = instance;
    this.timeOffset = timeOffset;
    this.queue = new Array();
    GogisQueueManager.managers.push(this);
    this.enqueue = function(id, func, args, callback) {
        var task = new Object();
        task.id = id;
        task.func = func;
        task.args = args;
        task.callback = callback;
        task.status = GogisQueueManager.TASK_STATUS_INIT;
        task.thread = null;
        task.stackId = GogisQueueManager.currentStackId;
        GogisQueueManager.currentStackId++;
        GogisQueueManager.taskStack.push(task.stackId);
        this.queue.push(task);
        if (this.queue.length == 1) this.go();
        myProgressObserver.check();
    };
    this.go = function() {
        var task = this.next();
        if (task) {
            var action = "if(" + this.instance + ".task('" + task.id + "')){" + this.instance + ".task('" + task.id + "').status=GogisQueueManager.TASK_STATUS_EXECUTING;" + task.func + "(" + (task.args ? (this.instance + ".task('" + task.id + "').args") : "") + ");" + this.instance + ".task('" + task.id + "').status=GogisQueueManager.TASK_STATUS_FINISHED;" + this.instance + ".dequeue('" + task.id + "');" + this.instance + ".go();}";
            task.status = GogisQueueManager.TASK_STATUS_WAITING;
            task.thread = setTimeout(action, this.timeOffset);
        }
    };
    this.next = function() {
        var task;
        for (var i = 0; i < this.queue.length; i++) {
            task = this.queue[i];
            if (task && task.status == GogisQueueManager.TASK_STATUS_EXECUTING) {
                return null;
            } else if (task && task.status == GogisQueueManager.TASK_STATUS_INIT) {
                return task;
            }
        }
        return null;
    };
    this.task = function(id) {
        var task;
        for (var i = 0; i < this.queue.length; i++) {
            task = this.queue[i];
            if (task && id == task.id) return task;
        }
        return null;
    };
    this.dequeue = function(id) {
        var task;
        var restart = false;
        for (var i = this.queue.length - 1; i >= 0; i--) {
            task = this.queue[i];
            if (id == null || (task && id == task.id)) {
                GogisQueueManager.taskStack.pop(task.stackId);
                this.queue.splice(i, 1);
                if (task && task.status == GogisQueueManager.TASK_STATUS_WAITING) {
                    clearTimeout(task.thread);
                    restart = true;
                }
                if (id != null) {
                    if (task.callback && task.status == GogisQueueManager.TASK_STATUS_FINISHED) task.callback(id);
                }
            }
        }
        if (restart) this.go();
        myProgressObserver.check();
    };
    this.reset = function() {
        this.dequeue(null);
        this.queue = new Array();
    };
};
GogisQueueManager.currentStackId = 0;
GogisQueueManager.lastResetStackId = 0;
GogisQueueManager.taskStack = new Array();
GogisQueueManager.managers = new Array();
GogisQueueManager.resetAllTasks = function() {
    if (GogisQueueManager.lastResetId != GogisQueueManager.currentStackId) {
        for (var i = 0; i < GogisQueueManager.managers.length; i++) {
            GogisQueueManager.managers[i].reset();
        }
        GogisQueueManager.lastResetId = GogisQueueManager.currentStackId;
        GogisQueueManager.taskStack = new Array();
    }
};
GogisQueueManager.inProgress = function() {
    if (GogisQueueManager.taskStack.length > 0) return true;
    return false;
};
GogisQueueManager.TASK_STATUS_INIT = 0;
GogisQueueManager.TASK_STATUS_WAITING = 1;
GogisQueueManager.TASK_STATUS_EXECUTING = 2;
GogisQueueManager.TASK_STATUS_FINISHED = 3;

function GogisProgressObserver() {
    this.observers = new Array();
    this.statusInProgress = gLocalizer.localize('TOOLTIP_STATUS_ACTIVE');
    this.statusReady = gLocalizer.localize('TOOLTIP_STATUS_READY');
    if (browser_isMobile) {
        this.toastHtml = "<table cellspacing='0' cellpadding='0' border='0'>" + "<tr><td align='center'><img class='gogisMainProgressIcon' src='kamap/images/a_pixel.gif'></td></tr>" + "<tr><td align='center' class='gogisMainProgressLabel'>" + gLocalizer.localize("MESSAGE_LOADING_DATA") + "</td></tr>" + "</table>";
    }
    this.add = function(obj) {
        this.observers.push(obj)
    };
    this.check = function() {
        var inProgress = false;
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i].inProgress()) {
                inProgress = true;
                break;
            }
        }
        if (!inProgress) this.checkVersion();
        if (browser_isMobile) {
            if (inProgress) {
                if (myToaster) {
                    if (!myToaster.toastElement || myToaster.toastElement.style.display == "none") myToaster.showToast(this.toastHtml);
                    else {
                        myToaster.resetToastRelease();
                        myToaster.resetToastFadeout();
                    }
                }
            } else if (myToaster) {
                myToaster.releaseToast();
            }
        } else {
            if (!inProgress) {
                if (document.getElementById("gogisMainProgressIconActive").style.display == "inline") {
                    document.getElementById("gogisMainProgressIconFinished").style.display = "inline";
                    document.getElementById("gogisMainProgressIconActive").style.display = "none";
                    window.defaultStatus = this.statusReady;
                    window.status = this.statusReady;
                }
            } else if (document.getElementById("gogisMainProgressIconActive").style.display == "none") {
                document.getElementById("gogisMainProgressIconFinished").style.display = "none";
                document.getElementById("gogisMainProgressIconActive").style.display = "inline";
                window.defaultStatus = this.statusInProgress;
                window.status = this.statusInProgress;
            }
        }
    };
    this.versionRequestObj = new GogisRequestObject();
    this.versionRequestObj.action = handleCheckVersion;
    this.UPDATE_CHECK_INTERVAL = (gogisApplication.UPDATE_CHECK_INTERVAL ? gogisApplication.UPDATE_CHECK_INTERVAL : 1000 * 60 * 60);
    this.checkVersion = function() {
        var currentDate = new Date();
        if ((currentDate.getTime() - gogisLastUpdateCheck.getTime()) > this.UPDATE_CHECK_INTERVAL || gogisFirstUpdateCheck) {
            gogisLastUpdateCheck = currentDate;
            gogisFirstUpdateCheck = false;
            this.versionRequestObj.sendRequest('getVersion.php?t=' + currentDate.getTime());
        }
    };
}

function handleCheckVersion(response) {
    if (response && response.trim() > '' && !isNaN(response.trim()) && parseInt(response.trim()) != gogisCurrentVersion) {
        if (confirm(gLocalizer.localize('MESSAGE_UPDATE_AVAILABLE') + " [# " + response.trim() + "]:\n" + gLocalizer.localize('MESSAGE_UPDATE_APPLY') + "?")) {
            window.location.reload(true);
        }
    }
};

function GogisRequestObject() {
    var MainObject = this;
    var RequestObject = null;
    if (window.XMLHttpRequest) {
        try {
            RequestObject = new XMLHttpRequest();
        } catch (e) {}
    } else if (window.ActiveXObject) {
        try {
            RequestObject = new ActiveXObject("MSXML2.XMLHTTP");
        } catch (e) {
            try {
                RequestObject = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (RequestObject == null) {
        alert("Ihr Browser unterstützt leider kein Ajax.\n" + "Bitte verwenden Sie einen anderen Browser:\n" + "Firefox, Internet Explorer, Opera, Safari");
    } else this.requestObject = RequestObject;
    this.action = function(response) {};
    this.handleResponse = function() {
        if (RequestObject.readyState == 4) {
            try {
                GogisRequestObject.requestStack.pop(MainObject.id);
            } catch (e) {}
            try {
                MainObject.action(RequestObject.responseText);
            } catch (e) {}
            try {
                myProgressObserver.check();
            } catch (e) {}
        }
    };
    this.sendRequest = function(url) {
        try {
            GogisRequestObject.requestStack.push(GogisRequestObject.currentId);
            MainObject.id = GogisRequestObject.currentId;
            GogisRequestObject.currentId++;
            try {
                myProgressObserver.check();
            } catch (e) {}
            RequestObject.open('get', url, true);
            RequestObject.onreadystatechange = this.handleResponse;
            RequestObject.send(null);
        } catch (e) {}
    };
    this.cancelRequest = function() {
        try {
            RequestObject.abort();
        } catch (e) {}
        try {
            myProgressObserver.check();
        } catch (e) {}
    };
}
GogisRequestObject.getFile = function(url) {
    var AJAX;
    if (window.XMLHttpRequest) {
        AJAX = new XMLHttpRequest();
    } else {
        AJAX = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (AJAX) {
        AJAX.open("GET", url, false);
        AJAX.send(null);
        return AJAX.responseText;
    } else {
        return false;
    }
};
GogisRequestObject.requestStack = new Array();
GogisRequestObject.currentId = 0;
GogisRequestObject.inProgress = function() {
    if (GogisRequestObject.requestStack.length > 0) return true;
    return false;
};

function GogisTooltipManager(application, localizer, instanceName, releaseTime) {
    this.application = application;
    this.localizer = localizer;
    this.instanceName = instanceName;
    this.releaseTime = releaseTime;
    this.tooltips = new Array();
    this.nextTooltipID = 0;
    this.isAppended = false;
    this.nextRelease = null;
    this.releaseThread = null;
    this.fadeoutThread = null;
    this.currentTooltip = null;
    this.currentPosX = null;
    this.currentPosY = null;
    this.graphicsPreWrapper = null;
    this.graphicsPreWrapper1 = null;
    this.graphicsPostWrapper = null;
    this.graphicsPostWrapper1 = null;
    this.tooltipCanvas = this.application.createDrawingCanvas(6000);
    this.tooltipCanvas.style.width = '1px';
    this.tooltipCanvas.style.height = '1px';
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.setAttribute('id', 'tooltipElement');
    this.getTooltip = function(url) {
        for (var i = 0; i < this.tooltips.length; i++) {
            if (this.tooltips[i].url == url) {
                return this.tooltips[i];
            }
        }
        return null;
    };
    this.newTooltip = function(url, posX, posY) {
        this.nextTooltipID++;
        var requestObj = new GogisRequestObject();
        var tooltip = new GogisTooltip(this, this.nextTooltipID, url, posX, posY);
        this.tooltips.push(tooltip);
        requestObj.action = tooltip.setContent;
        requestObj.sendRequest("gogis/php/getTooltip.php?" + url);
    };
    this.showTooltip = function(id, url, posX, posY) {
        this.currentPosX = posX;
        this.currentPosY = posY;
        var tooltip = this.getTooltip(url);
        if (tooltip != null) {
            if (id == -1) {
                this.resetTooltipRelease();
                this.resetTooltipFadeout();
                if (this.isAppended && tooltip.id == this.nextTooltipID) return;
                this.nextTooltipID++;
                tooltip.id = this.nextTooltipID;
            }
            var isVisible = (arguments.length < 5 || arguments[4]);
            if (isVisible) tooltip.firstTimeContent = null;
            if (this.nextRelease == null && tooltip.id == this.nextTooltipID && tooltip.content > "") {
                this.tooltipElement.style.visibility = "hidden";
                this.application.removeObject(this.tooltipElement);
                try {
                    this.tooltipElement.style.width = "1px";
                    this.tooltipElement.style.height = "1px";
                    document.getElementById("tooltipElementTable").style.width = "1px";
                } catch (e) {}
                var ttAction = this.setupGraphics(this.tooltipElement, (tooltip.firstTimeContent ? tooltip.firstTimeContent : tooltip.content));
                this.application.addObjectGeo(this.tooltipCanvas, posX, posY, this.tooltipElement);
                if (ttAction != "") {
                    try {
                        eval(ttAction);
                    } catch (e) {}
                }
                try {
                    this.tooltipElement.style.width = "auto";
                    this.tooltipElement.style.height = "auto";
                    document.getElementById("tooltipElementTable").style.width = "1px";
                } catch (e) {}
                var w = this.application.getObjectWidth(this.tooltipElement);
                var h = this.application.getObjectHeight(this.tooltipElement);
                if (this.defaultSize) {
                    if ((w - 60) < (h / 3) * 2) w = Math.round(((h / 3) * 2) + 60);
                    if (w > 600) w = 600;
                }
                var extent = this.application.getGeoExtents();
                var dx1 = Math.abs(posX - extent[0]);
                var dx2 = Math.abs(extent[2] - posX);
                var dy1 = Math.abs(posY - extent[1]);
                var dy2 = Math.abs(extent[3] - posY);
                var dw = 0;
                var dh = 0;
                var pos = 1;
                if (dx1 > dx2) {
                    dw = this.application.cellSize * parseInt(w);
                    pos = 2;
                }
                if (dy1 < dy2) {
                    dh = this.application.cellSize * parseInt(h);
                    pos += 2;
                }
                this.application.removeObject(this.tooltipElement);
                try {
                    this.tooltipElement.style.width = w + "px";
                    this.tooltipElement.style.height = h + "px";
                    document.getElementById("tooltipElementTable").style.width = w + "px";
                } catch (e) {}
                this.application.addObjectGeo(this.tooltipCanvas, posX - dw, posY + dh, this.tooltipElement);
                this.tooltipElement.onmouseover = this.onmouseover;
                this.tooltipElement.onmouseout = this.onmouseout;
                this.tooltipElement.onclick = this.onclick;
                this.setupPointer(pos);
                try {
                    this.tooltipElement.style.width = w + "px";
                    this.tooltipElement.style.height = h + "px";
                    document.getElementById("tooltipElementTable").style.width = w + "px";
                } catch (e) {}
                if (isVisible) this.tooltipElement.style.visibility = "visible";
                this.isAppended = true;
                this.currentTooltip = tooltip;
            }
        } else {
            this.removeTooltip();
            this.resetTooltipRelease();
            this.resetTooltipFadeout();
            this.newTooltip(url, posX, posY);
        }
    };
    this.hideTooltip = function() {
        try {
            if (((new Date()).getTime()) > this.nextRelease * 2 / 3) {
                this.fadeoutTooltip(this.instanceName, this.tooltipElement, 100, this.releaseTime / 2);
            } else {}
        } catch (e) {}
    };
    this.removeTooltip = function() {
        try {
            this.application.removeObject(this.tooltipElement);
        } catch (e) {}
        this.isAppended = false;
        this.nextRelease = null;
        this.currentTooltip = null;
    };
    this.releaseTooltip = function() {
        this.nextRelease = (new Date().getTime()) + this.releaseTime;
        try {
            clearTimeout(this.releaseThread);
        } catch (e) {}
        try {
            this.releaseThread = setTimeout(this.instanceName + ".hideTooltip();", this.releaseTime);
        } catch (e) {}
    };
    this.resetTooltipRelease = function() {
        try {
            clearTimeout(this.releaseThread);
        } catch (e) {}
        this.nextRelease = null;
    };
    this.fadeoutTooltip = function(instanceName, object, transparency, time) {
        if (time > 0) {
            try {
                var newTime = time - (this.releaseTime / 3);
                var newTransparency = transparency - 25;
                object.style.opacity = newTransparency / 100;
                object.style.mozOpacity = newTransparency / 100;
                object.style.filter = "Alpha(opacity=" + newTransparency + ")";
                try {
                    myTooltipManager.fadeoutThread = setTimeout(instanceName + ".fadeoutTooltip('" + instanceName + "', document.getElementById('" + object.id + "')," + newTransparency + "," + newTime + ");", this.releaseTime / 3);
                } catch (e) {}
            } catch (e) {
                try {
                    eval(instanceName + ".removeTooltip();");
                } catch (e) {}
            }
        } else {
            try {
                eval(instanceName + ".removeTooltip();");
            } catch (e) {}
        }
    };
    this.resetTooltipFadeout = function() {
        try {
            clearTimeout(this.fadeoutThread);
        } catch (e) {}
        try {
            this.tooltipElement.style.opacity = 1;
            this.tooltipElement.style.mozOpacity = 1;
            this.tooltipElement.style.filter = "Alpha(opacity=100)";
        } catch (e) {}
    };
    this.setupGraphics = function(obj, content) {
        if (content) var contents = content.split("<!--break-->");
        else return;
        if (this.graphicsPreWrapper == null) {
            var preWrapper = new StringBuffer();
            preWrapper.append("<table id='tooltipElementTable' border='0' cellpadding='0' cellspacing='0'>");
            preWrapper.append("<tr><td width='30' height='10' rowspan='2'>");
            preWrapper.append("<img id='tooltipArrowTL' class='tooltipArrowTL'");
            preWrapper.append(" src='kamap/images/a_pixel.gif'></td>");
            preWrapper.append("<td width='10' height='10' class='tooltipCornerTL'></td>");
            preWrapper.append("<td width='100%' height='10' class='tooltipLineStretchT'></td>");
            preWrapper.append("<td width='10' height='10' class='tooltipCornerTR'></td>");
            preWrapper.append("<td width='30' height='10' rowspan='2'>");
            preWrapper.append("<img id='tooltipArrowTR' class='tooltipArrowTR'");
            preWrapper.append(" src='kamap/images/a_pixel.gif'></td>");
            preWrapper.append("</tr><tr><td width='10' height='59'><div id='tooltipLineTL' class='tooltipLineL'></div></td>");
            preWrapper.append("<td width='100%' height='59'><div id='tooltipHeader'>");
            this.graphicsPreWrapper = preWrapper.toString();
            var preWrapper1 = new StringBuffer();
            preWrapper1.append("</div></td>");
            preWrapper1.append("<td width='10' height='59'><div id='tooltipLineTR' class='tooltipLineR'></div></td></tr>");
            preWrapper1.append("<tr><td width='30' height='100%' class='tooltipOutlineStretchL'></td>");
            preWrapper1.append("<td width='10' height='100%' class='tooltipLineStretchL'></td>");
            preWrapper1.append("<td width='100%' height='100%'><div id='tooltipContent'>");
            this.graphicsPreWrapper1 = preWrapper1.toString();
            var postWrapper = new StringBuffer();
            postWrapper.append("</div></td>");
            postWrapper.append("<td width='10' height='100%' class='tooltipLineStretchR'></td>");
            postWrapper.append("<td width='30' height='100%' class='tooltipOutlineStretchR'></td></tr>");
            postWrapper.append("<tr><td width='30' height='59' rowspan='2'>");
            postWrapper.append("<img id='tooltipArrowBL' class='tooltipArrowBL'");
            postWrapper.append(" src='kamap/images/a_pixel.gif'></td>");
            postWrapper.append("<td width='10' height='59'><div id='tooltipLineBL' class='tooltipLineL'></div></td>");
            postWrapper.append("<td width='100%' height='59'><div id='tooltipFooter'>");
            this.graphicsPostWrapper = postWrapper.toString();
            var postWrapper1 = new StringBuffer();
            postWrapper1.append("</div></td>");
            postWrapper1.append("<td width='10' height='59'><div id='tooltipLineBR' class='tooltipLineR'></div></td>");
            postWrapper1.append("<td width='30' height='59' rowspan='2'>");
            postWrapper1.append("<img id='tooltipArrowBR' class='tooltipArrowBR'");
            postWrapper1.append(" src='kamap/images/a_pixel.gif'></td></tr>");
            postWrapper1.append("<tr><td width='10' height='10' class='tooltipCornerBL'></td>");
            postWrapper1.append("<td width='100%' height='10' class='tooltipLineStretchB'></td>");
            postWrapper1.append("<td width='10' height='10' class='tooltipCornerBR'></td>");
            postWrapper1.append("</tr></table>");
            this.graphicsPostWrapper1 = postWrapper1.toString();
            try {
                obj.innerHTML = this.graphicsPreWrapper + contents[0] + this.graphicsPreWrapper1 + contents[1] + this.graphicsPostWrapper + contents[2] + this.graphicsPostWrapper1;
            } catch (e) {}
        } else {
            try {
                document.getElementById("tooltipHeader").innerHtml = contents[0];
                document.getElementById("tooltipContent").innerHtml = contents[1];
                document.getElementById("tooltipFooter").innerHtml = contents[2];
            } catch (e) {
                try {
                    obj.innerHTML = this.graphicsPreWrapper + contents[0] + this.graphicsPreWrapper1 + contents[1] + this.graphicsPostWrapper + contents[2] + this.graphicsPostWrapper1;
                } catch (e) {}
            }
        }
        if (contents[4] && contents[4].trim().toUpperCase() == "NO_DEFAULT_SIZE") this.defaultSize = false;
        else this.defaultSize = true;
        if (contents[3] && contents[3].trim() != "") {
            return contents[3].trim();
        }
        return "";
    };
    this.setupPointer = function(pos) {
        try {
            if (pos == 1) {
                document.getElementById("tooltipLineTL").className = "tooltipLineW";
                document.getElementById("tooltipArrowTL").className = "tooltipArrowActiveTL";
                this.tooltipElement.className = "tooltipElementTL";
            } else if (pos == 2) {
                document.getElementById("tooltipLineTR").className = "tooltipLineW";
                document.getElementById("tooltipArrowTR").className = "tooltipArrowActiveTR";
                this.tooltipElement.className = "tooltipElementTR";
            } else if (pos == 3) {
                document.getElementById("tooltipLineBL").className = "tooltipLineW";
                document.getElementById("tooltipArrowBL").className = "tooltipArrowActiveBL";
                this.tooltipElement.className = "tooltipElementBL";
            } else {
                document.getElementById("tooltipLineBR").className = "tooltipLineW";
                document.getElementById("tooltipArrowBR").className = "tooltipArrowActiveBR";
                this.tooltipElement.className = "tooltipElementBR";
            }
        } catch (e) {}
    };
    this.onmouseover = function(e) {
        try {
            myTooltipManager.resetTooltipRelease();
            myTooltipManager.resetTooltipFadeout();
        } catch (ex) {}
    };
    this.onmouseout = function(e) {
        myTooltipManager.releaseTooltip();
    };
    this.onclick = function(e) {
        try {
            if (myTooltipManager.tooltipElement.onmouseout == null) {
                myTooltipManager.tooltipElement.onmouseover = null;
                myTooltipManager.releaseTooltip();
            } else {
                myTooltipManager.tooltipElement.onmouseout = null;
                myTooltipManager.resetTooltipRelease();
                myTooltipManager.resetTooltipFadeout();
            }
        } catch (ex) {}
    };
};

function GogisTooltip(tooltipManager, id, url, posX, posY) {
    this.tooltipManager = tooltipManager;
    this.id = id;
    this.url = url;
    this.posX = posX;
    this.posY = posY;
    this.content = null;
    var me = this;
    this.setContent = function(content) {
        me.content = me.tooltipManager.localizer.localizeText(content);
        var contents = content.split("<!--break-->");
        var isImg = (contents[1].indexOf('src=') > 0 ? true : false);
        if (isImg) {
            var onload = 'myTooltipManager.showTooltip(' + me.id + ',\'' + me.url + '\',' + me.posX + ',' + me.posY + ',true);';
            contents[1] = contents[1].replace(/\ssrc=/g, ' onload="' + onload + '" src=');
            me.firstTimeContent = contents[0] + "<!--break-->" + contents[1] + "<!--break-->" + contents[2] + "<!--break-->" + contents[3] + "<!--break-->" + contents[4];
        }
        me.tooltipManager.showTooltip(me.id, me.url, me.posX, me.posY, !isImg);
    };
};

function GogisLocalizer(keys) {
    this.keys = keys;
    this.localize = function(keyvalue) {
        if (!this.keys[(keyvalue).toLowerCase()]) return keyvalue;
        else return (arguments[1]) ? this.keys[(keyvalue).toLowerCase()] : this.keys[(keyvalue).toLowerCase()].safeHtml();
    };
    this.localizeText = function(text) {
        if (!(text.indexOf("**") >= 0)) return text;
        var tmp_text = text.split("**");
        var ret_text = tmp_text[0];
        var i = 1;
        while (tmp_text[i] > "") {
            if (i < 2) ret_text += this.localize(tmp_text[i]);
            else ret_text += tmp_text[i - 1] + this.localize(tmp_text[i]);
            i += 2;
        }
        ret_text += tmp_text[i - 1];
        return ret_text;
    };
}

function GogisPropertyEditor(application, localizer, instanceName, releaseTime) {
    this.application = application;
    this.localizer = localizer;
    this.instanceName = instanceName;
    this.releaseTime = releaseTime;
    this.currentID = null;
    this.isAppended = false;
    this.nextRelease = null;
    this.releaseThread = null;
    this.fadeoutThread = null;
    this.opacity = 100;
    this.canvas = document.createElement('div');
    this.canvas.setAttribute('id', 'gogisPropertyEditor');
    this.domObj = document.getElementById("page");
    this.domObj.appendChild(this.canvas);
    this.show = function(id, type) {
        if (this.isAppended && id == this.currentID) this.hide();
        this.resetRelease();
        this.resetFadeout();
        this.currentID = id;
        if (this.nextRelease == null) {
            var posElem;
            if (type == 1) {
                posElem = document.getElementById("idGroupRow_" + arguments[2]);
            } else {
                posElem = document.getElementById("idLayerRow_" + id);
            }
            this.canvas.style.left = findPosX(posElem) + "px";
            this.canvas.style.top = (parseInt(findPosY(posElem)) + parseInt(getObjectHeight(posElem))) + "px";
            this.canvas.onmouseover = this.onmouseover;
            this.canvas.onmouseout = this.onmouseout;
            var A_TPL = {
                'b_vertical': false,
                'b_watch': true,
                'n_controlWidth': 194,
                'n_controlHeight': 16,
                'n_sliderWidth': 16,
                'n_sliderHeight': 15,
                'n_pathLeft': 1,
                'n_pathTop': 1,
                'n_pathLength': 177,
                's_imgControl': 'tigra/img/greyh_bg.gif',
                's_imgSlider': 'tigra/img/greyh_sl.gif',
                'n_zIndex': 1
            };
            var A_INIT = {
                's_form': 0,
                's_name': 'propertyOpacity',
                'n_minValue': 0,
                'n_maxValue': 100,
                'n_value': this.getPropertyOpacity(),
                'n_step': 1
            };
            new slider(A_INIT, A_TPL, this.canvas, this.setPropertyOpacity);
            this.canvas.style.display = "inline";
            this.isAppended = true;
        }
    };
    this.hide = function() {
        try {
            if (((new Date()).getTime()) > this.nextRelease * 2 / 3) {
                this.fadeout(this.instanceName, this.canvas, this.opacity, this.releaseTime / 2);
            } else {}
        } catch (e) {}
    };
    this.remove = function() {
        this.canvas.style.display = "none";
        this.isAppended = false;
        this.nextRelease = null;
    };
    this.release = function() {
        this.nextRelease = (new Date().getTime()) + this.releaseTime;
        try {
            clearTimeout(this.releaseThread);
        } catch (e) {}
        try {
            this.releaseThread = setTimeout(this.instanceName + ".hide();", this.releaseTime);
        } catch (e) {}
    };
    this.resetRelease = function() {
        try {
            clearTimeout(this.releaseThread);
        } catch (e) {}
        this.nextRelease = null;
    };
    this.fadeout = function(instanceName, object, transparency, time) {
        if (time > 0) {
            try {
                var newTime = time - (this.releaseTime / 3);
                var newTransparency = transparency - 25;
                object.style.opacity = newTransparency / 100;
                object.style.mozOpacity = newTransparency / 100;
                object.style.filter = "Alpha(opacity=" + newTransparency + ")";
                try {
                    myTooltipManager.fadeoutThread = setTimeout(instanceName + ".fadeout('" + instanceName + "', document.getElementById('" + object.id + "')," + newTransparency + "," + newTime + ");", this.releaseTime / 3);
                } catch (e) {}
            } catch (e) {
                try {
                    eval(instanceName + ".remove();");
                } catch (e) {}
            }
        } else {
            try {
                eval(instanceName + ".remove();");
            } catch (e) {}
        }
    };
    this.resetFadeout = function() {
        try {
            clearTimeout(this.fadeoutThread);
        } catch (e) {}
        try {
            this.canvas.style.opacity = this.opacity / 100;
            this.canvas.style.mozOpacity = this.opacity / 100;
            this.canvas.style.filter = "Alpha(opacity=" + this.opacity + ")";
        } catch (e) {}
    };
    this.onmouseover = function(e) {
        try {
            myPropertyEditor.resetRelease();
            myPropertyEditor.resetFadeout();
        } catch (ex) {}
    };
    this.onmouseout = function(e) {
        myPropertyEditor.release();
    };
    this.setPropertyOpacity = function(opacity) {
        myKaMap.getCurrentMap().setLayerOpacity(myPropertyEditor.currentID, opacity);
        myPropertyEditor.canvas.title = gLocalizer.localize('TOOLTIP_PROPERTY_OPACITY') + ': ' + (100 - opacity);
        updateLinkToView();
    };
    this.getPropertyOpacity = function() {
        return myKaMap.getCurrentMap().getLayer(myPropertyEditor.currentID).opacity;
    };
};
var gogisTabControlTabs = 5;

function gogisTabControlClick() {
    if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) return;
    var currentTab, currentContent, tmpTabTd, tmpTabTdSpacer;
    var redraw = false;
    try {
        var tab = arguments[0];
        if (tab) {
            var clickedTab = document.getElementById("gogisTabControlTab" + tab);
            if (!arguments[1] && (clickedTab.className == "gogisTabControlSelectedTab" || clickedTab.className == "gogisTabControlTabDisabled")) return;
            for (i = 1; i <= gogisTabControlTabs; i++) {
                try {
                    currentTab = document.getElementById("gogisTabControlTab" + i);
                    currentContent = document.getElementById("gogisTabControlContent" + i);
                    tmpTabTd = document.getElementById("gogisTabControlTd" + i);
                    tmpTabTdSpacer = document.getElementById("gogisTabControlTdSpacer" + i);
                    if (tab == i) {
                        if (currentTab.className != "gogisTabControlSelectedTab") {
                            currentTab.className = "gogisTabControlSelectedTab";
                            if (tmpTabTd) tmpTabTd.style.display = "";
                            if (tmpTabTdSpacer) tmpTabTdSpacer.style.display = "none";
                            currentContent.className = "gogisTabControlActiveContent";
                            if (i != 1) currentContent.style.display = "inline";
                            if (i == 5 && updateLeg) {
                                gogisSetupPrintableLegend(flag_drawActiveLegend);
                                updateLeg = false;
                            }
                            redraw = true;
                        }
                    } else {
                        if (i == 4) {
                            if (gogisSearchExternIsActive == 2) {
                                currentTab.className = "gogisTabControlTab";
                                tmpTabTd.style.display = "";
                                tmpTabTdSpacer.style.display = "none";
                            } else {
                                currentTab.className = "gogisTabControlTabDisabled";
                                tmpTabTd.style.display = "none";
                                tmpTabTdSpacer.style.display = "";
                            }
                        } else if (i == 3) {
                            if (autocompleteDetailsIsActive) {
                                currentTab.className = "gogisTabControlTab";
                                tmpTabTd.style.display = "";
                                tmpTabTdSpacer.style.display = "none";
                            } else {
                                currentTab.className = "gogisTabControlTabDisabled";
                                tmpTabTd.style.display = "none";
                                tmpTabTdSpacer.style.display = "";
                            }
                        } else if (i == 2) {
                            if (autocompleteListIsActive) {
                                currentTab.className = "gogisTabControlTab";
                                tmpTabTd.style.display = "";
                                tmpTabTdSpacer.style.display = "none";
                            } else {
                                currentTab.className = "gogisTabControlTabDisabled";
                                tmpTabTd.style.display = "none";
                                tmpTabTdSpacer.style.display = "";
                            }
                        } else currentTab.className = "gogisTabControlTab";
                        currentContent.className = "gogisTabControlHiddenContent";
                        if (i != 1) currentContent.style.display = "none";
                    }
                } catch (e) {}
            }
            if (redraw) {
                hideContent();
                if (tab != 1 || arguments[1]) drawPage();
            }
        } else {
            var tmpTab = document.getElementById("gogisTabControlTab4");
            tmpTabTd = document.getElementById("gogisTabControlTd4");
            tmpTabTdSpacer = document.getElementById("gogisTabControlTdSpacer4");
            if (gogisSearchExternIsActive == 2) {
                tmpTab.className = "gogisTabControlTab";
                tmpTabTd.style.display = "";
                tmpTabTdSpacer.style.display = "none";
            } else {
                tmpTab.className = "gogisTabControlTabDisabled";
                tmpTabTd.style.display = "none";
                tmpTabTdSpacer.style.display = "";
            }
            tmpTab = document.getElementById("gogisTabControlTab3");
            tmpTabTd = document.getElementById("gogisTabControlTd3");
            tmpTabTdSpacer = document.getElementById("gogisTabControlTdSpacer3");
            if (autocompleteDetailsIsActive) {
                tmpTab.className = "gogisTabControlTab";
                tmpTabTd.style.display = "";
                tmpTabTdSpacer.style.display = "none";
            } else {
                tmpTab.className = "gogisTabControlTabDisabled";
                tmpTabTd.style.display = "none";
                tmpTabTdSpacer.style.display = "";
            }
            tmpTab = document.getElementById("gogisTabControlTab2");
            tmpTabTd = document.getElementById("gogisTabControlTd2");
            tmpTabTdSpacer = document.getElementById("gogisTabControlTdSpacer2");
            if (autocompleteListIsActive) {
                tmpTab.className = "gogisTabControlTab";
                tmpTabTd.style.display = "";
                tmpTabTdSpacer.style.display = "none";
            } else {
                tmpTab.className = "gogisTabControlTabDisabled";
                tmpTabTd.style.display = "none";
                tmpTabTdSpacer.style.display = "";
            }
        }
    } catch (e) {}
    updateLinkToView();
}

function gogisTabControlChange() {
    gogisTabControlClick(arguments[0], arguments[1]);
}
var jg_ok, jg_ie, jg_fast, jg_dom, jg_moz;

function _chkDHTM(x, i) {
    x = document.body || null;
    jg_ie = x && typeof x.insertAdjacentHTML != "undefined" && document.createElement;
    jg_dom = (x && !jg_ie && typeof x.appendChild != "undefined" && typeof document.createRange != "undefined" && typeof(i = document.createRange()).setStartBefore != "undefined" && typeof i.createContextualFragment != "undefined");
    jg_fast = jg_ie && document.all && !window.opera;
    jg_moz = jg_dom && typeof x.style.MozOpacity != "undefined";
    jg_ok = !!(jg_ie || jg_dom);
}

function _pntCnvDom() {
    var x = this.wnd.document.createRange();
    x.setStartBefore(this.cnv);
    x = x.createContextualFragment(jg_fast ? this._htmRpc() : this.htm);
    if (this.cnv) this.cnv.appendChild(x);
    this.htm = "";
}

function _pntCnvIe() {
    if (this.cnv) this.cnv.insertAdjacentHTML("BeforeEnd", jg_fast ? this._htmRpc() : this.htm);
    this.htm = "";
}

function _pntDoc() {
    this.wnd.document.write(jg_fast ? this._htmRpc() : this.htm);
    this.htm = '';
}

function _pntN() {
    ;
}

function _mkDiv(x, y, w, h) {
    this.htm += '<div style="position:absolute;' + 'left:' + x + 'px;' + 'top:' + y + 'px;' + 'width:' + w + 'px;' + 'height:' + h + 'px;' + 'clip:rect(0,' + w + 'px,' + h + 'px,0);' + 'background-color:' + this.color + (!jg_moz ? ';overflow:hidden' : '') + ';"><\/div>';
}

function _mkDivIe(x, y, w, h) {
    this.htm += '%%' + this.color + ';' + x + ';' + y + ';' + w + ';' + h + ';';
}

function _mkDivPrt(x, y, w, h) {
    this.htm += '<div style="position:absolute;' + 'border-left:' + w + 'px solid ' + this.color + ';' + 'left:' + x + 'px;' + 'top:' + y + 'px;' + 'width:0px;' + 'height:' + h + 'px;' + 'clip:rect(0,' + w + 'px,' + h + 'px,0);' + 'background-color:' + this.color + (!jg_moz ? ';overflow:hidden' : '') + ';"><\/div>';
}
var _regex = /%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;

function _htmRpc() {
    return this.htm.replace(_regex, '<div style="overflow:hidden;position:absolute;background-color:' + '$1;left:$2;top:$3;width:$4;height:$5"></div>\n');
}

function _htmPrtRpc() {
    return this.htm.replace(_regex, '<div style="overflow:hidden;position:absolute;background-color:' + '$1;left:$2;top:$3;width:$4;height:$5;border-left:$4px solid $1"></div>\n');
}

function _mkLin(x1, y1, x2, y2) {
    if (x1 > x2) {
        var _x2 = x2;
        var _y2 = y2;
        x2 = x1;
        y2 = y1;
        x1 = _x2;
        y1 = _y2;
    }
    var dx = x2 - x1,
        dy = Math.abs(y2 - y1),
        x = x1,
        y = y1,
        yIncr = (y1 > y2) ? -1 : 1;
    if (dx >= dy) {
        var pr = dy << 1,
            pru = pr - (dx << 1),
            p = pr - dx,
            ox = x;
        while (dx > 0) {
            --dx;
            ++x;
            if (p > 0) {
                this._mkDiv(ox, y, x - ox, 1);
                y += yIncr;
                p += pru;
                ox = x;
            } else p += pr;
        }
        this._mkDiv(ox, y, x2 - ox + 1, 1);
    } else {
        var pr = dx << 1,
            pru = pr - (dy << 1),
            p = pr - dy,
            oy = y;
        if (y2 <= y1) {
            while (dy > 0) {
                --dy;
                if (p > 0) {
                    this._mkDiv(x++, y, 1, oy - y + 1);
                    y += yIncr;
                    p += pru;
                    oy = y;
                } else {
                    y += yIncr;
                    p += pr;
                }
            }
            this._mkDiv(x2, y2, 1, oy - y2 + 1);
        } else {
            while (dy > 0) {
                --dy;
                y += yIncr;
                if (p > 0) {
                    this._mkDiv(x++, oy, 1, y - oy);
                    p += pru;
                    oy = y;
                } else p += pr;
            }
            this._mkDiv(x2, oy, 1, y2 - oy + 1);
        }
    }
}

function _mkLin2D(x1, y1, x2, y2) {
    if (x1 > x2) {
        var _x2 = x2;
        var _y2 = y2;
        x2 = x1;
        y2 = y1;
        x1 = _x2;
        y1 = _y2;
    }
    var dx = x2 - x1,
        dy = Math.abs(y2 - y1),
        x = x1,
        y = y1,
        yIncr = (y1 > y2) ? -1 : 1;
    var s = this.stroke;
    if (dx >= dy) {
        if (dx > 0 && s - 3 > 0) {
            var _s = (s * dx * Math.sqrt(1 + dy * dy / (dx * dx)) - dx - (s >> 1) * dy) / dx;
            _s = (!(s - 4) ? Math.ceil(_s) : Math.round(_s)) + 1;
        } else var _s = s;
        var ad = Math.ceil(s / 2);
        var pr = dy << 1,
            pru = pr - (dx << 1),
            p = pr - dx,
            ox = x;
        while (dx > 0) {
            --dx;
            ++x;
            if (p > 0) {
                this._mkDiv(ox, y, x - ox + ad, _s);
                y += yIncr;
                p += pru;
                ox = x;
            } else p += pr;
        }
        this._mkDiv(ox, y, x2 - ox + ad + 1, _s);
    } else {
        if (s - 3 > 0) {
            var _s = (s * dy * Math.sqrt(1 + dx * dx / (dy * dy)) - (s >> 1) * dx - dy) / dy;
            _s = (!(s - 4) ? Math.ceil(_s) : Math.round(_s)) + 1;
        } else var _s = s;
        var ad = Math.round(s / 2);
        var pr = dx << 1,
            pru = pr - (dy << 1),
            p = pr - dy,
            oy = y;
        if (y2 <= y1) {
            ++ad;
            while (dy > 0) {
                --dy;
                if (p > 0) {
                    this._mkDiv(x++, y, _s, oy - y + ad);
                    y += yIncr;
                    p += pru;
                    oy = y;
                } else {
                    y += yIncr;
                    p += pr;
                }
            }
            this._mkDiv(x2, y2, _s, oy - y2 + ad);
        } else {
            while (dy > 0) {
                --dy;
                y += yIncr;
                if (p > 0) {
                    this._mkDiv(x++, oy, _s, y - oy + ad);
                    p += pru;
                    oy = y;
                } else p += pr;
            }
            this._mkDiv(x2, oy, _s, y2 - oy + ad + 1);
        }
    }
}

function _mkLinDott(x1, y1, x2, y2) {
    if (x1 > x2) {
        var _x2 = x2;
        var _y2 = y2;
        x2 = x1;
        y2 = y1;
        x1 = _x2;
        y1 = _y2;
    }
    var dx = x2 - x1,
        dy = Math.abs(y2 - y1),
        x = x1,
        y = y1,
        yIncr = (y1 > y2) ? -1 : 1,
        drw = true;
    if (dx >= dy) {
        var pr = dy << 1,
            pru = pr - (dx << 1),
            p = pr - dx;
        while (dx > 0) {
            --dx;
            if (drw) this._mkDiv(x, y, 1, 1);
            drw = !drw;
            if (p > 0) {
                y += yIncr;
                p += pru;
            } else p += pr;
            ++x;
        }
    } else {
        var pr = dx << 1,
            pru = pr - (dy << 1),
            p = pr - dy;
        while (dy > 0) {
            --dy;
            if (drw) this._mkDiv(x, y, 1, 1);
            drw = !drw;
            y += yIncr;
            if (p > 0) {
                ++x;
                p += pru;
            } else p += pr;
        }
    }
    if (drw) this._mkDiv(x, y, 1, 1);
}

function _mkOv(left, top, width, height) {
    var a = (++width) >> 1,
        b = (++height) >> 1,
        wod = width & 1,
        hod = height & 1,
        cx = left + a,
        cy = top + b,
        x = 0,
        y = b,
        ox = 0,
        oy = b,
        aa2 = (a * a) << 1,
        aa4 = aa2 << 1,
        bb2 = (b * b) << 1,
        bb4 = bb2 << 1,
        st = (aa2 >> 1) * (1 - (b << 1)) + bb2,
        tt = (bb2 >> 1) - aa2 * ((b << 1) - 1),
        w, h;
    while (y > 0) {
        if (st < 0) {
            st += bb2 * ((x << 1) + 3);
            tt += bb4 * (++x);
        } else if (tt < 0) {
            st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
            tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
            w = x - ox;
            h = oy - y;
            if ((w & 2) && (h & 2)) {
                this._mkOvQds(cx, cy, x - 2, y + 2, 1, 1, wod, hod);
                this._mkOvQds(cx, cy, x - 1, y + 1, 1, 1, wod, hod);
            } else this._mkOvQds(cx, cy, x - 1, oy, w, h, wod, hod);
            ox = x;
            oy = y;
        } else {
            tt -= aa2 * ((y << 1) - 3);
            st -= aa4 * (--y);
        }
    }
    w = a - ox + 1;
    h = (oy << 1) + hod;
    y = cy - oy;
    this._mkDiv(cx - a, y, w, h);
    this._mkDiv(cx + ox + wod - 1, y, w, h);
}

function _mkOv2D(left, top, width, height) {
    var s = this.stroke;
    width += s + 1;
    height += s + 1;
    var a = width >> 1,
        b = height >> 1,
        wod = width & 1,
        hod = height & 1,
        cx = left + a,
        cy = top + b,
        x = 0,
        y = b,
        aa2 = (a * a) << 1,
        aa4 = aa2 << 1,
        bb2 = (b * b) << 1,
        bb4 = bb2 << 1,
        st = (aa2 >> 1) * (1 - (b << 1)) + bb2,
        tt = (bb2 >> 1) - aa2 * ((b << 1) - 1);
    if (s - 4 < 0 && (!(s - 2) || width - 51 > 0 && height - 51 > 0)) {
        var ox = 0,
            oy = b,
            w, h, pxw;
        while (y > 0) {
            if (st < 0) {
                st += bb2 * ((x << 1) + 3);
                tt += bb4 * (++x);
            } else if (tt < 0) {
                st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
                tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
                w = x - ox;
                h = oy - y;
                if (w - 1) {
                    pxw = w + 1 + (s & 1);
                    h = s;
                } else if (h - 1) {
                    pxw = s;
                    h += 1 + (s & 1);
                } else pxw = h = s;
                this._mkOvQds(cx, cy, x - 1, oy, pxw, h, wod, hod);
                ox = x;
                oy = y;
            } else {
                tt -= aa2 * ((y << 1) - 3);
                st -= aa4 * (--y);
            }
        }
        this._mkDiv(cx - a, cy - oy, s, (oy << 1) + hod);
        this._mkDiv(cx + a + wod - s, cy - oy, s, (oy << 1) + hod);
    } else {
        var _a = (width - (s << 1)) >> 1,
            _b = (height - (s << 1)) >> 1,
            _x = 0,
            _y = _b,
            _aa2 = (_a * _a) << 1,
            _aa4 = _aa2 << 1,
            _bb2 = (_b * _b) << 1,
            _bb4 = _bb2 << 1,
            _st = (_aa2 >> 1) * (1 - (_b << 1)) + _bb2,
            _tt = (_bb2 >> 1) - _aa2 * ((_b << 1) - 1),
            pxl = new Array(),
            pxt = new Array(),
            _pxb = new Array();
        pxl[0] = 0;
        pxt[0] = b;
        _pxb[0] = _b - 1;
        while (y > 0) {
            if (st < 0) {
                pxl[pxl.length] = x;
                pxt[pxt.length] = y;
                st += bb2 * ((x << 1) + 3);
                tt += bb4 * (++x);
            } else if (tt < 0) {
                pxl[pxl.length] = x;
                st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
                tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
                pxt[pxt.length] = y;
            } else {
                tt -= aa2 * ((y << 1) - 3);
                st -= aa4 * (--y);
            }
            if (_y > 0) {
                if (_st < 0) {
                    _st += _bb2 * ((_x << 1) + 3);
                    _tt += _bb4 * (++_x);
                    _pxb[_pxb.length] = _y - 1;
                } else if (_tt < 0) {
                    _st += _bb2 * ((_x << 1) + 3) - _aa4 * (_y - 1);
                    _tt += _bb4 * (++_x) - _aa2 * (((_y--) << 1) - 3);
                    _pxb[_pxb.length] = _y - 1;
                } else {
                    _tt -= _aa2 * ((_y << 1) - 3);
                    _st -= _aa4 * (--_y);
                    _pxb[_pxb.length - 1]--;
                }
            }
        }
        var ox = -wod,
            oy = b,
            _oy = _pxb[0],
            l = pxl.length,
            w, h;
        for (var i = 0; i < l; i++) {
            if (typeof _pxb[i] != "undefined") {
                if (_pxb[i] < _oy || pxt[i] < oy) {
                    x = pxl[i];
                    this._mkOvQds(cx, cy, x, oy, x - ox, oy - _oy, wod, hod);
                    ox = x;
                    oy = pxt[i];
                    _oy = _pxb[i];
                }
            } else {
                x = pxl[i];
                this._mkDiv(cx - x, cy - oy, 1, (oy << 1) + hod);
                this._mkDiv(cx + ox + wod, cy - oy, 1, (oy << 1) + hod);
                ox = x;
                oy = pxt[i];
            }
        }
        this._mkDiv(cx - a, cy - oy, 1, (oy << 1) + hod);
        this._mkDiv(cx + ox + wod, cy - oy, 1, (oy << 1) + hod);
    }
}

function _mkOvDott(left, top, width, height) {
    var a = (++width) >> 1,
        b = (++height) >> 1,
        wod = width & 1,
        hod = height & 1,
        hodu = hod ^ 1,
        cx = left + a,
        cy = top + b,
        x = 0,
        y = b,
        aa2 = (a * a) << 1,
        aa4 = aa2 << 1,
        bb2 = (b * b) << 1,
        bb4 = bb2 << 1,
        st = (aa2 >> 1) * (1 - (b << 1)) + bb2,
        tt = (bb2 >> 1) - aa2 * ((b << 1) - 1),
        drw = true;
    while (y > 0) {
        if (st < 0) {
            st += bb2 * ((x << 1) + 3);
            tt += bb4 * (++x);
        } else if (tt < 0) {
            st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
            tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
        } else {
            tt -= aa2 * ((y << 1) - 3);
            st -= aa4 * (--y);
        }
        if (drw && y >= hodu) this._mkOvQds(cx, cy, x, y, 1, 1, wod, hod);
        drw = !drw;
    }
}

function _mkRect(x, y, w, h) {
    var s = this.stroke;
    this._mkDiv(x, y, w, s);
    this._mkDiv(x + w, y, s, h);
    this._mkDiv(x, y + h, w + s, s);
    this._mkDiv(x, y + s, s, h - s);
}

function _mkRectDott(x, y, w, h) {
    this.drawLine(x, y, x + w, y);
    this.drawLine(x + w, y, x + w, y + h);
    this.drawLine(x, y + h, x + w, y + h);
    this.drawLine(x, y, x, y + h);
}

function jsgFont() {
    this.PLAIN = 'font-weight:normal;';
    this.BOLD = 'font-weight:bold;';
    this.ITALIC = 'font-style:italic;';
    this.ITALIC_BOLD = this.ITALIC + this.BOLD;
    this.BOLD_ITALIC = this.ITALIC_BOLD;
}
var Font = new jsgFont();

function jsgStroke() {
    this.DOTTED = -1;
}
var Stroke = new jsgStroke();

function jsGraphics(cnv, wnd) {
    this.setColor = function(x) {
        this.color = x.toLowerCase();
    };
    this.setStroke = function(x) {
        this.stroke = x;
        if (!(x + 1)) {
            this.drawLine = _mkLinDott;
            this._mkOv = _mkOvDott;
            this.drawRect = _mkRectDott;
        } else if (x - 1 > 0) {
            this.drawLine = _mkLin2D;
            this._mkOv = _mkOv2D;
            this.drawRect = _mkRect;
        } else {
            this.drawLine = _mkLin;
            this._mkOv = _mkOv;
            this.drawRect = _mkRect;
        }
    };
    this.setPrintable = function(arg) {
        this.printable = arg;
        if (jg_fast) {
            this._mkDiv = _mkDivIe;
            this._htmRpc = arg ? _htmPrtRpc : _htmRpc;
        } else this._mkDiv = arg ? _mkDivPrt : _mkDiv;
    };
    this.setFont = function(fam, sz, sty) {
        this.ftFam = fam;
        this.ftSz = sz;
        this.ftSty = sty || Font.PLAIN;
    };
    this.drawPolyline = this.drawPolyLine = function(x, y) {
        for (var i = x.length - 1; i;) {
            --i;
            this.drawLine(x[i], y[i], x[i + 1], y[i + 1]);
        }
    };
    this.fillRect = function(x, y, w, h) {
        this._mkDiv(x, y, w, h);
    };
    this.drawPolygon = function(x, y) {
        this.drawPolyline(x, y);
        this.drawLine(x[x.length - 1], y[x.length - 1], x[0], y[0]);
    };
    this.drawEllipse = this.drawOval = function(x, y, w, h) {
        this._mkOv(x, y, w, h);
    };
    this.fillEllipse = this.fillOval = function(left, top, w, h) {
        var a = w >> 1,
            b = h >> 1,
            wod = w & 1,
            hod = h & 1,
            cx = left + a,
            cy = top + b,
            x = 0,
            y = b,
            oy = b,
            aa2 = (a * a) << 1,
            aa4 = aa2 << 1,
            bb2 = (b * b) << 1,
            bb4 = bb2 << 1,
            st = (aa2 >> 1) * (1 - (b << 1)) + bb2,
            tt = (bb2 >> 1) - aa2 * ((b << 1) - 1),
            xl, dw, dh;
        if (w)
            while (y > 0) {
                if (st < 0) {
                    st += bb2 * ((x << 1) + 3);
                    tt += bb4 * (++x);
                } else if (tt < 0) {
                    st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
                    xl = cx - x;
                    dw = (x << 1) + wod;
                    tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
                    dh = oy - y;
                    this._mkDiv(xl, cy - oy, dw, dh);
                    this._mkDiv(xl, cy + y + hod, dw, dh);
                    oy = y;
                } else {
                    tt -= aa2 * ((y << 1) - 3);
                    st -= aa4 * (--y);
                }
            }
        this._mkDiv(cx - a, cy - oy, w, (oy << 1) + hod);
    };
    this.fillArc = function(iL, iT, iW, iH, fAngA, fAngZ) {
        var a = iW >> 1,
            b = iH >> 1,
            iOdds = (iW & 1) | ((iH & 1) << 16),
            cx = iL + a,
            cy = iT + b,
            x = 0,
            y = b,
            ox = x,
            oy = y,
            aa2 = (a * a) << 1,
            aa4 = aa2 << 1,
            bb2 = (b * b) << 1,
            bb4 = bb2 << 1,
            st = (aa2 >> 1) * (1 - (b << 1)) + bb2,
            tt = (bb2 >> 1) - aa2 * ((b << 1) - 1),
            xEndA, yEndA, xEndZ, yEndZ, iSects = (1 << (Math.floor((fAngA %= 360.0) / 180.0) << 3)) | (2 << (Math.floor((fAngZ %= 360.0) / 180.0) << 3)) | ((fAngA >= fAngZ) << 16),
            aBndA = new Array(b + 1),
            aBndZ = new Array(b + 1);
        fAngA *= Math.PI / 180.0;
        fAngZ *= Math.PI / 180.0;
        xEndA = cx + Math.round(a * Math.cos(fAngA));
        yEndA = cy + Math.round(-b * Math.sin(fAngA));
        _mkLinVirt(aBndA, cx, cy, xEndA, yEndA);
        xEndZ = cx + Math.round(a * Math.cos(fAngZ));
        yEndZ = cy + Math.round(-b * Math.sin(fAngZ));
        _mkLinVirt(aBndZ, cx, cy, xEndZ, yEndZ);
        while (y > 0) {
            if (st < 0) {
                st += bb2 * ((x << 1) + 3);
                tt += bb4 * (++x);
            } else if (tt < 0) {
                st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
                ox = x;
                tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
                this._mkArcDiv(ox, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
                oy = y;
            } else {
                tt -= aa2 * ((y << 1) - 3);
                st -= aa4 * (--y);
                if (y && (aBndA[y] != aBndA[y - 1] || aBndZ[y] != aBndZ[y - 1])) {
                    this._mkArcDiv(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
                    ox = x;
                    oy = y;
                }
            }
        }
        this._mkArcDiv(x, 0, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
        if (iOdds >> 16) {
            if (iSects >> 16) {
                var xl = (yEndA <= cy || yEndZ > cy) ? (cx - x) : cx;
                this._mkDiv(xl, cy, x + cx - xl + (iOdds & 0xffff), 1);
            } else if ((iSects & 0x01) && yEndZ > cy) this._mkDiv(cx - x, cy, x, 1);
        }
    };
    this.fillPolygon = function(array_x, array_y) {
        var i;
        var y;
        var miny, maxy;
        var x1, y1;
        var x2, y2;
        var ind1, ind2;
        var ints;
        var n = array_x.length;
        if (!n) return;
        miny = array_y[0];
        maxy = array_y[0];
        for (i = 1; i < n; i++) {
            if (array_y[i] < miny) miny = array_y[i];
            if (array_y[i] > maxy) maxy = array_y[i];
        }
        for (y = miny; y <= maxy; y++) {
            var polyInts = new Array();
            ints = 0;
            for (i = 0; i < n; i++) {
                if (!i) {
                    ind1 = n - 1;
                    ind2 = 0;
                } else {
                    ind1 = i - 1;
                    ind2 = i;
                }
                y1 = array_y[ind1];
                y2 = array_y[ind2];
                if (y1 < y2) {
                    x1 = array_x[ind1];
                    x2 = array_x[ind2];
                } else if (y1 > y2) {
                    y2 = array_y[ind1];
                    y1 = array_y[ind2];
                    x2 = array_x[ind1];
                    x1 = array_x[ind2];
                } else continue;
                if ((y >= y1) && (y < y2)) polyInts[ints++] = Math.round((y - y1) * (x2 - x1) / (y2 - y1) + x1);
                else if ((y == maxy) && (y > y1) && (y <= y2)) polyInts[ints++] = Math.round((y - y1) * (x2 - x1) / (y2 - y1) + x1);
            }
            polyInts.sort(_CompInt);
            for (i = 0; i < ints; i += 2) this._mkDiv(polyInts[i], y, polyInts[i + 1] - polyInts[i] + 1, 1);
        }
    };
    this.drawString = function(txt, x, y) {
        this.htm += '<div style="position:absolute;white-space:nowrap;' + 'left:' + x + 'px;' + 'top:' + y + 'px;' + 'font-family:' + this.ftFam + ';' + 'font-size:' + this.ftSz + ';' + 'color:' + this.color + ';' + this.ftSty + '">' + txt + '<\/div>';
    };
    this.drawStringRect = function(txt, x, y, width, halign) {
        this.htm += '<div style="position:absolute;overflow:hidden;' + 'left:' + x + 'px;' + 'top:' + y + 'px;' + 'width:' + width + 'px;' + 'text-align:' + halign + ';' + 'font-family:' + this.ftFam + ';' + 'font-size:' + this.ftSz + ';' + 'color:' + this.color + ';' + this.ftSty + '">' + txt + '<\/div>';
    };
    this.drawImage = function(imgSrc, x, y, w, h, a) {
        this.htm += '<div style="position:absolute;' + 'left:' + x + 'px;' + 'top:' + y + 'px;' + 'width:' + w + 'px;' + 'height:' + h + 'px;">' + '<img src="' + imgSrc + '" width="' + w + '" height="' + h + '"' + (a ? (' ' + a) : '') + '>' + '<\/div>';
    };
    this.clear = function() {
        this.htm = "";
        if (this.cnv) this.cnv.innerHTML = "";
    };
    this._mkOvQds = function(cx, cy, x, y, w, h, wod, hod) {
        var xl = cx - x,
            xr = cx + x + wod - w,
            yt = cy - y,
            yb = cy + y + hod - h;
        if (xr > xl + w) {
            this._mkDiv(xr, yt, w, h);
            this._mkDiv(xr, yb, w, h);
        } else w = xr - xl + w;
        this._mkDiv(xl, yt, w, h);
        this._mkDiv(xl, yb, w, h);
    };
    this._mkArcDiv = function(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects) {
        var xrDef = cx + x + (iOdds & 0xffff),
            y2, h = oy - y,
            xl, xr, w;
        if (!h) h = 1;
        x = cx - x;
        if (iSects & 0xff0000) {
            y2 = cy - y - h;
            if (iSects & 0x00ff) {
                if (iSects & 0x02) {
                    xl = Math.max(x, aBndZ[y]);
                    w = xrDef - xl;
                    if (w > 0) this._mkDiv(xl, y2, w, h);
                }
                if (iSects & 0x01) {
                    xr = Math.min(xrDef, aBndA[y]);
                    w = xr - x;
                    if (w > 0) this._mkDiv(x, y2, w, h);
                }
            } else this._mkDiv(x, y2, xrDef - x, h);
            y2 = cy + y + (iOdds >> 16);
            if (iSects & 0xff00) {
                if (iSects & 0x0100) {
                    xl = Math.max(x, aBndA[y]);
                    w = xrDef - xl;
                    if (w > 0) this._mkDiv(xl, y2, w, h);
                }
                if (iSects & 0x0200) {
                    xr = Math.min(xrDef, aBndZ[y]);
                    w = xr - x;
                    if (w > 0) this._mkDiv(x, y2, w, h);
                }
            } else this._mkDiv(x, y2, xrDef - x, h);
        } else {
            if (iSects & 0x00ff) {
                if (iSects & 0x02) xl = Math.max(x, aBndZ[y]);
                else xl = x;
                if (iSects & 0x01) xr = Math.min(xrDef, aBndA[y]);
                else xr = xrDef;
                y2 = cy - y - h;
                w = xr - xl;
                if (w > 0) this._mkDiv(xl, y2, w, h);
            }
            if (iSects & 0xff00) {
                if (iSects & 0x0100) xl = Math.max(x, aBndA[y]);
                else xl = x;
                if (iSects & 0x0200) xr = Math.min(xrDef, aBndZ[y]);
                else xr = xrDef;
                y2 = cy + y + (iOdds >> 16);
                w = xr - xl;
                if (w > 0) this._mkDiv(xl, y2, w, h);
            }
        }
    };
    this.setStroke(1);
    this.setFont("verdana,geneva,helvetica,sans-serif", "12px", Font.PLAIN);
    this.color = "#000000";
    this.htm = "";
    this.wnd = wnd || window;
    if (!jg_ok) _chkDHTM();
    if (jg_ok) {
        if (cnv) {
            if (typeof(cnv) == "string") this.cont = document.all ? (this.wnd.document.all[cnv] || null) : document.getElementById ? (this.wnd.document.getElementById(cnv) || null) : null;
            else if (cnv == window.document) this.cont = document.getElementsByTagName("body")[0];
            else this.cont = cnv;
            this.cnv = document.createElement("div");
            this.cont.appendChild(this.cnv);
            this.paint = jg_dom ? _pntCnvDom : _pntCnvIe;
        } else this.paint = _pntDoc;
    } else this.paint = _pntN;
    this.setPrintable(false);
}

function _mkLinVirt(aLin, x1, y1, x2, y2) {
    var dx = Math.abs(x2 - x1),
        dy = Math.abs(y2 - y1),
        x = x1,
        y = y1,
        xIncr = (x1 > x2) ? -1 : 1,
        yIncr = (y1 > y2) ? -1 : 1,
        p, i = 0;
    if (dx >= dy) {
        var pr = dy << 1,
            pru = pr - (dx << 1);
        p = pr - dx;
        while (dx > 0) {
            --dx;
            if (p > 0) {
                aLin[i++] = x;
                y += yIncr;
                p += pru;
            } else p += pr;
            x += xIncr;
        }
    } else {
        var pr = dx << 1,
            pru = pr - (dy << 1);
        p = pr - dy;
        while (dy > 0) {
            --dy;
            y += yIncr;
            aLin[i++] = x;
            if (p > 0) {
                x += xIncr;
                p += pru;
            } else p += pr;
        }
    }
    for (var len = aLin.length, i = len - i; i;) aLin[len - (i--)] = x;
};

function _CompInt(x, y) {
    return (x - y);
}
var spacer = 'transparentpixel.gif';
var CLONE = 'C10nE';
var COPY = 'C0pY';
var DETACH_CHILDREN = 'd37aCH';
var HORIZONTAL = 'H0r1Z';
var MAXHEIGHT = 'm7x8I';
var MAXOFFBOTTOM = 'm7xd0wN';
var MAXOFFLEFT = 'm7x23Ft';
var MAXOFFRIGHT = 'm7x0Ff8';
var MAXOFFTOP = 'm7xu9';
var MAXWIDTH = 'm7xW1';
var MINWIDTH = 'm1nw1';
var MINHEIGHT = 'm1n8I';
var NO_ALT = 'no81T';
var NO_DRAG = 'N0d4Ag';
var RESET_Z = 'r35E7z';
var RESIZABLE = 'r5IZbl';
var SCALABLE = 'SCLbl';
var SCROLL = 'sC8lL';
var TRANSPARENT = 'dIApHAn';
var VERTICAL = 'V3Rt1C';
var dd_cursors = new Array('c:default', 'c:crosshair', 'c:e-resize', 'c:hand', 'c:help', 'c:move', 'c:n-resize', 'c:ne-resize', 'c:nw-resize', 'c:s-resize', 'c:se-resize', 'c:sw-resize', 'c:text', 'c:w-resize', 'c:wait');
var dd_i = dd_cursors.length;
while (dd_i--) eval('var CURSOR_' + (dd_cursors[dd_i].substring(2).toUpperCase().replace('-', '_')) + '="' + dd_cursors[dd_i] + '";');

function WZDD() {
    this.elements = new Array(0);
    this.obj = null;
    this.n = navigator.userAgent.toLowerCase();
    this.db = (document.compatMode && document.compatMode.toLowerCase() != "backcompat") ? document.documentElement : (document.body || null);
    this.op = !!(window.opera && document.getElementById);
    this.op6 = !!(this.op && !(this.db && this.db.innerHTML));
    if (this.op && !this.op6) document.onmousedown = new Function('e', 'if (((e=e || window.event).target || e.srcElement).tagName=="IMAGE") return false;');
    this.ie = !!(this.n.indexOf("msie") >= 0 && document.all && this.db && !this.op);
    this.iemac = !!(this.ie && this.n.indexOf("mac") >= 0);
    this.ie4 = !!(this.ie && !document.getElementById);
    this.n4 = !!(document.layers && typeof document.classes != "undefined");
    this.n6 = !!(typeof window.getComputedStyle != "undefined" && typeof document.createRange != "undefined");
    this.w3c = !!(!this.op && !this.ie && !this.n6 && document.getElementById);
    this.ce = !!(document.captureEvents && document.releaseEvents);
    this.px = (this.n4 || this.op6) ? '' : 'px';
    this.tiv = this.w3c ? 40 : 10;
}
var dd = new WZDD();
dd.Int = function(d_x, d_y) {
    return isNaN(d_y = parseInt(d_x)) ? 0 : d_y;
};
dd.getWndW = function() {
    return dd.Int((dd.db && !dd.op && !dd.w3c && dd.db.clientWidth) ? dd.db.clientWidth : (window.innerWidth || 0));
};
dd.getWndH = function() {
    return dd.Int((dd.db && !dd.op && !dd.w3c && dd.db.clientHeight) ? dd.db.clientHeight : (window.innerHeight || 0));
};
dd.getScrollX = function() {
    return dd.Int(window.pageXOffset || (dd.db ? dd.db.scrollLeft : 0));
};
dd.getScrollY = function() {
    return dd.Int(window.pageYOffset || (dd.db ? dd.db.scrollTop : 0));
};
dd.getPageXY = function(d_o) {
    if (dd.n4 && d_o) {
        dd.x = d_o.pageX || 0;
        dd.y = d_o.pageY || 0;
    } else {
        dd.x = dd.y = 0;
        while (d_o) {
            dd.x += dd.Int(d_o.offsetLeft);
            dd.y += dd.Int(d_o.offsetTop);
            d_o = d_o.offsetParent || null;
        }
    }
};
dd.getCssXY = function(d_o) {
    if (d_o.div) {
        if (dd.n4) {
            d_o.cssx = d_o.div.x;
            d_o.cssy = d_o.div.y;
        } else if (dd.ie4) {
            d_o.cssx = d_o.css.pixelLeft;
            d_o.cssy = d_o.css.pixelTop;
        } else {
            d_o.css.left = d_o.css.top = 0 + dd.px;
            dd.getPageXY(d_o.div);
            d_o.cssx = d_o.x - dd.x;
            d_o.cssy = d_o.y - dd.y;
            d_o.css.left = d_o.cssx + dd.px;
            d_o.css.top = d_o.cssy + dd.px;
        }
    } else {
        d_o.cssx = 0;
        d_o.cssy = 0;
    }
};
dd.getImgW = function(d_o) {
    return d_o ? dd.Int(d_o.width) : 0;
};
dd.getImgH = function(d_o) {
    return d_o ? dd.Int(d_o.height) : 0;
};
dd.getDivW = function(d_o) {
    return dd.Int(dd.n4 ? (d_o.div ? d_o.div.clip.width : 0) : d_o.div ? (d_o.div.offsetWidth || d_o.css.pixelWidth || d_o.css.width || 0) : 0);
};
dd.getDivH = function(d_o) {
    return dd.Int(dd.n4 ? (d_o.div ? d_o.div.clip.height : 0) : d_o.div ? (d_o.div.offsetHeight || d_o.css.pixelHeight || d_o.css.height || 0) : 0);
};
dd.getWH = function(d_o) {
    d_o.w = dd.getDivW(d_o);
    d_o.h = dd.getDivH(d_o);
    if (d_o.css) {
        d_o.css.width = d_o.w + dd.px;
        d_o.css.height = d_o.h + dd.px;
        d_o.dw = dd.getDivW(d_o) - d_o.w;
        d_o.dh = dd.getDivH(d_o) - d_o.h;
        d_o.css.width = (d_o.w - d_o.dw) + dd.px;
        d_o.css.height = (d_o.h - d_o.dh) + dd.px;
    } else d_o.dw = d_o.dh = 0;
};
dd.getCssProp = function(d_o, d_pn6, d_pstyle, d_pn4) {
    if (d_o && dd.n6) return '' + window.getComputedStyle(d_o, null).getPropertyValue(d_pn6);
    if (d_o && d_o.currentStyle) return '' + eval('d_o.currentStyle.' + d_pstyle);
    if (d_o && d_o.style) return '' + eval('d_o.style.' + d_pstyle);
    if (d_o && dd.n4) return '' + eval('d_o.' + d_pn4);
    return '';
};
dd.getDiv = function(d_x, d_d) {
    d_d = d_d || document;
    if (dd.n4) {
        if (d_d.layers[d_x]) return d_d.layers[d_x];
        for (var d_i = d_d.layers.length; d_i--;) {
            var d_y = dd.getDiv(d_x, d_d.layers[d_i].document);
            if (d_y) return d_y;
        }
    }
    if (dd.ie) return d_d.all[d_x] || null;
    if (d_d.getElementById) return d_d.getElementById(d_x) || null;
    return null;
};
dd.getImg = function(d_o, d_nm, d_xy, d_w) {
    d_w = d_w || window;
    var d_img;
    if (document.images && (d_img = d_w.document.images[d_nm]) && d_img.name == d_nm) {
        if (d_xy) {
            if (dd.n4) {
                dd.getPageXY(d_w);
                d_o.defx = d_img.x + dd.x;
                d_o.defy = d_img.y + dd.y;
            } else {
                dd.getPageXY(d_img);
                d_o.defx = dd.x;
                d_o.defy = dd.y;
            }
        }
        return d_img;
    }
    if (dd.n4)
        for (var d_i = d_w.document.layers.length; d_i--;) {
            var d_y = dd.getImg(d_o, d_nm, d_xy, d_w.document.layers[d_i]);
            if (d_y) return d_y;
        }
    return null;
};
dd.getParent = function(d_o, d_p) {
    if (dd.n4) {
        for (d_p, d_i = dd.elements.length; d_i--;) {
            if (!((d_p = dd.elements[d_i]).is_image) && d_p.div && (d_p.div.document.layers[d_o.name] || d_o.oimg && d_p.div.document.images[d_o.oimg.name])) d_p.addChild(d_o, d_p.detach, 1);
        }
    } else {
        d_p = d_o.is_image ? dd.getImg(d_o, d_o.oimg.name) : (d_o.div || null);
        while (d_p && !!(d_p = d_p.offsetParent || d_p.parentNode || null)) {
            if (d_p.ddObj) {
                d_p.ddObj.addChild(d_o, d_p.ddObj.detach, 1);
                break;
            }
        }
    }
};
dd.getCmd = function(d_o, d_cmd, d_cmdStr) {
    var d_i = d_o.id.indexOf(d_cmd),
        d_j, d_y = (d_i >= 0) * 1;
    if (d_y) {
        d_j = d_i + d_cmd.length;
        if (d_cmdStr) d_o.cmd += d_o.id.substring(d_i, d_j);
        d_o.id = d_o.id.substring(0, d_i) + d_o.id.substring(d_j);
    }
    return d_y;
};
dd.getCmdVal = function(d_o, d_cmd, d_cmdStr, int0) {
    var d_i = d_o.id.indexOf(d_cmd),
        d_j, d_y = (d_o.id.indexOf(d_cmd) >= 0) ? dd.Int(d_o.id.substring(d_o.id.indexOf(d_cmd) + d_cmd.length)) : int0 ? -1 : 0;
    if (!int0 && d_y || int0 && d_y >= 0) {
        d_j = d_i + d_cmd.length + ("" + d_y).length;
        if (d_cmdStr) d_o.cmd += d_o.id.substring(d_i, d_j);
        d_o.id = d_o.id.substring(0, d_i) + d_o.id.substring(d_j);
    }
    return d_y;
};
dd.addElt = function(d_o, d_p) {
    dd.elements[d_o.name] = dd.elements[d_o.index = dd.elements.length] = d_o;
    if (d_p) d_p.copies[d_o.name] = d_p.copies[d_p.copies.length] = d_o;
};
dd.mkWzDom = function() {
    var d_o, d_i = dd.elements.length;
    while (d_i--) dd.getParent(dd.elements[d_i]);
    d_i = dd.elements.length;
    while (d_i--) {
        d_o = dd.elements[d_i];
        if (d_o.children && !d_o.parent) {
            var d_j = d_o.children.length;
            while (d_j--) d_o.children[d_j].setZ(d_o.z + d_o.children[d_j].z, 1);
        }
    }
};
dd.addProps = function(d_o) {
    var d_i, d_c;
    if (d_o.is_image) {
        d_o.div = dd.getDiv(d_o.id);
        if (d_o.div && typeof d_o.div.style != "undefined") d_o.css = d_o.div.style;
        d_o.nimg = (dd.n4 && d_o.div) ? d_o.div.document.images[0] : (document.images[d_o.id + 'NImG'] || null);
        if (d_o.nimg && !d_o.noalt && !dd.noalt) {
            d_o.nimg.alt = d_o.oimg.alt || '';
            if (d_o.oimg.title) d_o.nimg.title = d_o.oimg.title;
        }
        d_o.bgColor = '';
    } else {
        d_o.bgColor = dd.getCssProp(d_o.div, 'background-color', 'backgroundColor', 'bgColor').toLowerCase();
        if (dd.n6 && d_o.div) {
            if ((d_c = d_o.bgColor).indexOf('rgb') >= 0) {
                d_c = d_c.substring(4, d_c.length - 1).split(',');
                d_o.bgColor = '#';
                for (d_i = 0; d_i < d_c.length; d_i++) d_o.bgColor += parseInt(d_c[d_i]).toString(0x10);
            } else d_o.bgColor = d_c;
        }
    }
    if (dd.scalable) d_o.scalable = d_o.resizable ^ 1;
    else if (dd.resizable) d_o.resizable = d_o.scalable ^ 1;
    d_o.setZ(d_o.defz);
    d_o.cursor = d_o.cursor || dd.cursor || 'auto';
    d_o._setCrs(d_o.nodrag ? 'auto' : d_o.cursor);
    d_o.diaphan = d_o.diaphan || dd.diaphan || 0;
    d_o.opacity = 1.0;
    if (dd.ie && !dd.iemac && d_o.div) d_o.div.style.filter = "Alpha(opacity=100)";
    d_o.visible = true;
};
dd.initz = function() {
    if (!(dd && (dd.n4 || dd.n6 || dd.ie || dd.op || dd.w3c))) return;
    if (dd.op6) WINSZ(2);
    else if (dd.n6 || dd.ie || dd.op && !dd.op6 || dd.w3c) dd.recalc(1);
    var d_drag = (document.onmousemove == DRAG),
        d_resize = (document.onmousemove == RESIZE);
    if (dd.loadFunc) dd.loadFunc();
    if (d_drag && document.onmousemove != DRAG) dd.setEvtHdl(1, DRAG);
    else if (d_resize && document.onmousemove != RESIZE) dd.setEvtHdl(1, RESIZE);
    if ((d_drag || d_resize) && document.onmouseup != DROP) dd.setEvtHdl(2, DROP);
    dd.setEvtHdl(0, PICK);
};
dd.finlz = function() {
    if (dd.ie && dd.elements) {
        var d_i = dd.elements.length;
        while (d_i--) dd.elements[d_i].del();
    }
};
dd.setEvtHdl = function(d_typ, d_func) {
    if (!d_typ) {
        if (document.onmousedown != d_func) dd.downFunc = document.onmousedown || null;
        document.onmousedown = d_func;
    } else if (d_typ & 1) {
        if (document.onmousemove != d_func) dd.moveFunc = document.onmousemove || null;
        document.onmousemove = d_func;
    } else {
        if (document.onmouseup != d_func) dd.upFunc = document.onmouseup || null;
        document.onmouseup = d_func;
    }
    if (dd.ce) {
        var d_e = (!d_typ) ? Event.MOUSEDOWN : (d_typ & 1) ? Event.MOUSEMOVE : Event.MOUSEUP;
        d_func ? document.captureEvents(d_e) : document.releaseEvents(d_e);
    }
};
dd.evt = function(d_e) {
    this.but = (this.e = d_e || window.event).which || this.e.button || 0;
    this.button = (this.e.type == 'mousedown') ? this.but : (dd.e && dd.e.button) ? dd.e.button : 0;
    this.src = this.e.target || this.e.srcElement || null;
    this.src.tag = ("" + (this.src.tagName || this.src)).toLowerCase();
    this.x = dd.Int(this.e.pageX || this.e.clientX || 0);
    this.y = dd.Int(this.e.pageY || this.e.clientY || 0);
    if (dd.ie) {
        this.x += dd.getScrollX() - (dd.ie && !dd.iemac) * 1;
        this.y += dd.getScrollY() - (dd.ie && !dd.iemac) * 1;
    }
    this.modifKey = this.e.modifiers ? this.e.modifiers & Event.SHIFT_MASK : (this.e.shiftKey || false);
};
dd.recalc = function(d_x) {
    var d_o, d_i = dd.elements.length;
    while (d_i--) {
        if (!(d_o = dd.elements[d_i]).is_image && d_o.div) {
            dd.getWH(d_o);
            if (d_o.div.pos_rel) {
                dd.getPageXY(d_o.div);
                var d_dx = dd.x - d_o.x,
                    d_dy = dd.y - d_o.y;
                d_o.defx += d_dx;
                d_o.x += d_dx;
                d_o.defy += d_dy;
                d_o.y += d_dy;
                var d_p, d_j = d_o.children.length;
                while (d_j--) {
                    if (!(d_p = d_o.children[d_j]).detached && (d_o != d_p.defparent || !(d_p.is_image && dd.getImg(d_p, d_p.oimg.name, 1)))) {
                        d_p.defx += d_dx;
                        d_p.defy += d_dy;
                        d_p.moveBy(d_dx, d_dy);
                    }
                }
            }
        } else if (d_o.is_image && !dd.op6 && !dd.n4) {
            if (dd.n6 && d_x && !d_o.defw) d_o.resizeTo(d_o.defw = dd.getImgW(d_o.oimg), d_o.defh = dd.getImgH(d_o.oimg));
            var d_defx = d_o.defx,
                d_defy = d_o.defy;
            if (!(d_o.parent && d_o.parent != d_o.defparent) && (d_x || !d_o.detached || d_o.horizontal || d_o.vertical) && dd.getImg(d_o, d_o.oimg.name, 1)) d_o.moveBy(d_o.defx - d_defx, d_o.defy - d_defy);
        }
    }
};

function WINSZ(d_x) {
    if (d_x) {
        if (dd.n4 || dd.op6 && d_x & 2) {
            dd.iW = innerWidth;
            dd.iH = innerHeight;
            if (dd.op6) setTimeout("WINSZ()", 0x1ff);
        }
        window.onresize = new Function('WINSZ();');
    } else if ((dd.n4 || dd.op6) && (innerWidth != dd.iW || innerHeight != dd.iH)) location.reload();
    else if (dd.op6) setTimeout("WINSZ()", 0x1ff);
    else if (!dd.n4) setTimeout('dd.recalc()', 0xa);
}
WINSZ(1);

function DDObj(d_o, d_i) {
    this.id = d_o;
    this.cmd = '';
    this.cpy_n = dd.getCmdVal(this, COPY);
    this.maxoffb = dd.getCmdVal(this, MAXOFFBOTTOM, 0, 1);
    this.maxoffl = dd.getCmdVal(this, MAXOFFLEFT, 0, 1);
    this.maxoffr = dd.getCmdVal(this, MAXOFFRIGHT, 0, 1);
    this.maxofft = dd.getCmdVal(this, MAXOFFTOP, 0, 1);
    var d_j = dd_cursors.length;
    while (d_j--)
        if (dd.getCmd(this, dd_cursors[d_j], 1)) this.cursor = dd_cursors[d_j].substring(2);
    this.clone = dd.getCmd(this, CLONE, 1);
    this.detach = dd.getCmd(this, DETACH_CHILDREN);
    this.scalable = dd.getCmd(this, SCALABLE, 1);
    this.horizontal = dd.getCmd(this, HORIZONTAL);
    this.noalt = dd.getCmd(this, NO_ALT, 1);
    this.nodrag = dd.getCmd(this, NO_DRAG);
    this.scroll = dd.getCmd(this, SCROLL, 1);
    this.resizable = dd.getCmd(this, RESIZABLE, 1);
    this.re_z = dd.getCmd(this, RESET_Z, 1);
    this.diaphan = dd.getCmd(this, TRANSPARENT, 1);
    this.vertical = dd.getCmd(this, VERTICAL);
    this.maxw = dd.getCmdVal(this, MAXWIDTH, 1, 1);
    this.minw = Math.abs(dd.getCmdVal(this, MINWIDTH, 1, 1));
    this.maxh = dd.getCmdVal(this, MAXHEIGHT, 1, 1);
    this.minh = Math.abs(dd.getCmdVal(this, MINHEIGHT, 1, 1));
    this.name = this.id + (d_i || '');
    this.oimg = dd.getImg(this, this.id, 1);
    this.is_image = !!this.oimg;
    this.copies = new Array();
    this.children = new Array();
    this.parent = this.original = null;
    if (this.oimg) {
        this.id = this.name + 'div';
        this.w = dd.getImgW(this.oimg);
        this.h = dd.getImgH(this.oimg);
        this.dw = this.dh = 0;
        this.defz = dd.Int(dd.getCssProp(this.oimg, 'z-index', 'zIndex', 'zIndex')) || 1;
        this.defsrc = this.src = this.oimg.src;
        this.htm = '<img name="' + this.id + 'NImG"' + ' src="' + this.oimg.src + '" ' + 'width="' + this.w + '" height="' + this.h + '">';
        this.t_htm = '<div id="' + this.id + '" style="position:absolute;' + 'left:' + (this.cssx = this.x = this.defx) + 'px;' + 'top:' + (this.cssy = this.y = this.defy) + 'px;' + 'width:' + this.w + 'px;' + 'height:' + this.h + 'px;">' + this.htm + '<\/div>';
    } else {
        if (!!(this.div = dd.getDiv(this.id)) && typeof this.div.style != "undefined") this.css = this.div.style;
        dd.getWH(this);
        if (this.div) {
            this.div.ddObj = this;
            this.div.pos_rel = ("" + (this.div.parentNode ? this.div.parentNode.tagName : this.div.parentElement ? this.div.parentElement.tagName : '').toLowerCase().indexOf('body') < 0);
        }
        dd.getPageXY(this.div);
        this.defx = this.x = dd.x;
        this.defy = this.y = dd.y;
        dd.getCssXY(this);
        this.defz = dd.Int(dd.getCssProp(this.div, 'z-index', 'zIndex', 'zIndex'));
    }
    this.defw = this.w || 0;
    this.defh = this.h || 0;
}
DDObj.prototype.moveBy = function(d_x, d_y, d_kds, d_o) {
    if (!this.div) return;
    this.x += (d_x = dd.Int(d_x));
    this.y += (d_y = dd.Int(d_y));
    if (!d_kds || this.is_image || this.parent != this.defparent) {
        (d_o = this.css || this.div).left = (this.cssx += d_x) + dd.px;
        d_o.top = (this.cssy += d_y) + dd.px;
    }
    var d_i = this.children.length;
    while (d_i--) {
        if (!(d_o = this.children[d_i]).detached) d_o.moveBy(d_x, d_y, 1);
        d_o.defx += d_x;
        d_o.defy += d_y;
    }
};
DDObj.prototype.moveTo = function(d_x, d_y) {
    this.moveBy(dd.Int(d_x) - this.x, dd.Int(d_y) - this.y);
};
DDObj.prototype.hide = function(d_m, d_o, d_p) {
    if (this.div && this.visible) {
        d_p = this.css || this.div;
        if (d_m && !dd.n4) {
            this.display = dd.getCssProp(this.div, "display", "display", "display");
            if (this.oimg) {
                this.oimg.display = dd.getCssProp(this.oimg, "display", "display", "display");
                this.oimg.style.display = "none";
            }
            d_p.display = "none";
            dd.recalc();
        } else d_p.visibility = "hidden";
    }
    this.visible = false;
    var d_i = this.children.length;
    while (d_i--)
        if (!(d_o = this.children[d_i]).detached) d_o.hide(d_m);
};
DDObj.prototype.show = function(d_o, d_p) {
    if (this.div) {
        d_p = this.css || this.div;
        if (d_p.display && d_p.display == "none") {
            d_p.display = this.display || "block";
            if (this.oimg) this.oimg.style.display = this.oimg.display || "inline";
            dd.recalc();
        } else d_p.visibility = "visible";
    }
    this.visible = true;
    var d_i = this.children.length;
    while (d_i--)
        if (!(d_o = this.children[d_i]).detached) d_o.show();
};
DDObj.prototype.resizeTo = function(d_w, d_h, d_o) {
    if (!this.div) return;
    d_w = (this.w = dd.Int(d_w)) - this.dw;
    d_h = (this.h = dd.Int(d_h)) - this.dh;
    if (dd.n4) {
        this.div.resizeTo(d_w, d_h);
        if (this.is_image) {
            this.write('<img src="' + this.src + '" width="' + d_w + '" height="' + d_h + '">');
            (this.nimg = this.div.document.images[0]).src = this.src;
        }
    } else if (typeof this.css.pixelWidth != "undefined") {
        this.css.pixelWidth = d_w;
        this.css.pixelHeight = d_h;
        if (this.is_image) {
            (d_o = this.nimg.style).pixelWidth = d_w;
            d_o.pixelHeight = d_h;
        }
    } else {
        this.css.width = d_w + dd.px;
        this.css.height = d_h + dd.px;
        if (this.is_image) {
            (d_o = this.nimg).width = d_w;
            d_o.height = d_h;
            if (!d_o.complete) d_o.src = this.src;
        }
    }
};
DDObj.prototype.resizeBy = function(d_dw, d_dh) {
    this.resizeTo(this.w + dd.Int(d_dw), this.h + dd.Int(d_dh));
};
DDObj.prototype.swapImage = function(d_x, d_cp) {
    if (!this.nimg) return;
    this.nimg.src = d_x;
    this.src = this.nimg.src;
    if (d_cp) {
        var d_i = this.copies.length;
        while (d_i--) this.copies[d_i].src = this.copies[d_i].nimg.src = this.nimg.src;
    }
};
DDObj.prototype.setBgColor = function(d_x) {
    if (dd.n4 && this.div) this.div.bgColor = d_x;
    else if (this.css) this.css.background = d_x;
    this.bgColor = d_x;
};
DDObj.prototype.write = function(d_x, d_o) {
    this.text = d_x;
    if (!this.div) return;
    if (dd.n4) {
        (d_o = this.div.document).open();
        d_o.write(d_x);
        d_o.close();
        dd.getWH(this);
    } else if (!dd.op6) {
        this.css.height = 'auto';
        this.div.innerHTML = d_x;
        if (!dd.ie4) dd.recalc();
        if (dd.ie4 || dd.n6) setTimeout('dd.recalc();', 0);
    }
};
DDObj.prototype.copy = function(d_n, d_p) {
    if (!this.oimg) return;
    d_n = d_n || 1;
    while (d_n--) {
        var d_l = this.copies.length,
            d_o = new DDObj(this.name + this.cmd, d_l + 1);
        if (dd.n4) {
            d_o.id = (d_p = new Layer(d_o.w)).name;
            d_p.clip.height = d_o.h;
            d_p.visibility = 'show';
            (d_p = d_p.document).open();
            d_p.write(d_o.htm);
            d_p.close();
        } else if (dd.db.insertAdjacentHTML) dd.db.insertAdjacentHTML("AfterBegin", d_o.t_htm);
        else if (document.createElement && dd.db && dd.db.appendChild) {
            dd.db.appendChild(d_p = document.createElement('div'));
            d_p.innerHTML = d_o.htm;
            d_p.id = d_o.id;
            d_p.style.position = 'absolute';
            d_p.style.width = d_o.w + 'px';
            d_p.style.height = d_o.h + 'px';
        } else if (dd.db && dd.db.innerHTML) dd.db.innerHTML += d_o.t_htm;
        d_o.defz = this.defz + 1 + d_l;
        dd.addProps(d_o);
        d_o.original = this;
        dd.addElt(d_o, this);
        if (this.parent) {
            this.parent.addChild(d_o, this.detached);
            d_o.defparent = this.defparent;
        }
        d_o.moveTo(d_o.defx = this.defx, d_o.defy = this.defy);
        if (dd.n4) d_o.defsrc = d_o.src = this.defsrc;
        d_o.swapImage(this.src);
    }
};
DDObj.prototype.addChild = function(d_kd, detach, defp) {
    if (typeof d_kd != "object") d_kd = dd.elements[d_kd];
    if (d_kd.parent && d_kd.parent == this || d_kd == this || !d_kd.is_image && d_kd.defparent && !defp) return;
    this.children[this.children.length] = this.children[d_kd.name] = d_kd;
    d_kd.detached = detach || 0;
    if (defp) d_kd.defparent = this;
    else if (this == d_kd.defparent && d_kd.is_image) dd.getImg(this, d_kd.oimg.name, 1);
    if (!d_kd.defparent || this != d_kd.defparent) {
        d_kd.defx = d_kd.x;
        d_kd.defy = d_kd.y;
    }
    if (!detach) {
        d_kd.defz = d_kd.defz + this.defz - (d_kd.parent ? d_kd.parent.defz : 0) + (!d_kd.is_image * 1);
        d_kd.setZ(d_kd.z + this.z - (d_kd.parent ? d_kd.parent.z : 0) + (!d_kd.is_image * 1), 1);
    }
    if (d_kd.parent) d_kd.parent._removeChild(d_kd, 1);
    d_kd.parent = this;
};
DDObj.prototype._removeChild = function(d_kd, d_newp) {
    if (typeof d_kd != "object") d_kd = this.children[d_kd];
    var d_oc = this.children,
        d_nc = new Array();
    for (var d_i = 0; d_i < d_oc.length; d_i++)
        if (d_oc[d_i] != d_kd) d_nc[d_nc.length] = d_oc[d_i];
    this.children = d_nc;
    d_kd.parent = null;
    if (!d_newp) {
        d_kd.detached = d_kd.defp = 0;
        if (d_kd.is_image) dd.getImg(d_kd, d_kd.oimg.name, 1);
    }
};
DDObj.prototype.attachChild = function(d_kd) {
    (d_kd = (typeof d_kd != "object") ? this.children[d_kd] : d_kd).detached = 0;
    d_kd.setZ(d_kd.defz + this.z - this.defz, 1);
};
DDObj.prototype.detachChild = function(d_kd) {
    (d_kd = (typeof d_kd != "object") ? this.children[d_kd] : d_kd).detached = 1;
};
DDObj.prototype.setZ = function(d_x, d_kds, d_o) {
    if (d_kds) {
        var d_dz = d_x - this.z,
            d_i = this.children.length;
        while (d_i--)
            if (!(d_o = this.children[d_i]).detached) d_o.setZ(d_o.z + d_dz, 1);
    }
    dd.z = Math.max(dd.z, this.z = this.div ? ((this.css || this.div).zIndex = d_x) : 0);
};
DDObj.prototype.maximizeZ = function() {
    this.setZ(dd.z + 1, 1);
};
DDObj.prototype._resetZ = function(d_o) {
    if (this.re_z || dd.re_z) {
        this.setZ(this.defz);
        var d_i = this.children.length;
        while (d_i--)
            if (!(d_o = this.children[d_i]).detached) d_o.setZ(d_o.defz);
    }
};
DDObj.prototype.setOpacity = function(d_x) {
    this.opacity = d_x;
    this._setOpaRel(1.0, 1);
};
DDObj.prototype._setOpaRel = function(d_x, d_kd, d_y, d_o) {
    if (this.diaphan || d_kd) {
        d_y = this.opacity * d_x;
        if (dd.n6) this.css.MozOpacity = d_y;
        else if (dd.ie && !dd.iemac && typeof this.div.filters != "undefined") this.div.filters[0].opacity = parseInt(100 * d_y);
        else if (this.css) this.css.opacity = d_y;
        var d_i = this.children.length;
        while (d_i--)
            if (!(d_o = this.children[d_i]).detached) d_o._setOpaRel(d_x, 1);
    }
};
DDObj.prototype.setCursor = function(d_x) {
    this._setCrs(this.cursor = (d_x.indexOf('c:') + 1) ? d_x.substring(2) : d_x);
};
DDObj.prototype._setCrs = function(d_x) {
    if (this.css) this.css.cursor = ((!dd.ie || dd.iemac) && d_x == 'hand') ? 'pointer' : d_x;
};
DDObj.prototype.setDraggable = function(d_x) {
    this.nodrag = !d_x * 1;
    this._setCrs(d_x ? this.cursor : 'auto');
};
DDObj.prototype.setResizable = function(d_x) {
    this.resizable = d_x * 1;
    if (d_x) this.scalable = 0;
};
DDObj.prototype.setScalable = function(d_x) {
    this.scalable = d_x * 1;
    if (d_x) this.resizable = 0;
};
DDObj.prototype.del = function(d_os, d_o) {
    var d_i;
    if (this.parent && this.parent._removeChild) this.parent._removeChild(this);
    if (this.original) {
        this.hide();
        if (this.original.copies) {
            d_os = new Array();
            for (d_i = 0; d_i < this.original.copies.length; d_i++)
                if ((d_o = this.original.copies[d_i]) != this) d_os[d_o.name] = d_os[d_os.length] = d_o;
            this.original.copies = d_os;
        }
    } else if (this.is_image) {
        this.hide();
        if (this.oimg) {
            if (dd.n4) this.oimg.src = this.defsrc;
            else this.oimg.style.visibility = 'visible';
        }
    } else if (this.moveTo) {
        if (this.css) this.css.cursor = 'default';
        this.moveTo(this.defx, this.defy);
        this.resizeTo(this.defw, this.defh);
    }
    d_os = new Array();
    for (d_i = 0; d_i < dd.elements.length; d_i++) {
        if ((d_o = dd.elements[d_i]) != this) d_os[d_o.name] = d_os[d_o.index = d_os.length] = d_o;
        else d_o._free();
    }
    dd.elements = d_os;
    if (!dd.op6 && !dd.n4) dd.recalc();
};
DDObj.prototype._free = function() {
    for (var d_i in this) this[d_i] = null;
    dd.elements[this.name] = null;
};
dd.n4RectVis = function(vis) {
    for (var d_i = 4; d_i--;) {
        dd.rectI[d_i].visibility = dd.rectA[d_i].visibility = vis ? 'show' : 'hide';
        if (vis) dd.rectI[d_i].zIndex = dd.rectA[d_i].zIndex = dd.z + 2;
    }
};
dd.n4RectPos = function(d_o, d_x, d_y, d_w, d_h) {
    d_o.x = d_x;
    d_o.y = d_y;
    d_o.clip.width = d_w;
    d_o.clip.height = d_h;
};
dd.n4Rect = function(d_w, d_h) {
    var d_i;
    if (!dd.rectI) {
        dd.rectI = new Array();
        dd.rectA = new Array();
    }
    if (!dd.rectI[0]) {
        for (d_i = 4; d_i--;) {
            (dd.rectI[d_i] = new Layer(1)).bgColor = '#000000';
            (dd.rectA[d_i] = new Layer(1)).bgColor = '#ffffff';
        }
    }
    if (!dd.rectI[0].visibility || dd.rectI[0].visibility == 'hide') dd.n4RectVis(1);
    dd.obj.w = d_w;
    dd.obj.h = d_h;
    for (d_i = 4; d_i--;) {
        dd.n4RectPos(dd.rectI[d_i], dd.obj.x + (!(d_i - 1) ? (dd.obj.w - 1) : 0), dd.obj.y + (!(d_i - 2) ? (dd.obj.h - 1) : 0), d_i & 1 || dd.obj.w, !(d_i & 1) || dd.obj.h);
        dd.n4RectPos(dd.rectA[d_i], !(d_i - 1) ? dd.rectI[1].x + 1 : (dd.obj.x - 1), !(d_i - 2) ? dd.rectI[2].y + 1 : (dd.obj.y - 1), d_i & 1 || dd.obj.w + 2, !(d_i & 1) || dd.obj.h + 2);
    }
};
dd.reszTo = function(d_w, d_h) {
    if (dd.n4 && dd.obj.is_image) dd.n4Rect(d_w, d_h);
    else dd.obj.resizeTo(d_w, d_h);
};
dd.embedVis = function(d_vis) {
    var d_o = new Array('iframe', 'applet', 'embed', 'object');
    var d_i = d_o.length;
    while (d_i--) {
        var d_p = dd.ie ? document.all.tags(d_o[d_i]) : document.getElementsByTagName ? document.getElementsByTagName(d_o[d_i]) : null;
        if (d_p) {
            var d_j = d_p.length;
            while (d_j--) {
                var d_q = d_p[d_j];
                while (d_q.offsetParent || d_q.parentNode) {
                    if ((d_q = d_q.parentNode || d_q.offsetParent || null) == dd.obj.div) {
                        d_p[d_j].style.visibility = d_vis;
                        break;
                    }
                }
            }
        }
    }
};
dd.maxOffX = function(d_x, d_y) {
    return ((dd.obj.maxoffl + 1 && (d_y = dd.obj.defx - dd.obj.maxoffl) - d_x > 0 || dd.obj.maxoffr + 1 && (d_y = dd.obj.defx + dd.obj.maxoffr) - d_x < 0) ? d_y : d_x);
};
dd.maxOffY = function(d_x, d_y) {
    return ((dd.obj.maxofft + 1 && (d_y = dd.obj.defy - dd.obj.maxofft) - d_x > 0 || dd.obj.maxoffb + 1 && (d_y = dd.obj.defy + dd.obj.maxoffb) - d_x < 0) ? d_y : d_x);
};
dd.inWndW = function(d_x, d_y) {
    var d_wx = dd.getScrollX(),
        d_ww = dd.getWndW();
    return (((d_y = d_wx + 2) - d_x > 0) || ((d_y = d_wx + d_ww + dd.obj.w - 2) - d_x < 0) ? d_y : d_x);
};
dd.inWndH = function(d_x, d_y) {
    var d_wy = dd.getScrollY(),
        d_wh = dd.getWndH();
    return (((d_y = d_wy + 2) - d_x > 0) || ((d_y = d_wy + d_wh + dd.obj.h - 2) - d_x < 0) ? d_y : d_x);
};
dd.limW = function(d_w) {
    return ((dd.obj.minw - d_w > 0) ? dd.obj.minw : (dd.obj.maxw > 0 && dd.obj.maxw - d_w < 0) ? dd.obj.maxw : d_w);
};
dd.limH = function(d_h) {
    return ((dd.obj.minh - d_h > 0) ? dd.obj.minh : (dd.obj.maxh > 0 && dd.obj.maxh - d_h < 0) ? dd.obj.maxh : d_h);
};

function DDScroll() {
    if (!dd.obj || !dd.obj.scroll && !dd.scroll || dd.op || dd.ie4 || dd.whratio) {
        dd.scrx = dd.scry = 0;
        return;
    }
    var d_bnd = 0x1c,
        d_wx = dd.getScrollX(),
        d_wy = dd.getScrollY();
    if (dd.msmoved) {
        var d_ww = dd.getWndW(),
            d_wh = dd.getWndH(),
            d_y;
        dd.scrx = ((d_y = dd.e.x - d_ww - d_wx + d_bnd) > 0) ? (d_y >>= 2) * d_y : ((d_y = d_wx + d_bnd - dd.e.x) > 0) ? -(d_y >>= 2) * d_y : 0;
        dd.scry = ((d_y = dd.e.y - d_wh - d_wy + d_bnd) > 0) ? (d_y >>= 2) * d_y : ((d_y = d_wy + d_bnd - dd.e.y) > 0) ? -(d_y >>= 2) * d_y : 0;
    }
    if (dd.scrx || dd.scry) {
        window.scrollTo(d_wx + (dd.scrx = dd.obj.is_resized ? dd.limW(dd.obj.w + dd.scrx) - dd.obj.w : dd.obj.vertical ? 0 : (dd.maxOffX(dd.obj.x + dd.scrx) - dd.obj.x)), d_wy + (dd.scry = dd.obj.is_resized ? dd.limH(dd.obj.h + dd.scry) - dd.obj.h : dd.obj.horizontal ? 0 : (dd.maxOffY(dd.obj.y + dd.scry) - dd.obj.y)));
        dd.obj.is_dragged ? dd.obj.moveTo(dd.obj.x + dd.getScrollX() - d_wx, dd.obj.y + dd.getScrollY() - d_wy) : dd.reszTo(dd.obj.w + dd.getScrollX() - d_wx, dd.obj.h + dd.getScrollY() - d_wy);
    }
    dd.msmoved = 0;
    window.setTimeout('DDScroll()', 0x33);
}

function PICK(d_ev) {
    dd.e = new dd.evt(d_ev);
    if (dd.e.x >= dd.getWndW() + dd.getScrollX() || dd.e.y >= dd.getWndH() + dd.getScrollY()) return true;
    var d_o, d_cmp = -1,
        d_i = dd.elements.length;
    while (d_i--) {
        d_o = dd.elements[d_i];
        if (dd.n4 && dd.e.but > 1 && dd.e.src == d_o.oimg && !d_o.clone) return false;
        if (d_o.visible && dd.e.but <= 1 && dd.e.x >= d_o.x && dd.e.x <= d_o.x + d_o.w && dd.e.y >= d_o.y && dd.e.y <= d_o.y + d_o.h) {
            if (d_o.z > d_cmp && dd.e.src.tag.indexOf('input') < 0 && dd.e.src.tag.indexOf('textarea') < 0 && dd.e.src.tag.indexOf('select') < 0 && dd.e.src.tag.indexOf('option') < 0) {
                d_cmp = d_o.z;
                dd.obj = d_o;
            }
        }
    }
    if (dd.obj) {
        if (dd.obj.nodrag) dd.obj = null;
        else {
            dd.e.e.cancelBubble = true;
            var d_rsz = dd.e.modifKey && (dd.obj.resizable || dd.obj.scalable);
            if (dd.op && !dd.op6) {
                (d_o = document.getElementById('OpBlUr')).style.pixelLeft = dd.e.x;
                d_o.style.pixelTop = dd.e.y;
                (d_o = d_o.children[0].children[0]).focus();
                d_o.blur();
            } else if (dd.ie && !dd.ie4) {
                if (document.selection && document.selection.empty) document.selection.empty();
                dd.db.onselectstart = function() {
                    event.returnValue = false;
                };
            }
            if (d_rsz) {
                dd.obj._setCrs('se-resize');
                dd.obj.is_resized = 1;
                dd.whratio = dd.obj.scalable ? dd.obj.defw / dd.obj.defh : 0;
                if (dd.ie) {
                    if (dd.ie4) {
                        window.dd_x = dd.getScrollX();
                        window.dd_y = dd.getScrollY();
                    }
                    setTimeout('if (dd.obj && document.selection && document.selection.empty)' + '{' + 'document.selection.empty();' + 'if (dd.ie4) window.scrollTo(window.dd_x, window.dd_y);' + '}', 0);
                }
                dd.setEvtHdl(1, RESIZE);
                dd.reszTo(dd.obj.w, dd.obj.h);
            } else {
                dd.obj.is_dragged = 1;
                dd.setEvtHdl(1, DRAG);
            }
            dd.setEvtHdl(2, DROP);
            dd.embedVis('hidden');
            dd.obj._setOpaRel(0.7);
            dd.obj.maximizeZ();
            dd.ofx = dd.obj.x + dd.obj.w - dd.e.x;
            dd.ofy = dd.obj.y + dd.obj.h - dd.e.y;
            if (window.my_PickFunc) my_PickFunc();
            DDScroll();
            return !(dd.obj.is_resized || dd.n4 && dd.obj.is_image || dd.n6 || dd.w3c);
        }
    }
    if (dd.downFunc) return dd.downFunc(d_ev);
    return true;
}

function DRAG(d_ev) {
    if (!dd.obj || !dd.obj.visible) return true;
    if (dd.ie4 || dd.w3c || dd.n6 || dd.obj.children.length > 0xf) {
        if (dd.wait) return false;
        dd.wait = 1;
        setTimeout('dd.wait=0;', dd.tiv);
    }
    dd.e = new dd.evt(d_ev);
    if (dd.ie && !dd.e.but) {
        DROP(d_ev);
        return true;
    }
    dd.msmoved = 1;
    dd.obj.moveTo(dd.obj.vertical ? dd.obj.x : dd.maxOffX(dd.inWndW(dd.ofx + dd.e.x) - dd.obj.w), dd.obj.horizontal ? dd.obj.y : dd.maxOffY(dd.inWndH(dd.ofy + dd.e.y) - dd.obj.h));
    if (window.my_DragFunc) my_DragFunc();
    return false;
}

function RESIZE(d_ev) {
    if (!dd.obj || !dd.obj.visible) return true;
    if (dd.wait) return false;
    dd.wait = 1;
    setTimeout('dd.wait=0;', dd.tiv);
    dd.e = new dd.evt(d_ev);
    if (dd.ie && !dd.e.but) {
        DROP(d_ev);
        return true;
    }
    dd.msmoved = 1;
    var d_w = dd.limW(dd.inWndW(dd.ofx + dd.e.x) - dd.obj.x),
        d_h;
    if (!dd.whratio) d_h = dd.limH(dd.inWndH(dd.ofy + dd.e.y) - dd.obj.y);
    else {
        d_h = dd.limH(dd.inWndH(Math.round(d_w / dd.whratio) + dd.obj.y) - dd.obj.y);
        d_w = Math.round(d_h * dd.whratio);
    }
    dd.reszTo(d_w, d_h);
    if (window.my_ResizeFunc) my_ResizeFunc();
    return false;
}

function DROP(d_ev) {
    if (dd.obj) {
        if (dd.obj.is_dragged) {
            if (!dd.obj.is_image) dd.getWH(dd.obj);
        } else if (dd.n4) {
            if (dd.obj.is_image) {
                dd.n4RectVis(0);
                dd.obj.resizeTo(dd.obj.w, dd.obj.h);
            }
        }
        if (!dd.n4 && !dd.op6 || !dd.obj.is_image) dd.recalc();
        dd.setEvtHdl(1, dd.moveFunc);
        dd.setEvtHdl(2, dd.upFunc);
        if (dd.db) dd.db.onselectstart = null;
        dd.obj._setOpaRel(1.0);
        dd.obj._setCrs(dd.obj.cursor);
        dd.embedVis('visible');
        dd.obj._resetZ();
        if (window.my_DropFunc) {
            dd.e = new dd.evt(d_ev);
            my_DropFunc();
        }
        dd.msmoved = dd.obj.is_dragged = dd.obj.is_resized = dd.whratio = 0;
        dd.obj = null;
    }
    dd.setEvtHdl(0, PICK);
}

function SET_DHTML() {
    var d_a = arguments,
        d_ai, d_htm = '',
        d_o, d_i = d_a.length;
    while (d_i--) {
        if (dd.op6) {
            var d_t0 = (new Date()).getTime();
            while ((new Date()).getTime() - d_t0 < 0x99);
        }
        if (!(d_ai = d_a[d_i]).indexOf('c:')) dd.cursor = d_ai.substring(2);
        else if (d_ai == NO_ALT) dd.noalt = 1;
        else if (d_ai == SCROLL) dd.scroll = 1;
        else if (d_ai == RESET_Z) dd.re_z = 1;
        else if (d_ai == RESIZABLE) dd.resizable = 1;
        else if (d_ai == SCALABLE) dd.scalable = 1;
        else if (d_ai == TRANSPARENT) dd.diaphan = 1;
        else {
            d_o = new DDObj(d_ai);
            dd.addElt(d_o);
            d_htm += d_o.t_htm || '';
            if (d_o.oimg && d_o.cpy_n) {
                var d_j = 0;
                while (d_j < d_o.cpy_n) {
                    var d_p = new DDObj(d_o.name + d_o.cmd, ++d_j);
                    dd.addElt(d_p, d_o);
                    d_p.defz = d_o.defz + d_j;
                    d_p.original = d_o;
                    d_htm += d_p.t_htm;
                }
            }
        }
    }
    if (dd.n4 || dd.n6 || dd.ie || dd.op || dd.w3c) document.write((dd.n4 ? '<div style="position:absolute;"><\/div>\n' : (dd.op && !dd.op6) ? '<div id="OpBlUr" style="position:absolute;visibility:hidden;width:0px;height:0px;"><form><input type="text" style="width:0px;height:0px;"><\/form><\/div>' : '') + d_htm);
    dd.z = 0x33;
    d_i = dd.elements.length;
    while (d_i--) {
        dd.addProps(d_o = dd.elements[d_i]);
        if (d_o.is_image && !d_o.original && !d_o.clone) dd.n4 ? d_o.oimg.src = spacer : d_o.oimg.style.visibility = 'hidden';
    }
    dd.mkWzDom();
    if (window.onload) dd.loadFunc = window.onload;
    document.onmousedown = document.onmousedown || null;
    document.onmousemove = document.onmousemove || null;
    document.onmouseup = document.onmouseup || null;
    window.onload = dd.initz;
    window.onunload = dd.finlz;
    dd.setEvtHdl(0, PICK);
}

function ADD_DHTML(d_o) {
    d_o = new DDObj(d_o);
    dd.addElt(d_o);
    dd.addProps(d_o);
    dd.mkWzDom();
}
dd.d = document;
var RESET_ZINDEX = RESET_Z;
var KEYDOWN_RESIZE = RESIZABLE;
var CURSOR_POINTER = CURSOR_HAND;
var NO_SCROLL = '';

function my_PickFunc() {
    if (dd.obj.my_PickFunc) {
        dd.obj.my_PickFunc();
    }
}

function my_DragFunc() {
    if (dd.obj.my_DragFunc) {
        dd.obj.my_DragFunc();
    }
}

function my_ResizeFunc() {
    if (dd.obj.my_ResizeFunc) {
        dd.obj.my_ResizeFunc();
    }
}

function my_DropFunc() {
    if (dd.obj.my_DropFunc) {
        dd.obj.my_DropFunc();
    }
}
var isCSS, isW3C, isIE4, isNN4;

function initDHTMLAPI() {
    if (document.images) {
        isCSS = (document.body && document.body.style) ? true : false;
        isW3C = (isCSS && document.getElementById) ? true : false;
        isIE4 = (isCSS && document.all) ? true : false;
        isNN4 = (document.layers) ? true : false;
        isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
    }
}

function seekLayer(doc, name) {
    var theObj;
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            theObj = doc.layers[i];
            break;
        }
        if (doc.layers[i].document.layers.length > 0) {
            theObj = seekLayer(document.layers[i].document, name);
        }
    }
    return theObj;
}

function getRawObject(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (isW3C) {
            theObj = document.getElementById(obj);
        } else if (isIE4) {
            theObj = document.all(obj);
        } else if (isNN4) {
            theObj = seekLayer(document, obj);
        }
    } else {
        theObj = obj;
    }
    return theObj;
}

function getObject(obj) {
    var theObj = getRawObject(obj);
    if (theObj && isCSS) {
        theObj = theObj.style;
    }
    return theObj;
}

function shiftTo(obj, x, y) {
    var theObj = getObject(obj);
    if (theObj) {
        if (isCSS) {
            var units = (typeof theObj.left == "string") ? "px" : 0;
            theObj.left = x + units;
            theObj.top = y + units;
        } else if (isNN4) {
            theObj.moveTo(x, y)
        }
    }
}

function shiftBy(obj, deltaX, deltaY) {
    var theObj = getObject(obj);
    if (theObj) {
        if (isCSS) {
            var units = (typeof theObj.left == "string") ? "px" : 0;
            theObj.left = getObjectLeft(obj) + deltaX + units;
            theObj.top = getObjectTop(obj) + deltaY + units;
        } else if (isNN4) {
            theObj.moveBy(deltaX, deltaY);
        }
    }
}

function setZIndex(obj, zOrder) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.zIndex = zOrder;
    }
}

function setBGColor(obj, color) {
    var theObj = getObject(obj);
    if (theObj) {
        if (isNN4) {
            theObj.bgColor = color;
        } else if (isCSS) {
            theObj.backgroundColor = color;
        }
    }
}

function show(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.visibility = "visible";
    }
}

function hide(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.visibility = "hidden";
    }
}

function getObjectLeft(obj) {
    var elem = getRawObject(obj);
    var result = 0;
    if (document.defaultView) {
        var style = document.defaultView;
        var cssDecl = style.getComputedStyle(elem, "");
        result = cssDecl.getPropertyValue("left");
    } else if (elem.currentStyle) {
        result = elem.currentStyle.left;
    } else if (elem.style) {
        result = elem.style.left;
    } else if (isNN4) {
        result = elem.left;
    }
    return parseInt(result);
}

function getObjectTop(obj) {
    var elem = getRawObject(obj);
    var result = 0;
    if (document.defaultView) {
        var style = document.defaultView;
        var cssDecl = style.getComputedStyle(elem, "");
        result = cssDecl.getPropertyValue("top");
    } else if (elem.currentStyle) {
        result = elem.currentStyle.top;
    } else if (elem.style) {
        result = elem.style.top;
    } else if (isNN4) {
        result = elem.top;
    }
    return parseInt(result);
}

function getObjectWidth(obj) {
    var elem = getRawObject(obj);
    var result = 0;
    if (elem.offsetWidth) {
        result = elem.offsetWidth;
    } else if (elem.clip && elem.clip.width) {
        result = elem.clip.width;
    } else if (elem.style && elem.style.pixelWidth) {
        result = elem.style.pixelWidth;
    }
    return parseInt(result);
}

function getObjectHeight(obj) {
    var elem = getRawObject(obj);
    var result = 0;
    if (elem.offsetHeight) {
        result = elem.offsetHeight;
    } else if (elem.clip && elem.clip.height) {
        result = elem.clip.height;
    } else if (elem.style && elem.style.pixelHeight) {
        result = elem.style.pixelHeight;
    }
    return parseInt(result);
}

function getInsideWindowWidth() {
    if (window.innerWidth) {
        return window.innerWidth;
    } else if (isIE6CSS) {
        return document.body.parentElement.clientWidth;
    } else if (document.body && document.body.clientWidth) {
        return document.body.clientWidth;
    }
    return 0;
}

function getInsideWindowHeight() {
    if (window.innerHeight) {
        return window.innerHeight;
    } else if (isIE6CSS) {
        return document.body.parentElement.clientHeight;
    } else if (document.body && document.body.clientHeight) {
        return document.body.clientHeight;
    }
    return 0;
}
var gnLastEventId = 0;
var KAMAP_ERROR = gnLastEventId++;
var KAMAP_WARNING = gnLastEventId++;
var KAMAP_NOTICE = gnLastEventId++;
var KAMAP_INITIALIZED = gnLastEventId++;
var KAMAP_MAP_INITIALIZED = gnLastEventId++;
var KAMAP_EXTENTS_CHANGED = gnLastEventId++;
var KAMAP_SCALE_CHANGED = gnLastEventId++;
var KAMAP_LAYER_STATUS_CHANGED = gnLastEventId++;
var KAMAP_CONTEXT_MENU = gnLastEventId++;
var KAMAP_METAEXTENTS_CHANGED = gnLastEventId++;
var KAMAP_MAP_CLICKED = gnLastEventId++;

function kaMap(szID) {
    this.isCSS = false;
    this.isW3C = false;
    this.isIE4 = false;
    this.isNN4 = false;
    this.isIE6CSS = false;
    if (document.images) {
        this.isCSS = (document.body && document.body.style) ? true : false;
        this.isW3C = (this.isCSS && document.getElementById) ? true : false;
        this.isIE4 = (this.isCSS && document.all) ? true : false;
        this.isNN4 = (document.layers) ? true : false;
        this.isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
    }
    this.domObj = this.getRawObject(szID);
    this.domObj.style.overflow = 'hidden';
    this.hideLayersOnMove = false;
    this.initializationState = 0;
    this.bMouseDown = false;
    this.lastx = 0;
    this.lasty = 0;
    this.theInsideLayer = null;
    this.viewportWidth = this.getObjectWidth(this.domObj);
    this.viewportHeight = this.getObjectHeight(this.domObj);
    this.xOffset = 0;
    this.yOffset = 0;
    this.xOrigin = 0;
    this.yOrigin = 0;
    this.currentMap = '';
    this.nWide = 0;
    this.nHigh = 0;
    this.nCurrentTop = 0;
    this.nCurrentLeft = 0;
    this.aPixel = new Image(1, 1);
    this.aPixel.src = 'kamap/images/a_pixel.gif';
    this.aMaps = new Array();
    this.tileWidth = null;
    this.tileHeight = null;
    this.nBuffer = 1;
    this.cellSize = null;
    this.gImageID = 0;
    this.eventManager = new _eventManager();
    this.as = slideid = null;
    this.accelerationFactor = 1;
    this.pixelsPerStep = 30;
    this.timePerStep = 25;
    if (gogisApplication.ZOOM_ANIMATION_TIME && gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] && gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] > 0 && gogisApplication.ZOOM_ANIMATION_INTERVALL && gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance] && gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance] > 0) {
        this.queueManager = new GogisQueueManager("myKaMap.queueManager", parseInt(gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance]) + parseInt(gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance]));
    }
    this.triggerTimeout = null;
    this.server = 'kamap/php/';
    this.init = "kamap/php/init.php";
    this.tileURL = 'tile.php';
    this.aDomObjects = [];
    this.aObjects = [];
    this.aCanvases = [];
    this.layersHidden = false;
    this.aTools = [];
    this.aInfoTools = [];
    for (var i = 0; i < gnLastEventId; i++) {
        this.registerEventID(i);
    }
    this.createLayers();
};
kaMap.prototype.seekLayer = function(doc, name) {
    var theObj;
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            theObj = doc.layers[i];
            break;
        }
        if (doc.layers[i].document.layers.length > 0) {
            theObj = this.seekLayer(document.layers[i].document, name);
        }
    }
    return theObj;
};
kaMap.prototype.getRawObject = function(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (this.isW3C) {
            theObj = document.getElementById(obj);
        } else if (this.isIE4) {
            theObj = document.all(obj);
        } else if (this.isNN4) {
            theObj = seekLayer(document, obj);
        }
    } else {
        theObj = obj;
    }
    return theObj;
};
kaMap.prototype.getObject = function(obj) {
    var theObj = this.getRawObject(obj);
    if (theObj && this.isCSS) {
        theObj = theObj.style;
    }
    return theObj;
};
kaMap.prototype.getObjectWidth = function(obj) {
    var elem = this.getRawObject(obj);
    var result = 0;
    if (elem.offsetWidth) {
        result = elem.offsetWidth;
    } else if (elem.clip && elem.clip.width) {
        result = elem.clip.width;
    } else if (elem.style && elem.style.pixelWidth) {
        result = elem.style.pixelWidth;
    }
    return parseInt(result);
};
kaMap.prototype.getObjectHeight = function(obj) {
    var elem = this.getRawObject(obj);
    var result = 0;
    if (elem.offsetHeight) {
        result = elem.offsetHeight;
    } else if (elem.clip && elem.clip.height) {
        result = elem.clip.height;
    } else if (elem.style && elem.style.pixelHeight) {
        result = elem.style.pixelHeight;
    }
    return parseInt(result);
};
kaMap.prototype.zoomTo = function(cgX, cgY) {
    var newScale;
    if (arguments.length == 3) newScale = arguments[2];
    else newScale = this.getCurrentScale();
    var bScaleChanged = (newScale != this.getCurrentScale());
    if (!geoViewerFirstTimeStartup) {
        var inchesPerUnit = new Array(1, 12, 63360.0, 39.3701, 39370.1, 4374754);
        var bZoomTo = true;
        var extents = this.getGeoExtents();
        var cx = (extents[0] + extents[2]) / 2;
        var cy = (extents[1] + extents[3]) / 2;
        var dx = (cx - cgX) / this.cellSize;
        var dy = (cgY - cy) / this.cellSize;
        if (!bScaleChanged) {
            if (cgX >= extents[0] && cgX <= extents[2] && cgY >= extents[1] && cgY <= extents[3]) {
                this.slideBy(dx, dy);
                this.triggerEvent(KAMAP_EXTENTS_CHANGED, this.getGeoExtents());
                return;
            }
        } else if (this.queueManager) {
            this.queueManager.dequeue(null);
            if (this.theZoomLayer.suspended == false) {
                this.setZoomLayer(this.getCurrentScale() / newScale, dx, dy, true);
                this.queueManager.enqueue("myKaMap._zoomTo", "myKaMap._zoomTo", cgX + "|" + cgY + "|" + newScale + "|" + (bScaleChanged ? "1" : "0"), null);
                return;
            }
        }
    }
    this._zoomTo(cgX + "|" + cgY + "|" + newScale + "|" + (bScaleChanged ? "1" : "0"));
};
kaMap.prototype._zoomTo = function(arg) {
    var args = arg.split("|");
    var cgX = parseFloat(args[0]);
    var cgY = parseFloat(args[1]);
    var newScale = parseInt(args[2]);
    var bScaleChanged = (parseInt(args[3]) == 1 ? true : false);
    var oMap = this.getCurrentMap();
    var inchesPerUnit = new Array(1, 12, 63360.0, 39.3701, 39370.1, 4374754);
    this.cellSize = newScale / (oMap.resolution * inchesPerUnit[oMap.units]);
    var nFactor = oMap.zoomToScale(newScale);
    var cpX = cgX / this.cellSize;
    var cpY = cgY / this.cellSize;
    var vpLeft = Math.round(cpX - this.viewportWidth / 2);
    var vpTop = Math.round(cpY + this.viewportHeight / 2);
    var cTileX = Math.floor(cpX / this.tileWidth) * this.tileWidth;
    var cTileY = Math.floor(cpY / this.tileHeight) * this.tileHeight;
    var nTilesLeft = Math.ceil(this.viewportWidth / (2 * this.tileWidth)) * this.tileWidth;
    var nTilesUp = Math.ceil(this.viewportHeight / (2 * this.tileHeight)) * this.tileHeight;
    this.nCurrentLeft = cTileX - nTilesLeft;
    this.nCurrentTop = -1 * (cTileY + nTilesUp);
    this.xOrigin = this.nCurrentLeft;
    this.yOrigin = this.nCurrentTop;
    this.theInsideLayer.style.left = -1 * (vpLeft - this.xOrigin) + "px";
    this.theInsideLayer.style.top = (vpTop + this.yOrigin) + "px";
    var layers = oMap.getLayers();
    for (var k = 0; k < layers.length; k++) {
        var d = layers[k].domObj;
        for (var j = 0; j < this.nHigh; j++) {
            for (var i = 0; i < this.nWide; i++) {
                var img = d.childNodes[(j * this.nWide) + i];
                img.src = this.aPixel.src;
                img.style.top = (this.nCurrentTop + j * this.tileHeight - this.yOrigin) + "px";
                img.style.left = (this.nCurrentLeft + i * this.tileWidth - this.xOrigin) + "px";
                layers[k].setTile(img);
            }
        }
    }
    this.checkWrap();
    this.updateObjects();
    if (!geoViewerFirstTimeStartup && bScaleChanged) {
        if (this.triggerTimeout != null) clearTimeout(this.triggerTimeout);
        this.triggerTimeout = setTimeout("myKaMap.triggerEvent(" + KAMAP_SCALE_CHANGED + "," + this.getCurrentScale() + ");myKaMap.triggerTimeout=null;", 1);
    } else this.triggerEvent(KAMAP_EXTENTS_CHANGED, this.getGeoExtents());
};
kaMap.prototype.zoomToExtents = function(minx, miny, maxx, maxy) {
    var inchesPerUnit = new Array(1, 12, 63360.0, 39.3701, 39370.1, 4374754);
    var oMap = this.getCurrentMap();
    var cgX = (maxx + minx) / 2;
    var cgY = (maxy + miny) / 2;
    var vpToolbarHeight = getObjectHeight(getRawObject("viewportToolbar"));
    var tmpCellSizeX = (maxx - minx) / this.viewportWidth;
    var tmpCellSizeY = (maxy - miny) / (vpToolbarHeight > 0 ? (this.viewportHeight - (3 * vpToolbarHeight)) : this.viewportHeight);
    var tmpCellSize = Math.max(tmpCellSizeX, tmpCellSizeY);
    var tmpScale = tmpCellSize * oMap.resolution * inchesPerUnit[oMap.units];
    var newScale = oMap.aScales[0];
    for (var i = 1; i < oMap.aScales.length; i++) {
        if (tmpScale >= oMap.aScales[i]) break;
        newScale = oMap.aScales[i];
    }
    var bScaleChanged = (newScale != this.getCurrentScale());
    if (!geoViewerFirstTimeStartup && bScaleChanged) {
        var extents = this.getGeoExtents();
        var cx = (extents[0] + extents[2]) / 2;
        var cy = (extents[1] + extents[3]) / 2;
        var dx = (cx - cgX) / this.cellSize;
        var dy = (cgY - cy) / this.cellSize;
        if (this.queueManager) {
            this.queueManager.dequeue(null);
            if (this.theZoomLayer.suspended == false) {
                this.setZoomLayer(this.getCurrentScale() / newScale, dx, dy, true);
                this.queueManager.enqueue("myKaMap._zoomToExtents", "myKaMap._zoomToExtents", minx + "|" + miny + "|" + maxx + "|" + maxy + "|" + cgX + "|" + cgY + "|" + newScale + "|" + (bScaleChanged ? "1" : "0"), null);
                return true;
            }
        }
    }
    this._zoomToExtents(minx + "|" + miny + "|" + maxx + "|" + maxy + "|" + cgX + "|" + cgY + "|" + newScale + "|" + (bScaleChanged ? "1" : "0"));
};
kaMap.prototype._zoomToExtents = function(arg) {
    var args = arg.split("|");
    var minx = parseFloat(args[0]);
    var miny = parseFloat(args[1]);
    var maxx = parseFloat(args[2]);
    var maxy = parseFloat(args[3]);
    var cgX = parseFloat(args[4]);
    var cgY = parseFloat(args[5]);
    var newScale = parseInt(args[6]);
    var bScaleChanged = (parseInt(args[7]) == 1 ? true : false);
    var inchesPerUnit = new Array(1, 12, 63360.0, 39.3701, 39370.1, 4374754);
    var oMap = this.getCurrentMap();
    this.cellSize = newScale / (oMap.resolution * inchesPerUnit[oMap.units]);
    var nFactor = oMap.zoomToScale(newScale);
    var cpX = cgX / this.cellSize;
    var cpY = cgY / this.cellSize;
    var vpLeft = Math.round(cpX - this.viewportWidth / 2);
    var vpTop = Math.round(cpY + this.viewportHeight / 2);
    var cTileX = Math.floor(cpX / this.tileWidth) * this.tileWidth;
    var cTileY = Math.floor(cpY / this.tileHeight) * this.tileHeight;
    var nTilesLeft = Math.ceil(this.viewportWidth / (2 * this.tileWidth)) * this.tileWidth;
    var nTilesUp = Math.ceil(this.viewportHeight / (2 * this.tileHeight)) * this.tileHeight;
    this.nCurrentLeft = cTileX - nTilesLeft;
    this.nCurrentTop = -1 * (cTileY + nTilesUp);
    this.xOrigin = this.nCurrentLeft;
    this.yOrigin = this.nCurrentTop;
    this.theInsideLayer.style.left = -1 * (vpLeft - this.xOrigin) + "px";
    this.theInsideLayer.style.top = (vpTop + this.yOrigin) + "px";
    var layers = oMap.getLayers();
    for (var k = 0; k < layers.length; k++) {
        var d = layers[k].domObj;
        for (var j = 0; j < this.nHigh; j++) {
            for (var i = 0; i < this.nWide; i++) {
                var img = d.childNodes[(j * this.nWide) + i];
                img.src = this.aPixel.src;
                img.style.top = (this.nCurrentTop + j * this.tileHeight - this.yOrigin) + "px";
                img.style.left = (this.nCurrentLeft + i * this.tileWidth - this.xOrigin) + "px";
                layers[k].setTile(img);
            }
        }
    }
    this.checkWrap();
    this.updateObjects();
    if (!geoViewerFirstTimeStartup && bScaleChanged) {
        if (this.triggerTimeout != null) clearTimeout(this.triggerTimeout);
        this.triggerTimeout = setTimeout("myKaMap.triggerEvent(" + KAMAP_SCALE_CHANGED + "," + this.getCurrentScale() + ");myKaMap.triggerTimeout=null;", 1);
        return true;
    }
    this.triggerEvent(KAMAP_EXTENTS_CHANGED, this.getGeoExtents());
    return false;
};
kaMap.prototype.createDrawingCanvas = function(idx) {
    var d = document.createElement('div');
    d.style.position = 'absolute';
    d.style.left = '0px';
    d.style.top = '0px';
    d.style.width = '3000px';
    d.style.height = '3000px';
    d.style.zIndex = idx;
    this.theInsideLayer.appendChild(d);
    this.aCanvases.push(d);
    d.kaMap = this;
    return d;
};
kaMap.prototype.removeDrawingCanvas = function(canvas) {
    for (var i = 0; i < this.aCanvases.length; i++) {
        if (this.aCanvases[i] == canvas) {
            this.aCanvases.splice(i, 1);
        }
    }
    this.theInsideLayer.removeChild(canvas);
    canvas.kaMap = null;
    return true;
};
kaMap.prototype.addObjectGeo = function(canvas, lon, lat, obj) {
    obj.lon = lon;
    obj.lat = lat;
    var aPix = this.geoToPix(lon, lat);
    return this.addObjectPix(canvas, aPix[0], aPix[1], obj);
};
kaMap.prototype.addObjectPix = function(canvas, x, y, obj) {
    var xOffset = (obj.xOffset) ? obj.xOffset : 0;
    var yOffset = (obj.yOffset) ? obj.yOffset : 0;
    var top = (y - this.yOrigin + yOffset);
    var left = (x - this.xOrigin + xOffset);
    obj.style.position = 'absolute';
    obj.style.top = top + "px";
    obj.style.left = left + "px";
    obj.canvas = canvas;
    canvas.appendChild(obj);
    this.aObjects.push(obj);
    return true;
};
kaMap.prototype.shiftObject = function(x, y, obj) {
    var top = safeParseInt(obj.style.top);
    var left = safeParseInt(obj.style.left);
    obj.style.top = (top + y) + "px";
    obj.style.left = (left + x) + "px";
    return true;
};
kaMap.prototype.removeObject = function(obj) {
    if (obj == null) {
        for (var i = 0; i < this.aObjects.length; i++) {
            obj = this.aObjects[i];
            if (obj.canvas) {
                obj.canvas.removeChild(obj);
            }
        }
        this.aObjects = [];
        return true;
    } else {
        for (var i = 0; i < this.aObjects.length; i++) {
            if (this.aObjects[i] == obj) {
                obj = this.aObjects[i];
                if (obj.canvas) {
                    obj.canvas.removeChild(obj);
                    obj.canvas = null;
                }
                this.aObjects.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
kaMap.prototype.removeAllObjects = function(canvas) {
    for (var i = 0; i < this.aObjects.length; i++) {
        obj = this.aObjects[i];
        if (obj.canvas && obj.canvas == canvas) {
            obj.canvas.removeChild(obj);
            obj.canvas = null;
            this.aObjects.splice(i--, 1);
        }
    }
    return true;
};
kaMap.prototype.centerObject = function(obj) {
    var vpX = -safeParseInt(this.theInsideLayer.style.left) + this.viewportWidth / 2;
    var vpY = -safeParseInt(this.theInsideLayer.style.top) + this.viewportHeight / 2;
    var xOffset = (obj.xOffset) ? obj.xOffset : 0;
    var yOffset = (obj.yOffset) ? obj.yOffset : 0;
    var dx = safeParseInt(obj.style.left) - xOffset - vpX;
    var dy = safeParseInt(obj.style.top) - yOffset - vpY;
    this.slideBy(-dx, -dy);
    return true;
};
kaMap.prototype.geoToPix = function(gX, gY) {
    var pX = gX / this.cellSize;
    var pY = -1 * gY / this.cellSize;
    return [Math.floor(pX), Math.floor(pY)];
};
kaMap.prototype.pixToGeo = function(pX, pY) {
    var bAdjust = (arguments.length == 3 && arguments[2]) ? true : false;
    if (bAdjust) {
        pX = pX + this.xOrigin;
        pY = pY + this.yOrigin;
    }
    var gX = -1 * pX * this.cellSize;
    var gY = pY * this.cellSize;
    return [gX, gY];
};
kaMap.prototype.setBackgroundColor = function(color) {
    this.domObj.style.backgroundColor = color;
    return true;
};
kaMap.prototype.createLayers = function() {
    if (!(!gogisApplication.ZOOMIN_ANIMATION_TYPE || !gogisApplication.ZOOMOUT_ANIMATION_TYPE || !gogisApplication.ZOOMIN_ANIMATION_TYPE[gogisCurrentInstance] || !gogisApplication.ZOOMOUT_ANIMATION_TYPE[gogisCurrentInstance] || gogisApplication.ZOOMIN_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_NONE || gogisApplication.ZOOMOUT_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_NONE)) {
        this.theZoomLayer = document.createElement('div');
        this.theZoomLayer.id = 'theZoomLayer';
        this.theZoomLayer.style.position = 'absolute';
        this.theZoomLayer.style.left = '0px';
        this.theZoomLayer.style.top = '0px';
        this.theZoomLayer.style.zIndex = '0';
        this.theZoomLayer.domObj = this.theZoomLayer;
        this.theZoomLayer.style.visibility = "hidden";
        this.theZoomLayer.style.display = "none";
        this.theZoomLayer.suspended = false;
        this.theZoomLayer.running = null;
        this.domObj.appendChild(this.theZoomLayer);
        this.theZoomLayer.ontouchstart = function(e) {
            e.preventDefault();
        };
        this.theZoomLayer.ontouchmove = function(e) {
            e.preventDefault();
        };
        this.theZoomLayer.ontouchend = function(e) {
            e.preventDefault();
        };
        this.theZoomLayer.ontouchcancel = function(e) {
            e.preventDefault();
        };
    }
    this.theInsideLayer = document.createElement('div');
    this.theInsideLayer.id = 'theInsideLayer';
    this.theInsideLayer.style.position = 'absolute';
    this.theInsideLayer.style.left = '0px';
    this.theInsideLayer.style.top = '0px';
    this.theInsideLayer.style.zIndex = '1';
    this.theInsideLayer.kaMap = this;
    if (this.currentTool) {
        this.theInsideLayer.style.cursor = this.currentTool.cursor;
    }
    this.domObj.appendChild(this.theInsideLayer);
    this.domObj.kaMap = this;
    this.theInsideLayer.ontouchstart = kaMap_ontouchstart;
    this.theInsideLayer.ontouchmove = kaMap_ontouchmove;
    this.theInsideLayer.ontouchend = kaMap_ontouchend;
    this.theInsideLayer.ontouchcancel = kaMap_ontouchcancel;
    this.theInsideLayer.onmousedown = kaMap_onmousedown;
    this.theInsideLayer.onmouseup = kaMap_onmouseup;
    this.theInsideLayer.onmousemove = kaMap_onmousemove;
    this.theInsideLayer.onmouseover = kaMap_onmouseover;
    this.domObj.onmouseout = kaMap_onmouseout;
    this.theInsideLayer.onkeypress = kaMap_onkeypress;
    this.theInsideLayer.ondblclick = kaMap_ondblclick;
    this.theInsideLayer.oncontextmenu = kaMap_oncontextmenu;
    if (!browser_isMultitouch) {
        this.theInsideLayer.onmousewheel = kaMap_onmousewheel;
        if (window.addEventListener && navigator.product && navigator.product == "Gecko") {
            this.domObj.addEventListener("DOMMouseScroll", kaMap_onmousewheel, false);
        }
    }
    this.theInsideLayer.ondragstart = new Function([], 'var e=e?e:event;e.cancelBubble=true;e.returnValue=false;return false;');
};
kaMap.prototype.setZoomLayer = function(f, dx, dy, animate) {
    if (!gogisApplication.ZOOMIN_ANIMATION_TYPE || !gogisApplication.ZOOMOUT_ANIMATION_TYPE || !gogisApplication.ZOOMIN_ANIMATION_TYPE[gogisCurrentInstance] || !gogisApplication.ZOOMOUT_ANIMATION_TYPE[gogisCurrentInstance] || gogisApplication.ZOOMIN_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_NONE || gogisApplication.ZOOMOUT_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_NONE || this.theZoomLayer.suspended == true) return false;
    var bmName = gogisGetBasemapName(true);
    if (bmName == 'none') return false;
    if (this.theZoomLayer.running != null) {
        clearTimeout(this.theZoomLayer.running);
        this.theZoomLayer.running == null;
    }
    var animation = false;
    var bmLayer = this.getCurrentMap().getLayer(bmName);
    try {
        if (!bmLayer.domObj) this.setLayerVisibility(bmName, true);
    } catch (e) {
        return false;
    }
    if (f > 1) {
        if (gogisApplication.ZOOMIN_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE && animate) {
            animation = true;
        } else if ((gogisApplication.ZOOMIN_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_SCALE) || (gogisApplication.ZOOMIN_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE && !animate)) {
            this.scaleZoomLayer(bmLayer, f, dx, dy);
        } else {
            this.freezeZoomLayer(bmLayer);
        }
    } else {
        if (gogisApplication.ZOOMOUT_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE && animate) {
            animation = true;
        } else if ((gogisApplication.ZOOMOUT_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_SCALE) || (gogisApplication.ZOOMOUT_ANIMATION_TYPE[gogisCurrentInstance] == gogisApplication.ZOOM_ANIMATION_TYPE_ANIMATE && !animate)) {
            this.scaleZoomLayer(bmLayer, f, dx, dy);
        } else {
            this.freezeZoomLayer(bmLayer);
        }
    }
    if (animation) {
        this.theZoomLayer.startLeft = safeParseInt(this.theInsideLayer.style.left);
        this.theZoomLayer.startTop = safeParseInt(this.theInsideLayer.style.top);
        this.theZoomLayer.style.left = this.theZoomLayer.startLeft + "px";
        this.theZoomLayer.style.top = this.theZoomLayer.startTop + "px";
        var bm = bmLayer.domObj;
        var zl = this.theZoomLayer.domObj;
        var w = this.tileWidth;
        var h = this.tileHeight;
        var t, i, img_bm, img_zl, rowVis, colVis;
        for (var j = 0; j < this.nHigh; j++) {
            t = safeParseInt(bm.childNodes[(j * this.nWide)].style.top);
            rowVis = (((this.theZoomLayer.startTop + t + h) >= 0) && ((this.theZoomLayer.startTop + t) <= this.viewportHeight));
            for (i = 0; i < this.nWide; i++) {
                img_bm = bm.childNodes[(j * this.nWide) + i];
                img_zl = zl.childNodes[(j * this.nWide) + i];
                img_zl.startTop = t;
                img_zl.startLeft = safeParseInt(img_bm.style.left);
                img_zl.tmpSrc = img_bm.src;
                if (!rowVis) {
                    if (img_zl.style.display != "none") {
                        img_zl.style.display = "none";
                    }
                    continue;
                }
                colVis = (((this.theZoomLayer.startLeft + img_zl.startLeft + w) >= 0) && ((this.theZoomLayer.startLeft + img_zl.startLeft) <= this.viewportWidth));
                if (!colVis) {
                    if (img_zl.style.display != "none") {
                        img_zl.style.display = "none";
                    }
                    continue;
                }
                if (img_zl.style.display == "none") {
                    img_zl.style.display = "block";
                }
                img_zl.style.left = img_zl.startLeft + "px";
                img_zl.style.top = t + "px";
                img_zl.style.width = w + "px";
                img_zl.style.height = h + "px";
                img_zl.src = img_bm.src;
            }
        }
        if (gogisApplication.ZOOM_ANIMATION_TIME && gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] && gogisApplication.ZOOM_ANIMATION_INTERVALL && gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance]) {
            this.theZoomLayer.running = setTimeout("myKaMap.animateZoomLayer(" + new Date().getTime() + ",'" + bmName + "'," + f + "," + dx + "," + dy + ");", gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance]);
        }
    }
    this.theZoomLayer.style.display = "block";
    this.theZoomLayer.style.visibility = "visible";
    this.theInsideLayer.style.visibility = "hidden";
    this.theInsideLayer.style.display = "none";
};
kaMap.prototype.resetZoomLayer = function() {
    if (this.theZoomLayer.running != null) {
        clearTimeout(this.theZoomLayer.running);
        this.theZoomLayer.running = null;
    }
    this.theInsideLayer.style.display = "block";
    this.theInsideLayer.style.visibility = "visible";
    var zl = this.theZoomLayer.domObj;
    var i, img_zl;
    for (var j = 0; j < this.nHigh; j++) {
        for (i = 0; i < this.nWide; i++) {
            img_zl = zl.childNodes[(j * this.nWide) + i];
            if (img_zl.src != this.aPixel.src) img_zl.src = this.aPixel.src;
            if (img_zl.style.display == "none") img_zl.style.display = "block";
        }
    }
    this.theZoomLayer.style.visibility = "hidden";
    this.theZoomLayer.style.display = "none";
    this.theZoomLayer.suspended = false;
};
kaMap.prototype.freezeZoomLayer = function(layer) {
    this.theZoomLayer.style.top = safeParseInt(this.theInsideLayer.style.top) + "px";
    this.theZoomLayer.style.left = safeParseInt(this.theInsideLayer.style.left) + "px";
    var bm = layer.domObj;
    var zl = this.theZoomLayer.domObj;
    var w = this.tileWidth + "px";
    var h = this.tileHeight + "px";
    var t, i, img_bm, img_zl;
    for (var j = 0; j < this.nHigh; j++) {
        t = safeParseInt(bm.childNodes[(j * this.nWide)].style.top) + "px";
        for (i = 0; i < this.nWide; i++) {
            img_bm = bm.childNodes[(j * this.nWide) + i];
            img_zl = zl.childNodes[(j * this.nWide) + i];
            if (img_zl.style.display == "none") {
                img_zl.style.display = "block";
            }
            img_zl.style.left = safeParseInt(img_bm.style.left) + "px";
            img_zl.style.top = t;
            img_zl.style.width = w;
            img_zl.style.height = h;
            img_zl.src = img_bm.src;
        }
    }
};
kaMap.prototype.scaleZoomLayer = function(layer, f, dx, dy) {
    var zlTop = Math.round((this.viewportHeight / 2 + (safeParseInt(this.theInsideLayer.style.top) + dy - this.viewportHeight / 2) * f) + 0.5);
    this.theZoomLayer.style.top = zlTop + "px";
    var zlLeft = Math.round((this.viewportWidth / 2 + (safeParseInt(this.theInsideLayer.style.left) + dx - this.viewportWidth / 2) * f) + 0.5);
    this.theZoomLayer.style.left = zlLeft + "px";
    var bm = layer.domObj;
    var zl = this.theZoomLayer.domObj;
    var w = Math.round(this.tileWidth * f + 0.5);
    var h = Math.round(this.tileHeight * f + 0.5);
    var t, l, i, img_bm, img_zl, rowVis, colVis;
    for (var j = 0; j < this.nHigh; j++) {
        t = Math.round(safeParseInt(bm.childNodes[(j * this.nWide)].style.top) * f + 0.5);
        rowVis = (((zlTop + t + h) >= 0) && ((zlTop + t) <= this.viewportHeight));
        for (i = 0; i < this.nWide; i++) {
            img_bm = bm.childNodes[(j * this.nWide) + i];
            img_zl = zl.childNodes[(j * this.nWide) + i];
            if (!rowVis) {
                if (img_zl.style.display != "none") {
                    img_zl.style.display = "none";
                }
                continue;
            }
            l = Math.round(safeParseInt(img_bm.style.left) * f + 0.5);
            colVis = (((zlLeft + l + w) >= 0) && ((zlLeft + l) <= this.viewportWidth));
            if (!colVis) {
                if (img_zl.style.display != "none") {
                    img_zl.style.display = "none";
                }
                continue;
            }
            if (img_zl.style.display == "none") {
                img_zl.style.display = "block";
            }
            img_zl.style.left = l + "px";
            img_zl.style.top = t + "px";
            img_zl.style.width = w + "px";
            img_zl.style.height = h + "px";
            img_zl.src = img_bm.src;
        }
    }
};
kaMap.prototype.animateZoomLayer = function(starttime, layername, f, dx, dy) {
    var timePassed = (new Date().getTime()) - starttime;
    var timeLeft = gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] - timePassed;
    if (timeLeft <= gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance]) {
        var newFactor = f;
        var dFactor = 1;
    } else {
        var newFactor = f - ((f - 1) / gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] * timeLeft);
        var dFactor = timePassed / gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance];
    }
    var zlTop = Math.round((this.viewportHeight / 2 + (this.theZoomLayer.startTop + (dy * dFactor) - this.viewportHeight / 2) * newFactor) + 0.5);
    this.theZoomLayer.style.top = zlTop + "px";
    var zlLeft = Math.round((this.viewportWidth / 2 + (this.theZoomLayer.startLeft + (dx * dFactor) - this.viewportWidth / 2) * newFactor) + 0.5);
    this.theZoomLayer.style.left = zlLeft + "px";
    var bm = this.getCurrentMap().getLayer(layername).domObj;
    var zl = this.theZoomLayer.domObj;
    var w = Math.round(this.tileWidth * newFactor + 0.5);
    var h = Math.round(this.tileHeight * newFactor + 0.5);
    var l, t, i, img_zl, rowVis, colVis;
    for (var j = 0; j < this.nHigh; j++) {
        t = Math.round(zl.childNodes[(j * this.nWide)].startTop * newFactor + 0.5);
        rowVis = (((zlTop + t + h) >= 0) && ((zlTop + t) <= this.viewportHeight));
        for (i = 0; i < this.nWide; i++) {
            img_zl = zl.childNodes[(j * this.nWide) + i];
            if (!rowVis) {
                if (img_zl.style.display != "none") {
                    img_zl.style.display = "none";
                    img_zl.src = this.aPixel.src;
                }
                continue;
            }
            l = Math.round(img_zl.startLeft * newFactor + 0.5);
            colVis = (((zlLeft + l + w) >= 0) && ((zlLeft + l) <= this.viewportWidth));
            if (!colVis) {
                if (img_zl.style.display != "none") {
                    img_zl.style.display = "none";
                    img_zl.src = this.aPixel.src;
                }
                continue;
            }
            if (img_zl.style.display == "none") {
                img_zl.src = img_zl.tmpSrc;
                img_zl.style.display = "block";
            }
            img_zl.style.left = l + "px";
            img_zl.style.top = t + "px";
            img_zl.style.width = w + "px";
            img_zl.style.height = h + "px";
        }
    }
    if (timeLeft <= 20) return;
    this.theZoomLayer.running = setTimeout("myKaMap.animateZoomLayer(" + starttime + ",'" + layername + "'," + f + "," + dx + "," + dy + ");", gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance]);
};
kaMap.prototype.initializeLayers = function(nFactor) {
    var deltaMouseX = this.nCurrentLeft + safeParseInt(this.theInsideLayer.style.left) - this.xOrigin;
    var deltaMouseY = this.nCurrentTop + safeParseInt(this.theInsideLayer.style.top) - this.yOrigin;
    var vpTop = this.nCurrentTop - deltaMouseY;
    var vpLeft = this.nCurrentLeft - deltaMouseX;
    var vpCenterX = vpLeft + this.viewportWidth / 2;
    var vpCenterY = vpTop + this.viewportHeight / 2;
    var currentTileX = Math.floor(vpCenterX / this.tileWidth) * this.tileWidth;
    var currentTileY = Math.floor(vpCenterY / this.tileHeight) * this.tileHeight;
    var tileDeltaX = currentTileX - this.nCurrentLeft;
    var tileDeltaY = currentTileY - this.nCurrentTop;
    var newVpCenterX = vpCenterX * nFactor;
    var newVpCenterY = vpCenterY * nFactor;
    var newTileX = Math.floor(newVpCenterX / this.tileWidth) * this.tileWidth;
    var newTileY = Math.floor(newVpCenterY / this.tileHeight) * this.tileHeight;
    var newCurrentLeft = newTileX - tileDeltaX;
    var newCurrentTop = newTileY - tileDeltaY;
    this.nCurrentLeft = newCurrentLeft;
    this.nCurrentTop = newCurrentTop;
    var newTilLeft = -newVpCenterX + this.viewportWidth / 2;
    var newTilTop = -newVpCenterY + this.viewportHeight / 2;
    var xOldOrigin = this.xOrigin;
    var yOldOrigin = this.yOrigin;
    this.xOrigin = this.nCurrentLeft;
    this.yOrigin = this.nCurrentTop;
    this.theInsideLayer.style.left = (newTilLeft + this.xOrigin) + "px";
    this.theInsideLayer.style.top = (newTilTop + this.yOrigin) + "px";
    var layers = this.aMaps[this.currentMap].getLayers();
    for (var k = 0; k < layers.length; k++) {
        var d = layers[k].domObj;
        layers[k].domObj.oncontextmenu = this.cancelEvent;
        for (var j = 0; j < this.nHigh; j++) {
            for (var i = 0; i < this.nWide; i++) {
                var img = d.childNodes[(j * this.nWide) + i];
                img.src = this.aPixel.src;
                img.style.top = (this.nCurrentTop + j * this.tileHeight - this.yOrigin) + "px";
                img.style.left = (this.nCurrentLeft + i * this.tileWidth - this.xOrigin) + "px";
                layers[k].setTile(img);
            }
        }
    }
    this.checkWrap();
    this.updateObjects();
};
kaMap.prototype.paintLayer = function(l) {
    var d = l.domObj;
    for (var j = 0; j < this.nHigh; j++) {
        for (var i = 0; i < this.nWide; i++) {
            var img = d.childNodes[(j * this.nWide) + i];
            img.style.top = (this.nCurrentTop + j * this.tileHeight - this.yOrigin) + "px";
            img.style.left = (this.nCurrentLeft + i * this.tileWidth - this.xOrigin) + "px";
            l.setTile(img);
        }
    }
    this.checkWrap();
};
kaMap.prototype.updateObjects = function() {
    for (var i = 0; i < this.aObjects.length; i++) {
        var obj = this.aObjects[i];
        var xOffset = (obj.xOffset) ? obj.xOffset : 0;
        var yOffset = (obj.yOffset) ? obj.yOffset : 0;
        var aPix = this.geoToPix(obj.lon, obj.lat);
        var top = (aPix[1] - this.yOrigin + yOffset);
        var left = (aPix[0] - this.xOrigin + xOffset);
        obj.style.top = top + "px";
        obj.style.left = left + "px";
    }
};
kaMap.prototype.resize = function() {
    var newViewportWidth = this.getObjectWidth(this.domObj);
    var newViewportHeight = this.getObjectHeight(this.domObj);
    if (this.initializationState != 2) {
        this.viewportWidth = newViewportWidth;
        this.viewportHeight = newViewportHeight;
        return false;
    }
    if ((this.viewportWidth == newViewportWidth) && (this.viewportHeight == newViewportHeight)) return;
    if (this.viewportWidth == null) {
        this.theInsideLayer.style.top = (-1 * this.nCurrentTop + this.yOrigin) + "px";
        this.theInsideLayer.style.left = (-1 * this.nCurrentLeft + this.xOrigin) + "px";
        this.theInsideLayer.style.top = (safeParseInt(this.theInsideLayer.style.top) + (newViewportHeight - viewportHeight) / 2) + "px";
        this.theInsideLayer.style.left = (safeParseInt(this.theInsideLayer.style.top) + (newViewportWidth - viewportWidth) / 2) + "px";
    }
    var newWide = Math.ceil((newViewportWidth / this.tileWidth) + 2 * this.nBuffer);
    var newHigh = Math.ceil((newViewportHeight / this.tileHeight) + 2 * this.nBuffer);
    this.viewportWidth = newViewportWidth;
    this.viewportHeight = newViewportHeight;
    if (this.nHigh == 0 && this.nWide == 0) {
        this.nWide = newWide;
    }
    while (this.nHigh < newHigh) {
        this.appendRow();
    }
    while (this.nHigh > newHigh && newHigh > 3) {
        this.removeRow();
    }
    while (this.nWide < newWide) {
        this.appendColumn();
    }
    while (this.nWide > newWide && newWide > 3) {
        this.removeColumn();
    }
    var map = this.getCurrentMap();
    var layers = map.getLayers();
    for (i = 0; i < layers.length; i++) {
        layers[i].setTileLayer();
    }
    this.triggerEvent(KAMAP_EXTENTS_CHANGED, this.getGeoExtents());
};
kaMap.prototype.createImage = function(top, left, obj) {
    var img = document.createElement('img');
    img.src = this.aPixel.src;
    img.width = this.tileWidth;
    img.height = this.tileHeight;
    img.setAttribute('style', 'position:absolute; top:' + top + 'px; left:' + left + 'px;');
    img.style.position = 'absolute';
    img.style.top = (top - this.yOrigin) + 'px';
    img.style.left = (left - this.xOrigin) + 'px';
    img.style.width = this.tileWidth + "px";
    img.style.height = this.tileHeight + "px";
    img.style.visibility = 'hidden';
    img.galleryimg = "no";
    img.style.MozUserSelect = "none";
    img.style.webkitUserSelect = "none";
    img.unselectable = "on";
    img.oncontextmenu = this.cancelEvent;
    img.onerror = kaMap_imgOnError;
    img.onload = kaMap_imgOnLoad;
    img.errorCount = 0;
    img.id = "i" + this.gImageID;
    img.layer = obj;
    img.kaMap = this;
    this.gImageID = this.gImageID + 1;
    img.ie_hack = false;
    if (this.isIE4 && !(isIE7 || isIE8)) {
        if (obj.imageformat && (obj.imageformat.toLowerCase().indexOf('alpha') == 0)) {
            img.ie_hack = true;
        }
    }
    return img;
};
kaMap.prototype.resetTile = function(id, bForce) {
    var img = this.DHTMLapi.getRawObject(id);
    if (img.layer) {
        img.layer.setTile(this, bForce);
    }
};
kaMap.prototype.reloadImage = function(id) {};
kaMap.prototype.resetImage = function(id) {};
kaMap_imgOnError = function(e) {
    if (this.layer) {
        if (this.errors) this.errors++;
        else this.errors = 1;
        if (this.errors <= gogisApplication.KAMAP_TILE_RETRY_LIMIT) {
            this.layer.setTile(this, true);
        } else this.src = this.kaMap.aPixel.src;
    }
};
kaMap_imgOnLoad = function(e) {
    if ((this.ie_hack) && (this.src != this.kaMap.aPixel.src)) {
        var src = this.src;
        this.src = this.kaMap.aPixel.src;
        this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "')";
    }
    this.style.visibility = 'visible';
};
kaMap.prototype.appendRow = function(layer) {
    if (this.nWide == 0) {
        return;
    }
    var layers = null;
    if (arguments.length == 1) {
        layers = Array(layer);
    } else {
        layers = this.aMaps[this.currentMap].getLayers();
    }
    if (this.theZoomLayer && this.theZoomLayer.domObj) layers.push(this.theZoomLayer);
    for (var i = 0; i < layers.length; i++) {
        var obj = layers[i].domObj;
        for (var j = 0; j < this.nWide; j++) {
            var top = this.nCurrentTop + (this.nHigh * this.tileHeight);
            var left = this.nCurrentLeft + (j * this.tileWidth);
            var img = this.createImage(top, left, layers[i]);
            if (this.isIE4) {
                img.style.filter = "Alpha(opacity=" + layers[i].opacity + ")";
            }
            obj.appendChild(img);
        }
    }
    this.nHigh = this.nHigh + 1;
};
kaMap.prototype.appendColumn = function(layer) {
    if (this.nHigh == 0) {
        return;
    }
    var layers = null;
    if (arguments.length == 1) {
        layers = Array(layer);
    } else {
        layers = this.aMaps[this.currentMap].getLayers();
    }
    if (this.theZoomLayer && this.theZoomLayer.domObj) layers.push(this.theZoomLayer);
    for (var i = 0; i < layers.length; i++) {
        var obj = layers[i].domObj;
        for (var j = this.nHigh - 1; j >= 0; j--) {
            var top = this.nCurrentTop + (j * this.tileHeight);
            var left = this.nCurrentLeft + (this.nWide * this.tileWidth);
            var img = this.createImage(top, left, layers[i]);
            if (this.isIE4) {
                img.style.filter = "Alpha(opacity=" + layers[i].opacity + ")";
            }
            if (j < this.nHigh - 1) {
                obj.insertBefore(img, obj.childNodes[((j + 1) * this.nWide)]);
            } else {
                obj.appendChild(img);
            }
        }
    }
    this.nWide = this.nWide + 1;
};
kaMap.prototype.removeColumn = function(layer) {
    if (this.nWide < 3) {
        return;
    }
    var layers = null;
    if (arguments.length == 1) {
        layers = Array(layer);
    } else {
        layers = this.aMaps[this.currentMap].getLayers();
    }
    if (this.theZoomLayer && this.theZoomLayer.domObj) layers.push(this.theZoomLayer);
    for (var i = 0; i < layers.length; i++) {
        var d = layers[i].domObj;
        for (var j = this.nHigh - 1; j >= 0; j--) {
            var img = d.childNodes[((j + 1) * this.nWide) - 1];
            d.removeChild(img);
            img.onload = null;
            img.onerror = null;
        }
    }
    this.nWide = this.nWide - 1;
};
kaMap.prototype.removeRow = function(layer) {
    if (this.nHigh < 3) {
        return;
    }
    var layers = null;
    if (arguments.length == 1) {
        layers = Array(layer);
    } else {
        layers = this.aMaps[this.currentMap].getLayers();
    }
    if (this.theZoomLayer && this.theZoomLayer.domObj) layers.push(this.theZoomLayer);
    for (var i = 0; i < layers.length; i++) {
        var d = layers[i].domObj;
        for (var j = this.nWide - 1; j >= 0; j--) {
            var img = d.childNodes[((this.nHigh - 1) * this.nWide) + j];
            d.removeChild(img);
            img.onload = null;
            img.onerror = null;
        }
    }
    this.nHigh = this.nHigh - 1;
};
kaMap.prototype.hideLayers = function() {};
kaMap.prototype.showLayers = function() {};
kaMap.prototype.moveBy = function(x, y) {
    var til = this.theInsideLayer;
    til.style.top = (safeParseInt(til.style.top) + y) + 'px';
    til.style.left = (safeParseInt(til.style.left) + x) + 'px';
    this.checkWrap();
};
kaMap.prototype.slideBy = function(x, y) {
    if (this.slideid != null) {
        goQueueManager.dequeue(this.slideid);
    }
    this.as = [];
    var absX = Math.abs(x);
    var absY = Math.abs(y);
    var signX = x / absX;
    var signY = y / absY;
    var distance = absX > absY ? absX : absY;
    var steps = Math.floor(distance / this.pixelsPerStep);
    var dx = dy = 0;
    if (steps > 0) {
        dx = (x) / (steps * this.pixelsPerStep);
        dy = (y) / (steps * this.pixelsPerStep);
    }
    var remainderX = x - dx * steps * this.pixelsPerStep;
    var remainderY = y - dy * steps * this.pixelsPerStep;
    var px = py = 0;
    var curspeed = this.accelerationFactor;
    var i = 0;
    while (i < steps) {
        if (i > 0) {
            px += this.as[i - 1][0];
            py += this.as[i - 1][1];
        }
        var cx = px + Math.round(dx * this.pixelsPerStep);
        var cy = py + Math.round(dy * this.pixelsPerStep);
        this.as[i] = new Array(cx - px, cy - py);
        i++;
    }
    if (remainderX != 0 || remainderY != 0) {
        this.as[i] = [remainderX, remainderY];
    }
    this.hideLayers();
    this.slideid = goQueueManager.enqueue(this.timePerStep, this, this.slide, [0]);
};
kaMap.prototype.slide = function(pos) {
    if (pos >= this.as.length) {
        this.as = slideid = null;
        this.showLayers();
        this.triggerEvent(KAMAP_EXTENTS_CHANGED, this.getGeoExtents());
        return;
    }
    this.moveBy(this.as[pos][0], this.as[pos][1]);
    pos++;
    this.slideid = goQueueManager.enqueue(this.timePerStep, this, this.slide, [pos]);
};
kaMap_onkeypress = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.onkeypress(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].onkeypress(e);
        }
    }
};
kaMap_onmousemove = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (e.button == 2) {}
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.onmousemove(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].onmousemove(e);
        }
    }
};
kaMap_onmousedown = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.onmousedown(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].onmousedown(e);
        }
    }
};
kaMap_onmouseup = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.onmouseup(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].onmouseup(e);
        }
    }
};
kaMap_onmouseover = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.onmouseover(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].onmouseover(e);
        }
    }
};
kaMap_onmouseout = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.onmouseout(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].onmouseout(e);
        }
    }
};
kaMap_oncontextmenu = function(e) {
    e = e ? e : event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
};
kaMap_ondblclick = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.ondblclick(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].ondblclick(e);
        }
    }
};
kaMap_onmousewheel = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.onmousewheel(e);
    }
};
kaMap_ontouchstart = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.ontouchstart(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].ontouchstart(e);
        }
    }
};
kaMap_ontouchmove = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.ontouchmove(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].ontouchmove(e);
        }
    }
};
kaMap_ontouchend = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.ontouchend(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].ontouchend(e);
        }
    }
};
kaMap_ontouchcancel = function(e) {
    if (this.kaMap.currentTool) {
        this.kaMap.currentTool.ontouchcancel(e);
    }
    if (this.kaMap.aInfoTools.length > 0) {
        for (var i = 0; i < this.kaMap.aInfoTools.length; i++) {
            this.kaMap.aInfoTools[i].ontouchcancel(e);
        }
    }
};
kaMap.prototype.cancelEvent = function(e) {
    e = (e) ? e : ((event) ? event : null);
    e.returnValue = false;
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
};
kaMap.prototype.registerTool = function(toolObj) {
    this.aTools.push(toolObj);
};
kaMap.prototype.activateTool = function(toolObj) {
    if (toolObj.isInfoTool()) {
        this.aInfoTools.push(toolObj);
    } else {
        if (this.currentTool) {
            this.currentTool.deactivate();
        }
        this.currentTool = toolObj;
        if (this.theInsideLayer) {
            this.setCursor(this.currentTool.cursor);
        }
        kaMultitouchHandler.callback = this.currentTool.callback;
    }
};
kaMap.prototype.deactivateTool = function(toolObj) {
    if (toolObj.isInfoTool()) {
        for (var i = 0; i < this.aInfoTools.length; i++) {
            if (this.aInfoTools[i] == toolObj) {
                this.aInfoTools.splice(i, 1);
                break;
            }
        }
    } else {
        if (this.currentTool == toolObj) {
            this.currentTool = null;
        }
        if (this.theInsideLayer) {
            this.theInsideLayer.style.cursor = 'auto';
        }
    }
};
kaMap.prototype.setCursor = function(cursor) {
    if (cursor && cursor.length && typeof cursor == 'object') {
        for (var i = 0; i < cursor.length; i++) {
            this.theInsideLayer.style.cursor = cursor[i];
            if (this.theInsideLayer.style.cursor == cursor[i]) {
                break;
            }
        }
    } else if (typeof cursor == 'string') {
        this.theInsideLayer.style.cursor = cursor;
    } else {
        this.theInsideLayer.style.cursor = 'auto';
    }
};
kaMap.prototype.checkWrap = function() {
    var bWrapped = false;
    this.checkMaxExtents();
    this.xOffset = safeParseInt(this.theInsideLayer.style.left) + this.nCurrentLeft - this.xOrigin;
    this.yOffset = safeParseInt(this.theInsideLayer.style.top) + this.nCurrentTop - this.yOrigin;
    while (this.xOffset > 0) {
        this.wrapR2L();
        bWrapped = true;
    }
    while (this.xOffset < -(this.nBuffer * this.tileWidth)) {
        this.wrapL2R();
        bWrapped = true;
    }
    while (this.yOffset > -(this.nBuffer * this.tileHeight)) {
        this.wrapB2T();
        bWrapped = true;
    }
    while (this.yOffset < -(2 * this.nBuffer * this.tileHeight)) {
        this.wrapT2B();
        bWrapped = true;
    }
    var layer = this.aMaps[this.currentMap].getLayers()[0];
    if (layer) {
        var img = layer.domObj.childNodes[0].style;
        this.nCurrentTop = safeParseInt(img.top) + this.yOrigin;
        this.nCurrentLeft = safeParseInt(img.left) + this.xOrigin;
    }
    if (bWrapped) {}
};
kaMap.prototype.checkMaxExtents = function() {
    var maxExtents = this.getCurrentMap().maxExtents;
    if (maxExtents.length == 4) {
        if ((maxExtents[0] >= maxExtents[2]) || (maxExtents[1] >= maxExtents[3])) {
            return false;
        }
        var geoExtents = this.getGeoExtents();
        var hPixelAdjustment = 0;
        var vPixelAdjustment = 0;
        if (geoExtents[0] < maxExtents[0]) {
            hPixelAdjustment = Math.round((maxExtents[0] - geoExtents[0]) / this.cellSize);
        }
        if (geoExtents[2] > maxExtents[2]) {
            if (hPixelAdjustment != 0) {
                hPixelAdjustment += Math.round((maxExtents[2] - geoExtents[2]) / this.cellSize);
                hPixelAdjustment /= 2;
            } else {
                hPixelAdjustment += Math.round((maxExtents[2] - geoExtents[2]) / this.cellSize);
            }
        }
        if (hPixelAdjustment != 0) {
            this.theInsideLayer.style.left = (safeParseInt(this.theInsideLayer.style.left) - hPixelAdjustment) + 'px';
        }
        if (geoExtents[1] < maxExtents[1]) {
            vPixelAdjustment = Math.round((maxExtents[1] - geoExtents[1]) / this.cellSize);
        }
        if (geoExtents[3] > maxExtents[3]) {
            if (vPixelAdjustment != 0) {
                vPixelAdjustment += Math.round((maxExtents[3] - geoExtents[3]) / this.cellSize);
                vPixelAdjustment /= 2;
            } else {
                vPixelAdjustment = Math.round((maxExtents[3] - geoExtents[3]) / this.cellSize);
            }
        }
        if (vPixelAdjustment != 0) {
            this.theInsideLayer.style.top = (safeParseInt(this.theInsideLayer.style.top) + vPixelAdjustment) + 'px';
        }
    }
};
kaMap.prototype.wrapR2L = function() {
    this.xOffset = this.xOffset - (this.nBuffer * this.tileWidth);
    var layers = this.aMaps[this.currentMap].getLayers();
    for (var k = 0; k < layers.length; k++) {
        var d = layers[k].domObj;
        var refLeft = safeParseInt(d.childNodes[0].style.left);
        for (var j = 0; j < this.nHigh; j++) {
            var imgLast = d.childNodes[((j + 1) * this.nWide) - 1];
            var imgNext = d.childNodes[j * this.nWide];
            imgLast.style.left = (refLeft - this.tileWidth) + 'px';
            imgLast.src = this.aPixel.src;
            d.removeChild(imgLast);
            d.insertBefore(imgLast, imgNext);
            if (layers[k].visible) {
                layers[k].setTile(imgLast);
            }
        }
    }
};
kaMap.prototype.wrapL2R = function() {
    this.xOffset = this.xOffset + (this.nBuffer * this.tileWidth);
    var layers = this.aMaps[this.currentMap].getLayers();
    for (var k = 0; k < layers.length; k++) {
        var d = layers[k].domObj;
        var refLeft = safeParseInt(d.childNodes[this.nWide - 1].style.left);
        for (var j = 0; j < this.nHigh; j++) {
            var imgFirst = d.childNodes[j * this.nWide];
            var imgNext;
            if (j < this.nHigh - 1) {
                imgNext = d.childNodes[((j + 1) * this.nWide)];
            } else {
                imgNext = null;
            }
            imgFirst.style.left = (refLeft + this.tileWidth) + 'px';
            imgFirst.src = this.aPixel.src;
            d.removeChild(imgFirst);
            if (imgNext) {
                d.insertBefore(imgFirst, imgNext);
            } else {
                d.appendChild(imgFirst);
            }
            if (layers[k].visible) {
                layers[k].setTile(imgFirst);
            }
        }
    }
};
kaMap.prototype.wrapT2B = function() {
    this.yOffset = this.yOffset + (this.nBuffer * this.tileHeight);
    var layers = this.aMaps[this.currentMap].getLayers();
    for (var k = 0; k < layers.length; k++) {
        var d = layers[k].domObj;
        var refTop = safeParseInt(d.childNodes[(this.nHigh * this.nWide) - 1].style.top);
        for (var i = 0; i < this.nWide; i++) {
            var imgBottom = d.childNodes[0];
            imgBottom.style.top = (refTop + this.tileHeight) + 'px';
            imgBottom.src = this.aPixel.src;
            d.removeChild(imgBottom);
            d.appendChild(imgBottom);
            if (layers[k].visible) {
                layers[k].setTile(imgBottom);
            }
        }
    }
};
kaMap.prototype.wrapB2T = function() {
    this.yOffset = this.yOffset - (this.nBuffer * this.tileHeight);
    var layers = this.aMaps[this.currentMap].getLayers();
    for (var k = 0; k < layers.length; k++) {
        var d = layers[k].domObj;
        var refTop = safeParseInt(d.childNodes[0].style.top);
        for (var i = 0; i < this.nWide; i++) {
            var imgTop = d.childNodes[(this.nHigh * this.nWide) - 1];
            imgTop.style.top = (refTop - this.tileHeight) + 'px';
            imgTop.src = this.aPixel.src;
            d.removeChild(imgTop);
            d.insertBefore(imgTop, d.childNodes[0]);
            if (layers[k].visible) {
                layers[k].setTile(imgTop);
            }
        }
    }
};
kaMap.prototype.addMap = function(oMap) {
    oMap.kaMap = this;
    this.aMaps[oMap.name] = oMap;
};
kaMap.prototype.getMaps = function() {
    return this.aMaps;
};
kaMap.prototype.getCurrentMap = function() {
    return this.aMaps[this.currentMap];
};
kaMap.prototype.selectMap = function(name) {
    if (!this.aMaps[name]) {
        return false;
    } else {
        this.currentMap = name;
        var oMap = this.getCurrentMap();
        this.setBackgroundColor(oMap.backgroundColor);
        if (arguments[1] && arguments[1].length == 3) {
            this.zoomTo(arguments[1][0], arguments[1][1], arguments[1][2]);
            oMap.aZoomTo.length = 0;
        } else if (oMap.aZoomTo.length != 0) {
            this.zoomTo(oMap.aZoomTo[0], oMap.aZoomTo[1], oMap.aZoomTo[2]);
            oMap.aZoomTo.length = 0;
        } else if (arguments[1] && arguments[1].length == 4) {
            this.zoomToExtents(arguments[1][0], arguments[1][1], arguments[1][2], arguments[1][3]);
        } else {
            this.zoomToExtents(oMap.currentExtents[0], oMap.currentExtents[1], oMap.currentExtents[2], oMap.currentExtents[3]);
        }
        this.triggerEvent(KAMAP_MAP_INITIALIZED, this.currentMap);
        return true;
    }
};
kaMap.prototype.activateMapLayer = function(layer) {
    if (!layer.domObj) {
        var dO = this.aDomObjects[layer.name];
        if (dO) {
            layer.domObj = dO;
        } else {
            var d = this.createMapLayer(layer.name);
            this.theInsideLayer.appendChild(d);
            d.appended = true;
            layer.domObj = d;
            layer.setOpacity(layer.opacity);
            layer.setZIndex(layer.zIndex);
            layer.setVisibility(layer.visible);
            this.nWide = 0;
            this.nHigh = 0;
            this.drawGroup(layer);
        }
    }
    if (!layer.domObj.appended) {
        this.theInsideLayer.appendChild(layer.domObj);
        layer.domObj.appended = true;
        layer.setZIndex(layer.zIndex);
    }
    return true;
};
kaMap.prototype.deactivateMapLayer = function(lName) {
    for (var i = this.theInsideLayer.childNodes.length - 1; i >= 0; i--) {
        if (this.theInsideLayer.childNodes[i].id == lName && this.theInsideLayer.childNodes[i].className == 'mapLayer') {
            this.theInsideLayer.childNodes[i].appended = false;
            this.theInsideLayer.removeChild(this.theInsideLayer.childNodes[i]);
        }
    }
    return true;
};
kaMap.prototype.drawGroup = function(group) {
    var newViewportWidth = this.getObjectWidth(this.domObj);
    var newViewportHeight = this.getObjectHeight(this.domObj);
    if (this.viewportWidth == null) {
        this.theInsideLayer.style.top = (-1 * this.nCurrentTop + this.yOrigin) + "px";
        this.theInsideLayer.style.left = (-1 * this.nCurrentLeft + this.xOrigin) + "px";
        this.viewportWidth = newViewportWidth;
        this.viewportHeight = newViewportHeight;
    }
    var newWide = Math.ceil((newViewportWidth / this.tileWidth) + 2 * this.nBuffer);
    var newHigh = Math.ceil((newViewportHeight / this.tileHeight) + 2 * this.nBuffer);
    this.viewportWidth = newViewportWidth;
    this.viewportHeight = newViewportHeight;
    if (this.nHigh == 0 && this.nWide == 0) {
        this.nWide = newWide;
    }
    while (this.nHigh < newHigh) {
        this.appendRow(group);
    }
    while (this.nHigh > newHigh) {
        this.removeRow(group);
    }
    while (this.nWide < newWide) {
        this.appendColumn(group);
    }
    while (this.nWide > newWide) {
        this.removeColumn(group);
    }
    return true;
};
kaMap.prototype.createMapLayer = function(id) {
    var d = document.createElement('div');
    d.id = id;
    d.className = 'mapLayer';
    d.style.position = 'absolute';
    d.style.visibility = 'visible';
    d.style.left = '0px';
    d.style.top = '0px';
    d.style.width = '3000px';
    d.style.height = '3000px';
    d.appended = false;
    this.aDomObjects[layer.name] = d;
    return d;
};
kaMap.prototype.getCenter = function() {
    var deltaMouseX = this.nCurrentLeft - this.xOrigin + safeParseInt(this.theInsideLayer.style.left);
    var deltaMouseY = this.nCurrentTop - this.yOrigin + safeParseInt(this.theInsideLayer.style.top);
    var vpTop = this.nCurrentTop - deltaMouseY;
    var vpLeft = this.nCurrentLeft - deltaMouseX;
    var vpCenterX = vpLeft + this.viewportWidth / 2;
    var vpCenterY = vpTop + this.viewportHeight / 2;
    return new Array(vpCenterX, vpCenterY);
};
kaMap.prototype.getGeoExtents = function() {
    var minx = -1 * (safeParseInt(this.theInsideLayer.style.left) - this.xOrigin) * this.cellSize;
    var maxx = minx + this.viewportWidth * this.cellSize;
    var maxy = (safeParseInt(this.theInsideLayer.style.top) - this.yOrigin) * this.cellSize;
    var miny = maxy - this.viewportHeight * this.cellSize;
    return [minx, miny, maxx, maxy];
};
kaMap.prototype.getMetaExtents = function() {
    var result = this.getGeoExtents();
    var oMap = this.getCurrentMap();
    layers = oMap.getLayers();
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].domObj) {
            var d = layers[i].domObj;
            var pl = safeParseInt(d.childNodes[0].style.left);
            var pt = safeParseInt(d.childNodes[0].style.top);
            var glt = this.pixToGeo(pl, pt, true);
            var left = -1 * glt[0];
            var top = -1 * glt[1];
            var right = left + this.nWide * this.tileWidth * this.cellSize;
            var bottom = top - this.nHigh * this.tileHeight * this.cellSize;
            result = [left, bottom, right, top];
            break;
        }
    }
    return result;
};
kaMap.prototype.zoomIn = function() {
    this.zoomByFactor(this.aMaps[this.currentMap].zoomIn());
};
kaMap.prototype.zoomOut = function() {
    this.zoomByFactor(this.aMaps[this.currentMap].zoomOut());
};
kaMap.prototype.zoomToScale = function(scale) {
    this.zoomByFactor(this.aMaps[this.currentMap].zoomToScale(scale));
};
kaMap.prototype.zoomByFactor = function(nZoomFactor) {
    if (nZoomFactor == 1) return;
    if (this.queueManager) {
        this.queueManager.dequeue(null);
        if (!geoViewerFirstTimeStartup && this.theZoomLayer.suspended == false) {
            this.setZoomLayer(nZoomFactor, 0, 0, true);
            this.queueManager.enqueue("myKaMap._zoomByFactor", "myKaMap._zoomByFactor", nZoomFactor, null);
            return;
        }
    }
    this._zoomByFactor(nZoomFactor);
};
kaMap.prototype._zoomByFactor = function(nZoomFactor) {
    this.cellSize = this.cellSize / nZoomFactor;
    this.initializeLayers(nZoomFactor);
    if (this.triggerTimeout != null) clearTimeout(this.triggerTimeout);
    this.triggerTimeout = setTimeout("myKaMap.triggerEvent(" + KAMAP_SCALE_CHANGED + "," + this.getCurrentScale() + ");myKaMap.triggerTimeout=null;", 1);
};
kaMap.prototype.getCurrentScale = function() {
    return this.aMaps[this.currentMap].aScales[this.aMaps[this.currentMap].currentScale];
};
kaMap.prototype.getScale = function(scale) {
    var scales = this.aMaps[this.currentMap].aScales;
    for (var i = 0; i < scales.length; i++) {
        if (scale == scales[i]) return i;
    }
    return 0;
};
kaMap.prototype.setLayerQueryable = function(name, bQueryable) {
    this.aMaps[this.currentMap].setLayerQueryable(name, bQueryable);
};
kaMap.prototype.setLayerVisibility = function(name, bVisible) {
    if (bVisible) {
        layer = this.aMaps[this.currentMap].getLayer(name);
        layer.visible = true;
        this.activateMapLayer(layer);
        this.aMaps[this.currentMap].setLayerVisibility(name, bVisible);
        this.paintLayer(layer);
    } else {
        this.deactivateMapLayer(name);
        this.aMaps[this.currentMap].setLayerVisibility(name, bVisible);
    }
};
kaMap.prototype.setLayerOpacity = function(name, opacity) {
    this.aMaps[this.currentMap].setLayerOpacity(name, opacity);
};
kaMap.prototype.registerEventID = function(eventID) {
    return this.eventManager.registerEventID(eventID);
};
kaMap.prototype.registerForEvent = function(eventID, obj, func) {
    return this.eventManager.registerForEvent(eventID, obj, func);
};
kaMap.prototype.deregisterForEvent = function(eventID, obj, func) {
    return this.eventManager.deregisterForEvent(eventID, obj, func);
};
kaMap.prototype.triggerEvent = function(eventID) {
    return this.eventManager.triggerEvent.apply(this.eventManager, arguments);
};

function safeParseInt(val) {
    return Math.round(parseFloat(val));
};

function _map(o) {
    this.aLayers = [];
    this.aZoomTo = [];
    this.kaMap = null;
    this.name = (typeof(o.name) != 'undefined') ? o.name : 'noname';
    this.title = (typeof(o.title) != 'undefined') ? o.title : 'no title';
    this.aScales = (typeof(o.scales) != 'undefined') ? o.scales : [1];
    this.currentScale = (typeof(o.currentScale) != 'undefined') ? parseFloat(o.currentScale) : 0;
    this.printScales = (typeof(o.printscales) != 'undefined') ? o.printscales : this.aScales;
    this.units = (typeof(o.units) != 'undefined') ? o.units : 5;
    this.resolution = (typeof(o.resolution) != 'undefined') ? o.resolution : 72;
    this.defaultExtents = (typeof(o.defaultExtents) != 'undefined') ? o.defaultExtents : [];
    this.currentExtents = (typeof(o.currentExtents) != 'undefined') ? o.currentExtents : [];
    this.maxExtents = (typeof(o.maxExtents) != 'undefined') ? o.maxExtents : [];
    this.keymapExtents = (typeof(o.keymapExtents) != 'undefined') ? o.keymapExtents : [];
    this.backgroundColor = (typeof(o.backgroundColor) != 'undefined') ? o.backgroundColor : '#ffffff';
    this.version = (typeof(o.version) != 'undefined') ? o.version : "";
};
_map.prototype.addLayer = function(layer) {
    layer._map = this;
    layer.zIndex = this.aLayers.length;
    this.aLayers.push(layer);
};
_map.prototype.getLayers = function() {
    var r = [];
    for (var i = 0; i < this.aLayers.length; i++) {
        if (this.aLayers[i].isVisible() && this.aLayers[i].visible) {
            r.push(this.aLayers[i]);
        }
    }
    return r;
};
_map.prototype.getAllLayers = function() {
    return this.aLayers;
};
_map.prototype.getLayer = function(name) {
    for (var i = 0; i < this.aLayers.length; i++) {
        if (this.aLayers[i].name == name) {
            return this.aLayers[i];
        }
    }
};
_map.prototype.getScales = function() {
    return this.aScales;
};
_map.prototype.zoomIn = function() {
    var nZoomFactor = 1;
    if (this.currentScale < this.aScales.length - 1) {
        nZoomFactor = this.aScales[this.currentScale] / this.aScales[this.currentScale + 1];
        this.currentScale = this.currentScale + 1;
    }
    return nZoomFactor;
};
_map.prototype.zoomOut = function() {
    var nZoomFactor = 1;
    if (this.currentScale > 0) {
        nZoomFactor = this.aScales[this.currentScale] / this.aScales[this.currentScale - 1];
        this.currentScale = this.currentScale - 1;
    }
    return nZoomFactor;
};
_map.prototype.zoomToScale = function(scale) {
    var nZoomFactor = 1;
    for (var i = 0; i < this.aScales.length; i++) {
        if (this.aScales[i] == scale) {
            nZoomFactor = this.aScales[this.currentScale] / scale;
            this.currentScale = parseInt(i);
        }
    }
    return nZoomFactor;
};
_map.prototype.setLayerQueryable = function(name, bQueryable) {
    var layer = this.getLayer(name);
    if (typeof(layer) != 'undefined') {
        layer.setQueryable(bQueryable);
    }
};
_map.prototype.setLayerVisibility = function(name, bVisible) {
    var layer = this.getLayer(name);
    if (typeof(layer) != 'undefined') {
        layer.setVisibility(bVisible);
    }
};
_map.prototype.setLayerOpacity = function(name, opacity) {
    var layer = this.getLayer(name);
    if (typeof(layer) != 'undefined') {
        layer.setOpacity(opacity);
    }
};
_map.prototype.setDefaultExtents = function(minx, miny, maxx, maxy) {
    this.defaultExtents = [minx, miny, maxx, maxy];
    if (this.currentExtents.length == 0) this.setCurrentExtents(minx, miny, maxx, maxy);
};
_map.prototype.setCurrentExtents = function(minx, miny, maxx, maxy) {
    this.currentExtents = [minx, miny, maxx, maxy];
};
_map.prototype.setMaxExtents = function(minx, miny, maxx, maxy) {
    this.maxExtents = [minx, miny, maxx, maxy];
};
_map.prototype.setBackgroundColor = function(szBgColor) {
    this.backgroundColor = szBgColor;
};

function _layer(o) {
    this.domObj = null;
    this._map = null;
    this.name = (typeof(o.name) != 'undefined') ? o.name : 'unnamed';
    this.index = (typeof(o.index) != 'undefined') ? o.index : -1;
    this.type = (typeof(o.type) != 'undefined') ? o.type : 'STANDARD';
    this.collector = (typeof(o.collector) != 'undefined') ? o.collector : 'auto';
    if (typeof(o.filtername) != 'undefined' && typeof(o.filterfields) != 'undefined') {
        this.filter = new Object();
        this.filter.name = o.filtername;
        this.filter.fields = new Array();
        var fields = o.filterfields.split(",");
        for (var i = 0; i < fields.length; i++) {
            var attr = fields[i].split("|");
            var field = new Object();
            field.replacename = attr[0];
            field.type = attr[1].split(":")[0];
            field.defaultvalue = attr[2];
            field.label = attr[3];
            this.filter.fields.push(field);
        }
        this.cacheid = parseInt((new Date()).getTime());
    } else this.filter = null;
    this.tileDistanceX = (typeof(o.tileDistanceX) != 'undefined') ? o.tileDistanceX : -1;
    this.tileDistanceY = (typeof(o.tileDistanceY) != 'undefined') ? o.tileDistanceY : -1;
    this.overlayMaxscale = (typeof(o.overlayMaxscale) != 'undefined') ? o.overlayMaxscale : -1;
    this.layerMaxextent = (typeof(o.layerMaxextent) != 'undefined') ? o.layerMaxextent : null;
    this.layerBackground = (typeof(o.layerBackground) != 'undefined') ? o.layerBackground : null;
    this.layerPermissions = (typeof(o.layerPermissions) != 'undefined') ? o.layerPermissions.split(',') : null;
    this.metaBuffer = (typeof(o.metaBuffer) != 'undefined') ? o.metaBuffer : 'off';
    this.symbolscale = (typeof(o.symbolscale) != 'undefined') ? o.symbolscale : null;
    this.highlight = (typeof(o.highlight) != 'undefined') ? o.highlight : false;
    this.searchHighlight = (typeof(o.searchHighlight) != 'undefined') ? o.searchHighlight : true;
    this.tooltip = (typeof(o.tooltip) != 'undefined') ? o.tooltip : false;
    this.hotspot = (typeof(o.hotspot) != 'undefined') ? o.hotspot : '';
    this.objectId = (typeof(o.objectId) != 'undefined') ? o.objectId : '';
    this.legendicon = (typeof(o.legendicon) != 'undefined') ? o.legendicon : 'DYNAMIC';
    this.legendentry = (typeof(o.legendentry) != 'undefined') ? o.legendentry : true;
    this.overlayonly = (typeof(o.overlayonly) != 'undefined') ? o.overlayonly : false;
    this.mergeoverlay = (typeof(o.mergeoverlay) != 'undefined') ? o.mergeoverlay : false;
    this.graphics = (typeof(o.graphics) != 'undefined') ? o.graphics : false;
    this.searchtitle = (typeof(o.searchtitle) != 'undefined') ? o.searchtitle : false;
    this.printgroup = (typeof(o.printgroup) != 'undefined') ? o.printgroup : '';
    this.metadata = (typeof(o.metadata) != 'undefined') ? o.metadata : null;
    this.geoshopRefreshDate = (typeof(o.geoshopRefreshDate) != 'undefined') ? o.geoshopRefreshDate : -1;
    if (this.geoshopRefreshDate != -1) {
        var tmpYear = parseInt(this.geoshopRefreshDate / 10000);
        var tmpMonth = parseInt((this.geoshopRefreshDate - (tmpYear * 10000)) / 100);
        var tmpDay = parseInt(this.geoshopRefreshDate - (tmpYear * 10000) - (tmpMonth * 100));
        var tmpDate = new Date(tmpYear, tmpMonth - 1, tmpDay);
        this.geoshopRefreshDate = tmpDate;
    } else this.geoshopRefreshDate = null;
    this.visible = (typeof(o.visible) != 'undefined') ? o.visible : false;
    this.opacity = (typeof(o.opacity) != 'undefined') ? o.opacity : 100;
    this.defaultOpacity = this.opacity;
    this.imageformat = (typeof(o.imageformat) != 'undefined') ? o.imageformat : null;
    this.queryable = (typeof(o.queryable) != 'undefined') ? o.queryable : false;
    this.queryState = (typeof(o.queryable) != 'undefined') ? o.queryable : false;
    this.tileSource = (typeof(o.tileSource) != 'undefined') ? o.tileSource : 'auto';
    this.scales = (typeof(o.scales) != 'undefined') ? o.scales : new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    this.toLoad = 0;
    var ts = new Date();
    this.timeStamp = Math.round(ts.getTime() / 1000) + ts.getTimezoneOffset() * 60;
    this.redrawInterval = (typeof(o.redrawInterval) != 'undefined') ? o.redrawInterval : -1;
    this.refreshInterval = (typeof(o.refreshInterval) != 'undefined') ? o.refreshInterval : -1;
    if (this.refreshInterval > 0) {
        goQueueManager.enqueue(this.refreshInterval * 1000, this, this.redraw);
    }
};
_layer.prototype.isVisible = function() {
    return (this.scales[this._map.currentScale] == 1) ? true : false;
};
_layer.prototype.setOpacity = function(amount) {
    this.opacity = amount;
    if (this.domObj) {
        this.domObj.style.opacity = amount / 100;
        this.domObj.style.mozOpacity = amount / 100;
        for (var i = 0; i < this.domObj.childNodes.length; i++) {
            this.domObj.childNodes[i].style.filter = "Alpha(opacity=" + amount + ")";
        }
    }
};
_layer.prototype.setTile = function(img) {
    var l = safeParseInt(img.style.left) + this._map.kaMap.xOrigin;
    var t = safeParseInt(img.style.top) + this._map.kaMap.yOrigin;
    var layer = bgLayer = null;
    if (this.layerMaxextent) {
        var geoPos = myKaMap.pixToGeo(l, t);
        var geoX = -1 * geoPos[0];
        var geoY = -1 * geoPos[1];
        if (parseInt(this.layerMaxextent[0]) > parseInt(geoX + myKaMap.tileWidth * myKaMap.cellSize) || parseInt(this.layerMaxextent[2]) < parseInt(geoX) || parseInt(this.layerMaxextent[1]) > parseInt(geoY) || parseInt(this.layerMaxextent[3]) < parseInt(geoY - myKaMap.tileHeight * myKaMap.cellSize)) {
            if (!this.layerBackground) return;
            else bgLayer = myKaMap.getCurrentMap().getLayer(this.layerBackground);
            if (bgLayer == null) return;
        }
    }
    layer = ((bgLayer != null) ? bgLayer : this);
    var szImageformat = '';
    var src;
    var image_format = '';
    if (layer.imageformat && layer.imageformat != '') {
        image_format = layer.imageformat;
        szImageformat = '&i=' + image_format;
    }
    if (layer.tileSource == 'cache') {
        var metaLeft = Math.floor(l / (layer._map.kaMap.tileWidth * layer._map.kaMap.metaWidth)) * layer._map.kaMap.tileWidth * layer._map.kaMap.metaWidth;
        var metaTop = Math.floor(t / (layer._map.kaMap.tileHeight * layer._map.kaMap.metaHeight)) * layer._map.kaMap.tileHeight * layer._map.kaMap.metaHeight;
        var metaTileId = 't' + metaTop + '/l' + metaLeft;
        var groupsDir = (layer.name != '') ? layer.name.replace(/\W/g, '_') : 'def';
        var cacheDir = layer._map.kaMap.webCache + gogisCurrentInstance + '/' + layer._map.aScales[layer._map.currentScale] + '/' + groupsDir + '/def/' + metaTileId;
        var tileId = "t" + t + "l" + l;
        var imageExtension = layer.imageformat.toLowerCase();
        imageExtension = ((imageExtension.indexOf('png') == 0 || imageExtension.indexOf('alpha') == 0 || imageExtension.length > 3) ? 'png' : imageExtension);
        src = cacheDir + "/" + tileId + "." + imageExtension;
        // MARKER: produces src = ""https://merian.bs.ch//tmp/kacache/merianplan/2000/LAYEROBJ_MERIANPLAN_OVERVIEW/def/t-1536/l-1536/t-1280l-512.png"
    } else {
        var szVersion = '';
        if (layer._map.version != '') {
            szVersion = '&version=' + layer._map.version;
        }
        var szForce = '';
        var szLayers = '';
        if (arguments[1]) {
            szForce = '&force=true';
        }
        var szTimestamp = '';
        if (layer.tileSource == 'redraw' || layer.tileSource == "refresh") {
            szTimestamp = '&ts=' + layer.timeStamp;
            if (layer.redrawInterval) {
                szTimestamp = szTimestamp + '&interval=' + layer.redrawInterval;
            }
        }
        var szGroup = '&g=' + layer.name;
        var szScale = '&s=' + layer._map.aScales[layer._map.currentScale];
        var q = '?';
        if (layer._map.kaMap.tileURL.indexOf('?') != -1) {
            if (layer._map.kaMap.tileURL.slice(-1) != '&') {
                q = '&';
            } else {
                q = '';
            }
        }
        src = layer._map.kaMap.server + layer._map.kaMap.tileURL + q + 'map=' + layer._map.name + '&t=' + t + '&l=' + l + szScale + szForce + szGroup + szImageformat + szTimestamp + szVersion + "&instance=" + gogisCurrentInstance;
        if (layer.tileSource == 'nocache') {
            src += "&src=nocache";
            if (layer.cacheid) src += "&cacheid=" + layer.cacheid;
            if (layer.filter) {
                src += "&filter=";
                for (var i = 0; i < layer.filter.fields.length; i++) {
                    src += (i > 0 ? "," : "") + layer.filter.fields[i].replacename + "|" + document.getElementById(layer.filter.name + "_" + layer.filter.fields[i].replacename).getAttribute("currentValue") + "|" + layer.filter.fields[i].type;
                }
            }
        } else src += "&src=auto";
        if (layer.metaBuffer != 'off') {
            src += "&metaBuffer=";
            if (layer.symbolscale) {
                src += layer.metaBuffer * layer.symbolscale / layer._map.kaMap.getCurrentScale();
            } else src += layer.metaBuffer;
        }
    }
    if ((layer.tileSource != 'cache' && img.src.split("kamap")[1] != src.split("kamap")[1]) || (layer.tileSource == 'cache' && img.src.split("kacache")[1] != src.split("kacache")[1])) {
        img.style.visibility = 'hidden';
        img.src = src;
    }
};
_layer.prototype.setVisibility = function(bVisible) {
    this.visible = bVisible;
    if (this.domObj) {
        this.domObj.style.visibility = bVisible ? 'visible' : 'hidden';
        this.domObj.style.display = bVisible ? 'block' : 'none';
    }
};
_layer.prototype.setZIndex = function(zIndex) {
    this.zIndex = zIndex;
    if (this.domObj) {
        this.domObj.style.zIndex = zIndex;
    }
};
_layer.prototype.setTileLayer = function() {
    this.loaded = 0;
    for (i = 0; i < this.domObj.childNodes.length; i++) {
        img = this.domObj.childNodes[i];
        if (arguments[0]) {
            this.setTile(img, arguments[0]);
        } else {
            this.setTile(img);
        }
    }
};
_layer.prototype.redraw = function() {
    if (arguments[0]) {
        this.refreshInterval = arguments[0];
    }
    if (this.visible) {
        var ts = new Date();
        this.timeStamp = Math.round(ts.getTime() / 1000) + ts.getTimezoneOffset() * 60;
        this.setTileLayer();
    }
    if (this.refreshInterval > 0) {
        goQueueManager.enqueue(this.refreshInterval * 1000, this, this.redraw);
    }
};

function _eventManager() {
    this.events = [];
    this.lastEventID = 0;
}
_eventManager.prototype.registerEventID = function(eventID) {
    var ev = new String(eventID);
    if (!this.events[eventID]) {
        this.events[eventID] = [];
    }
};
_eventManager.prototype.registerForEvent = function(eventID, obj, func) {
    var ev = new String(eventID);
    this.events[eventID].push([obj, func]);
};
_eventManager.prototype.deregisterForEvent = function(eventID, obj, func) {
    var ev = new String(eventID);
    var bResult = false;
    if (!this.events[eventID]) {
        return false;
    }
    for (var i = 0; i < this.events[eventID].length; i++) {
        if (this.events[eventID][i][0] == obj && this.events[eventID][i][1] == func) {
            this.events[eventID].splice(i, 1);
            bResult = true;
        }
    }
    return bResult;
};
_eventManager.prototype.triggerEvent = function(eventID) {
    var ev = new String(eventID);
    if (!this.events[eventID]) {
        return false;
    }
    var args = new Array();
    for (i = 1; i < arguments.length; i++) {
        args[args.length] = arguments[i];
    }
    for (var i = 0; i < this.events[eventID].length; i++) {
        this.events[eventID][i][1].apply(this.events[eventID][i][0], arguments);
    }
    return true;
};
var goQueueManager = new _queueManager();

function _queueManager() {
    this.queue = new Array();
}
_queueManager.prototype.enqueue = function(timeout, obj, func, args) {
    var pos = this.queue.length;
    for (var i = 0; i < this.queue.length; i++) {
        if (this.queue[i] == null) {
            pos = i;
            break;
        }
    }
    var id = window.setTimeout("_queueManager_execute(" + pos + ")", timeout);
    this.queue[pos] = new Array(id, obj, func, args);
    return pos;
};
_queueManager.prototype.dequeue = function(pos) {
    if (this.queue[pos] != null) {
        window.clearTimeout(this.queue[pos][0]);
        this.queue[pos] = null;
    }
};

function _queueManager_execute(pos) {
    if (goQueueManager.queue[pos] != null) {
        var obj = goQueueManager.queue[pos][1];
        var func = goQueueManager.queue[pos][2];
        if (goQueueManager.queue[pos][3] != null) {
            func.apply(obj, goQueueManager.queue[pos][3]);
        } else {
            func.apply(obj);
        }
        goQueueManager.queue[pos] = null;
    }
};
var kaKeymapMultitouchHandler = new GogisMultitouchHandler();

function kaKeymap(oKaMap, szID) {
    this.kaMap = oKaMap;
    this.domObj = this.kaMap.getRawObject(szID);
    this.domObj.kaKeymap = this;
    this.width = getObjectWidth(szID) + "px";
    this.height = getObjectHeight(szID) + "px";
    this.pxExtent = null;
    this.domExtents = null;
    this.domImg = null;
    this.imgSrc = 'kamap/php/keymap.php?loadImage=true';
    this.imgWidth = null;
    this.imgHeight = null;
    this.cellWidth = null;
    this.cellHeight = null;
    this.initialExtents = null;
    this.preventClick = false;
    this.domObj.onclick = this.onclick;
    if (this.domObj.captureEvents) {
        this.domObj.captureEvents(Event.CLICK);
    }
    this.highlightImage = ((gogisApplication.REFERENCE_MAP_IMAGE && gogisApplication.REFERENCE_MAP_IMAGE[gogisCurrentInstance] > "") ? "../../" + gogisApplication.REFERENCE_MAP_IMAGE[gogisCurrentInstance] : "../images/cross.gif");
    this.highlightColor = ((gogisApplication.REFERENCE_MAP_COLOR && gogisApplication.REFERENCE_MAP_COLOR[gogisCurrentInstance] > "") ? gogisApplication.REFERENCE_MAP_COLOR[gogisCurrentInstance] : "red");
    this.highlightBgColor = ((gogisApplication.REFERENCE_MAP_BGCOLOR && gogisApplication.REFERENCE_MAP_BGCOLOR[gogisCurrentInstance] > "") ? gogisApplication.REFERENCE_MAP_BGCOLOR[gogisCurrentInstance] : "pink");
    this.multitouchHandler = kaKeymapMultitouchHandler;
};
kaKeymap.prototype.draw = function() {
    var cMap = this.kaMap.getCurrentMap();
    this.cellWidth = (cMap.keymapExtents[2] - cMap.keymapExtents[0]) / this.imgWidth;
    this.cellHeight = (cMap.keymapExtents[3] - cMap.keymapExtents[1]) / this.imgHeight;
    for (var i = this.domObj.childNodes.length - 1; i >= 0; i--) {
        if (this.domImg && this.domImg != this.domObj.childNodes[i]) this.domObj.removeChild(this.domObj.childNodes[i]);
    }
    this.domObj.style.width = this.imgWidth + "px";
    this.domObj.style.height = this.imgHeight + "px";
    if (!this.domImg) {
        this.domImg = document.createElement('img');
        this.domImg.src = this.kaMap.server + "../images/a_pixel.gif";
        this.domImg.width = this.imgWidth;
        this.domImg.height = this.imgHeight;
        this.domObj.appendChild(this.domImg);
    }
    this.domExtents = document.createElement('div');
    this.domExtents.kaKeymap = this;
    this.domExtents.id = "keymapDomExtents";
    this.domExtents.style.position = 'absolute';
    this.domExtents.style.border = '1px solid ' + this.highlightColor;
    this.domExtents.style.top = "1px";
    this.domExtents.style.left = "1px";
    this.domExtents.style.width = "1px";
    this.domExtents.style.height = "1px";
    this.domExtents.style.backgroundColor = 'transparent';
    this.domExtents.style.visibility = 'hidden';
    this.domObj.appendChild(this.domExtents);
    this.domEvent = document.createElement('div');
    this.domEvent.kaKeymap = this;
    this.domEvent.onmousedown = this.mousedown;
    this.domEvent.onmouseup = this.mouseup;
    this.domEvent.onmousemove = this.mousemove;
    this.domEvent.onmouseout = this.mouseout;
    if (this.domEvent.captureEvents) {
        this.domEvent.captureEvents(Event.MOUSEDOWN);
        this.domEvent.captureEvents(Event.MOUSEUP);
        this.domEvent.captureEvents(Event.MOUSEMOVE);
        this.domEvent.captureEvents(Event.MOUSEOUT);
    }
    this.domEvent.style.position = 'absolute';
    this.domEvent.id = 'keymapDomEvent';
    this.domEvent.style.border = '1px solid ' + this.highlightColor;
    this.domEvent.style.top = "1px";
    this.domEvent.style.left = "1px";
    this.domEvent.style.width = "1px";
    this.domEvent.style.height = "1px";
    this.domEvent.style.backgroundColor = 'white';
    this.domEvent.style.visibility = 'visible';
    this.domEvent.style.opacity = 0.01;
    this.domEvent.style.mozOpacity = 0.01;
    this.domEvent.style.filter = "Alpha(opacity=0.01)";
    this.domObj.appendChild(this.domEvent);
    this.domEvent.ontouchstart = kaKeymapMultitouchHandler.touchstart;
    this.domEvent.ontouchmove = kaKeymapMultitouchHandler.touchmove;
    this.domEvent.ontouchend = kaKeymapMultitouchHandler.touchend;
    this.domEvent.ontouchcancel = kaKeymapMultitouchHandler.touchcancel;
    this.domEvent.multitouchHandler = kaKeymapMultitouchHandler;
    kaKeymapMultitouchHandler.callback = this.callback;
    var d = document.createElement('img');
    d.id = "keymapCrossImage";
    d.src = this.kaMap.server + this.highlightImage;
    d.style.position = 'absolute';
    d.style.top = '0px';
    d.style.left = '0px';
    d.style.width = "19px";
    d.style.height = "19px";
    d.style.visibility = 'hidden';
    this.domExtents.appendChild(d);
    this.domCross = d;
    if (this.initialExtents != null && geoViewerIsReady) {
        this.update(null, this.initialExtents);
    }
};
kaKeymap.prototype.update = function(eventID, extents) {
    if (!geoViewerIsReady) return;
    var cMap = this.kaMap.getCurrentMap();
    if (!cMap.keymapExtents || !this.domExtents) {
        this.initialExtents = extents;
        return;
    }
    var minY = extents[1] + (this.kaMap.cellSize * parseInt(getObjectHeight(getRawObject('viewportFooter'))));
    var left = (extents[0] - cMap.keymapExtents[0]) / this.cellWidth;
    var width = (extents[2] - extents[0]) / this.cellWidth;
    var top = -1 * (extents[3] - cMap.keymapExtents[3]) / this.cellHeight;
    var height = (extents[3] - minY) / this.cellHeight;
    this.pxExtent = new Array(left, top, width, height);
    this.domExtents.style.top = parseInt(top + 0.5) + "px";
    this.domExtents.style.left = parseInt(left + 0.5) + "px";
    this.domEvent.style.top = parseInt(top + 0.5) + "px";
    this.domEvent.style.left = parseInt(left + 0.5) + "px";
    if (parseInt(width + 0.5) < parseInt(this.domCross.style.width) || parseInt(height + 0.5) < parseInt(this.domCross.style.height)) {
        var ix = parseInt(this.domCross.style.width) / 2;
        var iy = parseInt(this.domCross.style.height) / 2;
        var ox = width / 2;
        var oy = height / 2;
        this.domExtents.style.width = this.domCross.style.width;
        this.domExtents.style.height = this.domCross.style.height;
        this.domEvent.style.width = this.domCross.style.width;
        this.domEvent.style.height = this.domCross.style.height;
        this.domExtents.style.top = (parseInt(this.domExtents.style.top) - iy + oy) + 'px';
        this.domExtents.style.left = (parseInt(this.domExtents.style.left) - ix + ox) + 'px';
        this.domEvent.style.top = (parseInt(this.domEvent.style.top) - iy + oy) + 'px';
        this.domEvent.style.left = (parseInt(this.domEvent.style.left) - ix + ox) + 'px';
        this.domCross.style.visibility = 'visible';
        this.domExtents.style.visibility = 'visible';
        this.domExtents.style.border = '0px solid white';
        this.domEvent.style.border = 'none';
    } else {
        this.domExtents.style.width = parseInt(width + 0.5) + "px";
        this.domExtents.style.height = parseInt(height + 0.5) + "px";
        this.domEvent.style.width = parseInt(width + 0.5) + "px";
        this.domEvent.style.height = parseInt(height + 0.5) + "px";
        this.domCross.style.visibility = 'hidden';
        this.domExtents.style.border = '1px solid ' + this.highlightColor;
        this.domEvent.style.border = '1px solid ' + this.highlightColor;
        this.domEvent.style.visibility = 'visible';
        this.domExtents.style.visibility = 'visible';
    }
};
kaKeymap.prototype.onclick = function(e) {
    if (!this.kaKeymap.preventClick) {
        this.kaKeymap.preventClick = true;
        e = (e) ? e : ((event) ? event : null);
        this.kaKeymap.centerMap(e);
    }
};
kaKeymap.prototype.centerMap = function(e) {
    var pos = this.aPixPos(e.clientX, e.clientY);
    this.kaMap.zoomTo(pos[0], pos[1]);
    gogisTabControlChange(1);
    setTimeout("myKaKeymap.preventClick=false;", 500);
};
kaKeymap.prototype.aPixPos = function(x, y) {
    var cMap = this.kaMap.getCurrentMap();
    var obj = this.domObj;
    var offsetLeft = 0;
    var offsetTop = 0;
    while (obj) {
        offsetLeft += parseFloat(obj.offsetLeft);
        offsetTop += parseFloat(obj.offsetTop);
        obj = obj.offsetParent;
    }
    var pX = x - offsetLeft;
    var pY = y - offsetTop;
    pX = parseFloat(cMap.keymapExtents[0] + (this.cellWidth * pX));
    pY = parseFloat(cMap.keymapExtents[3] - (this.cellHeight * pY));
    return [pX, pY];
};
kaKeymap.prototype.ontouchstart = kaKeymapMultitouchHandler.touchstart;
kaKeymap.prototype.ontouchmove = kaKeymapMultitouchHandler.touchmove;
kaKeymap.prototype.ontouchend = kaKeymapMultitouchHandler.touchend;
kaKeymap.prototype.ontouchcancel = kaKeymapMultitouchHandler.touchcancel;
kaKeymap.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {
        myKaKeymap.preventClick = false;
        myKaKeymap.domEvent.style.top = "0px";
        myKaKeymap.domEvent.style.left = "0px";
        myKaKeymap.domEvent.style.width = myKaKeymap.domObj.style.width;
        myKaKeymap.domEvent.style.height = myKaKeymap.domObj.style.height;
        myKaKeymap.domExtents.init = 1;
        myKaKeymap.domExtents.oX = obj.clientX;
        myKaKeymap.domExtents.oY = obj.clientY;
        var amount = 50;
        myKaKeymap.domExtents.style.backgroundColor = myKaKeymap.highlightBgColor;
        myKaKeymap.domExtents.style.opacity = amount / 100;
    } else if (cmd == 'move') {
        if (myKaKeymap.domExtents.init) {
            var xMov = (myKaKeymap.domExtents.oX - obj.clientX);
            var yMov = (myKaKeymap.domExtents.oY - obj.clientY);
            var oX = myKaKeymap.pxExtent[0];
            var oY = myKaKeymap.pxExtent[1];
            var nX = oX - xMov;
            var nY = oY - yMov;
            myKaKeymap.domExtents.oX = obj.clientX;
            myKaKeymap.domExtents.oY = obj.clientY;
            myKaKeymap.pxExtent[0] = nX;
            myKaKeymap.pxExtent[1] = nY;
            if (myKaKeymap.domCross.style.visibility == 'visible') {
                var ix = parseInt(myKaKeymap.domCross.style.width) / 2;
                var iy = parseInt(myKaKeymap.domCross.style.height) / 2;
                var ox = myKaKeymap.pxExtent[2] / 2;
                var oy = myKaKeymap.pxExtent[3] / 2;
                myKaKeymap.domExtents.style.top = parseInt((nY + 0.5) - iy + oy) + "px";
                myKaKeymap.domExtents.style.left = parseInt((nX + 0.5) - ix + ox) + "px";
            } else {
                myKaKeymap.domExtents.style.top = parseInt(nY + 0.5) + "px";
                myKaKeymap.domExtents.style.left = parseInt(nX + 0.5) + "px";
            }
        }
    } else if (cmd == 'moving_done') {
        if (myKaKeymap.domExtents.init) {
            myKaKeymap.preventClick = true;
            myKaKeymap.domExtents.style.backgroundColor = 'transparent';
            myKaKeymap.domExtents.style.opacity = 1;
            myKaKeymap.domExtents.init = 0;
            var cG = myKaKeymap.geoCentCoord();
            myKaKeymap.kaMap.zoomTo(cG[0], cG[1]);
            gogisTabControlChange(1);
            setTimeout("myKaKeymap.preventClick=false;", 500);
        }
    } else if (cmd == 'done') {
        if (myKaKeymap.domExtents.init) {
            myKaKeymap.preventClick = true;
            myKaKeymap.domExtents.style.backgroundColor = 'transparent';
            myKaKeymap.domExtents.style.opacity = 1;
            myKaKeymap.domExtents.init = 0;
            myKaKeymap.centerMap(obj);
            setTimeout("myKaKeymap.preventClick=false;", 500);
        }
    }
};
kaKeymap.prototype.mousedown = function(e) {
    this.kaKeymap.preventClick = false;
    e = (e) ? e : ((event) ? event : null);
    if (e.preventDefault) e.preventDefault();
    this.kaKeymap.domEvent.style.top = "0px";
    this.kaKeymap.domEvent.style.left = "0px";
    this.kaKeymap.domEvent.style.width = this.kaKeymap.domObj.style.width;
    this.kaKeymap.domEvent.style.height = this.kaKeymap.domObj.style.height;
    this.kaKeymap.domExtents.init = 1;
    this.kaKeymap.domExtents.oX = e.clientX;
    this.kaKeymap.domExtents.oY = e.clientY;
    var amount = 50;
    this.kaKeymap.domExtents.style.backgroundColor = this.kaKeymap.highlightBgColor;
    this.kaKeymap.domExtents.style.opacity = amount / 100;
    if (this.kaKeymap.kaMap.isIE4) {
        this.kaKeymap.domExtents.style.filter = "Alpha(opacity=" + amount + ")";
    }
    e = null;
};
kaKeymap.prototype.mouseout = function(e) {};
kaKeymap.prototype.mouseup = function(e) {
    this.kaKeymap.preventClick = true;
    e = (e) ? e : ((event) ? event : null);
    if (e.preventDefault) e.preventDefault();
    if (this.kaKeymap.domExtents.init) {
        this.kaKeymap.domExtents.style.backgroundColor = 'transparent';
        this.kaKeymap.domExtents.style.opacity = 1;
        if (this.kaKeymap.kaMap.isIE4) {
            this.kaKeymap.domExtents.style.filter = "Alpha(opacity=100)";
        }
        this.kaKeymap.domExtents.init = 0;
        var cG = this.kaKeymap.geoCentCoord();
        this.kaKeymap.kaMap.zoomTo(cG[0], cG[1]);
        gogisTabControlChange(1);
    }
    setTimeout("myKaKeymap.preventClick=false;", 500);
};
kaKeymap.prototype.mousemove = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (e.preventDefault) e.preventDefault();
    if (this.kaKeymap.domExtents.init) {
        var xMov = (this.kaKeymap.domExtents.oX - e.clientX);
        var yMov = (this.kaKeymap.domExtents.oY - e.clientY);
        var oX = this.kaKeymap.pxExtent[0];
        var oY = this.kaKeymap.pxExtent[1];
        var nX = oX - xMov;
        var nY = oY - yMov;
        this.kaKeymap.domExtents.oX = e.clientX;
        this.kaKeymap.domExtents.oY = e.clientY;
        this.kaKeymap.pxExtent[0] = nX;
        this.kaKeymap.pxExtent[1] = nY;
        if (this.kaKeymap.domCross.style.visibility == 'visible') {
            var ix = parseInt(this.kaKeymap.domCross.style.width) / 2;
            var iy = parseInt(this.kaKeymap.domCross.style.height) / 2;
            var ox = this.kaKeymap.pxExtent[2] / 2;
            var oy = this.kaKeymap.pxExtent[3] / 2;
            this.kaKeymap.domExtents.style.top = parseInt((nY + 0.5) - iy + oy) + "px";
            this.kaKeymap.domExtents.style.left = parseInt((nX + 0.5) - ix + ox) + "px";
        } else {
            this.kaKeymap.domExtents.style.top = parseInt(nY + 0.5) + "px";
            this.kaKeymap.domExtents.style.left = parseInt(nX + 0.5) + "px";
        }
    }
};
kaKeymap.prototype.geoCentCoord = function() {
    var cMap = this.kaMap.getCurrentMap();
    var cpX = this.pxExtent[0] + this.pxExtent[2] / 2;
    var cpY = this.pxExtent[1] + this.pxExtent[3] / 2;
    var cX = cMap.keymapExtents[0] + (this.cellWidth * cpX);
    var cY = cMap.keymapExtents[3] - (this.cellHeight * cpY);
    return [cX, cY];
};
kaKeymap.prototype.changeMap = function(name) {
    if (!this.domImg) this.draw();
    this.domImg.src = this.imgSrc + '&map=' + this.kaMap.currentMap + '&image=' + name;
};
var kaCurrentTool = null;
var gDblClickTimer = mouseWheelProcess = multitouchProcess = null;
var currentWheelSteps = 0;
var isKaTouch = false;
var kaMultitouchHandler = new GogisMultitouchHandler();

function gogisMouseWheel() {
    if (mouseWheelProcess != null) {
        window.clearTimeout(mouseWheelProcess);
        mouseWheelProcess = null;
    }
    if (myKaMap.triggerTimeout != null || (myKaMap.theZoomLayer && myKaMap.theZoomLayer.running != null)) {
        mouseWheelProcess = window.setTimeout("gogisMouseWheel();", gogisApplication.MOUSEWHEEL_DELAYTIME);
        return;
    }
    var oMap = myKaMap.getCurrentMap();
    var scales = oMap.getScales();
    var newScaleIndex = oMap.currentScale + currentWheelSteps;
    if (newScaleIndex < 0) newScaleIndex = 0;
    else if (newScaleIndex > oMap.aScales.length - 1) newScaleIndex = oMap.aScales.length - 1;
    mouseWheelProcess = window.setTimeout("myKaMap.zoomToScale(" + scales[newScaleIndex] + ");currentWheelSteps=0;", gogisApplication.MOUSEWHEEL_DELAYTIME);
}

function gogisMultitouchZoom(x, y, scale) {
    if (multitouchProcess != null) {
        window.clearTimeout(multitouchProcess);
        multitouchProcess = null;
    }
    if (myKaNavigator.kaMap.getCurrentScale() != scale) {
        if (myKaMap.triggerTimeout != null || (myKaMap.theZoomLayer && myKaMap.theZoomLayer.running != null)) {
            multitouchProcess = window.setTimeout("gogisMultitouchZoom(" + x + "," + y + "," + scale + ");", gogisApplication.MOUSEWHEEL_DELAYTIME);
            return;
        }
        multitouchProcess = window.setTimeout("if(myKaMap.theZoomLayer)myKaMap.theZoomLayer.suspended=true;myKaMap.zoomTo(" + x + "," + y + "," + scale + ");multitouchProcess=null;", gogisApplication.MOUSEWHEEL_DELAYTIME);
    } else if (myKaNavigator.kaMap.theZoomLayer) myKaNavigator.kaMap.resetZoomLayer();
}

function kaTool(oKaMap) {
    this.kaMap = oKaMap;
    this.name = 'kaTool';
    this.bInfoTool = false;
    this.button = -1;
    this.kaMap.registerTool(this);
    this.multitouchHandler = kaMultitouchHandler;
};
kaTool.prototype.isInfoTool = function() {
    return this.bInfoTool;
};
kaTool.prototype.activate = function() {
    this.kaMap.activateTool(this);
    document.kaCurrentTool = this;
};
kaTool.prototype.deactivate = function() {
    this.kaMap.deactivateTool(this);
    document.kaCurrentTool = null;
};
kaTool.prototype.ontouchstart = function(e) {
    return false;
};
kaTool.prototype.ontouchmove = function(e) {
    return false;
};
kaTool.prototype.ontouchend = function(e) {
    return false;
};
kaTool.prototype.ontouchcancel = function(e) {
    return false;
};
kaTool.prototype.callback = function(cmd, obj) {};
kaTool.prototype.onmousemove = function(e) {
    return false;
};
kaTool.prototype.onmousedown = function(e) {
    return false;
};
kaTool.prototype.onmouseup = function(e) {
    return false;
};
kaTool.prototype.ondblclick = function(e) {
    return false;
};
kaTool.prototype.onmousewheel = function(e) {
    if (gogisApplication.MOUSEWHEEL_ZOOM && !gogisApplication.MOUSEWHEEL_ZOOM[gogisCurrentInstance]) return false;
    if (mouseWheelProcess != null) {
        window.clearTimeout(mouseWheelProcess);
        mouseWheelProcess = null;
    }
    e = (e) ? e : ((event) ? event : null);
    var wheelDelta = e.wheelDelta ? e.wheelDelta : e.detail * -1;
    if (wheelDelta > 0) currentWheelSteps++;
    else currentWheelSteps--;
    mouseWheelProcess = window.setTimeout("gogisMouseWheel();", gogisApplication.MOUSEWHEEL_DELAYTIME);
};
kaTool.prototype.adjustPixPosition = function(x, y) {
    var obj = this.kaMap.domObj;
    var offsetLeft = 0;
    var offsetTop = 0;
    while (obj) {
        offsetLeft += parseInt(obj.offsetLeft);
        offsetTop += parseInt(obj.offsetTop);
        obj = obj.offsetParent;
    }
    var pX = parseInt(this.kaMap.theInsideLayer.style.left) + offsetLeft - this.kaMap.xOrigin - x;
    var pY = parseInt(this.kaMap.theInsideLayer.style.top) + offsetTop - this.kaMap.yOrigin - y;
    return [pX, pY];
};

function kaTool_redirect_onkeypress(e) {
    if (document.kaCurrentTool) {
        document.kaCurrentTool.onkeypress(e);
    }
};
kaTool.prototype.onkeypress = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (e) {
        var charCode = (e.charCode) ? e.charCode : e.keyCode;
        var b = true;
        var nStep = 16;
        switch (charCode) {
            case 38:
                this.kaMap.moveBy(0, nStep);
                this.kaMap.triggerEvent(KAMAP_EXTENTS_CHANGED, this.kaMap.getGeoExtents());
                break;
            case 40:
                this.kaMap.moveBy(0, -nStep);
                this.kaMap.triggerEvent(KAMAP_EXTENTS_CHANGED, this.kaMap.getGeoExtents());
                break;
            case 37:
                this.kaMap.moveBy(nStep, 0);
                this.kaMap.triggerEvent(KAMAP_EXTENTS_CHANGED, this.kaMap.getGeoExtents());
                break;
            case 39:
                this.kaMap.moveBy(-nStep, 0);
                this.kaMap.triggerEvent(KAMAP_EXTENTS_CHANGED, this.kaMap.getGeoExtents());
                break;
            case 33:
                this.kaMap.slideBy(0, this.kaMap.viewportHeight / 2);
                break;
            case 34:
                this.kaMap.slideBy(0, -this.kaMap.viewportHeight / 2);
                break;
            case 36:
                this.kaMap.slideBy(this.kaMap.viewportWidth / 2, 0);
                break;
            case 35:
                this.kaMap.slideBy(-this.kaMap.viewportWidth / 2, 0);
                break;
            case 43:
            case 61:
                this.kaMap.zoomIn();
                break;
            case 45:
                this.kaMap.zoomOut();
                break;
            case 46:
                if (document.kaCurrentTool.digitizer) document.kaCurrentTool.digitizer.removePoint();
                else b = false;
                break;
            case 27:
                if (document.kaCurrentTool.digitizer) document.kaCurrentTool.digitizer.reset();
                else b = false;
                break;
            default:
                b = false;
        }
        if (b) {
            return this.cancelEvent(e);
        }
        return true;
    }
};
kaTool.prototype.onmouseover = function(e) {
    return false;
};
kaTool.prototype.onmouseout = function(e) {
    if (this.kaMap.isIE4) {
        document.onkeydown = null;
    }
    document.onkeypress = null;
    return false;
};
kaTool.prototype.cancelEvent = function(e) {
    e = (e) ? e : ((event) ? event : null);
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
};

function kaNavigator(oKaMap) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'kaNavigator';
    if (isIE7 || isIE8) {
        this.cursorNormal = ["url('gogis/images/cursors/grab.cur'),move", '-moz-grab', 'grab', 'move'];
    } else {
        this.cursorNormal = ['-moz-grab', 'grab', "url('../images/cursors/grab.cur'),url('gogis/images/cursors/grab.cur'),move"];
    }
    if (isIE7 || isIE8) {
        this.cursorDrag = ["url('gogis/images/cursors/grabbing.cur'),move", '-moz-grabbing', 'grabbing', 'move'];
    } else {
        this.cursorDrag = ['-moz-grabbing', 'grabbing', "url('../images/cursors/grabbing.cur'),url('gogis/images/cursors/grabbing.cur'),move"];
    }
    this.cursor = this.cursorNormal;
    this.lastx = null;
    this.lasty = null;
    this.bMouseDown = false;
    for (var p in kaTool.prototype) {
        if (!kaNavigator.prototype[p]) kaNavigator.prototype[p] = kaTool.prototype[p];
    }
    this.multitouchHandler = kaMultitouchHandler;
};
kaNavigator.prototype.ontouchstart = kaMultitouchHandler.touchstart;
kaNavigator.prototype.ontouchmove = kaMultitouchHandler.touchmove;
kaNavigator.prototype.ontouchend = kaMultitouchHandler.touchend;
kaNavigator.prototype.ontouchcancel = kaMultitouchHandler.touchcancel;
kaNavigator.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {
        isKaTouch = true;
        myKaNavigator.startx = myKaNavigator.lastx = obj.clientX;
        myKaNavigator.starty = myKaNavigator.lasty = obj.clientY;
    } else if (cmd == 'done') {
        try {
            if (!gDblClickTimer) {
                gDblClickTimer = window.setTimeout(bind(myKaNavigator.dispatchMapClicked, myKaNavigator, obj.clientX, obj.clientY), 500);
            } else {
                myHotspot.mouseclickedcancled = true;
                window.clearTimeout(gDblClickTimer);
                gDblClickTimer = null;
                myKaNavigator.dispatchMapDblClicked(obj.clientX, obj.clientY);
            }
            var a = myKaNavigator.adjustPixPosition(obj.clientX, obj.clientY);
            var p = myKaNavigator.kaMap.pixToGeo(a[0], a[1]);
            myKaNavigator.kaMap.triggerEvent(KAMAP_MOUSE_TRACKER, {
                x: p[0],
                y: p[1]
            });
        } catch (e) {}
    } else if (cmd == 'zoom') {
        if (mouseWheelProcess != null) {
            window.clearTimeout(mouseWheelProcess);
            mouseWheelProcess = null;
        }
        var a = myKaNavigator.adjustPixPosition(obj.clientX, obj.clientY);
        var p = myKaNavigator.kaMap.pixToGeo(a[0], a[1]);
        var extents = myKaNavigator.kaMap.getGeoExtents();
        var cx = (extents[0] + extents[2]) / 2;
        var cy = (extents[1] + extents[3]) / 2;
        var dx = (cx - p[0]) / myKaNavigator.kaMap.cellSize;
        var dy = (p[1] - cy) / myKaNavigator.kaMap.cellSize;
        var cScale = myKaNavigator.kaMap.getCurrentScale();
        var nScale = Math.round(cScale / obj.scale);
        var cMap = myKaNavigator.kaMap.getCurrentMap();
        var scales = cMap.getScales();
        var sc1 = scales[scales.length - 1];
        var sc2 = scales[0];
        for (var i = 0; i < scales.length; i++) {
            if (scales[i] > nScale) sc2 = scales[i];
            else if (scales[i] < nScale && sc1 == scales[scales.length - 1]) sc1 = scales[i];
        }
        var nScale2 = (Math.abs(nScale - sc1) < Math.abs(nScale - sc2) ? sc1 : sc2);
        if (myKaNavigator.kaMap.theZoomLayer) {
            myKaNavigator.kaMap.setZoomLayer(obj.scale, dx, dy, false);
        }
    } else if (cmd == 'zooming_done') {
        if (mouseWheelProcess != null) {
            window.clearTimeout(mouseWheelProcess);
            mouseWheelProcess = null;
        }
        var a = myKaNavigator.adjustPixPosition(obj.clientX, obj.clientY);
        var p = myKaNavigator.kaMap.pixToGeo(a[0], a[1]);
        var extents = myKaNavigator.kaMap.getGeoExtents();
        var cx = (extents[0] + extents[2]) / 2;
        var cy = (extents[1] + extents[3]) / 2;
        var dx = (cx - p[0]) / myKaNavigator.kaMap.cellSize;
        var dy = (p[1] - cy) / myKaNavigator.kaMap.cellSize;
        var cScale = myKaNavigator.kaMap.getCurrentScale();
        var nScale = Math.round(cScale / obj.scale);
        var cMap = myKaNavigator.kaMap.getCurrentMap();
        var scales = cMap.getScales();
        var sc1 = scales[scales.length - 1];
        var sc2 = scales[0];
        for (var i = 0; i < scales.length; i++) {
            if (scales[i] > nScale) sc2 = scales[i];
            else if (scales[i] < nScale && sc1 == scales[scales.length - 1]) sc1 = scales[i];
        }
        var nScale2 = (Math.abs(nScale - sc1) < Math.abs(nScale - sc2) ? sc1 : sc2);
        if (myKaNavigator.kaMap.theZoomLayer) {
            myKaNavigator.kaMap.setZoomLayer(obj.scale, dx, dy, false);
        }
        gogisMultitouchZoom(p[0], p[1], nScale2);
    } else if (cmd == 'move') {
        GogisQueueManager.resetAllTasks();
        if (myTooltipManager.nextRelease != null) myTooltipManager.removeTooltip();
        if (myXmlOverlay.overlayCanvas) myXmlOverlay.overlayCanvas.style.display = "none";
        if (myGeoObjects.drawingCanvas) myGeoObjects.drawingCanvas.style.display = "none";
        if (myHighlightObjects.drawingCanvas) myHighlightObjects.drawingCanvas.style.display = "none";
        var newTop = safeParseInt(myKaNavigator.kaMap.theInsideLayer.style.top);
        var newLeft = safeParseInt(myKaNavigator.kaMap.theInsideLayer.style.left);
        newTop = newTop - myKaNavigator.lasty + obj.clientY;
        newLeft = newLeft - myKaNavigator.lastx + obj.clientX;
        myKaNavigator.kaMap.theInsideLayer.style.top = newTop + 'px';
        myKaNavigator.kaMap.theInsideLayer.style.left = newLeft + 'px';
        myKaNavigator.kaMap.checkWrap.apply(myKaNavigator.kaMap, []);
        myKaNavigator.lastx = obj.clientX;
        myKaNavigator.lasty = obj.clientY;
        if (myKaNavigator.mouseStopEvent) clearTimeout(myKaNavigator.mouseStopEvent);
        myKaNavigator.mouseStopEvent = setTimeout(function() {
            if (myXmlOverlay.overlayCanvas) myXmlOverlay.overlayCanvas.style.display = "inline";
            if (myGeoObjects.drawingCanvas) myGeoObjects.drawingCanvas.style.display = "inline";
            if (myHighlightObjects.drawingCanvas) myHighlightObjects.drawingCanvas.style.display = "inline";
        }, 300);
    } else if (cmd == 'moving_done') {
        if (myXmlOverlay.overlayCanvas) myXmlOverlay.overlayCanvas.style.display = "inline";
        if (!(Math.abs(obj.clientX - myKaNavigator.startx) < 2 && Math.abs(obj.clientY - myKaNavigator.starty) < 2)) {
            myKaNavigator.kaMap.triggerEvent(KAMAP_EXTENTS_CHANGED, myKaNavigator.kaMap.getGeoExtents());
        }
    }
};
kaNavigator.prototype.onmouseout = function(e) {
    if (isKaTouch) return;
    e = (e) ? e : ((event) ? event : null);
    if (!e.target) e.target = e.srcElement;
    if (e.target.id == this.kaMap.domObj.id) {
        this.bMouseDown = false;
        return kaTool.prototype.onmouseout.apply(this, [e]);
    }
};
kaNavigator.prototype.onmousemove = function(e) {
    if (isKaTouch) return;
    e = (e) ? e : ((event) ? event : null);
    if (!this.bMouseDown) {
        return false;
    }
    GogisQueueManager.resetAllTasks();
    if (myTooltipManager.nextRelease != null) myTooltipManager.removeTooltip();
    if (myXmlOverlay.overlayCanvas) myXmlOverlay.overlayCanvas.style.display = "none";
    if (myGeoObjects.drawingCanvas) myGeoObjects.drawingCanvas.style.display = "none";
    if (myHighlightObjects.drawingCanvas) myHighlightObjects.drawingCanvas.style.display = "none";
    var newTop = safeParseInt(this.kaMap.theInsideLayer.style.top);
    var newLeft = safeParseInt(this.kaMap.theInsideLayer.style.left);
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    newTop = newTop - this.lasty + y;
    newLeft = newLeft - this.lastx + x;
    this.kaMap.theInsideLayer.style.top = newTop + 'px';
    this.kaMap.theInsideLayer.style.left = newLeft + 'px';
    this.kaMap.checkWrap.apply(this.kaMap, []);
    this.lastx = x;
    this.lasty = y;
    if (this.mouseStopEvent) clearTimeout(this.mouseStopEvent);
    this.mouseStopEvent = setTimeout(function() {
        if (myXmlOverlay.overlayCanvas) myXmlOverlay.overlayCanvas.style.display = "inline";
        if (myGeoObjects.drawingCanvas) myGeoObjects.drawingCanvas.style.display = "inline";
        if (myHighlightObjects.drawingCanvas) myHighlightObjects.drawingCanvas.style.display = "inline";
    }, 300);
    return false;
};
kaNavigator.prototype.onmousedown = function(e) {
    if (isKaTouch) return;
    e = (e) ? e : ((event) ? event : null);
    this.button = e.button;
    this.cursor = this.cursorDrag;
    this.kaMap.setCursor(this.cursorDrag);
    if (myXmlOverlay.overlayEventImage) {
        myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
        myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
    }
    if (this.kaMap.isIE4) {
        document.onkeydown = kaTool_redirect_onkeypress;
    }
    document.onkeypress = kaTool_redirect_onkeypress;
    this.bMouseDown = true;
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    this.lastx = x;
    this.lasty = y;
    this.startx = this.lastx;
    this.starty = this.lasty;
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    return false;
};
kaNavigator.prototype.onmouseup = function(e) {
    if (isKaTouch) return;
    this.cursor = this.cursorNormal;
    this.kaMap.setCursor(this.cursorNormal);
    if (myXmlOverlay.overlayCanvas) myXmlOverlay.overlayCanvas.style.display = "inline";
    if (myXmlOverlay.overlayEventImage) {
        myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
        myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
    }
    e = (e) ? e : ((event) ? event : null);
    this.bMouseDown = false;
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    if (Math.abs(x - this.startx) < 2 && Math.abs(y - this.starty) < 2) {
        if (!gDblClickTimer) {
            gDblClickTimer = window.setTimeout(bind(this.dispatchMapClicked, this, x, y), 500);
        } else {
            myHotspot.mouseclickedcancled = true;
            window.clearTimeout(gDblClickTimer);
            gDblClickTimer = null;
            this.dispatchMapDblClicked(x, y);
        }
    } else {
        if (gDblClickTimer) {
            window.clearTimeout(gDblClickTimer);
            gDblClickTimer = null;
        }
        this.kaMap.triggerEvent(KAMAP_EXTENTS_CHANGED, this.kaMap.getGeoExtents());
    }
    return false;
};
kaNavigator.prototype.dispatchMapClicked = function(px, py) {
    gDblClickTimer = null;
    if (this.button == 2) return;
    var a = this.adjustPixPosition(px, py);
    var p = this.kaMap.pixToGeo(a[0], a[1]);
    this.kaMap.triggerEvent(KAMAP_MAP_CLICKED, p);
};
kaNavigator.prototype.dispatchMapDblClicked = function(px, py) {
    var a = this.adjustPixPosition(px, py);
    var p = this.kaMap.pixToGeo(a[0], a[1]);
    var newscale = this.kaMap.getCurrentMap().currentScale;
    if (this.button != 2) {
        if (newscale < this.kaMap.getCurrentMap().aScales.length - 1) newscale++;
    } else {
        if (newscale > 0) newscale--;
    }
    newscale = this.kaMap.getCurrentMap().aScales[newscale];
    this.kaMap.zoomTo(p[0], p[1], newscale);
};
kaNavigator.prototype.ondblclick = function(e) {};

function bind(m, o) {
    var __method = arguments[0];
    var __object = arguments[1];
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    return function() {
        return __method.apply(__object, args);
    }
}

function ScaleBar(scaleDenominator) {
    this.scaleDenominator = (scaleDenominator == null) ? 1 : scaleDenominator;
    this.displaySystem = 'metric';
    this.minWidth = 100;
    this.maxWidth = 200;
    this.divisions = 2;
    this.subdivisions = 2;
    this.showMinorMeasures = false;
    this.abbreviateLabel = false;
    this.singleLine = false;
    this.resolution = 96;
    this.align = 'center';
    this.container = document.createElement('div');
    this.container.className = 'sbWrapper';
    this.labelContainer = document.createElement('div');
    this.labelContainer.className = 'sbUnitsContainer';
    this.labelContainer.style.position = 'absolute';
    this.graphicsContainer = document.createElement('div');
    this.graphicsContainer.style.position = 'absolute';
    this.graphicsContainer.className = 'sbGraphicsContainer';
    this.numbersContainer = document.createElement('div');
    this.numbersContainer.style.position = 'absolute';
    this.numbersContainer.className = 'sbNumbersContainer';
    var markerMajor = document.createElement('div');
    markerMajor.className = 'sbMarkerMajor';
    this.graphicsContainer.appendChild(markerMajor);
    var markerMinor = document.createElement('div');
    markerMinor.className = 'sbMarkerMinor';
    this.graphicsContainer.appendChild(markerMinor);
    var barPiece = document.createElement('div');
    barPiece.className = 'sbBar';
    this.graphicsContainer.appendChild(barPiece);
    var barPieceAlt = document.createElement('div');
    barPieceAlt.className = 'sbBarAlt';
    this.graphicsContainer.appendChild(barPieceAlt);
}
ScaleBar.prototype.update = function(scaleDenominator) {
    if (scaleDenominator != null) {
        this.scaleDenominator = scaleDenominator;
    };

    function HandsomeNumber(smallUglyNumber, bigUglyNumber, sigFigs) {
        var sigFigs = (sigFigs == null) ? 10 : sigFigs;
        var bestScore = Number.POSITIVE_INFINITY;
        var bestTieBreaker = Number.POSITIVE_INFINITY;
        var handsomeValue = smallUglyNumber;
        var handsomeNumDec = 3;
        for (var halvingExp = 0; halvingExp < 3; ++halvingExp) {
            var comelyMultiplicand = Math.pow(2, (-1 * halvingExp));
            var maxTensExp = Math.floor(Math.log(bigUglyNumber / comelyMultiplicand) / Math.LN10);
            for (var tensExp = maxTensExp; tensExp > (maxTensExp - sigFigs + 1); --tensExp) {
                var numDec = Math.max(halvingExp - tensExp, 0);
                var testMultiplicand = comelyMultiplicand * Math.pow(10, tensExp);
                if ((testMultiplicand * Math.floor(bigUglyNumber / testMultiplicand)) >= smallUglyNumber) {
                    if (smallUglyNumber % testMultiplicand == 0) {
                        var testMultiplier = smallUglyNumber / testMultiplicand;
                    } else {
                        var testMultiplier = Math.floor(smallUglyNumber / testMultiplicand) + 1;
                    }
                    var testScore = testMultiplier + (2 * halvingExp);
                    var testTieBreaker = (tensExp < 0) ? (Math.abs(tensExp) + 1) : tensExp;
                    if ((testScore < bestScore) || ((testScore == bestScore) && (testTieBreaker < bestTieBreaker))) {
                        bestScore = testScore;
                        bestTieBreaker = testTieBreaker;
                        handsomeValue = (testMultiplicand * testMultiplier).toFixed(numDec);
                        handsomeNumDec = numDec;
                    }
                }
            }
        }
        this.value = handsomeValue;
        this.score = bestScore;
        this.tieBreaker = bestTieBreaker;
        this.numDec = handsomeNumDec;
    };
    HandsomeNumber.prototype.toString = function() {
        return this.value.toString();
    };
    HandsomeNumber.prototype.valueOf = function() {
        return this.value;
    };

    function styleValue(aSelector, styleKey) {
        var aValue = 0;
        if (document.styleSheets) {
            var sheetIndex = 0;
            var aSheet = document.styleSheets[sheetIndex];
            if (!aSheet.disabled) {
                var allRules;
                if (typeof(aSheet.cssRules) == 'undefined') {
                    if (typeof(aSheet.rules) == 'undefined') {
                        return 0;
                    } else {
                        allRules = aSheet.rules;
                    }
                } else {
                    allRules = aSheet.cssRules;
                }
                for (var ruleIndex = 0; ruleIndex < allRules.length; ++ruleIndex) {
                    var aRule = allRules[ruleIndex];
                    if (aRule.selectorText && (aRule.selectorText.toLowerCase() == aSelector.toLowerCase())) {
                        if (aRule.style[styleKey] != '') {
                            aValue = parseInt(aRule.style[styleKey]);
                        }
                    }
                }
            }
        }
        return aValue ? aValue : 0;
    };
    var measurementProperties = new Object();
    measurementProperties.english = {
        units: ['miles', 'feet', 'inches'],
        abbr: ['mi', 'ft', 'in'],
        inches: [63360, 12, 1]
    };
    measurementProperties.metric = {
        units: [gLocalizer.localize('UNITS_KILOMETERS'), gLocalizer.localize('UNITS_METERS'), gLocalizer.localize('UNITS_CENTIMETERS')],
        abbr: ['km', 'm', 'cm'],
        inches: [39370.07874, 39.370079, 0.393701]
    };
    var comparisonArray = new Array();
    for (var unitIndex = 0; unitIndex < measurementProperties[this.displaySystem].units.length; ++unitIndex) {
        comparisonArray[unitIndex] = new Object();
        var pixelsPerDisplayUnit = this.resolution * measurementProperties[this.displaySystem].inches[unitIndex] / this.scaleDenominator;
        var minSDDisplayLength = (this.minWidth / pixelsPerDisplayUnit) / (this.divisions * this.subdivisions);
        var maxSDDisplayLength = (this.maxWidth / pixelsPerDisplayUnit) / (this.divisions * this.subdivisions);
        for (var valueIndex = 0; valueIndex < (this.divisions * this.subdivisions); ++valueIndex) {
            var minNumber = minSDDisplayLength * (valueIndex + 1);
            var maxNumber = maxSDDisplayLength * (valueIndex + 1);
            var niceNumber = new HandsomeNumber(minNumber, maxNumber);
            comparisonArray[unitIndex][valueIndex] = {
                value: (niceNumber.value / (valueIndex + 1)),
                score: 0,
                tieBreaker: 0,
                numDec: 0,
                displayed: 0
            };
            for (var valueIndex2 = 0; valueIndex2 < (this.divisions * this.subdivisions); ++valueIndex2) {
                displayedValuePosition = niceNumber.value * (valueIndex2 + 1) / (valueIndex + 1);
                niceNumber2 = new HandsomeNumber(displayedValuePosition, displayedValuePosition);
                var isMajorMeasurement = ((valueIndex2 + 1) % this.subdivisions == 0);
                var isLastMeasurement = ((valueIndex2 + 1) == (this.divisions * this.subdivisions));
                if ((this.singleLine && isLastMeasurement) || (!this.singleLine && (isMajorMeasurement || this.showMinorMeasures))) {
                    comparisonArray[unitIndex][valueIndex].score += niceNumber2.score;
                    comparisonArray[unitIndex][valueIndex].tieBreaker += niceNumber2.tieBreaker;
                    comparisonArray[unitIndex][valueIndex].numDec = Math.max(comparisonArray[unitIndex][valueIndex].numDec, niceNumber2.numDec);
                    comparisonArray[unitIndex][valueIndex].displayed += 1;
                } else {
                    comparisonArray[unitIndex][valueIndex].score += niceNumber2.score / this.subdivisions;
                    comparisonArray[unitIndex][valueIndex].tieBreaker += niceNumber2.tieBreaker / this.subdivisions;
                }
            }
            var scoreAdjustment = (unitIndex + 1) * comparisonArray[unitIndex][valueIndex].tieBreaker / comparisonArray[unitIndex][valueIndex].displayed;
            comparisonArray[unitIndex][valueIndex].score *= scoreAdjustment;
        }
    }
    var subdivisionDisplayLength = null;
    var displayUnits = null;
    var displayUnitsAbbr = null;
    var subdivisionPixelLength = null;
    var bestScore = Number.POSITIVE_INFINITY;
    var bestTieBreaker = Number.POSITIVE_INFINITY;
    var numDec = 0;
    for (var unitIndex = 0; unitIndex < comparisonArray.length; ++unitIndex) {
        for (valueIndex in comparisonArray[unitIndex]) {
            if ((comparisonArray[unitIndex][valueIndex].score < bestScore) || ((comparisonArray[unitIndex][valueIndex].score == bestScore) && (comparisonArray[unitIndex][valueIndex].tieBreaker < bestTieBreaker))) {
                bestScore = comparisonArray[unitIndex][valueIndex].score;
                bestTieBreaker = comparisonArray[unitIndex][valueIndex].tieBreaker;
                subdivisionDisplayLength = comparisonArray[unitIndex][valueIndex].value;
                numDec = comparisonArray[unitIndex][valueIndex].numDec;
                displayUnits = measurementProperties[this.displaySystem].units[unitIndex];
                displayUnitsAbbr = measurementProperties[this.displaySystem].abbr[unitIndex];
                pixelsPerDisplayUnit = this.resolution * measurementProperties[this.displaySystem].inches[unitIndex] / this.scaleDenominator;
                subdivisionPixelLength = pixelsPerDisplayUnit * subdivisionDisplayLength;
            }
        }
    }
    var xOffsetMarkerMajor = 0.5;
    var xOffsetMarkerMinor = 0.5;
    var xOffsetBar = 0;
    var xOffsetBarAlt = 0;
    while (this.labelContainer.hasChildNodes()) {
        this.labelContainer.removeChild(this.labelContainer.firstChild);
    }
    while (this.graphicsContainer.hasChildNodes()) {
        this.graphicsContainer.removeChild(this.graphicsContainer.firstChild);
    }
    while (this.numbersContainer.hasChildNodes()) {
        this.numbersContainer.removeChild(this.numbersContainer.firstChild);
    }
    var aMarker, aBarPiece, numbersBox, xOffset;
    var alignmentOffset = {
        left: 0,
        center: (-1 * this.divisions * this.subdivisions * subdivisionPixelLength / 2),
        right: (-1 * this.divisions * this.subdivisions * subdivisionPixelLength)
    };
    var xPosition = 0 + alignmentOffset[this.align];
    var markerMeasure = 0;
    for (var divisionIndex = 0; divisionIndex < this.divisions; ++divisionIndex) {
        xPosition = divisionIndex * this.subdivisions * subdivisionPixelLength;
        xPosition += alignmentOffset[this.align];
        markerMeasure = (divisionIndex == 0) ? 0 : ((divisionIndex * this.subdivisions) * subdivisionDisplayLength).toFixed(numDec);
        aMarker = document.createElement('div');
        aMarker.className = 'sbMarkerMajor';
        aMarker.style.position = 'absolute';
        aMarker.style.overflow = 'hidden';
        aMarker.style.left = Math.round(xPosition - xOffsetMarkerMajor) + 'px';
        aMarker.appendChild(document.createTextNode(' '));
        this.graphicsContainer.appendChild(aMarker);
        if (!this.singleLine) {
            numbersBox = document.createElement('div');
            numbersBox.className = 'sbNumbersBox';
            numbersBox.style.position = 'absolute';
            numbersBox.style.overflow = 'hidden';
            numbersBox.style.textAlign = 'center';
            if (this.showMinorMeasures) {
                numbersBox.style.width = Math.round(subdivisionPixelLength * 2) + 'px';
                numbersBox.style.left = Math.round(xPosition - subdivisionPixelLength) + 'px';
            } else {
                numbersBox.style.width = Math.round(this.subdivisions * subdivisionPixelLength * 2) + 'px';
                numbersBox.style.left = Math.round(xPosition - (this.subdivisions * subdivisionPixelLength)) + 'px';
            }
            numbersBox.appendChild(document.createTextNode(markerMeasure));
            this.numbersContainer.appendChild(numbersBox);
        }
        for (var subdivisionIndex = 0; subdivisionIndex < this.subdivisions; ++subdivisionIndex) {
            aBarPiece = document.createElement('div');
            aBarPiece.style.position = 'absolute';
            aBarPiece.style.overflow = 'hidden';
            aBarPiece.style.width = Math.round(subdivisionPixelLength) + 'px';
            if ((subdivisionIndex % 2) == 0) {
                aBarPiece.className = 'sbBar';
                aBarPiece.style.left = Math.round(xPosition - xOffsetBar) + 'px';
            } else {
                aBarPiece.className = 'sbBarAlt';
                aBarPiece.style.left = Math.round(xPosition - xOffsetBarAlt) + 'px';
            }
            aBarPiece.appendChild(document.createTextNode(' '));
            this.graphicsContainer.appendChild(aBarPiece);
            if (subdivisionIndex < (this.subdivisions - 1)) {
                xPosition = ((divisionIndex * this.subdivisions) + (subdivisionIndex + 1)) * subdivisionPixelLength;
                xPosition += alignmentOffset[this.align];
                markerMeasure = (divisionIndex * this.subdivisions + subdivisionIndex + 1) * subdivisionDisplayLength;
                aMarker = document.createElement('div');
                aMarker.className = 'sbMarkerMinor';
                aMarker.style.position = 'absolute';
                aMarker.style.overflow = 'hidden';
                aMarker.style.left = Math.round(xPosition - xOffsetMarkerMinor) + 'px';
                aMarker.appendChild(document.createTextNode(' '));
                this.graphicsContainer.appendChild(aMarker);
                if (this.showMinorMeasures && !this.singleLine) {
                    numbersBox = document.createElement('div');
                    numbersBox.className = 'sbNumbersBox';
                    numbersBox.style.position = 'absolute';
                    numbersBox.style.overflow = 'hidden';
                    numbersBox.style.textAlign = 'center';
                    numbersBox.style.width = Math.round(subdivisionPixelLength * 2) + 'px';
                    numbersBox.style.left = Math.round(xPosition - subdivisionPixelLength) + 'px';
                    numbersBox.appendChild(document.createTextNode(markerMeasure));
                    this.numbersContainer.appendChild(numbersBox);
                }
            }
        }
    }
    xPosition = (this.divisions * this.subdivisions) * subdivisionPixelLength;
    xPosition += alignmentOffset[this.align];
    markerMeasure = ((this.divisions * this.subdivisions) * subdivisionDisplayLength).toFixed(numDec);
    aMarker = document.createElement('div');
    aMarker.className = 'sbMarkerMajor';
    aMarker.style.position = 'absolute';
    aMarker.style.overflow = 'hidden';
    aMarker.style.left = Math.round(xPosition - xOffsetMarkerMajor) + 'px';
    aMarker.appendChild(document.createTextNode(' '));
    this.graphicsContainer.appendChild(aMarker);
    if (!this.singleLine) {
        numbersBox = document.createElement('div');
        numbersBox.className = 'sbNumbersBox';
        numbersBox.style.position = 'absolute';
        numbersBox.style.overflow = 'hidden';
        numbersBox.style.textAlign = 'center';
        if (this.showMinorMeasures) {
            numbersBox.style.width = Math.round(subdivisionPixelLength * 2) + 'px';
            numbersBox.style.left = Math.round(xPosition - subdivisionPixelLength) + 'px';
        } else {
            numbersBox.style.width = Math.round(this.subdivisions * subdivisionPixelLength * 2) + 'px';
            numbersBox.style.left = Math.round(xPosition - (this.subdivisions * subdivisionPixelLength)) + 'px';
        }
        numbersBox.appendChild(document.createTextNode(markerMeasure + " " + displayUnitsAbbr));
        this.numbersContainer.appendChild(numbersBox);
    }
    var labelBox = document.createElement('div');
    labelBox.style.position = 'absolute';
    var labelText;
    if (this.singleLine) {
        labelText = markerMeasure;
        labelBox.className = 'sbLabelBoxSingleLine';
        labelBox.style.top = '-0.6em';
        labelBox.style.left = (xPosition + 10) + 'px';
    } else {
        labelText = '';
        labelBox.className = 'sbLabelBox';
        labelBox.style.textAlign = 'center';
        labelBox.style.width = Math.round(this.divisions * this.subdivisions * subdivisionPixelLength) + 'px';
        labelBox.style.left = Math.round(alignmentOffset[this.align]) + 'px';
        labelBox.style.overflow = 'hidden';
    }
    if (this.abbreviateLabel) {
        labelText += ' ' + displayUnitsAbbr;
    } else {
        labelText += displayUnits;
    }
    labelBox.appendChild(document.createTextNode(gLocalizer.localize('TOOLTIP_SCALE') + ' 1:' + formatNumber(this.scaleDenominator)));
    this.labelContainer.appendChild(labelBox);
    if (!document.styleSheets) {
        var defaultStyle = document.createElement('style');
        defaultStyle.type = 'text/css';
        var styleText = '.sbBar {top: 0px; background: #666666; height: 1px; border: 0;}';
        styleText += '.sbBarAlt {top: 0px; background: #666666; height: 1px; border: 0;}';
        styleText += '.sbMarkerMajor {height: 7px; width: 1px; background: #666666; border: 0;}';
        styleText += '.sbMarkerMinor {height: 5px; width: 1px; background: #666666; border: 0;}';
        styleText += '.sbLabelBox {top: -16px;}';
        styleText += '.sbNumbersBox {top: 7px;}';
        defaultStyle.appendChild(document.createTextNode(styleText));
        document.getElementsByTagName('head').item(0).appendChild(defaultStyle);
    }
    this.container.appendChild(this.graphicsContainer);
    this.container.appendChild(this.labelContainer);
    this.container.appendChild(this.numbersContainer);
};
ScaleBar.prototype.place = function(elementId) {
    if (elementId == null) {
        document.body.appendChild(this.container);
    } else {
        var anElement = document.getElementById(elementId);
        if (anElement != null) {
            anElement.appendChild(this.container);
        }
    }
};

function kaRubberZoom(oKaMap) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'kaRubberZoom';
    this.cursor = "url('../images/cursors/zoom.cur'),url('gogis/images/cursors/zoom.cur'),default";
    this.domObj = document.createElement('div');
    this.domObj.style.position = 'absolute';
    this.domObj.style.top = '0px';
    this.domObj.style.left = '0px';
    this.domObj.style.width = '1px';
    this.domObj.style.height = '1px';
    this.domObj.style.zIndex = 1100;
    this.domObj.style.visibility = 'hidden';
    this.domObj.style.border = gogisApplication.ZOOMBOX_SIZE[gogisCurrentInstance] + 'px solid ' + gogisApplication.ZOOMBOX_BORDERCOLOR[gogisCurrentInstance];
    this.domObj.style.backgroundColor = gogisApplication.ZOOMBOX_BGCOLOR[gogisCurrentInstance];
    this.domObj.style.opacity = gogisApplication.ZOOMBOX_OPACITY[gogisCurrentInstance] / 100;
    this.domObj.style.mozOpacity = gogisApplication.ZOOMBOX_OPACITY[gogisCurrentInstance] / 100;
    this.domObj.style.filter = 'Alpha(opacity=' + gogisApplication.ZOOMBOX_OPACITY[gogisCurrentInstance] + ')';
    this.kaMap.theInsideLayer.appendChild(this.domObj);
    this.startx = null;
    this.starty = null;
    this.endx = null;
    this.endy = null;
    this.bMouseDown = false;
    this.button = -1;
    for (var p in kaTool.prototype) {
        if (!kaRubberZoom.prototype[p]) kaRubberZoom.prototype[p] = kaTool.prototype[p];
    }
    this.multitouchHandler = kaMultitouchHandler;
};
kaRubberZoom.prototype.drawZoomBox = function() {
    if (this.startx == null || this.starty == null || this.endx == null || this.endy == null) {
        this.domObj.style.visibility = 'hidden';
        this.domObj.style.top = '0px';
        this.domObj.style.left = '0px';
        this.domObj.style.width = '1px';
        this.domObj.style.height = '1px';
        return;
    }
    this.domObj.style.visibility = 'visible';
    if (this.endx < this.startx) {
        this.domObj.style.left = (this.endx - this.kaMap.xOrigin) + 'px';
        this.domObj.style.width = (this.startx - this.endx) + "px";
    } else {
        this.domObj.style.left = (this.startx - this.kaMap.xOrigin) + 'px';
        this.domObj.style.width = (this.endx - this.startx) + "px";
    }
    if (this.endy < this.starty) {
        this.domObj.style.top = (this.endy - this.kaMap.yOrigin) + 'px';
        this.domObj.style.height = (this.starty - this.endy) + "px";
    } else {
        this.domObj.style.top = (this.starty - this.kaMap.yOrigin) + 'px';
        this.domObj.style.height = (this.endy - this.starty) + "px";
    }
};
kaRubberZoom.prototype.ontouchstart = kaMultitouchHandler.touchstart;
kaRubberZoom.prototype.ontouchmove = kaMultitouchHandler.touchmove;
kaRubberZoom.prototype.ontouchend = kaMultitouchHandler.touchend;
kaRubberZoom.prototype.ontouchcancel = kaMultitouchHandler.touchcancel;
kaRubberZoom.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {
        var aPixPos = myKaRubberZoom.adjustPixPosition(obj.clientX, obj.clientY);
        myKaRubberZoom.startx = myKaRubberZoom.endx = -aPixPos[0];
        myKaRubberZoom.starty = myKaRubberZoom.endy = -aPixPos[1];
        myKaRubberZoom.drawZoomBox();
    } else if (cmd == 'move') {
        var aPixPos = myKaRubberZoom.adjustPixPosition(obj.clientX, obj.clientY);
        myKaRubberZoom.endx = -aPixPos[0];
        myKaRubberZoom.endy = -aPixPos[1];
        myKaRubberZoom.drawZoomBox();
    } else if (cmd == 'moving_done') {
        var type = KAMAP_POINT_QUERY;
        var start = myKaRubberZoom.kaMap.pixToGeo(-myKaRubberZoom.startx, -myKaRubberZoom.starty);
        var coords = start;
        if (myKaRubberZoom.startx != myKaRubberZoom.endx && myKaRubberZoom.starty != myKaRubberZoom.endy) {
            type = KAMAP_RECT_QUERY;
            coords = start.concat(myKaRubberZoom.kaMap.pixToGeo(-myKaRubberZoom.endx, -myKaRubberZoom.endy));
            if (coords[2] < coords[0]) {
                var minx = coords[2];
                var maxx = coords[0];
                coords[0] = minx;
                coords[2] = maxx;
            }
            if (coords[1] < coords[3]) {
                var miny = coords[1];
                var maxy = coords[3];
                coords[3] = miny;
                coords[1] = maxy;
            }
        }
        myKaRubberZoom.startx = myKaRubberZoom.endx = myKaRubberZoom.starty = myKaRubberZoom.endy = null;
        myKaRubberZoom.drawZoomBox();
        if (coords[2] && coords[0] && coords[3] && coords[1]) {
            if (gDblClickTimer) {
                window.clearTimeout(gDblClickTimer);
                gDblClickTimer = null;
            }
            myKaRubberZoom.kaMap.zoomToExtents(coords[0], coords[1], coords[2], coords[3]);
        }
    } else if (cmd == 'done') {
        try {
            var a = myKaRubberZoom.adjustPixPosition(obj.clientX, obj.clientY);
            var p = myKaRubberZoom.kaMap.pixToGeo(a[0], a[1]);
            if (!gDblClickTimer) {
                gDblClickTimer = window.setTimeout(bind(myKaRubberZoom.dispatchMapClicked, myKaRubberZoom, p), 500);
            } else {
                myHotspot.mouseclickedcancled = true;
                window.clearTimeout(gDblClickTimer);
                gDblClickTimer = null;
                myKaRubberZoom.dispatchMapDblClicked(p[0], p[1], true);
            }
            myKaRubberZoom.startx = myKaRubberZoom.endx = myKaRubberZoom.starty = myKaRubberZoom.endy = null;
            myKaRubberZoom.drawZoomBox();
            myKaRubberZoom.kaMap.triggerEvent(KAMAP_MOUSE_TRACKER, {
                x: p[0],
                y: p[1]
            });
        } catch (e) {
            document.getElementById("geoviewerHeaderCurrentTheme").innerHTML = e;
        }
    }
};
kaRubberZoom.prototype.onmouseout = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (!e.target) e.target = e.srcElement;
    if (e.target.id == this.kaMap.domObj.id) {
        this.bMouseDown = false;
        this.startx = this.endx = this.starty = this.endy = null;
        this.drawZoomBox();
        return kaTool.prototype.onmouseout.apply(this, [e]);
    }
};
kaRubberZoom.prototype.onmousemove = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (!this.bMouseDown) {
        return false;
    }
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var aPixPos = this.adjustPixPosition(x, y);
    this.endx = -aPixPos[0];
    this.endy = -aPixPos[1];
    this.drawZoomBox();
    return false;
};
kaRubberZoom.prototype.onmousedown = function(e) {
    e = (e) ? e : ((event) ? event : null);
    this.button = e.button;
    if (this.kaMap.isIE4) document.onkeydown = kaTool_redirect_onkeypress;
    document.onkeypress = kaTool_redirect_onkeypress;
    this.bMouseDown = true;
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var aPixPos = this.adjustPixPosition(x, y);
    this.startx = this.endx = -aPixPos[0];
    this.starty = this.endy = -aPixPos[1];
    this.drawZoomBox();
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    return false;
};
kaRubberZoom.prototype.onmouseup = function(e) {
    e = (e) ? e : ((event) ? event : null);
    var type = KAMAP_POINT_QUERY;
    var start = this.kaMap.pixToGeo(-this.startx, -this.starty);
    var coords = start;
    if (this.startx != this.endx && this.starty != this.endy) {
        type = KAMAP_RECT_QUERY;
        coords = start.concat(this.kaMap.pixToGeo(-this.endx, -this.endy));
        if (coords[2] < coords[0]) {
            var minx = coords[2];
            var maxx = coords[0];
            coords[0] = minx;
            coords[2] = maxx;
        }
        if (coords[1] < coords[3]) {
            var miny = coords[1];
            var maxy = coords[3];
            coords[3] = miny;
            coords[1] = maxy;
        }
    }
    this.startx = this.endx = this.starty = this.endy = null;
    this.drawZoomBox();
    if (coords[2] && coords[0] && coords[3] && coords[1]) {
        if (gDblClickTimer) {
            window.clearTimeout(gDblClickTimer);
            gDblClickTimer = null;
        }
        this.kaMap.zoomToExtents(coords[0], coords[1], coords[2], coords[3]);
    } else if (coords[0] && coords[1]) {
        if (!gDblClickTimer) {
            gDblClickTimer = window.setTimeout(bind(this.dispatchMapClicked, this, coords), 500);
        } else {
            myHotspot.mouseclickedcancled = true;
            window.clearTimeout(gDblClickTimer);
            gDblClickTimer = null;
            this.dispatchMapDblClicked(coords[0], coords[1]);
        }
    }
    return false;
};
kaRubberZoom.prototype.dispatchMapClicked = function(coords) {
    gDblClickTimer = null;
    if (this.button == 2) return;
    this.kaMap.triggerEvent(KAMAP_MAP_CLICKED, coords);
};
kaRubberZoom.prototype.dispatchMapDblClicked = function(px, py) {
    var newscale = this.kaMap.getCurrentMap().currentScale;
    if (this.button != 2 && !arguments[2]) {
        if (newscale < this.kaMap.getCurrentMap().aScales.length - 1) newscale++;
    } else {
        if (newscale > 0) newscale--;
    }
    newscale = this.kaMap.getCurrentMap().aScales[newscale];
    this.kaMap.zoomTo(px, py, newscale);
};
var KAMAP_QUERY = gnLastEventId++;
var KAMAP_POINT_QUERY = 0;
var KAMAP_RECT_QUERY = 1;

function kaQuery(oKaMap, type) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'kaQuery';
    this.cursor = "url('../images/cursors/info.cur'),url('gogis/images/cursors/info.cur'),help";
    this.domObj = document.createElement('div');
    this.domObj.style.position = 'absolute';
    this.domObj.style.top = '0px';
    this.domObj.style.left = '0px';
    this.domObj.style.width = '1px';
    this.domObj.style.height = '1px';
    this.domObj.style.zIndex = 1100;
    this.domObj.style.visibility = 'hidden';
    this.domObj.style.border = gogisApplication.ZOOMBOX_SIZE[gogisCurrentInstance] + 'px solid ' + gogisApplication.ZOOMBOX_BORDERCOLOR[gogisCurrentInstance];
    this.domObj.style.backgroundColor = gogisApplication.ZOOMBOX_BGCOLOR[gogisCurrentInstance];
    this.domObj.style.opacity = gogisApplication.ZOOMBOX_OPACITY[gogisCurrentInstance] / 100;
    this.domObj.style.mozOpacity = gogisApplication.ZOOMBOX_OPACITY[gogisCurrentInstance] / 100;
    this.domObj.style.filter = 'Alpha(opacity=' + gogisApplication.ZOOMBOX_OPACITY[gogisCurrentInstance] + ')';
    this.kaMap.theInsideLayer.appendChild(this.domObj);
    this.startx = null;
    this.starty = null;
    this.endx = null;
    this.endy = null;
    this.bMouseDown = false;
    this.type = type;
    this.queryOnly = false;
    for (var p in kaTool.prototype) {
        if (!kaQuery.prototype[p]) kaQuery.prototype[p] = kaTool.prototype[p];
    }
    this.multitouchHandler = kaMultitouchHandler;
};
kaQuery.prototype.activate = function() {
    this.kaMap.activateTool(this);
    document.kaCurrentTool = this;
    this.queryOnly = (arguments[0] ? true : false);
};
kaQuery.prototype.deactivate = function() {
    this.kaMap.deactivateTool(this);
    document.kaCurrentTool = null;
    this.queryOnly = false;
};
kaQuery.prototype.drawZoomBox = function() {
    if (this.startx == null || this.starty == null || this.endx == null || this.endy == null) {
        this.domObj.style.visibility = 'hidden';
        this.domObj.style.top = '0px';
        this.domObj.style.left = '0px';
        this.domObj.style.width = '1px';
        this.domObj.style.height = '1px';
        return;
    }
    this.domObj.style.visibility = 'visible';
    if (this.endx < this.startx) {
        this.domObj.style.left = (this.endx - this.kaMap.xOrigin) + 'px';
        this.domObj.style.width = (this.startx - this.endx) + "px";
    } else {
        this.domObj.style.left = (this.startx - this.kaMap.xOrigin) + 'px';
        this.domObj.style.width = (this.endx - this.startx) + "px";
    }
    if (this.endy < this.starty) {
        this.domObj.style.top = (this.endy - this.kaMap.yOrigin) + 'px';
        this.domObj.style.height = (this.starty - this.endy) + "px";
    } else {
        this.domObj.style.top = (this.starty - this.kaMap.yOrigin) + 'px';
        this.domObj.style.height = (this.endy - this.starty) + "px";
    }
};
kaQuery.prototype.ontouchstart = kaMultitouchHandler.touchstart;
kaQuery.prototype.ontouchmove = kaMultitouchHandler.touchmove;
kaQuery.prototype.ontouchend = kaMultitouchHandler.touchend;
kaQuery.prototype.ontouchcancel = kaMultitouchHandler.touchcancel;
kaQuery.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {
        isKaTouch = true;
        var aPixPos = myKaQuery.adjustPixPosition(obj.clientX, obj.clientY);
        myKaQuery.startx = myKaQuery.endx = -aPixPos[0];
        myKaQuery.starty = myKaQuery.endy = -aPixPos[1];
        myKaQuery.drawZoomBox();
    } else if (cmd == 'move') {
        var aPixPos = myKaQuery.adjustPixPosition(obj.clientX, obj.clientY);
        myKaQuery.endx = -aPixPos[0];
        myKaQuery.endy = -aPixPos[1];
        myKaQuery.drawZoomBox();
    } else if (cmd == 'moving_done') {
        type = KAMAP_RECT_QUERY;
        var start = myKaQuery.kaMap.pixToGeo(-myKaQuery.startx, -myKaQuery.starty);
        var coords = start.concat(myKaQuery.kaMap.pixToGeo(-myKaQuery.endx, -myKaQuery.endy));
        if (coords[2] < coords[0]) {
            var minx = coords[2];
            var maxx = coords[0];
            coords[0] = minx;
            coords[2] = maxx;
        }
        if (coords[1] < coords[3]) {
            var miny = coords[1];
            var maxy = coords[3];
            coords[3] = miny;
            coords[1] = maxy;
        }
        myKaQuery.startx = myKaQuery.endx = myKaQuery.starty = myKaQuery.endy = null;
        myKaQuery.drawZoomBox();
        myKaQuery.kaMap.triggerEvent(KAMAP_QUERY, type, coords);
    } else if (cmd == 'done') {
        var type = KAMAP_POINT_QUERY;
        var coords = myKaQuery.kaMap.pixToGeo(-myKaQuery.startx, -myKaQuery.starty);
        myKaQuery.startx = myKaQuery.endx = myKaQuery.starty = myKaQuery.endy = null;
        myKaQuery.drawZoomBox();
        myKaQuery.kaMap.triggerEvent(KAMAP_QUERY, type, coords);
    }
};
kaQuery.prototype.onmouseout = function(e) {
    if (isKaTouch) return;
    e = (e) ? e : ((event) ? event : null);
    if (!e.target) e.target = e.srcElement;
    if (e.target.id == this.kaMap.domObj.id) {
        this.bMouseDown = false;
        this.startx = this.endx = this.starty = this.endy = null;
        this.drawZoomBox();
        return kaTool.prototype.onmouseout.apply(this, [e]);
    }
};
kaQuery.prototype.onmousemove = function(e) {
    if (isKaTouch) return;
    if (this.queryOnly) return this.cancelEvent(e);
    e = (e) ? e : ((event) ? event : null);
    if (!this.bMouseDown) {
        return false;
    }
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    if (this.type == KAMAP_RECT_QUERY) {
        var aPixPos = this.adjustPixPosition(x, y);
        this.endx = -aPixPos[0];
        this.endy = -aPixPos[1];
        this.drawZoomBox();
    }
    return false;
};
kaQuery.prototype.onmousedown = function(e) {
    if (isKaTouch) return;
    e = (e) ? e : ((event) ? event : null);
    if (e.button == 2) {
        return this.cancelEvent(e);
    } else {
        if (this.kaMap.isIE4) document.onkeydown = kaTool_redirect_onkeypress;
        document.onkeypress = kaTool_redirect_onkeypress;
        this.bMouseDown = true;
        var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        if (this.queryOnly) {
            this.startx = x;
            this.starty = y;
            this.lastx = this.startx;
            this.lasty = this.starty;
            return this.cancelEvent(e);
        }
        var aPixPos = this.adjustPixPosition(x, y);
        this.startx = this.endx = -aPixPos[0];
        this.starty = this.endy = -aPixPos[1];
        this.drawZoomBox();
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        return false;
    }
};
kaQuery.prototype.onmouseup = function(e) {
    if (isKaTouch) return;
    if (this.queryOnly) return this.cancelEvent(e);
    e = (e) ? e : ((event) ? event : null);
    var type = KAMAP_POINT_QUERY;
    var start = this.kaMap.pixToGeo(-this.startx, -this.starty);
    var coords = start;
    if (this.startx != this.endx && this.starty != this.endy) {
        type = KAMAP_RECT_QUERY;
        coords = start.concat(this.kaMap.pixToGeo(-this.endx, -this.endy));
        if (coords[2] < coords[0]) {
            var minx = coords[2];
            var maxx = coords[0];
            coords[0] = minx;
            coords[2] = maxx;
        }
        if (coords[1] < coords[3]) {
            var miny = coords[1];
            var maxy = coords[3];
            coords[3] = miny;
            coords[1] = maxy;
        }
    }
    this.kaMap.triggerEvent(KAMAP_QUERY, type, coords);
    this.startx = this.endx = this.starty = this.endy = null;
    this.drawZoomBox();
    return false;
};
var KAMAP_MOUSE_TRACKER = gnLastEventId++;

function kaMouseTracker(oKaMap) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'kaMouseTracker';
    this.bInfoTool = true;
    for (var p in kaTool.prototype) {
        if (!kaMouseTracker.prototype[p]) kaMouseTracker.prototype[p] = kaTool.prototype[p];
    }
};
kaMouseTracker.prototype.onmousemove = function(e) {
    e = (e) ? e : ((event) ? event : null);
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var a = this.adjustPixPosition(x, y);
    var p = this.kaMap.pixToGeo(a[0], a[1]);
    this.kaMap.triggerEvent(KAMAP_MOUSE_TRACKER, {
        x: p[0],
        y: p[1]
    });
    return false;
};
var kaZoomerMultitouchHandler = new GogisMultitouchHandler();

function kaZoomer(oKaMap) {
    this.kaMap = oKaMap;
    this.domObj = oKaMap.domObj;
    this.nZoomImageHeight = 17;
    this.opacity = 70;
    var vpToolbar = getRawObject("viewportToolbar");
    this.top = (vpToolbar && getObjectHeight(vpToolbar) > 0 ? parseInt(getObjectHeight(vpToolbar)) + 3 : 3);
    this.left = 3;
    this.right = null;
    this.bottom = null;
    this.zoomControlObj = null;
    this.lastDragScale = null;
    this.draw = kaZoomer_draw;
    this.update = kaZoomer_update;
    this.kaMap.registerForEvent(KAMAP_MAP_INITIALIZED, this, this.draw);
    this.multitouchHandler = kaZoomerMultitouchHandler;
}
kaZoomer.prototype.ontouchstart = kaZoomerMultitouchHandler.touchstart;
kaZoomer.prototype.ontouchmove = kaZoomerMultitouchHandler.touchmove;
kaZoomer.prototype.ontouchend = kaZoomerMultitouchHandler.touchend;
kaZoomer.prototype.ontouchcancel = kaZoomerMultitouchHandler.touchcancel;
kaZoomer.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {} else if (cmd == 'move') {
        var oKaMap = dd.elements.zoomTrack.div.kaZoomer.kaMap;
        var oMap = oKaMap.getCurrentMap();
        var nScales = oMap.getScales().length;
        var nTrackTop = dd.elements.zoomTrack.y;
        var nThumbHeight = dd.elements.zoomTrack.div.elementHeight;
        var nTrackHeight = myKaZoomer.nZoomImageHeight * nScales;
        var nPos = obj.clientY - nTrackTop;
        if (nPos < 0) nPos = 0;
        else if (nPos > nTrackHeight - nThumbHeight) nPos = nTrackHeight - nThumbHeight;
        myKaZoomer.startY = myKaZoomer.endY = 0;
        dd.elements.zoomThumb.moveTo(dd.elements.zoomThumb.x, nTrackTop + nPos);
        kaZoomer_DragFunc();
    } else if (cmd == 'moving_done') {
        kaZoomer_DropFunc();
    }
};

function kaZoomer_setPosition(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    if (this.zoomControlObj != null) {
        if (this.left != null) {
            oZoomControl.style.left = this.left + 'px';
        } else if (this.right != null) {
            oZoomControl.style.right = this.right + 'px';
        }
        if (this.top != null) {
            oZoomControl.style.top = this.top + 'px';
        } else if (this.bottom != null) {
            oZoomControl.style.bottom = this.bottom + 'px';
        }
    }
}

function kaZoomer_update() {
    var nThumbHeight = dd.elements.zoomTrack.div.elementHeight;
    var nTrackTop = dd.elements.zoomTrack.y;
    var oKaMap = dd.elements.zoomTrack.div.kaZoomer.kaMap;
    var oMap = oKaMap.getCurrentMap();
    var nCurrentScale = parseInt(oMap.currentScale) + 1;
    var nScales = oMap.getScales().length;
    var nTrackHeight = this.nZoomImageHeight * nScales;
    var nPos = (nScales - nCurrentScale) * nThumbHeight;
    dd.elements.zoomThumb.moveTo(dd.elements.zoomThumb.x, nTrackTop + nPos);
    document.getElementById("zoomThumb").title = gLocalizer.localize('TOOLTIP_SCALE') + ' 1:' + formatNumber(oKaMap.getCurrentScale());
    this.lastDragScale = oKaMap.getCurrentScale();
}

function kaZoomer_draw() {
    var oMap = this.kaMap.getCurrentMap();
    this.lastDragScale = this.kaMap.getCurrentScale();
    var nScales = oMap.getScales().length;
    var nCurrentScale = oMap.currentScale;
    var nTrackHeight = this.nZoomImageHeight * nScales;
    var nTrackMaxPosition = this.nZoomImageHeight * (nScales - 1);
    var nInitialPosition = dd.Int(this.nZoomImageHeight * (nScales - nCurrentScale - 1));
    if (!this.zoomControlObj) {
        var szThumbImg = 'kamap/images/slider_button.png';
        var szTrackTopImg = 'kamap/images/slider_tray_top.png';
        var szTrackBottomImg = 'kamap/images/slider_tray_bottom.png';
        this.zoomControlObj = document.createElement('div');
        this.zoomControlObj.id = 'zoomControl';
        this.zoomControlObj.style.position = 'absolute';
        if (this.left != null) {
            if (this.left == '') {
                this.zoomControlObj.style.left = '';
            } else {
                this.zoomControlObj.style.left = this.left + 'px';
            }
        } else if (this.right != null) {
            if (this.right == '') {
                this.zoomControlObj.style.right = '';
            } else {
                this.zoomControlObj.style.right = this.right + 'px';
            }
        }
        if (this.top != null) {
            if (this.top == '') {
                this.zoomControlObj.style.top = '';
            } else {
                this.zoomControlObj.style.top = this.top + 'px';
            }
        } else if (this.bottom != null) {
            if (this.bottom == '') {
                this.zoomControlObj.style.bottom = '';
            } else {
                this.zoomControlObj.style.bottom = this.bottom + 'px';
            }
        }
        this.zoomControlObj.style.width = 17 + "px";
        this.zoomControlObj.style.opacity = this.opacity / 100;
        this.zoomControlObj.style.mozOpacity = this.opacity / 100;
        this.zoomControlObj.style.filter = "Alpha(opacity=" + this.opacity + ")";
        this.zoomControlObj.style.cursor = 'auto';
        this.zoomControlObj.style.zIndex = 300;
        this.zoomControlObj.onmouseover = kaZoomer_onmouseover;
        this.zoomControlObj.onmouseout = kaZoomer_onmouseout;
        this.zoomControlObj.kaZoomer = this;
        this.kaMap.domObj.appendChild(this.zoomControlObj);
        this.oZoomTrack = document.createElement('div');
        this.oZoomTrack.id = 'zoomTrack';
        this.oZoomTrack.kaZoomer = this;
        this.oZoomTrack.style.position = 'absolute';
        this.oZoomTrack.style.left = '0px';
        this.oZoomTrack.style.top = '20px';
        this.oZoomTrack.style.width = '17px';
        this.oZoomTrack.style.backgroundColor = "#acacac";
        this.oZoomTrack.style.backgroundImage = "url(kamap/images/slider_tray_fill.png)";
        this.oZoomTrack.onclick = kaZoomer_zoomTo;
        this.zoomControlObj.appendChild(this.oZoomTrack);
        var oZoomThumb = document.createElement('div');
        oZoomThumb.id = 'zoomThumb';
        oZoomThumb.style.position = 'absolute';
        oZoomThumb.style.height = '17px';
        oZoomThumb.style.width = '17px';
        oZoomThumb.style.backgroundColor = "#888888";
        oZoomThumb.innerHTML = '<img src="' + szThumbImg + '" border="0" width="17" height="17">';
        oZoomThumb.title = gLocalizer.localize('TOOLTIP_SCALE') + ' 1:' + formatNumber(this.kaMap.getCurrentScale());
        this.zoomControlObj.appendChild(oZoomThumb);
        var oZoomTrackTop = document.createElement('div');
        oZoomTrackTop.id = 'zoomTrackTop';
        oZoomTrackTop.style.position = 'absolute';
        oZoomTrackTop.style.left = '0px';
        oZoomTrackTop.style.top = '17px';
        oZoomTrackTop.style.width = '17px';
        oZoomTrackTop.style.height = '3px';
        oZoomTrackTop.innerHTML = '<img src="' + szTrackTopImg + '" border="0" width="17" height="3">';
        this.zoomControlObj.appendChild(oZoomTrackTop);
        this.oZoomTrackBottom = document.createElement('div');
        this.oZoomTrackBottom.id = 'zoomTrackBottom';
        this.oZoomTrackBottom.style.position = 'absolute';
        this.oZoomTrackBottom.style.left = '0px';
        this.oZoomTrackBottom.style.width = '17px';
        this.oZoomTrackBottom.style.height = '3px';
        this.oZoomTrackBottom.innerHTML = '<img src="' + szTrackBottomImg + '" border="0" width="17" height="3">';
        this.zoomControlObj.appendChild(this.oZoomTrackBottom);
        var oZoomIn = document.createElement('div');
        oZoomIn.id = 'zoomIn';
        oZoomIn.style.position = 'absolute';
        oZoomIn.style.top = '0px';
        oZoomIn.style.left = '0px';
        oZoomIn.style.width = '17px';
        oZoomIn.style.height = '17px';
        oZoomIn.kaZoomer = this;
        oZoomIn.onclick = kaZoomer_zoomIn;
        oZoomIn.innerHTML = "<img src='kamap/images/slider_button_zoomin.png' border='0' width='17' height='17' title='" + gLocalizer.localize("TOOLTIP_ZOOM_IN") + "'>";
        this.zoomControlObj.appendChild(oZoomIn);
        this.oZoomOut = document.createElement('div');
        this.oZoomOut.id = 'zoomOut';
        this.oZoomOut.style.position = 'absolute';
        this.oZoomOut.style.left = '0px';
        this.oZoomOut.style.width = '17px';
        this.oZoomOut.style.height = '17px';
        this.oZoomOut.kaZoomer = this;
        this.oZoomOut.onclick = kaZoomer_zoomOut;
        this.oZoomOut.innerHTML = "<img src='kamap/images/slider_button_zoomout.png' border='0' width='17' height='17' title='" + gLocalizer.localize("TOOLTIP_ZOOM_OUT") + "'>";
        this.zoomControlObj.appendChild(this.oZoomOut);
        ADD_DHTML('zoomThumb' + MAXOFFTOP + 0 + MAXOFFBOTTOM + nTrackMaxPosition + VERTICAL);
        ADD_DHTML('zoomTrack' + NO_DRAG);
        dd.elements.zoomThumb.moveTo(dd.elements.zoomTrack.x, dd.elements.zoomTrack.y + nInitialPosition);
        dd.elements.zoomThumb.setZ(dd.elements.zoomTrack.z + 1);
        dd.elements.zoomTrack.addChild('zoomThumb');
        dd.elements.zoomThumb.defx = dd.elements.zoomTrack.x;
        dd.elements.zoomThumb.defy = dd.elements.zoomTrack.y;
        dd.elements.zoomThumb.my_DropFunc = kaZoomer_DropFunc;
        dd.elements.zoomThumb.my_DragFunc = kaZoomer_DragFunc;
        this.kaMap.registerForEvent(KAMAP_SCALE_CHANGED, this, this.update);
        oZoomThumb.ontouchstart = kaZoomerMultitouchHandler.touchstart;
        oZoomThumb.ontouchmove = kaZoomerMultitouchHandler.touchmove;
        oZoomThumb.ontouchend = kaZoomerMultitouchHandler.touchend;
        oZoomThumb.ontouchcancel = kaZoomerMultitouchHandler.touchcancel;
        oZoomThumb.multitouchHandler = kaZoomerMultitouchHandler;
        kaZoomerMultitouchHandler.callback = this.callback;
    } else {
        dd.elements.zoomThumb.maxoffb = nTrackMaxPosition;
    }
    this.zoomControlObj.style.height = (nTrackHeight + 2 * this.nZoomImageHeight + 6) + "px";
    this.oZoomTrack.style.height = parseInt(nTrackHeight) + 'px';
    this.oZoomTrack.elementHeight = this.nZoomImageHeight;
    this.oZoomTrackBottom.style.top = 20 + nTrackHeight + 'px';
    this.oZoomOut.style.top = 23 + nTrackHeight + 'px';
}

function kaZoomer_DropFunc() {
    var nTrackTop = dd.elements.zoomTrack.y;
    var nThumbTop = dd.elements.zoomThumb.y - nTrackTop;
    var nThumbHeight = dd.elements.zoomTrack.div.elementHeight;
    var nNearestIndex = Math.round(nThumbTop / nThumbHeight);
    dd.elements.zoomThumb.moveTo(dd.elements.zoomThumb.x, nTrackTop + (nNearestIndex * nThumbHeight));
    var oKaMap = dd.elements.zoomTrack.div.kaZoomer.kaMap;
    var oMap = oKaMap.getCurrentMap();
    var newScale = oMap.getScales()[oMap.aScales.length - nNearestIndex - 1];
    if (oKaMap.getCurrentScale() != newScale) {
        if (oKaMap.theZoomLayer) {
            oKaMap.setZoomLayer(oKaMap.getCurrentScale() / newScale, 0, 0, false);
            oKaMap.theZoomLayer.suspended = true;
        }
        oKaMap.zoomToScale(newScale);
    } else if (oKaMap.theZoomLayer) oKaMap.resetZoomLayer();
}

function kaZoomer_DragFunc() {
    if (kaZoomer.isRunning != null) {
        clearTimeout(kaZoomer.isRunning);
    }
    var buffer = 20;
    if (gogisApplication.ZOOM_ANIMATION_INTERVALL && gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance]) buffer = gogisApplication.ZOOM_ANIMATION_INTERVALL[gogisCurrentInstance];
    kaZoomer.isRunning = setTimeout("_kaZoomer_DragFunc();", buffer);
}

function _kaZoomer_DragFunc() {
    kaZoomer.isRunning = null;
    var nTrackTop = dd.elements.zoomTrack.y;
    var nThumbTop = dd.elements.zoomThumb.y - nTrackTop;
    var nThumbHeight = dd.elements.zoomTrack.div.elementHeight;
    var nNearestIndex = Math.round(nThumbTop / nThumbHeight);
    var oKaMap = dd.elements.zoomTrack.div.kaZoomer.kaMap;
    var oMap = oKaMap.getCurrentMap();
    var upperIndex = Math.ceil(nThumbTop / nThumbHeight);
    var lowerIndex = Math.floor(nThumbTop / nThumbHeight);
    var upperScale = parseInt(oMap.getScales()[oMap.aScales.length - upperIndex - 1]);
    var lowerScale = parseInt(oMap.getScales()[oMap.aScales.length - lowerIndex - 1]);
    var step = 1000;
    if (gogisApplication.ZOOM_ANIMATION_STEP && gogisApplication.ZOOM_ANIMATION_STEP[gogisCurrentInstance]) step = gogisApplication.ZOOM_ANIMATION_STEP[gogisCurrentInstance];
    var newScale = Math.round((lowerScale + (upperScale - lowerScale) * ((nThumbTop / nThumbHeight) - lowerIndex)) / step) * step;
    var newScaleRounded = parseInt(oMap.getScales()[oMap.aScales.length - nNearestIndex - 1]);
    if (Math.abs(dd.elements.zoomTrack.div.kaZoomer.lastDragScale - newScale) >= step) {
        dd.elements.zoomTrack.div.kaZoomer.lastDragScale = newScale;
        document.getElementById("zoomThumb").title = gLocalizer.localize('TOOLTIP_SCALE') + ' 1:' + formatNumber(newScaleRounded);
        oKaMap.setZoomLayer(oKaMap.getCurrentScale() / newScale, 0, 0, false);
    }
}

function kaZoomer_zoomTo(e) {
    if (GogisQueueManager.inProgress() || this.kaZoomer.kaMap.triggerTimeout != null) return false;
    e = (e) ? e : ((event) ? event : null);
    var nClickTop = (e.layerY) ? e.layerY : e.offsetY;
    var oKaZoomer = dd.elements.zoomTrack.div.kaZoomer;
    var oKaMap = oKaZoomer.kaMap;
    var oMap = oKaMap.getCurrentMap();
    var nScales = oMap.getScales().length;
    var nTrackHeight = dd.Int(oKaZoomer.nZoomImageHeight) * nScales;
    var nNearestIndex = Math.floor(nClickTop / nTrackHeight * nScales);
    var nNewScale = oMap.getScales()[oMap.aScales.length - nNearestIndex - 1];
    oKaMap.zoomToScale(nNewScale);
}

function kaZoomer_onmouseover(e) {
    this.style.opacity = 1;
    this.style.mozOpacity = 1;
    this.style.filter = "Alpha(opacity=100)";
}

function kaZoomer_onmouseout(e) {
    this.style.opacity = this.kaZoomer.opacity / 100;
    this.style.mozOpacity = this.kaZoomer.opacity / 100;
    this.style.filter = "Alpha(opacity=" + this.kaZoomer.opacity + ")";
}

function kaZoomer_zoomIn() {
    if (GogisQueueManager.inProgress() || this.kaZoomer.kaMap.triggerTimeout != null) return false;
    this.kaZoomer.kaMap.zoomIn();
}

function kaZoomer_zoomOut() {
    if (GogisQueueManager.inProgress() || this.kaZoomer.kaMap.triggerTimeout != null) return false;
    this.kaZoomer.kaMap.zoomOut();
}

function kaZoomer_alert() {
    alert('here');
}
kaZoomer.isRunning = null;

function gogisGeoObjects(application) {
    this.application = application;
    this.instanceId = gogisGeoObjects.getInstanceId();
    this.zIndex = ((arguments.length > 1 && !isNaN(arguments[1])) ? arguments[1] : 5000);
    this.singleGraphics = ((arguments.length > 2 && arguments[2]) ? arguments[2] : false);
    this.geometries = null;
    gogisGeoObjects.managers.push(this);
    this.singleGraphicsObserver = new GogisQueueManager("gogisGeoObjects.getInstance(" + this.instanceId + ").singleGraphicsObserver", gogisApplication.UPDATEOVERLAY_GRAPHICS_DELAYTIME);
    this.drawingCanvas = this.application.createDrawingCanvas(this.zIndex);
    this.drawingCanvas.style.position = 'absolute';
    this.drawingCanvas.style.width = '1px';
    this.drawingCanvas.style.height = '1px';
    this.requestObj = new GogisRequestObject();
    this.requestObj.action = this.handleLoadGeometriesResponse;
    this.loadGeometries = function(strGeometryIds) {
        if (!(strGeometryIds > "")) {
            return false;
        }
        var url = "gogis/php/getCustomObjects.php?coids=";
        url += strGeometryIds;
        url += "&instance=" + gogisCurrentInstance;
        this.requestObj.sendRequest(url);
        return true;
    };
    this.addGeometry = function(geometry) {
        if (geometry != null) {
            this.geometries.push(geometry);
            if (!this.singleGraphics) {
                this.drawGeometry(geometry);
                updateLinkToView();
            }
        }
    };
    this.getGeometry = function(id) {
        var i;
        for (i = 0; i < this.geometries.length; i++) {
            if (this.geometries[i].id == id) {
                return this.geometries[i];
            }
        }
        return null;
    };
    this.getGeometryIds = function() {
        var i, ids;
        ids = "";
        for (i = 0; i < this.geometries.length; i++) {
            if (this.geometries[i].persistence == gogisGeoObjects.PERSISTENCE_DB) {
                if (ids.length > 0) ids += ",";
                ids += this.geometries[i].id;
            }
        }
        return ids;
    };
    this.getSerializedTmpGeometries = function() {
        var tmp = new Array();
        var ser_obj = "";
        var obj;
        for (var i = 0; i < this.geometries.length; i++) {
            if (this.geometries[i].persistence == gogisGeoObjects.PERSISTENCE_TMP) {
                obj = new Object();
                obj.id = this.geometries[i].id;
                obj.type = this.geometries[i].type;
                if (this.geometries[i].color) obj.color = this.geometries[i].color;
                if (this.geometries[i].bgcolor) obj.bgcolor = this.geometries[i].bgcolor;
                if (this.geometries[i].size) obj.size = this.geometries[i].size;
                if (this.geometries[i].offsetx) obj.offsetx = this.geometries[i].offsetx;
                if (this.geometries[i].offsety) obj.offsety = this.geometries[i].offsety;
                if (this.geometries[i].text) obj.text = this.geometries[i].text.stripHtmlTags();
                if (this.geometries[i].iconWidth) obj.iconWidth = this.geometries[i].iconWidth;
                if (this.geometries[i].iconHeight) obj.iconHeight = this.geometries[i].iconHeight;
                if (this.geometries[i].iconName) obj.iconName = this.geometries[i].iconName;
                obj.points = this.geometries[i].points;
                if (this.geometries[i].extension) obj.extension = this.geometries[i].extension;
                tmp.push(obj);
            }
        }
        if (tmp.length > 0) {
            try {
                ser_obj += serialize(tmp);
            } catch (e) {}
        }
        return ser_obj;
    };
    this.reset = function() {
        this.singleGraphicsObserver.reset();
        this.clearGraphics();
        this.geometries = new Array();
        updateLinkToView();
    };
    this.redrawGraphics = function() {
        var i;
        if (!this.singleGraphics) {
            this.clearGraphics();
            for (i = 0; i < this.geometries.length; i++) {
                this.drawGeometry(this.geometries[i]);
            }
        } else {
            this.singleGraphicsObserver.reset();
            this.singleGraphicsObserver.enqueue("gogisGeoObjects.getInstance(" + this.instanceId + ").updateGraphics", "gogisGeoObjects.getInstance(" + this.instanceId + ").updateGraphics", null, null);
        }
    };
    this.updateGraphics = function() {
        this.clearGraphics();
        if (!(this.geometries && this.geometries.length && this.geometries.length > 0)) return;
        var minMax = new Object();
        var extent = this.application.getGeoExtents();
        var dx = Math.abs(extent[2] - extent[0]) / 3;
        var dy = Math.abs(extent[3] - extent[1]) / 3;
        minMax.minX = extent[0] - dx;
        minMax.minY = extent[1] - dy;
        minMax.maxX = extent[2] + dx;
        minMax.maxY = extent[3] + dy;
        minMax.pix = new Object();
        pix = this.application.geoToPix(minMax.minX, minMax.minY);
        minMax.pix.minX = pix[0];
        minMax.pix.minY = pix[1];
        pix = this.application.geoToPix(minMax.maxX, minMax.maxY);
        minMax.pix.maxX = pix[0];
        minMax.pix.maxY = pix[1];
        var width = Math.abs(minMax.pix.maxX - minMax.pix.minX);
        var height = Math.abs(minMax.pix.maxY - minMax.pix.minY);
        if (!this.graphicsCanvas) {
            this.graphicsCanvas = document.createElement('div');
            this.graphicsCanvas.id = "gogisGeoObjectsGraphics|" + this.instanceId;
            this.graphicsCanvas.style.position = 'absolute';
            this.drawingCanvas.appendChild(this.graphicsCanvas);
        }
        this.graphicsCanvas.style.width = width + (this.geometries[0].size > 0 ? this.geometries[0].size : 0) + "px";
        this.graphicsCanvas.style.height = height + (this.geometries[0].size > 0 ? this.geometries[0].size : 0) + "px";
        var strokeCorr = this.application.cellSize * (this.geometries[0].size > 0 ? this.geometries[0].size : 0) / 2;
        this.application.addObjectGeo(this.drawingCanvas, minMax.minX - strokeCorr, parseFloat(minMax.maxY) + strokeCorr, this.graphicsCanvas);
        if (!this.graphics) {
            this.graphics = new GogisCanvas(this.graphicsCanvas.id, width + (this.geometries[0].size > 0 ? parseInt(this.geometries[0].size) : 0), height + (this.geometries[0].size > 0 ? parseInt(this.geometries[0].size) : 0), this.geometries[0].opacity);
        } else {
            this.graphics.canvas.setAttribute('width', width);
            this.graphics.canvas.setAttribute('height', height);
            this.graphics.graphics.globalAlpha = this.geometries[0].opacity / 100;
        }
        for (var i = 0; i < this.geometries.length; i++) {
            if (this.geometries[i].points && this.geometries[i].points.length > 0 && this.contains(extent, this.geometries[i].extent)) {
                this.geometries[i].values = this.getPixValues(this.geometries[i].points, minMax.pix.minX, minMax.pix.maxY);
                if (!this.geometries[i].values) continue;
                if (this.geometries[i].type == gogisGeoObjects.GEOMETRY_LINE) {
                    this.drawLine(this.graphics, this.geometries[i], minMax.pix.minX, minMax.pix.maxY);
                } else if (this.geometries[i].type == gogisGeoObjects.GEOMETRY_POLYGON) {
                    this.drawPolygon(this.graphics, this.geometries[i], minMax.pix.minX, minMax.pix.maxY);
                }
            }
        }
    };
    this.contains = function(index, box) {
        if (index[0] > box.maxx) return false;
        if (index[1] > box.maxy) return false;
        if (index[2] < box.minx) return false;
        if (index[3] < box.miny) return false;
        return true;
    };
    this.drawGeometry = function(geometry) {
        if (geometry.points.length > 0) {
            var minMax = this.getMinMaxValues(geometry.points);
            if (geometry.extension) {
                for (iExtension = 0; iExtension < geometry.extension.length; iExtension++) {
                    minMax = this.getMinMaxValues(geometry.extension[iExtension], minMax.minX, minMax.minY, minMax.maxX, minMax.maxY);
                }
            }
            geometry.values = this.getPixValues(geometry.points, minMax.pix.minX, minMax.pix.maxY);
            var width = Math.abs(minMax.pix.maxX - minMax.pix.minX);
            var height = Math.abs(minMax.pix.maxY - minMax.pix.minY);
            var graphics;
            var graphicsCanvas = document.createElement('div');
            geometry.canvas = graphicsCanvas;
            graphicsCanvas.id = "gogisGeoObjectsGraphics|" + this.instanceId + "|" + geometry.id;
            graphicsCanvas.style.position = 'absolute';
            graphicsCanvas.style.width = width + (geometry.size > 0 ? geometry.size : 0) + "px";
            graphicsCanvas.style.height = height + (geometry.size > 0 ? geometry.size : 0) + "px";
            if (!geometry.disableEvents) {
                if (geometry.status == gogisGeoObjects.STATUS_EDITABLE && !browser_isMobile && (geometry.type == gogisGeoObjects.GEOMETRY_POLYGON || geometry.type == gogisGeoObjects.GEOMETRY_LINE)) {
                    graphicsCanvas.onclick = function(e) {
                        e = (e) ? e : ((event) ? event : null);
                        if (!(myRedlineTool.digitizer.isActive || myMeasureTool.digitizer.isActive)) {
                            if (confirm(gLocalizer.localize("GEOOBJ_DIALOG_EDIT")) == true) {
                                switchMode("toolRedline");
                                myGeoObjects.prepareEditGeometry(geometry.id);
                            } else {}
                            e.cancelBubble = true;
                            e.returnValue = false;
                            if (e.stopPropagation) e.stopPropagation();
                            if (e.preventDefault) e.preventDefault();
                            return false;
                        }
                    };
                } else {
                    graphicsCanvas.onclick = function(e) {
                        e = (e) ? e : ((event) ? event : null);
                        if (!(myRedlineTool.digitizer.isActive || myMeasureTool.digitizer.isActive)) {
                            if (confirm(gLocalizer.localize("GEOOBJ_DIALOG_REMOVE")) == true) {
                                if (geometry.isComplex == true) myGeoObjects.removeGeometry(geometry.id.split('||')[0], true);
                                else myGeoObjects.removeGeometry(geometry.id);
                                if (autocompleteHighlightObj != null && autocompleteHighlightObj.newid == geometry.id) {
                                    autocompleteHighlightId = null;
                                    autocompleteListIsActive = false;
                                    autocompleteDetailsIsActive = false;
                                    document.getElementById("gogisSearchField").value = "";
                                    gogisTabControlChange(1, true);
                                }
                            } else {}
                            e.cancelBubble = true;
                            e.returnValue = false;
                            if (e.stopPropagation) e.stopPropagation();
                            if (e.preventDefault) e.preventDefault();
                            return false;
                        }
                    };
                }
            }
            this.drawingCanvas.appendChild(graphicsCanvas);
            try {
                var strokeCorr = 0;
                if (geometry.type == gogisGeoObjects.GEOMETRY_POLYGON || geometry.type == gogisGeoObjects.GEOMETRY_LINE) {
                    strokeCorr = this.application.cellSize * (geometry.size > 0 ? geometry.size : 0) / 2;
                }
                this.application.addObjectGeo(this.drawingCanvas, minMax.minX - strokeCorr, parseFloat(minMax.maxY) + strokeCorr, graphicsCanvas);
                if (geometry.type == gogisGeoObjects.GEOMETRY_POLYGON || geometry.type == gogisGeoObjects.GEOMETRY_LINE) {
                    graphics = new GogisCanvas(graphicsCanvas.id, width + (geometry.size > 0 ? parseInt(geometry.size) : 0), height + (geometry.size > 0 ? parseInt(geometry.size) : 0), geometry.opacity);
                    geometry.graphics = graphics;
                } else if (geometry.type != gogisGeoObjects.GEOMETRY_LABEL) {
                    graphics = new jsGraphics(graphicsCanvas.id);
                    geometry.graphics = graphics;
                } else {
                    graphics = graphicsCanvas;
                }
                if (geometry.type == gogisGeoObjects.GEOMETRY_LINE) {
                    this.drawLine(graphics, geometry, minMax.pix.minX, minMax.pix.maxY);
                } else if (geometry.type == gogisGeoObjects.GEOMETRY_POLYGON) {
                    this.drawPolygon(graphics, geometry, minMax.pix.minX, minMax.pix.maxY);
                } else if (geometry.type == gogisGeoObjects.GEOMETRY_POINT) {
                    this.drawPoint(graphics, geometry);
                } else if (geometry.type == gogisGeoObjects.GEOMETRY_LABEL) {
                    this.drawLabel(graphics, geometry);
                } else if (geometry.type == gogisGeoObjects.GEOMETRY_ICON) {
                    this.drawIcon(graphics, geometry);
                }
            } catch (e) {
                try {
                    graphics.clear();
                } catch (e) {}
                try {
                    this.application.removeObject(graphicsCanvas);
                } catch (e) {}
            }
            if (geometry.callback && geometry.callbackObj) geometry.callback(geometry.callbackObj);
        } else {
            this.clearGraphics();
        }
    };
    this.clearGraphics = function() {
        if (this.geometries && this.geometries.length && !this.singleGraphics) {
            for (i = 0; i < this.geometries.length; i++) {
                if (this.geometries[i].graphics) {
                    if (this.geometries[i].graphics.remove) this.geometries[i].graphics.remove();
                    this.geometries[i].graphics = null;
                }
                if (this.geometries[i].canvas) {
                    this.geometries[i].canvas = null;
                }
            }
        } else if (this.singleGraphics && this.graphics) {
            this.graphics.clear();
        }
        try {
            this.application.removeAllObjects(this.drawingCanvas);
        } catch (e) {}
    };
    this.drawPoint = function(graphics, geometry) {
        graphics.setColor(geometry.color);
        graphics.fillEllipse(-parseInt((geometry.size / 2) + 0.5), -parseInt((geometry.size / 2) + 0.5), geometry.size, geometry.size);
        graphics.paint();
    };
    this.drawLine = function(graphics, geometry, pixMinX, pixMaxY) {
        var extVal = val = null;
        if (geometry.extension && geometry.extension.length > 0) {
            extVal = new Array();
            for (i = 0; i < geometry.extension.length; i++) {
                val = this.getPixValues(geometry.extension[i], pixMinX, pixMaxY);
                if (val != null) extVal.push(val);
            }
        }
        graphics.drawLine(geometry.values, geometry.size, geometry.color, geometry.bgcolor, geometry.extVal);
    };
    this.drawPolygon = function(graphics, geometry, pixMinX, pixMaxY) {
        var extVal = val = null;
        if (geometry.extension && geometry.extension.length > 0) {
            extVal = new Array();
            for (i = 0; i < geometry.extension.length; i++) {
                val = this.getPixValues(geometry.extension[i], pixMinX, pixMaxY);
                if (val != null) extVal.push(val);
            }
        }
        graphics.drawPolygon(geometry.values, geometry.size, geometry.color, geometry.bgcolor, extVal);
    };
    this.drawLabel = function(graphics, geometry) {
        var element = document.createElement('div');
        geometry.labelCanvas = element;
        element.style.position = 'absolute';
        element.style.width = "auto";
        element.style.height = "auto";
        element.style.fontFamily = "arial";
        element.style.fontWeight = "bold";
        element.style.whiteSpace = "nowrap";
        element.style.color = geometry.color;
        element.style.fontSize = geometry.size + "px";
        element.style.left = (geometry.offsetx ? geometry.offsetx : 0) + "px";
        element.style.top = (geometry.offsety ? geometry.offsety : 0) + "px";
        if (geometry.bgcolor != "-1") element.style.backgroundColor = geometry.bgcolor;
        else element.style.backgroundColor = "transparent";
        graphics.appendChild(element);
        if (!geometry.allowHTML) element.innerHTML = geometry.text.stripHtmlTags().replace(/_/g, "<br>");
        else {
            if (geometry.classCSS && verifyStyle("." + geometry.classCSS)) element.className = geometry.classCSS;
            else if (geometry.styleCSS) {
                for (var i in geometry.styleCSS) {
                    element.style[i] = geometry.styleCSS[i];
                }
            }
            element.innerHTML = geometry.text;
        }
    };
    this.drawIcon = function(graphics, geometry) {
        graphics.drawImage("gogis/images/" + geometry.iconName, -parseInt((geometry.iconWidth) / 2), -parseInt((geometry.iconHeight)), geometry.iconWidth, geometry.iconHeight);
        graphics.paint();
    };
    this.getMinMaxValues = function(values) {
        var minMax = new Object();
        if (arguments.length >= 5) {
            minMax.minX = arguments[1];
            minMax.minY = arguments[2];
            minMax.maxX = arguments[3];
            minMax.maxY = arguments[4];
        } else {
            minMax.minX = 100000000;
            minMax.minY = 100000000;
            minMax.maxX = -100000000;
            minMax.maxY = -100000000;
        }
        var i, pix;
        for (i = 0; i < values.length; i++) {
            if (parseInt(values[i][0]) < minMax.minX) minMax.minX = values[i][0];
            if (parseInt(values[i][1]) < minMax.minY) minMax.minY = values[i][1];
            if (parseInt(values[i][0]) > minMax.maxX) minMax.maxX = values[i][0];
            if (parseInt(values[i][1]) > minMax.maxY) minMax.maxY = values[i][1];
        }
        if (gogisApplication.CUT_LARGE_GEOOBJECTS && gogisApplication.CUT_LARGE_GEOOBJECTS[gogisCurrentInstance] == true) {
            var extent = this.application.getGeoExtents();
            var dx = Math.abs(extent[2] - extent[0]) / 3;
            var dy = Math.abs(extent[3] - extent[1]) / 3;
            extent[0] = extent[0] - dx;
            extent[1] = extent[1] - dy;
            extent[2] = extent[2] + dx;
            extent[3] = extent[3] + dy;
            if (minMax.minX < extent[0]) minMax.minX = extent[0];
            if (minMax.minY < extent[1]) minMax.minY = extent[1];
            if (minMax.maxX > extent[2]) minMax.maxX = extent[2];
            if (minMax.maxY > extent[3]) minMax.maxY = extent[3];
        }
        minMax.pix = new Object();
        pix = this.application.geoToPix(minMax.minX, minMax.minY);
        minMax.pix.minX = pix[0];
        minMax.pix.minY = pix[1];
        pix = this.application.geoToPix(minMax.maxX, minMax.maxY);
        minMax.pix.maxX = pix[0];
        minMax.pix.maxY = pix[1];
        return minMax;
    };
    this.getPixValues = function(values, pixMinX, pixMaxY) {
        var pixValues = new Object();
        pixValues.x = new Array();
        pixValues.y = new Array();
        if (!this.singleGraphics && (gogisApplication.CUT_LARGE_GEOOBJECTS && gogisApplication.CUT_LARGE_GEOOBJECTS[gogisCurrentInstance] == true)) {
            var extent = this.application.getGeoExtents();
            var pix = new Array();
            var dx = Math.abs(extent[2] - extent[0]) / 3;
            var dy = Math.abs(extent[3] - extent[1]) / 3;
            extent[0] = extent[0] - dx;
            extent[1] = extent[1] - dy;
            extent[2] = extent[2] + dx;
            extent[3] = extent[3] + dy;
        } else var pix;
        var visible = false;
        var visibleX = visibleY = true;
        for (var i = 0; i < values.length; i++) {
            if (!this.singleGraphics && (gogisApplication.CUT_LARGE_GEOOBJECTS && gogisApplication.CUT_LARGE_GEOOBJECTS[gogisCurrentInstance] == true)) {
                visibleX = visibleY = false;
                pix[0] = values[i][0];
                pix[1] = values[i][1];
                if (pix[0] < extent[0]) {} else if (pix[0] > extent[2]) {} else visibleX = true;
                if (pix[1] < extent[1]) {} else if (pix[1] > extent[3]) {} else visibleY = true;
                pix = this.application.geoToPix(pix[0], pix[1]);
                visible = (visible || (visibleX && visibleY));
            } else {
                pix = this.application.geoToPix(values[i][0], values[i][1]);
                visible = true;
            }
            pixValues.x.push(parseInt(pix[0] - pixMinX));
            pixValues.y.push(parseInt(pix[1] - pixMaxY));
        }
        return (visible ? pixValues : null);
    };
    this.reset();
}
gogisGeoObjects.prototype.prepareEditGeometry = function(id) {
    if (myRedlineService != null) {
        myGeoObjects.editGeometry(id);
    } else {
        setTimeout("myGeoObjects.prepareEditGeometry(" + id + ");", 1000);
    }
};
gogisGeoObjects.prototype.editGeometry = function(id) {
    var geometry = this.getGeometry(id);
    this.removeGeometry(id);
    document.getElementById('redlineGeometry').value = geometry.type;
    onRedlineObjectChangeType(geometry.type);
    document.getElementById('redlineOpacity').value = geometry.opacity;
    document.getElementById('redlineSize').value = geometry.size;
    document.getElementById('redlineColor').value = geometry.color;
    document.getElementById('redlineBgColor').value = geometry.bgcolor;
    document.getElementById('redlineIcon').value = geometry.iconName + "|" + geometry.iconWidth + "|" + geometry.iconHeight;
    document.getElementById('redlineText').value = geometry.text;
    myRedlineTool.digitizer.setGeometry(geometry);
};
gogisGeoObjects.prototype.removeGeometry = function(id) {
    var removeMultiple = ((arguments.length > 1 && arguments[1] == true) ? true : false);
    if (id == null) {
        this.reset();
    } else {
        if (typeof(id) != 'object' || !id.length) {
            ids = new Array();
            ids.push(id);
        } else ids = id;
        for (var j = 0; j < ids.length; j++) {
            for (var i = this.geometries.length - 1; i >= 0; i--) {
                if (this.geometries[i].id == ids[j] || (removeMultiple && ('' + this.geometries[i].id).indexOf(ids[j]) == 0)) {
                    var geometry = this.geometries[i];
                    this.geometries.splice(i, 1);
                    if (!this.singleGraphics) {
                        if (geometry.graphics) {
                            if (geometry.graphics.remove) geometry.graphics.remove();
                            geometry.graphics = null;
                        }
                        if (geometry.canvas) {
                            try {
                                this.application.removeObject(geometry.canvas);
                            } catch (e) {}
                            geometry.canvas = null;
                        }
                    }
                    if (!removeMultiple) break;
                }
            }
        }
        updateLinkToView();
    }
};
gogisGeoObjects.prototype.handleLoadGeometriesResponse = function(response) {
    try {
        if (response.trim() != "-1") {
            var i, geometry, tmp_geometries;
            tmp_geometries = eval('(' + response + ')');
            for (i = 0; i < tmp_geometries.root.length; i++) {
                geometry = new Object();
                geometry.persistence = gogisGeoObjects.PERSISTENCE_DB;
                if (gogisCurrentUserIp == tmp_geometries.root[i].userip) {
                    geometry.status = gogisGeoObjects.STATUS_EDITABLE;
                } else {
                    geometry.status = gogisGeoObjects.STATUS_READONLY;
                }
                geometry.id = tmp_geometries.root[i].id;
                geometry.type = tmp_geometries.root[i].geometry_type;
                geometry.points = eval('(' + tmp_geometries.root[i].geometry_points + ')');
                geometry.opacity = tmp_geometries.root[i].geometry_opacity;
                geometry.size = tmp_geometries.root[i].geometry_size;
                geometry.color = tmp_geometries.root[i].geometry_color;
                geometry.bgcolor = tmp_geometries.root[i].geometry_bgcolor;
                geometry.text = tmp_geometries.root[i].label_text;
                geometry.iconName = tmp_geometries.root[i].icon_name;
                geometry.iconWidth = tmp_geometries.root[i].icon_width;
                geometry.iconHeight = tmp_geometries.root[i].icon_height;
                geometry.canvas = null;
                myGeoObjects.geometries.push(geometry);
                myGeoObjects.drawGeometry(geometry);
            }
        }
    } catch (e) {}
    updateLinkToView();
};
gogisGeoObjects.GEOMETRY_POINT = 1;
gogisGeoObjects.GEOMETRY_LINE = 2;
gogisGeoObjects.GEOMETRY_POLYGON = 3;
gogisGeoObjects.GEOMETRY_LABEL = 4;
gogisGeoObjects.GEOMETRY_ICON = 5;
gogisGeoObjects.STATUS_READONLY = 0;
gogisGeoObjects.STATUS_EDITABLE = 1;
gogisGeoObjects.PERSISTENCE_TMP = 0;
gogisGeoObjects.PERSISTENCE_DB = 1;
gogisGeoObjects.instances = 0;
gogisGeoObjects.managers = new Array();
gogisGeoObjects.getInstanceId = function() {
    gogisGeoObjects.instances++;
    return gogisGeoObjects.instances;
};
gogisGeoObjects.getInstance = function(id) {
    for (var i = 0; i < gogisGeoObjects.managers.length; i++) {
        if (gogisGeoObjects.managers[i].instanceId == id) return gogisGeoObjects.managers[i];
    }
};
gogisGeoObjects.resetAllInstances = function() {
    for (var i = 0; i < gogisGeoObjects.managers.length; i++) {
        gogisGeoObjects.managers[i].reset();
    }
};
gogisGeoObjects.redrawAllInstances = function() {
    for (var i = 0; i < gogisGeoObjects.managers.length; i++) {
        gogisGeoObjects.managers[i].redrawGraphics();
    }
};

function gogisDigitizer(application, geometryType) {
    this.application = application;
    this.instanceId = gogisDigitizer.getInstanceId();
    gogisDigitizer.managers.push(this);
    this.fullRedraw = null;
    this.tmpPoint = null;
    this.isActive = null;
    this.geometry = new Object();
    this.geometry.status = gogisGeoObjects.STATUS_EDITABLE;
    this.geometry.id = null;
    this.geometry.type = geometryType;
    this.geometry.points = null;
    this.geometry.opacity = 100;
    this.geometry.size = 2;
    this.geometry.color = '#ff0000';
    this.geometry.bgcolor = '#ffffff';
    this.geometry.text = '';
    this.geometry.iconName = 'pin-red-middle.gif';
    this.geometry.iconWidth = 53;
    this.geometry.iconHeight = 42;
    this.geometry.canvas = null;
    this.drawingCanvas = this.application.createDrawingCanvas(5100);
    this.drawingCanvas.style.position = 'absolute';
    this.drawingCanvas.style.width = '1px';
    this.drawingCanvas.style.height = '1px';
    this.tmpHtmlCanvas = document.createElement('div');
    this.tmpHtmlCanvas.id = "gogisDigitizerTmpHtml" + this.instanceId;
    this.tmpHtmlCanvas.style.position = 'absolute';
    this.tmpHtmlCanvas.style.width = "auto";
    this.tmpHtmlCanvas.style.height = "auto";
    this.tmpHtmlCanvas.style.fontFamily = "arial";
    this.tmpHtmlCanvas.style.fontWeight = "bold";
    this.tmpHtmlCanvas.style.whiteSpace = "nowrap";
    this.getGeometry = function() {
        return this.geometry;
    };
    this.setGeometry = function(geometry) {
        this.isActive = true;
        this.geometry = geometry;
        this.redrawGraphics();
    };
    this.setGeometryType = function(geometryType) {
        this.geometry.type = geometryType;
        this.reset();
    };
    this.setGeometryId = function(id) {
        this.geometry.id = id;
    };
    this.setGeometryOpacity = function(opacity) {
        this.geometry.opacity = opacity;
        this.redrawGraphics();
    };
    this.setGeometrySize = function(size) {
        this.geometry.size = size;
        this.redrawGraphics();
    };
    this.setGeometryColor = function(color) {
        this.geometry.color = color;
        this.redrawGraphics();
    };
    this.setGeometryBgColor = function(bgcolor) {
        this.geometry.bgcolor = bgcolor;
        this.redrawGraphics();
    };
    this.setGeometryText = function(text) {
        this.geometry.text = text;
        this.redrawGraphics();
    };
    this.setGeometryIcon = function(iconName, iconWidth, iconHeight, iconPosition) {
        this.geometry.iconName = iconName;
        this.geometry.iconWidth = iconWidth;
        this.geometry.iconHeight = iconHeight;
        this.redrawGraphics();
    };
    this.reset = function() {
        this.clearGraphics();
        this.tmpPoint = null;
        this.geometry = clone(this.geometry);
        this.geometry.id = -1;
        this.geometry.points = new Array();
        this.fullRedraw = true;
        this.isActive = false;
    };
    this.addPoint = function(point) {
        var roundedPoint = new Array();
        roundedPoint.push(Math.round(point[0] * 100) / 100);
        roundedPoint.push(Math.round(point[1] * 100) / 100);
        this.tmpPoint = null;
        this.fullRedraw = true;
        this.isActive = true;
        if (this.geometry.points.length > 0) {
            if (!(this.geometry.points[this.geometry.points.length - 1][0] == roundedPoint[0] && this.geometry.points[this.geometry.points.length - 1][1] == roundedPoint[1])) {
                if (this.geometry.type == gogisDigitizer.GEOMETRY_POINT || this.geometry.type == gogisDigitizer.GEOMETRY_LABEL || this.geometry.type == gogisDigitizer.GEOMETRY_ICON) {
                    this.geometry.points = new Array();
                }
                this.geometry.points.push(roundedPoint);
                this.drawGraphics();
            }
        } else {
            this.geometry.points.push(roundedPoint);
            this.drawGraphics();
        }
    };
    this.removePoint = function() {
        this.tmpPoint = null;
        this.geometry.points.pop();
        this.fullRedraw = true;
        this.drawGraphics();
    };
    this.setTmpPoint = function(point) {
        this.tmpPoint = point;
        this.fullRedraw = false;
        this.drawGraphics();
    };
    this.redrawGraphics = function() {
        this.fullRedraw = true;
        this.drawGraphics();
    };
    this.drawGraphics = function() {
        if ((this.geometry && this.geometry.points && this.geometry.points.length > 0) || !this.fullRedraw) {
            var strokeCorr = 0;
            var minMax, width, height;
            if (this.fullRedraw) {
                try {
                    this.graphics.clear();
                } catch (e) {}
                try {
                    if (this.graphicsCanvas) this.application.removeObject(this.graphicsCanvas);
                } catch (e) {}
                minMax = this.getMinMaxValues(this.geometry.points);
                width = Math.abs(minMax.pix.maxX - minMax.pix.minX);
                height = Math.abs(minMax.pix.maxY - minMax.pix.minY);
                this.graphicsCanvas = document.createElement('div');
                this.graphicsCanvas.id = "gogisDigitizerGraphics" + this.instanceId;
                this.graphicsCanvas.style.position = 'absolute';
                this.graphicsCanvas.style.width = width + (this.geometry.size > 0 ? this.geometry.size : 0) + "px";
                this.graphicsCanvas.style.height = height + (this.geometry.size > 0 ? this.geometry.size : 0) + "px";
                this.drawingCanvas.appendChild(this.graphicsCanvas);
                try {
                    if (this.geometry.type == gogisDigitizer.GEOMETRY_LINE || this.geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
                        strokeCorr = this.application.cellSize * (this.geometry.size > 0 ? this.geometry.size : 0) / 2;
                    }
                    this.application.addObjectGeo(this.drawingCanvas, minMax.minX - strokeCorr, parseFloat(minMax.maxY) + strokeCorr, this.graphicsCanvas);
                    if (this.geometry.type == gogisDigitizer.GEOMETRY_LINE || this.geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
                        this.graphics = new GogisCanvas(this.graphicsCanvas.id, width + (this.geometry.size > 0 ? parseInt(this.geometry.size) : 0), height + (this.geometry.size > 0 ? parseInt(this.geometry.size) : 0), this.geometry.opacity);
                    } else {
                        this.graphics = new jsGraphics(this.graphicsCanvas.id);
                    }
                    if (this.geometry.type == gogisDigitizer.GEOMETRY_LINE) {
                        this.drawLine(this.graphics, this.geometry.points, minMax.pix.minX, minMax.pix.maxY);
                    } else if (this.geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
                        this.drawPolygon(this.graphics, this.geometry.points, minMax.pix.minX, minMax.pix.maxY);
                    }
                } catch (e) {
                    try {
                        this.graphics.clear();
                    } catch (e) {}
                    try {
                        if (this.graphicsCanvas) this.application.removeObject(this.graphicsCanvas);
                    } catch (e) {}
                }
            }
            if (this.tmpPoint != null) {
                try {
                    this.tmpGraphicsCanvas.removeChild(this.tmpHtmlCanvas);
                } catch (e) {}
                try {
                    this.tmpGraphics.clear();
                } catch (e) {}
                try {
                    if (this.tmpGraphicsCanvas) this.application.removeObject(this.tmpGraphicsCanvas);
                } catch (e) {}
                var points = new Array();
                strokeCorr = 0;
                if (this.geometry.type == gogisDigitizer.GEOMETRY_LINE || this.geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
                    points.push(this.geometry.points[this.geometry.points.length - 1]);
                    points.push(this.tmpPoint);
                    strokeCorr = this.application.cellSize * (this.geometry.size > 0 ? this.geometry.size : 0) / 2;
                } else {
                    points.push(this.tmpPoint);
                }
                minMax = this.getMinMaxValues(points);
                width = Math.abs(minMax.pix.maxX - minMax.pix.minX);
                height = Math.abs(minMax.pix.maxY - minMax.pix.minY);
                this.tmpGraphicsCanvas = document.createElement('div');
                this.tmpGraphicsCanvas.id = "gogisDigitizerTmpGraphics" + this.instanceId;
                this.tmpGraphicsCanvas.style.position = 'absolute';
                if (this.geometry.type == gogisDigitizer.GEOMETRY_LINE || this.geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
                    this.tmpGraphicsCanvas.style.width = width + (this.geometry.size > 0 ? parseInt(this.geometry.size) : 0) + "px";
                    this.tmpGraphicsCanvas.style.height = height + (this.geometry.size > 0 ? parseInt(this.geometry.size) : 0) + "px";
                } else {
                    this.tmpGraphicsCanvas.style.width = "auto";
                    this.tmpGraphicsCanvas.style.height = "auto";
                }
                this.drawingCanvas.appendChild(this.tmpGraphicsCanvas);
                try {
                    this.application.addObjectGeo(this.drawingCanvas, minMax.minX - strokeCorr, parseFloat(minMax.maxY) + strokeCorr, this.tmpGraphicsCanvas);
                    if (this.geometry.type == gogisDigitizer.GEOMETRY_LINE || this.geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
                        this.tmpGraphics = new GogisCanvas(this.tmpGraphicsCanvas.id, width + (this.geometry.size > 0 ? parseInt(this.geometry.size) : 0), height + (this.geometry.size > 0 ? parseInt(this.geometry.size) : 0), this.geometry.opacity);
                    } else {
                        this.tmpGraphics = new jsGraphics(this.tmpGraphicsCanvas.id);
                    }
                    if (this.geometry.type == gogisDigitizer.GEOMETRY_LINE || this.geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
                        this.drawLine(this.tmpGraphics, points, minMax.pix.minX, minMax.pix.maxY);
                    } else if (this.geometry.type == gogisDigitizer.GEOMETRY_POINT) {
                        this.drawPoint(this.tmpGraphics);
                    } else if (this.geometry.type == gogisDigitizer.GEOMETRY_LABEL) {
                        this.drawLabel(this.tmpGraphicsCanvas, this.tmpHtmlCanvas);
                    } else if (this.geometry.type == gogisDigitizer.GEOMETRY_ICON) {
                        this.drawIcon(this.tmpGraphics);
                    }
                } catch (e) {
                    try {
                        this.tmpGraphics.clear();
                    } catch (e) {}
                    try {
                        if (this.tmpGraphicsCanvas) this.application.removeObject(this.tmpGraphicsCanvas);
                    } catch (e) {}
                }
            } else {
                try {
                    this.tmpGraphics.clear();
                } catch (e) {}
                try {
                    if (this.tmpGraphicsCanvas) this.application.removeObject(this.tmpGraphicsCanvas);
                } catch (e) {}
            }
        } else {
            this.clearGraphics();
        }
    };
    this.clearGraphics = function() {
        try {
            if (this.graphicsCanvas) this.application.removeObject(this.graphicsCanvas);
        } catch (e) {}
        try {
            if (this.tmpGraphicsCanvas) this.tmpGraphicsCanvas.removeChild(this.tmpHtmlCanvas);
        } catch (e) {}
        try {
            if (this.tmpGraphicsCanvas) this.application.removeObject(this.tmpGraphicsCanvas);
        } catch (e) {};
    };
    this.drawPoint = function(graphics) {
        graphics.setColor(this.geometry.color);
        graphics.fillEllipse(-parseInt((this.geometry.size / 2) + 0.5), -parseInt((this.geometry.size / 2) + 0.5), this.geometry.size, this.geometry.size);
        graphics.paint();
    };
    this.drawLine = function(graphics, points, pixMinX, pixMaxY) {
        var values = this.getPixValues(points, pixMinX, pixMaxY);
        var extVal = null;
        if (this.geometry.extension && this.geometry.extension.length > 0) {
            extVal = new Array();
            for (i = 0; i < this.geometry.extension.length; i++) {
                extVal.push(this.getPixValues(this.geometry.extension[i], pixMinX, pixMaxY));
            }
        }
        graphics.drawLine(values, this.geometry.size, this.geometry.color, this.geometry.bgcolor, this.geometry.extVal);
    };
    this.drawPolygon = function(graphics, points, pixMinX, pixMaxY) {
        var values = this.getPixValues(points, pixMinX, pixMaxY);
        var extVal = null;
        if (this.geometry.extension && this.geometry.extension.length > 0) {
            extVal = new Array();
            for (i = 0; i < this.geometry.extension.length; i++) {
                extVal.push(this.getPixValues(this.geometry.extension[i], pixMinX, pixMaxY));
            }
        }
        graphics.drawPolygon(values, this.geometry.size, this.geometry.color, this.geometry.bgcolor, this.geometry.extVal);
    };
    this.drawLabel = function(graphics, element) {
        graphics.appendChild(element);
        element.innerHTML = this.geometry.text.stripHtmlTags().replace(/_/g, "<br>");
        element.style.color = this.geometry.color;
        element.style.fontSize = this.geometry.size + "px";
        element.style.left = 0 + "px";
        element.style.top = 0 + "px";
        if (this.geometry.bgcolor != "-1") {
            element.style.backgroundColor = this.geometry.bgcolor;
        } else {
            element.style.backgroundColor = "transparent";
        }
    };
    this.drawIcon = function(graphics) {
        graphics.drawImage("gogis/images/" + this.geometry.iconName, -parseInt((this.geometry.iconWidth)), -parseInt((this.geometry.iconHeight)), this.geometry.iconWidth, this.geometry.iconHeight);
        graphics.paint();
    };
    this.getMinMaxValues = function(values) {
        var minMax = new Object();
        minMax.minX = 100000000;
        minMax.minY = 100000000;
        minMax.maxX = -100000000;
        minMax.maxY = -100000000;
        var i, pix;
        for (i = 0; i < values.length; i++) {
            if (values[i][0] < minMax.minX) minMax.minX = values[i][0];
            if (values[i][1] < minMax.minY) minMax.minY = values[i][1];
            if (values[i][0] > minMax.maxX) minMax.maxX = values[i][0];
            if (values[i][1] > minMax.maxY) minMax.maxY = values[i][1];
        }
        minMax.pix = new Object();
        pix = this.application.geoToPix(minMax.minX, minMax.minY);
        minMax.pix.minX = pix[0];
        minMax.pix.minY = pix[1];
        pix = this.application.geoToPix(minMax.maxX, minMax.maxY);
        minMax.pix.maxX = pix[0];
        minMax.pix.maxY = pix[1];
        return minMax;
    };
    this.getPixValues = function(values, pixMinX, pixMaxY) {
        var pixValues = new Object();
        pixValues.x = new Array();
        pixValues.y = new Array();
        var i, pix;
        for (i = 0; i < values.length; i++) {
            pix = this.application.geoToPix(values[i][0], values[i][1]);
            pixValues.x.push(parseInt(pix[0] - pixMinX));
            pixValues.y.push(parseInt(pix[1] - pixMaxY));
        }
        return pixValues;
    };
    this.reset();
}
gogisDigitizer.GEOMETRY_POINT = 1;
gogisDigitizer.GEOMETRY_LINE = 2;
gogisDigitizer.GEOMETRY_POLYGON = 3;
gogisDigitizer.GEOMETRY_LABEL = 4;
gogisDigitizer.GEOMETRY_ICON = 5;
gogisDigitizer.instances = 0;
gogisDigitizer.managers = new Array();
gogisDigitizer.getInstanceId = function() {
    gogisDigitizer.instances++;
    return gogisDigitizer.instances;
};
gogisDigitizer.resetAllInstances = function() {
    for (var i = 0; i < gogisDigitizer.managers.length; i++) {
        gogisDigitizer.managers[i].reset();
    }
};
gogisDigitizer.redrawAllInstances = function() {
    for (var i = 0; i < gogisDigitizer.managers.length; i++) {
        gogisDigitizer.managers[i].redrawGraphics();
    }
};

function gogisMeasureTool(oKaMap) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'gogisMeasureTool';
    this.useTmpPointForAreaCalc = false;
    this.useTmpPointForDistanceCalc = true;
    this.cursor = "url('../images/cursors/measure.cur'),url('gogis/images/cursors/measure.cur'),default";
    this.digitizer = new gogisDigitizer(oKaMap, gogisDigitizer.GEOMETRY_POLYGON);
    this.digitizer.geometry.opacity = gogisApplication.MEASURE_OPACITY[gogisCurrentInstance];
    this.digitizer.geometry.size = parseInt(gogisApplication.MEASURE_SIZE[gogisCurrentInstance]);
    this.digitizer.geometry.color = gogisApplication.MEASURE_COLOR[gogisCurrentInstance];
    this.digitizer.geometry.bgcolor = gogisApplication.MEASURE_BGCOLOR[gogisCurrentInstance];
    this.digitizer.setGeometryOpacity(gogisApplication.MEASURE_OPACITY[gogisCurrentInstance]);
    for (var p in kaTool.prototype) {
        if (!gogisMeasureTool.prototype[p]) gogisMeasureTool.prototype[p] = kaTool.prototype[p];
    }
    this.multitouchHandler = kaMultitouchHandler;
};
gogisMeasureTool.prototype.deactivate = function() {
    this.kaMap.deactivateTool(this);
    document.kaCurrentTool = null;
    this.digitizer.reset();
};
gogisMeasureTool.prototype.ontouchstart = kaMultitouchHandler.touchstart;
gogisMeasureTool.prototype.ontouchmove = kaMultitouchHandler.touchmove;
gogisMeasureTool.prototype.ontouchend = kaMultitouchHandler.touchend;
gogisMeasureTool.prototype.ontouchcancel = kaMultitouchHandler.touchcancel;
gogisMeasureTool.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {
        if (!gDblClickTimer) {
            if (myMeasureDialogWindow && !myMeasureDialogWindow.visible) activateMeasure(true);
            var aPixPos = myMeasureTool.adjustPixPosition(obj.clientX, obj.clientY);
            myMeasureTool.digitizer.addPoint(myMeasureTool.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
            myMeasureTool.calculate();
        }
    } else if (cmd == 'move') {
        if (!(myMeasureTool.digitizer.getGeometry().points.length > 0)) return false;
        var aPixPos = myMeasureTool.adjustPixPosition(obj.clientX, obj.clientY);
        myMeasureTool.digitizer.setTmpPoint(myMeasureTool.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
        myMeasureTool.calculate();
    } else if (cmd == 'moving_done') {
        if (!gDblClickTimer) {
            gDblClickTimer = window.setTimeout(bind(myMeasureTool.dispatchMapClicked, myMeasureTool, obj.clientX, obj.clientY), 250);
        }
    } else if (cmd == 'done') {
        if (!gDblClickTimer) {
            gDblClickTimer = window.setTimeout(bind(myMeasureTool.dispatchMapClicked, myMeasureTool, obj.clientX, obj.clientY), 500);
        } else {
            myHotspot.mouseclickedcancled = true;
            window.clearTimeout(gDblClickTimer);
            gDblClickTimer = null;
            myMeasureTool.dispatchMapDblClicked(obj.clientX, obj.clientY);
        }
    }
};
gogisMeasureTool.prototype.onmouseout = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (!e.target) e.target = e.srcElement;
    if (e.target.id == this.kaMap.domObj.id) {
        return kaTool.prototype.onmouseout.apply(this, [e]);
    }
};
gogisMeasureTool.prototype.onmousemove = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (!(this.digitizer.getGeometry().points.length > 0)) {
        return false;
    }
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var aPixPos = this.adjustPixPosition(x, y);
    this.digitizer.setTmpPoint(this.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
    this.calculate();
    return false;
};
gogisMeasureTool.prototype.onmousedown = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (e.button == 2) {
        return this.cancelEvent(e);
    }
    if (this.kaMap.isIE4) document.onkeydown = kaTool_redirect_onkeypress;
    document.onkeypress = kaTool_redirect_onkeypress;
    if (!gDblClickTimer) {
        if (myMeasureDialogWindow && !myMeasureDialogWindow.visible) activateMeasure(true);
        var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        var aPixPos = this.adjustPixPosition(x, y);
        this.digitizer.addPoint(this.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
        this.calculate();
    }
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    return false;
};
gogisMeasureTool.prototype.onmouseup = function(e) {
    e = (e) ? e : ((event) ? event : null);
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    if (!gDblClickTimer) {
        gDblClickTimer = window.setTimeout(bind(this.dispatchMapClicked, this, x, y), 250);
    }
    return false;
};
gogisMeasureTool.prototype.dispatchMapClicked = function(px, py) {
    gDblClickTimer = null;
    var aPixPos = this.adjustPixPosition(px, py);
    this.digitizer.addPoint(this.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
    this.calculate();
};
gogisMeasureTool.prototype.dispatchMapDblClicked = function(px, py) {
    if (gDblClickTimer) {
        window.clearTimeout(gDblClickTimer);
        gDblClickTimer = null;
    }
    this.digitizer.reset();
    this.calculate();
};
gogisMeasureTool.prototype.ondblclick = function(e) {
    if (gDblClickTimer) {
        window.clearTimeout(gDblClickTimer);
        gDblClickTimer = null;
    }
    this.digitizer.reset();
    this.calculate();
};
gogisMeasureTool.prototype.calculate = function() {
    var distance = 0;
    var area = 0;
    var n = this.digitizer.getGeometry().points.length;
    var i;
    if (n > 0) {
        var points = this.digitizer.getGeometry().points;
        var pTmp = this.digitizer.tmpPoint;
        var dX, dY;
        for (i = 1; i < n; i++) {
            dX = points[i][0] - points[i - 1][0];
            dY = points[i][1] - points[i - 1][1];
            distance += Math.sqrt(dX * dX + dY * dY);
        }
        if (this.useTmpPointForDistanceCalc && pTmp != null) {
            dX = pTmp[0] - points[n - 1][0];
            dY = pTmp[1] - points[n - 1][1];
            distance += Math.sqrt(dX * dX + dY * dY);
        }
        if (n > 1) {
            var x0, y0, x1, y1;
            for (i = 1; i < n; i++) {
                x1 = points[i][0];
                y1 = points[i][1];
                x0 = points[i - 1][0];
                y0 = points[i - 1][1];
                area = area + (x1 - x0) * (y0 + (y1 - y0) / 2.0);
            }
            if (this.useTmpPointForAreaCalc && pTmp != null) {
                x1 = pTmp[0];
                y1 = pTmp[1];
                x0 = points[n - 1][0];
                y0 = points[n - 1][1];
                area = area + (x1 - x0) * (y0 + (y1 - y0) / 2.0);
                x1 = pTmp[0];
                y1 = pTmp[1];
                x0 = points[0][0];
                y0 = points[0][1];
                area = area + (x0 - x1) * (y1 + (y0 - y1) / 2.0);
            } else {
                x1 = points[n - 1][0];
                y1 = points[n - 1][1];
                x0 = points[0][0];
                y0 = points[0][1];
                area = area + (x0 - x1) * (y1 + (y0 - y1) / 2.0);
            }
        }
    }
    var fD = this.formatPolyDistance(distance);
    var fA = this.formatPolyArea(area);
    if (browser_isMobile) {
        setCurrentMeasure(fD, fA);
    } else {
        document.getElementById("measureDistance").value = fD;
        document.getElementById("measureArea").value = fA;
    }
};
gogisMeasureTool.prototype.formatPolyDistance = function(distance) {
    var separator = (browser_isMobile ? '' : ' ');
    if (distance > 0) {
        if (distance >= 10000) {
            return Math.round(distance / 100) / 10 + separator + "km";
        } else if (distance >= 1000) {
            return Math.round(distance) + separator + "m";
        } else if (distance >= 100) {
            return Math.round(distance * 10) / 10 + separator + "m";
        }
        return Math.round(distance * 100) / 100 + separator + "m";
    }
    return (browser_isMobile ? '0m' : '');
};
gogisMeasureTool.prototype.formatPolyArea = function(area_in) {
    var separator = (browser_isMobile ? '' : ' ');
    var area = Math.abs(area_in);
    if (area > 0) {
        if (area >= 100000) {
            return Math.round(area / 10000) / 100 + separator + "km²";
        } else if (area >= 10000) {
            return Math.round(area / 1000) / 1000 + separator + "km²";
        } else if (area >= 1000) {
            return Math.round(area) + separator + "m²";
        } else if (area >= 100) {
            return Math.round(area * 10) / 10 + separator + "m²";
        }
        return Math.round(area * 100) / 100 + separator + "m²";
    }
    return (browser_isMobile ? '0m²' : '');
};

function gogisRedlineTool(oKaMap, oGeoObjects) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'gogisRedlineTool';
    this.geoObjects = oGeoObjects;
    this.cursor = "url('../images/cursors/draw.cur'),url('gogis/images/cursors/draw.cur'),default";
    this.digitizer = new gogisDigitizer(oKaMap, gogisDigitizer.GEOMETRY_ICON);
    this.currentGeometry = null;
    this.requestObj = new GogisRequestObject();
    this.requestObj.action = this.handlePublishGeometryResponse;
    for (var p in kaTool.prototype) {
        if (!gogisRedlineTool.prototype[p]) gogisRedlineTool.prototype[p] = kaTool.prototype[p];
    }
    this.multitouchHandler = kaMultitouchHandler;
};
gogisRedlineTool.prototype.deactivate = function() {
    this.kaMap.deactivateTool(this);
    document.kaCurrentTool = null;
    this.digitizer.reset();
};
gogisRedlineTool.prototype.ontouchstart = kaMultitouchHandler.touchstart;
gogisRedlineTool.prototype.ontouchmove = kaMultitouchHandler.touchmove;
gogisRedlineTool.prototype.ontouchend = kaMultitouchHandler.touchend;
gogisRedlineTool.prototype.ontouchcancel = kaMultitouchHandler.touchcancel;
gogisRedlineTool.prototype.callback = function(cmd, obj) {
    if (cmd == 'down') {
        if (!gDblClickTimer) {
            if (myRedlineDialogWindow && !myRedlineDialogWindow.visible && !browser_isMobile) activateRedline(true);
            var aPixPos = myRedlineTool.adjustPixPosition(obj.clientX, obj.clientY);
            myRedlineTool.digitizer.addPoint(myRedlineTool.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
        }
    } else if (cmd == 'move') {
        if (!(myRedlineTool.digitizer.getGeometry().points.length > 0)) return false;
        var aPixPos = myRedlineTool.adjustPixPosition(obj.clientX, obj.clientY);
        myRedlineTool.digitizer.setTmpPoint(myRedlineTool.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
    } else if (cmd == 'moving_done') {
        myRedlineTool.currentGeometry = myRedlineTool.digitizer.getGeometry();
        if (myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_POINT || myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_LABEL || myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_ICON) {
            var aPixPos = myRedlineTool.adjustPixPosition(obj.clientX, obj.clientY);
            myRedlineTool.currentGeometry.points.pop();
            if (myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_ICON) myRedlineTool.currentGeometry.points.push(myRedlineTool.kaMap.pixToGeo(aPixPos[0] + (myRedlineTool.currentGeometry.iconWidth / 2), aPixPos[1]));
            else myRedlineTool.currentGeometry.points.push(myRedlineTool.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
            try {
                myRedlineTool.publishGeometry(myRedlineTool.currentGeometry);
            } catch (e) {}
            myRedlineTool.digitizer.reset();
        }
        if (!gDblClickTimer) {
            gDblClickTimer = window.setTimeout(bind(myRedlineTool.dispatchMapClicked, myRedlineTool, obj.clientX, obj.clientY), 500);
        }
    } else if (cmd == 'done') {
        myRedlineTool.currentGeometry = myRedlineTool.digitizer.getGeometry();
        if (myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_POINT || myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_LABEL || myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_ICON) {
            var aPixPos = myRedlineTool.adjustPixPosition(obj.clientX, obj.clientY);
            myRedlineTool.currentGeometry.points.pop();
            if (myRedlineTool.currentGeometry.type == gogisDigitizer.GEOMETRY_ICON) myRedlineTool.currentGeometry.points.push(myRedlineTool.kaMap.pixToGeo(aPixPos[0] + (myRedlineTool.currentGeometry.iconWidth / 2), aPixPos[1]));
            else myRedlineTool.currentGeometry.points.push(myRedlineTool.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
            try {
                myRedlineTool.publishGeometry(myRedlineTool.currentGeometry);
            } catch (e) {}
            myRedlineTool.digitizer.reset();
        }
        if (!gDblClickTimer) {
            gDblClickTimer = window.setTimeout(bind(myRedlineTool.dispatchMapClicked, myRedlineTool, obj.clientX, obj.clientY), 500);
        } else {
            myHotspot.mouseclickedcancled = true;
            window.clearTimeout(gDblClickTimer);
            gDblClickTimer = null;
            myRedlineTool.dispatchMapDblClicked(obj.clientX, obj.clientY);
        }
    }
};
gogisRedlineTool.prototype.onmouseout = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (!e.target) e.target = e.srcElement;
    if (e.target.id == this.kaMap.domObj.id) {
        return kaTool.prototype.onmouseout.apply(this, [e]);
    }
};
gogisRedlineTool.prototype.onmousemove = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (!(this.digitizer.getGeometry().points.length > 0 || this.digitizer.getGeometry().type == gogisDigitizer.GEOMETRY_POINT || this.digitizer.getGeometry().type == gogisDigitizer.GEOMETRY_LABEL || this.digitizer.getGeometry().type == gogisDigitizer.GEOMETRY_ICON)) {
        return false;
    }
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var aPixPos = this.adjustPixPosition(x, y);
    this.digitizer.setTmpPoint(this.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
    return false;
};
gogisRedlineTool.prototype.onmousedown = function(e) {
    e = (e) ? e : ((event) ? event : null);
    if (e.button == 2) {
        return this.cancelEvent(e);
    }
    if (this.kaMap.isIE4) document.onkeydown = kaTool_redirect_onkeypress;
    document.onkeypress = kaTool_redirect_onkeypress;
    if (!gDblClickTimer) {
        if (myRedlineDialogWindow && !myRedlineDialogWindow.visible && !browser_isMobile) activateRedline(true);
        var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        var aPixPos = this.adjustPixPosition(x, y);
        this.digitizer.addPoint(this.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
    }
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    return false;
};
gogisRedlineTool.prototype.onmouseup = function(e) {
    e = (e) ? e : ((event) ? event : null);
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    this.currentGeometry = this.digitizer.getGeometry();
    if (this.currentGeometry.type == gogisDigitizer.GEOMETRY_POINT || this.currentGeometry.type == gogisDigitizer.GEOMETRY_LABEL || this.currentGeometry.type == gogisDigitizer.GEOMETRY_ICON) {
        var aPixPos = this.adjustPixPosition(x, y);
        this.currentGeometry.points.pop();
        if (this.currentGeometry.type == gogisDigitizer.GEOMETRY_ICON) this.currentGeometry.points.push(this.kaMap.pixToGeo(aPixPos[0] + (this.currentGeometry.iconWidth / 2), aPixPos[1]));
        else this.currentGeometry.points.push(this.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
        try {
            this.publishGeometry(this.currentGeometry);
        } catch (e) {}
        this.digitizer.reset();
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        return false;
    }
    if (!gDblClickTimer) {
        gDblClickTimer = window.setTimeout(bind(this.dispatchMapClicked, this, x, y), 250);
    }
    return false;
};
gogisRedlineTool.prototype.dispatchMapClicked = function(px, py) {
    gDblClickTimer = null;
    var aPixPos = this.adjustPixPosition(px, py);
    this.digitizer.addPoint(this.kaMap.pixToGeo(aPixPos[0], aPixPos[1]));
};
gogisRedlineTool.prototype.dispatchMapDblClicked = function(e) {
    if (gDblClickTimer) {
        window.clearTimeout(gDblClickTimer);
        gDblClickTimer = null;
    }
    this.currentGeometry = this.digitizer.getGeometry();
    try {
        this.publishGeometry(this.currentGeometry);
    } catch (e) {}
    this.digitizer.reset();
};
gogisRedlineTool.prototype.ondblclick = function(e) {
    if (gDblClickTimer) {
        window.clearTimeout(gDblClickTimer);
        gDblClickTimer = null;
    }
    this.currentGeometry = this.digitizer.getGeometry();
    try {
        this.publishGeometry(this.currentGeometry);
    } catch (e) {}
    this.digitizer.reset();
};
gogisRedlineTool.prototype.publishGeometry = function(geometry) {
    if (geometry == null || (geometry.type == gogisDigitizer.GEOMETRY_LABEL && !geometry.text > "") || (geometry.type == gogisDigitizer.GEOMETRY_LINE && geometry.points.length < 2) || (geometry.type == gogisDigitizer.GEOMETRY_POLYGON && geometry.points.length < 3)) {
        return;
    }
    var url = "gogis/php/setCustomObject.php?";
    url += this.getGeometryParameter(geometry);
    this.requestObj.sendRequest(url);
};
gogisRedlineTool.prototype.handlePublishGeometryResponse = function(response) {
    try {
        if (response > 0) {
            myRedlineTool.currentGeometry.id = response;
            myRedlineTool.currentGeometry.persistence = gogisGeoObjects.PERSISTENCE_DB;
            myRedlineTool.geoObjects.addGeometry(myRedlineTool.currentGeometry);
        }
    } catch (e) {}
    myRedlineTool.currentGeometry = null;
};
gogisRedlineTool.prototype.getGeometryParameter = function(geometry) {
    var points = geometry.points;
    if (geometry.type == gogisDigitizer.GEOMETRY_POLYGON) {
        var p = new Array();
        p.push(geometry.points[0][0]);
        p.push(geometry.points[0][1]);
        points.push(p);
    }
    var params = "";
    params += "id=" + geometry.id;
    params += "&type=" + geometry.type;
    try {
        params += "&points=" + escape(serialize(points).replace(/, /g, ","));
    } catch (e) {}
    params += "&opacity=" + geometry.opacity;
    params += "&size=" + geometry.size;
    params += "&color=" + escape(geometry.color);
    params += "&bgcolor=" + escape(geometry.bgcolor);
    params += "&text=" + encodeURIComponent(geometry.text);
    params += "&iconName=" + escape(geometry.iconName);
    params += "&iconWidth=" + geometry.iconWidth;
    params += "&iconHeight=" + geometry.iconHeight;
    params += "&instance=" + gogisCurrentInstance;
    return params;
};

function gogisCoordinatesTool(oKaMap) {
    kaTool.apply(this, [oKaMap]);
    this.name = 'gogisCoordinatesTool';
    this.cursor = "url('../images/cursors/coords.cur'),url('gogis/images/cursors/coords.cur'),default";
    for (var p in kaTool.prototype) {
        if (!gogisCoordinatesTool.prototype[p]) gogisCoordinatesTool.prototype[p] = kaTool.prototype[p];
    }
};
gogisCoordinatesTool.prototype.onmousedown = function(e) {
    e = (e) ? e : ((event) ? event : null);
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    return false;
};
gogisCoordinatesTool.prototype.onmouseup = function(e) {
    e = (e) ? e : ((event) ? event : null);
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var a = this.adjustPixPosition(x, y);
    var p = this.kaMap.pixToGeo(a[0], a[1]);
    var points = new Array();
    var point = new Array();
    point.push(p[0]);
    point.push(p[1]);
    points.push(point);
    myGeoObjects.removeGeometry("currentCoordinates", true);
    if (!browser_isMobile) {
        var tmpWGS84 = myCoordTransform(p[0], p[1]);
        var html = "<table cellpadding='0' cellspacing='0' border='0'>" + "<tr><td><b style='color:" + gogisApplication.HIGHLIGHT_BORDERCOLOR + "'>" + gogisCurrentProjection + "</b></td><td>Y,&nbsp;X:&nbsp;&nbsp;</td>" + "<td><input style='font-family:arial;font-size:10px;width:105px' readonly onclick='this.select();' value='" + Math.round(p[0] * 10) / 10 + ", " + Math.round(p[1] * 10) / 10 + "'></td></tr>" + "<tr><td><b style='color:" + gogisApplication.HIGHLIGHT_BORDERCOLOR + "'>WGS84</b>&nbsp;&nbsp;&nbsp;</td><td>E,&nbsp;N:&nbsp;&nbsp;</td>" + "<td><input style='font-family:arial;font-size:10px;width:105px' readonly onclick='this.select();' value='" + Math.round(tmpWGS84.lon * 1000000) / 1000000 + ", " + Math.round(tmpWGS84.lat * 1000000) / 1000000 + "'></td></tr></table>" + "<div id='toolCoordinatesPickerDisplayLabel' style='font-family:arial;font-size:10px;'>" + gLocalizer.localize("TOOL_COORDINATES_COPY_PASTE") + "</div>";
        var geometryT = new Object();
        geometryT.persistence = gogisGeoObjects.PERSISTENCE_TMP;
        geometryT.status = gogisGeoObjects.STATUS_READONLY;
        geometryT.id = "currentCoordinates||Text";
        geometryT.type = gogisGeoObjects.GEOMETRY_LABEL;
        geometryT.points = points;
        geometryT.color = "#333333";
        geometryT.bgcolor = "#ffffff";
        geometryT.opacity = 80;
        geometryT.size = 10;
        geometryT.text = html;
        geometryT.isComplex = true;
        geometryT.disableEvents = true;
        geometryT.allowHTML = true;
        geometryT.classCSS = "toolCoordinatesPickerDisplay";
        geometryT.styleCSS = {
            borderWidth: gogisApplication.HIGHLIGHT_SIZE + "px",
            borderStyle: "solid",
            borderColor: gogisApplication.HIGHLIGHT_BORDERCOLOR,
            padding: "3px"
        };
        myGeoObjects.addGeometry(geometryT);
        myGeoObjects.getGeometry("currentCoordinates||Text").labelCanvas.onmouseup = function(e) {
            e = (e) ? e : ((event) ? event : null);
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            return false;
        };
    } else {
        setCurrentCoordinates(Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10);
    }
    var geometryP = new Object();
    geometryP.persistence = gogisGeoObjects.PERSISTENCE_TMP;
    geometryP.status = gogisGeoObjects.STATUS_READONLY;
    geometryP.id = "currentCoordinates||Pointer";
    geometryP.type = gogisGeoObjects.GEOMETRY_ICON;
    geometryP.points = points;
    geometryP.opacity = 100;
    geometryP.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
    geometryP.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
    geometryP.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
    geometryP.isComplex = true;
    myGeoObjects.addGeometry(geometryP);
    if (!hasGPS || !myGeolocationService.running) myUpdateCoords(p[0], p[1]);
    return false;
};
gogisCoordinatesTool.prototype.onmousemove = function(e) {
    e = (e) ? e : ((event) ? event : null);
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var a = this.adjustPixPosition(x, y);
    var p = this.kaMap.pixToGeo(a[0], a[1]);
    this.kaMap.triggerEvent(KAMAP_MOUSE_TRACKER, {
        x: p[0],
        y: p[1]
    });
    return false;
};
var gogisCurrentUID = null;
var geoViewerIsReady = false;
var gogisSearchExternIsActive = 0;
var geoViewerFirstTimeStartup = true;
var gogisThemeDefaultLayers = null;
var gogisDefaultLayerControlWidth = gogisDefaultServiceWidth = null;
var gogisDebugWindow = gogisDebugDocument = gogisDebugMessages = null;
var startupObject = queryParams = queryCountObj = currentToolId = null;
var updateCoordinatesDisabled = false;
var myKaMap = myKaNavigator = myKaRubberZoom = myKaQuery = null;
var myScalebar = myKaKeymap = myXmlOverlay = myHotspot = null;
var myGeoObjects = myHighlightObjects = myOverlayGraphics = null;
var myToolbox = myAutocompleteBox = myTouchZoom = null;
var myCoordinatesTool = myMeasureTool = myRedlineTool = null;
var myMeasureService = myRedlineService = myPrintService = myContent = null;
var myTooltipManager = myPropertyEditor = myPlugInLoader = myPlugInCanvas = null;
var myToaster = myAppLoader = myDefaultText = myDefaultPin = null;
var myUrl = myUpdateLinkProcess = myUpdateCoordsProcess = null;
var myGeolocationService = myGeolocationCursor = null;
var mySearchDialogWindow = mySearchResultDialogWindow = myDetailDialogWindow = null;
var myLayersDialogWindow = myLegendDialogWindow = myHelpDialogWindow = null;
var myPrintDialogWindow = myMeasureDialogWindow = myRedlineDialogWindow = null;
var myAboutDialogWindow = null;
var myQueryToolbar = myMeasureToolbar = myRedlineToolbar = myCoordinatesToolbar = null;

function myOnLoad() {
    initDHTMLAPI();
    window.onresize = drawPage;
    if (gogisDebugOn == true) {
        gogisDebugWindow = window.open("gogis/html/debug.html", "name", 'resizable=1,scrollbars=1,height=400,width=600');
        gogisDebugDocument = gogisDebugWindow.document;
        gogisDebugMessages = new StringBuffer();
        debug("<b>GOGIS Debugger (v0.1)</b><br><br>");
    }
    if (gogisIsIntranet == false) {
        document.getElementById("gogisIntranetServices").style.display = "none";
    }
    gogisCurrentBaseUrl = 'http:/' + '/' + window.location.host + gogisCurrentBaseUrl;
    myQueueManager = new GogisQueueManager("myQueueManager", gogisApplication.APP_QUEUE_DELAYTIME[gogisCurrentInstance]);
    myProgressObserver = new GogisProgressObserver();
    myProgressObserver.add(GogisQueueManager);
    myProgressObserver.add(GogisRequestObject);
    myKaMap = new kaMap('viewport');
    myKaKeymap = new kaKeymap(myKaMap, 'keymap');
    myKaNavigator = new kaNavigator(myKaMap);
    myKaRubberZoom = new kaRubberZoom(myKaMap);
    myKaQuery = new kaQuery(myKaMap, KAMAP_RECT_QUERY);
    myGeoObjects = new gogisGeoObjects(myKaMap, 5000);
    myHighlightObjects = new gogisGeoObjects(myKaMap, 1240);
    myOverlayGraphics = new gogisGeoObjects(myKaMap, 1230, true);
    myMeasureTool = new gogisMeasureTool(myKaMap);
    myRedlineTool = new gogisRedlineTool(myKaMap, myGeoObjects);
    myCoordinatesTool = new gogisCoordinatesTool(myKaMap);
    myKaTracker = new kaMouseTracker(myKaMap);
    myScalebar = new ScaleBar(1);
    myScalebar.divisions = 4;
    myScalebar.subdivisions = 2;
    myScalebar.minWidth = 150;
    myScalebar.maxWidth = 180;
    myScalebar.place('scalebar');
    myToaster = new GogisToaster(getRawObject('viewport'), "myToaster", 20000, 10000, gogisApplication.TOOLTIP_RELEASETIME);
    if (appLoader > "") {
        myAppLoader = new GogisToaster(getRawObject('viewport'), "myAppLoader", 20001, 10000, gogisApplication.TOOLTIP_RELEASETIME);
    }
    myTooltipManager = new GogisTooltipManager(myKaMap, gLocalizer, "myTooltipManager", gogisApplication.TOOLTIP_RELEASETIME);
    myPropertyEditor = new GogisPropertyEditor(myKaMap, gLocalizer, "myPropertyEditor", 2 * gogisApplication.TOOLTIP_RELEASETIME);
    myHotspot = new gogisHotspot();
    if (hasGPS) {
        myGeolocationService = new GogisGeolocationService("myGeolocationService");
        myGeolocationCursor = new GogisGeolocationCursor(myKaMap, myGeolocationService, myUpdateCoords);
    }
    myKaMap.registerForEvent(KAMAP_MAP_INITIALIZED, null, myMapInitialized);
    myKaMap.registerForEvent(KAMAP_SCALE_CHANGED, null, myScaleChanged);
    myKaMap.registerForEvent(KAMAP_EXTENTS_CHANGED, null, myExtentChanged);
    myKaMap.registerForEvent(KAMAP_QUERY, null, myQuery);
    myKaMap.registerForEvent(KAMAP_MOUSE_TRACKER, null, myMouseMoved);
    myXmlOverlay = new kaXmlOverlay(myKaMap, 1250);
    myGUISetup();
    myPlugInCanvas = document.getElementById("gogisPlugIns");
    if (gogisPlugIns > "") {
        if (gogisApplication.DEFAULT_PLUGINS && gogisApplication.DEFAULT_PLUGINS[gogisCurrentInstance] > "") gogisPlugIns = gogisApplication.DEFAULT_PLUGINS[gogisCurrentInstance] + "," + gogisPlugIns;
    } else gogisPlugIns = gogisApplication.DEFAULT_PLUGINS[gogisCurrentInstance];
    if (gogisPlugIns > "") {
        myPlugInLoader = new GogisPlugInLoader("gogis/plugins/", !gogisDebugNoCompress);
        var plugIns = gogisPlugIns.split(",");
        for (i = 0; i < plugIns.length; i++) {
            myPlugInLoader.loadPlugIn(plugIns[i]);
        }
    } else myPlugInCanvas.style.display = "none";
    if (gogisFrameworkInstance > "" && document.getElementById('gogisSearchExternField').options.length > 0) {
        var switcher = getRawObject('gogisSearchSwitcher').style.display = "inline";
    }
    myKaMap.resetCustomTool = function() {};
    myKaMap.initializationState = 1;
    if (typeof gogisApplication.PRELOADING_CONTENT != 'undefined' && !gogisApplication.PRELOADING_CONTENT) {
        var requestObj = new GogisRequestObject();
        requestObj.action = myInitialized;
        requestObj.sendRequest(gogisApplication.INIT);
    } else myInitialized(gogisApplication.INIT);
}

function myMapInitialized(eventID, mapName) {
    myGogisOverlay.setup(myKaMap);
    if (gogisPlugIns > "") {
        myPlugInLoader.initPlugIns("myPlugInLoader", "myKaMap", "myPlugInCanvas");
        myPlugInLoader.startPlugIns("myPlugInLoader");
    }
    myKaTracker.activate();
}

function myInitialized(szInit) {
    if (szInit.substr(0, 1) != "/") return false;
    eval(szInit);
    myKaMap.initializationState = 2;
    switchMode('toolPan');
    if (gogisDefaultText.length > 0 && gogisDefaultText[0] > '') setMyDefaultText();
    if (gogisDefaultPin.length > 0 && gogisDefaultPin[0] > '') setMyDefaultPin();
    if (typeof(startupGeometry) != 'undefined') {
        if (startupGeometry.type == gogisGeoObjects.GEOMETRY_ICON) {
            startupGeometry.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
            startupGeometry.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
            startupGeometry.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
        }
        startupGeometry.opacity = gogisApplication.HIGHLIGHT_OPACITY;
        startupGeometry.size = parseInt(gogisApplication.HIGHLIGHT_SIZE);
        startupGeometry.color = gogisApplication.HIGHLIGHT_BORDERCOLOR;
        startupGeometry.bgcolor = gogisApplication.HIGHLIGHT_BGCOLOR;
        myGeoObjects.addGeometry(startupGeometry);
    }
    if (hasGPS) {
        if (gogisGPSAutostart) myGeolocationService.start();
        if (myGeolocationService.running) {
            getRawObject('toolGPS').className = 'toolGPSDown';
        } else {
            getRawObject('toolGPS').className = 'toolGPS';
        }
    } else {
        document.getElementById("toolGPS").style.display = "none";
    }
    if (startupObject != null) {
        var searchText = (startupObject.search + "").replace(/xxxx/g, "'").replace(/yyyy/g, '"');
        if (startupObject.cmd == "geometry") {
            gogisSearchFieldValue = searchText;
            if (gogisDefaultLayers.length == 0) gogisDefaultLayers = new Array();
            gogisDefaultLayers.push(startupObject.layer);
            if (gogisSearchHighlight) setAutocompleteResponseHighlight(startupObject);
            if (gogisShowTooltip && myKaMap.getCurrentMap().getLayer(startupObject.layer).tooltip) {
                if (gogisSlideTooltip) myKaMap.slideBy(-myKaMap.viewportWidth / 4, -myKaMap.viewportHeight / 4);
                setTimeout('myTooltipManager.showTooltip(-1, "idName=' + startupObject.idName + '&idValue=' + startupObject.id + '&LayerName=' + startupObject.layer + '&instance=' + gogisCurrentInstance + '&map=' + szMap + '",' + (startupObject.minx + startupObject.maxx) / 2 + ',' + (startupObject.miny + startupObject.maxy) / 2 + ');', (gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME && gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME >= 0 ? gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME : gogisApplication.TOOLTIP_RELEASETIME));
            }
        } else if (startupObject.cmd == "searchlist") {
            autocompleteDetailsIsActive = false;
            autocompleteListIsActive = true;
            gogisTabControlChange(2, true);
            gogisSearchFieldValue = searchText;
            getSearchResultList(gogisApplication.SEARCHRESULTLIST_NAVIGATION_LIMIT, 0, '');
        }
    }
}

function myAfterInitalize() {
    myScalebar.update(myKaMap.getCurrentScale());
    gogisDefaultLayers = "";
    geoViewerIsReady = true;
    if (!gogisApplication.BASEMAP_LEGEND || gogisApplication.BASEMAP_LEGEND[gogisCurrentInstance] == false) myLegendPanRefresh();
    myServicePanRefresh();
    if (!myGeoObjects.loadGeometries(szCOIDs)) updateLinkToView();
    myKaKeymap.update(null, myKaMap.getGeoExtents());
    geoViewerFirstTimeStartup = false;
    myProgressObserver.check();
    if (appLoader > "") {
        myAppLoader.showToast(appLoader);
        myAppLoader.toastElement.style.top = (getObjectHeight(getRawObject("viewportToolbar")) + (screenType == "-small" ? 14 : 18)) + 'px';
        myAppLoader.toastElement.style.bottom = 'auto';
    }
}

function setMyDefaultPin() {
    var pos = gogisDefaultPin[0].split(",");
    var isComplex = ((myDefaultText && myDefaultText.isComplex) ? true : false);
    if (isNaN(pos[0].trim()) || isNaN(pos[1].trim())) {
        var extents = myKaMap.getGeoExtents();
        pos[0] = parseInt(Math.round((extents[2] + extents[0]) / 2));
        pos[1] = parseInt(Math.round((extents[3] + extents[1]) / 2));
    } else {
        pos[0] = parseInt(pos[0].trim());
        pos[1] = parseInt(pos[1].trim());
    }
    var points = new Array();
    points.push(pos);
    myDefaultPin = new Object();
    myDefaultPin.persistence = gogisGeoObjects.PERSISTENCE_TMP;
    myDefaultPin.status = gogisGeoObjects.STATUS_READONLY;
    myDefaultPin.id = "customMarker||Pin";
    myDefaultPin.type = gogisGeoObjects.GEOMETRY_ICON;
    myDefaultPin.points = points;
    myDefaultPin.opacity = 100;
    myDefaultPin.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
    myDefaultPin.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
    myDefaultPin.isComplex = isComplex;
    var tmpPin = gogisApplication.HIGHLIGHT_SYMBOL.split("-");
    if (gogisDefaultPin.length > 1 && in_array(myCustomColors, gogisDefaultPin[1].trim().toLowerCase())) {
        myDefaultPin.iconName = tmpPin[0] + "-" + gogisDefaultPin[1].trim().toLowerCase() + "-" + tmpPin[2];
    } else if (in_array(myCustomColors, gogisDefaultPin[0].trim().toLowerCase())) {
        myDefaultPin.iconName = tmpPin[0] + "-" + gogisDefaultPin[0].trim().toLowerCase() + "-" + tmpPin[2];
    } else myDefaultPin.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
    myGeoObjects.addGeometry(myDefaultPin);
}

function setMyDefaultText() {
    var pos = gogisDefaultText[0].split(",");
    var posPin = gogisDefaultPin[0].split(",");
    var isComplex = false;
    var html = "";
    var offset = 0;
    if (isNaN(pos[0].trim()) || isNaN(pos[1].trim())) {
        isComplex = ((gogisDefaultPin.length > 0 && gogisDefaultPin[0] > '' && (isNaN(posPin[0].trim()) || isNaN(posPin[1].trim()))) ? true : false);
        var extents = myKaMap.getGeoExtents();
        pos[0] = parseInt(Math.round((extents[2] + extents[0]) / 2));
        pos[1] = parseInt(Math.round((extents[3] + extents[1]) / 2));
        html = gogisDefaultText[0];
    } else {
        isComplex = ((gogisDefaultPin.length > 0 && gogisDefaultPin[0] > '' && (isNaN(posPin[0].trim()) || isNaN(posPin[1].trim()) || (pos[0].trim() == posPin[0].trim() && pos[1].trim() == posPin[1].trim()))) ? true : false);
        pos[0] = parseInt(pos[0].trim());
        pos[1] = parseInt(pos[1].trim());
        if (gogisDefaultText[1] && (gogisDefaultText[1] + "").trim() > "") html = (gogisDefaultText[1] + "").trim();
        offset = 1;
    }
    var isHtml = ((html.charAt(0) == "<" && html.charAt(html.length - 1) == ">") ? true : false);
    var isIFrame = ((isHtml && html.toLowerCase().indexOf("iframe") >= 0) ? true : false);
    var points = new Array();
    points.push(pos);
    myDefaultText = new Object();
    myDefaultText.persistence = gogisGeoObjects.PERSISTENCE_TMP;
    myDefaultText.status = gogisGeoObjects.STATUS_READONLY;
    myDefaultText.id = "customMarker||Text";
    myDefaultText.type = gogisGeoObjects.GEOMETRY_LABEL;
    myDefaultText.points = points;
    myDefaultText.text = html;
    myDefaultText.isComplex = isComplex;
    myDefaultText.disableEvents = ((isHtml && !isIFrame) ? true : false);
    myDefaultText.allowHTML = isHtml;
    myDefaultText.color = (gogisDefaultText[1 + offset] ? safeHtmlColor(gogisDefaultText[1 + offset]) : "#333333");
    myDefaultText.bgcolor = (gogisDefaultText[2 + offset] ? safeHtmlColor(gogisDefaultText[2 + offset]) : "#ffffff");
    myDefaultText.size = (gogisDefaultText[3 + offset] ? gogisDefaultText[3 + offset] : 12);
    if (gogisDefaultText[4 + offset] || isComplex) myDefaultText.offsetx = (gogisDefaultText[4 + offset] ? gogisDefaultText[4 + offset] : -2);
    if (gogisDefaultText[5 + offset] || isComplex) myDefaultText.offsety = (gogisDefaultText[5 + offset] ? gogisDefaultText[5 + offset] : -4);
    myGeoObjects.addGeometry(myDefaultText);
    if (isHtml && !isIFrame) {
        myGeoObjects.getGeometry(myDefaultText.id).labelCanvas.onmouseup = function(e) {
            e = (e) ? e : ((event) ? event : null);
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            return false;
        };
    }
}

function myGUISetup() {
    document.getElementById("gogisMainProgressIconFinished").style.display = "none";
    document.getElementById("gogisMainProgressIconActive").style.display = "inline";
    if ((browser_name.toLowerCase() == 'android' || browser_os.toLowerCase() == 'android') && browser_version < 3) touchScroll(getRawObject('legendLayers'));
    var vpToolbar = getRawObject("viewportToolbar");
    if (getObjectHeight(vpToolbar) == 0 || !gogisToolbarOn) vpToolbar.style.display = 'none';
    else loadToolbar();
    if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
        var viewport = getRawObject('viewport');
        var vpFooter = getRawObject('viewportFooter');
        getRawObject('gogisTabControlContent1').removeChild(vpFooter);
        viewport.appendChild(vpFooter);
        var layoutFrm = getRawObject('layoutFrame');
        var hlpContainer = getRawObject('gogisProgressHelpContainer');
        layoutFrm.removeChild(hlpContainer);
        viewport.appendChild(hlpContainer);
        var login = getRawObject('gogisLoginControl');
        if (login) {
            layoutFrm.removeChild(login);
            viewport.appendChild(login);
        }
    }
    if ((gogisApplication.SHOW_LEGEND && gogisApplication.SHOW_LEGEND[gogisCurrentInstance] == false) || (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true)) {
        var lControl = getRawObject('gogisLayerControl');
        getRawObject('mapLegend').style.width = "1px";
        lControl.style.width = "1px";
        getRawObject('gogisLayerControlCell').style.width = "1px";
        lControl.style.visibility = "hidden";
        getRawObject('gogisLayerControlExpander').style.display = "none";
        getRawObject('gogisChooseLayersTitle').style.display = "none";
    }
    if ((gogisApplication.SHOW_SERVICE && gogisApplication.SHOW_SERVICE[gogisCurrentInstance] == false) || (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true)) {
        var service = getRawObject('service');
        if (browser_isMobile) {
            service.style.display = "none";
        } else {
            service.style.width = "1px";
            service.style.visibility = "hidden";
        }
        var expander = getRawObject('gogisServiceExpander');
        if (expander) expander.style.display = "none";
        getRawObject('keymap').style.display = "none";
    }
    if (gogisApplication.DYN_LEGEND && gogisApplication.DYN_LEGEND[gogisCurrentInstance] == false) {
        document.getElementById("gogisTabControlTab5").className = "gogisTabControlTabDisabled";
        document.getElementById("gogisTabControlTd5").style.display = "none";
        document.getElementById("gogisTabControlTdSpacer5").style.display = "";
    }
    drawPage();
    if (browser_isMobile) {
        var viewport = getRawObject('viewport');
        myToolbox = new GogisTouchToolbox("myToolbox", viewport, "myToolbox", -1, gogisApplication.TOOLTIP_RELEASETIME);
        myAutocompleteBox = new GogisTouchToolbox("myAutocompleteBox", getRawObject('viewport'), "myAutocompleteBox", 15 * gogisApplication.TOOLTIP_RELEASETIME, gogisApplication.TOOLTIP_RELEASETIME);
        myTouchZoom = new GogisTouchZoom("myTouchZoom", viewport);
    } else {
        if (!gogisApplication.SHOW_TOOL_ZOOM || gogisApplication.SHOW_TOOL_ZOOM[gogisCurrentInstance]) myKaZoomer = new kaZoomer(myKaMap);
    }
}

function testToolbarOnOptions() {
    console.log("testToolbarOnOptions");
}

function myServicePanRefresh() {
    if (!geoViewerIsReady) return;
    var layoutFrameHeight = getInsideWindowHeight();
    var pageHeaderHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerHeader')));
    var pageFooterHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerFooter')));
    var serviceContent = getRawObject('gogisServiceContentDisplay');
    getRawObject('service').style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight + "px";
    serviceContent.style.height = layoutFrameHeight - pageFooterHeight - findPosY(serviceContent) + "px";
}

function myLegendPanRefresh() {
    if (!geoViewerIsReady || browser_isMobile) return;
    var layoutFrameHeight = getInsideWindowHeight();
    var vpToolbar = getRawObject("viewportToolbar");
    var pageHeaderHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerHeader'))) + (vpToolbar && getObjectHeight(vpToolbar) > 0 ? parseInt(getObjectHeight(vpToolbar)) : 0);
    var pageFooterHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerFooter')));
    var customDialogHeight = (myLayersDialogWindow ? parseInt(getObjectHeight(getRawObject('viewportFooter'))) + 48 - 10 : 0);
    var tabsHeight = parseInt(getObjectHeight(getRawObject('gogisTabControlTabs')));
    var lMapHeight = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight - customDialogHeight;
    getRawObject('mapLegend').style.height = lMapHeight + "px";
    var lLayersHeight = lMapHeight - parseInt(getObjectHeight(getRawObject('mapLegendHeader'))) - parseInt(getObjectHeight(getRawObject('legendLayersAction')));
    var lBMLayers = getRawObject('legendBaseMapLayers');
    var lBMLayersHeight = getObjectHeight(lBMLayers);
    if (lBMLayersHeight > 10 && (getRawObject('gogisChooseLayersTitle').style.visibility == "hidden") && (getRawObject('legendBaseMapLayers').style.display != "none")) {
        getRawObject('legendLayers').style.height = 0 + "px";
        lBMLayers.style.height = (lLayersHeight + lBMLayersHeight) + "px";
    } else getRawObject('legendLayers').style.height = lLayersHeight + "px";
}

function myMouseMoved(eventID, position) {
    if (geoViewerIsReady) {
        if (myHotspot.mouseoverdelay != null) {
            clearTimeout(myHotspot.mouseoverdelay);
            myHotspot.mouseoverdelay = setTimeout("myHotspot.mouseoverdelayed()", gogisApplication.UPDATEHOTSPOT_DELAYTIME);
        }
        if (myUpdateCoordsProcess != null) {
            clearTimeout(myUpdateCoordsProcess);
        }
        if (!updateCoordinatesDisabled && (!hasGPS || !myGeolocationService.running)) {
            myUpdateCoordsProcess = setTimeout("myUpdateCoords(" + position.x + "," + position.y + ");", gogisApplication.UPDATECOORDS_DELAYTIME);
        }
    }
}

function myUpdateCoords(x, y) {
    if (x == null || y == null) {
        document.getElementById("geoPositionProjX").value = '';
        document.getElementById("geoPositionProjY").value = '';
        document.getElementById("geoPositionWgsLon").value = '';
        document.getElementById("geoPositionWgsLat").value = '';
    } else {
        var coords = myCoordTransform(x, y);
        document.getElementById("geoPositionProjX").value = roundIt(x, 1);
        document.getElementById("geoPositionProjY").value = roundIt(y, 1);
        document.getElementById("geoPositionWgsLon").value = coords.lon_deg + "°" + coords.lon_min + "'" + coords.lon_sec + "''";
        document.getElementById("geoPositionWgsLat").value = coords.lat_deg + "°" + coords.lat_min + "'" + coords.lat_sec + "''";
    }
}

function myCoordTransform(sysX, sysY) {
    var coords = new Object();
    if (sysX == null || sysY == null) {
        coords.lon = '';
        coords.lat = '';
        coords.lon_deg = null;
        coords.lat_deg = null;
        coords.lon_min = null;
        coords.lat_min = null;
        coords.lon_sec = null;
        coords.lat_sec = null;
    } else {
        coords.lon = CHtoWGSlng(sysX, sysY);
        coords.lat = CHtoWGSlat(sysX, sysY);
        coords.lon_deg = parseInt(coords.lon);
        coords.lat_deg = parseInt(coords.lat);
        var tmp_lon_min = (coords.lon - coords.lon_deg) * 60;
        var tmp_lat_min = (coords.lat - coords.lat_deg) * 60;
        coords.lon_min = parseInt(tmp_lon_min);
        coords.lat_min = parseInt(tmp_lat_min);
        coords.lon_sec = roundIt((tmp_lon_min - coords.lon_min) * 60, 2);
        coords.lat_sec = roundIt((tmp_lat_min - coords.lat_min) * 60, 2);
    }
    return coords;
}

function updateLinkToView() {
    if (geoViewerIsReady) {
        if (myUpdateLinkProcess != null) clearTimeout(myUpdateLinkProcess);
        myUpdateLinkProcess = setTimeout("updateLinkToViewDelayed();", gogisApplication.UPDATELINK_DELAYTIME);
    }
}

function updateLinkToViewDelayed() {
    var extents = myKaMap.getGeoExtents();
    var cx = Math.round((extents[2] + extents[0]) / 2 * 100) / 100;
    var cy = Math.round((extents[3] + extents[1]) / 2 * 100) / 100;
    var instanceURL = "instance=" + ((gogisApplication.LINKTOVIEW_MASHUP_PARENT && gogisApplication.LINKTOVIEW_MASHUP_PARENT[gogisCurrentInstance] > "") ? gogisApplication.LINKTOVIEW_MASHUP_PARENT[gogisCurrentInstance] : (gogisDefaultInstance ? gogisDefaultInstance : gogisCurrentInstance));
    var themeURL = "&theme=" + gogisCurrentTheme;
    var cpsURL = "";
    var tmpDefaultCPS = gogisDefaultCPS.split(",");
    if (!(tmpDefaultCPS[2] == myKaMap.getCurrentScale() && Math.abs(tmpDefaultCPS[0] - cx) < 1 && Math.abs(tmpDefaultCPS[1] - cy) < 1)) {
        cpsURL = '&cps=' + cx + ',' + cy + ',' + myKaMap.getCurrentScale();
    }
    var pluginsURL = "";
    if (myPlugInLoader && myPlugInLoader.plugIns.length > 0) {
        var tmpPlugIns = new Array();
        for (var iP = 0; iP < myPlugInLoader.plugIns.length; iP++) {
            if (!(gogisApplication.DEFAULT_PLUGINS[gogisCurrentInstance].indexOf(myPlugInLoader.plugIns[iP]) >= 0)) tmpPlugIns.push(myPlugInLoader.plugIns[iP]);
        }
        pluginsURL = (tmpPlugIns.length > 0 ? '&plugins=' + tmpPlugIns.join(",") : '');
    }
    var uidURL = ((gogisCurrentUID && gogisCurrentUID > '') ? '&uid=' + gogisCurrentUID : '');
    var allLayer = (gogisGetVisibleLayers(false, false).toLowerCase()).trim();
    var allLayerArr = allLayer.split('||');
    var hasSpecialLayers = false;
    for (var iTmpTDefLayer = 0; iTmpTDefLayer < gogisThemeDefaultLayers.length; iTmpTDefLayer++) {
        if (!in_array(allLayerArr, gogisThemeDefaultLayers[iTmpTDefLayer])) {
            hasSpecialLayers = true;
            break;
        }
    }
    var layers = gogisGetVisibleLayers(!hasSpecialLayers, true);
    layers = layers.replace(/,/g, ';');
    var tmpLayers = layers.split('||');
    var shortLayers = '';
    for (var iLayer = 0; iLayer < tmpLayers.length; iLayer++) {
        if (shortLayers != '') shortLayers += ',';
        shortLayers += tmpLayers[iLayer].replace(/^LAYEROBJ_/, "").replace(/^LO_/, "").toLowerCase();
    }
    var layersURL = ((shortLayers > '') ? ((hasSpecialLayers ? '&nodefault' : '') + '&layers=' + shortLayers) : '');
    var coids = myGeoObjects.getGeometryIds();
    var coidsURL = ((coids > '') ? ('&coids=' + coids) : '');
    var srhlURL = "";
    var searchURL = "";
    var tooltipURL = "";
    var pinURL = "";
    var textURL = "";
    if (myDefaultPin && myGeoObjects.getGeometry(myDefaultPin.id) != null) pinURL = "&pin=" + getQueryParam('pin');
    if (myDefaultText && myGeoObjects.getGeometry(myDefaultText.id) != null) textURL = "&text=" + getQueryParam('text');
    if (autocompleteHighlightId != null && document.getElementById("gogisTabControlTab2").className != "gogisTabControlSelectedTab") {
        srhlURL = '&srhl=' + autocompleteHighlightLayer + "||" + autocompleteHighlightId;
        if (myTooltipManager.isAppended) tooltipURL = "&tooltip=on";
    } else if (autocompleteListIsActive && gogisSearchFieldValue.trim() > "") {
        searchURL = "&search=" + gogisSearchFieldValue;
    }
    tmpLayers = gogisGetVisibleLayers(false).split('||');
    var oMap = myKaMap.getCurrentMap();
    var strFilter = "";
    var tmpFilters = new Array();
    var tmpFilter, tF;
    for (var iLayer = 0; iLayer < tmpLayers.length; iLayer++) {
        if (tmpLayers[iLayer].trim() > "") {
            tmpFilter = oMap.getLayer(tmpLayers[iLayer]).filter;
            if (tmpFilter) {
                tmpFilters[tmpFilter.name] = tmpFilter;
            }
        }
    }
    for (var tF in tmpFilters) {
        strFilter += (strFilter > "" ? ";" : "") + tF;
        for (var iFilter = 0; iFilter < tmpFilters[tF].fields.length; iFilter++) {
            strFilter += "," + tmpFilters[tF].fields[iFilter].replacename + "|" + document.getElementById(tmpFilters[tF].name + "_" + tmpFilters[tF].fields[iFilter].replacename).getAttribute("currentValue") + "|" + tmpFilters[tF].fields[iFilter].type;
        }
    }
    var url = gogisCurrentBaseUrl + "?";
    url += (instanceURL.indexOf("default") >= 0 || !getQueryParam('instance') > "" ? "" : instanceURL);
    url += "&language=$$$";
    url += (gogisDefaultTheme != gogisCurrentTheme ? themeURL : "");
    url += cpsURL;
    url += searchURL;
    url += pluginsURL;
    url += coidsURL;
    url += srhlURL;
    url += tooltipURL;
    url += pinURL;
    url += textURL;
    url += uidURL;
    url += (strFilter > "" ? "&filter=" + strFilter : "");
    url += layersURL;
    url = url.replace("?&", "?");
    if (gogisApplication.LINKTOVIEW_REPLACE && gogisApplication.LINKTOVIEW_REPLACE[gogisCurrentInstance] && gogisApplication.LINKTOVIEW_REPLACE[gogisCurrentInstance] > "") {
        var urlReplace = gogisApplication.LINKTOVIEW_REPLACE[gogisCurrentInstance].split("|");
        url = url.replace(urlReplace[0], urlReplace[1]);
    }
    if (gogisApplication.LINKTOVIEW_MASHUP_PARENT && gogisApplication.LINKTOVIEW_MASHUP_PARENT[gogisCurrentInstance] > "") {
        var linkCanvas = getRawObject('mashupLink');
        if (linkCanvas) linkCanvas.href = url.replace("$$$", gogisCurrentLanguage);
        myUrl = linkCanvas.href;
        linkCanvas = getRawObject('mashupLogo');
        var tmptt = url.match(/\/\/[^:/]+/);
        if (linkCanvas) linkCanvas.title = tmptt[0].replace("/" + "/", "");
        linkCanvas = getRawObject('mashupLinkText');
        if (linkCanvas) {
            linkCanvas.title = "GeoViewer " + tmptt[0].replace("/" + "/", "");
        }
    } else {
        var linkCanvas = getRawObject('gogisCurrentUrl');
        if (linkCanvas) {
            if (gogisCurrentLanguage == "de") {
                var tUrl = url.replace("&language=$$$", "");
                tUrl = tUrl.replace("language=$$$", "");
                if (tUrl.indexOf("?") == tUrl.length - 1) tUrl = tUrl.replace("index.php?", "");
                tUrl = tUrl.replace("?&", "?");
                linkCanvas.value = tUrl;
            } else linkCanvas.value = url.replace("$$$", gogisCurrentLanguage);
            myUrl = linkCanvas.value;
        }
        linkCanvas = getRawObject('gogisLanguageSelectorLink_de');
        if (linkCanvas) linkCanvas.href = url.replace("$$$", "de");
        linkCanvas = getRawObject('gogisLanguageSelectorLink_en');
        if (linkCanvas) linkCanvas.href = url.replace("$$$", "en");
        linkCanvas = getRawObject('gogisLanguageSelectorLink_fr');
        if (linkCanvas) linkCanvas.href = url.replace("$$$", "fr");
        linkCanvas = getRawObject('gogisLanguageSelectorLink_it');
        if (linkCanvas) linkCanvas.href = url.replace("$$$", "it");
    }
}

function myExtentChanged(eventID, extents) {
    if (geoViewerIsReady) {
        if (myKaMap.theZoomLayer) myKaMap.theZoomLayer.suspended = false;
        myQueueManager.dequeue("myGogisOverlay.drawAllLayers");
        if (gogisApplication.CUT_LARGE_GEOOBJECTS && gogisApplication.CUT_LARGE_GEOOBJECTS[gogisCurrentInstance] == true) {
            myQueueManager.dequeue("gogisGeoObjects.redrawAllInstances");
            myOverlayGraphics.singleGraphicsObserver.reset();
        }
        myQueueManager.dequeue("myUpdateKeymap");
        myQueueManager.dequeue("updateLinkToView");
        myQueueManager.dequeue("myGogisOverlay.cleanup");
        if (GogisQueueManager.lastResetId != GogisQueueManager.currentStackId) {
            var GQMInstance;
            for (var i = 0; i < GogisQueueManager.managers.length; i++) {
                GQMInstance = GogisQueueManager.managers[i].instance;
                if (GQMInstance != "myQueueManager" && GQMInstance != "myXmlOverlay.overlayEventMapObserver" && GQMInstance.indexOf("singleGraphicsObserver") < 0) GogisQueueManager.managers[i].reset();
            }
        }
        myHighlightObjects.removeGeometry("myHighlightGeometry");
        if (gogisSearchFieldValue.split('=')[0].toLowerCase() == gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() && gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == false) {
            autocompleteListIsActive = false;
            autocompleteDetailsIsActive = false;
            gogisTabControlChange(1, true);
        }
        myQueueManager.enqueue("myGogisOverlay.drawAllLayers", "myGogisOverlay.drawAllLayers", extents[0] + "|" + extents[1] + "|" + extents[2] + "|" + extents[3], null);
        if (gogisApplication.CUT_LARGE_GEOOBJECTS && gogisApplication.CUT_LARGE_GEOOBJECTS[gogisCurrentInstance] == true) {
            myQueueManager.enqueue("gogisGeoObjects.redrawAllInstances", "gogisGeoObjects.redrawAllInstances", null, null);
        }
        myQueueManager.enqueue("gogisDigitizer.resetAllInstances", "gogisDigitizer.resetAllInstances", null, null);
        myQueueManager.enqueue("myUpdateKeymap", "myUpdateKeymap", null, null);
        myQueueManager.enqueue("updateLinkToView", "updateLinkToView", null, null);
        myQueueManager.enqueue("myGogisOverlay.cleanup", "myGogisOverlay.cleanup", null, null);
    }
}

function myUpdateKeymap() {
    myKaKeymap.update(null, myKaMap.getGeoExtents());
}

function myLegendSetup() {
    gogisLegendSetup(myKaMap.getCurrentMap().getAllLayers());
}

function myXmlScaleChanged() {
    myXmlOverlay.scaleChanged(null, null);
}

function myScaleChanged(eventID, scale) {
    if (geoViewerIsReady) {
        if (GogisQueueManager.lastResetId != GogisQueueManager.currentStackId) {
            var GQMInstance;
            for (var i = 0; i < GogisQueueManager.managers.length; i++) {
                GQMInstance = GogisQueueManager.managers[i].instance;
                if (GQMInstance != "myXmlOverlay.overlayEventMapObserver" && GQMInstance.indexOf("singleGraphicsObserver") < 0) GogisQueueManager.managers[i].reset();
            }
        }
        if (myKaMap.triggerTimeout != null) {
            clearTimeout(myKaMap.triggerTimeout);
            myKaMap.triggerTimeout != null;
        }
        if (myXmlOverlay.overlayCanvas) myXmlOverlay.overlayCanvas.style.visibility = "hidden";
        myOverlayGraphics.clearGraphics();
        myHighlightObjects.removeGeometry("myHighlightGeometry");
        if (gogisSearchFieldValue.split('=')[0].toLowerCase() == gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() && gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == false) {
            autocompleteListIsActive = false;
            autocompleteDetailsIsActive = false;
            gogisTabControlChange(1, true);
        }
        if (gogisMapThemes[gogisCurrentTheme].mapfile != szMap) {
            var cScale = myKaMap.getCurrentScale();
            gogisPreviouseMap = szMap;
            szMap = gogisMapThemes[gogisCurrentTheme].mapfile;
            myKaMap.currentMap = szMap;
            myKaMap.getCurrentMap().currentScale = myKaMap.getScale(cScale);
            myKaMap.setBackgroundColor(myKaMap.getCurrentMap().backgroundColor);
            myKaKeymap.draw();
            if (!gogisApplication.SHOW_TOOL_ZOOM || gogisApplication.SHOW_TOOL_ZOOM[gogisCurrentInstance]) myKaZoomer.draw();
        }
        myQueueManager.enqueue("gogisSetupBasemaps", "gogisSetupBasemaps", null, null);
        myQueueManager.enqueue("myLegendSetup", "myLegendSetup", null, null);
        myQueueManager.enqueue("gogisGeoObjects.redrawAllInstances", "gogisGeoObjects.redrawAllInstances", null, null);
        myQueueManager.enqueue("gogisDigitizer.resetAllInstances", "gogisDigitizer.resetAllInstances", null, null);
        if (!geoViewerFirstTimeStartup && myKaMap.theZoomLayer) {
            myQueueManager.enqueue("myKaMap.resetZoomLayer", "myKaMap.resetZoomLayer", null, null);
        }
        myQueueManager.enqueue("myXmlScaleChanged", "myXmlScaleChanged", null, null);
        myQueueManager.enqueue("myScalebar.update", "myScalebar.update", scale, null);
        myQueueManager.enqueue("myUpdateKeymap", "myUpdateKeymap", null, null);
        myQueueManager.enqueue("updateLinkToView", "updateLinkToView", null, null);
        myQueueManager.enqueue("myGogisOverlay.cleanup", "myGogisOverlay.cleanup", null, null);
        setupPrintDialog(myKaMap.getCurrentMap());
    }
}

function myQuery(eventID, queryType, coords) {
    myHotspot.mouseclickedcancled = true;
    if (queryCountObj == null) {
        queryCountObj = new GogisRequestObject();
        queryCountObj.action = handleMyQueryCountResponse;
    }
    var querystring = gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES") + "=";
    if (queryType == KAMAP_RECT_QUERY) {
        querystring += Math.round(coords[0]) + "|" + Math.round(coords[1]) + "|";
        querystring += Math.round(coords[2]) + "|" + Math.round(coords[3]);
    } else {
        var oMap = myKaMap.getCurrentMap();
        var def_tol = 0.01;
        if (gogisMapThemes[gogisCurrentTheme].themeInfo && gogisMapThemes[gogisCurrentTheme].themeInfo >= 0) def_tol = gogisMapThemes[gogisCurrentTheme].themeInfo;
        var tmp_tolerance = (myKaMap.getCurrentScale() / (oMap.aScales[oMap.aScales.length - 1])) * def_tol;
        querystring += (Math.round(coords[0]) - tmp_tolerance) + "|" + (Math.round(coords[1]) - tmp_tolerance) + "|";
        querystring += (Math.round(coords[0]) + tmp_tolerance) + "|" + (Math.round(coords[1]) + tmp_tolerance);
    }
    gogisSearchFieldValue = querystring;
    var tmp_theme = ((gogisApplication.SEARCH_CURRENT_THEME && gogisApplication.SEARCH_CURRENT_THEME[gogisCurrentInstance] == false) ? "-1" : gogisCurrentTheme);
    var url = 'gogis/php/getAutoCompleteSearchResult.php?searchstring=' + encodeURIComponent(querystring.toLowerCase()) + '&limit=2&offset=0&instance=' + gogisCurrentInstance + '&map=' + szMap + '&theme=' + tmp_theme;
    queryCountObj.sendRequest(url);
}

function handleMyQueryCountResponse(response) {
    if (response && !isIntNegative(response)) {
        var jsonDoc = eval('(' + response + ')');
        if (jsonDoc.root && jsonDoc.root.length > 1) {
            gogisLegendSearchResultList(gogisSearchFieldValue);
        } else if (jsonDoc.root && jsonDoc.root.length == 1 && (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance]))) {
            autocompleteListIsActive = false;
            sendAutocompleteRequestDetails(jsonDoc.root[0].searchresultlayeridname, jsonDoc.root[0].searchresultlayeridvalue, jsonDoc.root[0].searchresultlayername, true);
        }
    }
}

function mySortLayers(a, b) {
    return a.index - b.index;
}

function drawPage() {
    var browserWidth = getInsideWindowWidth();
    var browserHeight = getInsideWindowHeight();
    if (browser_isMobile) {
        var nViewH = window.outerHeight;
        if (browser_plattform.toLowerCase() == 'android' && nViewH - 5 > browserHeight) {
            nViewH = nViewH / window.devicePixelRatio;
            browserHeight = nViewH;
            window.scrollTo(0, 1);
        } else if ((browser_plattform.toLowerCase() == 'iphone' || browser_plattform.toLowerCase() == 'ipod') && !window.navigator.standalone) {
            if ((browserWidth > browserHeight && !((window.outerHeight - 5) < window.innerHeight))) {
                browserHeight = window.innerHeight + 60;
                setTimeout(function() {
                    window.scrollTo(0, 0);
                }, 0);
            }
        }
    }
    var viewport = getRawObject('viewport');
    var viewportFooter = getRawObject('viewportFooter');
    var page = getRawObject('page');
    var layoutFrame = getRawObject('layoutFrame');
    var pageHeaderHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerHeader')));
    var pageFooterHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerFooter')));
    var serviceWidth = parseInt(getObjectWidth(getRawObject('service')));
    var tabsHeight = parseInt(getObjectHeight(getRawObject('gogisTabControlTabs')));
    var tabControl = getRawObject('gogisTabControl');
    var tabControlMinWidth = parseInt(tabControl.style.minWidth);
    var tabControlTab1 = getRawObject('gogisTabControlContent1');
    var tabControlTab2 = getRawObject('gogisTabControlContent2');
    var tabControlTab3 = getRawObject('gogisTabControlContent3');
    var tabControlTab4 = getRawObject('gogisTabControlContent4');
    var tabControlTab5 = getRawObject('gogisTabControlContent5');
    var searchList = getRawObject('gogisAutocompleteList');
    var searchCategories = getRawObject('gogisAutocompleteCategories');
    var searchNavigation = getRawObject('gogisAutocompleteNavigation');
    var searchDetailsHeader = getRawObject('gogisSearchResultDetailsHeader');
    var searchDetailsFooter = getRawObject('gogisSearchResultDetailsFooter');
    var searchDetailsContent = getRawObject('gogisSearchResultDetailsContent');
    var searchExternFooter = getRawObject('gogisSearchExternFooter');
    var searchExternContent = getRawObject('gogisSearchExternContent');
    var legendDetailsHeader = getRawObject('gogisLegendDetailsHeader');
    var legendDetailsFooter = getRawObject('gogisLegendDetailsFooter');
    var legendDetailsContent = getRawObject('gogisLegendDetailsContent');
    var layerControlWidth = parseInt(getObjectWidth(getRawObject('gogisLayerControl')));
    var content = getRawObject('content');
    var contentBackground = getRawObject('contentBackground');
    var contentText = getRawObject('contentText');
    page.style.width = browserWidth + "px";
    page.style.height = browserHeight + "px";
    layoutFrame.style.width = browserWidth + "px";
    layoutFrame.style.height = browserHeight + "px";
    var layoutFrameWidth = browserWidth;
    var layoutFrameHeight = browserHeight;
    if (layoutFrameWidth - serviceWidth < tabControlMinWidth) {
        tabControl.style.width = tabControlMinWidth + "px";
        tabControlTab1.style.width = tabControlMinWidth + "px";
        tabControlTab2.style.width = tabControlMinWidth + "px";
        tabControlTab3.style.width = tabControlMinWidth + "px";
        tabControlTab4.style.width = tabControlMinWidth + "px";
        tabControlTab5.style.width = tabControlMinWidth + "px";
    } else {
        tabControl.style.width = layoutFrameWidth - serviceWidth + "px";
        tabControlTab1.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 3 + "px";
        tabControlTab2.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 3 + "px";
        tabControlTab3.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 3 + "px";
        tabControlTab4.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 3 + "px";
        tabControlTab5.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 3 + "px";
    }
    tabControl.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight + "px";
    tabControlTab1.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight - 10 + "px";
    tabControlTab1.style.top = tabsHeight + pageHeaderHeight + (pageFooterHeight + tabsHeight == 0 ? 5 : 10) + "px";
    tabControlTab2.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight + "px";
    tabControlTab2.style.top = tabsHeight + pageHeaderHeight + 1 + "px";
    tabControlTab3.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight + "px";
    tabControlTab3.style.top = tabsHeight + pageHeaderHeight + 1 + "px";
    tabControlTab4.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight + "px";
    tabControlTab4.style.top = tabsHeight + pageHeaderHeight + 1 + "px";
    tabControlTab5.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight + "px";
    tabControlTab5.style.top = tabsHeight + pageHeaderHeight + 1 + "px";
    searchList.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight - parseInt(getObjectHeight(searchNavigation)) - parseInt(getObjectHeight(searchCategories)) - 10 - 10 - 10 - 23 + "px";
    searchList.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 12 - 30 - 3 + "px";
    searchDetailsContent.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight - parseInt(getObjectHeight(searchDetailsHeader)) - parseInt(getObjectHeight(searchDetailsFooter)) - 10 - 10 - 10 - 23 + "px";
    searchDetailsContent.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 12 - 30 - 3 + "px";
    searchExternContent.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight - parseInt(getObjectHeight(searchExternFooter)) - 23 + "px";
    searchExternContent.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 12 - 10 - 3 + "px";
    legendDetailsContent.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight - parseInt(getObjectHeight(legendDetailsHeader)) - parseInt(getObjectHeight(legendDetailsFooter)) - 10 - 10 - 10 - 23 + "px";
    legendDetailsContent.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 12 - 30 - 3 + "px";
    var vpToolbar = getRawObject("viewportToolbar");
    var vpToolbarHeight = getObjectHeight(vpToolbar);
    if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
        tabControlTab1.style.top = "0px";
        tabControlTab1.style.width = layoutFrameWidth + "px";
        tabControlTab1.style.height = layoutFrameHeight + "px";
        viewport.style.left = '0px';
        viewport.style.width = layoutFrameWidth + "px";
        viewport.style.height = layoutFrameHeight + "px";
        viewportFooter.style.width = parseInt(getObjectWidth(viewport)) + "px";
        try {
            content.style.left = 3 + "px";
            content.style.top = parseInt(vpToolbarHeight + 5) + "px";
            content.style.width = parseInt(viewport.style.width) - 8 + "px";
            content.style.height = parseInt(viewport.style.height) - vpToolbarHeight - 10 + "px";
            contentBackground.style.height = parseInt(viewport.style.height) - vpToolbarHeight - 10 + "px";
            contentText.style.height = parseInt(viewport.style.height) - vpToolbarHeight - 48 - 10 + "px";
            contentText.style.width = parseInt(viewport.style.width) - 12 - 8 + "px";
        } catch (e) {}
    } else {
        if (layoutFrameWidth - layerControlWidth - serviceWidth < parseInt(viewport.style.minWidth)) {
            viewport.style.width = parseInt(viewport.style.minWidth) - 10 - (layerControlWidth + serviceWidth == 0 ? 0 : 4) - (getRawObject('gogisLayerControlExpander').className == 'gogisLayerControlExpanderCollapse' ? 10 : 2) + (browser_name == 'Firefox' ? 2 : 0) + (!getRawObject('gogisServiceExpander') || getRawObject('gogisServiceExpander').className == 'gogisServiceExpanderCollapse' ? 0 : 5) + "px";
        } else {
            viewport.style.width = layoutFrameWidth - layerControlWidth - serviceWidth - 10 - (layerControlWidth + serviceWidth == 0 ? 0 : 4) - (getRawObject('gogisLayerControlExpander').className == 'gogisLayerControlExpanderCollapse' ? 10 : 2) + (browser_name == 'Firefox' ? 2 : 0) + (!getRawObject('gogisServiceExpander') || getRawObject('gogisServiceExpander').className == 'gogisServiceExpanderCollapse' ? 0 : 5) + "px";
        }
        viewport.style.height = layoutFrameHeight - pageHeaderHeight - pageFooterHeight - tabsHeight - 10 - (browser_name != 'Firefox' ? 2 : 0) - getObjectHeight(viewportFooter) + "px";
        viewportFooter.style.width = parseInt(getObjectWidth(viewport)) + "px";
        if (!getRawObject('gogisServiceExpander') || getRawObject('gogisServiceExpander').className == 'gogisServiceExpanderCollapse') viewport.style.left = '10px';
        else viewport.style.left = '5px';
        try {
            content.style.width = parseInt(viewport.style.width) - 20 + "px";
            content.style.height = parseInt(viewport.style.height) - vpToolbarHeight - 20 + "px";
            content.style.left = serviceWidth + 20 + "px";
            content.style.top = tabsHeight + pageHeaderHeight + vpToolbarHeight + 20 + "px";
            contentBackground.style.height = parseInt(viewport.style.height) - vpToolbarHeight - 20 + "px";
            contentText.style.height = parseInt(viewport.style.height) - vpToolbarHeight - 65 + "px";
            contentText.style.width = parseInt(viewport.style.width) - 50 + "px";
        } catch (e) {}
    }
    if (vpToolbarHeight > 0) vpToolbar.style.width = parseInt(viewport.style.width) + "px";
    myToaster.redrawToast();
    drawPageObjects();
    myLegendPanRefresh();
    myServicePanRefresh();
    myKaMap.resize();
}

function drawPageObjects() {
    var viewport = getRawObject('viewport');
    var vpToolbarHeight = parseInt(getObjectHeight(getRawObject("viewportToolbar")));
    var vpFooterHeight = parseInt(getObjectHeight(getRawObject("viewportFooter")));
    var pageHeaderHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerHeader')));
    var pageFooterHeight = parseInt(getObjectHeight(getRawObject('gogisGeoViewerFooter')));
    var tabsHeight = parseInt(getObjectHeight(getRawObject('gogisTabControlTabs')));
    var serviceWidth = parseInt(getObjectWidth(getRawObject('service')));
    var layerControlWidth = parseInt(getObjectWidth(getRawObject('gogisLayerControl')));
    var scaleReferenceHeight = parseInt(getObjectHeight(getRawObject('scaleReference')));
    if (typeof GogisTouchToolbar != 'undefined') GogisTouchToolbar.resize(getObjectWidth(viewport), getObjectHeight(viewport) - vpToolbarHeight - vpFooterHeight, vpToolbarHeight, 0);
    if (typeof GogisTouchToolbox != 'undefined') GogisTouchToolbox.resize(getObjectWidth(viewport), getObjectHeight(viewport) - vpToolbarHeight - vpFooterHeight, vpToolbarHeight, 0);
    if (typeof GogisTouchSelectbox != 'undefined') GogisTouchSelectbox.resize(getObjectWidth(viewport), getObjectHeight(viewport), 0, 0);
    if (typeof GogisTouchZoom != 'undefined') GogisTouchZoom.resize(scaleReferenceHeight, 19);
    if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
        var searchListCont = getRawObject('gogisAutocompleteListContent');
        if (searchListCont && mySearchResultDialogWindow) {
            var searchCategoriesCont = getRawObject('gogisAutocompleteCategoriesContent');
            var searchNavigationCont = getRawObject('gogisAutocompleteNavigationContent');
            searchListCont.style.height = (mySearchResultDialogWindow.height ? mySearchResultDialogWindow.height : parseInt(viewport.style.height) - vpToolbarHeight - vpFooterHeight - 8) - (screenType == "-small" ? 48 : 62) - parseInt(getObjectHeight(searchCategoriesCont)) - parseInt(getObjectHeight(searchNavigationCont)) - 20 + "px";
            searchListCont.style.width = (mySearchResultDialogWindow.width ? mySearchResultDialogWindow.width : parseInt(viewport.style.width) - 8) - 12 - 20 + "px";
        }
    }
    var isLeft, isTop, windowFooterHeight;
    for (var i = 0; i < GogisDialogWindow.observers.length; i++) {
        if (GogisDialogWindow.observers[i].visible) {
            isLeft = (GogisDialogWindow.observers[i].position == GogisDialogWindow.POSITION_TOPLEFT || GogisDialogWindow.observers[i].position == GogisDialogWindow.POSITION_BOTTOMLEFT);
            isTop = (GogisDialogWindow.observers[i].position == GogisDialogWindow.POSITION_TOPLEFT || GogisDialogWindow.observers[i].position == GogisDialogWindow.POSITION_TOPRIGHT);
            windowFooterHeight = (GogisDialogWindow.observers[i].htmlFooter ? getObjectHeight(GogisDialogWindow.observers[i].htmlFooter) : 0);
            if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
                try {
                    if (isLeft) GogisDialogWindow.observers[i].htmlContainer.style.left = 3 + "px";
                    else GogisDialogWindow.observers[i].htmlContainer.style.right = 3 + "px";
                    if (isTop) {
                        GogisDialogWindow.observers[i].htmlContainer.style.top = parseInt(vpToolbarHeight + 3) + "px";
                        GogisDialogWindow.observers[i].htmlContainer.style.bottom = "auto";
                    } else {
                        GogisDialogWindow.observers[i].htmlContainer.style.bottom = parseInt(vpFooterHeight + 3) + "px";
                        GogisDialogWindow.observers[i].htmlContainer.style.top = "auto";
                    }
                    if (GogisDialogWindow.observers[i].isMinimized) {
                        GogisDialogWindow.observers[i].htmlContainer.style.width = 238 + "px";
                        GogisDialogWindow.observers[i].htmlText.style.width = 238 - 12 + "px";
                        GogisDialogWindow.observers[i].htmlTitle.style.width = 238 - 42 - 10 + "px";
                        GogisDialogWindow.observers[i].htmlContainer.style.height = 38 + "px";
                        GogisDialogWindow.observers[i].htmlBackground.style.height = 38 + "px";
                        GogisDialogWindow.observers[i].htmlText.style.visibility = 'hidden';
                    } else {
                        GogisDialogWindow.observers[i].htmlContainer.style.width = (GogisDialogWindow.observers[i].width ? GogisDialogWindow.observers[i].width : parseInt(viewport.style.width) - 8) + "px";
                        GogisDialogWindow.observers[i].htmlText.style.width = (GogisDialogWindow.observers[i].width ? GogisDialogWindow.observers[i].width : parseInt(viewport.style.width) - 8) - 12 + "px";
                        GogisDialogWindow.observers[i].htmlTitle.style.width = (GogisDialogWindow.observers[i].width ? GogisDialogWindow.observers[i].width : parseInt(viewport.style.width) - 8) - 42 + (GogisDialogWindow.observers[i].minmax ? -10 : 0) + "px";
                        GogisDialogWindow.observers[i].htmlText.style.visibility = 'visible';
                        if (GogisDialogWindow.observers[i].height != 'auto') {
                            GogisDialogWindow.observers[i].htmlContainer.style.height = (GogisDialogWindow.observers[i].height ? GogisDialogWindow.observers[i].height : parseInt(viewport.style.height) - vpToolbarHeight - vpFooterHeight - 8) + "px";
                            GogisDialogWindow.observers[i].htmlBackground.style.height = (GogisDialogWindow.observers[i].height ? GogisDialogWindow.observers[i].height : parseInt(viewport.style.height) - vpToolbarHeight - vpFooterHeight - 8) + "px";
                            GogisDialogWindow.observers[i].htmlText.style.height = (GogisDialogWindow.observers[i].height ? GogisDialogWindow.observers[i].height : parseInt(viewport.style.height) - vpToolbarHeight - vpFooterHeight - 8) - (screenType == "-small" ? 40 : 54) - 8 - windowFooterHeight + "px";
                        } else {
                            GogisDialogWindow.observers[i].htmlContainer.style.height = parseInt(getObjectHeight(GogisDialogWindow.observers[i].htmlText)) + windowFooterHeight + (screenType == "-small" ? 40 : 54) + 6 + "px";
                            GogisDialogWindow.observers[i].htmlBackground.style.height = parseInt(getObjectHeight(GogisDialogWindow.observers[i].htmlText)) + windowFooterHeight + (screenType == "-small" ? 40 : 54) + 6 + "px";
                        }
                    }
                    if (GogisDialogWindow.observers[i].htmlFooter) GogisDialogWindow.observers[i].htmlFooter.style.width = parseInt(GogisDialogWindow.observers[i].htmlText.style.width) + "px";
                } catch (e) {}
            } else {
                try {
                    if (isLeft) GogisDialogWindow.observers[i].htmlContainer.style.left = serviceWidth + 20 + "px";
                    else GogisDialogWindow.observers[i].htmlContainer.style.right = layerControlWidth + 20 + "px";
                    if (isTop) GogisDialogWindow.observers[i].htmlContainer.style.top = tabsHeight + pageHeaderHeight + vpToolbarHeight + 20 + "px";
                    else GogisDialogWindow.observers[i].htmlContainer.style.bottom = pageFooterHeight + vpFooterHeight + 20 + "px";
                    if (GogisDialogWindow.observers[i].isMinimized) {
                        GogisDialogWindow.observers[i].htmlContainer.style.width = GogisDialogWindow.observers[i].width + "px";
                        GogisDialogWindow.observers[i].htmlText.style.width = GogisDialogWindow.observers[i].width - 30 + "px";
                        GogisDialogWindow.observers[i].htmlTitle.style.width = GogisDialogWindow.observers[i].width - 60 - 10 + "px";
                        GogisDialogWindow.observers[i].htmlContainer.style.height = 38 + "px";
                        GogisDialogWindow.observers[i].htmlBackground.style.height = 38 + "px";
                        GogisDialogWindow.observers[i].htmlText.style.visibility = 'hidden';
                    } else {
                        GogisDialogWindow.observers[i].htmlContainer.style.width = (GogisDialogWindow.observers[i].width ? GogisDialogWindow.observers[i].width : parseInt(viewport.style.width) - 20) + "px";
                        GogisDialogWindow.observers[i].htmlText.style.width = (GogisDialogWindow.observers[i].width ? GogisDialogWindow.observers[i].width : parseInt(viewport.style.width) - 20) - 30 + "px";
                        GogisDialogWindow.observers[i].htmlTitle.style.width = (GogisDialogWindow.observers[i].width ? GogisDialogWindow.observers[i].width : parseInt(viewport.style.width) - 20) - 60 + (GogisDialogWindow.observers[i].minmax ? -10 : 0) + "px";
                        GogisDialogWindow.observers[i].htmlText.style.visibility = 'visible';
                        GogisDialogWindow.observers[i].htmlContainer.style.height = (GogisDialogWindow.observers[i].height ? GogisDialogWindow.observers[i].height : parseInt(viewport.style.height) - vpToolbarHeight - vpFooterHeight - 20) + "px";
                        GogisDialogWindow.observers[i].htmlBackground.style.height = (GogisDialogWindow.observers[i].height ? GogisDialogWindow.observers[i].height : parseInt(viewport.style.height) - vpToolbarHeight - vpFooterHeight - 20) + "px";
                        GogisDialogWindow.observers[i].htmlText.style.height = (GogisDialogWindow.observers[i].height ? GogisDialogWindow.observers[i].height : parseInt(viewport.style.height) - vpToolbarHeight - vpFooterHeight - 20) - 40 - 8 - windowFooterHeight + "px";
                    }
                    if (GogisDialogWindow.observers[i].htmlFooter) GogisDialogWindow.observers[i].htmlFooter.style.width = parseInt(GogisDialogWindow.observers[i].htmlText.style.width) + "px";
                } catch (e) {}
            }
        }
    }
}

function showContentHtml(html) {
    var contentText = getRawObject('contentText');
    contentText.innerHTML = html;
    var content = getRawObject('content');
    content.style.display = "inline";
}

function showContent(url) {
    var content = getRawObject('content');
    content.style.display = "inline";
    var scroll = ((arguments.length >= 4 && arguments[3] == true) ? "auto" : "no");
    if (arguments.length >= 2 && arguments[1] == true) {
        getRawObject('contentText').innerHTML = "<iframe id='gogisContentIFrame' src='" + url + "' " + "frameborder='no' scrolling='" + scroll + "' width='100%' height='100%'>";
        if (dd.ie && ((parseFloat(navigator.appVersion.split("MSIE")[1] < 7) ? true : false))) setTimeout("refreshIframeContent();", 300);
        return;
    }
    if (myContent == null) myContent = new Array();
    var reqUrl;
    if (arguments.length >= 3 && arguments[2] == true) {
        reqUrl = "ajaxProxy.php?url=" + url;
    } else reqUrl = url;
    if (myContent[reqUrl.toLowerCase()] == null) {
        var requestObj = new GogisRequestObject();
        requestObj.url = reqUrl.toLowerCase();
        requestObj.action = setContent;
        requestObj.sendRequest(reqUrl);
    } else {
        var contentText = getRawObject('contentText');
        contentText.innerHTML = myContent[url.toLowerCase()];
    }
}

function refreshIframeContent() {
    var iFrm = document.getElementById('gogisContentIFrame');
    var iFrmDoc = iFrm.contentDocument || iFrm.contentWindow.document;
    if (!iFrmDoc.body || !(("" + iFrmDoc.body.innerHTML).trim() > "")) {
        iFrm.src = iFrm.src;
    }
}

function setContent(szContent) {
    var contentText = getRawObject('contentText');
    myContent[this.url] = szContent;
    contentText.innerHTML = szContent;
}

function hideContent() {
    var content = getRawObject('content');
    content.style.display = "none";
}

function switchMode(id) {
    isKaTouch = false;
    if (id != null) currentToolId = id;
    var tmpBtn;
    if (id == 'toolPan') {
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPicker';
        tmpBtn = getRawObject('btnToolCoordinates');
        if (tmpBtn) tmpBtn.className = 'btnToolCoordinates';
        myGeoObjects.removeGeometry("currentCoordinates", true);
        myKaMap.resetCustomTool();
        if (gogisMapThemes[gogisCurrentTheme].themeInfo && gogisMapThemes[gogisCurrentTheme].themeInfo == -1) myHotspot.disable();
        else myHotspot.enable();
        kaMultitouchHandler.preventDefault = false;
        myKaNavigator.activate();
        if (myXmlOverlay.overlayEventImage) {
            myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
            myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
        }
        getRawObject('toolPan').className = 'toolPanDown';
        getRawObject('toolZoomRubber').className = 'toolZoomRubber';
        getRawObject('toolQuery').className = 'toolQuery';
        getRawObject('toolMeasure').className = 'toolMeasure';
        tmpBtn = getRawObject('btnToolMeasure');
        if (tmpBtn) tmpBtn.className = 'btnToolMeasure';
        getRawObject('toolRedline').className = 'toolRedline';
        tmpBtn = getRawObject('btnToolRedline');
        if (tmpBtn) tmpBtn.className = 'btnToolRedline';
        tmpBtn = getRawObject('btnToolQuery');
        if (tmpBtn) tmpBtn.className = 'btnToolQuery';
        hideMeasureDialogService();
        hideRedlineDialogService();
        hidePrintDialogService();
        document.getElementById('gogisServiceLink').style.display = "inline";
        myServicePanRefresh();
    } else if (id == 'toolZoomRubber') {
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPicker';
        myGeoObjects.removeGeometry("currentCoordinates", true);
        myKaMap.resetCustomTool();
        if (gogisMapThemes[gogisCurrentTheme].themeInfo && gogisMapThemes[gogisCurrentTheme].themeInfo == -1) myHotspot.disable();
        else myHotspot.enable();
        kaMultitouchHandler.preventDefault = true;
        myKaRubberZoom.activate();
        if (myXmlOverlay.overlayEventImage) {
            myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
            myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
        }
        getRawObject('toolPan').className = 'toolPan';
        getRawObject('toolZoomRubber').className = 'toolZoomRubberDown';
        getRawObject('toolQuery').className = 'toolQuery';
        getRawObject('toolMeasure').className = 'toolMeasure';
        getRawObject('toolRedline').className = 'toolRedline';
        hideMeasureDialogService();
        hideRedlineDialogService();
        hidePrintDialogService();
        document.getElementById('gogisServiceLink').style.display = "inline";
        myServicePanRefresh();
    } else if (id == 'toolQuery') {
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPicker';
        tmpBtn = getRawObject('btnToolCoordinates');
        if (tmpBtn) tmpBtn.className = 'btnToolCoordinates';
        myGeoObjects.removeGeometry("currentCoordinates", true);
        myKaMap.resetCustomTool();
        if (!gogisMapThemes[gogisCurrentTheme].themeInfo) {
            kaMultitouchHandler.preventDefault = false;
            myHotspot.enable();
            myKaQuery.activate();
        } else if (gogisMapThemes[gogisCurrentTheme].themeInfo >= 0) {
            kaMultitouchHandler.preventDefault = true;
            myHotspot.disable();
            myKaQuery.activate();
        } else {
            kaMultitouchHandler.preventDefault = true;
            myHotspot.disable(true);
            myKaQuery.activate(true);
        }
        if (myXmlOverlay.overlayEventImage) {
            myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
            myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
        }
        getRawObject('toolPan').className = 'toolPan';
        getRawObject('toolZoomRubber').className = 'toolZoomRubber';
        getRawObject('toolQuery').className = 'toolQueryDown';
        getRawObject('toolMeasure').className = 'toolMeasure';
        getRawObject('toolRedline').className = 'toolRedline';
        tmpBtn = getRawObject('btnToolMeasure');
        if (tmpBtn) tmpBtn.className = 'btnToolMeasure';
        tmpBtn = getRawObject('btnToolRedline');
        if (tmpBtn) tmpBtn.className = 'btnToolRedline';
        tmpBtn = getRawObject('btnToolQuery');
        if (tmpBtn) tmpBtn.className = 'btnToolQueryDown';
        hideMeasureDialogService();
        hideRedlineDialogService();
        hidePrintDialogService();
        document.getElementById('gogisServiceLink').style.display = "inline";
        myServicePanRefresh();
    } else if (id == 'toolMeasure') {
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPicker';
        tmpBtn = getRawObject('btnToolCoordinates');
        if (tmpBtn) tmpBtn.className = 'btnToolCoordinates';
        myGeoObjects.removeGeometry("currentCoordinates", true);
        myKaMap.resetCustomTool();
        kaMultitouchHandler.preventDefault = true;
        myHotspot.disable();
        myMeasureTool.activate();
        if (myXmlOverlay.overlayEventImage) {
            myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
            myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
        }
        getRawObject('toolPan').className = 'toolPan';
        getRawObject('toolZoomRubber').className = 'toolZoomRubber';
        getRawObject('toolQuery').className = 'toolQuery';
        getRawObject('toolMeasure').className = 'toolMeasureDown';
        tmpBtn = getRawObject('btnToolMeasure');
        if (tmpBtn) tmpBtn.className = 'btnToolMeasureDown';
        getRawObject('toolRedline').className = 'toolRedline';
        tmpBtn = getRawObject('btnToolRedline');
        if (tmpBtn) tmpBtn.className = 'btnToolRedline';
        tmpBtn = getRawObject('btnToolQuery');
        if (tmpBtn) tmpBtn.className = 'btnToolQuery';
        hideRedlineDialogService();
        hidePrintDialogService();
        document.getElementById('gogisServiceLink').style.display = "none";
        showMeasureDialogService();
    } else if (id == 'toolRedline') {
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPicker';
        tmpBtn = getRawObject('btnToolCoordinates');
        if (tmpBtn) tmpBtn.className = 'btnToolCoordinates';
        myGeoObjects.removeGeometry("currentCoordinates", true);
        myKaMap.resetCustomTool();
        kaMultitouchHandler.preventDefault = true;
        myHotspot.disable();
        myRedlineTool.activate();
        if (myXmlOverlay.overlayEventImage) {
            myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
            myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
        }
        getRawObject('toolPan').className = 'toolPan';
        getRawObject('toolZoomRubber').className = 'toolZoomRubber';
        getRawObject('toolQuery').className = 'toolQuery';
        getRawObject('toolMeasure').className = 'toolMeasure';
        tmpBtn = getRawObject('btnToolMeasure');
        if (tmpBtn) tmpBtn.className = 'btnToolMeasure';
        getRawObject('toolRedline').className = 'toolRedlineDown';
        tmpBtn = getRawObject('btnToolRedline');
        if (tmpBtn) tmpBtn.className = 'btnToolRedlineDown';
        tmpBtn = getRawObject('btnToolQuery');
        if (tmpBtn) tmpBtn.className = 'btnToolQuery';
        hideMeasureDialogService();
        hidePrintDialogService();
        document.getElementById('gogisServiceLink').style.display = "none";
        showRedlineDialogService();
    } else if (id == 'toolPrint') {
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPicker';
        myGeoObjects.removeGeometry("currentCoordinates", true);
        myKaMap.resetCustomTool();
        getRawObject('toolPan').className = 'toolPan';
        getRawObject('toolZoomRubber').className = 'toolZoomRubber';
        getRawObject('toolQuery').className = 'toolQuery';
        getRawObject('toolMeasure').className = 'toolMeasure';
        getRawObject('toolRedline').className = 'toolRedline';
        hideMeasureDialogService();
        hideRedlineDialogService();
        document.getElementById('gogisServiceLink').style.display = "none";
        showPrintDialogService();
    } else {
        myHotspot.disable();
        document.kaCurrentTool.deactivate();
        getRawObject('toolPan').className = 'toolPan';
        getRawObject('toolZoomRubber').className = 'toolZoomRubber';
        getRawObject('toolQuery').className = 'toolQuery';
        getRawObject('toolMeasure').className = 'toolMeasure';
        getRawObject('toolRedline').className = 'toolRedline';
        hideMeasureDialogService();
        hideRedlineDialogService();
        hidePrintDialogService();
        document.getElementById('gogisServiceLink').style.display = "inline";
    }
    gogisTabControlChange(1);
}

function switchModeCoordinatesPicker(id) {
    var tmpBtn;
    if (id == 'toolCoordinatesPicker' && getRawObject('toolCoordinatesPicker').className == 'toolCoordinatesPicker') {
        switchMode(null);
        kaMultitouchHandler.preventDefault = true;
        myCoordinatesTool.activate();
        if (myXmlOverlay.overlayEventImage) {
            myXmlOverlay.overlayEventImage.style.cursor = myKaMap.theInsideLayer.style.cursor;
            myXmlOverlay.overlayEventImage.tmpCursor = myKaMap.theInsideLayer.style.cursor;
        }
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPickerDown';
        tmpBtn = getRawObject('btnToolCoordinates');
        if (tmpBtn) tmpBtn.className = 'btnToolCoordinatesDown';
        tmpBtn = getRawObject('btnToolMeasure');
        if (tmpBtn) tmpBtn.className = 'btnToolMeasure';
        tmpBtn = getRawObject('btnToolRedline');
        if (tmpBtn) tmpBtn.className = 'btnToolRedline';
        tmpBtn = getRawObject('btnToolQuery');
        if (tmpBtn) tmpBtn.className = 'btnToolQuery';
    } else {
        myGeoObjects.removeGeometry("currentCoordinates", true);
        getRawObject('toolCoordinatesPicker').className = 'toolCoordinatesPicker';
        tmpBtn = getRawObject('btnToolCoordinates');
        if (tmpBtn) tmpBtn.className = 'btnToolCoordinates';
        switchMode(currentToolId);
    }
}

function switchModeGPS(id) {
    if (id == 'toolGPS' && getRawObject('toolGPS').className == 'toolGPS') {
        myGeolocationService.start();
    } else {
        myGeolocationService.stop();
    }
    var tmpBtn = getRawObject('btnToolGPS');
    if (myGeolocationService.running) {
        getRawObject('toolGPS').className = 'toolGPSDown';
        if (tmpBtn) tmpBtn.className = 'btnToolGPSDown';
    } else {
        getRawObject('toolGPS').className = 'toolGPS';
        if (tmpBtn) tmpBtn.className = 'btnToolGPS';
    }
    return myGeolocationService.running;
}

function switchService() {
    var switcher = getRawObject('gogisServiceExpander');
    var service = getRawObject('service');
    var keymap = getRawObject('keymap');
    if (gogisDefaultServiceWidth == null) gogisDefaultServiceWidth = parseInt(getObjectWidth(service));
    if (switcher.className == 'gogisServiceExpanderCollapse') {
        switcher.className = 'gogisServiceExpanderExpand';
        service.style.width = "1px";
        service.style.visibility = "hidden";
        keymap.style.display = "none";
    } else {
        switcher.className = 'gogisServiceExpanderCollapse';
        service.style.width = gogisDefaultServiceWidth + "px";
        service.style.visibility = "visible";
        keymap.style.display = "";
    }
    drawPage();
}

function switchLegend() {
    var switcher = getRawObject('gogisLayerControlExpander');
    var lControlCell = getRawObject('gogisLayerControlCell');
    var lControl = getRawObject('gogisLayerControl');
    var mLegend = getRawObject('mapLegend');
    if (gogisDefaultLayerControlWidth == null) gogisDefaultLayerControlWidth = parseInt(getObjectWidth(lControl));
    if (switcher.className == 'gogisLayerControlExpanderCollapse') {
        switcher.className = 'gogisLayerControlExpanderExpand';
        getRawObject('gogisChooseLayersTitle').style.display = "none";
        lControl.style.visibility = "hidden";
        mLegend.style.width = "1px";
        lControl.style.width = "1px";
        lControlCell.style.width = "1px";
    } else {
        switcher.className = 'gogisLayerControlExpanderCollapse';
        lControlCell.style.width = gogisDefaultLayerControlWidth + "px";
        lControl.style.width = gogisDefaultLayerControlWidth + "px";
        mLegend.style.width = gogisDefaultLayerControlWidth + "px";
        lControl.style.visibility = "visible";
        getRawObject('gogisChooseLayersTitle').style.display = "";
    }
    drawPage();
}

function switchSearch() {
    var switcher = getRawObject('gogisSearchSwitcherLink');
    var content = getRawObject('gogisSearchExternContent');
    var sf = getRawObject('gogisSearchField');
    var sb = getRawObject('gogisSearchButton');
    var sfExt = getRawObject('gogisSearchExternField');
    var sbExt = getRawObject('gogisSearchExternButton');
    if (sf.style.display != "none") {
        gogisSearchExternIsActive = 1;
        switcher.innerHTML = "&laquo;" + gLocalizer.localize("LINK_SEARCH_STANDARD");
        switcher.title = gLocalizer.localize("TITLE_SEARCH_STANDARD");
        sf.style.display = "none";
        sb.style.display = "none";
        sfExt.style.display = "inline";
        sbExt.style.display = "inline";
        sfExt.focus();
    } else {
        gogisSearchExternIsActive = 0;
        switcher.innerHTML = gLocalizer.localize("LINK_SEARCH_EXTENDED") + "&raquo;";
        switcher.title = gLocalizer.localize("TITLE_SEARCH_EXTENDED");
        sf.style.display = "inline";
        sb.style.display = "inline";
        sfExt.style.display = "none";
        sbExt.style.display = "none";
        content.innerHTML = "&nbsp;";
        sf.focus();
        gogisTabControlChange(1, true);
    }
}

function showSearch(id) {
    var idNew = (gogisSearchExternIsActive == 1 ? getRawObject('gogisSearchExternField').value : id);
    gogisSearchExternIsActive = 2;
    gogisTabControlChange(4, true);
    if (idNew >= 0) {
        getRawObject('gogisSearchExternContent').innerHTML = "<iframe id='gogisSearchExternIFrame' src='" + gogisFrameworkPath + "search.asp?instance=" + gogisFrameworkInstance + "&idGenSearch=" + idNew + "' " + "frameborder='no' scrolling='no' width='100%' height='100%'>";
    }
}

function showPrintDialogService() {
    if (myPrintService == null) {
        var requestObj = new GogisRequestObject();
        requestObj.action = handlePrintDialogService;
        var url = 'gogis/php/get' + (browser_isMobile ? "Touch" : "") + 'PrintService.php?instance=' + gogisCurrentInstance + '&language=' + gogisCurrentLanguage;
        requestObj.sendRequest(url);
    } else {
        var service = document.getElementById("gogisServicePrint");
        service.style.display = "inline";
        getRawObject('toolPrint').className = 'toolPrintDown';
        myServicePanRefresh();
        setupPrintDialog(myKaMap.getCurrentMap());
    }
}

function hidePrintDialogService() {
    if (!browser_isMobile) getRawObject("gogisServicePrint").style.display = "none";
    getRawObject('toolPrint').className = 'toolPrint';
}

function handlePrintDialogService(response) {
    var service = document.getElementById("gogisServicePrint");
    var content = response.split("<!--break-->");
    service.innerHTML = content[0];
    if (content[1] && content[1].trim() > "") myPrintDialogWindow.setFooter(content[1].trim());
    if (content[2] && content[2].trim() > "") eval(content[2].trim());
    service.style.display = "block";
    getRawObject('toolPrint').className = 'toolPrintDown';
    myPrintService = "ON";
    var printformats = document.getElementById('printformat');
    if (printformats && printformats.options && !printformats.options[1]) {
        document.getElementById('printFormatRow').style.display = "none";
    }
    var printquality = document.getElementById('printquality');
    if (printquality && printquality.options && !printquality.options[1]) {
        document.getElementById('printQualityRow').style.display = "none";
    }
    var printcolors = document.getElementById('printcolors');
    if (printcolors && printcolors.options && !printcolors.options[1]) {
        document.getElementById('printColorsRow').style.display = "none";
    }
    setupPrintDialog(myKaMap.getCurrentMap());
}

function setupPrintDialog(cMap) {
    try {
        var scale = myKaMap.getCurrentScale();
        if (gogisApplication.PRINT_SELECTOR_MAXSCALE && gogisApplication.PRINT_SELECTOR_MAXSCALE[gogisCurrentInstance] && scale > gogisApplication.PRINT_SELECTOR_MAXSCALE[gogisCurrentInstance]) {
            var printscale = document.getElementById('printScaleRow');
            if (printscale) printscale.style.display = 'none';
            var printscaleline = document.getElementById('printScaleLineRow');
            if (printscaleline) printscaleline.style.display = 'none';
        } else {
            var printscales = document.getElementById('printscale');
            if (printscales) {
                if (printscales.parentObj) {
                    printscales.parentObj.reset();
                    for (var i = 0; i < cMap.printScales.length; i++) {
                        if (!(gogisApplication.PRINT_SELECTOR_MAXSCALE && gogisApplication.PRINT_SELECTOR_MAXSCALE[gogisCurrentInstance]) || gogisApplication.PRINT_SELECTOR_MAXSCALE[gogisCurrentInstance] >= cMap.printScales[i]) {
                            printscales.parentObj.add("1:" + formatNumber(cMap.printScales[i]), cMap.printScales[i], true, (cMap.printScales[i] == scale));
                        }
                    }
                } else {
                    var tmp_option = 0;
                    while (printscales.options[tmp_option]) {
                        printscales.options[tmp_option] = null;
                        tmp_option++;
                    }
                    while (printscales.firstChild) {
                        printscales.removeChild(printscales.firstChild);
                    }
                    tmpOption = 0;
                    for (var i = 0; i < cMap.printScales.length; i++) {
                        if (!(gogisApplication.PRINT_SELECTOR_MAXSCALE && gogisApplication.PRINT_SELECTOR_MAXSCALE[gogisCurrentInstance]) || gogisApplication.PRINT_SELECTOR_MAXSCALE[gogisCurrentInstance] >= cMap.printScales[i]) {
                            printscales.options[tmpOption] = new Option("1:" + formatNumber(cMap.printScales[i]), cMap.printScales[i], false, false);
                            if (cMap.printScales[i] == scale) {
                                printscales.options[tmpOption].selected = true;
                            }
                            tmpOption++;
                        }
                    }
                }
                var printscale = document.getElementById('printScaleRow');
                var printscaleline = document.getElementById('printScaleLineRow');
                if (printscale) {
                    if (printscales.options.length > 1) {
                        printscale.style.display = 'table-row';
                        if (printscaleline) printscaleline.style.display = 'table-row';
                    } else {
                        printscale.style.display = 'none';
                        if (printscaleline) printscaleline.style.display = 'none';
                    }
                }
            }
        }
        if (document.forms["print"]) document.forms["print"].scale.value = scale;
        if (geoViewerIsReady && !myPrintDialogWindow) myServicePanRefresh();
        else if (myPrintDialogWindow) drawPageObjects();
    } catch (e) {
        console.log(e);
    }
}

function setPrintScale() {
    var printscales = document.getElementById('printscale');
    document.forms["print"].scale.value = printscales.options[printscales.selectedIndex].value;
}

function printMap() {
    var extents = myKaMap.getGeoExtents();
    var printSubTitle = '';
    if (gogisApplication.BASEMAP_LEGEND && gogisApplication.BASEMAP_LEGEND[gogisCurrentInstance] == true) {
        var tmpBm = document.getElementById('basemaps');
        if (tmpBm.options[tmpBm.selectedIndex].value != 'none') printSubTitle = ' - ' + tmpBm.options[tmpBm.selectedIndex].text;
    }
    document.forms["print"].width.value = myKaMap.viewportWidth;
    document.forms["print"].height.value = myKaMap.viewportHeight;
    document.forms["print"].mapextent.value = parseInt(extents[0]) + ' ' + parseInt(extents[1]) + ' ' + parseInt(extents[2]) + ' ' + parseInt(extents[3]);
    document.forms["print"].text.value = encodeURIComponent(gogisMapThemes[gogisCurrentTheme].namePlain + printSubTitle);
    document.forms["print"].layers.value = gogisGetVisibleLayers(false, true);
    document.forms["print"].coids.value = myGeoObjects.getGeometryIds();
    document.forms["print"].map.value = szMap;
    document.forms["print"].cache.value = (browser_os == 'android' ? 1 : 0);
    var tmpLayers = document.forms["print"].layers.value.split('||');
    var oMap = myKaMap.getCurrentMap();
    var strFilter = "";
    var tmpFilters = new Array();
    var tmpFilter, tF;
    for (var iLayer = 0; iLayer < tmpLayers.length; iLayer++) {
        if (tmpLayers[iLayer].trim() > "") {
            tmpFilter = oMap.getLayer(tmpLayers[iLayer].split(',')[0]).filter;
            if (tmpFilter) {
                tmpFilters[tmpFilter.name] = tmpFilter;
            }
        }
    }
    for (var tF in tmpFilters) {
        strFilter += (strFilter > "" ? ";" : "") + tF;
        for (var iFilter = 0; iFilter < tmpFilters[tF].fields.length; iFilter++) {
            strFilter += "," + tmpFilters[tF].fields[iFilter].replacename + "|" + document.getElementById(tmpFilters[tF].name + "_" + tmpFilters[tF].fields[iFilter].replacename).getAttribute("currentValue") + "|" + tmpFilters[tF].fields[iFilter].type;
        }
    }
    document.forms["print"].filter.value = strFilter;
    var tmpgeoms1 = myGeoObjects.getSerializedTmpGeometries().trim();
    var tmpgeoms2 = myHighlightObjects.getSerializedTmpGeometries().trim();
    if (tmpgeoms1 > "" && tmpgeoms2 > "") {
        var tmpgeoms = tmpgeoms1 + tmpgeoms2;
        document.forms["print"].tmpgeoms.value = tmpgeoms.replace(/}\]\[{/, "}, {");
    } else if (tmpgeoms1 > "") document.forms["print"].tmpgeoms.value = tmpgeoms1;
    else if (tmpgeoms2 > "") document.forms["print"].tmpgeoms.value = tmpgeoms2;
    else document.forms["print"].tmpgeoms.value = "";
    document.forms["print"].tmpgeoms.value = document.forms["print"].tmpgeoms.value.replace(/\|\|/g, "|");
    var urlGetParams = "?instance=" + gogisCurrentInstance;
    urlGetParams += "&language=" + gogisCurrentLanguage;
    urlGetParams += "&theme=" + gogisCurrentTheme;
    urlGetParams += "&map=" + szMap;
    urlGetParams += "&scale=" + document.forms["print"].scale.value;
    urlGetParams += "&mapextent=" + encodeURIComponent(document.forms["print"].mapextent.value);
    urlGetParams += "&layers=" + encodeURIComponent(document.forms["print"].layers.value);
    urlGetParams += "&printformat=" + document.forms["print"].printformat.value;
    urlGetParams += "&printquality=" + document.forms["print"].printquality.value;
    urlGetParams += "&printcolors=" + document.forms["print"].printcolors.value;
    urlGetParams += "&cache=" + document.forms["print"].cache.value;
    urlGetParams += "&width=" + document.forms["print"].width.value;
    urlGetParams += "&height=" + document.forms["print"].height.value;
    urlGetParams += "&text=" + encodeURIComponent(document.forms["print"].text.value);
    if (document.forms["print"].coids.value > "") urlGetParams += "&coids=" + encodeURIComponent(document.forms["print"].coids.value);
    if (document.forms["print"].tmpgeoms.value > "") urlGetParams += "&tmpgeoms=" + encodeURIComponent(document.forms["print"].tmpgeoms.value);
    if (document.forms["print"].filter.value > "") urlGetParams += "&filter=" + encodeURIComponent(document.forms["print"].filter.value);
    document.forms["print"].action = document.forms["print"].action + urlGetParams;
    if (document.forms["print"].cache.value == 1) {
        var response = GogisRequestObject.getFile(document.forms["print"].action);
        if (response.trim() > "") window.open(response.trim(), '_blank');
    } else document.forms["print"].submit();
    if (myPrintDialogWindow) myPrintDialogWindow.hide();
}

function loadToolbar() {
    var requestObj = new GogisRequestObject();
    requestObj.action = handleLoadToolbar;
    var gps = (hasGPS ? '&gps=' + (myGeolocationService.running ? '2' : '1') : '');
    var multitouch = (browser_isMultitouch ? '&multitouch=1' : '');
    var url = 'gogis/php/get' + (browser_isMobile ? "Touch" : "") + 'Toolbar.php?instance=' + gogisCurrentInstance + '&language=' + gogisCurrentLanguage + gps + multitouch;
    requestObj.sendRequest(url);
}

function handleLoadToolbar(response) {
    var vpToolbar = getRawObject("viewportToolbar");
    vpToolbar.innerHTML = response;
    var tmpBtn = getRawObject('btnToolGPS');
    if (tmpBtn) {
        if (myGeolocationService.running) tmpBtn.className = 'btnToolGPSDown';
        else tmpBtn.className = 'btnToolGPS';
    }
    var myPlugInToolbarCanvas = document.getElementById("gogisPlugInsToolbar");
    if (myPlugInToolbarCanvas) {
        if (gogisPlugIns > "") {
            myPlugInCanvas.parentNode.removeChild(myPlugInCanvas);
            myPlugInToolbarCanvas.appendChild(myPlugInCanvas);
        } else myPlugInToolbarCanvas.style.display = "none";
    }
    if (browser_isMobile) {
        var tmpSearchField = document.getElementById("gogisSearchField");
        var tmpSearchFieldParent = tmpSearchField.parentNode;
        if (tmpSearchFieldParent) {
            tmpSearchFieldParent.removeChild(tmpSearchField);
            document.getElementById("toolbarSearchFieldContainer").appendChild(tmpSearchField);
        }
    }
}

function showMeasureDialogService() {
    if (myMeasureService == null) {
        var requestObj = new GogisRequestObject();
        requestObj.action = handleMeasureDialogService;
        var url = 'gogis/php/get' + (browser_isMobile ? "Touch" : "") + 'MeasureService.php?instance=' + gogisCurrentInstance + '&language=' + gogisCurrentLanguage;
        requestObj.sendRequest(url);
    } else {
        var service = document.getElementById("gogisServiceMeasure");
        service.style.display = "inline";
        getRawObject('toolMeasure').className = 'toolMeasureDown';
        myServicePanRefresh();
    }
}

function hideMeasureDialogService() {
    var service = document.getElementById("gogisServiceMeasure");
    service.style.display = "none";
    getRawObject('toolMeasure').className = 'toolMeasure';
}

function handleMeasureDialogService(response) {
    var service = document.getElementById("gogisServiceMeasure");
    service.innerHTML = response;
    service.style.display = "inline";
    getRawObject('toolMeasure').className = 'toolMeasureDown';
    myServicePanRefresh();
    myMeasureService = "ON";
    myMeasureTool.setPolyArea(0);
    myMeasureTool.setPolyDistance(0);
}

function showRedlineDialogService() {
    if (myRedlineService == null) {
        var requestObj = new GogisRequestObject();
        requestObj.action = handleRedlineDialogService;
        var url = 'gogis/php/get' + (browser_isMobile ? "Touch" : "") + 'RedlineService.php?instance=' + gogisCurrentInstance + '&language=' + gogisCurrentLanguage;
        requestObj.sendRequest(url);
    } else {
        var service = document.getElementById("gogisServiceRedline");
        service.style.display = "inline";
        getRawObject('toolRedline').className = 'toolRedlineDown';
        myServicePanRefresh();
    }
}

function hideRedlineDialogService() {
    var service = document.getElementById("gogisServiceRedline");
    service.style.display = "none";
    getRawObject('toolRedline').className = 'toolRedline';
}

function handleRedlineDialogService(response) {
    var service = document.getElementById("gogisServiceRedline");
    var content = response.split("<!--break-->");
    service.innerHTML = content[0];
    if (content[1] && content[1].trim() > "") myRedlineDialogWindow.setFooter(content[1].trim());
    if (content[2] && content[2].trim() > "") eval(content[2].trim());
    service.style.display = "block";
    getRawObject('toolRedline').className = 'toolRedlineDown';
    if (myRedlineDialogWindow) drawPage();
    else myServicePanRefresh();
    myRedlineService = "ON";
    if (browser_isMobile) setRedlineStatus();
}

function setRedlineStatus() {
    var tmpObj = document.getElementById("redlineGeometry").parentObj;
    var status = "<b>" + tmpObj.options[tmpObj.selectedIndex].label + "</b>";
    if (tmpObj.value == gogisDigitizer.GEOMETRY_POINT) {
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + document.getElementById("redlineSize").parentObj.value + "px";
        tmpObj = document.getElementById("redlineColor").parentObj;
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + tmpObj.options[tmpObj.selectedIndex].label
    } else if (tmpObj.value == gogisDigitizer.GEOMETRY_LINE) {
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + document.getElementById("redlineSize").parentObj.value + "px";
        tmpObj = document.getElementById("redlineColor").parentObj;
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + tmpObj.options[tmpObj.selectedIndex].label
    } else if (tmpObj.value == gogisDigitizer.GEOMETRY_POLYGON) {
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + document.getElementById("redlineSize").parentObj.value + "px";
        tmpObj = document.getElementById("redlineColor").parentObj;
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + tmpObj.options[tmpObj.selectedIndex].label
    } else if (tmpObj.value == gogisDigitizer.GEOMETRY_LABEL) {
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + document.getElementById("redlineSize").parentObj.value + "px";
        tmpObj = document.getElementById("redlineColor").parentObj;
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + tmpObj.options[tmpObj.selectedIndex].label
    } else if (tmpObj.value == gogisDigitizer.GEOMETRY_ICON) {
        tmpObj = document.getElementById("redlineIcon").parentObj;
        status += "&nbsp;&nbsp;<b>/</b>&nbsp;&nbsp;" + tmpObj.options[tmpObj.selectedIndex].label
    }
    document.getElementById("gogisToolbarServiceRedline").innerHTML = status;
}

function onRedlineObjectChangeType(value) {
    myRedlineTool.digitizer.setGeometryType(value);
    if (value == gogisDigitizer.GEOMETRY_POINT) {
        document.getElementById('redlineOpacityRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineTextRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineColorRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineBgColorRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineIconRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineSizeRow').className = "gogisServiceElementVisible";
        if (browser_isMobile) {
            document.getElementById('redlineOpacityLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineColorLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineBgColorLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineIconLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineSizeLineRow').className = "gogisServiceElementVisible";
        }
        if (browser_isMobile) document.getElementById('redlineSize').parentObj.selectValue(11);
        else document.getElementById('redlineSize').value = 11;
        myRedlineTool.digitizer.setGeometrySize(11);
        myRedlineTool.digitizer.setGeometryOpacity(100);
    } else if (value == gogisDigitizer.GEOMETRY_LINE) {
        document.getElementById('redlineOpacityRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineTextRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineColorRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineBgColorRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineIconRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineSizeRow').className = "gogisServiceElementVisible";
        if (browser_isMobile) {
            document.getElementById('redlineOpacityLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineColorLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineBgColorLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineIconLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineSizeLineRow').className = "gogisServiceElementVisible";
        }
        if (browser_isMobile) document.getElementById('redlineSize').parentObj.selectValue(2);
        else document.getElementById('redlineSize').value = 2;
        myRedlineTool.digitizer.setGeometrySize(2);
        myRedlineTool.digitizer.setGeometryOpacity(100);
    } else if (value == gogisDigitizer.GEOMETRY_POLYGON) {
        document.getElementById('redlineOpacityRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineTextRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineColorRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineBgColorRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineIconRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineSizeRow').className = "gogisServiceElementVisible";
        if (browser_isMobile) {
            document.getElementById('redlineOpacityLineRow').className = "gogisServiceElementVisible";
            document.getElementById('redlineColorLineRow').className = "gogisServiceElementVisible";
            document.getElementById('redlineBgColorLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineIconLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineSizeLineRow').className = "gogisServiceElementVisible";
        }
        if (browser_isMobile) document.getElementById('redlineSize').parentObj.selectValue(2);
        else document.getElementById('redlineSize').value = 2;
        myRedlineTool.digitizer.setGeometrySize(2);
        myRedlineTool.digitizer.setGeometryOpacity(document.getElementById('redlineOpacity').value);
    } else if (value == gogisDigitizer.GEOMETRY_LABEL) {
        document.getElementById('redlineOpacityRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineTextRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineColorRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineBgColorRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineIconRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineSizeRow').className = "gogisServiceElementVisible";
        if (browser_isMobile) {
            document.getElementById('redlineOpacityLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineColorLineRow').className = "gogisServiceElementVisible";
            document.getElementById('redlineBgColorLineRow').className = "gogisServiceElementVisible";
            document.getElementById('redlineIconLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineSizeLineRow').className = "gogisServiceElementVisible";
        }
        if (browser_isMobile) document.getElementById('redlineSize').parentObj.selectValue(10);
        else document.getElementById('redlineSize').value = 10;
        myRedlineTool.digitizer.setGeometrySize(10);
        myRedlineTool.digitizer.setGeometryOpacity(100);
    } else if (value == gogisDigitizer.GEOMETRY_ICON) {
        document.getElementById('redlineOpacityRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineTextRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineColorRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineBgColorRow').className = "gogisServiceElementHidden";
        document.getElementById('redlineIconRow').className = "gogisServiceElementVisible";
        document.getElementById('redlineSizeRow').className = "gogisServiceElementHidden";
        if (browser_isMobile) {
            document.getElementById('redlineOpacityLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineColorLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineBgColorLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineIconLineRow').className = "gogisServiceElementHidden";
            document.getElementById('redlineSizeLineRow').className = "gogisServiceElementHidden";
        }
        myRedlineTool.digitizer.setGeometryOpacity(100);
    }
    if (myRedlineDialogWindow) drawPage();
    else myServicePanRefresh();
    if (browser_isMobile) setRedlineStatus();
}

function onRedlineObjectChangeOpacity(value) {
    myRedlineTool.digitizer.setGeometryOpacity(value);
    if (browser_isMobile) setRedlineStatus();
}

function onRedlineObjectChangeSize(value) {
    myRedlineTool.digitizer.setGeometrySize(value);
    if (browser_isMobile) setRedlineStatus();
}

function onRedlineObjectChangeColor(value) {
    myRedlineTool.digitizer.setGeometryColor(value);
    if (browser_isMobile) setRedlineStatus();
}

function onRedlineObjectChangeBgColor(value) {
    myRedlineTool.digitizer.setGeometryBgColor(value);
    if (browser_isMobile) setRedlineStatus();
}

function onRedlineObjectChangeIcon(value) {
    var iconAttr = value.split("|");
    myRedlineTool.digitizer.setGeometryIcon(iconAttr[0], iconAttr[1], iconAttr[2], iconAttr[3]);
    if (browser_isMobile) setRedlineStatus();
}

function onRedlineObjectChangeText(value) {
    myRedlineTool.digitizer.setGeometryText(value);
    if (browser_isMobile) setRedlineStatus();
}

function setCurrentCoordinates(x, y) {
    document.getElementById("gogisToolbarServiceCoordinatesInput").value = gogisCurrentProjection + ": " + x + " / " + y;
}

function setCurrentMeasure(fD, fA) {
    document.getElementById("gogisToolbarServiceMeasureInput").value = gLocalizer.localize("MEASURE_DIALOG_LENGTH") + ": " + fD + " / " + gLocalizer.localize("MEASURE_DIALOG_AREA") + ": " + fA;
}

function navigateBack() {
    var bChanged = GogisTouchToolbox.hide();
    if (!bChanged) bChanged = (bChanged || GogisTouchSelectbox.hide());
    if (!bChanged) bChanged = (bChanged || GogisTouchToolbar.hide());
    if (!bChanged) {
        if (GogisDialogWindow.hideAllWindows()) {
            switchTool('');
            bChanged = true;
        }
    }
    if (typeof(Android) != 'undefined' && Android.callback) Android.callback("navigateBack", (bChanged ? "true" : "false"));
    return bChanged;
}

function showToolbox() {
    var tmpScrollTime = parseInt(myToolbox.domObj.style.top) - (GogisTouchToolbox.screenTop - getObjectHeight(myToolbox.domObj));
    if (tmpScrollTime > 0) myToolbox.hide();
    else myToolbox.show();
}

function showAboutUs() {
    hideContent();
    if (!myAboutDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        myAboutDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, null, null, 12002, 'auto', gLocalizer.localize('TITLE_ABOUT_US').replace(/<br>/g, ''), GogisRequestObject.getFile(gogisAboutUrl), true, false, false);
    } else {
        GogisDialogWindow.hideAllWindows(myAboutDialogWindow);
        myAboutDialogWindow.show();
    }
}

function showHelp() {
    hideContent();
    if (!myHelpDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        myHelpDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, null, null, 12002, 'auto', gLocalizer.localize('TITLE_HELP_MOBILE'), GogisRequestObject.getFile(gogisHelpUrl), true, false, false);
    } else {
        GogisDialogWindow.hideAllWindows(myHelpDialogWindow);
        myHelpDialogWindow.show();
    }
}

function showLegend() {
    hideContent();
    var html = '<center><div id="legendContentCenter"><table id="legendContent" cellspacing="0" cellpadding="0" border="0" align="center">';
    html += '<tr><td>';
    html += leg_head_tmp;
    html += '</td></tr><tr><td>';
    html += leg_html_tmp;
    html += '</td></tr></table></div></center>';
    if (!myLegendDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        myLegendDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, null, null, 12001, 'auto', gLocalizer.localize('TITLE_LEGEND').replace(/-<br>/g, ''), html, true, false, false);
    } else {
        GogisDialogWindow.hideAllWindows(myLegendDialogWindow);
        myLegendDialogWindow.show(html);
    }
    if (updateLeg) {
        gogisSetupPrintableLegend(flag_drawActiveLegend);
        updateLeg = false;
    }
}

function showLayers() {
    hideContent();
    if (!myLayersDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        var legend = document.getElementById('mapLegend');
        var layers = document.getElementById('gogisLayerControl');
        layers.removeChild(legend);
        myLayersDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, (browser_isMobile ? GogisDialogWindow.POSITION_TOPLEFT : GogisDialogWindow.POSITION_TOPRIGHT), (browser_isMobile ? null : 238), null, 11002, (browser_isMobile ? 'auto' : 'hidden'), gLocalizer.localize('TITLE_LAYERS'), '', true, false, false);
        if (browser_isMobile) {
            legend.style.width = 'auto';
            myLayersDialogWindow.htmlText.innerHTML = '<center><div id="mapLegendContainer"></div></center>';
            getRawObject("mapLegendContainer").appendChild(legend);
        } else {
            legend.style.width = '226px';
            myLayersDialogWindow.htmlText.appendChild(legend);
        }
        myLegendPanRefresh();
    } else {
        GogisDialogWindow.hideAllWindows(myLayersDialogWindow);
        myLayersDialogWindow.show();
    }
}

function showSearchDialog() {
    if (typeof GogisTouchToolbox != 'undefined') GogisTouchToolbox.hide();
    hideContent();
    if (!mySearchDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        var service = document.getElementById('service');
        var search = document.getElementById('gogisSearch');
        service.removeChild(search);
        mySearchDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, 258, 76, 11003, 'hidden', gLocalizer.localize('TITLE_SEARCH'), '', true, false, false);
        mySearchDialogWindow.htmlText.appendChild(search);
        document.getElementById('gogisSearchField').focus();
    } else {
        GogisDialogWindow.hideAllWindows(mySearchDialogWindow);
        mySearchDialogWindow.show();
        document.getElementById('gogisSearchField').focus();
    }
}

function showSearchResult() {
    hideContent();
    if (!mySearchResultDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        var html = '<center><div id="searchContentCenter"><table id="searchContent" cellspacing="0" cellpadding="0" border="0" align="center">';
        html += '<tr><td><div id="gogisAutocompleteCategoriesContent"></div></td></tr>';
        html += '<tr><td><div id="gogisAutocompleteListContent"></div></td></tr>';
        html += '<tr><td><div id="gogisAutocompleteNavigationContent"></div></td></tr></table></div></center>';
        mySearchResultDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, null, null, 12003, 'hidden', gLocalizer.localize('TITLE_SEARCH_RESULTS'), html, true, false, false);
        if ((browser_name.toLowerCase() == 'android' || browser_os.toLowerCase() == 'android') && browser_version < 3) {
            touchScroll(getRawObject('gogisAutocompleteListContent'));
        }
        if (browser_isMobile) {
            mySearchResultDialogWindow.close = function() {
                var bChanged = this.hide();
                if (currentToolId == 'toolQuery') activateQuery();
                return bChanged;
            };
        }
    } else {
        GogisDialogWindow.hideAllWindows(mySearchResultDialogWindow);
        mySearchResultDialogWindow.show();
    }
    if (browser_isMobile && currentToolId == 'toolQuery') myQueryToolbar.hideQuiet();
}

function showDetails() {
    hideContent();
    if (!myDetailDialogWindow) {
        var html = '<table id="detailsContent" cellspacing="0" cellpadding="0" border="0">';
        html += '<tr><td><div id="gogisDetailsDialogContent"></div></td></tr></table>';
        myDetailDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPRIGHT, 420, null, 13000, 'auto', gLocalizer.localize('TAB_DETAILS'), html, true, false, false);
    } else {
        myDetailDialogWindow.show();
    }
}

function showPrint() {
    hideContent();
    if (!myPrintDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        var service = document.getElementById('gogisServiceContent');
        var print = document.getElementById('gogisServicePrint');
        service.removeChild(print);
        myPrintDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, (browser_isMobile ? null : 238), (browser_isMobile ? null : 'auto'), 11005, (browser_isMobile ? 'auto' : 'visible'), gLocalizer.localize('TOOLTIP_PRINT'), '', true, false, false);
        myPrintDialogWindow.htmlContainer.style.overflow = 'visible';
        myPrintDialogWindow.htmlText.appendChild(print);
        showPrintDialogService();
        myPrintDialogWindow.parent = myPrintDialogWindow;
    } else {
        GogisDialogWindow.hideAllWindows(myPrintDialogWindow);
        myPrintDialogWindow.show();
    }
}

function activatePan() {
    hideContent();
    GogisDialogWindow.hideAllWindows();
    switchMode('toolPan');
}

function activateMeasure() {
    hideContent();
    if (browser_isMobile) {
        GogisDialogWindow.hideAllWindows();
        if (!myMeasureToolbar) {
            myMeasureToolbar = new GogisTouchToolbar("myMeasureToolbar", gLocalizer.localize('TITLE_MEASURE'), getRawObject('viewport'), '<div id="gogisToolbarServiceMeasure"><input type="text" id="gogisToolbarServiceMeasureInput"></div>');
            myMeasureToolbar.setOnClose(function() {
                switchTool('');
            });
            setCurrentMeasure('0m', '0m²');
        }
        myMeasureToolbar.show();
    } else {
        if (!myMeasureDialogWindow) {
            GogisDialogWindow.hideAllWindows();
            var service = document.getElementById('gogisServiceContent');
            var measure = document.getElementById('gogisServiceMeasure');
            service.removeChild(measure);
            myMeasureDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, 238, 95, 11001, 'hidden', gLocalizer.localize('TOOLTIP_MEASURE'), '', true, false, false);
            myMeasureDialogWindow.htmlText.appendChild(measure);
            myMeasureDialogWindow.parent = myMeasureDialogWindow;
            myMeasureDialogWindow.htmlButton.onclick = function(e) {
                GogisDialogWindow.close(e, myMeasureDialogWindow);
                resetTools();
            };
        } else {
            GogisDialogWindow.hideAllWindows(myMeasureDialogWindow);
            myMeasureDialogWindow.show();
        }
    }
    if (!arguments || !arguments[0]) switchMode('toolMeasure');
}

function activateRedline() {
    hideContent();
    if (!myRedlineDialogWindow) {
        GogisDialogWindow.hideAllWindows();
        var service = document.getElementById('gogisServiceContent');
        var redline = document.getElementById('gogisServiceRedline');
        service.removeChild(redline);
        myRedlineDialogWindow = new GogisDialogWindow(getRawObject('viewport'), drawPageObjects, GogisDialogWindow.POSITION_TOPLEFT, (browser_isMobile ? null : 238), (browser_isMobile ? null : 'auto'), 11004, (browser_isMobile ? 'auto' : 'visible'), gLocalizer.localize('TOOLTIP_REDLINE'), '', true, false, false);
        myRedlineDialogWindow.htmlContainer.style.overflow = 'visible';
        myRedlineDialogWindow.htmlText.appendChild(redline);
        if (!arguments || !arguments[0]) switchMode('toolRedline');
        myRedlineDialogWindow.parent = myRedlineDialogWindow;
        if (!browser_isMobile) {
            myRedlineDialogWindow.htmlButton.onclick = function(e) {
                GogisDialogWindow.close(e, myRedlineDialogWindow);
                resetTools();
            };
        } else {
            if (!myRedlineToolbar) {
                var toolbarHtml = '<div id="gogisToolbarServiceRedline"></div></td>' + '<td id="myRedlineToolbar_deleteTD" valign="middle" align="right">' + '<div id="toolbarRedlineButtonReset" class="gogisTouchToolbarOptions" ' + 'onclick="myRedlineTool.digitizer.reset();myGeoObjects.reset();">' + gLocalizer.localize('TOUCH_BUTTON_DELETE') + '</div>';
                myRedlineToolbar = new GogisTouchToolbar("myRedlineToolbar", gLocalizer.localize('TITLE_REDLINE'), getRawObject('viewport'), toolbarHtml, showRedlineOptions);
                myRedlineToolbar.setOnClose(function() {
                    switchTool('');
                });
                myRedlineToolbar.setOnResize(function() {
                    var tmp_w = GogisTouchToolbar.screenWidth - (getObjectWidth(getRawObject('myRedlineToolbar_titleTD')) + getObjectWidth(getRawObject('myRedlineToolbar_deleteTD')) + getObjectWidth(getRawObject('myRedlineToolbar_optionsTD')) + getObjectWidth(getRawObject('myRedlineToolbar_closeTD'))) - (screenType == "-small" ? 36 : 42);
                    tmp_w = (tmp_w > 0 ? tmp_w : 1);
                    getRawObject('gogisToolbarServiceRedline').style.width = tmp_w + "px";
                });
            }
            myRedlineDialogWindow.htmlButton.onclick = function(e) {
                GogisDialogWindow.close(e, myRedlineDialogWindow);
                myRedlineToolbar.show();
            };
        }
    } else {
        if (!arguments || !arguments[0]) switchMode('toolRedline');
        GogisDialogWindow.hideAllWindows(myRedlineDialogWindow);
        myRedlineDialogWindow.show();
    }
}

function showRedlineOptions() {
    myRedlineDialogWindow.show();
}

function activateCoordinates() {
    hideContent();
    GogisDialogWindow.hideAllWindows();
    switchModeCoordinatesPicker('toolCoordinatesPicker');
    if (browser_isMobile) {
        if (!myCoordinatesToolbar) {
            var toolbarHtml = '<div id="gogisToolbarServiceCoordinates"><input type="text" id="gogisToolbarServiceCoordinatesInput"></div>';
            myCoordinatesToolbar = new GogisTouchToolbar("myCoordinatesToolbar", gLocalizer.localize('TITLE_COORDINATES'), getRawObject('viewport'), toolbarHtml);
            myCoordinatesToolbar.setOnClose(function() {
                switchTool('');
            });
            var digits = (gogisCurrentProjection == 'LV95' ? '0000000.0' : '000000.0');
            setCurrentCoordinates(digits, digits);
        }
        myCoordinatesToolbar.show();
    }
}

function activateQuery() {
    hideContent();
    GogisDialogWindow.hideAllWindows();
    if (browser_isMobile) {
        if (!myQueryToolbar) {
            myQueryToolbar = new GogisTouchToolbar("myQueryToolbar", gLocalizer.localize('TITLE_QUERY'), getRawObject('viewport'), '<div id="gogisToolbarServiceQuery"><div class="gogisServiceToolbarText">' + gLocalizer.localize('TEXT_QUERY') + '</div></div>');
            myQueryToolbar.setOnClose(function() {
                switchTool('');
            });
            var tmpDomObj = document.getElementById("gogisToolbarServiceQuery");
        }
        myQueryToolbar.show();
    }
    switchMode('toolQuery');
}

function switchTool() {
    if (browser_isMobile) {}
    if (arguments.length == 1) {
        if (arguments[0] == 'measure') activateMeasure();
        else if (arguments[0] == 'redline') activateRedline();
        else if (arguments[0] == 'coordinates') activateCoordinates();
        else if (arguments[0] == 'query') activateQuery();
        else activatePan();
    } else activatePan();
}

function switchGPS() {
    var tmpGPS, curGPS;
    hideContent();
    GogisDialogWindow.hideAllWindows();
    if (arguments.length == 1) {
        if (arguments[0] && getRawObject('toolGPS').className == 'toolGPS') {
            tmpGPS = switchModeGPS('toolGPS');
        } else if (!arguments[0] && getRawObject('toolGPS').className == 'toolGPSDown') {
            tmpGPS = switchModeGPS('toolGPS');
        }
    } else {
        curGPS = (getRawObject('toolGPS').className == 'toolGPSDown');
        tmpGPS = switchModeGPS('toolGPS');
    }
}

function mailTo() {
    window.location.href = "mailto:?subject=" + gLocalizer.localize("TITLE_MY_LOCATION") + "&body=" + encodeURIComponent(myUrl);
}

function debug(msg) {
    try {
        if (gogisDebugDocument != null) {
            gogisDebugMessages.append(msg + "<br>");
            gogisDebugDocument.write(gogisDebugMessages.toString());
            gogisDebugDocument.close();
        }
    } catch (e) {};
}
var myWindow;

function gogisNormalizeUrl(url) {
    var url = url.toLowerCase().replace(new RegExp("http:\/\/"), "");
    return "http:/" + "/" + url;
}

function gogisBrowserWindow(url, target) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target);
}

function gogisPopUp(url, target) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=0, scrollbars=0, location=0, statusbar=1, menubar=0, resizable=1, width=640, height=480, left=" + (screen.width - 640) / 2 + ", top=" + (screen.height - 480) / 2);
}

function gogisPopUpWithScroll(url, target) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=0, scrollbars=1, location=0, statusbar=1, menubar=0, resizable=1, width=640, height=480, left=" + (screen.width - 640) / 2 + ", top=" + (screen.height - 480) / 2);
}

function gogisPopUpWithMenu(url, target) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=0, scrollbars=1, location=0, statusbar=1, menubar=1, resizable=1, width=640, height=480, left=" + (screen.width - 640) / 2 + ", top=" + (screen.height - 480) / 2);
}

function gogisPopUpWithToolbar(url, target) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=1, scrollbars=1, location=0, statusbar=1, menubar=1, resizable=1, width=640, height=480, left=" + (screen.width - 640) / 2 + ", top=" + (screen.height - 480) / 2);
}

function gogisXPopUp(url, target, w, h) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=0, scrollbars=0, location=0, statusbar=1, menubar=0, resizable=1, width=" + w + ", height=" + h + ", left=" + (screen.width - w) / 2 + ", top=" + (screen.height - h) / 2);
}

function gogisXPopUpWithScroll(url, target, w, h) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=0, scrollbars=1, location=0, statusbar=1, menubar=0, resizable=1, width=" + w + ", height=" + h + ", left=" + (screen.width - w) / 2 + ", top=" + (screen.height - h) / 2);
}

function gogisXPopUpWithMenu(url, target, w, h) {
    gogisXPopClose();
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=0, scrollbars=1, location=0, statusbar=1, menubar=1, resizable=1, width=" + w + ", height=" + h + ", left=" + (screen.width - w) / 2 + ", top=" + (screen.height - h) / 2);
}

function gogisXPopUpWithToolbar(url, target, w, h) {
    if (browser_isMobile) myWindow = window.open(url, '_blank');
    else myWindow = window.open(url, target, "toolbar=1, scrollbars=1, location=0, statusbar=0, menubar=1, resizable=0, width=" + w + ", height=" + h + ", left=" + (screen.width - w) / 2 + ", top=" + (screen.height - h) / 2);
}

function gogisXPopClose() {
    if (myWindow) {
        myWindow.close();
        myWindow = null;
    }
}
var autocompleteRequestObj = new GogisRequestObject();
var autocompleteRequestObjCount = new GogisRequestObject();
var autocompleteDoc = null;
var autocompleteDelay = null;
var autocompleteHasFocus = false;
var autocompleteIsBusy = false;
var autocompleteIsRequesting = false;
var autocompleteApply = false;
var autocompleteChanged = false;
var autocompleteSelectedIndex = -1;
var gogisSearchFieldValue = "";

function checkAutocompleteKeys(key) {
    if (key == 38) {
        if (autocompleteIsBusy) autocompleteSelectedIndex = -1;
        if (autocompleteSelectedIndex >= 0) {
            autocompleteSelectedIndex--;
        }
        selectAutocompleteResult();
        return false;
    } else if (key == 40) {
        if (autocompleteIsBusy) autocompleteSelectedIndex = -1;
        if (autocompleteSelectedIndex < autocompleteDoc.root.length - 1) {
            autocompleteSelectedIndex++;
        }
        selectAutocompleteResult();
        return false;
    } else return true;
}

function sendAutocompleteRequest(key) {
    gogisSearchFieldValue = document.getElementById("gogisSearchField").value.trim();
    if (key == 27) {
        document.getElementById("gogisAutocompleteBox").style.visibility = "hidden";
        gogisSearchFieldValue = "";
        document.getElementById("gogisSearchField").value = "";
        autocompleteIsBusy = false;
        autocompleteApply = false;
        autocompleteChanged = false;
        autocompleteSelectedIndex = -1;
    }
    if (autocompleteListIsActive || gogisSearchFieldValue == "") {
        resetAutocompleteHighlight();
    }
    if (key == 13) {
        if (!autocompleteIsBusy && autocompleteDoc == null) {
            autocompleteApply = true;
            startAutocompleteDelayed();
        } else if (autocompleteIsBusy && gogisSearchFieldValue != "") {
            autocompleteApply = true;
        } else if (!autocompleteIsBusy) {
            document.getElementById("gogisAutocompleteBox").style.visibility = "hidden";
            resetSearchresultlistTotal();
            if (autocompleteSelectedIndex > -1) {
                autocompleteListIsActive = false;
                document.getElementById("gogisSearchField").value = autocompleteDoc.root[autocompleteSelectedIndex].searchresulttextshort;
                sendAutocompleteRequestHighlight(autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayeridvalue, autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayername, true);
                if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                    sendAutocompleteRequestDetails(autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayeridname, autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayeridvalue, autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayername, false);
                }
            } else if (autocompleteDoc.root.length == 1) {
                autocompleteListIsActive = false;
                document.getElementById("gogisSearchField").value = autocompleteDoc.root[0].searchresulttextshort;
                sendAutocompleteRequestHighlight(autocompleteDoc.root[0].searchresultlayeridvalue, autocompleteDoc.root[0].searchresultlayername, true);
                if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                    sendAutocompleteRequestDetails(autocompleteDoc.root[0].searchresultlayeridname, autocompleteDoc.root[0].searchresultlayeridvalue, autocompleteDoc.root[0].searchresultlayername, false);
                }
            } else {
                getSearchResultList(limit, offset, '');
            }
            return;
        }
        return false;
    } else if (key == 9) {} else if (key == 16 || key == 17 || key == 18) {} else if (key == 19 || key == 20) {} else if (key == 33 || key == 34) {} else if (key == 35 || key == 36) {} else if (key == 38 || key == 40) {} else if (key == 37 || key == 39) {} else if (key == 45) {} else if (key == 91 || key == 92) {} else if (key == 144 || key == 145) {} else if (key == 191 || key == 220) {} else if (key >= 112 && key <= 123) {} else if (key != 27) {
        autocompleteSelectedIndex = -1;
        document.getElementById("gogisAutocompleteBox").style.visibility = "hidden";
        if (autocompleteIsRequesting) {
            autocompleteChanged = true;
            return true;
        }
        if (autocompleteDelay != null) clearTimeout(autocompleteDelay);
        if (gogisSearchFieldValue != "" && gogisSearchFieldValue != "\"" && gogisSearchFieldValue != "'") {
            autocompleteIsBusy = true;
            autocompleteDelay = setTimeout('startAutocompleteDelayed();', gogisApplication.AUTOCOMPLETE_DELAYTIME);
        } else {
            autocompleteDelay = null;
        }
        return true;
    }
}

function startAutocompleteDelayed() {
    var searchField = document.getElementById("gogisSearchField").value.trim();
    autocompleteDelay = null;
    if (searchField > "") {
        var tmp_theme = ((gogisApplication.SEARCH_CURRENT_THEME && gogisApplication.SEARCH_CURRENT_THEME[gogisCurrentInstance] == false) ? "-1" : gogisCurrentTheme);
        var url = 'gogis/php/getAutoCompleteSearchResult.php?searchstring=' + encodeURIComponent(searchField.toLowerCase()) + '&limit=10&offset=0&instance=' + gogisCurrentInstance + '&map=' + szMap + '&theme=' + tmp_theme;
        autocompleteIsRequesting = true;
        autocompleteRequestObj.sendRequest(url);
    } else {
        document.getElementById("gogisAutocompleteBox").style.visibility = "hidden";
        autocompleteIsBusy = false;
        autocompleteIsRequesting = false;
    }
}

function handleAutocompleteResponse(_response) {
    var response = _response;
    if (isIntNegative(_response)) {
        response = '{"root":[]}';
    }
    var noCount = false;
    autocompleteSelectedIndex = -1;
    autocompleteDoc = eval('(' + response + ')');
    var html = "";
    var layername = "";
    var legendicon = "";
    var legendiconsrc = "";
    if (autocompleteDoc) {
        var i = 0;
        for (i = 0; i < autocompleteDoc.root.length; i++) {
            layername = autocompleteDoc.root[i].searchresultlayername;
            legendicon = myKaMap.getCurrentMap().getLayer(layername).legendicon;
            if (autocompleteDoc.root[i].searchresulttextshort) {
                tmp_text = autocompleteDoc.root[i].searchresulttextshort;
                if (tmp_text.length > 43) {
                    counter = 0;
                    endpos = 39;
                    while (counter < 39 && parseInt(tmp_text.substring(counter, tmp_text.length - counter).indexOf(" ")) + parseInt(counter) < 39) {
                        endpos = parseInt(tmp_text.substring(counter, tmp_text.length - counter).indexOf(" ")) + counter;
                        counter += 1;
                    }
                    tmp_text = tmp_text.substr(0, endpos) + " ...";
                }
                html += "<div id='autocompleteRow" + i + "' class='box2'>";
                html += "<a id='autocompleteRowLink" + i + "' href='javascript:click();' onMouseDown='";
                html += "autocompleteListIsActive=false;sendAutocompleteRequestHighlight(";
                html += autocompleteDoc.root[i].searchresultlayeridvalue;
                html += ",";
                html += "\"";
                html += autocompleteDoc.root[i].searchresultlayername;
                html += "\"";
                html += ",true);";
                if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                    html += "sendAutocompleteRequestDetails(";
                    html += "\"";
                    html += autocompleteDoc.root[i].searchresultlayeridname;
                    html += "\"";
                    html += ",";
                    html += autocompleteDoc.root[i].searchresultlayeridvalue;
                    html += ",";
                    html += "\"";
                    html += autocompleteDoc.root[i].searchresultlayername;
                    html += "\"";
                    html += ",false);";
                }
                html += "' title='";
                if (autocompleteDoc.root[i].searchresulttextlong && autocompleteDoc.root[i].searchresulttextlong) {
                    html += autocompleteDoc.root[i].searchresulttextlong.replace("<b>", "", "g").replace("</b>", "", "g");
                }
                html += "'>";
                html += "<div style='width: 100%;' onmouseover='autocompleteSelectedIndex=" + i + ";selectAutocompleteResult();' onmouseout='autocompleteSelectedIndex=-1;selectAutocompleteResult();'><table cellspacing='0' cellpadding='0' border='0'><tr style='cursor:pointer;'><td>";
                if (!((autocompleteDoc.root[i].searchobjecticon).match(/..tmp/))) {
                    legendiconsrc = autocompleteDoc.root[i].searchobjecticon;
                } else if (legendicon.toLowerCase() != "dynamic") {
                    legendiconsrc = "gogis/images/legendicons/" + legendicon;
                } else {
                    legendiconsrc = autocompleteDoc.root[i].searchobjecticon;
                }
                html += "<img width='11' heigth='11' border='0' src='" + legendiconsrc;
                html += "' title='" + gLocalizer.localize(autocompleteDoc.root[i].searchobjectname);
                html += ": " + gLocalizer.localize(autocompleteDoc.root[i].searchobjectdescription);
                html += "'></td><td>";
                html += "<span id='autocompleteRowSpan" + i + "'>&nbsp;" + tmp_text + "</span>";
                html += "</td></tr></table>";
                html += "</div></a>";
                html += "</div>";
            }
        }
    }
    autocompleteRequestObjCount.cancelRequest();
    if (!autocompleteHasFocus) {
        html = "";
        noCount = true;
        document.getElementById("gogisAutocompleteBox").style.visibility = "hidden";
    } else if (html == "") {
        noCount = true;
        document.getElementById("gogisAutocompleteBox").style.visibility = "visible";
        html += "<div class='box2'>";
        html += "<hr>";
        html += "</div>";
        html += "<div class='box2'>";
        html += "<div style='width: 100%'><table cellspacing='0' cellpadding='0' border='0'><tr><td>";
        html += "<img id='gogisProgressIcon' width='9' heigth='9' border='0' src='gogis/images/progress_finished.gif'></td><td>";
        html += "<div class='gogisAutocompleteTotal'>";
        html += "&nbsp;" + gLocalizer.localize('TITLE_SEARCH_NORESULTS') + "&nbsp;</div></td><td>";
        html += "<div class='gogisAutocompleteTotal' id='gogisAutocompleteTotal'>";
        html += "</div></td></tr></table>";
        html += "</div>";
        html += "</div>";
    } else {
        document.getElementById("gogisAutocompleteBox").style.visibility = "visible";
        html += "<div class='box2'>";
        html += "<hr>";
        html += "</div>";
        html += "<div class='box2'>";
        html += "<div style='width: 100%'><table cellspacing='0' cellpadding='0' border='0'><tr><td>";
        html += "<img id='gogisProgressIcon' width='9' heigth='9' border='0' src='gogis/images/progress_active.gif'></td><td>";
        html += "<div class='gogisAutocompleteTotal'><a href='javascript:click()' onMouseDown='sendAutocompleteRequest(13);' title='" + gLocalizer.localize('TITLE_SHOW_TOTAL_SEARCHRESULTS') + "'>";
        html += "&nbsp;" + gLocalizer.localize('TITLE_TOTAL_SEARCHRESULTS') + "&nbsp;</div></td><td>";
        html += "<div class='gogisAutocompleteTotal' id='gogisAutocompleteTotal'>";
        html += "</div></td></a></tr></table>";
        html += "</div>";
        html += "</div>";
    }
    document.getElementById("gogisAutocompleteBox").innerHTML = html;
    autocompleteIsBusy = false;
    autocompleteIsRequesting = false;
    if (autocompleteChanged) {
        autocompleteChanged = false;
        sendAutocompleteRequest(-1);
        return;
    }
    if (autocompleteApply) {
        autocompleteApply = false;
        gogisSearchFieldValue = document.getElementById("gogisSearchField").value.trim();
        document.getElementById("gogisAutocompleteBox").style.visibility = "hidden";
        resetSearchresultlistTotal();
        if (autocompleteSelectedIndex > -1) {
            autocompleteListIsActive = false;
            document.getElementById("gogisSearchField").value = autocompleteDoc.root[autocompleteSelectedIndex].searchresulttextshort;
            sendAutocompleteRequestHighlight(autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayeridvalue, autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayername, true);
            if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                sendAutocompleteRequestDetails(autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayeridname, autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayeridvalue, autocompleteDoc.root[autocompleteSelectedIndex].searchresultlayername, false);
            }
        } else if (autocompleteDoc.root.length == 1) {
            autocompleteListIsActive = false;
            document.getElementById("gogisSearchField").value = autocompleteDoc.root[0].searchresulttextshort;
            sendAutocompleteRequestHighlight(autocompleteDoc.root[0].searchresultlayeridvalue, autocompleteDoc.root[0].searchresultlayername, true);
            if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                sendAutocompleteRequestDetails(autocompleteDoc.root[0].searchresultlayeridname, autocompleteDoc.root[0].searchresultlayeridvalue, autocompleteDoc.root[0].searchresultlayername, false);
            }
        } else {
            getSearchResultList(limit, offset, '');
        }
        return;
    }
    if (!noCount) {
        var tmp_theme = ((gogisApplication.SEARCH_CURRENT_THEME && gogisApplication.SEARCH_CURRENT_THEME[gogisCurrentInstance] == false) ? "-1" : gogisCurrentTheme);
        var url = 'gogis/php/getAutoCompleteSearchResultCount.php?searchstring=' + encodeURIComponent(gogisSearchFieldValue.toLowerCase()) + '&searchobjectname=searchobjgroup_total&instance=' + gogisCurrentInstance + '&theme=' + tmp_theme;
        autocompleteRequestObjCount.sendRequest(url);
    }
}

function handleAutocompleteResponseCount(response) {
    if (isIntNegative(response)) {
        return;
    }
    if (document.getElementById("gogisAutocompleteBox").style.visibility == "visible") {
        if (response) {
            autocompleteCountJsonDoc = eval('(' + response + ')');
            if (autocompleteCountJsonDoc.root[0].searchresultcount) {
                document.getElementById("gogisAutocompleteTotal").innerHTML = "(" + autocompleteCountJsonDoc.root[0].searchresultcount + ")";
            }
        }
        document.getElementById("gogisProgressIcon").src = "gogis/images/progress_finished.gif";
    }
}

function selectAutocompleteResult() {
    var row, link;
    for (var i = 0; i < autocompleteDoc.root.length; i++) {
        row = document.getElementById("autocompleteRow" + i);
        link = document.getElementById("autocompleteRowSpan" + i);
        if (i == autocompleteSelectedIndex) {
            link.style.color = "#ffffff";
            row.style.backgroundColor = "#003366";
        } else {
            link.style.color = "#000000";
            row.style.backgroundColor = "transparent";
        }
    }
}
autocompleteRequestObj.action = handleAutocompleteResponse;
autocompleteRequestObjCount.action = handleAutocompleteResponseCount;
var autocompleteRequestObjList = new GogisRequestObject();
var autocompleteRequestObjListCount = new GogisRequestObject();
var autocompleteDocList;
var autocompleteDocListCount;
var autocompleteListIsActive = false;
var srl_totalcount;
var srl_range = gogisApplication.SEARCHRESULTLIST_NAVIGATION_LIMIT;
var limit = gogisApplication.SEARCHRESULTLIST_NAVIGATION_LIMIT;
var limit_tmp = gogisApplication.SEARCHRESULTLIST_NAVIGATION_LIMIT;
var offset = gogisApplication.SEARCHRESULTLIST_NAVIGATION_OFFSET;
var srl_offset_tmp;
var srl_objectGroup = '';
var srl_i_upper = 0;
var srl_i_lower = 1;
var srl_timertmp;
var srl_timertmp2;
var srl_range_uppper;
var srl_tmp_html;
var srl_request_url = '';
var flag_init_totalcount = true;
var flag_legendSetSearchstring = false;
var legendSearchstring;
var groupBy = gogisApplication.SEARCHRESULTLIST_NAVIGATION_GROUP_BY;
var srl_RequestIsBusy = false;
var navigateGroupControler = false;

function getSearchResultList(limit, offset, srl_objectGroup) {
    if (!srl_RequestIsBusy) {
        srl_RequestIsBusy = true;
        var timer = new Date();
        srl_timertmp = timer.getTime();
        srl_offset_tmp = offset;
        if (!autocompleteDocListCount) {
            getSearchResultCounter(srl_objectGroup);
        } else {
            var tmp_theme = ((gogisApplication.SEARCH_CURRENT_THEME && gogisApplication.SEARCH_CURRENT_THEME[gogisCurrentInstance] == false) ? "-1" : gogisCurrentTheme);
            var csv_export = ((gogisApplication.SEARCHRESULT_EXPORT_CSV && gogisApplication.SEARCHRESULT_EXPORT_CSV[gogisCurrentInstance] == true) ? true : false);
            if (flag_legendSetSearchstring) {
                var url = 'gogis/php/getAutoCompleteSearchResult.php?searchstring=' + encodeURIComponent(legendSearchstring) + '&limit=' + limit + '&offset=' + offset + '&searchobjectname=' + srl_objectGroup + '&instance=' + gogisCurrentInstance + "&map=" + szMap + '&theme=' + tmp_theme + (!browser_isMobile ? '' : '&size=24');
            } else {
                var url = 'gogis/php/getAutoCompleteSearchResult.php?searchstring=' + encodeURIComponent(gogisSearchFieldValue.toLowerCase()) + '&limit=' + limit + '&offset=' + offset + '&searchobjectname=' + srl_objectGroup + '&instance=' + gogisCurrentInstance + "&map=" + szMap + '&theme=' + tmp_theme + (!browser_isMobile ? '' : '&size=24');
            }
            if (csv_export) srl_request_url = url;
            autocompleteRequestObjList.sendRequest(url);
        }
    }
}

function gogisLegendSearchResultList(searchstring) {
    srl_i_lower = 1;
    limit = gogisApplication.SEARCHRESULTLIST_NAVIGATION_LIMIT;
    srl_range = limit;
    offset = 0;
    srl_resetSearchResultList();
    flag_init_totalcount = true;
    flag_legendSetSearchstring = true;
    legendSearchstring = searchstring;
    getSearchResultList(limit, offset, '');
}

function applySearchResultList(response) {
    if (isIntNegative(response)) {
        return;
    }
    autocompleteDocList = eval('(' + response + ')');
    if (autocompleteDoc == null) autocompleteDoc = autocompleteDocList;
    var buf = new StringBuffer();
    if (gogisApplication.MAPPREVIEW && (!gogisApplication.MAPPREVIEW[gogisCurrentInstance] || gogisApplication.MAPPREVIEW[gogisCurrentInstance] == "on") && !browser_isMobile && !browser_isMultitouch) {
        buf.append("<div id=\"MapPreview\" style=\"width:" + gogisApplication.MAPPREVIEW_WIDTH[gogisCurrentInstance] + "px;height:" + gogisApplication.MAPPREVIEW_HEIGHT[gogisCurrentInstance] + "px\"><table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" " + "height=\"100%\"><tr><td align=\"center\" widht=\"100%\" height=\"100%\">" + "<img id=\"MapPreviewImg\" src=\"gogis/images/" + gogisApplication.MAPPREVIEW_LOADING[gogisCurrentInstance] + "\"></td></tr></table></div>");
    }
    if (autocompleteDocList) {
        srl_RequestIsBusy = false;
        var i = 0;
        var layer, cLayer;
        var layername = "";
        var qlayerScale, filter, iFilter;
        var legendiconsrc = "";
        var cMap = myKaMap.getCurrentMap();
        var cScale = "";
        var tmpScale = "";
        if (gogisApplication.MAPPREVIEW && (!gogisApplication.MAPPREVIEW[gogisCurrentInstance] || gogisApplication.MAPPREVIEW[gogisCurrentInstance] == "on") && !browser_isMobile && !browser_isMultitouch) {
            cScale = gogisApplication.MAPPREVIEW_SCALE[gogisCurrentInstance].toUpperCase();
            if (cScale != 'DYNAMIC' && gogisMapThemes[gogisCurrentTheme].defaultMinScale > 0) {
                if (cScale > "") {
                    if (gogisMapThemes[gogisCurrentTheme].defaultMinScale < cScale) {
                        cScale = gogisMapThemes[gogisCurrentTheme].defaultMinScale;
                    }
                } else cScale = gogisMapThemes[gogisCurrentTheme].defaultMinScale;
            }
        }
        for (i = 0; i < autocompleteDocList.root.length; i++) {
            cLayer = autocompleteDocList.root[i];
            if (cLayer.searchresulttextshort) {
                layername = cLayer.searchresultlayername;
                layer = cMap.getLayer(layername);
                if (layer.searchtitle) {
                    tmp_text = "<span class='gogisSearchresultTitleItalic'>" + gLocalizer.localize(cLayer.searchobjectname) + ": </span>" + cLayer.searchresulttextshort;
                } else {
                    tmp_text = cLayer.searchresulttextshort;
                }
                buf.append("<table class='gogisSearchresultWidth'><tr><td class='gogisAutocompleteListIcon'>");
                if (!((cLayer.searchobjecticon).match(/..tmp/))) {
                    legendiconsrc = cLayer.searchobjecticon;
                } else if (layer.legendicon.toLowerCase() != "dynamic") {
                    legendiconsrc = "gogis/images/legendicons/" + layer.legendicon;
                } else {
                    legendiconsrc = cLayer.searchobjecticon;
                }
                buf.append("<img class='gogisSearchresultListIcon' src='" + legendiconsrc);
                buf.append("' title='" + gLocalizer.localize(cLayer.searchobjectname));
                buf.append(": " + gLocalizer.localize(cLayer.searchobjectdescription) + "'>");
                buf.append("</td>");
                buf.append("<td class='gogisAutocompleteListTitle' width='100%'>");
                buf.append("<a href='javascript:click()' ");
                buf.append("onclick='");
                buf.append("sendAutocompleteRequestHighlight(");
                buf.append(cLayer.searchresultlayeridvalue);
                buf.append(",");
                buf.append("\"");
                buf.append(layername);
                buf.append("\"");
                buf.append(",true);if(mySearchResultDialogWindow){if(mySearchResultDialogWindow.minmax)mySearchResultDialogWindow.switchMinMaxWindow(true);else mySearchResultDialogWindow.close();}");
                if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                    buf.append("sendAutocompleteRequestDetails(");
                    buf.append("\"");
                    buf.append(cLayer.searchresultlayeridname);
                    buf.append("\"");
                    buf.append(",");
                    buf.append(cLayer.searchresultlayeridvalue);
                    buf.append(",");
                    buf.append("\"");
                    buf.append(layername);
                    buf.append("\"");
                    buf.append(",false);");
                }
                buf.append("'>");
                buf.append(tmp_text);
                buf.append("</a></td></tr>");
                if (cLayer.searchresulttextlong && cLayer.searchresulttextlong) {
                    buf.append("<tr><td></td><td class='gogisAutocompleteListHeading' colspan='2'>");
                    buf.append(cLayer.searchresulttextlong);
                    buf.append("</td></tr>");
                }
                buf.append("<tr class='gogisSearchresultLinks'><td></td><td class='gogisAutocompleteListLinks' colspan='2'>");
                if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                    buf.append("<a href='javascript:click()' ");
                    buf.append("onclick='");
                    buf.append("sendAutocompleteRequestDetails(");
                    buf.append("\"");
                    buf.append(cLayer.searchresultlayeridname);
                    buf.append("\"");
                    buf.append(",");
                    buf.append(cLayer.searchresultlayeridvalue);
                    buf.append(",");
                    buf.append("\"");
                    buf.append(layername);
                    buf.append("\"");
                    buf.append(",true);");
                    buf.append("sendAutocompleteRequestHighlight(");
                    buf.append(cLayer.searchresultlayeridvalue);
                    buf.append(",");
                    buf.append("\"");
                    buf.append(layername);
                    buf.append("\"");
                    buf.append(",false);");
                    buf.append("'>");
                    buf.append(gLocalizer.localize("NAVIGATION_DETAILS") + "</a>&nbsp;&nbsp;<span class='gogisAutocompleteListDelimiter'>|</span>&nbsp;&nbsp;");
                }
                buf.append("<a href='javascript:click()' ");
                buf.append("onclick='");
                buf.append("sendAutocompleteRequestHighlight(");
                buf.append(cLayer.searchresultlayeridvalue);
                buf.append(",");
                buf.append("\"");
                buf.append(layername);
                buf.append("\"");
                buf.append(",true);if(mySearchResultDialogWindow){if(mySearchResultDialogWindow.minmax)mySearchResultDialogWindow.switchMinMaxWindow(true);else mySearchResultDialogWindow.close();}");
                if (!gogisApplication.SHOW_SEARCH_DETAILS || (gogisApplication.SHOW_SEARCH_DETAILS && gogisApplication.SHOW_SEARCH_DETAILS[gogisCurrentInstance])) {
                    buf.append("sendAutocompleteRequestDetails(");
                    buf.append("\"");
                    buf.append(cLayer.searchresultlayeridname);
                    buf.append("\"");
                    buf.append(",");
                    buf.append(cLayer.searchresultlayeridvalue);
                    buf.append(",");
                    buf.append("\"");
                    buf.append(layername);
                    buf.append("\"");
                    buf.append(",false);");
                }
                buf.append("'");
                if (gogisApplication.MAPPREVIEW && (!gogisApplication.MAPPREVIEW[gogisCurrentInstance] || gogisApplication.MAPPREVIEW[gogisCurrentInstance] == "on") && !browser_isMobile && !browser_isMultitouch) {
                    qlayerScale = "";
                    for (var j = 0; j < layer.scales.length; j++) {
                        if (layer.scales[j] == 1) {
                            qlayerScale = cMap.getScales()[j];
                            break;
                        }
                    }
                    if (cScale == 'DYNAMIC') tmpScale = "";
                    else if (cScale == "" || (qlayerScale > "" && parseInt(cScale) > parseInt(qlayerScale))) tmpScale = qlayerScale;
                    else tmpScale = cScale;
                    if (layer.filter) {
                        filter = "&filter=";
                        for (iFilter = 0; iFilter < layer.filter.fields.length; iFilter++) {
                            filter += (iFilter > 0 ? "," : "") + layer.filter.fields[iFilter].replacename + "|" + document.getElementById(layer.filter.name + "_" + layer.filter.fields[iFilter].replacename).getAttribute("currentValue") + "|" + layer.filter.fields[iFilter].type;
                        }
                    } else filter = "";
                    buf.append(" onMouseOver='");
                    buf.append("document.getElementById(\"MapPreviewImg\").src=\"getMapPreview.php?" + "instance=" + gogisCurrentInstance + "&theme=" + gogisCurrentTheme + "&qLayer=" + layername + "&qItem=" + cLayer.searchresultlayeridname + "&qValue=" + cLayer.searchresultlayeridvalue + "&height=" + gogisApplication.MAPPREVIEW_HEIGHT[gogisCurrentInstance] + "&width=" + gogisApplication.MAPPREVIEW_WIDTH[gogisCurrentInstance] + "&color=" + gogisApplication.MAPPREVIEW_COLOR[gogisCurrentInstance] + (tmpScale > "" ? "&scale=" + tmpScale : "") + filter + "&layers=\"+getCurrentBasemapByScale(" + tmpScale + ")'");
                    buf.append(" onMouseOut='");
                    buf.append("document.getElementById(\"MapPreview\").style.display=\"none\";" + "document.getElementById(\"MapPreviewImg\").src=\"gogis/images/" + gogisApplication.MAPPREVIEW_LOADING[gogisCurrentInstance] + "\"\'");
                    buf.append(" onMouseMove='updateMapPreview(event);'");
                }
                buf.append(">");
                buf.append(gLocalizer.localize("NAVIGATION_MAP") + "</a>");
                buf.append("</td></tr></table>");
            }
        }
        srl_tmp_html = buf.toString();
        if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
            if (!mySearchResultDialogWindow) showSearchResult();
            document.getElementById("gogisAutocompleteListContent").innerHTML = buf.toString();
            showSearchResult();
        } else {
            document.getElementById("gogisAutocompleteList").innerHTML = srl_tmp_html;
            if (gogisApplication.IE6_PNG_ALPHA[gogisCurrentInstance] && dd.ie && !isIE7) {
                applyPNGFilterToChilds(document.getElementById("gogisAutocompleteList"));
            }
        }
        buf = new StringBuffer();
        buf.append("<table width='100%' id='gogisAutocompleteNavigationTimer'><tr><td width='100%'>");
        if ((Math.floor(srl_totalcount / limit)) >= srl_range) srl_i_upper = srl_range;
        else srl_i_upper = (Math.ceil(srl_totalcount / limit));
        if (srl_offset_tmp > 0) {
            buf.append("<a class='gogisAutocompleteNavigationLink' href='javascript:click()' ");
            buf.append("onclick='if(!srl_RequestIsBusy){srl_setFirst();getSearchResultList(" + limit + ",");
            buf.append(0);
            buf.append(",\"");
            buf.append(srl_objectGroup);
            buf.append("\");}'>" + gLocalizer.localize("NAVIGATION_FIRST"));
            buf.append("&nbsp;</a><span class='gogisAutocompleteListDelimiter'>|</span>");
        } else {
            buf.append("<span class='gogisAutocompleteNavigationInactive'>");
            buf.append(gLocalizer.localize("NAVIGATION_FIRST"));
            buf.append("&nbsp;</span><span class='gogisAutocompleteListDelimiter'>|</span>");
        }
        if (srl_offset_tmp > 0) {
            buf.append("<a class='gogisAutocompleteNavigationLink' href='javascript:click()' ");
            buf.append("onclick='if(!srl_RequestIsBusy){srl_setBack();getSearchResultList(" + limit + ",");
            buf.append(srl_offset_tmp - limit);
            buf.append(",\"");
            buf.append(srl_objectGroup);
            buf.append("\");}'>&nbsp;" + gLocalizer.localize("NAVIGATION_BACK"));
            buf.append("&nbsp;</a><span class='gogisAutocompleteListDelimiter'>" + (browser_isMobile ? "&nbsp;&nbsp;" : "|") + "</span> ");
        } else {
            buf.append("<span class='gogisAutocompleteNavigationInactive'>");
            buf.append("&nbsp;" + gLocalizer.localize("NAVIGATION_BACK"));
            buf.append("&nbsp;</span><span class='gogisAutocompleteListDelimiter'>" + (browser_isMobile ? "&nbsp;&nbsp;" : "|") + "</span> ");
        }
        for (i = srl_i_lower; i <= srl_i_upper; i++) {
            if ((srl_offset_tmp / limit) + 1 == i) {
                buf.append("<span class='gogisAutocompleteNavigationSelected'>");
                buf.append("&nbsp;<b><nobr>-" + i + "-</nobr></b>&nbsp;</span><span class='gogisAutocompleteListDelimiter'>" + ((i == srl_i_upper && browser_isMobile) ? "&nbsp;&nbsp; " : "|") + "</span>");
            } else {
                buf.append("<a class='gogisAutocompleteNavigationLink' href='javascript:click()' ");
                buf.append("onclick='if(!srl_RequestIsBusy){getSearchResultList(" + limit + ",");
                buf.append((i - 1) * limit);
                buf.append(",\"");
                buf.append(srl_objectGroup);
                buf.append("\");}'>&nbsp;" + i + "&nbsp;</a><span class='gogisAutocompleteListDelimiter'>" + ((i == srl_i_upper && browser_isMobile) ? "&nbsp;&nbsp; " : "|") + "</span>");
            }
        }
        if (srl_totalcount != 0 && srl_offset_tmp + limit != Math.ceil(srl_totalcount / limit) * limit) {
            buf.append("<a href='javascript:click()' ");
            buf.append("onclick='if(!srl_RequestIsBusy){srl_setNext();getSearchResultList(" + limit + ",");
            buf.append(srl_offset_tmp + limit);
            buf.append(",\"");
            buf.append(srl_objectGroup);
            buf.append("\");}'> " + gLocalizer.localize("NAVIGATION_NEXT"));
            buf.append("&nbsp;</a><span class='gogisAutocompleteListDelimiter'>|</span>");
        } else {
            buf.append("<span class='gogisAutocompleteNavigationInactive'> ");
            buf.append(gLocalizer.localize("NAVIGATION_NEXT") + "&nbsp;</span>");
        }
        if (srl_i_upper > 0 && srl_totalcount > srl_offset_tmp + limit) {
            buf.append("<a class='gogisAutocompleteNavigationLink' href='javascript:click()' ");
            buf.append("onclick='if(!srl_RequestIsBusy){srl_setLast();getSearchResultList(" + limit + ",");
            if (srl_totalcount % limit != 0) buf.append((Math.floor(srl_totalcount / limit)) * limit);
            else buf.append(srl_totalcount - limit);
            buf.append(",\"");
            buf.append(srl_objectGroup);
            buf.append("\");}'>&nbsp;" + gLocalizer.localize("NAVIGATION_LAST") + "</a>");
        } else {
            buf.append("&nbsp;<span class='gogisAutocompleteListDelimiter'>|</span>");
            buf.append("<span class='gogisAutocompleteNavigationInactive'>");
            buf.append("&nbsp;" + gLocalizer.localize("NAVIGATION_LAST") + "</span>");
        }
    }
    if (!browser_isMobile) buf.append("&nbsp;&nbsp;&nbsp;");
    buf.append("&nbsp;&nbsp;&nbsp;&nbsp; <nobr id='gogisAutocompleteNavigationResults'>");
    var timer2 = new Date();
    srl_timertmp2 = timer2.getTime();
    if (srl_totalcount != 0) buf.append((srl_offset_tmp + 1) + "-");
    else buf.append((srl_offset_tmp) + "-");
    if (Math.floor(srl_totalcount / limit) == (srl_offset_tmp / limit)) {
        buf.append(srl_totalcount);
        srl_range_uppper = srl_totalcount;
    } else {
        buf.append((srl_offset_tmp + limit));
        srl_range_uppper = srl_offset_tmp + limit;
    }
    buf.append("&nbsp;" + gLocalizer.localize("NAVIGATION_TIMER_OF") + "&nbsp;" + srl_totalcount + "</nobr>");
    if (!browser_isMobile) {
        buf.append("&nbsp;" + gLocalizer.localize("NAVIGATION_TIMER_IN") + "&nbsp;(" + ((srl_timertmp2 - srl_timertmp) / 1000).toFixed(2) + "&nbsp;s)");
        buf.append("&nbsp;&nbsp;&nbsp;&nbsp; ");
        for (i = 0; i < groupBy.length; i++) {
            if (srl_totalcount < groupBy[i]) {
                buf.append("<span class='gogisAutocompleteNavigationInactive'>&nbsp;" + groupBy[i] + "&nbsp;-</span>");
            } else if (limit == groupBy[i] && !navigateGroupControler) {
                buf.append("<span class='gogisAutocompleteNavigationSelected'>&nbsp;" + groupBy[i] + "&nbsp;</span>-");
            } else {
                buf.append("<a class='gogisAutocompleteNavigationLink' href='javascript:click()' title='" + gLocalizer.localize("NAVIGATION_LIMIT_" + i + "") + "' ");
                buf.append("onclick='navigateGroupControler=false; if(!srl_RequestIsBusy){srl_setLimtChange(" + groupBy[i] + ");getSearchResultList(" + groupBy[i] + ",");
                buf.append(0);
                buf.append(",\"");
                buf.append(srl_objectGroup);
                buf.append("\");};'>&nbsp;" + groupBy[i] + "&nbsp;</a>-");
            }
        }
        if (srl_totalcount < limit) {
            buf.append("<span class='gogisAutocompleteNavigationInactive'>&nbsp;" + gLocalizer.localize("NAVIGATION_NOLIMIT") + "&nbsp;</span>");
        } else if (srl_totalcount < 1000) {
            if (limit <= groupBy[groupBy.length - 1] && !navigateGroupControler) {
                buf.append("<a class='gogisAutocompleteNavigationLink' href='javascript:click()' title='" + gLocalizer.localize("NAVIGATION_NOLIMIT") + "' ");
                buf.append("onclick='navigateGroupControler=true; if(!srl_RequestIsBusy){limit=" + srl_totalcount + ";offset=0;getSearchResultList(" + srl_totalcount + ",");
                buf.append(0);
                buf.append(",\"");
                buf.append(srl_objectGroup);
                buf.append("\");};'>&nbsp;" + gLocalizer.localize("NAVIGATION_NOLIMIT") + "&nbsp;</a>");
            }
            if (limit == srl_totalcount && navigateGroupControler) {
                buf.append("<span class='gogisAutocompleteNavigationSelected'>&nbsp;" + gLocalizer.localize("NAVIGATION_NOLIMIT") + "&nbsp;</span>");
            }
        } else {
            buf.append("<span class='gogisAutocompleteNavigationInactive'>");
            buf.append("&nbsp;" + gLocalizer.localize("NAVIGATION_NOLIMIT") + "&nbsp;</span>");
        }
    }
    buf.append("</td>");
    navigateGroupControler = false;
    if (gogisApplication.SEARCHRESULT_EXPORT_CSV && gogisApplication.SEARCHRESULT_EXPORT_CSV[gogisCurrentInstance] == true) {
        buf.append("<td><a href='" + srl_request_url + "&csv=1' target='_blank'>");
        buf.append("<img class='gogisFooterCsvIcon' src='kamap/images/a_pixel.gif' title='");
        buf.append(gLocalizer.localize("CSV_EXPORT") + "'></a></td>");
    }
    buf.append("<td><a href='javascript:click()' ");
    buf.append("onClick=\"gogisXPopUpWithMenu('gogis/php/printSearchResults.php?instance=");
    buf.append(gogisCurrentInstance + "&language=" + gogisCurrentLanguage + "&formatlocale=");
    buf.append(gLocalizer.localize("FORMAT_LOCALE") + "&formatlongdate=");
    buf.append(gLocalizer.localize("FORMAT_LONGDATE") + "&title=");
    buf.append(gLocalizer.localize("PRINT_SEARCHRESULT"));
    buf.append("','print_searchResultList',");
    buf.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
    buf.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");return false;\">");
    buf.append("<img class='gogisFooterPrintIcon' src='kamap/images/a_pixel.gif' title='");
    buf.append(gLocalizer.localize("PRINT_SEARCHRESULT") + "'></a></td>");
    buf.append("</tr></table>");
    autocompleteDetailsIsActive = false;
    autocompleteListIsActive = true;
    if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
        if (!mySearchResultDialogWindow) showSearchResult();
        document.getElementById("gogisAutocompleteNavigationContent").innerHTML = buf.toString();
        showSearchResult();
    } else {
        document.getElementById("gogisAutocompleteNavigation").innerHTML = buf.toString();
        gogisTabControlChange(2, true);
    }
    return false;
}

function srl_resetSearchResultList() {
    srl_range = limit;
    srl_i_lower = 1;
    offset = 0;
    srl_objectGroup = '';
    autocompleteDocListCount = false;
}

function srl_setCategories(i) {
    srl_i_lower = 1;
    limit = 10;
    srl_range = limit;
    offset = 0;
    srl_objectGroup = autocompleteDocListCount.root[i].searchobjectname;
    if (srl_objectGroup == "SEARCHOBJGROUP_TOTAL") srl_objectGroup = '';
    srl_totalcount = autocompleteDocListCount.root[i].searchresultcount;
}

function srl_setLimtChange(newLimit) {
    limit = newLimit;
    srl_offset_tmp = 0;
    srl_i_lower = 1;
    srl_i_upper = limit;
    srl_range = newLimit;
    limit_tmp = newLimit;
}

function srl_setFirst() {
    srl_i_lower = 1;
    srl_range = limit;
}

function srl_setBack() {
    if (srl_i_lower > 1) {
        srl_i_lower -= 1;
        srl_range -= 1;
    }
}

function srl_setNext() {
    if (srl_i_upper > (limit - 1) && srl_i_lower < Math.floor(srl_totalcount / limit) - (limit - 2)) {
        srl_i_lower += 1;
        srl_range += 1;
    }
}

function srl_setLast() {
    if ((Math.floor(srl_totalcount / limit)) > limit) {
        srl_i_lower = Math.ceil(srl_totalcount / limit) - (limit - 1);
        srl_range = Math.ceil(srl_totalcount / limit);
    }
}

function getSearchResultCounter(object) {
    var url;
    var tmp_theme = ((gogisApplication.SEARCH_CURRENT_THEME && gogisApplication.SEARCH_CURRENT_THEME[gogisCurrentInstance] == false) ? "-1" : gogisCurrentTheme);
    if (flag_legendSetSearchstring) {
        url = 'gogis/php/getAutoCompleteSearchResultCount.php?searchstring=' + encodeURIComponent(legendSearchstring.toLowerCase()) + "&searchobjectname=" + "&instance=" + gogisCurrentInstance + "&theme=" + tmp_theme;
        autocompleteRequestObjListCount.sendRequest(url);
    } else {
        url = 'gogis/php/getAutoCompleteSearchResultCount.php?searchstring=' + encodeURIComponent(gogisSearchFieldValue.toLowerCase()) + object + "&instance=" + gogisCurrentInstance + "&theme=" + tmp_theme;
        autocompleteRequestObjListCount.sendRequest(url);
    }
}

function setSearchResultCounter(response) {
    autocompleteDocListCount = eval('(' + response + ')');
    setupSearchResultCategories();
    var url;
    var tmp_theme = ((gogisApplication.SEARCH_CURRENT_THEME && gogisApplication.SEARCH_CURRENT_THEME[gogisCurrentInstance] == false) ? "-1" : gogisCurrentTheme);
    var csv_export = ((gogisApplication.SEARCHRESULT_EXPORT_CSV && gogisApplication.SEARCHRESULT_EXPORT_CSV[gogisCurrentInstance] == true) ? true : false);
    if (flag_legendSetSearchstring) {
        url = 'gogis/php/getAutoCompleteSearchResult.php?searchstring=' + encodeURIComponent(legendSearchstring) + '&limit=' + limit + '&offset=' + offset + '&searchobjectname=' + srl_objectGroup + '&instance=' + gogisCurrentInstance + '&map=' + szMap + '&theme=' + tmp_theme + (!browser_isMobile ? '' : '&size=24');
    } else {
        url = 'gogis/php/getAutoCompleteSearchResult.php?searchstring=' + encodeURIComponent(gogisSearchFieldValue.toLowerCase()) + '&limit=' + limit + '&offset=' + offset + '&searchobjectname=' + srl_objectGroup + '&instance=' + gogisCurrentInstance + '&map=' + szMap + '&theme=' + tmp_theme + (!browser_isMobile ? '' : '&size=24');
    }
    if (csv_export) srl_request_url = url;
    autocompleteRequestObjList.sendRequest(url);
}

function setupSearchResultCategories() {
    if (autocompleteDocListCount) {
        var j = 0;
        var i = 0;
        var buf = new StringBuffer();
        var buftmp = new StringBuffer();
        buftmp.append("<table width='100%'><tr><td id='gogisSearchresultGroups' width='65%'>");
        for (i = 0; i < autocompleteDocListCount.root.length; i++) {
            if (autocompleteDocListCount.root[i].searchobjectname == "SEARCHOBJGROUP_TOTAL") {
                if (srl_objectGroup > "") {
                    buftmp.append("<a class='gogisSearchresultGroupsInactive' href='javascript:click()' ");
                    buftmp.append("title='" + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectdescription));
                    buftmp.append("' onclick='srl_setCategories(" + i + ");setupSearchResultCategories();getSearchResultList(" + limit + ",0,\"");
                    buftmp.append("\");'><nobr><img class='gogisSearchresultGroupsImageUp' " + "src='kamap/images/a_pixel.gif'>");
                    if (gogisApplication.CONST_SEARCHRESULT_GROUPICONS) {
                        buftmp.append("<img valign='middle' width='68' heigth='20' border='0' align='top' " + "src='gogis/images/searchicons/group/" + autocompleteDocListCount.root[i].searchobjecticon);
                        buftmp.append("' title='" + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectname));
                        buftmp.append(": " + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectdescription));
                        buftmp.append("'>");
                    } else buftmp.append(gLocalizer.localize("TITLE_TOTAL_SEARCHRESULTS"));
                    buftmp.append("&nbsp;");
                    buftmp.append("(" + autocompleteDocListCount.root[i].searchresultcount + ")");
                    buftmp.append("</nobr></a>");
                } else {
                    buftmp.append("<nobr><img class='gogisSearchresultGroupsImageDown' src='kamap/images/a_pixel.gif'>");
                    if (gogisApplication.CONST_SEARCHRESULT_GROUPICONS) {
                        buftmp.append("<img valign='middle' width='68' heigth='20' border='0' align='top' " + "src='gogis/images/searchicons/group/" + autocompleteDocListCount.root[i].searchobjecticon);
                        buftmp.append("' title='" + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectname));
                        buftmp.append(": " + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectdescription));
                        buftmp.append("'>");
                    } else {
                        buftmp.append("<span class='gogisSearchresultGroupsActive'>" + gLocalizer.localize("TITLE_TOTAL_SEARCHRESULTS"));
                    }
                    buftmp.append("&nbsp;");
                    buftmp.append("(" + autocompleteDocListCount.root[i].searchresultcount + ")");
                    buftmp.append("</span></nobr>");
                }
                buftmp.append(" ");
            } else {
                if (autocompleteDocListCount.root[i].searchobjectname == srl_objectGroup) {
                    buf.append("<nobr><img class='gogisSearchresultGroupsImageDown' src='kamap/images/a_pixel.gif'>");
                    if (gogisApplication.CONST_SEARCHRESULT_GROUPICONS) {
                        buf.append("<img valign='middle' width='20' heigth='20' border='0' align='top' " + "src='gogis/images/searchicons/group/" + autocompleteDocListCount.root[i].searchobjecticon);
                        buf.append("' title='" + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectname));
                        buf.append(": " + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectdescription));
                        buf.append("'>");
                    } else {
                        buf.append("<span class='gogisSearchresultGroupsActive'>" + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectname));
                    }
                    buf.append("&nbsp;");
                    buf.append("(" + autocompleteDocListCount.root[i].searchresultcount + ")");
                    buf.append("</span></nobr>");
                } else {
                    buf.append("<a class='gogisSearchresultGroupsInactive' href='javascript:click()' ");
                    buf.append("title='" + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectdescription));
                    buf.append("' onclick='srl_setCategories(" + i + ");setupSearchResultCategories();getSearchResultList(" + limit + ",0,\"");
                    buf.append(autocompleteDocListCount.root[i].searchobjectname);
                    buf.append("\");'><nobr><img class='gogisSearchresultGroupsImageUp' src='kamap/images/a_pixel.gif'>");
                    if (gogisApplication.CONST_SEARCHRESULT_GROUPICONS) {
                        buf.append("<img valign='middle' width='20' heigth='20' border='0' align='top' " + "src='gogis/images/searchicons/group/" + autocompleteDocListCount.root[i].searchobjecticon);
                        buf.append("' title='" + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectname));
                        buf.append(": " + gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectdescription));
                        buf.append("'>");
                    } else buf.append(gLocalizer.localize(autocompleteDocListCount.root[i].searchobjectname));
                    buf.append("&nbsp;");
                    buf.append("(" + autocompleteDocListCount.root[i].searchresultcount + ")");
                    buf.append("</nobr></a>");
                }
                buf.append(" ");
            }
        }
        buf.append("</td>");
        if (browser_isMobile) {
            buf.append("<td></td>");
        } else {
            buf.append("<td width='35%' ALIGN='right'><span class='gogisSearchresultGroupsActive'>" + gLocalizer.localize("TITLE_SEARCH_KEYWORD") + ":</span> <span class='gogisSearchresultGroupsInactive'>");
            buf.append(gogisSearchFieldValue + "</span></td>");
        }
        buf.append("</tr><table>");
        if (flag_init_totalcount) {
            srl_totalcount = autocompleteDocListCount.root[i - 1].searchresultcount;
            flag_init_totalcount = false;
        }
    }
    if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
        if (!mySearchResultDialogWindow) showSearchResult();
        document.getElementById("gogisAutocompleteCategoriesContent").innerHTML = buftmp.toString() + buf.toString();
        showSearchResult();
    } else {
        document.getElementById("gogisAutocompleteCategories").innerHTML = buftmp.toString() + buf.toString();
    }
}

function resetSearchresultlistTotal() {
    srl_i_lower = 1;
    limit = gogisApplication.SEARCHRESULTLIST_NAVIGATION_LIMIT;
    srl_range = limit;
    offset = gogisApplication.SEARCHRESULTLIST_NAVIGATION_OFFSET;
    srl_resetSearchResultList();
    flag_legendSetSearchstring = false;
    flag_init_totalcount = true;
    if (limit > groupBy[groupBy.length - 1]) srl_setLimtChange(groupBy[0]);
}

function updateMapPreview(e) {
    e = (e) ? e : ((event) ? event : null);
    var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    var list = obj = document.getElementById((gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) ? "gogisAutocompleteListContent" : "gogisAutocompleteList");
    var listWidth = parseInt(list.style.width);
    var listHeight = parseInt(list.style.height);
    var offsetLeft = 0;
    var offsetTop = 0;
    while (obj) {
        offsetLeft += parseInt(obj.offsetLeft);
        offsetTop += parseInt(obj.offsetTop);
        obj = obj.offsetParent;
    }
    x = x - offsetLeft;
    y = y - offsetTop;
    if (list.id == "gogisAutocompleteListContent") {
        x = x + 10;
        y = y + 10 + getObjectHeight(getRawObject("gogisAutocompleteCategoriesContent"));
        document.getElementById("MapPreview").style.left = ((listWidth / 2) > x) ? (x + 7) + 'px' : (x - gogisApplication.MAPPREVIEW_WIDTH[gogisCurrentInstance] - 7) + 'px';
        document.getElementById("MapPreview").style.top = ((listHeight / 2) > y) ? (y + 7) + 'px' : (y - gogisApplication.MAPPREVIEW_HEIGHT[gogisCurrentInstance] - 7) + 'px';
    } else {
        document.getElementById("MapPreview").style.left = ((listWidth / 2) > x) ? (x + parseInt(list.scrollLeft) + 7) + 'px' : (x + parseInt(list.scrollLeft) - gogisApplication.MAPPREVIEW_WIDTH[gogisCurrentInstance] - 7) + 'px';
        document.getElementById("MapPreview").style.top = ((listHeight / 2) > y) ? (y + parseInt(list.scrollTop) + 7) + 'px' : (y + parseInt(list.scrollTop) - gogisApplication.MAPPREVIEW_HEIGHT[gogisCurrentInstance] - 7) + 'px';
    }
    document.getElementById("MapPreview").style.display = 'inline';
}
autocompleteRequestObjList.action = applySearchResultList;
autocompleteRequestObjListCount.action = setSearchResultCounter;
var autocompleteRequestObjDetails = new GogisRequestObject();
var autocompleteDetailsShowTab = false;
var autocompleteDetailsCache = new Array();
var autocompleteDetailsIsBusy = false;
var autocompleteDetailsTmpLayername = "";
var autocompleteDetailsTmpIdValue = "";
var autocompleteDetailsIsActive = false;

function sendAutocompleteRequestDetails(idname, idvalue, layername, show) {
    var cache = getAutocompleteCachedDetails(layername, idvalue);
    if (cache > "") {
        var html = cache.split("<!--break-->");
        if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
            if (!myDetailDialogWindow) showDetails();
            document.getElementById("gogisDetailsDialogContent").innerHTML = html[0] + "<br>" + html[1];
            showDetails();
        } else {
            document.getElementById("gogisSearchResultDetailsHeader").innerHTML = html[0];
            document.getElementById("gogisSearchResultDetailsContent").innerHTML = html[1];
            document.getElementById("gogisSearchResultDetailsFooter").innerHTML = getAutocompleteCachedDetailsFooter(layername, idvalue);
            autocompleteDetailsIsActive = true;
            if (show) gogisTabControlChange(3, true);
            else gogisTabControlChange(null);
            if (gogisApplication.IE6_PNG_ALPHA[gogisCurrentInstance] && dd.ie && !isIE7) applyPNGFilterToChilds(document.getElementById("gogisSearchResultDetailsHeader"));
        }
    } else if (!autocompleteDetailsIsBusy) {
        autocompleteDetailsIsBusy = true;
        autocompleteDetailsTmpLayername = layername;
        autocompleteDetailsTmpIdValue = idvalue;
        var url = "gogis/php/getAutoCompleteDetails.php?idName=" + idname + "&idValue=" + idvalue + "&LayerName=" + layername + "&map=" + szMap + "&instance=" + gogisCurrentInstance;
        autocompleteDetailsShowTab = show;
        myQueueManager.enqueue("autocompleteRequestObjDetails.sendRequest", "autocompleteRequestObjDetails.sendRequest", url, null);
    }
}

function handleAutocompleteResponseDetails(response) {
    if (isIntNegative(response)) return false;
    var html = gLocalizer.localizeText(response);
    setAutocompleteCachedDetails(autocompleteDetailsTmpLayername, autocompleteDetailsTmpIdValue, html);
    var html = html.split("<!--break-->");
    var footer_html = "<table><tr><td>" + html[2] + "</td><!--print--><td width='100%' align='right' class='gogisAutocompleteListLinks' nowrap>" + "<a href='javascript:click()' onclick='" + "sendAutocompleteRequestHighlight(" + autocompleteDetailsTmpIdValue + ",\"" + autocompleteDetailsTmpLayername + "\",true);'>" + gLocalizer.localize("NAVIGATION_MAP") + "</a>" + "&nbsp;&nbsp;&nbsp;<span class='gogisAutocompleteListDelimiter'>|</span>&nbsp;&nbsp;" + "</td><td class='gogisFooterPrint'><a href='javascript:click()' " + "onClick=\"gogisXPopUpWithMenu('gogis/php/printSearchDetails.php?instance=" + gogisCurrentInstance + "&language=" + gogisCurrentLanguage + "&formatlocale=" + gLocalizer.localize("FORMAT_LOCALE") + "&formatlongdate=" + gLocalizer.localize("FORMAT_LONGDATE") + "&title=" + gLocalizer.localize("PRINT_SEARCHRESULT_DETAILS") + "','print_searchResultDetails'," + gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + "," + gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");return false;\"><img class='gogisFooterPrintIcon' " + "src='kamap/images/a_pixel.gif' title='" + gLocalizer.localize("PRINT_SEARCHRESULT_DETAILS") + "'></a></td><!--print--></tr></table>";
    setAutocompleteCachedDetailsFooter(autocompleteDetailsTmpLayername, autocompleteDetailsTmpIdValue, footer_html);
    if (gogisApplication.SHOW_FULLSCREEN && gogisApplication.SHOW_FULLSCREEN[gogisCurrentInstance] == true) {
        if (!myDetailDialogWindow) showDetails();
        document.getElementById("gogisDetailsDialogContent").innerHTML = html[0] + "<br>" + html[1];
        showDetails();
    } else {
        document.getElementById("gogisSearchResultDetailsHeader").innerHTML = html[0];
        document.getElementById("gogisSearchResultDetailsContent").innerHTML = html[1];
        document.getElementById("gogisSearchResultDetailsFooter").innerHTML = footer_html;
        autocompleteDetailsIsActive = true;
        if (autocompleteDetailsShowTab) gogisTabControlChange(3, true);
        else gogisTabControlChange(null);
        if (gogisApplication.IE6_PNG_ALPHA[gogisCurrentInstance] && dd.ie && !isIE7) applyPNGFilterToChilds(document.getElementById("gogisSearchResultDetailsHeader"));
    }
    autocompleteDetailsIsBusy = false;
}

function getAutocompleteCachedDetails(layername, idvalue) {
    for (var i = 0; i < autocompleteDetailsCache.length; i++) {
        if (autocompleteDetailsCache[i].layername == layername && autocompleteDetailsCache[i].idvalue == idvalue) {
            return this.autocompleteDetailsCache[i].content;
        }
    }
    return "";
}

function getAutocompleteCachedDetailsFooter(layername, idvalue) {
    for (var i = 0; i < autocompleteDetailsCache.length; i++) {
        if (autocompleteDetailsCache[i].layername == layername && autocompleteDetailsCache[i].idvalue == idvalue) {
            return this.autocompleteDetailsCache[i].footer;
        }
    }
    return new Object();
}

function setAutocompleteCachedDetails(layername, idvalue, content) {
    if (content > "" && idvalue > "" && content > "") {
        var tmp_cache = new Object();
        tmp_cache.layername = layername;
        tmp_cache.idvalue = idvalue;
        tmp_cache.content = content;
        autocompleteDetailsCache.push(tmp_cache);
    }
}

function setAutocompleteCachedDetailsFooter(layername, idvalue, footer) {
    for (var i = 0; i < autocompleteDetailsCache.length; i++) {
        if (autocompleteDetailsCache[i].layername == layername && autocompleteDetailsCache[i].idvalue == idvalue) {
            autocompleteDetailsCache[i].footer = footer;
        }
    }
}
autocompleteRequestObjDetails.action = handleAutocompleteResponseDetails;
var autocompleteRequestObjHighlight = new GogisRequestObject();
var autocompleteHighlightChangeTheme = false;
var autocompleteHighlightShowTab = false;
var autocompleteHighlightOn = true;
var autocompleteHighlightId = null;
var autocompleteHighlightLayer;
var autocompleteHighlightObj;

function highlightObjects(idvalue, layers) {
    var groups = ((arguments.length >= 3) ? arguments[2] : true);
    var show = ((arguments.length >= 4) ? arguments[3] : true);
    autocompleteHighlightOn = ((arguments.length >= 5) ? arguments[4] : true);
    autocompleteDetailsIsActive = false;
    autocompleteListIsActive = false;
    var idName = ((arguments.length >= 6) ? arguments[5] : "");
    var isTextId = ((arguments.length >= 7) ? arguments[6] : 0);
    var changeTheme = ((arguments.length >= 8) ? arguments[7] : true);
    sendAutocompleteRequestHighlight(idvalue, (groups ? getHighlightLayers(layers) : layers), show, idName, isTextId, changeTheme);
}

function sendAutocompleteRequestHighlight(idvalue, layername, show) {
    var url = "gogis/php/getSearchResultMapExtent.php" + "?idValue=" + idvalue + "&layerName=" + layername + "&instance=" + gogisCurrentInstance + "&theme=" + gogisCurrentTheme + "&map=" + szMap;
    if (arguments.length >= 4) url += "&idName=" + arguments[3];
    if (arguments.length >= 5) url += "&isTextId=" + arguments[4];
    autocompleteHighlightChangeTheme = ((arguments.length >= 6) ? arguments[5] : false);
    try {
        if (autocompleteHighlightId != null && autocompleteHighlightObj.newid) {
            myGeoObjects.removeGeometry(autocompleteHighlightObj.newid);
            myHighlightObjects.removeGeometry(autocompleteHighlightObj.newid);
            myTooltipManager.releaseTooltip();
        }
    } catch (e) {}
    autocompleteHighlightLayer = layername;
    autocompleteHighlightId = idvalue;
    autocompleteHighlightShowTab = show;
    myQueueManager.enqueue("autocompleteRequestObjHighlight.sendRequest", "autocompleteRequestObjHighlight.sendRequest", url, null);
}

function resetAutocompleteHighlight() {
    if (autocompleteHighlightObj != null && autocompleteHighlightObj.newid != null) {
        myGeoObjects.removeGeometry(autocompleteHighlightObj.newid);
        myHighlightObjects.removeGeometry(autocompleteHighlightObj.newid);
        myTooltipManager.releaseTooltip();
    }
    autocompleteHighlightId = null;
    autocompleteListIsActive = false;
    autocompleteDetailsIsActive = false;
    document.getElementById("gogisAutocompleteBox").style.visibility = "hidden";
    autocompleteIsBusy = false;
    autocompleteApply = false;
    autocompleteChanged = false;
    autocompleteSelectedIndex = -1;
    gogisTabControlChange(1, true);
}

function handleAutocompleteResponseHighlight(response) {
    if (response && !isIntNegative(response)) {
        var obj = eval('(' + response + ')');
        autocompleteHighlightObj = obj;
        autocompleteHighlightLayer = obj.layers;
        if (myKaMap.getCurrentMap().getLayer(autocompleteHighlightLayer.split(",")[0]).type.toLowerCase() == "searchonly") {
            if (gogisSearchFieldValue.split('=')[0].toLowerCase() != gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() || (gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == true)) {
                if (myKaMap.theZoomLayer && (!autocompleteHighlightShowTab || document.getElementById("gogisTabControlTab1").className != "gogisTabControlSelectedTab")) myKaMap.theZoomLayer.suspended = true;
                if (myGeolocationService && myGeolocationService.running && myGeolocationService.lastPosCHX && myGeolocationService.lastPosCHY) {
                    var posX = myGeolocationService.lastPosCHX;
                    var posY = myGeolocationService.lastPosCHY;
                    var minx = (parseInt(obj.minx) < parseInt(posX) ? parseInt(obj.minx) : parseInt(posX));
                    var miny = (parseInt(obj.miny) < parseInt(posY) ? parseInt(obj.miny) : parseInt(posY));
                    var maxx = (parseInt(obj.maxx) > parseInt(posX) ? parseInt(obj.maxx) : parseInt(posX));
                    var maxy = (parseInt(obj.maxy) > parseInt(posY) ? parseInt(obj.maxy) : parseInt(posY));
                    myKaMap.zoomToExtents(minx, miny, maxx, maxy);
                } else {
                    if (obj.scale == "dynamic" || (obj.geoobj && obj.geoobj.length > 1)) {
                        myKaMap.zoomToExtents(parseInt(obj.minx), parseInt(obj.miny), parseInt(obj.maxx), parseInt(obj.maxy));
                    } else {
                        var zToScale = obj.scale;
                        var cScale = parseInt(myKaMap.getCurrentScale());
                        if (gogisApplication.SEARCH_SCALE_EXACT && gogisApplication.SEARCH_SCALE_EXACT[gogisCurrentInstance] == false && cScale < zToScale) zToScale = cScale;
                        myKaMap.zoomTo(parseInt(obj.minx) + ((parseInt(obj.maxx) - parseInt(obj.minx)) / 2), parseInt(obj.miny) + ((parseInt(obj.maxy) - parseInt(obj.miny)) / 2), zToScale);
                    }
                }
            }
            if (autocompleteHighlightOn && obj.geoobj && obj.geoobj.length > 0) {
                autocompleteHighlightObj.newid = new Array();
                for (var iObj = 0; iObj < obj.geoobj.length; iObj++) {
                    try {
                        var geometry = new Object();
                        geometry.persistence = gogisGeoObjects.PERSISTENCE_TMP;
                        geometry.status = gogisGeoObjects.STATUS_READONLY;
                        geometry.id = -(new Date()).getTime();
                        geometry.type = gogisGeoObjects.GEOMETRY_ICON;
                        geometry.points = obj.geoobj[iObj];
                        geometry.opacity = 100;
                        geometry.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
                        geometry.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
                        geometry.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
                        myGeoObjects.addGeometry(geometry);
                        autocompleteHighlightObj.newid[iObj] = geometry.id;
                    } catch (e) {}
                }
                if (autocompleteHighlightShowTab) {
                    gogisTabControlChange(1);
                    var tmpLayerObj = myKaMap.getCurrentMap().getLayer(autocompleteHighlightLayer.split(",")[0]);
                    if (gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME != -1 && autocompleteHighlightId && obj.geoobj.length == 1 && tmpLayerObj.tooltip) {
                        if (gogisSearchFieldValue.split('=')[0].toLowerCase() != gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() || (gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == true)) {
                            setTimeout('myKaMap.slideBy(' + parseInt(-myKaMap.viewportWidth / 4) + ',' + parseInt(-myKaMap.viewportHeight / 4) + ');', (3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2));
                        }
                        setTimeout('myTooltipManager.showTooltip(-1, "idName=' + tmpLayerObj.objectId + '&idValue=' + autocompleteHighlightId + '&LayerName=' + tmpLayerObj.name + '&instance=' + gogisCurrentInstance + '&map=' + szMap + '",' + (obj.minx + obj.maxx) / 2 + ',' + (obj.miny + obj.maxy) / 2 + ');', (gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME ? gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME : gogisApplication.TOOLTIP_RELEASETIME) + (3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2));
                    }
                }
            } else autocompleteHighlightId = null;
            autocompleteHighlightOn = true;
        } else if ((((!gogisApplication.SEARCH_CURRENT_THEME || gogisApplication.SEARCH_CURRENT_THEME[gogisCurrentInstance] == false) && gogisApplication.SEARCH_CHANGE_THEME && gogisApplication.SEARCH_CHANGE_THEME[gogisCurrentInstance] == true) || autocompleteHighlightChangeTheme) && obj.theme != gogisCurrentTheme) {
            document.getElementById("mapThemes").value = obj.theme;
            sendLegendRequest(obj.theme, changeLegendThemeCallback);
        } else {
            if (gogisSearchFieldValue.split('=')[0].toLowerCase() != gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() || (gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == true)) {
                if (myKaMap.theZoomLayer && (!autocompleteHighlightShowTab || document.getElementById("gogisTabControlTab1").className != "gogisTabControlSelectedTab")) myKaMap.theZoomLayer.suspended = true;
                if (myGeolocationService && myGeolocationService.running && myGeolocationService.lastPosCHX && myGeolocationService.lastPosCHY) {
                    var posX = myGeolocationService.lastPosCHX;
                    var posY = myGeolocationService.lastPosCHY;
                    var minx = (parseInt(obj.minx) < parseInt(posX) ? parseInt(obj.minx) : parseInt(posX));
                    var miny = (parseInt(obj.miny) < parseInt(posY) ? parseInt(obj.miny) : parseInt(posY));
                    var maxx = (parseInt(obj.maxx) > parseInt(posX) ? parseInt(obj.maxx) : parseInt(posX));
                    var maxy = (parseInt(obj.maxy) > parseInt(posY) ? parseInt(obj.maxy) : parseInt(posY));
                    resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
                    if (myKaMap.zoomToExtents(minx, miny, maxx, maxy)) {
                        setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                    } else {
                        setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                    }
                } else {
                    if (obj.scale == "dynamic" || (obj.geoobj && obj.geoobj.length > 1)) {
                        resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
                        if (myKaMap.zoomToExtents(parseInt(obj.minx), parseInt(obj.miny), parseInt(obj.maxx), parseInt(obj.maxy))) {
                            setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                        } else {
                            setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                        }
                    } else {
                        var zToScale = obj.scale;
                        var cScale = parseInt(myKaMap.getCurrentScale());
                        if (gogisApplication.SEARCH_SCALE_EXACT && gogisApplication.SEARCH_SCALE_EXACT[gogisCurrentInstance] == false && cScale < zToScale) zToScale = cScale;
                        myKaMap.zoomTo(parseInt(obj.minx) + ((parseInt(obj.maxx) - parseInt(obj.minx)) / 2), parseInt(obj.miny) + ((parseInt(obj.maxy) - parseInt(obj.miny)) / 2), zToScale);
                        resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
                        if (zToScale != cScale) {
                            setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                        } else {
                            setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                        }
                    }
                }
            } else {
                resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
                setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
            }
            if (autocompleteHighlightOn && obj.geoobj && obj.geoobj.length > 0) {
                autocompleteHighlightObj.newid = new Array();
                var tmpHighLightGeometry;
                for (var iObj = 0; iObj < obj.geoobj.length; iObj++) {
                    tmpHighLightGeometry = getHighLightGeometry(obj, iObj);
                    if (tmpHighLightGeometry.type == gogisGeoObjects.GEOMETRY_POLYGON || tmpHighLightGeometry.type == gogisGeoObjects.GEOMETRY_LINE) {
                        myHighlightObjects.addGeometry(tmpHighLightGeometry);
                    } else myGeoObjects.addGeometry(tmpHighLightGeometry);
                }
            } else autocompleteHighlightId = null;
            if (autocompleteHighlightShowTab) {
                gogisTabControlChange(1);
                var tmpLayerObj = myKaMap.getCurrentMap().getLayer(autocompleteHighlightLayer.split(",")[0]);
                if (gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME != -1 && autocompleteHighlightId && obj.geoobj.length == 1 && tmpLayerObj.tooltip) {
                    if (gogisSearchFieldValue.split('=')[0].toLowerCase() != gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() || (gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == true)) {
                        setTimeout('myKaMap.slideBy(' + parseInt(-myKaMap.viewportWidth / 4) + ',' + parseInt(-myKaMap.viewportHeight / 4) + ');', (3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2));
                    }
                    setTimeout('myTooltipManager.showTooltip(-1, "idName=' + tmpLayerObj.objectId + '&idValue=' + autocompleteHighlightId + '&LayerName=' + tmpLayerObj.name + '&instance=' + gogisCurrentInstance + '&map=' + szMap + '",' + (obj.minx + obj.maxx) / 2 + ',' + (obj.miny + obj.maxy) / 2 + ');', (gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME ? gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME : gogisApplication.TOOLTIP_RELEASETIME) + (3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2));
                }
            }
            autocompleteHighlightOn = true;
        }
    }
}

function resetAutocompleteHighlightGroupFilter(layerName) {
    var layers = layerName.split(",");
    for (var i = 0; i < layers.length; i++) {
        gogisResetGroupFilter(layers[i]);
    }
}

function changeLegendThemeCallback() {
    var scaleChanged = false;
    if (gogisSearchFieldValue.split('=')[0].toLowerCase() != gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() || (gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == true)) {
        if (myKaMap.theZoomLayer) myKaMap.theZoomLayer.suspended = true;
        if (myGeolocationService && myGeolocationService.running && myGeolocationService.lastPosCHX && myGeolocationService.lastPosCHY) {
            var posX = myGeolocationService.lastPosCHX;
            var posY = myGeolocationService.lastPosCHY;
            var minx = (parseInt(autocompleteHighlightObj.minx) < parseInt(posX) ? parseInt(autocompleteHighlightObj.minx) : parseInt(posX));
            var miny = (parseInt(autocompleteHighlightObj.miny) < parseInt(posY) ? parseInt(autocompleteHighlightObj.miny) : parseInt(posY));
            var maxx = (parseInt(autocompleteHighlightObj.maxx) > parseInt(posX) ? parseInt(autocompleteHighlightObj.maxx) : parseInt(posX));
            var maxy = (parseInt(autocompleteHighlightObj.maxy) > parseInt(posY) ? parseInt(autocompleteHighlightObj.maxy) : parseInt(posY));
            resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
            if (myKaMap.zoomToExtents(minx, miny, maxx, maxy)) {
                setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
            } else {
                setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
            }
        } else {
            if (autocompleteHighlightObj.scale == "dynamic" || (autocompleteHighlightObj.geoobj && autocompleteHighlightObj.geoobj.length > 1)) {
                scaleChanged = myKaMap.zoomToExtents(parseInt(autocompleteHighlightObj.minx), parseInt(autocompleteHighlightObj.miny), parseInt(autocompleteHighlightObj.maxx), parseInt(autocompleteHighlightObj.maxy));
                resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
                if (scaleChanged) {
                    setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                } else {
                    setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                }
            } else {
                var zToScale = autocompleteHighlightObj.scale;
                var cScale = parseInt(myKaMap.getCurrentScale());
                if (gogisApplication.SEARCH_SCALE_EXACT && gogisApplication.SEARCH_SCALE_EXACT[gogisCurrentInstance] == false && cScale < zToScale) zToScale = cScale;
                if (gogisMapThemes[gogisCurrentTheme].defaultMinScale > 0 && gogisMapThemes[gogisCurrentTheme].defaultMinScale < zToScale) {
                    zToScale = gogisMapThemes[gogisCurrentTheme].defaultMinScale;
                } else if (gogisMapThemes[gogisCurrentTheme].defaultMaxScale >= 0 && gogisMapThemes[gogisCurrentTheme].defaultMaxScale > zToScale) {
                    zToScale = gogisMapThemes[gogisCurrentTheme].defaultMaxScale;
                }
                myKaMap.zoomTo(parseInt(autocompleteHighlightObj.minx) + ((parseInt(autocompleteHighlightObj.maxx) - parseInt(autocompleteHighlightObj.minx)) / 2), parseInt(autocompleteHighlightObj.miny) + ((parseInt(autocompleteHighlightObj.maxy) - parseInt(autocompleteHighlightObj.miny)) / 2), zToScale);
                resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
                if (scaleChanged = (zToScale != cScale)) {
                    setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                } else {
                    setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                }
            }
        }
    } else {
        resetAutocompleteHighlightGroupFilter(autocompleteHighlightLayer);
        setTimeout('gogisLegendActivateLayer("' + autocompleteHighlightLayer + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
    }
    if (autocompleteHighlightOn && autocompleteHighlightObj.geoobj && autocompleteHighlightObj.geoobj.length > 0) {
        autocompleteHighlightObj.newid = new Array();
        var tmpHighLightGeometry;
        for (var iObj = 0; iObj < autocompleteHighlightObj.geoobj.length; iObj++) {
            tmpHighLightGeometry = getHighLightGeometry(autocompleteHighlightObj, iObj);
            if (tmpHighLightGeometry.type == gogisGeoObjects.GEOMETRY_POLYGON || tmpHighLightGeometry.type == gogisGeoObjects.GEOMETRY_LINE) {
                myHighlightObjects.addGeometry(tmpHighLightGeometry);
            } else myGeoObjects.addGeometry(tmpHighLightGeometry);
        }
    } else autocompleteHighlightId = null;
    if (autocompleteHighlightShowTab) {
        gogisTabControlChange(1);
        var tmpLayerObj = myKaMap.getCurrentMap().getLayer(autocompleteHighlightLayer.split(",")[0]);
        if (gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME != -1 && autocompleteHighlightId && autocompleteHighlightObj.geoobj.length == 1 && tmpLayerObj.tooltip) {
            if (gogisSearchFieldValue.split('=')[0].toLowerCase() != gLocalizer.localize("TITLE_PRINTPDFIMAGE_COORDINATES").toLowerCase() || (gogisApplication.QUERY_CHANGE_EXTENT && gogisApplication.QUERY_CHANGE_EXTENT[gogisCurrentInstance] == true)) {
                setTimeout('myKaMap.slideBy(' + parseInt(-myKaMap.viewportWidth / 4) + ',' + parseInt(-myKaMap.viewportHeight / 4) + ');', (3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2));
            }
            setTimeout('myTooltipManager.showTooltip(-1, "idName=' + tmpLayerObj.objectId + '&idValue=' + autocompleteHighlightId + '&LayerName=' + tmpLayerObj.name + '&instance=' + gogisCurrentInstance + '&map=' + szMap + '",' + (autocompleteHighlightObj.minx + autocompleteHighlightObj.maxx) / 2 + ',' + (autocompleteHighlightObj.miny + autocompleteHighlightObj.maxy) / 2 + ');', (gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME ? gogisApplication.AUTOCOMPLETE_TOOLTIP_DELAYTIME : gogisApplication.TOOLTIP_RELEASETIME) + (3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2));
        }
    }
    autocompleteHighlightOn = true;
    return scaleChanged;
}

function getHighlightLayers(layers) {
    var searchLayers = new Array();
    var tmpLayers = layers.split(",");
    var cMap = myKaMap.getCurrentMap();
    var cLayers = cMap.getAllLayers();
    for (var i = 0; i < tmpLayers.length; i++) {
        if (tmpLayers[i].indexOf("++") >= 0) searchLayers.push(tmpLayers[i]);
        else {
            for (var j = 0; j < cLayers.length; j++) {
                if (cLayers[j].name.indexOf("++") >= 0 && cLayers[j].name.split("++")[0] == tmpLayers[i]) searchLayers.push(cLayers[j].name);
            }
        }
    }
    return searchLayers.join(",");
}

function getHighLightGeometry(obj, iObj) {
    var geometry = new Object();
    geometry.persistence = gogisGeoObjects.PERSISTENCE_TMP;
    geometry.status = gogisGeoObjects.STATUS_READONLY;
    geometry.id = -(new Date()).getTime();
    geometry.points = obj.geoobj[iObj];
    geometry.extension = (obj.geoext ? obj.geoext[iObj] : null);
    autocompleteHighlightObj.newid[iObj] = geometry.id;
    if (obj.geotype[iObj] == gogisGeoObjects.GEOMETRY_POLYGON) {
        geometry.type = obj.geotype[iObj];
        geometry.opacity = gogisApplication.HIGHLIGHT_OPACITY;
        geometry.size = gogisApplication.HIGHLIGHT_SIZE;
        geometry.color = gogisApplication.HIGHLIGHT_BORDERCOLOR;
        geometry.bgcolor = gogisApplication.HIGHLIGHT_BGCOLOR;
    } else if (obj.geotype[iObj] == gogisGeoObjects.GEOMETRY_LINE) {
        geometry.type = obj.geotype[iObj];
        geometry.opacity = 100;
        geometry.size = gogisApplication.HIGHLIGHT_SIZE;
        geometry.color = gogisApplication.HIGHLIGHT_BORDERCOLOR;
    } else if (obj.geotype[iObj] == gogisGeoObjects.GEOMETRY_POINT) {
        geometry.type = gogisGeoObjects.GEOMETRY_ICON;
        geometry.opacity = 100;
        geometry.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
        geometry.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
        geometry.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
    } else if (obj.geotype[iObj] == gogisGeoObjects.GEOMETRY_LABEL) {
        geometry.type = gogisGeoObjects.GEOMETRY_ICON;
        geometry.opacity = 100;
        geometry.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
        geometry.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
        geometry.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
    } else if (obj.geotype[iObj] == gogisGeoObjects.GEOMETRY_ICON) {
        geometry.type = gogisGeoObjects.GEOMETRY_ICON;
        geometry.opacity = 100;
        geometry.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
        geometry.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
        geometry.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
    } else geometry = null;
    return geometry;
}

function setAutocompleteResponseHighlight(obj) {
    autocompleteHighlightObj = obj;
    autocompleteHighlightLayer = obj.layer;
    autocompleteHighlightId = obj.id;
    autocompleteHighlightObj.newid = new Array();
    if (autocompleteHighlightOn && myKaMap.getCurrentMap().getLayer(autocompleteHighlightLayer).searchHighlight) {
        if (myKaMap.getCurrentMap().getLayer(autocompleteHighlightLayer).type.toLowerCase() == "searchonly") {
            try {
                var geometry = new Object();
                geometry.persistence = gogisGeoObjects.PERSISTENCE_TMP;
                geometry.status = gogisGeoObjects.STATUS_READONLY;
                geometry.id = -(new Date()).getTime();
                geometry.type = gogisGeoObjects.GEOMETRY_ICON;
                geometry.points = obj.points;
                geometry.opacity = 100;
                geometry.iconName = gogisApplication.HIGHLIGHT_SYMBOL;
                geometry.iconWidth = gogisApplication.HIGHLIGHT_SYMBOL_WIDTH;
                geometry.iconHeight = gogisApplication.HIGHLIGHT_SYMBOL_HEIGHT;
                myGeoObjects.addGeometry(geometry);
                autocompleteHighlightObj.newid = geometry.id;
            } catch (e) {}
        } else {
            obj.geoobj = new Array();
            obj.geoobj[0] = obj.points;
            obj.geoext = new Array();
            obj.geoext[0] = obj.featExt;
            obj.geotype = new Array();
            obj.geotype[0] = obj.type;
            var tmpHighLightGeometry;
            tmpHighLightGeometry = getHighLightGeometry(obj, 0);
            if (tmpHighLightGeometry.type == gogisGeoObjects.GEOMETRY_POLYGON || tmpHighLightGeometry.type == gogisGeoObjects.GEOMETRY_LINE) {
                myHighlightObjects.addGeometry(tmpHighLightGeometry);
            } else myGeoObjects.addGeometry(tmpHighLightGeometry);
        }
    } else autocompleteHighlightId = null;
    autocompleteHighlightOn = true;
}
autocompleteRequestObjHighlight.action = handleAutocompleteResponseHighlight;
var legendThemeDoc, gogisDefaultTheme;
var gogisKeymaps = new Array(100);
var gogisMapThemes = new Array();

function handleLegendThemeResponse(response, legendResponse) {
    legendThemeDoc = response;
    if (legendThemeDoc) {
        var j = 0;
        var currentId;
        var firstId = -1;
        var tmp_MapThemes;
        for (j = 0; j < legendThemeDoc.root.length; j++) {
            currentId = legendThemeDoc.root[j].id_maptheme;
            if (firstId == -1) firstId = currentId;
            gogisKeymaps[currentId] = legendThemeDoc.root[j].themeoverviewmap;
            if (!gogisDefaultTheme && legendThemeDoc.root[j].defaulttheme == "t") gogisDefaultTheme = currentId;
            tmp_MapThemes = new Object();
            tmp_MapThemes.name = gLocalizer.localize(legendThemeDoc.root[j].themename);
            tmp_MapThemes.namePlain = gLocalizer.localize(legendThemeDoc.root[j].themename, true);
            tmp_MapThemes.description = gLocalizer.localize(legendThemeDoc.root[j].themedescription, true);
            tmp_MapThemes.descriptionSidePan = gLocalizer.localize(gogisCurrentInstance.toUpperCase() + "_" + legendThemeDoc.root[j].themedescription + "_SIDEPAN", true);
            if (tmp_MapThemes.descriptionSidePan == gogisCurrentInstance.toUpperCase() + "_" + legendThemeDoc.root[j].themedescription + "_SIDEPAN") {
                tmp_MapThemes.descriptionSidePan = gLocalizer.localize(legendThemeDoc.root[j].themedescription + "_SIDEPAN", true);
            }
            tmp_MapThemes.mapfile = (legendThemeDoc.root[j].thememapfile > "" ? legendThemeDoc.root[j].thememapfile : gogisDefaultMap);
            tmp_MapThemes.defaultMinScale = (parseInt(legendThemeDoc.root[j].defaultminscale) >= 0 ? parseInt(legendThemeDoc.root[j].defaultminscale) : -1);
            tmp_MapThemes.defaultMaxScale = (parseInt(legendThemeDoc.root[j].defaultmaxscale) >= 0 ? parseInt(legendThemeDoc.root[j].defaultmaxscale) : -1);
            tmp_MapThemes.themeMetaUrl = htmlspecialchars_decode(legendThemeDoc.root[j].thememetaurl);
            tmp_MapThemes.themeInfo = (legendThemeDoc.root[j].themeinfo > "" ? parseFloat(legendThemeDoc.root[j].themeinfo) : null);
            gogisMapThemes[currentId] = tmp_MapThemes;
        }
        if (legendThemeDoc.root.length > 1) {
            j = 0;
            var html_theme = "";
            tmp_MapThemeGroup = new Object();
            tmp_MapThemeGroup.name_tmp = "";
            var firstGroup = true;
            var emptyGroup = false;
            if (typeof gogisApplication.PRELOADING_CONTENT != 'undefined' && !gogisApplication.PRELOADING_CONTENT) {
                html_theme += "<select id='mapThemes' onChange='sendThemeRequest(this.value,gogisLegendCallback);" + "gogisSearchFieldValue=\"\";document.getElementById(\"gogisSearchField\").value=\"\";resetAutocompleteHighlight();'>";
            } else {
                html_theme += "<select id='mapThemes' onChange='sendLegendRequest(this.value,gogisLegendCallback);" + "gogisSearchFieldValue=\"\";document.getElementById(\"gogisSearchField\").value=\"\";resetAutocompleteHighlight();'>";
            }
            for (j = 0; j < legendThemeDoc.root.length; j++) {
                tmp_MapThemeGroup.name = legendThemeDoc.root[j].themegroupname;
                if ((tmp_MapThemeGroup.name > "") && (tmp_MapThemeGroup.name != tmp_MapThemeGroup.name_tmp)) {
                    if (!firstGroup) {
                        html_theme += "</optgroup>";
                        firstGroup = false;
                    }
                    html_theme += "<optgroup label='" + gLocalizer.localize(tmp_MapThemeGroup.name) + "'>";
                }
                if ((tmp_MapThemeGroup.name == "") && (tmp_MapThemeGroup.name != tmp_MapThemeGroup.name_tmp)) {
                    if (!emptyGroup) {
                        html_theme += "</optgroup>";
                        emptyGroup = true;
                    }
                }
                html_theme += "<option ";
                if (legendThemeDoc.root[j].id_maptheme == gogisCurrentTheme) {
                    html_theme += "selected ";
                }
                html_theme += "value='" + legendThemeDoc.root[j].id_maptheme + "'>";
                html_theme += gLocalizer.localize(legendThemeDoc.root[j].themename);
                html_theme += "</option>";
                tmp_MapThemeGroup.name_tmp = legendThemeDoc.root[j].themegroupname;
            }
            html_theme += "</select><span id='gogisThemeMetaUrlDiv' style='display:none;'>";
            html_theme += "<a href='' id='thememetalink' title='" + gLocalizer.localize('TOOLTIP_METADATA') + "'>";
            html_theme += "<img class='gogisLegendMetaUrl' src='kamap/images/a_pixel.gif'></a></span>";
            document.getElementById("legendMapThemes").innerHTML = html_theme;
        } else document.getElementById("gogisChooseMapTitle").style.display = 'none';
        gogisLegends[gogisCurrentTheme] = new Object();
        gogisLegends[gogisCurrentTheme].doc = legendResponse;
        setDefaultLegend();
    }
}
var legendRequestObj = new GogisRequestObject();
var legendFromBasemap;
var legendDoc;
var legendBasemaps;
var legendBasemapsSubgroups;
var legendSelectedBasemap;
var legendSelectedBasemapGroup;
var legendDefaultBasemapGroup;
var legendRefreshDate;
var currentBasemapLegend;
var previousSelectedBasemap;
var gogisLegends = new Array();
var gogisBasemaps = new Array();
var printgroups;
var leg_html_tmp, leg_head_tmp;
var footer_html = null;
var flag_drawActiveLegend = false;
var updateLeg = false;

function gogisLegend() {}

function gogisLegendCallback() {}
gogisLegend.callback = gogisLegendCallback;

function setupTheme(themeid, callback) {
    gogisCurrentTheme = themeid;
    gogisLegend.callback = callback;
    GogisQueueManager.resetAllTasks();
    if (myXmlOverlay.overlayEventMap) myXmlOverlay.overlayEventMap.style.display = "none";
    if (myHotspot.mouseoverdelay != null) {
        clearTimeout(myHotspot.mouseoverdelay);
        myHotspot.mouseoverdelay = null;
    }
    if (myTooltipManager.tooltipElement) myTooltipManager.removeTooltip();
    myHighlightObjects.removeGeometry("myHighlightGeometry");
    switchMode(currentToolId);
    setThemeProperties();
}

function setThemeProperties() {
    var tmpElem;
    tmpElem = document.getElementById("geoviewerHeaderCurrentTheme");
    if (tmpElem) tmpElem.innerHTML = gogisMapThemes[gogisCurrentTheme].name;
    tmpElem = document.getElementById("gogisCurrentThemeContent");
    if (tmpElem) tmpElem.innerHTML = gogisMapThemes[gogisCurrentTheme].description;
    tmpElem = document.getElementById("gogisCurrentThemeTitle");
    if (tmpElem && (gLocalizer.localize('TITLE_CURRENT_THEME').trim() == '')) tmpElem.innerHTML = gogisMapThemes[gogisCurrentTheme].name;
    tmpElem = document.getElementById("gogisCurrentThemeContentSidePan");
    if (tmpElem) tmpElem.innerHTML = gogisMapThemes[gogisCurrentTheme].descriptionSidePan;
    tmpElem = document.getElementById("gogisMapThemesCurrentLink");
    if (tmpElem && tmpElem.href) tmpElem.href = 'themes.php?instance=' + gogisCurrentInstance + '&language=' + gogisCurrentLanguage + '&theme=' + gogisCurrentTheme;
    tmpElem = document.getElementById("gogisThemeMetaUrlDiv");
    if (tmpElem) {
        if (gogisMapThemes[gogisCurrentTheme].themeMetaUrl > "") {
            document.getElementById('thememetalink').href = 'javascript:gogisXPopUpWithMenu(\'' + gogisMapThemes[gogisCurrentTheme].themeMetaUrl + '\',\'PopupWin\',' + gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ',' + gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ');';
            document.getElementById('gogisThemeMetaUrlDiv').style.display = '';
        } else document.getElementById('gogisThemeMetaUrlDiv').style.display = 'none';
    };
}

function setDefaultLegend() {
    setThemeProperties();
    handleLegendResponse(null);
}

function sendThemeRequest(themeid, callback) {
    setupTheme(themeid, callback);
    if (gogisLegends[themeid] && gogisLegends[themeid].doc) handleLegendResponse(null);
    else if (gogisMapThemes[themeid] && myKaMap.aMaps[gogisMapThemes[themeid].mapfile]) sendLegendRequest(themeid, callback, true);
    else {
        var url = "kamap/php/init.php?getTheme=true&theme=" + themeid + "&instance=" + gogisCurrentInstance + "&map=" + gogisMapThemes[themeid].mapfile + "&mobile=" + (browser_isMobile ? "1" : "0") + "&touch=" + (browser_isMultitouch ? "1" : "0");
        legendRequestObj.action = handleThemeResponse;
        legendRequestObj.sendRequest(url);
    }
}

function sendLegendRequest(themeid, callback) {
    if (arguments.length == 2) setupTheme(themeid, callback);
    if (gogisLegends[themeid] && gogisLegends[themeid].doc) handleLegendResponse(null);
    else {
        var url = "gogis/php/getLegendByTheme.php?themeid=" + themeid + "&instance=" + gogisCurrentInstance + "&map=" + gogisMapThemes[themeid].mapfile;
        legendRequestObj.action = handleLegendResponse;
        legendRequestObj.sendRequest(url);
    }
}

function handleThemeResponse(response) {
    if (response == null || isIntNegative(response)) return;
    else eval(response);
    handleLegendResponse(null);
}

function handleLegendResponse(response) {
    if (geoViewerIsReady) gogisNoDefaultLayers = false;
    gogisLegendResetLayers(true);
    var cMap = myKaMap.aMaps[gogisMapThemes[gogisCurrentTheme].mapfile];
    if (gogisMapThemes[gogisCurrentTheme].defaultMinScale == -1) gogisMapThemes[gogisCurrentTheme].defaultMinScale = cMap.aScales[0];
    if (gogisMapThemes[gogisCurrentTheme].defaultMaxScale == -1) gogisMapThemes[gogisCurrentTheme].defaultMaxScale = cMap.aScales[cMap.aScales.length - 1];
    if (response == null) {} else if (isIntNegative(response)) return;
    else {
        gogisLegends[gogisCurrentTheme] = new Object();
        gogisLegends[gogisCurrentTheme].doc = eval('(' + response + ')');
    }
    legendDoc = gogisLegends[gogisCurrentTheme].doc;
    if (legendDoc) {
        var tmp_elem = document.getElementById('basemaps');
        if (tmp_elem && tmp_elem.selectedIndex >= 0) {
            legendSelectedBasemap = tmp_elem.options[tmp_elem.selectedIndex].value;
        } else legendSelectedBasemap = "";
        previousSelectedBasemap = "";
        legendSelectedBasemapGroup = null;
        legendBasemaps = new Array();
        legendBasemapsSubgroups = false;
        var i_group = 0;
        var i_layer = 0;
        var i_total_layers = 0;
        gogisThemeDefaultLayers = new Array();
        var curLayer, currentLayer, currentLayerName, currentSubgroupName, lastSubgroupName, subgroupactivity;
        var currentSubgroupType, lastSubgroupType;
        var isRequestedLayer, isFirstRequestedRadioLayerInSubgroup, isFirstGroup, hasActiveRadioGroup, hasActiveRadioSubgroup;
        var group, groupname, groupdescription, groupactivity, groupfilter, grouprefreshdate;
        var legendicon, legendiconsrc;
        var tmp_basemap, tmp_layerName;
        var html = new StringBuffer();
        var html_bas = new StringBuffer();
        var html_group;
        setupPrintDialog(cMap);
        if (gogisDefaultLayers.length > 0) {
            var defLayer, cLayer;
            for (var i = 0; i < gogisDefaultLayers.length; i++) {
                defLayer = gogisDefaultLayers[i].split(';');
                if (defLayer[1]) {
                    if (cLayer = cMap.getLayer(defLayer[0])) cMap.setLayerOpacity(defLayer[0], (100 - defLayer[1]));
                    else if (cLayer = cMap.getLayer("LAYEROBJ_" + defLayer[0])) cMap.setLayerOpacity("LAYEROBJ_" + defLayer[0], (100 - defLayer[1]));
                    else if (cLayer = cMap.getLayer("LO_" + defLayer[0])) cMap.setLayerOpacity("LO_" + defLayer[0], (100 - defLayer[1]));
                }
            }
        }
        if (gogisApplication.DYN_LEGEND[gogisCurrentInstance]) {
            var leg_html = new StringBuffer();
            var leg_html_map = new StringBuffer();
            var leg_html_head = new StringBuffer();
        }
        html_bas.append("<select id='basemaps' onChange='if(this.selectedIndex>=0){");
        html_bas.append("legendSelectedBasemap=this.options[this.selectedIndex].value;");
        html_bas.append("legendSelectedBasemapGroup=this.options[this.selectedIndex].bmGroup;}");
        html_bas.append("gogisRefreshBasemaps();gogisTabControlChange(1);updateLinkToView();'>");
        html.append("<form id='gogisLegendForm' name='layers'>");
        html.append("<table cellspacing='0' cellpadding='0' border='0' id='gogisLegendLayers' class='gogisLegendTABLE'>");
        legendRefreshDate = null;
        isFirstGroup = true;
        hasActiveRadioGroup = false;
        var lastgroup = '';
        var groupstyle = -1;
        var isNewGroup;
        for (i_group = 0; i_group < legendDoc.root[0].group.length; i_group++) {
            group = legendDoc.root[0].group[i_group];
            groupname = group.name;
            groupdescription = group.description;
            if (groupname.toLowerCase() != "basemap" && groupname.toLowerCase() != "searchonly" && lastgroup != (groupname.split('_')[1]).toLowerCase()) {
                isNewGroup = true;
                groupstyle = groupstyle * -1;
                lastgroup = (groupname.split('_')[1]).toLowerCase();
            } else isNewGroup = false;
            if (group.groupmetaurl) {
                groupmetaurl = group.groupmetaurl;
            } else groupmetaurl = "";
            if (group.groupproperties) {
                groupproperties = group.groupproperties;
            } else groupproperties = "";
            html_group = new StringBuffer();
            groupactivity = (gogisNoDefaultLayers ? 0 : parseInt(group.active));
            groupfilter = null;
            grouprefreshdate = null;
            hasActiveRadioSubgroup = false;
            for (i_layer = 0; i_layer < group.layer.length; i_layer++) {
                currentLayer = group.layer[i_layer];
                if (!groupfilter) {
                    groupfilter = cMap.getLayer(currentLayer.name).filter;
                    group.groupfilter = groupfilter;
                }
                curLayer = cMap.getLayer(currentLayer.name);
                if (curLayer.geoshopRefreshDate != null && (grouprefreshdate == null || grouprefreshdate < curLayer.geoshopRefreshDate)) {
                    grouprefreshdate = curLayer.geoshopRefreshDate;
                }
                currentLayerName = (group.grouptype == '3' ? currentLayer.name.split("++")[0] : currentLayer.name);
                curLayer = cMap.getLayer(currentLayerName);
                if (currentLayer.defaultlayer == 't') {
                    if (!gogisNoDefaultLayers) {
                        if (gogisDefaultLayers.length == 0) gogisDefaultLayers = new Array();
                        gogisDefaultLayers.push(currentLayerName);
                    }
                    if (groupname.toLowerCase() != "searchonly") gogisThemeDefaultLayers.push((currentLayerName.toLowerCase()).trim());
                }
                for (var i_blay = 0; i_blay < gogisDefaultLayers.length; i_blay++) {
                    if (gogisDefaultLayers[i_blay].split(';')[0] == currentLayerName || "LAYEROBJ_" + gogisDefaultLayers[i_blay].split(';')[0] == currentLayerName || "LO_" + gogisDefaultLayers[i_blay].split(';')[0] == currentLayerName) {
                        groupactivity = 1;
                        break;
                    }
                }
            }
            if (groupname.toLowerCase() != "basemap" && groupname.toLowerCase() != "searchonly") {
                if (grouprefreshdate != null && (legendRefreshDate == null || legendRefreshDate < grouprefreshdate)) {
                    legendRefreshDate = grouprefreshdate;
                }
                if (isNewGroup || !(gogisApplication.GROUP_LEGEND_GROUPS && gogisApplication.GROUP_LEGEND_GROUPS[gogisCurrentInstance])) {
                    html.append("<tr class='gogisLegendGroupLine" + ((isFirstGroup && gogisLegendType == 2) ? "Hidden" : "") + "'>");
                    html.append("<td class='gogisLegendGroupLineExpand'></td>");
                    html.append("<td class='gogisLegendGroupLineCheck'></td>");
                    html.append("<td class='gogisLegendGroupLineText'></td></tr>");
                    isFirstGroup = false;
                }
                if (groupfilter) {
                    html.append(gogisGetGroupFilter(groupfilter, i_group, (!geoViewerIsReady && startupObject && startupObject.layer && gogisLegendGetGroupIdByLayername(startupObject.layer) == i_group)));
                }
                if (gogisApplication.COLLAPSE_SINGLELAYER_GROUP && gogisApplication.COLLAPSE_SINGLELAYER_GROUP[gogisCurrentInstance] && group.layer.length == 1) {
                    legendicon = curLayer.legendicon;
                    if (legendicon.toLowerCase() != "dynamic") {
                        legendiconsrc = "gogis/images/legendicons/" + legendicon;
                    } else legendiconsrc = '../' + currentLayer.icon;
                } else legendiconsrc = "";
                html.append("<tr id='idGroupRow_" + groupname + "' class='gogisLegendGroup" + (groupstyle > 0 ? "Even" : "Odd") + "'><td valign='top' class='gogisLegendExpandTD'>");
                if (group.layer.length > 1 || !(gogisApplication.COLLAPSE_SINGLELAYER_GROUP && gogisApplication.COLLAPSE_SINGLELAYER_GROUP[gogisCurrentInstance])) {
                    html.append("<img id='idExpandDropImage" + i_group);
                    if (gogisApplication.COLLAPSE_LEGEND && gogisApplication.COLLAPSE_LEGEND[gogisCurrentInstance] == false && groupactivity == 1 && hasActiveRadioGroup == false) {
                        html.append("' class='gogisLegendGroupImageCollapse' src='kamap/images/a_pixel.gif' ");
                    } else {
                        html.append("' class='gogisLegendGroupImageExpand' src='kamap/images/a_pixel.gif' ");
                    }
                    html.append("onClick='gogisLegendLayerExpand(\"" + groupname + "\"");
                    html.append("," + i_group + ",false);' title='" + gLocalizer.localize('TOOLTIP_EXPAND_GROUP') + "'>");
                }
                html.append("</td>");
                html.append("<td valign='top' class='gogisLegendInputTD'>");
                html.append("<div id='zoomTo_" + groupname + "' class='gogisZoomToGroup'></div>");
                html.append("<input id='idCheckbox_" + groupname + "||" + i_group);
                html.append("' value='" + i_group + "' name='group_" + groupname);
                html.append("' type='" + (group.maingrouptype == 1 ? "checkbox" : "radio") + "' onClick='groupCheckBoxClicked(\"" + groupname);
                html.append("\"" + "," + i_group + ",false);gogisTabControlChange(1);'");
                if (group.maingrouptype == 1 && groupactivity == 1) {
                    html.append(" checked");
                } else if (group.maingrouptype == 2 && groupactivity == 1 && hasActiveRadioGroup == false) {
                    html.append(" checked");
                    hasActiveRadioGroup = true;
                } else if (group.maingrouptype == 2 && groupactivity == 1) groupactivity = 0;
                html.append(" class='gogisLegendLayerCheckbox' title='" + gLocalizer.localize('TOOLTIP_LAYER_ON_OFF') + "'>");
                html.append("</td>");
                html.append("<td valign='top' class='gogisLegendGroupTD' colspan='2'><div class='gogisLegendGroupText'>");
                if (legendiconsrc > "") {
                    html.append("<img class='gogisLegendIconsGroup' src='" + legendiconsrc + "'>&nbsp;");
                }
                if (groupproperties == "1") {
                    html.append("<a href='javascript:click()' title='" + gLocalizer.localize('TOOLTIP_GROUPPROPERTIES') + "'");
                    html.append("onClick=\"myPropertyEditor.show('" + group.layer[0].name.split("++")[0] + "',1,'" + groupname + "');\">");
                    html.append("<img class='gogisLegendProperties' src='kamap/images/a_pixel.gif'></a>&nbsp;");
                }
                html.append(gLocalizer.localize(groupname));
                if (groupmetaurl > "") {
                    html.append("&nbsp;<a href='javascript:click()' title='" + gLocalizer.localize('TOOLTIP_METADATA') + "'");
                    html.append("onClick=\"gogisXPopUpWithMenu(\'" + groupmetaurl + "\',\'print_searchResultDetails\',");
                    html.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                    html.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                    html.append("<img class='gogisLegendMetaUrl' src='kamap/images/a_pixel.gif'></a>");
                }
                html.append("</div></td></tr>");
                if (gogisApplication.DYN_LEGEND && gogisApplication.DYN_LEGEND[gogisCurrentInstance] == true && groupname.toLowerCase() != "searchonly") {
                    leg_html.append("<table cellspacing='0' cellpadding='0' border='0'><tr id='legend_" + groupname);
                    leg_html.append("' class='gogisLegendGroupText'><td colspan='4'style='padding-top: 10px; vertical-align:bottom;'><b>");
                    leg_html.append(gLocalizer.localize(groupname));
                    leg_html.append("</b>&nbsp;");
                    if (groupmetaurl > "") {
                        leg_html.append("<a href='javascript:click()' title='");
                        leg_html.append(gLocalizer.localize('TOOLTIP_METADATA') + "'");
                        leg_html.append("onClick=\"gogisXPopUpWithMenu(\'" + groupmetaurl);
                        leg_html.append("\',\'print_searchResultDetails\',");
                        leg_html.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                        leg_html.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                        leg_html.append("<img class='gogisPrintLegendMetaUrlLayer' src='kamap/images/a_pixel.gif'></a>&nbsp;");
                    }
                    leg_html.append("</td>");
                    leg_html.append("</tr>");
                    if (gLocalizer.localize(groupdescription).trim() > "" && gLocalizer.localize(groupdescription).trim() != groupdescription) {
                        leg_html.append("<tr id='legend_" + groupname);
                        leg_html.append("_2' class='gogisLegendGroupText'><td colspan='4' style='vertical-align:middle;'>");
                        if (grouprefreshdate) {
                            leg_html.append(gLocalizer.localize(groupdescription).replace("<CURDATE>", grouprefreshdate.getDate() + ". " + getLocalizedMonth(grouprefreshdate.getMonth()) + " " + grouprefreshdate.getFullYear()));
                        } else leg_html.append(gLocalizer.localize(groupdescription));
                        leg_html.append("</td></tr>");
                    }
                }
                if (gogisApplication.COLLAPSE_LEGEND && gogisApplication.COLLAPSE_LEGEND[gogisCurrentInstance] == false && groupactivity == 1 && (group.layer.length != 1 || !(gogisApplication.COLLAPSE_SINGLELAYER_GROUP && gogisApplication.COLLAPSE_SINGLELAYER_GROUP[gogisCurrentInstance]))) {
                    html.append("<tr id='idGroupDiv|||" + groupname);
                    html.append("' class='gogisLegendLayersVisible'><td id='idGroupTd|||" + groupname + "'colspan='3' class='gogisLegendGroup" + (groupstyle > 0 ? "Even" : "Odd") + "'>");
                } else {
                    html.append("<tr id='idGroupDiv|||" + groupname);
                    html.append("' class='gogisLegendLayersHidden'><td id='idGroupTd|||" + groupname + "'colspan='3' class='gogisLegendGroup" + (groupstyle > 0 ? "Even" : "Odd") + "'>");
                }
                html_group.append("<table cellpadding='0' cellspacing='0' border='0'>");
            }
            lastSubgroupName = currentSubgroupName = "noSubGroup";
            lastSubgroupType = currentSubgroupType = 1;
            subgroupactivity = 0;
            isFirstRequestedRadioLayerInSubgroup = true;
            for (i_layer = 0; i_layer < group.layer.length; i_layer++) {
                currentLayer = group.layer[i_layer];
                curLayer = cMap.getLayer(currentLayer.name);
                if (groupname.toLowerCase() != "basemap" && groupname.toLowerCase() != "searchonly") {
                    lastSubgroupName = currentSubgroupName;
                    lastSubgroupType = currentSubgroupType;
                    if (currentLayer.subgroup) {
                        currentSubgroupName = currentLayer.subgroup;
                        currentSubgroupType = ((currentLayer.subgrouptype == 2) ? 2 : 1);
                    } else {
                        currentSubgroupName = "noSubGroup";
                        currentSubgroupType = 1;
                    }
                    isRequestedLayer = false;
                    currentLayerName = (group.grouptype == '3' ? currentLayer.name.split("++")[0] : currentLayer.name);
                    if (currentSubgroupType != 2) hasActiveRadioSubgroup = false;
                    else if (lastSubgroupName != currentSubgroupName && lastSubgroupType == 2 && subgroupactivity == 1) hasActiveRadioSubgroup = true;
                    if (lastSubgroupName != currentSubgroupName) subgroupactivity = 0;
                    for (var i_blay = 0; i_blay < gogisDefaultLayers.length; i_blay++) {
                        for (i_clay = 0; i_clay < group.layer.length; i_clay++) {
                            if (group.layer[i_clay].subgroup == currentSubgroupName || (!group.layer[i_clay].subgroup && currentSubgroupName == "noSubGroup")) {
                                tmp_layerName = (group.grouptype == '3' ? group.layer[i_clay].name.split("++")[0] : group.layer[i_clay].name);
                                if (gogisDefaultLayers[i_blay].split(';')[0] == tmp_layerName || "LAYEROBJ_" + gogisDefaultLayers[i_blay].split(';')[0] == tmp_layerName || "LO_" + gogisDefaultLayers[i_blay].split(';')[0] == tmp_layerName) {
                                    subgroupactivity = groupactivity;
                                    break;
                                }
                            }
                        }
                        if (gogisDefaultLayers[i_blay].split(';')[0] == currentLayerName || "LAYEROBJ_" + gogisDefaultLayers[i_blay].split(';')[0] == currentLayerName || "LO_" + gogisDefaultLayers[i_blay].split(';')[0] == currentLayerName) {
                            isRequestedLayer = true;
                        }
                        subgroupactivity = subgroupactivity && (hasActiveRadioSubgroup == false);
                    }
                    if (lastSubgroupName != currentSubgroupName) {
                        isFirstRequestedRadioLayerInSubgroup = true;
                        if (lastSubgroupName != "noSubGroup") {
                            html_group.append("</td></tr></table>");
                            html_group.append("<tr><td></td><td class='gogisLegendSubgroupLineCheck'></td><td class='gogisLegendSubgroupLineText'></td></tr>");
                        }
                        if (currentSubgroupName != "noSubGroup") {
                            html_group.append("<tr id='idSubgroupRowHeader_" + currentSubgroupName + "'>");
                            html_group.append("<td valign='top' class='gogisLegendExpandTD'></td>");
                            html_group.append("<td valign='top' class='gogisLegendInputTD'>");
                            html_group.append("<img id='idSubgroupExpandImage_" + currentSubgroupName + "' ");
                            if (gogisApplication.COLLAPSE_LEGEND && gogisApplication.COLLAPSE_LEGEND[gogisCurrentInstance] == false && subgroupactivity == 1) {
                                html_group.append("class='gogisLegendGroupImageCollapse' src='kamap/images/a_pixel.gif' ");
                            } else {
                                html_group.append("class='gogisLegendGroupImageExpand' src='kamap/images/a_pixel.gif' ");
                            }
                            html_group.append("onClick='gogisLegendSubgroupExpand(\"" + currentSubgroupName + "\"");
                            html_group.append(");' title='" + gLocalizer.localize('TOOLTIP_EXPAND_GROUP') + "'>");
                            html_group.append("</td>");
                            html_group.append("<td><table cellpadding='0' cellspacing='0' border='0'>");
                            html_group.append("<tr><td valign='top' class='gogisLegendInputTD'>");
                            html_group.append("<div subgroup='1' id='zoomTo_" + currentSubgroupName + "' class='gogisZoomToGroup'></div>");
                            html_group.append("<input subgroup='1' group='" + i_group + "' id='idSubgroupCheckbox_" + currentSubgroupName);
                            html_group.append("' value='" + currentSubgroupName + "' name='subgroup_" + currentSubgroupName);
                            html_group.append("' type='" + (currentSubgroupType == 1 ? "checkbox" : "radio") + "' onClick='subgroupCheckBoxClicked(\"" + currentSubgroupName + "\"");
                            html_group.append("," + i_group + ");gogisTabControlChange(1);'");
                            if (currentSubgroupType == 1 && subgroupactivity == 1) {
                                html_group.append(" checked");
                            } else if (currentSubgroupType == 2 && subgroupactivity == 1) {
                                html_group.append(" checked");
                            }
                            html_group.append(" class='gogisLegendLayerCheckbox' title='" + gLocalizer.localize('TOOLTIP_LAYER_ON_OFF') + "'>");
                            html_group.append("</td>");
                            html_group.append("</td><td colspan='2'>" + gLocalizer.localize(currentSubgroupName));
                            if (currentLayer.subgroupmetaurl && currentLayer.subgroupmetaurl > "") {
                                html_group.append("&nbsp;<a href='javascript:click()' title='" + gLocalizer.localize('TOOLTIP_METADATA') + "'");
                                html_group.append("onClick=\"gogisXPopUpWithMenu(\'" + currentLayer.subgroupmetaurl);
                                html_group.append("\',\'print_searchResultDetails\',");
                                html_group.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                                html_group.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                                html_group.append("<img class='gogisLegendMetaUrl' src='kamap/images/a_pixel.gif'></a>");
                            }
                            html_group.append("</td></tr></table></td></tr>");
                            html_group.append("<tr class='gogisLegendLayers" + (subgroupactivity == 1 ? "Visible" : "Hidden") + "' ");
                            html_group.append("id='idSubgroupRow_" + currentSubgroupName + "'><td colspan='3'><table cellpadding='0' cellspacing='0' border='0'>");
                        }
                    }
                    legendicon = curLayer.legendicon;
                    if (legendicon.toLowerCase() != "dynamic") {
                        legendiconsrc = "gogis/images/legendicons/" + legendicon;
                    } else legendiconsrc = '../' + currentLayer.icon;
                    html_group.append("<tr " + (curLayer.legendentry ? "" : "style='display:none' ") + "id='idLayerRow_" + currentLayer.name + "'>");
                    html_group.append("<td valign='top' class='gogisLegendExpandTD'></td><td class='gogisLegendInputTD'></td>");
                    html_group.append("<td valign='top'><table cellspacing='0' cellpadding='0' border='0'><tr>");
                    if (currentSubgroupName != "noSubGroup") {
                        html_group.append("<td valign='top' class='gogisLegendInputTD'><div class='gogisLegendLayerCheckbox'></div></td>");
                    }
                    if (group.grouptype != "3") {
                        html_group.append("<td valign='top' class='gogisLegendInputTD'>");
                        html_group.append("<div id='zoomTo_" + currentLayer.name + "' class='gogisZoomToLayer'></div>");
                    }
                    html_group.append("<input id='Layer|||" + groupname + "|||" + i_layer);
                    switch (group.grouptype) {
                        case "1":
                            html_group.append("' class='gogisLegendLayerCheckbox' type='checkbox' ");
                            html_group.append((isRequestedLayer && subgroupactivity == 1 ? "checked " : "") + "value='1' ");
                            break;
                        case "2":
                            html_group.append("' class='gogisLegendLayerRadio' type='radio' ");
                            html_group.append((isRequestedLayer && subgroupactivity == 1 && isFirstRequestedRadioLayerInSubgroup ? "checked " : "") + "value='1' ");
                            if (isRequestedLayer && subgroupactivity == 1 && isFirstRequestedRadioLayerInSubgroup) isFirstRequestedRadioLayerInSubgroup = false;
                            break;
                        case "3":
                            html_group.append("' type='hidden' value='");
                            html_group.append((isRequestedLayer && subgroupactivity == 1 ? "1' " : "0' "));
                            break;
                    }
                    if (currentLayer.defaultlayer == "t") html_group.append("isDefaultLayer='1' ");
                    if ((currentLayer.layerproperties && currentLayer.layerproperties == "1") || groupproperties == "1") html_group.append("hasLayerProperties='1' ");
                    html_group.append("name='layer_" + currentLayer.name + "'");
                    if (group.grouptype != "3") {
                        html_group.append(" onClick='layerCheckBoxClicked(\"" + groupname + "\"");
                        html_group.append("," + i_layer + "," + i_group + ",false);gogisTabControlChange(1);' title='");
                        html_group.append(gLocalizer.localize('TOOLTIP_LAYER_ON_OFF') + "'></td>");
                    } else html_group.append(">");
                    locLayerDesc = gLocalizer.localize(currentLayer.description).trim();
                    if (legendiconsrc.length >= 10) {
                        html_group.append("<td valign='top' class='gogisLegendIconTD'>");
                        html_group.append("<img class='gogisLegendIcons' src='" + legendiconsrc + "'");
                        if (locLayerDesc > "" && currentLayer.description != locLayerDesc) {
                            html_group.append(" title='" + locLayerDesc.stripHtmlTags() + "'");
                        }
                        html_group.append(">");
                        html_group.append("</td>");
                    }
                    if (currentSubgroupName != "noSubGroup") {
                        html_group.append("<td valign='top' class='" + (legendiconsrc.length >= 10 ? "gogisLegendSubgroupLayerTD" : "gogisLegendSubgroupLayerSimpleTD") + "'>");
                        html_group.append("<div class='" + (legendiconsrc.length >= 10 ? "gogisLegendSubgroupLayerText" : "gogisLegendSubgroupLayerSimpleText") + "'>");
                    } else {
                        html_group.append("<td valign='top' class='" + (legendiconsrc.length >= 10 ? "gogisLegendLayerTD" : "gogisLegendLayerSimpleTD") + "'>");
                        html_group.append("<div class='" + (legendiconsrc.length >= 10 ? "gogisLegendLayerText" : "gogisLegendLayerSimpleText") + "'>");
                    }
                    if (currentLayer.layerproperties && currentLayer.layerproperties == "1") {
                        html_group.append("<a href='javascript:click()' title='" + gLocalizer.localize('TOOLTIP_LAYERPROPERTIES') + "'");
                        html_group.append("onClick=\"myPropertyEditor.show('" + currentLayer.name + "',2);\">");
                        html_group.append("<img class='gogisLegendProperties' src='kamap/images/a_pixel.gif'></a>&nbsp;");
                    }
                    if (gogisApplication.QUICK_SEARCH && gogisApplication.QUICK_SEARCH[gogisCurrentInstance] == true && currentLayer.searchobject > "") {
                        html_group.append("<a href=\'javascript:click()\' onClick=\'gogisLegendSearchResultList(\"exact,\\\"");
                        html_group.append(escape(gLocalizer.localize(currentLayer.searchobjgroup, true)) + "\\\",\\\"");
                        html_group.append(escape(gLocalizer.localize(currentLayer.searchobject, true)));
                        html_group.append("\\\"\"); gogisSearchFieldValue=\"\\\"");
                        html_group.append(gLocalizer.localize(currentLayer.searchobjgroup) + "\\\", \\\"");
                        html_group.append(gLocalizer.localize(currentLayer.searchobject) + "\\\"\";\' ");
                        html_group.append("title=\"" + gLocalizer.localize("TOOLTIP_SEARCHLIST") + " &laquo;");
                        html_group.append(gLocalizer.localize(currentLayer.name) + "&raquo;\">");
                    }
                    html_group.append(gLocalizer.localize(currentLayer.name));
                    if (gogisApplication.QUICK_SEARCH && gogisApplication.QUICK_SEARCH[gogisCurrentInstance] == true && currentLayer.searchobject > "") html_group.append("</a>");
                    if (currentLayer.layermetaurl && currentLayer.layermetaurl > "") {
                        html_group.append("&nbsp;<a href='javascript:click()' title='" + gLocalizer.localize('TOOLTIP_METADATA') + "'");
                        html_group.append("onClick=\"gogisXPopUpWithMenu(\'" + currentLayer.layermetaurl);
                        html_group.append("\',\'print_searchResultDetails\',");
                        html_group.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                        html_group.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                        html_group.append("<img class='gogisLegendMetaUrl' src='kamap/images/a_pixel.gif'></a>");
                    }
                    html_group.append("</div></td></tr></table></td></tr>");
                    if (gogisApplication.DYN_LEGEND && gogisApplication.DYN_LEGEND[gogisCurrentInstance] == true) {
                        if (lastSubgroupName != currentSubgroupName) {
                            if (currentSubgroupName != "noSubGroup") {
                                leg_html.append("<tr id='legend_sg_" + currentSubgroupName + "'><td colspan='2' valign='top' class='gogisPrintLegendLayerSimpleText'>");
                                leg_html.append("<div class='gogisPrintLegendLayerSimpleText' style='padding-top:5px;'><i>");
                                leg_html.append(gLocalizer.localize(currentSubgroupName));
                                if (currentLayer.subgroupmetaurl > "") {
                                    leg_html.append("&nbsp;<a href='javascript:click()' title='");
                                    leg_html.append(gLocalizer.localize('TOOLTIP_METADATA') + "'");
                                    leg_html.append("onClick=\"gogisXPopUpWithMenu(\'" + currentLayer.subgroupmetaurl);
                                    leg_html.append("\',\'print_searchResultDetails\',");
                                    leg_html.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                                    leg_html.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                                    leg_html.append("<img class='gogisPrintLegendMetaUrlLayer' src='kamap/images/a_pixel.gif'></a>");
                                }
                                leg_html.append("</i></div></td><td class='gogisPrintLegendDistance'></td>");
                                leg_html.append("<td valign='top' class='gogisPrintLegendLayerDescr'>");
                                leg_html.append("</td></tr>");
                            }
                        }
                        leg_html.append("<tr " + (curLayer.legendentry ? "" : "style='display:none' ") + "id='legend_" + currentLayer.name + "'>");
                        if (legendiconsrc.length >= 10) {
                            leg_html.append("<td valign='top' class='gogisPrintLegendDistance'>");
                            leg_html.append("<img class='gogisPrintLegendIcon' src='" + legendiconsrc + "'></td>");
                            leg_html.append("<td valign='top' class='gogisPrintLegendLayerText'><div class='gogisPrintLegendLayerText'>");
                        } else {
                            leg_html.append("<td colspan='2' valign='top' class='gogisPrintLegendLayerSimpleText'><div class='gogisPrintLegendLayerSimpleText'>");
                        }
                        leg_html.append(gLocalizer.localize(currentLayer.name));
                        if (currentLayer.layermetaurl > "") {
                            leg_html.append("&nbsp;<a href='javascript:click()' title='");
                            leg_html.append(gLocalizer.localize('TOOLTIP_METADATA') + "'");
                            leg_html.append("onClick=\"gogisXPopUpWithMenu(\'" + currentLayer.layermetaurl);
                            leg_html.append("\',\'print_searchResultDetails\',");
                            leg_html.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                            leg_html.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                            leg_html.append("<img class='gogisPrintLegendMetaUrlLayer' src='kamap/images/a_pixel.gif'></a>");
                        }
                        leg_html.append("</div></td><td class='gogisPrintLegendDistance'></td>");
                        leg_html.append("<td valign='top' class='gogisPrintLegendLayerDescr'>");
                        if (curLayer.geoshopRefreshDate) {
                            leg_html.append(locLayerDesc.replace("<CURDATE>", curLayer.geoshopRefreshDate.getDate() + ". " + getLocalizedMonth(curLayer.geoshopRefreshDate.getMonth()) + " " + curLayer.geoshopRefreshDate.getFullYear()));
                        } else leg_html.append(locLayerDesc);
                        leg_html.append("</td></tr>");
                    }
                } else if (groupname.toLowerCase() == "basemap") {
                    if (previousSelectedBasemap == "") previousSelectedBasemap = legendSelectedBasemap;
                    for (var i_blay = 0; i_blay < gogisDefaultLayers.length; i_blay++) {
                        if (gogisDefaultLayers[i_blay].split(';')[0] == currentLayer.name || "LAYEROBJ_" + gogisDefaultLayers[i_blay].split(';')[0] == currentLayer.name || "LO_" + gogisDefaultLayers[i_blay].split(';')[0] == currentLayer.name) {
                            legendSelectedBasemap = currentLayer.name;
                            break;
                        }
                    }
                    if (!legendSelectedBasemap > "" && currentLayer.defaultlayer == "t") {
                        legendSelectedBasemap = currentLayer.name;
                        legendDefaultBasemapGroup = currentLayer.basemapgroup;
                    }
                    if (legendSelectedBasemap == currentLayer.name) legendSelectedBasemapGroup = currentLayer.basemapgroup;
                    tmp_basemap = new Object();
                    tmp_basemap.name = currentLayer.name;
                    tmp_basemap.description = currentLayer.description;
                    tmp_basemap.isDefault = (currentLayer.defaultlayer == "t");
                    tmp_basemap.group = currentLayer.basemapgroup;
                    tmp_basemap.subgroup = currentLayer.subgroup;
                    tmp_basemap.url = htmlspecialchars_decode(currentLayer.layermetaurl);
                    tmp_basemap.refreshDate = (curLayer.geoshopRefreshDate ? curLayer.geoshopRefreshDate : null);
                    legendBasemaps.push(tmp_basemap);
                    if (currentLayer.subgroup) legendBasemapsSubgroups = true;
                }
                i_total_layers++;
            }
            i_layer = 0;
            if (groupname.toLowerCase() != "basemap" && groupname.toLowerCase() != "searchonly") {
                html_group.append("</table>");
                if (currentSubgroupName != "noSubGroup") {
                    html_group.append("</td></tr></table>");
                }
                group.html = html_group.toString();
                if (groupactivity == 1) {
                    html.append(group.html);
                    group.isAppended = true;
                } else group.isAppended = false;
                html.append("</td></tr>");
                group.html = group.html.replace(/ value='1'/g, '');
                group.html = group.html.replace(/ checked/g, '');
                group.html = group.html.replace(/gogisLegendGroupImageCollapse/g, 'gogisLegendGroupImageExpand');
                group.html = group.html.replace(/gogisLegendLayersVisible/g, 'gogisLegendLayersHidden');
            }
        }
        if (legendRefreshDate) {
            var tmpElem;
            tmpElem = document.getElementById("gogisCurrentThemeContent");
            if (tmpElem) tmpElem.innerHTML = gogisMapThemes[gogisCurrentTheme].description.replace("<CURDATE>", legendRefreshDate.getDate() + ". " + getLocalizedMonth(legendRefreshDate.getMonth()) + " " + legendRefreshDate.getFullYear());
            tmpElem = document.getElementById("gogisCurrentThemeContentSidePan");
            if (tmpElem) tmpElem.innerHTML = gogisMapThemes[gogisCurrentTheme].descriptionSidePan.replace("<CURDATE>", legendRefreshDate.getDate() + ". " + getLocalizedMonth(legendRefreshDate.getMonth()) + " " + legendRefreshDate.getFullYear());
        }
        if (gogisApplication.DYN_LEGEND && gogisApplication.DYN_LEGEND[gogisCurrentInstance] == true) {
            if (leg_html.buffer.length > 0) leg_html.append("</table>");
            leg_html_head.append("<table cellspacing='0' cellpadding='1' class='gogisPrintLegend'>");
            leg_html_head.append("<tr><td valign='top'><div class='gogisPrintLegendTitle'>");
            leg_html_head.append(gLocalizer.localize("TITLE_CHOOSE_THEME") + ": ");
            leg_html_head.append("</div></td>");
            leg_html_head.append("<td valign='top' width='100%'><b><div class='gogisPrintLegendTitleSubject'>");
            leg_html_head.append(gogisMapThemes[gogisCurrentTheme].name + "&nbsp;");
            if (gogisMapThemes[gogisCurrentTheme].themeMetaUrl > "") {
                leg_html_head.append("<a href='javascript:click()' title='");
                leg_html_head.append(gLocalizer.localize('TOOLTIP_METADATA') + "'");
                leg_html_head.append("onClick=\"gogisXPopUpWithMenu(\'" + gogisMapThemes[gogisCurrentTheme].themeMetaUrl);
                leg_html_head.append("\',\'print_searchResultDetails\',");
                leg_html_head.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                leg_html_head.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                leg_html_head.append("<img class='gogisPrintLegendMetaUrlLayer' src='kamap/images/a_pixel.gif'></a>");
            }
            leg_html_head.append("</div></b></td></tr>");
            leg_html_head.append("<tr><td valign='top' colspan='2'><div class='gogisPrintLegendTitleDescr'>");
            if (legendRefreshDate) {
                leg_html_head.append(gogisMapThemes[gogisCurrentTheme].description.replace("<CURDATE>", legendRefreshDate.getDate() + ". " + getLocalizedMonth(legendRefreshDate.getMonth()) + " " + legendRefreshDate.getFullYear()));
            } else leg_html_head.append(gogisMapThemes[gogisCurrentTheme].description);
            leg_html_head.append("</div></td></tr></table>");
            if (gogisApplication.BASEMAP_LEGEND && gogisApplication.BASEMAP_LEGEND[gogisCurrentInstance] == false) {
                leg_html_map.append("<table cellspacing='0' cellpadding='0' border='0'>");
                leg_html_map.append("<tr class='gogisLegendGroupText'>");
                leg_html_map.append("<td valign='top' colspan='3' style='padding-top: 10px; vertical-align:bottom;'><b>");
                leg_html_map.append(gLocalizer.localize('BaseMap') + "&nbsp;");
                if (legendDoc.root[0].group[0].groupmetaurl > "") {
                    leg_html_map.append("<a href='javascript:click()' title='");
                    leg_html_map.append(gLocalizer.localize('TOOLTIP_METADATA') + "'");
                    leg_html_map.append("onClick=\"gogisXPopUpWithMenu(\'" + legendDoc.root[0].group[0].groupmetaurl);
                    leg_html_map.append("\',\'print_searchResultDetails\',");
                    leg_html_map.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                    leg_html_map.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                    leg_html_map.append("<img class='gogisPrintLegendMetaUrlLayer' src='kamap/images/a_pixel.gif'></a>");
                }
                leg_html_map.append("</b></td></tr>");
                if (gLocalizer.localize('BaseMapDescr').trim() > "" && gLocalizer.localize('BaseMapDescr').trim() != 'BaseMapDescr') {
                    leg_html_map.append("<tr class='gogisLegendGroupText'>");
                    leg_html_map.append("<td valign='top' colspan='3' style='height:vertical-align:middle;'>");
                    leg_html_map.append(gLocalizer.localize('BaseMapDescr'));
                    leg_html_map.append("</td></tr>");
                }
                leg_html_map.append("</table>");
            }
            printgroups = new Array();
            var printgroup;
            lastSubgroupName = currentSubgroupName = "noSubGroup";
            for (var i = 0; i < legendBasemaps.length; i++) {
                printgroup = cMap.getLayer(legendBasemaps[i].name).printgroup;
                if (!printgroups[printgroup]) {
                    if (printgroup > "") printgroups[printgroup] = legendBasemaps[i].name;
                    lastSubgroupName = currentSubgroupName;
                    if (legendBasemaps[i].subgroup) currentSubgroupName = legendBasemaps[i].subgroup;
                    else currentSubgroupName = "noSubGroup";
                    if (lastSubgroupName != currentSubgroupName) {
                        if (currentSubgroupName != "noSubGroup") {
                            leg_html_map.append("<table cellspacing='0' cellpadding='0' border='0' style='padding-top:3px;'><tr id='legend_sg_");
                            leg_html_map.append(legendBasemaps[i].subgroup + "' class='gogisLegendGroupText'>");
                            leg_html_map.append("<td valign='top' class='gogisPrintLegendBasemapText'><div class='gogisPrintLegendLayerSimpleText'>");
                            leg_html_map.append("<i>" + gLocalizer.localize(legendBasemaps[i].subgroup) + "</i>");
                            leg_html_map.append("</div></td><td class='gogisPrintLegendDistance'></td><td valign='top'>");
                            leg_html_map.append("</td></tr></table>");
                        }
                    }
                    if (gogisApplication.BASEMAP_LEGEND && gogisApplication.BASEMAP_LEGEND[gogisCurrentInstance] == true) {
                        leg_html_map.append("<table cellspacing='0' cellpadding='0' border='0'><tr id='legend_");
                        leg_html_map.append(legendBasemaps[i].name + "' class='gogisLegendGroupText'><td>");
                        leg_html_map.append("<table cellspacing='0' cellpadding='0' border='0'><tr class='gogisLegendGroupText'>");
                        leg_html_map.append("<td valign='top' style='padding-top: 10px; vertical-align:bottom;' colspan='4'><b>");
                        leg_html_map.append(gLocalizer.localize(legendBasemaps[i].name) + "&nbsp;");
                        if (legendBasemaps[i].url > "") {
                            leg_html_map.append("<a href='javascript:click()' title='");
                            leg_html_map.append(gLocalizer.localize('TOOLTIP_METADATA') + "'");
                            leg_html_map.append("onClick=\"gogisXPopUpWithMenu(\'" + legendBasemaps[i].url);
                            leg_html_map.append("\',\'print_searchResultDetails\',");
                            leg_html_map.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                            leg_html_map.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                            leg_html_map.append("<img class='gogisPrintLegendMetaUrlLayer' src='kamap/images/a_pixel.gif'></a>");
                        }
                        leg_html_map.append("</b></td></tr>");
                        if (gLocalizer.localize(legendBasemaps[i].description).trim() > "" && gLocalizer.localize(legendBasemaps[i].description).trim() != legendBasemaps[i].description) {
                            leg_html_map.append("<tr class='gogisLegendGroupText'>");
                            legendicon = cMap.getLayer(legendBasemaps[i].name).legendicon;
                            if (legendicon > "") {
                                legendiconsrc = "gogis/images/legendicons/" + legendicon;
                                leg_html_map.append("<td valign='top' class='gogisPrintLegendDistance'>");
                                leg_html_map.append("<img class='gogisPrintLegendIcon' src='" + legendiconsrc + "'></td>");
                            }
                            leg_html_map.append("<td valign='top' class='gogisPrintLegendLayerText'>");
                            leg_html_map.append(gLocalizer.localize(legendBasemaps[i].description));
                            leg_html_map.append("</td></tr>");
                        }
                        leg_html_map.append("<tr><td><div id='bml_" + legendBasemaps[i].name + "'>");
                        leg_html_map.append("</div></td></tr></table></td></tr></table>");
                    } else {
                        leg_html_map.append("<table cellspacing='0' cellpadding='0' border='0'><tr id='legend_" + legendBasemaps[i].name);
                        leg_html_map.append("' class='gogisLegendGroupText'><td valign='top' class='gogisPrintLegendBasemapText'><div class='gogisPrintLegendLayerSimpleText'>");
                        leg_html_map.append(gLocalizer.localize(legendBasemaps[i].name));
                        if (legendBasemaps[i].url > "") {
                            leg_html_map.append("&nbsp;<a href='javascript:click()' title='");
                            leg_html_map.append(gLocalizer.localize('TOOLTIP_METADATA') + "'");
                            leg_html_map.append("onClick=\"gogisXPopUpWithMenu(\'" + legendBasemaps[i].url);
                            leg_html_map.append("\',\'print_searchResultDetails\',");
                            leg_html_map.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                            leg_html_map.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");\">");
                            leg_html_map.append("<img class='gogisPrintLegendMetaUrlLayer' src='kamap/images/a_pixel.gif'></a>");
                        }
                        leg_html_map.append("</div></td><td class='gogisPrintLegendDistance'></td><td valign='top'>");
                        if (legendBasemaps[i].refreshDate) {
                            leg_html_map.append(gLocalizer.localize(legendBasemaps[i].description).replace("<CURDATE>", legendBasemaps[i].refreshDate.getDate() + ". " + getLocalizedMonth(legendBasemaps[i].refreshDate.getMonth()) + " " + legendBasemaps[i].refreshDate.getFullYear()));
                        } else leg_html_map.append(gLocalizer.localize(legendBasemaps[i].description));
                        leg_html_map.append("</td></tr></table>");
                    }
                }
            }
            leg_html_tmp = leg_html_map.toString() + leg_html.toString();
            if (footer_html == null) {
                footer_html = new StringBuffer();
                footer_html.append("<table border='0'><tr><!--print--><td width='100%'></td>");
                footer_html.append("<td><div><a id='drawActiveLegend' href='javascript:click()' ");
                footer_html.append("onClick='flag_drawActiveLegend=true; ");
                footer_html.append("gogisSetupPrintableLegend(true)';>");
                footer_html.append(gLocalizer.localize("NAVIGATION_ACTIVE_LAYERS"));
                footer_html.append("</a></div></td>");
                footer_html.append("<td>&nbsp;<span class='gogisAutocompleteListDelimiter'>|</span>&nbsp;</td>");
                footer_html.append("<td><div><a id='drawAllLegend' class='gogisAutocompleteNavigationSelected' ");
                footer_html.append("href='javascript:click()' ");
                footer_html.append("onClick='flag_drawActiveLegend=false; gogisSetupPrintableLegend(false)';>");
                footer_html.append(gLocalizer.localize("NAVIGATION_ALL_LAYERS"));
                footer_html.append("</a></div></td>");
                footer_html.append("<td>&nbsp;<span class='gogisAutocompleteListDelimiter'>|</span>&nbsp;</td><td>");
                footer_html.append("<a href='javascript:click()' ");
                footer_html.append("onClick=\"gogisXPopUpWithMenu('gogis/php/printLegend.php?instance=");
                footer_html.append(gogisCurrentInstance + "&language=" + gogisCurrentLanguage);
                footer_html.append("&formatlocale=" + gLocalizer.localize("FORMAT_LOCALE"));
                footer_html.append("&formatlongdate=" + gLocalizer.localize("FORMAT_LONGDATE"));
                footer_html.append("&title=" + gLocalizer.localize("PRINT_SEARCHRESULT_LEGEND"));
                footer_html.append("','print_searchResultDetails',");
                footer_html.append(gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ",");
                footer_html.append(gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ");return false;\">");
                footer_html.append("<img class='gogisFooterPrintIcon' src='kamap/images/a_pixel.gif' title='");
                footer_html.append(gLocalizer.localize("PRINT_SEARCHRESULT_LEGEND"));
                footer_html.append("'></a></td><!--print--></tr></table>");
                footer_html = footer_html.toString();
            }
        }
        html_bas.append("</select><span id='gogisLegendMetaUrlDiv' style='display:none;'>");
        html_bas.append("<a href='' id='metalink' title='" + gLocalizer.localize('TOOLTIP_METADATA') + "'>");
        html_bas.append("<img class='gogisLegendMetaUrl' src='kamap/images/a_pixel.gif'></a></span>");
        document.getElementById("legendBaseMaps").innerHTML = html_bas.toString();
        html.append("</table>");
        html.append("</form>");
        html = html.toString();
        var layerTitle = getRawObject('gogisChooseLayersTitle');
        var legendLayers = getRawObject('legendLayers');
        var redrawLegend = false;
        if (html.indexOf("Group") >= 0) {
            legendLayers.innerHTML = html;
            if (gogisApplication.IE6_PNG_ALPHA && gogisApplication.IE6_PNG_ALPHA[gogisCurrentInstance] == true && dd.ie && !isIE7) {
                applyPNGFilterToChilds(legendLayers);
            }
            if (layerTitle.style.visibility != 'visible') {
                layerTitle.style.visibility = 'visible';
                layerTitle.style.display = 'block';
                redrawLegend = true;
            }
        } else {
            legendLayers.innerHTML = "&nbsp;";
            if (layerTitle.style.visibility != 'hidden') {
                layerTitle.style.visibility = 'hidden';
                layerTitle.style.display = 'none';
                redrawLegend = true;
            }
        }
        if (gogisApplication.DYN_LEGEND && gogisApplication.DYN_LEGEND[gogisCurrentInstance] == true) {
            leg_head_tmp = leg_html_head.toString();
            document.getElementById("gogisLegendDetailsHeader").innerHTML = leg_head_tmp;
            document.getElementById("gogisLegendDetailsContent").innerHTML = leg_html_tmp;
            document.getElementById("gogisLegendDetailsFooter").innerHTML = footer_html;
            if (gogisApplication.IE6_PNG_ALPHA && gogisApplication.IE6_PNG_ALPHA[gogisCurrentInstance] == true && dd.ie && !isIE7) applyPNGFilterToChilds(document.getElementById("gogisLegendDetailsContent"));
        }
    }
    gogisDefaultLayers = '';
    if (gogisMapThemes[gogisCurrentTheme].mapfile != szMap) {
        var layers = myKaMap.getCurrentMap().getLayers();
        for (var iHide = 0; iHide < layers.length; iHide++) {
            if (previousSelectedBasemap != layers[iHide].name && legendSelectedBasemap != layers[iHide].name) {
                myGogisOverlay.removeLayer(layers[iHide].name);
                myKaMap.setLayerVisibility(layers[iHide].name, false);
            }
        }
    }
    myKaKeymap.changeMap(gogisKeymaps[gogisCurrentTheme]);
    var tmpScaleChanged = false;
    if (geoViewerIsReady && gogisLegend.callback == gogisLegendCallback) {
        var tmpCurrentScale = parseInt(myKaMap.getCurrentScale());
        if (gogisMapThemes[gogisCurrentTheme].defaultMinScale > 0 && gogisMapThemes[gogisCurrentTheme].defaultMinScale < tmpCurrentScale) {
            tmpScaleChanged = true;
            myKaMap.zoomToScale(gogisMapThemes[gogisCurrentTheme].defaultMinScale);
        } else if (gogisMapThemes[gogisCurrentTheme].defaultMaxScale >= 0 && gogisMapThemes[gogisCurrentTheme].defaultMaxScale > tmpCurrentScale) {
            tmpScaleChanged = true;
            myKaMap.zoomToScale(gogisMapThemes[gogisCurrentTheme].defaultMaxScale);
        } else {
            myKaMap.setLayerVisibility(previousSelectedBasemap, false);
            myKaMap.setLayerVisibility(legendSelectedBasemap, true);
        }
    } else if (geoViewerIsReady && gogisLegend.callback != gogisLegendCallback) {
        if (redrawLegend) myLegendPanRefresh();
        if (!gogisLegend.callback()) {
            gogisSetupBasemaps();
        } else {
            myKaMap.setLayerVisibility(previousSelectedBasemap, false);
            myKaMap.setLayerVisibility(legendSelectedBasemap, true);
        }
        setTimeout(function() {
            if (myXmlOverlay.overlayEventMap) myXmlOverlay.overlayEventMap.style.display = "inline";
        }, 2000);
        return;
    }
    if (tmpScaleChanged == false) {
        if (gogisMapThemes[gogisCurrentTheme].mapfile != szMap) {
            var cScale = myKaMap.getCurrentScale();
            gogisPreviouseMap = szMap;
            szMap = gogisMapThemes[gogisCurrentTheme].mapfile;
            myKaMap.currentMap = szMap;
            myKaMap.getCurrentMap().currentScale = myKaMap.getScale(cScale);
            myKaMap.setBackgroundColor(myKaMap.getCurrentMap().backgroundColor);
            myKaKeymap.draw();
            myKaKeymap.update(null, myKaMap.getGeoExtents());
            if (!gogisApplication.SHOW_TOOL_ZOOM || gogisApplication.SHOW_TOOL_ZOOM[gogisCurrentInstance]) {
                myKaZoomer.draw();
                myKaZoomer.update();
            }
        }
        gogisSetupBasemaps();
        gogisLegendSetup(cMap.getAllLayers());
        if (!geoViewerIsReady) {
            getRawObject('page').style.visibility = 'visible';
            getRawObject('viewport').style.visibility = 'visible';
            getRawObject('gogisTabControlContent1').className = 'gogisTabControlActiveContent';
            myAfterInitalize();
        } else {
            if (redrawLegend) myLegendPanRefresh();
            updateLinkToView();
        }
    }
    if (geoViewerIsReady) {
        setTimeout(function() {
            if (myXmlOverlay.overlayEventMap) myXmlOverlay.overlayEventMap.style.display = "inline";
        }, 2000);
    }
}

function gogisGetGroupFilter(groupfilter, i_group, off) {
    var fieldname, defaultVal, currentVal;
    var isRange = 0;
    var needRefreshButton = false;
    var html = "<tr><td colspan='3'><table cellpadding='1' cellspacing='0' border='0'>";
    for (var i = 0; i < groupfilter.fields.length; i++) {
        fieldname = groupfilter.name + "_" + groupfilter.fields[i].replacename;
        if (!isRange && groupfilter.fields[i + 1] && groupfilter.fields[i + 1].type == groupfilter.fields[i].type) isRange = 1;
        else if (isRange && groupfilter.fields[i - 1] && groupfilter.fields[i - 1].type != groupfilter.fields[i].type) isRange = 0;
        else isRange = 2;
        html += "<tr>" + "<td>" + gLocalizer.localize(groupfilter.fields[i].label) + "</td>";
        if (groupfilter.fields[i].type == "date") {
            needRefreshButton = true;
            html += "<td>";
            if (!off && groupfilter.fields[i].defaultvalue.indexOf('now') >= 0) {
                defaultVal = new Date();
                defaultVal = defaultVal.getTime() + parseInt(groupfilter.fields[i].defaultvalue.replace(/now/, "")) * 1000 * 60 * 60 * 24;
                defaultVal = new Date(defaultVal);
                defaultVal = defaultVal.getDate() + "." + (defaultVal.getMonth() + 1) + "." + defaultVal.getFullYear();
                currentVal = defaultVal;
            } else if (!off && groupfilter.fields[i].defaultvalue > "") {
                defaultVal = groupfilter.fields[i].defaultvalue;
                currentVal = defaultVal;
            } else if (isRange == 1) {
                defaultVal = "";
                currentVal = "01.01.1800";
            } else if (isRange == 2) {
                defaultVal = "";
                currentVal = "31.12.2099";
            }
            html += "<input id='" + fieldname + "' name='" + fieldname + "' value='" + defaultVal + "' currentValue='" + currentVal + "' title='" + gLocalizer.localize("FILTER_FIELD_DATE_TITLE") + "' type='text' class='gogisFilterDate' filter='1'";
            if (isRange == 1) {
                html += " onKeyUp='if(!isDate(this.value,document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i + 1].replacename + "\").value,2))" + "{this.style.color=\"#ff0000\";doSetFocus(this);}" + "else{this.style.color=\"#000000\";if(isDate(document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i + 1].replacename + "\").value))document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i + 1].replacename + "\").style.color=\"#000000\";};'";
            } else if (isRange == 2) {
                html += " onKeyUp='if(!isDate(this.value,document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i - 1].replacename + "\").value,1))" + "{this.style.color=\"#ff0000\";doSetFocus(this);}" + "else{this.style.color=\"#000000\";if(isDate(document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i - 1].replacename + "\").value))document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i - 1].replacename + "\").style.color=\"#000000\";};'";
            } else {
                html += " onKeyUp='if(!isDate(this.value))" + "{this.style.color=\"#ff0000\";doSetFocus(this);}" + "else{this.style.color=\"#000000\";};'";
            }
            html += " onkeypress='if(event.keyCode==13){gogisApplyGroupFilter(" + i_group + ");return false;}'>";
            html += "<img src='gogis/images/calendar.gif' width='16' height='16' " + "title='" + gLocalizer.localize("FILTER_BUTTON_CALENDAR_TITLE") + "' " + "align='top' style='cursor:pointer;' ";
            if (isRange == 1) {
                html += "onClick='tmpDateFilterElem=document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i + 1].replacename + "\");" + "if(tmpDateFilterElem && isDate(tmpDateFilterElem.value))" + "{cw.config=\"strict\";calSetStartDate(\"01.01.1800\");" + "calSetEndDate((tmpDateFilterElem.value>\"\"?tmpDateFilterElem.value:\"31.12.2099\"));" + "fPopCalendar(\"" + fieldname + "\",this);}return false;'>";
            } else if (isRange == 2) {
                html += "onClick='tmpDateFilterElem=document.getElementById(\"" + groupfilter.name + "_" + groupfilter.fields[i - 1].replacename + "\");" + "if(tmpDateFilterElem && isDate(tmpDateFilterElem.value))" + "{cw.config=\"strict\";calSetStartDate((tmpDateFilterElem.value>\"\"?tmpDateFilterElem.value:\"01.01.1800\"));" + "calSetEndDate(\"31.12.2099\");" + "fPopCalendar(\"" + fieldname + "\",this);}return false;'>";
            } else {
                html += "onClick='cw.config=\"loose\";fPopCalendar(\"" + fieldname + "\",this);return false;'>";
            }
            html += "</td>";
        } else if (groupfilter.fields[i].type == "select") {
            var groupFilterRequestObj = new GogisRequestObject();
            groupFilterRequestObj.action = gogisHandleGroupFilterResponse;
            groupFilterRequestObj.fieldname = fieldname;
            groupFilterRequestObj.defaultvalue = groupfilter.fields[i].defaultvalue;
            var url = "gogis/php/getFilterLookUp.php" + "?instance=" + gogisCurrentInstance + "&map=" + gogisMapThemes[gogisCurrentTheme].mapfile + "&layer=" + legendDoc.root[0].group[i_group].layer[0].name + "&filter=" + i;
            groupFilterRequestObj.sendRequest(url);
            html += "<td>" + "<select id='" + fieldname + "' name='" + fieldname + "' title='" + gLocalizer.localize("FILTER_FIELD_SELECT_TITLE") + "' onchange='gogisApplyGroupFilter(" + i_group + ");" + "' class='gogisFilterSelect' filter='1' currentValue='" + groupfilter.fields[i].defaultvalue + "'>" + "<option value='none'" + (groupfilter.fields[i].defaultvalue == "none" ? " selected" : "") + "></option>" + "</select>" + "</td>";
        } else {
            html += "<td></td>";
        }
        html += "</tr>";
    }
    if (needRefreshButton == true) {
        html += "<tr><td><td align='right'>" + "<a href='javascript:click();' class='gogisServiceButton' " + "title='" + gLocalizer.localize("FILTER_BUTTON_REFRESH_TITLE") + "' onclick='gogisApplyGroupFilter(" + i_group + ");'>" + gLocalizer.localize("FILTER_BUTTON_REFRESH") + "</a>"; + "</td></tr>";
    }
    html += "</table></td></tr>";
    return html;
}

function gogisHandleGroupFilterResponse(response) {
    if (isIntNegative(response)) return;
    var obj = eval('(' + response + ')');
    if (obj && obj.root) {
        var field = document.getElementById(this.fieldname);
        for (var i = 0; i < obj.root.length; i++) {
            field.options[i + 1] = new Option(obj.root[i].lookupname, obj.root[i].lookupid, false, false);
            if (this.defaultvalue == obj.root[i].lookupid) field.options[i + 1].selected = true;
        }
    }
}

function gogisApplyGroupFilter(i_group) {
    if (!i_group) return;
    var groupObj = legendDoc.root[0].group[i_group];
    if (!groupObj) return;
    var groupfilter = groupObj.groupfilter;
    if (!groupfilter) return;
    var field, layer, layerGroup, group, isMergedLayer;
    var isRange = 0;
    var values = new Array();
    for (var i = 0; i < groupfilter.fields.length; i++) {
        field = document.getElementById(groupfilter.name + "_" + groupfilter.fields[i].replacename);
        if (!isRange && groupfilter.fields[i + 1] && groupfilter.fields[i + 1].type == groupfilter.fields[i].type) isRange = 1;
        else if (isRange && groupfilter.fields[i - 1] && groupfilter.fields[i - 1].type != groupfilter.fields[i].type) isRange = 0;
        else isRange = 2;
        if (groupfilter.fields[i].type == "date") {
            if (isRange == 1) {
                if (!isDate(field.value)) {
                    if (!isDate(document.getElementById(groupfilter.name + "_" + groupfilter.fields[i + 1].replacename).value)) document.getElementById(groupfilter.name + "_" + groupfilter.fields[i + 1].replacename).style.color = "#ff0000";
                    field.style.color = "#ff0000";
                    doSetFocus(field);
                    return;
                } else field.style.color = "#000000";
                values.push((field.value > "" ? field.value : "01.01.1800"));
            } else if (isRange == 2) {
                if (!isDate(field.value, document.getElementById(groupfilter.name + "_" + groupfilter.fields[i - 1].replacename).value, 1)) {
                    if (!isDate(document.getElementById(groupfilter.name + "_" + groupfilter.fields[i - 1].replacename).value)) document.getElementById(groupfilter.name + "_" + groupfilter.fields[i - 1].replacename).style.color = "#ff0000";
                    field.style.color = "#ff0000";
                    doSetFocus(field);
                    return;
                } else field.style.color = "#000000";
                values.push((field.value > "" ? field.value : "31.12.2099"));
            } else {
                if (field.value == "" || !isDate(field.value)) {
                    field.style.color = "#ff0000";
                    doSetFocus(field);
                    return;
                } else field.style.color = "#000000";
                values.push(field.value);
            }
        } else if (groupfilter.fields[i].type == "select") {
            values.push(field.options[field.selectedIndex].value ? field.options[field.selectedIndex].value : 'none');
        }
    }
    for (var i = 0; i < groupfilter.fields.length; i++) {
        field = document.getElementById(groupfilter.name + "_" + groupfilter.fields[i].replacename);
        field.setAttribute("currentValue", values[i]);
    }
    var cMap = myKaMap.getCurrentMap();
    var cacheid = parseInt((new Date()).getTime());
    for (var i_layer = 0; i_layer < groupObj.layer.length; i_layer++) {
        layer = cMap.getLayer(groupObj.layer[i_layer].name);
        if (layer.filter && layer.filter.name == groupfilter.name) {
            group = layer.name.split("++")[0];
            layerGroup = myKaMap.getCurrentMap().getLayer(group);
            isMergedLayer = (layer.name != layerGroup.name && groupObj.grouptype == 3);
            myXmlOverlay.removePoint((isMergedLayer && layer.mergeoverlay ? group : layer.name));
            myGogisOverlay.removeLayer((isMergedLayer && layer.mergeoverlay ? group : layer.name), true);
            myKaMap.setLayerVisibility((isMergedLayer ? group : layer.name), false);
            (isMergedLayer ? layerGroup : layer).cacheid = cacheid;
        }
    }
    setTimeout("groupCheckBoxClicked(legendDoc.root[0].group[" + i_group + "].name, " + i_group + ", true);", 20);
}

function gogisResetGroupFilter(layerName) {
    var i_group = gogisLegendGetGroupIdByLayername(layerName);
    if (!i_group) return;
    var groupObj = legendDoc.root[0].group[i_group];
    if (!groupObj) return;
    var groupfilter = groupObj.groupfilter;
    if (!groupfilter) return;
    var field, layer, layerGroup, group, isMergedLayer;
    var isRange = 0;
    var needRefresh = false;
    for (var i = 0; i < groupfilter.fields.length; i++) {
        if (!isRange && groupfilter.fields[i + 1] && groupfilter.fields[i + 1].type == groupfilter.fields[i].type) isRange = 1;
        else if (isRange && groupfilter.fields[i - 1] && groupfilter.fields[i - 1].type != groupfilter.fields[i].type) isRange = 0;
        else isRange = 2;
        field = document.getElementById(groupfilter.name + "_" + groupfilter.fields[i].replacename);
        if (groupfilter.fields[i].type == "date") {
            if (isRange == 1) {
                if (field.value != "" || field.currentValue != "01.01.1800") needRefresh = true;
                field.value = "";
                field.setAttribute("currentValue", "01.01.1800");
            } else if (isRange == 2) {
                if (field.value != "" || field.currentValue != "01.01.1800") needRefresh = true;
                field.value = "";
                field.setAttribute("currentValue", "31.12.2099");
            }
        } else if (groupfilter.fields[i].type == "select") {
            field.selectedIndex = 0;
            field.setAttribute("currentValue", "none");
        }
    }
    if (!needRefresh) return;
    var cMap = myKaMap.getCurrentMap();
    var cacheid = parseInt((new Date()).getTime());
    for (var i_layer = 0; i_layer < groupObj.layer.length; i_layer++) {
        layer = cMap.getLayer(groupObj.layer[i_layer].name);
        if (layer.filter && layer.filter.name == groupfilter.name) {
            group = layer.name.split("++")[0];
            layerGroup = myKaMap.getCurrentMap().getLayer(group);
            isMergedLayer = (layer.name != layerGroup.name && groupObj.grouptype == 3);
            myXmlOverlay.removePoint((isMergedLayer && layer.mergeoverlay ? group : layer.name));
            myGogisOverlay.removeLayer((isMergedLayer && layer.mergeoverlay ? group : layer.name), true);
            myKaMap.setLayerVisibility((isMergedLayer ? group : layer.name), false);
            (isMergedLayer ? layerGroup : layer).cacheid = cacheid;
        }
    }
}

function gogisSetupPrintableLegend(visible) {
    if (flag_drawActiveLegend) {
        document.getElementById("drawActiveLegend").className = "gogisAutocompleteNavigationSelected";
        document.getElementById("drawAllLegend").className = "gogisAutocompleteNavigationLink";
    } else {
        document.getElementById("drawActiveLegend").className = "gogisAutocompleteNavigationLink";
        document.getElementById("drawAllLegend").className = "gogisAutocompleteNavigationSelected";
    }
    var tmpLegEleme;
    var subgroupVisible = false;
    var lastSubgroupName = currentSubgroupName = "noSubGroup";
    if (visible) {
        var i, layer1, layer2, printgroup, formElement;
        var getBasemap = document.getElementById('basemaps');
        var valueBasemap = getBasemap.options[getBasemap.selectedIndex].value;
        for (i = 0; i < legendBasemaps.length; i++) {
            printgroup = getLayerPrintGroup(legendBasemaps[i].name);
            lastSubgroupName = currentSubgroupName;
            if (legendBasemaps[i].subgroup) currentSubgroupName = legendBasemaps[i].subgroup;
            else currentSubgroupName = "noSubGroup";
            if (lastSubgroupName != currentSubgroupName) {
                tmpLegElem = document.getElementById("legend_sg_" + lastSubgroupName);
                if (lastSubgroupName != "noSubGroup" && tmpLegElem) {
                    if (subgroupVisible) tmpLegElem.className = "gogisPrintLegendLayerText";
                    else tmpLegElem.className = "gogisLegendLayersHidden";
                }
                if (currentSubgroupName != "noSubGroup") {
                    subgroupVisible = false;
                }
            }
            if (legendBasemaps[i].name == valueBasemap || printgroups[printgroup] == valueBasemap) {
                document.getElementById("legend_" + ((!printgroups[printgroup]) ? legendBasemaps[i].name : printgroups[printgroup])).className = "gogisPrintLegendLayerText";
                if (legendBasemaps[i].subgroup) subgroupVisible = true;
            } else {
                tmpLegElem = document.getElementById("legend_" + legendBasemaps[i].name);
                if (tmpLegElem) tmpLegElem.className = "gogisLegendLayersHidden";
            }
        }
        if (currentSubgroupName != "noSubGroup") {
            tmpLegElem = document.getElementById("legend_sg_" + currentSubgroupName);
            if (tmpLegElem) {
                if (subgroupVisible) tmpLegElem.className = "gogisPrintLegendLayerText";
                else tmpLegElem.className = "gogisLegendLayersHidden";
            }
        }
        if (document.forms["layers"]) {
            for (j = 0; j < legendDoc.root[0].group.length; j++) {
                group = legendDoc.root[0].group[j];
                if (group.name != "BASEMAP" && group.name != "SEARCHONLY") {
                    lastSubgroupName = currentSubgroupName = "noSubGroup";
                    subgroupVisible = false;
                    layer1 = document.getElementById("legend_" + group.name);
                    layer2 = document.getElementById("legend_" + group.name + "_2");
                    formElement = document.forms["layers"].elements["group_" + group.name];
                    if (formElement && !formElement.disabled && formElement.checked) {
                        layer1.className = "gogisPrintLegendLayerText";
                        if (layer2) layer2.className = "gogisPrintLegendLayerText";
                    } else {
                        layer1.className = "gogisLegendLayersHidden";
                        if (layer2) layer2.className = "gogisLegendLayersHidden";
                    }
                    for (i = 0; i < group.numlayers; i++) {
                        layer1 = document.getElementById("legend_" + group.layer[i].name);
                        formElement = document.forms["layers"].elements["layer_" + group.layer[i].name];
                        lastSubgroupName = currentSubgroupName;
                        if (group.layer[i].subgroup) currentSubgroupName = group.layer[i].subgroup;
                        else currentSubgroupName = "noSubGroup";
                        if (lastSubgroupName != currentSubgroupName) {
                            tmpLegElem = document.getElementById("legend_sg_" + lastSubgroupName);
                            if (lastSubgroupName != "noSubGroup" && tmpLegElem) {
                                if (subgroupVisible) tmpLegElem.className = "gogisPrintLegendLayerText";
                                else tmpLegElem.className = "gogisLegendLayersHidden";
                            }
                            if (currentSubgroupName != "noSubGroup") {
                                subgroupVisible = false;
                            }
                        }
                        if (formElement && !formElement.disabled && (formElement.checked || (formElement.type == "hidden" && formElement.value == 1))) {
                            layer1.className = "gogisPrintLegendLayerText";
                            if (group.layer[i].subgroup) subgroupVisible = true;
                        } else layer1.className = "gogisLegendLayersHidden";
                    }
                }
                if (currentSubgroupName != "noSubGroup") {
                    tmpLegElem = document.getElementById("legend_sg_" + currentSubgroupName);
                    if (tmpLegElem) {
                        if (subgroupVisible) tmpLegElem.className = "gogisPrintLegendLayerText";
                        else tmpLegElem.className = "gogisLegendLayersHidden";
                    }
                }
            }
        }
    } else {
        document.getElementById("gogisLegendDetailsContent").innerHTML = leg_html_tmp;
        var visBMLayer;
        var visBMLayers = new Array();
        for (i = 0; i < legendBasemaps.length; i++) {
            visBMLayer = gLocalizer.localize(legendBasemaps[i].name) + gLocalizer.localize(legendBasemaps[i].description);
            if (visBMLayers[visBMLayer]) {
                tmpLegElem = document.getElementById("legend_" + legendBasemaps[i].name);
                if (tmpLegElem) tmpLegElem.className = "gogisLegendLayersHidden";
            } else visBMLayers[visBMLayer] = true;
            if (gogisApplication.BASEMAP_LEGEND && gogisApplication.BASEMAP_LEGEND[gogisCurrentInstance] == true) {
                gogisSetBaseMapLegend(legendBasemaps[i].name, 'printable', 'bml_' + legendBasemaps[i].name);
            }
        }
        if (gogisApplication.IE6_PNG_ALPHA[gogisCurrentInstance] && dd.ie && !isIE7) {
            applyPNGFilterToChilds(document.getElementById("gogisLegendDetailsContent"));
        }
    }
}

function subgroupCheckBoxClicked(subgroupname, i_group) {
    var bForce = arguments[2];
    var group = legendDoc.root[0].group[i_group];
    var cSubgroupInp = document.getElementById("idSubgroupCheckbox_" + subgroupname);
    var cGroupInp = document.getElementById("idCheckbox_" + group.name + "||" + i_group);
    var cLayerInp, tmp_layerInp, tmp_subGroupInp;
    var groupIsActive = false;
    var isFirst = true;
    var cSubgroupType = 1;
    if (bForce) cSubgroupInp.checked = true;
    gogisLegendSubgroupExpand(subgroupname, cSubgroupInp.checked);
    for (i_layer = 0; i_layer < group.layer.length; i_layer++) {
        if (group.layer[i_layer].subgroup && group.layer[i_layer].subgroup == subgroupname && group.layer[i_layer].subgrouptype) {
            cSubgroupType = group.layer[i_layer].subgrouptype;
            break;
        }
    }
    for (i_layer = 0; i_layer < group.layer.length; i_layer++) {
        cLayerInp = document.getElementById("Layer|||" + group.name + "|||" + i_layer);
        if (cLayerInp) {
            if (!arguments[4] && group.layer[i_layer].subgroup && group.layer[i_layer].subgroup == subgroupname) {
                if (group.layer[i_layer].subgrouptype && group.layer[i_layer].subgrouptype == 2) cSubgroupInp.checked = true;
                if (cSubgroupInp.checked == false) {
                    if (cLayerInp.type == "hidden") cLayerInp.value = 0;
                    else cLayerInp.checked = false;
                } else {
                    if (cLayerInp.type == "hidden") cLayerInp.value = 1;
                    else if (isFirst || cLayerInp.type != 'radio') {
                        cLayerInp.checked = true;
                        if (cLayerInp.type == 'radio') isFirst = false;
                    }
                    groupIsActive = true;
                }
                if (!arguments[3]) {
                    gogisSetLayerVisibility(group.layer[i_layer].name, (!cLayerInp.disabled && (cLayerInp.checked || (cLayerInp.value == 1 && group.grouptype == 3))));
                }
            } else if (cSubgroupType == 2 && (group.layer[i_layer].subgroup && group.layer[i_layer].subgroup != subgroupname) && group.layer[i_layer].subgrouptype && group.layer[i_layer].subgrouptype == 2) {
                tmp_subGroupInp = document.getElementById("idSubgroupCheckbox_" + group.layer[i_layer].subgroup);
                if (tmp_subGroupInp) {
                    tmp_subGroupInp.checked = false;
                    for (i_lay = 0; i_lay < group.layer.length; i_lay++) {
                        if (group.layer[i_lay].subgrouptype && group.layer[i_lay].subgrouptype == 2 && group.layer[i_lay].subgroup && group.layer[i_lay].subgroup != subgroupname) {
                            if (document.getElementById("idSubgroupExpandImage_" + group.layer[i_lay].subgroup).className == "gogisLegendGroupImageCollapse") gogisLegendSubgroupExpand(group.layer[i_lay].subgroup);
                            tmp_layerInp = document.getElementById("Layer|||" + group.name + "|||" + i_lay);
                            if (tmp_layerInp) {
                                if (tmp_layerInp.type == "hidden") cLayerInp.value = 0;
                                else tmp_layerInp.checked = false;
                                if (!arguments[3]) {
                                    gogisSetLayerVisibility(group.layer[i_lay].name, (!tmp_layerInp.disabled && (tmp_layerInp.checked || (tmp_layerInp.value == 1 && group.grouptype == 3))));
                                }
                            }
                        }
                    }
                }
            }
            if (cLayerInp.checked || (cLayerInp.type == "hidden" && cLayerInp.value == 1)) groupIsActive = true;
        }
    }
    cGroupInp.checked = groupIsActive;
    if (group.maingrouptype == 2) {
        var tmp_group, tmp_groupInp;
        for (var i = 0; i < legendDoc.root[0].group.length; i++) {
            tmp_group = legendDoc.root[0].group[i];
            if (i != i_group && tmp_group.maingrouptype == 2) {
                tmp_groupInp = document.getElementById("idCheckbox_" + tmp_group.name + "||" + i);
                if (tmp_groupInp) {
                    tmp_groupInp.checked = false;
                    groupCheckBoxClicked(tmp_group.name, i, false, arguments[3]);
                }
            }
        }
    }
    if (!arguments[3]) {
        updateLinkToView();
    }
}

function gogisLegendSubgroupExpand(subgroupname) {
    var bExpand, bForce;
    if (arguments.length > 1) {
        bExpand = arguments[1];
        bForce = true;
    } else bForce = false;
    var cSubgroup = document.getElementById("idSubgroupExpandImage_" + subgroupname);
    var cSubgroupRow = document.getElementById("idSubgroupRow_" + subgroupname);
    if (cSubgroup && cSubgroupRow) {
        if (cSubgroup.className == "gogisLegendGroupImageExpand" || (bForce && bExpand)) {
            cSubgroup.className = "gogisLegendGroupImageCollapse";
            cSubgroupRow.className = "gogisLegendLayersVisible";
        } else {
            cSubgroup.className = "gogisLegendGroupImageExpand";
            cSubgroupRow.className = "gogisLegendLayersHidden";
        }
    }
}

function groupCheckBoxClicked(groupname, groupid, bForce) {
    var group = legendDoc.root[0].group[groupid];
    var isAppended = group.isAppended;
    var cGroup = document.getElementById("idGroupDiv|||" + groupname);
    var cGroupInp = document.getElementById("idCheckbox_" + groupname + "||" + groupid);
    var cGroupContainer = document.getElementById("idGroupTd|||" + groupname);
    var cLayerInp, cSubgroupInp, isFirst, hasActiveRadioSubgroup, i;
    if (bForce) cGroupInp.checked = true;
    if (cGroupInp.checked == false) {
        if (document.getElementById("idExpandDropImage" + groupid)) document.getElementById("idExpandDropImage" + groupid).className = "gogisLegendGroupImageExpand";
        if (cGroup && cGroupContainer) {
            if (group.isAppended) {
                cGroupContainer.innerHTML = "";
                group.isAppended = false;
            }
            cGroup.className = "gogisLegendLayersHidden";
        }
        for (var i = 0; i < group.numlayers; i++) {
            cLayerInp = document.getElementById("Layer|||" + groupname + "|||" + i);
            if (cLayerInp) {
                if (cLayerInp.type == "hidden") cLayerInp.value = 0;
                else cLayerInp.checked = false;
            }
            if (!arguments[3]) {
                gogisSetLayerVisibility(group.layer[i].name, false);
            }
            if (group.layer[i].subgroup) {
                cSubgroupInp = document.getElementById("idSubgroupCheckbox_" + group.layer[i].subgroup);
                if (cSubgroupInp) cSubgroupInp.checked = false;
            }
        }
    } else {
        if (group.maingrouptype == 2) {
            var tmp_group, tmp_groupInp;
            for (var i = 0; i < legendDoc.root[0].group.length; i++) {
                tmp_group = legendDoc.root[0].group[i];
                if (i != groupid && tmp_group.maingrouptype == 2) {
                    tmp_groupInp = document.getElementById("idCheckbox_" + tmp_group.name + "||" + i);
                    if (tmp_groupInp) {
                        tmp_groupInp.checked = false;
                        groupCheckBoxClicked(tmp_group.name, i, false, arguments[3]);
                    }
                }
            }
        }
        if (document.getElementById("idExpandDropImage" + groupid)) document.getElementById("idExpandDropImage" + groupid).className = "gogisLegendGroupImageCollapse";
        isFirst = true;
        if (cGroup && cGroupContainer) {
            if (!group.isAppended) {
                cGroupContainer.innerHTML = group.html;
                group.isAppended = true;
            }
            if (document.getElementById("idExpandDropImage" + groupid)) cGroup.className = "gogisLegendLayersVisible";
            else cGroup.className = "gogisLegendLayersHidden";
        }
        if (!arguments[3]) {
            gogisLegendSetup(myKaMap.getCurrentMap().getAllLayers(), true);
        }
        hasActiveRadioSubgroup = false;
        for (var i = 0; i < group.numlayers; i++) {
            if (group.layer[i - 1] && group.layer[i - 1].subgrouptype == 2 && group.layer[i - 1] && group.layer[i - 1].subgroup != group.layer[i].subgroup) hasActiveRadioSubgroup = true;
            cLayerInp = document.getElementById("Layer|||" + groupname + "|||" + i);
            if (cLayerInp && (group.layer[i].subgrouptype != 2 || !hasActiveRadioSubgroup)) {
                if (group.grouptype == 3) cLayerInp.value = 1;
                else if (group.grouptype == 2) {
                    if (isFirst) {
                        isFirst = false;
                        cLayerInp.checked = true;
                    }
                } else cLayerInp.checked = true;
                if (!arguments[3]) {
                    gogisSetLayerVisibility(group.layer[i].name, (!cLayerInp.disabled && (cLayerInp.checked || (cLayerInp.value == 1 && group.grouptype == 3))));
                }
            }
            if (group.layer[i].subgroup) {
                cSubgroupInp = document.getElementById("idSubgroupCheckbox_" + group.layer[i].subgroup);
                if (cSubgroupInp) {
                    if (hasActiveRadioSubgroup == false || group.layer[i].subgrouptype != 2) {
                        cSubgroupInp.checked = true;
                        gogisLegendSubgroupExpand(group.layer[i].subgroup, true);
                    } else if (group.layer[i].subgrouptype == 2) {
                        cSubgroupInp.checked = false;
                    }
                }
            }
        }
    }
    if (!arguments[3]) {
        updateLinkToView();
    }
}

function layerCheckBoxClicked(groupname, layerID, groupID, bForce) {
    var group = legendDoc.root[0].group[groupID];
    var cLayerClicked = document.getElementById("Layer|||" + groupname + "|||" + layerID);
    var isChecked = false;
    var subgroupVisible = false;
    var lastSubgroupName = currentSubgroupName = "noSubGroup";
    var cLayerInp, cSubgroupInp;
    if (bForce) cLayerClicked.checked = true;
    for (var i = 0; i < group.numlayers; i++) {
        cLayerInp = document.getElementById("Layer|||" + groupname + "|||" + i);
        if (cLayerInp) {
            lastSubgroupName = currentSubgroupName;
            if (group.layer[i].subgroup) currentSubgroupName = group.layer[i].subgroup;
            else currentSubgroupName = "noSubGroup";
            if (lastSubgroupName != currentSubgroupName) {
                cSubgroupInp = document.getElementById("idSubgroupCheckbox_" + lastSubgroupName);
                if (lastSubgroupName != "noSubGroup" && cSubgroupInp) {
                    cSubgroupInp.checked = subgroupVisible;
                    if (subgroupVisible) gogisLegendSubgroupExpand(lastSubgroupName, true);
                }
                if (currentSubgroupName != "noSubGroup") {
                    subgroupVisible = false;
                }
            }
            if (cLayerInp.checked == true) {
                isChecked = true;
                subgroupVisible = true;
            }
            if (cLayerInp.type == "radio") {
                cLayerInp.checked = false;
                if (!arguments[4]) {
                    gogisSetLayerVisibility(group.layer[i].name, false);
                }
            }
        }
    }
    if (currentSubgroupName != "noSubGroup") {
        cSubgroupInp = document.getElementById("idSubgroupCheckbox_" + currentSubgroupName);
        if (cSubgroupInp) {
            cSubgroupInp.checked = subgroupVisible;
            if (subgroupVisible) gogisLegendSubgroupExpand(currentSubgroupName, true);
        }
    }
    if (cLayerClicked.type == "radio") cLayerClicked.checked = true;
    document.getElementById("idCheckbox_" + groupname + "||" + groupID).checked = isChecked;
    if (group.layer[layerID] && group.layer[layerID].subgroup && group.layer[layerID].subgrouptype && group.layer[layerID].subgrouptype == 2) {
        subgroupCheckBoxClicked(group.layer[layerID].subgroup, groupID, bForce, arguments[4], true);
    }
    if (group.maingrouptype == 2) {
        var tmp_group, tmp_groupInp;
        for (var i = 0; i < legendDoc.root[0].group.length; i++) {
            tmp_group = legendDoc.root[0].group[i];
            if (i != groupID && tmp_group.maingrouptype == 2) {
                tmp_groupInp = document.getElementById("idCheckbox_" + tmp_group.name + "||" + i);
                if (tmp_groupInp) {
                    tmp_groupInp.checked = false;
                    groupCheckBoxClicked(tmp_group.name, i, false, arguments[3]);
                }
            }
        }
    }
    if (!arguments[4]) {
        gogisSetLayerVisibility(group.layer[layerID].name, ((!cLayerClicked.disabled) && cLayerClicked.checked));
        updateLinkToView();
    }
}

function gogisLegendLayerExpand(groupname, i_group, bForce) {
    var group = legendDoc.root[0].group[i_group];
    var cGroup = document.getElementById("idGroupDiv|||" + groupname);
    var cGroupContainer = document.getElementById("idGroupTd|||" + groupname);
    if (cGroup && cGroupContainer) {
        if ((cGroup.className == "gogisLegendLayersHidden") || bForce) {
            if (document.getElementById("idExpandDropImage" + i_group)) document.getElementById("idExpandDropImage" + i_group).className = "gogisLegendGroupImageCollapse";
            if (!group.isAppended && cGroupContainer) {
                cGroupContainer.innerHTML = group.html;
                if (!document.getElementById("idCheckbox_" + groupname + "||" + i_group).checked) {
                    var cLayerInp;
                    for (var i = 0; i < group.numlayers; i++) {
                        cLayerInp = document.getElementById("Layer|||" + groupname + "|||" + i);
                        if (cLayerInp) {
                            if (cLayerInp.type == "hidden") cLayerInp.value = 0;
                            else cLayerInp.checked = false;
                        }
                    }
                }
                group.isAppended = true;
                if (!arguments[3]) {
                    gogisLegendSetup(myKaMap.getCurrentMap().getAllLayers(), true);
                }
            }
            if (document.getElementById("idExpandDropImage" + i_group)) cGroup.className = "gogisLegendLayersVisible";
            else cGroup.className = "gogisLegendLayersHidden";
        } else {
            document.getElementById("idExpandDropImage" + i_group).className = "gogisLegendGroupImageExpand";
            if (!document.getElementById("idCheckbox_" + groupname + "||" + i_group).checked && group.isAppended && cGroupContainer) {
                cGroupContainer.innerHTML = "";
                group.isAppended = false;
            }
            cGroup.className = "gogisLegendLayersHidden";
        }
    }
}

function gogisCheckGroupVisibility(i_group, cScale, cMap) {
    var group = legendDoc.root[0].group[i_group];
    var subgroup = (arguments.length > 3 ? arguments[3] : null);
    var layer;
    if (group) {
        for (var i_layer = 0; i_layer < group.layer.length; i_layer++) {
            if (subgroup == null || (group.layer[i_layer].subgroup && group.layer[i_layer].subgroup == subgroup)) {
                layer = cMap.getLayer(group.layer[i_layer].name.split("++")[0]);
                if (layer && layer.scales[cScale] == 1) return true;
            }
        }
    }
    return false;
}

function gogisCheckGroupOverlayVisibility(i_group, cScaleVal, cMap) {
    var group = legendDoc.root[0].group[i_group];
    var subgroup = (arguments.length > 3 ? arguments[3] : null);
    var layer;
    if (group) {
        for (var i_layer = 0; i_layer < group.layer.length; i_layer++) {
            if (subgroup == null || (group.layer[i_layer].subgroup && group.layer[i_layer].subgroup == subgroup)) {
                layer = cMap.getLayer(group.layer[i_layer].name);
                if (layer && layer.overlayMaxscale != -1 && layer.overlayMaxscale < parseInt(cScaleVal)) return true;
            }
        }
    }
    return false;
}

function gogisLegendSetup(layers) {
    var elem, elemGroup, elemZoomTo;
    var layer, subgroup;
    var groupIsActive = hasLayers = false;
    var cMap = myKaMap.getCurrentMap();
    var cScale = cMap.currentScale;
    var cScaleVal = myKaMap.getCurrentScale();
    if (document.forms && document.forms["layers"]) {
        for (var i = 0; i < document.forms["layers"].elements.length + 1; i++) {
            elem = document.forms["layers"].elements[i];
            if (elem && !((elem.getAttribute("filter") && elem.getAttribute("filter") > "") || (elem.getAttribute("subgroup") && elem.getAttribute("subgroup") > ""))) {
                layer = (elem ? cMap.getLayer((elem.type != "hidden" ? elem.name : elem.name.split("++")[0]).replace("layer_", "")) : null);
                if (!layer) {
                    if (elemGroup) {
                        elemZoomTo = document.getElementById(elemGroup.name.replace("group", "zoomTo"));
                        elemZoomTo.i_group = elemGroup.id.split("||")[1];
                        if (hasLayers) elemGroup.disabled = !groupIsActive;
                        else {
                            elemGroup.disabled = !gogisCheckGroupVisibility(elemZoomTo.i_group, cScale, cMap);
                        }
                        if (!elemGroup.disabled && gogisCheckGroupOverlayVisibility(elemZoomTo.i_group, cScaleVal, cMap)) {
                            elemZoomTo.style.display = "block";
                            elemZoomTo.className = "gogisZoomToGroupOverlay";
                            elemZoomTo.onclick = function(e) {
                                gogisZoomToGroupOverlay(e, this);
                            };
                            elemZoomTo.title = gLocalizer.localize('TOOLTIP_ZOOM_TO_LAYER_OVERLAY');
                        } else {
                            elemZoomTo.style.display = (elemGroup.disabled ? "block" : "none");
                            elemZoomTo.className = "gogisZoomToGroup";
                            elemZoomTo.onclick = function(e) {
                                gogisZoomToGroup(e, this);
                            };
                            elemZoomTo.title = gLocalizer.localize('TOOLTIP_ZOOM_TO_LAYER');
                        }
                        groupIsActive = false;
                        hasLayers = false;
                    }
                    elemGroup = elem;
                } else if (layer && layer.scales[cScale] == 1) {
                    elem.disabled = false;
                    if (elem.type != "hidden") {
                        elemZoomTo = document.getElementById(elem.name.replace("layer", "zoomTo"));
                        if (layer.overlayMaxscale != -1 && layer.overlayMaxscale < parseInt(cScaleVal)) {
                            elemZoomTo.style.display = "block";
                            elemZoomTo.className = "gogisZoomToLayerOverlay";
                            elemZoomTo.onclick = function(e) {
                                gogisZoomToLayerOverlay(e, this);
                            };
                            elemZoomTo.title = gLocalizer.localize('TOOLTIP_ZOOM_TO_LAYER_OVERLAY');
                        } else {
                            elemZoomTo.style.display = "none";
                        }
                    }
                    groupIsActive = true;
                    hasLayers = true;
                } else {
                    elem.disabled = true;
                    if (elem.type != "hidden") {
                        elemZoomTo = document.getElementById(elem.name.replace("layer", "zoomTo"));
                        elemZoomTo.style.display = "block";
                        elemZoomTo.className = "gogisZoomToLayer";
                        elemZoomTo.onclick = function(e) {
                            gogisZoomToLayer(e, this);
                        };
                        elemZoomTo.title = gLocalizer.localize('TOOLTIP_ZOOM_TO_LAYER');
                    }
                    hasLayers = true;
                }
            } else if (elem && elem.getAttribute("subgroup") && elem.getAttribute("subgroup") > "") {
                subgroup = elem.id.replace("idSubgroupCheckbox_", "");
                elem.disabled = !gogisCheckGroupVisibility(elem.getAttribute("group"), cScale, cMap, subgroup);
                elemZoomTo = document.getElementById("zoomTo_" + subgroup);
                if (elemZoomTo) {
                    elemZoomTo.i_group = elem.getAttribute("group");
                    if (!elem.disabled && gogisCheckGroupOverlayVisibility(elem.getAttribute("group"), cScaleVal, cMap, subgroup)) {
                        elemZoomTo.style.display = "block";
                        elemZoomTo.className = "gogisZoomToGroupOverlay";
                        elemZoomTo.onclick = function(e) {
                            gogisZoomToGroupOverlay(e, this);
                        };
                        elemZoomTo.title = gLocalizer.localize('TOOLTIP_ZOOM_TO_LAYER_OVERLAY');
                    } else {
                        elemZoomTo.style.display = (elem.disabled ? "block" : "none");
                        elemZoomTo.className = "gogisZoomToGroup";
                        elemZoomTo.onclick = function(e) {
                            gogisZoomToGroup(e, this);
                        };
                        elemZoomTo.title = gLocalizer.localize('TOOLTIP_ZOOM_TO_LAYER');
                    }
                }
            }
        }
    }
    if (!arguments[1]) gogisRefreshLayers(layers);
}

function gogisRefreshLayers(layers) {
    var elem, found, type;
    var basemaps = document.getElementById('basemaps');
    var layerGroups = new Array();
    var formLayers = document.getElementById("gogisLegendForm");
    if (szMap != gogisPreviouseMap) {
        var previouseLayers = myKaMap.aMaps[gogisPreviouseMap].getAllLayers();
        for (var j = 0; j < previouseLayers.length; j++) {
            if (basemaps.options[basemaps.selectedIndex].value == "" || basemaps.options[basemaps.selectedIndex].value != previouseLayers[j].name) {
                gogisSetLayerVisibility(previouseLayers[j].name, false, previouseLayers);
                previouseLayers[j].visible = false;
            }
        }
        if (basemaps.options[basemaps.selectedIndex].value > "") gogisSetLayerVisibility(basemaps.options[basemaps.selectedIndex].value, true);
    }
    for (var j = 0; j < layers.length; j++) {
        type = layers[j].type.toLowerCase();
        xmlOn = layers[j].graphics || layers[j].highlight || (((layers[j].objectId != "") ? true : false) && (layers[j].tooltip || ((layers[j].hotspot != "") ? true : false)));
        found = false;
        if (type == "standard" || type == "point" || type == "point_with_label" || type == "image" || type == "icon" || type == "icon_with_label" || type == "label" || type == "line_with_label" || type == "polygon_with_label" || (type == "line" && xmlOn) || (type == "polygon" && xmlOn)) {
            if (formLayers) {
                for (var i = 0; i < formLayers.elements.length; i++) {
                    elem = formLayers.elements[i];
                    if (elem.name == "layer_" + layers[j].name) {
                        if ((elem.type == "checkbox" || elem.type == "radio") && elem.checked && !elem.disabled) {
                            found = true;
                            gogisSetLayerVisibility(layers[j].name, true);
                            layerGroups[layers[j].name.split("++")[0]] = layers[j].name.split("++")[0];
                        } else if (elem.type == "hidden" && elem.value == "1" && !elem.disabled) {
                            found = true;
                            gogisSetLayerVisibility(layers[j].name, true);
                            layerGroups[layers[j].name.split("++")[0]] = layers[j].name.split("++")[0];
                        }
                        break;
                    }
                }
            }
        }
        if (!found && basemaps.options[basemaps.selectedIndex].value != layers[j].name && !(layerGroups[layers[j].name.split("++")[0]] > "")) gogisSetLayerVisibility(layers[j].name, false);
    }
    if (szMap != gogisPreviouseMap) gogisPreviouseMap = szMap;
}

function gogisRefreshBasemaps() {
    var elem, layer, url;
    var basemaps = document.getElementById('basemaps');
    var cMap = myKaMap.getCurrentMap();
    for (var i = 0; i < basemaps.options.length; i++) {
        elem = basemaps.options[i];
        layer = cMap.getLayer(elem.value);
        if (layer) {
            gogisSetLayerVisibility(layer.name, elem.selected);
            if (elem.selected) {
                activateBasemapDefaultLayers(legendBasemaps[elem.bmIndex]);
                url = legendBasemaps[elem.bmIndex].url;
                if (url > "") {
                    document.getElementById('metalink').href = 'javascript:gogisXPopUpWithMenu(\'' + url + '\',\'PopupWin\',' + gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance] + ',' + gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance] + ');';
                    document.getElementById('gogisLegendMetaUrlDiv').style.display = '';
                } else document.getElementById('gogisLegendMetaUrlDiv').style.display = 'none';
            }
        }
    }
    if (gogisApplication.BASEMAP_LEGEND && gogisApplication.BASEMAP_LEGEND[gogisCurrentInstance] == true) {
        var tmp_elem = document.getElementById('basemaps');
        var newBaseMapLegend = tmp_elem.options[tmp_elem.selectedIndex].value;
        if (newBaseMapLegend != currentBasemapLegend) {
            currentBasemapLegend = newBaseMapLegend;
            gogisSetBaseMapLegend(currentBasemapLegend, "legend", "legendBaseMapLayers");
        }
    }
}

function gogisSetupBasemaps() {
    var basemaps = document.getElementById('basemaps');
    var cMap = myKaMap.getCurrentMap();
    var cScale = cMap.currentScale;
    var userOption = -1;
    var tmp_option = defaultOption = 0;
    var tmp_opt, tmp_optgroup, tmp_optgroupname;
    var layer;
    while (basemaps.options[tmp_option]) {
        basemaps.options[tmp_option] = null;
        tmp_option++;
    }
    while (basemaps.firstChild) {
        basemaps.removeChild(basemaps.firstChild);
    }
    tmp_option = 0;
    for (var i = 0; i < legendBasemaps.length; i++) {
        layer = cMap.getLayer(legendBasemaps[i].name);
        if (layer.scales[cScale] == 1) {
            if (legendSelectedBasemap == legendBasemaps[i].name) userOption = tmp_option;
            else if (legendBasemaps[i].group && legendSelectedBasemapGroup == legendBasemaps[i].group && userOption == -1) {
                userOption = tmp_option;
                legendSelectedBasemap = legendBasemaps[i];
            } else if (legendBasemaps[i].isDefault) {
                defaultOption = tmp_option;
            } else if (legendBasemaps[i].group) {
                for (var j = 0; j < legendBasemaps.length; j++) {
                    if (legendBasemaps[j].group && legendBasemaps[j].group == legendBasemaps[i].group && legendBasemaps[j].isDefault) {
                        defaultOption = tmp_option;
                        break;
                    }
                }
            }
            if (legendBasemapsSubgroups) {
                if (tmp_optgroupname != legendBasemaps[i].subgroup) {
                    if (tmp_optgroup) basemaps.appendChild(tmp_optgroup);
                    tmp_optgroup = document.createElement('optgroup');
                    tmp_optgroup.label = (legendBasemaps[i].subgroup ? gLocalizer.localize(legendBasemaps[i].subgroup) : 'Standard');
                }
                tmp_opt = document.createElement('option');
                tmp_opt.bmGroup = legendBasemaps[i].group;
                tmp_opt.bmIndex = i;
                tmp_opt.value = legendBasemaps[i].name;
                tmp_opt.appendChild(document.createTextNode(gLocalizer.localize(legendBasemaps[i].name)));
                tmp_optgroup.appendChild(tmp_opt);
            } else {
                basemaps.options[tmp_option] = new Option(gLocalizer.localize(legendBasemaps[i].name, true), legendBasemaps[i].name, false, false);
                basemaps.options[tmp_option].bmGroup = legendBasemaps[i].group;
                basemaps.options[tmp_option].bmIndex = i;
            }
            tmp_option++;
            if (legendBasemapsSubgroups) tmp_optgroupname = legendBasemaps[i].subgroup;
        }
    }
    if (legendBasemapsSubgroups && tmp_optgroup) basemaps.appendChild(tmp_optgroup);
    if (document.getElementById("gogisChooseLayersTitle").style.visibility != 'hidden' && gogisApplication.BASEMAP_OPT_NONE[gogisCurrentInstance] == true) {
        if (legendBasemapsSubgroups) {
            tmp_optgroup = document.createElement('optgroup');
            tmp_optgroup.label = "__________________";
            tmp_opt = document.createElement('option');
            tmp_opt.value = "none";
            tmp_opt.appendChild(document.createTextNode(gLocalizer.localize("TITLE_NO_BASEMAP")));
            tmp_optgroup.appendChild(tmp_opt);
            basemaps.appendChild(tmp_optgroup);
        } else {
            basemaps.options[tmp_option] = new Option(gLocalizer.localize("TITLE_NO_BASEMAP"), "none", false, false);
        }
        tmp_option++;
        if (legendSelectedBasemap == "none") userOption = tmp_option - 1;
    }
    if (userOption > -1) basemaps.options[userOption].selected = true;
    else if (tmp_option > 0) basemaps.options[defaultOption].selected = true;
    previousSelectedBasemap = "";
    legendSelectedBasemap = gogisGetBasemapName(false);
    gogisRefreshBasemaps();
}

function activateBasemapDefaultLayers(bMap) {
    if (bMap.group && bMap.group > "") {
        var i, group, isFirstInGroup;
        for (var j = 0; j < legendDoc.root[0].group.length; j++) {
            group = legendDoc.root[0].group[j];
            if (group.name != "BASEMAP" && group.name != "SEARCHONLY") {
                isFirstInGroup = true;
                for (i = 0; i < group.numlayers; i++) {
                    if (group.layer[i].basemapgroup && group.layer[i].basemapgroup == bMap.group) {
                        if (isFirstInGroup) {
                            isFirstInGroup = false;
                            gogisLegendLayerExpand(group.name, j, true, true);
                        }
                        layerCheckBoxClicked(group.name, i, j, true, true);
                    }
                }
            }
        }
    }
}

function getCurrentBasemapByScale(cScale) {
    var cMap = myKaMap.getCurrentMap();
    var i, layer;
    if (gogisApplication.PREFERED_BASEMAPLAYERS && gogisApplication.PREFERED_BASEMAPLAYERS[gogisCurrentInstance] > "") {
        var prefBmLayers = gogisApplication.PREFERED_BASEMAPLAYERS[gogisCurrentInstance].split(",");
        for (i = 0; i < prefBmLayers.length; i++) {
            layer = cMap.getLayer(prefBmLayers[i].trim());
            if (layer && layer.visible) return layer.name;
        }
    }
    if (cScale == "DYNAMIC" || cScale == "") return legendSelectedBasemap;
    var scales = cMap.getScales();
    var scaleIndex;
    for (i = 0; i < scales.length; i++) {
        if (scales[i] == cScale) {
            cScale = i;
            break;
        }
    }
    for (i = 0; i < legendBasemaps.length; i++) {
        layer = cMap.getLayer(legendBasemaps[i].name);
        if (layer.scales[cScale] == 1) {
            if (legendSelectedBasemap == legendBasemaps[i].name) return legendBasemaps[i].name;
            else if (legendBasemaps[i].group && legendSelectedBasemapGroup == legendBasemaps[i].group) return legendBasemaps[i].name;
        }
    }
    return legendSelectedBasemap;
}

function gogisGetBasemapName(usePreferedLayer) {
    if (usePreferedLayer && gogisApplication.PREFERED_BASEMAPLAYERS && gogisApplication.PREFERED_BASEMAPLAYERS[gogisCurrentInstance] > "") {
        var prefBmLayers = gogisApplication.PREFERED_BASEMAPLAYERS[gogisCurrentInstance].split(",");
        var cMap = myKaMap.getCurrentMap();
        var layer;
        for (var i = 0; i < prefBmLayers.length; i++) {
            layer = cMap.getLayer(prefBmLayers[i].trim());
            if (layer && layer.visible) return layer.name;
        }
    }
    var basemaps = document.getElementById('basemaps');
    if (basemaps.selectedIndex >= 0) return basemaps.options[basemaps.selectedIndex].value;
    else if (usePreferedLayer && previousSelectedBasemap > "") return previousSelectedBasemap;
    else if (legendSelectedBasemap > "") return legendSelectedBasemap;
    else return 'none';
}

function gogisGetVisibleLayers() {
    var basemaps = document.getElementById('basemaps');
    var layersString = "";
    var customLayers, defaultLayersString, cMap, cLayer, elem, layerName;
    var noDefaultLayers = (arguments.length > 0 && arguments[0] == true);
    var withProperties = (arguments.length > 1 && arguments[1] == true);
    if (withProperties) cMap = myKaMap.getCurrentMap();
    if (basemaps.options && basemaps.selectedIndex >= 0 && basemaps.options[basemaps.selectedIndex] && basemaps.options[basemaps.selectedIndex].value != "none") {
        var isDefaultBasemap = false;
        for (var i = 0; i < legendBasemaps.length; i++) {
            if (basemaps.options[basemaps.selectedIndex].value == legendBasemaps[i].name && legendBasemaps[i].isDefault) {
                isDefaultBasemap = true;
                break;
            }
        }
        if (legendSelectedBasemapGroup && legendDefaultBasemapGroup && (legendSelectedBasemapGroup == legendDefaultBasemapGroup)) isDefaultBasemap = true;
        if (!(noDefaultLayers && isDefaultBasemap)) layersString += basemaps.options[basemaps.selectedIndex].value;
    }
    if (document.forms && document.forms["layers"]) {
        for (var i = 0; i < document.forms["layers"].elements.length; i++) {
            elem = document.forms["layers"].elements[i];
            layerName = elem.name.replace("layer_", "");
            if (!(layerName.indexOf("group_") >= 0)) {
                if (!elem.disabled && (((elem.type == "checkbox" || elem.type == "radio") && elem.checked) || (elem.type == "hidden" && elem.value == "1"))) {
                    if (elem.type == "hidden") layerName = layerName.split("++")[0];
                    if (noDefaultLayers && elem.getAttribute("isDefaultLayer") == '1') {
                        if (defaultLayersString.indexOf(layerName) >= 0) continue;
                        if (defaultLayersString > "") defaultLayersString += "||";
                        defaultLayersString += layerName;
                        if (withProperties && elem.getAttribute("hasLayerProperties") == '1') {
                            cLayer = cMap.getLayer(layerName);
                            if (cLayer.opacity != cLayer.defaultOpacity) {
                                customLayers = true;
                                defaultLayersString += "," + (100 - cLayer.opacity);
                            }
                        }
                    } else {
                        if (layersString.indexOf(layerName) >= 0) continue;
                        customLayers = true;
                        if (layersString > "") layersString += "||";
                        layersString += layerName;
                        if (withProperties && elem.getAttribute("hasLayerProperties") == '1') {
                            cLayer = cMap.getLayer(layerName);
                            if (cLayer.opacity != cLayer.defaultOpacity) layersString += "," + (noDefaultLayers ? (100 - cLayer.opacity) : cLayer.opacity);
                        }
                    }
                }
            } else {
                if (customLayers && defaultLayersString) {
                    if (layersString > "") layersString += "||";
                    layersString += defaultLayersString;
                }
                defaultLayersString = "";
                customLayers = false;
            }
        }
    }
    if (customLayers && defaultLayersString) {
        if (layersString > "") layersString += "||";
        layersString += defaultLayersString;
    }
    return layersString;
}

function gogisSetLayerVisibility(_name, visible) {
    var name = _name.split("++")[0];
    var layer, layerGroup;
    var cScaleVal = myKaMap.getCurrentScale();
    if (!arguments[2]) {
        layer = myKaMap.getCurrentMap().getLayer(_name);
        layerGroup = myKaMap.getCurrentMap().getLayer(name);
    } else {
        for (var i = 0; i < arguments[2].length; i++) {
            if (arguments[2][i].name == _name) {
                layer = arguments[2][i];
            }
            if (arguments[2][i].name == name) {
                layerGroup = arguments[2][i];
            }
            if (layer && layerGroup) break;
        }
    }
    if (!(layer && layerGroup)) return;
    var isMergedLayer = (layer.name != layerGroup.name && gogisLegendGetGroupTypeByLayername(layer.name) == 3);
    var type = layer.type.toLowerCase();
    var xmlOn = layer.graphics || layer.highlight || (((layer.objectId != "") ? true : false) && (layer.tooltip || ((layer.hotspot != "") ? true : false)));
    var tmp_updateLeg = false;
    if (type == "standard") {
        if (isMergedLayer) {
            if (layerGroup.visible != visible) {
                myKaMap.setLayerVisibility(name, visible);
                updateLeg = true;
            }
        } else {
            if (layer.visible != visible) {
                myKaMap.setLayerVisibility(_name, visible);
                updateLeg = true;
            }
        }
    } else if (type == "searchonly" && layerGroup.visible) {
        myKaMap.setLayerVisibility(name, false);
        return;
    } else if (type == "point" || type == "point_with_label" || type == "image" || type == "icon" || type == "icon_with_label" || type == "label") {
        if (isMergedLayer && layerGroup.overlayMaxscale != -1 && layerGroup.overlayMaxscale < cScaleVal) {
            tmp_updateLeg = !myGogisOverlay.setLayerVisibility((layerGroup.mergeoverlay ? name : _name), false, layerGroup.mergeoverlay);
            if (layerGroup.visible != visible) {
                myKaMap.setLayerVisibility(name, visible);
            } else tmp_updateLeg = false;
        } else if (layer.overlayMaxscale != -1 && layer.overlayMaxscale < cScaleVal) {
            tmp_updateLeg = !myGogisOverlay.setLayerVisibility(_name, false, false);
            if (layer.visible != visible) {
                myKaMap.setLayerVisibility(_name, visible);
            } else tmp_updateLeg = false;
        } else {
            if (layer.overlayMaxscale != -1) myKaMap.setLayerVisibility((isMergedLayer ? name : _name), false);
            tmp_updateLeg = myGogisOverlay.setLayerVisibility((isMergedLayer && layer.mergeoverlay ? name : _name), visible, isMergedLayer && layer.mergeoverlay);
        }
        updateLeg = (updateLeg || tmp_updateLeg);
    } else if (type == "line" || type == "polygon") {
        if (!layer.overlayonly) {
            if (isMergedLayer) {
                if (layerGroup.visible != visible) {
                    myKaMap.setLayerVisibility(name, visible);
                    updateLeg = true;
                }
            } else {
                if (layer.visible != visible) {
                    myKaMap.setLayerVisibility(_name, visible);
                    updateLeg = true;
                }
            }
        } else {
            if (isMergedLayer) {
                if (layerGroup.visible) {
                    myKaMap.setLayerVisibility(name, false);
                    updateLeg = true;
                }
            } else {
                if (layer.visible) {
                    myKaMap.setLayerVisibility(_name, false);
                    updateLeg = true;
                }
            }
        }
        if (xmlOn && layer.overlayMaxscale != -1 && layer.overlayMaxscale < cScaleVal) {
            tmp_updateLeg = !myGogisOverlay.setLayerVisibility((isMergedLayer && layer.mergeoverlay ? name : _name), false, isMergedLayer && layer.mergeoverlay);
            updateLeg = (updateLeg || tmp_updateLeg);
        } else if (xmlOn) {
            tmp_updateLeg = myGogisOverlay.setLayerVisibility((isMergedLayer && layer.mergeoverlay ? name : _name), visible, isMergedLayer && layer.mergeoverlay);
            updateLeg = (updateLeg || tmp_updateLeg);
        }
    } else if (type == "line_with_label" || type == "polygon_with_label") {
        if (!layer.overlayonly) {
            if (isMergedLayer) {
                if (layerGroup.visible != visible) {
                    myKaMap.setLayerVisibility(name, visible);
                    updateLeg = true;
                }
            } else {
                if (layer.visible != visible) {
                    myKaMap.setLayerVisibility(_name, visible);
                    updateLeg = true;
                }
            }
        } else {
            if (isMergedLayer) {
                if (layerGroup.visible) {
                    myKaMap.setLayerVisibility(name, false);
                    updateLeg = true;
                }
            } else {
                if (layer.visible) {
                    myKaMap.setLayerVisibility(_name, false);
                    updateLeg = true;
                }
            }
        }
        if (layer.overlayMaxscale != -1 && layer.overlayMaxscale < cScaleVal) {
            tmp_updateLeg = !myGogisOverlay.setLayerVisibility((isMergedLayer && layer.mergeoverlay ? name : _name), false, isMergedLayer && layer.mergeoverlay);
            updateLeg = (updateLeg || tmp_updateLeg);
        } else {
            tmp_updateLeg = myGogisOverlay.setLayerVisibility((isMergedLayer && layer.mergeoverlay ? name : _name), visible, isMergedLayer && layer.mergeoverlay);
            updateLeg = (updateLeg || tmp_updateLeg);
        }
    }
}

function gogisLegendGetGroupByLayername(layerName) {
    var group;
    for (var i_group = 0; i_group < legendDoc.root[0].group.length; i_group++) {
        group = legendDoc.root[0].group[i_group];
        if (group.name != "BASEMAP" && group.name != "SEARCHONLY") {
            for (var i_layer = 0; i_layer < group.layer.length; i_layer++) {
                if (layerName == group.layer[i_layer].name) {
                    return document.forms["layers"].elements["group_" + group.name];
                }
            }
        }
    }
    return false;
}

function gogisLegendGetGroupIdByLayername(layerName) {
    var group;
    for (var i_group = 0; i_group < legendDoc.root[0].group.length; i_group++) {
        group = legendDoc.root[0].group[i_group];
        if (group.name != "BASEMAP" && group.name != "SEARCHONLY") {
            for (var i_layer = 0; i_layer < group.layer.length; i_layer++) {
                if (layerName == group.layer[i_layer].name) {
                    return i_group;
                }
            }
        }
    }
    return false;
}

function gogisLegendGetGroupTypeByLayername(layerName) {
    var group;
    for (var i_group = 0; i_group < legendDoc.root[0].group.length; i_group++) {
        group = legendDoc.root[0].group[i_group];
        if (group.name != "BASEMAP" && group.name != "SEARCHONLY") {
            for (var i_layer = 0; i_layer < group.layer.length; i_layer++) {
                if (layerName == group.layer[i_layer].name) {
                    return group.grouptype;
                }
            }
        }
    }
    return false;
}

function gogisLegendActivateLayer(layerName) {
    if (document.forms && document.forms["layers"] && layerName > "") {
        var lNames = layerName.split(",");
        var cMap = myKaMap.getCurrentMap();
        for (var iLayer = 0; iLayer < lNames.length; iLayer++) {
            layerName = lNames[iLayer];
            if (cMap.getLayer(layerName) && cMap.getLayer(layerName).type.toLowerCase() != "searchonly") {
                var group = gogisLegendGetGroupByLayername(layerName);
                if (group) {
                    gogisLegendLayerExpand(group.name.replace('group_', ''), group.value, true, true);
                    var layer = document.forms["layers"].elements["layer_" + layerName];
                    if (layer.type == "checkbox" || layer.type == "radio") {
                        if (!layer.checked) {
                            var layerID = layer.id.split("|||");
                            layerCheckBoxClicked(layerID[1], layerID[2], group.value, true, !(arguments[1] && (iLayer == (lNames.length - 1))));
                        } else gogisSetLayerVisibility(layerName, true);
                    } else if (layer.type == "hidden") {
                        layer.value = 1;
                        if (!group.checked) {
                            groupCheckBoxClicked(layer.id.split("|||")[1], group.value, true, !(arguments[1] && (iLayer == (lNames.length - 1))));
                        } else gogisSetLayerVisibility(layerName, true);
                    }
                }
            }
        }
    }
}

function gogisLegendResetLayers() {
    var i, j, group, cLayerInp;
    if (!legendDoc) return;
    for (j = 0; j < legendDoc.root[0].group.length; j++) {
        group = legendDoc.root[0].group[j];
        if (group.name != "BASEMAP" && group.name != "SEARCHONLY" && !arguments[0]) {
            if (document.getElementById("idExpandDropImage" + j)) document.getElementById("idExpandDropImage" + j).className = "gogisLegendGroupImageExpand";
            document.getElementById("idCheckbox_" + group.name + "||" + j).checked = false;
            document.getElementById("idGroupDiv|||" + group.name).className = "gogisLegendLayersHidden";
        }
        for (i = 0; i < group.numlayers; i++) {
            cLayerInp = document.getElementById("Layer|||" + group.name + "|||" + i);
            if (cLayerInp) {
                if (cLayerInp.type == "hidden") cLayerInp.value = 0;
                else cLayerInp.checked = false;
                gogisSetLayerVisibility(group.layer[i].name, false);
            }
        }
    }
}

function getLayerPrintGroup(gname) {
    return myKaMap.getCurrentMap().getLayer(gname).printgroup;
}

function gogisZoomToGroup(e, obj) {
    var group = legendDoc.root[0].group[obj.i_group];
    var subgroup = ((obj && obj.getAttribute("subgroup") && obj.getAttribute("subgroup") > "") ? obj.id.replace("zoomTo_", "") : null);
    var cMap = myKaMap.getCurrentMap();
    var layer;
    if (group) {
        for (var j = 0; j < group.layer.length; j++) {
            if (subgroup == null || (group.layer[j].subgroup && group.layer[j].subgroup == subgroup)) {
                layer = cMap.getLayer(group.layer[j].name.split("++")[0]);
                for (var i = 0; i < layer.scales.length; i++) {
                    if (layer.scales[i] == 1) {
                        gogisTabControlChange(1);
                        myKaMap.zoomToScale(cMap.getScales()[i]);
                        if (subgroup == null) {
                            setTimeout('groupCheckBoxClicked("' + group.name + '",' + obj.i_group + ',true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                        } else {
                            setTimeout('subgroupCheckBoxClicked("' + subgroup + '",' + obj.i_group + ',true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                        }
                        e = (e) ? e : ((event) ? event : null);
                        if (e) {
                            e.cancelBubble = true;
                            e.returnValue = false;
                            if (e.stopPropagation) e.stopPropagation();
                            if (e.preventDefault) e.preventDefault();
                        }
                        return false;
                    }
                }
            }
        }
    }
    e = (e) ? e : ((event) ? event : null);
    if (e) {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
    }
    return false;
}

function gogisZoomToGroupOverlay(e, obj) {
    var group = legendDoc.root[0].group[obj.i_group];
    var subgroup = ((obj && obj.getAttribute("subgroup") && obj.getAttribute("subgroup") > "") ? obj.id.replace("zoomTo_", "") : null);
    if (group) {
        var cMap = myKaMap.getCurrentMap();
        var layer;
        var maxScale = -1;
        for (var i_layer = 0; i_layer < group.layer.length; i_layer++) {
            if (subgroup == null || (group.layer[i_layer].subgroup && group.layer[i_layer].subgroup == subgroup)) {
                layer = cMap.getLayer(group.layer[i_layer].name);
                if (layer && layer.overlayMaxscale != -1 && maxScale < layer.overlayMaxscale) maxScale = layer.overlayMaxscale;
            }
        }
        if (maxScale != -1) {
            gogisTabControlChange(1);
            myKaMap.zoomToScale(maxScale);
            if (subgroup == null) {
                setTimeout('groupCheckBoxClicked("' + group.name + '",' + obj.i_group + ',true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
            } else {
                setTimeout('subgroupCheckBoxClicked("' + subgroup + '",' + obj.i_group + ',true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
            }
        }
    }
    e = (e) ? e : ((event) ? event : null);
    if (e) {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
    }
    return false;
}

function gogisZoomToLayer(e, obj) {
    var lName = obj.id.replace("zoomTo_", "");
    var cMap = myKaMap.getCurrentMap();
    var layer = cMap.getLayer(lName);
    if (layer) {
        for (var i = 0; i < layer.scales.length; i++) {
            if (layer.scales[i] == 1) {
                gogisTabControlChange(1);
                myKaMap.zoomToScale(cMap.getScales()[i]);
                setTimeout('gogisLegendActivateLayer("' + lName + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
                e = (e) ? e : ((event) ? event : null);
                if (e) {
                    e.cancelBubble = true;
                    e.returnValue = false;
                    if (e.stopPropagation) e.stopPropagation();
                    if (e.preventDefault) e.preventDefault();
                }
                return false;
            }
        }
    }
    e = (e) ? e : ((event) ? event : null);
    if (e) {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
    }
    return false;
}

function gogisZoomToLayerOverlay(e, obj) {
    var lName = obj.id.replace("zoomTo_", "");
    var cMap = myKaMap.getCurrentMap();
    var layer = cMap.getLayer(lName);
    if (layer && layer.overlayMaxscale && layer.overlayMaxscale != -1) {
        gogisTabControlChange(1);
        myKaMap.zoomToScale(layer.overlayMaxscale);
        setTimeout('gogisLegendActivateLayer("' + lName + '",true);', 3 * gogisApplication.ZOOM_ANIMATION_TIME[gogisCurrentInstance] / 2);
    }
    e = (e) ? e : ((event) ? event : null);
    if (e) {
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
    }
    return false;
}

function gogisSetBaseMapLegend(name, type, container) {
    myQueueManager.dequeue("gogisGetBasemapLegend" + name);
    myQueueManager.enqueue("gogisGetBasemapLegend" + name, "gogisGetBasemapLegend", name + "|" + type + "|" + container, null);
}

function gogisGetBasemapLegend(parameters) {
    var params = parameters.split("|");
    var basemapHandler = new BaseMapLegendHandler(params[0], params[2], params[1]);
    if (gogisApplication.BASEMAP_LEGEND[gogisCurrentInstance]) {
        if (gogisBasemaps[params[0]]) basemapHandler.handle(gogisBasemaps[params[0]]);
        else {
            var legendBasemapRequestObj = new GogisRequestObject();
            legendBasemapRequestObj.action = basemapHandler.handle;
            var url = "gogis/php/getLegendByBasemap.php?themeid=" + gogisCurrentTheme + "&instance=" + gogisCurrentInstance + "&map=" + gogisMapThemes[gogisCurrentTheme].mapfile + "&basemap=" + params[0];
            legendBasemapRequestObj.sendRequest(url);
        }
    }
}

function BaseMapLegendHandler(lName, container, type) {
    var lName = lName;
    var container = container;
    var type = type;
    this.handle = function(response) {
        var contHtml = document.getElementById(container);
        if (response.trim() == "null") {
            gogisBasemaps[lName] = response;
            if (contHtml) {
                contHtml.innerHTML = "";
                contHtml.style.display = "none";
                if (type == 'legend') myLegendPanRefresh();
            }
            return;
        } else contHtml.style.display = "block";
        if (!gogisBasemaps[lName]) gogisBasemaps[lName] = response;
        var legendFromBasemap = eval('(' + response + ')');
        var basemapHtml = new StringBuffer();
        if (type == 'legend') {
            basemapHtml.append("<table class='gogisLegendTABLE' cellspacing='0' cellpadding='0' border='0'>");
            basemapHtml.append("<tr class='gogisLegendGroupLine'><td></td><td></td><td></tr>");
        } else if (type == 'printable') basemapHtml.append("<table cellspacing='0' cellpadding='0' border='0' width='100%'>");
        for (i = 0; i < legendFromBasemap.length; i++) {
            bmName = legendFromBasemap[i].name;
            bmDescr = legendFromBasemap[i].descr;
            bmLegendicon = legendFromBasemap[i].legendicon;
            if (type == 'legend') {
                basemapHtml.append("<tr class='gogisLegendLayersVisible'>");
                basemapHtml.append("<td class='gogisBasemapLegendSpacer' valign='top'>&nbsp;</td>");
                basemapHtml.append("<td class='gogisLegendIconTD' valign='top'>");
                if (bmLegendicon.match('tmp/')) bmLegendicon = bmLegendicon.replace('tmp/', '../tmp/');
                basemapHtml.append("<img class='gogisLegendIcons' src='" + bmLegendicon + "'>");
                basemapHtml.append("</td><td valign='center'><div class='gogisLegendLayerText'>");
                basemapHtml.append(gLocalizer.localize(bmName));
                basemapHtml.append("</div></td></tr>");
            } else if (type == 'printable') {
                basemapHtml.append("<tr id='legend_" + bmName + "'>");
                basemapHtml.append("<td valign='top' class='gogisPrintLegendDistance'>");
                if (bmLegendicon.match('tmp/')) bmLegendicon = bmLegendicon.replace('tmp/', '../tmp/');
                basemapHtml.append("<img class='gogisPrintLegendIcon' src='" + bmLegendicon + "'></td>");
                basemapHtml.append("<td valign='top' class='gogisPrintLegendLayerText'>");
                basemapHtml.append(gLocalizer.localize(bmName) + "</td><td class='gogisPrintLegendDistance'></td>");
                basemapHtml.append("<td valign='top' class='gogisPrintLegendLayerDescr'>");
                if (gLocalizer.localize(bmDescr).trim() > "" && gLocalizer.localize(bmDescr).trim() != bmDescr) {
                    basemapHtml.append(gLocalizer.localize(bmDescr));
                }
                basemapHtml.append("&nbsp;</td>");
                basemapHtml.append("</tr>");
            }
        }
        if (type == 'legend' || type == 'printable') basemapHtml.append("</table>");
        contHtml.innerHTML = basemapHtml.toString();
        if (type == 'legend') myLegendPanRefresh();
    };
}
var gogisXmlOverlayServerUrl = 'gogis/php/getXmlOverlay.php';
var myGogisOverlay = new gogisXmlOverlay();

function gogisXmlOverlay() {
    this.layers = new Array();
    this.queueManager = new GogisQueueManager("myGogisOverlay.queueManager", gogisApplication.XML_QUEUE_DELAYTIME[gogisCurrentInstance]);
    if (gogisApplication.XML_COLLECTOR_DELAYTIME && gogisApplication.XML_COLLECTOR_DELAYTIME[gogisCurrentInstance] && gogisApplication.XML_COLLECTOR_DELAYTIME[gogisCurrentInstance] > 0) {
        this.collector = new GogisQueueManager("myGogisOverlay.collector", gogisApplication.XML_COLLECTOR_DELAYTIME[gogisCurrentInstance]);
        this.layersToRemove = new Array();
    }
    this.clean = true;
}
gogisXmlOverlay.prototype.getLayer = function(name) {
    for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].name == name) {
            return this.layers[i];
        }
    }
};
gogisXmlOverlay.prototype.setLayerVisibility = function(name, visible, isMergedLayer) {
    for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].name == name) {
            if (this.layers[i].visible != visible || this.layers[i]._visible != visible) {
                this.layers[i]._visible = visible;
                var extent = this.kaMap.getGeoExtents();
                this.drawLayer(name, extent[0], extent[1], extent[2], extent[3], visible);
                if (myTooltipManager.currentTooltip != null && myTooltipManager.currentTooltip.url && myTooltipManager.currentTooltip.url.indexOf(name) >= 0) {
                    myTooltipManager.removeTooltip();
                }
                return true;
            }
            return false;
        }
    }
    if (visible) {
        var layer = this.kaMap.getCurrentMap().getLayer(name);
        layer = this.addLayer(layer.type, layer.name, layer.tileSource, layer.tileDistanceX, layer.tileDistanceY, layer.tileSource, layer.collector, layer.filter, layer.layerMaxextent, isMergedLayer);
        layer.init(layer.layerMaxextent ? layer.layerMaxextent : this.max_extent);
        layer._visible = true;
        var extent = this.kaMap.getGeoExtents();
        this.drawLayer(name, extent[0], extent[1], extent[2], extent[3], true);
        return true;
    }
    return false;
};
gogisXmlOverlay.prototype.addLayer = function(type, name, tileSource, tileDistanceX, tileDistanceY, tileSource, collector, filter, layerMaxextent, isMergedLayer) {
    var layer = new gogisXmlOverlayLayer(this, type, name, tileSource, tileDistanceX, tileDistanceY, tileSource, collector, filter, layerMaxextent, isMergedLayer);
    this.layers.push(layer);
    return layer;
};
gogisXmlOverlay.prototype.removeLayer = function(name) {
    for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].name == name) {
            if ((!(this.layers[i].visible || this.layers[i]._visible)) || arguments[1]) {
                this.layers[i].queueManager.reset();
                delete this.layers[i];
                this.layers[i] = null;
                this.layers.splice(i, 1);
            }
            return;
        }
    }
};
gogisXmlOverlay.prototype.setup = function(kmap) {
    this.kaMap = kmap;
};
gogisXmlOverlay.prototype.init = function(kaXmlOverlayCanvas, max_extent) {
    this.canvas = kaXmlOverlayCanvas;
    this.max_extent = max_extent;
};
gogisXmlOverlay.prototype.drawAllLayers = function(extents) {
    this.queueManager.reset();
    for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].visible || (!this.layers[i].empty)) {
            this.layers[i].queueManager.reset();
            this.layers[i].dataLoader.reset();
            this.queueManager.enqueue(this.layers[i].name, "myGogisOverlay.getLayer('" + this.layers[i].name + "').drawExtents", extents + (this.layers[i].visible ? "|1" : "|0"), null);
        } else if (this.layers[i]._visible) {
            this.queueManager.enqueue(this.layers[i].name, "myGogisOverlay.getLayer('" + this.layers[i].name + "').drawExtents", extents + "|1", setOverlayLayerVisible);
        }
    }
};
gogisXmlOverlay.prototype.cleanup = function() {
    if (!this.collector) return;
    if (GogisQueueManager.taskStack.length > 1) {
        ;
        setTimeout('myQueueManager.enqueue("myGogisOverlay.cleanup","myGogisOverlay.cleanup",null,null);', 10 * gogisApplication.XML_COLLECTOR_DELAYTIME[gogisCurrentInstance]);
        return;
    }
    for (var i = this.layersToRemove.length; i-- > 0;) {
        this.removeLayer(this.layersToRemove[i]);
        delete this.layersToRemove[i];
        this.layersToRemove[i] = null;
        this.layersToRemove.splice(i, 1);
    }
    if (this.clean) return;
    for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].collector != "off" && !this.layers[i].clean && !this.layers[i].empty) {
            if (this.layers[i].collector == "force") {
                this.collector.enqueue(this.layers[i].name, "myGogisOverlay.getLayer('" + this.layers[i].name + "').cleanup", null, null);
            }
        }
    }
};
gogisXmlOverlay.prototype.drawLayer = function(name, minx, miny, maxx, maxy, visible) {
    for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].name == name) {
            this.layers[i].dataLoader.reset();
            this.layers[i].queueManager.reset();
            this.queueManager.dequeue(this.layers[i].name);
            if (visible) {
                this.queueManager.enqueue(this.layers[i].name, "myGogisOverlay.getLayer('" + this.layers[i].name + "').drawExtents", minx + "|" + miny + "|" + maxx + "|" + maxy + "|1", setOverlayLayerVisible);
            } else {
                this.queueManager.enqueue(this.layers[i].name, "myGogisOverlay.getLayer('" + this.layers[i].name + "').drawExtents", minx + "|" + miny + "|" + maxx + "|" + maxy + "|0", setOverlayLayerHidden);
            }
            return;
        }
    }
};
gogisXmlOverlay.prototype.loadTile = function(p) {
    var params = p.split('|');
    var requestObj = new GogisRequestObject();
    var responseHandler = new GogisXmlOverlayLayerHandler(myGogisOverlay.getLayer(params[0]), params[1], params[2]);
    requestObj.action = responseHandler.handleResponse;
    requestObj.sendRequest(params[3]);
};

function gogisXmlOverlayLayer(xmlOverlay, type, name, tileSource, tileDistanceX, tileDistanceY, tileSource, collector, filter, layerMaxextent, isMergedLayer) {
    this.xmlOverlay = xmlOverlay;
    this.type = type;
    this.name = name;
    this.tileSource = tileSource;
    this.tileDistanceX = tileDistanceX;
    this.tileDistanceY = tileDistanceY;
    this.layerMaxextent = layerMaxextent;
    this.tileSource = tileSource;
    this.collector = collector;
    this.filter = filter;
    this.isMergedLayer = isMergedLayer;
    this.tiles = null;
    this.visible = false;
    this._visible = false;
    this.empty = true;
    this.clean = true;
    this.queueManager = new GogisQueueManager("myGogisOverlay.getLayer('" + name + "').queueManager", gogisApplication.XML_TILE_QUEUE_DELAYTIME[gogisCurrentInstance]);
    this.dataLoader = new GogisQueueManager("myGogisOverlay.getLayer('" + name + "').dataLoader", gogisApplication.XML_TILE_LOADER_DELAYTIME[gogisCurrentInstance]);
}
gogisXmlOverlayLayer.prototype.init = function(max_extent) {
    this.minx = max_extent[0] - (this.tileDistanceX / 4);
    this.miny = max_extent[1] - (this.tileDistanceY / 4);
    this.maxx = max_extent[2] + (this.tileDistanceX / 4);
    this.maxy = max_extent[3] + (this.tileDistanceY / 4);
    this.nTilesX = parseInt(Math.abs(this.maxx - this.minx) / this.tileDistanceX);
    if (this.nTilesX * this.tileDistanceX < Math.abs(this.maxx - this.minx)) this.nTilesX++;
    this.nTilesY = parseInt(Math.abs(this.maxy - this.miny) / this.tileDistanceY);
    if (this.nTilesY * this.tileDistanceY < Math.abs(this.maxy - this.miny)) this.nTilesY++;
    this.tiles = new Array(this.nTilesY);
    for (var i = 0; i < this.nTilesY; i++) {
        this.tiles[i] = new Array(this.nTilesX);
    }
};
gogisXmlOverlayLayer.prototype.drawExtents = function(extents) {
    var ext = extents.split("|");
    this.draw(ext[0], ext[1], ext[2], ext[3], (ext[4] == 1 ? true : false));
};
gogisXmlOverlayLayer.prototype.draw = function(minx, miny, maxx, maxy, visible) {
    this.queueManager.reset();
    this.dataLoader.reset();
    if (visible && this.tileDistanceX && this.tileDistanceY) {
        this.clean = false;
        this.xmlOverlay.clean = false;
        var lowerTileX;
        var upperTileX = -1;
        var lowerTileY;
        var upperTileY = -1;
        var requestUrl;
        for (var j = 0; j < this.nTilesX; j++) {
            if ((this.minx + (j * this.tileDistanceX)) < minx) lowerTileX = j;
            if ((this.minx + ((j + 1) * this.tileDistanceX)) > maxx && upperTileX == -1) upperTileX = j;
        }
        if (upperTileX == -1) upperTileX = this.nTilesX - 1;
        if (typeof lowerTileX == 'undefined') lowerTileX = 0;
        for (var i = 0; i < this.nTilesY; i++) {
            if ((this.miny + (i * this.tileDistanceY)) < miny) lowerTileY = i;
            if ((this.miny + ((i + 1) * this.tileDistanceY)) > maxy && upperTileY == -1) upperTileY = i;
        }
        if (upperTileY == -1) upperTileY = this.nTilesY - 1;
        if (typeof lowerTileY == 'undefined') lowerTileY = 0;
        for (var i = lowerTileY; i <= upperTileY; i++) {
            for (var j = lowerTileX; j <= upperTileX; j++) {
                if (this.tiles && this.tiles[i] && this.tiles[i][j]) {
                    if (!this.tiles[i][j].visible && !this.tiles[i][j].isLoading) {
                        if (this.tiles[i][j].data.overlay) {
                            this.queueManager.enqueue(this.name + "|" + j + "|" + i + "|add", "myGogisOverlay.canvas.loadJsonDoc", this.tiles[i][j].data, setOverlayTileVisible);
                        } else {
                            this.tiles[i][j].visible = true;
                            this.empty = false;
                        }
                    }
                } else {
                    if (this.tileSource.toLowerCase() != "cache") {
                        requestUrl = gogisXmlOverlayServerUrl;
                        requestUrl += '?ovl=' + this.name;
                        requestUrl += '&type=' + this.type;
                        requestUrl += '&source=' + this.tileSource;
                        requestUrl += '&minx=' + parseFloat(this.minx + ((j) * this.tileDistanceX));
                        requestUrl += '&miny=' + parseFloat(this.miny + ((i) * this.tileDistanceY));
                        requestUrl += '&maxx=' + parseFloat(this.minx + ((j + 1) * this.tileDistanceX));
                        requestUrl += '&maxy=' + parseFloat(this.miny + ((i + 1) * this.tileDistanceY));
                        requestUrl += '&map=' + szMap;
                        requestUrl += '&instance=' + gogisCurrentInstance;
                        if (this.tileSource.toLowerCase() == "nocache") {
                            if (this.filter) {
                                requestUrl += "&filter=";
                                for (var iFields = 0; iFields < this.filter.fields.length; iFields++) {
                                    requestUrl += (iFields > 0 ? "," : "") + this.filter.fields[iFields].replacename + "@@" + document.getElementById(this.filter.name + "_" + this.filter.fields[iFields].replacename).getAttribute("currentValue") + "@@" + this.filter.fields[iFields].type;
                                }
                            }
                        }
                    } else {
                        requestUrl = this.xmlOverlay.kaMap.webCache;
                        requestUrl += gogisCurrentInstance + "/xmloverlay/";
                        requestUrl += this.name.replace("++", "__") + "/" + this.type + "/";
                        requestUrl += parseInt(this.miny + ((i) * this.tileDistanceY)) + "/";
                        requestUrl += parseInt(this.minx + ((j) * this.tileDistanceX)) + ".xml";
                    }
                    this.dataLoader.enqueue(j + "|" + i, "myGogisOverlay.loadTile", this.name + "|" + j + "|" + i + "|" + requestUrl, null);
                }
            }
        }
    } else {
        try {
            this.queueManager.enqueue(this.name + "|remove", "myGogisOverlay.canvas.removePoint", this.name, setOverlayTilesHidden);
        } catch (e) {}
    }
};
gogisXmlOverlayLayer.prototype.cleanup = function() {
    if (this.visible && !this.clean && this.tileDistanceX && this.tileDistanceY) {
        var extent = this.xmlOverlay.kaMap.getGeoExtents();
        var lowerTileX;
        var upperTileX = -1;
        var lowerTileY;
        var upperTileY = -1;
        for (var j = 0; j < this.nTilesX; j++) {
            if ((this.minx + (j * this.tileDistanceX)) < extent[0]) lowerTileX = j;
            if ((this.minx + ((j + 1) * this.tileDistanceX)) > extent[2] && upperTileX == -1) upperTileX = j;
        }
        for (var i = 0; i < this.nTilesY; i++) {
            if ((this.miny + (i * this.tileDistanceY)) < extent[1]) lowerTileY = i;
            if ((this.miny + ((i + 1) * this.tileDistanceY)) > extent[3] && upperTileY == -1) upperTileY = i;
        }
        lowerTileX -= 1;
        upperTileX += 1;
        lowerTileY -= 1;
        upperTileY += 1;
        for (var i = 0; i < this.nTilesY; i++) {
            for (var j = 0; j < this.nTilesX; j++) {
                if (j < lowerTileX || j > upperTileX || i < lowerTileY || i > upperTileY) {
                    if (this.tiles && this.tiles[i] && this.tiles[i][j]) {
                        if (this.tiles[i][j].visible) {
                            if (this.tiles[i][j].data.overlay) {
                                for (var p = 0; p < this.tiles[i][j].data.overlay.length; p++) this.xmlOverlay.canvas.removePoint(this.tiles[i][j].data.overlay[p].point[0].id);
                            }
                            this.tiles[i][j].visible = false;
                        }
                    }
                }
            }
        }
        this.clean = true;
    }
};

function setOverlayLayerVisible(id) {
    var layer = myGogisOverlay.getLayer(id);
    layer.visible = true;
    myGogisOverlay.clean = false;
}

function setOverlayLayerHidden(id) {
    var layer = myGogisOverlay.getLayer(id);
    layer.visible = false;
    myGogisOverlay.clean = true;
    if (myGogisOverlay.collector && layer.collector != "off") myGogisOverlay.layersToRemove.push(id);
}

function setOverlayTileVisible(id) {
    var tid = id.split("|");
    var layer = myGogisOverlay.getLayer(tid[0]);
    if (layer.tiles && layer.tiles[tid[2]][tid[1]]) {
        layer.tiles[tid[2]][tid[1]].visible = true;
        layer.empty = false;
    }
}

function setOverlayTilesHidden(id) {
    var tid = id.split("|");
    var layer = myGogisOverlay.getLayer(tid[0]);
    for (var j = 0; j < layer.nTilesX; j++) {
        for (var i = 0; i < layer.nTilesY; i++) {
            try {
                if (layer.tiles[i] && layer.tiles[i][j]) {
                    layer.tiles[i][j].visible = false;
                }
            } catch (e) {}
        }
    }
    layer.empty = true;
    layer.clean = true;
}

function GogisXmlOverlayLayerHandler(overlayLayer, tileX, tileY) {
    var tX = tileX;
    var tY = tileY;
    var ovlLayer = overlayLayer;
    var tmpTile = new Object();
    tmpTile.isLoading = true;
    ovlLayer.tiles[tY][tX] = tmpTile;
    this.handleResponse = function(response) {
        try {
            var tmp_tile = new Object();
            tmp_tile.data = eval("(" + response + ")");
            tmp_tile.visible = false;
            ovlLayer.tiles[tY][tX] = tmp_tile;
            if (tmp_tile.data.overlay) {
                var cMap = myKaMap.getCurrentMap();
                if (!overlayLayer.isMergedLayer) {
                    var metaData = cMap.getLayer(overlayLayer.name).metadata;
                    if (overlayLayer.type != 'image') {
                        for (var i = 0; i < tmp_tile.data.overlay.length; i++) tmp_tile.data.overlay[i].point[0] = applyAll(tmp_tile.data.overlay[i].point[0], metaData);
                    } else {
                        var p;
                        for (var i = 0; i < tmp_tile.data.overlay.length; i++) {
                            p = tmp_tile.data.overlay[i].point[0];
                            p = applyAll(p, metaData);
                            p.icon.src = p.icon.src.replace(/dynid/, p.id.split("||")[1]);
                            p.icon.isImage = true;
                        }
                    }
                } else {
                    var metaData = new Array();
                    var layername;
                    if (overlayLayer.type != 'image') {
                        for (var i = 0; i < tmp_tile.data.overlay.length; i++) {
                            layername = tmp_tile.data.overlay[i].point[0].id.split("||")[0];
                            if (!metaData[layername]) metaData[layername] = cMap.getLayer(layername).metadata;
                            tmp_tile.data.overlay[i].point[0] = applyAll(tmp_tile.data.overlay[i].point[0], metaData[layername]);
                        }
                    } else {
                        var p;
                        for (var i = 0; i < tmp_tile.data.overlay.length; i++) {
                            p = tmp_tile.data.overlay[i].point[0];
                            layername = p.id.split("||")[0];
                            if (!metaData[layername]) metaData[layername] = cMap.getLayer(layername).metadata;
                            p = applyAll(p, metaData[layername]);
                            p.icon.src = p.icon.src.replace(/dynid/, p.id.split("||")[1]);
                            p.icon.isImage = true;
                        }
                    }
                }
                if (overlayLayer.visible) {
                    ovlLayer.queueManager.enqueue(overlayLayer.name + "|" + tX + "|" + tY + "|add", "myGogisOverlay.canvas.loadJsonDoc", tmp_tile.data, setOverlayTileVisible);
                }
            }
        } catch (e) {}
        ovlLayer.tiles[tY][tX].isLoading = false;
    };
}

function GogisPlugInLoader(plugInPath, compression) {
    var loaderObj = this;
    this.plugInPath = plugInPath;
    this.compression = compression;
    this.plugIns = new Array();
    this.plugInsLoaded = new Array();
    this.plugInObjects = new Array();
    this.plugInsCount = 0;
    this.plugInsInitialized = false;
    this.plugInsStarted = false;
    this.headID = document.getElementsByTagName("head")[0];
    this.loadPlugIn = function(name) {
        if (this.plugInsLoaded[name]) return;
        this.plugInsLoaded[name] = true;
        this.plugInsCount++;
        var cssNode = document.createElement("link");
        cssNode.type = "text/css";
        cssNode.rel = "stylesheet";
        cssNode.href = "getcjs.php?type=css" + (!this.compression ? "&compress=no" : "") + "&name=" + this.plugInPath + name + "/css/" + name + ".css";
        cssNode.media = "screen";
        this.headID.appendChild(cssNode);
        var newScript = document.createElement("script");
        newScript.type = "text/javascript";
        newScript.onload = function() {
            loaderObj.loadCallback(name);
        };
        newScript.onreadystatechange = function() {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                loaderObj.loadCallback(name);
            }
        };
        newScript.src = "getcjs.php?" + (!this.compression ? "compress=no&" : "") + "name=" + this.plugInPath + name + "/js/" + name + ".js";
        this.headID.appendChild(newScript);
    };
    this.loadCallback = function(name) {
        this.plugIns.push(name);
    };
    this.initPlugIns = function(instance, application, canvas) {
        if (!(loaderObj.plugInsInitialized || loaderObj.plugInsStarted)) {
            if (loaderObj.plugInsCount == loaderObj.plugIns.length) {
                for (i = 0; i < loaderObj.plugIns.length; i++) {
                    try {
                        eval(instance + ".plugInObjects['" + loaderObj.plugIns[i] + "']=new Gogis" + loaderObj.plugIns[i] + "('" + instance + ".plugInObjects[\"" + loaderObj.plugIns[i] + "\"]', " + application + ", " + canvas + ");");
                    } catch (e) {}
                }
                loaderObj.plugInsInitialized = true;
            } else {
                window.setTimeout(instance + ".initPlugIns('" + instance + "','" + application + "','" + canvas + "')", 500);
            }
        }
    };
    this.startPlugIns = function(instance) {
        if (!loaderObj.plugInsStarted) {
            if (loaderObj.plugInsInitialized) {
                for (i = 0; i < loaderObj.plugIns.length; i++) {
                    try {
                        eval(instance + ".plugInObjects[\"" + loaderObj.plugIns[i] + "\"].start();");
                    } catch (e) {}
                }
                loaderObj.plugInsStarted = true;
            } else {
                window.setTimeout(instance + ".startPlugIns('" + instance + "')", 500);
            }
        }
    };
};

function gogisHotspot() {
    this.requestObj = new GogisRequestObject();
    this.requestObj.action = this.handleResponse;
    this.mouseoverdelay = null;
    this.mouseoverdelayeventx = null;
    this.mouseoverdelayeventy = null;
    this.mouseoverdelayobj = null;
    this.mousemovedelay = null;
    this.mousemovedelayeventx = null;
    this.mousemovedelayeventy = null;
    this.mousemovedelayobj = null;
    this.mouseclickeddelay = null;
    this.mouseclickeddelayevent = null;
    this.mouseclickedcancled = false;
    this.mouseclickeddelayobj = null;
    this.lasttouchobj = null;
    this.disabled = false;
    this.queryOnly = false;
    this.enable = function() {
        this.disabled = false;
        this.queryOnly = false;
    };
    this.disable = function() {
        this.disabled = true;
        this.queryOnly = (arguments[0] ? true : false);
    };
    this.go = function(id, layername) {
        var url = "gogis/php/getHotspot.php?idValue=" + id + "&LayerName=" + layername + "&instance=" + gogisCurrentInstance + "&map=" + szMap;
        if (browser_plattform.toLowerCase() == 'android' && browser_version < 4) this.handleResponse(GogisRequestObject.getFile(url));
        else this.requestObj.sendRequest(url);
    };
    this.goDynamic = function(id, layername, url, x, y) {
        var a = document.kaCurrentTool.adjustPixPosition(x, y);
        var p = myKaMap.pixToGeo(a[0], a[1]);
        var tmpUrl = url + "?instance=" + gogisCurrentInstance + "&map=" + szMap + "&id=" + id + "&layer=" + layername + "&x=" + p[0] + "&y=" + p[1];
        if (browser_plattform.toLowerCase() == 'android' && browser_version < 4) this.handleResponse(GogisRequestObject.getFile(tmpUrl));
        else this.requestObj.sendRequest(tmpUrl);
    };
    this.touchesCenter = function(e) {
        var touches = e.touches;
        var sumX = 0;
        var sumY = 0;
        for (var i = 0; i < touches.length; ++i) {
            var touch = touches[i];
            sumX += touch.clientX;
            sumY += touch.clientY;
        }
        var fakeEvt = {
            "clientX": sumX / touches.length,
            "clientY": sumY / touches.length
        };
        return fakeEvt;
    };
    this.touchstart = function(e, obj) {
        if (myHotspot.disabled) return true;
        obj.isActive = !obj.isActive;
        obj.xy = myHotspot.touchesCenter(e);
        if (myHotspot.lasttouchobj) {
            myHotspot.lasttouchobj.isActive = false;
            myHotspot.touchend(e, myHotspot.lasttouchobj);
        }
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        return false;
    };
    this.touchend = function(e, obj) {
        if (myHotspot.disabled) return true;
        var xy = obj.xy;
        var type = obj.type;
        var params = obj.name.split("||");
        var layer = myKaMap.getCurrentMap().getLayer(params[0]);
        if (!layer) return;
        if (obj.isActive == true) {
            myHotspot.lasttouchobj = obj;
            if (type == gogisGeoObjects.GEOMETRY_POINT) {} else if (type == gogisGeoObjects.GEOMETRY_LINE) {
                if (!myXmlOverlay.overlayEventImage) return;
                if (layer.highlight) highlightLinestringOn(obj);
            } else if (type == gogisGeoObjects.GEOMETRY_POLYGON) {
                if (!myXmlOverlay.overlayEventImage) return;
                if (layer.highlight) highlightPolygonOn(obj);
            } else if (type == gogisGeoObjects.GEOMETRY_LABEL) {
                if (layer.highlight) gogisXmlHighlightOn(obj);
            } else if (type == gogisGeoObjects.GEOMETRY_ICON) {
                if (layer.highlight) gogisXmlHighlightOn(obj);
            }
            if ((layer.objectId > "") && layer.tooltip) {
                if (type == gogisGeoObjects.GEOMETRY_LINE || type == gogisGeoObjects.GEOMETRY_POLYGON || type == gogisGeoObjects.GEOMETRY_LABEL) {
                    var a = document.kaCurrentTool.adjustPixPosition(xy.clientX, xy.clientY);
                    var p = myKaMap.pixToGeo(a[0], a[1]);
                    myTooltipManager.showTooltip(-1, "idName=" + layer.objectId + "&idValue=" + params[1] + "&LayerName=" + params[0] + "&instance=" + gogisCurrentInstance + "&map=" + szMap, p[0], p[1]);
                } else {
                    var pObj = myXmlOverlay.getPointObject(obj.name);
                    myTooltipManager.showTooltip(-1, "idName=" + layer.objectId + "&idValue=" + params[1] + "&LayerName=" + params[0] + "&instance=" + gogisCurrentInstance + "&map=" + szMap, pObj.geox, pObj.geoy);
                }
            } else if ((layer.objectId > "") && layer.hotspot) {
                var hotspot = layer.hotspot;
                var paramsHotspot = hotspot.split('|');
                if (hotspot.toLowerCase().trim() == "details") {
                    sendAutocompleteRequestDetails(layer.objectId, params[1], params[0], true);
                } else if (paramsHotspot[0].toLowerCase().trim() == "dynamic" && paramsHotspot[1] && paramsHotspot[1].trim() != '') {
                    myHotspot.goDynamic(params[1], params[0], paramsHotspot[1].trim(), xy.clientX, xy.clientY);
                } else {
                    myHotspot.go(params[1], params[0]);
                }
            }
        } else {
            myHotspot.lasttouchobj = null;
            if (type == gogisGeoObjects.GEOMETRY_POINT) {} else if (type == gogisGeoObjects.GEOMETRY_LINE) {
                if (layer.highlight) highlightLinestringOff(obj);
            } else if (type == gogisGeoObjects.GEOMETRY_POLYGON) {
                if (layer.highlight) highlightPolygonOff(obj);
            } else if (type == gogisGeoObjects.GEOMETRY_LABEL) {
                if (layer.highlight) gogisXmlHighlightOff(obj);
            } else if (type == gogisGeoObjects.GEOMETRY_ICON) {
                if (layer.highlight) gogisXmlHighlightOff(obj);
            }
            if ((layer.objectId > "") && layer.tooltip) {
                myTooltipManager.releaseTooltip();
            }
        }
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        return false;
    };
    this.click = function(e, obj) {
        if (myHotspot.disabled && !this.queryOnly) return true;
        if ((myKaMap.currentTool.startx == myKaMap.currentTool.lastx) && (myKaMap.currentTool.starty == myKaMap.currentTool.lasty)) {
            if (!e) var e = window.event;
            myHotspot.mouseclickeddelayevent = e;
            obj.positionX = myKaMap.currentTool.startx;
            obj.positionY = myKaMap.currentTool.starty;
            myHotspot.mouseclickeddelayobj = obj;
            if (myHotspot.mouseclickeddelay != null) {
                clearTimeout(myHotspot.mouseclickeddelay);
                myHotspot.mouseclickeddelay = null;
                myHotspot.mouseclickedcancled = false;
            } else {
                myHotspot.mouseclickeddelay = setTimeout("myHotspot.mouseclickeddelayed()", 200);
            }
        }
        if (this.queryOnly) {
            myKaMap.currentTool.startx = myKaMap.currentTool.endx = null;
            myKaMap.currentTool.starty = myKaMap.currentTool.endy = null;
        }
        return true;
    };
    this.mouseclickeddelayed = function() {
        myHotspot.mouseclickeddelay = null;
        if (myHotspot.mouseclickedcancled == true) {
            myHotspot.mouseclickedcancled = false;
            return;
        }
        var params = myHotspot.mouseclickeddelayobj.name.split("||");
        var hotspot = (myKaMap.getCurrentMap().getLayer(params[0])).hotspot;
        if (hotspot > "") {
            var paramsHotspot = hotspot.split('|');
            if (hotspot.toLowerCase().trim() == "details") {
                sendAutocompleteRequestDetails((myKaMap.getCurrentMap().getLayer(params[0])).objectId, params[1], params[0], true);
            } else if (paramsHotspot[0].toLowerCase().trim() == "dynamic" && paramsHotspot[1] && paramsHotspot[1].trim() != '') {
                myHotspot.goDynamic(params[1], params[0], paramsHotspot[1].trim(), myHotspot.mouseclickeddelayobj.positionX, myHotspot.mouseclickeddelayobj.positionY);
            } else {
                myHotspot.go(params[1], params[0]);
            }
            if (gDblClickTimer != null) {
                window.clearTimeout(gDblClickTimer);
                gDblClickTimer = null;
            }
            try {
                myHotspot.mouseclickeddelayevent.cancelBubble = true;
                myHotspot.mouseclickeddelayevent.returnValue = false;
                if (myHotspot.mouseclickeddelayevent.stopPropagation) myHotspot.mouseclickeddelayevent.stopPropagation();
                if (myHotspot.mouseclickeddelayevent.preventDefault) myHotspot.mouseclickeddelayevent.preventDefault();
            } catch (e) {}
        }
    };
    this.over = function(e, obj) {
        if (myHotspot.disabled) return true;
        if (!e) var e = window.event;
        if (myHotspot.mouseoverdelay != null) {
            clearTimeout(myHotspot.mouseoverdelay);
            myHotspot.mouseoverdelay = null;
        }
        if (myHotspot.mousemovedelay != null) {
            clearTimeout(myHotspot.mousemovedelay);
            myHotspot.mousemovedelay = null;
        }
        myHotspot.mouseoverdelayeventx = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        myHotspot.mouseoverdelayeventy = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        myHotspot.mouseoverdelayobj = obj;
        if (obj.type == gogisGeoObjects.GEOMETRY_POINT || obj.type == gogisGeoObjects.GEOMETRY_LINE || obj.type == gogisGeoObjects.GEOMETRY_POLYGON) {
            myHotspot.mouseoverdelay = setTimeout("myHotspot.mouseoverdelayed()", gogisApplication.UPDATEHOTSPOT_GRAPHICS_DELAYTIME);
        } else {
            myHotspot.mouseoverdelay = setTimeout("myHotspot.mouseoverdelayed()", gogisApplication.UPDATEHOTSPOT_HTML_DELAYTIME);
        }
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        return false;
    };
    this.mouseoverdelayed = function() {
        myHotspot.mouseoverdelay = null;
        var obj = myHotspot.mouseoverdelayobj;
        var type = obj.type;
        var params = obj.name.split("||");
        var layer = myKaMap.getCurrentMap().getLayer(params[0]);
        if (!layer) return;
        if (type == gogisGeoObjects.GEOMETRY_POINT) {} else if (type == gogisGeoObjects.GEOMETRY_LINE) {
            if (!myXmlOverlay.overlayEventImage) return;
            myXmlOverlay.overlayEventImage.tmpCursor = myXmlOverlay.overlayEventImage.style.cursor;
            myXmlOverlay.overlayEventImage.style.cursor = "pointer";
            if (layer.highlight) highlightLinestringOn(obj);
        } else if (type == gogisGeoObjects.GEOMETRY_POLYGON) {
            if (!myXmlOverlay.overlayEventImage) return;
            myXmlOverlay.overlayEventImage.tmpCursor = myXmlOverlay.overlayEventImage.style.cursor;
            myXmlOverlay.overlayEventImage.style.cursor = "pointer";
            if (layer.highlight) highlightPolygonOn(obj);
        } else if (type == gogisGeoObjects.GEOMETRY_LABEL) {
            obj.tmpCursor = obj.style.cursor;
            obj.style.cursor = "pointer";
            if (layer.highlight) gogisXmlHighlightOn(obj);
        } else if (type == gogisGeoObjects.GEOMETRY_ICON) {
            obj.tmpCursor = obj.style.cursor;
            obj.style.cursor = "pointer";
            if (layer.highlight) gogisXmlHighlightOn(obj);
        }
        if ((layer.objectId > "") && layer.tooltip) {
            if (type == gogisGeoObjects.GEOMETRY_LINE || type == gogisGeoObjects.GEOMETRY_POLYGON || type == gogisGeoObjects.GEOMETRY_LABEL) {
                var a = document.kaCurrentTool.adjustPixPosition(myHotspot.mouseoverdelayeventx, myHotspot.mouseoverdelayeventy);
                var p = myKaMap.pixToGeo(a[0], a[1]);
                myTooltipManager.showTooltip(-1, "idName=" + layer.objectId + "&idValue=" + params[1] + "&LayerName=" + params[0] + "&instance=" + gogisCurrentInstance + "&map=" + szMap, p[0], p[1]);
            } else {
                var pObj = myXmlOverlay.getPointObject(obj.name);
                myTooltipManager.showTooltip(-1, "idName=" + layer.objectId + "&idValue=" + params[1] + "&LayerName=" + params[0] + "&instance=" + gogisCurrentInstance + "&map=" + szMap, pObj.geox, pObj.geoy);
            }
        }
        obj.isActive = true;
    };
    this.move = function(e, obj) {
        if (myHotspot.disabled) return true;
        if (!e) var e = window.event;
        if (myHotspot.mousemovedelay != null) {
            clearTimeout(myHotspot.mousemovedelay);
            myHotspot.mousemovedelay = null;
        }
        myHotspot.mousemovedelayeventx = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        myHotspot.mousemovedelayeventy = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        myHotspot.mousemovedelayobj = obj;
        if (obj.type == gogisGeoObjects.GEOMETRY_POINT || obj.type == gogisGeoObjects.GEOMETRY_LINE || obj.type == gogisGeoObjects.GEOMETRY_POLYGON) {
            myHotspot.mousemovedelay = setTimeout("myHotspot.mousemovedelayed()", gogisApplication.UPDATEHOTSPOT_GRAPHICS_DELAYTIME);
        } else {
            myHotspot.mousemovedelay = setTimeout("myHotspot.mousemovedelayed()", gogisApplication.UPDATEHOTSPOT_HTML_DELAYTIME);
        }
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        return false;
    };
    this.mousemovedelayed = function() {
        myHotspot.mousemovedelay = null;
        var obj = myHotspot.mousemovedelayobj;
        var type = obj.type;
        var params = obj.name.split("||");
        var layer = myKaMap.getCurrentMap().getLayer(params[0]);
        if (!layer) return;
        if ((layer.objectId > "") && layer.tooltip) {
            if (type == gogisGeoObjects.GEOMETRY_LINE || type == gogisGeoObjects.GEOMETRY_POLYGON) {
                var a = document.kaCurrentTool.adjustPixPosition(myHotspot.mousemovedelayeventx, myHotspot.mousemovedelayeventy);
                var p = myKaMap.pixToGeo(a[0], a[1]);
                myTooltipManager.showTooltip(-2, "idName=" + layer.objectId + "&idValue=" + params[1] + "&LayerName=" + params[0] + "&instance=" + gogisCurrentInstance + "&map=" + szMap, p[0], p[1]);
            }
        }
        obj.isActive = true;
    };
    this.out = function(e, obj) {
        if (myHotspot.disabled) return true;
        if (myHotspot.mouseoverdelayobj.name == obj.name && myHotspot.mouseoverdelay != null) {
            clearTimeout(myHotspot.mouseoverdelay);
            myHotspot.mouseoverdelay = null;
        }
        if (myHotspot.mousemovedelay != null) {
            clearTimeout(myHotspot.mousemovedelay);
            myHotspot.mousemovedelay = null;
        }
        if (obj.isActive != true) {
            obj.isActive = false;
            if (!e) var e = window.event;
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            return false;
        } else obj.isActive = false;
        var type = obj.type;
        var params = obj.name.split("||");
        var layer = myKaMap.getCurrentMap().getLayer(params[0]);
        if (!layer) return;
        if (type == gogisGeoObjects.GEOMETRY_POINT) {} else if (type == gogisGeoObjects.GEOMETRY_LINE) {
            myXmlOverlay.overlayEventImage.style.cursor = myXmlOverlay.overlayEventImage.tmpCursor;
            if (layer.highlight) highlightLinestringOff(obj);
        } else if (type == gogisGeoObjects.GEOMETRY_POLYGON) {
            myXmlOverlay.overlayEventImage.style.cursor = myXmlOverlay.overlayEventImage.tmpCursor;
            if (layer.highlight) highlightPolygonOff(obj);
        } else if (type == gogisGeoObjects.GEOMETRY_LABEL) {
            obj.style.cursor = obj.tmpCursor;
            if (layer.highlight) gogisXmlHighlightOff(obj);
        } else if (type == gogisGeoObjects.GEOMETRY_ICON) {
            obj.style.cursor = obj.tmpCursor;
            if (layer.highlight) gogisXmlHighlightOff(obj);
        }
        if ((layer.objectId > "") && layer.tooltip) {
            myTooltipManager.releaseTooltip();
        }
        if (!e) var e = window.event;
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        return false;
    };
};
gogisHotspot.prototype.handleResponse = function(response) {
    if (isIntNegative(response)) return;
    response = response.trim().split("||");
    var popupStyle = response[1];
    if (browser_isMobile && popupStyle != 'iframe') popupStyle = 'blank';
    var popupWidth = response[2];
    if (!popupWidth > "") popupWidth = gogisApplication.DEFAULT_POPUP_WIDTH[gogisCurrentInstance];
    var popupHeigth = response[3];
    if (!popupHeigth > "") popupHeigth = gogisApplication.DEFAULT_POPUP_HEIGHT[gogisCurrentInstance];
    var popupTarget = response[4];
    if (!popupTarget > "") popupTarget = 'Hotspot';
    switch (popupStyle) {
        case "iframe":
            showContent(response[0], true, false, (popupTarget == "noscroll" ? false : true));
            break;
        case "menu":
            gogisXPopUpWithMenu(response[0], popupTarget, popupWidth, popupHeigth);
            break;
        case "toolbar":
            gogisXPopUpWithToolbar(response[0], popupTarget, popupWidth, popupHeigth);
            break;
        case "plane":
            gogisXPopUp(response[0], popupTarget, popupWidth, popupHeigth);
            break;
        case "blank":
            window.open(response[0], '_blank');
            break;
        default:
            gogisXPopUp(response[0], popupTarget, popupWidth, popupHeigth);
            break;
    }
};

function highlightLinestringOn(obj) {
    myHighlightObjects.removeGeometry("myHighlightGeometry");
    var stroke = parseInt(((obj.meta.stroke >= gogisApplication.HIGHLIGHT_SIZE ? obj.meta.stroke : gogisApplication.HIGHLIGHT_SIZE) * obj.meta.scalefact) + 0.5);
    var pObj = myXmlOverlay.getPointObject(obj.id);
    var geometry = new Object();
    geometry.persistence = gogisGeoObjects.PERSISTENCE_TMP;
    geometry.status = gogisGeoObjects.STATUS_READONLY;
    geometry.id = "myHighlightGeometry";
    geometry.points = pObj.coords;
    geometry.extension = pObj.extension;
    geometry.type = gogisGeoObjects.GEOMETRY_LINE;
    geometry.opacity = gogisApplication.HIGHLIGHT_OPACITY;
    geometry.size = stroke;
    geometry.color = gogisApplication.HIGHLIGHT_BORDERCOLOR;
    myHighlightObjects.addGeometry(geometry);
}

function highlightLinestringOff(obj) {
    myHighlightObjects.removeGeometry("myHighlightGeometry");
}

function highlightPolygonOn(obj) {
    myHighlightObjects.removeGeometry("myHighlightGeometry");
    var stroke = parseInt(((obj.meta.stroke >= gogisApplication.HIGHLIGHT_SIZE ? obj.meta.stroke : gogisApplication.HIGHLIGHT_SIZE) * obj.meta.scalefact) + 0.5);
    var pObj = myXmlOverlay.getPointObject(obj.id);
    var geometry = new Object();
    geometry.persistence = gogisGeoObjects.PERSISTENCE_TMP;
    geometry.status = gogisGeoObjects.STATUS_READONLY;
    geometry.id = "myHighlightGeometry";
    geometry.points = pObj.coords;
    geometry.extension = pObj.extension;
    geometry.type = gogisGeoObjects.GEOMETRY_POLYGON;
    geometry.opacity = gogisApplication.HIGHLIGHT_OPACITY;
    geometry.size = stroke;
    geometry.color = gogisApplication.HIGHLIGHT_BORDERCOLOR;
    geometry.bgcolor = gogisApplication.HIGHLIGHT_BGCOLOR;
    myHighlightObjects.addGeometry(geometry);
}

function highlightPolygonOff(obj) {
    myHighlightObjects.removeGeometry("myHighlightGeometry");
}

function gogisXmlHighlightOn(obj, e) {
    if (!e) var e = window.event;
    obj.canvas.style.padding = gogisApplication.HIGHLIGHT_SIZE + 'px';
    obj.canvas.style.borderStyle = "solid";
    obj.canvas.tmpBorderColor = obj.canvas.style.borderColor;
    obj.canvas.style.borderColor = gogisApplication.HIGHLIGHT_BORDERCOLOR;
    obj.canvas.tmpColor = obj.canvas.style.color;
    obj.canvas.style.color = gogisApplication.HIGHLIGHT_COLOR;
    obj.canvas.tmpBgColor = obj.canvas.style.backgroundColor;
    obj.canvas.style.backgroundColor = gogisApplication.HIGHLIGHT_BGCOLOR;
    obj.canvas.tmpOpacity = obj.canvas.style.opacity;
    obj.canvas.style.opacity = gogisApplication.HIGHLIGHT_OPACITY / 100;
    obj.canvas.tmpMozOpacity = obj.canvas.style.mozOpacity;
    obj.canvas.style.mozOpacity = gogisApplication.HIGHLIGHT_OPACITY / 100;
    obj.canvas.tmpFilter = obj.canvas.style.filter;
    obj.canvas.style.filter = 'Alpha(opacity=' + gogisApplication.HIGHLIGHT_OPACITY + ')';
}

function gogisXmlHighlightOff(obj) {
    if (!obj.showBorder) {
        obj.canvas.style.padding = 2 * gogisApplication.HIGHLIGHT_SIZE + 'px';
        obj.canvas.style.borderStyle = "none";
    }
    obj.canvas.style.borderColor = obj.canvas.tmpBorderColor;
    obj.canvas.style.color = obj.canvas.tmpColor;
    obj.canvas.style.backgroundColor = obj.canvas.tmpBgColor;
    obj.canvas.style.opacity = obj.canvas.tmpOpacity;
    obj.canvas.style.mozOpacity = obj.canvas.tmpMozOpacity;
    obj.canvas.style.filter = obj.canvas.tmpFilter;
}