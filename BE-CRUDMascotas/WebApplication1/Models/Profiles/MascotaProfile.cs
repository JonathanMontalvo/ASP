using AutoMapper;
using WebApplication1.Models.DTO;

namespace WebApplication1.Models.Profiles
{
    public class MascotaProfile:Profile
    {
        public MascotaProfile() {
            CreateMap<Mascota, MascotaDTO>();
            CreateMap<MascotaDTO, Mascota>();
        }
    }
}
