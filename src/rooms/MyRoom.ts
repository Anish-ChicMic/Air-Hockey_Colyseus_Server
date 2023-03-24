import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  room: any;

  onCreate(options: any) {
    this.setState(new MyRoomState());






    this.onMessage('puckVel', (client, data) => {
      // console.log("puckVelChanged.....");
      // this.broadcast('puckVel', data);
    })


    this.onMessage('samePuckMove', (client, data) => {
      // console.log("samePuckMove.....");

      let newState = new MyRoomState();

      newState.playerStrS.x = data.pos.x;
      newState.playerStrS.y = data.pos.y;

      newState.PuckStateS.x = data.puckData.positionX;
      newState.PuckStateS.y = data.puckData.positionY;
      newState.PuckStateS.angularVelocity = data.puckData.angularVelocity;
      console.log("Received Data In Room", data)
      // newState.PuckStateS.velocityX = data.puckData.velocityX;
      // newState.PuckStateS.velocityY = data.puckData.velocityY;
      newState.PuckStateS.velocityX = 10;
      newState.PuckStateS.velocityY = 2;
      console.log("Setting Regular State................", newState.PuckStateS.velocityX);
      this.setState(newState);
      // console.log(newState.playerStrS.getPos);
    })

    console.log("Room created");


  }


  onJoin(client: Client, options: any) {
    let initState = new MyRoomState();
    initState.playerStrS.y = -377.848;
    console.log("Setting Initial State................");
    this.setState(initState);

    console.log(client.sessionId, "joined!");
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
