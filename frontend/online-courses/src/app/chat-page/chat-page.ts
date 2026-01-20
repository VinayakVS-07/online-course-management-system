import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Auth } from '../services/auth.service';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewChatDialog } from '../new-chat-dialog/new-chat-dialog';
import { MenuLayout } from '../layout/menu-layout/menu-layout';
import { GroupChatDialog } from '../group-chat-dialog/group-chat-dialog';


@Component({
  selector: 'app-chat-page',
  standalone: false,
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css'
})
export class ChatPage implements OnInit, AfterViewInit, OnDestroy {

// STATE VARIABLES

  user: any;
  userRole = '';
  chatUsers: any[] = [];
  selectedReceiver: any = null;
  messages: any[] = [];
  newMessage: string = '';
  pollingSub: Subscription | null = null;
  toggleStartChat = false;
  selectedRole = '';
  roleUsers: any[] = [];
  newChatUserId: number | null = null;
  toggleDropUp: boolean = false;


  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private auth: Auth, private dialog: MatDialog, private layout: MenuLayout) {}

  ngOnInit() {
    this.user = this.auth.getLoggedInUser();
    this.userRole = this.user?.role?.toLowerCase();

this.loadChatUsers();
 this.pollingSub = interval(500).subscribe(() => this.fetchChatHistory(true));
 this.fetchChatHistory(true);
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    if (this.pollingSub) this.pollingSub.unsubscribe();
  }

 // LOAD CHAT USER LIST (ONE-ON-ONE & GROUPS)

   loadChatUsers() {
    this.auth.getChatUsers(this.user.userID).subscribe({
      next: (users) => {
        this.chatUsers = users.map(u => ({
          ...u,
          isGroup: !!u.groupID,
          displayName: u.groupID ? u.groupName : `${u.firstName} ${u.lastName}`
        }));
      },
      error: () => alert('Failed to load chat users')
    });
  }

 // SELECT A CHAT USER OR GROUP

  selectUser(user: any) {
    this.selectedReceiver = user;
   

    if (user.isGroup) {
      this.auth.getGroupChatHistory(user.groupID).subscribe({
        next: (msgs) => {
          this.messages = msgs;

 this.auth.markGroupMessagesAsRead({
          groupID: user.groupID,
          userID: this.user.userID
        }).subscribe({
          next: () => {
            this.loadChatUsers();
            this.layout.loadUnreadCount();
          },
          error: () => console.warn('Could not update group read status')
        });

          setTimeout(() => this.scrollToBottom(), 10);
        },
        error: () => alert('Failed to load group messages')
      });
    } else {
      this.auth.getChatHistory(this.user.userID, user.userID).subscribe({
        next: (msgs) => {
          this.messages = msgs;

          this.auth.markAsRead({
            senderID: user.userID,
            receiverID: this.user.userID
          }).subscribe({
            next: () => {
              this.loadChatUsers();
              this.layout.loadUnreadCount();
            },
            error: () => console.warn('Could not update read status')
          });

          setTimeout(() => this.scrollToBottom(), 10);
        },
        error: () => alert('Failed to load chat history')
      });
    }
  }

