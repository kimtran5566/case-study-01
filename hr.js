const readlineSync = require('readline-sync');

// Định nghĩa đối tượng Employee
function Employee(id, fullName, baseSalary, productQuantity) {
    this.id = id;
    this.fullName = fullName;
    this.baseSalary = baseSalary;
    this.productSalary = 1000; // Giả sử productSalary cố định là 1000 cho tất cả nhân viên
    this.productQuantity = productQuantity;
    this.totalSalary = 0;
}

// Hàm nhập số lượng nhân viên và thông tin từ terminal
function createEmployeeList() {
    const numEmployees = parseInt(readlineSync.question('Nhap so luong nhan vien: '));
    const employeeList = [];

    for (let i = 0; i < numEmployees; i++) {
        const id = i + 1;
        const fullName = readlineSync.question(`Nhap ten day du nhan vien ${id}: `);
        const baseSalary = parseFloat(readlineSync.question(`Nhap luong co ban ${id}: `));
        const productQuantity = parseInt(readlineSync.question(`Nhap so luong san pham ${id}: `));

        const employee = new Employee(id, fullName, baseSalary, productQuantity);
        employeeList.push(employee);
    }

    return employeeList;
}

// Hàm tính lương và xuất thông tin nhân viên console.table
function calculateAndDisplaySalaryTable(employeeList) {
    for (let i = 0; i < employeeList.length; i++) {
        const employee = employeeList[i];

        // Tính lương nhân viên
        let totalSalary = employee.baseSalary + (employee.productSalary * employee.productQuantity);

        // Kiểm tra và điều chỉnh lương theo yêu cầu
        if (employee.productQuantity < 50) {
            totalSalary *= 0.9; // Giảm 10% nếu số lượng sản phẩm ít hơn 50
        } else if (employee.productQuantity > 50) {
            const extraQuantity = employee.productQuantity - 50;
            totalSalary += (extraQuantity * 0.1 * employee.productSalary); // Thêm 10% cho mỗi sản phẩm vượt quá 50
        }

        // Gán tổng lương vào thuộc tính của nhân viên
        employee.totalSalary = totalSalary;
    }

    // Xuất danh sách nhân viên console.table
    console.table(employeeList);
}

// Hàm sắp xếp danh sách nhân viên theo tổng lương tăng dần
function sortEmployeeListBySalary(employeeList) {
    return employeeList.sort((a, b) => a.totalSalary - b.totalSalary);
}

// Hàm tìm nhân viên có tổng lương cao nhất
function findEmployeeWithHighestSalary(employeeList) {
    let maxSalary = -1;
    let maxSalaryEmployee = null;

    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].totalSalary > maxSalary) {
            maxSalary = employeeList[i].totalSalary;
            maxSalaryEmployee = employeeList[i];
        }
    }

    return maxSalaryEmployee;
}

// Hàm sửa thông tin nhân viên theo mã nhân viên
function editEmployeeById(employeeList, id) {
    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].id === id) {
            const newBaseSalary = parseFloat(readlineSync.question(`Nhap luong co ban moi cho nhan vien ${id}: `));
            const newProductQuantity = parseInt(readlineSync.question(`Nhap so luong san pham moi cho nhan vien ${id}: `));

            // Cập nhật thông tin nhân viên
            employeeList[i].baseSalary = newBaseSalary;
            employeeList[i].productQuantity = newProductQuantity;

            console.log('Thong tin nhan vien sau khi sua:');
            console.table([employeeList[i]]);
            return;
        }
    }

    console.log(`Khong tim thay nhan vien co ma ${id}`);
}

// Hàm xóa nhân viên theo mã nhân viên
function deleteEmployeeById(employeeList, id) {
    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].id === id) {
            // Xóa nhân viên khỏi danh sách
            employeeList.splice(i, 1);

            console.log('Danh sach nhan vien sau khi xoa:');
            console.table(employeeList);
            return;
        }
    }

    console.log(`Khong tim thay nhan vien co ma ${id}`);
}

// Thực hiện các bước và yêu cầu
const employees = createEmployeeList();
calculateAndDisplaySalaryTable(employees);

// Sắp xếp danh sách nhân viên theo tổng lương và xuất lại
const sortedEmployees = sortEmployeeListBySalary(employees);
console.log('Danh sach nhan vien sau khi xep theo tong luong:');
console.table(sortedEmployees);

// Tìm nhân viên có tổng lương cao nhất và xuất thông tin
const highestSalaryEmployee = findEmployeeWithHighestSalary(employees);
console.log('Nhan vien co tong luong cao nhat:');
console.table([highestSalaryEmployee]);

// Sửa thông tin nhân viên và xuất lại danh sách
const editEmployeeId = parseInt(readlineSync.question('Nhap ma nhan vien can sua thong tin: '));
editEmployeeById(employees, editEmployeeId);

// Xóa nhân viên và xuất lại danh sách
const deleteEmployeeId = parseInt(readlineSync.question('Nhap ma nhan vien can xoa: '));
deleteEmployeeById(employees, deleteEmployeeId);
