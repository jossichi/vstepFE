import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

/**
 * Quét QR code bằng camera.
 * @param {Function} onScan - Callback khi quét thành công.
 */
export const startQRScanner = (onScan) => {
  const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });

  scanner.render(
    (decodedText) => {
      onScan(decodedText);
      scanner.clear();
    },
    (error) => console.log("QR Scan Error:", error)
  );
};

/**
 * Gửi ảnh QR lên backend để giải mã và đăng nhập.
 * @param {File} file - Ảnh QR code.
 * @param {Function} onSuccess - Callback khi đăng nhập thành công.
 * @param {Function} onError - Callback khi gặp lỗi.
 */
export const uploadQRImage = async (file, onSuccess, onError) => {
  const formData = new FormData();
  formData.append("qr_image", file);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/login`, // 🔹 Sử dụng URL từ env
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    onSuccess(response.data);
  } catch (error) {
    console.error("❌ Error decoding QR:", error.response?.data || error);
    onError(error.response?.data?.message || "Login failed");
  }
};
