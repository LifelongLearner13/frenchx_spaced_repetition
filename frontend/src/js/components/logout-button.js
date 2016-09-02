var React = require('react');


var LogOutButton = React.createClass({
	render: function() {
		return (
			<div>
				<a href="/logout"><button type="button">Log Out</button></a>
			</div>
		);
	}
});

module.exports = LogOutButton;