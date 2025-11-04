# 🏥 API Documentation - Hệ thống Quản lý Bệnh Viện Đơn Giản

Tài liệu này mô tả chi tiết các API được sử dụng trong hệ thống, phân nhóm theo các mô-đun chính: **Xác thực & Hồ sơ Bệnh nhân**, **Quản trị viên**, **Bác sĩ**, **Chuyên khoa**, và **Dịch vụ**.

## 🔗 Base URL

Tất cả các endpoint đều sử dụng Base URL sau:

> `http://localhost:3000/api`

---

## 🔑 I. API Xác Thực & Hồ Sơ Bệnh Nhân (Auth & Patient Profile)

Các API này quản lý việc truy cập, đăng ký, đăng nhập và thông tin hồ sơ cơ bản của người dùng (chủ yếu là Bệnh nhân).

### 1. Đăng Ký & Xác Thực

| Endpoint             | Method | Mô tả                                      | Yêu cầu Body (JSON)                                     | Phản hồi (Mã lỗi)                                                                                      |
| :------------------- | :----- | :----------------------------------------- | :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------- |
| `/auth/register`     | `POST` | Đăng ký tài khoản Bệnh nhân.               | `name`, `email`, `phone`, `password`, `confirmPassword` | **Success** (0), Missing Params (1), Password Mismatch (2), Email/Phone Used (3)                       |
| `/auth/verify-email` | `POST` | Xác thực tài khoản bằng **OTP** qua email. | `email`, `otp`                                          | **Success** (0), Missing Params (1), User Not Found (2), Already Verified (3), Invalid/Expired OTP (4) |
| `/auth/resend-otp`   | `POST` | Yêu cầu gửi lại mã OTP.                    | `email`                                                 | **Success** (0), Missing Params (1), User Not Found (2), Already Verified (3)                          |

<br>

### 2. Đăng Nhập & Quản Lý Token

| Endpoint              | Method | Mô tả                                           | Yêu cầu Body (JSON)        | Phản hồi (Mã lỗi)                                              |
| :-------------------- | :----- | :---------------------------------------------- | :------------------------- | :------------------------------------------------------------- |
| `/auth/login`         | `POST` | Đăng nhập hệ thống.                             | `emailOrPhone`, `password` | **Success** (0), Missing Params (1), Incorrect Credentials (3) |
| `/auth/logout`        | `POST` | Đăng xuất (Thu hồi `refreshToken`).             | `refreshToken`             | **Success** (0), Missing Params (1), User Not Found (2)        |
| `/auth/refresh-token` | `POST` | Lấy lại `accessToken` mới khi token cũ hết hạn. | `refreshToken`             | **Success** (0), Missing Params (1), Invalid Refresh Token (2) |

<br>

### 3. Quên Mật Khẩu

| Endpoint                | Method | Mô tả                        | Yêu cầu Body (JSON)                                        | Phản hồi (Mã lỗi)                                                                   |
| :---------------------- | :----- | :--------------------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `/auth/forgot-password` | `POST` | Gửi OTP để đặt lại mật khẩu. | `emailOrPhone`                                             | **Success** (0), Missing Params (1), User Not Found/Not Verified (2)                |
| `/auth/reset-password`  | `POST` | Đặt lại mật khẩu bằng OTP.   | `emailOrPhone`, `otp`, `newPassword`, `confirmNewPassword` | **Success** (0), Missing Params (1), Password Mismatch (2), Invalid/Expired OTP (4) |

---

## 🧑 IV. API Bệnh Nhân (Patient) - Quản lý Hồ sơ Y tế Chi tiết

Các API này yêu cầu **Authorization: Bearer Token** và được sử dụng để quản lý hồ sơ y tế chi tiết của bệnh nhân.

| Endpoint                   | Method   | Mô tả                                                                               | Yêu cầu/Path Param                                              | Phản hồi (Mã lỗi)                                                          |
| :------------------------- | :------- | :---------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `/patient/detail/{userId}` | `GET`    | Xem chi tiết hồ sơ bệnh nhân theo **User ID**.                                      | Path Param: `{userId}`                                          | **Success** (0), User Not Found (2)                                        |
| `/patient`                 | `POST`   | Tạo hồ sơ bệnh nhân mới.                                                            | JSON Body: Chi tiết hồ sơ (dob, gender, ethnicity, address,...) | **Success** (0), Missing Params (1), Not A Patient (2), Patient Exists (3) |
| `/patient/profile`         | `PUT`    | Cập nhật thông tin cá nhân cơ bản (Name, Phone, dob, gender, insurance, allergies). | JSON Body: Chi tiết profile                                     | **Success** (0), Missing Params (1)                                        |
| `/patient/{userId}`        | `PUT`    | Cập nhật hồ sơ bệnh nhân (Yêu cầu phải là Patient/Admin)                            | Path Param: `{userId}`, JSON Body: Chi tiết hồ sơ               | **Success** (0), Missing Params (1), Not A Patient (2), User Not Found (3) |
| `/patient/{userId}`        | `DELETE` | Xóa hồ sơ bệnh nhân.                                                                | Path Param: `{userId}`                                          | **Success** (0), User Not Found (2)                                        |

---

## 🛠️ II. API Quản Trị Viên (Admin)

