using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI1.Models
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public int DepartmentId { get; set; }

        public string Department { get; set; }
    }
}