// SEND MESSAGE TO USER OR GROUP

 sendMessage() {
    if (!this.newMessage.trim() || !this.selectedReceiver) return;

    const payload: any = {
      senderID: this.user.userID,
      message: this.newMessage
    };

    const pushMessageToUI = () => {
      this.messages.push({
        senderName: `${this.user.firstName} ${this.user.lastName}`,
        message: this.newMessage,
        sentAt: new Date()
      });
      this.newMessage = '';
      this.fetchChatHistory();
      setTimeout(() => this.scrollToBottom(), 10);
    };

    if (this.selectedReceiver.isGroup) {
      payload.groupID = this.selectedReceiver.groupID;

      this.auth.sendGroupMessage(payload).subscribe({
        next: () => pushMessageToUI(),
        error: () => alert('Failed to send group message')
      });
    } else {
      payload.receiverID = this.selectedReceiver.userID;

      this.auth.sendMessage(payload).subscribe({
        next: () => {
          pushMessageToUI();
          this.loadChatUsers();
        },
        error: () => alert('Failed to send message')
      });
    }
  }

 // FETCH CHAT HISTORY (POLLING OR SELECTED CHAT)

 fetchChatHistory(silent: boolean = false) {
    if (!this.selectedReceiver) return;

    if (this.selectedReceiver.isGroup) {
      this.auth.getGroupChatHistory(this.selectedReceiver.groupID).subscribe({
        next: (msgs) => {
          const latestBefore = this.messages?.[this.messages.length - 1]?.sentAt;
          const latestAfter = msgs?.[msgs.length - 1]?.sentAt;

          this.messages = msgs;
          if (!silent || latestAfter !== latestBefore) {
            setTimeout(() => this.scrollToBottom(), 100);
          }
        },
        error: () => {
          if (!silent) alert('Failed to load group chat');
        }
      });
    } else {
      this.auth.getChatHistory(this.user.userID, this.selectedReceiver.userID).subscribe({
        next: (msgs) => {
          const latestBefore = this.messages?.[this.messages.length - 1]?.sentAt;
          const latestAfter = msgs?.[msgs.length - 1]?.sentAt;

          this.messages = msgs;
          if (!silent || latestAfter !== latestBefore) {
            setTimeout(() => this.scrollToBottom(), 100);
          }
        },
        error: () => {
          if (!silent) alert('Failed to load chat history');
        }
      });
    }
  }

// SCROLL TO BOTTOM OF CHAT VIEW

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }
  }

// LOAD USERS BY SELECTED ROLE FOR STARTING NEW CHAT

fetchUsersByRole() {
  if (!this.selectedRole) {
    this.roleUsers = [];
    return;
  }

  this.auth.getUsersByRole(this.selectedRole).subscribe({
    next: (res) => this.roleUsers = res,
    error: () => alert('Failed to load users for role')
  });
}

// START CHAT WITH SELECTED USER

startNewChat() {
  if (!this.newChatUserId) {
    alert('Please select a user to start chat');
    return;
  }

  const selected = this.roleUsers.find(u => u.userID === Number(this.newChatUserId));
  if (selected) {
    this.selectUser(selected);
    this.toggleStartChat = false;
    this.newChatUserId = null;
    this.selectedRole = '';
    this.roleUsers = [];
  } else {
    alert('User not found');
  }
}

// OPEN INDIVIDUAL CHAT DIALOG

openNewChatDialog() {
   console.log("Opening individual chat dialog...");
  const dialogRef = this.dialog.open(NewChatDialog, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(selectedUser => {
     this.toggleDropUp = false;
    if (selectedUser) {
      this.selectUser(selectedUser);
       this.toggleDropUp = false;
    }
  });
}

// TOGGLE ROLE-BASED CHAT

openRoleBasedChat() {
  this.toggleStartChat = true;
  this.toggleDropUp = false;
}

// OPEN GROUP CHAT DIALOG

openGroupChat() {
  const dialogRef = this.dialog.open(GroupChatDialog, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {
    
    if (result === 'created') {
      this.loadChatUsers();
         setTimeout(() => {
          this.fetchChatHistory(true);
      }, 100);
    }
    this.toggleDropUp = false;
  });
}

isSystemMessage(msg: any): boolean {
  return msg.message?.toLowerCase().includes('group') && msg.message?.toLowerCase().includes('created');
}

// CHECK IF USER IS SELECTED IN SIDEBAR

isSelected(user: any): boolean {
  if (!this.selectedReceiver) return false;

 
  if (user.userID && !user.groupID) {
    return this.selectedReceiver.userID === user.userID;
  }


  if (user.groupID) {
    return this.selectedReceiver.groupID === user.groupID;
  }

  return false;
}


}
