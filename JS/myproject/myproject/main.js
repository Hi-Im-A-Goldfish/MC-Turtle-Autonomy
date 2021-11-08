import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Websocket Client

var ws = new WebSocket("ws://192.168.0.23:8080");

function websocketsend(action){
  ws.send(String(action));
}

var facing="north";
var facingB="";
let pos=[0,0,0];

ws.onmessage = function (event) {
  var msg = event.data;
  console.log(msg)
  if (msg == "KeyW" || msg == "Digit1"){
    if (this.facing != null){
      console.log(this.facing)
      posChange(pos[0],pos[1],pos[2],this.facing)
    } else {
      console.log(facing)
      posChange(pos[0],pos[1],pos[2],facing)
    }
  } else if (msg == "KeyA"){
    console.log("A");
    if (this.facing == null){
      console.log("null");
      this.facing = facing;
    }
    if (this.facing == "north"){
      console.log("north")
      this.facing = "west";
    } else if (this.facing == "west"){
      console.log("west")
      this.facing = "south";
    } else if (this.facing == "south"){
      console.log("south")
      this.facing = "east";
    } else if (this.facing == "east"){
      console.log("east")
      this.facing = "north";
    }
  } else if (msg == "KeyD"){
    console.log("D");
    if (this.facing == null){
      console.log("null");
      this.facing = facing;
    }
    if (this.facing == "north"){
      console.log("north");
      this.facing = "east";
    } else if (this.facing == "east"){
      console.log("east");
      this.facing = "south";
    } else if (this.facing == "south"){
      console.log("south");
      this.facing = "west";
    } else if (this.facing == "west"){
      console.log("west");
      this.facing = "north";
    }
  } else if (msg=="KeyE"||msg=="Digit3"){
    pos[1] += 5;
  } else if (msg=="KeyQ"||msg=="Digit2"){
    pos[1] += -5;
  } else if (msg=="minecraft:grass_block"||msg=="minecraft:stone"||msg=="minecraft:diamond_ore"||msg=="iron_ore"||msg=="minecraft:dirt"||msg=="minecraft:coal_ore"){
    addGeo(pos[0],pos[1],pos[2],this.facing,msg)
  }
}



// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Geo

const geometry = new THREE.BoxGeometry(5,5,5)

function addGeo(x, y, z, f, blck){
  console.log(x,y,z,f)
  var material = null;
  if (blck=="minecraft:grass_block"){
    material = new THREE.MeshBasicMaterial({ color: 0x33CE55, transparent: true, opacity: 0.8 });
  } else if (blck=="minecraft:stone"){
    material = new THREE.MeshBasicMaterial({ color: 0x787878, transparent: true, opacity: 0.8 });
  } else if (blck=="minecraft:diamond_ore"){
    material = new THREE.MeshBasicMaterial({ color: 0x33ceba, transparent: true, opacity: 0.8 });
  } else if (blck=="minecraft:iron_ore"){
    material = new THREE.MeshBasicMaterial({ color: 0xcea033, transparent: true, opacity: 0.8 });
  } else if (blck=="minecraft:dirt"){
    material = new THREE.MeshBasicMaterial({ color: 0x6f561a, transparent: true, opacity: 0.8})
  } else if (blck=="minecraft:coal_ore"){
    material = new THREE.MeshBasicMaterial({ color: 0x2b2b2b, transparent: false})
  }
   else {
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
  }
  console.log(blck, material);
  var geo = new THREE.Mesh(geometry, material);
  geo.position.set(x,y,z)
  scene.add(geo)
}

function posChange(x, y, z, f){
  console.log(x,y,z,f)
  if (pos != null){
    if (f == "north"){
      pos[2] += -5
    }
    if (f == "east"){
      pos[0] += 5
    }
    if (f == "south"){
      pos[2] += 5
    }
    if (f == "west"){
      pos[0] += -5
    }
    if (f == "down"){
      pos[1] += -5
      this.facing = this.facingB;
    }
  } else {
    console.log("null")
  }
}


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function key(e){
  console.log(e.code);
  websocketsend(e.code);
}

function animate() {
  requestAnimationFrame(animate);
  window.addEventListener('keydown', key);
  controls.update();
  renderer.render(scene, camera);
}

animate();