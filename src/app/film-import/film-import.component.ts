import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FilmService } from '../film.service';
import { FormGroup } from '@angular/forms';
import * as Stomp from 'stompjs';
import { Message } from 'stompjs';
import { environment } from '../../environments/environment';
import { MessagingService } from './../messaging.service';
import { StompState } from '@stomp/ng2-stompjs';
import { JmsStatusMessage } from '../jms-status-message';
import { JmsStatus } from '../jms-status.enum';

@Component({
  selector: 'app-film-import',
  templateUrl: './film-import.component.html',
  styleUrls: ['./film-import.component.css']
})
export class FilmImportComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') inputEl: ElementRef;
  loading = false;
  loadingStatus = false;
  buttonDisabled = false;
  exportResult: any;
  formdata: FormData;
  form: FormGroup;
  private TOPIC = '/topic/*';
  private stompClient: Stomp;
  private messagingService: MessagingService;
  messageHistory: JmsStatusMessage<any>[];
  state = 'NOT CONNECTED';
  time = 0;
  constructor(private filmService: FilmService) {
    this.messageHistory = [];
  }
  ngOnInit() {
    this.initializeWebSocketConnection();
    this.subscribeTopic();
  }
  ngOnDestroy() {
    this.messagingService.disconnect();
  }
  importFilmList() {
    const start = new Date().getTime();
    this.buttonDisabled = true;
    this.loading = true;
    this.loadingStatus = true;
    this.messageHistory = [];
    this.filmService.importFilmList(this.formdata).subscribe((data: any) => {

    }
      , (error) => {
        console.log(error);
        this.buttonDisabled = false;
        this.loading = false;
        this.loadingStatus = false;
        const end = new Date().getTime();
        this.time = end - start;
        // console.log('Call to importFilmList took ' + this.time / 1000 + ' seconds.');
      }
      , () => {
        this.buttonDisabled = false;
        this.loading = false;
        const end = new Date().getTime();
        this.time = end - start;
        // console.log('Call to importFilmList took ' + this.time / 1000 + ' seconds.');
      });
  }

  private subscribeTopic() {
    // Subscribe to its stream (to listen on messages)
    this.messagingService.stream().subscribe((message: Message) => {
      const jmsStatusMessage: JmsStatusMessage<any> = JmsStatusMessage.fromJson(JSON.parse(message.body));
      if (JmsStatus[jmsStatusMessage.getStatus()].toString() === JmsStatus.FILE_ITEM_READER_COMPLETED.toString()) {
        this.messageHistory.splice(1, 1);
        this.messageHistory.splice(1, 0, jmsStatusMessage);
      } else if (JmsStatus[jmsStatusMessage.getStatus()].toString() === JmsStatus.FILM_CSV_LINE_MAPPER_COMPLETED.toString()) {
        this.messageHistory.splice(2, 1);
        this.messageHistory.splice(2, 0, jmsStatusMessage);
      } else {
        if (jmsStatusMessage.getStatusValue() === 1) {
          this.messageHistory.shift();
        }
        this.messageHistory.unshift(jmsStatusMessage);
      }
      this.loadingStatus = true;
    });
  }

  loadFile(event) {
    // console.log('loadFile event', event);
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    const fileCount: number = inputEl.files.length;
    if (fileCount === 1) {
      this.formdata = new FormData();
      this.formdata.append('file', inputEl.files.item(0));
    }
  }
  private initializeWebSocketConnection() {
    // Instantiate a messagingService
    this.messagingService = new MessagingService(environment.websocketApiUrl, this.TOPIC);
    // Subscribe to its state (to know its connected or not)
    this.messagingService.state().subscribe((state: StompState) => {
      this.state = StompState[state];
      // console.log('this.state=', this.state);
    });
  }
}
