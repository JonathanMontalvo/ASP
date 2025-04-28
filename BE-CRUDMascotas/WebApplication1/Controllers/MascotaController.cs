using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using WebApplication1.Models.DTO;
using WebApplication1.Models.Repository;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MascotaController : ControllerBase
    {
        private readonly IMascotaRepository _mascotaRepository;
        private readonly IMapper _mapper;

        public MascotaController(IMascotaRepository mascotaRepository, IMapper mapper) {
            _mascotaRepository = mascotaRepository;
            _mapper = mapper;
        }

        [HttpGet("Ver")]
        public async Task<IActionResult> GetMascotas()
        {
            try
            {
                var listMascotas = await _mascotaRepository.GetListMascotas();
                var mascotasDto = _mapper.Map<List<MascotaDTO>>(listMascotas);

                return Ok(mascotasDto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Ver/{id}")]
        public async Task<IActionResult> GetMascota(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetMascota(id);
                var mascotaDto = _mapper.Map<MascotaDTO>(mascota);
                return mascota != null ? Ok(mascotaDto) : NotFound($"No se encontró ninguna mascota con el ID {id}");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> DeleteMascota(int id) {
            try
            {
                var mascota = await _mascotaRepository.GetMascota(id);
                if(mascota == null)
                {
                    return NotFound($"No se encontró ninguna mascota con el ID {id}");
                }

                await _mascotaRepository.DeleteMascota(mascota);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Agregar")]
        public async Task<IActionResult> NewMascota(MascotaDTO mascotaDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(mascotaDto.Nombre)
                    || string.IsNullOrWhiteSpace(mascotaDto.Raza)
                    || string.IsNullOrWhiteSpace(mascotaDto.Color)
                    || mascotaDto.Peso <= 0 
                    || mascotaDto.Edad < 0 )
                {
                    return BadRequest("Datos con formato incorrecto");
                }
                var mascota = _mapper.Map<Mascota>(mascotaDto);
                mascota.FechaCreacion = DateTime.Now;

                var mascotaItem = await _mascotaRepository.AddMascota(mascota);

                var mascotaItemDto = _mapper.Map<MascotaDTO>(mascotaItem);

                return CreatedAtAction("GetMascota", new {id = mascotaItemDto.Id}, mascotaItemDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Editar/{id}")]
        public async Task<IActionResult> EditMascota(int id, MascotaDTO mascotaDto)
        {
            try
            {
                if (mascotaDto.Id != id
                    ||string.IsNullOrWhiteSpace(mascotaDto.Nombre)
                    || string.IsNullOrWhiteSpace(mascotaDto.Raza)
                    || string.IsNullOrWhiteSpace(mascotaDto.Color)
                    || mascotaDto.Peso <= 0
                    || mascotaDto.Edad < 0)
                {
                    return BadRequest("Datos con formato incorrecto");
                }

                var mascotaItem = await _mascotaRepository.GetMascota(id);
                if (mascotaItem == null) {
                    return NotFound($"No se encontró ninguna mascota con el ID {id}");
                }

                var mascota = _mapper.Map<Mascota>(mascotaDto);

                await _mascotaRepository.UpdateMascota(mascota);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
