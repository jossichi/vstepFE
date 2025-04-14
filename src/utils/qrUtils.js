import { Html5QrcodeScanner } from "html5-qrcode/esm/html5-qrcode-scanner";
import axios from "axios";

/**
 * Quét QR code bằng camera.
 * @param {Function} onScan - Callback khi quét thành công.
 */
export const startQRScanner = (onScan) => {
  // Log camera access for debugging
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => console.log("🎥 Camera hoạt động OK", stream))
    .catch((err) => console.error("❌ Lỗi camera:", err));

  // console.log("📦 Phiên bản trình duyệt:", navigator.userAgent);

  // Create and render the scanner
  const scanner = new Html5QrcodeScanner("qr-reader", {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    rememberLastUsedCamera: true,
    verbose: true,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true },
  });

  scanner.render(
    (decodedText) => {
      // console.log("✅ QR Code Detected:", decodedText);

      try {
        // Try to parse the QR content as JSON if it's in JSON format
        let parsedData = decodedText;
        if (decodedText.startsWith("{") && decodedText.endsWith("}")) {
          parsedData = JSON.parse(decodedText);
          // console.log("📌 Parsed JSON data:", parsedData);
        }

        // Pass the data to the callback
        onScan(parsedData);
        alert("📌 Mã QR đã quét thành công!");
      } catch (error) {
        console.error("Error parsing QR data:", error);
        // If parsing fails, pass the raw text
        onScan(decodedText);
        alert("📌 Mã QR: " + decodedText);
      }

      // Clear the scanner after successful scan
      setTimeout(() => scanner.clear(), 500);
    },
    (error) => {
      if (error.name === "NotFoundException") {
        console.warn(
          "⚠️ Không tìm thấy QR code. Hãy đảm bảo mã QR rõ ràng và nằm trong khung quét!"
        );
      } else if (
        error.message &&
        error.message.includes("No MultiFormat Readers")
      ) {
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

  const apiUrl = process.env.REACT_APP_API_URL || "";
  if (!apiUrl) {
    console.error("REACT_APP_API_URL is not set");
    onError("API URL not configured");
    return;
  }

  try {
    console.log("📤 Đang gửi ảnh QR lên server...");
    const response = await axios.post(`${apiUrl}/api/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include cookies if using session authentication
    });

    console.log("✅ Phản hồi từ server:", response);

    // Check if the response contains user data
    if (response.data && response.data.user) {
      onSuccess(response.data.user);
    } else if (response.data) {
      onSuccess(response.data);
    } else {
      onError("Không có dữ liệu trong phản hồi");
    }
  } catch (error) {
    console.error(
      "❌ Lỗi giải mã QR từ server:",
      error.response?.data || error
    );

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Không thể xử lý QR code";

    onError(errorMessage);
  }
};
