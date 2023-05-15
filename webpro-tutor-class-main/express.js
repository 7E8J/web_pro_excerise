const express = require('express');
const Joi = require('joi');
const app = express();

const pool = require('./config/database');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

router = express.Router();

const todoSchema = Joi.object({
  title: Joi.string().required().error(new Error('ต้องกรอก title')),
  description: Joi.string().required().error(new Error('ต้องกรอก description')),
  due_date: Joi.date().iso().optional(),
});

router.post('/todo', async (req, res, next) => {
  const { error, value } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const { title, description, due_date} = req.body;

  try{
    const [order] = await conn.query('SELECT MAX(`order`)+ 1 FROM todo');
    console.log(order[0]['MAX(`order`)+ 1']);
    const [InsertItem] = await conn.query('INSERT INTO todo (title, description, due_date, `order`) VALUES (?,?,?,?)',
      [title, description, due_date === null ? 'CURRENT_TIMESTAMP' : due_date, order[0]['MAX(`order`)+ 1']]
    )

    res.status(201).json({
      "message": "สร้าง ToDo 'อ่านหนังสือสอบ Web Pro' สำเร็จ",
      "todo": {
        "id": InsertItem.insertId,
        "title": title,
        "description": description,
        "due_date": due_date,
        "order": order[0]['MAX(`order`)+ 1']
      }
    })
    
  } catch(err) {
    await conn.rollback();
    console.log(err);
  } finally {
    conn.release();
  }

})

router.delete("/todo/:id", async (req, res, next) => {
  const { id } = req.params;
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  
  try {
    const [getItem] = await pool.query('SELECT * FROM todo WHERE id = ?', [id]);
    const [deleteItem] = await conn.query('DELETE FROM todo WHERE id = ?', [id]);

    await conn.commit();
    res.send({
      message: `ลบ ToDo '${getItem[0].title}' สำเร็จ`,
    });

  } catch (err) {
    await conn.rollback();
    return res.status(404).send({
      "message": "ไม่พบ ToDo ที่ต้องการลบ",
    });
  } finally {
    conn.release();
  }
});


router.get("/todo/", async (req, res, next) => {

  const { start_date, end_date } = req.query;

  if(Object.keys(req.query).length === 0){
    const [data] = await pool.query(`SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date  FROM todo WHERE due_date`)
    return res.json(data)
    
  } else {
    const [data] = await pool.query(`SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date  FROM todo WHERE due_date BETWEEN ? AND ?`, [start_date, end_date])
    return res.json(data)
  }
})

app.use(router)

module.exports = app;