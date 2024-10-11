import { Request, Response, RequestHandler } from "express";

export namespace EventsManager{

    export type event = {
        id:number,
        title:string,
        description:string,
        eventDate:string
    }

    export let EventsDatabase:event [] = [];

    function addNewEvent(event:event){
        EventsDatabase.push(event);
        return EventsDatabase.length;
    }
    // Talvez será necessário fazer duas tabelas
    export const NewEventHandler:RequestHandler = (req:Request, res:Response) => {
        const pTitle = req.get('title');
        const pDescription = req.get('description');
        const pEventDate = req.get('eventDate');
        
        if(pTitle && pDescription && pEventDate){
            const newEvent: event = {
                id: (EventsDatabase.length+1),
                title: pTitle,
                description: pDescription,
                eventDate:pEventDate
            };
            const id = addNewEvent(newEvent);
            res.status(200);
            res.send(
                `
                Evento criado com sucesso!
                Id do evento: ${id}.
                Titulo: ${newEvent.title}
                Descrição: ${newEvent.description}
                Data do evento: ${newEvent.eventDate}
                `)
        }else{
            res.status(400);
            res.send(`Não foi Possível criar novo Evento\nParâmetros Faltantes!`)
        }
    }
}