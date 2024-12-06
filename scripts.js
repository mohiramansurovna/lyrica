const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const loadList = document.getElementById("loadList");

let isDrawing = false;
let drawings = []; // List of saved drawings
let currentDrawing = "";

// Drawing events
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", draw);

// Draw on the canvas
function draw(event) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Save the current drawing
function saveDrawing() {
  currentDrawing = canvas.toDataURL(); // Save the drawing as a base64 string
  drawings.push(currentDrawing);
  updateLoadList();
  alert("Drawing saved!");
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

// Load a selected drawing
function loadDrawing() {
  const selectedIndex = loadList.selectedIndex - 1; // Adjust for the placeholder
  if (selectedIndex >= 0 && drawings[selectedIndex]) {
    const img = new Image();
    img.src = drawings[selectedIndex];
    img.onload = () => {
      clearCanvas();
      ctx.drawImage(img, 0, 0);
    };
  }
}

// Update the dropdown list with saved drawings
function updateLoadList() {
  const newOption = document.createElement("option");
  newOption.text = `Drawing ${drawings.length}`;
  newOption.value = drawings.length - 1;
  loadList.appendChild(newOption);
}
