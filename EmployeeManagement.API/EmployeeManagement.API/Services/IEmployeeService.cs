using EmployeeManagement.API.DTOs;

namespace EmployeeManagement.API.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeReadDto>> GetAllAsync();

        Task<EmployeeReadDto?> GetByIdAsync(int id);

        Task<EmployeeReadDto> AddAsync(EmployeeCreateDto employeeDto);

        Task<EmployeeReadDto?> UpdateAsync(int id, EmployeeUpdateDto employeeDto);

        Task<bool> DeleteAsync(int id);
    }
}