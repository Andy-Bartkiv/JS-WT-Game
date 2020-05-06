///// Game WIRE TAPPING, ver.20.05.04 - Game Engine 100%

const canvas = document.getElementById('wiretap');
const context = canvas.getContext('2d');

let myRAF; // request Animation Frame var

const board = document.getElementById('board');

const chipSS = document.getElementById('chip-SS');

const chipA0 = document.getElementById('chip-A0');
const chipA1 = document.getElementById('chip-A1');
const chipP0 = document.getElementById('chip-P0');
const chipP1 = document.getElementById('chip-P1');

const chip00 = document.getElementById('chip-00');
const chip01 = document.getElementById('chip-01');
const chip02 = document.getElementById('chip-02');
const chip03 = document.getElementById('chip-03');
const chip04 = document.getElementById('chip-04');
const chip05 = document.getElementById('chip-05');
const chip06 = document.getElementById('chip-06');
const chip07 = document.getElementById('chip-07');
const chip08 = document.getElementById('chip-08');
const chip09 = document.getElementById('chip-09');
const chip10 = document.getElementById('chip-10');
const chip11 = document.getElementById('chip-11');
const chip12 = document.getElementById('chip-12');

const chip50 = document.getElementById('chip-50');
const chip51 = document.getElementById('chip-51');
const chip52 = document.getElementById('chip-52');
const chip53 = document.getElementById('chip-53');
const chip54 = document.getElementById('chip-54');
const chip55 = document.getElementById('chip-55');
const chip56 = document.getElementById('chip-56');
const chip57 = document.getElementById('chip-57');
const chip58 = document.getElementById('chip-58');
const chip59 = document.getElementById('chip-59');
const chip60 = document.getElementById('chip-60');
const chip61 = document.getElementById('chip-61');
const chip62 = document.getElementById('chip-62');

let lastTime = 0;   // tech variable for time counter
let lastDT = 16;    // tech variable for time counter
let animationSpeed = 75 // cord Animation Speed for in ms 
////////////////////////// GAME DIFFICULTY SETTINGS //////////////////////////////////////////
const timerInput = 10; // time for solving puzzle in min;
const chipTypes = 12;   // Number of Chip Types at board
const nCP = 8; // number Of Crossed Paths in Between // Total Between-Path num = 24;
const nSC = 2; // number Of Sealed Chips
const nHC = 2; // number Of HIDDEN Chips
//          chipTypes - nCP   - nSC   - nHC
// Beginner   =  6       4      0       0
// Easy       =  8      7-8     2       0
// Normal     = 10       8      4       11
// Hard       = 12    {11-13}   =5=   {12-18}
///////////////////////////////////////////////////////////////////////////////////////////////

// pop-up message Window display
function popUpWindow(type = 'pause') {

  if (type == 'alarm') {  //////////////////////  ALARM
    context.fillStyle = '#c00';
    context.fillStyle = "rgba(255,0,0,0.25)"
//    context.fillRect(393, 154, 500, 370);
    context.fillRect(0, 0, canvas.width, canvas.height);  
    context.fillRect(393-64*2, 154-64*2, 500+64*4, 370+64*4);
    context.font = "64px Arial";
    context.fillStyle = '#ff0';
    context.textAlign = "center";
    context.fillText("! ! ! ALARM ! ! !", 640, 298);
    context.fillText("! ! ! ALARM ! ! !", 640, 298+64*2);
    /////////////////     RESTART AREA AND TEXT /////////////////
    context.fillStyle = '#0f0';
    context.fillRect(27, 720, 195, 73);
    context.font = "Bold 28px Consolas";
    context.fillStyle = '#000';
    context.fillText("PRESS HERE", 125, 750);
    context.fillText("TO RESTART", 125, 780);

  } else if (type == 'clue') {  //////////////// CLUE
    context.fillStyle = "rgba(85,85,85,0.5)"
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffd';
    context.fillRect(393-64*2, 154-64*2, 500+64*4, 370+64*4);
    context.font = "64px Arial";
    context.fillStyle = '#100';
    context.textAlign = "center";
    context.font = "32px Arial";
    context.fillText("You have successfully tapped a phone line", 640, 310);
    context.fillText("and got clue № " + String(clueCounter), 640, 360);

  } else if (type == 'pause') { ///////////////// PAUSE
    context.fillStyle = "rgba(85,85,85,0.5)"
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#555';
    context.fillRect(144, 32, 868, 614);
    context.fillStyle = '#0f0';
    context.font = "48px Arial";
    context.textAlign = "center";
    context.fillText("- - GAME PAUSED - -", 590, 130);
    context.font = "36px Arial";
    context.fillText("left-click or press SPACE to continue", 590, 200);
    context.fillText("- use arrow keys or mouse bttn to select a chip,", 590, 350);
    context.fillText("that you want to replace from the circuit board", 590, 400);

    context.fillText("- press SPACE or click at the 'Spare' chip", 590, 500);
    context.fillText("on the bottom of the circuit board", 590, 550);
    context.fillText("to replace selected ('blue') chip", 590, 600);


  } else if (type == 'time-out') {  //////////////// TIME - OUT
    context.fillStyle = '#ffd';
    context.fillRect(440, 250, 400, 200);
    context.font = "36px Arial";
    context.fillStyle = '#100';
    context.textAlign = "center";
    context.fillText("--- TIME EXPIRED ---", 640, 310);
    context.fillText(String(phoneCounter) + " phone(s) tapped", 640, 360);
    context.fillText(String(alarmCounter) + " alarms", 640, 410);
    /////////////////     RESTART AREA AND TEXT /////////////////
    context.fillStyle = '#0f0';
    context.fillRect(27, 720, 195, 73);
    context.font = "Bold 28px Consolas";
    context.fillStyle = '#000';
    context.fillText("PRESS HERE", 125, 750);
    context.fillText("TO RESTART", 125, 780);


  } else if (type == 'victory') {  //////////////// VICTORY
    context.fillStyle = '#ffd';
    context.fillRect(440, 250, 400, 200);
    context.font = "36px Arial";
    context.fillStyle = '#100';
    context.textAlign = "center";
    context.fillText("--- VICTORY ---", 640, 310);
    context.fillText(String(phoneCounter) + " phone(s) tapped", 640, 360);
    context.fillText(String(alarmCounter) + " alarms", 640, 410);
    /////////////////     RESTART AREA AND TEXT /////////////////
    context.fillStyle = '#0f0';
    context.fillRect(27, 720, 195, 73);
    context.font = "Bold 28px Consolas";
    context.fillStyle = '#000';
    context.fillText("PRESS HERE", 125, 750);
    context.fillText("TO RESTART", 125, 780);
  }

}

