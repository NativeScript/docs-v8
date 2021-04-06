import {
	defineComponent,
	getCurrentInstance,
	watch,
	onMounted,
	openBlock,
	createBlock,
	createVNode,
	ref,
	resolveComponent,
	withCtx,
	Fragment,
	renderList,
	toDisplayString,
	withModifiers,
	Transition,
	createCommentVNode,
	createStaticVNode,
	onUpdated,
	onUnmounted,
	computed,
	h as h$1,
	inject,
	pushScopeId,
	popScopeId,
	createTextVNode,
	withScopeId,
	nextTick,
	renderSlot,
} from 'vue'
import { useRoute, useSiteDataByRoute, useSiteData, inBrowser } from 'vitepress'

/*! @docsearch/js 1.0.0-alpha.28 (UNRELEASED 0a58769) | MIT License | © Algolia, Inc. and contributors | https://github.com/francoischalifour/autocomplete.js */
function e(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function t() {
	return (t =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function n(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function r(t) {
	for (var r = 1; r < arguments.length; r++) {
		var o = null != arguments[r] ? arguments[r] : {}
		r % 2
			? n(Object(o), !0).forEach(function (n) {
					e(t, n, o[n])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o))
			: n(Object(o)).forEach(function (e) {
					Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
			  })
	}

	return t
}

function o(e, t) {
	if (null == e) return {}

	var n,
		r,
		o = (function (e, t) {
			if (null == e) return {}
			var n,
				r,
				o = {},
				i = Object.keys(e)

			for (r = 0; r < i.length; r++) {
				;(n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n])
			}

			return o
		})(e, t)

	if (Object.getOwnPropertySymbols) {
		var i = Object.getOwnPropertySymbols(e)

		for (r = 0; r < i.length; r++) {
			;(n = i[r]),
				t.indexOf(n) >= 0 ||
					(Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]))
		}
	}

	return o
}

function i(e, t) {
	return (
		(function (e) {
			if (Array.isArray(e)) return e
		})(e) ||
		(function (e, t) {
			if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(e)))
				return
			var n = [],
				r = !0,
				o = !1,
				i = void 0

			try {
				for (
					var a, c = e[Symbol.iterator]();
					!(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t);
					r = !0
				) {}
			} catch (e) {
				;(o = !0), (i = e)
			} finally {
				try {
					r || null == c['return'] || c['return']()
				} finally {
					if (o) throw i
				}
			}

			return n
		})(e, t) ||
		c(e, t) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}

function a(e) {
	return (
		(function (e) {
			if (Array.isArray(e)) return u(e)
		})(e) ||
		(function (e) {
			if ('undefined' != typeof Symbol && Symbol.iterator in Object(e))
				return Array.from(e)
		})(e) ||
		c(e) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}

function c(e, t) {
	if (e) {
		if ('string' == typeof e) return u(e, t)
		var n = Object.prototype.toString.call(e).slice(8, -1)
		return (
			'Object' === n && e.constructor && (n = e.constructor.name),
			'Map' === n || 'Set' === n
				? Array.from(e)
				: 'Arguments' === n ||
				  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
				? u(e, t)
				: void 0
		)
	}
}

function u(e, t) {
	;(null == t || t > e.length) && (t = e.length)

	for (var n = 0, r = new Array(t); n < t; n++) {
		r[n] = e[n]
	}

	return r
}

var s,
	l,
	f,
	p,
	h,
	d,
	m = {},
	g = [],
	v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i

function y(e, t) {
	for (var n in t) {
		e[n] = t[n]
	}

	return e
}

function _(e) {
	var t = e.parentNode
	t && t.removeChild(e)
}

function b(e, t, n) {
	var r,
		o = arguments,
		i = {}

	for (r in t) {
		'key' !== r && 'ref' !== r && (i[r] = t[r])
	}

	if (arguments.length > 3)
		for (n = [n], r = 3; r < arguments.length; r++) {
			n.push(o[r])
		}
	if (
		(null != n && (i.children = n),
		'function' == typeof e && null != e.defaultProps)
	)
		for (r in e.defaultProps) {
			void 0 === i[r] && (i[r] = e.defaultProps[r])
		}
	return S(e, i, t && t.key, t && t.ref)
}

function S(e, t, n, r) {
	var o = {
		type: e,
		props: t,
		key: n,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__d: void 0,
		__c: null,
		constructor: void 0,
	}
	return s.vnode && s.vnode(o), o
}

function O(e) {
	return e.children
}

function E(e, t) {
	;(this.props = e), (this.context = t)
}

function w(e, t) {
	if (null == t) return e.__ ? w(e.__, e.__.__k.indexOf(e) + 1) : null

	for (var n; t < e.__k.length; t++) {
		if (null != (n = e.__k[t]) && null != n.__e) return n.__e
	}

	return 'function' == typeof e.type ? w(e) : null
}

function P(e) {
	var t, n

	if (null != (e = e.__) && null != e.__c) {
		for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) {
			if (null != (n = e.__k[t]) && null != n.__e) {
				e.__e = e.__c.base = n.__e
				break
			}
		}

		return P(e)
	}
}

function j(e) {
	;((!e.__d && (e.__d = !0) && 1 === l.push(e)) || p !== s.debounceRendering) &&
		((p = s.debounceRendering) || f)(C)
}

function C() {
	var e, t, n, r, o, i, a

	for (
		l.sort(function (e, t) {
			return t.__v.__b - e.__v.__b
		});
		(e = l.pop());

	) {
		e.__d &&
			((n = void 0),
			(r = void 0),
			(i = (o = (t = e).__v).__e),
			(a = t.__P) &&
				((n = []),
				(r = H(
					a,
					o,
					y({}, o),
					t.__n,
					void 0 !== a.ownerSVGElement,
					null,
					n,
					null == i ? w(o) : i
				)),
				A(n, o),
				r != i && P(o)))
	}
}

function x(e, t, n, r, o, i, a, c, u) {
	var s,
		l,
		f,
		p,
		h,
		d,
		v,
		y = (n && n.__k) || g,
		b = y.length
	if (
		(c == m && (c = null != i ? i[0] : b ? w(n, 0) : null),
		(s = 0),
		(t.__k = k(t.__k, function (n) {
			if (null != n) {
				if (
					((n.__ = t),
					(n.__b = t.__b + 1),
					null === (f = y[s]) || (f && n.key == f.key && n.type === f.type))
				)
					y[s] = void 0
				else
					for (l = 0; l < b; l++) {
						if ((f = y[l]) && n.key == f.key && n.type === f.type) {
							y[l] = void 0
							break
						}

						f = null
					}

				if (
					((p = H(e, n, (f = f || m), r, o, i, a, c, u)),
					(l = n.ref) &&
						f.ref != l &&
						(v || (v = []),
						f.ref && v.push(f.ref, null, n),
						v.push(l, n.__c || p, n)),
					null != p)
				) {
					var g
					if ((null == d && (d = p), void 0 !== n.__d))
						(g = n.__d), (n.__d = void 0)
					else if (i == f || p != c || null == p.parentNode) {
						e: if (null == c || c.parentNode !== e) e.appendChild(p), (g = null)
						else {
							for (h = c, l = 0; (h = h.nextSibling) && l < b; l += 2) {
								if (h == p) break e
							}

							e.insertBefore(p, c), (g = c)
						}

						'option' == t.type && (e.value = '')
					}
					;(c = void 0 !== g ? g : p.nextSibling),
						'function' == typeof t.type && (t.__d = c)
				}
			}

			return s++, n
		})),
		(t.__e = d),
		null != i && 'function' != typeof t.type)
	)
		for (s = i.length; s--; ) {
			null != i[s] && _(i[s])
		}

	for (s = b; s--; ) {
		null != y[s] && q(y[s], y[s])
	}

	if (v)
		for (s = 0; s < v.length; s++) {
			T(v[s], v[++s], v[++s])
		}
}

function k(e, t, n) {
	if ((null == n && (n = []), null == e || 'boolean' == typeof e))
		t && n.push(t(null))
	else if (Array.isArray(e))
		for (var r = 0; r < e.length; r++) {
			k(e[r], t, n)
		}
	else
		n.push(
			t
				? t(
						'string' == typeof e || 'number' == typeof e
							? S(null, e, null, null)
							: null != e.__e || null != e.__c
							? S(e.type, e.props, e.key, null)
							: e
				  )
				: e
		)
	return n
}

function D(e, t, n) {
	'-' === t[0]
		? e.setProperty(t, n)
		: (e[t] =
				'number' == typeof n && !1 === v.test(t)
					? n + 'px'
					: null == n
					? ''
					: n)
}

function I(e, t, n, r, o) {
	var i, a, c, u, s
	if (
		(o
			? 'className' === t && (t = 'class')
			: 'class' === t && (t = 'className'),
		'key' === t || 'children' === t)
	);
	else if ('style' === t) {
		if (((i = e.style), 'string' == typeof n)) i.cssText = n
		else {
			if (('string' == typeof r && ((i.cssText = ''), (r = null)), r))
				for (a in r) {
					;(n && a in n) || D(i, a, '')
				}
			if (n)
				for (c in n) {
					;(r && n[c] === r[c]) || D(i, c, n[c])
				}
		}
	} else
		'o' === t[0] && 'n' === t[1]
			? ((u = t !== (t = t.replace(/Capture$/, ''))),
			  (s = t.toLowerCase()),
			  (t = (s in e ? s : t).slice(2)),
			  n
					? (r || e.addEventListener(t, N, u), ((e.l || (e.l = {}))[t] = n))
					: e.removeEventListener(t, N, u))
			: 'list' !== t &&
			  'tagName' !== t &&
			  'form' !== t &&
			  'type' !== t &&
			  'size' !== t &&
			  !o &&
			  t in e
			? (e[t] = null == n ? '' : n)
			: 'function' != typeof n &&
			  'dangerouslySetInnerHTML' !== t &&
			  (t !== (t = t.replace(/^xlink:?/, ''))
					? null == n || !1 === n
						? e.removeAttributeNS(
								'http://www.w3.org/1999/xlink',
								t.toLowerCase()
						  )
						: e.setAttributeNS(
								'http://www.w3.org/1999/xlink',
								t.toLowerCase(),
								n
						  )
					: null == n || (!1 === n && !/^ar/.test(t))
					? e.removeAttribute(t)
					: e.setAttribute(t, n))
}

function N(e) {
	this.l[e.type](s.event ? s.event(e) : e)
}

function H(e, t, n, r, o, i, a, c, u) {
	var l,
		f,
		p,
		h,
		d,
		m,
		g,
		v,
		_,
		b,
		S = t.type

	if (void 0 !== t.constructor) return null
	;(l = s.__b) && l(t)

	try {
		e: if ('function' == typeof S) {
			if (
				((v = t.props),
				(_ = (l = S.contextType) && r[l.__c]),
				(b = l ? (_ ? _.props.value : l.__) : r),
				n.__c
					? (g = (f = t.__c = n.__c).__ = f.__E)
					: ('prototype' in S && S.prototype.render
							? (t.__c = f = new S(v, b))
							: ((t.__c = f = new E(v, b)),
							  (f.constructor = S),
							  (f.render = L)),
					  _ && _.sub(f),
					  (f.props = v),
					  f.state || (f.state = {}),
					  (f.context = b),
					  (f.__n = r),
					  (p = f.__d = !0),
					  (f.__h = [])),
				null == f.__s && (f.__s = f.state),
				null != S.getDerivedStateFromProps &&
					(f.__s == f.state && (f.__s = y({}, f.__s)),
					y(f.__s, S.getDerivedStateFromProps(v, f.__s))),
				(h = f.props),
				(d = f.state),
				p)
			)
				null == S.getDerivedStateFromProps &&
					null != f.componentWillMount &&
					f.componentWillMount(),
					null != f.componentDidMount && f.__h.push(f.componentDidMount)
			else {
				if (
					(null == S.getDerivedStateFromProps &&
						v !== h &&
						null != f.componentWillReceiveProps &&
						f.componentWillReceiveProps(v, b),
					!f.__e &&
						null != f.shouldComponentUpdate &&
						!1 === f.shouldComponentUpdate(v, f.__s, b))
				) {
					for (
						f.props = v,
							f.state = f.__s,
							f.__d = !1,
							f.__v = t,
							t.__e = n.__e,
							t.__k = n.__k,
							f.__h.length && a.push(f),
							l = 0;
						l < t.__k.length;
						l++
					) {
						t.__k[l] && (t.__k[l].__ = t)
					}

					break e
				}

				null != f.componentWillUpdate && f.componentWillUpdate(v, f.__s, b),
					null != f.componentDidUpdate &&
						f.__h.push(function () {
							f.componentDidUpdate(h, d, m)
						})
			}
			;(f.context = b),
				(f.props = v),
				(f.state = f.__s),
				(l = s.__r) && l(t),
				(f.__d = !1),
				(f.__v = t),
				(f.__P = e),
				(l = f.render(f.props, f.state, f.context)),
				(t.__k =
					null != l && l.type == O && null == l.key ? l.props.children : l),
				null != f.getChildContext && (r = y(y({}, r), f.getChildContext())),
				p ||
					null == f.getSnapshotBeforeUpdate ||
					(m = f.getSnapshotBeforeUpdate(h, d)),
				x(e, t, n, r, o, i, a, c, u),
				(f.base = t.__e),
				f.__h.length && a.push(f),
				g && (f.__E = f.__ = null),
				(f.__e = !1)
		} else t.__e = M(n.__e, t, n, r, o, i, a, u)

		;(l = s.diffed) && l(t)
	} catch (e) {
		s.__e(e, t, n)
	}

	return t.__e
}

function A(e, t) {
	s.__c && s.__c(t, e),
		e.some(function (t) {
			try {
				;(e = t.__h),
					(t.__h = []),
					e.some(function (e) {
						e.call(t)
					})
			} catch (e) {
				s.__e(e, t.__v)
			}
		})
}

function M(e, t, n, r, o, i, a, c) {
	var u,
		s,
		l,
		f,
		p,
		h = n.props,
		d = t.props
	if (((o = 'svg' === t.type || o), null == e && null != i))
		for (u = 0; u < i.length; u++) {
			if (
				null != (s = i[u]) &&
				(null === t.type ? 3 === s.nodeType : s.localName === t.type)
			) {
				;(e = s), (i[u] = null)
				break
			}
		}

	if (null == e) {
		if (null === t.type) return document.createTextNode(d)
		;(e = o
			? document.createElementNS('http://www.w3.org/2000/svg', t.type)
			: document.createElement(
					t.type,
					d.is && {
						is: d.is,
					}
			  )),
			(i = null)
	}

	if (null === t.type)
		null != i && (i[i.indexOf(e)] = null),
			h !== d && e.data != d && (e.data = d)
	else if (t !== n) {
		if (
			(null != i &&
				((i[i.indexOf(e)] = null), (i = g.slice.call(e.childNodes))),
			(l = (h = n.props || m).dangerouslySetInnerHTML),
			(f = d.dangerouslySetInnerHTML),
			!c)
		) {
			if (h === m)
				for (h = {}, p = 0; p < e.attributes.length; p++) {
					h[e.attributes[p].name] = e.attributes[p].value
				}
			;(f || l) &&
				((f && l && f.__html == l.__html) ||
					(e.innerHTML = (f && f.__html) || ''))
		}

		;(function (e, t, n, r, o) {
			var i

			for (i in n) {
				i in t || I(e, i, null, n[i], r)
			}

			for (i in t) {
				;(o && 'function' != typeof t[i]) ||
					'value' === i ||
					'checked' === i ||
					n[i] === t[i] ||
					I(e, i, t[i], n[i], r)
			}
		})(e, d, h, o, c),
			(t.__k = t.props.children),
			f || x(e, t, n, r, 'foreignObject' !== t.type && o, i, a, m, c),
			c ||
				('value' in d &&
					void 0 !== d.value &&
					d.value !== e.value &&
					(e.value = null == d.value ? '' : d.value),
				'checked' in d &&
					void 0 !== d.checked &&
					d.checked !== e.checked &&
					(e.checked = d.checked))
	}
	return e
}

function T(e, t, n) {
	try {
		'function' == typeof e ? e(t) : (e.current = t)
	} catch (e) {
		s.__e(e, n)
	}
}

function q(e, t, n) {
	var r, o, i

	if (
		(s.unmount && s.unmount(e),
		(r = e.ref) && ((r.current && r.current !== e.__e) || T(r, null, t)),
		n || 'function' == typeof e.type || (n = null != (o = e.__e)),
		(e.__e = e.__d = void 0),
		null != (r = e.__c))
	) {
		if (r.componentWillUnmount)
			try {
				r.componentWillUnmount()
			} catch (e) {
				s.__e(e, t)
			}
		r.base = r.__P = null
	}

	if ((r = e.__k))
		for (i = 0; i < r.length; i++) {
			r[i] && q(r[i], t, n)
		}
	null != o && _(o)
}

function L(e, t, n) {
	return this.constructor(e, n)
}

function R(e, t, n) {
	var r, o, i
	s.__ && s.__(e, t),
		(o = (r = n === h) ? null : (n && n.__k) || t.__k),
		(e = b(O, null, [e])),
		(i = []),
		H(
			t,
			((r ? t : n || t).__k = e),
			o || m,
			m,
			void 0 !== t.ownerSVGElement,
			n && !r ? [n] : o ? null : g.slice.call(t.childNodes),
			i,
			n || m,
			r
		),
		A(i, e)
}

function F(e, t) {
	return (
		(t = y(y({}, e.props), t)),
		arguments.length > 2 && (t.children = g.slice.call(arguments, 2)),
		S(e.type, t, t.key || e.key, t.ref || e.ref)
	)
}

;(s = {
	__e: function __e(e, t) {
		for (var n, r; (t = t.__); ) {
			if ((n = t.__c) && !n.__)
				try {
					if (
						(n.constructor &&
							null != n.constructor.getDerivedStateFromError &&
							((r = !0), n.setState(n.constructor.getDerivedStateFromError(e))),
						null != n.componentDidCatch && ((r = !0), n.componentDidCatch(e)),
						r)
					)
						return j((n.__E = n))
				} catch (t) {
					e = t
				}
		}

		throw e
	},
}),
	(E.prototype.setState = function (e, t) {
		var n
		;(n = this.__s !== this.state ? this.__s : (this.__s = y({}, this.state))),
			'function' == typeof e && (e = e(n, this.props)),
			e && y(n, e),
			null != e && this.__v && (t && this.__h.push(t), j(this))
	}),
	(E.prototype.forceUpdate = function (e) {
		this.__v && ((this.__e = !0), e && this.__h.push(e), j(this))
	}),
	(E.prototype.render = O),
	(l = []),
	(f =
		'function' == typeof Promise
			? Promise.prototype.then.bind(Promise.resolve())
			: setTimeout),
	(h = m),
	(d = 0)
var U,
	z,
	V,
	Q = [],
	B = s.__r,
	W = s.diffed,
	K = s.__c,
	J = s.unmount

function $(e) {
	s.__h && s.__h(z)
	var t =
		z.__H ||
		(z.__H = {
			__: [],
			__h: [],
		})
	return e >= t.__.length && t.__.push({}), t.__[e]
}

function Y(e) {
	return G(ie, e)
}

function G(e, t, n) {
	var r = $(U++)
	return (
		r.__c ||
			((r.__c = z),
			(r.__ = [
				n ? n(t) : ie(void 0, t),
				function (t) {
					var n = e(r.__[0], t)
					r.__[0] !== n && ((r.__[0] = n), r.__c.setState({}))
				},
			])),
		r.__
	)
}

function Z(e, t) {
	var n = $(U++)
	oe(n.__H, t) && ((n.__ = e), (n.__H = t), z.__H.__h.push(n))
}

function X(e, t) {
	var n = $(U++)
	oe(n.__H, t) && ((n.__ = e), (n.__H = t), z.__h.push(n))
}

function ee(e, t) {
	var n = $(U++)
	return oe(n.__H, t) ? ((n.__H = t), (n.__h = e), (n.__ = e())) : n.__
}

function te() {
	Q.some(function (e) {
		if (e.__P)
			try {
				e.__H.__h.forEach(ne), e.__H.__h.forEach(re), (e.__H.__h = [])
			} catch (t) {
				return s.__e(t, e.__v), !0
			}
	}),
		(Q = [])
}

function ne(e) {
	e.t && e.t()
}

function re(e) {
	var t = e.__()

	'function' == typeof t && (e.t = t)
}

function oe(e, t) {
	return (
		!e ||
		t.some(function (t, n) {
			return t !== e[n]
		})
	)
}

function ie(e, t) {
	return 'function' == typeof t ? t(e) : t
}

function ae(e, t) {
	for (var n in t) {
		e[n] = t[n]
	}

	return e
}

function ce(e, t) {
	for (var n in e) {
		if ('__source' !== n && !(n in t)) return !0
	}

	for (var r in t) {
		if ('__source' !== r && e[r] !== t[r]) return !0
	}

	return !1
}

;(s.__r = function (e) {
	B && B(e),
		(U = 0),
		(z = e.__c).__H &&
			(z.__H.__h.forEach(ne), z.__H.__h.forEach(re), (z.__H.__h = []))
}),
	(s.diffed = function (e) {
		W && W(e)
		var t = e.__c

		if (t) {
			var n = t.__H
			n &&
				n.__h.length &&
				((1 !== Q.push(t) && V === s.requestAnimationFrame) ||
					(
						(V = s.requestAnimationFrame) ||
						function (e) {
							var t,
								n = function n() {
									clearTimeout(r), cancelAnimationFrame(t), setTimeout(e)
								},
								r = setTimeout(n, 100)

							'undefined' != typeof window && (t = requestAnimationFrame(n))
						}
					)(te))
		}
	}),
	(s.__c = function (e, t) {
		t.some(function (e) {
			try {
				e.__h.forEach(ne),
					(e.__h = e.__h.filter(function (e) {
						return !e.__ || re(e)
					}))
			} catch (n) {
				t.some(function (e) {
					e.__h && (e.__h = [])
				}),
					(t = []),
					s.__e(n, e.__v)
			}
		}),
			K && K(e, t)
	}),
	(s.unmount = function (e) {
		J && J(e)
		var t = e.__c

		if (t) {
			var n = t.__H
			if (n)
				try {
					n.__.forEach(function (e) {
						return e.t && e.t()
					})
				} catch (e) {
					s.__e(e, t.__v)
				}
		}
	})

var ue = (function (e) {
	var t, n

	function r(t) {
		var n
		return ((n = e.call(this, t) || this).isPureReactComponent = !0), n
	}

	return (
		(n = e),
		((t = r).prototype = Object.create(n.prototype)),
		(t.prototype.constructor = t),
		(t.__proto__ = n),
		(r.prototype.shouldComponentUpdate = function (e, t) {
			return ce(this.props, e) || ce(this.state, t)
		}),
		r
	)
})(E)

var se = s.vnode

s.vnode = function (e) {
	e.type && e.type.t && e.ref && ((e.props.ref = e.ref), (e.ref = null)),
		se && se(e)
}

var le = function le(e, t) {
		return e
			? k(e).reduce(function (e, n, r) {
					return e.concat(t(n, r))
			  }, [])
			: null
	},
	fe = {
		map: le,
		forEach: le,
		count: function count(e) {
			return e ? k(e).length : 0
		},
		only: function only(e) {
			if (1 !== (e = k(e)).length)
				throw new Error('Children.only() expects only one child.')
			return e[0]
		},
		toArray: k,
	},
	pe = s.__e

function he(e) {
	return (
		e && (((e = ae({}, e)).__c = null), (e.__k = e.__k && e.__k.map(he))), e
	)
}

function de(e) {
	;(this.__u = 0), (this.o = null), (this.__b = null)
}

function me(e) {
	var t = e.__.__c
	return t && t.u && t.u(e)
}

function ge() {
	;(this.i = null), (this.l = null)
}

;(s.__e = function (e, t, n) {
	if (e.then)
		for (var r, o = t; (o = o.__); ) {
			if ((r = o.__c) && r.__c) return r.__c(e, t.__c)
		}
	pe(e, t, n)
}),
	((de.prototype = new E()).__c = function (e, t) {
		var n = this
		null == n.o && (n.o = []), n.o.push(t)

		var r = me(n.__v),
			o = !1,
			i = function i() {
				o || ((o = !0), r ? r(a) : a())
			}

		;(t.__c = t.componentWillUnmount),
			(t.componentWillUnmount = function () {
				i(), t.__c && t.__c()
			})

		var a = function a() {
			var e
			if (!--n.__u)
				for (
					n.__v.__k[0] = n.state.u,
						n.setState({
							u: (n.__b = null),
						});
					(e = n.o.pop());

				) {
					e.forceUpdate()
				}
		}

		n.__u++ ||
			n.setState({
				u: (n.__b = n.__v.__k[0]),
			}),
			e.then(i, i)
	}),
	(de.prototype.render = function (e, t) {
		return (
			this.__b && ((this.__v.__k[0] = he(this.__b)), (this.__b = null)),
			[b(E, null, t.u ? null : e.children), t.u && e.fallback]
		)
	})

var ve = function ve(e, t, n) {
	if (
		(++n[1] === n[0] && e.l['delete'](t),
		e.props.revealOrder && ('t' !== e.props.revealOrder[0] || !e.l.size))
	)
		for (n = e.i; n; ) {
			for (; n.length > 3; ) {
				n.pop()()
			}

			if (n[1] < n[0]) break
			e.i = n = n[2]
		}
}

;((ge.prototype = new E()).u = function (e) {
	var t = this,
		n = me(t.__v),
		r = t.l.get(e)
	return (
		r[0]++,
		function (o) {
			var i = function i() {
				t.props.revealOrder ? (r.push(o), ve(t, e, r)) : o()
			}

			n ? n(i) : i()
		}
	)
}),
	(ge.prototype.render = function (e) {
		;(this.i = null), (this.l = new Map())
		var t = k(e.children)
		e.revealOrder && 'b' === e.revealOrder[0] && t.reverse()

		for (var n = t.length; n--; ) {
			this.l.set(t[n], (this.i = [1, 0, this.i]))
		}

		return e.children
	}),
	(ge.prototype.componentDidUpdate = ge.prototype.componentDidMount = function () {
		var e = this
		e.l.forEach(function (t, n) {
			ve(e, n, t)
		})
	})

var ye = (function () {
	function e() {}

	var t = e.prototype
	return (
		(t.getChildContext = function () {
			return this.props.context
		}),
		(t.render = function (e) {
			return e.children
		}),
		e
	)
})()

function _e(e) {
	var t = this,
		n = e.container,
		r = b(
			ye,
			{
				context: t.context,
			},
			e.vnode
		)
	return (
		t.s &&
			t.s !== n &&
			(t.h.parentNode && t.s.removeChild(t.h), q(t.v), (t.p = !1)),
		e.vnode
			? t.p
				? ((n.__k = t.__k), R(r, n), (t.__k = n.__k))
				: ((t.h = document.createTextNode('')),
				  (function (e, t) {
						R(e, t, h)
				  })('', n),
				  n.appendChild(t.h),
				  (t.p = !0),
				  (t.s = n),
				  R(r, n, t.h),
				  (t.__k = this.h.__k))
			: t.p && (t.h.parentNode && t.s.removeChild(t.h), q(t.v)),
		(t.v = r),
		(t.componentWillUnmount = function () {
			t.h.parentNode && t.s.removeChild(t.h), q(t.v)
		}),
		null
	)
}

