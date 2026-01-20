import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-student-ai-chat',
  standalone: false,
  templateUrl: './student-ai-chat.html',
  styleUrls: ['./student-ai-chat.css']
})
export class StudentAiChat implements AfterViewChecked {
 @ViewChild('chatBody') private chatBody?: ElementRef<HTMLDivElement>;
 isOpen = false;
  message = '';
  messages: { sender: 'student' | 'ai', text: string }[] = [];
private autoScroll = true;

  constructor(private auth: Auth) {}

 ngAfterViewChecked() {
  if (this.autoScroll) {
    this.scrollToBottom();
    this.autoScroll = false;
  }
}
  toggleChat() {
    this.isOpen = !this.isOpen;
   // Add a starting AI message when chat opens
    if (this.isOpen && this.messages.length === 0) {
      this.messages.push({ sender: 'ai', text: '👋 Hi! I’m your AI tutor. Ask me anything about your courses.' });
    }
  }

 private scrollToBottom(): void {
    if (!this.isOpen || !this.chatBody) return;
    
    setTimeout(() => {
      const el = this.chatBody!.nativeElement;
      el.scrollTop = el.scrollHeight;
    }, 0);
  }

   sendMessage() {
  if (!this.message.trim()) return;

  this.messages.push({ sender: 'student', text: this.message });
  this.autoScroll = true;
  const userMessage = this.message;
  this.message = '';

  this.auth.sendMessageToAI(userMessage).subscribe({
    next: (res) => {
      const replyText = res?.reply ?? '⚠️ No reply from AI.';
      this.messages.push({ sender: 'ai', text: replyText });
      this.autoScroll = true; 
    },
    error: () => {
      this.messages.push({ sender: 'ai', text: '⚠️ Error connecting to AI.' });
      this.autoScroll = true;
    }
  });
}
}