// time formating to view '00:00:00'
function timeFormat(tR) {
  let strTimer = '00:00:00'
  let m = Math.trunc(tR/1000/60 % 60);
  let s = Math.trunc(tR/1000 % 60);
  let ds = Math.trunc(tR/10 % 100); 
  strTimer =  (m<10) ? `0${m}`  : `${m}`;
  strTimer += (s<10) ? ` : 0${s}` : ` : ${s}`;
  strTimer += (ds<10) ? ` : 0${ds}` : ` : ${ds}`;
  return strTimer;
}

  // new countdown timer display (calculations are made inside function update()
function drawNewTimer(tR) {
  strTimer = timeFormat(tR);
  context.fillStyle = '#000';
  if (((tR/1000) < 10) && (parseInt(strTimer[6]) % 10 < 5)) { //// RED LIGHT on Timer
    context.fillStyle = '#b00'
  };
  context.fillRect(1026, 734, 200, 50);
  context.font = "34px Arial";
  context.fillStyle = '#0f0';
  context.textAlign = "start";
  context.fillText(strTimer, 1040, 771);
}

  // creating layout for PATH elements  6 х 9
function createPathSet(w, h) {
  const matrix = [];
  for (let i = 0; i < h; i++) {
    matrix[i] = []
    for (let j = 0; j < w; j++) {
      matrix[i][j] = 0;
    }
  }
  // number Of Crossed Paths in Between // Total Between-Path num = 24;
  for (let i = 0; i < nCP; i++) {
    let yCP = (Math.floor(Math.random() * (w)));
    let xCP = getRnd1357(1, h-2);
    if (matrix[xCP][yCP] === 0) {
      matrix[xCP][yCP] = 7;
    } else if (matrix[xCP][yCP] == 7) i--;
  }
  
  // Filling direct paths between chips 
  for (let i = 0; i < h; i++) { 
    if ((i%2 == 0) & (i == 0)) {
      for (let j = 0; j < w; j++) {
        if ((matrix[i+1][j]) == 7) {
          matrix[i][j] = 31;
        } else {
          matrix[i][j] = 21 + (Math.floor(Math.random()*2));
        }
      } // END inner j cycle END

    } else if ((i%2 == 0) & (i == h-1)) {
      for (let j = 0; j < w; j++) {
        if ((matrix[i-1][j]) == 7) {
          matrix[i][j] = 41;
        } else {
          matrix[i][j] = 21 + (Math.floor(Math.random()*2));
        }
      } // END inner j cycle END
    
    } else if (i%2 == 0) {
      for (let j = 0; j < w; j++) {
        if (((matrix[i+1][j])==7) & ((matrix[i-1][j])==7))  {
          matrix[i][j] = 51;
        } else if ((matrix[i+1][j]) == 7) {
          matrix[i][j] = 31;
        } else if ((matrix[i-1][j]) == 7) {
          matrix[i][j] = 41;
        } else {
          matrix[i][j] = 21 + (Math.floor(Math.random()*2));
        }
      } // inner j cycle END

    }  // if (i%2 == 0) statement END
  } // For i cycle END

  return matrix;
} // Function END

  // creating layout for LOGIC CHIP elements 7 х 5
function createChipSet(w, h) {
    const matrix = [];
    for (let i = 0; i < h; i++) {
      matrix[i] = []
      for (let j = 0; j < w; j++) {
        if (chipTypes < 7) matrix[i][j] = 1101 + Math.floor(Math.random() * chipTypes);
        else {
          let rnd = 1101 + Math.floor(Math.random()*(chipTypes - 2));
          matrix[i][j] = (rnd < 1103) ? rnd : rnd + 2;
        }
      }
    }
  // Correcting last column to remove combiners and splitters
    for (let i = 0; i < h; i++) {
      if ((matrix[i][w-1] > 1102) && (matrix[i][w-1] < 1107)) {
        matrix[i][w-1] = 1101 + Math.floor(Math.random() * 2);

      }
    }
   // removing combiners in case typeChips > 6
   if (chipTypes > 6)
    {

    }

   // - - - - - -  - - - - - - - - - - - - number Of Sealed Chips
    for (let i = 0; i < nSC; i++) {
      let xSC = (Math.floor(Math.random() * (w-2)));
      let ySC = (Math.floor(Math.random() * (h-1)));
      if (xDigit(matrix[xSC][ySC], 0) === 1) {
        matrix[xSC][ySC] += 1000;
      }
    }
// --------------------------------- // number Of HIDDEN Chips
    for (let i = 0; i < nHC; i++) {
      let xHC = (Math.floor(Math.random() * (w-2)));
      let yHC = (Math.floor(Math.random() * (h-1)));
      if ((xDigit(matrix[xHC][yHC], 0) === 1) & 
          (xDigit(matrix[xHC][yHC], 2) < 5)) {
        matrix[xHC][yHC] += 70;
      }
    }

    matrix[player.pos.y][player.pos.x] += 100;    // Starting Blue Chip to be Substituted

    return matrix;
}

