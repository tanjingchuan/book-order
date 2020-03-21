// @login & register
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Teachers = require("../../models/Teachers");
const Students = require("../../models/Students");
const Courses = require("../../models/Courses");
const Books = require("../../models/Books");

// @route  GET api/data/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'data works' });
});

// @route  POST api/data/addTeacher
// @desc   增加教师接口
// @access Private
router.post(
  '/addTeacher',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const teacherFields = {};

    // 查询该数据中教师数量
    var tea_num = 0;
    Teachers.find().then(data => {
      tea_num = data.length + 1;
    })
    if(req.body.name) teacherFields.name = req.body.name;
    if(req.body.age) teacherFields.age = req.body.age;
    if(req.body.position) teacherFields.position = req.body.position;
    if(req.body.academy) teacherFields.academy = req.body.academy;

    // console.log(teacherFields);

    new Teachers(teacherFields).save().then(teacher => {
      console.log(teacher);
      res.json(teacher);
    });
  }
);

// @route  delete api/data
// @desc   删除教师数据
// @access Private
router.delete("/deltea",passport.authenticate("jwt",{session: false}),(req,res) => {
  Teachers.findOneAndRemove({name:req.body.name})

  // ,(err,res) => {
  //   if(err) {
  //     console.log("error:" + err);
  //   }else{
  //     console.log("res:" + res);
  //   }
  // }
  .then(teachers => {
    console.log(teachers);
    teachers.save().then(teacher => res.json(teacher));
  })
  .catch(err => res.status("404").json("删除失败"))
  // Teachers.find().then(data => {
  //   console.log(data);
  // })
  // Teachers.find({teacher_id:req.params.id}).then(
  //   profile => {
  //   // profile.save().then(profile => res.json(profile));
  //   console.log(profile);
  //   }
  // )
})

// @route  GET api/data
// @desc   获取所有教师数据
// @access Private

