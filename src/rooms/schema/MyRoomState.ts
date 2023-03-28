import { Context } from "@colyseus/schema";
import { type, Schema, MapSchema, ArraySchema } from '@colyseus/schema';


class playerInfo extends Schema {
  @type("string") topPlayer: string;
  @type("string") bottomPlayer: string;

  constructor() {
    super();
    this.topPlayer = "";
    this.bottomPlayer = "";
  }
}


export class Vec2 extends Schema {
  @type("number") x: number;
  @type("number") y: number;

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }
}

class PuckState extends Schema {
  @type("string") client: string // Cleient who changed PuckState recently
  @type("number") x: number;
  @type("number") y: number;
  @type("number") angularVelocity: number;
  @type("number") velocityX: number;
  @type("number") velocityY: number;

  constructor() {
    super();
    this.x = 5000;
    this.y = 0;
    this.angularVelocity = 0;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}

class playerTop extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type([Vec2]) speedQueue: ArraySchema;

  constructor() {
    super();
    this.x = 0;
    this.y = 377;

    this.speedQueue = new ArraySchema<Vec2>();
    for (let i = 0; i < 5; i++) {
      this.speedQueue.push(new Vec2());
    }
  }

}

class playerBottom extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type([Vec2]) speedQueue: ArraySchema;

  constructor() {
    super();
    this.x = 0;
    this.y = -377;

    this.speedQueue = new ArraySchema<Vec2>();
    for (let i = 0; i < 5; i++) {
      this.speedQueue.push(new Vec2());
    }
  }

}

export class MyRoomState extends Schema {
  // @type({map: playerStriker}) players = new MapSchema<playerStriker>();
  @type(PuckState) PuckState = new PuckState();
  @type(playerInfo) playerInfo = new playerInfo();
  @type(playerTop) playerTop = new playerTop();
  @type(playerBottom) playerBottom = new playerBottom();
}
