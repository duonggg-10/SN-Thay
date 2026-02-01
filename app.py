import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Dữ liệu 47 thành viên lớp 10A6 "Nhà Sò"
students_data = [
    {"name": "Đỗ Nhất Khang", "msg": "Chúc thầy sinh nhật vui vẻ, luôn là người thầy tuyệt vời nhất của chúng em!"},
    {"name": "Hoàng Lê Minh Nguyên", "msg": "Happy Birthday thầy Điệp! Chúc thầy luôn mạnh khỏe và thành công ạ."},
    {"name": "Lê Hoàng Thiên Long", "msg": "Tuổi mới chúc thầy tiền vào như nước, vạn sự như ý và bớt la tụi em lại ạ :D"},
    {"name": "Nguyễn Hoàng Anh Tuấn", "msg": "Chúc mừng sinh nhật người thuyền trưởng của Nhà Sò. Thầy mãi đỉnh!"},
    {"name": "Nguyễn Minh Phương", "msg": "Em chúc thầy có một ngày sinh nhật thật ý nghĩa và trọn vẹn bên gia đình và 10A6."},
    {"name": "Phạm Nhật Tiến", "msg": "Chúc thầy thêm một tuổi mới thêm nhiều niềm vui, bớt đi những muộn phiền."},
    {"name": "Thái Bảo Nhân", "msg": "HPBD thầy! Cảm ơn thầy vì đã luôn kiên nhẫn với cái lớp siêu quậy này."},
    {"name": "Trần Phú Thịnh", "msg": "Chúc thầy sức khỏe dồi dào để tiếp tục dạy dỗ chúng em nên người."},
    {"name": "Võ Đức Mạnh", "msg": "Sinh nhật vui vẻ nha thầy. Mong thầy đừng gọi em lên bảng đột xuất nữa ạ huhu."},
    {"name": "Dương Thành Lâm", "msg": "Chúc thầy luôn đẹp trai, phong độ và giữ mãi nụ cười trên môi."},
    {"name": "Nguyễn Bảo Lâm", "msg": "Chúc thầy tuổi mới gặt hái được nhiều thành công mới trong sự nghiệp."},
    {"name": "Nguyễn Hữu Minh Khôi", "msg": "Thầy ơi, sinh nhật vui vẻ! Nhớ tụi em nha thầy!"},
    {"name": "Nguyễn Mậu Trung Dũng", "msg": "Em chúc thầy mọi điều tốt đẹp nhất. 10A6 yêu thầy!"},
    {"name": "Nguyễn Tuấn Anh", "msg": "Chúc thầy Điệp luôn 'bất bại' trước những trò nghịch ngợm của tụi em."},
    {"name": "Nguyễn Thống Quốc", "msg": "Chúc thầy có một bầu trời sức khỏe, một biển cả tình thương."},
    {"name": "Nguyễn Trần Phúc Hải", "msg": "Happy birthday to the best teacher! We love you!"},
    {"name": "Phạm Gia Huy", "msg": "Chúc thầy luôn là ngọn hải đăng soi sáng con đường học tập của chúng em."},
    {"name": "Vũ Hồ Gia Bảo", "msg": "Mong thầy có một ngày sinh nhật thật bùng nổ ạ!"},
    {"name": "Lê Duy Nhật", "msg": "Chúc thầy tuổi mới, nhiệt huyết mới, thành công mới!"},
    {"name": "Lê Nam Khánh", "msg": "Chúc thầy vạn sự như ý, tỷ sự như mơ, triệu điều bất ngờ."},
    {"name": "Nguyễn Hoàng An Hải", "msg": "Sinh nhật vui vẻ thầy nhé. Cảm ơn thầy vì tất cả."},
    {"name": "Phạm Nhật Minh", "msg": "Chúc thầy luôn giữ được lửa đam mê với nghề giáo."},
    {"name": "Phạm Thái Dương", "msg": "Chúc thầy Điệp đẹp trai có một sinh nhật đáng nhớ!"},
    {"name": "Trần Phúc Hưng", "msg": "Chúc thầy luôn vui vẻ, trẻ khỏe và hạnh phúc."},
    {"name": "Phan Nguyễn Vân An", "msg": "Chúc cô gái à nhầm, chúc thầy sinh nhật vui vẻ!"},
    {"name": "Lê Quỳnh Anh", "msg": "Thầy là người thầy tuyệt vời nhất. Chúc thầy sinh nhật hạnh phúc."},
    {"name": "Lê Thị Vân Anh", "msg": "Tuổi mới chúc thầy luôn an nhiên và bình yên trong cuộc sống."},
    {"name": "Ngô Tăng Quỳnh Anh", "msg": "Chúc thầy một ngày sinh nhật ngập tràn quà và hoa."},
    {"name": "Trương Quỳnh Anh", "msg": "Happy birthday, teacher! Mong thầy luôn yêu thương 10A6."},
    {"name": "Nguyễn Thị Ngọc Ánh", "msg": "Chúc thầy luôn tỏa sáng như cái tên của em hehe."},
    {"name": "Trần Thị An Bình", "msg": "Em chúc thầy sinh nhật an lành và thật nhiều niềm vui."},
    {"name": "Phạm Thị Minh Châu", "msg": "Chúc thầy Điệp luôn là viên ngọc quý trong lòng học trò."},
    {"name": "Đặng Thị Diệp Chi", "msg": "Chúc thầy một đời an nhiên, dạy dỗ chúng em thành tài."},
    {"name": "Lưu Nguyễn Ánh Dương", "msg": "Chúc thầy luôn là ánh mặt trời ấm áp của Nhà Sò."},
    {"name": "Nguyễn Huỳnh Ngọc Hân", "msg": "Em chúc thầy luôn hân hoan trong ngày sinh nhật của mình."},
    {"name": "Nguyễn Hồng Hoài", "msg": "Chúc thầy luôn giữ mãi những kỷ niệm đẹp với chúng em."},
    {"name": "Nguyễn Tường Linh", "msg": "Chúc thầy một sinh nhật linh đình và ý nghĩa ạ."},
    {"name": "Nguyễn Thị Nguyệt Minh", "msg": "Chúc thầy sáng như trăng rằm, và luôn minh mẫn ạ."},
    {"name": "Nguyễn Trà My", "msg": "Chúc thầy có một ngày sinh nhật thơm ngát như hoa trà my."},
    {"name": "Trần Thị Tuyết Nhung", "msg": "Em chúc thầy có một ngày sinh nhật thật mềm mại và đáng nhớ."},
    {"name": "Trương Nguyễn Trang Nhung", "msg": "Chúc thầy luôn trang nhã và được học trò yêu quý."},
    {"name": "Trần Bùi Mai Phương", "msg": "Chúc thầy một tương lai rạng rỡ và thành công."},
    {"name": "Mai Xuân Bảo Quyên", "msg": "Chúc thầy luôn là người thầy đáng kính và quyền uy của chúng em."},
    {"name": "Lê Anh Thư", "msg": "Chúc thầy có một ngày sinh nhật thật thư thái và an nhàn."},
    {"name": "Nguyễn Lê Thùy Trang", "msg": "Chúc thầy luôn thùy mị, à không, luôn mạnh mẽ ạ!"},
    {"name": "Hồ Thùy Trinh", "msg": "Chúc thầy Điệp mãi giữ được sự trong trắng... trong tâm hồn nhà giáo."},
    {"name": "Đặng Khánh Vân", "msg": "Chúc thầy một sinh nhật bay bổng như mây và thành công rực rỡ."}
]

