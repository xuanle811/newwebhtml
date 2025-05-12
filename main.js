function renderHome() {
  return `
    <h2>Welcome</h2>
    <p>Click Dashboard/Log/Show data to know more information about network log!</p>
  `;
}

function renderAbout() {
  return `
    <h2>Giới thiệu</h2>
    <p>Đây là trang giới thiệu.</p>
  `;
}

function renderApp() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <main id="view">${getPageContent()}</main>
  `;
}

function getPageContent() {
  const hash = window.location.hash;
  if (hash === "#/about") {
    return renderAbout();
  }
  return renderHome();
}

// Nạp header
// Tải header.html vào thẻ #header-container
fetch('pages/header/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    setupHeaderEvents(); // Gọi hàm setup sau khi header đã load
  });

function setupHeaderEvents() {
  const avatarBtn = document.getElementById("avatar-btn");
  const popover = document.getElementById("popover");

  avatarBtn?.addEventListener("click", () => {
    popover.style.display = popover.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!avatarBtn?.contains(e.target) && !popover?.contains(e.target)) {
      popover.style.display = "none";
    }
  });
}

//Kết thúc headerjs

// Chèn Sidebar
fetch('pages/sidebar/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar-container').innerHTML = html;
  });

  // Hàm toggle submenu – gắn vào global để HTML inline onclick dùng được
  window.toggleSubmenu = function (id) {
    const el = document.getElementById(id);
    if (el.style.display === 'none') {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  };
  //kết thúc sidebar


// Hàm khi nhấn vào nút "Show Data"
function showLogPage() {
  // Lấy phần tử container
  const logContainer = document.getElementById('log-container');
  
  // tải log.html
  fetch('pages/log/log.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Không thể tải log.html');
      }
      return response.text(); // Trả về nội dung HTML dưới dạng văn bản
    })
    .then(data => {
      logContainer.innerHTML = data; // Chèn nội dung của log.html vào container
      logContainer.style.display = 'block'; // Hiển thị nội dung
      // Sau khi log.html đã chèn, load script.js
      const script = document.createElement('script');
      script.src = 'pages/log/script.js';
      script.onload = function () {
        if (typeof initLogEvents === "function") {
          initLogEvents(); // Gọi hàm Switch to Table
        } else {
          console.error("Không tìm thấy hàm initLogEvents trong script.js");
        }
      };
      document.body.appendChild(script);
    })
    .catch(error => {
      console.error('Có lỗi khi tải log.html:', error);
    });
}


window.addEventListener("hashchange", renderApp);
window.addEventListener("DOMContentLoaded", renderApp);
