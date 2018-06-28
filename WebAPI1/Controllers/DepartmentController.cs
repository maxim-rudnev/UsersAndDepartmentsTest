using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI1.Models;

namespace WebAPI1.Controllers
{
    public class DepartmentController : ApiController
    {
        ApplicationDbContext _db;

        public DepartmentController()
        {
            _db = new ApplicationDbContext();
        }

        public List<Department> GetAll()
        {


            return _db.Departments.ToList();
        }

        public void PostDepartment(DepartmentCreateDto department)
        {
            var departmentDT = new Department();
            departmentDT.Title = department.Title;

            _db.Departments.Add(departmentDT);
            _db.SaveChanges();

        }

        public void Put(Department department)
        {
            var departmentDT = _db.Departments.FirstOrDefault(x => x.Id == department.Id);

            if (departmentDT!= null)
            {
                departmentDT.Title = department.Title;
                _db.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var departmentDT = _db.Departments.FirstOrDefault(x => x.Id == id);

            if (departmentDT != null)
            {
                _db.Departments.Remove(departmentDT);
                _db.SaveChanges();

            }


        }
    }
}