function createFreeChip() {
  let res = 0;
  1101 + (Math.floor(Math.random() * chipTypes));
  if (chipTypes < 7) res = 1101 + Math.floor(Math.random() * chipTypes);
  else {
    let rnd = 1101 + Math.floor(Math.random()*(chipTypes - 2));
    res = (rnd < 1103) ? rnd : rnd + 2;
  } 
return res;
}

// validation (to obtain 0's on all outputs) of LOGIC CHIP SET layout
function correctChipSet() {
  let matrix = chipSet;
  let outSignals = 0;
  let signals = calculateSignalSet(signalSet);
  let w = signals[0].length;
  let wM = chipSet[0].length;

  for (let j=0; j<matrix.length; j++) {
    outSignals = 0;
    signals = calculateSignalSet(signalSet);
    for (let i = 0; i < signals.length; i++)
      outSignals += signals[i][w-1];
    if (outSignals > 0) {

      if (chipTypes<7) {            // Chip Types < 7
        if ((signals[j*2][w-2] == 1) && (signals[j*2+1][w-2] == 0)) 
            chipSet[j][wM-1] = 1107;
        else if ((signals[j*2][w-2] == 0) && (signals[j*2+1][w-2] == 1)) 
            chipSet[j][wM-1] = 1108;
        else if ((signals[j*2][w-2] == 1) && (signals[j*2+1][w-2] == 1)) 
            chipSet[j][wM-1] = 1109;
      } 
      else {                        // ChipTypes >= 7

        if ((signals[j*2][w-2] == 1) && (signals[j*2+1][w-2] == 0)) 
            chipSet[j][wM-1] = 1107;
        else if ((signals[j*2][w-2] == 0) && (signals[j*2+1][w-2] == 1)) 
            chipSet[j][wM-1] = 1108;
        else if ((signals[j*2][w-2] == 1) && (signals[j*2+1][w-2] == 1)) 
            chipSet[j][wM-1] = 1109;
        else 
            chipSet[j][wM-1] = 1101 + Math.floor(Math.random()*2);
        }
    }
    else break;
  }
  return matrix;
}

// creating TARGET CHIPs SET layout (5 x 5)
function createTargetChipSet() {
  let matrix = [];
  let balance = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
  for (let j = 0; j < 10; j++) {
    let index = Math.floor(Math.random()*balance.length);
    matrix[j] = parseInt(balance.splice(index, 1));
  }
return matrix;
}

// calculation of TARGET CHIPS State, based on Signal Set
function calculateTagetState(targetMatrix) {
  let res = targetMatrix;
  let w = signalSet[0].length;
  phoneCounter = 0;
  res.forEach((element, i) => {
    if (element == 11) {
      res[i] = 111;
    }
    if (res[i] == 111) phoneCounter += 1;
  });

  for (let j = 0; j < res.length; j++) {
    if      (res[j] == 0) res[j] = (signalSet[j][w-1] == 1) ? 10 : 0;
    else if (res[j] == 1) res[j] = (signalSet[j][w-1] == 1) ? 11 : 1;
    else if (res[j] == 10) res[j] = (signalSet[j][w-1] == 1) ? 10 : 10;
    else if (res[j] == 101) res[j] = (signalSet[j][w-1] == 1) ? 111 : 101;
    else if (res[j] == 111) res[j] = (signalSet[j][w-1] == 1) ? 111 : 101;
  }

return res;
} // END of function

// creating SIGNAL Matrix 10 х 14
function createSignalSet(w, h) {
  const matrix = [];
  for (let i = 0; i < h; i++) {
    matrix[i] = []
    for (let j = 0; j < w; j++) {
      matrix[i][j] = 0;
    }
  }

// INITIAL 5 signals set (1:0) -> (0:1) -> (1:0) ->
  for (let i = 0; i < h; i++) {
    if (i%2 == 0) {
      if (i%4 == 0) matrix[i][0] = 1;
      else matrix[i+1][0] = 1;
    }
  }

return matrix;
}

// calculation of Signal Map based on Chip and Path Layout.
function calculateSignalSet(matrix) {
  let h = matrix.length;
  let w = matrix[0].length;
  let sigIn = {a:0, z:0};  // Input Signal
  let sigOut = {a:0, z:0}; // Output Signal

// CREATE TILE MATRIX
  let tileH = h / 2;
  let tileW = w - 1;
// New MATRIX = All LOGIC CHIPs, not all PATHSes; between lines PATHes are not included
  const tileMatrix = []; 
  for (let i = 0; i < tileH; i++) {
    tileMatrix[i] = []
    for (let j = 0; j < tileW; j++) {
      if (j%2 == 0) tileMatrix[i][j] = chipSet[i][j/2];
      else          tileMatrix[i][j] = pathSet[i*2][(j-1)/2];
    }
  }

  for (let j = 1; j < w; j++) { // iterate over columns w=14
    for (let i = 0; i < h/2; i++) {
      sigIn = {a: matrix[i*2][j-1], z: matrix[i*2+1][j-1]};
      let signal = {aa: 10, zz: 10};                        // Cross Signal - declaration
      if (j%2 == 0) {
        signal.aa = (i > 0) ? matrix[i*2-1][j-1] : 10       // Cross Signal from Top
        signal.zz = (i < h/2-1) ? matrix[i*2+2][j-1] : 10;  // Cross Signal from Bottom
      }                             
      sigOut = calculateTile(tileMatrix[i][j-1], sigIn, signal); // Tile processing th signals set

    // Output Signal is returned back into the MATRIX 
      matrix[i*2][j] = sigOut.a;
      matrix[i*2+1][j] = sigOut.z;
    } // END of i LOOP
  } // END of j LOOP
return matrix;
} // END of function calculate Signals END

