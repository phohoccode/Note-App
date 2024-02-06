window.addEventListener('beforeunload', function (e) {
    // Hủy bỏ sự kiện mặc định (hiển thị hộp thoại xác nhận)
    e.preventDefault();
});