import express from "express";
import { Request, Response, Router } from "express";

import { AccountsManager } from "./accounts.ts/accounts";
import { EventsManager } from "./events/events";

const port = 3000;
const server = express();
const routes = Router();

routes.get('/', (req:Request, res:Response) =>{
    res.statusCode = 403;
    res.send('<h2>Acesso não permitido</h2>')
});

routes.put('/signUp', AccountsManager.signUpHandler);
routes.post('/login', AccountsManager.loginHandler);

routes.post('/addNewEvent', EventsManager.NewEventHandler);
routes.get('/getEvent', EventsManager.GetEventHandler);

server.use(routes);

server.listen(port, ()=>{
    console.log(`Eita mundo bom!\nPorta: ${port}.`)
})