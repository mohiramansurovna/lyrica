const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

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
