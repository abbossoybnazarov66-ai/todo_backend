import { pool } from '../database/db.js'




export const createTodo = async (req, res) => {
    try {
        const { name, date } = req.body;

        if (!name) {
            return res.status(400).json({ status: 400, message: "Todo nomi kiritilishi shart!" });
        }

        const todoDate =  new Date().toLocaleString();

        // Bazaga INSERT qilish
        const result = await pool.query(
            'INSERT INTO todos (name, completed, date) VALUES ($1, $2, $3) RETURNING *',
            [name, false, todoDate]
        );

        return res.status(201).json({
            status: 201,
            message: "Todo muvaffaqiyatli yaratildi",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server xatoligi" });
    }
};


export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params

        if (!id)
            return res.status(404).json({ status: 404, message: "user topilmadi" })

        await pool
            .query(
                `DELETE FROM TODOS WHERE ID = $1`, [id])
        return res.status(200).json({ status: 200, message: "user ochirildi" })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server xatoligi" });

    }
}



export const editTodo = async (req, res) => {
    try {
        let result
        const { id } = req.params;
        const { name, completed } = req.body;

        if (name != undefined) {
            result = await pool.query(
                'UPDATE todos SET name = $1 WHERE id = $2 RETURNING *',
                [name, id]
            )

        } else if (completed != undefined) {
            result = await pool.query(
                'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
                [completed, id])


        }

        if (!result || result.rows.length === 0) {
            return res.status(404).json({ status: 404, message: "Todo topilmadi!" });
        }

        return res.status(200).json({
            status: 200,
            message: "Muvaffaqiyatli tahrirlandi",
            data: result.rows[0]
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server xatoligi" });
    }
};




export const deleteAlltodos = async (req, res) => {

    try {

        pool.query(`delete  from todos`)

        return res.status(200).json({ status: 200, message: "Barcha todolar o'chirildi" })



    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server xatoligi" });
    }
}

export const deleteCompleted = async (req, res) => {

    try {

        pool.query(`delete  from todos where completed = true`)

        return res.status(200).json({ status: 200, message: "Barcha compltedes o'chirildi" })



    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server xatoligi" });
    }
}

export const deleteActives = async (req, res) => {

    try {

        pool.query(`delete  from todos where completed = false`)

        return res.status(200).json({ status: 200, message: "Barcha actives o'chirildi" })



    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server xatoligi" });
    }
}


export const getTodos = async (req, res) => {
    try {
        
        const { status } = req.query; 
        
        let query = 'SELECT * FROM todos';
        let queryParams = [];

       
        if (status === 'active') {
            query += ' WHERE completed = $1';
            queryParams.push(false);
        } 
      
        else if (status === 'completed') {
            query += ' WHERE completed = $1';
            queryParams.push(true);
        }
        

        query += ' ORDER BY id DESC';

        const result = await pool.query(query, queryParams);

        return res.status(200).json({
            status: 200,
            data: result.rows
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Server xatoligi" });
    }
};

export default {
    getTodos, createTodo, deleteTodo, editTodo,deleteAlltodos
}
