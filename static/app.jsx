class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'no status',
      usernameinput: null,
      passwordinput: null
    }
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updatePass = this.updatePass.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
  }

  updateUser(event) {
    this.setState({
      usernameinput: event.target.value
    });
  }

  updatePass(event) {
    this.setState({
      passwordinput: event.target.value
    });
  }

  handleCreateAccount() {
    fetch(`https://reactflask.cortemic.repl.co/api/createacc?username=${this.state.usernameinput}&password=${this.state.passwordinput}`)
      .then(response => response.json())
      .then(data => this.setState({
        status: data.result
      }));
  }

  handleLogin() {
    fetch(`https://reactflask.cortemic.repl.co/api/login?username=${this.state.usernameinput}&password=${this.state.passwordinput}`)
      .then(response => response.json())
      .then(data => this.setState({
        status: data.result
      }));
  }


  render() {
    return(
      <div>
        <label for="user">Username:</label>
        <br />
        <input type="text" id="usernameinput" name="user" onChange={this.updateUser}></input>
        <br />
        <label for="pass">Password:</label>
        <br />
        <input type="text" id="passwordinput" name="pass" onChange={this.updatePass}></input>
        <br />
        <button id="login" onClick={this.handleLogin}>login</button>
        <button id="create" onClick={this.handleCreateAccount}>create acc</button>
        <br />
        <p id="status">{this.state.status}</p>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById("root"));