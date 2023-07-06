import { getConnection } from "../models/dbConfig.js";

export async function getAllUsers(req, res){
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM users");
        return res.status(200).json(result.recordset);
    }
    catch(err){
        return res.status(500).json("Erro de servidor");
    }
}

export async function insertUsers(req, res){
    const { name, age, city, uf } = req.body;
    const user = { name, age, city, uf };

    const pool = await getConnection();

    pool.request()
        .input('name', name)
        .input('age', age)
        .input('city', city)
        .input('uf', uf)
        .query("INSERT INTO users(name, age, city, uf) VALUES(@name, @age, @city, @uf)");

    return res.status(201).json({ user });
}

export async function updateUser(req, res){
    const { id } = req.params;
    const { name, age, city, uf } = req.body;
    
    try{
        const pool = await getConnection();

        pool.request()
            .input('id', id)
            .input('name', name)
            .input('age', age)
            .input('city', city)
            .input('uf', uf)
            .query(
                "UPDATE users SET name = @name, age = @age, city = @city, uf = @uf WHERE id = @id"
            );

        return res.status(200).json(req.body);
    }
    catch(err){
        return res.status(500).json("Erro inesperado");
    }
}

export async function deleteUser(req, res){
    try{
        const { id } = req.params;

        const pool = await getConnection();

        pool.request().input('id', id)
            .query("DELETE FROM users WHERE id = @id");

        return res.status(200).json("Usuário excluido com sucesso");
    }
    catch(err){
        return res.status(500).status("Erro ao excluir");
    }
}