router.get(
  '/teaData',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Teachers.find()
      .then(teacher => {
        if (!teacher) {
          return res.status(404).json('没有任何内容');
        }

        res.json(teacher);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/data
// @desc   获取单个教师数据
// @access Private

router.get(
  '/single_teaData',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    var teaName = {};
    if(req.body.teaName) teaName = req.body.teaName;
    Teachers.find({name: teaName})
      .then(teacher => {
        if (!teacher) {
          return res.status(404).json('没有任何内容');
        }

        res.json(teacher);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/data/addStudent
// @desc   增加学生数据接口
// @access Private
router.post(
  '/addStudent',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const studentFields = {};
    var courses = [];
    // 获取当前时间并增加一个月设为截止日期
    var date = new Date();
    var deadline = date.getFullYear() + "-" + (date.getMonth() + 2) + "-" + date.getDate();

    if(req.body.stu_id) studentFields.stu_id = req.body.stu_id;
    if(req.body.name) studentFields.name = req.body.name;
    if(req.body.grade) studentFields.grade = req.body.grade;
    if(req.body.academy) studentFields.academy = req.body.academy;
    if(req.body.major) studentFields.major = req.body.major;
    if(req.body.class) studentFields.class = req.body.class;
    if(req.body.courses) studentFields.courses = [];
    courses = req.body.courses.split(",");
    console.log(courses);
    courses.forEach((item,index,arr) => {
      var tempObj = {}; //保存单个课程的临时对象
      tempObj.deadline = 
      tempObj.name = item;
      tempObj.ifOrder = false;
      tempObj.deadline = deadline;

      // 对课程表进行查询
      Courses.find({name: item}).then(data => {
          console.log(data);
          tempObj.teaName = data[0].teacher_name;
          return data[0].book_command;
      }).then(result => {
          Books.find({name: result}).then(book => {
            // console.log(tempObj);
            tempObj.book_command = book[0].name;
            tempObj.publish_house =  book[0].publish_house;
            tempObj.price = book[0].price;
  
            // console.log(tempObj);
            studentFields.courses.push(tempObj);
            // console.log(studentFields.courses);
  
            if(studentFields.courses.length == arr.length){
              new Students(studentFields).save().then(student => {
                // console.log(student);
                res.json(student); 
              });
              // console.log(book_order);
              // res.json(book_order);
            }
          })
      })

      // tempObj = {};
    })
  }
);

// @route  delete api/data
// @desc   删除学生数据
// @access Private
router.delete("/delstu",passport.authenticate("jwt",{session: false}),(req,res) => {
  Students.findOneAndRemove({stu_id:req.body.id})
  .then(students => {
    console.log(students);
    students.save().then(student => res.json(student));
  })
  .catch(err => {
    res.status("404").json("删除失败");
    Students.find().then(data => console.log(data));
  })
  
})

// @route  GET api/data
// @desc   获取所有学生数据
// @access Private

router.get(
  '/stuData',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Students.find()
      .then(student => {
        if (!student) {
          return res.status(404).json('没有任何内容');
        }

        res.json(student);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/data
// @desc   获取单个学生数据
// @access Private

router.get(
  '/single_stuData',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // 获取学号
    var schoolNum = req.query.schoolNum;
    Students.find({stu_id: schoolNum})
      .then(student => {
        if (!student) {
          return res.status(404).json('没有任何内容');
        }

        res.json(student);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/data
// @desc   获取教师对应课程信息
// @access Private

router.get(
  '/tea_courses',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // 获取教师姓名
    var teaName = req.query.teaName;
    Courses.find({teacher_name: teaName})
      .then(courses => {
        let teaCourses = []
        if (!courses) {
          return res.status(404).json('没有任何内容');
        }
        (async () => {
          for (let course of courses) {
            let courseMes = {}
            let course_students = []
            courseMes.course = course.name
            courseMes.teacher = course.teacher_name
            courseMes.deadline = '2020-04-05'
            courseMes.book_command = course.book_command
            const recommend_book = await Books.find({name: course.book_command})
            courseMes.book_price = recommend_book[0].price

            const students = await Students.find()
            students.forEach(stu => {
              stu.courses.forEach(course => {
                if (course.name === courseMes.course) {
                  course_students.push(stu)
                }
              })
            })
            courseMes.students = course_students
            teaCourses.push(courseMes)
          }
          res.json(teaCourses);
        })()
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/data
// @desc   编辑单个学生数据
// @access Private

router.post(
  '/edit_stuData',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // 获取学号并初始化其他参数
    console.log(req.body.course);
    var schoolNum = req.body.schoolNum;
    var course = {};

    // 改变订单状态
    if(req.body.course) course = req.body.course;

    // 先移除掉对应课程
    Students.update({stu_id: schoolNum},{$pull: {courses: {name: course.name}}},function(err,raw){
      if(err) console.log(err);
      // 再添加对应课程
      Students.update({stu_id: schoolNum},{$push: {courses: course}},function(err,raw){
        if(err) console.log(err);
      })
    })
    res.json("succeess");
  }
);

// @route  POST api/data/addCourse
// @desc   增加课程接口
// @access Private
router.post(
  '/addCourse',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const courseFields = {};

    // 查询该数据中教师数量
    Courses.find().then(data => {
      courseFields.course_id = data.length;
      if(req.body.name) courseFields.name = req.body.name;
      if(req.body.teacher_name) courseFields.teacher_name = req.body.teacher_name;
      if(req.body.grade) courseFields.grade = req.body.grade;
      if(req.body.book_command) courseFields.book_command = req.body.book_command;

      new Courses(courseFields).save().then(course => {
        console.log(course);
        res.json(course); 
      });
    })

  }
);

// @route  delete api/data
// @desc   删除课程数据
// @access Private
router.delete("/delcou",passport.authenticate("jwt",{session: false}),(req,res) => {
  Courses.findOneAndRemove({name:req.body.name})
  .then(courses => {
    console.log(courses);
    courses.save().then(course => res.json(course));
  })
  .catch(err => {
    res.status("404").json("删除失败");
    Courses.find().then(data => console.log(data));
  })
  
})

// @route  GET api/data
// @desc   获取所有课程数据
// @access Private

router.get(
  '/couData',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Courses.find()
      .then(course => {
        if (!course) {
          return res.status(404).json('没有任何内容');
        }

        res.json(course);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route post api/data
// @desc 增加教材信息
// access private
router.post("/addBooks",passport.authenticate("jwt",{session: false}),(req,res) => {
  const booksField = {};
  // 查询该数据中教材数量

  Books.find().then(data => {
    booksField.textbook_id = data.length;
    if(req.body.name) booksField.name = req.body.name;
    if(req.body.publish_house) booksField.publish_house = req.body.publish_house;
    if(req.body.price) booksField.price = req.body.price;

    new Books(booksField).save().then(book => {
      res.json(book); 
    });
  })
})

router.get('/getBooks', passport.authenticate("jwt",{session: false}), (req, res) => {
  Books.find().then(data => {
    res.json(data)
  })
})

// @route  delete api/data
// @desc   删除教材数据
// @access Private
router.delete("/delbook",passport.authenticate("jwt",{session: false}),(req,res) => {
  Books.findOneAndRemove({name:req.body.name})
  .then(books => {
    books.save().then(book => res.json(book));
  })
  .catch(err => {
    res.status("404").json("删除失败");
    Books.find().then(data => console.log(data));
  })
  
})

// @route get api/data/
// @desc 新增评价
// @access Private
router.post('/incEvaluate', passport.authenticate("jwt",{session: false}), (req, res) => {
  const params = {
    userName: req.body.userName,
    evaValue: req.body.evaValue,
    evaContent: req.body.evaContent
  }
  Books.findOneAndUpdate({ name: req.body.bookName },
    {
      $push: {
        evaluate: params
      }
    },
    {
      new: true
    }
  ).then(data => {
    console.log('更新后的数据', data)
    res.json(data)
  })
})

// @route get api/data/
// @desc 得到订单信息
// @access Private
router.get("/book_order",passport.authenticate("jwt",{session: false}),(req,res) => {
  // 获取学号
  var schoolNum = req.query.schoolNum;

  // 创建订单信息
  const book_order = {};
  book_order.courses = [];

  // 学生表中查找
  Students.find({stu_id: schoolNum}).then(data => {
    var tempData = data[0];

    book_order.schoolNum = tempData.stu_id;
    book_order.stuName = tempData.name;

    tempData.courses.forEach((item,index) => {
      var tempMessage = {};  //声明临时单个课程对象
      
      // (async function(item){
        tempMessage.name = item.name;
        tempMessage.ifOrder = item.ifOrder;

        // 对课程表进行查询
        Courses.find({name: item.name}).then(data => {
          tempMessage.teaName = data[0].teacher_name;
          return tempMessage;
        }).then(result => {
          book_order.courses.push(result);
          // if(index == tempData.courses.length-1){
          // }
          if(book_order.courses.length == tempData.courses.length){
            // console.log(book_order);
            res.json(book_order);
          }
        })
      // })(item);
    })
  })

})


module.exports = router;