// Calculating TILE (Chip or Path) Output SIGNAL based on 4 (four) Input Signals
function calculateTile(tile, sigIn, sigX) {
  let sigOut = {a:0, z:0}
// TILE NORMALIZATION to 2 last digits <= 12
  if (tile > 1000) tile = tile%1000;
  tile = tile % 100;
  if (tile > 70) tile -= 70;

//TILE TYPES 
if ((tile == 01) || (tile == 21)) {       // No action CHIP or PATH a=a, z=z
    sigOut = {a: sigIn.a, z: sigIn.z};
} else if ((tile == 02) || (tile == 22)) {// Crossover CHIP or PATH a=z, z=a
    sigOut = {a: sigIn.z, z: sigIn.a};
} else if (tile == 03) {                  // Top Combiner CHIP
    sigOut.a = ((sigIn.a + sigIn.z) > 0) ? 1 : 0;
    sigOut.z = 0;
} else if (tile == 04) {                  // Bottom Combiner CHIP
    sigOut.a = 0;
    sigOut.z = (((sigIn.a + sigIn.z) > 0)) ? 1 : 0;
} else if (tile == 05) {                  // Top Splitter CHIP
  sigOut.a = ((sigIn.a) == 1) ? 1 : 0;
  sigOut.z = sigOut.a;
} else if (tile == 06) {                  // Bottom Splitter CHIP
  sigOut.z = ((sigIn.z) == 1) ? 1 : 0;
  sigOut.a = sigOut.z;
} else if (tile == 07) {                  // Top Inverter CHIP
  sigOut.a = ((sigIn.a) == 1) ? 0 : 1;
  sigOut.z = sigIn.z;
} else if (tile == 08) {                  // Bottom Inverter CHIP
  sigOut.a = sigIn.a;
  sigOut.z = ((sigIn.z) == 1) ? 0 : 1;
} else if (tile == 09) {                  // Double Inverter CHIP
  sigOut.a = ((sigIn.a) == 1) ? 0 : 1;
  sigOut.z = ((sigIn.z) == 1) ? 0 : 1;
} else if (tile == 10) {                  // Top Crossover Inverter CHIP
  sigOut.a = sigIn.z;
  sigOut.z = ((sigIn.a) == 1) ? 0 : 1;
} else if (tile == 11) {                  // Bottom Crossover Inverter CHIP
  sigOut.a = ((sigIn.z) == 1) ? 0 : 1;
  sigOut.z = sigIn.a;
} else if (tile == 12) {                  // Double Crossover Inverter CHIP
  sigOut.a = ((sigIn.z) == 1) ? 0 : 1;
  sigOut.z = ((sigIn.a) == 1) ? 0 : 1;

// PATH Tiles LOGIC
} else if (tile == 31) {// PATH with signal from bottom line
  sigOut.a = sigIn.a;
  sigOut.z = sigX.zz;
} else if (tile == 41) {// PATH with signal from top line
  sigOut.a = sigX.aa;
  sigOut.z = sigIn.z;
} else if (tile == 51) {// PATH with signal from top AND bottom lines
  sigOut.a = sigX.aa;
  sigOut.z = sigX.zz;
}
  else {                 // a=z=7 For Debug Purposes only;
  sigOut = {a:7, z:7}
}

return sigOut;
} // END of function calculateTile

// getting digit position (dig) from a (number)
function xDigit(number, dig) {
  let z = String(number);
  return parseInt(z[dig]);
}

// getting Random UnEven number from a range
function getRnd1357(min, max) {
	let res, rnd = 0;
	do {
	  rnd = Math.floor(Math.random() * (max-min+1)) + min;
    res = (rnd%2) ? rnd : 0;
  } while (res == 0)
  return res
}

// moving Blue Chip (CHIP to be replaced with FREE CHIP) position in a certain direction
function moveBlueChip(ox, oy) {
  chipSet[player.pos.y][player.pos.x] -= 100;
  player.pos.x +=ox;
  player.pos.y +=oy;
  chipSet[player.pos.y][player.pos.x] += 100;
}

// swithcing Blue Chip and FREE CHIP
function switchChips() {
  let tempChip = chipSet[player.pos.y][player.pos.x];
  if ((xDigit(tempChip, 2) >= 5)) {
    tempChip -= 70;
  }
  chipSet[player.pos.y][player.pos.x] = freeChip + 100;
  freeChip = tempChip - 100;
}

// - - - OBSOLETE - - - // display layout for values PATH elements 
function drawPathSet(matrix) {
  // context.font = "20px Arial";
  // context.fillStyle = '#ff0';
  // context.textAlign = "center";
  // let h = matrix.length;
  // let tile;
  // for (let i = 0; i < h; i++) {
  //   w = matrix[i].length;
  //   for (let j = 0; j < w; j++) {
  //   //   if (tile != path00) context.drawImage(tile, 234 + 128 * j, 51 + 64*i);
  // context.fillText(matrix[i][j], 260 + 128 * j, 90 + 64*i);

  //   }
  // }
}

