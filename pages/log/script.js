function initLogEvents() {
  const toggleButton = document.getElementById("toggle-view-btn");
  const tableContainer = document.getElementById("log-table-container");
  const chartSection = document.getElementById("chart-section");

  if (!toggleButton || !tableContainer || !chartSection) {
    console.warn("Không tìm thấy phần tử cần thiết");
    return;
  }

  let isTableVisible = true;
  let lineChart, barChart1, barChart2, barChart3, pieChart;

  toggleButton.addEventListener("click", function () {
    if (isTableVisible) {
      // Từ Bảng sang Biểu đồ
      tableContainer.style.display = "none";
      chartSection.style.display = "block";
      toggleButton.textContent = "Switch to Table";
      isTableVisible = false;

      // Vẽ 3 biểu đồ nếu chưa có
      if (!lineChart) lineChart = drawLineChart();
      if (!barChart1 || !barChart2 || !barChart3) {
        const charts = drawBarChart();
        barChart1 = charts.barChart1;
        barChart2 = charts.barChart2;
        barChart3 = charts.barChart3;
      }
      if (!pieChart) pieChart = drawPieChart();

    } else {
      // Từ Biểu đồ về Bảng
      chartSection.style.display = "none";
      tableContainer.style.display = "block";
      toggleButton.textContent = "Switch to Map";
      isTableVisible = true;

      highlightAnomalyRows();
    }
  });

  // Hiển thị mặc định
  tableContainer.style.display = "block";
  chartSection.style.display = "none";
  toggleButton.textContent = "Switch to Map";
  highlightAnomalyRows();
}

//hàm xử lý tô màu đỏ cho các hàng
function highlightAnomalyRows() {
  const rows = document.querySelectorAll("#log-table-container table tbody tr");
  rows.forEach(row => {
    const labelCell = row.cells[2]; // Cột thứ 3 là "Label"
    if (labelCell && labelCell.textContent.trim().toLowerCase() === "anomaly") {
      row.classList.add("anomaly-row");
    }
  });
}

function drawLineChart() {
  const data = {
    labels: ["14:00", "14:15", "14:30", "14:45", "15:00", "15:15"],  // Thời gian
    datasets: [{
      label: "Anomaly Count",
      data: [2, 5, 3, 7, 8, 4],  // Số lượng anomaly tại các thời điểm
      borderColor: "red",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      fill: false,
      tension: 0.2
    }]
  };

  return new Chart(document.getElementById("line-chart"), {
    type: "line",
    data,
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Anomaly Count Over Time", font: { size: 24 } }
      }
    }
  })
}

