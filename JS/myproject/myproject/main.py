import logging
from websocket_server import WebsocketServer as ws


def on_message(client, server, message):
    server.send_message_to_all(message)


server = ws(8080, host='192.168.0.23', loglevel=logging.INFO)
server.set_fn_message_received(on_message)
server.run_forever()
