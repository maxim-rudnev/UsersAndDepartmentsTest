using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI1.Models;

namespace WebAPI1.App_Start
{
    public class AutoMapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg => {

                cfg.CreateMap<User, UserDTO>().ReverseMap();

                cfg.CreateMap<List<User>, List<UserDTO>>();
            });


        }
    }
}