const fs = require("fs")

const getUsers = () =>
	JSON.parse(fs.readFileSync(__dirname + "/../accounts.json", "utf-8"))

const createUser = (user) => {
	var users = getUsers()
	user.id = 0
	for (let { id } of users) user.id = id > user.id ? id + 1 : user.id
	users.push(user)
	users = JSON.stringify(users, null, 4)
	fs.writeFileSync(__dirname + "/../accounts.json", users)
	return user
}

const logoutHandler = (removeSession, request, response) => {
  removeSession(request.cookies.authToken)
  response.clearCookie("authToken")
  response.redirect("/login")
}

const loginHandler = (createSession, request, response) => {
	var users = getUsers()
	const { username, password } = request.body
	users = users.filter(user =>
		user.username === username && user.password === password)
	if (!users.length) return response.render("login", {loginFailed: "Nom de compte ou mot de passe incorrect."})
	const user = users[0]
	const token = createSession(user)
	response.cookie("authToken", token)
	response.redirect("/")
}

const getRegisterPage = (_, response) =>
	response.render("register")

const registerHandler = (createSession, request, response) =>  {
	const users = getUsers()
	const displayError = registerFailed =>
		response.render("register", { registerFailed })
	const { mail, username, password, password_confirmation } = request.body
	if (!mail || !username || !password || !password_confirmation)
		return displayError("Au moins un champ est vide.")
	if (password !== password_confirmation)
		return displayError("Les mots de passe ne correspondent pas")
	const alreadyUsed = users.some((user => user.username.toLowerCase() === username.toLowerCase()))
	if (alreadyUsed) return displayError("Le nom de compte est déjà utilisé")
	if (password.length < 5) return displayError("Le mot de passe est trop faible")
	if (!/\S+@\S+\.\S+/.test(mail)) return displayError("L'adresse e-mail n'est pas valide")
	const user = createUser({ mail, username, password })
	const token = createSession(user)
	response.cookie("authToken", token)
	response.redirect("/")
}

const getLoginPage = (_, response) =>
	response.render("login")

const getAccountsList = () =>
	getUsers().map(account => {
		if (account.password) account.password = null
		return account
	})

const getAccountsPage = (request, response) =>
	response.render("accounts", {accounts: getAccountsList(), session: request.session })

module.exports = {
	getLoginPage,
	loginHandler,
	logoutHandler,
	getRegisterPage,
	registerHandler,
	getAccountsPage
}