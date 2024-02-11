window.addEventListener('beforeunload', function (e) {
    // Hủy bỏ sự kiện mặc định (hiển thị hộp thoại xác nhận)
    e.preventDefault();
});

document.addEventListener('copy', () => {
    alert('Đã copy văn bản!')
})
