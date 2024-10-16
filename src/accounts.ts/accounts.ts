import { Request, Response, RequestHandler } from "express";
import OracleDB from "oracledb";
export namespace AccountsManager{
    
    export type userAccount = {
        id: number|undefined;
        completeName:string;
        email:string;
        password: string|undefined;
        admin: boolean;
    }

    async function login(email:string, password:string){
        let connection = await OracleDB.getConnection({
            user : 'ENZODEV',
            password : '1234',
            connectString : 'localhost:1521/XEPDB1'
        });

        const account = await connection.execute(
            'SELECT * FROM ACCOUNTS WHERE EMAIL = :email AND PASSWORD = :password',
            [email, password]
        );

        await connection.close();
        console.dir(account.rows);
        return account.rows;
    }

    export const signUpHandler:RequestHandler = (req:Request, res:Response)=>{
        const pName = req.get('name');
        const pEmail = req.get('email');
        const pPassword = req.get('password');
        
        // if(pName && pEmail && pPassword){
        //     const newAccount:userAccount = {
        //         id:(accountsDatabase.length+1),
        //         name:pName,
        //         email:pEmail,
        //         password:pPassword
        //     }
        //     const id = saveNewAccount(newAccount);
        //     res.statusCode = 200;
        //     res.send(`Nova conta adicionada! Código da conta ${id}`);
        // }else{
        //     res.statusCode = 400;
        //     res.send("Parâmetros Inválidos ou faltantes");
    }

    export const loginHandler:RequestHandler = async (req:Request,res:Response)=>{
        const pEmail = req.get('email');
        const pPassword = req.get('password');
        
        if(!pEmail || !pPassword){
            res.statusCode = 400;
            res.send("Email e senha são obrigatórios!");
            return;
        }
        const  account =  await login(pEmail, pPassword);

        if(account && account.length > 0){
            res.statusCode = 200;
            res.send("Usuário logado!");
        }else{
            res.statusCode = 400;
            res.send("Email ou senha inválidos!");
        }
    }    
}