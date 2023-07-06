import express from "express";
import { deleteUser, getAllUsers, insertUsers, updateUser } from "./service/usersService.js";

const app = express();

app.use(express.json());

app.get("/", getAllUsers);
app.post("/cadastrar", insertUsers);
app.delete("/deletar/:id", deleteUser);
app.put("/atualizar/:id", updateUser);

app.listen(5000, () => {
    console.log("Server working in port 5000");
});