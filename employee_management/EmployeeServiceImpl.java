package org.sourabh.employee_management;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployeeServiceImpl implements EmployeeService {
    
@Autowired
private EmployeeRepository employeeRepository;

@Override
public String createEmployee(Employee employee) {
    EmployeeEntity employeeEntity=new EmployeeEntity();
    BeanUtils.copyProperties(employee, employeeEntity);

    employeeRepository.save(employeeEntity);

    return "Saved successfull";
}

@Override
public List<Employee> readEmployee() {
    List<EmployeeEntity> employeesList=employeeRepository.findAll();
    List<Employee> employees=new ArrayList<>();
    for(EmployeeEntity employeeEntity:employeesList){
        Employee emp=new Employee();
        emp.setId(employeeEntity.getId());
        emp.setName(employeeEntity.getName());
        emp.setPhone(employeeEntity.getPhone());
        emp.setEmail(employeeEntity.getEmail());

        employees.add(emp);
    }
    return employees;
}

@Override
public boolean deleteEmployee(Long id) {
EmployeeEntity emp=employeeRepository.findById(id).get();
employeeRepository.delete(emp);
return true;

}

@Override
public String updateEmployee(Long id, Employee employee) {
    EmployeeEntity extingEmployee=employeeRepository.findById(id).get();

    extingEmployee.setEmail(employee.getEmail());
    extingEmployee.setName(employee.getName());
    extingEmployee.setPhone(employee.getPhone());

    employeeRepository.save(extingEmployee);
    return "updated successfull";
}

@Override
public Employee readEmployee(Long id) {
    EmployeeEntity employeeEntity=employeeRepository.findById(id).get();

    Employee employee=new Employee();
    BeanUtils.copyProperties(employeeEntity, employee);

    return employee;
}


}
