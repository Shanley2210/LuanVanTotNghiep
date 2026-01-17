'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Doctors', [
            // 1. Tim mạch
            {
                userId: 3,
                specialtyId: 2, // Tim mạch
                dob: '1985-05-15',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Lợi, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ',
                room: '201',
                image: '/uploads/users/doc1.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Tim mạch can thiệp với hơn 15 năm kinh nghiệm. Chuyên gia về các kỹ thuật xâm lấn tối thiểu như đặt stent mạch vành phức tạp và siêu âm tim qua thực quản. Từng tu nghiệp chuyên sâu tại Pháp, Bác sĩ luôn ưu tiên phương pháp điều trị toàn diện, kết hợp thuốc, can thiệp và tư vấn lối sống để tối ưu hóa hiệu quả phòng ngừa bệnh tim tái phát, giúp bệnh nhân sớm phục hồi và duy trì sức khỏe tim mạch dài hạn. Bác sĩ là thành viên tích cực của Hội Tim mạch Việt Nam và Hiệp hội Tim mạch can thiệp Châu Á - Thái Bình Dương (APSC).',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nội Tim mạch tổng quát: Chẩn đoán và điều trị Tăng huyết áp, suy tim, bệnh van tim, rối loạn mỡ máu, và bệnh động mạch vành.</li><li>Tim mạch can thiệp: Thực hiện chụp và can thiệp mạch vành (đặt stent), điều trị rối loạn nhịp tim bằng triệt đốt (ablation).</li><li>Chẩn đoán hình ảnh tim mạch: Siêu âm tim gắng sức (Dobutamine, thể lực), Holter ECG 24h và Holter huyết áp.</li></ul><b>Quá trình công tác:</b><ul><li>2010 - 2016: Bác sĩ điều trị tại Viện Tim TP.HCM, chịu trách nhiệm trực tiếp các ca cấp cứu và can thiệp.</li><li>2016 - 2020: Phó khoa Nội Tim mạch - Bệnh viện Nhân dân 115, quản lý chất lượng chuyên môn khoa.</li><li>2020 - Nay: Trưởng khoa Tim mạch tại Phòng khám Đa khoa Quốc tế Care, phát triển các dịch vụ tim mạch ngoại trú.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa tại Đại học Y Dược TP.HCM.</li><li>Thạc sĩ Y học chuyên ngành Tim mạch.</li><li>Tu nghiệp chuyên sâu về Tim mạch can thiệp tại Paris Diderot University, Pháp.</li></ul>',
            },
            // 2. Nhi khoa
            {
                userId: 4,
                specialtyId: 3, // Nhi khoa
                dob: '1978-11-22',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Nguyễn Huệ, Đà Nẵng',
                degree: 'Tiến sĩ',
                room: '202',
                image: '/uploads/users/doc2.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, Chuyên gia đầu ngành trong lĩnh vực Nhi khoa tổng quát và Dinh dưỡng nhi, với hơn 20 năm kinh nghiệm lâm sàng và nghiên cứu khoa học. Bác sĩ đã chủ nhiệm nhiều đề tài nghiên cứu cấp nhà nước về sự phát triển thể chất và miễn dịch ở trẻ em Việt Nam. Phương châm điều trị là sử dụng kháng sinh hợp lý, tập trung vào tăng cường sức đề kháng và tư vấn toàn diện về nuôi dưỡng trẻ. Bác sĩ là thành viên của Hội Nhi khoa Việt Nam và Hiệp hội Dinh dưỡng Nhi khoa Quốc tế (ESPGHAN).',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nhi khoa tổng quát: Khám và điều trị các bệnh lý hô hấp (viêm phổi, hen), tiêu hóa (tiêu chảy, táo bón), và các bệnh truyền nhiễm thường gặp ở trẻ sơ sinh, trẻ nhỏ.</li><li>Dinh dưỡng Nhi khoa: Tư vấn, xây dựng phác đồ dinh dưỡng cho trẻ biếng ăn, suy dinh dưỡng, béo phì, và quản lý dị ứng thực phẩm (dị ứng đạm bò).</li><li>Phát triển toàn diện: Khám sức khỏe định kỳ, theo dõi sự phát triển thể chất và tinh thần (chiều cao, cân nặng, tâm vận động).</li></ul><b>Quá trình công tác:</b><ul><li>2003 - 2010: Bác sĩ nội trú và điều trị tại Bệnh viện Nhi Trung ương, tham gia các ca bệnh nặng và phức tạp.</li><li>2010 - 2018: Giảng viên Bộ môn Nhi - Đại học Y Dược Đà Nẵng, kiêm nhiệm Phó khoa Nội Nhi, chịu trách nhiệm đào tạo thế hệ bác sĩ trẻ.</li><li>2018 - Nay: Giám đốc Chuyên môn Trung tâm Nhi khoa CarePlus Đà Nẵng, chịu trách nhiệm xây dựng các phác đồ chẩn đoán và điều trị chuẩn quốc tế.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Nội trú chuyên ngành Nhi khoa.</li><li>Tiến sĩ Y học chuyên ngành Nhi khoa - Đại học Y Hà Nội.</li></ul>',
            },
            // 3. Da liễu -> Gán tạm vào Dị ứng (8) hoặc Nội khoa (1)
            {
                userId: 5,
                specialtyId: 8, // Dị ứng (Gần nhất với Da liễu/Dị ứng da)
                dob: '1990-03-10',
                gender: '0',
                ethnicity: 'Kinh',
                address: '89 Trần Phú, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I',
                room: '203',
                image: '/uploads/users/doc3.webp',
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Da liễu thẩm mỹ, được đào tạo chuyên sâu về Laser thẩm mỹ và ứng dụng công nghệ cao. Với thế mạnh đặc biệt trong việc xử lý các tình trạng da phức tạp như mụn trứng cá nặng, sẹo rỗ, nám, tàn nhang và trẻ hóa da không phẫu thuật. Bác sĩ thường xuyên tham gia các khóa huấn luyện nâng cao tại Hàn Quốc và Mỹ, đảm bảo áp dụng các phác đồ điều trị tiên tiến nhất và cá thể hóa theo từng loại da, từng bệnh nhân.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Da liễu lâm sàng: Chẩn đoán và điều trị các bệnh lý da liễu thông thường như mụn, viêm da cơ địa, chàm, nấm, và các bệnh lây truyền qua đường tình dục.</li><li>Da liễu thẩm mỹ công nghệ cao: Điều trị sẹo rỗ, nám, tàn nhang bằng các loại Laser (Fractional CO2, Picosecond) và công nghệ cao (IPL, RF).</li><li>Tiêm thẩm mỹ nội khoa: Thực hiện các thủ thuật tiêm Filler, Botox, căng chỉ (Có chứng chỉ hành nghề và kinh nghiệm dày dặn).</li><li>Chăm sóc da chuyên sâu: Lên phác đồ chăm sóc da tại nhà, peel da hóa học, điện di dưỡng chất.</li></ul><b>Quá trình công tác:</b><ul><li>2014 - 2018: Bác sĩ Da liễu điều trị tại Bệnh viện Da liễu Trung ương, phụ trách phòng Laser và thủ thuật can thiệp.</li><li>2018 - Nay: Bác sĩ chính tại Khoa Thẩm mỹ da - Bệnh viện Đa khoa Quốc tế Thu Cúc, đồng thời là cố vấn chuyên môn tại một số clinic uy tín tại Hà Nội.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Da liễu.</li><li>Chứng chỉ chuyên sâu về Laser và Thẩm mỹ Nội khoa (Hoa Kỳ, Hàn Quốc).</li></ul>',
            },
            // 4. Tai Mũi Họng -> Gán vào Hô hấp (6)
            {
                userId: 6,
                specialtyId: 6, // Hô hấp (Gần nhất với Tai Mũi Họng/Đường thở)
                dob: '1982-07-18',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Phạm Ngọc Thạch, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II ',
                room: '204',
                image: '/uploads/users/doc4.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Tai Mũi Họng, chuyên gia có kinh nghiệm lâu năm trong chẩn đoán và điều trị các bệnh lý phức tạp. Đặc biệt thành thạo trong phẫu thuật nội soi mũi xoang chức năng, điều trị các bệnh lý viêm xoang mạn tính, polyp mũi và các bệnh về thanh quản. Bác sĩ nổi tiếng với kỹ thuật khám bệnh nhẹ nhàng, chính xác và thái độ ân cần, luôn tìm kiếm các giải pháp ít xâm lấn và hiệu quả nhất cho bệnh nhân.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Tai Mũi Họng tổng quát: Điều trị nội khoa và ngoại khoa các bệnh lý viêm họng, viêm amidan, viêm tai giữa, viêm xoang cấp và mạn tính.</li><li>Phẫu thuật nội soi: Phẫu thuật nội soi mũi xoang chức năng (FESS), cắt amidan, nạo VA, chỉnh hình vách ngăn mũi.</li><li>Bệnh lý chuyên sâu: Khám và điều trị các bệnh lý thanh quản, giọng nói, khối u vùng đầu cổ (cổ, tuyến giáp, hạch).</li><li>Thủ thuật: Chọc rửa xoang, đốt cuốn mũi, lấy dị vật tai mũi họng.</li></ul><b>Quá trình công tác:</b><ul><li>2008 - 2015: Bác sĩ điều trị khoa Tai Mũi Họng - Bệnh viện Tai Mũi Họng TP.HCM, tham gia các ca phẫu thuật phức tạp và cấp cứu.</li><li>2015 - Nay: Trưởng đơn vị Tai Mũi Họng tại Bệnh viện Đại học Y Dược TP.HCM, phụ trách đào tạo, nghiên cứu khoa học và phát triển kỹ thuật phẫu thuật mới.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Tai Mũi Họng.</li><li>Đào tạo liên tục và có chứng chỉ chuyên sâu về Phẫu thuật Nội soi Mũi Xoang.</li></ul>',
            },
            // 5. Mắt
            {
                userId: 7,
                specialtyId: 4, // Mắt
                dob: '1988-09-25',
                gender: '0',
                ethnicity: 'Kinh',
                address: '34 Lê Duẩn, Đà Nẵng',
                degree: 'Thạc sĩ',
                room: '205',
                image: '/uploads/users/doc5.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Nhãn khoa, chuyên gia phẫu thuật Phaco điều trị đục thủy tinh thể và phẫu thuật điều trị tật khúc xạ (Lasik, Relex Smile). Với kinh nghiệm đã thực hiện thành công hơn 3000 ca phẫu thuật, Bác sĩ được đánh giá cao về độ chính xác và an toàn tuyệt đối. Bác sĩ còn có niềm đam mê đặc biệt với các hoạt động cộng đồng, thường xuyên tham gia các chương trình mổ mắt từ thiện, mang lại ánh sáng cho người nghèo tại các tỉnh miền Trung.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Phẫu thuật đục thủy tinh thể: Chuyên sâu phẫu thuật Phaco (tán nhuyễn thủy tinh thể bằng siêu âm).</li><li>Phẫu thuật tật khúc xạ: Thực hiện các phương pháp phẫu thuật hiện đại như Lasik, Epi-Lasik, Relex Smile.</li><li>Khám và điều trị chuyên sâu: Bệnh lý võng mạc tiểu đường, tăng nhãn áp (Glaucoma), và các bệnh lý bề mặt nhãn cầu (khô mắt, viêm kết giác mạc).</li><li>Nhãn khoa tổng quát: Tầm soát và điều trị các vấn đề về thị lực cho mọi lứa tuổi, kê toa kính, nhược thị.</li></ul><b>Quá trình công tác:</b><ul><li>2013 - 2019: Bác sĩ điều trị tại Bệnh viện Mắt Đà Nẵng, phụ trách phòng mổ Phaco và Khúc xạ Laser.</li><li>2019 - Nay: Phó khoa Khám bệnh - Bệnh viện Mắt Quốc tế Hoàn Mỹ, chuyên trách các ca phẫu thuật phức tạp và hội chẩn chuyên môn.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Nhãn khoa.</li><li>Chứng chỉ chuyên sâu về Phẫu thuật Phaco và Laser điều trị tật khúc xạ (Ấn Độ, Singapore).</li></ul>',
            },
            // 6. Nha khoa
            {
                userId: 8,
                specialtyId: 5, // Nha khoa
                dob: '1975-04-12',
                gender: '1',
                ethnicity: 'Kinh',
                address: '56 Hai Bà Trưng, Hà Nội',
                degree: 'Tiến sĩ',
                room: '206',
                image: '/uploads/users/doc6.webp',
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên gia hàng đầu về cấy ghép Implant nha khoa và Chỉnh nha mắc cài/không mắc cài (Invisalign). Bác sĩ là thành viên của Hiệp hội Implant Quốc tế (ITI) và nổi tiếng với khả năng phục hình răng phức tạp, đòi hỏi kỹ thuật cao (ghép xương, nâng xoang). Với sự tận tâm và kinh nghiệm phong phú, Bác sĩ đã giúp hàng nghìn bệnh nhân lấy lại sự tự tin và cải thiện chức năng ăn nhai.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Cấy ghép Implant: Phẫu thuật Implant nha khoa đơn lẻ và toàn hàm (All-on-4/6), kỹ thuật phụ trợ như ghép xương, nâng xoang trong Implant.</li><li>Chỉnh nha: Điều trị Niềng răng mắc cài kim loại/sứ, chỉnh nha không mắc cài (Invisalign) và các ca lệch lạc phức tạp (răng hô, móm).</li><li>Phục hình thẩm mỹ: Thiết kế và làm Răng sứ Veneer, bọc sứ, tẩy trắng răng, phục hình sau chấn thương.</li><li>Nha khoa tổng quát: Khám, điều trị tủy, nhổ răng khôn, nha chu.</li></ul><b>Quá trình công tác:</b><ul><li>2000 - 2010: Phó khoa Phẫu thuật Hàm mặt - Bệnh viện Răng Hàm Mặt Trung ương, tham gia giảng dạy cho sinh viên và chỉ đạo các ca phẫu thuật.</li><li>2010 - Nay: Giám đốc Chuyên môn Hệ thống Nha khoa Paris, trực tiếp tham gia điều trị các ca Implant, Chỉnh nha phức tạp và quản lý chất lượng chuyên môn toàn hệ thống.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Răng Hàm Mặt - Đại học Y Hà Nội.</li><li>Chứng chỉ Implant Nâng cao (Hội Implant Quốc tế ITI - Thụy Sĩ), Chứng chỉ Chỉnh nha Invisalign (Mỹ).</li></ul>',
            },
            // 7. Sản Phụ khoa -> Gán vào Nội khoa (1)
            {
                userId: 9,
                specialtyId: 1, // Nội khoa (Fallback cho Sản Phụ Khoa)
                dob: '1992-01-30',
                gender: '1',
                ethnicity: 'Kinh',
                address: '78 Nguyễn Thị Minh Khai, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I',
                room: '207',
                image: '/uploads/users/doc7.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Sản Phụ khoa, được biết đến với sự tận tâm, thấu hiểu tâm lý và thái độ khám nhẹ nhàng. Bác sĩ có thế mạnh trong khám và điều trị các bệnh lý phụ khoa (viêm nhiễm, rối loạn kinh nguyệt), tư vấn tiền hôn nhân, kế hoạch hóa gia đình, và theo dõi thai kỳ nguy cơ cao. Bác sĩ cam kết tạo không gian riêng tư, thoải mái và bảo mật cho mọi bệnh nhân, đặc biệt là tư vấn sức khỏe sinh sản tuổi vị thành niên.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Phụ khoa: Khám và điều trị viêm nhiễm phụ khoa, rối loạn kinh nguyệt, tầm soát ung thư cổ tử cung (Soi cổ tử cung, Pap smear).</li><li>Thai kỳ thường và nguy cơ cao: Theo dõi thai kỳ từ giai đoạn sớm đến khi sinh, tư vấn dinh dưỡng và chăm sóc trước sinh, quản lý thai kỳ có bệnh nền (tiểu đường, cao huyết áp).</li><li>Kế hoạch hóa gia đình: Tư vấn các biện pháp tránh thai, đặt/tháo vòng, cấy/tháo que cấy.</li><li>Hỗ trợ sinh sản: Tư vấn cơ bản về vô sinh hiếm muộn, chỉ định các phương pháp hỗ trợ sinh sản (IUI, IVF).</li></ul><b>Quá trình công tác:</b><ul><li>2016 - 2020: Bác sĩ Sản phụ khoa tại Bệnh viện Từ Dũ, trực tiếp tham gia đỡ sinh thường, mổ lấy thai và phẫu thuật phụ khoa (u nang, u xơ).</li><li>2020 - Nay: Bác sĩ điều trị tại Khoa Sản - Bệnh viện Quốc tế Hạnh Phúc, phụ trách tư vấn tiền sản, khám thai chuyên sâu và quản lý phòng khám thai nhi nguy cơ cao.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Sản Phụ khoa - Đại học Y Dược TP.HCM.</li></ul>',
            },
            // 8. Nam học -> Gán vào Nội khoa (1)
            {
                userId: 10,
                specialtyId: 1, // Nội khoa (Fallback cho Tiết niệu/Nam học)
                dob: '1980-06-05',
                gender: '1',
                ethnicity: 'Kinh',
                address: '90 Pasteur, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II',
                room: '208',
                image: '/uploads/users/doc8.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Nam học và Tiết niệu, chuyên gia uy tín với kinh nghiệm hơn 15 năm. Bác sĩ chuyên điều trị các rối loạn chức năng tình dục (rối loạn cương dương, xuất tinh sớm), vô sinh nam (giãn tĩnh mạch thừng tinh, tinh trùng yếu) và các bệnh lý tiết niệu phức tạp (sỏi, u xơ tiền liệt tuyến). Bác sĩ cam kết cung cấp một môi trường khám chữa bệnh chuyên nghiệp, kín đáo và bảo mật tuyệt đối thông tin người bệnh.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nam khoa: Chẩn đoán và điều trị nội khoa/ngoại khoa các rối loạn cương dương, xuất tinh sớm, mãn dục nam, và các nguyên nhân vô sinh nam.</li><li>Tiết niệu tổng quát: Khám và điều trị viêm đường tiết niệu, sỏi thận/niệu quản, bàng quang tăng hoạt, phì đại lành tính tuyến tiền liệt.</li><li>Phẫu thuật chuyên sâu: Phẫu thuật giãn tĩnh mạch thừng tinh (vi phẫu), tạo hình cơ quan sinh dục, phẫu thuật nội soi tán sỏi và cắt đốt nội soi tiền liệt tuyến.</li></ul><b>Quá trình công tác:</b><ul><li>2006 - 2015: Bác sĩ khoa Ngoại Tiết niệu - Bệnh viện Đà Nẵng, tham gia phẫu thuật và điều trị nội trú, là người xây dựng đơn vị Nam khoa.</li><li>2015 - Nay: Trưởng đơn vị Nam học - Bệnh viện Đa khoa Tâm Anh Đà Nẵng, phát triển các kỹ thuật chẩn đoán và điều trị Nam khoa hiện đại, hội chẩn liên chuyên khoa.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Nam học - Tiết niệu.</li><li>Chứng chỉ chuyên sâu về Vi phẫu trong Nam học và Phẫu thuật Nội soi Tiết niệu.</li></ul>',
            },
            // 9. Hô hấp
            {
                userId: 11,
                specialtyId: 6, // Hô hấp
                dob: '1987-08-14',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Lý Tự Trọng, Hà Nội',
                degree: 'Thạc sĩ',
                room: '209',
                image: '/uploads/users/doc9.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ chuyên ngành Nội Hô hấp, có gần 15 năm kinh nghiệm trong chẩn đoán và điều trị các bệnh lý đường hô hấp. Bác sĩ có thế mạnh trong quản lý bệnh lý mạn tính như Hen phế quản, Bệnh phổi tắc nghẽn mạn tính (COPD) và các bệnh lý phổi nhiễm trùng, kẽ phổi. Bác sĩ thường xuyên tham gia các buổi hội chẩn chuyên môn cấp cao tại Bệnh viện Phổi Trung ương, đảm bảo áp dụng các phác đồ điều trị cập nhật, tiên tiến và cá nhân hóa cho từng bệnh nhân.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Hô hấp mạn tính: Chẩn đoán, quản lý và điều trị Hen phế quản, COPD, giãn phế quản, xơ phổi.</li><li>Bệnh lý nhiễm trùng và cấp tính: Điều trị Viêm phổi (cộng đồng, bệnh viện), lao phổi, viêm phế quản cấp, áp xe phổi.</li><li>Kỹ thuật chẩn đoán: Thực hiện và đọc kết quả Đo chức năng hô hấp, phân tích khí máu động mạch, chỉ định và hỗ trợ nội soi phế quản chẩn đoán.</li></ul><b>Quá trình công tác:</b><ul><li>2012 - 2018: Bác sĩ điều trị khoa Hô hấp - Bệnh viện Bạch Mai, tham gia quản lý các ca bệnh nặng, cấp cứu hô hấp và trực phòng khám chuyên khoa.</li><li>2018 - Nay: Phó khoa Nội tổng hợp - Bệnh viện Thanh Nhàn, chuyên trách về bệnh lý Hô hấp, tham gia công tác đào tạo nội bộ và nghiên cứu khoa học.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Nội Hô hấp.</li></ul>',
            },
            // 10. Nội tiết
            {
                userId: 12,
                specialtyId: 7, // Nội tiết
                dob: '1979-02-20',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Điện Biên Phủ, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ',
                room: '210',
                image: '/uploads/users/doc10.webp',
                price: 650000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học với hơn 20 năm kinh nghiệm trong lĩnh vực Nội tiết - Chuyển hóa. Bác sĩ là chuyên gia hàng đầu về điều trị bệnh Đái tháo đường (tiểu đường), các bệnh lý tuyến giáp (cường giáp, suy giáp, bướu cổ) và rối loạn nội tiết khác. Bác sĩ là tác giả của nhiều bài báo khoa học được công bố quốc tế về rối loạn chuyển hóa, luôn cập nhật phác đồ mới và tập trung vào giáo dục bệnh nhân tự quản lý bệnh mạn tính, giảm thiểu tối đa các biến chứng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Đái tháo đường (ĐTĐ): Chẩn đoán, điều trị ĐTĐ type 1, type 2, ĐTĐ thai kỳ, và xử trí các biến chứng mạn tính (thần kinh, thận, bàn chân ĐTĐ).</li><li>Bệnh lý Tuyến giáp: Điều trị nội khoa và tư vấn can thiệp các bệnh lý tuyến giáp (cường giáp, suy giáp, bướu cổ đa nhân, ung thư tuyến giáp).</li><li>Rối loạn Nội tiết và Chuyển hóa khác: Bệnh tuyến yên, tuyến thượng thận (Hội chứng Cushing, Addison), rối loạn chuyển hóa mỡ máu (tăng Cholesterol).</li><li>Thủ thuật: Chọc hút tế bào bằng kim nhỏ (FNA) dưới hướng dẫn siêu âm.</li></ul><b>Quá trình công tác:</b><ul><li>2004 - 2014: Giảng viên Bộ môn Nội tiết - Đại học Y Dược TP.HCM, tham gia đào tạo sinh viên, bác sĩ nội trú và nghiên cứu.</li><li>2014 - Nay: Trưởng khoa Nội tiết - Bệnh viện Chợ Rẫy, phụ trách chuyên môn và điều trị các ca bệnh khó, hội chẩn tuyến cuối trong khu vực phía Nam.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Nội tiết - Chuyển hóa.</li></ul>',
            },
            // 11. Ung bướu -> Gán vào Nội khoa (1)
            {
                userId: 13,
                specialtyId: 1, // Nội khoa (Fallback cho Ung bướu/Hóa trị)
                dob: '1991-10-08',
                gender: '0',
                ethnicity: 'Kinh',
                address: '67 Bà Triệu, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I',
                room: '211',
                image: '/uploads/users/doc11.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Ung bướu, chuyên sâu về hóa trị liệu, điều trị đích, miễn dịch và chăm sóc giảm nhẹ. Bác sĩ có kinh nghiệm làm việc tại các trung tâm ung bướu lớn, đặc biệt trong điều trị ung thư vú, phổi, đại trực tràng. Bác sĩ luôn đồng hành cùng bệnh nhân và gia đình, thiết lập phác đồ điều trị cá thể hóa, kết hợp y học và tâm lý để mang lại chất lượng cuộc sống tốt nhất cho bệnh nhân ung thư, kéo dài thời gian sống và kiểm soát triệu chứng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Hóa trị, Điều trị đích và Miễn dịch: Lên phác đồ và quản lý tác dụng phụ của các liệu pháp toàn thân cho nhiều loại ung thư (vú, phổi, tiêu hóa, phụ khoa).</li><li>Tầm soát và chẩn đoán sớm ung thư: Tư vấn nguy cơ di truyền, thực hiện và giải thích các xét nghiệm tầm soát chuyên biệt (dấu ấn ung thư, sinh thiết).</li><li>Chăm sóc giảm nhẹ: Giảm đau đa mô thức, quản lý triệu chứng (buồn nôn, chán ăn, mệt mỏi) và hỗ trợ tâm lý cho bệnh nhân giai đoạn cuối.</li><li>Hội chẩn đa chuyên khoa: Tham gia cùng bác sĩ ngoại khoa và xạ trị để đưa ra quyết định điều trị tối ưu.</li></ul><b>Quá trình công tác:</b><ul><li>2015 - 2019: Bác sĩ điều trị tại Bệnh viện Ung bướu Đà Nẵng, chuyên trách về hóa trị nội trú và tư vấn phác đồ.</li><li>2019 - Nay: Bác sĩ điều trị tại Trung tâm Ung bướu - Bệnh viện Vinmec Đà Nẵng, tham gia hội đồng chuyên môn, nghiên cứu lâm sàng và ứng dụng các phác đồ tiên tiến của thế giới.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Ung bướu.</li></ul>',
            },
            // 12. Dinh dưỡng -> Gán vào Nội khoa (1)
            {
                userId: 14,
                specialtyId: 1, // Nội khoa (Fallback cho Dinh dưỡng)
                dob: '1983-12-17',
                gender: '0',
                ethnicity: 'Kinh',
                address: '89 Hàng Bông, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II',
                room: '212',
                image: '/uploads/users/doc12.webp',
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Dinh dưỡng, chuyên gia tư vấn dinh dưỡng lâm sàng, có kinh nghiệm chuyên sâu trong xây dựng chế độ ăn cho người bệnh mạn tính (tiểu đường, tim mạch, thận), trẻ em suy dinh dưỡng/béo phì, và người có nhu cầu giảm cân/tăng cân khoa học. Bác sĩ luôn dựa trên bằng chứng khoa học mới nhất, kết hợp thói quen sinh hoạt và sở thích cá nhân để thiết kế thực đơn phù hợp, giúp bệnh nhân đạt được mục tiêu sức khỏe bền vững và cải thiện hiệu quả điều trị bệnh lý nền.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Dinh dưỡng bệnh lý: Tư vấn dinh dưỡng chuyên biệt cho bệnh nhân Đái tháo đường, suy thận (trước và sau lọc máu), bệnh lý Gan mật, tim mạch, Gout.</li><li>Dinh dưỡng cộng đồng và trẻ em: Tư vấn dinh dưỡng học đường, can thiệp cho trẻ suy dinh dưỡng, béo phì tuổi học đường, và phụ nữ mang thai/cho con bú.</li><li>Dinh dưỡng lâm sàng chuyên sâu: Xây dựng khẩu phần ăn qua sonde, dinh dưỡng tĩnh mạch (parenteral nutrition) cho bệnh nhân nội trú.</li><li>Giáo dục sức khỏe: Hướng dẫn kỹ năng tự chuẩn bị bữa ăn, cách đọc nhãn thực phẩm và quản lý cân nặng khoa học.</li></ul><b>Quá trình công tác:</b><ul><li>2009 - 2016: Bác sĩ, chuyên viên tư vấn tại Viện Dinh dưỡng Quốc gia, tham gia các chương trình nghiên cứu quốc gia và cộng đồng về dinh dưỡng.</li><li>2016 - Nay: Trưởng khoa Dinh dưỡng - Bệnh viện E Hà Nội, phụ trách chuyên môn, quản lý quy trình cung cấp dinh dưỡng cho bệnh nhân nội trú và đào tạo nhân lực dinh dưỡng.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Dinh dưỡng.</li></ul>',
            },
            // 13. Tâm lý -> Gán vào Tâm thần (15)
            {
                userId: 15,
                specialtyId: 15, // Tâm thần (Bao gồm Tâm lý học)
                dob: '1989-04-26',
                gender: '1',
                ethnicity: 'Kinh',
                address: '12 Võ Văn Tần, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ',
                room: '213',
                image: '/uploads/users/doc13.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Tâm lý học lâm sàng, chuyên gia trị liệu các vấn đề về sức khỏe tinh thần như trầm cảm, rối loạn lo âu, rối loạn giấc ngủ và sang chấn tâm lý (PTSD). Bác sĩ sử dụng linh hoạt các phương pháp trị liệu khoa học như Liệu pháp Nhận thức Hành vi (CBT), Trị liệu Hành vi Biện chứng (DBT) và các kỹ thuật chánh niệm (Mindfulness). Bác sĩ cam kết cung cấp dịch vụ tham vấn chuyên nghiệp, dựa trên sự tôn trọng, đồng cảm, và bảo mật tuyệt đối.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Trị liệu Rối loạn tâm lý: Chẩn đoán và can thiệp cho Trầm cảm, lo âu lan tỏa, rối loạn hoảng sợ, rối loạn thích ứng, và rối loạn cảm xúc lưỡng cực.</li><li>Trị liệu Sang chấn và Stress: Can thiệp tâm lý chuyên sâu cho các trường hợp sang chấn tâm lý (PTSD) và quản lý căng thẳng mạn tính.</li><li>Tư vấn và Phát triển: Tư vấn về căng thẳng công việc, mâu thuẫn mối quan hệ, định hướng nghề nghiệp, kỹ năng đối phó và phát triển cá nhân.</li><li>Sử dụng các phương pháp trị liệu: Liệu pháp Nhận thức Hành vi (CBT), Trị liệu Hành vi Biện chứng (DBT), Liệu pháp Giải mẫn cảm và Tái xử lý bằng chuyển động mắt (EMDR).</li></ul><b>Quá trình công tác:</b><ul><li>2014 - 2018: Chuyên viên tâm lý lâm sàng tại Bệnh viện Tâm thần TP.HCM, tham gia vào các nhóm trị liệu nội trú và ngoại trú cho bệnh nhân nặng.</li><li>2018 - Nay: Giám đốc Trung tâm trị liệu tâm lý MindCare, trực tiếp tham vấn, điều phối chương trình đào tạo và phát triển các nhóm trị liệu chuyên đề.</li></ul><b>Quá trình đào tạo:</b><ul><li>Thạc sĩ Tâm lý học lâm sàng (Đại học Khoa học Xã hội và Nhân văn).</li><li>Chứng chỉ chuyên sâu về Liệu pháp Nhận thức Hành vi (CBT) quốc tế và Trị liệu Sang chấn.</li></ul>',
            },
            // 14. Dị ứng
            {
                userId: 16,
                specialtyId: 8, // Dị ứng
                dob: '1976-09-03',
                gender: '1',
                ethnicity: 'Kinh',
                address: '34 Trần Hưng Đạo, Đà Nẵng',
                degree: 'Tiến sĩ',
                room: '214',
                image: '/uploads/users/doc14.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên ngành Dị ứng - Miễn dịch lâm sàng, với hơn 20 năm kinh nghiệm. Bác sĩ là chuyên gia sâu rộng trong chẩn đoán, xét nghiệm và điều trị các bệnh lý dị ứng phức tạp như Hen phế quản dị ứng, Viêm mũi dị ứng mạn tính, Mày đay (nổi mề đay) và các phản ứng dị ứng thuốc, thức ăn. Bác sĩ đã tham gia nhiều nghiên cứu khoa học và ứng dụng các liệu pháp giải mẫn cảm (ASIT) tiên tiến nhất để điều trị tận gốc căn nguyên dị ứng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Dị ứng đường hô hấp: Khám và điều trị Hen phế quản dị ứng, Viêm mũi dị ứng mạn tính, Viêm kết mạc dị ứng.</li><li>Dị ứng da và Thuốc: Chẩn đoán và điều trị Mày đay mạn tính, Viêm da tiếp xúc, dị ứng thuốc và thực phẩm (test lẩy da, test áp da).</li><li>Miễn dịch lâm sàng: Chẩn đoán và điều trị các rối loạn miễn dịch cơ bản, bệnh tự miễn (Lupus ban đỏ).</li><li>Liệu pháp chuyên biệt: Thực hiện liệu pháp Giải mẫn cảm đặc hiệu với dị nguyên (ASIT) để tạo miễn dịch lâu dài.</li></ul><b>Quá trình công tác:</b><ul><li>2001 - 2012: Bác sĩ khoa Dị ứng Miễn dịch lâm sàng - Bệnh viện Bạch Mai, tham gia quản lý các ca sốc phản vệ và dị ứng nặng.</li><li>2012 - Nay: Trưởng Bộ môn Dị ứng - Đại học Y Dược Huế, đồng thời là cố vấn chuyên môn tại nhiều bệnh viện lớn khu vực miền Trung, phụ trách giảng dạy và nghiên cứu khoa học.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Dị ứng - Miễn dịch lâm sàng.</li></ul>',
            },
            // 15. Lão khoa
            {
                userId: 17,
                specialtyId: 9, // Lão khoa
                dob: '1993-11-11',
                gender: '0',
                ethnicity: 'Kinh',
                address: '56 Hàng Đào, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I',
                room: '215',
                image: '/uploads/users/doc15.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Lão khoa, với sự tận tâm và am hiểu về các bệnh lý đa khoa ở người cao tuổi. Bác sĩ chuyên điều trị các hội chứng lão khoa đặc trưng như sa sút trí tuệ (Alzheimer, mạch máu), té ngã, suy dinh dưỡng và quản lý các bệnh lý mạn tính kết hợp (tăng huyết áp, tiểu đường, thoái hóa khớp). Bác sĩ luôn chú trọng việc tư vấn chế độ chăm sóc tại nhà, phục hồi chức năng và điều chỉnh thuốc để tránh tương tác, giúp người bệnh duy trì chất lượng cuộc sống tốt nhất.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Lão khoa tổng quát: Khám, tầm soát và quản lý các bệnh mạn tính ở người cao tuổi (Bệnh tim mạch, hô hấp, đái tháo đường, xương khớp).</li><li>Thần kinh - Tâm thần Lão khoa: Chẩn đoán và điều trị rối loạn trí nhớ, sa sút trí tuệ, mất ngủ, trầm cảm tuổi già.</li><li>Hội chứng lão khoa: Đánh giá và can thiệp nguy cơ té ngã, rối loạn đi tiểu (tiểu không kiểm soát), suy dinh dưỡng.</li><li>Phục hồi chức năng: Tư vấn vật lý trị liệu, phục hồi chức năng vận động sau đột quỵ hoặc phẫu thuật chỉnh hình.</li></ul><b>Quá trình công tác:</b><ul><li>2017 - 2021: Bác sĩ điều trị Bệnh viện Lão khoa Trung ương, tham gia các chương trình sàng lọc và can thiệp sa sút trí tuệ, trực cấp cứu lão khoa.</li><li>2021 - Nay: Bác sĩ khoa Nội - Bệnh viện Hữu Nghị Việt Xô, chuyên trách khám và điều trị nội tổng quát, đặc biệt cho đối tượng cán bộ, người cao tuổi.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Lão khoa.</li></ul>',
            },
            // 16. Sản Phụ khoa -> Gán vào Nội khoa (1)
            {
                userId: 18,
                specialtyId: 1, // Nội khoa (Fallback cho Sản Phụ khoa)
                dob: '1981-05-28',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nguyễn Công Trứ, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II',
                room: '216',
                image: '/uploads/users/doc16.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Sản Phụ khoa, với hơn 15 năm kinh nghiệm. Bác sĩ là chuyên gia trong lĩnh vực quản lý thai kỳ nguy cơ cao (tiền sản giật, đái tháo đường thai kỳ), đỡ sinh thường/mổ lấy thai an toàn và siêu âm chẩn đoán dị tật thai nhi chuyên sâu. Bác sĩ có tay nghề cao trong phẫu thuật phụ khoa. Bác sĩ luôn mang lại sự an tâm cho sản phụ bằng sự chuyên nghiệp, kinh nghiệm dày dặn và tư vấn chi tiết về hành trình mang thai.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Sản khoa chuyên sâu: Quản lý thai kỳ thường và thai kỳ nguy cơ cao, đỡ sinh thường (kể cả các ca phức tạp), mổ lấy thai, và xử trí cấp cứu sản khoa (băng huyết sau sinh).</li><li>Siêu âm chẩn đoán tiền sản: Thực hiện siêu âm 3D/4D, siêu âm hình thái học thai nhi, chẩn đoán dị tật thai sớm (Double/Triple Test, NIPT).</li><li>Phụ khoa ngoại khoa: Phẫu thuật nội soi và mổ mở u nang buồng trứng, u xơ tử cung, thai ngoài tử cung.</li><li>Chăm sóc sau sinh: Tư vấn dinh dưỡng, cho con bú và phục hồi sức khỏe cho mẹ sau sinh.</li></ul><b>Quá trình công tác:</b><ul><li>2007 - 2016: Trưởng phòng sinh Bệnh viện Hùng Vương, phụ trách các ca sinh khó, cấp cứu sản khoa và đào tạo ê-kíp đỡ sinh.</li><li>2016 - Nay: Phó Giám đốc Trung tâm Sản Nhi - Bệnh viện Quốc tế Mỹ (AIH), phụ trách chuyên môn Sản khoa, quản lý chất lượng dịch vụ và phát triển các kỹ thuật chẩn đoán mới.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Sản Phụ khoa.</li></ul>',
            },
            // 17. Truyền nhiễm
            {
                userId: 19,
                specialtyId: 10, // Truyền nhiễm
                dob: '1986-07-07',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Mã, Đà Nẵng',
                degree: 'Thạc sĩ',
                room: '217',
                image: '/uploads/users/doc17.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Bệnh Nhiệt đới, có hơn 10 năm kinh nghiệm chuyên sâu trong chẩn đoán và điều trị các bệnh truyền nhiễm và bệnh ký sinh trùng. Bác sĩ có kinh nghiệm đặc biệt trong điều trị viêm gan siêu vi B, C mạn tính, Sốt xuất huyết, Cúm, và các bệnh Nhiệt đới phổ biến. Bác sĩ thường xuyên tham gia các dự án phòng chống dịch bệnh cộng đồng, góp phần nâng cao ý thức phòng bệnh và sẵn sàng ứng phó với các dịch bệnh mới.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Gan mật truyền nhiễm: Chẩn đoán và điều trị viêm gan virus B, C mạn tính, theo dõi tiến triển xơ gan và chỉ định thuốc kháng virus thế hệ mới.</li><li>Bệnh lý Ký sinh trùng và Nhiệt đới: Điều trị sốt rét, giun sán (sán lá gan, sán chó), sốt xuất huyết, sốt mò, bệnh Tay chân miệng.</li><li>Tiêm chủng và Dự phòng: Tư vấn và chỉ định các loại vắc xin phòng bệnh truyền nhiễm (cúm, viêm gan, phế cầu), tư vấn du lịch y tế (travel medicine).</li><li>Xử trí cấp tính: Quản lý và điều trị các ca bệnh truyền nhiễm cấp tính, lây nhiễm.</li></ul><b>Quá trình công tác:</b><ul><li>2011 - 2017: Bác sĩ điều trị tại Bệnh viện Bệnh Nhiệt đới TP.HCM, tham gia trực tiếp vào công tác phòng chống dịch Sốt xuất huyết và Cúm lớn.</li><li>2017 - Nay: Trưởng khoa Nhiệt đới - Bệnh viện C Đà Nẵng, phụ trách chuyên môn, nghiên cứu về bệnh truyền nhiễm vùng miền Trung và đào tạo nhân sự.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Bệnh Nhiệt đới.</li></ul>',
            },
            // 18. Thận học -> Gán vào Nội khoa (1)
            {
                userId: 20,
                specialtyId: 1, // Nội khoa (Thận Nội khoa)
                dob: '1974-01-15',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Bạc, Hà Nội',
                degree: 'Tiến sĩ',
                room: '218',
                image: '/uploads/users/doc18.webp',
                price: 650000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên ngành Thận học - Lọc máu, với hơn 25 năm kinh nghiệm. Bác sĩ là chuyên gia hàng đầu về điều trị suy thận mạn, viêm cầu thận, hội chứng thận hư và là cố vấn chuyên môn về ghép thận. Bác sĩ có công trình nghiên cứu nổi bật và đã cứu sống hàng nghìn bệnh nhân suy thận giai đoạn cuối thông qua các phương pháp lọc máu tiên tiến (thẩm phân phúc mạc, chạy thận nhân tạo), đồng thời là giảng viên uy tín trong ngành.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Thận học nội khoa: Chẩn đoán và điều trị bệnh lý viêm cầu thận, suy thận cấp/mạn, bệnh thận do tiểu đường, và các bệnh thận di truyền.</li><li>Lọc máu và Thay thế thận: Tư vấn và quản lý bệnh nhân chạy thận nhân tạo, thẩm phân phúc mạc, chuẩn bị và theo dõi bệnh nhân sau ghép thận.</li><li>Tiết niệu: Chẩn đoán và điều trị các bệnh lý tiết niệu nội khoa (viêm đường tiết niệu, nhiễm khuẩn thận).</li><li>Thủ thuật: Đặt catheter thẩm phân phúc mạc và các thủ thuật liên quan đến lọc máu.</li></ul><b>Quá trình công tác:</b><ul><li>1999 - 2010: Bác sĩ khoa Thận nhân tạo - Bệnh viện Bạch Mai, tham gia xây dựng quy trình lọc máu an toàn và cấp cứu thận-tiết niệu.</li><li>2010 - Nay: Trưởng khoa Nội Thận - Bệnh viện Việt Đức, phụ trách chuyên môn Thận nội khoa, hội chẩn các ca bệnh khó toàn quốc và tham gia giảng dạy sau đại học.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Thận - Tiết niệu (Thận học).</li></ul>',
            },
            // 19. Gan mật -> Gán vào Tiêu hóa (12)
            {
                userId: 21,
                specialtyId: 12, // Tiêu hóa (Bao gồm Gan mật)
                dob: '1990-03-24',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I',
                room: '219',
                image: '/uploads/users/doc19.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Gan mật, chuyên sâu về chẩn đoán và điều trị các bệnh lý Gan - Mật - Tụy (viêm gan virus, xơ gan, gan nhiễm mỡ). Bác sĩ có kinh nghiệm trong tầm soát ung thư gan sớm và áp dụng các phương pháp điều trị tiên tiến, ít xâm lấn như đốt u gan bằng sóng cao tần (RFA). Bác sĩ chú trọng tư vấn kỹ lưỡng về lối sống, chế độ ăn để bảo vệ sức khỏe gan mật, đồng thời thực hiện các kỹ thuật nội soi can thiệp phức tạp.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Gan: Điều trị viêm gan virus B, C mạn tính, gan nhiễm mỡ, xơ gan, theo dõi và điều trị ung thư gan giai đoạn sớm (RFA, TACE).</li><li>Bệnh lý Mật Tụy: Chẩn đoán và điều trị viêm túi mật, sỏi mật, viêm tụy cấp/mạn, u tụy.</li><li>Nội soi can thiệp: Thực hiện Nội soi mật tụy ngược dòng (ERCP) để lấy sỏi ống mật chủ, đặt stent đường mật.</li><li>Chẩn đoán hình ảnh: Siêu âm đàn hồi mô gan (FibroScan), đọc kết quả CT/MRI chuyên sâu về Gan mật.</li></ul><b>Quá trình công tác:</b><ul><li>2015 - 2020: Bác sĩ khoa Gan Mật Bệnh viện Chợ Rẫy, tham gia trực tiếp điều trị các ca bệnh nặng, ghép gan và can thiệp.</li><li>2020 - Nay: Bác sĩ điều trị và cố vấn chuyên môn tại Phòng khám Gan mật Sài Gòn, chuyên sâu về điều trị ngoại trú các bệnh Gan mạn tính và nội soi can thiệp.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Gan mật.</li></ul>',
            },
            // 20. Huyết học -> Gán vào Nội khoa (1)
            {
                userId: 22,
                specialtyId: 1, // Nội khoa (Huyết học lâm sàng)
                dob: '1984-08-02',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II',
                room: '220',
                image: '/uploads/users/doc20.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Huyết học - Truyền máu, có hơn 15 năm kinh nghiệm. Bác sĩ chuyên sâu trong chẩn đoán và điều trị các bệnh lý về máu như thiếu máu (thiếu sắt, Thalassemia), rối loạn đông máu và các bệnh lý tăng sinh tủy (Bệnh bạch cầu, Myeloma). Bác sĩ có kinh nghiệm tư vấn di truyền các bệnh máu bẩm sinh và quản lý các ca truyền máu phức tạp, đảm bảo an toàn tuyệt đối cho người bệnh và ứng dụng các kỹ thuật xét nghiệm hiện đại.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Huyết học lâm sàng: Chẩn đoán, điều trị chuyên sâu thiếu máu (Thalassemia, thiếu máu tan máu, bất sản tủy), bệnh lý về tiểu cầu và bạch cầu.</li><li>Rối loạn đông máu: Chẩn đoán và quản lý các bệnh lý rối loạn chảy máu (Hemophilia) và tăng đông (huyết khối).</li><li>Bệnh máu ác tính: Hỗ trợ chẩn đoán và điều trị bệnh Bạch cầu cấp/mạn, U lympho, Đa u tủy (Myeloma).</li><li>Truyền máu: Chỉ định, theo dõi truyền máu an toàn, tư vấn về hiến máu và kỹ thuật lọc máu (plasmapheresis).</li></ul><b>Quá trình công tác:</b><ul><li>2010 - 2017: Bác sĩ điều trị tại Viện Huyết học Truyền máu Trung ương, tham gia các nghiên cứu về bệnh máu hiếm và quy trình truyền máu.</li><li>2017 - Nay: Trưởng khoa Huyết học lâm sàng - Bệnh viện Đa khoa Đà Nẵng, phụ trách chuyên môn, xây dựng quy trình xét nghiệm huyết học và tham gia hội chẩn ca bệnh miền Trung.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Huyết học.</li></ul>',
            },
            // 21. Vật lý trị liệu -> Gán vào Chấn thương chỉnh hình (13)
            {
                userId: 23,
                specialtyId: 13, // Chấn thương chỉnh hình (Gần nhất với Phục hồi chức năng)
                dob: '1992-10-19',
                gender: '1',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Thạc sĩ',
                room: '221',
                image: '/uploads/users/doc21.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Vật lý trị liệu và Phục hồi chức năng, chuyên gia trong việc phục hồi chức năng cho bệnh nhân sau tai biến mạch máu não (đột quỵ), chấn thương chỉnh hình và các bệnh lý cột sống (thoát vị đĩa đệm, đau lưng). Bác sĩ sử dụng các phương pháp điều trị không dùng thuốc, kết hợp vật lý trị liệu hiện đại (sóng ngắn, laser) và hướng dẫn tập luyện chuyên sâu để giúp bệnh nhân lấy lại khả năng vận động và chất lượng cuộc sống tối đa, tối ưu hóa quá trình phục hồi.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Phục hồi chức năng Thần kinh: Lên phác đồ và trực tiếp phục hồi sau đột quỵ, chấn thương sọ não, chấn thương tủy sống, liệt mặt.</li><li>Phục hồi chức năng Cơ xương khớp: Điều trị và phục hồi chức năng cho đau cổ vai gáy, đau lưng cấp/mạn, thoái hóa khớp, phục hồi sau chấn thương thể thao (đứt dây chằng).</li><li>Các kỹ thuật chuyên sâu: Áp dụng liệu pháp Thần kinh cơ, trị liệu bằng tay (manual therapy), kéo giãn giảm áp cột sống, sóng xung kích.</li><li>Lão khoa: Hỗ trợ vận động và chống té ngã cho người cao tuổi.</li></ul><b>Quá trình công tác:</b><ul><li>2016 - 2020: Bác sĩ điều trị tại Trung tâm Phục hồi chức năng Bệnh viện Bạch Mai, chuyên trách về phục hồi chức năng đột quỵ và chấn thương tủy sống.</li><li>2020 - Nay: Trưởng đơn vị Vật lý trị liệu (VLTL) - Phòng khám ACC Hà Nội, áp dụng các liệu pháp điều trị tiên tiến theo tiêu chuẩn quốc tế.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Vật lý trị liệu - Phục hồi chức năng.</li></ul>',
            },
            // 22. Cơ Xương Khớp -> Gán vào Chấn thương chỉnh hình (13)
            {
                userId: 24,
                specialtyId: 13, // Chấn thương chỉnh hình (Cơ Xương Khớp)
                dob: '1977-12-28',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ',
                room: '222',
                image: '/uploads/users/doc22.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y khoa, chuyên ngành Cơ Xương Khớp, với hơn 20 năm kinh nghiệm. Bác sĩ là chuyên gia hàng đầu trong chẩn đoán và điều trị các bệnh lý thoái hóa khớp, Gút (Gout), Loãng xương và các bệnh lý tự miễn như Viêm khớp dạng thấp. Bác sĩ là người tiên phong trong việc áp dụng liệu pháp huyết tương giàu tiểu cầu (PRP) và các kỹ thuật can thiệp khớp ít xâm lấn. Bác sĩ luôn ưu tiên phương pháp bảo tồn, kết hợp điều trị nội khoa và phục hồi chức năng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Khớp: Chẩn đoán và điều trị nội khoa Thoái hóa khớp gối/háng/cột sống, Gút cấp/mạn, Viêm khớp dạng thấp, Viêm cột sống dính khớp, Lupus ban đỏ hệ thống.</li><li>Bệnh lý Xương: Điều trị và tư vấn phòng ngừa Loãng xương, gãy xương bệnh lý, Bệnh Paget xương.</li><li>Thủ thuật can thiệp khớp: Thực hiện kỹ thuật Tiêm nội khớp (Corticoid, Hyaluronic Acid), tiêm PRP (Huyết tương giàu tiểu cầu) dưới hướng dẫn siêu âm, chọc hút dịch khớp.</li><li>Phục hồi chức năng: Tư vấn vật lý trị liệu và bài tập vận động cho bệnh nhân Cơ Xương Khớp.</li></ul><b>Quá trình công tác:</b><ul><li>2002 - 2012: Bác sĩ khoa Cơ Xương Khớp - Bệnh viện Nguyễn Tri Phương, tham gia điều trị các ca nội trú và cấp cứu.</li><li>2012 - Nay: Giám đốc Chuyên môn Bệnh viện Chấn thương Chỉnh hình TP.HCM, phụ trách mảng Nội Cơ Xương Khớp và phát triển các kỹ thuật mới.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Cơ Xương Khớp.</li></ul>',
            },
            // 23. Thần kinh
            {
                userId: 25,
                specialtyId: 11, // Thần kinh
                dob: '1988-02-06',
                gender: '0',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I',
                room: '223',
                image: '/uploads/users/doc23.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Nội Thần kinh, chuyên trị các chứng đau đầu mạn tính (đau nửa đầu Migraine, đau đầu căng thẳng), mất ngủ kéo dài, rối loạn tiền đình và các bệnh lý thoái hóa thần kinh như Parkinson. Bác sĩ áp dụng phương pháp điều trị toàn diện, kết hợp thuốc, vật lý trị liệu và điều chỉnh lối sống, giúp bệnh nhân kiểm soát triệu chứng và cải thiện chất lượng cuộc sống lâu dài.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Đau đầu và Rối loạn Tiền đình: Chẩn đoán và điều trị đau đầu Migraine, chóng mặt, rối loạn thăng bằng, và bệnh lý mạch máu não.</li><li>Rối loạn Giấc ngủ và Cảm xúc: Điều trị mất ngủ, ngủ không sâu giấc, ngưng thở khi ngủ, và các biểu hiện tâm lý liên quan đến bệnh lý thần kinh.</li><li>Bệnh lý Thần kinh mạn tính: Chẩn đoán và điều trị Parkinson, Bệnh xơ cứng rải rác (MS), Bệnh thần kinh ngoại biên.</li><li>Tầm soát và Can thiệp: Đọc kết quả Điện não đồ, Điện cơ, chỉ định và tư vấn điều trị dự phòng đột quỵ.</li></ul><b>Quá trình công tác:</b><ul><li>2013 - 2019: Bác sĩ điều trị khoa Thần kinh - Bệnh viện Trung ương Huế, tham gia cấp cứu và điều trị đột quỵ.</li><li>2019 - Nay: Phó khoa Nội Thần kinh - Bệnh viện Hoàn Mỹ Đà Nẵng, chuyên trách về điều trị ngoại trú và tư vấn các bệnh lý thần kinh mạn tính.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Nội Thần kinh.</li></ul>',
            },
            // 24. Tiêu hóa
            {
                userId: 26,
                specialtyId: 12, // Tiêu hóa
                dob: '1980-04-15',
                gender: '1',
                ethnicity: 'Kinh',
                address: '56 Hàng Điếu, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II',
                room: '224',
                image: '/uploads/users/doc24.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Tiêu hóa - Gan mật, là chuyên gia Nội soi tiêu hóa can thiệp hàng đầu với hơn 20 năm kinh nghiệm. Bác sĩ có tay nghề cao trong việc phát hiện sớm ung thư dạ dày, đại tràng thông qua nội soi phóng đại và nhuộm màu, thực hiện các thủ thuật can thiệp nội soi phức tạp như cắt polyp, cầm máu, nong hẹp. Bác sĩ cam kết mang lại quy trình nội soi không đau, an toàn và kết quả chẩn đoán chính xác tuyệt đối, giảm thiểu tối đa sự khó chịu cho bệnh nhân.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nội soi tiêu hóa chẩn đoán sớm: Nội soi dạ dày, đại tràng, nội soi phóng đại và nhuộm màu để phát hiện sớm các tổn thương tiền ung thư và ung thư.</li><li>Nội soi can thiệp: Thực hiện cắt polyp qua nội soi, nong hẹp thực quản/môn vị, lấy dị vật, cầm máu tổn thương tiêu hóa.</li><li>Bệnh lý Tiêu hóa mạn tính: Điều trị viêm loét, trào ngược dạ dày thực quản (GERD), hội chứng ruột kích thích (IBS), bệnh Crohn, Viêm loét đại tràng.</li><li>Bệnh lý Gan mật: Chẩn đoán và điều trị viêm gan, xơ gan, sỏi mật.</li></ul><b>Quá trình công tác:</b><ul><li>2005 - 2015: Trưởng đơn vị Nội soi - Bệnh viện E, thực hiện hơn 10.000 ca nội soi chẩn đoán và can thiệp, đào tạo kỹ thuật nội soi cho các bệnh viện tuyến dưới.</li><li>2015 - Nay: Trưởng khoa Tiêu hóa - Bệnh viện Đa khoa Quốc tế Vinmec Times City, phụ trách chuyên môn và nghiên cứu về Nội soi chẩn đoán sớm ung thư tiêu hóa theo tiêu chuẩn quốc tế.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Tiêu hóa - Gan mật.</li></ul>',
            },
            // 25. Tim mạch
            {
                userId: 27,
                specialtyId: 2, // Tim mạch
                dob: '1991-06-23',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nam Kỳ Khởi Nghĩa, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ',
                room: '225',
                image: '/uploads/users/doc25.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Y học chuyên ngành Tim mạch, được đào tạo bài bản về chẩn đoán không xâm lấn (siêu âm tim, Holter). Bác sĩ có thế mạnh trong quản lý bệnh nhân tăng huyết áp, rối loạn nhịp tim ngoại trú và tầm soát các bệnh lý tim mạch sớm ở người trẻ tuổi. Bác sĩ luôn tư vấn chi tiết về chế độ ăn, tập luyện và tuân thủ thuốc để kiểm soát bệnh nền hiệu quả, phòng ngừa biến cố tim mạch. Bác sĩ cũng tham gia hỗ trợ các kỹ thuật can thiệp tim mạch phức tạp.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nội Tim mạch: Điều trị tăng huyết áp, bệnh động mạch vành, suy tim giai đoạn sớm.</li><li>Chẩn đoán không xâm lấn: Siêu âm tim gắng sức, theo dõi Holter ECG và Holter huyết áp.</li><li>Tim mạch can thiệp: Phụ trách hỗ trợ các kỹ thuật can thiệp tim mạch (đặt máy tạo nhịp, chụp mạch).</li></ul><b>Quá trình công tác:</b><ul><li>2015 - 2020: Bác sĩ điều trị tại Viện Tim mạch Quốc gia, tham gia các nghiên cứu về rối loạn nhịp tim.</li><li>2020 - Nay: Bác sĩ Tim mạch can thiệp tại Bệnh viện Tâm Đức, chuyên trách theo dõi bệnh nhân sau can thiệp và điều trị nội khoa.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Tim mạch.</li></ul>',
            },
            {
                userId: 28,
                specialtyId: 6, // Hô hấp
                dob: '1983-09-01',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Bông, Đà Nẵng',
                degree: 'Tiến sĩ',
                room: '226',
                image: '/uploads/users/doc26.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Tai Mũi Họng, chuyên sâu về phẫu thuật đầu cổ và các kỹ thuật phục hồi thính lực tiên tiến. Bác sĩ là chuyên gia cấy ốc tai điện tử và phẫu thuật nội soi xoang sàng, bướu cổ, khối u vùng cổ. Bác sĩ có nhiều công trình nghiên cứu về thính học và đã thực hiện thành công hàng trăm ca phẫu thuật phức tạp, khôi phục thính lực và chất lượng giọng nói cho bệnh nhân. Bác sĩ là giảng viên có uy tín trong ngành Tai Mũi Họng, đảm bảo kết quả điều trị tối ưu.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Phẫu thuật Đầu cổ: Phẫu thuật ung thư thanh quản, tuyến giáp, u vùng đầu cổ, cắt khối u tuyến mang tai.</li><li>Thính học và Phục hồi: Chẩn đoán và can thiệp thính lực, phẫu thuật cấy ốc tai điện tử, tư vấn và điều chỉnh máy trợ thính, vá màng nhĩ, phẫu thuật xương chũm.</li><li>Bệnh lý Tai Mũi Họng chuyên sâu: Điều trị viêm tai giữa mạn tính, phẫu thuật nội soi xoang sàng, các bệnh lý phức tạp về họng và thanh quản (viêm thanh quản mạn, hạt dây thanh).</li><li>Thủ thuật: Nội soi Tai Mũi Họng chẩn đoán, chọc hút/rửa xoang.</li></ul><b>Quá trình công tác:</b><ul><li>2008 - 2016: Giảng viên Bộ môn Tai Mũi Họng - Đại học Y Hà Nội, tham gia đào tạo Bác sĩ chuyên khoa, nghiên cứu khoa học.</li><li>2016 - Nay: Trưởng khoa Tai Mũi Họng - Bệnh viện C Đà Nẵng, phụ trách chuyên môn và điều trị các ca phẫu thuật lớn, phát triển các kỹ thuật phẫu thuật nội soi.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Tai Mũi Họng.</li></ul>',
            },
            // 27. Da liễu -> Gán vào Dị ứng (8)
            {
                userId: 29,
                specialtyId: 8, // Dị ứng
                dob: '1989-11-09',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Mã, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I',
                room: '227',
                image: '/uploads/users/doc27.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Da liễu, có thế mạnh về điều trị các bệnh da liễu mạn tính và da liễu trẻ em. Bác sĩ chuyên sâu trong điều trị Viêm da cơ địa, Vảy nến, Lupus ban đỏ da và các bệnh da nhiễm trùng. Bác sĩ luôn cập nhật các liệu pháp sinh học và điều trị mục tiêu mới nhất, giúp bệnh nhân kiểm soát bệnh lâu dài, giảm thiểu tác dụng phụ của thuốc. Bác sĩ khám và tư vấn tận tình cho cả người lớn và trẻ em, đặt mục tiêu cải thiện chất lượng cuộc sống.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Da liễu mạn tính: Chẩn đoán và điều trị chuyên sâu Vảy nến, Viêm da cơ địa (Eczema), Á sừng, và Lupus ban đỏ hệ thống thể da.</li><li>Da liễu trẻ em: Khám và điều trị các bệnh da thường gặp ở trẻ sơ sinh và trẻ nhỏ (chàm sữa, rôm sảy, nấm da), tư vấn chăm sóc da cho trẻ.</li><li>Da liễu nhiễm trùng và dị ứng: Điều trị Nấm da, Zona, Thủy đậu, Mày đay (nổi mề đay) cấp/mạn.</li><li>Da liễu thẩm mỹ cơ bản: Lấy mụn y khoa, điện di, peel da nông.</li></ul><b>Quá trình công tác:</b><ul><li>2014 - 2019: Bác sĩ điều trị tại Bệnh viện Da liễu Hà Nội, chuyên trách khu vực khám và quản lý bệnh da mạn tính, là bác sĩ chủ lực trong phòng khám trẻ em.</li><li>2019 - Nay: Bác sĩ phụ trách Phòng khám Da liễu - Hệ thống Medlatec, tham gia vào các hoạt động tầm soát bệnh da liễu cộng đồng và ứng dụng các kỹ thuật chẩn đoán mới.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Da liễu.</li></ul>',
            },
            // 28. Nhi khoa
            {
                userId: 30,
                specialtyId: 3, // Nhi khoa
                dob: '1975-01-18',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II',
                room: '228',
                image: '/uploads/users/doc28.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Nhi khoa, với bề dày hơn 25 năm kinh nghiệm. Bác sĩ là chuyên gia trong lĩnh vực Hồi sức tích cực Nhi khoa và Sơ sinh, có khả năng xử lý các ca bệnh nặng, cấp cứu nhi khoa phức tạp. Từng giữ chức vụ Trưởng khoa Hồi sức, Bác sĩ có chuyên môn cao trong chẩn đoán và điều trị các bệnh lý nguy hiểm ở trẻ sơ sinh, trẻ nhỏ và trẻ lớn. Bác sĩ còn đóng vai trò là cố vấn chuyên môn cho nhiều bệnh viện Nhi khu vực phía Nam.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Hồi sức tích cực Nhi: Hồi sức hô hấp, tuần hoàn, xử lý sốc nhiễm trùng, suy đa tạng ở trẻ em, theo dõi và điều chỉnh máy thở.</li><li>Sơ sinh: Chăm sóc và điều trị các bệnh lý sơ sinh non tháng, suy hô hấp, vàng da nặng, nhiễm trùng sơ sinh.</li><li>Nhi khoa tổng quát: Chẩn đoán và điều trị các bệnh lý Nhi khoa khó, phức tạp, bao gồm các bệnh lý tim bẩm sinh và thận ở trẻ em.</li><li>Thủ thuật: Đặt catheter trung tâm, chọc dịch não tủy, đặt nội khí quản cấp cứu.</li></ul><b>Quá trình công tác:</b><ul><li>2000 - 2015: Trưởng khoa Hồi sức Nhi - Bệnh viện Nhi Đồng 1, chịu trách nhiệm trực tiếp các ca bệnh nguy kịch và quản lý đơn vị Hồi sức.</li><li>2015 - Nay: Cố vấn Chuyên môn Bệnh viện Nhi Đồng 2, tham gia giảng dạy, phát triển chuyên môn cho các bác sĩ trẻ và tham gia hội chẩn các ca bệnh khó tuyến trên.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Nhi khoa.</li></ul>',
            },
            // 29. Sản Phụ khoa -> Gán vào Nội khoa (1)
            {
                userId: 31,
                specialtyId: 1, // Nội khoa (Fallback)
                dob: '1993-03-27',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Thạc sĩ',
                room: '229',
                image: '/uploads/users/doc29.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Sản Phụ khoa, được đào tạo chuyên sâu về nội tiết sinh sản và các kỹ thuật hỗ trợ sinh sản (IUI, IVF). Bác sĩ là người trẻ tuổi, năng động, luôn cập nhật các phác đồ mới nhất trong điều trị vô sinh, hiếm muộn. Bác sĩ cung cấp sự tư vấn nhiệt tình, khoa học, và đặc biệt chú trọng đến việc tạo không gian khám bệnh riêng tư, thoải mái và tôn trọng cho các cặp đôi đang mong con, giúp họ vượt qua áp lực điều trị.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nội tiết Sinh sản: Chẩn đoán và điều trị vô sinh, hiếm muộn (cả nam và nữ), hội chứng buồng trứng đa nang (PCOS), rối loạn phóng noãn, suy buồng trứng sớm.</li><li>Hỗ trợ sinh sản: Tư vấn và thực hiện kỹ thuật Bơm tinh trùng vào buồng tử cung (IUI), hỗ trợ trong quy trình Thụ tinh trong ống nghiệm (IVF).</li><li>Phụ khoa: Khám và điều trị các bệnh lý phụ khoa liên quan đến nội tiết (rối loạn kinh nguyệt, bế kinh) và tiền mãn kinh.</li><li>Phẫu thuật nội soi phụ khoa: Thăm dò và điều trị vô sinh (nội soi buồng tử cung, nội soi ổ bụng).</li></ul><b>Quá trình công tác:</b><ul><li>2017 - 2021: Bác sĩ tại Trung tâm Hỗ trợ sinh sản - Bệnh viện Phụ sản Nhi Đà Nẵng, tham gia quy trình IUI và IVF, trực tiếp tư vấn cặp vợ chồng hiếm muộn.</li><li>2021 - Nay: Bác sĩ điều trị tại Phòng khám Marie Stopes, chuyên tư vấn về sức khỏe sinh sản, kế hoạch hóa gia đình và nội tiết sinh sản, đồng thời là cố vấn chuyên môn cho các phòng khám vệ tinh.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Sản Phụ khoa.</li></ul>',
            },
            // 30. Nam học -> Gán vào Nội khoa (1)
            {
                userId: 32,
                specialtyId: 1, // Nội khoa (Fallback)
                dob: '1981-05-05',
                gender: '1',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Tiến sĩ',
                room: '230',
                image: '/uploads/users/doc30.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên gia hàng đầu về phẫu thuật tạo hình cơ quan sinh dục nam và điều trị vô sinh nam chuyên sâu. Bác sĩ là thành viên của Hội Y học Giới tính Thế giới (ISSM) và nổi tiếng với kinh nghiệm phẫu thuật vi phẫu trong điều trị vô sinh (Micro TESE). Bác sĩ cung cấp các dịch vụ khám chữa bệnh nam khoa chuyên sâu, luôn cam kết bảo mật tuyệt đối và mang lại hiệu quả điều trị cao nhất, giúp nam giới giải quyết các vấn đề thầm kín, lấy lại sự tự tin.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Vô sinh Nam chuyên sâu: Chẩn đoán nguyên nhân và điều trị vô tinh (Micro TESE), tinh trùng yếu/ít/dị dạng, giãn tĩnh mạch thừng tinh (Vi phẫu).</li><li>Phẫu thuật Nam khoa: Phẫu thuật tạo hình dương vật (cong, ngắn), phẫu thuật chữa xuất tinh sớm, điều trị tinh hoàn ẩn, mào tinh hoàn.</li><li>Rối loạn chức năng tình dục: Điều trị rối loạn cương dương, suy giảm testosterone (mãn dục nam), điều trị nội khoa xuất tinh sớm.</li><li>Tiết niệu cơ bản: Khám và điều trị các bệnh lý tiết niệu liên quan (viêm tiền liệt tuyến, đường tiết niệu).</li></ul><b>Quá trình công tác:</b><ul><li>2006 - 2016: Phó khoa Nam học Bệnh viện Việt Đức, trực tiếp thực hiện và đào tạo các kỹ thuật phẫu thuật Nam khoa, bao gồm các ca khó và tạo hình phức tạp.</li><li>2016 - Nay: Giám đốc Trung tâm Sức khỏe Nam giới Men Health, chuyên điều trị các bệnh lý Nam khoa khó và vô sinh nam, phát triển các phác đồ điều trị hormone và can thiệp.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Nam học - Tiết niệu.</li></ul>',
            },
            // 31. Mắt
            {
                userId: 33,
                specialtyId: 4, // Mắt
                dob: '1987-07-14',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I',
                room: '231',
                image: '/uploads/users/doc31.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Nhãn khoa, giàu kinh nghiệm trong lĩnh vực Khúc xạ và Kiểm soát cận thị. Bác sĩ có thế mạnh đặc biệt trong việc sử dụng phương pháp Ortho-K (kính áp tròng đeo ban đêm) để làm chậm tiến triển cận thị ở trẻ em và thanh thiếu niên. Bác sĩ còn chuyên khám và điều trị các bệnh lý bề mặt nhãn cầu như khô mắt, viêm kết mạc và dị ứng mắt, luôn tận tâm đưa ra giải pháp bảo tồn thị lực tối ưu và tư vấn chi tiết về việc chăm sóc mắt hàng ngày.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Khúc xạ và Kính: Khám và điều trị các tật khúc xạ (cận, viễn, loạn thị), tư vấn và chỉ định các loại kính gọng, kính áp tròng.</li><li>Kiểm soát Cận thị chuyên sâu: Tư vấn, thiết kế và quản lý phương pháp Ortho-K (Orthokeratology) cho trẻ em, sử dụng thuốc nhỏ mắt kiểm soát cận thị.</li><li>Bệnh lý bề mặt nhãn cầu: Điều trị khô mắt (nghiệm pháp Schirmer, chất bôi trơn), viêm loét giác mạc, viêm bờ mi, dị ứng mắt theo mùa.</li><li>Nhãn khoa tổng quát: Tầm soát các bệnh lý mắt phổ biến như đục thủy tinh thể, Glaucoma.</li></ul><b>Quá trình công tác:</b><ul><li>2012 - 2018: Bác sĩ điều trị Bệnh viện Mắt TP.HCM, tham gia phòng khám khúc xạ, trực tiếp theo dõi và điều chỉnh Ortho-K.</li><li>2018 - Nay: Trưởng khoa Khúc xạ - Bệnh viện Mắt Sài Gòn, phụ trách chuyên môn về kiểm soát cận thị, Ortho-K và các kỹ thuật khúc xạ khác (Lasik).</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Nhãn khoa.</li></ul>',
            },
            // 32. Nha khoa
            {
                userId: 34,
                specialtyId: 5, // Nha khoa
                dob: '1979-09-22',
                gender: '1',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II',
                room: '232',
                image: '/uploads/users/doc32.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Răng Hàm Mặt, chuyên gia về Phẫu thuật Hàm Mặt và điều trị các chấn thương phức tạp vùng mặt. Bác sĩ có kinh nghiệm dày dặn trong việc phẫu thuật chỉnh hình hàm mặt (hô, móm), phẫu thuật nha chu và phục hình răng sứ thẩm mỹ. Bác sĩ còn là giảng viên, có đóng góp lớn trong việc đào tạo nhiều thế hệ bác sĩ Răng Hàm Mặt, đảm bảo chất lượng chuyên môn và an toàn tuyệt đối trong mọi ca điều trị, đặc biệt là phẫu thuật thẩm mỹ hàm mặt.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Phẫu thuật Hàm Mặt: Phẫu thuật chỉnh hình hàm (hàm hô, móm, cắn ngược), điều trị chấn thương hàm mặt (gãy xương hàm), nhổ răng khôn mọc lệch/ngầm phức tạp.</li><li>Nha khoa thẩm mỹ: Phục hình răng sứ thẩm mỹ, làm cầu răng, răng giả tháo lắp, cấy Implant cơ bản.</li><li>Nha khoa tổng quát: Trám răng thẩm mỹ, chữa tủy, nhổ răng, điều trị nha chu (viêm nướu, viêm nha chu).</li><li>Thủ thuật: Bóc u nang vùng hàm mặt, phẫu thuật tiền phục hình.</li></ul><b>Quá trình công tác:</b><ul><li>2004 - 2014: Trưởng khoa Phẫu thuật Hàm mặt - Bệnh viện Đa khoa Đà Nẵng, tham gia cấp cứu chấn thương hàm mặt và đào tạo Bác sĩ nội trú.</li><li>2014 - Nay: Giám đốc Chuyên môn Nha khoa Quốc tế Việt Pháp, trực tiếp thực hiện các ca phẫu thuật hàm mặt phức tạp và quản lý chất lượng dịch vụ nha khoa toàn hệ thống.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Răng Hàm Mặt.</li></ul>',
            },
            // 33. Hô hấp
            {
                userId: 35,
                specialtyId: 6, // Hô hấp
                dob: '1990-11-30',
                gender: '0',
                ethnicity: 'Kinh',
                address: '56 Hàng Điếu, Hà Nội',
                degree: 'Thạc sĩ',
                room: '233',
                image: '/uploads/users/doc33.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Nội Hô hấp, chuyên sâu về các bệnh lý phổi kẽ, chẩn đoán và điều trị ung thư phổi giai đoạn sớm. Bác sĩ có kinh nghiệm về nội soi phế quản chẩn đoán và can thiệp, từng tham gia các khóa tu nghiệp ngắn hạn tại Nhật Bản về kỹ thuật nội soi tiên tiến. Bác sĩ luôn đặt mục tiêu chẩn đoán sớm và áp dụng phác đồ điều trị đa mô thức, mang lại hy vọng và chất lượng cuộc sống tốt nhất cho bệnh nhân, đồng thời quản lý các bệnh lý mạn tính như Hen và COPD.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Hô hấp chuyên sâu: Điều trị Viêm phổi, Hen phế quản, COPD, Bệnh phổi kẽ (xơ hóa phổi), Tràn dịch màng phổi.</li><li>Tầm soát và điều trị Ung thư phổi: Chẩn đoán hình ảnh, nội soi phế quản sinh thiết và tư vấn phác đồ hóa/xạ trị, điều trị đích.</li><li>Kỹ thuật chẩn đoán và can thiệp: Thực hiện Nội soi phế quản (ống mềm), chọc hút dịch màng phổi, sinh thiết xuyên thành ngực dưới hướng dẫn siêu âm/CT.</li><li>Quản lý mạn tính: Hướng dẫn bệnh nhân sử dụng thuốc hít, khí dung và phục hồi chức năng hô hấp.</li></ul><b>Quá trình công tác:</b><ul><li>2015 - 2020: Bác sĩ điều trị Bệnh viện Phổi Trung ương, chuyên trách các bệnh lý phổi hiếm, khó, tham gia nghiên cứu về bệnh phổi nghề nghiệp.</li><li>2020 - Nay: Bác sĩ khoa Nội tổng hợp - Bệnh viện Đa khoa Hồng Ngọc, phụ trách chuyên môn Nội Hô hấp, tham gia hội chẩn và đào tạo chuyên sâu.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Nội Hô hấp.</li></ul>',
            },
            // 34. Nội tiết
            {
                userId: 36,
                specialtyId: 7, // Nội tiết
                dob: '1984-02-08',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nam Kỳ Khởi Nghĩa, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ',
                room: '234',
                image: '/uploads/users/doc34.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên gia Nội tiết - Chuyển hóa, chuyên sâu về các bệnh lý tuyến yên, tuyến thượng thận và rối loạn chuyển hóa lipid phức tạp. Bác sĩ có nhiều năm kinh nghiệm giảng dạy và là tác giả của nhiều đầu sách chuyên khảo về Nội tiết học. Bác sĩ tiếp cận bệnh nhân bằng kiến thức sâu rộng và phương pháp điều trị cá nhân hóa, đặc biệt trong các ca rối loạn nội tiết hiếm gặp và khó kiểm soát, đảm bảo cân bằng hormone và chức năng chuyển hóa.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Tuyến giáp và Cận giáp: Điều trị nội khoa các bệnh lý bướu cổ, Basedow (cường giáp), Suy giáp, và tư vấn các vấn đề liên quan đến Ung thư tuyến giáp.</li><li>Rối loạn Nội tiết phức tạp: Chẩn đoán và điều trị bệnh lý tuyến yên (U tuyến yên, đái tháo nhạt), tuyến thượng thận (Cushing, Addison, U tủy thượng thận).</li><li>Rối loạn Chuyển hóa: Quản lý Đái tháo đường, rối loạn chuyển hóa lipid (mỡ máu cao), Gout (rối loạn chuyển hóa purine).</li><li>Thủ thuật: Chọc hút tế bào bằng kim nhỏ (FNA) tuyến giáp dưới hướng dẫn siêu âm.</li></ul><b>Quá trình công tác:</b><ul><li>2009 - 2017: Giảng viên Bộ môn Nội tiết - Đại học Y Dược TP.HCM, tham gia nghiên cứu và đào tạo Bác sĩ, chuyên khoa.</li><li>2017 - Nay: Trưởng phân khoa Tuyến giáp - Bệnh viện Nhân dân 115, phụ trách chẩn đoán và điều trị bệnh lý tuyến giáp chuyên sâu và điều hành phòng khám Nội tiết.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Nội tiết - Chuyển hóa.</li></ul>',
            },
            // 35. Ung bướu -> Gán vào Nội khoa (1)
            {
                userId: 37,
                specialtyId: 1, // Nội khoa (Fallback)
                dob: '1992-04-17',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Bông, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I',
                room: '235',
                image: '/uploads/users/doc35.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Ung bướu, chuyên tầm soát và phát hiện sớm các loại ung thư phổ biến như ung thư vú, ung thư cổ tử cung, ung thư đại trực tràng. Bác sĩ có kinh nghiệm trong việc thực hiện các thủ thuật sinh thiết chẩn đoán và tư vấn các biện pháp phòng ngừa ung thư (tiêm vắc-xin HPV, thay đổi lối sống). Bác sĩ luôn giải thích rõ ràng, chi tiết về tình trạng bệnh, quá trình điều trị và lựa chọn phác đồ phù hợp, giúp bệnh nhân an tâm và chủ động hơn.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Tầm soát Ung thư: Khám và chỉ định các xét nghiệm tầm soát sớm (chụp nhũ ảnh, nội soi, xét nghiệm gen) cho các nhóm nguy cơ cao.</li><li>Ung thư Phụ khoa và Tiêu hóa: Điều trị nội khoa và tư vấn phác đồ cho ung thư vú, cổ tử cung, đại trực tràng, dạ dày.</li><li>Chẩn đoán và Thủ thuật: Thực hiện sinh thiết, chọc hút tế bào (FNA) dưới hướng dẫn siêu âm/CT để chẩn đoán.</li><li>Chăm sóc hậu điều trị: Theo dõi tái khám, quản lý tác dụng phụ lâu dài của hóa/xạ trị, và tư vấn phục hồi chức năng.</li></ul><b>Quá trình công tác:</b><ul><li>2016 - 2021: Bác sĩ khoa Ngoại Ung bướu - Bệnh viện Ung bướu Đà Nẵng, tham gia phẫu thuật và hóa trị cho bệnh nhân nội trú.</li><li>2021 - Nay: Bác sĩ điều trị tại Khoa Ung bướu - Bệnh viện Gia Đình, chuyên trách về tầm soát, chẩn đoán sớm và điều trị nội khoa các khối u.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Ung bướu.</li></ul>',
            },
            // 36. Dinh dưỡng -> Gán vào Nội khoa (1)
            {
                userId: 38,
                specialtyId: 1, // Nội khoa (Fallback)
                dob: '1976-06-25',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Mã, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II',
                room: '236',
                image: '/uploads/users/doc36.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Dinh dưỡng lâm sàng hàng đầu với hơn 20 năm kinh nghiệm. Bác sĩ có thế mạnh trong việc thiết kế thực đơn điều trị cho người bệnh mạn tính (tiểu đường, tim mạch, thận), người sau phẫu thuật và dinh dưỡng học đường. Bác sĩ đã tham gia nhiều chương trình tư vấn sức khỏe trên truyền hình, nổi tiếng với phương pháp tư vấn khoa học, dễ hiểu và thực tế, giúp bệnh nhân và gia đình thay đổi thói quen ăn uống hiệu quả và duy trì kết quả lâu dài.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Dinh dưỡng Nội khoa: Tư vấn chế độ ăn chuyên biệt cho người bệnh tim mạch (tăng huyết áp, suy tim), đái tháo đường, béo phì, và bệnh lý gan thận mạn tính.</li><li>Dinh dưỡng Phục hồi: Thiết kế khẩu phần ăn cho bệnh nhân sau mổ, người gầy yếu, người cần tăng/giảm cân theo tiêu chuẩn y khoa, và vận động viên.</li><li>Dinh dưỡng Nhi khoa: Tư vấn dinh dưỡng cho trẻ phát triển kém, rối loạn tiêu hóa, dị ứng thực phẩm.</li><li>Dinh dưỡng lâm sàng: Quản lý dinh dưỡng qua đường tiêu hóa (ăn sonde) và tĩnh mạch cho bệnh nhân nội trú.</li></ul><b>Quá trình công tác:</b><ul><li>2001 - 2015: Phó khoa Dinh dưỡng lâm sàng - Bệnh viện Bạch Mai, tham gia quản lý dinh dưỡng nội trú, nghiên cứu khoa học và đào tạo.</li><li>2015 - Nay: Giám đốc Trung tâm Dinh dưỡng NutriHome Hà Nội, trực tiếp tư vấn và quản lý chất lượng dịch vụ dinh dưỡng, xây dựng các chương trình can thiệp dinh dưỡng cộng đồng.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Dinh dưỡng.</li></ul>',
            },
            // 37. Tâm lý -> Gán vào Tâm thần (15)
            {
                userId: 39,
                specialtyId: 15, // Tâm thần
                dob: '1988-08-03',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ',
                room: '237',
                image: '/uploads/users/doc37.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Tâm lý học, chuyên gia trị liệu tâm lý trẻ em và vị thành niên. Bác sĩ có kinh nghiệm sâu rộng trong việc đánh giá và can thiệp các vấn đề về rối loạn phát triển (phổ tự kỷ), rối loạn tăng động giảm chú ý (ADHD), khó khăn học tập và các vấn đề hành vi ở tuổi dậy thì. Bác sĩ sử dụng phương pháp chơi trị liệu, trị liệu gia đình và can thiệp hành vi ứng dụng (ABA) để hỗ trợ toàn diện cho trẻ và phụ huynh, giúp trẻ hòa nhập và phát triển tối đa tiềm năng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Tâm lý Trẻ em: Đánh giá và can thiệp rối loạn phổ tự kỷ, ADHD, rối loạn cảm xúc, rối loạn ngôn ngữ.</li><li>Tâm lý Vị thành niên: Tư vấn các vấn đề về khủng hoảng tuổi dậy thì, lo âu xã hội, tự ti, định hướng bản thân, các vấn đề học đường.</li><li>Trị liệu Gia đình: Hướng dẫn phụ huynh cách hỗ trợ con tại nhà, cải thiện mối quan hệ và kỹ năng làm cha mẹ (Parenting skills).</li><li>Phương pháp trị liệu: Chơi trị liệu, Can thiệp Hành vi Ứng dụng (ABA), Liệu pháp nhận thức hành vi cho trẻ (CBT-A).</li></ul><b>Quá trình công tác:</b><ul><li>2013 - 2018: Chuyên viên tâm lý Khoa Tâm lý Bệnh viện Nhi Đồng 1, tham gia chẩn đoán và can thiệp sớm cho trẻ rối loạn phát triển.</li><li>2018 - Nay: Chuyên gia tham vấn Tâm lý học đường - Trường Quốc tế Việt Úc, đồng thời là Giám đốc chuyên môn Trung tâm Trị liệu Tâm lý Nhi NextGen, trực tiếp quản lý các chương trình can thiệp chuyên sâu.</li></ul><b>Quá trình đào tạo:</b><ul><li>Thạc sĩ Tâm lý học (chuyên ngành Tâm lý học lâm sàng).</li></ul>',
            },
            // 38. Dị ứng
            {
                userId: 40,
                specialtyId: 8, // Dị ứng
                dob: '1980-10-12',
                gender: '0',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Tiến sĩ',
                room: '238',
                image: '/uploads/users/doc38.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y khoa, chuyên gia về Dị ứng - Miễn dịch và Hen phế quản. Bác sĩ có nhiều công trình nghiên cứu về dị nguyên (tác nhân gây dị ứng) đường hô hấp và cơ chế miễn dịch của bệnh Hen tại khu vực miền Trung. Bác sĩ chuyên điều trị các ca dị ứng khó, mạn tính và áp dụng các phương pháp chẩn đoán dị nguyên chính xác (Test lẩy da, xét nghiệm IgE đặc hiệu) để xây dựng phác đồ điều trị triệt căn (giải mẫn cảm), giúp bệnh nhân kiểm soát hoàn toàn triệu chứng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Dị ứng: Chẩn đoán và điều trị Hen phế quản (người lớn và trẻ em), Viêm mũi dị ứng, Dị ứng thuốc, Dị ứng côn trùng, Sốc phản vệ.</li><li>Chẩn đoán Dị nguyên: Thực hiện và phân tích các xét nghiệm dị ứng chuyên sâu (Test lẩy da, IgE đặc hiệu, Test kích thích).</li><li>Liệu pháp Miễn dịch: Thực hiện liệu pháp Giải mẫn cảm đặc hiệu với dị nguyên (ASIT/SLIT) cho Hen và Viêm mũi dị ứng.</li><li>Miễn dịch: Điều trị và tư vấn các bệnh lý rối loạn miễn dịch cơ bản và bệnh tự miễn.</li></ul><b>Quá trình công tác:</b><ul><li>2005 - 2015: Bác sĩ điều trị Bệnh viện Trung ương Huế, chuyên trách khoa Nội Hô hấp - Dị ứng, tham gia đào tạo Bác sĩ chuyên khoa.</li><li>2015 - Nay: Trưởng khoa Nội Tổng hợp - Bệnh viện Đa khoa Quốc tế Vinmec Đà Nẵng, phụ trách chuyên môn về Nội khoa và Dị ứng - Miễn dịch, đồng thời là cố vấn cấp cao về Hen phế quản.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Dị ứng - Miễn dịch lâm sàng.</li></ul>',
            },
            // 39. Lão khoa
            {
                userId: 41,
                specialtyId: 9, // Lão khoa
                dob: '1991-12-20',
                gender: '0',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I',
                room: '239',
                image: '/uploads/users/doc39.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Lão khoa, nổi tiếng với sự ân cần, chu đáo và kinh nghiệm trong việc quản lý đa bệnh lý ở người cao tuổi. Bác sĩ chuyên điều trị các bệnh lý mạn tính như tăng huyết áp, đái tháo đường, loãng xương, Parkinson, và các rối loạn tâm thần kinh tuổi già (mất ngủ, rối loạn lo âu). Bác sĩ có kinh nghiệm làm việc trong môi trường dưỡng lão, hiểu rõ nhu cầu chăm sóc toàn diện và tâm lý cho người lớn tuổi, giúp họ duy trì chất lượng cuộc sống độc lập.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Quản lý đa bệnh lý Lão khoa: Lên kế hoạch điều trị tổng thể cho người cao tuổi có nhiều bệnh nền, tối ưu hóa đơn thuốc để tránh tương tác thuốc.</li><li>Bệnh lý Thần kinh Lão khoa: Chẩn đoán và điều trị Parkinson, sa sút trí tuệ giai đoạn nhẹ/trung bình, rối loạn giấc ngủ, suy nhược thần kinh.</li><li>Phục hồi và Chăm sóc Giảm nhẹ: Tư vấn vật lý trị liệu, phục hồi chức năng vận động, và hỗ trợ chăm sóc cho bệnh nhân giai đoạn cuối, bệnh nhân nằm lâu.</li><li>Dự phòng: Tầm soát nguy cơ té ngã, dinh dưỡng, và tiêm chủng cho người cao tuổi.</li></ul><b>Quá trình công tác:</b><ul><li>2015 - 2019: Bác sĩ nội trú và điều trị Bệnh viện Lão khoa Trung ương, tham gia các hoạt động nghiên cứu về chất lượng cuộc sống người cao tuổi và các bệnh lý phức tạp.</li><li>2019 - Nay: Bác sĩ điều trị và tư vấn y tế tại Viện Dưỡng lão Tuyết Thái, chuyên trách chăm sóc sức khỏe toàn diện cho người lớn tuổi nội trú và quản lý các hồ sơ bệnh án phức tạp.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Lão khoa.</li></ul>',
            },
            // 40. Sản Phụ khoa -> Gán vào Nội khoa (1)
            {
                userId: 42,
                specialtyId: 1, // Nội khoa (Fallback)
                dob: '1983-02-28',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II',
                room: '240',
                image: '/uploads/users/doc40.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Sản Phụ khoa, chuyên gia phẫu thuật nội soi phụ khoa hàng đầu tại TP.HCM. Bác sĩ có tay nghề cao trong các ca phẫu thuật ít xâm lấn điều trị u xơ tử cung, u nang buồng trứng, lạc nội mạc tử cung và chửa ngoài tử cung. Bác sĩ nổi tiếng với kỹ thuật phẫu thuật tinh tế, vết mổ thẩm mỹ và thời gian hồi phục nhanh chóng cho bệnh nhân. Bác sĩ luôn ưu tiên giải pháp bảo tồn tối đa chức năng sinh sản cho phụ nữ trẻ.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Phẫu thuật Nội soi Phụ khoa: Thực hiện phẫu thuật nội soi cắt u xơ tử cung, bóc u nang buồng trứng, điều trị lạc nội mạc tử cung, chửa ngoài tử cung.</li><li>Phụ khoa Ngoại khoa: Phẫu thuật mổ mở (khi cần) các khối u lớn, phẫu thuật tạo hình âm đạo, cổ tử cung.</li><li>Phụ khoa tổng quát: Khám và điều trị các bệnh lý phụ khoa mạn tính, rối loạn kinh nguyệt, tầm soát ung thư.</li><li>Sản khoa: Tư vấn trước khi mang thai, quản lý thai kỳ cơ bản, xử lý các bệnh lý phụ khoa trong thai kỳ.</li></ul><b>Quá trình công tác:</b><ul><li>2008 - 2018: Bác sĩ khoa Phẫu thuật Nội soi - Bệnh viện Từ Dũ, thực hiện hàng nghìn ca phẫu thuật nội soi phức tạp, tham gia giảng dạy kỹ thuật nội soi.</li><li>2018 - Nay: Trưởng khoa Phụ sản - Bệnh viện Quốc tế City, phụ trách chuyên môn phẫu thuật phụ khoa, quản lý chất lượng chuyên khoa và áp dụng các kỹ thuật phẫu thuật tiên tiến.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Sản Phụ khoa.</li></ul>',
            },
            // 41. Truyền nhiễm
            {
                userId: 43,
                specialtyId: 10, // Truyền nhiễm
                dob: '1989-05-07',
                gender: '1',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Thạc sĩ',
                room: '241',
                image: '/uploads/users/doc41.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Bệnh Nhiệt đới, chuyên điều trị các bệnh truyền nhiễm nhiệt đới, các bệnh lây truyền qua đường tình dục và quản lý bệnh nhân HIV/AIDS. Bác sĩ có kinh nghiệm tư vấn và chỉ định phác đồ điều trị dự phòng lây nhiễm (PrEP, PEP). Bác sĩ còn có vai trò quan trọng trong việc tư vấn tiêm chủng vắc xin phòng bệnh, giúp bệnh nhân và cộng đồng nâng cao khả năng miễn dịch. Bác sĩ cam kết giữ bí mật thông tin tuyệt đối cho các trường hợp nhạy cảm.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh truyền nhiễm: Điều trị các bệnh do virus, vi khuẩn, ký sinh trùng (sốt xuất huyết, tay chân miệng, nhiễm khuẩn hô hấp/tiêu hóa) và các bệnh nhiệt đới đặc thù vùng miền.</li><li>HIV/AIDS và Dự phòng lây nhiễm: Tư vấn dự phòng lây nhiễm (PrEP, PEP), quản lý và điều trị thuốc ARV (thuốc kháng virus) cho bệnh nhân HIV/AIDS.</li><li>Bệnh lây truyền qua đường tình dục (STIs): Chẩn đoán và điều trị giang mai, lậu, sùi mào gà, Herpes sinh dục.</li><li>Tư vấn Tiêm chủng: Lên lịch và chỉ định vắc xin cho trẻ em và người lớn, đặc biệt là các vắc-xin du lịch.</li></ul><b>Quá trình công tác:</b><ul><li>2014 - 2019: Bác sĩ tại Trung tâm Y tế Dự phòng Đà Nẵng, tham gia phòng chống dịch bệnh và tiêm chủng cộng đồng, quản lý hồ sơ bệnh nhân STIs.</li><li>2019 - Nay: Bác sĩ khoa Truyền nhiễm - Bệnh viện Đa khoa Đà Nẵng, chuyên trách điều trị các bệnh truyền nhiễm nặng và khó, tư vấn các vấn đề sức khỏe cộng đồng.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Bệnh Nhiệt đới.</li></ul>',
            },
            // 42. Tiết niệu -> Gán vào Nội khoa (1)
            {
                userId: 44,
                specialtyId: 1, // Nội khoa (Fallback)
                dob: '1977-07-16',
                gender: '0',
                ethnicity: 'Kinh',
                address: '56 Hàng Điếu, Hà Nội',
                degree: 'Tiến sĩ',
                room: '242',
                image: '/uploads/users/doc42.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên khoa Thận - Tiết niệu. Bác sĩ là chuyên gia hàng đầu về phẫu thuật tán sỏi nội soi ít xâm lấn (tán sỏi qua da, tán sỏi nội soi ngược dòng bằng Laser). Bác sĩ đã thực hiện thành công hàng nghìn ca tán sỏi, giúp bệnh nhân hồi phục nhanh và giảm đau tối đa. Bác sĩ còn có kinh nghiệm sâu rộng trong điều trị nội khoa các bệnh lý thận mạn tính và u bướu đường tiết niệu.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Tán sỏi Tiết niệu: Thực hiện các kỹ thuật tán sỏi ngoài cơ thể (ESWL), tán sỏi nội soi niệu quản/thận bằng Laser, tán sỏi qua da (PCNL).</li><li>Ngoại khoa Tiết niệu: Phẫu thuật nội soi điều trị u phì đại tiền liệt tuyến (cắt đốt nội soi), điều trị u bàng quang, bướu đường tiết niệu.</li><li>Nội khoa Thận: Điều trị suy thận cấp/mạn, viêm đường tiết niệu tái phát, theo dõi bệnh thận đa nang.</li><li>Nam khoa ngoại khoa: Điều trị các vấn đề ngoại khoa tiết niệu ở nam giới.</li></ul><b>Quá trình công tác:</b><ul><li>2003 - 2013: Bác sĩ khoa Ngoại Tiết niệu - Bệnh viện Xanh Pôn, tham gia phẫu thuật, cấp cứu tiết niệu và đào tạo chuyên môn.</li><li>2013 - Nay: Phó Giám đốc Trung tâm Kỹ thuật cao và Tiêu hóa Hà Nội, chuyên trách về phẫu thuật can thiệp Tiết niệu và phát triển công nghệ tán sỏi mới, áp dụng các tiến bộ kỹ thuật hiện đại.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Ngoại Tiết niệu.</li></ul>',
            },
            // 43. Gan mật -> Gán vào Tiêu hóa (12)
            {
                userId: 45,
                specialtyId: 12, // Tiêu hóa
                dob: '1990-09-24',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nam Kỳ Khởi Nghĩa, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I',
                room: '243',
                image: '/uploads/users/doc43.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Gan mật, được đào tạo chuyên sâu về chẩn đoán, theo dõi và điều trị các bệnh lý viêm gan virus mạn tính (Viêm gan B, C), xơ gan mất bù. Bác sĩ luôn cập nhật các phác đồ điều trị kháng virus mới nhất theo chuẩn quốc tế, giúp bệnh nhân kiểm soát virus hiệu quả và giảm nguy cơ ung thư gan. Bác sĩ luôn tư vấn chi tiết về xét nghiệm, tiên lượng và kế hoạch điều trị lâu dài, kết hợp tư vấn dinh dưỡng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Viêm gan virus: Chẩn đoán, điều trị và theo dõi viêm gan B, C mạn tính, chỉ định và quản lý thuốc kháng virus thế hệ mới.</li><li>Xơ gan: Quản lý xơ gan, biến chứng xơ gan (cổ trướng, xuất huyết tiêu hóa, bệnh não gan), dự phòng ung thư gan.</li><li>Tầm soát Gan mật: Siêu âm đàn hồi mô gan (Fibroscan), tầm soát ung thư gan định kỳ (AFP, CT/MRI), sinh thiết gan.</li><li>Bệnh lý tiêu hóa cơ bản: Điều trị viêm dạ dày, trào ngược, hội chứng ruột kích thích.</li></ul><b>Quá trình công tác:</b><ul><li>2015 - 2020: Bác sĩ khoa Nội Tiêu hóa Gan mật - Bệnh viện Gia Định, tham gia điều trị nội trú các ca bệnh nặng và cấp cứu tiêu hóa.</li><li>2020 - Nay: Bác sĩ điều trị tại Phòng khám Đa khoa Quốc tế Yersin, chuyên sâu về quản lý ngoại trú các bệnh Gan mạn tính, tư vấn dinh dưỡng và theo dõi sau điều trị kháng virus.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Gan mật.</li></ul>',
            },
            // 44. Huyết học -> Gán vào Nội khoa (1)
            {
                userId: 46,
                specialtyId: 1, // Nội khoa (Fallback)
                dob: '1982-11-02',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Bông, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II',
                room: '244',
                image: '/uploads/users/doc44.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Huyết học, chuyên gia về rối loạn đông máu và các biến chứng huyết học liên quan đến thai kỳ. Bác sĩ có kinh nghiệm sâu rộng trong chẩn đoán và điều trị các bệnh lý tăng đông (huyết khối tĩnh mạch), chảy máu bất thường (Hemophilia), và các bệnh lý tăng sinh tủy. Bác sĩ còn tham gia quản lý các ca bệnh cần truyền máu đặc biệt và tư vấn an toàn truyền máu trong Sản khoa và Phẫu thuật.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Đông máu - Cầm máu: Chẩn đoán và điều trị bệnh Hemophilia, các rối loạn tăng đông (huyết khối tĩnh mạch), quản lý kháng đông dài hạn.</li><li>Huyết học Sản khoa: Quản lý thiếu máu, rối loạn đông máu trong thai kỳ và sau sinh, tư vấn sàng lọc di truyền Thalassemia.</li><li>Xét nghiệm chuyên sâu: Đọc và phân tích kết quả tủy đồ, sinh thiết tủy xương, các xét nghiệm miễn dịch huyết học.</li><li>Bệnh lý Tăng sinh tủy: Chẩn đoán và theo dõi bệnh Bạch cầu mạn, Đa hồng cầu vô căn.</li></ul><b>Quá trình công tác:</b><ul><li>2007 - 2016: Bác sĩ khoa Huyết học - Bệnh viện Đa khoa Đà Nẵng, tham gia trực cấp cứu và điều trị nội trú, là bác sĩ chủ lực trong các ca truyền máu phức tạp.</li><li>2016 - Nay: Trưởng khoa Xét nghiệm Huyết học - Bệnh viện Phụ nữ Đà Nẵng, chuyên trách về huyết học thai kỳ, sàng lọc máu an toàn và phát triển các quy trình xét nghiệm tiên tiến.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Huyết học.</li></ul>',
            },
            // 45. Phục hồi chức năng -> Gán vào Chấn thương chỉnh hình (13)
            {
                userId: 47,
                specialtyId: 13, // Chấn thương chỉnh hình (Phục hồi chức năng)
                dob: '1988-01-11',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Mã, Hà Nội',
                degree: 'Thạc sĩ',
                room: '245',
                image: '/uploads/users/doc45.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ chuyên ngành Phục hồi chức năng, chuyên gia trị liệu ngôn ngữ và phục hồi chức năng Thần kinh. Bác sĩ có kinh nghiệm sâu trong việc can thiệp cho trẻ chậm nói, rối loạn giao tiếp, và phục hồi chức năng vận động toàn diện cho bệnh nhân sau đột quỵ (tai biến mạch máu não). Bác sĩ luôn thiết kế chương trình trị liệu cá nhân hóa, kết hợp các bài tập hiện đại (robot, điện trị liệu) để tối ưu hóa khả năng hồi phục của người bệnh và cải thiện chất lượng cuộc sống lâu dài.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Phục hồi chức năng Nhi: Can thiệp vận động cho trẻ bại não, trị liệu ngôn ngữ cho trẻ chậm nói, rối loạn phát triển, rối loạn nuốt.</li><li>Phục hồi chức năng Thần kinh: Phục hồi vận động, thăng bằng sau đột quỵ, chấn thương sọ não, bệnh Parkinson.</li><li>Vật lý trị liệu chuyên sâu: Các kỹ thuật trị liệu bằng tay (manual therapy), điện trị liệu, thủy trị liệu, trị liệu bằng robot.</li><li>Chỉnh hình và Dụng cụ: Tư vấn và thiết kế dụng cụ chỉnh hình (nẹp, giày chỉnh hình) cho bệnh nhân.</li></ul><b>Quá trình công tác:</b><ul><li>2013 - 2018: Bác sĩ tại Trung tâm Phục hồi chức năng Bệnh viện Nhi Trung ương, chuyên trách về can thiệp cho trẻ có rối loạn phát triển và bại não.</li><li>2018 - Nay: Phó khoa Phục hồi chức năng - Bệnh viện Đa khoa Quốc tế Vinmec, phụ trách chuyên môn về phục hồi chức năng Thần kinh - Nhi khoa và quản lý các chương trình trị liệu toàn diện.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Phục hồi chức năng.</li></ul>',
            },
            // 46. Cơ Xương Khớp -> Gán vào Chấn thương chỉnh hình (13)
            {
                userId: 48,
                specialtyId: 13, // Chấn thương chỉnh hình
                dob: '1980-03-19',
                gender: '1',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ',
                room: '246',
                image: '/uploads/users/doc46.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên ngành Nội Cơ Xương Khớp, với hơn 20 năm kinh nghiệm. Bác sĩ là chuyên gia hàng đầu về các bệnh lý khớp tự miễn (Lupus ban đỏ hệ thống, Viêm khớp dạng thấp, Viêm cột sống dính khớp) và các bệnh lý mô mềm. Bác sĩ thường xuyên tham gia báo cáo tại các hội nghị Thấp khớp học quốc tế, áp dụng các liệu pháp sinh học và điều trị đích tiên tiến. Bác sĩ luôn nhấn mạnh tầm quan trọng của chẩn đoán sớm và điều trị tích cực để bảo tồn chức năng khớp, ngăn ngừa tàn phế.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Tự miễn và Viêm khớp: Chẩn đoán và điều trị Viêm khớp dạng thấp, Lupus ban đỏ hệ thống, Viêm cột sống dính khớp, Xơ cứng bì, Viêm đa cơ.</li><li>Bệnh lý thoái hóa và chuyển hóa: Thoái hóa khớp, Gút, Loãng xương.</li><li>Liệu pháp chuyên sâu: Chỉ định và quản lý các liệu pháp sinh học (Biologics), thuốc điều trị đích (Targeted therapy) cho bệnh tự miễn.</li><li>Thủ thuật: Tiêm khớp, tiêm gân và mô mềm dưới hướng dẫn siêu âm (đảm bảo độ chính xác cao).</li></ul><b>Quá trình công tác:</b><ul><li>2005 - 2015: Bác sĩ khoa Nội Cơ Xương Khớp - Bệnh viện Chợ Rẫy, tham gia các nghiên cứu lâm sàng về thuốc sinh học, trực tiếp điều trị các ca tự miễn nặng.</li><li>2015 - Nay: Trưởng khoa Khớp - Bệnh viện Đại học Y Dược TP.HCM Cơ sở 2, phụ trách chuyên môn, đào tạo Bác sĩ chuyên khoa và phát triển các chương trình tầm soát bệnh lý thấp khớp.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Nội Cơ Xương Khớp.</li></ul>',
            },
            // 47. Thần kinh
            {
                userId: 49,
                specialtyId: 11, // Thần kinh
                dob: '1991-05-28',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I',
                room: '247',
                image: '/uploads/users/doc47.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Nội Thần kinh, chuyên điều trị các rối loạn giấc ngủ, suy nhược thần kinh, rối loạn lo âu và các bệnh lý thần kinh ngoại biên (viêm đa dây thần kinh, đau thần kinh tọa). Bác sĩ luôn tiếp cận bệnh nhân một cách toàn diện, tư vấn kỹ càng về nguyên nhân gây bệnh, kết hợp thuốc và các liệu pháp thư giãn, điều chỉnh thói quen sinh hoạt để điều trị hiệu quả và bền vững, giúp cải thiện chất lượng giấc ngủ và tâm trạng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Rối loạn Thần kinh chức năng: Điều trị mất ngủ (cấp và mạn tính), đau đầu căng thẳng, chóng mặt, rối loạn lo âu và trầm cảm liên quan đến thần kinh.</li><li>Bệnh lý Thần kinh ngoại biên: Viêm dây thần kinh, bệnh lý rễ thần kinh, đau thần kinh sau zona, hội chứng ống cổ tay.</li><li>Thăm dò chức năng: Thực hiện và đọc kết quả Điện não đồ, Điện cơ (EMG), Tiềm năng gợi cảm giác (SEP).</li><li>Hỗ trợ tâm lý: Tư vấn tâm lý cơ bản và kỹ thuật thư giãn cho bệnh nhân có các vấn đề về sức khỏe tinh thần liên quan đến bệnh lý thần kinh.</li></ul><b>Quá trình công tác:</b><ul><li>2016 - 2020: Bác sĩ điều trị tại Bệnh viện Tâm thần Đà Nẵng, tham gia quản lý bệnh nhân có rối loạn lo âu, trầm cảm và các vấn đề giấc ngủ phức tạp.</li><li>2020 - Nay: Bác sĩ Phòng khám Thần kinh - Bệnh viện Đa khoa Gia Đình, chuyên trách điều trị ngoại trú các bệnh lý Thần kinh phổ biến và tư vấn phòng ngừa đột quỵ.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Nội Thần kinh.</li></ul>',
            },
            // 48. Tiêu hóa
            {
                userId: 50,
                specialtyId: 12, // Tiêu hóa
                dob: '1983-08-05',
                gender: '1',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II',
                room: '248',
                image: '/uploads/users/doc48.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Tiêu hóa, chuyên gia trong chẩn đoán và điều trị các bệnh lý phổ biến như viêm loét dạ dày tá tràng, trào ngược dạ dày thực quản (GERD) và hội chứng ruột kích thích (IBS). Bác sĩ có kinh nghiệm sâu về điều trị vi khuẩn HP kháng thuốc, sử dụng các phác đồ điều trị cá thể hóa và tiên tiến. Bác sĩ luôn kết hợp điều trị nội khoa với tư vấn dinh dưỡng chuyên sâu để đạt hiệu quả điều trị tối ưu, ngăn ngừa tái phát và biến chứng.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Bệnh lý Dạ dày - Thực quản: Điều trị viêm loét, GERD, theo dõi Barrett thực quản, xử lý vi khuẩn HP kháng thuốc.</li><li>Bệnh lý Ruột mạn tính: Điều trị IBS, viêm đại tràng, bệnh Crohn, Colitis Ulcerosa.</li><li>Nội soi Tiêu hóa: Thực hiện nội soi chẩn đoán và can thiệp cơ bản (cắt polyp, sinh thiết, nong hẹp).</li><li>Chẩn đoán chuyên sâu: Thực hiện và phân tích nghiệm pháp thở C13, đo áp lực thực quản, pH-metry 24h.</li></ul><b>Quá trình công tác:</b><ul><li>2008 - 2018: Bác sĩ khoa Tiêu hóa - Bệnh viện Bạch Mai, tham gia nghiên cứu về vi khuẩn HP và kháng thuốc, trực tiếp điều trị nội trú các ca bệnh phức tạp.</li><li>2018 - Nay: Phó khoa Nội Tiêu hóa - Bệnh viện Đa khoa Tâm Anh Hà Nội, phụ trách chuyên môn về điều trị các bệnh lý Tiêu hóa mạn tính, hội chẩn và đào tạo chuyên sâu.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Tiêu hóa.</li></ul>',
            },
            // 49. Tim mạch
            {
                userId: 51,
                specialtyId: 2, // Tim mạch
                dob: '1989-10-14',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ',
                room: '249',
                image: '/uploads/users/doc49.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Tim mạch, chuyên gia về chẩn đoán chức năng tim (siêu âm tim gắng sức, Holter điện tâm đồ). Bác sĩ có kinh nghiệm tầm soát sớm bệnh lý mạch vành, suy tim và rối loạn nhịp tim ở các đối tượng có nguy cơ cao, đặc biệt là người trẻ tuổi. Bác sĩ luôn cung cấp thông tin rõ ràng, dễ hiểu về tình trạng tim mạch và đề xuất kế hoạch điều trị, dự phòng phù hợp với lối sống của từng bệnh nhân, giúp họ chủ động bảo vệ sức khỏe tim mạch.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nội Tim mạch tổng quát: Điều trị Tăng huyết áp, rối loạn mỡ máu, bệnh tim thiếu máu cục bộ, và suy tim giai đoạn sớm.</li><li>Chẩn đoán chức năng không xâm lấn: Thực hiện và phân tích Siêu âm tim Doppler, siêu âm tim gắng sức bằng Dobutamine, nghiệm pháp gắng sức bằng thảm lăn.</li><li>Dự phòng Tim mạch: Tư vấn cai thuốc lá, chế độ ăn kiêng, luyện tập và quản lý các yếu tố nguy cơ (tiểu đường, béo phì) để dự phòng biến cố tim mạch.</li><li>Rối loạn nhịp tim: Chẩn đoán và quản lý rối loạn nhịp tim ngoại trú (Ngoại tâm thu, rung nhĩ).</li></ul><b>Quá trình công tác:</b><ul><li>2014 - 2019: Bác sĩ điều trị tại Viện Tim TP.HCM, tham gia chẩn đoán và theo dõi bệnh nhân sau can thiệp, trực cấp cứu nội khoa.</li><li>2019 - Nay: Bác sĩ Tim mạch - Phòng khám Đa khoa Victoria Healthcare, chuyên trách về chẩn đoán không xâm lấn, tầm soát sớm và tư vấn chuyên sâu về lối sống tim mạch.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Tim mạch.</li></ul>',
            },
            // 50. Nội khoa
            {
                userId: 52,
                specialtyId: 1, // Nội khoa
                dob: '1977-12-22',
                gender: '0',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Tiến sĩ',
                room: '250',
                image: '/uploads/users/doc50.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Nội khoa, chuyên gia về điều trị nội khoa và quản lý các bệnh lý mạn tính phức tạp. Bác sĩ có nhiều năm tu nghiệp và công tác tại các bệnh viện lớn ở nước ngoài (ví dụ: Singapore General Hospital), mang về Việt Nam các phác đồ điều trị tiên tiến nhất. Bác sĩ hiện là Giám đốc chuyên môn, chịu trách nhiệm hội chẩn các ca bệnh nội khoa khó, đòi hỏi chẩn đoán chính xác và phối hợp đa chuyên khoa.',
                workExperience:
                    '<b>Chuyên môn:</b><ul><li>Nội khoa Ung bướu: Tư vấn và điều trị nội khoa ung thư (Hóa trị, Liệu pháp miễn dịch), chăm sóc giảm nhẹ, kiểm soát triệu chứng và quản lý di căn.</li><li>Nội khoa Tổng quát: Chẩn đoán, điều trị và quản lý các bệnh lý mạn tính (Tim mạch, Nội tiết, Hô hấp), rối loạn chuyển hóa và các bệnh lý tự miễn.</li><li>Bệnh lý Viêm nhiễm: Điều trị các bệnh lý nhiễm trùng phức tạp, sử dụng liệu pháp kháng sinh chuyên sâu và kiểm soát nhiễm khuẩn.</li><li>Thăm dò chức năng: Chỉ định và phân tích các xét nghiệm chuyên sâu, chẩn đoán hình ảnh để xác định nguyên nhân bệnh lý.</li></ul><b>Quá trình công tác:</b><ul><li>2002 - 2012: Tu nghiệp và làm việc tại Singapore General Hospital (SGH), tham gia nghiên cứu và điều trị lâm sàng các bệnh lý Nội khoa chuyên sâu.</li><li>2012 - Nay: Giám đốc chuyên môn, trực tiếp điều hành, cố vấn các ca bệnh nội khoa phức tạp và phát triển chuyên ngành Nội khoa khu vực.</li></ul><b>Quá trình đào tạo:</b><ul><li>Tiến sĩ Y học chuyên ngành Nội khoa.</li></ul>',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Doctors', null, {});
    },
};
