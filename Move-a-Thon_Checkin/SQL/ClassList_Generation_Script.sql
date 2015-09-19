/*****************************************
**
**	Set to use linked server	
**
*****************************************/
-- Prob not all of these are required

/*
EXEC sp_configure 'show advanced options', 1
RECONFIGURE
GO
EXEC sp_configure 'ad hoc distributed queries', 1
RECONFIGURE
GO
EXEC sp_configure 'xp_cmdshell', 1
GO
RECONFIGURE
GO

EXEC master.dbo.sp_MSset_oledb_prop N'Microsoft.ACE.OLEDB.12.0', N'AllowInProcess', 1
GO
EXEC master.dbo.sp_MSset_oledb_prop N'Microsoft.ACE.OLEDB.12.0', N'DynamicParameters', 1
GO

USE [master] 
GO 
EXEC master.dbo.sp_MSset_oledb_prop N'Microsoft.ACE.OLEDB.12.0', N'AllowInProcess', 1 
GO 
EXEC master.dbo.sp_MSset_oledb_prop N'Microsoft.ACE.OLEDB.12.0', N'DynamicParameters', 1 
GO 
*/
/*****************************************
**
**	Create the FlatFile import	
**
*****************************************/
/*
EXEC sp_addlinkedserver
   @server = 'TestServer'
  ,@provider = 'Microsoft.ACE.OLEDB.12.0'
  ,@datasrc = 'C:\Users\jthoni\ClassList2015.mdb'
  ,@srvproduct='Access'
GO
*/

--DROP TABLE FlatFile

/*
CREATE TABLE FlatFile
(
	ID int NOT NULL IDENTITY (1,1),
	TeacherAM varchar(255) NOT NULL,
	TeacherPM varchar(255) NOT NULL,
	Lang_Grade varchar(255) NOT NULL,
	Student_FirstName varchar(255) NOT NULL,
	Student_LastName varchar(255) NOT NULL,
	Student_LastName_FirstName varchar(255) NOT NULL,
	Student_FirstName_LastName varchar(255) NOT NULL,
	Notes varchar(255),
	CONSTRAINT FlatFile_pk PRIMARY KEY CLUSTERED (ID)
);
*/

/*
INSERT INTO [dbo].[FlatFile] (TeacherAM, TeacherPM, Lang_Grade, Student_FirstName, Student_LastName, Student_LastName_FirstName, Student_FirstName_LastName, Notes  )
SELECT TeacherAM, TeacherPM, Lang_Grade, Student_FirstName, Student_LastName, Student_LastName_FirstName, Student_FirstName_LastName, Notes 
FROM TestServer...ALLINFO
*/

/*****************************************
**
**	Create the Teachers table	
**
*****************************************/
--DROP TABLE Teachers

/*
CREATE TABLE Teachers
(
	TeacherID int NOT NULL IDENTITY (1,1),
	FullName varchar(255) NOT NULL,
	CONSTRAINT Teachers_pk PRIMARY KEY CLUSTERED (TeacherID)
);
*/

/*
SELECT DISTINCT
	TeacherAM
	INTO #teachersAM
FROM FlatFile

SELECT DISTINCT
	TeacherPM
		INTO #teachersPM
FROM FlatFile

INSERT INTO Teachers (FullName)
SELECT * FROM #teachersAM
UNION
	SELECT * FROM #teachersPM

DROP TABLE #teachersAM
DROP TABLE #teachersPM
*/

/*****************************************
**
**	Create the Classes table	
**
*****************************************/

--DROP TABLE Classes
/*
CREATE TABLE Classes
(
	ClassID int NOT NULL IDENTITY (1,1),
	ClassCode varchar(255) NOT NULL,
	Grade nvarchar(10),
	Language varchar(50),
	AMTeacherID int,
	PMTeacherID int,
	CONSTRAINT Classes_pk PRIMARY KEY CLUSTERED (ClassID)
);
*/


