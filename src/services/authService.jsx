const BASE_URL =
  (process.env.REACT_APP_API_URL || "https://vstep-be.onrender.com") + "/api";

const authService = {
  loginWithQR: async (qrData) => {
    console.log("🔹 Sending QR data:", qrData);

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrCode: qrData }),
    });

    const result = await response.json();
    console.log("✅ Response from server:", result);

    if (!response.ok) throw new Error(result.message || "Invalid QR Code");
    return result;
  },
};

export default authService;
