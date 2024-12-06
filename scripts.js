const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const loadList = document.getElementById("loadList");
let drawings = []; // List of saved drawings
let currentDrawing = "";

// Variables to track the drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set up drawing styles
ctx.lineWidth = 5; // Thickness of the brush
ctx.lineJoin = "round"; // Smooth corners
ctx.lineCap = "round"; // Smooth ends
ctx.strokeStyle = "#000"; // Default color

// Start drawing
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Track the starting point
});

// Stop drawing
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Draw on the canvas
canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return; // Stop if the mouse is not pressed
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; // Update the last point
});
// Change brush color
document.getElementById("colorPicker").addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
});

// Change brush size
document.getElementById("brushSize").addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});


// Draw on the canvas
function draw(event) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "blue";

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
  console.log(drawings)
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
