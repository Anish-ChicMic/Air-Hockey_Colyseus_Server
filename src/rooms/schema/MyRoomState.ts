import { Context } from "@colyseus/schema";
import { type, Schema, MapSchema, ArraySchema } from '@colyseus/schema';

// class World extends Schema {
//   @type("number") x: number;
//   @type("number") y: number;

// }

// class puckPosition extends Schema {
//   @type("number") x: number;
//   @type("number") y: number;
// }


class PuckState extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") angularVelocity: number;
  @type("number") velocityX: number;
  @type("number") velocityY: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.angularVelocity = 0;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}

class playerStr extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  // @type() velocityQueue: ArraySchema;


  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    // this.velocityQueue = []
  }

  set getPos(data: any) {
    this.x = 0;
    this.y = 0;
    console.log("room state set..........");
  }
  get getPos() {
    return [this.x, this.y];
  }
}

export class MyRoomState extends Schema {
  // @type({ map: playerStr }) playerStrS = new MapSchema<playerStr>();
  @type(playerStr) playerStrS = new playerStr();
  @type(PuckState) PuckStateS = new PuckState();
}

