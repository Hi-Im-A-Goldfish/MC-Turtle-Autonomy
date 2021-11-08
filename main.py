import asyncio
import websockets as ws


async def echo(websocket, path):
    async for message in websocket:
        print(message)
        await asyncio.sleep(1)
        await websocket.send(message)


async def action(websocket, path):
    act = input("action: ")
    await websocket.send(act)


start_server = ws.serve(action, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
