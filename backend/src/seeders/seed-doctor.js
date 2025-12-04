'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Doctors', [
            {
                userId: 3,
                specialtyId: 1,
                dob: '1985-05-15',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Lợi, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ - Tim mạch',
                room: '201',
                image: '/uploads/users/doc1.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Chuyên gia Tim mạch can thiệp với hơn 15 năm kinh nghiệm. Bác sĩ có khả năng thực hiện các kỹ thuật đặt stent mạch vành phức tạp, siêu âm tim qua thực quản và điện sinh lý tim. Từng tu nghiệp chuyên sâu tại Pháp, Bác sĩ luôn ưu tiên phương pháp điều trị toàn diện, kết hợp thuốc, can thiệp và tư vấn lối sống để tối ưu hóa hiệu quả phòng ngừa bệnh tim tái phát. Bác sĩ là thành viên của Hội Tim mạch Việt Nam và Hiệp hội Tim mạch can thiệp Châu Á - Thái Bình Dương (APSC).',
                workExperience:
                    'Chuyên môn:\n- Nội Tim mạch tổng quát: Tăng huyết áp, suy tim, bệnh van tim, rối loạn mỡ máu.\n- Tim mạch can thiệp: Đặt stent mạch vành, chụp mạch vành, điều trị rối loạn nhịp tim bằng triệt đốt (ablation).\n- Chẩn đoán hình ảnh tim mạch: Siêu âm tim gắng sức, Holter ECG 24h.\n\nQuá trình công tác:\n- 2010 - 2016: Bác sĩ điều trị tại Viện Tim TP.HCM.\n- 2016 - 2020: Phó khoa Nội Tim mạch - Bệnh viện Nhân dân 115.\n- 2020 - Nay: Trưởng khoa Tim mạch tại Phòng khám Đa khoa Quốc tế Care.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa tại Đại học Y Dược TP.HCM.\n- Thạc sĩ Y học chuyên ngành Tim mạch.\n- Tu nghiệp chuyên sâu về Tim mạch can thiệp tại Pháp (Paris Diderot University).'
            },
            {
                userId: 4,
                specialtyId: 2,
                dob: '1978-11-22',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Nguyễn Huệ, Đà Nẵng',
                degree: 'Tiến sĩ - Nhi khoa',
                room: '202',
                image: '/uploads/users/doc2.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, Chuyên gia đầu ngành trong lĩnh vực Nhi khoa tổng quát và Dinh dưỡng nhi, với hơn 20 năm kinh nghiệm. Bác sĩ đã chủ nhiệm nhiều đề tài nghiên cứu khoa học cấp nhà nước về sự phát triển thể chất, miễn dịch và dinh dưỡng ở trẻ em Việt Nam. Phương châm điều trị là sử dụng kháng sinh hợp lý, tập trung vào tăng cường sức đề kháng và tư vấn toàn diện về nuôi dưỡng trẻ. Bác sĩ là thành viên của Hội Nhi khoa Việt Nam và Hiệp hội Dinh dưỡng Nhi khoa Quốc tế (ESPGHAN).',
                workExperience:
                    'Chuyên môn:\n- Nhi khoa tổng quát: Khám và điều trị các bệnh hô hấp, tiêu hóa, truyền nhiễm thường gặp ở trẻ em.\n- Dinh dưỡng Nhi khoa: Tư vấn dinh dưỡng cho trẻ biếng ăn, suy dinh dưỡng, béo phì, và dị ứng thực phẩm.\n- Tiêm chủng và Tăng trưởng: Khám sức khỏe định kỳ, theo dõi sự phát triển thể chất và tinh thần của trẻ.\n\nQuá trình công tác:\n- 2003 - 2010: Bác sĩ nội trú và điều trị tại Bệnh viện Nhi Trung ương.\n- 2010 - 2018: Giảng viên Bộ môn Nhi - Đại học Y Dược Đà Nẵng, kiêm nhiệm Phó khoa Nội Nhi.\n- 2018 - Nay: Giám đốc Chuyên môn Trung tâm Nhi khoa CarePlus Đà Nẵng, chịu trách nhiệm xây dựng phác đồ điều trị.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Nội trú chuyên ngành Nhi khoa.\n- Tiến sĩ Y học chuyên ngành Nhi khoa - Đại học Y Hà Nội.'
            },
            {
                userId: 5,
                specialtyId: 3,
                dob: '1990-03-10',
                gender: '0',
                ethnicity: 'Kinh',
                address: '89 Trần Phú, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I - Da liễu',
                room: '203',
                image: '/uploads/users/doc3.webp',
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Da liễu thẩm mỹ, được đào tạo chuyên sâu về Laser thẩm mỹ và ứng dụng công nghệ cao trong điều trị da liễu. Với thế mạnh đặc biệt trong việc xử lý các tình trạng mụn trứng cá nặng, sẹo rỗ, nám, tàn nhang và trẻ hóa da không phẫu thuật. Bác sĩ thường xuyên tham gia các khóa huấn luyện nâng cao tại Hàn Quốc và Mỹ, đảm bảo áp dụng các phác đồ điều trị tiên tiến nhất và cá thể hóa cho từng bệnh nhân.',
                workExperience:
                    'Chuyên môn:\n- Da liễu lâm sàng: Điều trị mụn, viêm da cơ địa, chàm, nấm, bệnh lây truyền qua đường tình dục.\n- Da liễu thẩm mỹ: Điều trị sẹo rỗ, nám, tàn nhang bằng Laser và công nghệ cao (IPL, RF).\n- Tiêm thẩm mỹ: Filler, Botox, căng chỉ (Có chứng chỉ hành nghề).\n\nQuá trình công tác:\n- 2014 - 2018: Bác sĩ Da liễu điều trị tại Bệnh viện Da liễu Trung ương, phụ trách phòng Laser.\n- 2018 - Nay: Bác sĩ chính tại Khoa Thẩm mỹ da - Bệnh viện Đa khoa Quốc tế Thu Cúc, đồng thời là cố vấn chuyên môn tại một số clinic uy tín.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Da liễu.\n- Chứng chỉ chuyên sâu về Laser và Thẩm mỹ Nội khoa (Hoa Kỳ, Hàn Quốc).'
            },
            {
                userId: 6,
                specialtyId: 4,
                dob: '1982-07-18',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Phạm Ngọc Thạch, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II - Tai mũi họng',
                room: '204',
                image: '/uploads/users/doc4.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II, chuyên gia có kinh nghiệm lâu năm trong lĩnh vực Tai Mũi Họng. Đặc biệt thành thạo trong phẫu thuật nội soi mũi xoang, điều trị các bệnh lý viêm xoang mạn tính, polyp mũi và các bệnh về thanh quản. Bác sĩ nổi tiếng với kỹ thuật khám bệnh nhẹ nhàng, chính xác và thái độ ân cần, giúp bệnh nhân giảm bớt lo lắng. Bác sĩ luôn tìm kiếm các giải pháp ít xâm lấn và hiệu quả nhất.',
                workExperience:
                    'Chuyên môn:\n- Tai Mũi Họng tổng quát: Điều trị viêm họng, viêm amidan, viêm tai giữa, viêm xoang.\n- Phẫu thuật nội soi: Cắt amidan, nạo VA, phẫu thuật nội soi mũi xoang chức năng (FESS).\n- Bệnh lý chuyên sâu: Khám và điều trị các bệnh lý thanh quản, giọng nói, khối u vùng đầu cổ.\n\nQuá trình công tác:\n- 2008 - 2015: Bác sĩ điều trị khoa Tai Mũi Họng - Bệnh viện Tai Mũi Họng TP.HCM, tham gia các ca phẫu thuật phức tạp.\n- 2015 - Nay: Trưởng đơn vị Tai Mũi Họng tại Bệnh viện Đại học Y Dược TP.HCM, phụ trách đào tạo và nghiên cứu khoa học.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Tai Mũi Họng.\n- Đào tạo liên tục và có chứng chỉ chuyên sâu về Phẫu thuật Nội soi Mũi Xoang.'
            },
            {
                userId: 7,
                specialtyId: 5,
                dob: '1988-09-25',
                gender: '0',
                ethnicity: 'Kinh',
                address: '34 Lê Duẩn, Đà Nẵng',
                degree: 'Thạc sĩ - Mắt',
                room: '205',
                image: '/uploads/users/doc5.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Nhãn khoa, chuyên gia phẫu thuật Phaco điều trị đục thủy tinh thể và phẫu thuật điều trị tật khúc xạ (Lasik, Relex Smile). Với kinh nghiệm đã thực hiện thành công hơn 3000 ca phẫu thuật, Bác sĩ được đánh giá cao về độ chính xác và an toàn. Bác sĩ còn có niềm đam mê đặc biệt với các hoạt động cộng đồng, thường xuyên tham gia các chương trình mổ mắt từ thiện, mang lại ánh sáng cho người nghèo tại các tỉnh miền Trung.',
                workExperience:
                    'Chuyên môn:\n- Phẫu thuật: Phẫu thuật Phaco điều trị đục thủy tinh thể, phẫu thuật khúc xạ (Lasik, Epi-Lasik).\n- Khám và điều trị: Bệnh lý võng mạc tiểu đường, tăng nhãn áp (Glaucoma), và các bệnh lý bề mặt nhãn cầu.\n- Nhãn khoa tổng quát: Tầm soát và điều trị các vấn đề về thị lực cho mọi lứa tuổi.\n\nQuá trình công tác:\n- 2013 - 2019: Bác sĩ điều trị tại Bệnh viện Mắt Đà Nẵng, phụ trách phòng mổ Phaco và Khúc xạ.\n- 2019 - Nay: Phó khoa Khám bệnh - Bệnh viện Mắt Quốc tế Hoàn Mỹ, chuyên trách các ca phẫu thuật phức tạp.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Nhãn khoa.\n- Chứng chỉ chuyên sâu về Phẫu thuật Phaco và Laser điều trị tật khúc xạ (Ấn Độ, Singapore).'
            },
            {
                userId: 8,
                specialtyId: 6,
                dob: '1975-04-12',
                gender: '1',
                ethnicity: 'Kinh',
                address: '56 Hai Bà Trưng, Hà Nội',
                degree: 'Tiến sĩ - Răng hàm mặt',
                room: '206',
                image: '/uploads/users/doc6.webp',
                price: 700000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên gia hàng đầu về cấy ghép Implant nha khoa và Chỉnh nha mắc cài/không mắc cài (Invisalign). Bác sĩ là thành viên của Hiệp hội Implant Quốc tế (ITI) và nổi tiếng với khả năng phục hình răng phức tạp, đòi hỏi kỹ thuật cao, và mang lại thẩm mỹ nụ cười toàn diện. Với sự tận tâm và kinh nghiệm phong phú, Bác sĩ đã giúp hàng nghìn bệnh nhân lấy lại sự tự tin.',
                workExperience:
                    'Chuyên môn:\n- Cấy ghép Implant: Implant nha khoa, ghép xương, nâng xoang trong Implant.\n- Chỉnh nha: Niềng răng mắc cài kim loại/sứ, chỉnh nha không mắc cài (Invisalign).\n- Phục hình thẩm mỹ: Răng sứ Veneer, bọc sứ, tẩy trắng răng.\n\nQuá trình công tác:\n- 2000 - 2010: Phó khoa Phẫu thuật Hàm mặt - Bệnh viện Răng Hàm Mặt Trung ương, tham gia giảng dạy cho sinh viên.\n- 2010 - Nay: Giám đốc Chuyên môn Hệ thống Nha khoa Paris, trực tiếp tham gia điều trị và quản lý chất lượng chuyên môn.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Răng Hàm Mặt - Đại học Y Hà Nội.\n- Chứng chỉ Implant Nâng cao (Hội Implant Quốc tế ITI - Thụy Sĩ), Chứng chỉ Chỉnh nha Invisalign (Mỹ).'
            },
            {
                userId: 9,
                specialtyId: 7,
                dob: '1992-01-30',
                gender: '1',
                ethnicity: 'Kinh',
                address: '78 Nguyễn Thị Minh Khai, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I - Phụ khoa',
                room: '207',
                image: '/uploads/users/doc7.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Sản Phụ khoa, được biết đến với sự tận tâm, thấu hiểu tâm lý và thái độ khám nhẹ nhàng. Bác sĩ có thế mạnh trong khám và điều trị các bệnh lý phụ khoa thông thường (viêm nhiễm), tư vấn tiền hôn nhân, kế hoạch hóa gia đình, và theo dõi thai kỳ. Đặc biệt có kinh nghiệm xử lý các ca thai kỳ nguy cơ cao và tư vấn sức khỏe sinh sản tuổi vị thành niên. Bác sĩ cam kết tạo không gian riêng tư, thoải mái cho bệnh nhân.',
                workExperience:
                    'Chuyên môn:\n- Phụ khoa: Khám và điều trị viêm nhiễm phụ khoa, rối loạn kinh nguyệt, tầm soát ung thư cổ tử cung.\n- Thai kỳ: Theo dõi thai kỳ thường và thai kỳ nguy cơ cao, tư vấn dinh dưỡng và chăm sóc trước sinh.\n- Hỗ trợ sinh sản: Tư vấn cơ bản về vô sinh, các phương pháp hỗ trợ sinh sản (IUI, IVF).\n\nQuá trình công tác:\n- 2016 - 2020: Bác sĩ Sản phụ khoa tại Bệnh viện Từ Dũ, trực tiếp tham gia đỡ sinh và phẫu thuật phụ khoa.\n- 2020 - Nay: Bác sĩ điều trị tại Khoa Sản - Bệnh viện Quốc tế Hạnh Phúc, phụ trách tư vấn tiền sản và khám thai chuyên sâu.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Sản Phụ khoa - Đại học Y Dược TP.HCM.'
            },
            {
                userId: 10,
                specialtyId: 8,
                dob: '1980-06-05',
                gender: '1',
                ethnicity: 'Kinh',
                address: '90 Pasteur, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II - Nam khoa',
                room: '208',
                image: '/uploads/users/doc8.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II, chuyên gia uy tín trong lĩnh vực Nam học và Tiết niệu với kinh nghiệm hơn 15 năm. Bác sĩ chuyên điều trị các rối loạn chức năng tình dục (rối loạn cương dương, xuất tinh sớm), vô sinh nam (giãn tĩnh mạch thừng tinh, tinh trùng yếu) và các bệnh lây truyền qua đường tình dục. Bác sĩ cam kết cung cấp một môi trường khám chữa bệnh chuyên nghiệp, kín đáo và bảo mật tuyệt đối thông tin người bệnh.',
                workExperience:
                    'Chuyên môn:\n- Nam khoa: Điều trị rối loạn cương dương, xuất tinh sớm, mãn dục nam, vô sinh nam.\n- Tiết niệu: Khám và điều trị viêm đường tiết niệu, sỏi thận, phì đại tiền liệt tuyến.\n- Phẫu thuật: Phẫu thuật giãn tĩnh mạch thừng tinh, tạo hình cơ quan sinh dục, phẫu thuật tiết niệu nội soi.\n\nQuá trình công tác:\n- 2006 - 2015: Bác sĩ khoa Ngoại Tiết niệu - Bệnh viện Đà Nẵng, tham gia phẫu thuật và điều trị nội trú.\n- 2015 - Nay: Trưởng đơn vị Nam học - Bệnh viện Đa khoa Tâm Anh Đà Nẵng, phát triển các kỹ thuật chẩn đoán và điều trị Nam khoa hiện đại.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Nam học - Tiết niệu.'
            },
            {
                userId: 11,
                specialtyId: 9,
                dob: '1987-08-14',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Lý Tự Trọng, Hà Nội',
                degree: 'Thạc sĩ - Hô hấp',
                room: '209',
                image: '/uploads/users/doc9.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ chuyên ngành Nội Hô hấp, có gần 15 năm kinh nghiệm trong chẩn đoán và điều trị các bệnh lý đường hô hấp. Bác sĩ có thế mạnh trong quản lý Hen phế quản, Bệnh phổi tắc nghẽn mạn tính (COPD) và các bệnh lý phổi nhiễm trùng. Bác sĩ thường xuyên tham gia các buổi hội chẩn chuyên môn cấp cao tại Bệnh viện Phổi Trung ương, đảm bảo áp dụng các phác đồ điều trị cập nhật, tiên tiến và cá nhân hóa cho từng bệnh nhân.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Hô hấp mạn tính: Quản lý và điều trị Hen phế quản, COPD, giãn phế quản.\n- Bệnh lý nhiễm trùng: Viêm phổi, lao phổi, các bệnh nhiễm trùng đường hô hấp khác.\n- Chẩn đoán: Đo chức năng hô hấp, nội soi phế quản (có kinh nghiệm).\n\nQuá trình công tác:\n- 2012 - 2018: Bác sĩ điều trị khoa Hô hấp - Bệnh viện Bạch Mai, tham gia quản lý các ca bệnh nặng.\n- 2018 - Nay: Phó khoa Nội tổng hợp - Bệnh viện Thanh Nhàn, chuyên trách về bệnh lý Hô hấp.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Nội Hô hấp.'
            },
            {
                userId: 12,
                specialtyId: 10,
                dob: '1979-02-20',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Điện Biên Phủ, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ - Nội tiết',
                room: '210',
                image: '/uploads/users/doc10.webp',
                price: 650000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học với hơn 20 năm kinh nghiệm trong lĩnh vực Nội tiết - Chuyển hóa. Bác sĩ là chuyên gia hàng đầu về điều trị bệnh Đái tháo đường (tiểu đường), các bệnh lý tuyến giáp (cường giáp, suy giáp, bướu cổ) và rối loạn nội tiết khác. Bác sĩ là tác giả của nhiều bài báo khoa học được công bố trên các tạp chí chuyên ngành quốc tế về rối loạn chuyển hóa. Bác sĩ luôn cập nhật phác đồ mới, tập trung vào giáo dục bệnh nhân tự quản lý bệnh mạn tính.',
                workExperience:
                    'Chuyên môn:\n- Đái tháo đường: Chẩn đoán, điều trị ĐTĐ type 1, type 2, ĐTĐ thai kỳ, và xử trí các biến chứng.\n- Bệnh lý Tuyến giáp: Điều trị nội khoa và tư vấn can thiệp các bệnh lý tuyến giáp (ung thư, bướu cổ).\n- Rối loạn Nội tiết: Bệnh tuyến yên, tuyến thượng thận, rối loạn chuyển hóa mỡ máu.\n\nQuá trình công tác:\n- 2004 - 2014: Giảng viên Bộ môn Nội tiết - Đại học Y Dược TP.HCM, tham gia đào tạo sinh viên và nghiên cứu.\n- 2014 - Nay: Trưởng khoa Nội tiết - Bệnh viện Chợ Rẫy, phụ trách chuyên môn và điều trị các ca bệnh khó trong khu vực phía Nam.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Nội tiết - Chuyển hóa.'
            },
            {
                userId: 13,
                specialtyId: 11,
                dob: '1991-10-08',
                gender: '0',
                ethnicity: 'Kinh',
                address: '67 Bà Triệu, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I - Ung thư',
                room: '211',
                image: '/uploads/users/doc11.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Ung bướu, chuyên sâu về hóa trị liệu, điều trị đích và chăm sóc giảm nhẹ. Bác sĩ có kinh nghiệm làm việc tại các trung tâm ung bướu lớn, đặc biệt trong điều trị ung thư vú, phổi, đại trực tràng. Bác sĩ luôn đồng hành cùng bệnh nhân và gia đình, thiết lập phác đồ điều trị cá thể hóa, kết hợp y học và tâm lý để mang lại chất lượng cuộc sống tốt nhất cho bệnh nhân ung thư.',
                workExperience:
                    'Chuyên môn:\n- Hóa trị, điều trị đích và miễn dịch: Lên phác đồ và quản lý tác dụng phụ của các liệu pháp toàn thân.\n- Tầm soát và chẩn đoán sớm ung thư: Tư vấn và thực hiện các xét nghiệm tầm soát chuyên biệt.\n- Chăm sóc giảm nhẹ: Giảm đau, quản lý triệu chứng và hỗ trợ tâm lý cho bệnh nhân giai đoạn cuối.\n\nQuá trình công tác:\n- 2015 - 2019: Bác sĩ điều trị tại Bệnh viện Ung bướu Đà Nẵng, chuyên trách về hóa trị.\n- 2019 - Nay: Bác sĩ điều trị tại Trung tâm Ung bướu - Bệnh viện Vinmec Đà Nẵng, tham gia hội đồng chuyên môn và nghiên cứu lâm sàng.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Ung bướu.'
            },
            {
                userId: 14,
                specialtyId: 12,
                dob: '1983-12-17',
                gender: '0',
                ethnicity: 'Kinh',
                address: '89 Hàng Bông, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II - Dinh dưỡng',
                room: '212',
                image: '/uploads/users/doc12.webp',
                price: 400000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II, chuyên gia tư vấn dinh dưỡng lâm sàng, có kinh nghiệm chuyên sâu trong xây dựng chế độ ăn cho người bệnh mạn tính (tiểu đường, tim mạch, thận), trẻ em suy dinh dưỡng, và người có nhu cầu giảm cân/tăng cân khoa học. Bác sĩ luôn dựa trên bằng chứng khoa học, kết hợp thói quen sinh hoạt và sở thích cá nhân để thiết kế thực đơn phù hợp, giúp bệnh nhân đạt được mục tiêu sức khỏe bền vững.',
                workExperience:
                    'Chuyên môn:\n- Dinh dưỡng bệnh lý: Tư vấn dinh dưỡng cho bệnh nhân Đái tháo đường, suy thận, bệnh lý Gan mật.\n- Dinh dưỡng cộng đồng: Tư vấn dinh dưỡng học đường, can thiệp cho trẻ suy dinh dưỡng, béo phì.\n- Dinh dưỡng lâm sàng: Xây dựng khẩu phần ăn qua sonde, dinh dưỡng tĩnh mạch cho bệnh nhân nội trú.\n\nQuá trình công tác:\n- 2009 - 2016: Bác sĩ, chuyên viên tư vấn tại Viện Dinh dưỡng Quốc gia, tham gia các chương trình nghiên cứu quốc gia về dinh dưỡng.\n- 2016 - Nay: Trưởng khoa Dinh dưỡng - Bệnh viện E Hà Nội, phụ trách chuyên môn và đào tạo nhân lực dinh dưỡng.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Dinh dưỡng.'
            },
            {
                userId: 15,
                specialtyId: 13,
                dob: '1989-04-26',
                gender: '1',
                ethnicity: 'Kinh',
                address: '12 Võ Văn Tần, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ - Tâm lý',
                room: '213',
                image: '/uploads/users/doc13.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Tâm lý học lâm sàng, chuyên gia trị liệu các vấn đề về sức khỏe tinh thần như trầm cảm, rối loạn lo âu, rối loạn giấc ngủ và các sang chấn tâm lý (PTSD). Bác sĩ sử dụng linh hoạt các phương pháp trị liệu khoa học như Liệu pháp Nhận thức Hành vi (CBT), Trị liệu Hành vi Biện chứng (DBT) và các kỹ thuật chánh niệm (Mindfulness). Bác sĩ cam kết cung cấp dịch vụ tham vấn chuyên nghiệp, dựa trên sự tôn trọng, đồng cảm và bảo mật.',
                workExperience:
                    'Chuyên môn:\n- Trị liệu Rối loạn tâm lý: Trầm cảm, lo âu lan tỏa, rối loạn hoảng sợ, rối loạn thích ứng.\n- Trị liệu Sang chấn: Can thiệp tâm lý sau các sự kiện gây sang chấn.\n- Tư vấn sức khỏe tinh thần: Căng thẳng công việc, mâu thuẫn mối quan hệ, định hướng nghề nghiệp.\n\nQuá trình công tác:\n- 2014 - 2018: Chuyên viên tâm lý lâm sàng tại Bệnh viện Tâm thần TP.HCM, tham gia vào các nhóm trị liệu nội trú và ngoại trú.\n- 2018 - Nay: Giám đốc Trung tâm trị liệu tâm lý MindCare, trực tiếp tham vấn và điều phối chương trình đào tạo.\n\nQuá trình đào tạo:\n- Thạc sĩ Tâm lý học lâm sàng (Đại học Khoa học Xã hội và Nhân văn).\n- Chứng chỉ chuyên sâu về Liệu pháp Nhận thức Hành vi (CBT) quốc tế.'
            },
            {
                userId: 16,
                specialtyId: 14,
                dob: '1976-09-03',
                gender: '1',
                ethnicity: 'Kinh',
                address: '34 Trần Hưng Đạo, Đà Nẵng',
                degree: 'Tiến sĩ - Dị ứng',
                room: '214',
                image: '/uploads/users/doc14.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên ngành Dị ứng - Miễn dịch lâm sàng, với hơn 20 năm kinh nghiệm. Bác sĩ là chuyên gia sâu rộng trong chẩn đoán, xét nghiệm và điều trị các bệnh lý dị ứng phức tạp như Hen phế quản dị ứng, Viêm mũi dị ứng mạn tính, Mày đay (nổi mề đay) và các phản ứng dị ứng thuốc, thức ăn. Bác sĩ đã tham gia nhiều nghiên cứu khoa học và ứng dụng các liệu pháp giải mẫn cảm (ASIT) tiên tiến nhất.',
                workExperience:
                    'Chuyên môn:\n- Dị ứng đường hô hấp: Khám và điều trị Hen phế quản, Viêm mũi dị ứng, Viêm kết mạc dị ứng.\n- Dị ứng da và thuốc: Điều trị Mày đay mạn tính, Viêm da tiếp xúc, dị ứng thuốc và thực phẩm.\n- Miễn dịch lâm sàng: Chẩn đoán và điều trị các rối loạn miễn dịch cơ bản.\n\nQuá trình công tác:\n- 2001 - 2012: Bác sĩ khoa Dị ứng Miễn dịch lâm sàng - Bệnh viện Bạch Mai, tham gia quản lý các ca sốc phản vệ.\n- 2012 - Nay: Trưởng Bộ môn Dị ứng - Đại học Y Dược Huế, đồng thời là cố vấn chuyên môn tại nhiều bệnh viện lớn khu vực miền Trung.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Dị ứng - Miễn dịch lâm sàng.'
            },
            {
                userId: 17,
                specialtyId: 15,
                dob: '1993-11-11',
                gender: '0',
                ethnicity: 'Kinh',
                address: '56 Hàng Đào, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I - Lão khoa',
                room: '215',
                image: '/uploads/users/doc15.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Lão khoa, với sự tận tâm và am hiểu về các bệnh lý đa khoa ở người cao tuổi. Bác sĩ chuyên điều trị các hội chứng lão khoa đặc trưng như sa sút trí tuệ (Alzheimer, sa sút mạch máu), té ngã, suy dinh dưỡng, và quản lý các bệnh lý mạn tính kết hợp (tăng huyết áp, tiểu đường, thoái hóa khớp). Bác sĩ luôn chú trọng việc tư vấn chế độ chăm sóc tại nhà, giúp người bệnh duy trì chất lượng cuộc sống tốt nhất.',
                workExperience:
                    'Chuyên môn:\n- Lão khoa tổng quát: Khám và quản lý các bệnh mạn tính ở người cao tuổi.\n- Thần kinh - Tâm thần Lão khoa: Điều trị rối loạn trí nhớ, mất ngủ, trầm cảm tuổi già.\n- Phục hồi chức năng: Tư vấn vật lý trị liệu, phục hồi chức năng vận động sau tai biến.\n\nQuá trình công tác:\n- 2017 - 2021: Bác sĩ điều trị Bệnh viện Lão khoa Trung ương, tham gia các chương trình sàng lọc và can thiệp sa sút trí tuệ.\n- 2021 - Nay: Bác sĩ khoa Nội - Bệnh viện Hữu Nghị Việt Xô, chuyên trách khám và điều trị nội tổng quát cho người cao tuổi.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Lão khoa.'
            },
            {
                userId: 18,
                specialtyId: 16,
                dob: '1981-05-28',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nguyễn Công Trứ, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II - Sản khoa',
                room: '216',
                image: '/uploads/users/doc16.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Sản Phụ khoa, với hơn 15 năm kinh nghiệm. Bác sĩ là chuyên gia trong lĩnh vực quản lý thai kỳ nguy cơ cao (tiền sản giật, đái tháo đường thai kỳ), đỡ sinh và phẫu thuật lấy thai an toàn. Bác sĩ có tay nghề cao trong siêu âm chẩn đoán dị tật thai nhi, đảm bảo sàng lọc tối đa các bất thường cho thai nhi. Bác sĩ luôn mang lại sự an tâm cho sản phụ bằng sự chuyên nghiệp và kinh nghiệm dày dặn.',
                workExperience:
                    'Chuyên môn:\n- Sản khoa: Quản lý thai kỳ thường và nguy cơ cao, đỡ sinh thường, mổ lấy thai, phẫu thuật sản khoa.\n- Siêu âm chẩn đoán: Siêu âm 3D/4D, siêu âm hình thái học thai nhi, chẩn đoán dị tật thai sớm.\n- Phụ khoa: Khám và điều trị các bệnh lý phụ khoa, phẫu thuật u nang buồng trứng, u xơ tử cung.\n\nQuá trình công tác:\n- 2007 - 2016: Trưởng phòng sinh Bệnh viện Hùng Vương, phụ trách các ca sinh khó và cấp cứu sản khoa.\n- 2016 - Nay: Phó Giám đốc Trung tâm Sản Nhi - Bệnh viện Quốc tế Mỹ (AIH), phụ trách chuyên môn Sản khoa.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Sản Phụ khoa.'
            },
            {
                userId: 19,
                specialtyId: 17,
                dob: '1986-07-07',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Mã, Đà Nẵng',
                degree: 'Thạc sĩ - Truyền nhiễm',
                room: '217',
                image: '/uploads/users/doc17.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Bệnh Nhiệt đới, có hơn 10 năm kinh nghiệm chuyên sâu trong chẩn đoán và điều trị các bệnh truyền nhiễm và bệnh ký sinh trùng. Bác sĩ có kinh nghiệm đặc biệt trong điều trị viêm gan siêu vi B, C, Sốt xuất huyết, Cúm, và các bệnh Nhiệt đới phổ biến. Bác sĩ thường xuyên tham gia các dự án phòng chống dịch bệnh cộng đồng, góp phần nâng cao ý thức phòng bệnh cho người dân.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Gan mật truyền nhiễm: Điều trị viêm gan B, C mạn tính, theo dõi tiến triển xơ gan.\n- Bệnh lý Ký sinh trùng và Nhiệt đới: Điều trị sốt rét, giun sán, sốt xuất huyết.\n- Tiêm chủng: Tư vấn và chỉ định các loại vắc xin phòng bệnh truyền nhiễm.\n\nQuá trình công tác:\n- 2011 - 2017: Bác sĩ điều trị tại Bệnh viện Bệnh Nhiệt đới TP.HCM, tham gia phòng chống dịch Sốt xuất huyết và Cúm.\n- 2017 - Nay: Trưởng khoa Nhiệt đới - Bệnh viện C Đà Nẵng, phụ trách chuyên môn và nghiên cứu về bệnh truyền nhiễm vùng miền Trung.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Bệnh Nhiệt đới.'
            },
            {
                userId: 20,
                specialtyId: 18,
                dob: '1974-01-15',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Bạc, Hà Nội',
                degree: 'Tiến sĩ - Thận tiết niệu',
                room: '218',
                image: '/uploads/users/doc18.webp',
                price: 650000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên ngành Thận học - Lọc máu, với hơn 25 năm kinh nghiệm. Bác sĩ là chuyên gia hàng đầu về điều trị suy thận mạn, viêm cầu thận, hội chứng thận hư và là cố vấn chuyên môn về ghép thận. Bác sĩ có công trình nghiên cứu nổi bật và đã cứu sống hàng nghìn bệnh nhân suy thận giai đoạn cuối thông qua các phương pháp lọc máu tiên tiến (thẩm phân phúc mạc, chạy thận nhân tạo). Bác sĩ là giảng viên, chuyên gia đầu ngành được kính trọng.',
                workExperience:
                    'Chuyên môn:\n- Thận học: Chẩn đoán và điều trị bệnh lý viêm cầu thận, suy thận cấp/mạn, bệnh thận do tiểu đường.\n- Lọc máu: Tư vấn và quản lý bệnh nhân chạy thận nhân tạo, thẩm phân phúc mạc.\n- Ghép thận: Tư vấn, chuẩn bị và theo dõi sau ghép thận.\n\nQuá trình công tác:\n- 1999 - 2010: Bác sĩ khoa Thận nhân tạo - Bệnh viện Bạch Mai, tham gia xây dựng quy trình lọc máu an toàn.\n- 2010 - Nay: Trưởng khoa Nội Thận - Bệnh viện Việt Đức, phụ trách chuyên môn Thận nội khoa và tham gia hội chẩn ca bệnh toàn quốc.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Thận - Tiết niệu (Thận học).'
            },
            {
                userId: 21,
                specialtyId: 19,
                dob: '1990-03-24',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I - Gan mật',
                room: '219',
                image: '/uploads/users/doc19.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Gan mật, chuyên sâu về chẩn đoán và điều trị các bệnh lý Gan - Mật - Tụy. Bác sĩ có kinh nghiệm trong quản lý viêm gan virus (B, C), xơ gan, gan nhiễm mỡ và tầm soát ung thư gan sớm. Bác sĩ chú trọng áp dụng các phương pháp điều trị tiên tiến, ít xâm lấn như đốt u gan bằng sóng cao tần (RFA) và luôn tư vấn kỹ lưỡng về lối sống, chế độ ăn để bảo vệ sức khỏe gan.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Gan: Điều trị viêm gan virus B, C, gan nhiễm mỡ, xơ gan, ung thư gan giai đoạn sớm.\n- Bệnh lý Mật Tụy: Viêm túi mật, sỏi mật, viêm tụy.\n- Nội soi can thiệp: Nội soi mật tụy ngược dòng (ERCP) để lấy sỏi.\n\nQuá trình công tác:\n- 2015 - 2020: Bác sĩ khoa Gan Mật Bệnh viện Chợ Rẫy, tham gia trực tiếp điều trị các ca bệnh nặng.\n- 2020 - Nay: Bác sĩ điều trị và cố vấn chuyên môn tại Phòng khám Gan mật Sài Gòn, chuyên sâu về điều trị ngoại trú các bệnh Gan mạn tính.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Gan mật.'
            },
            {
                userId: 22,
                specialtyId: 20,
                dob: '1984-08-02',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II - Huyết học',
                room: '220',
                image: '/uploads/users/doc20.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Huyết học - Truyền máu, có hơn 15 năm kinh nghiệm. Bác sĩ chuyên sâu trong chẩn đoán và điều trị các bệnh lý về máu như thiếu máu (thiếu sắt, Thalassemia), rối loạn đông máu, và các bệnh lý tăng sinh tủy (Bệnh bạch cầu). Bác sĩ có kinh nghiệm tư vấn di truyền các bệnh máu bẩm sinh và quản lý các ca truyền máu phức tạp, đảm bảo an toàn tuyệt đối cho người bệnh.',
                workExperience:
                    'Chuyên môn:\n- Huyết học lâm sàng: Chẩn đoán, điều trị thiếu máu, bệnh lý về tiểu cầu và bạch cầu.\n- Rối loạn đông máu: Chẩn đoán và quản lý các bệnh lý rối loạn chảy máu và tăng đông.\n- Truyền máu: Chỉ định và theo dõi truyền máu an toàn, tư vấn về hiến máu.\n\nQuá trình công tác:\n- 2010 - 2017: Bác sĩ điều trị tại Viện Huyết học Truyền máu Trung ương, tham gia các nghiên cứu về bệnh máu hiếm.\n- 2017 - Nay: Trưởng khoa Huyết học lâm sàng - Bệnh viện Đa khoa Đà Nẵng, phụ trách chuyên môn và xây dựng quy trình xét nghiệm huyết học.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Huyết học.'
            },
            {
                userId: 23,
                specialtyId: 21,
                dob: '1992-10-19',
                gender: '1',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Thạc sĩ - Phục hồi chức năng',
                room: '221',
                image: '/uploads/users/doc21.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Vật lý trị liệu và Phục hồi chức năng, chuyên gia trong việc phục hồi chức năng cho bệnh nhân sau tai biến mạch máu não (đột quỵ), chấn thương chỉnh hình và các bệnh lý cột sống (thoát vị đĩa đệm, đau lưng). Bác sĩ sử dụng các phương pháp điều trị không dùng thuốc, kết hợp vật lý trị liệu hiện đại và hướng dẫn tập luyện chuyên sâu để giúp bệnh nhân lấy lại khả năng vận động và chất lượng cuộc sống tối đa.',
                workExperience:
                    'Chuyên môn:\n- Phục hồi chức năng Thần kinh: Phục hồi sau đột quỵ, chấn thương tủy sống, liệt mặt.\n- Phục hồi chức năng Cơ xương khớp: Điều trị đau cổ vai gáy, đau lưng, khớp gối, phục hồi sau chấn thương thể thao.\n- Lão khoa: Hỗ trợ vận động và chống té ngã cho người cao tuổi.\n\nQuá trình công tác:\n- 2016 - 2020: Bác sĩ điều trị tại Trung tâm Phục hồi chức năng Bệnh viện Bạch Mai, chuyên trách về phục hồi chức năng đột quỵ.\n- 2020 - Nay: Trưởng đơn vị Vật lý trị liệu (VLTL) - Phòng khám ACC Hà Nội, áp dụng liệu pháp Thần kinh cơ và trị liệu bằng tay (manual therapy).\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Vật lý trị liệu - Phục hồi chức năng.'
            },
            {
                userId: 24,
                specialtyId: 22,
                dob: '1977-12-28',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ - Cơ xương khớp',
                room: '222',
                image: '/uploads/users/doc22.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y khoa, chuyên ngành Cơ Xương Khớp, với hơn 20 năm kinh nghiệm. Bác sĩ là chuyên gia hàng đầu trong chẩn đoán và điều trị các bệnh lý thoái hóa khớp, Gút (Gout), Loãng xương và các bệnh lý tự miễn như Viêm khớp dạng thấp. Bác sĩ là người tiên phong trong việc áp dụng liệu pháp huyết tương giàu tiểu cầu (PRP) và các kỹ thuật can thiệp khớp ít xâm lấn. Bác sĩ luôn ưu tiên phương pháp bảo tồn, kết hợp điều trị nội khoa và phục hồi chức năng.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Khớp: Thoái hóa khớp gối, khớp háng, Gút, Viêm khớp dạng thấp, Viêm cột sống dính khớp.\n- Bệnh lý Xương: Loãng xương, gãy xương do bệnh lý, bệnh Paget xương.\n- Thủ thuật can thiệp: Tiêm nội khớp, tiêm PRP, chọc hút dịch khớp.\n\nQuá trình công tác:\n- 2002 - 2012: Bác sĩ khoa Cơ Xương Khớp - Bệnh viện Nguyễn Tri Phương, tham gia điều trị các ca nội trú và cấp cứu.\n- 2012 - Nay: Giám đốc Chuyên môn Bệnh viện Chấn thương Chỉnh hình TP.HCM, phụ trách mảng Nội Cơ Xương Khớp và phát triển các kỹ thuật mới.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Cơ Xương Khớp.'
            },
            {
                userId: 25,
                specialtyId: 23,
                dob: '1988-02-06',
                gender: '0',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I - Thần kinh',
                room: '223',
                image: '/uploads/users/doc23.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Nội Thần kinh, chuyên trị các chứng đau đầu mạn tính (đau nửa đầu Migraine, đau đầu căng thẳng), mất ngủ kéo dài, rối loạn tiền đình và các bệnh lý thoái hóa thần kinh như Parkinson. Bác sĩ áp dụng phương pháp điều trị toàn diện, kết hợp thuốc, vật lý trị liệu và điều chỉnh lối sống, giúp bệnh nhân kiểm soát triệu chứng và cải thiện chất lượng cuộc sống lâu dài.',
                workExperience:
                    'Chuyên môn:\n- Đau đầu và Rối loạn Tiền đình: Chẩn đoán và điều trị đau đầu Migraine, chóng mặt, rối loạn thăng bằng.\n- Rối loạn Giấc ngủ: Điều trị mất ngủ, ngủ không sâu giấc, ngưng thở khi ngủ.\n- Bệnh lý Thần kinh mạn tính: Parkinson, bệnh xơ cứng rải rác (MS), bệnh thần kinh ngoại biên.\n\nQuá trình công tác:\n- 2013 - 2019: Bác sĩ điều trị khoa Thần kinh - Bệnh viện Trung ương Huế, tham gia cấp cứu và điều trị đột quỵ.\n- 2019 - Nay: Phó khoa Nội Thần kinh - Bệnh viện Hoàn Mỹ Đà Nẵng, chuyên trách về điều trị ngoại trú và tư vấn các bệnh lý thần kinh mạn tính.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Nội Thần kinh.'
            },
            {
                userId: 26,
                specialtyId: 24,
                dob: '1980-04-15',
                gender: '1',
                ethnicity: 'Kinh',
                address: '56 Hàng Điếu, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II - Tiêu hóa',
                room: '224',
                image: '/uploads/users/doc24.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Tiêu hóa - Gan mật, là chuyên gia Nội soi tiêu hóa can thiệp hàng đầu. Bác sĩ có tay nghề cao trong việc phát hiện sớm ung thư dạ dày, đại tràng thông qua nội soi phóng đại và nhuộm màu, thực hiện các thủ thuật can thiệp nội soi như cắt polyp, cầm máu. Bác sĩ cam kết mang lại quy trình nội soi không đau, an toàn và kết quả chẩn đoán chính xác tuyệt đối.',
                workExperience:
                    'Chuyên môn:\n- Nội soi tiêu hóa: Nội soi dạ dày, đại tràng, nội soi can thiệp (cắt polyp, nong hẹp, đặt stent).\n- Bệnh lý Tiêu hóa mạn tính: Điều trị viêm loét, trào ngược dạ dày thực quản (GERD), hội chứng ruột kích thích (IBS).\n- Bệnh lý Gan mật: Chẩn đoán và điều trị viêm gan, xơ gan, sỏi mật.\n\nQuá trình công tác:\n- 2005 - 2015: Trưởng đơn vị Nội soi - Bệnh viện E, thực hiện hơn 10.000 ca nội soi can thiệp.\n- 2015 - Nay: Trưởng khoa Tiêu hóa - Bệnh viện Đa khoa Quốc tế Vinmec Times City, phụ trách chuyên môn và nghiên cứu về Nội soi chẩn đoán sớm ung thư tiêu hóa.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Tiêu hóa - Gan mật.'
            },
            {
                userId: 27,
                specialtyId: 25,
                dob: '1991-06-23',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nam Kỳ Khởi Nghĩa, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ - Tim mạch',
                room: '225',
                image: '/uploads/users/doc25.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Y học chuyên ngành Tim mạch, được đào tạo bài bản về chẩn đoán không xâm lấn (siêu âm tim, điện tâm đồ, Holter). Bác sĩ có thế mạnh trong quản lý bệnh nhân tăng huyết áp, rối loạn nhịp tim ngoại trú và tầm soát các bệnh lý tim mạch sớm ở người trẻ tuổi. Bác sĩ luôn tư vấn chi tiết về chế độ ăn, tập luyện và tuân thủ thuốc để kiểm soát bệnh nền hiệu quả, phòng ngừa biến cố tim mạch.',
                workExperience:
                    'Chuyên môn:\n- Nội Tim mạch: Điều trị tăng huyết áp, bệnh động mạch vành, suy tim giai đoạn sớm.\n- Chẩn đoán không xâm lấn: Siêu âm tim gắng sức, theo dõi Holter ECG và Holter huyết áp.\n- Tim mạch can thiệp: Phụ trách hỗ trợ các kỹ thuật can thiệp tim mạch (đặt máy tạo nhịp, chụp mạch).\n\nQuá trình công tác:\n- 2015 - 2020: Bác sĩ điều trị tại Viện Tim mạch Quốc gia, tham gia các nghiên cứu về rối loạn nhịp tim.\n- 2020 - Nay: Bác sĩ Tim mạch can thiệp tại Bệnh viện Tâm Đức, chuyên trách theo dõi bệnh nhân sau can thiệp và điều trị nội khoa.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Tim mạch.'
            },
            {
                userId: 28,
                specialtyId: 22,
                dob: '1983-09-01',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Bông, Đà Nẵng',
                degree: 'Tiến sĩ - Tai mũi họng',
                room: '226',
                image: '/uploads/users/doc26.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Tai Mũi Họng, chuyên sâu về phẫu thuật đầu cổ và các kỹ thuật phục hồi thính lực. Bác sĩ là chuyên gia cấy ốc tai điện tử và phẫu thuật nội soi xoang sàng, bướu cổ. Bác sĩ có nhiều công trình nghiên cứu về thính học và đã thực hiện thành công hàng trăm ca phẫu thuật phức tạp, khôi phục thính lực và chất lượng giọng nói cho bệnh nhân. Bác sĩ là giảng viên có uy tín trong ngành Tai Mũi Họng.',
                workExperience:
                    'Chuyên môn:\n- Phẫu thuật Đầu cổ: Phẫu thuật ung thư thanh quản, tuyến giáp, u vùng đầu cổ.\n- Thính học: Chẩn đoán và can thiệp thính lực, cấy ốc tai điện tử, máy trợ thính.\n- Bệnh lý Tai: Viêm tai giữa mạn tính, vá màng nhĩ, phẫu thuật xương chũm.\n\nQuá trình công tác:\n- 2008 - 2016: Giảng viên Bộ môn Tai Mũi Họng - Đại học Y Hà Nội, tham gia đào tạo Bác sĩ chuyên khoa.\n- 2016 - Nay: Trưởng khoa Tai Mũi Họng - Bệnh viện C Đà Nẵng, phụ trách chuyên môn và điều trị các ca phẫu thuật lớn.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Tai Mũi Họng.'
            },
            {
                userId: 29,
                specialtyId: 7,
                dob: '1989-11-09',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Mã, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I - Da liễu',
                room: '227',
                image: '/uploads/users/doc27.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Da liễu, có thế mạnh về điều trị các bệnh da liễu mạn tính và da liễu trẻ em. Bác sĩ chuyên sâu trong điều trị Viêm da cơ địa, Vảy nến, Lupus ban đỏ da và các bệnh da nhiễm trùng. Bác sĩ luôn cập nhật các liệu pháp sinh học và điều trị mục tiêu mới nhất, giúp bệnh nhân kiểm soát bệnh lâu dài, giảm thiểu tác dụng phụ của thuốc. Bác sĩ khám và tư vấn tận tình cho cả người lớn và trẻ em.',
                workExperience:
                    'Chuyên môn:\n- Da liễu mạn tính: Điều trị Vảy nến, Viêm da cơ địa, Á sừng, Eczema.\n- Da liễu trẻ em: Khám và điều trị các bệnh da thường gặp ở trẻ sơ sinh và trẻ nhỏ (chàm sữa, rôm sảy, nấm da).\n- Da liễu thẩm mỹ cơ bản: Lấy mụn y khoa, điện di, peel da nông.\n\nQuá trình công tác:\n- 2014 - 2019: Bác sĩ điều trị tại Bệnh viện Da liễu Hà Nội, chuyên trách khu vực khám bệnh da mạn tính.\n- 2019 - Nay: Bác sĩ phụ trách Phòng khám Da liễu - Hệ thống Medlatec, tham gia vào các hoạt động tầm soát bệnh da liễu cộng đồng.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Da liễu.'
            },
            {
                userId: 30,
                specialtyId: 8,
                dob: '1975-01-18',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II - Nhi khoa',
                room: '228',
                image: '/uploads/users/doc28.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Nhi khoa, với bề dày hơn 25 năm kinh nghiệm. Bác sĩ là chuyên gia trong lĩnh vực Hồi sức tích cực Nhi khoa và Sơ sinh, có khả năng xử lý các ca bệnh nặng, cấp cứu nhi khoa phức tạp. Từng giữ chức vụ Trưởng khoa Hồi sức, Bác sĩ có chuyên môn cao trong chẩn đoán và điều trị các bệnh lý nguy hiểm ở trẻ sơ sinh, trẻ nhỏ và trẻ lớn. Bác sĩ còn đóng vai trò là cố vấn chuyên môn cho nhiều bệnh viện Nhi khu vực phía Nam.',
                workExperience:
                    'Chuyên môn:\n- Hồi sức tích cực Nhi: Hồi sức hô hấp, tuần hoàn, xử lý sốc nhiễm trùng, suy đa tạng ở trẻ em.\n- Sơ sinh: Chăm sóc và điều trị các bệnh lý sơ sinh non tháng, suy hô hấp, vàng da nặng.\n- Nhi khoa tổng quát: Chẩn đoán và điều trị các bệnh lý Nhi khoa khó, phức tạp.\n\nQuá trình công tác:\n- 2000 - 2015: Trưởng khoa Hồi sức Nhi - Bệnh viện Nhi Đồng 1, chịu trách nhiệm trực tiếp các ca bệnh nguy kịch.\n- 2015 - Nay: Cố vấn Chuyên môn Bệnh viện Nhi Đồng 2, tham gia giảng dạy và phát triển chuyên môn cho các bác sĩ trẻ.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Nhi khoa.'
            },
            {
                userId: 31,
                specialtyId: 9,
                dob: '1993-03-27',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Thạc sĩ - Phụ khoa',
                room: '229',
                image: '/uploads/users/doc29.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Sản Phụ khoa, được đào tạo chuyên sâu về nội tiết sinh sản và các kỹ thuật hỗ trợ sinh sản (IUI, IVF). Bác sĩ là người trẻ tuổi, năng động, luôn cập nhật các phác đồ mới nhất trong điều trị vô sinh, hiếm muộn. Bác sĩ cung cấp sự tư vấn nhiệt tình, khoa học, và đặc biệt chú trọng đến việc tạo không gian khám bệnh riêng tư, thoải mái và tôn trọng cho các cặp đôi đang mong con.',
                workExperience:
                    'Chuyên môn:\n- Nội tiết Sinh sản: Điều trị vô sinh, hiếm muộn, hội chứng buồng trứng đa nang (PCOS), rối loạn phóng noãn.\n- Hỗ trợ sinh sản: Tư vấn và thực hiện kỹ thuật Bơm tinh trùng vào buồng tử cung (IUI).\n- Phụ khoa: Khám và điều trị các bệnh lý phụ khoa liên quan đến nội tiết.\n\nQuá trình công tác:\n- 2017 - 2021: Bác sĩ tại Trung tâm Hỗ trợ sinh sản - Bệnh viện Phụ sản Nhi Đà Nẵng, tham gia quy trình IUI và IVF.\n- 2021 - Nay: Bác sĩ điều trị tại Phòng khám Marie Stopes, chuyên tư vấn về sức khỏe sinh sản, kế hoạch hóa gia đình và nội tiết sinh sản.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Sản Phụ khoa.'
            },
            {
                userId: 32,
                specialtyId: 2,
                dob: '1981-05-05',
                gender: '1',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Tiến sĩ - Nam khoa',
                room: '230',
                image: '/uploads/users/doc30.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên gia hàng đầu về phẫu thuật tạo hình cơ quan sinh dục nam và điều trị vô sinh nam. Bác sĩ là thành viên của Hội Y học Giới tính Thế giới (ISSM) và nổi tiếng với kinh nghiệm phẫu thuật vi phẫu trong điều trị vô sinh (như Micro TESE). Bác sĩ cung cấp các dịch vụ khám chữa bệnh nam khoa chuyên sâu, luôn cam kết bảo mật tuyệt đối và mang lại hiệu quả điều trị cao nhất, giúp nam giới giải quyết các vấn đề thầm kín.',
                workExperience:
                    'Chuyên môn:\n- Vô sinh Nam: Chẩn đoán nguyên nhân và điều trị vô tinh, tinh trùng yếu, giãn tĩnh mạch thừng tinh.\n- Phẫu thuật Nam khoa: Phẫu thuật tạo hình dương vật, phẫu thuật chữa xuất tinh sớm, phẫu thuật giãn tĩnh mạch thừng tinh vi phẫu.\n- Rối loạn chức năng: Điều trị rối loạn cương dương, suy giảm testosterone.\n\nQuá trình công tác:\n- 2006 - 2016: Phó khoa Nam học Bệnh viện Việt Đức, trực tiếp thực hiện và đào tạo các kỹ thuật phẫu thuật Nam khoa.\n- 2016 - Nay: Giám đốc Trung tâm Sức khỏe Nam giới Men Health, chuyên điều trị các bệnh lý Nam khoa khó và vô sinh nam.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Nam học - Tiết niệu.'
            },
            {
                userId: 33,
                specialtyId: 1,
                dob: '1987-07-14',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I - Mắt',
                room: '231',
                image: '/uploads/users/doc31.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Nhãn khoa, giàu kinh nghiệm trong lĩnh vực Khúc xạ và Kiểm soát cận thị. Bác sĩ có thế mạnh đặc biệt trong việc sử dụng phương pháp Ortho-K (kính áp tròng đeo ban đêm) để làm chậm tiến triển cận thị ở trẻ em và thanh thiếu niên. Bác sĩ còn chuyên khám và điều trị các bệnh lý bề mặt nhãn cầu như khô mắt, viêm kết mạc và dị ứng mắt, luôn tận tâm đưa ra giải pháp bảo tồn thị lực tối ưu.',
                workExperience:
                    'Chuyên môn:\n- Khúc xạ: Khám và điều trị các tật khúc xạ (cận, viễn, loạn), chỉ định phẫu thuật Laser.\n- Kiểm soát Cận thị: Tư vấn và thực hiện phương pháp Ortho-K cho trẻ em và người lớn.\n- Bệnh lý bề mặt nhãn cầu: Điều trị khô mắt, viêm loét giác mạc, viêm bờ mi.\n\nQuá trình công tác:\n- 2012 - 2018: Bác sĩ điều trị Bệnh viện Mắt TP.HCM, tham gia phòng khám khúc xạ.\n- 2018 - Nay: Trưởng khoa Khúc xạ - Bệnh viện Mắt Sài Gòn, phụ trách chuyên môn về kiểm soát cận thị và Ortho-K.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Nhãn khoa.'
            },
            {
                userId: 34,
                specialtyId: 2,
                dob: '1979-09-22',
                gender: '1',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II - Răng hàm mặt',
                room: '232',
                image: '/uploads/users/doc32.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Răng Hàm Mặt, chuyên gia về Phẫu thuật Hàm Mặt và điều trị các chấn thương phức tạp vùng mặt. Bác sĩ có kinh nghiệm dày dặn trong việc phẫu thuật chỉnh hình hàm mặt (hô, móm), phẫu thuật nha chu và phục hình răng sứ thẩm mỹ. Bác sĩ còn là giảng viên, có đóng góp lớn trong việc đào tạo nhiều thế hệ bác sĩ Răng Hàm Mặt, đảm bảo chất lượng chuyên môn và an toàn trong mọi ca điều trị.',
                workExperience:
                    'Chuyên môn:\n- Phẫu thuật Hàm Mặt: Phẫu thuật chỉnh hình hàm, điều trị chấn thương hàm mặt, nhổ răng khôn phức tạp.\n- Nha khoa tổng quát: Trám răng, chữa tủy, nhổ răng, nha chu.\n- Nha khoa thẩm mỹ: Phục hình răng sứ thẩm mỹ, cấy Implant cơ bản.\n\nQuá trình công tác:\n- 2004 - 2014: Trưởng khoa Phẫu thuật Hàm mặt - Bệnh viện Đa khoa Đà Nẵng, tham gia cấp cứu chấn thương hàm mặt.\n- 2014 - Nay: Giám đốc Chuyên môn Nha khoa Quốc tế Việt Pháp, trực tiếp thực hiện các ca phẫu thuật và quản lý chất lượng dịch vụ.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Răng Hàm Mặt.'
            },
            {
                userId: 35,
                specialtyId: 3,
                dob: '1990-11-30',
                gender: '0',
                ethnicity: 'Kinh',
                address: '56 Hàng Điếu, Hà Nội',
                degree: 'Thạc sĩ - Hô hấp',
                room: '233',
                image: '/uploads/users/doc33.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Nội Hô hấp, chuyên sâu về các bệnh lý phổi kẽ, chẩn đoán và điều trị ung thư phổi giai đoạn sớm. Bác sĩ có kinh nghiệm về nội soi phế quản chẩn đoán và can thiệp, từng tham gia các khóa tu nghiệp ngắn hạn tại Nhật Bản về kỹ thuật nội soi tiên tiến. Bác sĩ luôn đặt mục tiêu chẩn đoán sớm và áp dụng phác đồ điều trị đa mô thức, mang lại hy vọng và chất lượng cuộc sống tốt nhất cho bệnh nhân.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Hô hấp chuyên sâu: Viêm phổi, Hen, COPD, Bệnh phổi kẽ, Tràn dịch màng phổi.\n- Tầm soát và điều trị Ung thư phổi: Chẩn đoán hình ảnh, nội soi phế quản, tư vấn phác đồ hóa/xạ trị.\n- Kỹ thuật chẩn đoán: Nội soi phế quản, chọc hút dịch màng phổi.\n\nQuá trình công tác:\n- 2015 - 2020: Bác sĩ điều trị Bệnh viện Phổi Trung ương, chuyên trách các bệnh lý phổi hiếm và khó.\n- 2020 - Nay: Bác sĩ khoa Nội tổng hợp - Bệnh viện Đa khoa Hồng Ngọc, phụ trách chuyên môn Nội Hô hấp.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Nội Hô hấp.'
            },
            {
                userId: 36,
                specialtyId: 4,
                dob: '1984-02-08',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nam Kỳ Khởi Nghĩa, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ - Nội tiết',
                room: '234',
                image: '/uploads/users/doc34.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên gia Nội tiết - Chuyển hóa, chuyên sâu về các bệnh lý tuyến yên, tuyến thượng thận và rối loạn chuyển hóa lipid. Bác sĩ có nhiều năm kinh nghiệm giảng dạy và là tác giả của nhiều đầu sách chuyên khảo về Nội tiết học. Bác sĩ tiếp cận bệnh nhân bằng kiến thức sâu rộng và phương pháp điều trị cá nhân hóa, đặc biệt trong các ca rối loạn nội tiết hiếm gặp và khó kiểm soát.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Tuyến giáp và Cận giáp: Bướu cổ, Basedow, Ung thư tuyến giáp (tư vấn).\n- Rối loạn Nội tiết phức tạp: Bệnh lý tuyến yên, tuyến thượng thận (Hội chứng Cushing, Addison).\n- Rối loạn Chuyển hóa: Đái tháo đường, rối loạn chuyển hóa lipid (mỡ máu cao).\n\nQuá trình công tác:\n- 2009 - 2017: Giảng viên Bộ môn Nội tiết - Đại học Y Dược TP.HCM, tham gia nghiên cứu và đào tạo.\n- 2017 - Nay: Trưởng phân khoa Tuyến giáp - Bệnh viện Nhân dân 115, phụ trách chẩn đoán và điều trị bệnh lý tuyến giáp chuyên sâu.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Nội tiết - Chuyển hóa.'
            },
            {
                userId: 37,
                specialtyId: 5,
                dob: '1992-04-17',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Bông, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I - Ung thư',
                room: '235',
                image: '/uploads/users/doc35.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Ung bướu, chuyên tầm soát và phát hiện sớm các loại ung thư phổ biến như ung thư vú, ung thư cổ tử cung, ung thư đại trực tràng. Bác sĩ có kinh nghiệm trong việc thực hiện các thủ thuật sinh thiết chẩn đoán và tư vấn các biện pháp phòng ngừa ung thư. Bác sĩ luôn giải thích rõ ràng, chi tiết về tình trạng bệnh, quá trình điều trị và lựa chọn phác đồ phù hợp, giúp bệnh nhân an tâm.',
                workExperience:
                    'Chuyên môn:\n- Tầm soát Ung thư: Khám và chỉ định các xét nghiệm tầm soát sớm (ví dụ: chụp nhũ ảnh, nội soi, xét nghiệm gen).\n- Ung thư Phụ khoa và Tiêu hóa: Điều trị và tư vấn phác đồ cho ung thư vú, cổ tử cung, đại trực tràng.\n- Chăm sóc hậu điều trị: Theo dõi tái khám, quản lý tác dụng phụ lâu dài của hóa/xạ trị.\n\nQuá trình công tác:\n- 2016 - 2021: Bác sĩ khoa Ngoại Ung bướu - Bệnh viện Ung bướu Đà Nẵng, tham gia phẫu thuật và hóa trị.\n- 2021 - Nay: Bác sĩ điều trị tại Khoa Ung bướu - Bệnh viện Gia Đình, chuyên trách về tầm soát và điều trị nội khoa.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Ung bướu.'
            },
            {
                userId: 38,
                specialtyId: 6,
                dob: '1976-06-25',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Mã, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II - Dinh dưỡng',
                room: '236',
                image: '/uploads/users/doc36.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II, chuyên gia Dinh dưỡng lâm sàng hàng đầu với hơn 20 năm kinh nghiệm. Bác sĩ có thế mạnh trong việc thiết kế thực đơn điều trị cho người bệnh mạn tính (tiểu đường, tim mạch), người sau phẫu thuật và dinh dưỡng học đường. Bác sĩ đã tham gia nhiều chương trình tư vấn sức khỏe trên truyền hình, nổi tiếng với phương pháp tư vấn khoa học, dễ hiểu và thực tế, giúp bệnh nhân và gia đình thay đổi thói quen ăn uống hiệu quả.',
                workExperience:
                    'Chuyên môn:\n- Dinh dưỡng Nội khoa: Tư vấn chế độ ăn cho người bệnh tim mạch (tăng huyết áp, suy tim), đái tháo đường, béo phì.\n- Dinh dưỡng Phục hồi: Thiết kế khẩu phần ăn cho bệnh nhân sau mổ, người gầy yếu, người cần tăng/giảm cân theo tiêu chuẩn y khoa.\n- Dinh dưỡng Nhi khoa: Tư vấn dinh dưỡng cho trẻ phát triển kém, rối loạn tiêu hóa.\n\nQuá trình công tác:\n- 2001 - 2015: Phó khoa Dinh dưỡng lâm sàng - Bệnh viện Bạch Mai, tham gia quản lý dinh dưỡng nội trú.\n- 2015 - Nay: Giám đốc Trung tâm Dinh dưỡng NutriHome Hà Nội, trực tiếp tư vấn và quản lý chất lượng dịch vụ dinh dưỡng.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Dinh dưỡng.'
            },
            {
                userId: 39,
                specialtyId: 7,
                dob: '1988-08-03',
                gender: '0',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ - Tâm lý',
                room: '237',
                image: '/uploads/users/doc37.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Tâm lý học, chuyên gia trị liệu tâm lý trẻ em và vị thành niên. Bác sĩ có kinh nghiệm sâu rộng trong việc đánh giá và can thiệp các vấn đề về rối loạn phát triển (phổ tự kỷ), rối loạn tăng động giảm chú ý (ADHD), khó khăn học tập và các vấn đề hành vi ở tuổi dậy thì. Bác sĩ sử dụng phương pháp chơi trị liệu, trị liệu gia đình và can thiệp hành vi ứng dụng (ABA) để hỗ trợ toàn diện cho trẻ và phụ huynh.',
                workExperience:
                    'Chuyên môn:\n- Tâm lý Trẻ em: Đánh giá và can thiệp rối loạn phổ tự kỷ, ADHD, rối loạn cảm xúc.\n- Tâm lý Vị thành niên: Tư vấn các vấn đề về khủng hoảng tuổi dậy thì, lo âu xã hội, tự ti, định hướng bản thân.\n- Trị liệu Gia đình: Hướng dẫn phụ huynh cách hỗ trợ con tại nhà và cải thiện mối quan hệ gia đình.\n\nQuá trình công tác:\n- 2013 - 2018: Chuyên viên tâm lý Khoa Tâm lý Bệnh viện Nhi Đồng 1, tham gia chẩn đoán và can thiệp sớm.\n- 2018 - Nay: Chuyên gia tham vấn Tâm lý học đường - Trường Quốc tế Việt Úc, đồng thời là Giám đốc chuyên môn Trung tâm Trị liệu Tâm lý Nhi NextGen.\n\nQuá trình đào tạo:\n- Thạc sĩ Tâm lý học (chuyên ngành Tâm lý học lâm sàng).'
            },
            {
                userId: 40,
                specialtyId: 8,
                dob: '1980-10-12',
                gender: '0',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Tiến sĩ - Dị ứng',
                room: '238',
                image: '/uploads/users/doc38.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y khoa, chuyên gia về Dị ứng - Miễn dịch và Hen phế quản. Bác sĩ có nhiều công trình nghiên cứu về dị nguyên (tác nhân gây dị ứng) đường hô hấp và cơ chế miễn dịch của bệnh Hen tại khu vực miền Trung. Bác sĩ chuyên điều trị các ca dị ứng khó, mạn tính và áp dụng các phương pháp chẩn đoán dị nguyên chính xác (Test lẩy da, xét nghiệm IgE đặc hiệu) để xây dựng phác đồ điều trị triệt căn.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Dị ứng: Hen phế quản, Viêm mũi dị ứng, Dị ứng thuốc, Dị ứng côn trùng.\n- Chẩn đoán Dị nguyên: Thực hiện và phân tích các xét nghiệm dị ứng chuyên sâu.\n- Miễn dịch: Điều trị và tư vấn các bệnh lý rối loạn miễn dịch cơ bản.\n\nQuá trình công tác:\n- 2005 - 2015: Bác sĩ điều trị Bệnh viện Trung ương Huế, chuyên trách khoa Nội Hô hấp - Dị ứng.\n- 2015 - Nay: Trưởng khoa Nội Tổng hợp - Bệnh viện Đa khoa Quốc tế Vinmec Đà Nẵng, phụ trách chuyên môn về Nội khoa và Dị ứng - Miễn dịch.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Dị ứng - Miễn dịch lâm sàng.'
            },
            {
                userId: 41,
                specialtyId: 9,
                dob: '1991-12-20',
                gender: '0',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Bác sĩ chuyên khoa I - Lão khoa',
                room: '239',
                image: '/uploads/users/doc39.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Lão khoa, nổi tiếng với sự ân cần, chu đáo và kinh nghiệm trong việc quản lý đa bệnh lý ở người cao tuổi. Bác sĩ chuyên điều trị các bệnh lý mạn tính như tăng huyết áp, đái tháo đường, loãng xương, Parkinson, và các rối loạn tâm thần kinh tuổi già (mất ngủ, rối loạn lo âu). Bác sĩ có kinh nghiệm làm việc trong môi trường dưỡng lão, hiểu rõ nhu cầu chăm sóc toàn diện cho người lớn tuổi.',
                workExperience:
                    'Chuyên môn:\n- Quản lý đa bệnh lý: Lên kế hoạch điều trị tổng thể cho người cao tuổi có nhiều bệnh nền.\n- Bệnh lý Thần kinh Lão khoa: Chẩn đoán và điều trị Parkinson, rối loạn giấc ngủ, suy nhược thần kinh.\n- Chăm sóc giảm nhẹ: Tư vấn và hỗ trợ chăm sóc cho bệnh nhân giai đoạn cuối và bệnh nhân nằm lâu.\n\nQuá trình công tác:\n- 2015 - 2019: Bác sĩ nội trú và điều trị Bệnh viện Lão khoa Trung ương, tham gia các hoạt động nghiên cứu về chất lượng cuộc sống người cao tuổi.\n- 2019 - Nay: Bác sĩ điều trị và tư vấn y tế tại Viện Dưỡng lão Tuyết Thái, chuyên trách chăm sóc sức khỏe toàn diện cho người lớn tuổi nội trú.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Lão khoa.'
            },
            {
                userId: 42,
                specialtyId: 10,
                dob: '1983-02-28',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa II - Sản khoa',
                room: '240',
                image: '/uploads/users/doc40.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Sản Phụ khoa, chuyên gia phẫu thuật nội soi phụ khoa. Bác sĩ có tay nghề cao trong các ca phẫu thuật ít xâm lấn điều trị u xơ tử cung, u nang buồng trứng, lạc nội mạc tử cung và chửa ngoài tử cung. Bác sĩ nổi tiếng với kỹ thuật phẫu thuật tinh tế, vết mổ thẩm mỹ và thời gian hồi phục nhanh chóng cho bệnh nhân. Bác sĩ luôn ưu tiên giải pháp bảo tồn tối đa chức năng sinh sản cho phụ nữ.',
                workExperience:
                    'Chuyên môn:\n- Phẫu thuật Nội soi: Cắt u xơ tử cung, bóc u nang buồng trứng, điều trị lạc nội mạc tử cung bằng nội soi.\n- Phụ khoa: Khám và điều trị các bệnh lý phụ khoa mạn tính, rối loạn kinh nguyệt.\n- Sản khoa: Tư vấn trước khi mang thai, quản lý thai kỳ cơ bản.\n\nQuá trình công tác:\n- 2008 - 2018: Bác sĩ khoa Phẫu thuật Nội soi - Bệnh viện Từ Dũ, thực hiện hàng nghìn ca phẫu thuật nội soi phức tạp.\n- 2018 - Nay: Trưởng khoa Phụ sản - Bệnh viện Quốc tế City, phụ trách chuyên môn phẫu thuật phụ khoa và quản lý chất lượng chuyên khoa.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Sản Phụ khoa.'
            },
            {
                userId: 43,
                specialtyId: 11,
                dob: '1989-05-07',
                gender: '1',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Thạc sĩ - Truyền nhiễm',
                room: '241',
                image: '/uploads/users/doc41.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Bệnh Nhiệt đới, chuyên điều trị các bệnh truyền nhiễm nhiệt đới, các bệnh lây truyền qua đường tình dục, và quản lý bệnh nhân HIV/AIDS. Bác sĩ có kinh nghiệm tư vấn và chỉ định phác đồ điều trị dự phòng lây nhiễm (PrEP, PEP). Bác sĩ còn có vai trò quan trọng trong việc tư vấn tiêm chủng vắc xin phòng bệnh, giúp bệnh nhân và cộng đồng nâng cao khả năng miễn dịch. Bác sĩ cam kết giữ bí mật thông tin tuyệt đối.',
                workExperience:
                    'Chuyên môn:\n- Bệnh truyền nhiễm: Điều trị các bệnh do virus, vi khuẩn, ký sinh trùng (sốt xuất huyết, tay chân miệng, nhiễm khuẩn hô hấp/tiêu hóa).\n- HIV/AIDS: Tư vấn dự phòng lây nhiễm, quản lý và điều trị ARV.\n- Tư vấn Tiêm chủng: Lên lịch và chỉ định vắc xin cho trẻ em và người lớn.\n\nQuá trình công tác:\n- 2014 - 2019: Bác sĩ tại Trung tâm Y tế Dự phòng Đà Nẵng, tham gia phòng chống dịch bệnh và tiêm chủng cộng đồng.\n- 2019 - Nay: Bác sĩ khoa Truyền nhiễm - Bệnh viện Đa khoa Đà Nẵng, chuyên trách điều trị các bệnh truyền nhiễm nặng và khó.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Bệnh Nhiệt đới.'
            },
            {
                userId: 44,
                specialtyId: 12,
                dob: '1977-07-16',
                gender: '0',
                ethnicity: 'Kinh',
                address: '56 Hàng Điếu, Hà Nội',
                degree: 'Tiến sĩ - Thận tiết niệu',
                room: '242',
                image: '/uploads/users/doc42.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên khoa Thận - Tiết niệu. Bác sĩ là chuyên gia hàng đầu về phẫu thuật tán sỏi nội soi ít xâm lấn (tán sỏi qua da, tán sỏi nội soi ngược dòng bằng Laser). Bác sĩ đã thực hiện thành công hàng nghìn ca tán sỏi, giúp bệnh nhân hồi phục nhanh và giảm đau tối đa. Bác sĩ còn có kinh nghiệm sâu rộng trong điều trị nội khoa các bệnh lý thận mạn tính và u bướu đường tiết niệu.',
                workExperience:
                    'Chuyên môn:\n- Tán sỏi Tiết niệu: Tán sỏi ngoài cơ thể, tán sỏi nội soi bằng Laser (niệu quản, bàng quang, thận).\n- Ngoại khoa Tiết niệu: Phẫu thuật nội soi điều trị u phì đại tiền liệt tuyến, bướu đường tiết niệu.\n- Nội khoa Thận: Điều trị suy thận, viêm đường tiết niệu tái phát.\n\nQuá trình công tác:\n- 2003 - 2013: Bác sĩ khoa Ngoại Tiết niệu - Bệnh viện Xanh Pôn, tham gia phẫu thuật và cấp cứu tiết niệu.\n- 2013 - Nay: Phó Giám đốc Trung tâm Kỹ thuật cao và Tiêu hóa Hà Nội, chuyên trách về phẫu thuật can thiệp Tiết niệu và công nghệ tán sỏi mới.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Ngoại Tiết niệu.'
            },
            {
                userId: 45,
                specialtyId: 13,
                dob: '1990-09-24',
                gender: '0',
                ethnicity: 'Kinh',
                address: '78 Nam Kỳ Khởi Nghĩa, TP. Hồ Chí Minh',
                degree: 'Bác sĩ chuyên khoa I - Gan mật',
                room: '243',
                image: '/uploads/users/doc43.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Gan mật, được đào tạo chuyên sâu về chẩn đoán, theo dõi và điều trị các bệnh lý viêm gan virus mạn tính (Viêm gan B, C), xơ gan mất bù. Bác sĩ luôn cập nhật các phác đồ điều trị kháng virus mới nhất theo chuẩn quốc tế, giúp bệnh nhân kiểm soát virus hiệu quả và giảm nguy cơ ung thư gan. Bác sĩ luôn tư vấn chi tiết về xét nghiệm, tiên lượng và kế hoạch điều trị lâu dài.',
                workExperience:
                    'Chuyên môn:\n- Viêm gan virus: Điều trị và theo dõi viêm gan B, C mạn tính, chỉ định thuốc kháng virus.\n- Xơ gan: Quản lý xơ gan, biến chứng xơ gan (cổ trướng, xuất huyết tiêu hóa).\n- Tầm soát: Siêu âm đàn hồi mô gan (Fibroscan), tầm soát ung thư gan định kỳ.\n\nQuá trình công tác:\n- 2015 - 2020: Bác sĩ khoa Nội Tiêu hóa Gan mật - Bệnh viện Gia Định, tham gia điều trị nội trú các ca bệnh nặng.\n- 2020 - Nay: Bác sĩ điều trị tại Phòng khám Đa khoa Quốc tế Yersin, chuyên sâu về quản lý ngoại trú các bệnh Gan mạn tính và tư vấn dinh dưỡng cho bệnh nhân gan.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Gan mật.'
            },
            {
                userId: 46,
                specialtyId: 14,
                dob: '1982-11-02',
                gender: '0',
                ethnicity: 'Kinh',
                address: '90 Hàng Bông, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa II - Huyết học',
                room: '244',
                image: '/uploads/users/doc44.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Huyết học, chuyên gia về rối loạn đông máu và các biến chứng huyết học liên quan đến thai kỳ. Bác sĩ có kinh nghiệm sâu rộng trong chẩn đoán và điều trị các bệnh lý tăng đông, chảy máu bất thường, và các bệnh lý tăng sinh tủy. Bác sĩ còn tham gia quản lý các ca bệnh cần truyền máu đặc biệt và tư vấn an toàn truyền máu trong Sản khoa và Phẫu thuật.',
                workExperience:
                    'Chuyên môn:\n- Đông máu - Cầm máu: Chẩn đoán và điều trị bệnh Hemophilia, các rối loạn tăng đông (huyết khối tĩnh mạch).\n- Huyết học Sản khoa: Quản lý thiếu máu, rối loạn đông máu trong thai kỳ và sau sinh.\n- Xét nghiệm chuyên sâu: Đọc và phân tích kết quả tủy đồ, sinh thiết tủy xương.\n\nQuá trình công tác:\n- 2007 - 2016: Bác sĩ khoa Huyết học - Bệnh viện Đa khoa Đà Nẵng, tham gia trực cấp cứu và điều trị nội trú.\n- 2016 - Nay: Trưởng khoa Xét nghiệm Huyết học - Bệnh viện Phụ nữ Đà Nẵng, chuyên trách về huyết học thai kỳ và sàng lọc máu an toàn.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Huyết học.'
            },
            {
                userId: 47,
                specialtyId: 15,
                dob: '1988-01-11',
                gender: '0',
                ethnicity: 'Kinh',
                address: '23 Hàng Mã, Hà Nội',
                degree: 'Thạc sĩ - Phục hồi chức năng',
                room: '245',
                image: '/uploads/users/doc45.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ chuyên ngành Phục hồi chức năng, chuyên gia trị liệu ngôn ngữ và phục hồi chức năng Thần kinh. Bác sĩ có kinh nghiệm sâu trong việc can thiệp cho trẻ chậm nói, rối loạn giao tiếp, và phục hồi chức năng vận động toàn diện cho bệnh nhân sau đột quỵ (tai biến mạch máu não). Bác sĩ luôn thiết kế chương trình trị liệu cá nhân hóa, kết hợp các bài tập hiện đại để tối ưu hóa khả năng hồi phục của người bệnh.',
                workExperience:
                    'Chuyên môn:\n- Phục hồi chức năng Nhi: Can thiệp vận động cho trẻ bại não, trị liệu ngôn ngữ cho trẻ chậm nói, rối loạn phát triển.\n- Phục hồi chức năng Thần kinh: Phục hồi vận động, thăng bằng sau đột quỵ, chấn thương sọ não.\n- Vật lý trị liệu: Các kỹ thuật trị liệu bằng tay (manual therapy), điện trị liệu, thủy trị liệu.\n\nQuá trình công tác:\n- 2013 - 2018: Bác sĩ tại Trung tâm Phục hồi chức năng Bệnh viện Nhi Trung ương, chuyên trách về can thiệp cho trẻ có rối loạn phát triển.\n- 2018 - Nay: Phó khoa Phục hồi chức năng - Bệnh viện Đa khoa Quốc tế Vinmec, phụ trách chuyên môn về phục hồi chức năng Thần kinh - Nhi khoa.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Phục hồi chức năng.'
            },
            {
                userId: 48,
                specialtyId: 16,
                dob: '1980-03-19',
                gender: '1',
                ethnicity: 'Kinh',
                address: '45 Lê Thánh Tôn, TP. Hồ Chí Minh',
                degree: 'Tiến sĩ - Cơ xương khớp',
                room: '246',
                image: '/uploads/users/doc46.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Y học, chuyên ngành Nội Cơ Xương Khớp, với hơn 20 năm kinh nghiệm. Bác sĩ là chuyên gia hàng đầu về các bệnh lý khớp tự miễn (Lupus ban đỏ hệ thống, Viêm khớp dạng thấp, Viêm cột sống dính khớp) và các bệnh lý mô mềm. Bác sĩ thường xuyên tham gia báo cáo tại các hội nghị Thấp khớp học quốc tế, áp dụng các liệu pháp sinh học và điều trị đích tiên tiến. Bác sĩ luôn nhấn mạnh tầm quan trọng của chẩn đoán sớm và điều trị tích cực để bảo tồn chức năng khớp.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Tự miễn: Chẩn đoán và điều trị Lupus, Viêm khớp dạng thấp, Viêm mạch máu.\n- Bệnh lý thoái hóa và chuyển hóa: Thoái hóa khớp, Gút, Loãng xương, Bệnh lý cột sống.\n- Thủ thuật: Tiêm khớp, tiêm gân và mô mềm dưới hướng dẫn siêu âm.\n\nQuá trình công tác:\n- 2005 - 2015: Bác sĩ khoa Nội Cơ Xương Khớp - Bệnh viện Chợ Rẫy, tham gia các nghiên cứu lâm sàng về thuốc sinh học.\n- 2015 - Nay: Trưởng khoa Khớp - Bệnh viện Đại học Y Dược TP.HCM Cơ sở 2, phụ trách chuyên môn và đào tạo Bác sĩ chuyên khoa.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Nội Cơ Xương Khớp.'
            },
            {
                userId: 49,
                specialtyId: 17,
                dob: '1991-05-28',
                gender: '1',
                ethnicity: 'Kinh',
                address: '67 Hàng Trống, Đà Nẵng',
                degree: 'Bác sĩ chuyên khoa I - Thần kinh',
                room: '247',
                image: '/uploads/users/doc47.webp',
                price: 450000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa I Nội Thần kinh, chuyên điều trị các rối loạn giấc ngủ, suy nhược thần kinh, rối loạn lo âu và các bệnh lý thần kinh ngoại biên (viêm đa dây thần kinh, đau thần kinh tọa). Bác sĩ luôn tiếp cận bệnh nhân một cách toàn diện, tư vấn kỹ càng về nguyên nhân gây bệnh, kết hợp thuốc và các liệu pháp thư giãn, điều chỉnh thói quen sinh hoạt để điều trị hiệu quả và bền vững.',
                workExperience:
                    'Chuyên môn:\n- Rối loạn Thần kinh chức năng: Điều trị mất ngủ, đau đầu, chóng mặt, căng thẳng mạn tính.\n- Bệnh lý Thần kinh ngoại biên: Viêm dây thần kinh, bệnh lý rễ thần kinh, đau thần kinh sau zona.\n- Hỗ trợ tâm lý: Tư vấn tâm lý cơ bản cho bệnh nhân có các vấn đề về sức khỏe tinh thần liên quan đến bệnh lý thần kinh.\n\nQuá trình công tác:\n- 2016 - 2020: Bác sĩ điều trị tại Bệnh viện Tâm thần Đà Nẵng, tham gia quản lý bệnh nhân có rối loạn lo âu, trầm cảm.\n- 2020 - Nay: Bác sĩ Phòng khám Thần kinh - Bệnh viện Đa khoa Gia Đình, chuyên trách điều trị ngoại trú các bệnh lý Thần kinh phổ biến.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa I Nội Thần kinh.'
            },
            {
                userId: 50,
                specialtyId: 18,
                dob: '1983-08-05',
                gender: '1',
                ethnicity: 'Kinh',
                address: '89 Hàng Gai, Hà Nội',
                degree: 'Bác sĩ chuyên khoa II - Tiêu hóa',
                room: '248',
                image: '/uploads/users/doc48.webp',
                price: 550000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Bác sĩ Chuyên khoa II Tiêu hóa, chuyên gia trong chẩn đoán và điều trị các bệnh lý phổ biến như viêm loét dạ dày tá tràng, trào ngược dạ dày thực quản (GERD) và hội chứng ruột kích thích (IBS). Bác sĩ có kinh nghiệm sâu về điều trị vi khuẩn HP kháng thuốc, sử dụng các phác đồ điều trị cá thể hóa và tiên tiến. Bác sĩ luôn kết hợp điều trị nội khoa với tư vấn dinh dưỡng chuyên sâu để đạt hiệu quả điều trị tối ưu.',
                workExperience:
                    'Chuyên môn:\n- Bệnh lý Dạ dày - Thực quản: Điều trị viêm loét, GERD, theo dõi Barrett thực quản.\n- Bệnh lý Ruột: Điều trị IBS, viêm đại tràng, bệnh Crohn, Colitis Ulcerosa.\n- Nội soi: Thực hiện nội soi chẩn đoán và can thiệp (cắt polyp, sinh thiết).\n\nQuá trình công tác:\n- 2008 - 2018: Bác sĩ khoa Tiêu hóa - Bệnh viện Bạch Mai, tham gia nghiên cứu về vi khuẩn HP và kháng thuốc.\n- 2018 - Nay: Phó khoa Nội Tiêu hóa - Bệnh viện Đa khoa Tâm Anh Hà Nội, phụ trách chuyên môn về điều trị các bệnh lý Tiêu hóa mạn tính và khó.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Bác sĩ Chuyên khoa II Tiêu hóa.'
            },
            {
                userId: 51,
                specialtyId: 19,
                dob: '1989-10-14',
                gender: '0',
                ethnicity: 'Kinh',
                address: '12 Đồng Khởi, TP. Hồ Chí Minh',
                degree: 'Thạc sĩ - Tim mạch',
                room: '249',
                image: '/uploads/users/doc49.webp',
                price: 500000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Thạc sĩ Tim mạch, chuyên gia về chẩn đoán chức năng tim (siêu âm tim gắng sức, Holter điện tâm đồ). Bác sĩ có kinh nghiệm tầm soát sớm bệnh lý mạch vành, suy tim và rối loạn nhịp tim ở các đối tượng có nguy cơ cao, đặc biệt là người trẻ tuổi. Bác sĩ luôn cung cấp thông tin rõ ràng, dễ hiểu về tình trạng tim mạch và đề xuất kế hoạch điều trị, dự phòng phù hợp với lối sống của từng bệnh nhân.',
                workExperience:
                    'Chuyên môn:\n- Nội Tim mạch: Điều trị Tăng huyết áp, rối loạn mỡ máu, bệnh tim thiếu máu cục bộ.\n- Chẩn đoán chức năng: Siêu âm tim Doppler, siêu âm tim gắng sức bằng Dobutamine, nghiệm pháp gắng sức bằng thảm lăn.\n- Dự phòng tim mạch: Tư vấn cai thuốc lá, chế độ ăn và luyện tập cho bệnh nhân có nguy cơ tim mạch cao.\n\nQuá trình công tác:\n- 2014 - 2019: Bác sĩ điều trị tại Viện Tim TP.HCM, tham gia chẩn đoán và theo dõi bệnh nhân sau can thiệp.\n- 2019 - Nay: Bác sĩ Tim mạch - Phòng khám Đa khoa Victoria Healthcare, chuyên trách về chẩn đoán không xâm lấn và tầm soát sớm.\n\nQuá trình đào tạo:\n- Tốt nghiệp Bác sĩ Đa khoa và Thạc sĩ Y học chuyên ngành Tim mạch.'
            },
            {
                userId: 52,
                specialtyId: 20,
                dob: '1977-12-22',
                gender: '0',
                ethnicity: 'Kinh',
                address: '34 Hàng Bài, Đà Nẵng',
                degree: 'Tiến sĩ - Tai mũi họng',
                room: '250',
                image: '/uploads/users/doc50.webp',
                price: 600000,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                introduce:
                    'Tiến sĩ Tai Mũi Họng, chuyên gia về phẫu thuật ung thư đầu cổ và các bệnh lý thanh quản phức tạp. Bác sĩ có nhiều năm tu nghiệp và công tác tại các bệnh viện lớn ở nước ngoài (ví dụ: Singapore General Hospital), mang về Việt Nam các kỹ thuật phẫu thuật hiện đại nhất. Bác sĩ hiện là Giám đốc chuyên môn, chịu trách nhiệm cho các ca phẫu thuật Tai Mũi Họng khó, đòi hỏi độ chính xác cao.',
                workExperience:
                    'Chuyên môn:\n- Phẫu thuật ung thư: Phẫu thuật cắt bỏ ung thư thanh quản, hầu họng, tuyến giáp.\n- Phẫu thuật Tai: Phẫu thuật nội soi tai, vá màng nhĩ, phẫu thuật chỉnh hình xương con.\n- Bệnh lý Thanh quản: Điều trị các rối loạn giọng nói, nội soi thanh quản ống mềm.\n\nQuá trình công tác:\n- 2002 - 2012: Tu nghiệp và làm việc tại Singapore General Hospital (SGH), tham gia phẫu thuật Đầu cổ chuyên sâu.\n- 2012 - Nay: Giám đốc Bệnh viện Tai Mũi Họng Miền Trung, trực tiếp điều hành và tham gia cố vấn chuyên môn các ca phẫu thuật phức tạp.\n\nQuá trình đào tạo:\n- Tiến sĩ Y học chuyên ngành Tai Mũi Họng.'
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Doctors', null, {});
    }
};