/*
INSERT INTO Classes (ClassCode, Grade, Language, AMTeacherID, PMTeacherID)
SELECT DISTINCT	
	F.Lang_Grade
	,SUBSTRING(Lang_Grade, 1, 1) AS Grade
	,CASE WHEN Lang_Grade LIKE '%-J' THEN 'Japanese'
			ELSE 'Spanish'
			END AS Language
	--,F.TeacherAM
	,	(
			SELECT T.TeacherID FROM Teachers T
			WHERE T.FullName = F.TeacherAM
		) AS TeacherAMID
	--,F.TeacherPM	
	,	(
			SELECT T.TeacherID FROM Teachers T
			WHERE T.FullName = F.TeacherPM
		) AS TeacherPMID
FROM FlatFile F
ORDER BY F.Lang_Grade ASC
*/

/*****************************************
**
**	Create the Students table	
**
*****************************************/

--DROP TABLE Students

/*
CREATE TABLE Students
(
	StudentID int NOT NULL IDENTITY (1,1),
	ClassID int NOT NULL,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NOT NULL,
	Notes varchar(255),
	CONSTRAINT Students_pk PRIMARY KEY CLUSTERED (StudentID)
);
*/

/*
INSERT INTO Students (ClassID, FirstName, LastName, Notes)
SELECT DISTINCT
	(
		SELECT C.ClassID 
		FROM Classes C
		WHERE (
				(C.AMTeacherID = (
									SELECT 	T.TeacherID
									FROM Teachers T
									WHERE F.TeacherAM = T.FullName
								)
				)
				AND 
				(C.PMTeacherID = (
									SELECT 	T.TeacherID
									FROM Teachers T
									WHERE F.TeacherPM = T.FullName
								)
				)
				
		) 
	)AS ClassID
	,F.Student_FirstName
	,F.Student_LastName
	,F.Notes
FROM FlatFile F
ORDER BY F.Student_FirstName ASC
*/

/*****************************************
**
**	Create the Check-in table	
**
*****************************************/

--DROP TABLE CheckIn
/*

CREATE TABLE CheckIn
(
	CheckInID int NOT NULL IDENTITY (1,1),
	StudentID int NOT NULL,
	ShirtSize nvarchar(10),
	CheckInTime smalldatetime,
	Notes varchar(255),
	CheckInBy nvarchar(50),
	CONSTRAINT CheckIn_pk PRIMARY KEY CLUSTERED (CheckInID)
);
*/

/*****************************************
**
**	Validation	
**
*****************************************/

