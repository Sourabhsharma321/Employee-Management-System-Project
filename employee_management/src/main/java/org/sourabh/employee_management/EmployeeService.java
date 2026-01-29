package org.sourabh.employee_management;
import java.util.List;

public interface EmployeeService {

String createEmployee(Employee employee);
List<Employee> readEmployee();
boolean deleteEmployee(Long id);
String updateEmployee(Long id, Employee employee);
Employee readEmployee(Long id);

}
