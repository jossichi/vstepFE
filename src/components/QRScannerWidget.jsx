import React, { useRef, useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScannerWidget = ({ onChange }) => {
  const qrReaderRef = useRef(null); // Tham chiếu tới phần tử DOM
  const [scannerReady, setScannerReady] = useState(false); // Trạng thái sẵn sàng của scanner

  useEffect(() => {
    let html5QrCode = null; // Khai báo biến qrCode

    const initializeScanner = async () => {
      // Kiểm tra nếu qrReaderRef.current không phải là null và đã sẵn sàng
      if (!qrReaderRef.current || !qrReaderRef.current.clientWidth) {
        console.log("Đang chờ phần tử DOM...");
        return;
      }

      html5QrCode = new Html5Qrcode(qrReaderRef.current.id); // Tạo đối tượng Html5Qrcode với ID phần tử

      try {
        const devices = await Html5Qrcode.getCameras(); // Lấy danh sách camera
        if (devices && devices.length > 0) {
          await html5QrCode.start(
            { facingMode: "environment" }, // Chọn camera sau
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              onChange(decodedText); // Gửi giá trị QR code cho parent component
              html5QrCode.stop(); // Dừng scanner sau khi quét xong
            },
            (errorMessage) => {
              console.error("Lỗi khi quét QR:", errorMessage);
            }
          );
          setScannerReady(true); // Đánh dấu scanner đã sẵn sàng
        } else {
          console.error("Không tìm thấy camera");
        }
      } catch (error) {
        console.error("Lỗi khi khởi tạo QR scanner:", error);
      }
    };

    initializeScanner();

    // Cleanup khi component unmount hoặc cập nhật
    return () => {
      if (html5QrCode) {
        html5QrCode
          .stop()
          .catch((err) => console.error("Lỗi khi dừng scanner:", err));
      }
    };
  }, [onChange]); // Dependency array có onChange vì cần cập nhật khi prop thay đổi

  return (
    <div>
      <div
        ref={qrReaderRef}
        id="qr-reader"
        style={{
          width: "100%",
          height: "300px",
          display: scannerReady ? "block" : "none",
        }}
      />
      {!scannerReady && <p>Đang khởi tạo camera...</p>}
    </div>
  );
};

export default QRScannerWidget;
