import { Html5QrcodeScanner } from "html5-qrcode/esm/html5-qrcode-scanner";
import axios from "axios";

/**
 * Quét QR code bằng camera.
 * @param {Function} onScan - Callback khi quét thành công.
 */
export const startQRScanner = (onScan) => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => console.log("🎥 Camera hoạt động OK", stream))
    .catch((err) => console.error("❌ Lỗi camera:", err));

  console.log("📦 Phiên bản trình duyệt:", navigator.userAgent);

  const scanner = new Html5QrcodeScanner("qr-reader", {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    rememberLastUsedCamera: true,
    verbose: true,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true },
  });

  scanner.render(
    (decodedText) => {
      console.log("✅ QR Code Detected:", decodedText);
      console.log("📷 Bắt đầu quét QR Code...");
      console.log("📌 Mã QR giải mã:", decodedText);
      alert("📌 Mã QR: " + decodedText);
      onScan(decodedText);
      setTimeout(() => scanner.clear(), 500);
    },
    (error) => {
      if (error.name === "NotFoundException") {
        console.warn(
          "⚠️ Không tìm thấy QR code. Hãy đảm bảo mã QR rõ ràng và nằm trong khung quét!"
        );
      } else if (error.message.includes("No MultiFormat Readers")) {
        console.error(
          "🚨 Không có trình đọc QR hợp lệ. Hãy kiểm tra lại cài đặt thư viện!"
        );
      } else if (error.name === "ChecksumException") {
        console.warn("⚠️ Mã QR không hợp lệ (sai checksum). Thử quét lại!");
      } else if (error.name === "FormatException") {
        console.warn("⚠️ Định dạng QR code không đúng hoặc bị mờ!");
      } else if (error.name === "NotAllowedError") {
        console.error(
          "🚨 Trình duyệt chặn quyền truy cập camera! Hãy cấp quyền."
        );
      } else if (error.name === "NotReadableError") {
        console.error(
          "🚨 Camera đang bị sử dụng bởi ứng dụng khác hoặc lỗi phần cứng."
        );
      } else if (error.name === "OverconstrainedError") {
        console.error("🚨 Không tìm thấy camera phù hợp với yêu cầu.");
      } else {
        console.error("❌ Lỗi không xác định:", error);
      }
    }
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
    console.log("📤 Đang gửi ảnh QR lên server...");
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/login`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log("✅ Phản hồi từ server:", response.data);
    onSuccess(response.data);
  } catch (error) {
    console.error(
      "❌ Lỗi giải mã QR từ server:",
      error.response?.data || error
    );
    onError(error.response?.data?.message || "Login failed");
  }
};
