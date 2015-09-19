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
    }
   
}
