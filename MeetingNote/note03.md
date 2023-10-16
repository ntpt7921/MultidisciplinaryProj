# Note for meeting #2

Ngày 09/10/2023

Hiện diện:
- Nhớ có thiếu Lê Minh Hoàng
- Còn có thể thiếu 1 bạn khác nhưng không nhớ

## Kế hoạch

1. Về tiến độ công việc cho các phần dược giao

## Nội dung

### Vẽ use-case diagram

Hoàn thành, xem file [Use case diagram](../Planning/UC.png)

### Thiết kế UI

Đã hoàn thành mockup cho giao diện chung của ứng dụng, có cấu trúc tổng quát. Thực hiện trên Figma.

Xem file [Thiết kế UI](../Planning/UI.pdf)

### Tìm phương thức gửi MQTT từ UI

Có một demo sử dụng một trang web tĩnh với Javascript + thư viện để gửi được các gói tin qua giao
thức MQTT. Bên còn lại (broker + server + database đều được host trên máy local) sẽ nhận gói tin
MQTT này và cho vào cơ sở dữ liệu SQL.

### Phần cứng + broker MQTT tự host

Vẫn chưa lấy được mạch, nên không có tiến triển ở phần cứng.

Chưa hoàn thành việc host MQTT broker trên mạng.


## Việc cần làm tiếp theo

1. UI
    - Hiện thực UI

2. Phần cứng + server MQTT tự host
    - Tìm hiểu về cách tự host MQTT broker trên AWS EC2 (có thể dùng được tier miễn phí)
    - Nếu có thời gian, chuẩn bị một buổi để chuyển giao kiến thức đã biết về MQTT, về hệ thống nói
      chung và về các lưu ý lỗi dễ gặp phải.

## Phân chia công việc

Chưa có quá nhiều công việc mới hơn, các phần chưa hoàn thành xong sẽ tiếp tục được hoàn thành theo
phân công từ tuần trước.
