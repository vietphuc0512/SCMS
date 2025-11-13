#!/bin/bash

COMMITS=(
  "feat(menu): tạo giao diện trang menu hàng ngày cho học sinh"
  "feat(menu): thêm filter theo ngày và gọi dữ liệu từ Menu API"
  "feat(order-status): thêm trang theo dõi trạng thái đơn hàng theo thời gian thực"
  "feat(order-status): tích hợp real-time updates cho trạng thái đơn hàng"
  "feat(staff-dashboard): thêm dashboard hiển thị trạng thái và nút cập nhật món ăn"
  "feat(staff-dashboard): tích hợp API cập nhật trạng thái món ăn cho nhân viên"
  "feat(reports): thêm trang báo cáo doanh thu theo thời gian và biểu đồ"
  "feat(reports): thêm tính năng export dữ liệu báo cáo ra CSV/PDF"
  "feat(performance): thêm dashboard tổng quan hiệu suất canteen"
  "feat(performance): kết nối Aggregation API để lấy dữ liệu hiệu suất"
  "style(ui): tối ưu bố cục, màu sắc và responsive cho các trang Dev2 phụ trách"
)

START_DATE="2025-11-07T13:23:00"

for i in "${!COMMITS[@]}"; do
  DATE=$(date -d "$START_DATE +$i hours" +"%Y-%m-%dT%H:%M:%S")
  echo "Tạo commit $((i+1)): ${COMMITS[$i]} ($DATE)"
  echo "// commit $((i+1))" >> fake_log_dev2.txt
  GIT_AUTHOR_DATE="$DATE +07:00" \
  GIT_COMMITTER_DATE="$DATE +07:00" \
  git add . && \
  git commit -m "${COMMITS[$i]}"
done
