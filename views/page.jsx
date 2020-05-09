const React = require("react")

function Nav(props) {
	return (
		<div className="top-bar">
			<div className="top-bar-left">
				<ul className="dropdown menu" data-dropdown-menu>
					<li className="menu-text">Roger Skyline 1</li>
					<li><a href="/">Accueil</a></li>
					{(() => {
						if (props.session && props.session.username)
							return (<React.Fragment><li><a href="logout">Se déconnecter</a></li></React.Fragment>)
						else
							return (<React.Fragment><li><a href="/login">Se connecter</a></li><li><a href="/register">S'enregistrer</a></li></React.Fragment>)
					})()}
					<li><a href="/accounts">Liste des membres</a></li>
				</ul>
			</div>
		</div>)
}

module.exports = function (props) {
	return (
		<html>
			<head>
				<title>Roger Skyline</title>
				<link rel="stylesheet" href="assets/css/roger.css" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/css/foundation.min.css" />
			</head>
			<body>
				<Nav session={props.session} />
				{props.children}
				<div id="footer">kesaint- 🥤
				</div>
			</body>
		</html>);
}
