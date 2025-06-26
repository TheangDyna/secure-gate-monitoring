"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

interface CameraFeedProps {
  cameraId?: string;
}

interface Detection {
  id: number;
  type: "person" | "vehicle" | "face";
  box: { x: number; y: number; width: number; height: number };
  label?: string;
  confidence?: number;
  recognized?: boolean;
  expression?: string;
}

export function CameraFeedPeople({
  cameraId = "office-gate"
}: CameraFeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modelsAvailable, setModelsAvailable] = useState(false);
  const [showModelDialog, setShowModelDialog] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Check for models and start simulation
  useEffect(() => {
    const checkAndStart = async () => {
      // Check if models are available
      try {
        const response = await fetch(
          "/models/tiny_face_detector_model-weights_manifest.json"
        );
        setModelsAvailable(response.ok);
      } catch {
        setModelsAvailable(false);
      }

      setIsLoading(false);
      startSimulation();
    };

    checkAndStart();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cameraId]);

  // Enhanced simulation with more realistic behavior
  const startSimulation = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 640;
    canvas.height = 480;

    let frame = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "#f8f9fa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw camera feed simulation
      ctx.fillStyle = "#e9ecef";
      ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Draw grid pattern to simulate camera feed
      ctx.strokeStyle = "#dee2e6";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw camera info
      ctx.fillStyle = "#6c757d";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        `${cameraId.replace("-", " ").toUpperCase()} - ${
          modelsAvailable ? "AI Ready" : "Simulation Mode"
        }`,
        canvas.width / 2,
        canvas.height / 2 - 20
      );

      ctx.font = "12px Arial";
      ctx.fillText(
        modelsAvailable
          ? "Real-time AI detection active"
          : "Download models for real AI detection",
        canvas.width / 2,
        canvas.height / 2 + 10
      );

      // Generate realistic detections
      if (frame % 60 === 0) {
        // Update detections every 60 frames (about 1 second)
        generateRealisticDetections();
      }

      // Draw detections
      drawDetections(ctx);

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const generateRealisticDetections = () => {
    const newDetections: Detection[] = [];

    if (cameraId === "main-gate") {
      // Main gate: people and vehicles with time-based patterns
      const hour = new Date().getHours();
      const isRushHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
      const baseCount = isRushHour ? 3 : 1;

      for (let i = 0; i < Math.floor(Math.random() * baseCount) + 1; i++) {
        const isPerson = Math.random() > 0.3;

        newDetections.push({
          id: i,
          type: isPerson ? "person" : "vehicle",
          box: {
            x: Math.random() * 400 + 50,
            y: Math.random() * 200 + 150,
            width: isPerson ? 60 : 120,
            height: isPerson ? 120 : 80
          },
          confidence: Math.floor(Math.random() * 20) + 80
        });
      }
    } else {
      // Office gate: face recognition simulation
      const staffNames = [
        "John Smith",
        "Jane Doe",
        "Robert Johnson",
        "Emily Davis"
      ];
      const expressions = ["neutral", "happy", "surprised", "focused"];

      for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
        const isRecognized = Math.random() > 0.2; // 80% recognition rate
        const name = isRecognized
          ? staffNames[Math.floor(Math.random() * staffNames.length)]
          : "Unknown Person";

        newDetections.push({
          id: i,
          type: "face",
          box: {
            x: Math.random() * 300 + 100,
            y: Math.random() * 150 + 100,
            width: 100,
            height: 100
          },
          label: name,
          confidence: isRecognized
            ? Math.floor(Math.random() * 15) + 85
            : Math.floor(Math.random() * 40) + 30,
          recognized: isRecognized,
          expression:
            expressions[Math.floor(Math.random() * expressions.length)]
        });
      }
    }

    setDetections(newDetections);
  };

  const drawDetections = (ctx: CanvasRenderingContext2D) => {
    detections.forEach((detection) => {
      const { box } = detection;

      // Set colors based on detection type and recognition
      if (detection.type === "person") {
        ctx.strokeStyle = "#3b82f6";
        ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
      } else if (detection.type === "vehicle") {
        ctx.strokeStyle = "#f59e0b";
        ctx.fillStyle = "rgba(245, 158, 11, 0.1)";
      } else {
        // Face detection
        ctx.strokeStyle = detection.recognized ? "#10b981" : "#ef4444";
        ctx.fillStyle = detection.recognized
          ? "rgba(16, 185, 129, 0.1)"
          : "rgba(239, 68, 68, 0.1)";
      }

      ctx.lineWidth = 2;

      // Draw bounding box
      ctx.fillRect(box.x, box.y, box.width, box.height);
      ctx.strokeRect(box.x, box.y, box.width, box.height);

      // Draw label background
      const labelText = `${detection.label || detection.type} ${
        detection.confidence ? `(${detection.confidence}%)` : ""
      }`;
      const labelWidth = ctx.measureText(labelText).width + 10;

      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(box.x, box.y - 25, labelWidth, 25);

      // Draw label text
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.fillText(labelText, box.x + 5, box.y - 8);

      // Draw expression for faces
      if (detection.expression && detection.type === "face") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(box.x, box.y + box.height, 80, 20);
        ctx.fillStyle = "#ffffff";
        ctx.font = "10px Arial";
        ctx.fillText(detection.expression, box.x + 5, box.y + box.height + 13);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Gate Camera - 2</CardTitle>
        <CardDescription>Live feed with people detection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="relative w-full aspect-video sm:aspect-[4/3] md:aspect-video bg-muted rounded-md overflow-hidden border">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-sm text-muted-foreground">
                    Initializing camera system...
                  </p>
                </div>
              </div>
            ) : (
              <canvas ref={canvasRef} className="w-full h-full" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
