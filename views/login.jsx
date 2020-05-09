const React = require("react")
const Page = require("./page")

class Login extends React.Component {

	constructor(props) {
		super(props)
	}

	render(props) {
		return (
			<form method="post" className="log-in-form">
				<h4 className="text-center">Se connecter</h4>
				{(() => {
					if (this.props.loginFailed)
						return (<div data-alert className="callout alert">
								{this.props.loginFailed}
							</div>)
				})()}
				<label>Nom de compte
					<input type="text" name="username" maxLength="20" placeholder="Michael Jackson" />
				</label>
				<label>Mot de passe
					<input type="password" name="password" placeholder="azertyuiop" />
				</label>
				<p><input type="submit" href="#" value="Se connecter" className="button expanded" /></p>
			</form>
		)
	}
}

module.exports = function (props) {

	return (
		<Page>
			<Login loginFailed={props.loginFailed} />
		</Page>
	);
}