const React = require("react")
const Page = require("./page")

function Articles(props) {
  return (
	<article className="grid-container">
	  <div className="grid-x align-center">
			{props.articles.map(({ title, date, img, content, author }, index) => {
				return (
					<div key={index} className="cell medium-8">
						<div className="blog-post">
							<h3>{title}</h3>
							<img className="thumbnail" src={img} />
							<p>{content}</p>
							<div className="callout">
								<ul className="menu simple">
									<li>
										<a href="#">Auteur: {author}</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
			)})}
		</div>
	</article>);
}

module.exports = function (props) {
	return (
		<Page session={props.session}>
			{(() => {
				if (props.session.username)
					return (<div data-alert className="callout success">Vous êtes connecté en tant que {props.session.username}.</div>)
			})()}
			<Articles articles={props.articles}/>
		</Page>
	);
}