import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Chat } from './chat.schema';
import { ChatService } from './chat.service';

interface IBody {
  data: string;
}

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() content: IBody,
    //@ConnectedSocket() socket: Socket,
  ): Promise<Promise<void>> {
    const message = await this.chatService.create({ message: content.data });
    this.server.emit('receive_message', message);
  }

  @SubscribeMessage('request_all_messages')
  async handleAllMessages() {
    const messages = await this.chatService.findAll();
    this.server.emit('all_messages', messages);
  }
}
