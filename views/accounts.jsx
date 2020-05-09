const React = require("react")
const Page = require("./page")

function Accounts(props) {
  return (
		<table>
			<thead>
				<tr>
					<th width="200">id</th>
					<th width="200">Pseudonyme</th>
					<th>Adresse e-mail</th>
				</tr>
			</thead>
			<tbody>
			{props.accounts.map(({ id, username, mail }) => {
				return (
					<tr key={id}>
						<td>{id}</td>
						<td>{username}</td>
						<td>{mail}</td>
					</tr>
			)})}
			</tbody>
		</table>);
}

module.exports = function (props) {
	return (
		<Page session={props.session}>
			<Accounts accounts={props.accounts}/>
		</Page>
	);
}