// Tile identification function
function tileIdent(tile) {
  let mIJ = tile % 1000;
  let res = chip00;
  if (((tile % 100) - (tile % 10) == 70) ||
        ((tile % 100) - (tile % 10)) == 80) {
    res = (((tile % 1000)-(tile % 100)) == 200 ) ? chip50 : chip00;
  }
  else {
    if      (mIJ == 101) res = chip01;
    else if (mIJ == 102) res = chip02;
    else if (mIJ == 103) res = chip03;
    else if (mIJ == 104) res = chip04;
    else if (mIJ == 105) res = chip05;
    else if (mIJ == 106) res = chip06;
    else if (mIJ == 107) res = chip07;
    else if (mIJ == 108) res = chip08;
    else if (mIJ == 109) res = chip09;
    else if (mIJ == 110) res = chip10;
    else if (mIJ == 111) res = chip11;
    else if (mIJ == 112) res = chip12;

    else if (mIJ == 200) res = chip50;
    else if (mIJ == 201) res = chip51;
    else if (mIJ == 202) res = chip52;
    else if (mIJ == 203) res = chip53;
    else if (mIJ == 204) res = chip54;
    else if (mIJ == 205) res = chip55;
    else if (mIJ == 206) res = chip56;
    else if (mIJ == 207) res = chip57;
    else if (mIJ == 208) res = chip58;
    else if (mIJ == 209) res = chip59;
    else if (mIJ == 210) res = chip60;
    else if (mIJ == 211) res = chip61;
    else if (mIJ == 212) res = chip62;

    else res = chip50;
  }
  return res;
}

// Display layout for values of LOGIC CHIP elements
function drawChipSet(matrix) {
  let aj = 194;    let bj = 128;
  let ai = 105;    let bi = 128;
  let h = matrix.length;
  let tile = chip00;
  for (let i = 0; i < h; i++) {
    w = matrix[i].length;
    for (let j = 0; j < w; j++) {
      context.drawImage(tileIdent(matrix[i][j]), 170 + bj*j, 50 + bi*i);
//      context.fillText(matrix[i][j], aj + bj*j, ai + bi*i);
    }   
  }
}

// Display TARGET CHIPs 
function drawTargetChipSet(matrix) {
  let tile = chipA0;
  for (let j = 0; j < 10; j++) {
    if      (matrix[j] === 0) tile = chipA0;
    else if (matrix[j] === 10) tile = chipA1;
    else if (matrix[j] === 1) tile = chipP0;
    else if (matrix[j] === 101) tile = chipP0;
    else if (matrix[j] === 11) tile = chipP1;
    else if (matrix[j] === 111) tile = chipP1;

    context.drawImage(tile, 1066 + (j%2)*96, (j*2+1)*32 - 13); 
//    context.fillStyle = '#000'
//    context.fillText(matrix[j], 1140 + (j%2)*96, (j*2+1)*32 + 25)
  }
}

// Display FREE CHIP value & image
function drawFreeChip() {
  context.drawImage(tileIdent(freeChip), 619, 722);
//    context.fillText(freeChip, 192 + 150*3, 90 + 100*7);
  }

// - - - OBSOLETE - - - // Display Signal Set layout based on calculated signal state
function drawSignalSet(matrix) {
  let h = matrix.length;
  let w = matrix[0].length;
  for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        context.fillStyle = (matrix[i][j] == 1) ? '#f00' : '#0f0';
        context.fillRect(146 + 64*j + j%2*20, 50 + 64*i - i%2*10, 10, 12)
//        context.fillText(matrix[i][j], 150 + 64*j + j%2*20, 55 + 64*i + i%2*5);
      }
    }
}

// Draw board and chipSS
function drawBoard() {
    context.drawImage(board, 0, 0);

    context.fillStyle = 'black';
    context.fillRect(32, 725, 185, 63);
    context.font = "34px Arial";
    context.fillStyle = '#0f0';
    context.fillText("- HELP -", 63, 767);

    for (let i = 0; i < chipSet.length; i++) {
      for (let j = 0; j < chipSet[i].length; j++) {
        if (chipSet[i][j] / 1000 > 2) {
        context.drawImage(chipSS, 159 + 128*j, 38 + 128*i);
        }
      }   
    }   
}

/////////// CORD ANIMATION /////////////////////////////////
// Cord types cration
let cordD = createCord('direct');
let cordL = createCord('long');
let cordXDn = createCord('cross-down');
let cordXUp = createCord('cross-up');
let cordX2D = createCord('cross-2down');
let cordX2U = createCord('cross-2up');
let cordXR = createCord('cross-R');
let cordXI = createCord('cross-I');
let cordHL = createCord('half-long');
let cord5v = createCord('board5v');
let cordGnd = createCord('boardGnd');