@app.route('/')
def home():
    """Trang chủ - Hiển thị giao diện sinh nhật"""
    # Tự động quét ảnh từ thư mục static/img
    image_folder = os.path.join(app.static_folder, 'img')
    class_photos = []
    
    try:
        if os.path.exists(image_folder):
            all_files = os.listdir(image_folder)
            allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
            class_photos = [
                f for f in all_files 
                if any(f.lower().endswith(ext) for ext in allowed_extensions) 
                and f != 'teacher_avatar.jpg'
            ]
    except Exception as e:
        print(f"Lỗi khi quét ảnh: {e}")

    # Tự động quét nhạc từ thư mục static/music
    music_folder = os.path.join(app.static_folder, 'music')
    music_playlist = []
    
    try:
        if os.path.exists(music_folder):
            all_music = os.listdir(music_folder)
            allowed_music_ext = ['.mp3', '.ogg', '.wav', '.m4a']
            music_playlist = [
                f for f in all_music 
                if any(f.lower().endswith(ext) for ext in allowed_music_ext)
            ]
    except Exception as e:
        print(f"Lỗi khi quét nhạc: {e}")

    return render_template(
        'index.html',
        students=students_data,
        class_photos=class_photos,
        music_playlist=music_playlist
    )

@app.route('/api/stats')
def get_stats():
    """API endpoint để lấy thống kê"""
    return jsonify({
        'total_students': len(students_data),
        'total_photos': len([f for f in os.listdir(os.path.join(app.static_folder, 'img')) if f.endswith(('.jpg', '.png'))]),
        'class_name': '10A6'
    })

if __name__ == '__main__':
    # Tạo các thư mục cần thiết nếu chưa có
    for folder in ['static/img', 'static/css', 'static/js', 'static/music', 'templates']:
        os.makedirs(folder, exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)