# Note for meeting #2

Ngày 01/10/2023

Hiện diện:
- Đủ các bạn trong nhóm

## Kế hoạch

1. Bàn về các use-case của hệ thống.
2. Từ các use-case, xác nhận lại các tính năng cần thực hiện.
3. Đề ra các mục tiêu và phân chia công việc.

## Nội dung

### Use-case của hệ thống và các tính năng cần thực hiện


### Các mục tiêu

1. Draw the UML use-case diagram

2. Thiết kế UI
    - Tim framework hay mẫu UI có thể sử dụng
    - Đề ra cấu trúc tổng quát cho UI (các trang gì? có các nút và thành phần gì? cách chuyển đổi
    giữa các trang -> hướng tới hiện thực được các use-case đã đề ra).
    - Nếu kịp thì hiện thực code luôn.

3. Tìm hàm trong framework UI gửi MQTT
    - Xác định cần phải lập trình để giao tiếp được với thiết bị qua trung gian MQTT broker.
    - Hiện thực việc giao tiếp với yêu cầu đơn giản (gửi nhận gói tin) như là bước đầu, để tuần sau
      có cái demo.

4. Phần cứng + server MQTT tự host
    - Yolo:bit thì tới 10/10 mới nhận được. Nên giờ ngồi chơi chứ chưa làm gì được.
    - Tìm hiểu về cách tự host MQTT broker trên AWS EC2 (có thể dùng được tier miễn phí)
    - Nếu có thời gian, chuẩn bị một buổi để chuyển giao kiến thức đã biết về MQTT, về hệ thống nói
      chung và về các lưu ý lỗi dễ gặp phải.

### Phân chia công việc

|||
|:-----------------------------------------------:|-------------------------------------------------------|
|                 Use-case diagram                | Lê Minh Hoàng Nguyễn <br> Trần Phước Thành <br> Hoa Phương Tùng |
|                   Thiết kế UI                   | Lê Minh Hoàng <br> Trương Công Hoàng                  |
| Hiện thực gửi nhận MQTT trong framework sử dụng | Thành Nguyễn <br> Hoa Phương Tùng                     |
|             Phần cứng + MQTT tự host            | Nguyễn Trần Phước Thành                               |
