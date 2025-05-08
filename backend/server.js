import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Robust dynamic CORS config for local dev
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);
    if (origin === "http://localhost:3000") {
      return callback(null, true);
    }
    // Optionally, add more allowed origins here
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  optionsSuccessStatus: 204
}));

// Simple logger to show requests are reaching the backend
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use(express.json());

// MongoDB Connection (replace with your URI)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/chama_plus", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mount authentication routes at /api/auth
app.use("/api/auth", authRoutes);

let chamas = [
  { id: "1", name: "Mwanzo Chama", members: 12 },
  { id: "2", name: "Ujenzi Chama", members: 8 },
];

app.get("/api/chamas", (req, res) => {
  res.json(chamas);
});

app.post("/api/chamas", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Chama name is required" });
  }
  const newChama = {
    id: uuidv4(),
    name,
    members: 0,
  };
  chamas.push(newChama);
  res.status(201).json(newChama);
});

app.get("/api/chamas/:id", (req, res) => {
  const chamaId = req.params.id;
  const chama = chamas.find((c) => c.id === chamaId);
  if (!chama) {
    return res.status(404).json({ message: "Chama not found" });
  }
  res.json(chama);
});

app.put("/api/chamas/:id", (req, res) => {
  const chamaId = req.params.id;
  const { name } = req.body;
  const index = chamas.findIndex((c) => c.id === chamaId);
  if (index === -1) {
    return res.status(404).json({ message: "Chama not found" });
  }
  if (!name) {
    return res.status(400).json({ message: "Chama name is required" });
  }
  chamas[index].name = name;
  res.json(chamas[index]);
});

app.delete("/api/chamas/:id", (req, res) => {
  const chamaId = req.params.id;
  const initialLength = chamas.length;
  chamas = chamas.filter((c) => c.id !== chamaId);
  if (chamas.length === initialLength) {
    return res.status(404).json({ message: "Chama not found" });
  }
  res.status(204).send();
});

// Catch-all JSON 404 handler for API routes (fixes path-to-regexp error)
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

app.get("/", (req, res) => {
  res.send("ChamaPlus Backend is running!");
});

// Catch-all handler for all other routes (serves index.html or 404 text)
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
