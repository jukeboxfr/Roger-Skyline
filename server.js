const fs = require("fs")
const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const { getHomePage } = require("./handlers/index.js")
const {
	logoutHandler,
	loginHandler,
	getLoginPage,
	getAccountsPage,
	getRegisterPage,
	registerHandler } = require("./handlers/session.js")

const server = express()
server.set("views", __dirname + "/views")
server.set("view engine", "jsx")

server.use(bodyParser.json());
server.use(cookieParser())

server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(__dirname + "/static"))

server.engine("jsx", require("express-react-views").createEngine({ beautify: true }))

var sessions = {}

const removeSession = (authToken) =>
	sessions[authToken] = null

const createSession = (user) => {
	const token = (self = (size) => {
		if (!size) return ""
		return Math.random().toString(16).substring(2) + self(size - 1)
	})(4)
	sessions[token] = user
	console.log(sessions)
	return token
}

const getSession = (req, res) => {
	const { authToken } = req.cookies
	if (!authToken) return null
	return sessions[authToken]
}

const routes = [
		{
			path: "/",
			handler: getHomePage
		},
		{
			path: "/accounts",
			handler: getAccountsPage
		},
		{
			isGuest: true,
			path: "/register",
			handler: getRegisterPage
		},
		{
			isGuest: true,
			method: "post",
			path: "/register",
			handler(...args) {
				registerHandler(createSession, ...args)
			}
		},
		{
			isGuest: true,
			method: "post",
			path: "/login",
			handler(...args) {
				loginHandler(createSession, ...args)
			}
		},
		{
			isGuest: true,
			path: "/login",
			handler: getLoginPage
		},
		{
			isPrivate: true,
			path: "/logout",
			handler(...args) {
				logoutHandler(removeSession, ...args)
			}
		}
]

for (let { method, path, isPrivate, handler, isGuest } of routes) {
	if (!method) method = "get"
	server[method](path, (req, res) => {
		const session = getSession(req, res)
		if (isPrivate && !session) return res.render("login", {loginFailed: "Veuillez vous connecter!"})
		else
			req.session = Object.assign({}, session)
		if (isGuest && session) return getHomePage(req, res)
		handler(req, res)
	})
}

server.listen(90)
