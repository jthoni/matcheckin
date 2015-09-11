using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using matApi.Models;

namespace matApi.Controllers
{
    [Route("api/Student/GetAllStudents")]
    public class StudentController : ApiController
    {
        private StudentDirectory2015Entities studenDb = new StudentDirectory2015Entities();

        public IQueryable<StudentList> GetAllStudents()
        {
            var results = studenDb.StudentLists;
            return results;
        }
        
    }
}
