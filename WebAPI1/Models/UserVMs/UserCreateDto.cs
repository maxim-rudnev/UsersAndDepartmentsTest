using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebAPI1.Models
{
    public class UserCreateDto
    {
        public string UserName { get; set; }

        public int DepartmentId { get; set; }
    }

}