function be(e, t) {
	return b(_e, {
		vnode: e,
		container: t,
	})
}

var Se = /^(?:accent|alignment|arabic|baseline|cap|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/
E.prototype.isReactComponent = {}
var Oe =
	('undefined' != typeof Symbol &&
		Symbol['for'] &&
		Symbol['for']('react.element')) ||
	60103

function Ee(e, t, n) {
	if (null == t.__k)
		for (; t.firstChild; ) {
			t.removeChild(t.firstChild)
		}
	return (function (e, t, n) {
		return R(e, t), 'function' == typeof n && n(), e ? e.__c : null
	})(e, t, n)
}

var we = s.event

function Pe(e, t) {
	e['UNSAFE_' + t] &&
		!e[t] &&
		Object.defineProperty(e, t, {
			configurable: !1,
			get: function get() {
				return this['UNSAFE_' + t]
			},
			set: function set(e) {
				this['UNSAFE_' + t] = e
			},
		})
}

s.event = function (e) {
	return we && (e = we(e)), (e.persist = function () {}), (e.nativeEvent = e)
}

var je = {
		configurable: !0,
		get: function get() {
			return this['class']
		},
	},
	Ce = s.vnode

function xe(e) {
	return !!e && e.$$typeof === Oe
}

s.vnode = function (e) {
	e.$$typeof = Oe
	var t = e.type,
		n = e.props

	if (
		(n['class'] != n.className &&
			((je.enumerable = 'className' in n),
			null != n.className && (n['class'] = n.className),
			Object.defineProperty(n, 'className', je)),
		'function' != typeof t)
	) {
		var r, o, i

		for (i in (n.defaultValue &&
			(n.value || 0 === n.value || (n.value = n.defaultValue),
			delete n.defaultValue),
		Array.isArray(n.value) &&
			n.multiple &&
			'select' === t &&
			(k(n.children).forEach(function (e) {
				;-1 != n.value.indexOf(e.props.value) && (e.props.selected = !0)
			}),
			delete n.value),
		n)) {
			if ((r = Se.test(i))) break
		}

		if (r)
			for (i in ((o = e.props = {}), n)) {
				o[Se.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = n[i]
			}
	}

	!(function (t) {
		var n = e.type,
			r = e.props

		if (r && 'string' == typeof n) {
			var o = {}

			for (var i in r) {
				;/^on(Ani|Tra|Tou)/.test(i) &&
					((r[i.toLowerCase()] = r[i]), delete r[i]),
					(o[i.toLowerCase()] = i)
			}

			if (
				(o.ondoubleclick &&
					((r.ondblclick = r[o.ondoubleclick]), delete r[o.ondoubleclick]),
				o.onbeforeinput &&
					((r.onbeforeinput = r[o.onbeforeinput]), delete r[o.onbeforeinput]),
				o.onchange &&
					('textarea' === n ||
						('input' === n.toLowerCase() && !/^fil|che|ra/i.test(r.type))))
			) {
				var a = o.oninput || 'oninput'
				r[a] || ((r[a] = r[o.onchange]), delete r[o.onchange])
			}
		}
	})(),
		'function' == typeof t &&
			!t.m &&
			t.prototype &&
			(Pe(t.prototype, 'componentWillMount'),
			Pe(t.prototype, 'componentWillReceiveProps'),
			Pe(t.prototype, 'componentWillUpdate'),
			(t.m = !0)),
		Ce && Ce(e)
}

var ke = {
	useState: Y,
	useReducer: G,
	useEffect: Z,
	useLayoutEffect: X,
	useRef: function useRef(e) {
		return ee(function () {
			return {
				current: e,
			}
		}, [])
	},
	useImperativeHandle: function useImperativeHandle(e, t, n) {
		X(
			function () {
				'function' == typeof e ? e(t()) : e && (e.current = t())
			},
			null == n ? n : n.concat(e)
		)
	},
	useMemo: ee,
	useCallback: function useCallback(e, t) {
		return ee(function () {
			return e
		}, t)
	},
	useContext: function useContext(e) {
		var t = z.context[e.__c]
		if (!t) return e.__
		var n = $(U++)
		return null == n.__ && ((n.__ = !0), t.sub(z)), t.props.value
	},
	useDebugValue: function useDebugValue(e, t) {
		s.useDebugValue && s.useDebugValue(t ? t(e) : e)
	},
	version: '16.8.0',
	Children: fe,
	render: Ee,
	hydrate: Ee,
	unmountComponentAtNode: function unmountComponentAtNode(e) {
		return !!e.__k && (R(null, e), !0)
	},
	createPortal: be,
	createElement: b,
	createContext: function createContext(e) {
		var t = {},
			n = {
				__c: '__cC' + d++,
				__: e,
				Consumer: function Consumer(e, t) {
					return e.children(t)
				},
				Provider: function Provider(e) {
					var r,
						o = this
					return (
						this.getChildContext ||
							((r = []),
							(this.getChildContext = function () {
								return (t[n.__c] = o), t
							}),
							(this.shouldComponentUpdate = function (t) {
								e.value !== t.value &&
									r.some(function (e) {
										;(e.context = t.value), j(e)
									})
							}),
							(this.sub = function (e) {
								r.push(e)
								var t = e.componentWillUnmount

								e.componentWillUnmount = function () {
									r.splice(r.indexOf(e), 1), t && t.call(e)
								}
							})),
						e.children
					)
				},
			}
		return (n.Consumer.contextType = n), n
	},
	createFactory: function createFactory(e) {
		return b.bind(null, e)
	},
	cloneElement: function cloneElement(e) {
		return xe(e) ? F.apply(null, arguments) : e
	},
	createRef: function createRef() {
		return {}
	},
	Fragment: O,
	isValidElement: xe,
	findDOMNode: function findDOMNode(e) {
		return (e && (e.base || (1 === e.nodeType && e))) || null
	},
	Component: E,
	PureComponent: ue,
	memo: function memo(e, t) {
		function n(e) {
			var n = this.props.ref,
				r = n == e.ref
			return (
				!r && n && (n.call ? n(null) : (n.current = null)),
				t ? !t(this.props, e) || !r : ce(this.props, e)
			)
		}

		function r(t) {
			return (this.shouldComponentUpdate = n), b(e, ae({}, t))
		}

		return (
			(r.prototype.isReactComponent = !0),
			(r.displayName = 'Memo(' + (e.displayName || e.name) + ')'),
			(r.t = !0),
			r
		)
	},
	forwardRef: function forwardRef(e) {
		function t(t) {
			var n = ae({}, t)
			return delete n.ref, e(n, t.ref)
		}

		return (
			(t.prototype.isReactComponent = !0),
			(t.t = !0),
			(t.displayName = 'ForwardRef(' + (e.displayName || e.name) + ')'),
			t
		)
	},
	unstable_batchedUpdates: function unstable_batchedUpdates(e, t) {
		return e(t)
	},
	Suspense: de,
	SuspenseList: ge,
	lazy: function lazy(e) {
		var t, n, r

		function o(o) {
			if (
				(t ||
					(t = e()).then(
						function (e) {
							n = e['default'] || e
						},
						function (e) {
							r = e
						}
					),
				r)
			)
				throw r
			if (!n) throw t
			return b(n, o)
		}

		return (o.displayName = 'Lazy'), (o.t = !0), o
	},
}

function De() {
	return ke.createElement(
		'svg',
		{
			width: '15',
			height: '15',
			className: 'DocSearch-Control-Key-Icon',
		},
		ke.createElement('path', {
			d:
				'M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953',
			strokeWidth: '1.2',
			stroke: 'currentColor',
			fill: 'none',
			strokeLinecap: 'square',
		})
	)
}

function Ie() {
	return ke.createElement(
		'svg',
		{
			width: '20',
			height: '20',
			className: 'DocSearch-Search-Icon',
			viewBox: '0 0 20 20',
		},
		ke.createElement('path', {
			d:
				'M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z',
			stroke: 'currentColor',
			fill: 'none',
			fillRule: 'evenodd',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		})
	)
}

function Ne() {
	return (Ne =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function He(e, t) {
	return (
		(function (e) {
			if (Array.isArray(e)) return e
		})(e) ||
		(function (e, t) {
			if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(e)))
				return
			var n = [],
				r = !0,
				o = !1,
				i = void 0

			try {
				for (
					var a, c = e[Symbol.iterator]();
					!(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t);
					r = !0
				) {}
			} catch (e) {
				;(o = !0), (i = e)
			} finally {
				try {
					r || null == c['return'] || c['return']()
				} finally {
					if (o) throw i
				}
			}

			return n
		})(e, t) ||
		(function (e, t) {
			if (!e) return
			if ('string' == typeof e) return Ae(e, t)
			var n = Object.prototype.toString.call(e).slice(8, -1)
			'Object' === n && e.constructor && (n = e.constructor.name)
			if ('Map' === n || 'Set' === n) return Array.from(e)
			if (
				'Arguments' === n ||
				/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
			)
				return Ae(e, t)
		})(e, t) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}

function Ae(e, t) {
	;(null == t || t > e.length) && (t = e.length)

	for (var n = 0, r = new Array(t); n < t; n++) {
		r[n] = e[n]
	}

	return r
}

function Me() {
	return 'undefined' == typeof navigator
		? 'Ctrl'
		: /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
}

var Te = ke.forwardRef(function (e, t) {
	var n = He(
			Y(function () {
				return Me() ? '⌘' : 'Ctrl'
			}),
			2
		),
		r = n[0],
		o = n[1]
	return (
		Z(function () {
			Me() && o('⌘')
		}, []),
		ke.createElement(
			'button',
			Ne(
				{
					type: 'button',
					className: 'DocSearch DocSearch-Button',
					'aria-label': 'Search',
				},
				e,
				{
					ref: t,
				}
			),
			ke.createElement(Ie, null),
			ke.createElement(
				'span',
				{
					className: 'DocSearch-Button-Placeholder',
				},
				'Search'
			),
			ke.createElement(
				'span',
				{
					className: 'DocSearch-Button-Key',
				},
				'Ctrl' === r ? ke.createElement(De, null) : r
			),
			ke.createElement(
				'span',
				{
					className: 'DocSearch-Button-Key',
				},
				'K'
			)
		)
	)
})

function qe(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function Le(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

var Re = function Re() {},
	Fe = 0

function Ue(e) {
	return 0 === e.suggestions.length
		? 0
		: e.suggestions.reduce(function (e, t) {
				return e + t.items.length
		  }, 0)
}

function ze(e) {
	return (function (e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {}
			t % 2
				? qe(Object(n), !0).forEach(function (t) {
						Le(e, t, n[t])
				  })
				: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
				: qe(Object(n)).forEach(function (t) {
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
				  })
		}

		return e
	})(
		{
			getInputValue: function getInputValue(e) {
				return e.state.query
			},
			getSuggestionUrl: function getSuggestionUrl() {},
			onSelect: function onSelect(e) {
				;(0, e.setIsOpen)(!1)
			},
			onHighlight: Re,
		},
		e
	)
}

function Ve(e, t, n, r) {
	if (null === t && e < 0) return n - 1
	if (null !== r && 0 === t && e < 0) return n - 1
	var o = (null === t ? -1 : t) + e
	return o <= -1 || o >= n ? (null === r ? null : 0) : o
}

function Qe(e) {
	var t = e.state,
		n = (function (e) {
			var t = e.state,
				n = t.suggestions
					.map(function (e) {
						return e.items.length
					})
					.reduce(function (e, t, n) {
						var r = (e[n - 1] || 0) + t
						return e.push(r), e
					}, [])
					.reduce(function (e, n) {
						return n <= t.highlightedIndex ? e + 1 : e
					}, 0)
			return t.suggestions[n]
		})({
			state: t,
		})

	if (!n) return null

	var r =
			n.items[
				(function (e) {
					for (
						var t = e.state, n = e.suggestion, r = !1, o = 0, i = 0;
						!1 === r;

					) {
						var a = t.suggestions[o]

						if (a === n) {
							r = !0
							break
						}

						;(i += a.items.length), o++
					}

					return t.highlightedIndex - i
				})({
					state: t,
					suggestion: n,
				})
			],
		o = n.source

	return {
		item: r,
		itemValue: o.getInputValue({
			suggestion: r,
			state: t,
		}),
		itemUrl: o.getSuggestionUrl({
			suggestion: r,
			state: t,
		}),
		source: o,
	}
}

function Be(e, t) {
	return e === t || (e.contains && e.contains(t))
}

function We(e) {
	var t = e.state
	if (
		!1 === e.props.enableCompletion ||
		!1 === t.isOpen ||
		null === t.highlightedIndex ||
		'stalled' === t.status
	)
		return null
	var n = Qe({
		state: t,
	}).itemValue

	if (
		t.query.length > 0 &&
		0 === n.toLocaleLowerCase().indexOf(t.query.toLocaleLowerCase())
	) {
		var r = t.query + n.slice(t.query.length)
		return r === t.query ? null : r
	}

	return null
}

function Ke(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function Je(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? Ke(Object(n), !0).forEach(function (t) {
					$e(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: Ke(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function $e(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function Ye(e, t) {
	return {
		state: t.initialState,
		getState: function getState() {
			return this.state
		},
		send: function send(n, r) {
			;(this.state = (function (e, t) {
				return Je(
					Je({}, e),
					{},
					{
						completion: We({
							state: e,
							props: t,
						}),
					}
				)
			})(
				e(
					{
						type: n,
						value: r,
					},
					this.state,
					t
				),
				t
			)),
				t.onStateChange({
					state: this.state,
				})
		},
	}
}

function Ge(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function Ze(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? Ge(Object(n), !0).forEach(function (t) {
					Xe(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: Ge(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function Xe(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function et(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function tt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? et(Object(n), !0).forEach(function (t) {
					nt(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: et(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function nt(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function rt(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function ot(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? rt(Object(n), !0).forEach(function (t) {
					it(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: rt(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function it(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

var at = null

function ct(e) {
	var t,
		n = e.query,
		r = e.store,
		o = e.props,
		i = e.setHighlightedIndex,
		a = e.setQuery,
		c = e.setSuggestions,
		u = e.setIsOpen,
		s = e.setStatus,
		l = e.setContext,
		f = e.nextState,
		p = void 0 === f ? {} : f
	return o.onInput
		? Promise.resolve(
				o.onInput({
					query: n,
					state: r.getState(),
					setHighlightedIndex: i,
					setQuery: a,
					setSuggestions: c,
					setIsOpen: u,
					setStatus: s,
					setContext: l,
				})
		  )
		: (at && clearTimeout(at),
		  i(o.defaultHighlightedIndex),
		  a(n),
		  0 === n.length && !1 === o.openOnFocus
				? (s('idle'),
				  c(
						r.getState().suggestions.map(function (e) {
							return ot(
								ot({}, e),
								{},
								{
									items: [],
								}
							)
						})
				  ),
				  u(
						null !== (t = p.isOpen) && void 0 !== t
							? t
							: o.shouldDropdownShow({
									state: r.getState(),
							  })
				  ),
				  Promise.resolve())
				: (s('loading'),
				  (at = o.environment.setTimeout(function () {
						s('stalled')
				  }, o.stallThreshold)),
				  o
						.getSources({
							query: n,
							state: r.getState(),
							setHighlightedIndex: i,
							setQuery: a,
							setSuggestions: c,
							setIsOpen: u,
							setStatus: s,
							setContext: l,
						})
						.then(function (e) {
							return (
								s('loading'),
								Promise.all(
									e.map(function (e) {
										return Promise.resolve(
											e.getSuggestions({
												query: n,
												state: r.getState(),
												setHighlightedIndex: i,
												setQuery: a,
												setSuggestions: c,
												setIsOpen: u,
												setStatus: s,
												setContext: l,
											})
										).then(function (t) {
											return {
												source: e,
												items: t,
											}
										})
									})
								)
									.then(function (e) {
										var t
										s('idle'),
											c(e),
											u(
												null !== (t = p.isOpen) && void 0 !== t
													? t
													: (0 === n.length && o.openOnFocus) ||
															o.shouldDropdownShow({
																state: r.getState(),
															})
											)
									})
									['catch'](function (e) {
										throw (s('error'), e)
									})
									['finally'](function () {
										at && clearTimeout(at)
									})
							)
						})))
}

function ut(e, t) {
	if (null == e) return {}

	var n,
		r,
		o = (function (e, t) {
			if (null == e) return {}
			var n,
				r,
				o = {},
				i = Object.keys(e)

			for (r = 0; r < i.length; r++) {
				;(n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n])
			}

			return o
		})(e, t)

	if (Object.getOwnPropertySymbols) {
		var i = Object.getOwnPropertySymbols(e)

		for (r = 0; r < i.length; r++) {
			;(n = i[r]),
				t.indexOf(n) >= 0 ||
					(Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]))
		}
	}

	return o
}

function st(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function lt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? st(Object(n), !0).forEach(function (t) {
					ft(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: st(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function ft(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function pt(e) {
	var t = e.store,
		n = e.props,
		r = e.setHighlightedIndex,
		o = e.setQuery,
		i = e.setSuggestions,
		a = e.setIsOpen,
		c = e.setStatus,
		u = e.setContext
	return {
		getEnvironmentProps: function getEnvironmentProps(e) {
			return {
				onTouchStart: function onTouchStart(r) {
					!1 !== t.getState().isOpen &&
						r.target !== e.inputElement &&
						!1 ===
							[e.searchBoxElement, e.dropdownElement].some(function (e) {
								return (
									e &&
									(Be(e, r.target) ||
										Be(e, n.environment.document.activeElement))
								)
							}) &&
						t.send('blur', null)
				},
				onTouchMove: function onTouchMove(r) {
					!1 !== t.getState().isOpen &&
						e.inputElement === n.environment.document.activeElement &&
						r.target !== e.inputElement &&
						e.inputElement.blur()
				},
			}
		},
		getRootProps: function getRootProps(e) {
			return lt(
				{
					role: 'combobox',
					'aria-expanded': t.getState().isOpen,
					'aria-haspopup': 'listbox',
					'aria-owns': t.getState().isOpen ? ''.concat(n.id, '-menu') : void 0,
					'aria-labelledby': ''.concat(n.id, '-label'),
				},
				e
			)
		},
		getFormProps: function getFormProps(e) {
			e.inputElement
			return lt(
				{
					action: '',
					noValidate: !0,
					role: 'search',
					onSubmit: function onSubmit(s) {
						s.preventDefault(),
							n.onSubmit({
								state: t.getState(),
								setHighlightedIndex: r,
								setQuery: o,
								setSuggestions: i,
								setIsOpen: a,
								setStatus: c,
								setContext: u,
								event: s,
							}),
							t.send('submit', null),
							e.inputElement && e.inputElement.blur()
					},
					onReset: function onReset(s) {
						s.preventDefault(),
							n.openOnFocus &&
								ct({
									query: '',
									store: t,
									props: n,
									setHighlightedIndex: r,
									setQuery: o,
									setSuggestions: i,
									setIsOpen: a,
									setStatus: c,
									setContext: u,
								}),
							t.send('reset', null),
							e.inputElement && e.inputElement.focus()
					},
				},
				ut(e, ['inputElement'])
			)
		},
		getLabelProps: function getLabelProps(e) {
			return lt(
				{
					htmlFor: ''.concat(n.id, '-input'),
					id: ''.concat(n.id, '-label'),
				},
				e
			)
		},
		getInputProps: function getInputProps(e) {
			function s() {
				;(n.openOnFocus || t.getState().query.length > 0) &&
					ct({
						query: t.getState().query,
						store: t,
						props: n,
						setHighlightedIndex: r,
						setQuery: o,
						setSuggestions: i,
						setIsOpen: a,
						setStatus: c,
						setContext: u,
					}),
					t.send('focus', null)
			}

			var l = 'ontouchstart' in n.environment,
				f = e || {},
				p = (f.inputElement, f.maxLength),
				h = void 0 === p ? 512 : p,
				d = ut(f, ['inputElement', 'maxLength'])
			return lt(
				{
					'aria-autocomplete': n.enableCompletion ? 'both' : 'list',
					'aria-activedescendant':
						t.getState().isOpen && null !== t.getState().highlightedIndex
							? ''.concat(n.id, '-item-').concat(t.getState().highlightedIndex)
							: void 0,
					'aria-controls': t.getState().isOpen
						? ''.concat(n.id, '-menu')
						: void 0,
					'aria-labelledby': ''.concat(n.id, '-label'),
					value: t.getState().query,
					id: ''.concat(n.id, '-input'),
					autoComplete: 'off',
					autoCorrect: 'off',
					autoCapitalize: 'off',
					spellCheck: 'false',
					autoFocus: n.autoFocus,
					placeholder: n.placeholder,
					maxLength: h,
					type: 'search',
					onChange: function onChange(e) {
						ct({
							query: e.currentTarget.value.slice(0, h),
							store: t,
							props: n,
							setHighlightedIndex: r,
							setQuery: o,
							setSuggestions: i,
							setIsOpen: a,
							setStatus: c,
							setContext: u,
						})
					},
					onKeyDown: function onKeyDown(e) {
						!(function (e) {
							var t = e.event,
								n = e.store,
								r = e.props,
								o = e.setHighlightedIndex,
								i = e.setQuery,
								a = e.setSuggestions,
								c = e.setIsOpen,
								u = e.setStatus,
								s = e.setContext

							if ('ArrowUp' === t.key || 'ArrowDown' === t.key) {
								t.preventDefault(),
									n.send(t.key, {
										shiftKey: t.shiftKey,
									})
								var l = r.environment.document.getElementById(
									''
										.concat(r.id, '-item-')
										.concat(n.getState().highlightedIndex)
								)
								null == l || l.scrollIntoView(!1)
								var f = Qe({
									state: n.getState(),
								})

								if (null !== n.getState().highlightedIndex && f) {
									var p = f.item,
										h = f.itemValue,
										d = f.itemUrl,
										m = f.source
									m.onHighlight({
										suggestion: p,
										suggestionValue: h,
										suggestionUrl: d,
										source: m,
										state: n.getState(),
										setHighlightedIndex: o,
										setQuery: i,
										setSuggestions: a,
										setIsOpen: c,
										setStatus: u,
										setContext: s,
										event: t,
									})
								}
							} else if (
								('Tab' === t.key ||
									('ArrowRight' === t.key &&
										t.target.selectionStart === n.getState().query.length)) &&
								r.enableCompletion &&
								null !== n.getState().highlightedIndex
							) {
								t.preventDefault()
								var g = We({
									state: n.getState(),
									props: r,
								})
								g &&
									ct({
										query: g,
										store: n,
										props: r,
										setHighlightedIndex: o,
										setQuery: i,
										setSuggestions: a,
										setIsOpen: c,
										setStatus: u,
										setContext: s,
									})
							} else if ('Escape' === t.key)
								t.preventDefault(), n.send(t.key, null)
							else if ('Enter' === t.key) {
								if (
									null === n.getState().highlightedIndex ||
									n.getState().suggestions.every(function (e) {
										return 0 === e.items.length
									})
								)
									return
								t.preventDefault()
								var v = Qe({
										state: n.getState(),
									}),
									y = v.item,
									_ = v.itemValue,
									b = v.itemUrl,
									S = v.source
								t.metaKey || t.ctrlKey
									? void 0 !== b &&
									  r.navigator.navigateNewTab({
											suggestionUrl: b,
											suggestion: y,
											state: n.getState(),
									  })
									: t.shiftKey
									? void 0 !== b &&
									  r.navigator.navigateNewWindow({
											suggestionUrl: b,
											suggestion: y,
											state: n.getState(),
									  })
									: t.altKey ||
									  (ct({
											query: _,
											store: n,
											props: r,
											setHighlightedIndex: o,
											setQuery: i,
											setSuggestions: a,
											setIsOpen: c,
											setStatus: u,
											setContext: s,
											nextState: {
												isOpen: !1,
											},
									  }).then(function () {
											S.onSelect({
												suggestion: y,
												suggestionValue: _,
												suggestionUrl: b,
												source: S,
												state: n.getState(),
												setHighlightedIndex: o,
												setQuery: i,
												setSuggestions: a,
												setIsOpen: c,
												setStatus: u,
												setContext: s,
												event: t,
											})
									  }),
									  void 0 !== b &&
											r.navigator.navigate({
												suggestionUrl: b,
												suggestion: y,
												state: n.getState(),
											}))
							}
						})({
							event: e,
							store: t,
							props: n,
							setHighlightedIndex: r,
							setQuery: o,
							setSuggestions: i,
							setIsOpen: a,
							setStatus: c,
							setContext: u,
						})
					},
					onFocus: s,
					onBlur: function onBlur() {
						l || t.send('blur', null)
					},
					onClick: function onClick() {
						e.inputElement !== n.environment.document.activeElement ||
							t.getState().isOpen ||
							s()
					},
				},
				d
			)
		},
		getDropdownProps: function getDropdownProps(e) {
			return lt(
				{
					onMouseDown: function onMouseDown(e) {
						e.preventDefault()
					},
					onMouseLeave: function onMouseLeave() {
						t.send('mouseleave', null)
					},
				},
				e
			)
		},
		getMenuProps: function getMenuProps(e) {
			return lt(
				{
					role: 'listbox',
					'aria-labelledby': ''.concat(n.id, '-label'),
					id: ''.concat(n.id, '-menu'),
				},
				e
			)
		},
		getItemProps: function getItemProps(e) {
			var s = e.item,
				l = e.source,
				f = ut(e, ['item', 'source'])
			return lt(
				{
					id: ''.concat(n.id, '-item-').concat(s.__autocomplete_id),
					role: 'option',
					'aria-selected':
						t.getState().highlightedIndex === s.__autocomplete_id,
					onMouseMove: function onMouseMove(e) {
						if (s.__autocomplete_id !== t.getState().highlightedIndex) {
							t.send('mousemove', s.__autocomplete_id)
							var n = Qe({
								state: t.getState(),
							})

							if (null !== t.getState().highlightedIndex && n) {
								var l = n.item,
									f = n.itemValue,
									p = n.itemUrl,
									h = n.source
								h.onHighlight({
									suggestion: l,
									suggestionValue: f,
									suggestionUrl: p,
									source: h,
									state: t.getState(),
									setHighlightedIndex: r,
									setQuery: o,
									setSuggestions: i,
									setIsOpen: a,
									setStatus: c,
									setContext: u,
									event: e,
								})
							}
						}
					},
					onMouseDown: function onMouseDown(e) {
						e.preventDefault()
					},
					onClick: function onClick(e) {
						if (
							void 0 ===
								l.getSuggestionUrl({
									suggestion: s,
									state: t.getState(),
								}) &&
							!(function (e) {
								return (
									1 === e.button ||
									e.altKey ||
									e.ctrlKey ||
									e.metaKey ||
									e.shiftKey
								)
							})(e)
						) {
							var f = l.getInputValue({
								suggestion: s,
								state: t.getState(),
							})
							ct({
								query: f,
								store: t,
								props: n,
								setHighlightedIndex: r,
								setQuery: o,
								setSuggestions: i,
								setIsOpen: a,
								setStatus: c,
								setContext: u,
								nextState: {
									isOpen: !1,
								},
							}).then(function () {
								l.onSelect({
									suggestion: s,
									suggestionValue: f,
									suggestionUrl: l.getSuggestionUrl({
										suggestion: s,
										state: t.getState(),
									}),
									source: l,
									state: t.getState(),
									setHighlightedIndex: r,
									setQuery: o,
									setSuggestions: i,
									setIsOpen: a,
									setStatus: c,
									setContext: u,
									event: e,
								})
							})
						}
					},
				},
				f
			)
		},
	}
}

function ht(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function dt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? ht(Object(n), !0).forEach(function (t) {
					mt(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: ht(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function mt(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

var gt = function gt(e, t, n) {
	switch (e.type) {
		case 'setHighlightedIndex':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex: e.value,
				}
			)

		case 'setQuery':
			return dt(
				dt({}, t),
				{},
				{
					query: e.value,
				}
			)

		case 'setSuggestions':
			return dt(
				dt({}, t),
				{},
				{
					suggestions: e.value,
				}
			)

		case 'setIsOpen':
			return dt(
				dt({}, t),
				{},
				{
					isOpen: e.value,
				}
			)

		case 'setStatus':
			return dt(
				dt({}, t),
				{},
				{
					status: e.value,
				}
			)

		case 'setContext':
			return dt(
				dt({}, t),
				{},
				{
					context: dt(dt({}, t.context), e.value),
				}
			)

		case 'ArrowDown':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex: Ve(
						1,
						t.highlightedIndex,
						Ue(t),
						n.defaultHighlightedIndex
					),
				}
			)

		case 'ArrowUp':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex: Ve(
						-1,
						t.highlightedIndex,
						Ue(t),
						n.defaultHighlightedIndex
					),
				}
			)

		case 'Escape':
			return t.isOpen
				? dt(
						dt({}, t),
						{},
						{
							isOpen: !1,
						}
				  )
				: dt(
						dt({}, t),
						{},
						{
							query: '',
							status: 'idle',
							statusContext: {},
							suggestions: [],
						}
				  )

		case 'submit':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex: null,
					isOpen: !1,
					status: 'idle',
					statusContext: {},
				}
			)

		case 'reset':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex:
						!0 === n.openOnFocus ? n.defaultHighlightedIndex : null,
					isOpen: n.openOnFocus,
					status: 'idle',
					statusContext: {},
					query: '',
				}
			)

		case 'focus':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex: n.defaultHighlightedIndex,
					isOpen: n.openOnFocus || t.query.length > 0,
				}
			)

		case 'blur':
			return dt(
				dt({}, t),
				{},
				{
					isOpen: !1,
					highlightedIndex: null,
				}
			)

		case 'mousemove':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex: e.value,
				}
			)

		case 'mouseleave':
			return dt(
				dt({}, t),
				{},
				{
					highlightedIndex: n.defaultHighlightedIndex,
				}
			)

		default:
			return t
	}
}

function vt(e) {
	var t = (function (e) {
			var t,
				n,
				r = 'undefined' != typeof window ? window : {}
			return tt(
				tt(
					{
						openOnFocus: !1,
						placeholder: '',
						autoFocus: !1,
						defaultHighlightedIndex: null,
						enableCompletion: !1,
						stallThreshold: 300,
						environment: r,
						shouldDropdownShow: function shouldDropdownShow(e) {
							return Ue(e.state) > 0
						},
						onStateChange: Re,
						onSubmit: Re,
					},
					e
				),
				{},
				{
					id:
						null !== (t = e.id) && void 0 !== t
							? t
							: 'autocomplete-'.concat(Fe++),
					initialState: tt(
						{
							highlightedIndex: null,
							query: '',
							completion: null,
							suggestions: [],
							isOpen: !1,
							status: 'idle',
							statusContext: {},
							context: {},
						},
						e.initialState
					),
					getSources:
						((n = e.getSources),
						function (e) {
							return Promise.resolve(n(e)).then(function (e) {
								return Promise.all(
									e.filter(Boolean).map(function (e) {
										return Promise.resolve(ze(e))
									})
								)
							})
						}),
					navigator: tt(
						{
							navigate: function navigate(e) {
								var t = e.suggestionUrl
								r.location.assign(t)
							},
							navigateNewTab: function navigateNewTab(e) {
								var t = e.suggestionUrl,
									n = r.open(t, '_blank', 'noopener')
								n && n.focus()
							},
							navigateNewWindow: function navigateNewWindow(e) {
								var t = e.suggestionUrl
								r.open(t, '_blank', 'noopener')
							},
						},
						e.navigator
					),
				}
			)
		})(e),
		n = Ye(gt, t),
		r = (function (e) {
			var t = e.store
			return {
				setHighlightedIndex: function setHighlightedIndex(e) {
					t.send('setHighlightedIndex', e)
				},
				setQuery: function setQuery(e) {
					t.send('setQuery', e)
				},
				setSuggestions: function setSuggestions(e) {
					var n = 0,
						r = e.map(function (e) {
							return Ze(
								Ze({}, e),
								{},
								{
									items: e.items.map(function (e) {
										return Ze(
											Ze({}, e),
											{},
											{
												__autocomplete_id: n++,
											}
										)
									}),
								}
							)
						})
					t.send('setSuggestions', r)
				},
				setIsOpen: function setIsOpen(e) {
					t.send('setIsOpen', e)
				},
				setStatus: function setStatus(e) {
					t.send('setStatus', e)
				},
				setContext: function setContext(e) {
					t.send('setContext', e)
				},
			}
		})({
			store: n,
		}),
		o = r.setHighlightedIndex,
		i = r.setQuery,
		a = r.setSuggestions,
		c = r.setIsOpen,
		u = r.setStatus,
		s = r.setContext,
		l = pt({
			store: n,
			props: t,
			setHighlightedIndex: o,
			setQuery: i,
			setSuggestions: a,
			setIsOpen: c,
			setStatus: u,
			setContext: s,
		}),
		f = l.getEnvironmentProps,
		p = l.getRootProps,
		h = l.getFormProps,
		d = l.getLabelProps,
		m = l.getInputProps,
		g = l.getDropdownProps,
		v = l.getMenuProps,
		y = l.getItemProps

	return {
		setHighlightedIndex: o,
		setQuery: i,
		setSuggestions: a,
		setIsOpen: c,
		setStatus: u,
		setContext: s,
		getEnvironmentProps: f,
		getRootProps: p,
		getFormProps: h,
		getInputProps: m,
		getLabelProps: d,
		getDropdownProps: g,
		getMenuProps: v,
		getItemProps: y,
		refresh: function refresh() {
			return ct({
				query: n.getState().query,
				store: n,
				props: t,
				setHighlightedIndex: o,
				setQuery: i,
				setSuggestions: a,
				setIsOpen: c,
				setStatus: u,
				setContext: s,
			})
		},
	}
}

function yt(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function _t(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? yt(Object(n), !0).forEach(function (t) {
					bt(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: yt(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function bt(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function St(e) {
	return (function (e) {
		var t = e.searchClient,
			n = e.queries
		return (
			'function' == typeof t.addAlgoliaAgent &&
				t.addAlgoliaAgent('autocomplete-core', '1.0.0-alpha.28'),
			t.search(
				n.map(function (e) {
					return {
						indexName: e.indexName,
						query: e.query,
						params: _t(
							{
								hitsPerPage: 5,
								highlightPreTag: '<mark>',
								highlightPostTag: '</mark>',
							},
							e.params
						),
					}
				})
			)
		)
	})({
		searchClient: e.searchClient,
		queries: e.queries,
	}).then(function (e) {
		return e.results
	})
}

function Ot() {
	return ke.createElement(
		'a',
		{
			href: 'https://www.algolia.com/docsearch',
			target: '_blank',
			rel: 'noopener noreferrer',
		},
		ke.createElement(
			'span',
			{
				className: 'DocSearch-Label',
			},
			'Search by'
		),
		ke.createElement(
			'svg',
			{
				width: '77',
				height: '19',
			},
			ke.createElement('path', {
				d:
					'M2.5067 0h14.0245c1.384.001 2.5058 1.1205 2.5068 2.5017V16.5c-.0014 1.3808-1.1232 2.4995-2.5068 2.5H2.5067C1.1232 18.9995.0014 17.8808 0 16.5V2.4958A2.495 2.495 0 01.735.7294 2.505 2.505 0 012.5068 0zM37.95 15.0695c-3.7068.0168-3.7068-2.986-3.7068-3.4634L34.2372.3576 36.498 0v11.1794c0 .2715 0 1.9889 1.452 1.994v1.8961zm-9.1666-1.8388c.694 0 1.2086-.0397 1.5678-.1088v-2.2934a5.3639 5.3639 0 00-1.3303-.1679 4.8283 4.8283 0 00-.758.0582 2.2845 2.2845 0 00-.688.2024c-.2029.0979-.371.2362-.4919.4142-.1268.1788-.185.2826-.185.5533 0 .5297.185.8359.5205 1.0375.3355.2016.7928.3053 1.365.3053v-.0008zm-.1969-8.1817c.7463 0 1.3768.092 1.8856.2767.5088.1838.9195.4428 1.2204.7717.3068.334.5147.7777.6423 1.251.1327.4723.196.991.196 1.5603v5.798c-.5235.1036-1.05.192-1.5787.2649-.7048.1037-1.4976.156-2.3774.156-.5832 0-1.1215-.0582-1.6016-.167a3.385 3.385 0 01-1.2432-.5364 2.6034 2.6034 0 01-.8037-.9565c-.191-.3922-.29-.9447-.29-1.5208 0-.5533.11-.905.3246-1.2863a2.7351 2.7351 0 01.8849-.9329c.376-.242.8029-.415 1.2948-.5187a7.4517 7.4517 0 011.5381-.156 7.1162 7.1162 0 011.6667.2024V8.886c0-.259-.0296-.5061-.093-.7372a1.5847 1.5847 0 00-.3245-.6158 1.5079 1.5079 0 00-.6119-.4158 2.6788 2.6788 0 00-.966-.173c-.5206 0-.9948.0634-1.4283.1384a6.5481 6.5481 0 00-1.065.259l-.2712-1.849c.2831-.0986.7048-.1964 1.2491-.2943a9.2979 9.2979 0 011.752-.1501v.0008zm44.6597 8.1193c.6947 0 1.2086-.0405 1.567-.1097v-2.2942a5.3743 5.3743 0 00-1.3303-.1679c-.2485 0-.503.0177-.7573.0582a2.2853 2.2853 0 00-.688.2024 1.2333 1.2333 0 00-.4918.4142c-.1268.1788-.1843.2826-.1843.5533 0 .5297.1843.8359.5198 1.0375.3414.2066.7927.3053 1.365.3053v.0009zm-.191-8.1767c.7463 0 1.3768.0912 1.8856.2759.5087.1847.9195.4436 1.2204.7717.3.329.5147.7786.6414 1.251a5.7248 5.7248 0 01.197 1.562v5.7972c-.3466.0742-.874.1602-1.5788.2648-.7049.1038-1.4976.1552-2.3774.1552-.5832 0-1.1215-.0573-1.6016-.167a3.385 3.385 0 01-1.2432-.5356 2.6034 2.6034 0 01-.8038-.9565c-.191-.3922-.2898-.9447-.2898-1.5216 0-.5533.1098-.905.3245-1.2854a2.7373 2.7373 0 01.8849-.9338c.376-.2412.8029-.4141 1.2947-.5178a7.4545 7.4545 0 012.325-.1097c.2781.0287.5672.081.879.156v-.3686a2.7781 2.7781 0 00-.092-.738 1.5788 1.5788 0 00-.3246-.6166 1.5079 1.5079 0 00-.612-.415 2.6797 2.6797 0 00-.966-.1729c-.5205 0-.9947.0633-1.4282.1384a6.5608 6.5608 0 00-1.065.259l-.2712-1.8498c.283-.0979.7048-.1957 1.2491-.2935a9.8597 9.8597 0 011.752-.1494zm-6.79-1.072c-.7576.001-1.373-.6103-1.3759-1.3664 0-.755.6128-1.3664 1.376-1.3664.764 0 1.3775.6115 1.3775 1.3664s-.6195 1.3664-1.3776 1.3664zm1.1393 11.1507h-2.2726V5.3409l2.2734-.3568v10.0845l-.0008.0017zm-3.984 0c-3.707.0168-3.707-2.986-3.707-3.4642L59.7069.3576 61.9685 0v11.1794c0 .2715 0 1.9889 1.452 1.994V15.0703zm-7.3512-4.979c0-.975-.2138-1.7873-.6305-2.3516-.4167-.571-.9998-.852-1.747-.852-.7454 0-1.3302.281-1.7452.852-.4166.5702-.6195 1.3765-.6195 2.3516 0 .9851.208 1.6473.6254 2.2183.4158.576.9998.8587 1.7461.8587.7454 0 1.3303-.2885 1.747-.8595.4158-.5761.6237-1.2315.6237-2.2184v.0009zm2.3132-.006c0 .7609-.1099 1.3361-.3356 1.9654a4.654 4.654 0 01-.9533 1.6076A4.214 4.214 0 0155.613 14.69c-.579.2412-1.4697.3795-1.9143.3795-.4462-.005-1.3303-.1324-1.9033-.3795a4.307 4.307 0 01-1.474-1.0316c-.4115-.4445-.7293-.9801-.9609-1.6076a5.3423 5.3423 0 01-.3465-1.9653c0-.7608.104-1.493.3356-2.1155a4.683 4.683 0 01.9719-1.5958 4.3383 4.3383 0 011.479-1.0257c.5739-.242 1.2043-.3567 1.8864-.3567.6829 0 1.3125.1197 1.8906.3567a4.1245 4.1245 0 011.4816 1.0257 4.7587 4.7587 0 01.9592 1.5958c.2426.6225.3643 1.3547.3643 2.1155zm-17.0198 0c0 .9448.208 1.9932.6238 2.431.4166.4386.955.6579 1.6142.6579.3584 0 .6998-.0523 1.0176-.1502.3186-.0978.5721-.2134.775-.3517V7.0784a8.8706 8.8706 0 00-1.4926-.1906c-.8206-.0236-1.4452.312-1.8847.8468-.4335.5365-.6533 1.476-.6533 2.3516v-.0008zm6.2863 4.4485c0 1.5385-.3938 2.662-1.1866 3.3773-.791.7136-2.0005 1.0712-3.6308 1.0712-.5958 0-1.834-.1156-2.8228-.334l.3643-1.7865c.8282.173 1.9202.2193 2.4932.2193.9077 0 1.555-.1847 1.943-.5533.388-.3686.578-.916.578-1.643v-.3687a6.8289 6.8289 0 01-.8848.3349c-.3634.1096-.786.167-1.261.167-.6246 0-1.1917-.0979-1.7055-.2944a3.5554 3.5554 0 01-1.3244-.8645c-.3642-.3796-.6541-.8579-.8561-1.4289-.2028-.571-.3068-1.59-.3068-2.339 0-.7034.1099-1.5856.3245-2.1735.2198-.5871.5316-1.0949.9542-1.515.4167-.42.9255-.743 1.5213-.98a5.5923 5.5923 0 012.052-.3855c.7353 0 1.4114.092 2.0707.2024.6592.1088 1.2204.2236 1.6776.35v8.945-.0008zM11.5026 4.2418v-.6511c-.0005-.4553-.3704-.8241-.8266-.8241H8.749c-.4561 0-.826.3688-.8265.824v.669c0 .0742.0693.1264.1445.1096a6.0346 6.0346 0 011.6768-.2362 6.125 6.125 0 011.6202.2185.1116.1116 0 00.1386-.1097zm-5.2806.852l-.3296-.3282a.8266.8266 0 00-1.168 0l-.393.3922a.8199.8199 0 000 1.164l.3237.323c.0524.0515.1268.0397.1733-.0117.191-.259.3989-.507.6305-.7372.2374-.2362.48-.4437.7462-.6335.0575-.0354.0634-.1155.017-.1687zm3.5159 2.069v2.818c0 .081.0879.1392.1622.0987l2.5102-1.2964c.0574-.0287.0752-.0987.0464-.1552a3.1237 3.1237 0 00-2.603-1.574c-.0575 0-.115.0456-.115.1097l-.0008-.0009zm.0008 6.789c-2.0933.0005-3.7915-1.6912-3.7947-3.7804C5.9468 8.0821 7.6452 6.39 9.7387 6.391c2.0932-.0005 3.7911 1.6914 3.794 3.7804a3.7783 3.7783 0 01-1.1124 2.675 3.7936 3.7936 0 01-2.6824 1.1054h.0008zM9.738 4.8002c-1.9218 0-3.6975 1.0232-4.6584 2.6841a5.359 5.359 0 000 5.3683c.9609 1.661 2.7366 2.6841 4.6584 2.6841a5.3891 5.3891 0 003.8073-1.5725 5.3675 5.3675 0 001.578-3.7987 5.3574 5.3574 0 00-1.5771-3.797A5.379 5.379 0 009.7387 4.801l-.0008-.0008z',
				fill: 'currentColor',
				fillRule: 'evenodd',
			})
		)
	)
}

function Et() {
	return ke.createElement(
		ke.Fragment,
		null,
		ke.createElement(
			'div',
			{
				className: 'DocSearch-Logo',
			},
			ke.createElement(Ot, null)
		),
		ke.createElement(
			'ul',
			{
				className: 'DocSearch-Commands',
			},
			ke.createElement(
				'li',
				null,
				ke.createElement(
					'span',
					{
						className: 'DocSearch-Commands-Key',
					},
					ke.createElement(
						wt,
						null,
						ke.createElement('path', {
							d: 'M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3',
						})
					)
				),
				ke.createElement(
					'span',
					{
						className: 'DocSearch-Label',
					},
					'to select'
				)
			),
			ke.createElement(
				'li',
				null,
				ke.createElement(
					'span',
					{
						className: 'DocSearch-Commands-Key',
					},
					ke.createElement(
						wt,
						null,
						ke.createElement('path', {
							d: 'M7.5 3.5v8M10.5 8.5l-3 3-3-3',
						})
					)
				),
				ke.createElement(
					'span',
					{
						className: 'DocSearch-Commands-Key',
					},
					ke.createElement(
						wt,
						null,
						ke.createElement('path', {
							d: 'M7.5 11.5v-8M10.5 6.5l-3-3-3 3',
						})
					)
				),
				ke.createElement(
					'span',
					{
						className: 'DocSearch-Label',
					},
					'to navigate'
				)
			),
			ke.createElement(
				'li',
				null,
				ke.createElement(
					'span',
					{
						className: 'DocSearch-Commands-Key',
					},
					ke.createElement(
						wt,
						null,
						ke.createElement('path', {
							d:
								'M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956',
						})
					)
				),
				ke.createElement(
					'span',
					{
						className: 'DocSearch-Label',
					},
					'to close'
				)
			)
		)
	)
}

function wt(e) {
	return ke.createElement(
		'svg',
		{
			width: '15',
			height: '15',
		},
		ke.createElement(
			'g',
			{
				fill: 'none',
				stroke: 'currentColor',
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeWidth: '1.2',
			},
			e.children
		)
	)
}

function Pt(e) {
	var t = e.hit,
		n = e.children
	return ke.createElement(
		'a',
		{
			href: t.url,
		},
		n
	)
}

function jt() {
	return ke.createElement(
		'svg',
		{
			viewBox: '0 0 38 38',
			stroke: 'currentColor',
			strokeOpacity: '.5',
		},
		ke.createElement(
			'g',
			{
				fill: 'none',
				fillRule: 'evenodd',
			},
			ke.createElement(
				'g',
				{
					transform: 'translate(1 1)',
					strokeWidth: '2',
				},
				ke.createElement('circle', {
					strokeOpacity: '.3',
					cx: '18',
					cy: '18',
					r: '18',
				}),
				ke.createElement(
					'path',
					{
						d: 'M36 18c0-9.94-8.06-18-18-18',
					},
					ke.createElement('animateTransform', {
						attributeName: 'transform',
						type: 'rotate',
						from: '0 18 18',
						to: '360 18 18',
						dur: '1s',
						repeatCount: 'indefinite',
					})
				)
			)
		)
	)
}

function Ct() {
	return ke.createElement(
		'svg',
		{
			width: '20',
			height: '20',
			viewBox: '0 0 20 20',
		},
		ke.createElement(
			'g',
			{
				stroke: 'currentColor',
				fill: 'none',
				fillRule: 'evenodd',
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
			},
			ke.createElement('path', {
				d: 'M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0',
			}),
			ke.createElement('path', {
				d: 'M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13',
			})
		)
	)
}

function xt() {
	return ke.createElement(
		'svg',
		{
			width: '20',
			height: '20',
			viewBox: '0 0 20 20',
		},
		ke.createElement('path', {
			d:
				'M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z',
			stroke: 'currentColor',
			fill: 'none',
			fillRule: 'evenodd',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		})
	)
}

function kt() {
	return ke.createElement(
		'svg',
		{
			className: 'DocSearch-Hit-Select-Icon',
			width: '20',
			height: '20',
			viewBox: '0 0 20 20',
		},
		ke.createElement(
			'g',
			{
				stroke: 'currentColor',
				fill: 'none',
				fillRule: 'evenodd',
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
			},
			ke.createElement('path', {
				d: 'M18 3v4c0 2-2 4-4 4H2',
			}),
			ke.createElement('path', {
				d: 'M8 17l-6-6 6-6',
			})
		)
	)
}

function Dt(e) {
	switch (e.type) {
		case 'lvl1':
			return ke.createElement(It, null)

		case 'content':
			return ke.createElement(Ht, null)

		default:
			return ke.createElement(Nt, null)
	}
}

function It() {
	return ke.createElement(
		'svg',
		{
			width: '20',
			height: '20',
			viewBox: '0 0 20 20',
		},
		ke.createElement('path', {
			d:
				'M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4',
			stroke: 'currentColor',
			fill: 'none',
			fillRule: 'evenodd',
			strokeLinejoin: 'round',
		})
	)
}

function Nt() {
	return ke.createElement(
		'svg',
		{
			width: '20',
			height: '20',
			viewBox: '0 0 20 20',
		},
		ke.createElement('path', {
			d: 'M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z',
			stroke: 'currentColor',
			fill: 'none',
			fillRule: 'evenodd',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		})
	)
}

function Ht() {
	return ke.createElement(
		'svg',
		{
			width: '20',
			height: '20',
			viewBox: '0 0 20 20',
		},
		ke.createElement('path', {
			d: 'M17 5H3h14zm0 5H3h14zm0 5H3h14z',
			stroke: 'currentColor',
			fill: 'none',
			fillRule: 'evenodd',
			strokeLinejoin: 'round',
		})
	)
}

function At() {
	return ke.createElement(
		'svg',
		{
			width: '20',
			height: '20',
			viewBox: '0 0 20 20',
		},
		ke.createElement('path', {
			d: 'M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z',
			stroke: 'currentColor',
			fill: 'none',
			fillRule: 'evenodd',
			strokeLinejoin: 'round',
		})
	)
}

function Mt() {
	return ke.createElement(
		'svg',
		{
			width: '40',
			height: '40',
			viewBox: '0 0 20 20',
			fill: 'none',
			fillRule: 'evenodd',
			stroke: 'currentColor',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		},
		ke.createElement('path', {
			d:
				'M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0',
		})
	)
}

function Tt() {
	return ke.createElement(
		'svg',
		{
			width: '40',
			height: '40',
			viewBox: '0 0 20 20',
			fill: 'none',
			fillRule: 'evenodd',
			stroke: 'currentColor',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
		},
		ke.createElement('path', {
			d:
				'M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2',
		})
	)
}

function qt() {
	return ke.createElement(
		'div',
		{
			className: 'DocSearch-ErrorScreen',
		},
		ke.createElement(
			'div',
			{
				className: 'DocSearch-Screen-Icon',
			},
			ke.createElement(Mt, null)
		),
		ke.createElement(
			'p',
			{
				className: 'DocSearch-Title',
			},
			'Unable to fetch results'
		),
		ke.createElement(
			'p',
			{
				className: 'DocSearch-Help',
			},
			'You might want to check your network connection.'
		)
	)
}

function Lt(e) {
	return (
		(function (e) {
			if (Array.isArray(e)) return Rt(e)
		})(e) ||
		(function (e) {
			if ('undefined' != typeof Symbol && Symbol.iterator in Object(e))
				return Array.from(e)
		})(e) ||
		(function (e, t) {
			if (!e) return
			if ('string' == typeof e) return Rt(e, t)
			var n = Object.prototype.toString.call(e).slice(8, -1)
			'Object' === n && e.constructor && (n = e.constructor.name)
			if ('Map' === n || 'Set' === n) return Array.from(e)
			if (
				'Arguments' === n ||
				/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
			)
				return Rt(e, t)
		})(e) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}

function Rt(e, t) {
	;(null == t || t > e.length) && (t = e.length)

	for (var n = 0, r = new Array(t); n < t; n++) {
		r[n] = e[n]
	}

	return r
}

function Ft(e) {
	var t = e.state.context.searchSuggestions
	return ke.createElement(
		'div',
		{
			className: 'DocSearch-NoResults',
		},
		ke.createElement(
			'div',
			{
				className: 'DocSearch-Screen-Icon',
			},
			ke.createElement(Tt, null)
		),
		ke.createElement(
			'p',
			{
				className: 'DocSearch-Title',
			},
			'No results for "',
			ke.createElement('strong', null, e.state.query),
			'"'
		),
		t &&
			t.length > 0 &&
			ke.createElement(
				'div',
				{
					className: 'DocSearch-NoResults-Prefill-List',
				},
				ke.createElement(
					'p',
					{
						className: 'DocSearch-Help',
					},
					'Try searching for:'
				),
				ke.createElement(
					'ul',
					null,
					t.slice(0, 3).reduce(function (t, n) {
						return [].concat(Lt(t), [
							ke.createElement(
								'li',
								{
									key: n,
								},
								ke.createElement(
									'button',
									{
										className: 'DocSearch-Prefill',
										key: n,
										onClick: function onClick() {
											e.setQuery(n.toLowerCase() + ' '),
												e.refresh(),
												e.inputRef.current.focus()
										},
									},
									n
								)
							),
						])
					}, [])
				)
			),
		ke.createElement(
			'p',
			{
				className: 'DocSearch-Help',
			},
			'Believe this query should return results?',
			' ',
			ke.createElement(
				'a',
				{
					href: 'https://github.com/algolia/docsearch-configs/issues/new?template=Missing_results.md&title=['
						.concat(e.indexName, ']+Missing+results+for+query+"')
						.concat(e.state.query, '"'),
					target: '_blank',
					rel: 'noopener noreferrer',
				},
				'Let us know'
			),
			'.'
		)
	)
}

function Ut(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function zt(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? Ut(Object(n), !0).forEach(function (t) {
					Vt(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: Ut(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function Vt(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function Qt(e, t) {
	if (null == e) return {}

	var n,
		r,
		o = (function (e, t) {
			if (null == e) return {}
			var n,
				r,
				o = {},
				i = Object.keys(e)

			for (r = 0; r < i.length; r++) {
				;(n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n])
			}

			return o
		})(e, t)

	if (Object.getOwnPropertySymbols) {
		var i = Object.getOwnPropertySymbols(e)

		for (r = 0; r < i.length; r++) {
			;(n = i[r]),
				t.indexOf(n) >= 0 ||
					(Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]))
		}
	}

	return o
}

function Bt(e, t) {
	return t.split('.').reduce(function (e, t) {
		return e && e[t]
	}, e)
}

function Wt(e) {
	var t = e.hit,
		n = e.attribute,
		r = e.tagName
	return b(
		void 0 === r ? 'span' : r,
		zt(
			zt({}, Qt(e, ['hit', 'attribute', 'tagName'])),
			{},
			{
				dangerouslySetInnerHTML: {
					__html: Bt(t, '_snippetResult.'.concat(n, '.value')) || Bt(t, n),
				},
			}
		)
	)
}

function Kt(e, t) {
	return (
		(function (e) {
			if (Array.isArray(e)) return e
		})(e) ||
		(function (e, t) {
			if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(e)))
				return
			var n = [],
				r = !0,
				o = !1,
				i = void 0

			try {
				for (
					var a, c = e[Symbol.iterator]();
					!(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t);
					r = !0
				) {}
			} catch (e) {
				;(o = !0), (i = e)
			} finally {
				try {
					r || null == c['return'] || c['return']()
				} finally {
					if (o) throw i
				}
			}

			return n
		})(e, t) ||
		(function (e, t) {
			if (!e) return
			if ('string' == typeof e) return Jt(e, t)
			var n = Object.prototype.toString.call(e).slice(8, -1)
			'Object' === n && e.constructor && (n = e.constructor.name)
			if ('Map' === n || 'Set' === n) return Array.from(e)
			if (
				'Arguments' === n ||
				/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
			)
				return Jt(e, t)
		})(e, t) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}

function Jt(e, t) {
	;(null == t || t > e.length) && (t = e.length)

	for (var n = 0, r = new Array(t); n < t; n++) {
		r[n] = e[n]
	}

	return r
}

function $t() {
	return ($t =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function Yt(e) {
	return e.suggestion && 0 !== e.suggestion.items.length
		? ke.createElement(
				'section',
				{
					className: 'DocSearch-Hits',
				},
				ke.createElement(
					'div',
					{
						className: 'DocSearch-Hit-source',
					},
					e.title
				),
				ke.createElement(
					'ul',
					e.getMenuProps(),
					e.suggestion.items.map(function (t, n) {
						return ke.createElement(
							Gt,
							$t(
								{
									key: [e.title, t.objectID].join(':'),
									item: t,
									index: n,
								},
								e
							)
						)
					})
				)
		  )
		: null
}

function Gt(e) {
	var t = e.item,
		n = e.index,
		r = e.renderIcon,
		o = e.renderAction,
		i = e.getItemProps,
		a = e.onItemClick,
		c = e.suggestion,
		u = e.hitComponent,
		s = Kt(ke.useState(!1), 2),
		l = s[0],
		f = s[1],
		p = Kt(ke.useState(!1), 2),
		h = p[0],
		d = p[1],
		m = ke.useRef(null),
		g = u
	return ke.createElement(
		'li',
		$t(
			{
				className: [
					'DocSearch-Hit',
					t.__docsearch_parent && 'DocSearch-Hit--Child',
					l && 'DocSearch-Hit--deleting',
					h && 'DocSearch-Hit--favoriting',
				]
					.filter(Boolean)
					.join(' '),
				onTransitionEnd: function onTransitionEnd() {
					m.current && m.current()
				},
			},
			i({
				item: t,
				source: c.source,
				onClick: function onClick() {
					a(t)
				},
			})
		),
		ke.createElement(
			g,
			{
				hit: t,
			},
			ke.createElement(
				'div',
				{
					className: 'DocSearch-Hit-Container',
				},
				r({
					item: t,
					index: n,
				}),
				t.hierarchy[t.type] &&
					'lvl1' === t.type &&
					ke.createElement(
						'div',
						{
							className: 'DocSearch-Hit-content-wrapper',
						},
						ke.createElement(Wt, {
							className: 'DocSearch-Hit-title',
							hit: t,
							attribute: 'hierarchy.lvl1',
						}),
						t.content &&
							ke.createElement(Wt, {
								className: 'DocSearch-Hit-path',
								hit: t,
								attribute: 'content',
							})
					),
				t.hierarchy[t.type] &&
					('lvl2' === t.type ||
						'lvl3' === t.type ||
						'lvl4' === t.type ||
						'lvl5' === t.type ||
						'lvl6' === t.type) &&
					ke.createElement(
						'div',
						{
							className: 'DocSearch-Hit-content-wrapper',
						},
						ke.createElement(Wt, {
							className: 'DocSearch-Hit-title',
							hit: t,
							attribute: 'hierarchy.'.concat(t.type),
						}),
						ke.createElement(Wt, {
							className: 'DocSearch-Hit-path',
							hit: t,
							attribute: 'hierarchy.lvl1',
						})
					),
				'content' === t.type &&
					ke.createElement(
						'div',
						{
							className: 'DocSearch-Hit-content-wrapper',
						},
						ke.createElement(Wt, {
							className: 'DocSearch-Hit-title',
							hit: t,
							attribute: 'content',
						}),
						ke.createElement(Wt, {
							className: 'DocSearch-Hit-path',
							hit: t,
							attribute: 'hierarchy.lvl1',
						})
					),
				o({
					item: t,
					runDeleteTransition: function runDeleteTransition(e) {
						f(!0), (m.current = e)
					},
					runFavoriteTransition: function runFavoriteTransition(e) {
						d(!0), (m.current = e)
					},
				})
			)
		)
	)
}

function Zt() {
	return (Zt =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function Xt(e) {
	return ke.createElement(
		'div',
		{
			className: 'DocSearch-Dropdown-Container',
		},
		e.state.suggestions.map(function (t, n) {
			if (0 === t.items.length) return null
			var r = t.items[0].hierarchy.lvl0
			return ke.createElement(
				Yt,
				Zt({}, e, {
					key: n,
					title: r,
					suggestion: t,
					renderIcon: function renderIcon(e) {
						var n,
							r = e.item,
							o = e.index
						return ke.createElement(
							ke.Fragment,
							null,
							r.__docsearch_parent &&
								ke.createElement(
									'svg',
									{
										className: 'DocSearch-Hit-Tree',
										viewBox: '0 0 24 54',
									},
									ke.createElement(
										'g',
										{
											stroke: 'currentColor',
											fill: 'none',
											fillRule: 'evenodd',
											strokeLinecap: 'round',
											strokeLinejoin: 'round',
										},
										r.__docsearch_parent !==
											(null === (n = t.items[o + 1]) || void 0 === n
												? void 0
												: n.__docsearch_parent)
											? ke.createElement('path', {
													d: 'M8 6v21M20 27H8.3',
											  })
											: ke.createElement('path', {
													d: 'M8 6v42M20 27H8.3',
											  })
									)
								),
							ke.createElement(
								'div',
								{
									className: 'DocSearch-Hit-icon',
								},
								ke.createElement(Dt, {
									type: r.type,
								})
							)
						)
					},
					renderAction: function renderAction() {
						return ke.createElement(
							'div',
							{
								className: 'DocSearch-Hit-action',
							},
							ke.createElement(kt, null)
						)
					},
				})
			)
		}),
		e.resultsFooterComponent &&
			ke.createElement(
				'section',
				{
					className: 'DocSearch-HitsFooter',
				},
				ke.createElement(e.resultsFooterComponent, {
					state: e.state,
				})
			)
	)
}

function en() {
	return (en =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function tn(e) {
	return 'idle' === e.state.status && !1 === e.hasSuggestions
		? e.disableUserPersonalization
			? null
			: ke.createElement(
					'div',
					{
						className: 'DocSearch-StartScreen',
					},
					ke.createElement(
						'p',
						{
							className: 'DocSearch-Help',
						},
						'No recent searches'
					)
			  )
		: !1 === e.hasSuggestions
		? null
		: ke.createElement(
				'div',
				{
					className: 'DocSearch-Dropdown-Container',
				},
				ke.createElement(
					Yt,
					en({}, e, {
						title: 'Recent',
						suggestion: e.state.suggestions[0],
						renderIcon: function renderIcon() {
							return ke.createElement(
								'div',
								{
									className: 'DocSearch-Hit-icon',
								},
								ke.createElement(Ct, null)
							)
						},
						renderAction: function renderAction(t) {
							var n = t.item,
								r = t.runFavoriteTransition,
								o = t.runDeleteTransition
							return ke.createElement(
								ke.Fragment,
								null,
								ke.createElement(
									'div',
									{
										className: 'DocSearch-Hit-action',
									},
									ke.createElement(
										'button',
										{
											className: 'DocSearch-Hit-action-button',
											title: 'Save this search',
											onClick: function onClick(t) {
												t.preventDefault(),
													t.stopPropagation(),
													r(function () {
														e.favoriteSearches.add(n),
															e.recentSearches.remove(n),
															e.refresh()
													})
											},
										},
										ke.createElement(At, null)
									)
								),
								ke.createElement(
									'div',
									{
										className: 'DocSearch-Hit-action',
									},
									ke.createElement(
										'button',
										{
											className: 'DocSearch-Hit-action-button',
											title: 'Remove this search from history',
											onClick: function onClick(t) {
												t.preventDefault(),
													t.stopPropagation(),
													o(function () {
														e.recentSearches.remove(n), e.refresh()
													})
											},
										},
										ke.createElement(xt, null)
									)
								)
							)
						},
					})
				),
				ke.createElement(
					Yt,
					en({}, e, {
						title: 'Favorites',
						suggestion: e.state.suggestions[1],
						renderIcon: function renderIcon() {
							return ke.createElement(
								'div',
								{
									className: 'DocSearch-Hit-icon',
								},
								ke.createElement(At, null)
							)
						},
						renderAction: function renderAction(t) {
							var n = t.item,
								r = t.runDeleteTransition
							return ke.createElement(
								'div',
								{
									className: 'DocSearch-Hit-action',
								},
								ke.createElement(
									'button',
									{
										className: 'DocSearch-Hit-action-button',
										title: 'Remove this search from favorites',
										onClick: function onClick(t) {
											t.preventDefault(),
												t.stopPropagation(),
												r(function () {
													e.favoriteSearches.remove(n), e.refresh()
												})
										},
									},
									ke.createElement(xt, null)
								)
							)
						},
					})
				)
		  )
}

function nn() {
	return (nn =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

var rn = ke.memo(
	function (e) {
		if ('error' === e.state.status) return ke.createElement(qt, null)
		var t = e.state.suggestions.some(function (e) {
			return e.items.length > 0
		})
		return e.state.query
			? !1 === t
				? ke.createElement(Ft, e)
				: ke.createElement(Xt, e)
			: ke.createElement(
					tn,
					nn({}, e, {
						hasSuggestions: t,
					})
			  )
	},
	function (e, t) {
		return 'loading' === t.state.status || 'stalled' === t.state.status
	}
)

function on() {
	return (on =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function an(e) {
	var t = e.getFormProps({
		inputElement: e.inputRef.current,
	}).onReset
	return (
		ke.useEffect(
			function () {
				e.autoFocus && e.inputRef.current && e.inputRef.current.focus()
			},
			[e.autoFocus, e.inputRef]
		),
		ke.createElement(
			ke.Fragment,
			null,
			ke.createElement(
				'form',
				{
					action: '',
					role: 'search',
					noValidate: !0,
					className: 'DocSearch-Form',
					onSubmit: function onSubmit(e) {
						e.preventDefault()
					},
					onReset: t,
				},
				ke.createElement(
					'label',
					on(
						{
							className: 'DocSearch-MagnifierLabel',
						},
						e.getLabelProps()
					),
					ke.createElement(Ie, null)
				),
				ke.createElement(
					'div',
					{
						className: 'DocSearch-LoadingIndicator',
					},
					ke.createElement(jt, null)
				),
				ke.createElement(
					'input',
					on(
						{
							className: 'DocSearch-Input',
							ref: e.inputRef,
						},
						e.getInputProps({
							inputElement: e.inputRef.current,
							autoFocus: e.autoFocus,
							maxLength: 64,
							enterkeyhint: 'go',
						})
					)
				),
				ke.createElement(
					'button',
					{
						type: 'reset',
						title: 'Clear the query',
						className: 'DocSearch-Reset',
						hidden: !e.state.query,
						onClick: t,
					},
					ke.createElement(xt, null)
				)
			),
			ke.createElement(
				'button',
				{
					className: 'DocSearch-Cancel',
					onClick: e.onClose,
				},
				'Cancel'
			)
		)
	)
}

function cn(e, t) {
	if (null == e) return {}

	var n,
		r,
		o = (function (e, t) {
			if (null == e) return {}
			var n,
				r,
				o = {},
				i = Object.keys(e)

			for (r = 0; r < i.length; r++) {
				;(n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n])
			}

			return o
		})(e, t)

	if (Object.getOwnPropertySymbols) {
		var i = Object.getOwnPropertySymbols(e)

		for (r = 0; r < i.length; r++) {
			;(n = i[r]),
				t.indexOf(n) >= 0 ||
					(Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]))
		}
	}

	return o
}

function un(e) {
	return !1 ===
		(function () {
			var e = '__TEST_KEY__'

			try {
				return localStorage.setItem(e, ''), localStorage.removeItem(e), !0
			} catch (e) {
				return !1
			}
		})()
		? {
				setItem: function setItem() {},
				getItem: function getItem() {
					return []
				},
		  }
		: {
				setItem: function setItem(t) {
					return window.localStorage.setItem(e, JSON.stringify(t))
				},
				getItem: function getItem() {
					var t = window.localStorage.getItem(e)
					return t ? JSON.parse(t) : []
				},
		  }
}

function sn(e) {
	var t = e.key,
		n = e.limit,
		r = void 0 === n ? 5 : n,
		o = un(t),
		i = o.getItem().slice(0, r)
	return {
		add: function add(e) {
			var t = e,
				n =
					(t._highlightResult,
					t._snippetResult,
					cn(t, ['_highlightResult', '_snippetResult'])),
				a = i.findIndex(function (e) {
					return e.objectID === n.objectID
				})
			a > -1 && i.splice(a, 1), i.unshift(n), (i = i.slice(0, r)), o.setItem(i)
		},
		remove: function remove(e) {
			;(i = i.filter(function (t) {
				return t.objectID !== e.objectID
			})),
				o.setItem(i)
		},
		getAll: function getAll() {
			return i
		},
	}
}

function ln(e) {
	var t,
		n = 'algoliasearch-client-js-'.concat(e.key),
		r = function r() {
			return void 0 === t && (t = e.localStorage || window.localStorage), t
		},
		o = function o() {
			return JSON.parse(r().getItem(n) || '{}')
		}

	return {
		get: function get(e, t) {
			var n =
				arguments.length > 2 && void 0 !== arguments[2]
					? arguments[2]
					: {
							miss: function miss() {
								return Promise.resolve()
							},
					  }
			return Promise.resolve()
				.then(function () {
					var n = JSON.stringify(e),
						r = o()[n]
					return Promise.all([r || t(), void 0 !== r])
				})
				.then(function (e) {
					var t = i(e, 2),
						r = t[0],
						o = t[1]
					return Promise.all([r, o || n.miss(r)])
				})
				.then(function (e) {
					return i(e, 1)[0]
				})
		},
		set: function set(e, t) {
			return Promise.resolve().then(function () {
				var i = o()
				return (i[JSON.stringify(e)] = t), r().setItem(n, JSON.stringify(i)), t
			})
		},
		delete: function _delete(e) {
			return Promise.resolve().then(function () {
				var t = o()
				delete t[JSON.stringify(e)], r().setItem(n, JSON.stringify(t))
			})
		},
		clear: function clear() {
			return Promise.resolve().then(function () {
				r().removeItem(n)
			})
		},
	}
}

function fn(e) {
	var t = a(e.caches),
		n = t.shift()
	return void 0 === n
		? {
				get: function get(e, t) {
					var n =
							arguments.length > 2 && void 0 !== arguments[2]
								? arguments[2]
								: {
										miss: function miss() {
											return Promise.resolve()
										},
								  },
						r = t()
					return r
						.then(function (e) {
							return Promise.all([e, n.miss(e)])
						})
						.then(function (e) {
							return i(e, 1)[0]
						})
				},
				set: function set(e, t) {
					return Promise.resolve(t)
				},
				delete: function _delete(e) {
					return Promise.resolve()
				},
				clear: function clear() {
					return Promise.resolve()
				},
		  }
		: {
				get: function get(e, r) {
					var o =
						arguments.length > 2 && void 0 !== arguments[2]
							? arguments[2]
							: {
									miss: function miss() {
										return Promise.resolve()
									},
							  }
					return n.get(e, r, o)['catch'](function () {
						return fn({
							caches: t,
						}).get(e, r, o)
					})
				},
				set: function set(e, r) {
					return n.set(e, r)['catch'](function () {
						return fn({
							caches: t,
						}).set(e, r)
					})
				},
				delete: function _delete(e) {
					return n['delete'](e)['catch'](function () {
						return fn({
							caches: t,
						})['delete'](e)
					})
				},
				clear: function clear() {
					return n.clear()['catch'](function () {
						return fn({
							caches: t,
						}).clear()
					})
				},
		  }
}

function pn() {
	var e =
			arguments.length > 0 && void 0 !== arguments[0]
				? arguments[0]
				: {
						serializable: !0,
				  },
		t = {}
	return {
		get: function get(n, r) {
			var o =
					arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: {
								miss: function miss() {
									return Promise.resolve()
								},
						  },
				i = JSON.stringify(n)
			if (i in t)
				return Promise.resolve(e.serializable ? JSON.parse(t[i]) : t[i])

			var a = r(),
				c =
					(o && o.miss) ||
					function () {
						return Promise.resolve()
					}

			return a
				.then(function (e) {
					return c(e)
				})
				.then(function () {
					return a
				})
		},
		set: function set(n, r) {
			return (
				(t[JSON.stringify(n)] = e.serializable ? JSON.stringify(r) : r),
				Promise.resolve(r)
			)
		},
		delete: function _delete(e) {
			return delete t[JSON.stringify(e)], Promise.resolve()
		},
		clear: function clear() {
			return (t = {}), Promise.resolve()
		},
	}
}

function hn(e) {
	for (var t = e.length - 1; t > 0; t--) {
		var n = Math.floor(Math.random() * (t + 1)),
			r = e[t]
		;(e[t] = e[n]), (e[n] = r)
	}

	return e
}

function dn(e, t) {
	return (
		Object.keys(void 0 !== t ? t : {}).forEach(function (n) {
			e[n] = t[n](e)
		}),
		e
	)
}

function mn(e) {
	for (
		var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
		r < t;
		r++
	) {
		n[r - 1] = arguments[r]
	}

	var o = 0
	return e.replace(/%s/g, function () {
		return encodeURIComponent(n[o++])
	})
}

var gn = {
	WithinQueryParameters: 0,
	WithinHeaders: 1,
}

function vn(e, t) {
	var n = e || {},
		r = n.data || {}
	return (
		Object.keys(n).forEach(function (e) {
			;-1 ===
				['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(
					e
				) && (r[e] = n[e])
		}),
		{
			data: Object.entries(r).length > 0 ? r : void 0,
			timeout: n.timeout || t,
			headers: n.headers || {},
			queryParameters: n.queryParameters || {},
			cacheable: n.cacheable,
		}
	)
}

var yn = {
		Read: 1,
		Write: 2,
		Any: 3,
	},
	_n = 1,
	bn = 2,
	Sn = 3

function On(e) {
	var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : _n
	return r(
		r({}, e),
		{},
		{
			status: t,
			lastUpdate: Date.now(),
		}
	)
}

function En(e) {
	return {
		protocol: e.protocol || 'https',
		url: e.url,
		accept: e.accept || yn.Any,
	}
}

var wn = 'GET',
	Pn = 'POST'

function jn(e, t) {
	return Promise.all(
		t.map(function (t) {
			return e.get(t, function () {
				return Promise.resolve(On(t))
			})
		})
	).then(function (e) {
		var n = e.filter(function (e) {
				return (function (e) {
					return e.status === _n || Date.now() - e.lastUpdate > 12e4
				})(e)
			}),
			r = e.filter(function (e) {
				return (function (e) {
					return e.status === Sn && Date.now() - e.lastUpdate <= 12e4
				})(e)
			}),
			o = [].concat(a(n), a(r))
		return {
			getTimeout: function getTimeout(e, t) {
				return (0 === r.length && 0 === e ? 1 : r.length + 3 + e) * t
			},
			statelessHosts:
				o.length > 0
					? o.map(function (e) {
							return En(e)
					  })
					: t,
		}
	})
}

function Cn(e, t, n, o) {
	var i = [],
		c = (function (e, t) {
			if (e.method === wn || (void 0 === e.data && void 0 === t.data)) return
			var n = Array.isArray(e.data) ? e.data : r(r({}, e.data), t.data)
			return JSON.stringify(n)
		})(n, o),
		u = (function (e, t) {
			var n = r(r({}, e.headers), t.headers),
				o = {}
			return (
				Object.keys(n).forEach(function (e) {
					var t = n[e]
					o[e.toLowerCase()] = t
				}),
				o
			)
		})(e, o),
		s = n.method,
		l = n.method !== wn ? {} : r(r({}, n.data), o.data),
		f = r(
			r(
				r(
					{
						'x-algolia-agent': e.userAgent.value,
					},
					e.queryParameters
				),
				l
			),
			o.queryParameters
		),
		p = 0,
		h = function t(r, a) {
			var l = r.pop()
			if (void 0 === l)
				throw {
					name: 'RetryError',
					message:
						'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
					transporterStackTrace: In(i),
				}

			var h = {
					data: c,
					headers: u,
					method: s,
					url: kn(l, n.path, f),
					connectTimeout: a(p, e.timeouts.connect),
					responseTimeout: a(p, o.timeout),
				},
				d = function d(e) {
					var t = {
						request: h,
						response: e,
						host: l,
						triesLeft: r.length,
					}
					return i.push(t), t
				},
				m = {
					onSucess: function onSucess(e) {
						return (function (e) {
							try {
								return JSON.parse(e.content)
							} catch (t) {
								throw (function (e, t) {
									return {
										name: 'DeserializationError',
										message: e,
										response: t,
									}
								})(t.message, e)
							}
						})(e)
					},
					onRetry: function onRetry(n) {
						var o = d(n)
						return (
							n.isTimedOut && p++,
							Promise.all([
								e.logger.info('Retryable failure', Nn(o)),
								e.hostsCache.set(l, On(l, n.isTimedOut ? Sn : bn)),
							]).then(function () {
								return t(r, a)
							})
						)
					},
					onFail: function onFail(e) {
						throw (
							(d(e),
							(function (e, t) {
								var n = e.content,
									r = e.status,
									o = n

								try {
									o = JSON.parse(n).message
								} catch (e) {}

								return (function (e, t, n) {
									return {
										name: 'ApiError',
										message: e,
										status: t,
										transporterStackTrace: n,
									}
								})(o, r, t)
							})(e, In(i)))
						)
					},
				}

			return e.requester.send(h).then(function (e) {
				return (function (e, t) {
					return (function (e) {
						var t = e.status
						return (
							e.isTimedOut ||
							(function (e) {
								var t = e.isTimedOut,
									n = e.status
								return !t && 0 == ~~n
							})(e) ||
							(2 != ~~(t / 100) && 4 != ~~(t / 100))
						)
					})(e)
						? t.onRetry(e)
						: 2 == ~~(e.status / 100)
						? t.onSucess(e)
						: t.onFail(e)
				})(e, m)
			})
		}

	return jn(e.hostsCache, t).then(function (e) {
		return h(a(e.statelessHosts).reverse(), e.getTimeout)
	})
}

function xn(e) {
	var t = {
		value: 'Algolia for JavaScript ('.concat(e, ')'),
		add: function add(e) {
			var n = '; '
				.concat(e.segment)
				.concat(void 0 !== e.version ? ' ('.concat(e.version, ')') : '')
			return (
				-1 === t.value.indexOf(n) && (t.value = ''.concat(t.value).concat(n)), t
			)
		},
	}
	return t
}

function kn(e, t, n) {
	var r = Dn(n),
		o = ''
			.concat(e.protocol, '://')
			.concat(e.url, '/')
			.concat('/' === t.charAt(0) ? t.substr(1) : t)
	return r.length && (o += '?'.concat(r)), o
}

function Dn(e) {
	return Object.keys(e)
		.map(function (t) {
			return mn(
				'%s=%s',
				t,
				((n = e[t]),
				'[object Object]' === Object.prototype.toString.call(n) ||
				'[object Array]' === Object.prototype.toString.call(n)
					? JSON.stringify(e[t])
					: e[t])
			)
			var n
		})
		.join('&')
}

function In(e) {
	return e.map(function (e) {
		return Nn(e)
	})
}

function Nn(e) {
	var t = e.request.headers['x-algolia-api-key']
		? {
				'x-algolia-api-key': '*****',
		  }
		: {}
	return r(
		r({}, e),
		{},
		{
			request: r(
				r({}, e.request),
				{},
				{
					headers: r(r({}, e.request.headers), t),
				}
			),
		}
	)
}

var Hn = function Hn(e) {
		var t = e.appId,
			n = (function (e, t, n) {
				var r = {
					'x-algolia-api-key': n,
					'x-algolia-application-id': t,
				}
				return {
					headers: function headers() {
						return e === gn.WithinHeaders ? r : {}
					},
					queryParameters: function queryParameters() {
						return e === gn.WithinQueryParameters ? r : {}
					},
				}
			})(void 0 !== e.authMode ? e.authMode : gn.WithinHeaders, t, e.apiKey),
			o = (function (e) {
				var t = e.hostsCache,
					n = e.logger,
					r = e.requester,
					o = e.requestsCache,
					a = e.responsesCache,
					c = e.timeouts,
					u = e.userAgent,
					s = e.hosts,
					l = e.queryParameters,
					f = {
						hostsCache: t,
						logger: n,
						requester: r,
						requestsCache: o,
						responsesCache: a,
						timeouts: c,
						userAgent: u,
						headers: e.headers,
						queryParameters: l,
						hosts: s.map(function (e) {
							return En(e)
						}),
						read: function read(e, t) {
							var n = vn(t, f.timeouts.read),
								r = function r() {
									return Cn(
										f,
										f.hosts.filter(function (e) {
											return 0 != (e.accept & yn.Read)
										}),
										e,
										n
									)
								}

							if (!0 !== (void 0 !== n.cacheable ? n.cacheable : e.cacheable))
								return r()
							var o = {
								request: e,
								mappedRequestOptions: n,
								transporter: {
									queryParameters: f.queryParameters,
									headers: f.headers,
								},
							}
							return f.responsesCache.get(
								o,
								function () {
									return f.requestsCache.get(o, function () {
										return f.requestsCache
											.set(o, r())
											.then(
												function (e) {
													return Promise.all([f.requestsCache['delete'](o), e])
												},
												function (e) {
													return Promise.all([
														f.requestsCache['delete'](o),
														Promise.reject(e),
													])
												}
											)
											.then(function (e) {
												var t = i(e, 2)
												t[0]
												return t[1]
											})
									})
								},
								{
									miss: function miss(e) {
										return f.responsesCache.set(o, e)
									},
								}
							)
						},
						write: function write(e, t) {
							return Cn(
								f,
								f.hosts.filter(function (e) {
									return 0 != (e.accept & yn.Write)
								}),
								e,
								vn(t, f.timeouts.write)
							)
						},
					}
				return f
			})(
				r(
					r(
						{
							hosts: [
								{
									url: ''.concat(t, '-dsn.algolia.net'),
									accept: yn.Read,
								},
								{
									url: ''.concat(t, '.algolia.net'),
									accept: yn.Write,
								},
							].concat(
								hn([
									{
										url: ''.concat(t, '-1.algolianet.com'),
									},
									{
										url: ''.concat(t, '-2.algolianet.com'),
									},
									{
										url: ''.concat(t, '-3.algolianet.com'),
									},
								])
							),
						},
						e
					),
					{},
					{
						headers: r(
							r(r({}, n.headers()), {
								'content-type': 'application/x-www-form-urlencoded',
							}),
							e.headers
						),
						queryParameters: r(r({}, n.queryParameters()), e.queryParameters),
					}
				)
			)

		return dn(
			{
				transporter: o,
				appId: t,
				addAlgoliaAgent: function addAlgoliaAgent(e, t) {
					o.userAgent.add({
						segment: e,
						version: t,
					})
				},
				clearCache: function clearCache() {
					return Promise.all([
						o.requestsCache.clear(),
						o.responsesCache.clear(),
					]).then(function () {})
				},
			},
			e.methods
		)
	},
	An = function An(e) {
		return function (t) {
			var n =
					arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
				r = {
					transporter: e.transporter,
					appId: e.appId,
					indexName: t,
				}
			return dn(r, n.methods)
		}
	},
	Mn = function Mn(e) {
		return function (t, n) {
			var o = t.map(function (e) {
				return r(
					r({}, e),
					{},
					{
						params: Dn(e.params || {}),
					}
				)
			})
			return e.transporter.read(
				{
					method: Pn,
					path: '1/indexes/*/queries',
					data: {
						requests: o,
					},
					cacheable: !0,
				},
				n
			)
		}
	},
	Tn = function Tn(e) {
		return function (t, n) {
			return Promise.all(
				t.map(function (t) {
					var i = t.params,
						a = i.facetName,
						c = i.facetQuery,
						u = o(i, ['facetName', 'facetQuery'])
					return An(e)(t.indexName, {
						methods: {
							searchForFacetValues: Ln,
						},
					}).searchForFacetValues(a, c, r(r({}, n), u))
				})
			)
		}
	},
	qn = function qn(e) {
		return function (t, n) {
			return e.transporter.read(
				{
					method: Pn,
					path: mn('1/indexes/%s/query', e.indexName),
					data: {
						query: t,
					},
					cacheable: !0,
				},
				n
			)
		}
	},
	Ln = function Ln(e) {
		return function (t, n, r) {
			return e.transporter.read(
				{
					method: Pn,
					path: mn('1/indexes/%s/facets/%s/query', e.indexName, t),
					data: {
						facetQuery: n,
					},
					cacheable: !0,
				},
				r
			)
		}
	},
	Rn = 1,
	Fn = 2,
	Un = 3

function zn(e, t, n) {
	var o,
		i = {
			appId: e,
			apiKey: t,
			timeouts: {
				connect: 1,
				read: 2,
				write: 30,
			},
			requester: {
				send: function send(e) {
					return new Promise(function (t) {
						var n = new XMLHttpRequest()
						n.open(e.method, e.url, !0),
							Object.keys(e.headers).forEach(function (t) {
								return n.setRequestHeader(t, e.headers[t])
							})

						var r,
							o = function o(e, r) {
								return setTimeout(function () {
									n.abort(),
										t({
											status: 0,
											content: r,
											isTimedOut: !0,
										})
								}, 1e3 * e)
							},
							i = o(e.connectTimeout, 'Connection timeout')

						;(n.onreadystatechange = function () {
							n.readyState > n.OPENED &&
								void 0 === r &&
								(clearTimeout(i), (r = o(e.responseTimeout, 'Socket timeout')))
						}),
							(n.onerror = function () {
								0 === n.status &&
									(clearTimeout(i),
									clearTimeout(r),
									t({
										content: n.responseText || 'Network request failed',
										status: n.status,
										isTimedOut: !1,
									}))
							}),
							(n.onload = function () {
								clearTimeout(i),
									clearTimeout(r),
									t({
										content: n.responseText,
										status: n.status,
										isTimedOut: !1,
									})
							}),
							n.send(e.data)
					})
				},
			},
			logger:
				((o = Un),
				{
					debug: function debug(e, t) {
						return Rn >= o && console.debug(e, t), Promise.resolve()
					},
					info: function info(e, t) {
						return Fn >= o && console.info(e, t), Promise.resolve()
					},
					error: function error(e, t) {
						return console.error(e, t), Promise.resolve()
					},
				}),
			responsesCache: pn(),
			requestsCache: pn({
				serializable: !1,
			}),
			hostsCache: fn({
				caches: [
					ln({
						key: ''.concat('4.1.0', '-').concat(e),
					}),
					pn(),
				],
			}),
			userAgent: xn('4.1.0').add({
				segment: 'Browser',
				version: 'lite',
			}),
			authMode: gn.WithinQueryParameters,
		}
	return Hn(
		r(
			r(r({}, i), n),
			{},
			{
				methods: {
					search: Mn,
					searchForFacetValues: Tn,
					multipleQueries: Mn,
					multipleSearchForFacetValues: Tn,
					initIndex: function initIndex(e) {
						return function (t) {
							return An(e)(t, {
								methods: {
									search: qn,
									searchForFacetValues: Ln,
								},
							})
						}
					},
				},
			}
		)
	)
}

zn.version = '4.1.0'

function Vn(e, t) {
	return e.reduce(function (e, n) {
		var r = t(n)
		return (
			e.hasOwnProperty(r) || (e[r] = []), e[r].length < 5 && e[r].push(n), e
		)
	}, {})
}

function Qn(e) {
	return e
}

function Bn() {}

function Wn() {
	return (Wn =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function Kn(e, t) {
	var n = Object.keys(e)

	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e)
		t &&
			(r = r.filter(function (t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			})),
			n.push.apply(n, r)
	}

	return n
}

function Jn(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = null != arguments[t] ? arguments[t] : {}
		t % 2
			? Kn(Object(n), !0).forEach(function (t) {
					$n(e, t, n[t])
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
			: Kn(Object(n)).forEach(function (t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			  })
	}

	return e
}

function $n(e, t, n) {
	return (
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	)
}

function Yn(e, t) {
	return (
		(function (e) {
			if (Array.isArray(e)) return e
		})(e) ||
		(function (e, t) {
			if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(e)))
				return
			var n = [],
				r = !0,
				o = !1,
				i = void 0

			try {
				for (
					var a, c = e[Symbol.iterator]();
					!(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t);
					r = !0
				) {}
			} catch (e) {
				;(o = !0), (i = e)
			} finally {
				try {
					r || null == c['return'] || c['return']()
				} finally {
					if (o) throw i
				}
			}

			return n
		})(e, t) ||
		(function (e, t) {
			if (!e) return
			if ('string' == typeof e) return Gn(e, t)
			var n = Object.prototype.toString.call(e).slice(8, -1)
			'Object' === n && e.constructor && (n = e.constructor.name)
			if ('Map' === n || 'Set' === n) return Array.from(e)
			if (
				'Arguments' === n ||
				/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
			)
				return Gn(e, t)
		})(e, t) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}

function Gn(e, t) {
	;(null == t || t > e.length) && (t = e.length)

	for (var n = 0, r = new Array(t); n < t; n++) {
		r[n] = e[n]
	}

	return r
}

function Zn(e) {
	var t = e.appId,
		n = void 0 === t ? 'BH4D9OD16A' : t,
		r = e.apiKey,
		o = e.indexName,
		i = e.placeholder,
		a = void 0 === i ? 'Search docs' : i,
		c = e.searchParameters,
		u = e.onClose,
		s = void 0 === u ? Bn : u,
		l = e.transformItems,
		f = void 0 === l ? Qn : l,
		p = e.hitComponent,
		h = void 0 === p ? Pt : p,
		d = e.resultsFooterComponent,
		m =
			void 0 === d
				? function () {
						return null
				  }
				: d,
		g = e.navigator,
		v = e.initialScrollY,
		y = void 0 === v ? 0 : v,
		_ = e.transformSearchClient,
		b = void 0 === _ ? Qn : _,
		S = e.disableUserPersonalization,
		O = void 0 !== S && S,
		E = e.initialQuery,
		w = void 0 === E ? '' : E,
		P = Yn(
			ke.useState({
				query: '',
				suggestions: [],
			}),
			2
		),
		j = P[0],
		C = P[1],
		x = ke.useRef(null),
		k = ke.useRef(null),
		D = ke.useRef(null),
		I = ke.useRef(null),
		N = ke.useRef(10),
		H = ke.useRef(
			w || 'undefined' != typeof window
				? window.getSelection().toString().slice(0, 64)
				: ''
		).current,
		A = (function (e, t, n) {
			return ke.useMemo(
				function () {
					var r = zn(e, t)
					return (
						r.addAlgoliaAgent('docsearch', '1.0.0-alpha.28'),
						!1 === /docsearch.js \(.*\)/.test(r.transporter.userAgent.value) &&
							r.addAlgoliaAgent('docsearch-react', '1.0.0-alpha.28'),
						n(r)
					)
				},
				[e, t, n]
			)
		})(n, r, b),
		M = ke.useRef(
			sn({
				key: '__DOCSEARCH_FAVORITE_SEARCHES__'.concat(o),
				limit: 10,
			})
		).current,
		T = ke.useRef(
			sn({
				key: '__DOCSEARCH_RECENT_SEARCHES__'.concat(o),
				limit: 0 === M.getAll().length ? 7 : 4,
			})
		).current,
		q = ke.useCallback(
			function (e) {
				if (!O) {
					var t = 'content' === e.type ? e.__docsearch_parent : e
					t &&
						-1 ===
							M.getAll().findIndex(function (e) {
								return e.objectID === t.objectID
							}) &&
						T.add(t)
				}
			},
			[M, T, O]
		),
		L = ke.useMemo(
			function () {
				return vt({
					id: 'docsearch',
					defaultHighlightedIndex: 0,
					placeholder: a,
					openOnFocus: !0,
					initialState: {
						query: H,
						context: {
							searchSuggestions: [],
						},
					},
					navigator: g,
					onStateChange: function onStateChange(e) {
						var t = e.state
						C(t)
					},
					getSources: function getSources(e) {
						var t = e.query,
							n = e.state,
							r = e.setContext,
							i = e.setStatus
						return t
							? St({
									searchClient: A,
									queries: [
										{
											indexName: o,
											query: t,
											params: Jn(
												{
													attributesToRetrieve: [
														'hierarchy.lvl0',
														'hierarchy.lvl1',
														'hierarchy.lvl2',
														'hierarchy.lvl3',
														'hierarchy.lvl4',
														'hierarchy.lvl5',
														'hierarchy.lvl6',
														'content',
														'type',
														'url',
													],
													attributesToSnippet: [
														'hierarchy.lvl1:'.concat(N.current),
														'hierarchy.lvl2:'.concat(N.current),
														'hierarchy.lvl3:'.concat(N.current),
														'hierarchy.lvl4:'.concat(N.current),
														'hierarchy.lvl5:'.concat(N.current),
														'hierarchy.lvl6:'.concat(N.current),
														'content:'.concat(N.current),
													],
													snippetEllipsisText: '…',
													highlightPreTag: '<mark>',
													highlightPostTag: '</mark>',
													hitsPerPage: 20,
												},
												c
											),
										},
									],
							  })
									['catch'](function (e) {
										throw ('RetryError' === e.name && i('error'), e)
									})
									.then(function (e) {
										var t = e[0].hits,
											o = e[0].nbHits,
											i = Vn(t, function (e) {
												return e.hierarchy.lvl0
											})
										return (
											n.context.searchSuggestions.length <
												Object.keys(i).length &&
												r({
													searchSuggestions: Object.keys(i),
												}),
											r({
												nbHits: o,
											}),
											Object.values(i).map(function (e) {
												return {
													onSelect: function onSelect(e) {
														var t = e.suggestion
														q(t), s()
													},
													getSuggestionUrl: function getSuggestionUrl(e) {
														return e.suggestion.url
													},
													getSuggestions: function getSuggestions() {
														return Object.values(
															Vn(e, function (e) {
																return e.hierarchy.lvl1
															})
														)
															.map(f)
															.map(function (e) {
																return e.map(function (t) {
																	return Jn(
																		Jn({}, t),
																		{},
																		{
																			__docsearch_parent:
																				'lvl1' !== t.type &&
																				e.find(function (e) {
																					return (
																						'lvl1' === e.type &&
																						e.hierarchy.lvl1 ===
																							t.hierarchy.lvl1
																					)
																				}),
																		}
																	)
																})
															})
															.flat()
													},
												}
											})
										)
									})
							: O
							? []
							: [
									{
										onSelect: function onSelect(e) {
											var t = e.suggestion
											q(t), s()
										},
										getSuggestionUrl: function getSuggestionUrl(e) {
											return e.suggestion.url
										},
										getSuggestions: function getSuggestions() {
											return T.getAll()
										},
									},
									{
										onSelect: function onSelect(e) {
											var t = e.suggestion
											q(t), s()
										},
										getSuggestionUrl: function getSuggestionUrl(e) {
											return e.suggestion.url
										},
										getSuggestions: function getSuggestions() {
											return M.getAll()
										},
									},
							  ]
					},
				})
			},
			[o, c, A, s, T, M, q, H, a, g, f, O]
		),
		R = L.getEnvironmentProps,
		F = L.getRootProps,
		U = L.refresh

	return (
		(function (e) {
			var t = e.getEnvironmentProps,
				n = e.dropdownElement,
				r = e.searchBoxElement,
				o = e.inputElement
			ke.useEffect(
				function () {
					if (n && r && o) {
						var e = t({
								dropdownElement: n,
								searchBoxElement: r,
								inputElement: o,
							}),
							i = e.onTouchStart,
							a = e.onTouchMove
						return (
							window.addEventListener('touchstart', i),
							window.addEventListener('touchmove', a),
							function () {
								window.removeEventListener('touchstart', i),
									window.removeEventListener('touchmove', a)
							}
						)
					}
				},
				[t, n, r, o]
			)
		})({
			getEnvironmentProps: R,
			dropdownElement: D.current,
			searchBoxElement: k.current,
			inputElement: I.current,
		}),
		(function (e) {
			var t = e.container
			ke.useEffect(
				function () {
					if (t) {
						var e = t.querySelectorAll(
								'a[href]:not([disabled]), button:not([disabled]), input:not([disabled])'
							),
							n = e[0],
							r = e[e.length - 1]
						return (
							t.addEventListener('keydown', o),
							function () {
								t.removeEventListener('keydown', o)
							}
						)
					}

					function o(e) {
						'Tab' === e.key &&
							(e.shiftKey
								? document.activeElement === n &&
								  (e.preventDefault(), r.focus())
								: document.activeElement === r &&
								  (e.preventDefault(), n.focus()))
					}
				},
				[t]
			)
		})({
			container: x.current,
		}),
		ke.useEffect(function () {
			return (
				document.body.classList.add('DocSearch--active'),
				function () {
					var e, t
					document.body.classList.remove('DocSearch--active'),
						null === (e = (t = window).scrollTo) ||
							void 0 === e ||
							e.call(t, 0, y)
				}
			)
		}, []),
		ke.useEffect(function () {
			window.matchMedia('(max-width: 750px)').matches && (N.current = 5)
		}, []),
		ke.useEffect(
			function () {
				D.current && (D.current.scrollTop = 0)
			},
			[j.query]
		),
		ke.useEffect(
			function () {
				H.length > 0 && (U(), I.current && I.current.focus())
			},
			[H, U]
		),
		ke.createElement(
			'div',
			Wn(
				{
					ref: x,
				},
				F({
					'aria-expanded': !0,
				}),
				{
					className: [
						'DocSearch',
						'DocSearch-Container',
						'stalled' === j.status && 'DocSearch-Container--Stalled',
						'error' === j.status && 'DocSearch-Container--Errored',
					]
						.filter(Boolean)
						.join(' '),
					onMouseDown: function onMouseDown(e) {
						e.target === e.currentTarget && s()
					},
				}
			),
			ke.createElement(
				'div',
				{
					className: 'DocSearch-Modal',
				},
				ke.createElement(
					'header',
					{
						className: 'DocSearch-SearchBar',
						ref: k,
					},
					ke.createElement(
						an,
						Wn({}, L, {
							state: j,
							autoFocus: 0 === H.length,
							onClose: s,
							inputRef: I,
						})
					)
				),
				ke.createElement(
					'div',
					{
						className: 'DocSearch-Dropdown',
						ref: D,
					},
					ke.createElement(
						rn,
						Wn({}, L, {
							indexName: o,
							state: j,
							hitComponent: h,
							resultsFooterComponent: m,
							disableUserPersonalization: O,
							recentSearches: T,
							favoriteSearches: M,
							onItemClick: function onItemClick(e) {
								q(e), s()
							},
							inputRef: I,
						})
					)
				),
				ke.createElement(
					'footer',
					{
						className: 'DocSearch-Footer',
					},
					ke.createElement(Et, null)
				)
			)
		)
	)
}

function Xn() {
	return (Xn =
		Object.assign ||
		function (e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t]

				for (var r in n) {
					Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
				}
			}

			return e
		}).apply(this, arguments)
}

function er(e, t) {
	return (
		(function (e) {
			if (Array.isArray(e)) return e
		})(e) ||
		(function (e, t) {
			if ('undefined' == typeof Symbol || !(Symbol.iterator in Object(e)))
				return
			var n = [],
				r = !0,
				o = !1,
				i = void 0

			try {
				for (
					var a, c = e[Symbol.iterator]();
					!(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t);
					r = !0
				) {}
			} catch (e) {
				;(o = !0), (i = e)
			} finally {
				try {
					r || null == c['return'] || c['return']()
				} finally {
					if (o) throw i
				}
			}

			return n
		})(e, t) ||
		(function (e, t) {
			if (!e) return
			if ('string' == typeof e) return tr(e, t)
			var n = Object.prototype.toString.call(e).slice(8, -1)
			'Object' === n && e.constructor && (n = e.constructor.name)
			if ('Map' === n || 'Set' === n) return Array.from(e)
			if (
				'Arguments' === n ||
				/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
			)
				return tr(e, t)
		})(e, t) ||
		(function () {
			throw new TypeError(
				'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
			)
		})()
	)
}

function tr(e, t) {
	;(null == t || t > e.length) && (t = e.length)

	for (var n = 0, r = new Array(t); n < t; n++) {
		r[n] = e[n]
	}

	return r
}

function nr(e) {
	var t = ke.useRef(null),
		n = er(ke.useState(!1), 2),
		r = n[0],
		o = n[1],
		i = er(ke.useState(void 0), 2),
		a = i[0],
		c = i[1],
		u = ke.useCallback(
			function () {
				o(!0)
			},
			[o]
		),
		s = ke.useCallback(
			function () {
				o(!1)
			},
			[o]
		)
	return (
		(function (e) {
			var t = e.isOpen,
				n = e.onOpen,
				r = e.onClose,
				o = e.onInput,
				i = e.searchButtonRef
			ke.useEffect(
				function () {
					function e(e) {
						;((27 === e.keyCode && t) ||
							('k' === e.key && (e.metaKey || e.ctrlKey)) ||
							(!(function (e) {
								var t = e.target,
									n = t.tagName
								return (
									t.isContentEditable ||
									'INPUT' === n ||
									'SELECT' === n ||
									'TEXTAREA' === n
								)
							})(e) &&
								'/' === e.key &&
								!t)) &&
							(e.preventDefault(),
							t
								? r()
								: document.body.classList.contains('DocSearch--active') ||
								  document.body.classList.contains('DocSearch--active') ||
								  n()),
							i &&
								i.current === document.activeElement &&
								o &&
								/[a-zA-Z0-9]/.test(String.fromCharCode(e.keyCode)) &&
								o(e)
					}

					return (
						window.addEventListener('keydown', e),
						function () {
							window.removeEventListener('keydown', e)
						}
					)
				},
				[t, n, r, o, i]
			)
		})({
			isOpen: r,
			onOpen: u,
			onClose: s,
			onInput: ke.useCallback(
				function (e) {
					o(!0), c(e.key)
				},
				[o, c]
			),
			searchButtonRef: t,
		}),
		ke.createElement(
			ke.Fragment,
			null,
			ke.createElement(Te, {
				onClick: u,
				ref: t,
			}),
			r &&
				be(
					ke.createElement(
						Zn,
						Xn({}, e, {
							initialScrollY: window.scrollY,
							initialQuery: a,
							onClose: s,
						})
					),
					document.body
				)
		)
	)
}

function docsearch(e) {
	Ee(
		ke.createElement(
			nr,
			t({}, e, {
				transformSearchClient: function transformSearchClient(t) {
					return (
						t.addAlgoliaAgent('docsearch.js', '1.0.0-alpha.28'),
						e.transformSearchClient ? e.transformSearchClient(t) : t
					)
				},
			})
		),
		(function (e) {
			var t =
				arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window
			return 'string' == typeof e ? t.document.querySelector(e) : e
		})(e.container, e.environment)
	)
}

var _hoisted_1$b = {
	class: 'algolia-search-box',
	id: 'docsearch',
}
var script$b = defineComponent({
	expose: [],
	props: {
		options: {
			type: null,
			required: true,
		},
	},
	setup: function setup(__props) {
		var props = __props
		var vm = getCurrentInstance()
		watch(
			function () {
				return props.options
			},
			function (value) {
				update(value)
			}
		)
		onMounted(function () {
			initialize(props.options)
		})

		function update(options) {
			if (vm && vm.vnode.el) {
				vm.vnode.el.innerHTML =
					'<div class="algolia-search-box" id="docsearch"></div>'
				initialize(options)
			}
		}

		function initialize(userOptions) {
			docsearch(
				Object.assign({}, userOptions, {
					container: '#docsearch',
					searchParameters: Object.assign({}, userOptions.searchParameters), //   navigator: {
					//     navigate: ({ suggestionUrl }: { suggestionUrl: string }) => {
					//       navigate(suggestionUrl)
					//     },
					//   },
					//   transformItems: (items: DocSearchHit[]) => {
					//     return items.map((item) => {
					//       return Object.assign({}, item, {
					//         url: getRelativePath(item.url),
					//       });
					//     });
					//   },
					//   hitComponent: ({ hit, children }: { hit: DocSearchHit; children: any }) => {
					//     // const relativeHit = hit.url.startsWith("http") ? getRelativePath(hit.url as string) : hit.url;
					//     return {
					//       type: "a",
					//       ref: undefined,
					//       constructor: undefined,
					//       key: undefined,
					//       props: {
					//         href: hit.url,
					//         onClick: (event: MouseEvent) => {
					//           if (isSpecialClick(event)) {
					//             return;
					//           }
					//           navigate(hit.url)
					//         },
					//         children,
					//       },
					//     };
					//   },
				})
			)
		}

		return function (_ctx, _cache) {
			return openBlock(), createBlock('div', _hoisted_1$b)
		}
	},
})

var script$a = defineComponent({
	props: {
		variant: String,
	},
})

var _hoisted_1$a = {
	key: 0,
	viewBox: '0 0 532 100',
	xmlns: 'http://www.w3.org/2000/svg',
	'fill-rule': 'evenodd',
	'clip-rule': 'evenodd',
	'stroke-linejoin': 'round',
	'stroke-miterlimit': '2',
}

var _hoisted_2$9 = /*#__PURE__*/ createVNode(
	'g',
	{
		transform: 'translate(-362.21733 -1030)',
	},
	[
		/*#__PURE__*/ createVNode('path', {
			fill: 'none',
			d: 'M362.217 1030h531.337v100H362.217z',
		}),
		/*#__PURE__*/ createVNode(
			'clipPath',
			{
				id: 'a',
			},
			[
				/*#__PURE__*/ createVNode('path', {
					d: 'M362.217 1030h531.337v100H362.217z',
				}),
			]
		),
		/*#__PURE__*/ createVNode(
			'g',
			{
				'clip-path': 'url(#a)',
			},
			[
				/*#__PURE__*/ createVNode(
					'g',
					{
						transform: 'matrix(.09766 0 0 .09766 362.4350256 1030.0000256)',
					},
					[
						/*#__PURE__*/ createVNode('path', {
							d:
								'M1024 256C1024 114.71 909.29 0 768 0H256C114.71 0 0 114.71 0 256v512c0 141.29 114.71 256 256 256h512c141.29 0 256-114.71 256-256V256z',
							fill: 'none',
						}),
						/*#__PURE__*/ createVNode(
							'clipPath',
							{
								id: 'b',
							},
							[
								/*#__PURE__*/ createVNode('path', {
									d:
										'M1024 256C1024 114.71 909.29 0 768 0H256C114.71 0 0 114.71 0 256v512c0 141.29 114.71 256 256 256h512c141.29 0 256-114.71 256-256V256z',
								}),
							]
						),
						/*#__PURE__*/ createVNode(
							'g',
							{
								'clip-path': 'url(#b)',
							},
							[
								/*#__PURE__*/ createVNode('path', {
									fill: '#65adf1',
									d: 'M0 0h1024v1024H0z',
								}),
								/*#__PURE__*/ createVNode('path', {
									d:
										'M843 511.864v1.099c0 .256-.195.468-.451.492-33.364 3.123-59.479 30.233-59.479 64.409v136.941c0 9.569-2.01 18.8-5.64 27.229-10.35 24.071-33.84 41.571-61.16 41.571h-69.2l-.48-.601-269.18-337.32v337.921h-69.68c-36.893 0-66.8-29.908-66.8-66.8V577.864c0-34.175-26.115-61.286-59.479-64.409-.256-.024-.451-.236-.451-.492v-1.099c0-.255.194-.467.449-.492 33.245-3.237 59.221-31.021 59.221-65.117v-139.06c0-9.29 1.9-18.15 5.33-26.181 10.18-23.879 33.87-40.62 61.47-40.62h69.66l.28.35 269.18 337.33v-337.68h69.94c36.893 0 66.8 29.908 66.8 66.801v139.06c0 34.096 25.976 61.88 59.222 65.117.254.025.448.237.448.492',
									fill: '#fff',
									'fill-rule': 'nonzero',
								}),
							]
						),
					]
				),
				/*#__PURE__*/ createVNode('path', {
					d:
						'M527.5797 1056.618v49.436h-9.044l-21.556-31.144h-.34v31.144h-10.472v-49.436h9.18l21.352 31.076h.408v-31.076h10.472zM546.5577 1106.734c-3.536 0-6.46-.884-8.84-2.788-2.312-1.836-3.468-4.556-3.468-8.228 0-2.788.612-4.964 1.972-6.528 1.292-1.564 2.992-2.72 5.1-3.468 2.108-.748 4.42-1.224 6.868-1.428 3.196-.34 5.508-.68 6.868-1.02 1.428-.34 2.108-1.156 2.108-2.312v-.136c0-1.564-.476-2.72-1.428-3.604-.952-.816-2.312-1.224-4.08-1.224-1.836 0-3.332.408-4.42 1.224-1.088.748-1.836 1.836-2.176 3.06l-9.52-.816c.68-3.332 2.448-6.052 5.304-8.024 2.788-1.972 6.392-2.992 10.88-2.992 2.72 0 5.304.476 7.684 1.36 2.38.816 4.352 2.176 5.848 4.012 1.428 1.904 2.176 4.284 2.176 7.208v25.024h-9.724v-5.168h-.34c-.884 1.768-2.244 3.128-4.012 4.216-1.836 1.088-4.08 1.632-6.8 1.632zm2.924-7.072c2.244 0 4.148-.68 5.576-1.972 1.428-1.292 2.176-2.924 2.176-4.896v-3.944c-.408.272-1.02.544-1.904.748-.816.204-1.7.408-2.652.544-1.02.136-1.836.272-2.584.408-1.836.204-3.264.748-4.352 1.496-1.156.748-1.7 1.836-1.7 3.332 0 1.428.544 2.448 1.564 3.196 1.02.748 2.312 1.088 3.876 1.088zM595.1267 1068.994v7.684h-6.936v17.952c0 1.428.34 2.38.952 2.924.68.476 1.496.748 2.516.748.476 0 .952-.068 1.428-.136.476-.136.884-.204 1.156-.204l1.564 7.616c-.476.204-1.224.34-2.176.612-.884.204-2.04.34-3.4.34-3.74.204-6.732-.612-8.976-2.38-2.244-1.768-3.4-4.488-3.332-8.16v-19.312h-5.1v-7.684h5.1v-8.908h10.268v8.908h6.936zM601.8247 1106.054v-37.06h10.336v37.06h-10.336zm5.168-41.888c-1.496 0-2.788-.476-3.876-1.496s-1.632-2.244-1.632-3.672c0-1.496.544-2.72 1.632-3.672 1.088-1.02 2.38-1.564 3.876-1.564 1.564 0 2.856.544 3.944 1.564 1.088.952 1.632 2.176 1.632 3.672 0 1.428-.544 2.652-1.632 3.672-1.088 1.02-2.38 1.496-3.944 1.496zM654.9337 1068.994l-12.988 37.06h-11.56l-12.988-37.06h10.88l7.684 26.52h.408l7.684-26.52h10.88zM675.8657 1106.802c-3.808 0-7.072-.816-9.86-2.38-2.72-1.496-4.828-3.74-6.324-6.596-1.496-2.856-2.244-6.256-2.244-10.132 0-3.808.748-7.208 2.244-10.064 1.496-2.856 3.604-5.1 6.256-6.732 2.72-1.632 5.848-2.448 9.52-2.448 3.264 0 6.188.748 8.84 2.108s4.692 3.468 6.256 6.256c1.564 2.788 2.312 6.324 2.312 10.472v2.856h-25.228c0 2.788.748 4.964 2.244 6.596 1.496 1.564 3.604 2.38 6.12 2.38 1.768 0 3.264-.408 4.488-1.088 1.292-.748 2.176-1.836 2.652-3.196l9.52.612c-.748 3.4-2.584 6.188-5.508 8.228-2.924 2.108-6.732 3.128-11.288 3.128zm-8.228-23.052h15.572c0-2.176-.748-4.012-2.108-5.44-1.428-1.428-3.264-2.176-5.508-2.176s-4.148.748-5.576 2.244c-1.496 1.496-2.244 3.264-2.38 5.372zM726.6387 1070.83c-.204-1.972-1.02-3.468-2.516-4.556s-3.468-1.632-5.984-1.632-4.488.544-5.848 1.564c-1.36 1.088-2.04 2.38-2.04 4.012-.068 1.768.68 3.06 2.244 4.012 1.564.884 3.4 1.632 5.576 2.108l4.42 1.02c2.856.68 5.44 1.632 7.616 2.856 2.244 1.224 4.012 2.788 5.304 4.692 1.292 1.904 1.904 4.284 1.904 7.004 0 4.556-1.7 8.16-5.1 10.812-3.332 2.72-8.024 4.012-14.076 4.012-6.052 0-10.812-1.36-14.416-4.08-3.536-2.72-5.372-6.8-5.508-12.104h10.132c.136 2.448 1.156 4.352 2.924 5.576 1.768 1.224 4.012 1.836 6.732 1.836 2.652 0 4.76-.544 6.392-1.632 1.564-1.156 2.38-2.652 2.38-4.42 0-1.7-.748-2.992-2.176-3.876-1.496-.884-3.536-1.7-6.256-2.312l-5.372-1.36c-4.148-1.02-7.48-2.584-9.86-4.76-2.448-2.176-3.604-5.1-3.604-8.704 0-2.992.748-5.644 2.38-7.888 1.632-2.244 3.876-3.944 6.664-5.236 2.856-1.224 6.052-1.836 9.724-1.836 3.604 0 6.868.612 9.588 1.836 2.72 1.292 4.896 3.06 6.392 5.304 1.564 2.176 2.312 4.828 2.38 7.752h-9.996zM760.8987 1106.802c-3.808 0-7.072-.816-9.792-2.448-2.72-1.632-4.828-3.876-6.324-6.732-1.428-2.924-2.176-6.188-2.176-9.996 0-3.74.748-7.14 2.244-9.996 1.496-2.856 3.536-5.1 6.256-6.732 2.72-1.632 5.984-2.448 9.724-2.448 3.264 0 6.052.612 8.5 1.768 2.448 1.224 4.352 2.856 5.78 4.964 1.428 2.108 2.176 4.624 2.312 7.48h-9.656c-.272-1.836-1.02-3.332-2.176-4.488-1.156-1.088-2.72-1.7-4.556-1.7-2.38 0-4.352.952-5.78 2.924-1.428 1.904-2.176 4.624-2.176 8.092 0 3.536.748 6.324 2.176 8.228 1.428 1.972 3.332 2.924 5.78 2.924 1.768 0 3.264-.544 4.42-1.632 1.224-1.02 1.972-2.584 2.312-4.556h9.656c-.136 2.856-.884 5.304-2.244 7.48-1.428 2.176-3.332 3.876-5.712 5.032-2.448 1.224-5.304 1.836-8.568 1.836zM784.0427 1106.054v-37.06h9.996v6.46h.408c.68-2.312 1.768-4.08 3.4-5.236 1.564-1.224 3.4-1.768 5.508-1.768 1.156 0 2.176.136 3.196.34v9.112c-.476-.136-1.156-.272-1.972-.408-.884-.068-1.632-.136-2.38-.136-2.244 0-4.148.748-5.644 2.176-1.428 1.428-2.176 3.264-2.176 5.508v21.012h-10.336zM811.8367 1106.054v-37.06h10.336v37.06h-10.336zm5.168-41.888c-1.496 0-2.788-.476-3.876-1.496s-1.632-2.244-1.632-3.672c0-1.496.544-2.72 1.632-3.672 1.088-1.02 2.38-1.564 3.876-1.564 1.564 0 2.856.544 3.944 1.564 1.088.952 1.632 2.176 1.632 3.672 0 1.428-.544 2.652-1.632 3.672-1.088 1.02-2.38 1.496-3.944 1.496zM830.3347 1119.994v-51h10.2v6.188h.408c.476-1.02 1.156-2.04 1.972-3.06.884-1.02 2.04-1.904 3.4-2.584 1.428-.68 3.128-1.088 5.168-1.088 2.72 0 5.236.748 7.548 2.176 2.244 1.36 4.08 3.468 5.44 6.324 1.36 2.788 2.04 6.324 2.04 10.608 0 4.148-.612 7.616-1.972 10.472-1.36 2.856-3.128 4.964-5.44 6.46-2.244 1.428-4.76 2.176-7.616 2.176-1.972 0-3.672-.34-5.1-1.02-1.36-.612-2.516-1.496-3.4-2.448-.884-1.02-1.564-2.04-2.04-3.06h-.272v19.856h-10.336zm10.064-32.504c0 3.332.68 5.984 2.04 7.956 1.36 2.04 3.332 2.992 5.78 2.992 2.516 0 4.488-.952 5.78-2.992 1.36-2.04 2.04-4.692 2.04-7.956 0-3.196-.68-5.78-1.972-7.82-1.36-1.972-3.264-2.992-5.848-2.992-2.516 0-4.42.952-5.78 2.924-1.36 1.972-2.04 4.624-2.04 7.888zM893.0617 1068.994v7.684h-6.936v17.952c0 1.428.34 2.38.952 2.924.68.476 1.496.748 2.516.748.476 0 .952-.068 1.428-.136.476-.136.884-.204 1.156-.204l1.564 7.616c-.476.204-1.224.34-2.176.612-.884.204-2.04.34-3.4.34-3.74.204-6.732-.612-8.976-2.38-2.244-1.768-3.4-4.488-3.332-8.16v-19.312h-5.1v-7.684h5.1v-8.908h10.268v8.908h6.936z',
					fill: '#65adf1',
				}),
			]
		),
	],
	-1
)

var _hoisted_3$6 = {
	key: 1,
	viewBox: '0 0 532 100',
	xmlns: 'http://www.w3.org/2000/svg',
	'fill-rule': 'evenodd',
	'clip-rule': 'evenodd',
	'stroke-linejoin': 'round',
	'stroke-miterlimit': '2',
}

var _hoisted_4$6 = /*#__PURE__*/ createVNode(
	'g',
	{
		transform: 'translate(-1641.886 -310)',
	},
	[
		/*#__PURE__*/ createVNode('path', {
			fill: 'none',
			d: 'M1642.22 310h531.337v100H1642.22z',
		}),
		/*#__PURE__*/ createVNode(
			'clipPath',
			{
				id: 'a1',
			},
			[
				/*#__PURE__*/ createVNode('path', {
					d: 'M1642.22 310h531.337v100H1642.22z',
				}),
			]
		),
		/*#__PURE__*/ createVNode(
			'g',
			{
				'clip-path': 'url(#a1)',
			},
			[
				/*#__PURE__*/ createVNode(
					'g',
					{
						transform: 'matrix(.09766 0 0 .09766 1642.4300256 310.0000256)',
					},
					[
						/*#__PURE__*/ createVNode('path', {
							d:
								'M1024 256C1024 114.71 909.29 0 768 0H256C114.71 0 0 114.71 0 256v512c0 141.29 114.71 256 256 256h512c141.29 0 256-114.71 256-256V256z',
							fill: 'none',
						}),
						/*#__PURE__*/ createVNode(
							'clipPath',
							{
								id: 'b',
							},
							[
								/*#__PURE__*/ createVNode('path', {
									d:
										'M1024 256C1024 114.71 909.29 0 768 0H256C114.71 0 0 114.71 0 256v512c0 141.29 114.71 256 256 256h512c141.29 0 256-114.71 256-256V256z',
								}),
							]
						),
						/*#__PURE__*/ createVNode(
							'g',
							{
								'clip-path': 'url(#b)',
							},
							[
								/*#__PURE__*/ createVNode('path', {
									d:
										'M1024 0H0v1024h1024V0zM843 511.86v1.1c0 .26-.19.47-.45.49-33.36 3.13-59.48 30.24-59.48 64.41v136.95c0 9.56-2.01 18.8-5.64 27.23-10.35 24.07-33.84 41.57-61.16 41.57h-69.2l-.48-.6-269.18-337.33v337.93h-69.68c-36.89 0-66.8-29.91-66.8-66.8V577.86c0-34.17-26.11-61.28-59.48-64.41-.25-.02-.45-.23-.45-.49v-1.1c0-.25.19-.46.45-.49 33.24-3.24 59.22-31.02 59.22-65.11V307.19c0-9.29 1.9-18.14 5.33-26.18 10.18-23.88 33.87-40.62 61.47-40.62h69.66l.28.35 269.18 337.34V240.39h69.94c36.89 0 66.8 29.91 66.8 66.8v139.07c0 34.09 25.98 61.87 59.22 65.11.26.03.45.24.45.49z',
									fill: '#fff',
								}),
							]
						),
					]
				),
				/*#__PURE__*/ createVNode('path', {
					d:
						'M1807.579 336.618v49.436h-9.044l-21.556-31.144h-.34v31.144h-10.472v-49.436h9.18l21.352 31.076h.408v-31.076h10.472zM1826.557 386.734c-3.536 0-6.46-.884-8.84-2.788-2.312-1.836-3.468-4.556-3.468-8.228 0-2.788.612-4.964 1.972-6.528 1.292-1.564 2.992-2.72 5.1-3.468 2.108-.748 4.42-1.224 6.868-1.428 3.196-.34 5.508-.68 6.868-1.02 1.428-.34 2.108-1.156 2.108-2.312v-.136c0-1.564-.476-2.72-1.428-3.604-.952-.816-2.312-1.224-4.08-1.224-1.836 0-3.332.408-4.42 1.224-1.088.748-1.836 1.836-2.176 3.06l-9.52-.816c.68-3.332 2.448-6.052 5.304-8.024 2.788-1.972 6.392-2.992 10.88-2.992 2.72 0 5.304.476 7.684 1.36 2.38.816 4.352 2.176 5.848 4.012 1.428 1.904 2.176 4.284 2.176 7.208v25.024h-9.724v-5.168h-.34c-.884 1.768-2.244 3.128-4.012 4.216-1.836 1.088-4.08 1.632-6.8 1.632zm2.924-7.072c2.244 0 4.148-.68 5.576-1.972 1.428-1.292 2.176-2.924 2.176-4.896v-3.944c-.408.272-1.02.544-1.904.748-.816.204-1.7.408-2.652.544-1.02.136-1.836.272-2.584.408-1.836.204-3.264.748-4.352 1.496-1.156.748-1.7 1.836-1.7 3.332 0 1.428.544 2.448 1.564 3.196 1.02.748 2.312 1.088 3.876 1.088zM1875.126 348.994v7.684h-6.936v17.952c0 1.428.34 2.38.952 2.924.68.476 1.496.748 2.516.748.476 0 .952-.068 1.428-.136.476-.136.884-.204 1.156-.204l1.564 7.616c-.476.204-1.224.34-2.176.612-.884.204-2.04.34-3.4.34-3.74.204-6.732-.612-8.976-2.38-2.244-1.768-3.4-4.488-3.332-8.16v-19.312h-5.1v-7.684h5.1v-8.908h10.268v8.908h6.936zM1881.824 386.054v-37.06h10.336v37.06h-10.336zm5.168-41.888c-1.496 0-2.788-.476-3.876-1.496s-1.632-2.244-1.632-3.672c0-1.496.544-2.72 1.632-3.672 1.088-1.02 2.38-1.564 3.876-1.564 1.564 0 2.856.544 3.944 1.564 1.088.952 1.632 2.176 1.632 3.672 0 1.428-.544 2.652-1.632 3.672-1.088 1.02-2.38 1.496-3.944 1.496zM1934.933 348.994l-12.988 37.06h-11.56l-12.988-37.06h10.88l7.684 26.52h.408l7.684-26.52h10.88zM1955.865 386.802c-3.808 0-7.072-.816-9.86-2.38-2.72-1.496-4.828-3.74-6.324-6.596-1.496-2.856-2.244-6.256-2.244-10.132 0-3.808.748-7.208 2.244-10.064 1.496-2.856 3.604-5.1 6.256-6.732 2.72-1.632 5.848-2.448 9.52-2.448 3.264 0 6.188.748 8.84 2.108s4.692 3.468 6.256 6.256c1.564 2.788 2.312 6.324 2.312 10.472v2.856h-25.228c0 2.788.748 4.964 2.244 6.596 1.496 1.564 3.604 2.38 6.12 2.38 1.768 0 3.264-.408 4.488-1.088 1.292-.748 2.176-1.836 2.652-3.196l9.52.612c-.748 3.4-2.584 6.188-5.508 8.228-2.924 2.108-6.732 3.128-11.288 3.128zm-8.228-23.052h15.572c0-2.176-.748-4.012-2.108-5.44-1.428-1.428-3.264-2.176-5.508-2.176s-4.148.748-5.576 2.244c-1.496 1.496-2.244 3.264-2.38 5.372zM2006.638 350.83c-.204-1.972-1.02-3.468-2.516-4.556s-3.468-1.632-5.984-1.632-4.488.544-5.848 1.564c-1.36 1.088-2.04 2.38-2.04 4.012-.068 1.768.68 3.06 2.244 4.012 1.564.884 3.4 1.632 5.576 2.108l4.42 1.02c2.856.68 5.44 1.632 7.616 2.856 2.244 1.224 4.012 2.788 5.304 4.692 1.292 1.904 1.904 4.284 1.904 7.004 0 4.556-1.7 8.16-5.1 10.812-3.332 2.72-8.024 4.012-14.076 4.012-6.052 0-10.812-1.36-14.416-4.08-3.536-2.72-5.372-6.8-5.508-12.104h10.132c.136 2.448 1.156 4.352 2.924 5.576 1.768 1.224 4.012 1.836 6.732 1.836 2.652 0 4.76-.544 6.392-1.632 1.564-1.156 2.38-2.652 2.38-4.42 0-1.7-.748-2.992-2.176-3.876-1.496-.884-3.536-1.7-6.256-2.312l-5.372-1.36c-4.148-1.02-7.48-2.584-9.86-4.76-2.448-2.176-3.604-5.1-3.604-8.704 0-2.992.748-5.644 2.38-7.888 1.632-2.244 3.876-3.944 6.664-5.236 2.856-1.224 6.052-1.836 9.724-1.836 3.604 0 6.868.612 9.588 1.836 2.72 1.292 4.896 3.06 6.392 5.304 1.564 2.176 2.312 4.828 2.38 7.752h-9.996zM2040.898 386.802c-3.808 0-7.072-.816-9.792-2.448-2.72-1.632-4.828-3.876-6.324-6.732-1.428-2.924-2.176-6.188-2.176-9.996 0-3.74.748-7.14 2.244-9.996 1.496-2.856 3.536-5.1 6.256-6.732 2.72-1.632 5.984-2.448 9.724-2.448 3.264 0 6.052.612 8.5 1.768 2.448 1.224 4.352 2.856 5.78 4.964 1.428 2.108 2.176 4.624 2.312 7.48h-9.656c-.272-1.836-1.02-3.332-2.176-4.488-1.156-1.088-2.72-1.7-4.556-1.7-2.38 0-4.352.952-5.78 2.924-1.428 1.904-2.176 4.624-2.176 8.092 0 3.536.748 6.324 2.176 8.228 1.428 1.972 3.332 2.924 5.78 2.924 1.768 0 3.264-.544 4.42-1.632 1.224-1.02 1.972-2.584 2.312-4.556h9.656c-.136 2.856-.884 5.304-2.244 7.48-1.428 2.176-3.332 3.876-5.712 5.032-2.448 1.224-5.304 1.836-8.568 1.836zM2064.042 386.054v-37.06h9.996v6.46h.408c.68-2.312 1.768-4.08 3.4-5.236 1.564-1.224 3.4-1.768 5.508-1.768 1.156 0 2.176.136 3.196.34v9.112c-.476-.136-1.156-.272-1.972-.408-.884-.068-1.632-.136-2.38-.136-2.244 0-4.148.748-5.644 2.176-1.428 1.428-2.176 3.264-2.176 5.508v21.012h-10.336zM2091.836 386.054v-37.06h10.336v37.06h-10.336zm5.168-41.888c-1.496 0-2.788-.476-3.876-1.496s-1.632-2.244-1.632-3.672c0-1.496.544-2.72 1.632-3.672 1.088-1.02 2.38-1.564 3.876-1.564 1.564 0 2.856.544 3.944 1.564 1.088.952 1.632 2.176 1.632 3.672 0 1.428-.544 2.652-1.632 3.672-1.088 1.02-2.38 1.496-3.944 1.496zM2110.334 399.994v-51h10.2v6.188h.408c.476-1.02 1.156-2.04 1.972-3.06.884-1.02 2.04-1.904 3.4-2.584 1.428-.68 3.128-1.088 5.168-1.088 2.72 0 5.236.748 7.548 2.176 2.244 1.36 4.08 3.468 5.44 6.324 1.36 2.788 2.04 6.324 2.04 10.608 0 4.148-.612 7.616-1.972 10.472-1.36 2.856-3.128 4.964-5.44 6.46-2.244 1.428-4.76 2.176-7.616 2.176-1.972 0-3.672-.34-5.1-1.02-1.36-.612-2.516-1.496-3.4-2.448-.884-1.02-1.564-2.04-2.04-3.06h-.272v19.856h-10.336zm10.064-32.504c0 3.332.68 5.984 2.04 7.956 1.36 2.04 3.332 2.992 5.78 2.992 2.516 0 4.488-.952 5.78-2.992 1.36-2.04 2.04-4.692 2.04-7.956 0-3.196-.68-5.78-1.972-7.82-1.36-1.972-3.264-2.992-5.848-2.992-2.516 0-4.42.952-5.78 2.924-1.36 1.972-2.04 4.624-2.04 7.888zM2173.061 348.994v7.684h-6.936v17.952c0 1.428.34 2.38.952 2.924.68.476 1.496.748 2.516.748.476 0 .952-.068 1.428-.136.476-.136.884-.204 1.156-.204l1.564 7.616c-.476.204-1.224.34-2.176.612-.884.204-2.04.34-3.4.34-3.74.204-6.732-.612-8.976-2.38-2.244-1.768-3.4-4.488-3.332-8.16v-19.312h-5.1v-7.684h5.1v-8.908h10.268v8.908h6.936z',
					fill: '#fff',
					'fill-rule': 'nonzero',
				}),
			]
		),
	],
	-1
)

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
	return _ctx.variant === 'blue'
		? (openBlock(), createBlock('svg', _hoisted_1$a, [_hoisted_2$9]))
		: (openBlock(), createBlock('svg', _hoisted_3$6, [_hoisted_4$6]))
}

script$a.render = render$a

var script$9 = defineComponent({
	props: {
		nav: Array,
		mainURL: {
			default: '/',
			type: String,
		},
	},
	setup: function setup() {
		var mobileMenuOpen = ref(false)
		var flyoutMenuOpen = ref(false)

		var openSearch = function openSearch() {
			var docsearch = document.querySelector('#docsearch .DocSearch-Button')
			docsearch.click()
		}

		return {
			mobileMenuOpen: mobileMenuOpen,
			flyoutMenuOpen: flyoutMenuOpen,
			algoliaOptions: {
				apiKey: '8d41b4ae92a02aea355e1dc8cfad1899',
				indexName: 'nativescript',
				debug: true,
			},
			openSearch: openSearch,
		}
	},
	components: {
		AlgoliaSearchBox: script$b,
		NativeScriptLogo: script$a,
	},
})

var _hoisted_1$9 = {
	class: 'top-0 z-10 lg:sticky',
}
var _hoisted_2$8 = {
	class: 'pt-6 pb-6 bg-ns-blue',
}
var _hoisted_3$5 = {
	class:
		'relative flex items-center justify-between px-4 mx-auto 2xl:container sm:px-6',
	'aria-label': 'Global',
}
var _hoisted_4$5 = {
	class: 'flex items-center flex-1',
}
var _hoisted_5$2 = {
	class: 'flex items-center justify-between w-full lg:w-auto',
}

var _hoisted_6$2 = /*#__PURE__*/ createVNode(
	'span',
	{
		class: 'sr-only',
	},
	'NativeScript',
	-1
)

var _hoisted_7$2 = {
	class: 'flex items-center -mr-1 lg:hidden',
}

var _hoisted_8$2 = /*#__PURE__*/ createVNode(
	'span',
	{
		class: 'sr-only',
	},
	'Open main menu',
	-1
)

var _hoisted_9$1 = /*#__PURE__*/ createVNode(
	'svg',
	{
		class: 'w-6 h-6',
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		viewBox: '0 0 24 24',
		stroke: 'currentColor',
		'aria-hidden': 'true',
	},
	[
		/*#__PURE__*/ createVNode('path', {
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			'stroke-width': '2',
			d: 'M4 6h16M4 12h16M4 18h16',
		}),
	],
	-1
)

var _hoisted_10$1 = {
	class: 'hidden ml-10 space-x-8 lg:flex',
}
var _hoisted_11$1 = {
	class: 'flex justify-center flex-1 px-2 lg:justify-end',
}
var _hoisted_12$1 = {
	class: 'w-full max-w-xl xl:max-w-xs',
}
var _hoisted_13$1 = {
	class:
		'relative text-white rounded-md focus-within:ring-2 ring-offset-2 ring-offset-transparent',
}

var _hoisted_14$1 = /*#__PURE__*/ createVNode(
	'div',
	{
		class:
			'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
	},
	[
		/*#__PURE__*/ createVNode(
			'svg',
			{
				class: 'w-5 h-5',
				xmlns: 'http://www.w3.org/2000/svg',
				viewBox: '0 0 20 20',
				fill: 'currentColor',
				'aria-hidden': 'true',
			},
			[
				/*#__PURE__*/ createVNode('path', {
					'fill-rule': 'evenodd',
					d:
						'M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z',
					'clip-rule': 'evenodd',
				}),
			]
		),
	],
	-1
)

var _hoisted_15$1 = /*#__PURE__*/ createStaticVNode(
	'<input aria-hidden="true" id="search" name="search" disabled class="block w-full py-2 pl-10 pr-3 leading-5 bg-white border border-transparent rounded-md placeholder-blue-50 text-blue-50 bg-opacity-20 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm" placeholder="Search Anything" type="search"><div class="absolute inset-y-0 right-0 items-center hidden pr-3 pointer-events-none xl:flex"><div class="px-2 py-1 text-xs text-white bg-white border border-white border-opacity-50 rounded bg-opacity-30"><span class="sr-only">Press Ctrl+K to open quick search</span><span aria-hidden="true">Ctrl K</span></div></div>',
	2
)

var _hoisted_17 = {
	class: 'hidden lg:flex lg:items-center lg:space-x-6',
}
var _hoisted_18 = {
	class: 'relative',
}

var _hoisted_19 = /*#__PURE__*/ createVNode(
	'span',
	{
		class: 'sr-only',
	},
	'Open additional menu',
	-1
)

var _hoisted_20 = /*#__PURE__*/ createVNode(
	'svg',
	{
		class: 'w-6 h-6',
		role: 'presentation',
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		viewBox: '0 0 24 24',
		stroke: 'currentColor',
	},
	[
		/*#__PURE__*/ createVNode('path', {
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			'stroke-width': '2',
			d:
				'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z',
		}),
	],
	-1
)

var _hoisted_21 = {
	key: 0,
	class:
		'absolute z-10 w-screen max-w-xs px-2 mt-3 transform -translate-x-full left-24 sm:px-0',
}

var _hoisted_22 = /*#__PURE__*/ createStaticVNode(
	'<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"><div class="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8"><a href="http://blog.nativescript.org/" class="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50"><p class="text-base font-medium text-gray-900">Blog</p><p class="mt-1 text-sm text-gray-500">Read about updates, tips &amp; tricks, guides from us and the community.</p></a><a href="https://play.nativescript.org/" target="_blank" class="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50"><p class="text-base font-medium text-gray-900">Playground</p><p class="mt-1 text-sm text-gray-500">Try out NativeScript in your browser and your phone.</p></a><a href="https://github.com/NativeScript/management/blob/master/nativescript-governance.md" class="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50"><p class="text-base font-medium text-gray-900">Governance</p><p class="mt-1 text-sm text-gray-500">Learn about the governance model and how you can be a part of it.</p></a></div></div>',
	1
)

var _hoisted_23 = /*#__PURE__*/ createVNode(
	'a',
	{
		href: 'https://github.com/NativeScript/NativeScript',
		target: '_blank',
		rel: 'noopener noreferrer',
		class:
			'inline-flex items-center justify-center p-2 text-gray-900 transition-colors rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
		'aria-expanded': 'false',
	},
	[
		/*#__PURE__*/ createVNode(
			'span',
			{
				class: 'sr-only',
			},
			'Open NativeScript GitHub'
		),
		/*#__PURE__*/ createVNode(
			'svg',
			{
				class: 'w-6 h-6',
				role: 'presentation',
				viewBox: '0 0 16 16',
				fill: 'currentColor',
			},
			[
				/*#__PURE__*/ createVNode('path', {
					'fill-rule': 'evenodd',
					d:
						'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
				}),
			]
		),
	],
	-1
)

var _hoisted_24 = {
	key: 0,
	class:
		'absolute inset-x-0 top-0 z-20 p-2 transition origin-top transform lg:hidden',
}
var _hoisted_25 = {
	class:
		'overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5',
}
var _hoisted_26 = {
	class: 'flex items-center justify-between px-5 pt-4',
}
var _hoisted_27 = {
	class: '-mr-3',
}

var _hoisted_28 = /*#__PURE__*/ createVNode(
	'span',
	{
		class: 'sr-only',
	},
	'Close menu',
	-1
)

var _hoisted_29 = /*#__PURE__*/ createVNode(
	'svg',
	{
		class: 'w-6 h-6',
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		viewBox: '0 0 24 24',
		stroke: 'currentColor',
		'aria-hidden': 'true',
	},
	[
		/*#__PURE__*/ createVNode('path', {
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			'stroke-width': '2',
			d: 'M6 18L18 6M6 6l12 12',
		}),
	],
	-1
)

var _hoisted_30 = {
	class: 'pt-5 pb-6',
}
var _hoisted_31 = {
	class: 'px-2 space-y-1',
}

var _hoisted_32 = /*#__PURE__*/ createVNode(
	'a',
	{
		href: 'https://blog.nativescript.org/',
		class:
			'block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50',
	},
	'Blog',
	-1
)

var _hoisted_33 = /*#__PURE__*/ createVNode(
	'a',
	{
		href: 'https://play.nativescript.org/',
		class:
			'block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50',
	},
	'Playground',
	-1
)

var _hoisted_34 = /*#__PURE__*/ createVNode(
	'a',
	{
		href:
			'https://github.com/NativeScript/management/blob/master/nativescript-governance.md',
		class:
			'block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50',
	},
	'Governance',
	-1
)

var _hoisted_35 = {
	class: 'px-5 mt-6',
}
var _hoisted_36 = {
	class: 'w-full',
}

var _hoisted_37 = /*#__PURE__*/ createVNode(
	'div',
	{
		class:
			'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
	},
	[
		/*#__PURE__*/ createVNode(
			'svg',
			{
				class: 'w-5 h-5',
				xmlns: 'http://www.w3.org/2000/svg',
				viewBox: '0 0 20 20',
				fill: 'currentColor',
				'aria-hidden': 'true',
			},
			[
				/*#__PURE__*/ createVNode('path', {
					'fill-rule': 'evenodd',
					d:
						'M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z',
					'clip-rule': 'evenodd',
				}),
			]
		),
	],
	-1
)

var _hoisted_38 = /*#__PURE__*/ createVNode(
	'button',
	{
		class: 'block w-full py-3 pl-10 text-left rounded-md bg-ns-blue',
	},
	'Search Anything',
	-1
)

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
	var _component_NativeScriptLogo = resolveComponent('NativeScriptLogo')

	var _component_AlgoliaSearchBox = resolveComponent('AlgoliaSearchBox')

	var _component_ClientOnly = resolveComponent('ClientOnly')

	return (
		openBlock(),
		createBlock('header', _hoisted_1$9, [
			createVNode('div', _hoisted_2$8, [
				createVNode('nav', _hoisted_3$5, [
					createVNode('div', _hoisted_4$5, [
						createVNode('div', _hoisted_5$2, [
							createVNode(
								'a',
								{
									href: _ctx.mainURL,
								},
								[
									_hoisted_6$2,
									createVNode(_component_NativeScriptLogo, {
										class: 'w-auto h-8 sm:h-10',
										'aria-hidden': 'true',
									}),
								],
								8,
								['href']
							),
							createVNode('div', _hoisted_7$2, [
								createVNode(
									'button',
									{
										onClick:
											_cache[1] ||
											(_cache[1] = function ($event) {
												return (_ctx.mobileMenuOpen = true)
											}),
										type: 'button',
										class:
											'inline-flex items-center justify-center p-2 text-gray-900 bg-white rounded-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white',
										'aria-expanded': 'false',
									},
									[_hoisted_8$2, _hoisted_9$1]
								),
							]),
						]),
						createVNode('div', _hoisted_10$1, [
							createVNode('div', _hoisted_11$1, [
								createVNode('div', _hoisted_12$1, [
									createVNode('div', _hoisted_13$1, [
										createVNode(_component_ClientOnly, null, {
											default: withCtx(function () {
												return [
													createVNode(
														_component_AlgoliaSearchBox,
														{
															options: _ctx.algoliaOptions,
														},
														null,
														8,
														['options']
													),
												]
											}),
											_: 1,
										}),
										_hoisted_14$1,
										_hoisted_15$1,
									]),
								]),
							]),
						]),
					]),
					createVNode('div', _hoisted_17, [
						(openBlock(true),
						createBlock(
							Fragment,
							null,
							renderList(_ctx.nav, function (navItem, index) {
								return (
									openBlock(),
									createBlock(
										'a',
										{
											key: index,
											href: navItem.link,
											target: navItem.target,
											class:
												'text-base font-medium text-white border-b-4 border-transparent hover:border-blue-100',
										},
										toDisplayString(navItem.text),
										9,
										['href', 'target']
									)
								)
							}),
							128
						)),
						createVNode('div', _hoisted_18, [
							createVNode(
								'button',
								{
									onClick:
										_cache[2] ||
										(_cache[2] = withModifiers(
											function ($event) {
												return (_ctx.flyoutMenuOpen = !_ctx.flyoutMenuOpen)
											},
											['prevent']
										)),
									class: [
										'relative z-20 inline-flex items-center justify-center p-2 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
										{
											'bg-white text-gray-900': _ctx.flyoutMenuOpen,
											'text-white hover:text-gray-900': !_ctx.flyoutMenuOpen,
										},
									],
									role: 'button',
									'aria-expanded': _ctx.flyoutMenuOpen,
								},
								[_hoisted_19, _hoisted_20],
								10,
								['aria-expanded']
							),
							createVNode(
								Transition,
								{
									'enter-from-class': 'opacity-0',
									'enter-to-class': 'opacity-100',
									'leave-from-class': 'opacity-100',
									'leave-to-class': 'opacity-0',
								},
								{
									default: withCtx(function () {
										return [
											_ctx.flyoutMenuOpen
												? (openBlock(),
												  createBlock('button', {
														key: 0,
														tabindex: '-1',
														onClick:
															_cache[3] ||
															(_cache[3] = function ($event) {
																return (_ctx.flyoutMenuOpen = false)
															}),
														class:
															'fixed inset-0 z-10 w-screen h-screen transition duration-200 bg-gray-900 cursor-default bg-opacity-20',
												  }))
												: createCommentVNode('', true),
										]
									}),
									_: 1,
								}
							),
							createVNode(
								Transition,
								{
									'enter-active-class': 'transition duration-200 ease-out',
									'enter-from-class': 'translate-y-1 opacity-0',
									'enter-to-class': 'translate-y-0 opacity-100',
									'leave-active-class': 'transition duration-150 ease-in',
									'leave-from-class': 'translate-y-0 opacity-100',
									'leave-to-class': 'translate-y-1 opacity-0',
								},
								{
									default: withCtx(function () {
										return [
											_ctx.flyoutMenuOpen
												? (openBlock(),
												  createBlock('div', _hoisted_21, [_hoisted_22]))
												: createCommentVNode('', true),
										]
									}),
									_: 1,
								}
							),
						]),
						_hoisted_23,
					]),
				]),
			]),
			createVNode(
				Transition,
				{
					'enter-active-class': 'duration-150 ease-out',
					'enter-from-class': 'scale-95 opacity-0',
					'enter-to-class': 'scale-100 opacity-100',
					'leave-active-class': 'duration-100 ease-in',
					'leave-from-class': 'scale-100 opacity-100',
					'leave-to-class': 'opacity-0',
				},
				{
					default: withCtx(function () {
						return [
							_ctx.mobileMenuOpen
								? (openBlock(),
								  createBlock('div', _hoisted_24, [
										createVNode('div', _hoisted_25, [
											createVNode('div', _hoisted_26, [
												createVNode('div', null, [
													createVNode(_component_NativeScriptLogo, {
														class: 'w-auto h-8',
														variant: 'blue',
														'aria-hidden': 'true',
													}),
												]),
												createVNode('div', _hoisted_27, [
													createVNode(
														'button',
														{
															onClick:
																_cache[4] ||
																(_cache[4] = function ($event) {
																	return (_ctx.mobileMenuOpen = false)
																}),
															type: 'button',
															class:
																'inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600',
														},
														[_hoisted_28, _hoisted_29]
													),
												]),
											]),
											createVNode('div', _hoisted_30, [
												createVNode('div', _hoisted_31, [
													(openBlock(true),
													createBlock(
														Fragment,
														null,
														renderList(_ctx.nav, function (navItem, index) {
															return (
																openBlock(),
																createBlock(
																	'a',
																	{
																		key: index,
																		href: navItem.link,
																		target: navItem.target,
																		class:
																			'block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50',
																	},
																	toDisplayString(navItem.text),
																	9,
																	['href', 'target']
																)
															)
														}),
														128
													)),
													_hoisted_32,
													_hoisted_33,
													_hoisted_34,
												]),
												createVNode('div', _hoisted_35, [
													createVNode('div', _hoisted_36, [
														createVNode(
															'div',
															{
																onClickCapture:
																	_cache[5] ||
																	(_cache[5] = function () {
																		return (
																			_ctx.openSearch &&
																			_ctx.openSearch.apply(_ctx, arguments)
																		)
																	}),
																class: 'relative text-white',
															},
															[_hoisted_37, _hoisted_38],
															32
														),
													]),
												]),
											]),
										]),
								  ]))
								: createCommentVNode('', true),
						]
					}),
					_: 1,
				}
			),
		])
	)
}

script$9.render = render$9

var _hoisted_1$8 = {
	xmlns: 'http://www.w3.org/2000/svg',
	viewBox: '0 0 1000 320',
	fill: 'currentColor',
}

var _hoisted_2$7 = /*#__PURE__*/ createVNode(
	'g',
	null,
	[
		/*#__PURE__*/ createVNode('path', {
			d:
				'M271.4,78.1L137,0.5L136.1,0l-0.9,0.5L1.6,77.7l-0.7,0.4L0,78.6v157.2l0.9,0.5l134.4,77.6l0.9,0.5l0.9-0.5l132.6-76.5   l1.8-1l0.9-0.5V78.6L271.4,78.1z M122.7,20.1L89.8,77H24.1L122.7,20.1z M84.4,86.4L69,113.1L22.8,86.4H84.4z M72.4,125.8l54.3,31.4   l-54.3,31.4l-18.1-31.4L72.4,125.8z M64.4,121.2l-15.4,26.7L18.1,94.5L64.4,121.2z M10.7,100.3l32.9,56.9l-32.9,56.9V100.3z    M48.9,166.6l15.4,26.7l-46.2,26.7L48.9,166.6z M69,201.3L84.4,228H22.8L69,201.3z M24.1,237.4h65.7l32.9,56.9L24.1,237.4z    M131.5,290.8l-30.8-53.4h30.8V290.8z M131.5,228H95.2l-18.1-31.4l54.3-31.4V228z M131.5,149.1l-54.3-31.4l18.1-31.4h36.2V149.1z    M131.5,77h-30.8l30.8-53.4V77z M207.9,121.2l46.2-26.7l-30.8,53.4L207.9,121.2z M217.9,157.2l-18.1,31.4l-54.3-31.4l54.3-31.4   L217.9,157.2z M203.2,113.1l-15.4-26.7h61.6L203.2,113.1z M248.1,77h-65.7l-32.8-56.9L248.1,77z M140.8,23.6L171.6,77h-30.8V23.6z    M140.8,86.4H177l18.1,31.4l-54.3,31.4V86.4z M140.8,165.3l54.3,31.4L177,228h-36.2V165.3z M140.8,237.4h30.8l-30.8,53.4V237.4z    M149.6,294.3l32.8-56.9h65.7L149.6,294.3z M187.8,228l15.4-26.7l46.2,26.7H187.8z M207.9,193.2l15.4-26.7l30.8,53.4L207.9,193.2z    M261.6,214.1l-32.9-56.9l32.9-56.9V214.1z',
		}),
		/*#__PURE__*/ createVNode('polygon', {
			points:
				'308.4,202.7 372.6,202.7 372.6,208.5 315,208.5 315,257 367.2,257 367.2,263 315,263 315,312.9 308.4,312.9  ',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M383.8,279.7c0-19,15.2-34.4,34.5-34.4c19.3,0,34.2,15.4,34.2,34.4c0,19-14.9,34.5-34.2,34.5   C399,314.2,383.8,298.7,383.8,279.7 M446,279.7c0-16.4-11.2-28.7-27.7-28.7c-16.5,0-28,12.3-28,28.7c0,16.4,11.5,28.9,28,28.9   C434.8,308.6,446,296.1,446,279.7',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M469.9,288.5v-41.7h6.3v40.7c0,13.5,6.3,21.1,19,21.1c14.3,0,24.3-9.6,24.3-24.8v-37h6.3v66.2h-6.3l0.2-14.6   c-4.4,9.9-13.5,16-25.1,16C479.8,314.4,469.9,304.7,469.9,288.5',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M543,246.8h6.3l-0.2,14.8c4.4-10,13.6-16.2,25.3-16.2c14.8,0,24.6,9.9,24.6,26.3v41.3h-6.3v-40.2   c0-13.6-6.3-21.6-19.1-21.6c-14.3,0-24.3,9.4-24.3,24.8v37H543V246.8z',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M616.3,279.7c0-19.5,13.8-34.4,32.8-34.4c13.5,0,23.2,7.3,28,17.2v-66.6h6.3v117.1h-6.3l0.3-16.5   c-4.7,10.2-15.6,17.8-28.4,17.8C630.1,314.2,616.3,299.2,616.3,279.7 M677.6,279.7c0-16.4-11-28.7-27.7-28.7   c-16.4,0-26.9,12.3-26.9,28.7c0,16.4,10.5,28.9,26.9,28.9C666.6,308.6,677.6,296.1,677.6,279.7',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M748,271.4c0-14.9-6.8-20.6-17.7-20.6c-10.1,0-16.9,4.2-21.6,11.4l-4.5-3.2c5.5-8.6,14.9-13.6,26.3-13.6   c13.6,0,23.8,8.3,23.8,25.5v42.2H748l0.3-10.2c-4.2,6.3-11.5,11.5-22.9,11.5c-15.1,0-25-7-25-20.3c0-13.1,11.5-19.3,24.2-19.3H748   V271.4z M725.4,279.9c-10.1,0-18.6,3.9-18.6,13.9c0,10.1,6.6,14.8,19.3,14.8c11,0,21.9-6.5,21.9-16.7v-12H725.4z',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M782.5,295.4v-43.3h-10.4v-5.4h10.4v-23.2h6.3v23.2h19.1v5.4h-19.1v43.1c0,9.7,3.4,13.3,8.9,13.3c5.8,0,8.1-2.3,10.5-4.9   l4.1,3.9c-3.2,3.7-7.1,6.6-14.6,6.6C789.3,314.2,782.5,308.9,782.5,295.4',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M829.5,218.2c0-3.1,2.6-5.4,5.4-5.4c2.8,0,5.4,2.3,5.4,5.4c0,3.2-2.6,5.3-5.4,5.3C832.1,223.6,829.5,221.5,829.5,218.2    M831.8,246.8h6.3v66.2h-6.3V246.8z',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M857.1,279.7c0-19,15.2-34.4,34.5-34.4c19.3,0,34.2,15.4,34.2,34.4c0,19-14.9,34.5-34.2,34.5   C872.4,314.2,857.1,298.7,857.1,279.7 M919.4,279.7c0-16.4-11.2-28.7-27.7-28.7c-16.5,0-28,12.3-28,28.7c0,16.4,11.5,28.9,28,28.9   C908.2,308.6,919.4,296.1,919.4,279.7',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M943.9,246.8h6.3l-0.2,14.8c4.4-10,13.6-16.2,25.3-16.2c14.8,0,24.6,9.9,24.6,26.3v41.3h-6.3v-40.2   c0-13.6-6.3-21.6-19.1-21.6c-14.3,0-24.3,9.4-24.3,24.8v37h-6.3V246.8z',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M308.4,73.1c0-41.4,31.8-71.3,71.7-71.3c39.6,0,71.5,29.8,71.5,71.3c0,41.4-31.9,71.3-71.5,71.3   C340.2,144.3,308.4,114.5,308.4,73.1 M429.4,73.1c0-29.6-20.4-51.9-49.4-51.9c-29,0-49.6,22.3-49.6,51.9   c0,29.6,20.6,51.9,49.6,51.9C409,124.9,429.4,102.7,429.4,73.1',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M473.9,56.8h20.8l-0.6,15.9c5.5-10.6,15.7-17.8,30.4-17.8c22,0,39.8,18.6,39.8,44.5c0,25.9-18,44.9-40.2,44.9   c-14.3,0-24.5-6.9-29.4-16.5v58h-20.8V56.8z M543.1,99.4c0-15.5-9.4-26.1-24.3-26.1c-15.1,0-24.9,10.6-24.9,26.1   c0,16.1,9.8,26.7,24.9,26.7C533.8,126.2,543.1,115.6,543.1,99.4',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M635,127c11.2,0,19.4-4.5,24.3-9.2l12,12.7c-8,8-19,13.9-36.1,13.9c-29.4,0-48.4-19-48.4-44.7c0-25.5,20-44.7,45.7-44.7   c29.2,0,45.7,21.6,44.3,51.7h-69C610.3,119,619.3,127,635,127 M656.1,92.3c-1.8-11.6-9-20.2-23.3-20.2c-13.3,0-22.5,7.3-24.9,20.2   H656.1z',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M699.7,56.8h20.6l-0.4,15.9c5.3-11.2,16.1-17.8,29-17.8c19,0,32.1,13.5,32.1,36.7v50.8h-20.6V93.3   c0-12.3-5.7-19.4-17.8-19.4c-13.5,0-22.3,8.2-22.3,22v46.5h-20.6V56.8z',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M803.5,120.9l17.6-10.8c4.9,8.8,10.6,14.9,20.8,14.9c11.6,0,19.2-5.5,19.2-21.6V3.7h21.6v100c0,27.6-16.5,40.6-39.8,40.6   C822.3,144.3,810.1,133.7,803.5,120.9',
		}),
		/*#__PURE__*/ createVNode('path', {
			d:
				'M904.9,115.6l17.8-9.8c6.5,10.8,14.9,19.4,31.8,19.4c14.1,0,24.1-7.6,24.1-19c0-12-8.2-17.4-23.3-24.1l-9.2-4.1   c-20.2-9-32.5-19.2-32.5-40.6c0-20.6,15.9-35.3,39-35.3C971,2,983.5,9,991.8,23.9l-16.9,10.4c-5.3-9.2-11.4-13.5-22.3-13.5   c-11,0-18,6.7-18,16.1c0,10.4,5.9,15.1,20,21.2l9,4.1c23.7,10.4,36.3,21.4,36.3,43.7c0,24.3-19,38.4-45.1,38.4   C928.5,144.3,912.6,131.3,904.9,115.6',
		}),
	],
	-1
)

function render$8(_ctx, _cache) {
	return openBlock(), createBlock('svg', _hoisted_1$8, [_hoisted_2$7])
}

var script$8 = {}
script$8.render = render$8

var script$7 = defineComponent({
	setup: function setup() {},
	components: {
		OpenJSLogo: script$8,
	},
})

var _hoisted_1$7 = {
	class: '',
}
var _hoisted_2$6 = {
	class:
		'px-4 pt-10 pb-4 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-6',
}

var _hoisted_3$4 = /*#__PURE__*/ createVNode(
	'div',
	{
		class: 'flex justify-center space-x-6 md:order-3',
	},
	[
		/*#__PURE__*/ createVNode(
			'a',
			{
				href: 'https://twitter.com/NativeScript',
				target: '_blank',
				rel: 'noopener noreferrer',
				class: 'text-gray-400 hover:text-gray-500',
			},
			[
				/*#__PURE__*/ createVNode(
					'span',
					{
						class: 'sr-only',
					},
					'Twitter'
				),
				/*#__PURE__*/ createVNode(
					'svg',
					{
						class: 'w-6 h-6 p-0.5',
						fill: 'currentColor',
						viewBox: '0 0 24 24',
						'aria-hidden': 'true',
					},
					[
						/*#__PURE__*/ createVNode('path', {
							d:
								'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
						}),
					]
				),
			]
		),
		/*#__PURE__*/ createVNode(
			'a',
			{
				href: 'https://nativescript.org/discord',
				target: '_blank',
				rel: 'noopener noreferrer',
				class: 'text-gray-400 hover:text-gray-500',
			},
			[
				/*#__PURE__*/ createVNode(
					'span',
					{
						class: 'sr-only',
					},
					'Discord'
				),
				/*#__PURE__*/ createVNode(
					'svg',
					{
						class: 'w-6 h-6 p-0.5',
						fill: 'currentColor',
						viewBox: '0 0 24 24',
						'aria-hidden': 'true',
					},
					[
						/*#__PURE__*/ createVNode('path', {
							d:
								'M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z',
						}),
					]
				),
			]
		),
		/*#__PURE__*/ createVNode(
			'a',
			{
				href: 'https://stackoverflow.com/questions/tagged/nativescript',
				target: '_blank',
				rel: 'noopener noreferrer',
				class: 'text-gray-400 hover:text-gray-500',
			},
			[
				/*#__PURE__*/ createVNode(
					'span',
					{
						class: 'sr-only',
					},
					'Stack Overflow'
				),
				/*#__PURE__*/ createVNode(
					'svg',
					{
						class: 'w-6 h-6 p-0.5',
						fill: 'currentColor',
						viewBox: '0 0 24 24',
						'aria-hidden': 'true',
					},
					[
						/*#__PURE__*/ createVNode('path', {
							d:
								'M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z',
						}),
					]
				),
			]
		),
		/*#__PURE__*/ createVNode(
			'a',
			{
				href: 'https://github.com/NativeScript/NativeScript',
				target: '_blank',
				rel: 'noopener noreferrer',
				class: 'text-gray-400 hover:text-gray-500',
			},
			[
				/*#__PURE__*/ createVNode(
					'span',
					{
						class: 'sr-only',
					},
					'GitHub'
				),
				/*#__PURE__*/ createVNode(
					'svg',
					{
						class: 'w-6 h-6',
						fill: 'currentColor',
						viewBox: '0 0 24 24',
						'aria-hidden': 'true',
					},
					[
						/*#__PURE__*/ createVNode('path', {
							'fill-rule': 'evenodd',
							d:
								'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
							'clip-rule': 'evenodd',
						}),
					]
				),
			]
		),
	],
	-1
)

var _hoisted_4$4 = {
	class: 'order-1 mt-8 md:mt-0',
}
var _hoisted_5$1 = {
	href: 'https://openjsf.org/',
	target: '_blank',
	rel: 'noopener noreferrer',
	class: 'flex justify-center text-gray-400 hover:text-gray-500',
}

var _hoisted_6$1 = /*#__PURE__*/ createVNode(
	'span',
	{
		class: 'sr-only',
	},
	'OpenJS Foundation',
	-1
)

var _hoisted_7$1 = {
	class: 'mt-8 md:mt-0 md:order-2',
}
var _hoisted_8$1 = {
	class: 'text-base text-center text-gray-500',
}
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
	var _component_OpenJSLogo = resolveComponent('OpenJSLogo')

	return (
		openBlock(),
		createBlock('footer', _hoisted_1$7, [
			createVNode('div', _hoisted_2$6, [
				_hoisted_3$4,
				createVNode('div', _hoisted_4$4, [
					createVNode('a', _hoisted_5$1, [
						_hoisted_6$1,
						createVNode(_component_OpenJSLogo, {
							'aria-hidden': 'true',
							class: 'w-auto h-12',
						}),
					]),
				]),
				createVNode('div', _hoisted_7$1, [
					createVNode(
						'p',
						_hoisted_8$1,
						'© ' +
							toDisplayString(new Date().getFullYear()) +
							' All rights reserved.',
						1
					),
				]),
			]),
		])
	)
}

script$7.render = render$7

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true,
		})
	} else {
		obj[key] = value
	}

	return obj
}

function _slicedToArray(arr, i) {
	return (
		_arrayWithHoles(arr) ||
		_iterableToArrayLimit(arr, i) ||
		_unsupportedIterableToArray(arr, i) ||
		_nonIterableRest()
	)
}

function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr
}

function _iterableToArrayLimit(arr, i) {
	if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return
	var _arr = []
	var _n = true
	var _d = false
	var _e = undefined

	try {
		for (
			var _i = arr[Symbol.iterator](), _s;
			!(_n = (_s = _i.next()).done);
			_n = true
		) {
			_arr.push(_s.value)

			if (i && _arr.length === i) break
		}
	} catch (err) {
		_d = true
		_e = err
	} finally {
		try {
			if (!_n && _i['return'] != null) _i['return']()
		} finally {
			if (_d) throw _e
		}
	}

	return _arr
}

function _unsupportedIterableToArray(o, minLen) {
	if (!o) return
	if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
	var n = Object.prototype.toString.call(o).slice(8, -1)
	if (n === 'Object' && o.constructor) n = o.constructor.name
	if (n === 'Map' || n === 'Set') return Array.from(o)
	if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
		return _arrayLikeToArray(o, minLen)
}

function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length

	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]

	return arr2
}

function _nonIterableRest() {
	throw new TypeError(
		'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
	)
}

function useActiveSidebarLinks$1() {
	var rootActiveLink = null
	var activeLink = null
	var onScroll = throttleAndDebounce$1(setActiveLink, 300)

	function setActiveLink() {
		var sidebarLinks = getSidebarLinks$1()
		var anchors = getAnchors$1(sidebarLinks)

		for (var i = 0; i < anchors.length; i++) {
			var anchor = anchors[i]
			var nextAnchor = anchors[i + 1]

			var _isAnchorActive = isAnchorActive$1(i, anchor, nextAnchor),
				_isAnchorActive2 = _slicedToArray(_isAnchorActive, 2),
				isActive = _isAnchorActive2[0],
				hash = _isAnchorActive2[1]

			if (isActive) {
				history.replaceState(null, document.title, hash ? hash : ' ')
				activateLink(hash)
				return
			}
		}
	}

	function activateLink(hash) {
		deactiveLink(activeLink)
		deactiveLink(rootActiveLink)
		activeLink = document.querySelector('.sidebar a[href="'.concat(hash, '"]'))

		if (!activeLink) {
			return
		}

		activeLink.classList.add('active') // also add active class to parent h2 anchors

		var rootLi = activeLink.closest('.sidebar-links > ul > li')

		if (rootLi && rootLi !== activeLink.parentElement) {
			rootActiveLink = rootLi.querySelector('a')
			rootActiveLink && rootActiveLink.classList.add('active')
		} else {
			rootActiveLink = null
		}
	}

	function deactiveLink(link) {
		link && link.classList.remove('active')
	}

	onMounted(function () {
		setActiveLink()
		window.addEventListener('scroll', onScroll)
	})
	onUpdated(function () {
		// sidebar update means a route change
		activateLink(decodeURIComponent(location.hash))
	})
	onUnmounted(function () {
		window.removeEventListener('scroll', onScroll)
	})
}

function getSidebarLinks$1() {
	return [].slice.call(
		document.querySelectorAll('.sidebar a.sidebar-link-item')
	)
}

function getAnchors$1(sidebarLinks) {
	return [].slice
		.call(document.querySelectorAll('.header-anchor'))
		.filter(function (anchor) {
			return sidebarLinks.some(function (sidebarLink) {
				return sidebarLink.hash === anchor.hash
			})
		})
}

function getPageOffset$1() {
	return document.querySelector('.nav-bar').offsetHeight
}

function getAnchorTop$1(anchor) {
	var pageOffset = getPageOffset$1()
	return anchor.parentElement.offsetTop - pageOffset - 15
}

function isAnchorActive$1(index, anchor, nextAnchor) {
	var scrollTop = window.scrollY

	if (index === 0 && scrollTop === 0) {
		return [true, null]
	}

	if (scrollTop < getAnchorTop$1(anchor)) {
		return [false, null]
	}

	if (!nextAnchor || scrollTop < getAnchorTop$1(nextAnchor)) {
		return [true, decodeURIComponent(anchor.hash)]
	}

	return [false, null]
}

function throttleAndDebounce$1(fn, delay) {
	var timeout
	var called = false
	return function () {
		if (timeout) {
			clearTimeout(timeout)
		}

		if (!called) {
			fn()
			called = true
			setTimeout(function () {
				called = false
			}, delay)
		} else {
			timeout = setTimeout(fn, delay)
		}
	}
}

function isArray(value) {
	return Array.isArray(value)
}
function ensureStartingSlash(path) {
	return /^\//.test(path) ? path : '/'.concat(path)
}

function isSideBarConfig(sidebar) {
	return sidebar === false || sidebar === 'auto' || isArray(sidebar)
}
/**
 * Get the `SideBarConfig` from sidebar option. This method will ensure to get
 * correct sidebar config from `MultiSideBarConfig` with various path
 * combinations such as matching `guide/` and `/guide/`. If no matching config
 * was found, it will return `auto` as a fallback.
 */

function getSideBarConfig(sidebar, path) {
	if (isSideBarConfig(sidebar)) {
		return sidebar
	}

	path = ensureStartingSlash(path)

	for (var dir in sidebar) {
		// make sure the multi sidebar key starts with slash too
		if (path.startsWith(ensureStartingSlash(dir))) {
			return sidebar[dir]
		}
	}

	return 'auto'
}

function useSideBar() {
	var route = useRoute()
	var site = useSiteDataByRoute()
	useActiveSidebarLinks$1()
	return computed(function () {
		// at first, we'll check if we can find the sidebar setting in frontmatter.
		var headers = route.data.headers
		var frontSidebar = route.data.frontmatter.sidebar
		var sidebarDepth = route.data.frontmatter.sidebarDepth // if it's `false`, we'll just return an empty array here.

		if (frontSidebar === false) {
			return []
		} // if it's `atuo`, render headers of the current page

		if (frontSidebar === 'auto') {
			return resolveAutoSidebar(headers, sidebarDepth)
		} // now, there's no sidebar setting at frontmatter; let's see the configs

		var themeSidebar = getSideBarConfig(
			site.value.themeConfig.sidebar,
			route.data.relativePath
		)

		if (themeSidebar === false) {
			return []
		}

		if (themeSidebar === 'auto') {
			return resolveAutoSidebar(headers, sidebarDepth)
		}

		return themeSidebar
	})
}

function resolveAutoSidebar(headers, depth) {
	var ret = []

	if (headers === undefined) {
		return []
	}

	var lastH2 = undefined
	headers.forEach(function (_ref) {
		var level = _ref.level,
			title = _ref.title,
			slug = _ref.slug

		if (level - 1 > depth) {
			return
		}

		var item = {
			text: title,
			link: '#'.concat(slug),
		}

		if (level === 2) {
			lastH2 = item
			ret.push(item)
		} else if (lastH2) {
			;(lastH2.children || (lastH2.children = [])).push(item)
		}
	})
	return ret
}

var hashRE = /#.*$/
var extRE = /(index)?\.(md|html)$/
function isActive(route, path) {
	if (path === undefined) {
		return false
	}

	var routePath = normalize('/'.concat(route.data.relativePath))
	var pagePath = normalize(path)
	return routePath === pagePath
}
function normalize(path) {
	return decodeURI(path).replace(hashRE, '').replace(extRE, '')
}
function joinUrl(base, path) {
	var baseEndsWithSlash = base.endsWith('/')
	var pathStartsWithSlash = path.startsWith('/')

	if (baseEndsWithSlash && pathStartsWithSlash) {
		return base.slice(0, -1) + path
	}

	if (!baseEndsWithSlash && !pathStartsWithSlash) {
		return ''.concat(base, '/').concat(path)
	}

	return base + path
}

var SideBarLink = function SideBarLink(props) {
	var route = useRoute()
	var site = useSiteData()
	var text = props.item.text
	var link = resolveLink(site.value.base, props.item.link)
	var children = props.item.children
	var active = isActive(route, props.item.link)
	var childItems = createChildren(children)
	return h$1(
		'li',
		{
			class: 'mt-2',
		},
		[
			h$1(
				link ? 'a' : 'p',
				{
					class: {
						'text-gray-500 hover:text-gray-900 px-4 py-1 text-md': !!link,
						'text-gray-600 font-bold mt-6 uppercase text-xs mb-3': !link,
						// titles
						'text-blue-400 font-bold': active,
					},
					href: link,
				},
				text
			),
			childItems,
		]
	)
}

function resolveLink(base, path) {
	if (path === undefined) {
		return path
	} // keep relative hash to the same page

	if (path.startsWith('#')) {
		return path
	}

	return joinUrl(base, path)
}

function createChildren(children) {
	if (children && children.length > 0) {
		return h$1(
			'ul',
			{
				class: '',
			},
			children.map(function (c) {
				return h$1(SideBarLink, {
					item: c,
				})
			})
		)
	}

	return null // return active && headers
	//   ? createChildren(false, resolveHeaders(headers))
	//   : null
} // function resolveHeaders(headers: any[]): any[] {
//   return mapHeaders(groupHeaders(headers))
// }
// function groupHeaders(headers: any[]): HeaderWithChildren[] {
//   headers = headers.map((h) => Object.assign({}, h))
//   let lastH2: HeaderWithChildren
//   headers.forEach((h) => {
//     if (h.level === 2) {
//       lastH2 = h
//     } else if (lastH2) {
//       ;(lastH2.children || (lastH2.children = [])).push(h)
//     }
//   })
//   return headers.filter((h) => h.level === 2)
// }
// function mapHeaders(headers: any[]): any[] {
//   return headers.map((header) => ({
//     text: header.title,
//     link: `#${header.slug}`,
//     children: header.children ? mapHeaders(header.children) : undefined
//   }))
// }

var script$6 = defineComponent({
	setup: function setup() {
		var items = useSideBar()
		return {
			items: items, //: [],
		}
	},
	components: {
		SideBarLink: SideBarLink,
	},
})

var _hoisted_1$6 = {
	key: 0,
	class: '',
}
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
	var _component_SideBarLink = resolveComponent('SideBarLink')

	return _ctx.items.length > 0
		? (openBlock(),
		  createBlock('ul', _hoisted_1$6, [
				(openBlock(true),
				createBlock(
					Fragment,
					null,
					renderList(_ctx.items, function (item) {
						return (
							openBlock(),
							createBlock(
								_component_SideBarLink,
								{
									key: item.text,
									item: item,
								},
								null,
								8,
								['item']
							)
						)
					}),
					128
				)),
		  ]))
		: createCommentVNode('', true)
}

script$6.render = render$6

var _hoisted_1$5 = {
	class: 'bg-ns-blue',
}
var _hoisted_2$5 = {
	class: 'container px-6 pb-2 mx-auto',
}

var _hoisted_3$3 = /*#__PURE__*/ createVNode(
	'svg',
	{
		class: 'w-6 h-6',
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		viewBox: '0 0 24 24',
		stroke: 'currentColor',
	},
	[
		/*#__PURE__*/ createVNode('path', {
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			'stroke-width': '2',
			d: 'M10 19l-7-7m0 0l7-7m-7 7h18',
		}),
	],
	-1
)

var _hoisted_4$3 = /*#__PURE__*/ createVNode(
	'span',
	{
		class: 'pl-2',
	},
	' Back to Main site ',
	-1
)

function render$5(_ctx, _cache) {
	return (
		openBlock(),
		createBlock('div', _hoisted_1$5, [
			createVNode('div', _hoisted_2$5, [
				createVNode(
					'a',
					{
						href: _ctx.$themeConfig.mainURL,
						class: 'flex items-center text-white',
					},
					[_hoisted_3$3, _hoisted_4$3],
					8,
					['href']
				),
			]),
		])
	)
}

var script$5 = {}
script$5.render = render$5

function useActiveSidebarLinks() {
	var rootActiveLink = null
	var activeLink = null
	var onScroll = throttleAndDebounce(setActiveLink, 300)

	function setActiveLink() {
		var sidebarLinks = getSidebarLinks()
		var anchors = getAnchors(sidebarLinks)

		for (var i = 0; i < anchors.length; i++) {
			var anchor = anchors[i]
			var nextAnchor = anchors[i + 1]

			var _isAnchorActive = isAnchorActive(i, anchor, nextAnchor),
				_isAnchorActive2 = _slicedToArray(_isAnchorActive, 2),
				isActive = _isAnchorActive2[0],
				hash = _isAnchorActive2[1]

			if (isActive) {
				history.replaceState(null, document.title, hash ? hash : ' ')
				activateLink(hash)
				return
			}
		}
	}

	function activateLink(hash) {
		deactiveLink(activeLink)
		deactiveLink(rootActiveLink)
		activeLink = document.querySelector(
			'a[href="'.concat(hash, '"].sidebar-link')
		)

		if (!activeLink) {
			return
		}

		activeLink.classList.add('active') // also add active class to parent h2 anchors

		var rootLi = activeLink.closest('.sidebar-links > ul > li')

		if (rootLi && rootLi !== activeLink.parentElement) {
			rootActiveLink = rootLi.querySelector('a')
			rootActiveLink && rootActiveLink.classList.add('active')
		} else {
			rootActiveLink = null
		}
	}

	function deactiveLink(link) {
		link && link.classList.remove('active')
	}

	onMounted(function () {
		setActiveLink()
		window.addEventListener('scroll', onScroll)
	})
	onUpdated(function () {
		// sidebar update means a route change
		activateLink(decodeURIComponent(location.hash))
	})
	onUnmounted(function () {
		window.removeEventListener('scroll', onScroll)
	})
}

function getSidebarLinks() {
	return [].slice.call(document.querySelectorAll('a.sidebar-link'))
}

function getAnchors(sidebarLinks) {
	return [].slice
		.call(document.querySelectorAll('.header-anchor'))
		.filter(function (anchor) {
			return sidebarLinks.some(function (sidebarLink) {
				return sidebarLink.hash === anchor.hash
			})
		})
}

function getPageOffset() {
	return document.querySelector('.nav-bar').offsetHeight
}

function getAnchorTop(anchor) {
	var pageOffset = getPageOffset()
	return anchor.parentElement.offsetTop - pageOffset - 15
}

function isAnchorActive(index, anchor, nextAnchor) {
	var scrollTop = window.scrollY

	if (index === 0 && scrollTop === 0) {
		return [true, null]
	}

	if (scrollTop < getAnchorTop(anchor)) {
		return [false, null]
	}

	if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
		return [true, decodeURIComponent(anchor.hash)]
	}

	return [false, null]
}

function throttleAndDebounce(fn, delay) {
	var timeout
	var called = false
	return function () {
		if (timeout) {
			clearTimeout(timeout)
		}

		if (!called) {
			fn()
			called = true
			setTimeout(function () {
				called = false
			}, delay)
		} else {
			timeout = setTimeout(fn, delay)
		}
	}
}

var CurrentFlavorSymbol = Symbol()
var LOCAL_STORAGE_KEY = '__CURRENT_FLAVOR__'
function createCurrentFlavor() {
	var storedFlavor = inBrowser ? localStorage.getItem(LOCAL_STORAGE_KEY) : ''
	var currentFlavor = ref(
		storedFlavor !== null && storedFlavor !== void 0 ? storedFlavor : undefined
	)
	watch(currentFlavor, function () {
		if (currentFlavor.value) {
			if (inBrowser) {
				localStorage.setItem(LOCAL_STORAGE_KEY, currentFlavor.value)
			}
		}
	})
	return {
		value: currentFlavor,
		set: function set(name) {
			currentFlavor.value = name
		},
	}
}
function useCurrentFlavor() {
	var flavor = inject(CurrentFlavorSymbol)

	if (!flavor) {
		throw new Error('useCurrentFlavor() is called without provider.')
	}

	return flavor
}

var script$4 = defineComponent({
	setup: function setup() {
		useActiveSidebarLinks()

		var _useCurrentFlavor = useCurrentFlavor(),
			currentFlavor = _useCurrentFlavor.value

		return {
			currentFlavor: currentFlavor,
		}
	},
})

var _withId = /*#__PURE__*/ withScopeId('data-v-2dcc8330')

pushScopeId('data-v-2dcc8330')

var _hoisted_1$4 = /*#__PURE__*/ createVNode(
	'div',
	{
		class: 'pt-10 pb-2 text-xs font-bold text-gray-700 uppercase',
	},
	'On this page',
	-1
)

var _hoisted_2$4 = {
	key: 0,
	class: 'text-xs',
}

popScopeId()

var render$4 = /*#__PURE__*/ _withId(function (
	_ctx,
	_cache,
	$props,
	$setup,
	$data,
	$options
) {
	return (
		openBlock(),
		createBlock(
			Fragment,
			null,
			[
				_hoisted_1$4,
				(openBlock(true),
				createBlock(
					Fragment,
					null,
					renderList(_ctx.$page.headers, function (header) {
						var _ref

						return (
							openBlock(),
							createBlock(
								'a',
								{
									key: header.slug,
									href: '#'.concat(header.slug),
									class: [
										((_ref = {}),
										_defineProperty(_ref, header.flavor, true),
										_defineProperty(_ref, 'pl-0', header.level === 2),
										_defineProperty(_ref, 'pl-4', header.level === 3),
										_defineProperty(
											_ref,
											'',
											_ctx.currentFlavor &&
												header.flavor &&
												_ctx.currentFlavor !== header.flavor
										),
										_ref),
										'block py-1 text-gray-500 text-md sidebar-link hover:text-gray-900',
									],
								},
								[
									createTextVNode(toDisplayString(header.title) + ' ', 1),
									_ctx.currentFlavor &&
									header.flavor &&
									_ctx.currentFlavor !== header.flavor
										? (openBlock(),
										  createBlock(
												'span',
												_hoisted_2$4,
												' (not applicable to ' +
													toDisplayString(_ctx.currentFlavor) +
													') ',
												1
										  ))
										: createCommentVNode('', true),
								],
								10,
								['href']
							)
						)
					}),
					128
				)),
			],
			64
		)
	)
})

script$4.render = render$4
script$4.__scopeId = 'data-v-2dcc8330'

var script$3 = defineComponent({
	setup: function setup() {},
	components: {
		Header: script$9,
		SideBar: script$6,
		SubHeader: script$5,
		OnThisPage: script$4,
	},
})

var _hoisted_1$3 = {
	class: 'min-h-screen font-sans antialiased',
}
var _hoisted_2$3 = {
	class: 'mx-auto 2xl:container lg:px-8',
}
var _hoisted_3$2 = {
	class: 'flex',
}
var _hoisted_4$2 = {
	class: 'hidden lg:block w-72 2xl:w-96',
}
var _hoisted_5 = {
	class: 'static h-full',
}
var _hoisted_6 = {
	class: 'sticky top-[88px] pt-4 overflow-y-auto h-sidebar',
}
var _hoisted_7 = {
	class: 'static flex-auto w-full max-h-full min-w-0 overflow-y-visible',
}
var _hoisted_8 = {
	class: 'flex w-full',
}
var _hoisted_9 = {
	class: 'flex-auto min-w-0 px-6 pt-10 pb-16',
}
var _hoisted_10 = {
	class: 'flex-none hidden pl-8 xl:block w-72 3xl:w-96',
}
var _hoisted_11 = {
	class: 'sticky h-sidebar top-[88px] h-sidebar',
}

var _hoisted_12 = /*#__PURE__*/ createVNode(
	'div',
	{
		class:
			'absolute inset-x-0 z-10 h-16 pointer-events-none lg:block bg-gradient-to-b from-white',
	},
	null,
	-1
)

var _hoisted_13 = {
	class: 'space-y-1 overflow-y-auto h-sidebar',
}

var _hoisted_14 = /*#__PURE__*/ createVNode(
	'div',
	{
		class: 'pt-6',
	},
	null,
	-1
)

var _hoisted_15 = /*#__PURE__*/ createVNode(
	'div',
	{
		class: 'pt-8',
	},
	null,
	-1
)

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
	var _component_Header = resolveComponent('Header')

	var _component_SideBar = resolveComponent('SideBar')

	var _component_Content = resolveComponent('Content')

	var _component_OnThisPage = resolveComponent('OnThisPage')

	var _component_Debug = resolveComponent('Debug')

	return (
		openBlock(),
		createBlock('div', _hoisted_1$3, [
			createVNode(
				_component_Header,
				{
					class: 'nav-bar',
					nav: _ctx.$themeConfig.nav,
					mainURL: _ctx.$themeConfig.mainURL,
				},
				null,
				8,
				['nav', 'mainURL']
			),
			createVNode('div', _hoisted_2$3, [
				createVNode('div', _hoisted_3$2, [
					createVNode('div', _hoisted_4$2, [
						createVNode('div', _hoisted_5, [
							createVNode('div', _hoisted_6, [createVNode(_component_SideBar)]),
						]),
					]),
					createVNode('div', _hoisted_7, [
						createVNode('div', _hoisted_8, [
							createVNode('div', _hoisted_9, [
								createVNode(_component_Content, {
									class: 'mx-auto prose max-w-none lg:prose-lg',
								}),
							]),
							createVNode('div', _hoisted_10, [
								createVNode('div', _hoisted_11, [
									_hoisted_12,
									createVNode('div', _hoisted_13, [
										createVNode(_component_OnThisPage),
										_hoisted_14,
										_hoisted_15,
									]),
								]),
							]),
						]),
					]),
				]),
			]),
			createVNode(_component_Debug),
		])
	)
}

script$3.render = render$3

var script$2 = defineComponent({
	setup: function setup() {
		var urlsToTry = ref([
			'https://v7.docs.nativescript.org',
			'https://v6.docs.nativescript.org',
		])
		var parms = new URLSearchParams(window.location.search)
		var path = parms.get('path')

		if (path) {
			;[
				// prettier-ignore
				"https://v7.docs.nativescript.org/".concat(path),
				'https://v6.docs.nativescript.org/'.concat(path),
			].forEach(function (url) {
				fetch(url)
					.then(function (res) {
						if (res.ok) {
							urlsToTry.value.unshift(url)
						}
					})
					['catch']()
			})
		}

		return {
			urlsToTry: urlsToTry,
		}
	},
})

var _hoisted_1$2 = /*#__PURE__*/ createVNode(
	'h2',
	null,
	'Uh.. oh... We could not find this page...',
	-1
)

var _hoisted_2$2 = /*#__PURE__*/ createVNode(
	'div',
	null,
	' The page may still be missign from the docs. We are working on improving the docs, but in the meantime here are some link that may be what you are looking for ',
	-1
)

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
	return (
		openBlock(),
		createBlock('div', null, [
			_hoisted_1$2,
			_hoisted_2$2,
			createVNode('ul', null, [
				(openBlock(true),
				createBlock(
					Fragment,
					null,
					renderList(_ctx.urlsToTry, function (url) {
						return (
							openBlock(),
							createBlock(
								'li',
								{
									key: url,
								},
								[
									createVNode(
										'a',
										{
											href: url,
											target: '_blank',
										},
										toDisplayString(url),
										9,
										['href']
									),
								]
							)
						)
					}),
					128
				)),
			]),
		])
	)
}

script$2.render = render$2

var script$1 = defineComponent({
	setup: function setup() {
		var _useCurrentFlavor = useCurrentFlavor(),
			currentFlavor = _useCurrentFlavor.value,
			setCurrentFlavor = _useCurrentFlavor.set

		var tabs = ref([])
		var currentTab = ref()
		var tabContainer = ref()

		var loadTabs = function loadTabs() {
			if (tabContainer.value) {
				var _tabs$value$find

				tabs.value = [] // load all tabs from the DOM

				Array.from(tabContainer.value.children).map(function (tab, index) {
					// hide all by default
					tab.classList.add('hidden')
					tabs.value.push({
						title: tab.dataset.tabTitle,
						index: index,
						show: function show() {
							tab.classList.remove('hidden')
						},
						hide: function hide() {
							tab.classList.add('hidden')
						},
					})
				}) // sort tabs so they always appear in the same order!
				// todo: perhaps use a predefined order

				tabs.value.sort(function (a, b) {
					return a.title.localeCompare(b.title)
				})
				currentTab.value =
					(_tabs$value$find = tabs.value.find(function (tab) {
						return tab.title === currentFlavor.value
					})) !== null && _tabs$value$find !== void 0
						? _tabs$value$find
						: tabs.value[0]
			}
		}

		onMounted(function () {
			loadTabs()
		}) // react to tab changes (can be triggered locally or globally by changing flavor)

		watch(currentTab, function (next, prev) {
			prev === null || prev === void 0 ? void 0 : prev.hide()
			next === null || next === void 0 ? void 0 : next.show()
		}) // react to global flavor changes

		watch(currentFlavor, function () {
			var _tabs$value$find2

			currentTab.value =
				(_tabs$value$find2 = tabs.value.find(function (tab) {
					return tab.title.toLowerCase() === currentFlavor.value
				})) !== null && _tabs$value$find2 !== void 0
					? _tabs$value$find2
					: tabs.value[0]
		})
		return {
			tabs: tabs,
			currentTab: currentTab,
			tabContainer: tabContainer,
			changeTab: function changeTab(event, tab) {
				var target = event.target
				var windowOffset = Math.round(target.getBoundingClientRect().top)
				currentTab.value = tab
				setCurrentFlavor(tab.title.toLowerCase()) // ensure we don't jump when the contents of the page change due to tabs changing

				nextTick(function () {
					window.scrollTo(0, target.offsetTop - windowOffset)
				})
			},
		}
	},
})

var _hoisted_1$1 = {
	class: 'mt-10 mb-16',
}
var _hoisted_2$1 = {
	class: 'border-b border-gray-200',
}
var _hoisted_3$1 = {
	class: 'z-10 flex -mb-px space-x-8',
}
var _hoisted_4$1 = {
	class:
		'relative px-4 -mt-px border rounded-md rounded-t-none shadow-lg tab-container',
	ref: 'tabContainer',
}
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
	return (
		openBlock(),
		createBlock('div', _hoisted_1$1, [
			createVNode('div', _hoisted_2$1, [
				createVNode('div', _hoisted_3$1, [
					(openBlock(true),
					createBlock(
						Fragment,
						null,
						renderList(_ctx.tabs, function (tab) {
							return (
								openBlock(),
								createBlock(
									'button',
									{
										key: tab.index,
										class: [
											'px-4 py-4 text-sm font-medium uppercase border-b-4 whitespace-nowrap focus:outline-none focus:font-bold',
											{
												'border-ns-blue text-ns-blue focus:border-ns-blue':
													_ctx.currentTab === tab,
												'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:border-gray-300':
													_ctx.currentTab !== tab,
											},
										],
										onClick: withModifiers(
											function ($event) {
												return _ctx.changeTab($event, tab)
											},
											['prevent']
										),
									},
									toDisplayString(tab.title),
									11,
									['onClick']
								)
							)
						}),
						128
					)),
				]),
			]),
			createVNode(
				'div',
				_hoisted_4$1,
				[renderSlot(_ctx.$slots, 'default')],
				512
			),
		])
	)
}

script$1.render = render$1

var script = defineComponent({
	setup: function setup() {
		var currentTab = ref(0)
		var tabContainer = ref()
		var tabs = ref([])

		var updateTabNames = function updateTabNames() {
			if (tabContainer.value) {
				tabs.value = []
				Array.from(tabContainer.value.children).map(function (tab, index) {
					if (index !== currentTab.value) {
						tab.classList.add('hidden')
					}

					tabs.value.push({
						title: tab.dataset.tabTitle,
						index: index,
					})
				})
			}
		}

		onMounted(function () {
			updateTabNames()
		})
		watch(currentTab, function (next, prev) {
			var _tabContainer$value, _tabContainer$value2

			;(_tabContainer$value = tabContainer.value) === null ||
			_tabContainer$value === void 0
				? void 0
				: _tabContainer$value.children[prev].classList.add('hidden')
			;(_tabContainer$value2 = tabContainer.value) === null ||
			_tabContainer$value2 === void 0
				? void 0
				: _tabContainer$value2.children[next].classList.remove('hidden')
		})
		return {
			currentTab: currentTab,
			tabContainer: tabContainer,
			tabs: tabs,
		}
	},
})

var _hoisted_1 = {
	class: 'mt-10 mb-4',
}
var _hoisted_2 = {
	class: '',
}
var _hoisted_3 = {
	class: 'z-10 flex bg-gray-900 rounded-t-md',
}
var _hoisted_4 = {
	class: 'code-tab-container',
	ref: 'tabContainer',
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
	return (
		openBlock(),
		createBlock('div', _hoisted_1, [
			createVNode('div', _hoisted_2, [
				createVNode('div', _hoisted_3, [
					(openBlock(true),
					createBlock(
						Fragment,
						null,
						renderList(_ctx.tabs, function (tab) {
							return (
								openBlock(),
								createBlock(
									'button',
									{
										key: tab,
										class: [
											'px-6 py-4 text-sm font-medium uppercase border-b-4 whitespace-nowrap focus:outline-none focus:font-bold',
											{
												'border-ns-blue text-ns-blue focus:border-ns-blue':
													_ctx.currentTab === tab.index,
												'border-transparent text-gray-300 hover:text-gray-100 hover:border-gray-300 focus:border-gray-300':
													_ctx.currentTab !== tab.index,
											},
										],
										onClick: withModifiers(
											function ($event) {
												return (_ctx.currentTab = tab.index)
											},
											['prevent']
										),
									},
									toDisplayString(tab.title),
									11,
									['onClick']
								)
							)
						}),
						128
					)),
				]),
			]),
			createVNode('div', _hoisted_4, [renderSlot(_ctx.$slots, 'default')], 512),
		])
	)
}

script.render = render

var theme = function theme(enhanceApp) {
	return {
		Layout: script$3,
		NotFound: script$2,
		enhanceApp: (function (_enhanceApp) {
			function enhanceApp(_x) {
				return _enhanceApp.apply(this, arguments)
			}

			enhanceApp.toString = function () {
				return _enhanceApp.toString()
			}

			return enhanceApp
		})(function (ctx) {
			var app = ctx.app
			ctx.router
			ctx.siteData // global components

			app.component('FlavorTabs', script$1)
			app.component('CodeTabs', script)
			app.component('NotFound', script$2) // provide globlal flavor value

			app.provide(CurrentFlavorSymbol, createCurrentFlavor())

			if (enhanceApp) {
				enhanceApp(ctx)
			}
		}),
	}
}

export default theme
