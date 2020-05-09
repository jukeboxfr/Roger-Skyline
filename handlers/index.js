const fs = require("fs")

const getHomePage = ({ session }, response) => {
	const articles = JSON.parse(fs.readFileSync(__dirname + "/../articles.json", "utf-8"))
	response.render("index", { session , articles })
}


module.exports = { getHomePage }