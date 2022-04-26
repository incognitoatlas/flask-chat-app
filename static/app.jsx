class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      mapped_list: null,
      input: '',
      name: 'unnamed user',
      users: 0
    };
    this.fetch_messages = this.fetch_messages.bind(this);
    this.updateMsg = this.updateMsg.bind(this);
    this.updateName = this.updateName.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.unload = this.unload.bind(this)
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }

  updateMsg(event) {
    this.setState({
      input: event.target.value
    });
  }

  fetch_messages() {
    var messageList;
    fetch(`${window.location.href}/fetch_msg`)
      .then(response => response.json())
      .then(data => {
        this.setState({users: data.users_active});
        if ( data.result.length != this.state.messages.length ) {
          this.setState({messages: data.result});
          this.setState({mapped_list: this.state.messages.map((item) => <li>{item}</li>)});
          var objDiv = document.getElementById("msg_div");
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      })
  }

  handleForm() {
    if (this.state.input != '') {
      if (this.state.input.startsWith('!')) {
        fetch(`${window.location.href}/append/${this.state.input}`)
        .then(response => response.json());
      } else {
        let merged = this.state.name + ': ' + this.state.input
        fetch(`https://chat.cortemic.repl.co/append/${merged}`)
        .then(response => response.json());
      }
    document.getElementById('msginput').value = '';
  }
  this.setState({
    input: ''
  });
  }

  componentDidMount() {
    fetch(`${window.location.href}/user/add`);
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return this.unload();
    });
    setInterval(this.fetch_messages, 500);
    document.addEventListener("keydown", this._handleKeyDown);
  }

  unload() {
    fetch(`${window.location.href}/user/sub`);
  }
  

  _handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (this.state.input != '') {
    if (this.state.input.startsWith('!')) {
      fetch(`https://chat.cortemic.repl.co/append/${this.state.input}`);
    } else {
    let merged = this.state.name + ': ' + this.state.input
    fetch(`${window.location.href}/append/${merged}`);
    }
    document.getElementById('msginput').value = '';
  }
  this.setState({
    input: ''
  });
    }
  }

  render() {
    return(
      <div>
      <p id="users">Users Connected: {this.state.users}</p>
      <div id="msg_div">
        <ul>
          {this.state.mapped_list}
        </ul>
      </div>
          <input onChange={this.updateName} placeholder="Name"/>
          <input onChange={this.updateMsg} placeholder="Message" id="msginput" autocomplete="off" onKeyPress={this._handleKeyDown}/>
          <button onClick={this.handleForm}>Send</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
