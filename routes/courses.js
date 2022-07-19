const express = require('express');
const router = express.Router();
const pm = require('../controllers/courses');
const fileMgmt = require('../shared/fileMgmt');

// http://localhost:300/courses

router.get('/home', function (req, res, next) {
    const filePath = fileMgmt.getHtmlFilePath('courses-home.html');
    res.sendFile(filePath);
});

router.get('/', pm.CoursesList);
router.post('/', pm.addCourse);
router.get('/export', pm.exportCourses);
router.put('/:id', pm.editCourse);
//router.delete('/:id', pm.deleteCourse);
// router.get('/search/:id', pm.searchCourses);

module.exports = router;