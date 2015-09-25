using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using matApi.Models;

namespace matApi.Controllers
{
    [AllowCrossSiteJson]
    public class StudentController : ApiController
    {
       // DB object
        private StudentDirectory2015Entities studenDb = new StudentDirectory2015Entities();

        [Route("api/Student/GetStudentByID/{studentID}")]
        public List<procGetStudentsByID_Result> GetStudentByID(int studentID)
        {
            List<procGetStudentsByID_Result> results = studenDb.procGetStudentsByID(studentID).ToList();
            return results;
        }

        [Route("api/Student/GetAllStudents")]
        public IQueryable<vStudentList> GetAllStudents()
        {
            var results = studenDb.vStudentLists.OrderBy(u => u.LastName).ThenBy(u => u.FirstName);            
            return results;
        }

        [Route("api/Student/GetTeachersAM")]
        public IQueryable<vTeachersAM> GetTeachersAM()
        {
            var results = studenDb.vTeachersAMs.OrderBy(u => u.FullName);
            return results;
        }

        [Route("api/Student/GetTeachersPM")]
        public IQueryable<vTeachersPM> GetTeachersPM()
        {
            var results = studenDb.vTeachersPMs.OrderBy(u => u.FullName);
            return results;
        }

        [Route("api/Student/GetTeachers")]
        public IQueryable<Teacher> GetTeachers()
        {
            var results = studenDb.Teachers.OrderBy(u => u.FullName);
            return results;
        }

        [Route("api/Student/GetByTeacherID/{teacherID}/{AM}")]
        public List<procGetStudentsByTeacherID_Result> GetByTeacherID(int teacherID, bool AM)
        {
            List<procGetStudentsByTeacherID_Result> results = studenDb.procGetStudentsByTeacherID(teacherID, AM).ToList();
            var ordered = results.OrderBy(x => x.LastName).ThenBy(x => x.FirstName).ToList(); 
            return ordered;            
        }

        [Route("api/Student/GetStudentsByGrade/{grade}")]
        public List<procGetStudentsByGrade_Result> GetStudentsByGrade(string grade)
        {
            List<procGetStudentsByGrade_Result> results = studenDb.procGetStudentsByGrade(grade).ToList();
            var ordered = results.OrderBy(x => x.LastName).ThenBy(x => x.FirstName).ToList();
            return ordered;
        }

        [Route("api/Student/GetStudentsByLangGrade/{lang}/{grade}")]
        public List<procGetStudentsByLangGrade_Result> GetStudentsByLangGrade(string lang, string grade)
        {
            List<procGetStudentsByLangGrade_Result> results = studenDb.procGetStudentsByLangGrade(lang, grade).ToList();
            var ordered = results.OrderBy(x => x.LastName).ThenBy(x => x.FirstName).ToList();
            return ordered;
        }

        [Route("api/Student/GetStudentCheckInInfo/{studentID}")]
        public IQueryable<vCInStatu> GetStudentCheckInInfo(int studentID)
        {
            var results = studenDb.vCInStatus.Where(s => s.StudentID == studentID);
            return results;
        }

        [Route("api/Student/StudentCheckIn/{studentID}/{shirtSize}/{notes}")]
        public IHttpActionResult StudentCheckIn(int studentID, string shirtSize,string notes)
        {
            string checkedInBy = "debugger";
            studenDb.procStudentCheckIn(studentID, shirtSize, notes, checkedInBy);
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/Student/undoCheckIn/{studentID}")]
        public IHttpActionResult undoCheckIn(int studentID)
        {
            studenDb.procUndoCheckIn(studentID);
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/Student/GetCheckCount")]
        public ObjectResult<int?> GetCheckCount()
        {
            var results = studenDb.procCheckInCount();
            return results;
        }

        [Route("api/Student/GetShirtsInfo")]
        public IQueryable<Shirt> GetShirtsInfo()
        {
            var results = studenDb.Shirts.OrderBy(u => u.ShirtsID);
            return results;
        }

        [Route("api/Student/ShirtDistribution/{purpose}/{youthMedium}/{youthLarge}/{medium}/{large}/{xl}")]
        public IHttpActionResult ShirtDistribution(string purpose, int youthMedium, int youthLarge, int medium, int large, int xl)
        {
            studenDb.procIncrementShirts(purpose, youthMedium, youthLarge, medium, large, xl);
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/Student/GetCheckInInfo/{studentID}")]
        public IQueryable<CheckIn> GetCheckInInfo(int studentID)
        {
            //var results = studenDb.Shirts.OrderBy(u => u.ShirtsID);
            var results = studenDb.CheckIns.Where(s => s.StudentID == studentID);
            return results;
        }
   
    }
   
}
