import { Request, Response, RequestHandler } from "express";

export namespace AccountsManager{
    
    export type userAccount = {
        id: number|undefined;
        name:string;
        email:string;
        password: string|undefined;
    }
    export let accountsDatabase: userAccount[] = []

    function saveNewAccount(ua: userAccount){
        accountsDatabase.push(ua);
        return accountsDatabase.length;
    }

    export const signUpHandler:RequestHandler = (req:Request, res:Response)=>{
        const pName = req.get('name');
        const pEmail = req.get('email');
        const pPassword = req.get('password');
        
        if(pName && pEmail && pPassword){
            const newAccount:userAccount = {
                id:(accountsDatabase.length+1),
                name:pName,
                email:pEmail,
                password:pPassword
            }
            const id = saveNewAccount(newAccount);
            res.statusCode = 200;
            res.send(`Nova conta adicionada! Código da conta ${id}`);
        }else{
            res.statusCode = 400;
            res.send("Parâmetros Inválidos ou faltantes");
        }
    }

    export const loginHandler:RequestHandler = (req:Request,res:Response)=>{
        const pEmail = req.get('email');
        const pPassword = req.get('password');
        
        if(!pEmail || !pPassword){
            res.statusCode = 400;
            res.send("Email e senha são obrigatórios!");
            return;
        }
        
        let found:boolean = false;

        for(const account of accountsDatabase){
            if(account.email == pEmail && account.password == pPassword){
                res.statusCode = 200;
                res.send(`Seja bem vindo, ${account.name}`)
                found = true;
                break;
            }
        }
        
        if(!found){
            res.statusCode = 400;
            res.send("Email ou senha de login Inválidos!");
        }
    }
}