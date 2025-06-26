"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  detectFace,
  initializeFaceAPI,
  serializeDescriptor
} from "@/lib/face-recognition";
import {
  Camera,
  CheckCircle,
  Clock,
  UserCheck,
  UserPlus,
  XCircle
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type KioskState =
  | "idle"
  | "scanning"
  | "identified"
  | "registering"
  | "success"
  | "error";

interface Person {
  id: number;
  name: string;
  type: "staff" | "guest";
  confidence?: number;
}

export default function KioskPage() {
  const [state, setState] = useState<KioskState>("idle");
  const [action, setAction] = useState<"check-in" | "check-out" | null>(null);
  const [identifiedPerson, setIdentifiedPerson] = useState<Person | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [faceApiReady, setFaceApiReady] = useState(false);

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCompany, setGuestCompany] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const capturedDescriptorRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    initializeFaceRecognition();
    return () => {
      stopCamera();
    };
  }, []);

  const initializeFaceRecognition = async () => {
    try {
      await initializeFaceAPI();
      setFaceApiReady(true);
      setMessage("Ready to scan");
    } catch (error) {
      console.error("Failed to initialize face recognition:", error);
      setMessage("System unavailable");
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setMessage("Camera access denied");
      setState("error");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleActionSelect = async (
    selectedAction: "check-in" | "check-out"
  ) => {
    if (!faceApiReady) {
      setMessage("System not ready");
      return;
    }

    setAction(selectedAction);
    setState("scanning");
    setMessage(`Position face for ${selectedAction}`);
    await startCamera();
  };

  const captureFace = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsLoading(true);
    setMessage("Scanning...");

    try {
      const detection = await detectFace(videoRef.current);

      if (!detection) {
        setMessage("No face detected. Try again.");
        setIsLoading(false);
        return;
      }

      capturedDescriptorRef.current = detection.descriptor;

      const response = await fetch("/api/face/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descriptor: serializeDescriptor(detection.descriptor)
        })
      });

      const result = await response.json();

      if (result.person) {
        setIdentifiedPerson(result.person);
        setState("identified");
        setMessage(`Welcome ${result.person.name}!`);
      } else {
        setState("registering");
        setMessage("New face detected. Register as guest.");
      }
    } catch (error) {
      console.error("Error during face capture:", error);
      setMessage("Scan failed. Try again.");
      setState("error");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAction = async () => {
    if (!identifiedPerson || !action) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personId: identifiedPerson.id,
          personType: identifiedPerson.type,
          action,
          confidence: identifiedPerson.confidence || 0
        })
      });

      if (response.ok) {
        setState("success");
        setMessage(`${action} completed!`);
        setTimeout(resetKiosk, 3000);
      } else {
        throw new Error("Failed to record action");
      }
    } catch (error) {
      console.error("Error confirming action:", error);
      setMessage("Action failed. Try again.");
      setState("error");
    } finally {
      setIsLoading(false);
    }
  };

  const registerGuest = async () => {
    if (!guestName.trim() || !capturedDescriptorRef.current) {
      setMessage("Name and face scan required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/guests/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName,
          phone: guestPhone,
          company: guestCompany,
          faceEmbedding: serializeDescriptor(capturedDescriptorRef.current)
        })
      });

      const result = await response.json();

      if (response.ok) {
        setIdentifiedPerson({
          id: result.guestId,
          name: guestName,
          type: "guest"
        });
        setState("identified");
        setMessage(`Welcome ${guestName}!`);
      } else {
        throw new Error(result.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering guest:", error);
      setMessage("Registration failed. Try again.");
      setState("error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetKiosk = () => {
    setState("idle");
    setAction(null);
    setIdentifiedPerson(null);
    setMessage("");
    setGuestName("");
    setGuestPhone("");
    setGuestCompany("");
    capturedDescriptorRef.current = null;
    stopCamera();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg py-8">
            <CardTitle className="text-4xl font-bold tracking-tight">
              Office Access Kiosk
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg mt-2">
              Secure and easy check-in system
            </CardDescription>
          </CardHeader>

          <CardContent className="p-10">
            {message && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center">
                <p className="text-blue-700 font-medium text-lg">{message}</p>
              </div>
            )}

            {state === "idle" && (
              <div className="text-center space-y-8">
                <div>
                  <Clock className="h-20 w-20 text-blue-500 mx-auto mb-6 animate-pulse" />
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Welcome
                  </h2>
                  <p className="text-gray-600 text-lg mt-2">
                    Select an action to proceed
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button
                    size="lg"
                    className="h-24 text-xl bg-blue-500 hover:bg-blue-600 transition-colors"
                    onClick={() => handleActionSelect("check-in")}
                    disabled={!faceApiReady}
                  >
                    <UserCheck className="h-8 w-8 mr-3" />
                    Check In
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="h-24 text-xl border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                    onClick={() => handleActionSelect("check-out")}
                    disabled={!faceApiReady}
                  >
                    <UserCheck className="h-8 w-8 mr-3" />
                    Check Out
                  </Button>
                </div>
              </div>
            )}

            {state === "scanning" && (
              <div className="text-center space-y-8">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full max-w-lg mx-auto rounded-xl border-4 border-blue-100 shadow-md"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={captureFace}
                    disabled={isLoading}
                    className="w-full max-w-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    <Camera className="h-6 w-6 mr-3" />
                    {isLoading ? "Scanning..." : "Capture Face"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={resetKiosk}
                    className="border-blue-300 text-blue-500 hover:bg-blue-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {state === "identified" && identifiedPerson && (
              <div className="text-center space-y-8">
                <div>
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce" />
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Welcome, {identifiedPerson.name}!
                  </h2>
                  <div className="flex justify-center items-center space-x-3 mt-4">
                    <Badge
                      variant={
                        identifiedPerson.type === "staff"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        identifiedPerson.type === "staff"
                          ? "bg-blue-500"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {identifiedPerson.type.charAt(0).toUpperCase() +
                        identifiedPerson.type.slice(1)}
                    </Badge>
                    {identifiedPerson.confidence && (
                      <Badge variant="outline" className="border-blue-300">
                        {Math.round(identifiedPerson.confidence * 100)}% Match
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    onClick={confirmAction}
                    disabled={isLoading}
                    className="w-full max-w-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    {isLoading ? "Processing..." : `Confirm ${action}`}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={resetKiosk}
                    className="border-blue-300 text-blue-500 hover:bg-blue-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {state === "registering" && (
              <div className="space-y-8">
                <div className="text-center">
                  <UserPlus className="h-20 w-20 text-blue-500 mx-auto mb-6 animate-pulse" />
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Guest Registration
                  </h2>
                  <p className="text-gray-600 text-lg mt-2">
                    Enter your details below
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="guestName" className="text-lg">
                      Full Name *
                    </Label>
                    <Input
                      id="guestName"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="border-blue-200 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guestPhone" className="text-lg">
                      Phone Number
                    </Label>
                    <Input
                      id="guestPhone"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="border-blue-200 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guestCompany" className="text-lg">
                      Company
                    </Label>
                    <Input
                      id="guestCompany"
                      value={guestCompany}
                      onChange={(e) => setGuestCompany(e.target.value)}
                      placeholder="Enter your company name"
                      className="border-blue-200 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    onClick={registerGuest}
                    disabled={isLoading || !guestName.trim()}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    {isLoading ? "Registering..." : "Register & Continue"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={resetKiosk}
                    className="border-blue-300 text-blue-500 hover:bg-blue-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {state === "success" && (
              <div className="text-center space-y-8">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto animate-bounce" />
                <h2 className="text-3xl font-semibold text-green-700">
                  Success!
                </h2>
                <p className="text-gray-600 text-lg">
                  Redirecting in a moment...
                </p>
              </div>
            )}

            {state === "error" && (
              <div className="text-center space-y-8">
                <XCircle className="h-24 w-24 text-red-500 mx-auto animate-pulse" />
                <h2 className="text-3xl font-semibold text-red-700">
                  Something Went Wrong
                </h2>
                <Button
                  onClick={resetKiosk}
                  className="bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
