const joi = require('joi');
const database = require('./database');
const fileMgmt = require('../shared/fileMgmt');

module.exports = {
    addCourse: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().required().min(2).max(100),
            description: joi.string().required().min(2).max(300),
            price: joi.number().required(),
        });

        const {
            error,
            value
        } = schema.validate(reqBody);

        if (error) {
            res.send(`error adding courses: ${error}`);
            return;
        }

        const sql = "INSERT INTO courses(name, description, price)" +
            " VALUES(?,?,?);";

        try {
            const result = await database.query(
                sql,
                [
                    reqBody.name,
                    reqBody.description,
                    reqBody.price,
                ]
            );
        } catch (err) {
            console.log(err);
            return;
        }

        res.send(`${reqBody.name} added successfully`);
    },

    CoursesList: async function (req, res, next) {
        const param = req.query;

        const schema = joi.object({
            column: joi.string().valid('name', 'price').default('name'),
            sort: joi.string().valid('ASC', 'DESC').default('ASC'),
        });

        const {
            error,
            value
        } = schema.validate(param);

        if (error) {
            // console.log(error);
            res.status(400).send('add failed');
            throw error;
        }

        const sql = `SELECT * FROM courses ORDER BY courses.${value.column} ${value.sort};`;

        try {
            const result = await database.query(sql);
            res.json(result[0]);
        } catch (err) {
            console.log(err);
        }
    },

    // todo: search product by name
    exportCourses: function (req, res, next) {
        const sql = "SELECT name,description,price FROM courses ORDER BY name ASC;";
        fileMgmt.exportToFile(res, sql, 'courses');
    },

    // todo: edit product details
    editCourse: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().min(2).max(100),
            description: joi.string().min(2).max(300),
            price: joi.number(),
            image: joi.string().min(5).max(200),
        }).min(1);

        const {
            error,
            value
        } = schema.validate(reqBody);

        if (error) {
            res.status(400).send(`error update course: ${error}`);
            return;
        }
        /*
        {
            name: 'aaa',
            price: 15,
        }
        */

        const keys = Object.keys(value); // ['name','price']
        const values = Object.values(value); // ['aaa', 15]
        // const fields = keys.map(key => `${key}=?`); // ['name=?','price=?']
        // const parseFileds = fields.join(','); // 'name=?,price=?'
        const fields = keys.map(key => `${key}=?`).join(',');
        values.push(req.params.id);
        const sql = `UPDATE courses SET ${fields} WHERE id=?`;

        try {
            const result = await database.query(sql, values);
            res.json(value);
        } catch (err) {
            console.log(err);
            return;
        }


    },


    // todo: search courses by name
    searchCourses: async function (req, res, next) {
        // const sql = SELECT WHERE...
        res.send('todo search courses');
    },


}