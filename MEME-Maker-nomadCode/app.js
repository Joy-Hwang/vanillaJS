const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 800;
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

let isPainting = false;
let isFilling = false;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

/* basic */
// ctx.fillRect 사각형을 만드는 함수 x, y, width, height
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// ctx.beginPath(); //path를 새로 설정해줘야 위 박스와 아래 박스가 구분이 됨(색상 변경)
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();

// ctx.moveTo(50, 10); //x, y
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.fill();

/* house */
// ctx.fillRect(200, 200, 50, 200) //left wall
// ctx.fillRect(400, 200, 50, 200) //right wall
// ctx.lineWidth = 2; //door width
// ctx.fillRect  (300, 300, 50, 100) //door
// ctx.fillRect(200, 200, 200, 20) //ceil
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100); //지붕 left
// ctx.lineTo(450, 200); //지붕 right
// ctx.fill();

/* person */
// ctx.fillRect(210 - 40, 200 - 30, 15, 100);
// ctx.fillRect(350 - 40, 200 - 30, 15, 100);
// ctx.fillRect(260 - 40, 200 - 30, 60, 200);

// ctx.arc(250, 100, 50, 0, 2 * Math.PI); //x y radius startAngle endAngle  //2*PI는 완전한 원 https://www.w3schools.com/jsref/canvas_arc.asp
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.fill();

/***** 이벤트함수 dump *****/
/* mousemove */
// const colors = [
//   "#cd84f1",
//   "#32ff7e",
//   "#ff4d4d",
//   "#ffaf40",
//   "#fffa65",
//   "#18dcff",
//   "#7d5fff",
//   "#4b4b4b",
// ];
// ctx.moveTo(0, 0);
// function onclick(event) {
//   ctx.beginPath();
//   ctx.moveTo(0, 0);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
//   console.log(event);
// }
// canvas.addEventListener("mousemove", onclick);

/* mousedown */
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath(); //선을 하나씩 그리고 끝내야함, 새로운 선으로 시작
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(event) {
  isPainting = true;
}
function cancelPainting(event) {
  isPainting = false;
}

/* width change */
function onLineWidthChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

/* color change */
function onColorChange(event) {
  console.log(event.target.value);
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  console.dir(event.target);
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

/* fill mode */
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  //새로운 사각형을 만들어서 색상으로 채우기
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

/* destroy */
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/* erase */
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

/* file */
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

/* double click - text */
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save(); //기존 상태를 저장
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    // ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore(); //저장한 상태로 돌아가기
  }
}

/* Save image button */
function onSaveClick() {
  const url = canvas.toDataURL();
  console.log(url);
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
  console.log(url);
}

/***** 이벤트 모음 *****/
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => {
  color.addEventListener("click", onColorClick);
});

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

/* personal */
/* 750에서 width height값 바꾸기 */
// let moWidth = 751;

// window.addEventListener("resize", function () {
//   if (window.innerWidth < moWidth) {
//     console.log("moWidth");
//     canvas.width = 600;
//     canvas.height = 600;
//   } else {
//     canvas.width = 800;
//     canvas.height = 800;
//   }
// });
