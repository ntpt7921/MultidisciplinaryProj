# Note for meeting #4

Ngày 25/10/2023

Thiếu Lê Minh Hoàng

## Mục đích

Ứng với các yêu cầu mới được đặt ra tong buổi báo cáo với người hướng dẫn:

- Hệ thóng có khả năng truyền/nhận lệnh/thông tin (cần phải liên lạc hai chiều, vừa đọc được trạng
thái hiện tại của thiết bị vừa phải gửi được lệnh đi).

- Sơ đồ khối cho hệ thống + thể hiện liên lạc giữa các thành phần.

- Hoàn thành Web UI

## Nội dung

Phát hiện ra là thiết kế về UI trong Figma được làm ban đầu không thể hiện thưc với template web UI
hiện tại. -> do yêu cầu công việc ban đầu không kĩ.

Điểm lại các nội dung chính đã làm:

- Về Web UI mình vẫn đang làm và có tiến triển. Có thể xong trong tuần tới.
- Hệ thống giờ sẽ có 5 node lớn: yolobit, server, UI (mobile app/web), node nhận diện mặt, node nhận
diện người có trong phòng.
- Về kiến trúc database, bỏ đi một số mục nhất định (trạng thái hiện tại của các thiết bị điều khiển
không cần lưu lại, một số cảm biến không gửi tin lên).
- Cần sửa lại tính năng của Yolo:bit
    - Thêm các topic yêu càu trạng thái hiện tại 
    - Sửa lỗi `undefined variable` trong chương trình (sẽ sửa sớm nhất có thể)

Nội dung cần thực hiện mới:

- Cần có MQTT listener trên server để chuyển dữ liệu cảm biến vào database.
- Cần có các node thực hiện lấy dữ liệu từ camera và chạy mô hình nhận diện mặt + dò hiện diện người
  trong phòng.
- Cần làm block diagram các khối chính của hệ thống
- Cần làm sequence diagram cho các liên lạc của các khối trong hệ thống.

## Phân công công việc

- Vãn tiếp tục hoàn thiện mấy phần việc cũ.
- Làm tiếp các việc sau:
    - Làm node AI (2 cái) - cần phải đi hỏi
    - Làm block diagram chỉ các khối chính của hệ thống (để tui)
    - Làm sequence diagram cho các giao tiếp trong hệ thống (để tui luôn)
    - Làm MQTT listener chạy trên server để đưa dữ liệu vào database.


