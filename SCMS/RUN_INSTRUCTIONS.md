# Hướng dẫn chạy dự án Smart Canteen Management System

## Cách chạy dự án

### Cách 1: Chạy từ thư mục chứa project file
```bash
cd SCMS/SCMS
dotnet run
```

### Cách 2: Sử dụng đường dẫn đến project file
Từ thư mục `SCMS`, chạy lệnh:
```bash
dotnet run --project SCMS/SCMS.csproj
```

### Cách 3: Chạy từ solution file
Từ thư mục gốc `SmartCanteenProject`, chạy:
```bash
cd SCMS
dotnet run --project SCMS/SCMS.csproj
```

### Cách 4: Build và chạy
```bash
dotnet build
dotnet run --project SCMS/SCMS.csproj
```

## Tạo script chạy nhanh (Windows)

Tạo file `start.bat` trong thư mục `SCMS` với nội dung:
```batch
@echo off
echo Starting Smart Canteen Management System...
cd SCMS
dotnet run
pause
```

## Tạo script chạy nhanh (Linux/Mac)

Tạo file `start.sh` trong thư mục `SCMS` với nội dung:
```bash
#!/bin/bash
echo "Starting Smart Canteen Management System..."
cd SCMS
dotnet run
```

Sau đó cấp quyền thực thi:
```bash
chmod +x start.sh
```

## Lưu ý quan trọng

- Đảm bảo bạn đã cài đặt .NET 8.0 SDK
- Dự án sử dụng Entity Framework Core với SQL Server
- Kiểm tra file `appsettings.json` để cấu hình chuỗi kết nối database