var React = require('react');


var LogOutButton = React.createClass({
	render: function() {
		return (
			<div>
				<button type="button" onClick={this.props.logOutUser}>Log Out</button>
			</div>
		);
	}
});

module.exports = LogOutButton;