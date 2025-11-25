'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                name: 'Nguyễn Trung Hiếu',
                email: 'sysadmin@test.com',
                phone: '09123456789',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Trung Hiếu',
                email: 'hopistaladmin@test.com',
                phone: '09123456780',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Thị Lan',
                email: 'nguyen.thi.lan@doctor.com',
                phone: '0987654321',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Văn Minh',
                email: 'tran.van.minh@doctor.com',
                phone: '0976543210',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Thị Hoa',
                email: 'le.thi.hoa@doctor.com',
                phone: '0965432109',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Thị Ánh',
                email: 'nguyen.thi.anh@doctor.com',
                phone: '0954321098',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vũ Thị Ngọc',
                email: 'vu.thi.ngoc@doctor.com',
                phone: '0943210987',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Văn Bình',
                email: 'hoang.van.binh@doctor.com',
                phone: '0932109876',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Văn An',
                email: 'tran.van.an@doctor.com',
                phone: '0921098765',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Văn Khánh',
                email: 'bui.van.khanh@doctor.com',
                phone: '0910987654',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngô Thị Thu',
                email: 'ngo.thi.thu@doctor.com',
                phone: '0909876543',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Thị Cẩm',
                email: 'le.thi.cam@doctor.com',
                phone: '0998765432',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phan Thị Hương',
                email: 'phan.thi.huong@doctor.com',
                phone: '0987654322',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Ngọc Duyên',
                email: 'ly.van.tuan@doctor.com',
                phone: '0976543211',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Đình Chiến',
                email: 'nguyen.dinh.chien@doctor.com',
                phone: '0965432108',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hồ Văn Hải',
                email: 'ho.van.hai@doctor.com',
                phone: '0954321097',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mai Thị Ánh',
                email: 'mai.thi.anh@doctor.com',
                phone: '0943210986',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Mai Giang',
                email: 'hoang.mai.giang@doctor.com',
                phone: '0932109875',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tạ Thị Quỳnh',
                email: 'ta.thi.quynh@doctor.com',
                phone: '0921098764',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Võ Thu Hà',
                email: 'vo.thu.ha@doctor.com',
                phone: '0910987653',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đào Thị Phương',
                email: 'dao.thi.phuong@doctor.com',
                phone: '0909876542',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khổng Văn Quân',
                email: 'khong.van.quan@doctor.com',
                phone: '0998765431',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Gia Dũng',
                email: 'pham.gia.dung@doctor.com',
                phone: '0987654323',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đặng Bảo Hạnh',
                email: 'dang.bao.hanh@doctor.com',
                phone: '0976543212',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hứa Thị Diễm',
                email: 'hua.thi.diem@doctor.com',
                phone: '0965432107',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tô Văn Nam',
                email: 'to.van.nam@doctor.com',
                phone: '0954321096',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'La Thị Thảo',
                email: 'la.thi.thao@doctor.com',
                phone: '0943210985',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Thanh Hiền',
                email: 'bui.thanh.hien@doctor.com',
                phone: '0932109874',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Biện Thị Kim',
                email: 'bien.thi.kim@doctor.com',
                phone: '0921098763',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đỗ Thị Hương',
                email: 'do.thi.huong@doctor.com',
                phone: '0910987652',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Minh Hải',
                email: 'hoang.minh.hai@doctor.com',
                phone: '0909876541',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Võ Quốc Huy',
                email: 'vo.quoc.huy@doctor.com',
                phone: '0998765430',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phan Trúc Lan',
                email: 'phan.truc.lan@doctor.com',
                phone: '0987654324',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lương Văn Thành',
                email: 'luong.van.thanh@doctor.com',
                phone: '0976543213',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tăng Thị Như',
                email: 'tang.thi.nhu@doctor.com',
                phone: '0965432106',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngô Thùy Linh',
                email: 'ngo.thuy.linh@doctor.com',
                phone: '0954321095',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Thị Yến',
                email: 'tran.thi.yen@doctor.com',
                phone: '0943210984',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chu Cẩm Ly',
                email: 'chu.cam.ly@doctor.com',
                phone: '0932109873',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tôn Thị Hạnh',
                email: 'ton.thi.hanh@doctor.com',
                phone: '0921098762',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Dương Diệu Mai',
                email: 'duong.dieu.mai@doctor.com',
                phone: '0910987651',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hồ Thị Tuyết',
                email: 'ho.thi.tuyet@doctor.com',
                phone: '0909876540',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Thị Vân',
                email: 'nguyen.thi.van@doctor.com',
                phone: '0998765429',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đặng Thái Khang',
                email: 'dang.thai.khang@doctor.com',
                phone: '0987654325',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Thị Dung',
                email: 'le.thi.dung@doctor.com',
                phone: '0976543214',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Thị Giang',
                email: 'pham.thi.giang@doctor.com',
                phone: '0965432105',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vũ Thị Hiền',
                email: 'vu.thi.hien@doctor.com',
                phone: '0954321094',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Thị Khánh',
                email: 'hoang.thi.khanh@doctor.com',
                phone: '0943210983',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Đức Lâm',
                email: 'bui.duc.lam@doctor.com',
                phone: '0932109872',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Thị Mận',
                email: 'bui.thi.man@doctor.com',
                phone: '0921098761',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đỗ Xuân Mạnh',
                email: 'do.xuan.manh@doctor.com',
                phone: '0910987650',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đỗ Thị Oanh',
                email: 'do.thi.oanh@doctor.com',
                phone: '0909876539',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chu Việt Quang',
                email: 'chu.viet.quang@doctor.com',
                phone: '0987654326',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Thị Bình',
                email: 'le.thi.binh@receptionist.com',
                phone: '0976543215',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Thị Cúc',
                email: 'pham.thi.cuc@receptionist.com',
                phone: '0965432104',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vũ Thị Diễm',
                email: 'vu.thi.diem@receptionist.com',
                phone: '0954321093',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Thị Em',
                email: 'hoang.thi.em@receptionist.com',
                phone: '0943210982',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phan Mỹ Lệ',
                email: 'phan.my.le@receptionist.com',
                phone: '0947121092',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Văn An',
                email: 'nguyen.van.an@gmail.com',
                phone: '0932109871',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Thị Bé',
                email: 'tran.thi.be@gmail.com',
                phone: '0921098760',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Văn Cường',
                email: 'le.van.cuong@gmail.com',
                phone: '0910987649',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Thị Dung',
                email: 'pham.thi.dung@gmail.com',
                phone: '0909876538',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vũ Văn Đạt',
                email: 'vu.van.dat@gmail.com',
                phone: '0998765428',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Thị Én',
                email: 'hoang.thi.en@gmail.com',
                phone: '0987654327',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đặng Văn Fương',
                email: 'dang.van.fuong@gmail.com',
                phone: '0976543216',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Thị Gái',
                email: 'bui.thi.gai@gmail.com',
                phone: '0965432103',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngô Văn Hải',
                email: 'ngo.van.hai@gmail.com',
                phone: '0954321092',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đỗ Thị Hương',
                email: 'do.thi.huong@gmail.com',
                phone: '0943210981',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phan Văn Ấn',
                email: 'phan.van.an@gmail.com',
                phone: '0932109870',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trương Thị Í',
                email: 'truong.thi.i@gmail.com',
                phone: '0921098759',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lý Văn Khang',
                email: 'ly.van.khang@gmail.com',
                phone: '0910987648',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hồ Thị Lan',
                email: 'ho.thi.lan@gmail.com',
                phone: '0909876537',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mai Văn Minh',
                email: 'mai.van.minh@gmail.com',
                phone: '0998765427',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Dương Thị Nga',
                email: 'duong.thi.nga@gmail.com',
                phone: '0987654328',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tạ Văn Nguyên',
                email: 'ta.van.nguyen@gmail.com',
                phone: '0976543217',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vương Thị Oanh',
                email: 'vuong.thi.oanh@gmail.com',
                phone: '0965432102',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đào Văn Phát',
                email: 'dao.van.phat@gmail.com',
                phone: '0954321091',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khổng Thị Quyên',
                email: 'khong.thi.quyen@gmail.com',
                phone: '0943210980',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chu Văn Quân',
                email: 'chu.van.quan@gmail.com',
                phone: '0932109869',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Thái Thị Rạng',
                email: 'thai.thi.rang@gmail.com',
                phone: '0921098758',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hứa Văn Sơn',
                email: 'hua.van.son@gmail.com',
                phone: '0910987647',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tô Thị Tâm',
                email: 'to.thi.tam@gmail.com',
                phone: '0909876536',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'La Văn Thắng',
                email: 'la.van.thang@gmail.com',
                phone: '0998765426',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Kiều Thị Uyên',
                email: 'kieu.thi.uyen@gmail.com',
                phone: '0987654329',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Biện Văn Vân',
                email: 'bien.van.van@gmail.com',
                phone: '0976543218',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hà Thị Xuân',
                email: 'ha.thi.xuan@gmail.com',
                phone: '0965432101',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cao Văn Yên',
                email: 'cao.van.yen@gmail.com',
                phone: '0954321090',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sái Thị Ánh',
                email: 'sai.thi.anh@gmail.com',
                phone: '0943210979',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đinh Văn Bình',
                email: 'dinh.van.binh@gmail.com',
                phone: '0932109868',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lương Thị Cẩm',
                email: 'luong.thi.cam@gmail.com',
                phone: '0921098757',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tăng Văn Dũng',
                email: 'tang.van.dung@gmail.com',
                phone: '0910987646',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bành Thị Đào',
                email: 'banh.thi.dao@gmail.com',
                phone: '0909876535',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Quách Văn Em',
                email: 'quach.van.em@gmail.com',
                phone: '0998765425',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mạc Thị Fương',
                email: 'mac.thi.fuong@gmail.com',
                phone: '0987654330',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tôn Văn Gia',
                email: 'ton.van.gia@gmail.com',
                phone: '0976543219',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tạ Thị Hà',
                email: 'ta.thi.ha@gmail.com',
                phone: '0965432100',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hồ Văn Hùng',
                email: 'ho.van.hung@gmail.com',
                phone: '0954321089',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Thị Ít',
                email: 'nguyen.thi.it@gmail.com',
                phone: '0943210978',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Văn Khánh',
                email: 'tran.van.khanh@gmail.com',
                phone: '0932109867',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Thị Lan',
                email: 'le.thi.lan@gmail.com',
                phone: '0921098756',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Văn Minh',
                email: 'pham.van.minh@gmail.com',
                phone: '0910987645',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vũ Thị Nga',
                email: 'vu.thi.nga@gmail.com',
                phone: '0909876534',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Văn Nguyên',
                email: 'hoang.van.nguyen@gmail.com',
                phone: '0998765424',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đặng Thị Oanh',
                email: 'dang.thi.oanh@gmail.com',
                phone: '0987654331',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Văn Phát',
                email: 'bui.van.phat@gmail.com',
                phone: '0976543220',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngô Thị Quyên',
                email: 'ngo.thi.quyen@gmail.com',
                phone: '0965432099',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đỗ Văn Quân',
                email: 'do.van.quan@gmail.com',
                phone: '0954321088',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phan Thị Rạng',
                email: 'phan.thi.rang@gmail.com',
                phone: '0943210977',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trương Văn Sơn',
                email: 'truong.van.son@gmail.com',
                phone: '0932109866',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lý Thị Tâm',
                email: 'ly.thi.tam@gmail.com',
                phone: '0921098755',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hồ Văn Thắng',
                email: 'ho.van.thang@gmail.com',
                phone: '0910987644',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mai Thị Uyên',
                email: 'mai.thi.uyen@gmail.com',
                phone: '0909876533',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Dương Văn Vân',
                email: 'duong.van.van@gmail.com',
                phone: '0998765423',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tạ Thị Xuân',
                email: 'ta.thi.xuan@gmail.com',
                phone: '0987654332',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vương Văn Yên',
                email: 'vuong.van.yen@gmail.com',
                phone: '0976543221',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đào Thị Ánh',
                email: 'dao.thi.anh@gmail.com',
                phone: '0965432098',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Khổng Văn Bình',
                email: 'khong.van.binh@gmail.com',
                phone: '0954321087',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chu Thị Cẩm',
                email: 'chu.thi.cam@gmail.com',
                phone: '0943210976',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Thái Văn Dũng',
                email: 'thai.van.dung@gmail.com',
                phone: '0932109865',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hứa Thị Đào',
                email: 'hua.thi.dao@gmail.com',
                phone: '0921098754',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tô Văn Em',
                email: 'to.van.em@gmail.com',
                phone: '0910987643',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'La Thị Fương',
                email: 'la.thi.fuong@gmail.com',
                phone: '0909876532',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Kiều Văn Gia',
                email: 'kieu.van.gia@gmail.com',
                phone: '0998765422',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Biện Thị Hà',
                email: 'bien.thi.ha@gmail.com',
                phone: '0987654333',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hà Văn Hùng',
                email: 'ha.van.hung@gmail.com',
                phone: '0976543222',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Cao Thị Ít',
                email: 'cao.thi.it@gmail.com',
                phone: '0965432097',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sái Văn Khánh',
                email: 'sai.van.khanh@gmail.com',
                phone: '0954321086',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đinh Thị Lan',
                email: 'dinh.thi.lan@gmail.com',
                phone: '0943210975',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lương Văn Minh',
                email: 'luong.van.minh@gmail.com',
                phone: '0932109864',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tăng Thị Nga',
                email: 'tang.thi.nga@gmail.com',
                phone: '0921098753',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bành Văn Nguyên',
                email: 'banh.van.nguyen@gmail.com',
                phone: '0910987642',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Quách Thị Oanh',
                email: 'quach.thi.oanh@gmail.com',
                phone: '0909876531',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mạc Văn Phát',
                email: 'mac.van.phat@gmail.com',
                phone: '0998765421',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tôn Thị Quyên',
                email: 'ton.thi.quyen@gmail.com',
                phone: '0987654334',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tạ Văn Quân',
                email: 'ta.van.quan@gmail.com',
                phone: '0976543223',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hồ Thị Rạng',
                email: 'ho.thi.rang@gmail.com',
                phone: '0965432096',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Văn Sơn',
                email: 'nguyen.van.son@gmail.com',
                phone: '0954321085',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Thị Tâm',
                email: 'tran.thi.tam@gmail.com',
                phone: '0943210974',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Văn Thắng',
                email: 'le.van.thang@gmail.com',
                phone: '0932109863',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Thị Uyên',
                email: 'pham.thi.uyen@gmail.com',
                phone: '0921098752',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vũ Văn Vân',
                email: 'vu.van.van@gmail.com',
                phone: '0910987641',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Thị Xuân',
                email: 'hoang.thi.xuan@gmail.com',
                phone: '0909876530',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đặng Văn Yên',
                email: 'dang.van.yen@gmail.com',
                phone: '0998765420',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Thị Ánh',
                email: 'bui.thi.anh@gmail.com',
                phone: '0987654335',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngô Văn Bình',
                email: 'ngo.van.binh@gmail.com',
                phone: '0976543224',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đỗ Thị Cẩm',
                email: 'do.thi.cam@gmail.com',
                phone: '0965432095',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phan Văn Dũng',
                email: 'phan.van.dung@gmail.com',
                phone: '0954321084',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trương Thị Đào',
                email: 'truong.thi.dao@gmail.com',
                phone: '0943210973',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lý Văn Em',
                email: 'ly.van.em@gmail.com',
                phone: '0932109862',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hồ Thị Fương',
                email: 'ho.thi.fuong@gmail.com',
                phone: '0921098751',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Mai Văn Gia',
                email: 'mai.van.gia@gmail.com',
                phone: '0910987640',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Dương Thị Hà',
                email: 'duong.thi.ha@gmail.com',
                phone: '0909876529',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Tạ Văn Hùng',
                email: 'ta.van.hung@gmail.com',
                phone: '0998765419',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vương Thị Ít',
                email: 'vuong.thi.it@gmail.com',
                phone: '0987654336',
                password:
                    '$2b$10$ATqYJmj/YPwkA/BouqkJsuHCY.uD8VHqIwlUNanIkmI/zN.BqMXg6',
                verify: true,
                otp: null,
                otpExpires: null,
                refreshToken: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
