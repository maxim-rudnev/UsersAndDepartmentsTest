using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebAPI1.Models
{
    public class DepartmentCreateDto
    {
        
        public string Title { get; set; }
    }

}