from flask import Flask, render_template, request
from flask_cors import CORS
import logging
import os
from better_profanity import profanity
import pickledb
db = pickledb.load('chat.db', False)
app = Flask('app')
CORS(app)

db.set('users', 0)
db.set('messages', [])

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route('/', methods=["GET", 'POST'])
def web_index():
  if request.method == 'GET':
    return render_template('index.html')
  else:
    msg_form = request.form['msg_content']
    db.set('messages', db.get('messages').append(msg_form))
    # db['messages'].append(msg_form)
    return render_template('index.html')
      
@app.route('/append/<item>')
def append_item(item):
  if item.startswith("!"):
    if item == '!clear':
      db.set('messages', [])
      return 'True'
  if profanity.contains_profanity(item):
    censored = profanity.censor(item)
    _newlist = list(db.get('messages'))
    _newlist.append(censored)
    db.set('messages', _newlist)
    return 'True'
  else:
    _newlist = list(db.get('messages'))
    _newlist.append(item)
    db.set('messages', _newlist)
  return 'True'

@app.route('/user/<_bool>')
def user_index(_bool):
  if _bool == 'add':
    db.set('users', int(db.get('users'))+1)
    return ''
  elif _bool == 'sub':
    db.set('users', int(db.get('users'))-1)
    return ''
  else:
    return ''

@app.route('/fetch_msg')
def return_messages():
  return {
    'result': db.get('messages'),
    'users_active': int(db.get('users'))
  }

app.run(host='0.0.0.0', port=os.getenv('PORT'))
