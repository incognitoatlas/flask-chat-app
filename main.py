from flask import Flask, render_template, request
from replit import # db
from flask_cors import CORS
import logging
from better_profanity import profanity

app = Flask('app')
CORS(app)
# db['users'] = 0
# db['messages'] = []

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route('/', methods=["GET", 'POST'])
def web_index():
  if request.method == 'GET':
    return render_template('index.html')
  else:
    msg_form = request.form['msg_content']
    # db['messages'].append(msg_form)
    return render_template('index.html')
      
@app.route('/append/<item>')
def append_item(item):
  if item.startswith("!"):
    if item == '!clear':
      # db['messages'] = []
      return 'True'
  if profanity.contains_profanity(item):
    censored = profanity.censor(item)
    # db['messages'].append(censored)
    return 'True'
  else:
    # db['messages'].append(item)
  return 'True'

@app.route('/user/<_bool>')
def user_index(_bool):
  if _bool == 'add':
    # db['users'] += 1
    return ''
  elif _bool == 'sub':
    # db['users'] -= 1
    return ''
  else:
    return ''

@app.route('/fetch_msg')
def return_messages():
  return {
    'result': list(# db['messages']),
    'users_active': int(# db['users'])
  }

app.run(host='0.0.0.0', port=8080)