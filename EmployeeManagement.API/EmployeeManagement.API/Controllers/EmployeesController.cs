using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeReadDto>>> GetAll()
        {
            var employees = await _service.GetAllAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeReadDto>> GetById(int id)
        {
            var employee = await _service.GetByIdAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeReadDto>> Create(EmployeeCreateDto employeeDto)
        {
            var createdEmployee = await _service.AddAsync(employeeDto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdEmployee.Id },
                createdEmployee
            );
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EmployeeReadDto>> Update(int id, EmployeeUpdateDto employeeDto)
        {
            var updatedEmployee = await _service.UpdateAsync(id, employeeDto);

            if (updatedEmployee == null)
            {
                return NotFound();
            }

            return Ok(updatedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}