Các API quản lý người dùng, chuyên khoa và dịch vụ cấp cao, yêu cầu **Authorization: Bearer Token**.

### 1. Quản Lý Tài Khoản (Admin, Bác sĩ, Lễ tân)

| Endpoint                | Method   | Mô tả                                | Yêu cầu Input                                                                                                    | Phản hồi (Mã lỗi)                                                                                   |
| :---------------------- | :------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| `/admin/hopistal-admin` | `POST`   | Tạo tài khoản **Admin Bệnh viện**.   | JSON Body: `name`, `email`, `phone`, `password`, `confirmPassword`                                               | **Success** (0), Missing Params (1), Password Mismatch (2), Email/Phone Used (3)                    |
| `/admin/users`          | `GET`    | Lấy danh sách tất cả người dùng.     | None                                                                                                             | **Success** (0)                                                                                     |
| `/admin/user/{id}`      | `GET`    | Lấy thông tin chi tiết 1 người dùng. | Path Param: `{id}`                                                                                               | **Success** (0), User Not Found (2)                                                                 |
| `/admin/users`          | `POST`   | Tạo tài khoản **Bác sĩ/Lễ tân**.     | FormData: `name`, `email`, `phone`, `password`, `confirmPassword`, `role`, `specialtyId`, `room`, `image` (File) | **Success** (0), Missing Params (1), Missing Image (2), Password Mismatch (2), Email/Phone Used (3) |
| `/admin/users/{id}`     | `PUT`    | Cập nhật thông tin Bác sĩ/Lễ tân.    | Path Param: `{id}`, FormData: `name`, `email`, `phone`, `specialtyId`, `room`, `image` (File), `status`          | **Success** (0), Missing Params (1), User Not Found (2), Email Used (3), Phone Used (4)             |
| `/admin/users/{id}`     | `DELETE` | Xóa tài khoản (Bác sĩ/Lễ tân).       | Path Param: `{id}`                                                                                               | **Success** (0), User Not Found (2), Permission Denied (3)                                          |

<br>

### 2. Quản Lý Chuyên Khoa (Admin)

| Endpoint                | Method   | Mô tả                 | Yêu cầu Input                                                       | Phản hồi (Mã lỗi)                                                            |
| :---------------------- | :------- | :-------------------- | :------------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| `/admin/specialty`      | `POST`   | Thêm chuyên khoa mới. | FormData: `name`, `description`, `image` (File)                     | **Success** (0), Missing Params (1), Missing Image (2), Specialty Exists (2) |
| `/admin/specialty/{id}` | `PUT`    | Cập nhật chuyên khoa. | Path Param: `{id}`, FormData: `name`, `description`, `image` (File) | **Success** (0), Missing Params (1), Specialty Not Found (2)                 |
| `/admin/specialty/{id}` | `DELETE` | Xóa chuyên khoa.      | Path Param: `{id}`                                                  | **Success** (0), Specialty Not Found (2)                                     |

<br>

### 3. Quản Lý Dịch Vụ (Admin)

| Endpoint               | Method   | Mô tả             | Yêu cầu Body (JSON)                                                                        | Phản hồi (Mã lỗi)                                                                                   |
| :--------------------- | :------- | :---------------- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| `/admin/services`      | `POST`   | Thêm dịch vụ mới. | `name`, `description`, `durationMinutes`, `price`, `status`                                | **Success** (0), Missing Params (1), Invalid Duration (2), Invalid Price (3)                        |
| `/admin/services/{id}` | `PUT`    | Sửa dịch vụ.      | Path Param: `{id}`, JSON Body: `name`, `description`, `durationMinutes`, `price`, `status` | **Success** (0), Missing Params (1), Service Not Found (2), Invalid Duration (3), Invalid Price (4) |
| `/admin/services/{id}` | `DELETE` | Xóa dịch vụ.      | Path Param: `{id}`                                                                         | **Success** (0), Service Not Found (2)                                                              |

---

## ⚕️ V. API Công Khai (Public)

Các API cho phép truy xuất dữ liệu chung mà không cần xác thực.

### 1. Bác Sĩ

| Endpoint       | Method | Mô tả                                    | Auth             | Response (Mã lỗi)                     |
| :------------- | :----- | :--------------------------------------- | :--------------- | :------------------------------------ |
| `/doctor`      | `GET`  | Lấy danh sách tất cả bác sĩ.             | **Bearer Token** | **Success** (0)                       |
| `/doctor/{id}` | `GET`  | Lấy thông tin chi tiết 1 bác sĩ theo ID. | **Bearer Token** | **Success** (0), Doctor Not Found (2) |

<br>

### 2. Chuyên Khoa

| Endpoint     | Method | Mô tả                             | Auth | Response        |
| :----------- | :----- | :-------------------------------- | :--- | :-------------- |
| `/specialty` | `GET`  | Lấy tất cả danh sách chuyên khoa. | None | **Success** (0) |

<br>

### 3. Dịch Vụ

| Endpoint   | Method | Mô tả                         | Auth | Response        |
| :--------- | :----- | :---------------------------- | :--- | :-------------- |
| `/service` | `GET`  | Lấy tất cả danh sách dịch vụ. | None | **Success** (0) |

---
