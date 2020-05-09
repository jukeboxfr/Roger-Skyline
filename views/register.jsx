const React = require("react")
const Page = require("./page")

class Register extends React.Component {

	constructor(props) {
		super(props)
	}

	render(props) {
		return (
			<form method="post" className="log-in-form">
				<h4 className="text-center">S'enregister</h4>
				{(() => {
					if (this.props.registerFailed)
						return (<div data-alert className="callout alert">
								{this.props.registerFailed}
							</div>)
					return (<div data-alert className="callout warning">
						Veuillez renseigner tous les champs afin de pouvoir vous inscrire.
						</div>)
				})()}
				<label>Adresse e-mail
					<input type="text" name="mail" placeholder="mail@student42.fr" />
				</label>
				<label>Nom de compte
					<input type="text"  name="username" maxLength="20" placeholder="Michael Jackson" />
				</label>
				<label>Mot de passe
					<input type="password" name="password" placeholder="azertyuiop" />
				</label>
				<label>Confirmer votre mot de passe
					<input type="password" name="password_confirmation" placeholder="azertyuiop" />
				</label>
				<p><input type="submit" href="#" value="S'enregistrer" className="button expanded" /></p>
			</form>
		)
	}
}

module.exports = function (props) {

	return (
		<Page>
			<Register registerFailed={props.registerFailed} />
		</Page>
	);
}