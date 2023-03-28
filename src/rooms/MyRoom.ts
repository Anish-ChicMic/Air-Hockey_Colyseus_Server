import { Room, Client } from "colyseus";
import { MyRoomState, Vec2 } from "./schema/MyRoomState";
import { type, Schema, MapSchema, ArraySchema } from '@colyseus/schema';

export class MyRoom extends Room<MyRoomState> {
  room: any;
  topPlayer: string = "";
  bottomPlayer: string = "";

  onCreate(options: any) {

    this.setState(new MyRoomState());

    this.setSimulationInterval((deltaTime) => this.update(deltaTime));

    this.onMessage("strikerMoved", (client, data) => {
      let senderSpeedQueue = data.speedQueue;
      let newSpeedQueue = new ArraySchema<Vec2>();

      if (client.sessionId === this.topPlayer) {
        console.log("changing topPlayer state>>>>>>>", data.positions.x / 10, data.positions.y / 10);
        this.state.playerTop.x = data.positions.x;
        this.state.playerTop.y = data.positions.y;

        senderSpeedQueue.forEach((point: { x: number; y: number; }) => {
          let vec2 = new Vec2();
          vec2.x = point.x;
          vec2.y = point.y;
          newSpeedQueue.push(vec2);
        });
        // console.log("Pushing: ", newSpeedQueue);
        this.state.playerTop.speedQueue = newSpeedQueue;
      }
      else {
        console.log("changing bottomPlayer state>>>>>>>");
        this.state.playerBottom.x = data.positions.x;
        this.state.playerBottom.y = data.positions.y;

        senderSpeedQueue.forEach((point: { x: number; y: number; }) => {
          let vec2 = new Vec2();
          vec2.x = point.x;
          vec2.y = point.y;
          newSpeedQueue.push(vec2);
        });

        // console.log("Pushing: ", newSpeedQueue);
        this.state.playerBottom.speedQueue = newSpeedQueue;
      }

      // console.log("striker sync: ", typeof data.speedQueue);
    })



    // this.onMessage("PuckState", (client, data) =>{
    //   this.state.PuckState.x = data.position.x;
    //   this.state.PuckState.y = data.position.y;
    //   this.state.PuckState.angularVelocity = data.angularVelocity;
    //   this.state.PuckState.velocityX = data.velocity.x;
    //   this.state.PuckState.velocityY = data.velocity.y;
    //   // console.log("Puck State Changing At Server::::::::", data);
    // })

  }




  update(deltaTime: number) {
    this.onMessage("PuckState", (client, data) => {
      this.state.PuckState.client = client.sessionId;
      this.state.PuckState.x = data.position.x * 10;
      this.state.PuckState.y = data.position.y * 10;
      this.state.PuckState.angularVelocity = data.angularVelocity * 10;
      this.state.PuckState.velocityX = data.velocity.x * 10;
      this.state.PuckState.velocityY = data.velocity.y * 10;
      // console.log("Puck State Changing At Server::::::::", data);
    })




    // this.onMessage('setPlayers', (client, message) => {
    //   console.log("setting players");
    //   if (!this.topPlayer.length) {
    //     this.topPlayer = client.sessionId;
    //     this.state.playerInfo.topPlayer = this.topPlayer;
    //   }
    //   else {
    //     this.bottomPlayer = client.sessionId;
    //     this.state.playerInfo.bottomPlayer = this.bottomPlayer;
    //   }
    //   // this.broadcast('setPlayer', message);
    // });

  }


  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    if (!this.topPlayer.length) {
      this.topPlayer = client.sessionId;
      this.state.playerInfo.topPlayer = this.topPlayer;
    }
    else {
      this.bottomPlayer = client.sessionId;
      this.state.playerInfo.bottomPlayer = this.bottomPlayer;
    }

    // console.log("TopPlayer::::: " + this.topPlayer);
    // console.log("BottomPlayer::::: " + this.bottomPlayer);


    // this.onMessage('setPlayers', (client, message) => {
    //   if (!this.topPlayer.length) {
    //     this.topPlayer = client.sessionId;
    //     this.state.playerInfo.topPlayer = this.topPlayer;
    //   }
    //   else {
    //     this.bottomPlayer = client.sessionId;
    //     this.state.playerInfo.bottomPlayer = this.bottomPlayer;
    //   }
    //   this.broadcast('strikerPosChange', message, { except: client });
    // });

  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}