-- Flat files (less the concatenated columns
/*
SELECT 'FlatFile'		
      ,[TeacherAM]
      ,[TeacherPM]
      ,[Lang_Grade]
      ,[Student_FirstName]
      ,[Student_LastName]
      ,[Notes]
  FROM [StudentDirectory2015].[dbo].[FlatFile]
  ORDER BY Lang_Grade, Student_FirstName  ASC

-- Generated tables
SELECT 'Tables'
	,(
		SELECT T.FullName
		FROM Teachers T
		WHERE T.TeacherID = C.AMTeacherID
	) AS TeacherAM
	,(
		SELECT T.FullName
		FROM Teachers T
		WHERE T.TeacherID = C.PMTeacherID
	) AS TeacherPM
	,C.ClassCode
	,S.[FirstName]
	,S.[LastName]
	,S.Notes	
FROM Students S
JOIN Classes C
	ON C.ClassID = S.ClassID
ORDER BY C.ClassCode, S.[FirstName] ASC
*/

/*****************************************
**
**	Create Views
**
*****************************************/
--DROP VIEW vStudentList

/*
CREATE VIEW vStudentList AS
SELECT 
	S.StudentID
	,S.[FirstName]
	,S.[LastName]
	,C.ClassCode
	,(
		SELECT T.FullName
		FROM Teachers T
		WHERE T.TeacherID = C.AMTeacherID
	) AS TeacherAM
	,(
		SELECT T.FullName
		FROM Teachers T
		WHERE T.TeacherID = C.PMTeacherID
	) AS TeacherPM
	,S.Notes	
FROM Students S
JOIN Classes C
	ON C.ClassID = S.ClassID
*/
--SELECT * FROM [dbo].[StudentList]

/*
  CREATE VIEW TeachersAM AS
  SELECT 
  T.TeacherID
  ,T.FullName
  FROM Teachers T
  INNER JOIN Classes C
  ON T.TeacherID = C.AMTeacherID
  */

  /*
  CREATE VIEW TeachersPM AS
  SELECT 
  T.TeacherID
  ,T.FullName
  FROM Teachers T
  INNER JOIN Classes C
  ON T.TeacherID = C.PMTeacherID
  */

/******* Check in status ********/

--DROP VIEW vCInStatus
 /*
CREATE VIEW vCInStatus AS
SELECT 
	CI.StudentID
	,S.FirstName
	,S.LastName
	,CI.ShirtSize
	,CI.CheckInBy
	,CI.CheckInTime
	,CI.Notes
FROM CheckIn CI
JOIN Students S
	ON CI.StudentID = S.StudentID
*/

/*****************************************
**
**	Create Stored Proceedures
**
*****************************************/

/****** Get Students by Teacher ******/

--DROP PROCEDURE procGetStudentsByTeacherID

/*
CREATE PROCEDURE procGetStudentsByTeacherID @TeacherID int, @AM bit = 1
AS
IF (@AM = 1)
SELECT 
	S.LastName
	,S.FirstName
	,S.StudentID
	,C.ClassID
	,C.ClassCode	
	,C.Grade
	,C.Language
	,T.FullName
	,T.TeacherID
FROM Students S
JOIN Classes C
	ON S.ClassID = C.ClassID
	JOIN Teachers T
		ON C.AMTeacherID = T.TeacherID
WHERE C.AMTeacherID = @TeacherID
ELSE
SELECT 
	S.LastName
	,S.FirstName
	,S.StudentID
	,C.ClassID
	,C.ClassCode	
	,C.Grade
	,C.Language
	,T.FullName
	,T.TeacherID
FROM Students S
JOIN Classes C
	ON S.ClassID = C.ClassID
	JOIN Teachers T
		ON C.PMTeacherID = T.TeacherID
WHERE C.PMTeacherID = @TeacherID
GO
*/
/****** Get Students by Grade ******/

-- DROP PROCEDURE procGetStudentsByGrade

/*
CREATE PROCEDURE procGetStudentsByGrade @Grade nvarchar(10)
AS
SELECT 
	S.LastName
	,S.FirstName
	,S.StudentID
	,C.ClassID
	,C.ClassCode	
	,C.Grade
	,C.Language
FROM Students S
JOIN Classes C
	ON S.ClassID = C.ClassID
WHERE C.Grade = @Grade
GO
*/
/****** Get Students by Lang/Grade ******/

-- DROP PROCEDURE procGetStudentsByLangGrade
/*
CREATE PROCEDURE procGetStudentsByLangGrade @Lang nvarchar(50), @Grade nvarchar(10)
AS
SELECT 
	S.LastName
	,S.FirstName
	,S.StudentID
	,C.ClassID
	,C.ClassCode	
	,C.Grade
	,C.Language
FROM Students S
JOIN Classes C
	ON S.ClassID = C.ClassID
WHERE C.Grade = @Grade
	AND C.Language = @Lang
GO
*/

/****** Get Students by ID ******/

--DROP PROCEDURE procGetStudentsByID

/*
CREATE PROCEDURE procGetStudentsByID @studentID int
AS
SELECT 
	S.StudentID
	,S.[FirstName]
	,S.[LastName]
	,C.ClassCode
	,C.Grade
	,C.Language
	,(
		SELECT T.FullName
		FROM Teachers T
		WHERE T.TeacherID = C.AMTeacherID
	) AS TeacherAM
	,(
		SELECT T.FullName
		FROM Teachers T
		WHERE T.TeacherID = C.PMTeacherID
	) AS TeacherPM
	,S.Notes	
FROM Students S
JOIN Classes C
	ON C.ClassID = S.ClassID
WHERE S.StudentID = @studentID
GO
*/
	

/****** CheckIn ******/

-- DROP PROCEDURE procStudentCheckIn
/*
CREATE PROCEDURE procStudentCheckIn @StudentID int, @ShirtSize nvarchar(10), @Notes varchar(255), @CheckInBy nvarchar(50)
AS
INSERT INTO CheckIn (StudentID, ShirtSize, CheckInTime, Notes, CheckInBy)
VALUES (@StudentID, @ShirtSize, GETDATE(), @Notes, @CheckInBy)
GO
*/

