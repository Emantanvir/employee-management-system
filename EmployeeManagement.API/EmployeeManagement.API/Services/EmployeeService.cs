using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Models;
using EmployeeManagement.API.Repositories;

namespace EmployeeManagement.API.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeService(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EmployeeReadDto>> GetAllAsync()
        {
            var employees = await _repository.GetAllAsync();

            return employees.Select(e => new EmployeeReadDto
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Email = e.Email,
                Phone = e.Phone,
                Department = e.Department,
                CreatedDate = e.CreatedDate
            });
        }

        public async Task<EmployeeReadDto?> GetByIdAsync(int id)
        {
            var employee = await _repository.GetByIdAsync(id);

            if (employee == null)
            {
                return null;
            }

            return new EmployeeReadDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                Phone = employee.Phone,
                Department = employee.Department,
                CreatedDate = employee.CreatedDate
            };
        }

        public async Task<EmployeeReadDto> AddAsync(EmployeeCreateDto employeeDto)
        {
            var employee = new Employee
            {
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Email = employeeDto.Email,
                Phone = employeeDto.Phone,
                Department = employeeDto.Department,
                CreatedDate = DateTime.UtcNow
            };

            var createdEmployee = await _repository.AddAsync(employee);

            return new EmployeeReadDto
            {
                Id = createdEmployee.Id,
                FirstName = createdEmployee.FirstName,
                LastName = createdEmployee.LastName,
                Email = createdEmployee.Email,
                Phone = createdEmployee.Phone,
                Department = createdEmployee.Department,
                CreatedDate = createdEmployee.CreatedDate
            };
        }

        public async Task<EmployeeReadDto?> UpdateAsync(int id, EmployeeUpdateDto employeeDto)
        {
            var employee = new Employee
            {
                Id = id,
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Email = employeeDto.Email,
                Phone = employeeDto.Phone,
                Department = employeeDto.Department
            };

            var updatedEmployee = await _repository.UpdateAsync(employee);

            if (updatedEmployee == null)
            {
                return null;
            }

            return new EmployeeReadDto
            {
                Id = updatedEmployee.Id,
                FirstName = updatedEmployee.FirstName,
                LastName = updatedEmployee.LastName,
                Email = updatedEmployee.Email,
                Phone = updatedEmployee.Phone,
                Department = updatedEmployee.Department,
                CreatedDate = updatedEmployee.CreatedDate
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}