// Animation of all signal cords
function drawSignalCord() {
    let cordState = {a:0, z:0};
    let h = signalSet.length;
    let w = signalSet[0].length;

// Board Cords Animation (+5V and GND)
    drawCord(cord5v, {x:242, y:669}, 1);
    drawCord(cordGnd, {x:274, y:669}, 0);

// Animation input Half-long cords
    for (let i = 0; i < h; i += 2) {
        if (signalSet[i][0] == 1) cordState.a = 1; else cordState.a = 0;
        if (signalSet[i+1][0] == 1) cordState.z = 1; else cordState.z = 0;
        drawCord(cordHL, {x:82, y:65 + i*64}, cordState.a);
        drawCord(cordHL, {x:82, y:97 + i*64}, cordState.z);
    }
// Animation Board cords
    for (let j = 1; j < w-2; j += 2) {
        for (let i = 0; i < h; i += 2) {
            if (signalSet[i][j] == 1) cordState.a = 1; else cordState.a = 0;
            if (signalSet[i+1][j] == 1) cordState.z = 1; else cordState.z = 0;

            if (pathSet[i][(j-1)/2] == 21) {
                drawCord(cordD, {x:162+j*64, y:65 + i*64}, cordState.a);
                drawCord(cordD, {x:162+j*64, y:97 + i*64}, cordState.z);
            } else if (pathSet[i][(j-1)/2] == 22) {
                drawCord(cordXDn, {x:162+j*64, y:65 + i*64}, cordState.a);
                drawCord(cordXUp, {x:162+j*64, y:97 + i*64}, cordState.z);
            } else if (pathSet[i][(j-1)/2] == 31) {
                drawCord(cordD, {x:162+j*64, y:65 + i*64}, cordState.a);
                drawCord(cordX2D, {x:162+j*64, y:97 + i*64}, cordState.z);
            } else if (pathSet[i][(j-1)/2] == 41) {
                drawCord(cordX2U, {x:162+j*64, y:65 + i*64}, cordState.a);
                drawCord(cordD, {x:162+j*64, y:97 + i*64}, cordState.z);
            } else if (pathSet[i][(j-1)/2] == 51) {
                drawCord(cordX2U, {x:162+j*64, y:65 + i*64}, cordState.a);
                drawCord(cordX2D, {x:162+j*64, y:97 + i*64}, cordState.z);
            }
        // BOTTOM Cord Lines Animation - attaching to pins of card socket 
            if ((i == h-2) && (j !== 1)) {
                drawCord(cordXR, {x:178+j*64, y:613}, cordState.z);
                if (pathSet[i][(j-1)/2] !== 22) cordState.a = cordState.z;
                drawCord(cordXI, {x:210+j*64, y:613}, cordState.a);
            }
        }
    }
// Animatin cords to Target Chip Sets;
    for (let i = 0; i < h; i++) {
        if (signalSet[i][signalSet[0].length-1] == 1) cordState = 1;
        else cordState = 0;

        if (i%2 == 0) drawCord(cordD, {x:994, y:65 + i*64}, cordState);
        else drawCord(cordL, {x:994, y:97 + (i-1)*64}, cordState);
    }
} // END of function

// anmation of a single cord by type
function drawCord(cordPath, cordStart = {x:0, y:0}, bool) {
// 0 1 _ _ 4 5 _ _ 8 9 __ __ 12 13 __ __ 
// _ _ 2 3 _ _ 6 7 _ _ 10 11 __ __ 14 15
    cordPath.forEach((element, i) => {
        if (bool == 0)                     // green cord #47E452
            context.fillStyle = '#47E452';
        else                              // red #FF7252 / white #E9FFEE cord
            context.fillStyle = ((((i-aP)%4) == 0)||(((i-1-aP)%4)==0)) ? 'red' : '#E9FFEE'; 
        if (element[0] !== 1300)
            context.fillRect(cordStart.x + 4*element[0], cordStart.y + 4*element[1], 4, 4);
    }); 
}

// cord type creation [[0,0], [1,0], [2,0], [3,1], ... etc]
function createCord(cordType) {
    let matrix = []
    if (cordType == 'direct') 
        for (let i=0; i<16; i++) matrix[i] = [i, 0];
    else if (cordType == 'long')
        for (let i=0; i<40; i++) matrix[i] = [i, 0];
    else if (cordType == 'cross-down') {
        for (let i=0; i<4; i++) matrix[i] = [i, 0];
        for (let i=4; i<12; i++) matrix[i] = [i, i-4];
        for (let i=12; i<16; i++) matrix[i] = [i, 8];
    } else if (cordType == 'cross-up') {
        for (let i=0; i<4; i++) matrix[i] = [i, 0];
        for (let i=4; i<12; i++) matrix[i] = ((i<7)||(i>9)) ? [i, 4-i] : [1300, 900];
        for (let i=12; i<16; i++) matrix[i] = [i, -8];
    } else if (cordType == 'cross-2down') {
        for (let i=0; i<4; i++) matrix[i] = [i, 0];
        for (let j=4; j<12; j++) matrix[j] = [4, j-4];
        for (let i=12; i<20; i++) matrix[i] = [i-8, i-4];
        for (let j=20; j<28; j++) matrix[j] = [12, j-4];
        for (let i=28; i<32; i++) matrix[i] = [i-16, 24];
    } else if (cordType == 'cross-2up') {
        for (let i=0; i<4; i++) matrix[i] = [i, 0];
        for (let j=4; j<12; j++) matrix[j] = [4, 4-j];
        for (let i=12; i<20; i++) matrix[i] = ((i<15)||(i>17)) ? [i-8, 4-i] : [1300, 900];
        for (let j=20; j<28; j++) matrix[j] = [12, 4-j];
        for (let i=28; i<32; i++) matrix[i] = [i-16, -24];

    } else if (cordType == 'cross-I') {
        for (let j=0; j<20; j++) matrix[j] = [0, j];
    } else if (cordType == 'cross-R') {
        for (let j=0; j<7; j++) matrix[j] = [0, j];
        for (let i=7; i<16; i++) matrix[i] = [7-i, 7];
        for (let j=16; j<28; j++) matrix[j] = [-8, j-8];
    } else if (cordType == 'half-long') {
        for (let i=0; i<19; i++) matrix[i] = [i+1, 0];
    } else if (cordType == 'board5v') {
        for (let i=0; i<4; i++) matrix[i] = [0, 5-i]; // 4  up
        for (let i=4; i<52; i++) matrix[i] = [4-i, 1]; // 48 left 
        for (let j=52; j<68; j++) matrix[j] = [-48, 53-j]; // 16 up
        for (let i=68; i<76; i++) matrix[i] = ((i<71)||(i>73)) ? [-116 + i, 53-i] : [1300, 900]; // 8 !!!
        for (let j=76; j<100; j++) matrix[j] = [-48+8, 53-j]; // 24 up 
        for (let i=100; i<108; i++) matrix[i] = [60 - i, 53-i]; // 8  NW
        for (let j=108; j<132; j++) matrix[j] = [-48, 53-j]; // 24 up 
        for (let i=132; i<140; i++) matrix[i] = ((i<135)||(i>137)) ? [-180 + i, 53-i] : [1300, 900]; // 8
        for (let j=140; j<164; j++) matrix[j] = [-48+8, 53-j]; // 24 up 
        for (let i=164; i<172; i++) matrix[i] = [124 - i, 53-i]; // 8  NW
        for (let j=172; j<204; j++) matrix[j] = [-48, 53-j]; // 32 up
        for (let i=204; i<213; i++) matrix[i] = [-252+i, -151]; // 8 right
    } else if (cordType == 'boardGnd') {
        for (let i=0; i<12; i++) matrix[i] = [0, 5-i]; // 12  up
        for (let i=12; i<60; i++) matrix[i] = [12-i, -7]; // 48 left 
        for (let j=60; j<68; j++) matrix[j] = [-48, 53-j]; // 8 up
        for (let i=68; i<76; i++) matrix[i] = [20-i, 53-i]; // 8  NW
        for (let j=76; j<100; j++) matrix[j] = [-56, 53-j]; // 24 up 
        for (let i=100; i<108; i++) matrix[i] = ((i<103)||(i>105)) ? [-156+i, 53-i] : [1300, 900]; // 8 !!!
        for (let j=108; j<132; j++) matrix[j] = [-48, 53-j]; // 24 up 
        for (let i=132; i<140; i++) matrix[i] = [84-i, 53-i]; // 8  NW
        for (let j=140; j<164; j++) matrix[j] = [-56, 53-j]; // 24 up 
        for (let i=164; i<172; i++) matrix[i] = ((i<167)||(i>169)) ? [-220+i, 53-i] : [1300, 900]; // 8 !!!
        for (let j=172; j<197; j++) matrix[j] = [-48, 53-j]; // 25 up 
    }
    return matrix;
}
//////// END of CORD ANIMATION ////////////////////////////

