const BASE_URL =
  (process.env.REACT_APP_API_URL || "https://vstep-be.onrender.com") + "/api";

const authService = {
  loginWithQR: async (qrData) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qrCode: qrData }),
    });

    if (!response.ok) throw new Error("Invalid QR Code");
    return response.json();
  },
};

export default authService;
