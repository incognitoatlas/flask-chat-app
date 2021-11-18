from flask import Flask, render_template, request
from datetime import datetime
from replit import db
app = Flask('app')

@app.route('/')
def web_index():
  return render_template('index.html')

@app.route('/api/time')
def api_timeapi():
  now = datetime.now()
  return {
    "time-raw": datetime.now(),
    "year": now.strftime("%Y"),
    "month": now.strftime("%m"),
    "day": now.strftime("%d")
  }

@app.route('/api/createacc')
def _createacc():
  _user = request.args.get("username")
  _pass = request.args.get("password")
  try:
    if isinstance(db[_user], str):
      return {"result": "Username already taken.."}
    else: 
      db[_user] = _pass
      return {"result": "Success! Account Created!"}
  except:
    db[_user] = _pass
    return {"result": "Success! Account Created!"}
    
@app.route('/api/login')
def acclogin():
  _user = request.args.get("username")
  _pass = request.args.get("password")
  try:
    db[_user] == _pass
  except:
    return {"result": "Incorrect username or password.."}
  else:
    if db[_user] == _pass:
      return {"result": f"Success! Welcome user {_user}"}
    else:
      return {"result": "Incorrect username or password.."}



app.run(host='0.0.0.0', port=8080)