////----- Functions for MOUSE and TOUCH ------------------//

// Getting True Mouse Position at Canvas
function getMousePosition(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}

// Touch Area CONSTRUCTOR
function component(x, y, width, height) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function () {
    context.fillStyle = "#fff";
    context.beginPath();
    context.lineWidth = "6";
    context.strokeStyle = "red";
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
//    context.strokeRect(this.x, this.y, this.width, this.height);
}
  this.clicked = function () {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var clicked = true;
      if ((mybottom < pointerPos.y) || (mytop > pointerPos.y) || (myright < pointerPos.x) || (myleft > pointerPos.x)) {
          clicked = false;
      }
      return clicked;
  }
}

// Touch Area INIT using Constractor
function respChipPosition() {

  respResetButton = new component(27, 720, 195, 73);

  respFreeChip = new component(620, 722, 48, 64);

  respChipSet = [];
  let h = chipSet.length;
  for (let i = 0; i < h; i++) {
    respChipSet[i] = [];
    let w = chipSet[i].length - 1;
    for (let j = 0; j < w; j++) {
        respChipSet[i][j] = new component(170 + 128*j, 50 + 128*i, 48, 64);
    }
  }
}
////////////////////////////////////////////////////////////////
// Main GAME LOOP including countdown time calculation    /////
///////////////////////////////////////////////////////////////
function update(time = 0) {
// CountDown Timer Calculations  
  let deltaTime = time - lastTime;
  if ((deltaTime > 20) || (deltaTime < 0)) deltaTime = lastDT
  lastTime = time;
  lastDT = deltaTime;
  animationCounter += deltaTime; // cord animation 
  if (animationCounter > animationSpeed) {
      aP += 1;
      animationCounter = 0;
  }
  if (aP>3) aP = 0; // Animation Phase Counter Reset

// Drawing Board, Timer, Logic Chips, Target Chips, Signal Cords, 
  drawBoard();  
  drawChipSet(chipSet);
  drawFreeChip();
  signalSet = calculateSignalSet(signalSet); // recalculation state of Signals
  drawSignalCord();

// recalculation state of Target Chips
  targetChipSet = calculateTagetState(targetChipSet);
  drawTargetChipSet(targetChipSet);

  drawNewTimer(timeRemain);
  timeRemain -= deltaTime;

///////////  POP UP WINDOWS ON EVENTS /////////////////////////////////////
  
  // context.font = "64px Arial";
  // context.fillStyle = '#ff0';
  // context.textAlign = "center";

  // context.fillText(String(Math.round(pointerPos.x)), 60, 50);
  // context.fillText(String(Math.round(pointerPos.y)), 230, 50);

//////////  ALARM State ???
  if (targetChipSet.includes(10)) {
    gameState = 'alarm';
    alarmCounter = targetChipSet.filter(val => val == 10).length;
  }

/////////   CLUE State ???
  targetChipSet.forEach(targetChip => {
    if (targetChip == 11) {
      gameState = 'clue';
      clueCounter +=1;
    }
  });

////////  VICTORY condition
  if (phoneCounter == 5) gameState = 'victory';  /////// VICTORY CONDITION

////////////////////////////////////////////////////////////////////////
////////        ANIMATION FRAME LOGIC       ////////////////////////////
///////////////////////////////////////////////////////////////////////
    if ((timeRemain > 0) && (gameState == 'running')) { // Game Running
      myRAF = requestAnimationFrame(update);
    } else if (gameState == 'pause') {
        popUpWindow('pause');
    } else if (gameState == 'clue') {
        popUpWindow('clue');
    } else if (gameState == 'alarm') {
        popUpWindow('alarm');
    } else if (gameState == 'victory') {
        popUpWindow('victory');        
    } else if (timeRemain <= 0) {
        timeRemain = 0;
        gameState = 'time-out'
        drawNewTimer(timeRemain);
        cancelAnimationFrame(myRAF);
        popUpWindow('time-out');
    }
} // END of function UPDATE()

    /////////////////////////////////////////////////////////////////////////
    /////////////////////   Creating GAME BOARD LAYOUT    ///////////////////
    ////////////////////////////////////////////////////////////////////////
    let pointerPos = {x: false, y:false};
    const player = {      // position of BLUE CHIP 
      pos: {y: 2, x: 3},
    };
    let timeRemain = timerInput * 60 * 1000; // countdown timer value in ms
    let animationCounter = 0;               // timer for each animation phase
    let aP = 0;  // animathion Phase [0, 1, 2, 3]

    let clueCounter = 0;
    let phoneCounter = 0;
    let alarmCounter = 0;

    let gameState = 'running';                  // State of the game
    let freeChip = createFreeChip();            // Init of FREE CHIP
    let chipSet = createChipSet(7, 5);          // Init of LOGIC CHIP Set 
    let targetChipSet = createTargetChipSet();  // Init of TARGET CHIPs: Phones and Bells (5 x 5)
    const pathSet = createPathSet(6,9);         // Init of PATH Layout
    let signalSet = createSignalSet(14, 10);    // Init of Signal Matrix
    chipSet = correctChipSet();     // Correction of Logic Chips Layout to gain 0's output
    respChipPosition();              



