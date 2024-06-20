import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketService } from './websocket.service';
import { map } from 'rxjs';
const CHAT_URL = "ws://echo.websocket.org/";

export interface Message{
  author: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;
  
  constructor(websocketService: WebSocketService)
   {
    this.messages = <Subject<Message>>websocketService.connect(CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
    }
  ))}
}
