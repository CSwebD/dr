document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.toggle-btn');
    const submenus = document.querySelectorAll('.submenu');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const submenu = document.getElementById(target);

            // Toggle submenu directly below button (for desktop & mobile)
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenus.forEach(sub => sub.style.display = 'none');
                submenu.style.display = 'block';
            }
        });
    });

    // Ensure submenu stays visible after window resize (for desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            submenus.forEach(sub => sub.style.display = 'none');
        }
    });
});