// KEYBOARD CONTROLS:////////////////////////////////////////////
//                    arrows: to move blue chip
//                    space : to switch Blue and Free Chips
//                    'p': to pause and unpause game  

document.addEventListener('keydown', event => {
  if (gameState == 'running')  {
    if (event.keyCode === 38) {       // key arrow up
      if (player.pos.y > 0) {
        moveBlueChip(0, -1);
        }
    } else if (event.keyCode == 40) { // key arrow down
        if (player.pos.y < 4) {
          moveBlueChip(0, +1);
        }
    } else if (event.keyCode == 37) { // key arrow left
        if (player.pos.x > 0) {
          moveBlueChip(-1, 0);
        }
    } else if (event.keyCode == 39) { // key arrow right
        if (player.pos.x < 5) {
          moveBlueChip(+1, 0);
        }
    } else if (event.keyCode == 32) { // key Space 32
        if ((xDigit(chipSet[player.pos.y][player.pos.x], 0) !== 2)) {
          switchChips();
        }
    } else if (event.keyCode == 80) { // key 'p' 80
        gameState = 'pause';
    }
  } ///////// EVENTS in PAUSE state of a game ///////////////////////
  else if (gameState == 'pause') {
        if ((event.keyCode == 80) || (event.keyCode == 32)) { // key 'p' = 80 unpause
            gameState = 'running';
            update();
        }
  }///////// EVENTS in CLUE state of a game ///////////////////////
  else if (gameState == 'clue') {
    if ((event.keyCode == 80) || (event.keyCode == 32)) { // key 'p' = 80 unpause
        //targetChipSet.forEach(targetChip => {if (targetChip == 11) targetChip = 111;});
        gameState = 'running';
        update();
    }
  }
}); // END of document.addEventListener('keydown', event =>

///////////////////  MOUSE EVENTS /////////////////////////

document.addEventListener('click', event => {
  pointerPos = getMousePosition(canvas, event);
  if (gameState == 'running')  {
      if (respFreeChip.clicked()) {
          if ((xDigit(chipSet[player.pos.y][player.pos.x], 0) !== 2))
          switchChips();
      } else if (respResetButton.clicked()) {
          gameState = 'pause';
      } else {
          respChipSet.forEach((row, y) => {
              row.forEach((val, x) => {
                  if (val.clicked()) {
                      moveBlueChip(x - player.pos.x, y - player.pos.y);
                  }
                });
            });
      }
  } else if ((gameState == 'pause') || (gameState == 'clue')) {
    gameState = 'running';
    update();
  } else if ((gameState == 'alarm') || (gameState == 'victory') || (gameState == 'time-out')) {
      if (respResetButton.clicked()) {
        document.location.reload(true);
      }
  }
}); // END of document.addEventListener('mousedown'

document.addEventListener('mouseup', event => {
  pointerPos.x = false;
  pointerPos.y = false;
}); // END of document.addEventListener('mouseup'

/////////////////   TOUCH-PAD Events  /////////////////////

document.addEventListener('toucstart', event => {
  // pointerPos = getMousePosition(canvas, event);
  pointerPos.x = e.changedTouches[0].clientX;
  pointerPos.y = e.changedTouches[0].clientY;
  if (gameState == 'running')  {
      if (respFreeChip.clicked()) {
          if ((xDigit(chipSet[player.pos.y][player.pos.x], 0) !== 2))
          switchChips();
      } else {
          respChipSet.forEach((row, y) => {
              row.forEach((val, x) => {
                  if (val.clicked()) {
                      moveBlueChip(x - player.pos.x, y - player.pos.y);
                  }
                });
            });
      }
  } else if ((gameState == 'pause') || (gameState == 'clue')) {
    gameState = 'running';
    update();
  } else if ((gameState == 'alarm') || (gameState == 'victory') || ((gameState == 'time-out'))) {
    if (respResetButton.clicked()) {
      document.location.reload(true);
    }
}
}); // END of document.addEventListener('touchstart')

document.addEventListener('touchend', event => {
  pointerPos.x = false;
  pointerPos.y = false;
}); // END of document.addEventListener('touchend'

// MAIN GAME LOOP Run
update();