//Sinh random màu
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}
function drawBarChart() {
  const dataValues1 = [120, 90, 70, 40, 150];
  const dataValues2 = [12, 9, 10, 4, 8];
  const dataValues3 = [25, 46, 35, 49, 52];
  const label1 = ["cmd", "explorer", "svhost", "chrome", "brave"];
  const label2 = ["uid1", "uid2", "uid3", "uid4", "uid5"];
  const label3 = ["PID-1001", "PID-1002", "PID-1003", "PID-1004", "PID-1005"]
  const backgroundColors1 = dataValues1.map(() => getRandomColor());
  const backgroundColors2 = dataValues2.map(() => getRandomColor());
  const backgroundColors3 = dataValues2.map(() => getRandomColor());
  const data1 = {
    labels: label1,  // Các sự kiện
    datasets: [{
      label: label1,
      data: dataValues1,
      backgroundColor: backgroundColors1
    }]
  };
  const data2 = {
    labels: label2,  // Các sự kiện
    datasets: [{
      label: label2,
      data: dataValues2,
      backgroundColor: backgroundColors2
    }]
  };

  const data3 = {
    labels: label3,  // Các sự kiện
    datasets: [{
      label: label3,
      data: dataValues3,
      backgroundColor: backgroundColors3
    }]
  };

  const barChart1 = new Chart(document.getElementById("bar-chart1"), {
    type: "bar",
    data: data1,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            font: {
              size: 24 // to hơn nhãn trục X
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 24 // to hơn nhãn trục Y
            }
          }
        }
      },
      plugins: {
        title: { display: true, text: "Distribution of Exe Command", font: { size: 24 } },
        legend: {
          display: false,
          labels: {
            font: {
              size: 24 // nhãn màu to hơn
            }
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',  //Tooltip chỉ hiển thị cho cột đúng
          intersect: true,
          position: 'nearest',
          bodyFont: {
            size: 24 // Tăng kích thước chữ trong tooltip
          },
          titleFont: {
            size: 24 // Tăng kích thước tiêu đề tooltip
          },
          callbacks: {
            // Cập nhật thông tin tooltip
            label: function (tooltipItem) {
              const label = tooltipItem.label;
              const value = tooltipItem.raw;
              return `${label}: ${value} occurrences`;
            }
          }
        }
      }
    }
  });
  const barChart2 = new Chart(document.getElementById("bar-chart2"), {
    type: "bar",
    data: data2,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            font: {
              size: 24 // to hơn nhãn trục X
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 24 // to hơn nhãn trục Y
            }
          }
        }
      },
      plugins: {
        title: { display: true, text: "Distribution of User ID Activity", font: { size: 24 } },
        legend: {
          display: false,
          labels: {
            font: {
              size: 24 // nhãn màu to hơn
            }
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',  // Tooltip chỉ hiển thị cho cột đúng
          intersect: true,
          position: 'nearest',
          bodyFont: {
            size: 24 // Tăng kích thước chữ trong tooltip
          },
          titleFont: {
            size: 24 // Tăng kích thước tiêu đề tooltip
          },
          callbacks: {
            // Cập nhật thông tin tooltip
            label: function (tooltipItem) {
              const label = tooltipItem.label;
              const value = tooltipItem.raw;
              return `${label}: ${value} occurrences`;
            }
          }
        }
      }
    }
  });
  const barChart3 = new Chart(document.getElementById("bar-chart3"), {
    type: "bar",
    data: data3,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            font: {
              size: 24 // to hơn nhãn trục X
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 24 // to hơn nhãn trục Y
            }
          }
        }
      },
      plugins: {
        title: { display: true, text: "Distribution of Process ID Activity", font: { size: 24 } },
        legend: {
          display: false,
          labels: {
            font: {
              size: 24 // nhãn màu to hơn
            }
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',  // Tooltip chỉ hiển thị cho cột đúng
          intersect: true,
          position: 'nearest',
          bodyFont: {
            size: 24 // Tăng kích thước chữ trong tooltip
          },
          titleFont: {
            size: 24 // Tăng kích thước tiêu đề tooltip
          },
          callbacks: {
            // Cập nhật thông tin tooltip
            label: function (tooltipItem) {
              const label = tooltipItem.label;
              const value = tooltipItem.raw;
              return `${label}: ${value} occurrences`;
            }
          }
        }
      }
    }
  });
  return { barChart1, barChart2, barChart3 }
}


function drawPieChart() {
  const data = {
    labels: ["Failure", "Partial Success", "Time out", "Invalid Input"],  // Các nhãn phân loại
    datasets: [{
      data: [6, 14, 8, 14],  // Số liệu cho mỗi phân loại
      backgroundColor: ["red", "green", "blue", "orange"]  // Màu sắc cho các phân loại
    }]
  };

  return new Chart(document.getElementById("pie-chart"), {
    type: "pie",
    data,
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: "Anomaly vs Normal Distribution", font: { size: 18 } },
        legend: {
          display: false,
          labels: {
            font: {
              size: 24 // nhãn màu to hơn
            }
          }
        },
        tooltip: {
          bodyFont: {
            size: 20 // Tăng kích thước chữ trong tooltip
          },
          titleFont: {
            size: 20 // Tăng kích thước tiêu đề tooltip
          }
        }
      }
    }
  })
}

